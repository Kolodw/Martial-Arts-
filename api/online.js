// ระบบออนไลน์ของ "1 ในยุทธภพ" — Vercel Function + Redis
// ฐานข้อมูลหลัก: ถ้ามี VALKEY_URL (rediss://user:pass@host:port จาก Aiven) จะใช้ Valkey ผ่าน TCP/TLS
// ถ้าไม่มี จะใช้ Upstash REST เหมือนเดิม (KV_REST_API_URL / KV_REST_API_TOKEN)
const UP_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const UP_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const VK_URL = process.env.VALKEY_URL || '';
const USE_VK = !!VK_URL;
const URL_ = USE_VK ? VK_URL : UP_URL;
const TOKEN = USE_VK ? 'vk' : UP_TOKEN;

// ---------- Upstash REST ----------
async function upCmd(...args) {
  const r = await fetch(UP_URL, { method: 'POST', headers: { Authorization: `Bearer ${UP_TOKEN}` }, body: JSON.stringify(args) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
async function upPipe(list) {
  if (!list.length) return [];
  const r = await fetch(UP_URL + '/pipeline', { method: 'POST', headers: { Authorization: `Bearer ${UP_TOKEN}` }, body: JSON.stringify(list) });
  const j = await r.json();
  if (!Array.isArray(j)) throw new Error((j && j.error) || 'kv');
  const bad = j.find(x => x && x.error && /max requests limit|max daily request/i.test(x.error));
  if (bad) throw new Error(bad.error);
  return j.map(x => x.result);
}

// ---------- Valkey/Redis (RESP2) แบบไม่ต้องลงแพ็กเกจเพิ่ม ----------
const net = require('net'), tls = require('tls');
const VK = { sock: null, ready: null, buf: Buffer.alloc(0), q: [], io: 0 };
class RErr { constructor(m) { this.message = m } }
function vkParse(buf, i) {
  if (i >= buf.length) return null;
  const t = buf[i], e = buf.indexOf('\r\n', i);
  if (e < 0) return null;
  const line = buf.toString('utf8', i + 1, e);
  if (t === 43) return [line, e + 2];                       // +
  if (t === 45) return [new RErr(line), e + 2];             // -
  if (t === 58) return [Number(line), e + 2];               // :
  if (t === 36) {                                            // $
    const n = +line; if (n < 0) return [null, e + 2];
    if (buf.length < e + 2 + n + 2) return null;
    return [buf.toString('utf8', e + 2, e + 2 + n), e + 2 + n + 2];
  }
  if (t === 42) {                                            // *
    const n = +line; if (n < 0) return [null, e + 2];
    const arr = []; let p = e + 2;
    for (let k = 0; k < n; k++) { const r = vkParse(buf, p); if (!r) return null; arr.push(r[0]); p = r[1] }
    return [arr, p];
  }
  throw new Error('resp');
}
function vkEnc(args) {
  let s = '*' + args.length + '\r\n';
  for (const a of args) { const v = a == null ? '' : typeof a === 'string' ? a : String(a); s += '$' + Buffer.byteLength(v) + '\r\n' + v + '\r\n' }
  return s;
}
function vkDrop(err) {
  const q = VK.q; VK.q = []; VK.sock = null; VK.ready = null; VK.cur = null; VK.buf = Buffer.alloc(0);
  for (const w of q) w.rej(err || new Error('valkey closed'));
}
function vkConnect() {
  if (VK.ready) return VK.ready;
  VK.ready = new Promise((res, rej) => {
    let u; try { u = new URL(VK_URL) } catch { return rej(new Error('VALKEY_URL invalid')) }
    const port = +u.port || 6379, host = u.hostname, secure = u.protocol === 'rediss:';
    const opt = { host, port, servername: host };
    if (process.env.VALKEY_CA) opt.ca = process.env.VALKEY_CA;
    const s = secure ? tls.connect(opt) : net.connect(opt);
    VK.cur = s; s.setNoDelay(true); s.setKeepAlive(true, 30000);
    const to = setTimeout(() => { s.destroy(new Error('valkey connect timeout')) }, 8000);
    s.on('data', d => {
      if (VK.cur !== s) return;
      VK.io = Date.now();
      VK.buf = VK.buf.length ? Buffer.concat([VK.buf, d]) : d;
      let p = 0;
      for (;;) { const r = vkParse(VK.buf, p); if (!r) break; p = r[1]; const w = VK.q.shift(); if (w) { r[0] instanceof RErr ? w.rej(new Error(r[0].message)) : w.res(r[0]) } }
      VK.buf = p >= VK.buf.length ? Buffer.alloc(0) : VK.buf.subarray(p);
    });
    s.on('error', e => { clearTimeout(to); if (VK.cur === s) vkDrop(e); rej(e) });
    s.on('close', () => { clearTimeout(to); if (VK.cur === s) vkDrop() });
    s.once(secure ? 'secureConnect' : 'connect', async () => {
      clearTimeout(to); VK.sock = s; VK.io = Date.now();
      try {
        const user = decodeURIComponent(u.username || ''), pass = decodeURIComponent(u.password || '');
        if (pass) await vkSend(user ? ['AUTH', user, pass] : ['AUTH', pass]);
        res(s);
      } catch (e) { s.destroy(); rej(e) }
    });
  });
  return VK.ready;
}
function vkSend(args) {
  return new Promise((res, rej) => {
    if (!VK.sock) return rej(new Error('valkey not connected'));
    // ไม่ตอบใน 5 วิ = socket ค้าง (เช่นฟังก์ชันถูกแช่แข็งแล้วปลุกขึ้นมา) → ทิ้ง socket ให้คำสั่งถัดไปต่อใหม่
    const t = setTimeout(() => { rej(new Error('valkey timeout')); const sk = VK.sock; if (sk) { vkDrop(new Error('valkey timeout')); try { sk.destroy() } catch {} } }, 5000);
    VK.q.push({ res: v => { clearTimeout(t); res(v) }, rej: e => { clearTimeout(t); rej(e) } });
    VK.sock.write(vkEnc(args));
  });
}
// socket ที่เงียบนานเกิน 40 วิ มักถูกปิดฝั่งเซิร์ฟเวอร์ไปแล้วแบบไม่บอก — ต่อใหม่ก่อนส่ง
function vkFresh() { if (VK.sock && Date.now() - VK.io > 40e3 && !VK.q.length) { const sk = VK.sock; vkDrop(); try { sk.destroy() } catch {} } }
const vkConnErr = e => /not connected|closed|ECONNRESET|EPIPE|ETIMEDOUT|connect timeout|socket hang up|valkey timeout/i.test(String(e && e.message));
async function vkTry(fn) { vkFresh(); try { await vkConnect(); return await fn() } catch (e) { if (!vkConnErr(e)) throw e; vkDrop(); await vkConnect(); return fn() } }
async function vkCmd(...args) { return vkTry(() => vkSend(args)) }
async function vkPipe(list) {
  if (!list.length) return [];
  return vkTry(() => Promise.all(list.map(a => vkSend(a).catch(e => { if (/NOAUTH|WRONGPASS|closed|timeout|not connected|max requests limit|max daily request|OOM/i.test(e.message)) throw e; return undefined }))));
}

const jp = x => { try { const v = JSON.parse(x); return v && typeof v === 'object' ? v : null } catch { return null } };
const cmd = USE_VK ? vkCmd : upCmd;
const pipe = USE_VK ? vkPipe : upPipe;

// ===== ทำเนียบรายวัน (v15.3): แยก 4 หมวด · คะแนนจากค่าเฉลี่ยทุกด้าน · รางวัลอันดับ 1–3 =====
const BD_CATS = ['m', 'x', 'g', 'b', 'c']; // c = ทำเนียบโหมดท้าทาย (นรก/ชีวิตสั้น/รากขยะ)
const CH_OK = ['hell', 'short', 'junk'];
// ฉายาทำเนียบ (ชั่วคราว): รายวัน/สัปดาห์/เดือน · อันดับ 1–3
const RKT = { d: ['', 'ตะวันเจิดจ้า', 'จันทร์เหนือเมฆ', 'ดาวประกาย'], w: ['', 'จ้าวยุทธภพ', 'ขุนศึกไร้พ่าย', 'ยอดฝีมือผงาด'], m: ['', 'จักรพรรดิเหนือฟ้า', 'มหาเทพบัญชาสวรรค์', 'ตำนานผู้ถูกจารึก'] };
const RKT_C = { d: ['', 'ผู้ฝ่าขุมนรก', 'วิญญาณไม่ดับ', 'ผู้ท้าลิขิต'], w: ['', 'ราชันย์ไร้พรสวรรค์', 'จ้าวแห่งเปลวนรก', 'ผู้ทวนชะตา'], m: ['', 'จักรพรรดิผู้ลบลิขิต', 'มารฟ้าทลายกรรม', 'ตำนานจากธุลี'] };
const RKT_A = { w: ['', 'จ้าวลานหมื่นเงา', 'ราชันย์เงาพิฆาต', 'ดาบเงาไร้เทียมทาน'] };
const RKT_EXP = { d: 86400e3 * 1.1, w: 86400e3 * 7.2, m: 86400e3 * 31 }, RKT_TR = { d: 7, w: 8, m: 9 };
const RKT_ALL = new Map(); [RKT, RKT_C, RKT_A].forEach(TT => Object.entries(TT).forEach(([p, L]) => L.forEach((t, r) => { if (t) RKT_ALL.set(t, { p, r }) })));
const bdCat = e => e.bm ? 'b' : e.g ? 'g' : e.x ? 'x' : 'm';
const bdKey = (c, ms, back = 0) => 'bd3:' + c + ':' + new Date(ms + 7 * 3600e3 - back * 86400e3).toISOString().slice(0, 10);
const bdKeyW = (c, ms, back = 0) => 'bdw:' + c + ':' + week(new Date(ms - back * 7 * 86400e3));
const bdMon = (ms, back = 0) => { const t = new Date(ms + 7 * 3600e3); const d = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() - back, 1)); return d.toISOString().slice(0, 7) };
const bdKeyM = (c, ms, back = 0) => 'bdm:' + c + ':' + bdMon(ms, back);
const bdKeyP = (p, c, ms, back = 0) => p === 'w' ? bdKeyW(c, ms, back) : p === 'm' ? bdKeyM(c, ms, back) : bdKey(c, ms, back);
function bdScore(D, e) {
  const st = (D && D.st) || {}, bm = !!e.bm, L = (v, r) => Math.min(1.5, Math.log10(1 + Math.max(0, +v || 0)) / Math.log10(1 + r));
  const kids = +D.kc >= 0 && D.kc != null ? +D.kc : (D.kids || []).length, ach = D.an != null ? +D.an : (D.ach || []).length;
  const C = [[1.5, L(st.pow, 1e8)], [1.2, L(st.fame, 1e5)], [bm ? 0 : 1, L(st.money, 1e9)], [1, L(st.int, 5000)], [.8, L(st.cha, 5000)], [.8, L(kids, 50)], [1, L(e.age, bm ? 20000 : 10000)], [.7, L(st.kills, 2000)], [1.2, L(ach, 20)], [.5, L(Math.abs(+st.karma || 0), 1000)], [.6, Math.min(1, Math.max(0, (+st.joy || 0) / 100))]];
  if (bm) C.push([1, Math.min(1.5, Math.max(0, (+D.bst || 0) / 7))]);
  let sw = 0, sv = 0; for (const [w, v] of C) { sw += w; sv += w * (isFinite(v) ? v : 0) }
  return Math.round(100000 * sv / sw);
}
function week(d = new Date()) {
  // สัปดาห์เริ่มวันจันทร์ 00:00 เวลาไทย
  const t = new Date(d.getTime() + 7 * 3600e3);
  const day = (t.getUTCDay() + 6) % 7;
  const mon = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() - day));
  return mon.toISOString().slice(0, 10);
}
const BAD = ['ควย', 'เหี้ย', 'สัส', 'เย็ด', 'แตด', 'fuck', 'shit', 'bitch', 'nigg', 'เงี่ยน', 'กะหรี่'];
function clean(s, n) {
  s = String(s || '').replace(/[\u0000-\u001f<>]/g, '').slice(0, n);
  s = s.replace(/(https?:\/\/|www\.)\S+/gi, '[ลิงก์]').replace(/\b\S+\.(com|net|org|io|gg|me|xyz|th|co)\b\S*/gi, '[ลิงก์]');
  for (const w of BAD) s = s.split(w).join('*'.repeat([...w].length));
  s = s.replace(/หี(?![บดม])/g, '**');
  return s.trim();
}
// อ่าน query ด้วย WHATWG URL (ไม่แตะ req.query ซึ่งใช้ url.parse ที่เลิกสนับสนุนแล้ว)
const qOf = r => r._q || (r._q = Object.fromEntries(new URL(r.url || '/', 'http://localhost').searchParams));
// ฉายาที่มีจริงในเกม (สร้างจากตัวเกม) → เซิร์ฟเวอร์รับเฉพาะชื่อในรายการ และกำหนดสีระดับเอง
let TITLES = { t: {}, a: {} }; try { TITLES = require('./titles.json') } catch (e) {}
const rkOk = (tt, h) => { try { const k = String(tt || ''), m = RKT_ALL.get(k); if (!m || !Array.isArray(h)) return null; for (let i = 0; i < h.length; i += 2) { const v = JSON.parse(h[i + 1] || 'null'); if (v && v.t === k && v.exp > Date.now()) return { tt: k, tr: RKT_TR[m.p] } } } catch (e) {} return null };
const ttlOk = (tt) => { const k = String(tt || '').slice(0, 24); return k && Object.prototype.hasOwnProperty.call(TITLES.t, k) ? { tt: k, tr: Math.max(0, Math.min(6, +TITLES.t[k] || 0)) } : { tt: '', tr: 0 } };
// รูปตัวละครที่เกมวาดเอง: PNG ขนาด 56×62 เท่านั้น
const avSnapOk = (s) => { if (!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(s) || s.length > 8000) return false; try { const B = Buffer.from(s.slice(22, 22 + 44), 'base64'); return B.readUInt32BE(16) === 56 && B.readUInt32BE(20) === 62 } catch { return false } };
// ล็อกอิน Google: ตรวจ ID token กับ Google โดยตรง (ต้องตั้ง GOOGLE_CLIENT_ID)
async function gVerify(cred) {
  if (!cred) return null;
  if (process.env.GLOGIN_TEST === '1' && cred.startsWith('test:')) return { sub: cred.slice(5), email: cred.slice(5) + '@gmail.com' };
  const cid = process.env.GOOGLE_CLIENT_ID; if (!cid) return null;
  try { const r = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(cred)); if (!r.ok) return null; const j = await r.json();
    if (j.aud !== cid || !['accounts.google.com', 'https://accounts.google.com'].includes(j.iss) || +j.exp * 1000 < Date.now()) return null; return { sub: j.sub, email: j.email } } catch { return null }
}
const gMask = (e) => { const m = String(e || '').match(/^(.)(.*)(@.*)$/); return m ? m[1] + '***' + m[3] : '' };
// ผู้เล่นตั้งชื่อ/ฉายาให้เหมือนแอดมินไม่ได้
const noAdm = x => /ผู้ดูแล|แอดมิน|admin|ทีมงาน|moderator|\bmod\b|ผู้พัฒนา|developer/i.test(String(x || '')) ? '' : x;
const thDay = (ms, back = 0) => new Date(ms + 7 * 3600e3 - back * 86400e3).toISOString().slice(0, 10);
// IP ของผู้ใช้จริง (Vercel ใส่ x-forwarded-for / x-real-ip ให้)
const cip = req => (String(req.headers['x-real-ip'] || '') || String(req.headers['x-forwarded-for'] || '').split(',')[0]).trim().replace(/[^0-9a-fA-F:.]/g, '').slice(0, 45) || 'x';
// ต่อ IP ต่อนาที: เกิน SOFT ตอบ 429 · เกิน HARD แบน 30 นาที · คำสั่งที่เขียนข้อความให้คนอื่นเห็นจำกัดแยก
// เน็ตมือถือไทยใช้ IP ร่วมกัน (CGNAT) → จำกัดหลักต่อ 'ไอดีผู้เล่น' ส่วนต่อ IP เผื่อไว้สูงมาก (กันแค่ยิงถล่มจริง)
const IP_SOFT = 8000, IP_HARD = 25000, IP_WMAX = 2000, ID_SOFT = 240, ID_WMAX = 30, NOID_SOFT = 900;
const IP_WRITE = new Set(['say', 'bug', 'bugedit', 'mtmsg', 'pachat', 'life', 'profile', 'idea', 'fb', 'mtopen', 'meet', 'migput', 'csave', 'save', 'achfirst', 'glogin', 'gunlink', 'profack', 'pushsub']);
// รหัสแอดมิน: ใช้ ADMIN_KEY2 ถ้ามี (รหัสเก่า ADMIN_KEY ใช้ไม่ได้อีก)
const ADM_KEY = process.env.ADMIN_KEY2 || process.env.ADMIN_KEY || '';
const isAdmKey = k => !!ADM_KEY && String(k || '') === ADM_KEY;
const annGet = async () => { try { const v = await cmd('GET', 'ann'); return v ? JSON.parse(v) : null } catch { return null } };
const ANN_VOTE_DAYS = 7;
const annHist = async () => { try { return ((await cmd('LRANGE', 'annh', 0, 29)) || []).map(v => { try { return JSON.parse(v) } catch { return null } }).filter(Boolean) } catch { return [] } };
const annFind = async ai => { const cur = await annGet(); if (cur && cur.i === ai) return { ann: cur, cur: true }; const h = await annHist(); const a = h.find(x => x.i === ai); if (a) return { ann: a, cur: false };
  // ประกาศเก่าก่อนมีประวัติ: กู้จากข้อความในแชท
  try { for (const v of ((await cmd('LRANGE', 'chat', 0, 199)) || [])) { const m = JSON.parse(v); if (m.k === 'ann' && m.i === ai) return { ann: { i: m.i, t: m.t, n: m.n, x: String(m.x || '').replace(/^@everyone\s*/i, ''), poll: m.poll }, cur: false } } } catch {}
  return null };
const annPoll = async (ann, id) => {
  if (!ann || !Array.isArray(ann.poll) || !ann.poll.length) return ann;
  try {
    const [hc, my] = await pipe([['HGETALL', 'annc:' + ann.i], ['HGET', 'annv:' + ann.i, String(id || '')]]);
    const c = ann.poll.map(() => 0);
    if (Array.isArray(hc)) for (let i = 0; i < hc.length; i += 2) { const k = +hc[i]; if (k >= 0 && k < c.length) c[k] = Math.max(0, +hc[i + 1] || 0) }
    else if (hc && typeof hc === 'object') for (const k in hc) { if (+k >= 0 && +k < c.length) c[+k] = Math.max(0, +hc[k] || 0) }
    return Object.assign({}, ann, { c, my: my == null ? -1 : +my });
  } catch { return ann }
};
const okId = id => typeof id === 'string' && /^[a-z0-9]{6,24}$/.test(id);

function uaMeta(req, now) {
  const ua = String(req.headers['user-agent'] || '');
  const org = String(req.headers['origin'] || req.headers['referer'] || '').replace(/^https?:\/\//, '').split('/')[0].slice(0, 60);
  return { d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', b: /bot|crawl|spider|headless|preview|facebookexternalhit/i.test(ua) ? 'บอท' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'อื่นๆ', o: org || 'ไม่ระบุ', v: String(qOf(req).v || '').slice(0, 8), c: String(req.headers['x-vercel-ip-country'] || '?').slice(0, 3), t: now };
}
// ย้ายข้อมูลเก่าจาก Upstash -> Valkey ทีละชุด (ไม่ทับของใหม่ ทำซ้ำได้)
async function migStep(cur) {
  const cur0 = String(cur || '0').replace(/[^0-9]/g, '') || '0';
  const r = await upCmd('SCAN', cur0, 'COUNT', 150);
  const next = String(r[0]), keys = r[1] || [];
  let copied = 0, skipped = 0; const errs = [];
  if (keys.length) {
    const meta = await upPipe(keys.flatMap(k => [['TYPE', k], ['PTTL', k]]));
    const reads = keys.map((k, i) => { const t = meta[i * 2]; return t === 'string' ? ['GET', k] : t === 'list' ? ['LRANGE', k, 0, -1] : t === 'hash' ? ['HGETALL', k] : t === 'set' ? ['SMEMBERS', k] : t === 'zset' ? ['ZRANGE', k, 0, -1, 'WITHSCORES'] : ['EXISTS', k] });
    const vals = await upPipe(reads);
    const ex = await vkPipe(keys.map(k => ['EXISTS', k])), dn = await vkPipe(keys.map(k => ['SISMEMBER', 'mig:done', k]));
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i], t = meta[i * 2], ttl = +meta[i * 2 + 1], v = vals[i], has = +ex[i] > 0, ops = [];
      if (+dn[i] > 0) { skipped++; continue }
      try {
        if (t === 'string') { if (!has) ops.push(['SET', k, v]); else if (/^-?\d+$/.test(String(v)) && /^(lives|trk|bv)/.test(k)) ops.push(['INCRBY', k, v]); else { skipped++; continue } }
        else if (t === 'list') { if (!v || !v.length) { skipped++; continue } ops.push(['RPUSH', k, ...v]) }
        else if (t === 'hash') { if (!v || !v.length) { skipped++; continue } for (let j = 0; j < v.length; j += 2) ops.push(['HSETNX', k, v[j], v[j + 1]]) }
        else if (t === 'set') { if (!v || !v.length) { skipped++; continue } ops.push(['SADD', k, ...v]) }
        else if (t === 'zset') { if (!v || !v.length) { skipped++; continue } const a2 = []; for (let j = 0; j < v.length; j += 2) a2.push(v[j + 1], v[j]); ops.push(['ZADD', k, 'NX', ...a2]) }
        else { skipped++; continue }
        if (ttl > 0) ops.push(['PEXPIRE', k, ttl]);
        ops.push(['SADD', 'mig:done', k]);
        await vkPipe(ops); copied++;
      } catch (x) { errs.push(k + ': ' + String(x.message).slice(0, 80)) }
    }
  }
  return { done: next === '0' ? 1 : 0, next, copied, skipped, errs: errs.slice(0, 10) };
}
// ย้ายอัตโนมัติ: ทุกครั้งที่มีคน ping จะลองย้ายต่อ 1 ชุด (ล็อกกันชนกัน, Upstash เต็มโควตาจะรอ 15 นาทีแล้วลองใหม่)
let MIG_T = 0;
async function autoMig() {
  if (!USE_VK || !UP_URL || Date.now() - MIG_T < 20e3) return;
  MIG_T = Date.now();
  try {
    const [st, wait] = await vkPipe([['GET', 'mig:cur'], ['EXISTS', 'mig:wait']]);
    if (st === 'done' || +wait > 0) return;
    if ((await vkCmd('SET', 'mig:lock', '1', 'NX', 'EX', 25)) !== 'OK') return;
    try {
      const r = await migStep(st || '0');
      await vkPipe([['SET', 'mig:cur', r.done ? 'done' : r.next], ['HINCRBY', 'mig:stat', 'copied', r.copied], ['HINCRBY', 'mig:stat', 'steps', 1], ['HSET', 'mig:stat', 't', Date.now()], ['HSET', 'mig:stat', 'err', '']]);
    } catch (x) {
      await vkPipe([['SET', 'mig:wait', '1', 'EX', 900], ['HSET', 'mig:stat', 'err', String(x.message).slice(0, 160)], ['HSET', 'mig:stat', 't', Date.now()]]).catch(() => {});
    } finally { await vkCmd('DEL', 'mig:lock').catch(() => {}) }
  } catch {}
}

// ---- ประมูลทั่วยุทธภพ (ผู้เล่นจริง): รอบละ 6 ชิ้น ชิ้นละ 40 วิ (เสนอราคาช่วงท้ายต่อเวลา 10 วิ สูงสุด 3 ครั้ง) · พักรอบละ 10–15 นาที ----
const PA_RW = [0, 4, 10, 18, 24, 22, 14, 0], PA_G0 = [10, 300, 5000, 80000, 1000000, 8000000, 30000000, 100000000], PA_LOT_MS = 40e3, PA_NB_MS = 10e3;
const PA_GW = { m: [10, 100, 1000, 10000, 80000, 400000, 2000000, 10000000], x: [500, 5000, 50000, 400000, 3000000, 15000000, 50000000, 100000000], g: [20000, 200000, 2000000, 8000000, 25000000, 50000000, 80000000, 100000000] }, PA_NB = [10, 30, 100, 300];
const PA_WN = { m: 'ยุทธภพ', x: 'โลกเซียน', g: 'แดนเทพ' };
// ใครประมูลชิ้นนี้ได้: ต้องอยู่โลกเดียวกัน · ชิ้นมือใหม่ = ขั้นไม่เกิน 2 · ของระดับต่ำ (ธรรมดา/หายาก) คนขั้น 5 ขึ้นไปห้ามแย่ง
function paElig(L, w, ri) { if (!L.w) return ''; if (L.w !== w) return 'ชิ้นนี้สำหรับคนใน' + PA_WN[L.w]; if (L.nb && ri > 2) return 'ชิ้นมือใหม่ — สำหรับคนที่ยังอยู่ขั้นต้น'; if (!L.nb && L.r <= 1 && ri >= 5) return 'ของระดับต่ำ เก็บไว้ให้มือใหม่'; return '' }
const PA_BID_LUA = "local hi=tonumber(redis.call('HGET',KEYS[1],'hi') or '0') local en=tonumber(redis.call('GET',KEYS[2]) or '0') local now=tonumber(ARGV[4]) if now>en then return {-1,hi} end local g=tonumber(ARGV[1]) local mn=tonumber(ARGV[5]) if hi>0 then mn=math.ceil(hi*1.05) end if g<mn then return {0,hi} end redis.call('HSET',KEYS[1],'hi',g,'by',ARGV[2],'bn',ARGV[3],'t',now) if en-now<10000 then local e=redis.call('HINCRBY',KEYS[1],'ext',1) if e<=3 then redis.call('SET',KEYS[2],now+10000,'EX',3600) end end redis.call('EXPIRE',KEYS[1],3600) return {1,g}";
function paPick() { const t = PA_RW.reduce((a, b) => a + b, 0); let x = Math.random() * t; for (let i = 0; i < PA_RW.length; i++) { if ((x -= PA_RW[i]) < 0) return i } return 4 }
async function paTick(now) {
  let cur = null; try { const v = await cmd('GET', 'pa:cur'); cur = v ? JSON.parse(v) : null } catch {}
  if (cur && !cur.u) cur = null; // รอบเก่าที่ใช้ทองคำ → ปิดทิ้ง เริ่มรอบใหม่เป็นตำลึง
  const force = await cmd('GET', 'pa:force');
  if (!cur || (cur.phase === 'done' && (now >= cur.next || force))) {
    // ตัวจัดตารางอัตโนมัติ: เปิดเมื่อมีคนเล่นพร้อมกันอย่างน้อย 2 คน · ไม่เกินวันละ 120 รอบ · พักระหว่างรอบ = จำนวนคนเล่น (ต่ำสุด 5 สูงสุด 10 นาที) · คนน้อยของน้อยลง
    if (!force && (await cmd('SET', 'pa:chk', '1', 'NX', 'PX', 60e3)) !== 'OK') return cur;
    const act = +(await cmd('ZCOUNT', 'online', now - 180e3, '+inf')) || 0, day = PA_DAY(now), nDay = +(await cmd('GET', 'pa:day:' + day)) || 0;
    if ((act < 2 || nDay >= 120) && !force) return cur;
    if ((await cmd('SET', 'pa:lk', '1', 'NX', 'PX', 4000)) !== 'OK') return cur;
    try {
      const sid = (now.toString(36) + Math.random().toString(36).slice(2, 5)).slice(-9), lots = [], nL = act <= 3 ? 3 : act <= 8 ? 4 : act <= 15 ? 5 : 6;
      let hi6 = 0, hi7 = 0;
      // ของแต่ละชิ้นมีโลกของมัน (ประมูลได้เฉพาะคนในโลกนั้น) + ชิ้นมือใหม่ 1 ชิ้นต่อรอบ
      const rg = r => Math.max(10, Math.round(r * (.8 + Math.random() * .4) / 10) * 10);
      lots.push({ r: Math.random() < .5 ? 2 : 3, k: Math.floor(Math.random() * 1e6), w: 'm', nb: 1 }); lots[0].g = rg(PA_NB[lots[0].r]);
      for (let i = 1; i < nL; i++) { let r = Math.min(6, paPick()); if (r >= 6 && hi6 >= 2) r = 5; if (r === 7) hi7++; if (r >= 6) hi6++; const x = Math.random(), w = x < .5 ? 'm' : x < .8 ? 'x' : 'g'; lots.push({ r, k: Math.floor(Math.random() * 1e6), w, g: rg(PA_GW[w][r]) }) }
      for (let i = lots.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [lots[i], lots[j]] = [lots[j], lots[i]] }
      cur = { sid, t0: now, lots, li: 0, phase: 'open', act, u: 2, ls: now + 10e3 };
      if (force) await cmd('DEL', 'pa:force');
      await pipe([['INCR', 'pa:day:' + day], ['EXPIRE', 'pa:day:' + day, 172800]]);
      await pipe([['SET', 'pa:cur', JSON.stringify(cur), 'EX', 7200], ['SET', 'pa:end:' + sid, now + 60e3, 'EX', 3600]]);
    } finally { await cmd('DEL', 'pa:lk').catch(() => {}) }
    return cur;
  }
  if (cur.phase !== 'open') return cur;
  const end = +(await cmd('GET', 'pa:end:' + cur.sid)) || 0;
  // ไม่มีใครเสนอราคาภายใน 10 วิ → ข้ามไปชิ้นถัดไปทันที
  const nbEnd = (cur.ls || cur.t0 + 10e3) + PA_NB_MS; cur.nbEnd = nbEnd;
  const noBid = async () => !(+(await cmd('HEXISTS', 'pa:b:' + cur.sid + ':' + cur.li, 'hi')));
  if (now <= end && !(now > nbEnd && await noBid())) { cur.end = end; return cur }
  if ((await cmd('SET', 'pa:lk', '1', 'NX', 'PX', 4000)) !== 'OK') { cur.end = end; return cur }
  try {
    const v2 = await cmd('GET', 'pa:cur'); try { cur = JSON.parse(v2) } catch {}
    if (cur.phase !== 'open') return cur;
    const e2 = +(await cmd('GET', 'pa:end:' + cur.sid)) || 0, nb2 = (cur.ls || cur.t0 + 10e3) + PA_NB_MS; cur.nbEnd = nb2; if (now <= e2 && !(now > nb2 && !(+(await cmd('HEXISTS', 'pa:b:' + cur.sid + ':' + cur.li, 'hi'))))) { cur.end = e2; return cur }
    const [bh, vh] = await pipe([['HGETALL', 'pa:b:' + cur.sid + ':' + cur.li], ['HGETALL', 'pa:v:' + cur.sid]]);
    const H = {}; if (Array.isArray(bh)) for (let i = 0; i < bh.length; i += 2) H[bh[i]] = bh[i + 1]; else Object.assign(H, bh || {});
    const V = {}; if (Array.isArray(vh)) for (let i = 0; i < vh.length; i += 2) V[vh[i]] = +vh[i + 1]; else for (const k in (vh || {})) V[k] = +vh[k];
    const L = cur.lots[cur.li], ops = [];
    if (H.by) { L.sold = { g: +H.hi, n: H.bn }; const dk = 'pa:wd:' + PA_DAY(now) + ':' + H.by; ops.push(['INCR', dk], ['EXPIRE', dk, 172800], ['HINCRBY', 'pa:ws:' + cur.sid, H.by, 1], ['EXPIRE', 'pa:ws:' + cur.sid, 7200], ['LPUSH', 'pa:win:' + H.by, JSON.stringify({ sid: cur.sid, li: cur.li, r: L.r, k: L.k, g: +H.hi, t: now, u: cur.u ? 1 : 0 })], ['EXPIRE', 'pa:win:' + H.by, 86400]) } else L.sold = { g: 0 };
    const rest = cur.lots.map((x, i) => i).filter(i => !cur.lots[i].sold);
    if (!rest.length) { cur.phase = 'done'; const act = +(await cmd('ZCOUNT', 'online', now - 180e3, '+inf')) || 0; cur.next = now + Math.max(5, Math.min(10, act)) * 60e3 }
    else { rest.sort((x, y) => (V['l' + y] || 0) - (V['l' + x] || 0) || x - y); cur.li = rest[0]; cur.ls = now; cur.nbEnd = now + PA_NB_MS; ops.push(['SET', 'pa:end:' + cur.sid, now + PA_LOT_MS, 'EX', 3600]); cur.end = now + PA_LOT_MS }
    ops.push(['SET', 'pa:cur', JSON.stringify(cur), 'EX', 7200]);
    await pipe(ops);
  } finally { await cmd('DEL', 'pa:lk').catch(() => {}) }
  return cur;
}
const PA_DAY = t => new Date(t + 7 * 3600e3).toISOString().slice(0, 10);
const paSum = c => c ? { sid: c.sid, phase: c.phase, t0: c.t0, li: c.li, n: c.lots.length, left: c.lots.filter(x => !x.sold).length } : null;
let QUOTA_AT = 0;

// ---------- 🔔 Web Push (VAPID + aes128gcm เขียนเองไม่ใช้ไลบรารี) + กล่องแจ้งเตือนในเกม ----------
const crypto = require('crypto');
const VAPID_PUB = process.env.VAPID_PUB || '', VAPID_PRIV = process.env.VAPID_PRIV || '';
const PUSH_HOSTS = /^(fcm\.googleapis\.com|android\.googleapis\.com|updates\.push\.services\.mozilla\.com|push\.services\.mozilla\.com|[a-z0-9.-]+\.notify\.windows\.com|web\.push\.apple\.com|[a-z0-9.-]+\.push\.apple\.com)$/;
const b64u = s => Buffer.from(String(s).replace(/=+$/, '').replace(/-/g, '+').replace(/_/g, '/'), 'base64');
let _vk = null; const _jwtC = {};
function vapidKey() { if (_vk) return _vk; const pub = b64u(VAPID_PUB); _vk = crypto.createPrivateKey({ key: { kty: 'EC', crv: 'P-256', d: VAPID_PRIV, x: pub.subarray(1, 33).toString('base64url'), y: pub.subarray(33, 65).toString('base64url') }, format: 'jwk' }); return _vk }
function vapidAuth(aud) {
  const n = Math.floor(Date.now() / 1000), c = _jwtC[aud]; if (c && c.e - n > 3600) return c.h;
  const h = Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'ES256' })).toString('base64url'), p = Buffer.from(JSON.stringify({ aud, exp: n + 12 * 3600, sub: 'https://www.1inanovel.com' })).toString('base64url');
  const sig = crypto.sign('sha256', Buffer.from(h + '.' + p), { key: vapidKey(), dsaEncoding: 'ieee-p1363' }).toString('base64url');
  const v = `vapid t=${h}.${p}.${sig}, k=${VAPID_PUB}`; _jwtC[aud] = { h: v, e: n + 12 * 3600 }; return v;
}
const hmac = (k, d) => crypto.createHmac('sha256', k).update(d).digest();
function pushEnc(sub, payload) {
  const ua = b64u(sub.k.p256dh), auth = b64u(sub.k.auth);
  const e = crypto.createECDH('prime256v1'); e.generateKeys(); const as = e.getPublicKey(), sh = e.computeSecret(ua);
  const ikm = hmac(hmac(auth, sh), Buffer.concat([Buffer.from('WebPush: info\0'), ua, as, Buffer.from([1])]));
  const salt = crypto.randomBytes(16), prk = hmac(salt, ikm);
  const cek = hmac(prk, Buffer.concat([Buffer.from('Content-Encoding: aes128gcm\0'), Buffer.from([1])])).subarray(0, 16);
  const nonce = hmac(prk, Buffer.concat([Buffer.from('Content-Encoding: nonce\0'), Buffer.from([1])])).subarray(0, 12);
  const ci = crypto.createCipheriv('aes-128-gcm', cek, nonce);
  const ct = Buffer.concat([ci.update(Buffer.concat([Buffer.from(payload), Buffer.from([2])])), ci.final(), ci.getAuthTag()]);
  const hd = Buffer.alloc(21); salt.copy(hd, 0); hd.writeUInt32BE(4096, 16); hd[20] = 65;
  return Buffer.concat([hd, as, ct]);
}
async function pushOne(sub, msg) {
  try {
    const u = new URL(sub.e), body = pushEnc(sub, JSON.stringify(msg));
    const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch(sub.e, { method: 'POST', signal: ctl.signal, headers: { 'Content-Encoding': 'aes128gcm', 'Content-Type': 'application/octet-stream', TTL: '86400', Urgency: 'high', Authorization: vapidAuth(u.origin) }, body });
    clearTimeout(tm); return r.status;
  } catch (e) { return 0 }
}
async function pushHashes(hs, msg) {
  hs = [...new Set(hs || [])]; if (!VAPID_PRIV || !VAPID_PUB || !hs.length) return { sent: 0, fail: 0, rm: 0, n: hs.length };
  const vals = []; for (let i = 0; i < hs.length; i += 200) vals.push(...((await cmd('HMGET', 'push', ...hs.slice(i, i + 200))) || []));
  const subs = hs.map((h, i) => { const v = jp(vals[i]); return v ? Object.assign(v, { h }) : null });
  const rm = hs.filter((h, i) => !subs[i]), L = subs.filter(Boolean); let k = 0, sent = 0, fail = 0;
  const work = async () => { while (k < L.length) { const s0 = L[k++], st = await pushOne(s0, msg); if (st >= 200 && st < 300) sent++; else { fail++; if (st === 404 || st === 410 || st === 403) rm.push(s0.h) } } };
  await Promise.all(Array.from({ length: Math.min(25, L.length) }, work));
  if (rm.length) { const P = [['HDEL', 'push', ...rm]]; for (const s0 of L) if (rm.includes(s0.h)) P.push(['SREM', 'push:id:' + s0.id, s0.h]); try { await pipe(P) } catch (e) {} }
  return { sent, fail, rm: rm.length, n: hs.length };
}
// แจ้งเตือนผู้เล่นคนเดียว: เก็บไว้ในกล่องในเกม (เห็นตอนกลับมาเล่น) + ส่ง push ถึงทุกเครื่องที่อนุญาต
async function noteTo(pid, msg) {
  if (!okId(pid)) return { sent: 0 };
  const it = JSON.stringify(Object.assign({ at: Date.now() }, msg));
  const [, , , hs] = await pipe([['LPUSH', 'nt:' + pid, it], ['LTRIM', 'nt:' + pid, 0, 9], ['EXPIRE', 'nt:' + pid, 86400 * 30], ['SMEMBERS', 'push:id:' + pid]]);
  return pushHashes(hs || [], msg);
}
const withCap = (p, ms) => Promise.race([p, new Promise(r => setTimeout(() => r({ cap: 1 }), ms))]);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!URL_ || !TOKEN) return res.status(503).json({ err: 'nodb' });
  const a = qOf(req).a;
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b) } catch { b = {} } }
  const id = req.method === 'GET' ? qOf(req).id : b.id;
  const now = Date.now(), W = week();
  // ฐานข้อมูลเต็มโควตา: ตอบทันทีโดยไม่ยิงซ้ำ (ยกเว้นหน้าผู้ดูแลที่ต้องเห็นสถานะ)
  if (QUOTA_AT && now - QUOTA_AT < 120e3 && a !== 'admin' && a !== 'kvdiag') return res.status(503).json({ err: 'quota' });
  const ip = cip(req);
  try {
    // ---- 🛡️ กับดักบอทสแกนไฟล์ (/.env, /.git, *.php …) : จด IP + แบนจากระบบออนไลน์ แล้วตอบ 404 เหมือนไม่มีอะไร ----
    if (a === 'trap') {
      const p = String(qOf(req).p || '').slice(0, 120), ua = String(req.headers['user-agent'] || '').slice(0, 140);
      try {
        const cur = jp(await cmd('HGET', 'trap:info', ip)) || { n: 0, p: [], f: now };
        cur.n++; cur.l = now; cur.ua = ua; if (p && !cur.p.includes(p)) { cur.p.push(p); if (cur.p.length > 10) cur.p.shift() }
        const L = [['HSET', 'trap:info', ip, JSON.stringify(cur)], ['ZADD', 'trap:ips', now, ip], ['ZREMRANGEBYRANK', 'trap:ips', 0, -301], ['INCR', 'trap:n:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10)], ['EXPIRE', 'trap:n:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10), 86400 * 35]];
        if (!(await cmd('GET', 'banx:' + ip))) L.push(['SET', 'ban:' + ip, 'scan', 'EX', 86400 * 7]);
        await pipe(L);
      } catch (e) {}
      res.setHeader('Content-Type', 'text/plain; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
      res.statusCode = 404; return res.end('The page could not be found\n\nNOT_FOUND\n');
    }
    if (a === 'supmark') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const sid = String(qOf(req).i || '').replace(/[^a-z0-9]/g, '').slice(0, 20), v = String(qOf(req).v || '');
      if (!sid) return res.json({ ok: 0 });
      if (v === 'del') await pipe([['HDEL', 'suppay', sid], ['ZREM', 'suppayz', sid], ['DEL', 'supimg:' + sid]]);
      else { const cur = jp(await cmd('HGET', 'suppay', sid)); if (cur) { cur.st = v === 'ok' ? 'ok' : v === 'no' ? 'no' : ''; cur.mt = now; await cmd('HSET', 'suppay', sid, JSON.stringify(cur)) } }
      return res.json({ ok: 1 });
    }
    if (a === 'supimg') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const d = String((await cmd('GET', 'supimg:' + String(qOf(req).i || '').replace(/[^a-z0-9]/g, '').slice(0, 20))) || '');
      const m = d.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
      if (!m) { res.statusCode = 404; return res.end('none') }
      res.setHeader('Content-Type', m[1]); res.setHeader('Cache-Control', 'private, max-age=3600'); return res.end(Buffer.from(m[2], 'base64'));
    }
    if (a === 'achfdel') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const aid = String(qOf(req).aid || '').replace(/[^a-z0-9_]/g, '').slice(0, 24);
      if (aid) await cmd('HDEL', 'achf', aid);
      return res.json({ ok: 1 });
    }
    if (a === 'ipban') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const tip = String(qOf(req).ip || '').replace(/[^0-9a-fA-F:.]/g, '').slice(0, 45);
      if (!tip) return res.status(400).json({ err: 'ip' });
      if (qOf(req).on === '1') await pipe([['SET', 'ban:' + tip, 'admin', 'EX', 86400 * 30], ['DEL', 'banx:' + tip]]);
      else if (qOf(req).on === 'del') await pipe([['ZREM', 'trap:ips', tip], ['HDEL', 'trap:info', tip]]);
      else await pipe([['DEL', 'ban:' + tip], ['SET', 'banx:' + tip, 1, 'EX', 86400 * 30]]);
      return res.json({ ok: 1 });
    }
    // ---- 🛡️ IP ที่ถูกแบน + จำกัดความถี่ต่อ IP (กันสร้างไอดีใหม่มาสแปม) ----
    const admReq = isAdmKey(qOf(req).key || b.key);
    // แอดมินไม่นับเป็น "คนแรกของเซิร์ฟเวอร์" — จำไอดีของแอดมินไว้ แล้วล้างรายการที่แอดมินเคยได้
    if (admReq && okId(id)) {
      try {
        const isNew = +(await cmd('SADD', 'admids', id)) === 1;
        if (isNew || a === 'admreg') {
          const ids = (await cmd('SMEMBERS', 'admids')) || [], pre = new Set(ids.map(x => String(x).slice(0, 6)));
          const h = (await cmd('HGETALL', 'achf')) || [], del = [];
          for (let i = 0; i < h.length; i += 2) { const v = jp(h[i + 1]); if (v && pre.has(v.u)) del.push(h[i]) }
          if (del.length) await cmd('HDEL', 'achf', ...del);
          if (a === 'admreg') return res.json({ ok: 1, removed: del.length });
        }
      } catch (e) {}
      if (a === 'admreg') return res.json({ ok: 1, removed: 0 });
    }
    if (a === 'admreg') return res.status(403).json({ err: 'admin' });
    if (!admReq && ip !== 'x') {
      const mk = Math.floor(now / 60000), WR = IP_WRITE.has(a);
      const [bn, rc, wc] = await pipe([['GET', 'ban:' + ip], ['INCR', 'ipr:' + ip + ':' + mk], WR ? ['INCR', 'ipw:' + ip + ':' + mk] : ['GET', 'ipw:' + ip + ':' + mk], ['EXPIRE', 'ipr:' + ip + ':' + mk, 90], ...(WR ? [['EXPIRE', 'ipw:' + ip + ':' + mk, 90]] : [])]);
      if (bn) return res.status(403).json({ err: 'banned' });
      if (+rc > IP_HARD) { await pipe([['SET', 'ban:' + ip, 'flood', 'EX', 1800], ['ZADD', 'trap:ips', now, ip], ['HSET', 'trap:info', ip, JSON.stringify({ n: +rc, p: ['(ยิง API ถี่เกิน ' + rc + ' ครั้ง/นาที)'], f: now, l: now, ua: String(req.headers['user-agent'] || '').slice(0, 140), fl: 1 })]]); return res.status(429).json({ err: 'rate' }) }
      if (+rc > IP_SOFT) return res.status(429).json({ err: 'rate' });
      if (WR && +wc > IP_WMAX) return res.status(429).json({ err: 'rate' });
      // จำกัดต่อผู้เล่น (ไอดี) — คนดีที่ใช้ IP เดียวกันไม่โดนลูกหลง
      const uk = okId(id) ? 'idr:' + id : 'ipn:' + ip, [uc, uw] = await pipe([['INCR', uk + ':' + mk], WR ? ['INCR', uk + ':w:' + mk] : ['GET', uk + ':w:' + mk], ['EXPIRE', uk + ':' + mk, 90], ...(WR ? [['EXPIRE', uk + ':w:' + mk, 90]] : [])]);
      if (+uc > (okId(id) ? ID_SOFT : NOID_SOFT)) return res.status(429).json({ err: 'rate' });
      if (WR && +uw > ID_WMAX) return res.status(429).json({ err: 'rate' });
    }
    if (a === 'pushcfg') return res.json({ k: VAPID_PUB });
    if (a === 'pushsub') {
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const s0 = b.sub || {}, e = String(s0.endpoint || '').slice(0, 900); let host = '';
      try { const u = new URL(e); if (u.protocol === 'https:') host = u.hostname } catch {}
      const h = crypto.createHash('sha256').update(e).digest('base64url').slice(0, 22);
      if (b.off) { const old = jp(await cmd('HGET', 'push', h)); await pipe([['HDEL', 'push', h], ['SREM', 'push:id:' + ((old && old.id) || id), h]]); return res.json({ ok: 1, off: 1 }) }
      if (!PUSH_HOSTS.test(host)) return res.status(400).json({ err: 'host' });
      const ks = s0.keys || {}, k = { p256dh: String(ks.p256dh || '').replace(/=+$/, ''), auth: String(ks.auth || '').replace(/=+$/, '') };
      if (!/^[A-Za-z0-9_-]{80,100}$/.test(k.p256dh) || !/^[A-Za-z0-9_-]{16,30}$/.test(k.auth)) return res.status(400).json({ err: 'keys' });
      const old = jp(await cmd('HGET', 'push', h)), P = [['HSET', 'push', h, JSON.stringify({ e, k, id, t: now })], ['SADD', 'push:id:' + id, h], ['HSET', 'pupid', id.slice(0, 12), id]];
      if (old && old.id && old.id !== id) P.push(['SREM', 'push:id:' + old.id, h]);
      await pipe(P);
      if (b.test) { const r0 = await pushHashes([h], { t: '🔔 เปิดแจ้งเตือนแล้ว', b: 'คุณจะได้รับแจ้งเตือนเมื่อผู้ดูแลตอบกลับหรือมีประกาศสำคัญ', u: '/', g: 'hello' }); return res.json({ ok: 1, test: r0.sent }) }
      return res.json({ ok: 1 });
    }
    if (a === 'pushsend' || a === 'pushstat') {
      if (!isAdmKey(b.key || qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const n = +(await cmd('HLEN', 'push')) || 0;
      if (a === 'pushstat') return res.json({ n, on: !!(VAPID_PRIV && VAPID_PUB) });
      const t = clean(b.t, 60) || '📢 1 ใน นวนิยาย', x = clean(b.x, 200);
      if (!x) return res.status(400).json({ err: 'empty' });
      const r0 = await withCap(pushHashes(await cmd('HKEYS', 'push'), { t, b: x, u: '/?go=chat', g: 'ann' + now }), 25000);
      return res.json(Object.assign({ ok: 1, n }, r0));
    }
    if (a === 'ping') {
      if (okId(id)) {
        const ua = String(req.headers['user-agent'] || '');
        const org = String(req.headers['origin'] || req.headers['referer'] || '').replace(/^https?:\/\//, '').split('/')[0].slice(0, 60);
        const meta = { d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', b: /bot|crawl|spider|headless|preview|facebookexternalhit/i.test(ua) ? 'บอท' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'อื่นๆ', o: org || 'ไม่ระบุ', v: String(qOf(req).v || '').slice(0, 8), c: String(req.headers['x-vercel-ip-country'] || '?').slice(0, 3), t: now };
        let act = null;
        try { const r = JSON.parse(String(qOf(req).st || '').slice(0, 600) || 'null'); if (r && typeof r === 'object') { const S0 = v => String(v == null ? '' : v).replace(/[<>]/g, '').slice(0, 40), N0 = v => Math.max(-1, Math.min(1e7, Math.round(+v || 0))); act = { sc: S0(r.sc), md: S0(r.md), ch: r.ch ? 1 : 0, hd: r.hd ? 1 : 0, ia: N0(r.ia), er: N0(r.er), em: String(r.em || '').replace(/[<>]/g, '').slice(0, 120), nm: S0(r.nm), ag: N0(r.ag), al: r.al ? 1 : 0, au: r.au ? 1 : 0, pa: r.pa ? 1 : 0, sp: N0(r.sp), w: S0(r.w).slice(0, 1), yr: N0(r.yr), ri: S0(r.ri), v: S0(qOf(req).v).slice(0, 8), t: now } } } catch {}
        const hk = 'ipid:' + ip + ':' + Math.floor(now / 3600e3), [, nid] = await pipe([['SADD', hk, id], ['SCARD', hk], ['EXPIRE', hk, 4000]]);
        if (meta.b !== 'บอท' && +nid <= 600) await pipe([['ZADD', 'online', now, id], ['HSET', 'om', id, JSON.stringify(meta)], ...(act ? [['HSET', 'oa', id, JSON.stringify(act)]] : [])]);
      }
      const [, n, lives, annV] = await pipe([['ZREMRANGEBYSCORE', 'online', 0, now - 600e3], ['ZCARD', 'online'], ['GET', 'lives'], ['GET', 'ann']]);
      let ann = null; try { ann = annV ? JSON.parse(annV) : null } catch {}
      ann = await annPoll(ann, id);
      await Promise.race([autoMig(), new Promise(r => setTimeout(r, 1200))]);
      return res.json({ n: n || 0, lives: +(lives || 0), bd: String(process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7), ann });
    }
    if (a === 'who' || a === 'admin' || a === 'bugfix') {
      const AK = ADM_KEY;
      if (!AK || String(qOf(req).key || '') !== AK) return res.status(403).json({ err: 'forbidden' });
      if (a === 'bugfix') {
        const bid = String(qOf(req).bid || '').slice(0, 20);
        await cmd(qOf(req).undo ? 'SREM' : 'SADD', 'bugdone', bid);
        res.setHeader('Location', '?a=admin&key=' + encodeURIComponent(AK));
        return res.status(302).end();
      }
      const ids = await cmd('ZRANGEBYSCORE', 'online', now - 600e3, '+inf');
      const metas = ids && ids.length ? await cmd('HMGET', 'om', ...ids) : [];
      const acts = ids && ids.length ? await cmd('HMGET', 'oa', ...ids) : [];
      const SCN = { title: 'หน้าแรก', birth: 'หน้าสุ่มชาติกำเนิด', create: 'หน้าสร้างตัวละคร', end: 'หน้าสรุปชีวิต', game: 'ในเกม' };
      const MDN = { pauc: 'ห้องประมูลผู้เล่น', shop2: 'ร้านสมบัติ', vault: 'คลังสมบัติ', auction: 'โรงประมูล', qigame: 'มินิเกมรวมปราณ', mtmsg: 'ฝากข้อความถึงผู้เล่น', fuse: 'รวมวิชา', town: 'เมือง', craft: 'งานช่าง', ai: 'หน้า AI', choice: 'เลือกเหตุการณ์', online: 'ออนไลน์', spec: 'ดูคนอื่นเล่น', menu: 'เมนู', market: 'ตลาด', family: 'ครอบครัว', duel: 'ดวล', think: 'ถามความคิด', bye: 'คำอำลา', update: 'บันทึกอัปเดต', equip: 'ชุดสวมใส่', archive: 'คลังสำรอง', annview: 'อ่านประกาศ', annlist: 'ประกาศทั้งหมด', town: 'เมือง', sys: 'ระบบ', bag: 'กระเป๋า', arts: 'วิชา', quests: 'เควส', craft: 'งานช่าง', people: 'ผู้คน', faction: 'สำนัก', house: 'ตระกูล', dungeon: 'ดันเจี้ยน', dungeons: 'ดันเจี้ยน', map: 'แผนที่', lifelog: 'บันทึกชีวิต', ranking: 'ทำเนียบสำนัก', auto: 'ตั้งค่าอัตโนมัติ', sound: 'เสียง', profile: 'โปรไฟล์', frame: 'ร้านกรอบ', gacha: 'สุ่มคัมภีร์', heir: 'เลือกทายาท', beastno: 'แจ้งเตือนสัตว์', cloudr: 'กู้เซฟ', anncomp: 'สร้างประกาศ', specask: 'ขออนุญาตดู', 'online': 'ออนไลน์' };
      const mins = sec => sec >= 3600 ? Math.round(sec / 3600) + ' ชม.' : sec >= 60 ? Math.round(sec / 60) + ' นาที' : sec + ' วิ';
      const stat = (a, seen) => {
        if (!a) return { k: 9, t: '⚪ ไม่มีข้อมูล (ยังใช้เวอร์ชันเก่า)', c: '#888' };
        if (!a.hd && seen > 300) return { k: 8, t: '⚫ เงียบไป ' + mins(seen) + ' (ปิดเว็บ/เน็ตหลุด)', c: '#888' };
        if (a.er > 0 && a.sc === 'game') return { k: 0, t: '🔴 เจอ error ' + a.er + ' ครั้งใน 10 นาที', c: '#ff6b6b', x: a.em };
        if (a.hd) return { k: 6, t: '🙈 สลับไปแท็บอื่น/ย่อจอ', c: '#aaa' };
        if (a.sc !== 'game') return { k: 5, t: '🏠 อยู่' + (SCN[a.sc] || a.sc || 'หน้าอื่น'), c: '#9ad' };
        if (!a.al) return { k: 4, t: '🪦 ตัวละครเพิ่งตาย', c: '#bbb' };
        if (!a.pa && !a.md && !a.ch && a.yr > 150) return { k: 1, t: '🔴 อาจค้าง — เวลาในเกมไม่เดินมา ' + mins(a.yr), c: '#ff6b6b' };
        if (a.ia > 300) return { k: 3, t: '😴 เปิดทิ้งไว้ (ไม่ได้แตะ ' + mins(a.ia) + ')' + (a.au && !a.pa ? ' · เล่นอัตโนมัติอยู่' : ''), c: '#e8c86a' };
        if (a.pa) return { k: 2, t: '⏸ หยุดเกมไว้', c: '#e8c86a' };
        if (a.md) return { k: 2, t: '📋 เปิด' + (MDN[a.md] || 'หน้าต่าง ' + a.md), c: '#8fd18f' };
        if (a.ch) return { k: 2, t: '🤔 กำลังเลือกเหตุการณ์', c: '#8fd18f' };
        return { k: 2, t: '🟢 กำลังเล่น' + (a.au ? ' (อัตโนมัติ)' : ''), c: '#5fd47a' };
      };
      const WN = { m: '⚔️ ยุทธภพ', x: '☁️ เซียน', g: '🌟 โลกเทพ', b: '🐾 สัตว์' };
      const rows = (ids || []).map((x, i) => { let m = null, a = null; try { m = JSON.parse(metas[i]) } catch {} try { a = JSON.parse(acts[i]) } catch {} const seen = m ? Math.round((now - m.t) / 1000) : 999; return { id: x.slice(0, 4) + '…', d: m ? m.d : '-', b: m ? m.b : '-', o: m ? m.o : '-', c: m ? m.c : '-', ago: m ? seen : null, a, s: stat(a, seen) } }).sort((r1, r2) => r1.s.k - r2.s.k);
      if (a === 'who') return res.json({ n: rows.length, rows });
      const [lives, bl, done, rv, jl] = await pipe([['GET', 'lives'], ['LRANGE', 'bugs2', 0, 49], ['SMEMBERS', 'bugdone'], ['HLEN', 'reviews'], ['LRANGE', 'jserr', 0, 199]]);
      const jsg = {}; (jl || []).forEach(v => { try { const x = JSON.parse(v), k = x.m + '|' + x.l; if (!jsg[k]) jsg[k] = { n: 0, users: new Set(), last: x, vers: new Set() }; const g = jsg[k]; g.n++; g.users.add(x.u); g.vers.add(x.v); if (x.t > g.last.t) g.last = x } catch {} });
      const jsRows = Object.values(jsg).sort((g1, g2) => g2.last.t - g1.last.t), jsTop = jsRows.slice(0, 25);
      const jsNoise = g => /iabjs:|Java object is gone|chrome-extension:|moz-extension:|safari-extension:|^Script error\.?$/i.test(String(g.last.m || '') + ' ' + String(g.last.s || ''));
      const jsText = g => { const L = g.last, X = L.x || {}; return [`ข้อความ: ${L.m}`, `จำนวน: ${g.n} ครั้ง · ${g.users.size} คน · เวอร์ชัน v${[...g.vers].join(', v')}`, `ล่าสุด: ${new Date(L.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })} · ${L.d || '-'}${L.l ? ' · บรรทัด ' + L.l + ':' + L.c : ''}`, `ตอนเกิด: หน้า ${X.sc || '-'}${X.md ? ' · หน้าต่าง ' + X.md : ''}${X.ch ? ' · เหตุการณ์ ' + X.ch : ''}${X.ag ? ' · อายุ ' + X.ag + ' · ' + (X.fo || '') + ' · ' + (X.w || '') : ''}`, L.s ? `stack: ${L.s}` : ''].filter(Boolean).join('\n') };
      const ds = new Set(done || []), bugs = (bl || []).map(jp).filter(Boolean);
      let brd = []; try { const hid = new Set((await cmd('SMEMBERS', 'bdhide')) || []); hid.add('f18abdmw8fuj8d'); brd = ((await pipe(BD_CATS.map(c => ['ZREVRANGE', bdKey(c, now), 0, 9]))).flat() || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(x => x && x.lid && !hid.has(x.lid)) } catch {}
      const e = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const K = encodeURIComponent(AK);
      const avR = (await cmd('HGETALL', 'avq')) || [], avL = [];
      for (let i = 0; i < avR.length; i += 2) { const v = jp(avR[i + 1]); if (v) avL.push({ u: avR[i], ...v }) }
      avL.sort((x, y) => x.t - y.t);
      const avHtml = `<h2>🖼️ รูปโปรไฟล์รอตรวจ <small style="font-weight:normal;color:#aaa">· ${avL.length} รูป · รูปที่อัปโหลดเองจะให้คนอื่นเห็นได้หลังอนุมัติเท่านั้น · ไม่อนุมัติ = เตือนผู้เล่นให้เปลี่ยนรูป (3 ครั้งระงับอัปโหลด 30 วัน)</small></h2>${avL.length ? `<p><small>รูปถูกเบลอไว้ — แตะรูปเพื่อดูชัด</small></p>` + avL.slice(0, 40).map(x => `<div class="pl" id="av_${e(x.u)}" style="display:flex;gap:10px;align-items:center"><img src="${e(x.av)}" onclick="this.style.filter=this.style.filter?'':'blur(10px)'" style="width:72px;height:72px;border-radius:8px;filter:blur(10px);cursor:pointer;flex:none"><div style="flex:1"><b>${e(x.n)}</b><br><small>ไอดี ${e(String(x.id || '').slice(0, 6))}… · ${new Date(x.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</small><div style="margin-top:6px;display:flex;gap:6px"><button class="cpb" style="color:#7c7;border-color:#7c7" onclick="avMod('${e(x.u)}',1,this)">✅ อนุมัติ</button><button class="cpb" style="color:#ff8a8a;border-color:#ff8a8a" onclick="avMod('${e(x.u)}',0,this)">⛔ ไม่อนุมัติ + เตือน</button></div></div></div>`).join('') : '<p>ไม่มีรูปรอตรวจ</p>'}
<script>async function avMod(u,ok,b){if(!ok&&!confirm('ไม่อนุมัติรูปนี้ และเตือนผู้เล่นให้เปลี่ยนรูป?'))return;b.disabled=true;try{const r=await fetch('?a=avmod&key=${K}&u='+u+'&ok='+ok);const j=await r.json();const c=b.closest('.pl');if(j.ok){c.style.opacity=.35;b.parentNode.innerHTML=ok?'✅ อนุมัติแล้ว':'⛔ ไม่อนุมัติแล้ว · เตือนครั้งที่ '+(j.strikes||1)}else b.textContent='ไม่สำเร็จ'}catch(x){b.textContent='ไม่สำเร็จ';b.disabled=false}}</script>`;
      const afR = (await cmd('HGETALL', 'achf')) || [], afL = [];
      for (let i = 0; i < afR.length; i += 2) { const v = jp(afR[i + 1]); if (v) afL.push({ id: afR[i], n: v.n, t: v.t, u: v.u, an: (TITLES.a[afR[i]] || [afR[i]])[0], r: (TITLES.a[afR[i]] || [0, 0])[1] }) }
      afL.sort((x, y) => y.t - x.t);
      const afHtml = `<h2>👑 คนแรกของเซิร์ฟเวอร์ <small style="font-weight:normal;color:#aaa">· ${afL.length} รายการ · ระดับเทพขึ้นไป · ลบรายการที่น่าสงสัยได้ (คนถัดไปที่ทำได้จะกลายเป็นคนแรกแทน)</small></h2>${afL.length ? afL.slice(0, 60).map(x => `<div class="pl" id="af_${e(x.id)}"><div class="plh"><b>${e(x.an)}</b><span style="color:#aaa">${['ทั่วไป', 'หายาก', 'ล้ำค่า', 'ตำนาน', 'เทพ', 'อมตะ', '???'][x.r] || ''}</span></div><small>👑 ${e(x.n)} · ไอดี ${e(x.u || '?')}… · ${new Date(x.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</small><div style="margin-top:6px"><button class="cpb" onclick="afDel('${e(x.id)}',this)">🗑 ลบรายการนี้</button></div></div>`).join('') : '<p>ยังไม่มี</p>'}
<script>async function afDel(id,b){if(!confirm('ลบ "คนแรกของเซิร์ฟเวอร์" ของความสำเร็จนี้?'))return;b.disabled=true;try{const r=await fetch('?a=achfdel&key=${K}&aid='+encodeURIComponent(id));const j=await r.json();if(j.ok){b.textContent='ลบแล้ว';b.closest('.pl').style.opacity=.35}else b.textContent='ไม่สำเร็จ'}catch(x){b.textContent='ไม่สำเร็จ';b.disabled=false}}</script>`;
      const hvD = [0, 1, 2, 3, 4, 5, 6].map(k => thDay(now, k)), HW = ['new', 'old'];
      const hvR = await pipe([...HW.map(w => ['PFCOUNT', 'hv:' + hvD[0] + ':' + w]), ...HW.map(w => ['PFCOUNT', 'hv:' + hvD[1] + ':' + w]), ...HW.map(w => ['PFCOUNT', ...hvD.map(d => 'hv:' + d + ':' + w)]), ...HW.map(w => ['PFCOUNT', 'hv:all:' + w]), ['GET', 'migst:put:' + hvD[0]], ['GET', 'migst:get:' + hvD[0]], ['GET', 'migst:put:all'], ['GET', 'migst:get:all']]);
      const hvOn = { new: 0, old: 0, other: 0 }; (metas || []).forEach(m => { const o = (jp(m) || {}).o || ''; if ((jp(m) || {}).b === 'บอท') return; hvOn[/1inanovel\.com$/.test(o) ? 'new' : /vercel\.app$/.test(o) ? 'old' : 'other']++ });
      const hvN = i => +(hvR[i] || 0);
      const hvHtml = `<h2>🌐 เว็บใหม่ vs เว็บเก่า <small style="font-weight:normal;color:#aaa">· นับเครื่องที่เปิดเว็บ (ไม่นับซ้ำในวันเดียวกัน)</small></h2><div><span class="c"><b>${hvOn.new}</b>ออนไลน์ตอนนี้ที่ 1inanovel.com</span><span class="c"><b>${hvOn.old}</b>ออนไลน์ตอนนี้ที่ลิงก์เก่า</span>${hvOn.other ? `<span class="c"><b>${hvOn.other}</b>ไม่ระบุเว็บ</span>` : ''}</div>
<table style="border-collapse:collapse;margin:8px 0;font-size:14px;width:100%;max-width:520px"><tr style="color:#aaa"><td style="padding:4px 6px"></td><td style="padding:4px 6px">วันนี้</td><td style="padding:4px 6px">เมื่อวาน</td><td style="padding:4px 6px">7 วัน</td><td style="padding:4px 6px">ทั้งหมด</td></tr><tr><td style="padding:4px 6px">🆕 1inanovel.com</td><td style="padding:4px 6px"><b>${hvN(0)}</b></td><td style="padding:4px 6px">${hvN(2)}</td><td style="padding:4px 6px">${hvN(4)}</td><td style="padding:4px 6px">${hvN(6)}</td></tr><tr><td style="padding:4px 6px">🕰️ ลิงก์เก่า (.vercel.app)</td><td style="padding:4px 6px"><b>${hvN(1)}</b></td><td style="padding:4px 6px">${hvN(3)}</td><td style="padding:4px 6px">${hvN(5)}</td><td style="padding:4px 6px">${hvN(7)}</td></tr></table>
<p>📦 ย้ายเซฟ: วันนี้ส่งออกจากเว็บเก่า <b>${hvN(8)}</b> · รับเข้าเว็บใหม่สำเร็จ <b>${hvN(9)}</b> · รวมทั้งหมด ส่งออก ${hvN(10)} / รับสำเร็จ ${hvN(11)}<br><small>คนเปิดลิงก์เก่าจะถูกพาไปเว็บใหม่อัตโนมัติ · ตัวเลข "ลิงก์เก่า" ที่ลดลงเรื่อยๆ แปลว่าคนเปลี่ยนมาใช้ลิงก์ใหม่แล้ว · เริ่มนับตั้งแต่ 9 พ.ย. 2569 ค่ำ</small></p>`;
      const tDay = new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
      const tIps = (await cmd('ZREVRANGE', 'trap:ips', 0, 39)) || [], tInf = tIps.length ? await cmd('HMGET', 'trap:info', ...tIps) : [], tTtl = tIps.length ? await pipe(tIps.map(x => ['TTL', 'ban:' + x])) : [], tWl = tIps.length ? await pipe(tIps.map(x => ['EXISTS', 'banx:' + x])) : [];
      const [tN1, tN7] = await pipe([['GET', 'trap:n:' + tDay], ['GET', 'trap:n:' + new Date(now + 7 * 3600e3 - 86400e3).toISOString().slice(0, 10)]]);
      const tAgo = ms => { const s = Math.max(0, Math.round((now - ms) / 1000)); return s < 60 ? s + ' วิ' : s < 3600 ? Math.round(s / 60) + ' นาที' : s < 86400 ? Math.round(s / 3600) + ' ชม.' : Math.round(s / 86400) + ' วัน' };
      const tRows = tIps.map((x, i) => { const f = jp(tInf[i]) || { n: 0, p: [] }, tl = +tTtl[i] || -2; return { ip: x, f, ban: tl > 0 ? tl : 0, wl: +tWl[i] === 1 } });
      const secHtml = `<h2>🛡️ ผู้บุกรุก / บอทสแกนไฟล์ <small style="font-weight:normal;color:#aaa">· วันนี้ ${+(tN1 || 0)} ครั้ง · เมื่อวาน ${+(tN7 || 0)} ครั้ง</small></h2><p><small>บอทที่พยายามหาไฟล์ลับ (.env, .git, .aws, *.php …) จะได้ 404 เหมือนไม่มีอะไร แล้วถูกแบนจากระบบออนไลน์ 7 วันอัตโนมัติ · คนที่ยิง API ถี่ผิดปกติถูกแบน 30 นาที · ไฟล์ลับจริงไม่มีอยู่บนเว็บ (รหัสทั้งหมดอยู่ใน Environment Variables ของ Vercel)</small></p>${tRows.length ? tRows.map(r => `<div class="pl" id="ip_${e(r.ip).replace(/[:.]/g, '_')}"><div class="plh"><b>${r.f.fl ? '🌊' : '🕷️'} ${e(r.ip)}</b><span>${r.ban ? '<span style="color:#ff6b6b">⛔ แบนอยู่ อีก ' + tAgo(now - r.ban * 1000) + '</span>' : r.wl ? '<span style="color:#7c7">✅ ปลดแล้ว (ยกเว้น)</span>' : '<span style="color:#aaa">หมดเวลาแบน</span>'}</span></div><small>${r.f.n} ครั้ง · ล่าสุด ${tAgo(r.f.l || now)} ก่อน<br>${(r.f.p || []).map(e).join(' · ')}<br><span style="color:#888">${e(r.f.ua || '')}</span></small><div style="margin-top:6px;display:flex;gap:6px">${r.ban ? `<button class="cpb" onclick="ipB('${e(r.ip)}','0',this)">ปลดบล็อก</button>` : `<button class="cpb" onclick="ipB('${e(r.ip)}','1',this)">บล็อก 30 วัน</button>`}<button class="cpb" style="color:#aaa;border-color:#555" onclick="ipB('${e(r.ip)}','del',this)">ลบออกจากรายการ</button></div></div>`).join('') : '<p>ยังไม่มีใครมาสแกน 🎉</p>'}
<script>async function ipB(ip,on,b){if(on==='1'&&!confirm('บล็อก '+ip+' จากระบบออนไลน์ 30 วัน?'))return;b.disabled=true;try{const r=await fetch('?a=ipban&key=${K}&ip='+encodeURIComponent(ip)+'&on='+on);const j=await r.json();if(j.ok){b.textContent=on==='1'?'บล็อกแล้ว':on==='del'?'ลบแล้ว':'ปลดแล้ว';if(on==='del')b.closest('.pl').style.opacity=.35}else b.textContent='ไม่สำเร็จ'}catch(x){b.textContent='ไม่สำเร็จ';b.disabled=false}}</script>`;
      const [acL0, clL0, chS] = await pipe([['LRANGE', 'acsus', 0, 79], ['LRANGE', 'cheatlog', 0, 59], ['SMEMBERS', 'cheaters']]);
      const chSet = new Set(chS || []);
      const AC_WHY = w => { w = String(w || '').replace(/^tamper:/, ''); return /^console/.test(w) ? '🔴 แก้ค่าผ่านคอนโซล (' + w.slice(8) + ')' : w === 'save-edit' ? '🔴 แก้ไฟล์เซฟ' : w === 'srv-cap' ? '🔴 ค่าเกินขีดที่เป็นไปได้ (เซิร์ฟเวอร์)' : w === 'srv-jump' ? '🟠 พลังกระโดดเกิน ×1000 ใน 3 ปี (เซิร์ฟเวอร์)' : /^cap/.test(w) ? '🟠 ค่าเกินเพดาน (' + w + ')' : /^jump/.test(w) ? '🟡 ค่ากระโดดเร็ว (' + w.slice(5) + ')' : w === 'banned' ? '🚫 ถูกแบน' : w === 'pow-age' ? '🟡 พลังสูงเกินอายุ' : w === 'stat' ? '🟠 ค่าเกินขีด' : w === 'score' ? '🟠 คะแนนเกินค่าสถานะ' : '⚪ ' + w };
      const acRow = (x, src) => { const f = x.fid || x.id || '', pre = f.slice(0, 10); return `<div class="pl"><div class="plh"><b>${e(x.n || '-')}</b><small>${tAgo(x.t || now)} ที่แล้ว · ${src}</small></div>${AC_WHY(x.why)} · อายุ ${(+x.age || 0).toLocaleString('th-TH')}${x.st ? ` · ⚔️ ${(+x.st.pow || 0).toLocaleString('en-US')} · ⭐ ${(+x.st.fame || 0).toLocaleString('en-US')}` : x.s ? ` · คะแนน ${(+x.s || 0).toLocaleString('en-US')}` : ''} · <small>${e(pre)}${chSet.has(f) ? ' · 🚫 แบนแล้ว' : ''}</small><br><a class="cpb" style="text-decoration:none" target="_blank" href="?a=acinv&key=${K}&p=${e(pre.slice(0, 8))}&h=1">🔍 ดูประวัติ</a> <button class="cpb" onclick="acB('${e(pre)}','1',this)">🚫 แบน</button> <button class="cpb" onclick="acB('${e(pre)}','0',this)">✅ ล้างธง/ปลดแบน</button></div>` };
      const acL = (acL0 || []).map(jp).filter(Boolean), clL = (clL0 || []).map(jp).filter(Boolean);
      const spD = [0, 1, 2, 3, 4, 5, 6].map(k => thDay(now, k));
      const spR = await pipe([...spD.map(d => ['HGETALL', 'supd:' + d]), ['PFCOUNT', 'supu:' + spD[0] + ':view'], ['PFCOUNT', ...spD.map(d => 'supu:' + d + ':view')], ['ZREVRANGE', 'suppayz', 0, 59], ['LRANGE', 'supev', 0, 59], ['SCARD', 'mwwait']]);
      const spH = i => { const r = spR[i] || [], o = {}; for (let k = 0; k < r.length; k += 2)o[r[k]] = +r[k + 1] || 0; return o }, spT = spH(0), sp7 = { view: 0, save: 0, paid: 0 }; for (let i = 0; i < 7; i++) { const o = spH(i); for (const k in sp7) sp7[k] += o[k] || 0 }
      const spIds = spR[9] || [], spPay = spIds.length ? ((await cmd('HMGET', 'suppay', ...spIds)) || []).map(jp).filter(Boolean) : [], spEv = (spR[10] || []).map(jp).filter(Boolean);
      const spSum = spPay.filter(x => x.st === 'ok').reduce((a, x) => a + (+x.amt || 0), 0);
      const spRow = x => `<div class="pl" style="${x.st === 'ok' ? 'border-left:4px solid #6ad06a' : x.st === 'no' ? 'border-left:4px solid #d05a5a;opacity:.6' : 'border-left:4px solid #f0c860'}"><div class="plh"><b>💰 ${x.amt ? (+x.amt).toLocaleString('th-TH') + ' บาท' : 'ไม่ระบุยอด'}</b><small>${tAgo(x.t)} ที่แล้ว · ${x.st === 'ok' ? '✅ ยืนยันแล้ว' : x.st === 'no' ? '❌ ไม่พบยอด' : '⏳ รอตรวจ'}</small></div>ชื่อบัญชีที่โอน: <b>${e(x.pn || '-')}</b> · เวลาโอน ${e(x.tm || '-')}<br>ผู้เล่น: ${e(x.n)} <small>(${e(String(x.fid || '').slice(0, 10))} · ${e(x.dev || '')}${x.src ? ' · เปิดจาก' + e(x.src) : ''})</small>${x.msg ? `<br>💬 “${e(x.msg)}”` : ''}${x.img ? `<br><a href="?a=supimg&key=${K}&i=${x.i}" target="_blank"><img src="?a=supimg&key=${K}&i=${x.i}" style="max-width:140px;max-height:200px;border-radius:6px;margin-top:4px;border:1px solid #444" loading="lazy"></a>` : ''}<div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap"><button class="cpb" onclick="spM('${x.i}','ok',this)">✅ ยืนยันว่าได้รับ</button><button class="cpb" onclick="spM('${x.i}','no',this)">❌ ไม่พบยอด</button><button class="cpb" onclick="spM('${x.i}','',this)">↩️ รอตรวจ</button><button class="cpb" onclick="spM('${x.i}','del',this)">🗑️ ลบ</button></div></div>`;
      const EVN = { view: '👀 เปิดดู QR', save: '⬇️ บันทึกรูป QR', stay: '⏱️ เปิด QR ค้างไว้นาน (น่าจะกำลังสแกน)' };
      const supHtml = `<h2>🙏 ค่าสนับสนุน <small style="font-weight:normal;color:#aaa">· สแกน QR เกิดในแอปธนาคาร เว็บจึงรู้ได้แค่ว่าใคร <b>เปิดดู/บันทึก QR</b> และใคร <b>กดแจ้งว่าโอนแล้ว</b> — เอาชื่อบัญชี เวลา และยอดไปเทียบกับรายการในแอปธนาคาร</small></h2>
<div><span class="c"><b>${spT.view || 0}</b>เปิดดู QR วันนี้ (${+spR[7] || 0} คน)</span><span class="c"><b>${spT.stay || 0}</b>เปิดค้าง (น่าจะสแกน) วันนี้</span><span class="c"><b>${spT.save || 0}</b>บันทึก QR วันนี้</span><span class="c"><b>${spT.paid || 0}</b>แจ้งโอนวันนี้</span><span class="c"><b>${sp7.view}</b>เปิดดู 7 วัน (${+spR[8] || 0} คน)</span><span class="c"><b>${sp7.paid}</b>แจ้งโอน 7 วัน</span><span class="c"><b>${spSum.toLocaleString('th-TH')}</b>บาทที่ยืนยันแล้ว</span><span class="c"><b>${+spR[11] || 0}</b>คนกดรอโลกปัจจุบัน 🏙️</span></div>
<h3>📨 แจ้งว่าโอนแล้ว (${spPay.length})</h3>${spPay.length ? spPay.map(spRow).join('') : '<p><small>ยังไม่มีคนแจ้ง</small></p>'}
<details><summary>👀 คนที่เปิดดู/บันทึก QR ล่าสุด (${spEv.length})</summary>${spEv.map(x => `<div class="pl"><div class="plh"><b>${e(x.n)}</b><small>${tAgo(x.t)} ที่แล้ว</small></div>${EVN[x.e] || e(x.e)} · <small>${e(String(x.fid || '').slice(0, 10))} · ${e(x.dev || '')}${x.src ? ' · เปิดจาก' + e(x.src) : ''}</small></div>`).join('') || '<p><small>ยังไม่มี</small></p>'}</details>
<script>async function spM(i,v,b){if(v==='del'&&!confirm('ลบรายการนี้?'))return;b.disabled=true;try{const r=await fetch('?a=supmark&key=${K}&i='+i+'&v='+v);const j=await r.json();b.textContent=j.ok?'✓ บันทึกแล้ว':'ไม่สำเร็จ';if(j.ok)setTimeout(()=>location.reload(),500)}catch(x){b.textContent='ไม่สำเร็จ'}}</script>`;
      const acHtml = `<h2>🕵️ ผู้ต้องสงสัยโกง <small style="font-weight:normal;color:#aaa">· 🔴 = จับได้ชัด (แก้ค่าผ่านคอนโซล/แก้เซฟ) ถูกตัดจากระบบออนไลน์อัตโนมัติ · 🟡🟠 = สัญญาณให้ตรวจเอง</small></h2>${acL.length ? acL.slice(0, 40).map(x => acRow(x, 'ระบบจับ')).join('') : '<p><small>ยังไม่มี</small></p>'}<details><summary>📋 ถูกตัดจากทำเนียบล่าสุด (${clL.length})</summary>${clL.map(x => acRow(x, 'ทำเนียบ')).join('')}</details>
<script>async function acB(p,on,b){if(!confirm(on==='1'?'แบนผู้เล่นนี้จากระบบออนไลน์ทั้งหมด?':'ล้างธงและปลดแบนผู้เล่นนี้?'))return;b.disabled=true;try{const r=await fetch('?a=acban&key=${K}&p='+p+'&on='+on);const j=await r.json();b.textContent=j.ok?(on==='1'?'แบนแล้ว ('+j.n+')':'ปลดแล้ว ('+j.n+')'):'ไม่สำเร็จ'}catch(x){b.textContent='ไม่สำเร็จ'}}</script>`;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="60"><title>ผู้ดูแล · 1 ใน นวนิยาย</title>
<style>.cpb{background:#2a2433;color:#f0c860;border:1px solid #f0c860;border-radius:6px;padding:4px 10px;font-size:13px;cursor:pointer}.pl{background:#211d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.plh{display:flex;flex-wrap:wrap;gap:6px;justify-content:space-between;align-items:baseline}.plh small,.pl small{color:#aaa}body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;margin:0;padding:14px;max-width:760px;margin:auto}h1{font-size:20px}h2{font-size:16px;margin-top:22px;color:#f0c860}table{width:100%;border-collapse:collapse;font-size:13px}td,th{padding:6px;border-bottom:1px solid #333;text-align:left}.c{display:inline-block;background:#2a2433;border-radius:8px;padding:8px 12px;margin:4px 6px 4px 0}.c b{font-size:20px;display:block;color:#f0c860}.bug{background:#221d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.bug.done{opacity:.55}a{color:#8fd0ff}small{opacity:.6}</style></head><body>
<h1>🛡️ หน้าผู้ดูแล</h1><div><span class="c"><b>${rows.filter(r => r.b !== 'บอท').length}</b>ออนไลน์ (10 นาที)</span><span class="c"><b>${+(lives || 0)}</b>ชีวิตที่จบแล้ว</span><span class="c"><b>${bugs.length}</b>เรื่องบนกระดานบั๊ก</span><span class="c"><b>${rv || 0}</b>ความคิดเห็น</span></div>
<h2>คนที่ออนไลน์ตอนนี้ <small style="font-weight:normal;color:#aaa">· รีเฟรชเองทุก 1 นาที</small></h2><p><small>🟢 กำลังเล่น · 🤔/📋 เลือกเหตุการณ์/เปิดหน้าต่าง · ⏸ หยุดเกม · 😴 เปิดทิ้งไว้ · 🙈 สลับแท็บ · 🏠 อยู่หน้าอื่น · 🔴 อาจค้าง/มี error</small></p>${rows.map(r => { const a = r.a || {}; return `<div class="pl" style="border-left:4px solid ${r.s.c}"><div class="plh"><b style="color:${r.s.c}">${e(r.s.t)}</b><small>${e(r.id)} · ${e(r.d)} · ${e(r.b)} · ${e(r.c)} · อัปเดต ${r.ago == null ? '-' : r.ago + ' วิ'}ก่อน${a.v ? ' · v' + e(a.v) : ''}</small></div>${a.nm ? `<div>👤 <b>${e(a.nm)}</b> อายุ ${e(a.ag)} ปี · ${e(WN[a.w] || '')} · ${e(a.ri || '')}${a.sp ? ' · ความเร็ว ' + e(a.sp) + '×' : ''}</div>` : ''}${r.a ? `<div><small>หน้า: ${e(SCN[a.sc] || a.sc || '-')}${a.md ? ' · หน้าต่าง: ' + e(MDN[a.md] || a.md) : ''} · แตะล่าสุด ${mins(a.ia)}ก่อน${a.sc === 'game' && a.yr >= 0 ? ' · ปีในเกมล่าสุดผ่านไปเมื่อ ' + mins(a.yr) + 'ก่อน' : ''}</small></div>` : ''}${r.s.x ? `<div><small style="color:#ff9b9b">error ล่าสุด: ${e(r.s.x)}</small></div>` : ''}</div>` }).join('') || '<p><small>ตอนนี้ไม่มีใครออนไลน์</small></p>'}
${avHtml}
${supHtml}
${hvHtml}
${secHtml}
${acHtml}
${afHtml}
<h2>🐞 error จากเครื่องผู้เล่น <small style="font-weight:normal;color:#aaa">· 200 ครั้งล่าสุด จัดกลุ่มตามข้อความ</small></h2>${jsTop.length ? `<p><button class="cpb" onclick="cpErr(-1,this)">📋 ก็อปปี้ error ทั้งหมดไปให้ Claude แก้</button> <small>(ไม่รวมอันที่มาจากเบราว์เซอร์)</small></p>` : ''}${jsTop.map((g, gi) => `<div class="pl" style="border-left:4px solid ${jsNoise(g) ? '#777' : '#ff6b6b'}"><div class="plh"><b style="color:${jsNoise(g) ? '#aaa' : '#ff9b9b'}">${e(g.last.m)}</b><small>${g.n} ครั้ง · ${g.users.size} คน · v${e([...g.vers].join(', v'))}</small></div>${jsNoise(g) ? '<div><small style="color:#e8c86a">🔕 มาจากเบราว์เซอร์ในแอปหรือส่วนขยาย ไม่ใช่บัคของเกม</small></div>' : ''}<div><small>ล่าสุด ${new Date(g.last.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })} · ${e(g.last.d)}${g.last.l ? ' · บรรทัด ' + g.last.l + ':' + g.last.c : ''} · หน้า ${e(g.last.x.sc)}${g.last.x.md ? ' · หน้าต่าง ' + e(g.last.x.md) : ''}${g.last.x.ch ? ' · เหตุการณ์ ' + e(g.last.x.ch) : ''}${g.last.x.ag ? ' · อายุ ' + g.last.x.ag + ' · ' + e(g.last.x.fo) + ' · ' + e(g.last.x.w) : ''}</small></div>${g.last.s ? `<div><small style="color:#aaa;word-break:break-all">${e(g.last.s)}</small></div>` : ''}<div style="margin-top:6px"><button class="cpb" onclick="cpErr(${gi},this)">📋 ก็อปปี้ให้ Claude</button></div></div>`).join('') || '<p><small>ยังไม่มี error</small></p>'}
<script>const ERR_TX=${JSON.stringify(jsTop.map(g => ({ t: jsText(g), n: jsNoise(g) ? 1 : 0 }))).replace(/</g, '\\u003c')};
function cpErr(i,b){const t=i<0?'ช่วยแก้ error ของเกมเหล่านี้ให้หน่อย (จากหน้าผู้ดูแล)\\n\\n'+ERR_TX.filter(x=>!x.n).map((x,k)=>'#'+(k+1)+'\\n'+x.t).join('\\n\\n'):'ช่วยแก้ error นี้ของเกมให้หน่อย\\n\\n'+ERR_TX[i].t;const ok=()=>{const o=b.textContent;b.textContent='✅ ก็อปปี้แล้ว — วางในแชทกับ Claude ได้เลย';setTimeout(()=>b.textContent=o,2500)};
 const fb=()=>{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(x){prompt('ก็อปปี้ข้อความนี้',t)}a.remove()};
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(ok,fb);else fb()}</script>
<h2>🏆 ทำเนียบสัปดาห์นี้ <small style="font-weight:normal;color:#aaa">· กด 🗑 เพื่อลบรายการที่คะแนนผิดปกติ</small></h2>${brd.length ? brd.map((x, i) => `<div class="pl" id="bd_${e(x.lid)}"><div class="plh"><b>#${i + 1} ${e(x.n)} · ${(+x.s || 0).toLocaleString('th-TH')}</b><button onclick="bdRm('${e(x.lid)}',this)" style="background:#3a1d24;color:#ff9b9b;border:1px solid #c55;border-radius:6px;padding:3px 10px">🗑 ลบ</button></div><small>${e(x.r)} · ${e(x.f)} · อายุ ${(+x.age || 0).toLocaleString('th-TH')}${x.x ? ' · ☁️' : ''} · ${e(x.c)}</small></div>`).join('') : '<p><small>ยังไม่มีชีวิตในทำเนียบสัปดาห์นี้</small></p>'}
<script>async function bdRm(l,btn){if(!confirm('ลบรายการนี้ออกจากทำเนียบ?'))return;btn.disabled=true;try{const r=await fetch('?a=bdrm&key=${K}&l='+l);const j=await r.json();if(j.ok){const d=document.getElementById('bd_'+l);d.style.opacity=.35;btn.textContent='ลบแล้ว'}else{btn.disabled=false;alert('ลบไม่สำเร็จ')}}catch(x){btn.disabled=false;alert('ลบไม่สำเร็จ')}}</script>
<h2>กระดานบั๊ก</h2>${bugs.map(b => `<div class="bug ${ds.has(b.i) ? 'done' : ''}">${b.k === 'idea' ? '💡' : '🐞'} <b>${e(b.n)}</b> <small>v${e(b.v)} · ${new Date(b.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</small><br>${e(b.x)}<br>${ds.has(b.i) ? `✅ แก้แล้ว · <a href="?a=bugfix&key=${K}&bid=${b.i}&undo=1">ยกเลิก</a>` : `<a href="?a=bugfix&key=${K}&bid=${b.i}">ติด ✅ แก้แล้ว</a>`}</div>`).join('') || '<p>ยังไม่มี</p>'}
<p><small>หน้านี้เปิดได้เฉพาะลิงก์ที่มีรหัสผู้ดูแล อย่าแชร์ลิงก์นี้</small></p></body></html>`);
    }
    if (a === 'trk') {
      const pg = String(qOf(req).p || '');
      const PAGES = ['chat', 'live', 'board', 'arena', 'me', 'spec'];
      if (!okId(id) || !PAGES.includes(pg)) return res.json({ ok: 0 });
      const ua = String(req.headers['user-agent'] || '');
      if (/bot|crawl|spider|headless|preview/i.test(ua)) return res.json({ ok: 0 });
      const day = new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
      const first = await cmd('SET', 'trl:' + id + ':' + pg, 1, 'NX', 'EX', 30);
      if (!first) return res.json({ ok: 1 });
      const ev = { u: id.slice(0, 4), p: pg, t: now, d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม' };
      await pipe([['HINCRBY', 'trk:' + day, pg, 1], ['EXPIRE', 'trk:' + day, 86400 * 35], ['SADD', 'trku:' + day + ':' + pg, id], ['EXPIRE', 'trku:' + day + ':' + pg, 86400 * 35], ['SADD', 'trku:' + day, id], ['EXPIRE', 'trku:' + day, 86400 * 35], ['LPUSH', 'trklog', JSON.stringify(ev)], ['LTRIM', 'trklog', 0, 299]]);
      return res.json({ ok: 1 });
    }
    if (a === 'trkget') {
      const AK = ADM_KEY;
      if (!AK || String(qOf(req).key || '') !== AK) return res.status(403).json({ err: 'forbidden' });
      const PAGES = ['chat', 'live', 'board', 'arena', 'me', 'spec'], days = [];
      for (let i = 0; i < 7; i++) days.push(new Date(now + 7 * 3600e3 - i * 86400e3).toISOString().slice(0, 10));
      const ops = [];
      days.forEach(d => { ops.push(['HGETALL', 'trk:' + d], ['SCARD', 'trku:' + d]); PAGES.forEach(p => ops.push(['SCARD', 'trku:' + d + ':' + p])) });
      ops.push(['LRANGE', 'trklog', 0, 99]);
      const r = await pipe(ops); let k = 0;
      const out = days.map(d => { const h = r[k++] || []; const clicks = {}; for (let i = 0; i < h.length; i += 2) clicks[h[i]] = +h[i + 1]; const uniq = +r[k++] || 0; const up = {}; PAGES.forEach(p => { up[p] = +r[k++] || 0 }); return { d, uniq, clicks, up } });
      const log = (r[k] || []).map(jp).filter(Boolean);
      return res.json({ days: out, log });
    }
    if (a === 'chat') {
      const [list, hidden] = await pipe([['LRANGE', 'chat', 0, 79], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []);
      const ms = (list || []).map(jp).filter(Boolean).filter(m => !hs.has(m.i));
      const pus = [...new Set(ms.map(m => m.pu).filter(Boolean))];
      const pv = pus.length ? await cmd('HMGET', 'prof', ...pus) : [];
      const p = {}; pus.forEach((u, i) => { if (pv[i]) { try { p[u] = JSON.parse(pv[i]) } catch {} } });
      return res.json({ m: ms, p, ann: await annPoll(await annGet(), id) });
    }
    if (a === 'bdrm') {
      // ผู้ดูแลเท่านั้น: เอาชีวิตออกจากทำเนียบ (ทั้งสัปดาห์นี้และสัปดาห์ก่อน) และกันไม่ให้กลับมาอีก
      const q = qOf(req);
      if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      const lid = String(q.l || b.l || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      if (lid.length < 6) return res.json({ err: 'lid' });
      const prevW = week(new Date(now - 7 * 86400e3)); let removed = 0;
      for (const k0 of BD_CATS.flatMap(c => ['d', 'w', 'm'].flatMap(p0 => [bdKeyP(p0, c, now), bdKeyP(p0, c, now, 1)]))) { const all = await cmd('ZRANGE', k0, 0, -1); for (const m of (all || [])) { try { if (JSON.parse(m).lid === lid) { await cmd('ZREM', k0, m); removed++ } } catch {} } }
      await cmd('SADD', 'bdhide', lid);
      if (q.undo === '1') { await cmd('SREM', 'bdhide', lid); return res.json({ ok: 1, undo: 1 }) }
      return res.json({ ok: 1, removed });
    }
    // แจกรางวัลอันดับ 1–3 ของเมื่อวาน (ครั้งเดียวต่อวัน) · ล้างทำเนียบรุ่นเก่าครั้งเดียว
    const bdSettle1 = async (p, flag, ex) => { try { if (!(await cmd('SET', flag, 1, 'NX', 'EX', 86400 * ex))) return;
      const R1 = await pipe(BD_CATS.map(c => ['ZREVRANGE', bdKeyP(p, c, now, 1), 0, 9])), lab = flag.split(':').slice(1).join(':');
      for (let k = 0; k < BD_CATS.length; k++) { const L1 = (R1[k] || []).map(jp).filter(x => x && x.lid && !x.cu); const seen = new Set(); let r = 0;
        for (const x of L1) { if (r >= 3) break; const own = await cmd('GET', 'lifeo:' + x.lid); if (!own || seen.has(own) || await cmd('SISMEMBER', 'cheaters', own)) continue; seen.add(own); r++;
          const isC = BD_CATS[k] === 'c', TT = isC ? RKT_C : RKT, hf = isC ? p + 'c' : p, cur = jp(await cmd('HGET', 'rkttl:' + own, hf)), nt = { t: TT[p][r], r, c: BD_CATS[k], exp: now + RKT_EXP[p], at: now };
          const L2 = [['LPUSH', 'bdrw:' + own, JSON.stringify({ p, c: BD_CATS[k], r, d: lab, n: x.n, s: x.s, tt: TT[p][r], exp: nt.exp, ...(x.ch ? { ch: x.ch } : {}) })], ['EXPIRE', 'bdrw:' + own, 86400 * 60], ['HINCRBY', 'bdwins', own, 1]];
          if (!cur || cur.exp < now || r <= cur.r) L2.push(['HSET', 'rkttl:' + own, hf, JSON.stringify(nt)], ['EXPIRE', 'rkttl:' + own, 86400 * 40]);
          await pipe(L2) } } } catch {} };
    const bdSettle = async () => { const yk = new Date(now + 7 * 3600e3 - 86400e3).toISOString().slice(0, 10);
      await bdSettle1('d', 'bdset:' + yk, 7); await bdSettle1('w', 'bdsetw:' + week(new Date(now - 7 * 86400e3)), 30); await bdSettle1('m', 'bdsetm:' + bdMon(now, 1), 90) };
    const bdWipe = async () => { try { if (!(await cmd('SET', 'bd3init', 1, 'NX'))) return; let cur = '0', n = 0; do { const r = await cmd('SCAN', cur, 'MATCH', 'bd2:*', 'COUNT', 500); cur = String(r[0]); if (r[1].length) await cmd('DEL', ...r[1]); n++ } while (cur !== '0' && n < 200); await cmd('DEL', 'bdhide') } catch {} };
    if (a === 'board') {
      await bdWipe(); await bdSettle();
      const ar = await cmd('ZREVRANGE', 'arenaW:' + W, 0, 9, 'WITHSCORES');
      const per = ['d', 'w', 'm'].includes(String(b.p || qOf(req).p || 'd')) ? String(b.p || qOf(req).p || 'd') : 'd';
      const Q = []; BD_CATS.forEach(c => { Q.push(['ZREVRANGE', bdKeyP(per, c, now), 0, 39]); Q.push(['ZREVRANGE', bdKeyP(per, c, now, 1), 0, 2]) });
      const R0 = await pipe(Q);
      const hide = new Set(['f18abdmw8fuj8d', ...((await cmd('SMEMBERS', 'bdhide')) || [])]);
      const pj = l => (l || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(j => j && !j.cu && !(j.lid && hide.has(j.lid)));
      let T = [], Pv = [], CT = [], CP = []; BD_CATS.forEach((c, k) => { const a1 = pj(R0[k * 2]).slice(0, 20), a2 = pj(R0[k * 2 + 1]).slice(0, 3); if (c === 'c') { CT = a1; CP = a2 } else { T = T.concat(a1); Pv = Pv.concat(a2) } });
      const arena = []; for (let i = 0; i < (ar || []).length; i += 2) arena.push({ n: ar[i], w: +ar[i + 1] });
      const all = T.concat(Pv, CT, CP).filter(x => x.lid);
      const pubs = all.length ? await cmd('MGET', ...all.map(x => 'lifep:' + x.lid)) : [];
      const pm = {}; all.forEach((x, i) => pm[x.lid] = pubs[i] === '1' ? 1 : pubs[i] === '2' ? 2 : 0);
      const admB = !!ADM_KEY && String(qOf(req).key || '') === ADM_KEY;
      const fix = l => l.map(x => { const v = x.lid ? pm[x.lid] || 0 : 0; const o = Object.assign(x, { pub: v === 1 || (admB && x.lid) ? 1 : 0 }); if (v === 2 && !admB) { o.n = 'ผู้ไม่ประสงค์ออกนาม'; o.f = ''; o.anon = 1 } return o });
      return res.json({ top: fix(T), prev: fix(Pv), ctop: fix(CT), cprev: fix(CP), arena, daily: 1, p: per });
    }
    if (a === 'bdrw') {
      if (!okId(id)) return res.json({ l: [] });
      await bdSettle();
      const [l, , rh] = await pipe([['LRANGE', 'bdrw:' + id, 0, 49], ['DEL', 'bdrw:' + id], ['HGETALL', 'rkttl:' + id]]);
      const rk = []; for (let i = 0; i < (rh || []).length; i += 2) { const v = jp(rh[i + 1]); if (v && v.exp > now) rk.push(Object.assign({ p: rh[i] }, v)) }
      return res.json({ l: (l || []).map(jp).filter(Boolean), rk });
    }
    if (a === 'load') {
      const code = String(qOf(req).code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
      const d = code ? await cmd('GET', 'cs:' + code) : null;
      if (!d) return res.status(404).json({ err: 'notfound' });
      return res.json({ d });
    }
    if (a === 'bugs') {
      const [list, hidden] = await pipe([['LRANGE', 'bugs2', 0, 59], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []);
      const L = (list || []).map(jp).filter(Boolean).filter(m => !hs.has(m.i));
      const cnt = L.length ? await pipe(L.map(m => ['SCARD', 'bv:' + m.i])) : [];
      const done = await cmd('SMEMBERS', 'bugdone');
      const ds = new Set(done || []);
      const rp = L.length ? await cmd('HMGET', 'replies', ...L.map(m => 'b:' + m.i)) : [];
      const [own, ed] = L.length ? await pipe([['HMGET', 'bugown', ...L.map(m => m.i)], ['HMGET', 'bugedit', ...L.map(m => m.i)]]) : [[], []];
      const me = String(id || '');
      return res.json({ m: L.map((m, i) => { let e = null; try { e = ed && ed[i] ? JSON.parse(ed[i]) : null } catch {} const o = own && own[i]; const mine = !!me && (o ? o === me : (m.u && m.u === me.slice(0, 4))); const r0 = Object.assign(m, { c: cnt[i] || 0, d: ds.has(m.i) ? 1 : 0, rp: rp[i] ? JSON.parse(rp[i]) : null, me: mine ? 1 : 0 }); if (e) { r0.x = e.x; r0.e = e.t } delete r0.u; return r0 }) });
    }
    if (a === 'reviews') {
      const [all, hidden] = await pipe([['HVALS', 'reviews'], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []);
      const L0 = (all || []).map(jp).filter(Boolean).filter(m => !hs.has(m.i)).sort((x, y) => y.t - x.t);
      const rpr = L0.length ? await cmd('HMGET', 'replies', ...L0.map(m => 'r:' + m.i)) : [];
      const myR = 'r' + String(id || '').slice(0, 8);
      const L = L0.map((m, i) => Object.assign(m, { rp: rpr[i] ? JSON.parse(rpr[i]) : null, me: id && m.i === myR ? 1 : 0 }));
      const avg = L.length ? L.reduce((s0, m) => s0 + m.r, 0) / L.length : 0;
      const dist = [1, 2, 3, 4, 5].map(r => L.filter(m => m.r === r).length);
      return res.json({ n: L.length, avg, dist, m: L.slice(0, 80) });
    }
    if (a === 'livelist') {
      const isAdm = !!ADM_KEY && String(qOf(req).key || '') === ADM_KEY;
      if (isAdm) {
        const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 90e3, '+inf']]);
        const all = [...(pub || []).map(x => [x, 'live:', 0]), ...(prv || []).filter(x => !(pub || []).includes(x)).map(x => [x, 'livep:', 1])];

        const vals = all.length ? await cmd('MGET', ...all.map(x => x[1] + x[0])) : [];
        const cnt = all.length ? await pipe(all.map(x => ['ZCOUNT', 'watch:' + x[0], now - 25e3, '+inf'])) : [];
        const lms = all.length ? await cmd('HMGET', 'lm', ...all.map(x => x[0])) : [];
        const l = [];
        all.forEach(([x, , pv], i) => { if (!vals[i]) return; try { const s0 = JSON.parse(vals[i]); l.push({ k: x.slice(0, 6) + x.slice(-4), id: x.slice(0, 6), n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, w: cnt[i] || 0, pv, m: (() => { try { return JSON.parse(lms[i]) } catch { return null } })() }) } catch {} });
        await pipe([['ZREMRANGEBYSCORE', 'livezp', 0, now - 180e3]]);
        const onIds = await cmd('ZRANGEBYSCORE', 'online', now - 600e3, '+inf');
        const liveSet = new Set(all.map(x => x[0]));
        const rest = (onIds || []).filter(x => !liveSet.has(x));
        const metas = rest.length ? await cmd('HMGET', 'om', ...rest) : [];
        const idle = rest.map((x, i) => { let m = {}; try { m = JSON.parse(metas[i] || '{}') } catch {} return { id: x.slice(0, 4), d: m.d, b: m.b, v: m.v || '', ago: Math.round((now - (m.t || now)) / 1000) } }).filter(x => x.b !== 'บอท');
        return res.json({ l: l.sort((p, q) => q.age - p.age).slice(0, 80), adm: 1, idle });
      }
      const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf');
      if (!ids || !ids.length) return res.json({ l: [] });
      const vals = await cmd('MGET', ...ids.map(x => 'live:' + x));
      const cnt = await pipe(ids.map(x => ['ZCOUNT', 'watch:' + x, now - 25e3, '+inf']));
      const l = [];
      ids.forEach((x, i) => { if (!vals[i]) return; try { const s0 = JSON.parse(vals[i]); l.push({ k: x.slice(0, 6) + x.slice(-4), id: x.slice(0, 6), n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, w: cnt[i] || 0 }) } catch {} });
      await cmd('ZREMRANGEBYSCORE', 'livez', 0, now - 120e3);
      return res.json({ l: l.sort((p, q) => q.w - p.w || q.age - p.age).slice(0, 40) });
    }
    if (a === 'liveget') {
      const k2 = String(qOf(req).t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (ADM_KEY && String(qOf(req).key || '') === ADM_KEY) {
        const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 90e3, '+inf']]);
        const f1 = (pub || []).find(x => x.slice(0, 6) + x.slice(-4) === k2), f2 = (prv || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
        const v = f1 ? await cmd('GET', 'live:' + f1) : f2 ? await cmd('GET', 'livep:' + f2) : null;
        if (!v) return res.status(404).json({ err: 'off' });
        const [, , w] = await pipe([['ZADD', 'watcha:' + (f1 || f2), now, 'adm'], ['EXPIRE', 'watcha:' + (f1 || f2), 120], ['ZCOUNT', 'watch:' + (f1 || f2), now - 25e3, '+inf']]);
        return res.json({ s: JSON.parse(v), w: w || 0, adm: 1, pv: f1 ? 0 : 1 });
      }
      const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf');
      const full = (ids || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
      if (!full) return res.status(404).json({ err: 'off' });
      const v = await cmd('GET', 'live:' + full);
      if (!v) return res.status(404).json({ err: 'off' });
      const viewer = okId(id) ? id : 'anon' + (req.headers['x-forwarded-for'] || '').slice(0, 15);
      const [, , w] = await pipe([['ZADD', 'watch:' + full, now, viewer], ['ZREMRANGEBYSCORE', 'watch:' + full, 0, now - 25e3], ['ZCARD', 'watch:' + full], ['EXPIRE', 'watch:' + full, 120]]);
      return res.json({ s: JSON.parse(v), w: w || 0 });
    }
    if (a === 'migstat') {
      if (!USE_VK) return res.json({ vk: 0 });
      const [c, w, st] = await vkPipe([['GET', 'mig:cur'], ['TTL', 'mig:wait'], ['HGETALL', 'mig:stat']]);
      const o = {}; for (let i = 0; st && i < st.length; i += 2) o[st[i]] = st[i + 1];
      return res.json({ vk: 1, done: c === 'done' ? 1 : 0, waitSec: +w > 0 ? +w : 0, copied: +(o.copied || 0), steps: +(o.steps || 0), err: o.err || '', t: +(o.t || 0) });
    }
    if (a === 'kvmigrate') {
      // ผู้ดูแลเท่านั้น: ย้ายข้อมูลเก่าจาก Upstash มา Valkey ทีละชุด (เรียกซ้ำจนกว่า done=1)
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      if (!USE_VK || !UP_URL) return res.json({ err: 'ต้องตั้ง VALKEY_URL และยังมี KV_REST_API_URL เดิมอยู่' });
      try { return res.json(await migStep(String(qOf(req).cur || '0'))) } catch (x) { return res.json({ err: 'อ่าน Upstash ไม่ได้: ' + String(x.message).slice(0, 160) }) }
    }
    if (a === 'kvdiag') {
      // ผู้ดูแลเท่านั้น: ดูสภาพฐานข้อมูล (จำนวนคีย์ตามหมวด ขนาด TTL)
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const out = { now };
      try { out.dbsize = await cmd('DBSIZE') } catch (x) { out.dbsizeErr = String(x && x.message || x) }
      try { const inf = String(await cmd('INFO') || ''); out.info = inf.split('\n').filter(l => /used_memory|maxmemory|evicted|expired|keys=|db0|total_commands|max_|policy|plan/i.test(l)).slice(0, 40) } catch (x) { out.infoErr = String(x && x.message || x) }
      const pref = {}, big = []; let cur = '0', n = 0;
      try {
        do { const r = await cmd('SCAN', cur, 'COUNT', 500); cur = String(r[0]); for (const k of r[1] || []) { n++; const pf = String(k).split(':')[0]; pref[pf] = (pref[pf] || 0) + 1; if (big.length < 4000) big.push(k) } } while (cur !== '0' && n < 60000);
      } catch (x) { out.scanErr = String(x && x.message || x) }
      out.scanned = n; out.prefixes = Object.entries(pref).sort((x, y) => y[1] - x[1]);
      const want = ['lives', 'chat', 'bugs2', 'reviews', 'online', 'om', 'oa', 'ann', 'annh', 'trklog', 'jserr', 'bugdone'];
      try { const r = await pipe([...want.map(k => ['TYPE', k]), ...want.map(k => ['TTL', k])]); out.keys = want.map((k, i) => [k, r[i], r[i + want.length]]) } catch (x) { out.keysErr = String(x && x.message || x) }
      try { const smp = big.filter((_, i) => i % Math.max(1, Math.floor(big.length / 300)) === 0).slice(0, 300); const mu = await pipe(smp.map(k => ['MEMORY', 'USAGE', k])); const by = {}; smp.forEach((k, i) => { const pf = String(k).split(':')[0]; by[pf] = (by[pf] || 0) + (+mu[i] || 0) }); out.sampleBytesByPrefix = Object.entries(by).sort((x, y) => y[1] - x[1]).slice(0, 20); out.sampled = smp.length } catch (x) { out.memErr = String(x && x.message || x) }
      return res.json(out);
    }
    if (a === 'annget') {
      const ai = String(qOf(req).ai || '').replace(/[^a-z0-9]/g, '').slice(0, 20), f = await annFind(ai);
      if (!f) return res.status(404).json({ err: 'gone' });
      return res.json({ ann: Object.assign(await annPoll(f.ann, id), { cur: f.cur, open: now - (+f.ann.t || 0) <= ANN_VOTE_DAYS * 86400e3 ? 1 : 0 }) });
    }
    if (a === 'annlist') {
      const h = await annHist(), cur = await annGet();
      try { const seen = new Set(h.map(x => x.i)); for (const v of ((await cmd('LRANGE', 'chat', 0, 199)) || [])) { const m = JSON.parse(v); if (m.k === 'ann' && !seen.has(m.i)) { seen.add(m.i); h.push({ i: m.i, t: m.t, x: String(m.x || '').replace(/^@everyone\s*/i, ''), poll: m.poll }) } } h.sort((p1, p2) => p2.t - p1.t) } catch {}
      return res.json({ l: h.map(x => ({ i: x.i, t: x.t, x: String(x.x || '').slice(0, 120), poll: Array.isArray(x.poll) ? x.poll.length : 0, cur: !!(cur && cur.i === x.i) })) });
    }
    if (a === 'clist') {
      // รายการเซฟบนคลาวด์ของเครื่องนี้ (ต้องมี token ของเครื่อง)
      if (!okId(id)) return res.json({ l: [] });
      const tk = String(qOf(req).tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      const keys = ['cs2:' + id, ...[1, 2, 3, 4, 5].map(n => 'cs3:' + id + ':' + n)];
      const [tok, ...vals] = await pipe([['GET', 'ctok:' + id], ...keys.map(k => ['GET', k])]);
      if (!tok || tok !== tk) return res.json({ l: [] });
      const meta = v => { try { const d = JSON.parse(Buffer.from(v, 'base64').toString('utf8')); const S = d && d.S; if (!S) return null; return { n: String(S.name || '').slice(0, 40), age: +S.age || 0, x: S.xian ? 1 : 0, t: +d.t || 0, seed: S.seed || 0 } } catch { return null } };
      const out = [], seen = new Set();
      vals.forEach((v, i) => { if (!v) return; const m = meta(v); if (!m) return; const sig = m.n + '|' + m.seed + '|' + m.age; if (seen.has(sig)) return; seen.add(sig); out.push({ k: i ? 's' + i : 'cs2', sl: i || 0, n: m.n, age: m.age, x: m.x, t: m.t }) });
      out.sort((a1, b1) => b1.t - a1.t);
      return res.json({ l: out });
    }
    if (a === 'cload') {
      const p0 = String(qOf(req).p || '').replace(/[^a-z0-9]/g, '').slice(0, 24), tk = String(qOf(req).tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      const kq = String(qOf(req).k || 'cs2'), dk = /^s[1-5]$/.test(kq) ? 'cs3:' + p0 + ':' + kq.slice(1) : 'cs2:' + p0;
      const [tok, d] = await pipe([['GET', 'ctok:' + p0], ['GET', dk]]);
      if (!tok || tok !== tk || !d) return res.status(404).json({ err: 'notfound' });
      return res.json({ d });
    }
    if (a === 'acban') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'forbidden' });
      const pre = String(qOf(req).p || '').replace(/[^a-z0-9]/g, '').slice(0, 24), on = String(qOf(req).on || '');
      if (pre.length < 6) return res.json({ err: 'pre' });
      const ids = new Set(); if (pre.length >= 12) ids.add(pre);
      for (const hk of ['lm', 'om']) { let cur = '0', n = 0; do { const r = await cmd('HSCAN', hk, cur, 'MATCH', pre + '*', 'COUNT', 1000); cur = String(r[0]); for (let i = 0; i < r[1].length; i += 2) ids.add(r[1][i]); n++ } while (cur !== '0' && n < 400) }
      const L = []; for (const x of ids) { if (on === '1') L.push(['SADD', 'cheaters', x]); else L.push(['SREM', 'cheaters', x], ['DEL', 'acf:' + x], ['DEL', 'acp:' + x]) }
      if (L.length) await pipe(L);
      return res.json({ ok: 1, n: ids.size });
    }
    if (a === 'acinv') {
      // แอดมิน: ตรวจประวัติผู้เล่นต้องสงสัย (เซฟคลาวด์ · ภาพสด · บันทึกโกง)
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'forbidden' });
      if (qOf(req).all === '1') { const L0 = await cmd('LRANGE', 'cheatlog', 0, 99); return res.json({ l: (L0 || []).map(x => { try { return JSON.parse(x) } catch { return null } }) }) }
      const nm = String(qOf(req).n || '').slice(0, 40);
      if (nm) { const hit = []; const [pub, prv] = await pipe([['ZRANGE', 'livez', 0, -1], ['ZRANGE', 'livezp', 0, -1]]); const ids = [...new Set([...(pub || []), ...(prv || [])])];
        for (const x of ids) { const [v1, v2] = await pipe([['GET', 'live:' + x], ['GET', 'livep:' + x]]); try { const z = JSON.parse(v1 || v2 || 'null'); if (z && String(z.n || '').includes(nm)) hit.push({ id: x.slice(0, 12), n: z.n, age: z.age, st: z.st, sys: z.sys }) } catch {} }
        const cl = ((await cmd('LRANGE', 'cheatlog', 0, 99)) || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(x => x && String(x.n || '').includes(nm));
        const bd = []; for (const k0 of BD_CATS.flatMap(c => ['d', 'w', 'm'].flatMap(p0 => [bdKeyP(p0, c, now), bdKeyP(p0, c, now, 1)]))) { const all = await cmd('ZRANGE', k0, 0, -1); for (const m of (all || [])) { try { const e0 = JSON.parse(m); if (String(e0.n || '').includes(nm)) bd.push(e0) } catch {} } }
        const allcl = ((await cmd('LRANGE', 'cheatlog', 0, 99)) || []).length;
        return res.json({ hit, cl, bd, nlive: ids.length, allcl }) }
      const pre = String(qOf(req).p || '').replace(/[^a-z0-9]/g, '').slice(0, 16); if (pre.length < 4) return res.json({ err: 'pre' });
      const found = new Set();
      for (const hk of ['lm', 'om']) { let cur = '0', n = 0; do { const r = await cmd('HSCAN', hk, cur, 'MATCH', pre + '*', 'COUNT', 1000); cur = String(r[0]); for (let i = 0; i < r[1].length; i += 2) found.add(r[1][i]); n++ } while (cur !== '0' && n < 400) }
      const sum = d0 => { try { const d = JSON.parse(Buffer.from(d0, 'base64').toString('utf8')), S = d.S || {}; const K = S.key || [];
        return { t: d.t, v: d.v, n: S.name, age: S.age, pow: S.power, fame: S.fame, money: S.money, qi: S.qi, int: S.int, cha: S.cha, ls: S.lifespan, xt: S.xt, xian: S.xian, cu: S.custom, adm: S.admUsed, tp: S._tp, gen: S.gen, lin: (S.lineage || []).slice(-12), sys: S.sys ? { t: S.sys.t, lv: S.sys.lv, g: S.sys.g, done: S.sys.done } : null, tal: S.talent && S.talent.n, nkey: K.length, k0: K.slice(0, 25), k1: K.slice(-70), pcap: S.pcap, fl: Object.keys(S.flags || {}).length } } catch (e) { return { err: String(e).slice(0, 80) } } };
      const out = [];
      for (const fid of [...found].slice(0, 6)) {
        const [lm, om, lv, lp, cs, ch, ctk] = await pipe([['HGET', 'lm', fid], ['HGET', 'om', fid], ['GET', 'live:' + fid], ['GET', 'livep:' + fid], ['GET', 'cs2:' + fid], ['SISMEMBER', 'cheaters', fid], ['GET', 'ctok:' + fid]]);
        const sl = await pipe([1, 2, 3, 4, 5].map(i => ['GET', 'cs3:' + fid + ':' + i]));
        const cl = ((await cmd('LRANGE', 'cheatlog', 0, 99)) || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(x => x && fid.startsWith(x.id));
        let live = null; try { const z = JSON.parse(lv || lp || 'null'); if (z) live = { n: z.n, age: z.age, r: z.r, x: z.x, st: z.st, sys: z.sys, feed: z.feed, t: z.t } } catch {}
        out.push({ id: fid.slice(0, 8), fid, lm, om, live, cs2: cs ? sum(cs) : null, slots: sl.map(x => x ? sum(x) : null), cheater: ch, cheatlog: cl, ctok: !!ctk, acf: await cmd('GET', 'acf:' + fid), acp: await cmd('GET', 'acp:' + fid) });
      }
      if (qOf(req).h === '1') {
        const E = x => String(x == null ? '' : x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]), N = v => (+v || 0).toLocaleString('en-US', { maximumFractionDigits: 1 });
        const sv = (x, h) => x ? `<div class="b"><b>${h}: ${E(x.n)}</b> · อายุ ${N(x.age)} ปี · รุ่นที่ ${E(x.gen || 1)} · โลก ${x.xt ? 'เทพ' : x.xian ? 'เซียน' : 'มนุษย์'} · v${E(x.v)} · เซฟเมื่อ ${new Date(x.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}<br>⚔️ ${N(x.pow)} · ⭐ ${N(x.fame)} · 💰 ${N(x.money)} · 🌀 ${N(x.qi)} · 📖 ${N(x.int)} · 🌸 ${N(x.cha)} · อายุขัย ${N(x.ls)}${x.sys ? ` · ระบบ ${E(x.sys.t)} Lv.${E(x.sys.lv)}` : ''}${x.adm ? ' · 🛠️ใช้เครื่องมือแอดมิน' : ''}${x.tp ? ' · ⚠️ ' + E(x.tp) : ''}<br><small>สายตระกูล: ${(x.lin || []).map(l => E(l.n) + ' (' + E(l.a) + ')').join(' → ') || '-'}</small><details><summary>เหตุการณ์สำคัญ ${E(x.nkey)} รายการ</summary><small>${[...(x.k0 || []), '…', ...(x.k1 || [])].map(E).join('<br>')}</small></details></div>` : '';
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>ตรวจประวัติผู้เล่น</title><style>body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;padding:14px;max-width:760px;margin:auto;line-height:1.55}.b{background:#211d2a;border-radius:8px;padding:8px 10px;margin:8px 0;font-size:14px}small{color:#aaa}h2{font-size:16px}</style></head><body><h1>🔍 ตรวจประวัติผู้เล่น ${E(pre)}…</h1><p>พบ ${found.size} เครื่อง</p>${out.map(x => { const m = jp(x.lm) || jp(x.om) || {}; return `<h2>เครื่อง ${E(x.id)}… · ${E(m.d)} · ${E(m.b)} · ${E(m.c)} ${x.cheater ? '· 🚫 แบนแล้ว' : ''} ${x.acf ? '· ⚠️ ติดธง: ' + E(x.acf) : ''}</h2><small>${E(m.u || '')}</small>${x.live ? `<div class="b"><b>🔴 ภาพสดล่าสุด: ${E(x.live.n)}</b> · อายุ ${N(x.live.age)} · ⚔️ ${N(x.live.st && x.live.st.pow)} · ⭐ ${N(x.live.st && x.live.st.fame)} · 💰 ${N(x.live.st && x.live.st.money)}</div>` : ''}${sv(x.cs2, '☁️ เซฟคลาวด์ล่าสุด')}${x.slots.map((y, i) => y && (!x.cs2 || y.t !== x.cs2.t) ? sv(y, 'ช่องเซฟ ' + (i + 1)) : '').join('')}${x.cheatlog.length ? `<div class="b"><b>📋 ถูกตัดจากทำเนียบ</b><br>${x.cheatlog.map(c => `${E(c.n)} · อายุ ${N(c.age)} · คะแนน ${N(c.s)} · ${E(c.why)} · ${new Date(c.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}`).join('<br>')}</div>` : ''}`}).join('')}</body></html>`);
      }
      return res.json({ n: found.size, out });
    }
    if (a === 'boarddel' || a === 'cheatlog') {
      if (!ADM_KEY || String(qOf(req).key || '') !== ADM_KEY) return res.status(403).json({ err: 'forbidden' });
      if (a === 'cheatlog') { const L0 = await cmd('LRANGE', 'cheatlog', 0, 99); return res.json({ l: (L0 || []).map(s0 => JSON.parse(s0)) }) }
      const lid = String(qOf(req).l || '').replace(/[^a-z0-9]/g, '').slice(0, 16), ban = qOf(req).ban === '1';
      const prevW = week(new Date(now - 7 * 86400e3)); let removed = 0;
      for (const k0 of BD_CATS.flatMap(c => ['d', 'w', 'm'].flatMap(p0 => [bdKeyP(p0, c, now), bdKeyP(p0, c, now, 1)]))) { const all = await cmd('ZRANGE', k0, 0, -1); for (const m of (all || [])) { try { if (JSON.parse(m).lid === lid) { await cmd('ZREM', k0, m); removed++ } } catch {} } }
      let banned = 0; if (ban) { const own = await cmd('GET', 'lifeo:' + lid); if (own) { await cmd('SADD', 'cheaters', own); banned = 1 } }
      return res.json({ ok: 1, removed, banned });
    }
    if (a === 'lifeview') {
      const lid = String(qOf(req).l || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const [pub, d, own] = await pipe([['GET', 'lifep:' + lid], ['GET', 'lifed:' + lid], ['GET', 'lifeo:' + lid]]);
      if (!d) return res.status(404).json({ err: 'notfound' });
      const admV = !!ADM_KEY && String(qOf(req).key || '') === ADM_KEY;
      if (pub !== '1' && own !== id && !admV) return res.status(403).json({ err: 'private' });
      return res.json({ d: JSON.parse(d), pub: pub === '1' ? 1 : 0, mine: own === id ? 1 : 0 });
    }

    const findLive = async (k2, adm) => { const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 90e3, '+inf']]); const f1 = (pub || []).find(x => x.slice(0, 6) + x.slice(-4) === k2); if (f1) return f1; if (adm) return (prv || []).find(x => x.slice(0, 6) + x.slice(-4) === k2) || null; return null };
    const RPC = [[120, 350, 800, 2200, 5500, 12000, 24000, 24000], [250, 900, 2500, 7000, 18000, 42000, 90000, 90000]];
    const powOk = (p, ri, x, age) => { ri = Math.max(0, Math.min(7, +ri || 0)); if (!(p >= 0) || !isFinite(p) || p > 1e16) return false; if (ri < 7 && p > RPC[x ? 1 : 0][ri] * 8 + 1000) return false; if (age != null && +age < 1000 && p > (x ? 60000 : 25000) * (1 + (+age || 1) / 8) + 300000) return false; return true };
    const isBanned = async () => { const [c0, f0] = await pipe([['SISMEMBER', 'cheaters', id], ['GET', 'acf:' + id]]); return !!(+c0 || f0) };
    const isAdmQ = k => !!ADM_KEY && String(k || '') === ADM_KEY;
    if (a === 'logget') {
      const k2 = String(qOf(req).t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const full = await findLive(k2, isAdmQ(qOf(req).key));
      if (!full) return res.status(404).json({ err: 'off' });
      const v = await cmd('GET', 'logfull:' + full);
      if (!v) return res.json({ wait: 1 });
      return res.json({ l: JSON.parse(v) });
    }
    if (a === 'admchk') return res.json({ ok: isAdmKey(qOf(req).key) ? 1 : 0 });
    if (a === 'paforce') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      let c0 = null; try { const v = await cmd('GET', 'pa:cur'); c0 = v ? JSON.parse(v) : null } catch {}
      if (c0 && c0.phase === 'open') return res.json({ ok: 1, st: 'busy', pa: paSum(c0) });
      await pipe([['SET', 'pa:force', '1', 'EX', 180], ['DEL', 'pa:chk'], ['DEL', 'pa:lk']]);
      let c1 = null; try { c1 = await paTick(now) } catch (e) { return res.json({ ok: 0, err: String(e.message || e).slice(0, 80) }) }
      const st = c1 && c1.phase === 'open' && (!c0 || c1.sid !== c0.sid) ? 'open' : 'wait';
      return res.json({ ok: st === 'open' ? 1 : 0, st, pa: paSum(c1) });
    }
    if (a === 'tick') {
      let pa = null; try { pa = paSum(await paTick(now)) } catch {}
      let av = ''; try { const v = await cmd('GET', 'ann'); if (v) av = (JSON.parse(v) || {}).i || '' } catch {}
      let nt = null; if (okId(id)) { try { const [L0] = await pipe([['LRANGE', 'nt:' + id, 0, 9], ['DEL', 'nt:' + id]]); if (L0 && L0.length) nt = L0.map(jp).filter(Boolean).reverse() } catch {} }
      return res.json({ pa, av, nt });
    }
    if (a === 'gcfg') return res.json({ cid: process.env.GOOGLE_CLIENT_ID || '' });
    if (a === 'profst') {
      if (!okId(id)) return res.json({});
      const pu = id.slice(0, 12), [q, w, s, bt, gk] = await pipe([['HEXISTS', 'avq', pu], ['GET', 'avwarn:' + id], ['GET', 'avstrike:' + id], ['TTL', 'avban:' + id], ['GET', 'gof:' + id]]);
      let g = null; if (gk) { const cur = jp(await cmd('GET', gk)); if (cur && cur.id === id) g = { e: cur.e || '' } }
      return res.json({ pend: +q ? 1 : 0, warn: w ? 1 : 0, strikes: +s || 0, ban: +bt > 0 ? +bt : 0, g });
    }
    if (a === 'avmod') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const pu = String(qOf(req).u || '').replace(/[^a-z0-9]/g, '').slice(0, 12), ok = qOf(req).ok === '1';
      const q = jp(await cmd('HGET', 'avq', pu)); if (!q) return res.json({ ok: 0, err: 'gone' });
      const pf = jp(await cmd('HGET', 'prof', pu)) || {};
      if (ok) { await pipe([['HSET', 'prof', pu, JSON.stringify({ av: q.av, fr: pf.fr || '' })], ['HSET', 'avok', pu, JSON.stringify({ av: q.av, t: now })], ['HDEL', 'avq', pu]]); return res.json({ ok: 1 }) }
      const fid = String(q.id || ''), [n] = await pipe([['INCR', 'avstrike:' + fid], ['EXPIRE', 'avstrike:' + fid, 86400 * 180], ['SET', 'avwarn:' + fid, 1, 'EX', 86400 * 30], ['HDEL', 'avq', pu], ['HSET', 'prof', pu, JSON.stringify({ av: '', fr: pf.fr || '' })]]);
      if (+n >= 3) await cmd('SET', 'avban:' + fid, 1, 'EX', 86400 * 30);
      return res.json({ ok: 1, strikes: +n });
    }
    if (a === 'achfirsts') {
      const h = (await cmd('HGETALL', 'achf')) || [], f = {};
      for (let i = 0; i < h.length; i += 2) { const v = jp(h[i + 1]); if (v) f[h[i]] = v }
      return res.json({ f });
    }
    if (a === 'hit') {
      const w = ['old', 'new'].includes(qOf(req).w) ? qOf(req).w : 'other', v = String(qOf(req).vid || '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);
      if (v.length >= 6) { const d = thDay(now); await pipe([['PFADD', 'hv:' + d + ':' + w, v], ['EXPIRE', 'hv:' + d + ':' + w, 86400 * 40], ['PFADD', 'hv:all:' + w, v]]) }
      return res.json({ ok: 1 });
    }
    if (a === 'achfirst') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const aid = String(b.a || '').replace(/[^a-z0-9_]/g, '').slice(0, 24), n = noAdm(clean(b.n, 20)) || 'นิรนาม';
      if (aid.length < 2 || (Object.keys(TITLES.a).length && !TITLES.a[aid])) return res.status(400).json({ err: 'id' });
      if (b.tp || isAdmKey(b.key) || await cmd('SISMEMBER', 'cheaters', id) || await cmd('SISMEMBER', 'admids', id)) return res.json({ first: 0 });
      if (TITLES.a[aid] && (+TITLES.a[aid][1] || 0) < 4) return res.json({ first: 0 });
      const ok = await cmd('HSETNX', 'achf', aid, JSON.stringify({ n, t: now, u: id.slice(0, 6) }));
      if (+ok === 1) return res.json({ first: 1 });
      return res.json({ first: 0, who: jp(await cmd('HGET', 'achf', aid)) });
    }
    if (a === 'migput') {
      if (req.method !== 'POST') return res.status(405).json({ err: 'method' });
      const d = String(b.d || '');
      if (!d || d.length > 4200000) return res.status(400).json({ err: 'big' });
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim().slice(0, 45) || 'x';
      const [c] = await pipe([['INCR', 'mgip:' + ip], ['EXPIRE', 'mgip:' + ip, 3600]]);
      if (+c > 30) return res.status(429).json({ err: 'rate' });
      const tk = require('crypto').randomBytes(16).toString('hex').slice(0, 24);
      await cmd('SET', 'mg:' + tk, JSON.stringify({ d, z: b.z ? 1 : 0, n: +b.n || 0, t: now }), 'EX', 86400 * 30);
      try { const d0 = thDay(now); await pipe([['INCR', 'migst:put:' + d0], ['EXPIRE', 'migst:put:' + d0, 86400 * 40], ['INCR', 'migst:put:all']]) } catch (e) {}
      return res.json({ ok: 1, tk });
    }
    if (a === 'migget') {
      const tk = String(qOf(req).tk || '').replace(/[^a-z0-9]/g, '').slice(0, 24);
      if (tk.length < 16) return res.status(400).json({ err: 'bad' });
      const v = jp(await cmd('GET', 'mg:' + tk));
      if (!v || !v.d) return res.status(404).json({ err: 'gone' });
      try { if (!(await cmd('SET', 'mgseen:' + tk, 1, 'NX', 'EX', 86400 * 30))) throw 0; const d0 = thDay(now); await pipe([['INCR', 'migst:get:' + d0], ['EXPIRE', 'migst:get:' + d0, 86400 * 40], ['INCR', 'migst:get:all']]) } catch (e) {}
      return res.json({ ok: 1, d: v.d, z: v.z });
    }
    if (req.method !== 'POST') return res.status(405).json({ err: 'method' });
    if (!okId(id)) return res.status(400).json({ err: 'id' });
    if (a === 'logreq') {
      const k2 = String(b.t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const full = await findLive(k2, isAdmQ(b.key));
      if (!full) return res.status(404).json({ err: 'off' });
      const has = await cmd('GET', 'logfull:' + full);
      if (has && !b.fresh) return res.json({ ok: 1, ready: 1 });
      await cmd('SET', 'logreq:' + full, '1', 'EX', 120);
      return res.json({ ok: 1 });
    }
    if (a === 'logup') {
      const ls = String(b.s || '');
      if (!ls || ls.length > 700000) return res.status(400).json({ err: 'size' });
      try { JSON.parse(ls) } catch { return res.status(400).json({ err: 'json' }) }
      await pipe([['SET', 'logfull:' + id, ls, 'EX', 300], ['DEL', 'logreq:' + id]]);
      return res.json({ ok: 1 });
    }
    const acFix = async () => { try { if (!(await cmd('SET', 'acfix15', 1, 'NX'))) return; let cur = '0', n = 0, del = 0; do { const r = await cmd('SCAN', cur, 'MATCH', 'acf:*', 'COUNT', 500); cur = String(r[0]); const ks = r[1] || []; if (ks.length) { const vs = await pipe(ks.map(k => ['GET', k])); const bad = ks.filter((k, i) => String(vs[i] || '') === 'save-edit'); if (bad.length) { await cmd('DEL', ...bad); del += bad.length } } n++ } while (cur !== '0' && n < 400);
      const L = (await cmd('LRANGE', 'acsus', 0, 199)) || []; const keep = L.filter(x => { try { return JSON.parse(x).why !== 'save-edit' } catch { return true } }); await cmd('DEL', 'acsus'); if (keep.length) await cmd('RPUSH', 'acsus', ...keep); await cmd('SET', 'acfix15log', JSON.stringify({ del, kept: keep.length, t: now })) } catch {} };
    if (a === 'acsus' || a === 'live') await acFix();
    if (a === 'mwwait') {
      const on = b.on !== 0; const [, n] = await pipe([on ? ['SADD', 'mwwait', id] : ['SREM', 'mwwait', id], ['SCARD', 'mwwait']]);
      return res.json({ ok: 1, n: +n || 0 });
    }
    if (a === 'sup') {
      const ev = ['view', 'save', 'stay', 'paid'].includes(b.e) ? b.e : ''; if (!ev) return res.json({ ok: 0 });
      const ua = String(req.headers['user-agent'] || ''), dev = (/iPhone|iPad/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac OS/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : 'อื่นๆ') + ' · ' + (/SamsungBrowser/.test(ua) ? 'Samsung' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /Firefox\//.test(ua) ? 'Firefox' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'เบราว์เซอร์อื่น');
      const d0 = thDay(now), base = { fid: id, n: clean(String(b.n || ''), 24) || 'นิรนาม', src: clean(String(b.src || ''), 20), dev, t: now };
      const supNote = async (t, bd) => { try { if (isAdmKey(b.key)) return; const ids = ((await cmd('SMEMBERS', 'admids')) || []).filter(x => x !== id); if (!ids.length) return; await withCap(Promise.all(ids.slice(0, 5).map(x => noteTo(x, { t, b: bd.slice(0, 160), u: '/?go=sup', g: 'sup-' + id }))), 6000) } catch (e) {} };
      if (ev !== 'paid') {
        const fresh = await cmd('SET', 'supr:' + ev + ':' + id, 1, 'NX', 'EX', ev === 'view' ? 600 : ev === 'stay' ? 1800 : 3600); if (!fresh) return res.json({ ok: 1 });
        await pipe([['LPUSH', 'supev', JSON.stringify({ ...base, e: ev })], ['LTRIM', 'supev', 0, 499], ['HINCRBY', 'supd:' + d0, ev, 1], ['EXPIRE', 'supd:' + d0, 86400 * 120], ['PFADD', 'supu:' + d0 + ':' + ev, id], ['EXPIRE', 'supu:' + d0 + ':' + ev, 86400 * 120]]);
        if (ev === 'stay') await supNote('🙏 มีคนเปิด QR สนับสนุนค้างไว้', `${base.n} เปิด QR ค้างไว้นาน — อาจกำลังสแกนโอน · ${dev} · ${new Date(now + 7 * 3600e3).toISOString().slice(11, 16)} น. ลองเช็กแอปธนาคารดู`);
        if (ev === 'save') await supNote('⬇️ มีคนบันทึกรูป QR สนับสนุน', `${base.n} บันทึกรูป QR ไว้ (มักใช้สแกนจากแอปธนาคารในเครื่องเดียวกัน) · ${dev} · ${new Date(now + 7 * 3600e3).toISOString().slice(11, 16)} น.`);
        return res.json({ ok: 1 });
      }
      const fresh = await cmd('SET', 'supr:paid:' + id, 1, 'NX', 'EX', 60); if (!fresh) return res.status(429).json({ err: 'rate' });
      const sid = now.toString(36) + Math.random().toString(36).slice(2, 6), img = String(b.img || '');
      const hasImg = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img) && img.length < 400000;
      const rec = { ...base, i: sid, amt: Math.max(0, Math.min(1e7, Math.round((+b.amt || 0) * 100) / 100)), pn: clean(String(b.pn || ''), 40), tm: clean(String(b.tm || ''), 20), msg: clean(String(b.msg || ''), 200), img: hasImg ? 1 : 0, st: '' };
      const L = [['HSET', 'suppay', sid, JSON.stringify(rec)], ['ZADD', 'suppayz', now, sid], ['HINCRBY', 'supd:' + d0, 'paid', 1], ['EXPIRE', 'supd:' + d0, 86400 * 120]];
      if (hasImg) L.push(['SET', 'supimg:' + sid, img, 'EX', 86400 * 120]);
      await pipe(L); await supNote('💰 มีคนแจ้งว่าสนับสนุนแล้ว!', `${base.n} แจ้งโอน ${rec.amt ? rec.amt.toLocaleString('th-TH') + ' บาท' : '(ไม่ระบุยอด)'}${rec.pn ? ' · ชื่อบัญชี ' + rec.pn : ''}${rec.tm ? ' · เวลา ' + rec.tm : ''}${rec.img ? ' · มีสลิป' : ''}`); return res.json({ ok: 1, i: sid });
    }
    if (a === 'acsus') {
      if (req.method !== 'POST' || !okId(id)) return res.json({ ok: 0 });
      const why = String(b.why || '').replace(/[^a-z0-9-]/g, '').slice(0, 24); if (!why) return res.json({ ok: 0 });
      const fresh = await cmd('SET', 'acsr:' + id + ':' + why, 1, 'NX', 'EX', 3600); if (!fresh) return res.json({ ok: 1 });
      const st = b.st || {}, hard = /^(console|save-edit)/.test(why);
      const L = [['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(b.n || ''), 24), age: +b.age || 0, why, st: { pow: +st.pow || 0, fame: +st.fame || 0, money: +st.money || 0 }, t: now })], ['LTRIM', 'acsus', 0, 199]];
      if (hard) L.push(['SET', 'acf:' + id, why, 'EX', 86400 * 60]);
      await pipe(L); return res.json({ ok: 1 });
    }
    if (a === 'live') {
      if (b.spec && (b.tp || await isBanned())) b.spec = 0;
      try { const z = JSON.parse(String(b.s || 'null')); if (z && z.st && okId(id)) { const p = +z.st.pow || 0, fm = +z.st.fame || 0, mn = +z.st.money || 0, ag = +z.age || 0; let why = '';
        if (!isFinite(p) || p > 1e16 || fm > 1e16 || mn > 1e16) why = 'srv-cap';
        const pv = jp(await cmd('GET', 'acp:' + id));
        if (!why && pv && pv.n === z.n && ag >= pv.a && ag - pv.a <= 3 && p > 1e7 && p > pv.p * 1000) why = 'srv-jump';
        const L = [['SET', 'acp:' + id, JSON.stringify({ n: z.n, a: ag, p }), 'EX', 86400 * 7]];
        if (why && !(await cmd('GET', 'acf:' + id))) { L.push(['SET', 'acf:' + id, why, 'EX', 86400 * 60], ['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(z.n || ''), 24), age: ag, why, st: { pow: p, fame: fm, money: mn }, prev: pv, t: now })], ['LTRIM', 'acsus', 0, 199]); b.spec = 0 }
        await pipe(L) } } catch {}
      if (okId(id)) { try { const lm = uaMeta(req, now); lm.u = String(req.headers['user-agent'] || '').slice(0, 160); await cmd('HSET', 'lm', id, JSON.stringify(lm)) } catch {} }
      if (!b.spec) {
        const ps = String(b.s || '');
        if (ps && ps.length <= 60000) { try { JSON.parse(ps); const r0 = await pipe([['DEL', 'live:' + id], ['ZREM', 'livez', id], ['SET', 'livep:' + id, ps, 'EX', 100], ['ZADD', 'livezp', now, id], ['GET', 'logreq:' + id], ['ZCOUNT', 'watcha:' + id, now - 25e3, '+inf']]); return res.json({ w: 0, f: +r0[5] > 0 ? 1 : 0, lr: r0[4] ? 1 : 0 }) } catch {} }
        await pipe([['DEL', 'live:' + id], ['ZREM', 'livez', id], ['DEL', 'livep:' + id], ['ZREM', 'livezp', id]]); return res.json({ w: 0 })
      }
      const snap = String(b.s || '');
      if (snap.length > 60000) return res.status(400).json({ err: 'size' });
      try { JSON.parse(snap) } catch { return res.status(400).json({ err: 'json' }) }
      const [, , , , w] = await pipe([['SET', 'live:' + id, snap, 'EX', 70], ['ZADD', 'livez', now, id], ['DEL', 'livep:' + id], ['ZREM', 'livezp', id], ['ZCOUNT', 'watch:' + id, now - 25e3, '+inf']]);
      const [lr, fa] = await pipe([['GET', 'logreq:' + id], ['ZCOUNT', 'watcha:' + id, now - 25e3, '+inf']]);
      return res.json({ w: w || 0, f: (+w > 0 || +fa > 0) ? 1 : 0, lr: lr ? 1 : 0 });
    }
    if (a === 'csave') {
      const tk = String(b.tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20), d = String(b.d || '');
      if (tk.length < 8 || !d || d.length > 900000) return res.status(400).json({ err: 'bad' });
      await cmd('SET', 'ctok:' + id, tk, 'NX');
      const tok = await cmd('GET', 'ctok:' + id);
      if (tok !== tk) return res.status(403).json({ err: 'token' });
      const sl = Math.max(1, Math.min(5, parseInt(b.sl, 10) || 1));
      await pipe([['SET', 'cs2:' + id, d, 'EX', 86400 * 90], ['SET', 'cs3:' + id + ':' + sl, d, 'EX', 86400 * 90], ['EXPIRE', 'ctok:' + id, 86400 * 90]]);
      return res.json({ ok: 1 });
    }
    if (a === 'profile') {
      // รูปตัวละครจากเกม (PNG 56×62) ขึ้นได้ทันที · รูปที่อัปโหลดเอง (JPEG/WebP) ต้องรอแอดมินตรวจก่อนคนอื่นจะเห็น
      const av = String(b.av || ''), alt = String(b.alt || ''), fr = String(b.fr || '').replace(/[^a-z0-9_]/g, '').slice(0, 20), up = b.up ? 1 : 0, pu = id.slice(0, 12);
      const isUp = /^data:image\/(jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(av);
      if (isUp && !isAdmKey(b.key)) return res.status(403).json({ err: 'noup' }); // อัปโหลดรูปเองปิดไว้ — เฉพาะแอดมิน
      if (av && (av.length > 12000 || !(avSnapOk(av) || isUp))) return res.status(400).json({ err: 'av' });
      if (alt && (alt.length > 8000 || !avSnapOk(alt))) return res.status(400).json({ err: 'alt' });
      let pend = 0;
      if (up && isUp) {
        if (await cmd('GET', 'avban:' + id)) return res.status(403).json({ err: 'avban' });
        const cur = jp(await cmd('HGET', 'avok', pu));
        if (cur && cur.av === av) { await pipe([['HSET', 'prof', pu, JSON.stringify({ av, fr })], ['HDEL', 'avq', pu]]); return res.json({ ok: 1, st: 'ok' }) }
        await cmd('HSET', 'avq', pu, JSON.stringify({ av, t: now, n: noAdm(clean(b.n, 20)) || 'นิรนาม', id }));
        pend = 1;
      } else await cmd('HDEL', 'avq', pu);
      const pub = avSnapOk(av) ? av : (alt || '');
      await cmd('HSET', 'prof', pu, JSON.stringify({ av: pub, fr, pend }));
      return res.json({ ok: 1, st: pend ? 'pend' : 'ok' });
    }
    if (a === 'profack') { await cmd('DEL', 'avwarn:' + id); return res.json({ ok: 1 }) }
    if (a === 'glogin') {
      const cred = String(b.cred || '').slice(0, 5000), tk = String(b.tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      const v = await gVerify(cred);
      if (!v || !v.sub) return res.status(403).json({ err: 'google' });
      const gk = 'gacc:' + String(v.sub).replace(/[^0-9a-zA-Z]/g, '').slice(0, 40), cur = jp(await cmd('GET', gk)), em = gMask(v.email);
      if (!cur || cur.id === id) { await pipe([['SET', gk, JSON.stringify({ id, tk: tk || (cur && cur.tk) || '', t: now, e: em })], ['SET', 'gof:' + id, gk]]); return res.json({ ok: 1, linked: 1, e: em, same: cur ? 1 : 0 }) }
      return res.json({ ok: 1, other: { id: cur.id, tk: cur.tk || '' }, e: em });
    }
    if (a === 'gunlink') { const gk = await cmd('GET', 'gof:' + id); if (gk) { const cur = jp(await cmd('GET', gk)); if (cur && cur.id === id) await cmd('DEL', gk) } await cmd('DEL', 'gof:' + id); return res.json({ ok: 1 }) }
    if (a === 'jserr') {
      if (!okId(id)) return res.json({ ok: 0 });
      const okR = await cmd('SET', 'jsrl:' + id, 1, 'NX', 'EX', 10);
      if (!okR) return res.json({ ok: 0 });
      const T = (v, n) => String(v == null ? '' : v).replace(/[<>]/g, '').slice(0, n), x = b.x && typeof b.x === 'object' ? b.x : {};
      const ua = String(req.headers['user-agent'] || '');
      const ev = { t: now, u: id.slice(0, 4), m: T(b.m, 200), s: T(b.s, 400), l: +b.l || 0, c: +b.c || 0, v: T(b.v, 8), d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', x: { sc: T(x.sc, 12), md: T(x.md, 16), ch: T(x.ch, 40), ag: +x.ag || 0, fo: T(x.fo, 12), w: T(x.w, 1), al: x.al ? 1 : 0 } };
      await pipe([['LPUSH', 'jserr', JSON.stringify(ev)], ['LTRIM', 'jserr', 0, 199]]);
      return res.json({ ok: 1 });
    }
    if (a === 'annvote') {
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const ai = String(b.ai || '').replace(/[^a-z0-9]/g, '').slice(0, 20), o = parseInt(b.o, 10), f = await annFind(ai), ann = f && f.ann;
      if (!ann || !Array.isArray(ann.poll)) return res.status(410).json({ err: 'gone' });
      if (now - (+ann.t || 0) > ANN_VOTE_DAYS * 86400e3) return res.status(410).json({ err: 'closed' });
      if (!(o >= 0 && o < ann.poll.length)) return res.status(400).json({ err: 'opt' });
      const okR = await cmd('SET', 'avrl:' + id, 1, 'NX', 'EX', 1);
      if (!okR) return res.status(429).json({ err: 'rate' });
      const prev = await cmd('HGET', 'annv:' + ai, id);
      if (prev == null || +prev !== o) {
        const ops = [['HSET', 'annv:' + ai, id, String(o)], ['HINCRBY', 'annc:' + ai, String(o), 1], ['EXPIRE', 'annv:' + ai, 86400 * 35], ['EXPIRE', 'annc:' + ai, 86400 * 35]];
        if (prev != null) ops.push(['HINCRBY', 'annc:' + ai, String(+prev), -1]);
        await pipe(ops);
      }
      return res.json({ ok: 1, ann: Object.assign(await annPoll(ann, id), { cur: f.cur, open: 1 }) });
    }
    if (a === 'annclear') {
      if (!isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
      const cur = await annGet(), ai = String(b.ai || (cur && cur.i) || '');
      if (cur && cur.i === ai) await cmd('DEL', 'ann');
      if (ai) await cmd('SADD', 'chat:hidden', ai);
      if (ai) { const raw = (await cmd('LRANGE', 'annh', 0, 29)) || []; for (const v of raw) { try { if (JSON.parse(v).i === ai) await cmd('LREM', 'annh', 0, v) } catch {} } }
      return res.json({ ok: 1 });
    }
    if (a === 'say') {
      if (/^\s*@everyone\b/i.test(String(b.x || ''))) {
        if (!isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
        const body = String(b.x || '').replace(/^\s*@everyone\b[\s:,-]*/i, '').replace(/[\u0000-\u0009\u000b-\u001f<>]/g, '').slice(0, 400).trim();
        if (!body) return res.status(400).json({ err: 'empty' });
        const poll = Array.isArray(b.poll) ? b.poll.map(o => String(o || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 60)).filter(Boolean).slice(0, 6) : [];
        if (Array.isArray(b.poll) && b.poll.length && poll.length < 2) return res.status(400).json({ err: 'poll' });
        const ann = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, x: body, n: clean(b.n, 20) || 'ผู้ดูแล' };
        if (poll.length >= 2) ann.poll = poll;
        const m = { i: ann.i, t: now, n: ann.n, ti: 'ผู้ดูแล', x: '@everyone ' + body, k: 'ann', poll: ann.poll, u: String(id || '').slice(0, 4), pu: String(id || '').slice(0, 12) };
        await pipe([['SET', 'ann', JSON.stringify(ann), 'EX', 86400 * 3], ['LPUSH', 'annh', JSON.stringify(ann)], ['LTRIM', 'annh', 0, 29], ['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199]]);
        let pr = null; if (b.push !== 0) { try { pr = await withCap(pushHashes(await cmd('HKEYS', 'push'), { t: '📢 ประกาศจากผู้ดูแล', b: body.slice(0, 160), u: '/?go=chat', g: 'ann-' + ann.i }), 20000) } catch (e) {} }
        return res.json({ ok: 1, ann: await annPoll(ann, id), push: pr });
      }
      const x = clean(b.x, 200);
      if (!x) return res.status(400).json({ err: 'empty' });
      const [mu, ok, chx, rkh] = await pipe([['GET', 'mute:' + id], ['SET', 'rl:' + id, 1, 'NX', 'PX', 1800], ['SISMEMBER', 'cheaters', id], ['HGETALL', 'rkttl:' + id]]);
      if (mu) return res.status(429).json({ err: 'muted' });
      if (!ok) return res.status(429).json({ err: 'rate' });
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: noAdm(clean(b.n, 20)) || 'นิรนาม', ti: noAdm(clean(b.ti, 24)), ...((b.tp || +chx) ? { tt: '', tr: 0 } : rkOk(b.tt, rkh) || ttlOk(b.tt)), x, k: b.k === 'share' ? 'share' : 'msg', u: id.slice(0, 4), pu: id.slice(0, 12) };
      await pipe([['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199], ['HSET', 'pupid', id.slice(0, 12), id]]);
      if (b.rto && isAdmKey(b.key)) {
        let pr = null;
        try { const rid = await cmd('HGET', 'pupid', String(b.rto).replace(/[^a-z0-9]/g, '').slice(0, 12)); pr = rid ? await withCap(noteTo(rid, { t: '💬 ผู้ดูแลตอบคุณในแชทโลก', b: x.slice(0, 160), u: '/?go=chat', g: 'chat-' + m.i }), 8000) : { owner: 0 } } catch (e) {}
        return res.json({ ok: 1, push: pr, m });
      }
      return res.json({ ok: 1, m });
    }
    if (a === 'report') {
      const mid = String(b.mid || '').slice(0, 20);
      const [, cnt] = await pipe([['SADD', 'rep:' + mid, id], ['SCARD', 'rep:' + mid], ['EXPIRE', 'rep:' + mid, 86400 * 3]]);
      if (cnt >= 5) await cmd('SADD', 'chat:hidden', mid);
      return res.json({ ok: 1 });
    }
    if (a === 'life') {
      const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const e = { n: clean(b.n, 20) || 'นิรนาม', s: Math.max(0, Math.min(1e12, +b.s || 0)), age: +b.age || 0, r: clean(b.r, 30), f: clean(b.f, 30), c: clean(b.c, 60), x: b.x ? 1 : 0, g: b.g ? 1 : 0, ga: Math.max(0, Math.min(1e9, Math.round(+b.ga || 0))), ...(b.tp ? { tt: '', tr: 0 } : ttlOk(b.tt)), xa: Math.max(0, Math.min(1e9, Math.round(+b.xa || 0))), cu: b.cu ? 1 : 0, bm: b.bm ? 1 : 0, kl: Math.max(0, Math.min(9, Math.floor(+b.kl || 0))), t: now, lid };
      { const c0 = String(b.ch || ''); if (CH_OK.includes(c0) && !(c0 === 'short' && e.age > 31)) e.ch = c0 }
      try { e.s = bdScore(JSON.parse(String(b.det || '{}')), e) } catch { e.s = 0 }
      const cat = bdCat(e), ej = JSON.stringify(e), L = [['INCR', 'lives']];
      for (const cc of e.ch ? [cat, 'c'] : [cat]) for (const [kk, ex] of [[bdKey(cc, now), 4], [bdKeyW(cc, now), 20], [bdKeyM(cc, now), 70]]) L.push(['ZADD', kk, e.s, ej], ['ZREMRANGEBYRANK', kk, 0, -101], ['EXPIRE', kk, 86400 * ex]);
      await bdSettle();
      if (e.cu || !(parseFloat(b.ver) >= 6.3)) { await cmd('INCR', 'lives'); return res.json({ ok: 1, skip: 1 }) }
      const det = String(b.det || '');
      // ---- anti-cheat: ตรวจความสมเหตุสมผลของคะแนนและค่าสถานะ ----
      let bad = '';
      try {
        if (b.tp) bad = 'tamper:' + clean(String(b.tp), 40);
        if (!bad && parseFloat(b.ver) >= 9.5 && !det) bad = 'nodet';
        if (!bad && det) {
          const D = JSON.parse(det), st = D.st || {}, kids = (D.kids || []).length, dis = +((String(D.sect || '').match(/ศิษย์\s*([0-9]+)/) || [])[1] || 0);
          const pw = +st.pow || 0, fm = +st.fame || 0, mn = +st.money || 0, ag = Math.max(1, +e.age || 1);
          if ((+st.int || 0) > 1e6 || (+st.cha || 0) > 1e6 || fm > 1e16 || mn > 1e16 || kids > 1e5 || dis > 1e9 || pw > 1e16) bad = 'stat';
          const powCap = ((e.x ? 60000 : 25000) * (1 + ag / 8) + 300000) * (e.bm ? 6 : 1) * (D.sys ? 3 : 1) * (D.ai ? 3 : 1);
          if (!bad && pw > powCap && ag < 1000) bad = 'pow-age';
          const upper = (pw + fm * 3 + 20 * Math.sqrt(Math.max(0, mn)) + 2500 + kids * 100 + dis * 20 + 4000) * 2.5 * 1.05 + 1000;
        }
        if (!bad && !det) bad = 'nodet';
        if (!bad && await isBanned()) bad = 'banned';
      } catch { bad = bad || 'parse' }
      if (bad) { await pipe([['INCR', 'lives'], ['LPUSH', 'cheatlog', JSON.stringify({ id: id.slice(0, 10), fid: id, n: e.n, s: e.s, age: e.age, why: bad, t: now })], ['LTRIM', 'cheatlog', 0, 99]]); return res.json({ ok: 1, skip: 1, flag: 1 }) }
      if (lid.length >= 6 && det && det.length < 40000) { try { JSON.parse(det); L.push(['SET', 'lifed:' + lid, det, 'EX', 86400 * 40], ['SET', 'lifeo:' + lid, id, 'EX', 86400 * 40], ['SET', 'lifep:' + lid, +b.pub === 2 ? '2' : b.pub ? '1' : '0', 'EX', 86400 * 40]) } catch {} }
      await pipe(L);
      return res.json({ ok: 1 });
    }
    if (a === 'lifepub') {
      const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const own = await cmd('GET', 'lifeo:' + lid);
      if (!own || own !== id) return res.status(403).json({ err: 'owner' });
      const pv = +b.pub === 2 ? 2 : b.pub ? 1 : 0;
      await cmd('SET', 'lifep:' + lid, String(pv), 'KEEPTTL');
      return res.json({ ok: 1, pub: pv });
    }

    // ===== ลานประลองหมื่นเงา (v15.6) =====
    const AR_TKM = 5, AR_TKR = 1200e3, arBr = b0 => (b0.bm ? 'b' : b0.x ? 'x' : 'm') + ':' + Math.max(0, Math.min(12, +b0.ri || 0));
    const arTk = async (use) => { const v = jp(await cmd('HGET', 'artk', id)) || { n: AR_TKM, t: now }; const add = Math.floor((now - v.t) / AR_TKR); if (add > 0) { v.n = Math.min(AR_TKM, v.n + add); v.t = v.n >= AR_TKM ? now : v.t + add * AR_TKR } if (v.n >= AR_TKM) v.t = now;
      if (use) { if (v.n <= 0) return { ok: 0, n: 0, nx: AR_TKR - (now - v.t) }; if (v.n >= AR_TKM) v.t = now; v.n -= use } if (use || add > 0) await cmd('HSET', 'artk', id, JSON.stringify(v)); return { ok: 1, n: v.n, nx: v.n >= AR_TKM ? 0 : AR_TKR - (now - v.t) } };
    const arRt = async (who) => +(await cmd('HGET', 'arr:' + W, who)) || 1000;
    const arSettle = async () => { try { const pw = week(new Date(now - 7 * 86400e3)); if (!(await cmd('SET', 'arset:' + pw, 1, 'NX', 'EX', 86400 * 30))) return; const top = await cmd('ZREVRANGE', 'ars:' + pw, 0, 2, 'WITHSCORES'); for (let i = 0; i < (top || []).length; i += 2) { const own = top[i], r = i / 2 + 1, sc = +top[i + 1]; if (await cmd('SISMEMBER', 'cheaters', own)) continue; const nm = (await cmd('HGET', 'arn', own)) || 'นิรนาม', exp = now + RKT_EXP.w;
      await pipe([['LPUSH', 'bdrw:' + own, JSON.stringify({ p: 'w', c: 'a', r, d: pw, n: nm, s: sc, tt: RKT_A.w[r], exp })], ['EXPIRE', 'bdrw:' + own, 86400 * 60], ['HSET', 'rkttl:' + own, 'wa', JSON.stringify({ t: RKT_A.w[r], r, c: 'a', exp, at: now })], ['EXPIRE', 'rkttl:' + own, 86400 * 40]]) } } catch {} };
    const arSnapIn = b0 => { let look = null; try { const L = typeof b0.look === 'string' ? JSON.parse(b0.look) : b0.look; if (L && typeof L === 'object' && JSON.stringify(L).length < 1600) look = L } catch {}
      return { n: clean(b0.n, 20) || 'นิรนาม', p: Math.max(0, +b0.p || 0), hp: Math.max(1, Math.min(1e9, +b0.hp || 100)), r: clean(b0.r, 30), ri: Math.max(0, Math.min(12, +b0.ri || 0)), x: b0.x ? 1 : 0, bm: b0.bm ? 1 : 0, st: ['atk', 'def', 'trick', 'all'].includes(b0.st) ? b0.st : 'atk', arts: (Array.isArray(b0.arts) ? b0.arts : []).slice(0, 3).map(a => clean(a, 24)).filter(Boolean), el: clean(b0.el, 10), sr: clean(b0.sr, 3), look, t: now } };
    const arLg = r => r >= 1600 ? 4 : r >= 1400 ? 3 : r >= 1250 ? 2 : r >= 1100 ? 1 : 0;
    if (a === 'ar2') {
      if (!okId(id)) return res.json({ err: 'id' }); await arSettle();
      const [tk, rt, top, dl, dn] = await Promise.all([arTk(0), arRt(id), cmd('ZREVRANGE', 'ars:' + W, 0, 9, 'WITHSCORES'), cmd('LRANGE', 'ardef:' + id, 0, 19), cmd('HGET', 'ardefn', id)]);
      const ids = []; for (let i = 0; i < (top || []).length; i += 2) ids.push(top[i]); const nms = ids.length ? await cmd('HMGET', 'arn', ...ids) : [];
      const T = ids.map((x, i) => ({ n: nms[i] || 'นิรนาม', r: +top[i * 2 + 1], me: x === id ? 1 : 0, lg: arLg(+top[i * 2 + 1]) }));
      const D = (dl || []).map(jp).filter(Boolean).map((e, i) => ({ i, n: e.n, w: e.w, d: e.d, t: e.t, rv: e.rv ? 1 : 0 }));
      if (+dn) await cmd('HDEL', 'ardefn', id);
      return res.json({ tk, rt, lg: arLg(rt), top: T, def: D, nw: +dn || 0, wk: W });
    }
    if (a === 'ar2go' || a === 'ar2rv') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const me = arSnapIn(b); if (b.tp || !powOk(me.p, Math.min(7, me.ri), me.x, null) || await isBanned()) return res.status(403).json({ err: 'integrity' });
      if (!(await cmd('SET', 'arl2:' + id, 1, 'NX', 'PX', 2500))) return res.status(429).json({ err: 'rate' });
      const br = arBr(me); await pipe([['SET', 'arsnap:' + id, JSON.stringify(me), 'EX', 86400 * 14], ['SADD', 'ar2:' + br, id], ['EXPIRE', 'ar2:' + br, 86400 * 14], ['HSET', 'arn', id, me.n]]);
      const myR = await arRt(id); let oid = null, o = null, rv = 0;
      if (a === 'ar2rv') { const i = Math.max(0, Math.min(19, +b.i || 0)), e = jp(await cmd('LINDEX', 'ardef:' + id, i)); if (!e || !e.a || e.rv) return res.json({ o: null, err: 'gone' }); o = jp(await cmd('GET', 'arsnap:' + e.a)); if (!o) return res.json({ o: null, err: 'gone' }); oid = e.a; rv = 1; e.rv = 1; await cmd('LSET', 'ardef:' + id, i, JSON.stringify(e)) }
      else { const C = ((await cmd('SRANDMEMBER', 'ar2:' + br, 14)) || []).filter(x => x !== id); if (C.length) { const [sn, rts] = await pipe([['MGET', ...C.map(x => 'arsnap:' + x)], ['HMGET', 'arr:' + W, ...C]]); const L = C.map((x, k) => ({ x, o: jp(sn[k]), r: +rts[k] || 1000 })).filter(q => q.o && q.o.t > now - 86400e3 * 14); L.sort((p1, p2) => (Math.abs(p1.r - myR) + Math.random() * 160) - (Math.abs(p2.r - myR) + Math.random() * 160)); if (L[0]) { oid = L[0].x; o = L[0].o } } }
      if (!o) return res.json({ o: null, tk: await arTk(0), rt: myR });
      const tk = await arTk(1); if (!tk.ok) return res.json({ o: null, notk: 1, tk, rt: myR });
      await cmd('SET', 'arm:' + id, JSON.stringify({ o: oid, rv, t: now }), 'EX', 900);
      const or = await arRt(oid); delete o.t; return res.json({ o: Object.assign(o, { rt: or, lg: arLg(or) }), rt: myR, tk });
    }
    if (a === 'ar2res') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const pm = jp(await cmd('GETDEL', 'arm:' + id)); if (!pm || !pm.o) return res.json({ err: 'nomatch' });
      const w = b.w ? 1 : 0, au = b.au ? 1 : 0, ra = await arRt(id), rb = await arRt(pm.o), ea = 1 / (1 + Math.pow(10, (rb - ra) / 400)), K = 32 * (au ? .5 : 1);
      const da = Math.round(K * (w - ea)), db = -Math.round(da * .5), na = Math.max(0, ra + da), nb = Math.max(0, rb + db), nm = (await cmd('HGET', 'arn', id)) || 'นิรนาม';
      const L = [['HSET', 'arr:' + W, id, na, pm.o, nb], ['EXPIRE', 'arr:' + W, 86400 * 40], ['ZADD', 'ars:' + W, na, id, nb, pm.o], ['EXPIRE', 'ars:' + W, 86400 * 40],
        ['LPUSH', 'ardef:' + pm.o, JSON.stringify({ n: nm, w: w ? 0 : 1, d: db, t: now, a: id })], ['LTRIM', 'ardef:' + pm.o, 0, 19], ['EXPIRE', 'ardef:' + pm.o, 86400 * 14], ['HINCRBY', 'ardefn', pm.o, 1]];
      if (w) L.push(['ZINCRBY', 'arenaW:' + W, 1, nm], ['EXPIRE', 'arenaW:' + W, 86400 * 40]);
      await pipe(L); return res.json({ ok: 1, rt: na, d: da, lg: arLg(na), ort: nb });
    }
    if (a === 'arena') {
      const me = { n: clean(b.n, 20) || 'นิรนาม', p: Math.max(0, +b.p || 0), hp: +b.hp || 100, r: clean(b.r, 30), ri: Math.max(0, Math.min(12, +b.ri || 0)), x: b.x ? 1 : 0, t: now };
      if (b.tp || !powOk(me.p, me.ri, me.x, null) || await isBanned()) return res.status(403).json({ err: 'integrity' });
      const ok = await cmd('SET', 'arl:' + id, 1, 'NX', 'EX', 20);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const key = 'arena:' + me.x + ':' + me.ri;
      await pipe([['HSET', key, id, JSON.stringify(me)], ['EXPIRE', key, 86400 * 14]]);
      let o = null;
      for (let k = 0; k < 4 && !o; k++) {
        const f = await cmd('HRANDFIELD', key, 1);
        const fid = Array.isArray(f) ? f[0] : f;
        if (fid && fid !== id) o = JSON.parse(await cmd('HGET', key, fid));
      }
      return res.json({ o });
    }
    if (a === 'arenaRes') {
      if (b.w) await pipe([['ZINCRBY', 'arenaW:' + W, 1, clean(b.n, 20) || 'นิรนาม'], ['EXPIRE', 'arenaW:' + W, 86400 * 40]]);
      return res.json({ ok: 1 });
    }
    if (a === 'save') {
      const d = String(b.d || '');
      if (!d || d.length > 900000) return res.status(400).json({ err: 'size' });
      const ok = await cmd('SET', 'svrl:' + id, 1, 'NX', 'EX', 30);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const AB = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = ''; for (let i = 0; i < 8; i++) code += AB[Math.floor(Math.random() * AB.length)];
      await cmd('SET', 'cs:' + code, d, 'EX', 86400 * 30);
      return res.json({ code });
    }
    if (a === 'bug') {
      const ok = await cmd('SET', 'bgrl:' + id, 1, 'NX', 'EX', 30);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const x = clean(b.x, 600);
      if (x.length < 3) return res.status(400).json({ err: 'empty' });
      const m = { i: 'b' + now.toString(36) + Math.random().toString(36).slice(2, 5), t: now, n: clean(b.n, 20) || 'นิรนาม', k: b.k === 'idea' ? 'idea' : 'bug', x, v: clean(b.v, 10), u: id.slice(0, 4) };
      await pipe([['LPUSH', 'bugs2', JSON.stringify(m)], ['LTRIM', 'bugs2', 0, 299], ['HSET', 'buginfo', m.i, String(b.info || '').slice(0, 1500)], ['HSET', 'bugown', m.i, id]]);
      return res.json({ ok: 1, i: m.i });
    }
    if (a === 'bugvote') {
      const bid = String(b.bid || '').slice(0, 20);
      const [, n] = await pipe([['SADD', 'bv:' + bid, id], ['SCARD', 'bv:' + bid]]);
      return res.json({ n });
    }
    if (a === 'reply') {
      if (!ADM_KEY || String(b.key || '') !== ADM_KEY) return res.status(403).json({ err: 'forbidden' });
      const kind = b.kind === 'r' ? 'r' : 'b', mid = String(b.mid || '').replace(/[^a-z0-9]/gi, '').slice(0, 30);
      if (!mid) return res.status(400).json({ err: 'mid' });
      const x = clean(b.x, 400);
      if (!x) { await cmd('HDEL', 'replies', kind + ':' + mid); return res.json({ ok: 1, del: 1 }) }
      await cmd('HSET', 'replies', kind + ':' + mid, JSON.stringify({ x, t: now }));
      let pr = null;
      try {
        let owner = null;
        if (kind === 'b') owner = await cmd('HGET', 'bugown', mid);
        else { const all = await cmd('HGETALL', 'reviews'); for (let i = 0; i < (all || []).length; i += 2) { const v = jp(all[i + 1]); if (v && v.i === mid) { owner = all[i]; break } } }
        if (owner) pr = await withCap(noteTo(owner, { t: kind === 'b' ? '💬 ผู้ดูแลตอบรายงานของคุณแล้ว' : '💬 ผู้ดูแลตอบรีวิวของคุณแล้ว', b: x.slice(0, 160), u: kind === 'b' ? '/?go=bugs' : '/?go=fb', g: 'rp-' + mid }), 8000);
        else pr = { owner: 0 };
      } catch (e) {}
      return res.json({ ok: 1, push: pr });
    }
    if (a === 'bugedit') {
      const ok = await cmd('SET', 'bgel:' + id, 1, 'NX', 'EX', 8);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const mid = String(b.mid || '').replace(/[^a-z0-9]/gi, '').slice(0, 30);
      const x = clean(b.x, 600);
      if (!mid || x.length < 3) return res.status(400).json({ err: 'empty' });
      let owner = await cmd('HGET', 'bugown', mid);
      if (!owner) { const list = await cmd('LRANGE', 'bugs2', 0, 299); const f = (list || []).map(s0 => { try { return JSON.parse(s0) } catch { return null } }).find(m => m && m.i === mid); if (f && f.u && f.u === String(id).slice(0, 4)) owner = id }
      if (owner !== id) return res.status(403).json({ err: 'forbidden' });
      await cmd('HSET', 'bugedit', mid, JSON.stringify({ x, t: now }));
      return res.json({ ok: 1 });
    }
    if (a === 'meet') {
      const x = b.x ? 1 : 0, key = 'mp:' + x;
      const me = { n: clean(b.n, 20) || 'นิรนาม', ri: Math.max(0, Math.min(12, +b.ri || 0)), p: Math.max(0, Math.min(1e13, +b.p || 0)), f: clean(b.f, 30), age: Math.max(0, +b.age || 0), c: Math.max(0, Math.min(999, Math.round(+b.cha || 0))), t: now };
      if (b.bm) { me.bm = 1; me.sp = clean(b.sp, 20); me.st = Math.max(0, Math.min(9, +b.st || 0)); me.p = Math.min(me.p, 1e12) }
      const okMe = !b.tp && (me.bm ? me.p <= 1e12 : powOk(me.p, me.ri, x, me.age)) && !(await isBanned());
      const [, all, box] = await pipe([okMe ? ['HSET', key, id, JSON.stringify(me)] : ['HDEL', key, id], ['HGETALL', key], ['LRANGE', 'mbox:' + id, 0, 9]]);
      const cand = [], stale = [];
      for (let i = 0; i < (all || []).length; i += 2) { const k0 = all[i]; let v = null; try { v = JSON.parse(all[i + 1]) } catch {} if (!v || now - v.t > 120e3) { stale.push(k0); continue } if (k0 !== id) cand.push(Object.assign(v, { k: k0.slice(0, 6) + k0.slice(-4) })) }
      const L2 = [['EXPIRE', key, 3600]]; if (stale.length) L2.push(['HDEL', key, ...stale.slice(0, 50)]); if (box && box.length) L2.push(['DEL', 'mbox:' + id]);
      await pipe(L2);
      // สัตว์อสูรไม่เป็นฝ่ายเริ่ม · มนุษย์มีโอกาสเจอสัตว์อสูร (ผู้เล่นจริง) มากขึ้นเมื่อมีในเซิร์ฟเวอร์
      let o = null;
      if (!me.bm && cand.length) { const bc = cand.filter(c => c.bm), hc = cand.filter(c => !c.bm); const pool = bc.length && (!hc.length || Math.random() < .45) ? bc : hc.length ? hc : bc; o = pool[Math.floor(Math.random() * pool.length)] }
      let pa = null, pw = 0; try { pa = paSum(await paTick(now)); pw = +(await cmd('LLEN', 'pa:win:' + id)) || 0 } catch {}
      return res.json({ pa, pw, o, n: cand.length, inbox: (box || []).map(s0 => { try { return JSON.parse(s0) } catch { return null } }).filter(Boolean) });
    }
    if (a === 'meetact') {
      if (b.tp || await isBanned()) return res.json({ ok: 0 });
      const ok = await cmd('SET', 'mtl:' + id, 1, 'NX', 'EX', 15);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const to = String(b.to || '').replace(/[^a-z0-9]/g, '').slice(0, 12), x = b.x ? 1 : 0;
      const all = await cmd('HKEYS', 'mp:' + x);
      const tid = (all || []).find(k0 => k0.slice(0, 6) + k0.slice(-4) === to);
      if (!tid || tid === id) return res.json({ ok: 0 });
      const kind = ['fight', 'ally'].includes(b.kind) ? b.kind : 'fight';
      const m = { kind, n: clean(b.n, 20) || 'นิรนาม', win: b.win ? 1 : 0, ok: b.ok ? 1 : 0, ri: Math.max(0, Math.min(12, +b.ri || 0)), k: id.slice(0, 6) + id.slice(-4), t: now };
      await pipe([['LPUSH', 'mbox:' + tid, JSON.stringify(m)], ['LTRIM', 'mbox:' + tid, 0, 9], ['EXPIRE', 'mbox:' + tid, 3600]]);
      return res.json({ ok: 1 });
    }
    // ---- พบผู้เล่นจริงแบบสองฝ่าย: ห้องพบกัน มีเวลาเลือกฝ่ายละ 10 วิ ไม่เลือกสุ่มให้ ----
    if (a === 'mtopen' || a === 'mtpick' || a === 'mtmsg' || a === 'mtst') {
      if (!okId(id)) return res.json({ ok: 0 });
      if (b.tp || await isBanned()) return res.json({ ok: 0 });
      const CH = ['fight', 'ally', 'betray', 'leave'];
      const rnd = () => CH[Math.floor(Math.random() * CH.length)];
      const camp = c => c === 'fight' ? 'h' : c === 'leave' ? 'p' : 'f';   // ศัตรู / ถอย / เป็นมิตร (แสร้งสาบานก็ดูเป็นมิตร)
      const resolve = r => {
        if (r.res) return r;
        const dA = r.t0 + 15e3, dB = (r.seen ? Math.min(r.seen, r.t0 + 60e3) : r.t0 + 60e3) + 15e3;
        if (!r.c.a && now > dA) { r.c.a = rnd(); r.auto = (r.auto || '') + 'a' }
        if (!r.c.b && now > dB) { r.c.b = rnd(); r.auto = (r.auto || '') + 'b' }
        if (!r.c.a || !r.c.b) return r;
        // รอบ 2: ท่าทีขัดกัน → เห็นท่าทีคร่าวๆ ของอีกฝ่าย แล้วเปลี่ยนใจได้ 1 ครั้งใน 6 วิ
        if (!r.r2 && camp(r.c.a) !== camp(r.c.b)) { r.startR2 = 1; r.r2 = now; return r }
        const fin = sd => !r.r2 ? r.c[sd] : (r.c2[sd] || (now > r.r2 + 7500 ? r.c[sd] : null));
        const ca = fin('a'), cb = fin('b'); if (!ca || !cb) return r;
        const pa = Math.max(1, r.A.p), pb = Math.max(1, r.B.p), P = (x, y) => Math.pow(x, 1.3) / (Math.pow(x, 1.3) + Math.pow(y, 1.3)), pw = P(pa, pb);
        const duel = (bonusA) => { const q = Math.max(.05, Math.min(.95, pw + bonusA)); return { k: 'duel', w: Math.random() < q ? 'a' : 'b' } };
        const cha = sd => Math.max(0, +((sd === 'a' ? r.A : r.B).c) || 0);
        const flee = (fl, ft) => { const q = P(fl === 'a' ? pa : pb, ft === 'a' ? pa : pb), esc = Math.max(.15, Math.min(.85, .25 + q * .6)); return Math.random() < esc ? { k: 'flee', w: fl } : Object.assign(duel(0), { caught: fl }) };
        const persuade = fr => Math.random() < Math.max(.1, Math.min(.65, .15 + cha(fr) / 300));
        const CA = camp(ca), CB = camp(cb);
        let o;
        if (CA === 'h' && CB === 'h') o = duel(0);
        else if (CA === 'h' && CB === 'p') o = flee('b', 'a');
        else if (CB === 'h' && CA === 'p') o = flee('a', 'b');
        else if (CA === 'h') o = cb === 'betray' ? Object.assign(duel(0), { wary: 'b' }) : Object.assign(duel(.15), { amb: 'a' });
        else if (CB === 'h') o = ca === 'betray' ? Object.assign(duel(0), { wary: 'a' }) : Object.assign(duel(-.15), { amb: 'b' });
        else if (CA === 'p' && CB === 'p') o = { k: 'none' };
        else if (CA === 'p' || CB === 'p') { const fr = CA === 'f' ? 'a' : 'b'; o = persuade(fr) ? { k: 'pact', ba: ca === 'betray' ? 1 : 0, bb: cb === 'betray' ? 1 : 0, per: fr } : { k: 'none', tried: fr } }
        else o = { k: 'pact', ba: ca === 'betray' ? 1 : 0, bb: cb === 'betray' ? 1 : 0 };
        if (o.k === 'pact' && !o.ba && !o.bb && !o.per) o.bonus = 1;   // ไว้ใจกันจริงทั้งคู่
        o.fa = ca; o.fb = cb; r.res = o; r.rt = now; return r;
      };
      const load = async rid => { const v = await cmd('GET', 'mr:' + rid); try { return v ? JSON.parse(v) : null } catch { return null } };
      const save = (rid, r) => ['SET', 'mr:' + rid, JSON.stringify(r), 'EX', 600];
      const mask = c => c === 'betray' ? 'ally' : c;
      const view = (r, side) => { const os = side === 'a' ? 'b' : 'a', R0 = r.res; return { rid: r.rid, side, o: side === 'a' ? r.B : r.A, picked: !!r.c[side], opicked: !!r.c[os], ph: R0 ? 0 : r.r2 ? 2 : 1, r2dl: r.r2 ? r.r2 + 6000 : 0, ost: r.r2 && r.c[os] ? camp(r.c[os]) : '', my1: r.c[side] || '', picked2: !!(r.c2 && r.c2[side]), res: R0 ? Object.assign({}, R0, { my: R0['f' + side] || r.c[side], their: mask(R0['f' + os] || r.c[os]), auto: (r.auto || '').includes(side) ? 1 : 0 }) : null, msg: r.m[os] || '', dl: side === 'a' ? r.t0 + 10e3 : (r.seen || now) + 10e3 } };
      if (a === 'mtopen') {
        const ok = await cmd('SET', 'mtl:' + id, 1, 'NX', 'EX', 15);
        if (!ok) return res.status(429).json({ err: 'rate' });
        const to = String(b.to || '').replace(/[^a-z0-9]/g, '').slice(0, 12), x = b.x ? 1 : 0;
        const all = await cmd('HGETALL', 'mp:' + x); let tid = null, B = null;
        for (let i = 0; i < (all || []).length; i += 2) if (all[i].slice(0, 6) + all[i].slice(-4) === to) { tid = all[i]; try { B = JSON.parse(all[i + 1]) } catch {} }
        if (!tid || tid === id || !B || now - B.t > 150e3 || B.bm) return res.json({ ok: 0 });
        const A = { n: clean(b.n, 20) || 'นิรนาม', ri: Math.max(0, Math.min(12, +b.ri || 0)), p: Math.max(0, Math.min(1e13, +b.p || 0)), f: clean(b.f, 30), age: Math.max(0, +b.age || 0), c: Math.max(0, Math.min(999, Math.round(+b.cha || 0))), k: id.slice(0, 6) + id.slice(-4) };
        B = { n: B.n, ri: B.ri, p: B.p, f: B.f, age: B.age, c: B.c || 0, k: to };
        const rid = (now.toString(36) + Math.random().toString(36).slice(2, 6)).slice(-10);
        const r = { rid, a: id, b: tid, A, B, t0: now, c: {}, m: {}, x };
        await pipe([save(rid, r), ['LPUSH', 'mbox:' + tid, JSON.stringify({ kind: 'room', rid, n: A.n, t: now })], ['LTRIM', 'mbox:' + tid, 0, 9], ['EXPIRE', 'mbox:' + tid, 3600]]);
        return res.json({ ok: 1, st: view(r, 'a') });
      }
      const rid = String(b.rid || '').replace(/[^a-z0-9]/g, '').slice(0, 12);
      const r = await load(rid);
      if (!r) return res.json({ ok: 0, gone: 1 });
      const side = r.a === id ? 'a' : r.b === id ? 'b' : null;
      if (!side) return res.status(403).json({ err: 'forbidden' });
      const os = side === 'a' ? 'b' : 'a', oid = side === 'a' ? r.b : r.a, K = 'mrx:' + rid;
      // ทุกช่องเขียนแบบ HSETNX (ใครเขียนก่อนได้ก่อน) — สองเครื่องยิงพร้อมกันก็ไม่ทับกัน
      const W0 = [];
      if (side === 'b') W0.push(['HSETNX', K, 'seen', now]);
      if (a === 'mtpick') { const c = String(b.c || ''); W0.push(['HSETNX', K, (+b.r === 2 ? 'c2' : 'c') + side, CH.includes(c) ? c : rnd()]) }
      let msgNew = '';
      if (a === 'mtmsg') { msgNew = clean(b.x, 120); if (msgNew) W0.push(['HSETNX', K, 'm' + side, msgNew]) }
      W0.push(['EXPIRE', K, 600], ['HGETALL', K]);
      const out = await pipe(W0), hv = out[out.length - 1] || [], H = {};
      if (Array.isArray(hv)) for (let k = 0; k < hv.length; k += 2) H[hv[k]] = hv[k + 1]; else Object.assign(H, hv || {});
      const had = !!H.res;
      r.seen = +H.seen || 0; r.c = { a: H.ca, b: H.cb }; r.r2 = +H.r2 || 0; r.c2 = { a: H.c2a, b: H.c2b }; r.m = { a: H.ma, b: H.mb }; r.auto = H.auto || '';
      if (H.res) { try { r.res = JSON.parse(H.res) } catch {} }
      const L = [];
      if (!r.res) {
        const c0 = { a: r.c.a, b: r.c.b }; resolve(r);
        for (const sd of ['a', 'b']) if (!c0[sd] && r.c[sd]) L.push(['HSETNX', K, 'c' + sd, r.c[sd]]);
        if (r.auto) L.push(['HSET', K, 'auto', r.auto]);
        if (r.startR2) L.push(['HSETNX', K, 'r2', r.r2]);
        if (r.res) L.push(['HSETNX', K, 'res', JSON.stringify(r.res)], ['HGET', K, 'res'], ['HGET', K, 'ca'], ['HGET', K, 'cb']);
      }
      if (a === 'mtmsg' && msgNew && H['m' + side] === msgNew) L.push(['LPUSH', 'mbox:' + oid, JSON.stringify({ kind: 'mmsg', rid, n: (side === 'a' ? r.A : r.B).n, x: msgNew, t: now })], ['LTRIM', 'mbox:' + oid, 0, 9], ['EXPIRE', 'mbox:' + oid, 3600]);
      if (L.length) {
        const o2 = await pipe(L);
        if (r.res) { const n = L.length; const ri = L.findIndex(x => x[0] === 'HGET' && x[2] === 'res'); if (ri >= 0) { try { r.res = JSON.parse(o2[ri]) } catch {} r.c.a = o2[ri + 1] || r.c.a; r.c.b = o2[ri + 2] || r.c.b } }
      }
      if (r.res && !had) await pipe([['LPUSH', 'mbox:' + oid, JSON.stringify({ kind: 'mres', rid, t: now })], ['LTRIM', 'mbox:' + oid, 0, 9], ['EXPIRE', 'mbox:' + oid, 3600]]);
      return res.json({ ok: 1, st: view(r, side) });
    }
    // ---- 🐾 ล่าสัตว์อสูร (ผู้เล่นมนุษย์ ≤2 คน vs ผู้เล่นสัตว์อสูร แบบเรียลไทม์) ----
    if (a === 'bhopen' || a === 'bhpick' || a === 'bhst') {
      if (!okId(id)) return res.json({ ok: 0 });
      if (a !== 'bhst' && (b.tp || await isBanned())) return res.json({ ok: 0 });
      const BH_JOIN = 20e3, BH_DL = 30e3;
      const ld = async k => { const v = await cmd('GET', k); try { return v ? JSON.parse(v) : null } catch { return null } };
      const sv = (rid, r) => ['SET', 'bhr:' + rid, JSON.stringify(r), 'EX', 900];
      const P = (x, y) => Math.pow(Math.max(1, x), 1.3) / (Math.pow(Math.max(1, x), 1.3) + Math.pow(Math.max(1, y), 1.3));
      const resolve = (r, H) => {
        if (r.res) return r;
        const nh = r.H.length, end = r.t0 + BH_DL, allIn = H.cb && r.H.every((_, i) => H['c' + i] && (nh < 2 || H['j' + i]));
        if (!(now > end || (allIn && (nh >= 2 || now > r.t0 + BH_JOIN)))) return r;
        const rc = a0 => a0[Math.floor(Math.random() * a0.length)];
        const cb = H.cb || rc(['fight', 'flee', 'hide']), hc = r.H.map((_, i) => H['c' + i] || rc(['hunt', 'trap'])), hj = r.H.map((_, i) => H['j' + i] || rc(['coop', 'steal']));
        const o = { cb, hc, hj, log: [] }; let alive = r.H.map((_, i) => i), hp = r.H.map(h => h.p);
        if (nh === 2) {
          const s0 = hj[0] === 'steal', s1 = hj[1] === 'steal';
          if (s0 || s1) { const w = (s0 && !s1) ? (Math.random() < .6 + .3 * (P(hp[0], hp[1]) - .5) ? 0 : 1) : (s1 && !s0) ? (Math.random() < .6 + .3 * (P(hp[1], hp[0]) - .5) ? 1 : 0) : (Math.random() < P(hp[0], hp[1]) ? 0 : 1);
            o.betray = { w, l: 1 - w }; alive = [w]; hp = hp.map((v, i) => i === w ? v * .85 : 0) }
          else o.coop = 1 }
        const hunt = alive.reduce((a0, i) => a0 + hp[i], 0) * (o.coop ? .9 : 1), trap = alive.some(i => hc[i] === 'trap'), bp = r.B.p;
        let bw = null;
        if (cb === 'fight') { const q = P(bp, hunt) + (trap ? .08 : 0); bw = Math.random() < Math.max(.05, Math.min(.95, q)) ? 'b' : 'h' }
        else if (cb === 'flee') { const esc = Math.max(.15, Math.min(.85, .35 + .5 * (P(bp, hunt) - .5) - (trap ? .2 : 0))); bw = Math.random() < esc ? 'esc' : 'h' }
        else { const hid = trap ? .2 : .55; bw = Math.random() < hid ? 'hid' : (Math.random() < P(bp, hunt) * .8 ? 'b' : 'h') }
        o.k = bw;
        if (bw === 'h') { let taker = alive[0]; if (alive.length === 2) taker = Math.random() < P(hp[0], hp[1]) ? 0 : 1; o.taker = taker }
        r.res = o; r.rt = now; return r };
      const view = (r, H, role) => ({ rid: r.rid, role, B: r.B, H: r.H.map(h => ({ n: h.n, p: h.p })), t0: r.t0, now, join: r.t0 + BH_JOIN, dl: r.t0 + BH_DL, my: role === 'b' ? (H.cb || '') : (H['c' + role.slice(1)] || ''), myj: role === 'b' ? '' : (H['j' + role.slice(1)] || ''), res: r.res || null });
      if (a === 'bhopen') {
        if ((await cmd('SET', 'bhl:' + id, 1, 'NX', 'EX', 30)) !== 'OK') return res.status(429).json({ err: 'rate' });
        const to = String(b.to || '').replace(/[^a-z0-9]/g, '').slice(0, 12), x = b.x ? 1 : 0;
        const all = await cmd('HGETALL', 'mp:' + x); let tid = null, B = null;
        for (let i = 0; i < (all || []).length; i += 2) if (all[i].slice(0, 6) + all[i].slice(-4) === to) { tid = all[i]; try { B = JSON.parse(all[i + 1]) } catch {} }
        if (!tid || tid === id || !B || !B.bm || now - B.t > 150e3) return res.json({ ok: 0 });
        const me = { id, n: clean(b.n, 20) || 'นิรนาม', p: Math.max(1, Math.min(1e13, +b.p || 1)), k: id.slice(0, 6) + id.slice(-4) };
        const cur = await cmd('GET', 'bhc:' + tid); let r = cur ? await ld('bhr:' + cur) : null;
        if (r && !r.res && now - r.t0 < BH_JOIN && r.H.length < 2 && !r.H.some(h => h.id === id)) {
          r.H.push(me); await pipe([sv(r.rid, r), ['LPUSH', 'mbox:' + r.H[0].id, JSON.stringify({ kind: 'bhj', rid: r.rid, n: me.n, t: now })], ['LTRIM', 'mbox:' + r.H[0].id, 0, 9], ['EXPIRE', 'mbox:' + r.H[0].id, 3600]]);
          return res.json({ ok: 1, st: view(r, {}, 'h1') }) }
        if (await cmd('GET', 'bhcd:' + tid)) return res.json({ ok: 0, cd: 1 });
        const rid = (now.toString(36) + Math.random().toString(36).slice(2, 6)).slice(-10);
        r = { rid, b: tid, B: { n: B.n, p: B.p, sp: B.sp || '', st: B.st || 0, k: to }, H: [me], t0: now, x };
        await pipe([sv(rid, r), ['SET', 'bhc:' + tid, rid, 'EX', 120], ['SET', 'bhcd:' + tid, 1, 'EX', 600], ['LPUSH', 'mbox:' + tid, JSON.stringify({ kind: 'bh', rid, n: me.n, t: now })], ['LTRIM', 'mbox:' + tid, 0, 9], ['EXPIRE', 'mbox:' + tid, 3600]]);
        return res.json({ ok: 1, st: view(r, {}, 'h0') });
      }
      const rid = String(b.rid || '').replace(/[^a-z0-9]/g, '').slice(0, 12);
      let r = await ld('bhr:' + rid); if (!r) return res.json({ ok: 0, gone: 1 });
      const hi = r.H.findIndex(h => h.id === id), role = r.b === id ? 'b' : hi >= 0 ? 'h' + hi : null;
      if (!role) return res.status(403).json({ err: 'forbidden' });
      const K = 'bhx:' + rid, W = [];
      if (a === 'bhpick') { const c = String(b.c || ''), j = String(b.j || '');
        if (role === 'b' && ['fight', 'flee', 'hide'].includes(c)) W.push(['HSETNX', K, 'cb', c]);
        if (role !== 'b') { if (['hunt', 'trap'].includes(c)) W.push(['HSETNX', K, 'c' + hi, c]); if (['coop', 'steal'].includes(j)) W.push(['HSETNX', K, 'j' + hi, j]) } }
      W.push(['EXPIRE', K, 900], ['HGETALL', K]);
      const out = await pipe(W), hv = out[out.length - 1] || [], H = {};
      if (Array.isArray(hv)) for (let k = 0; k < hv.length; k += 2) H[hv[k]] = hv[k + 1]; else Object.assign(H, hv || {});
      if (H.res) { try { r.res = JSON.parse(H.res) } catch {} }
      if (!r.res) { resolve(r, H); if (r.res) { const ok = await cmd('HSETNX', K, 'res', JSON.stringify(r.res)); if (+ok !== 1) { try { r.res = JSON.parse(await cmd('HGET', K, 'res')) } catch {} } else {
        const ids = [r.b, ...r.H.map(h => h.id)].filter(x0 => x0 !== id), L = []; ids.forEach(t => L.push(['LPUSH', 'mbox:' + t, JSON.stringify({ kind: 'bhres', rid, t: now })], ['LTRIM', 'mbox:' + t, 0, 9], ['EXPIRE', 'mbox:' + t, 3600])); L.push(['DEL', 'bhc:' + r.b]); await pipe(L) } } }
      return res.json({ ok: 1, st: view(r, H, role) });
    }
    if (a === 'pa' || a === 'pabid' || a === 'pachat' || a === 'pavote' || a === 'paclaim') {
      if (!okId(id)) return res.json({ ok: 0 });
      if (a !== 'pa' && a !== 'paclaim' && (b.tp || await isBanned())) return res.json({ ok: 0, err: 'ban' });
      const cur = await paTick(now); if (!cur) return res.json({ ok: 1, cur: null });
      const sid = cur.sid;
      if (a === 'pabid') {
        if (String(b.sid) !== sid || +b.li !== cur.li || cur.phase !== 'open') return res.json({ ok: 0, err: 'lot' });
        if ((await cmd('SET', 'pabl:' + id, 1, 'NX', 'PX', 900)) !== 'OK') return res.status(429).json({ err: 'rate' });
        const [wd, ws] = await pipe([['GET', 'pa:wd:' + PA_DAY(now) + ':' + id], ['HGET', 'pa:ws:' + sid, id]]);
        if ((+wd || 0) >= 3) return res.json({ ok: 0, code: -2 });
        if ((+ws || 0) >= 2) return res.json({ ok: 0, code: -3 });
        const g = Math.max(1, Math.min(1e13, Math.floor(+b.g || 0))), L = cur.lots[cur.li];
        { const why = paElig(L, ['m', 'x', 'g'].includes(b.w) ? b.w : 'm', Math.max(0, Math.min(9, Math.floor(+b.ri || 0)))); if (why) return res.json({ ok: 0, code: -4, why }) }
        const r = await cmd('EVAL', PA_BID_LUA, 2, 'pa:b:' + sid + ':' + cur.li, 'pa:end:' + sid, g, id, clean(b.n, 20) || 'นิรนาม', now, L.g);
        return res.json({ ok: +r[0] === 1 ? 1 : 0, code: +r[0], hi: +r[1] });
      }
      if (a === 'pachat') {
        if ((await cmd('SET', 'pacl:' + id, 1, 'NX', 'PX', 1800)) !== 'OK') return res.status(429).json({ err: 'rate' });
        const x = clean(b.x, 80); if (!x) return res.json({ ok: 0 });
        const m = { i: Math.random().toString(36).slice(2, 9), n: clean(b.n, 20) || 'นิรนาม', x, t: now };
        await pipe([['LPUSH', 'pa:c:' + sid, JSON.stringify(m)], ['LTRIM', 'pa:c:' + sid, 0, 39], ['EXPIRE', 'pa:c:' + sid, 3600]]);
        return res.json({ ok: 1 });
      }
      if (a === 'pavote') {
        const l = Math.floor(+b.l); if (!(l >= 0 && l < cur.lots.length) || cur.lots[l].sold || l === cur.li) return res.json({ ok: 0 });
        const ok = await cmd('HSETNX', 'pa:vu:' + sid, id, l); if (+ok !== 1) return res.json({ ok: 0, err: 'voted' });
        await pipe([['HINCRBY', 'pa:v:' + sid, 'l' + l, 1], ['EXPIRE', 'pa:v:' + sid, 3600], ['EXPIRE', 'pa:vu:' + sid, 3600]]);
        return res.json({ ok: 1 });
      }
      if (a === 'paclaim') { const w = String(b.w || ''); if (w) await cmd('LREM', 'pa:win:' + id, 1, w); return res.json({ ok: 1 }) }
      const join = !!(b.join || qOf(req).join);
      const [, , vw, bh, ch0, vh, myv, wins, endV] = await pipe([join ? ['ZADD', 'pa:vw:' + sid, now, id] : ['PING'], ['ZREMRANGEBYSCORE', 'pa:vw:' + sid, 0, now - 15e3], ['ZCARD', 'pa:vw:' + sid], ['HGETALL', 'pa:b:' + sid + ':' + cur.li], ['LRANGE', 'pa:c:' + sid, 0, 24], ['HGETALL', 'pa:v:' + sid], ['HGET', 'pa:vu:' + sid, id], ['LRANGE', 'pa:win:' + id, 0, 9], ['GET', 'pa:end:' + sid]]);
      const H = {}; if (Array.isArray(bh)) for (let i = 0; i < bh.length; i += 2) H[bh[i]] = bh[i + 1]; else Object.assign(H, bh || {});
      const V = {}; if (Array.isArray(vh)) for (let i = 0; i < vh.length; i += 2) V[vh[i]] = +vh[i + 1]; else for (const k in (vh || {})) V[k] = +vh[k];
      return res.json({ ok: 1, now, cur: { sid, phase: cur.phase, next: cur.next || 0, li: cur.li, end: +endV || cur.end || 0, nb: cur.nbEnd || 0, lots: cur.lots, votes: V }, bid: { hi: +H.hi || 0, bn: H.bn || '', me: H.by === id ? 1 : 0, ext: +H.ext || 0 }, vw: +vw || 0, chat: (ch0 || []).map(jp).filter(Boolean).reverse(), myv: myv == null ? -1 : +myv, wins: (wins || []) });
    }
    if (a === 'review') {
      const ok = await cmd('SET', 'rvrl:' + id, 1, 'NX', 'EX', 20);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const r = Math.max(1, Math.min(5, Math.round(+b.r || 0)));
      const m = { i: 'r' + id.slice(0, 8), t: now, n: clean(b.n, 20) || 'นิรนาม', r, x: clean(b.x, 400), v: clean(b.v, 10) };
      try { const old = await cmd('HGET', 'reviews', id); if (old) { const o = JSON.parse(old); m.t = o.t || now; m.e = now } } catch {}
      await cmd('HSET', 'reviews', id, JSON.stringify(m));
      return res.json({ ok: 1 });
    }
    return res.status(400).json({ err: 'action' });
  } catch (e) {
    if (/max requests limit|max daily request/i.test(String(e && e.message))) {
      QUOTA_AT = Date.now();
      if (a === 'admin') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); return res.status(503).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>ผู้ดูแล · ฐานข้อมูลเต็มโควตา</title><style>body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;padding:16px;max-width:680px;margin:auto;line-height:1.6}.b{background:#3a1d24;border:2px solid #ff6b6b;border-radius:10px;padding:12px 14px}code{background:#2a2433;padding:2px 6px;border-radius:4px}</style></head><body><h1>🛡️ หน้าผู้ดูแล</h1><div class="b"><b>🔴 ระบบออนไลน์หยุดชั่วคราว — ฐานข้อมูล Upstash ใช้โควตาคำสั่งรายเดือนหมดแล้ว</b><br>ข้อมูลทั้งหมดยังอยู่ครบ (แชท ทำเนียบ กระดานบั๊ก ความคิดเห็น) แค่อ่าน/เขียนไม่ได้จนกว่าโควตาจะรีเซ็ต หรืออัปเกรดฐานข้อมูลที่ console.upstash.com<br><small>ข้อความจากฐานข้อมูล: <code>${String(e.message).replace(/[<>]/g, '').slice(0, 200)}</code></small></div><p>ตัวเกมยังเล่นได้ตามปกติ และเซฟในเครื่องผู้เล่นปลอดภัย</p></body></html>`) }
      return res.status(503).json({ err: 'quota' });
    }
    if (process.env.DEBUG_API) console.error('API_ERR', a, e && e.stack);
    return res.status(500).json({ err: 'server' });
  }
};
