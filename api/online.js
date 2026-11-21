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
const VK0 = { sock: null, ready: null, buf: Buffer.alloc(0), q: [], io: 0 };
// ฐานข้อมูลไม่ตอบ (ต่อไม่ติด 3 ครั้งใน 15 วิ) → พักการต่อใหม่ 4 วิ ตอบผู้เล่นทันทีแทนการค้างรอ · ใช้ร่วมกันทั้ง isolate
let VK_DOWN = 0, VK_FAILS = [];
const vkFailed = () => { const t = Date.now(); VK_FAILS = VK_FAILS.filter(x => t - x < 15000); VK_FAILS.push(t); if (VK_FAILS.length >= 3) { VK_DOWN = t + 4000; VK_FAILS = [] } };
// Cloudflare Workers: socket ใช้ข้ามคำขอไม่ได้ → ให้แต่ละคำขอมี VK ของตัวเอง (AsyncLocalStorage) ทำหลายคำขอพร้อมกันได้ · Vercel ไม่เรียก vkRun จึงใช้ VK0 ตัวเดียวเหมือนเดิม
const { AsyncLocalStorage: _ALS } = require('node:async_hooks');
const VKS = new _ALS();
const vkCtx = () => VKS.getStore() || VK0;
const vkNew = () => ({ sock: null, ready: null, buf: Buffer.alloc(0), q: [], io: 0 });
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
function vkDrop(err, V = vkCtx()) {
  const q = V.q; V.q = []; V.sock = null; V.ready = null; V.cur = null; V.buf = Buffer.alloc(0);
  for (const w of q) w.rej(err || new Error('valkey closed'));
}
function vkConnect() {
  const V = vkCtx();
  if (V.ready) return V.ready;
  if (Date.now() < VK_DOWN) return Promise.reject(new Error('valkey down'));
  V.ready = new Promise((res, rej) => {
    let u; try { u = new URL(VK_URL) } catch { return rej(new Error('VALKEY_URL invalid')) }
    const port = +u.port || 6379, host = u.hostname, secure = u.protocol === 'rediss:';
    const opt = { host, port, servername: host };
    if (process.env.VALKEY_CA) opt.ca = process.env.VALKEY_CA;
    const s = secure ? tls.connect(opt) : net.connect(opt);
    V.cur = s; s.setNoDelay(true); s.setKeepAlive(true, 30000);
    const to = setTimeout(() => { vkFailed(); s.destroy(new Error('valkey connect timeout')) }, 6000);
    s.on('data', d => {
      if (V.cur !== s) return;
      V.io = Date.now();
      V.buf = V.buf.length ? Buffer.concat([V.buf, d]) : d;
      let p = 0;
      for (;;) { const r = vkParse(V.buf, p); if (!r) break; p = r[1]; const w = V.q.shift(); if (w) { r[0] instanceof RErr ? w.rej(new Error(r[0].message)) : w.res(r[0]) } }
      V.buf = p >= V.buf.length ? Buffer.alloc(0) : V.buf.subarray(p);
    });
    s.on('error', e => { clearTimeout(to); if (V.cur === s) vkDrop(e, V); rej(e) });
    s.on('close', () => { clearTimeout(to); if (V.cur === s) vkDrop(undefined, V) });
    s.once(secure ? 'secureConnect' : 'connect', async () => {
      clearTimeout(to); V.sock = s; V.io = Date.now(); VK_FAILS = [];
      try {
        const user = decodeURIComponent(u.username || ''), pass = decodeURIComponent(u.password || '');
        if (pass) await vkSend(user ? ['AUTH', user, pass] : ['AUTH', pass], V);
        res(s);
      } catch (e) { s.destroy(); rej(e) }
    });
  });
  return V.ready;
}
function vkSend(args, V = vkCtx()) {
  return new Promise((res, rej) => {
    if (!V.sock) return rej(new Error('valkey not connected'));
    // ไม่ตอบใน 5 วิ = socket ค้าง (เช่นฟังก์ชันถูกแช่แข็งแล้วปลุกขึ้นมา) → ทิ้ง socket ให้คำสั่งถัดไปต่อใหม่
    const t = setTimeout(() => { rej(new Error('valkey timeout')); const sk = V.sock; if (sk) { vkDrop(new Error('valkey timeout'), V); try { sk.destroy() } catch {} } }, 4000);
    V.q.push({ res: v => { clearTimeout(t); res(v) }, rej: e => { clearTimeout(t); rej(e) } });
    V.sock.write(vkEnc(args));
  });
}
// socket ที่เงียบนานเกิน 40 วิ มักถูกปิดฝั่งเซิร์ฟเวอร์ไปแล้วแบบไม่บอก — ต่อใหม่ก่อนส่ง
function vkFresh() { const V = vkCtx(); if (V.sock && Date.now() - V.io > 40e3 && !V.q.length) { const sk = V.sock; vkDrop(undefined, V); try { sk.destroy() } catch {} } }
const vkConnErr = e => /not connected|closed|ECONNRESET|EPIPE|ETIMEDOUT|connect timeout|socket hang up|valkey timeout/i.test(String(e && e.message));
async function vkTry(fn) { vkFresh(); try { await vkConnect(); return await fn() } catch (e) { if (!vkConnErr(e) || /connect timeout|valkey down/i.test(String(e && e.message))) throw e; vkDrop(); await vkConnect(); return fn() } }
async function vkCmd(...args) { return vkTry(() => vkSend(args)) }
async function vkPipe(list) {
  if (!list.length) return [];
  return vkTry(() => Promise.all(list.map(a => vkSend(a).catch(e => { if (/NOAUTH|WRONGPASS|closed|timeout|not connected|max requests limit|max daily request|OOM/i.test(e.message)) throw e; return undefined }))));
}

// ใช้ตอนรันบน Cloudflare Workers: socket ใช้ข้ามคำขอไม่ได้ → ปิดทิ้งทุกครั้งที่เริ่ม/จบคำขอ (Vercel ไม่ได้เรียกใช้)
const vkReset = () => { const V = vkCtx(), s = V.sock || V.cur; vkDrop(undefined, V); try { s && s.destroy() } catch {} };
const vkRun = fn => VKS.run(vkNew(), fn);
const jp = x => { try { const v = JSON.parse(x); return v && typeof v === 'object' ? v : null } catch { return null } };
const cmd = USE_VK ? vkCmd : upCmd;
const pipe = USE_VK ? vkPipe : upPipe;

// ===== ทำเนียบรายวัน (v15.3): แยก 4 หมวด · คะแนนจากค่าเฉลี่ยทุกด้าน · รางวัลอันดับ 1–3 =====
const BD_CATS = ['m', 'x', 'g', 'b', 'c', 'r', 'ch', 'cs', 'cj', 'cl', 'ck', 'cn', 'cu', 'co', 'cp', 'cz', 'ct', 'ce', 'cq', 'cy']; // c = ทำเนียบท้าทายรวม (เลิกใช้แล้ว) · ch นรก · cs ชีวิตสั้น · cj รากขยะ · r ผู้ย้อนกาล
const CHC = { hell: 'ch', short: 'cs', junk: 'cj', soul: 'cl', sky: 'ck' }, CHM = { h: 'ch', s: 'cs', j: 'cj', l: 'cl', k: 'ck' }, CHF = { ch: 'h', cs: 's', cj: 'j', cl: 'l', ck: 'k', cn: 'n', cu: 'u', co: 'o', cp: 'p', cz: 'z', ct: 't', ce: 'e', cq: 'q', cy: 'y' };
const CH_OK = ['hell', 'short', 'junk', 'regress', 'soul', 'sky'];
// 🏙️ ยุคปัจจุบัน: แยกทำเนียบตามโลกพิเศษ 9 แบบ (ch = 'mw_' + id) · คะแนนเฉลี่ยทุกด้านทั้งชีวิตแบบโหมดปกติ
const MW_B = { hunter: 'n', under: 'u', ghost: 'o', loop: 'p', zombie: 'z', tower: 't', game: 'e', gatewon: 'q', doom: 'y' };
for (const [w, l] of Object.entries(MW_B)) { CHC['mw_' + w] = 'c' + l; CHM[l] = 'c' + l; CHF['c' + l] = l; CH_OK.push('mw_' + w) }
// ฉายาทำเนียบ (ชั่วคราว): รายวัน/สัปดาห์/เดือน · อันดับ 1–3
const RKT = { d: ['', 'ตะวันเจิดจ้า', 'จันทร์เหนือเมฆ', 'ดาวประกาย'], w: ['', 'จ้าวยุทธภพ', 'ขุนศึกไร้พ่าย', 'ยอดฝีมือผงาด'], m: ['', 'จักรพรรดิเหนือฟ้า', 'มหาเทพบัญชาสวรรค์', 'ตำนานผู้ถูกจารึก'] };
const RKT_C = { d: ['', 'ผู้ฝ่าขุมนรก', 'วิญญาณไม่ดับ', 'ผู้ท้าลิขิต'], w: ['', 'ราชันย์ไร้พรสวรรค์', 'จ้าวแห่งเปลวนรก', 'ผู้ทวนชะตา'], m: ['', 'จักรพรรดิผู้ลบลิขิต', 'มารฟ้าทลายกรรม', 'ตำนานจากธุลี'] };
const RKT_A = { w: ['', 'จ้าวลานหมื่นเงา', 'ราชันย์เงาพิฆาต', 'ดาบเงาไร้เทียมทาน'] };
const RKT_R = { d: ['', 'ผู้หมุนเข็มกาล', 'เงาที่ไม่ยอมดับ', 'ผู้ตื่นซ้ำแล้วซ้ำเล่า'], w: ['', 'ผู้ฉีกวงจรแห่งกาล', 'ผู้กลืนกินความตาย', 'ผู้ทวนกระแสกาล'], m: ['', 'ผู้อยู่เหนือกาลเวลา', 'จักรพรรดิแห่งวันวาน', 'ผู้จดจำร้อยชาติ'] };
const RKT_EXP = { d: 86400e3 * 1.1, w: 86400e3 * 7.2, m: 86400e3 * 31 }, RKT_TR = { d: 7, w: 8, m: 9 };
const RKT_H = { d: ['', 'ผู้ฝ่าขุมนรก', 'ผู้ลุยเพลิงอเวจี', 'วิญญาณไม่ดับ'], w: ['', 'จ้าวแห่งเปลวนรก', 'อสูรเพลิงกัลป์', 'ผู้เหยียบขุมไฟ'], m: ['', 'จักรพรรดิแห่งขุมนรก', 'มารฟ้าทลายกรรม', 'ผู้กลับจากอเวจี'] };
const RKT_S = { d: ['', 'ดาวตกสามสิบปี', 'ผู้เผาเทียนสองปลาย', 'ชีวิตเดียวพันตำนาน'], w: ['', 'จ้าวแห่งเวลาอันสั้น', 'ตำนานชั่วพริบตา', 'ผู้ใช้สามสิบปีให้คุ้ม'], m: ['', 'จักรพรรดิแห่งพริบตา', 'ดาวหางผ่าฟ้า', 'ผู้ชนะเวลา'] };
const RKT_J = { d: ['', 'ผู้ท้าลิขิต', 'ขยะผู้ไม่ยอมแพ้', 'ธุลีที่ลุกขึ้น'], w: ['', 'ราชันย์ไร้พรสวรรค์', 'ผู้ทวนชะตา', 'กระดูกขยะทะลวงฟ้า'], m: ['', 'จักรพรรดิผู้ลบลิขิต', 'ตำนานจากธุลี', 'ผู้ทำลายคำพยากรณ์'] };
const RKT_L = { d: ['', 'ผู้ปลุกดวงจิตแห่งวัน', 'วงแหวนพันปีดวงแรก', 'ประกายจิตยุทธ์'], w: ['', 'ราชันจิตวิญญาณ', 'จ้าวแห่งวงแหวนเก้าดวง', 'ผู้สืบทอดจิตเทพ'], m: ['', 'จักรพรรดิจิตยุทธ์เหนือทวีป', 'เทพผู้ครองดวงจิต', 'ตำนานแห่งวงแหวนหมื่นปี'] };
const RKT_K = { d: ['', 'ผู้ทะลวงกำแพงเหล็ก', 'สัญญาณดาวดวงใหม่', 'เซลล์ดาราตื่น'], w: ['', 'จ้าวห้วงดารา', 'ผู้พิทักษ์นครกำแพง', 'นักล่าดาวเทียม'], m: ['', 'จักรพรรดิแห่งกาแล็กซี', 'ราชันเนบิวลา', 'ผู้เดินบนวงโคจร'] };
const RKT_MW = { n: { d: ['', 'ฮันเตอร์ดาวรุ่งแห่งวัน', 'ผู้ปิดเกตไวที่สุด', 'นักล่าลูทแรร์'], w: ['', 'ราชาแห่งเกตมิติ', 'ฮันเตอร์แรงก์เอสแห่งสัปดาห์', 'ผู้คุมดันเจี้ยน'], m: ['', 'จักรพรรดิฮันเตอร์', 'ผู้ตื่นพลังเหนือแรงก์', 'ตำนานสมาคมฮันเตอร์'] }, u: { d: ['', 'เจ้าถิ่นราตรีนี้', 'ดาวเด่นตลาดมืด', 'ตัวตึงซอยเปลี่ยว'], w: ['', 'เบอร์หนึ่งโลกใต้ดิน', 'ผู้คุมเขตเถื่อน', 'มือดีลใต้โต๊ะ'], m: ['', 'เจ้าพ่อแห่งนครใต้ดิน', 'ราชาไฟนีออน', 'ตำนานตลาดมืด'] }, o: { d: ['', 'หมอผีดาวรุ่ง', 'ผู้ไม่กลัวป่าช้า', 'มือปราบผีคืนนี้'], w: ['', 'ปรมาจารย์ยันต์แดง', 'เจ้าของเครื่องรางร้อยองค์', 'ผู้คุมตะเกียงวิญญาณ'], m: ['', 'จ้าวแห่งคาถาอาคม', 'ราชาหมอผีแห่งสยาม', 'ตำนานบ้านผีสิง'] }, p: { d: ['', 'ผู้ตื่นเจ็ดโมงเช้า', 'นักจำวันเดิม', 'ผู้รอดวันซ้ำ'], w: ['', 'ราชาลูปเวลา', 'ผู้หักเข็มวินาที', 'นักสืบเดจาวู'], m: ['', 'จ้าวแห่งวันพรุ่งนี้', 'ผู้ทลายลูปเวลา', 'ตำนานความจำข้ามวัน'] }, z: { d: ['', 'ผู้รอดชีวิตแห่งวัน', 'มือกระสุนนัดสุดท้าย', 'ดาวรุ่งเซฟโซน'], w: ['', 'ราชาแห่งเมืองร้าง', 'ผู้นำเซฟโซน', 'นักล่าคลื่นศพ'], m: ['', 'ผู้ค้นพบวัคซีน', 'จักรพรรดิแห่งเขตกักกัน', 'ตำนานผู้รอดชีวิต'] }, t: { d: ['', 'ผู้ไต่หอแห่งวัน', 'นักทะลวงประตูชั้น', 'ดาวรุ่งบันไดเวียน'], w: ['', 'ผู้พิชิตชั้นที่ร้อย', 'ราชาบอสประจำชั้น', 'นักไต่ไร้พัก'], m: ['', 'ผู้ยืนบนยอดหอคอย', 'จักรพรรดิหอคอย', 'ตำนานชั้นบนสุด'] }, e: { d: ['', 'ผู้เลเวลอัปไวที่สุด', 'นักล่าเควสลับ', 'สายฟาร์มแห่งวัน'], w: ['', 'ราชาหน้าต่างสถานะ', 'เจ้าของสกิลแรร์', 'ผู้เคลียร์อีเวนต์พิเศษ'], m: ['', 'เพลเยอร์เบอร์หนึ่งของระบบ', 'ผู้ทะลุเลเวลสูงสุด', 'ตำนานกาชาเกลือ'] }, q: { d: ['', 'ผู้เฝ้ากำแพงคืนนี้', 'มือปืนแนวป้องกัน', 'ดาวรุ่งฐานทัพมนุษย์'], w: ['', 'ผู้บัญชาการกำแพงเมือง', 'ผู้ยึดโลกคืน', 'ธงมนุษย์ผืนสุดท้าย'], m: ['', 'ผู้ปิดเกตแม่', 'จักรพรรดิเมืองสุดท้าย', 'ตำนานปราการเหล็ก'] }, y: { d: ['', 'ผู้นับถอยหลังอย่างกล้าหาญ', 'เจ้าของหลุมหลบภัย', 'ผู้ยิ้มใต้ฟ้าแดง'], w: ['', 'ผู้นำจรวดอพยพ', 'ราชาเสบียงสุดท้าย', 'ผู้รักจนวันสุดท้าย'], m: ['', 'ผู้กอบกู้วันสิ้นโลก', 'ผู้หยุดอุกกาบาตล้างโลก', 'ตำนานสิบสองปีสุดท้าย'] } };
const RKT_M = { ch: RKT_H, cs: RKT_S, cj: RKT_J, cl: RKT_L, ck: RKT_K }; for (const l in RKT_MW) RKT_M['c' + l] = RKT_MW[l];
const RKT_ALL = new Map(); [RKT, RKT_C, RKT_A, RKT_R, RKT_H, RKT_S, RKT_J, RKT_L, RKT_K, ...Object.values(RKT_MW)].forEach(TT => Object.entries(TT).forEach(([p, L]) => L.forEach((t, r) => { if (t) RKT_ALL.set(t, { p, r }) })));
// ===== ฉายา/กรอบทำเนียบแบบสุ่มจากคลังคำ (ไม่ใช้ AI) · ผลเหมือนกันทุกเครื่องจากรหัสรอบ =====
// รหัสรอบที่มี "v" = ชุดที่ 2 (คลังคำใหญ่ + กรอบประกอบชิ้นส่วน) · ไม่มี "v" = ชุดแรก (คงไว้ให้ของที่แจกไปแล้วหน้าตาไม่เปลี่ยน)
const RKG = (() => {
  const H = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) } return h >>> 0 };
  const RNG = seed => { let q = seed >>> 0 || 1; return () => { q = (q + 0x6D2B79F5) >>> 0; let t = q; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } };
  const pk = (r, a) => a[Math.floor(r() * a.length)];
  // ---------- ชุดแรก (v1) ----------
  const PRE1 = ['อัสนี', 'หิมะ', 'โลหิต', 'จันทรา', 'เพลิงนิล', 'วายุ', 'ธาราฟ้า', 'หยกขาว', 'ทองคำ', 'เงามืด', 'อรุณ', 'สนธยา', 'ดารา', 'เมฆา', 'ศิลา', 'อำพัน', 'มรกต', 'หงส์ไฟ', 'พยัคฆ์', 'กิเลน', 'มังกรฟ้า', 'พันกระบี่', 'หมื่นลี้', 'เก้าสวรรค์', 'สามภพ', 'ไร้เงา', 'ไร้นาม', 'สายฟ้า', 'ราตรี', 'ทะเลเมฆ'];
  const TH1 = { m: ['กระบี่', 'ยุทธภพ', 'ดาบเหล็ก', 'หมัดเหล็ก'], x: ['เซียน', 'เมฆหยก', 'ปราณฟ้า', 'โอสถทิพย์'], g: ['เทพ', 'สวรรค์', 'แสงทิพย์', 'บัลลังก์ฟ้า'], b: ['อสูร', 'เขี้ยวเหล็ก', 'พงไพร', 'กรงเล็บ'], r: ['กาลเวลา', 'วงจร', 'เข็มกาล', 'ทรายย้อน'], c: ['อเวจี', 'เพลิงกัลป์', 'ลิขิตแตก'], h: ['อเวจี', 'เพลิงกัลป์', 'ขุมนรก', 'ไฟบาป'], s: ['ชั่วพริบตา', 'ดาวตก', 'เทียนสองปลาย', 'สามสิบฤดู'], j: ['ธุลี', 'กระดูกขยะ', 'ไร้ราก', 'ฝุ่นทราย'], l: ['ดวงจิต', 'วงแหวนวิญญาณ', 'จิตยุทธ์', 'ร่างแท้'] };
  const CORE1 = [null, ['จักรพรรดิ', 'ราชัน', 'อธิราช', 'มหาเทพ', 'จ้าว', 'ปฐมกษัตริย์'], ['ขุนศึก', 'ยอดยุทธ์', 'อัครเซียน', 'แม่ทัพ', 'ผู้พิชิต', 'จอมดาบ'], ['ดาวรุ่ง', 'ยอดฝีมือ', 'ผู้กล้า', 'นักดาบ', 'ผู้ท้าทาย', 'ศิษย์เอก']];
  const SUF1 = ['แห่งวสันต์', 'เหนือเมฆา', 'ไร้พ่าย', 'แห่งบูรพา', 'แห่งทะเลเหนือ', 'ใต้แสงจันทร์', 'ผู้ทลายฟ้า', 'ผู้ฝ่าพายุ', 'แห่งยุคใหม่', 'ผู้ลิขิตตำนาน', 'แห่งหมื่นศึก', 'ผู้ไม่หลับใหล'];
  function title1(p, c, k, r) {
    const R = RNG(H('t|' + p + '|' + c + '|' + k + '|' + r)), core = pk(R, CORE1[r] || CORE1[3]), pre = (R() < .55 || c === 'k') ? pk(R, TH1[c] || TH1.m) : pk(R, PRE1);
    const of = R() < .35 && !/^(ผู้|แห่ง|ไร้)/.test(pre) ? 'แห่ง' : '', suf = pk(R, SUF1);
    let t = p === 'm' ? core + (/^แห่ง/.test(suf) ? '' : of) + pre + suf : core + of + pre;
    if ([...t].length > 28) t = core + of + pre;
    return t;
  }
  // ---------- ชุดที่ 2: คลังคำใหญ่ขึ้น 2–3 เท่า + คำเฉพาะหมวด ----------
  const PRE = PRE1.concat(['สุริยัน', 'หิมพานต์', 'บูรพา', 'ประจิม', 'ทักษิณ', 'อุดร', 'พายุทราย', 'คลื่นคลั่ง', 'เพลิงฟ้า', 'น้ำค้างแข็ง', 'เมฆดำ', 'ดาวเหนือ', 'รุ้งเจ็ดสี', 'ใบไผ่', 'บัวหิมะ', 'ดอกท้อ', 'ศิลาดำ', 'เหล็กกล้า', 'หยกเลือด', 'หมอกม่วง', 'ทองแดง', 'เงินยวง', 'ไข่มุก', 'ปีกหงส์', 'เกล็ดมังกร', 'เขี้ยวพยัคฆ์', 'พันเมฆ', 'หมื่นดาว', 'ร้อยศึก', 'เจ็ดดารา', 'แปดทิศ', 'สามพันโลก', 'ลมหนาว', 'สนธยาแดง', 'จันทร์เสี้ยว', 'ราตรีกาล']);
  const TH = {
    m: TH1.m.concat(['หอกทวน', 'ทวนเหล็ก', 'เกราะทอง', 'ป้อมปราการ', 'สำนักใหญ่', 'ม้าศึก', 'ลานประลอง', 'กระบี่คู่', 'กำปั้นมังกร', 'ทางยุทธ์']),
    x: TH1.x.concat(['ถ้ำเซียน', 'ยาเม็ดทอง', 'เตาหลอม', 'ภูเขาเซียน', 'กระบี่เหาะ', 'ลมปราณม่วง', 'ทะเลเมฆหยก', 'ค่ายกล', 'ผลท้อสวรรค์', 'ฟ้าเก้าชั้น']),
    g: TH1.g.concat(['วิมานทอง', 'ประตูสวรรค์', 'ราชรถเทพ', 'แสงศักดิ์สิทธิ์', 'บัวสวรรค์', 'กฎฟ้า', 'ดาราเทพ', 'สังข์ทิพย์', 'ทวยเทพ', 'ราชันสวรรค์']),
    b: TH1.b.concat(['ป่าลึก', 'ขนเพลิง', 'เกล็ดหยก', 'หางเก้าแฉก', 'จ่าฝูง', 'เสียงคำราม', 'ถ้ำอสูร', 'สายเลือดดุร้าย', 'คมเขี้ยว', 'ดวงตาอำพัน']),
    r: TH1.r.concat(['นาฬิกาทราย', 'อดีตกาล', 'ชาติที่ร้อย', 'ความทรงจำ', 'รุ่งสางซ้ำ', 'วันวาน', 'เข็มทวน', 'รอยแยกกาล', 'ฤดูที่วนกลับ', 'กาลไร้สิ้นสุด']),
    c: TH1.c.concat(['ลิขิตฟ้า', 'โซ่ตรวน', 'ทวนชะตา', 'บาปกรรม', 'เปลวทมิฬ']),
    h: TH1.h.concat(['ขุมที่สิบแปด', 'สะพานไร้กลับ', 'เพลิงทมิฬ', 'โซ่ตรวน', 'ยมโลก', 'ทะเลเลือด', 'ปีศาจไฟ', 'เถ้าถ่าน', 'ประตูผี', 'ลาวาดำ']),
    s: TH1.s.concat(['ดอกไม้ไฟ', 'เทียนไข', 'รุ้งชั่วคราว', 'ดาวหาง', 'น้ำค้างเช้า', 'ใบไม้ร่วง', 'ฤดูเดียว', 'เปลวเทียน', 'พลุสวรรค์', 'ชั่วลมหายใจ']),
    j: TH1.j.concat(['เศษหิน', 'ใบหญ้า', 'ดินโคลน', 'กิ่งหัก', 'หญ้าป่า', 'เศษเหล็ก', 'ผู้ถูกทิ้ง', 'ขอทาน', 'ตรอกมืด', 'รากหญ้า']),
    l: TH1.l.concat(['วงแหวนหมื่นปี', 'ร่างแท้วิญญาณ', 'ทวีปจิตยุทธ์', 'ราชันจิต', 'แสงดวงจิต', 'วงแหวนทมิฬ', 'ตำนานจิตเทพ', 'ผู้ปลุกจิต', 'ดวงจิตคู่', 'ประกายวิญญาณ'])
  };
  const CORE = [null,
    CORE1[1].concat(['ราชันย์', 'จักรพรรดินี', 'เทพจักรพรรดิ', 'เจ้าโลก', 'ตำนาน', 'มหาราชัน', 'เทพเจ้า', 'อธิปไตย']),
    CORE1[2].concat(['เจ้าสำนัก', 'ผู้พิทักษ์', 'ยอดขุนพล', 'ราชครู', 'จอมยุทธ์', 'นายพล', 'มหาเซียน', 'ผู้คุมกฎ']),
    CORE1[3].concat(['ดาวดวงใหม่', 'อัจฉริยะ', 'ผู้ตื่นรู้', 'ศิษย์รัก', 'ผู้แสวงหา', 'ผู้มาใหม่', 'จอมยุทธ์น้อย', 'ผู้ไต่ฟ้า'])];
  const SUF = SUF1.concat(['ผู้ยืนบนยอดเขา', 'ผู้ไร้ผู้ต่อกร', 'แห่งแปดทิศ', 'ผู้ข้ามทะเลดาว', 'ผู้เดียวในใต้หล้า', 'ใต้ฟ้าเดียวกัน', 'ผู้ไม่หันหลัง', 'แห่งพันปี', 'ผู้ปลุกตำนาน', 'แห่งรุ่งอรุณ', 'ผู้กลืนดวงดาว', 'แห่งสายลม', 'ผู้ตัดสายฟ้า', 'ผู้ยิ้มรับลิขิต']);
  TH.k = ['ดาราเหล็ก', 'นครกำแพง', 'ยีนอสูร', 'อุกกาบาต', 'ไซเบอร์', 'ห้วงดารา', 'นิวเคลียส', 'สัญญาณดาว', 'เซลล์ดารา', 'ควอนตัม', 'โคจร', 'กาแล็กซี', 'เนบิวลา', 'ดาวเทียม', 'นาโน', 'พลาสมา']; TH1.k = TH.k.slice(0, 6);
  // 🏙️ ยุคปัจจุบัน 9 โลก: n ฮันเตอร์ · u ใต้ดิน · o ผีไทย · p วนลูป · z ซอมบี้ · t หอคอย · e ระบบเกม · q เกตชนะ · y วันสิ้นโลก
  const MWL = ['n', 'u', 'o', 'p', 'z', 't', 'e', 'q', 'y'];
  Object.assign(TH, {
    n: ['เกตมิติ', 'แรงก์เอส', 'สมาคมฮันเตอร์', 'ดันเจี้ยน', 'ผู้ตื่นพลัง', 'ลูทแรร์', 'บอสเกต', 'คริสตัลมานา', 'ใบอนุญาตฮันเตอร์', 'เกตแดง', 'ประตูมิติฟ้า', 'นักล่าเงา'],
    u: ['โลกใต้ดิน', 'ตลาดมืด', 'แก๊งมาเฟีย', 'ซอยเปลี่ยว', 'ไฟนีออน', 'บ่อนลับ', 'เจ้าพ่อ', 'รถสปอร์ตดำ', 'ดีลใต้โต๊ะ', 'เขตเถื่อน', 'ไนต์คลับ', 'ถนนสายมืด'],
    o: ['ผีไทย', 'เครื่องราง', 'ยันต์แดง', 'ศาลพระภูมิ', 'บ้านผีสิง', 'คาถาอาคม', 'ตะเกียงวิญญาณ', 'หมอผี', 'กุมารทอง', 'ป่าช้า', 'ต้นตะเคียน', 'สายสิญจน์'],
    p: ['วันซ้ำ', 'ลูปเวลา', 'นาฬิกาปลุก', 'เจ็ดโมงเช้า', 'รีเซ็ตวัน', 'วันพรุ่งนี้', 'เดจาวู', 'เข็มวินาที', 'วันเดิม', 'ความจำข้ามวัน', 'ปฏิทินค้าง', 'วินาทีสุดท้าย'],
    z: ['ซอมบี้', 'ไวรัสคลั่ง', 'เมืองร้าง', 'วัคซีน', 'ผู้รอดชีวิต', 'เซฟโซน', 'กระสุนนัดสุดท้าย', 'รถถังเก่า', 'คลื่นศพ', 'เขตกักกัน', 'ไฟฉายดวงเดียว', 'ห้างร้าง'],
    t: ['หอคอย', 'ชั้นบนสุด', 'บันไดเวียน', 'ชั้นที่ร้อย', 'ผู้ไต่หอ', 'ประตูชั้น', 'บอสประจำชั้น', 'ยอดหอคอย', 'ลิฟต์แก้ว', 'ห้องลับชั้นซ่อน', 'ยอดยอดตึก', 'ชั้นไร้นาม'],
    e: ['ระบบเกม', 'เลเวลอัป', 'หน้าต่างสถานะ', 'เควสลับ', 'สกิลแรร์', 'ค่าประสบการณ์', 'กาชา', 'อีเวนต์พิเศษ', 'คอมโบ', 'ไอเทมตำนาน', 'แต้มสเตตัส', 'โหมดฮาร์ดคอร์'],
    q: ['กำแพงเมือง', 'เมืองสุดท้าย', 'เกตแม่', 'แนวป้องกัน', 'ยึดโลกคืน', 'ปราการเหล็ก', 'ฐานทัพมนุษย์', 'ดินแดนรกร้าง', 'ธงมนุษย์', 'ป้อมปืนใหญ่', 'ประตูเมือง', 'สนามเพลาะ'],
    y: ['วันสิ้นโลก', 'นับถอยหลัง', 'หลุมหลบภัย', 'อุกกาบาตล้างโลก', 'ฟ้าแดง', 'สิบสองปีสุดท้าย', 'จรวดอพยพ', 'วันสุดท้าย', 'เสบียงสุดท้าย', 'ดาวหางมรณะ', 'เสียงไซเรน', 'คืนก่อนโลกแตก']
  });
  MWL.forEach(c => { TH1[c] = TH[c].slice(0, 6) });
  const CORE_MW = [null, ['ราชา', 'ราชินี', 'ไอคอน', 'เบอร์หนึ่ง', 'แชมป์', 'ซูเปอร์สตาร์', 'บอสใหญ่', 'ตัวจริง'], ['ดาวเด่น', 'ตัวท็อป', 'ไอดอล', 'ฮีโร่', 'รองแชมป์', 'มือโปร'], ['ดาวรุ่ง', 'ตัวตึง', 'ผู้มาแรง', 'นิวคัมเมอร์', 'สายแข็ง', 'มือใหม่ไฟแรง']];
  const SUF_MW = ['แห่งนครหลวง', 'กลางเมืองใหญ่', 'ไลฟ์สดทั้งคืน', 'ยอดวิวทะลุล้าน', 'ใต้แสงนีออน', 'ติดเทรนด์อันดับหนึ่ง', 'บนตึกระฟ้า', 'ตลอดกาล', 'ที่ทั้งประเทศพูดถึง', 'แห่งยุคดิจิทัล', 'ผู้ไม่เคยออฟไลน์', 'เหนือฟีดทุกฟีด'];
  function titleMW(p, c, k, r) {
    const R = RNG(H('tm|' + p + '|' + c + '|' + k + '|' + r)), core = pk(R, CORE_MW[r] || CORE_MW[3]), pre = pk(R, TH[c]), of = R() < .4 && !/^(ผู้|แห่ง)/.test(pre) ? 'แห่ง' : '', suf = pk(R, SUF_MW);
    let t = p === 'm' ? core + (/^แห่ง/.test(suf) ? '' : of) + pre + suf : p === 'w' && R() < .35 ? core + pre + suf : core + of + pre;
    if ([...t].length > 28) t = core + of + pre;
    return t;
  }
  function title(p, c, k, r) {
    if (MWL.includes(c)) return titleMW(p, c, k, r);
    if (!/v/.test(String(k))) return title1(p, c, k, r);
    const R = RNG(H('t2|' + p + '|' + c + '|' + k + '|' + r)), core = pk(R, CORE[r] || CORE[3]), pre = (R() < .6 || c === 'k') ? pk(R, TH[c] || TH.m) : pk(R, PRE);
    const of = R() < .35 && !/^(ผู้|แห่ง|ไร้)/.test(pre) ? 'แห่ง' : '', suf = pk(R, SUF);
    let t = p === 'm' ? core + (/^แห่ง/.test(suf) ? '' : of) + pre + suf : p === 'w' && R() < .3 ? core + pre + suf : core + of + pre;
    if ([...t].length > 28) t = core + of + pre;
    return t;
  }
  // ---------- กรอบ ----------
  const PALS = [['#ffd040', '#fff4b0', '#ff9a20'], ['#ff70e0', '#ffffff', '#ffd040'], ['#6ad0ff', '#e8f8ff', '#3a6ad8'], ['#ff5d73', '#ffd0d8', '#8a1a2a'], ['#7ae07a', '#e8ffe0', '#2a8a4a'], ['#b070ff', '#f0e0ff', '#5a2aa8'], ['#ffb050', '#fff0d0', '#c85a1a'], ['#d8e0f0', '#ffffff', '#7a8aa8'], ['#40e0d0', '#e0fffa', '#1a7a8a'], ['#ff8a40', '#ffe0a0', '#a02a1a'], ['#e0c080', '#fff8e0', '#8a6a2a'], ['#ff4ab0', '#ffe0f0', '#6a1a5a']];
  const SH1 = { m: ['sword', 'laurel', 'crown', 'dbl'], x: ['cloud', 'ringh', 'leaf', 'pearl'], g: ['ray', 'ringh', 'star4', 'lotus'], b: ['horn', 'scale', 'thorn', 'wing'], r: ['clock', 'moon', 'star4'], c: ['flame', 'thorn', 'chain'], h: ['flame', 'horn', 'drip', 'gate'], s: ['flame', 'star4', 'butterfly'], j: ['knob', 'chain', 'fade', 'leaf'], l: ['ringh', 'star4', 'lotus', 'ray', 'gem'], k: ['star4', 'lightning', 'gem', 'ringh'] };
  const TY1 = [null, 'spin halo orbit ring2 aura2 sparkle star ember corner badge rk1', 'spin orbit ring2 snow corner badge rk2', 'corner badge rk3'];
  const PN = { d: 'ประจำวัน', w: 'ประจำสัปดาห์', m: 'ประจำเดือน' }, BD = { d: ['', '🌅', '🥈', '🥉'], w: ['', '⚔️', '🥈', '🥉'], m: ['', '🌟', '🥈', '🥉'] };
  const RE = /^f_g([dwm])([mxgbrchsjlknuopzteqy])([0-9a-z]+)_([123])$/;
  // ชุดที่ 2: สีจากวงล้อสี (โทนคู่ตรงข้าม/ข้างเคียง) · ลายประดับตามหมวด + ลายสุ่ม · แสงสุ่มชุดใหม่ทุกรอบ · ตราตามหมวด
  const hsl = (h, s, l) => { h = ((h % 360) + 360) % 360; s /= 100; l /= 100; const a = s * Math.min(l, 1 - l), f = n => { const k = (n + h / 30) % 12, c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); return Math.round(255 * c).toString(16).padStart(2, '0') }; return '#' + f(0) + f(8) + f(4) };
  const SH = { m: ['sword', 'laurel', 'crown', 'dbl', 'gem'], x: ['cloud', 'ringh', 'leaf', 'pearl', 'gate'], g: ['ray', 'ringh', 'star4', 'lotus', 'crown'], b: ['horn', 'scale', 'thorn', 'wing', 'eye'], r: ['clock', 'moon', 'star4', 'ringh'], c: ['flame', 'thorn', 'chain', 'eye'], h: ['flame', 'horn', 'drip', 'gate', 'skull'], s: ['flame', 'star4', 'butterfly', 'petal'], j: ['knob', 'chain', 'fade', 'leaf'], l: ['ringh', 'star4', 'lotus', 'ray', 'gem'], k: ['star4', 'lightning', 'gem', 'ringh', 'ray'] };
  const ANY = ['star4', 'gem', 'petal', 'snow', 'moon', 'ray', 'lightning', 'pearl', 'leaf', 'cloud', 'wing'];
  const FX = { 1: ['halo', 'orbit', 'ring2', 'aura2', 'sparkle', 'star', 'ember', 'snow', 'petal', 'rainbow', 'flow', 'glow'], 2: ['orbit', 'ring2', 'sparkle', 'snow', 'ember', 'petal', 'shift', 'glow', 'star'], 3: ['snow', 'ember', 'star', 'glow'] };
  const MARK = { m: ['⚔️', '🗡️', '🏯'], x: ['☁️', '🌀', '🍑'], g: ['✨', '🌞', '🪷'], b: ['🐾', '🐉', '🐯'], r: ['⏳', '🕰️', '🌀'], c: ['🔥', '⛓️', '☄️'], h: ['💀', '🔥', '👹'], s: ['☄️', '🕯️', '🎆'], j: ['🦴', '🍂', '🪨'], l: ['⭕', '🔮', '🌌'], k: ['🌠', '🛰️', '🧬'] };
  Object.assign(MARK, { n: ['🌀', '🗡️', '💎'], u: ['🌃', '🎰', '🕶️'], o: ['👻', '🏮', '📿'], p: ['🔁', '⏰', '📅'], z: ['🧟', '☣️', '🔦'], t: ['🗼', '🪜', '🚪'], e: ['🎮', '🕹️', '💠'], q: ['💀', '🧱', '🚩'], y: ['☄️', '⏳', '🚀'] });
  MWL.forEach(c => { SH1[c] = ['star4', 'gem', 'ray']; SH[c] = ['star4', 'gem', 'ray', 'lightning'] });
  function frame(id) {
    const m = RE.exec(id); if (!m) return null; const [, p, c, k, rs] = m, r = +rs;
    const dt = String(k).replace(/[sv].*/, ''), dl = dt.length >= 8 ? dt.slice(6, 8) + '/' + dt.slice(4, 6) + '/' + dt.slice(0, 4) : dt.slice(4, 6) + '/' + dt.slice(0, 4);
    const base = { id, n: 'กรอบ「' + title(p, c, k, r) + '」', side: 'r', c: 0, d: 'อันดับ ' + r + ' ทำเนียบ' + PN[p] + ' รุ่น ' + dl + ' — มีรอบเดียว ไม่กลับมาอีก', gen: 1 };
    if (!/v/.test(k)) { const R = RNG(H('f|' + id)), pal = pk(R, PALS), sh = (SH1[c] || SH1.m).slice().sort(() => R() - .5).slice(0, r === 1 ? 3 : r === 2 ? 2 : 1); if (r === 1) sh.unshift('rnd'); if (r === 1 && !sh.includes('crown') && R() < .5) sh.push('gem'); return Object.assign(base, { ty: TY1[r], c1: pal[0], c2: pal[1], c3: pal[2], pc: pal[1], bd: BD[p][r], sh: sh.join('|') }) }
    const R = RNG(H('f2|' + id)), h0 = Math.floor(R() * 360), sat = r === 1 ? 88 : r === 2 ? 70 : 42, mode = pk(R, [150, 180, 30, -40, 120]);
    const c1 = hsl(h0, sat, r === 3 ? 52 : 60), c2 = hsl(h0 + 10, 95, 90), c3 = hsl(h0 + mode, sat, r === 3 ? 30 : 42);
    const own = (SH[c] || SH.m).slice().sort(() => R() - .5), extra = ANY.slice().sort(() => R() - .5);
    const sh = r === 1 ? [own[0], own[1], extra[0]] : r === 2 ? [own[0], extra[0]] : [own[0]];
    const outline = r === 1 ? pk(R, ['rnd', 'rnd', 'soft', '']) : r === 2 ? pk(R, ['soft', '', 'rnd']) : pk(R, ['', 'soft']); if (outline) sh.unshift(outline);
    const fx = FX[r].slice().sort(() => R() - .5).slice(0, r === 1 ? 4 + Math.floor(R() * 2) : r === 2 ? 2 + Math.floor(R() * 2) : Math.floor(R() * 2));
    const ty = (r === 1 ? 'spin ' : r === 2 ? pk(R, ['spin ', 'pulse ', '']) : '') + fx.join(' ') + ' corner badge rk' + r;
    const bd = r === 1 ? pk(R, MARK[c] || MARK.m) : ['', '', '🥈', '🥉'][r];
    return Object.assign(base, { ty, c1, c2, c3, pc: c2, bd, sh: [...new Set(sh)].join('|') });
  }
  const fid = (p, c, k, r) => 'f_g' + p + c + k + '_' + r;
  const ALLC = [null, ...[1, 2, 3].map(r => CORE[r].concat(CORE_MW[r]))];
  const rank = t => { t = String(t || ''); let best = 0, bl = 0; for (let r = 1; r <= 3; r++) for (const w of ALLC[r]) if (t.startsWith(w) && w.length > bl) { bl = w.length; best = r } return best };
  const cat = t => { t = String(t || ''); for (const k of [...MWL, 'k', 'l', 'h', 's', 'j', 'r', 'b', 'x', 'g', 'c']) if (TH[k].some(w => t.includes(w))) return k; return 'm' };
  return { title, frame, fid, RE, H, rank, cat, MWL };
})();
const RKG_C = { m: 'm', x: 'x', g: 'g', b: 'b', r: 'r', c: 'c', ch: 'h', cs: 's', cj: 'j', cl: 'l', ck: 'k' };
const rkKey = (lab, salt) => String(lab || '').replace(/[^0-9]/g, '') + 'v' + (salt || ''); // v = ชุดที่ 2
const bdCat = e => e.bm ? 'b' : e.g ? 'g' : e.x ? 'x' : 'm';
const bdKey = (c, ms, back = 0) => 'bd3:' + c + ':' + new Date(ms + 7 * 3600e3 - back * 86400e3).toISOString().slice(0, 10);
const bdKeyW = (c, ms, back = 0) => 'bdw:' + c + ':' + week(new Date(ms - back * 7 * 86400e3));
const bdMon = (ms, back = 0) => { const t = new Date(ms + 7 * 3600e3); const d = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() - back, 1)); return d.toISOString().slice(0, 7) };
const bdKeyM = (c, ms, back = 0) => 'bdm:' + c + ':' + bdMon(ms, back);
const bdKeyP = (p, c, ms, back = 0) => p === 'w' ? bdKeyW(c, ms, back) : p === 'm' ? bdKeyM(c, ms, back) : bdKey(c, ms, back);
function liveMeta(snap) { try { const s0 = typeof snap === 'string' ? JSON.parse(snap) : snap; return JSON.stringify({ n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, hot: s0.hot ? 1 : 0, p: (s0.st && +s0.st.pow) || 0, wk: ['m', 'x', 'g', 'c'].includes(s0.wk) ? s0.wk : (s0.xt ? 'g' : s0.x ? 'x' : 'm'), look: s0.look || null, wi: ((x => ['normal','hunter','under','ghost','loop','zombie','tower','game','gatewon','doom'].includes(x) ? x : undefined)(s0.wi || (s0.mx && s0.mx.i))), wr: (x => x ? String(x).replace(/[<>]/g, '').slice(0, 30) : undefined)(s0.wr || (s0.mx && s0.mx.r)) }) } catch { return '' } }
function bdScore(D, e) {
  const st = (D && D.st) || {}, bm = !!e.bm, L = (v, r) => Math.min(1.5, Math.log10(1 + Math.max(0, +v || 0)) / Math.log10(1 + r));
  const kids = +D.kc >= 0 && D.kc != null ? +D.kc : (D.kids || []).length, ach = D.an != null ? +D.an : (D.ach || []).length;
  const C = [[1.5, L(st.pow, 1e8)], [1.2, L(st.fame, 1e5)], [bm ? 0 : 1, L(st.money, 1e9)], [1, L(st.int, 5000)], [.8, L(st.cha, 5000)], [.8, L(kids, 50)], [1, L(e.age, bm ? 20000 : 10000)], [.7, L(st.kills, 2000)], [1.2, L(ach, 20)], [.5, L(Math.abs(+st.karma || 0), 1000)], [.6, Math.min(1, Math.max(0, (+st.joy || 0) / 100))]];
  if (bm) C.push([1, Math.min(1.5, Math.max(0, (+D.bst || 0) / 7))]);
  let sw = 0, sv = 0; for (const [w, v] of C) { sw += w; sv += w * (isFinite(v) ? v : 0) }
  return Math.round(100000 * sv / sw);
}
function bdScoreShort(D, e) { // ชีวิตสั้น: คิดจากความเร็ว — ทำได้มากในเวลาน้อยยิ่งได้คะแนน
  const st = (D && D.st) || {}, ag = Math.max(10, +e.age || 30), k = 30 / ag, sc = v => (+v || 0) * k;
  const D2 = Object.assign({}, D, { st: Object.assign({}, st, { pow: sc(st.pow), fame: sc(st.fame), money: sc(st.money), int: sc(st.int), kills: sc(st.kills) }) });
  return bdScore(D2, Object.assign({}, e, { age: Math.min(10000, sc(st.pow) / 500) }));
}
// จุดสูงสุดที่ไปถึง (ส่งมาใน det.pk = [โลก, ขั้น, อายุตอนถึง]) → คะแนนรากขยะ / ผู้ย้อนกาลที่ยังไม่หลุดพ้น · โลกใช้ค่าของเซิร์ฟเวอร์
function bdPeak(D, e) { const pk = Array.isArray(D && D.pk) ? D.pk : [], tier = e.g ? 2 : e.x ? 1 : 0, ri = Math.max(0, Math.min(7, Math.floor(+pk[1] || 0))), ag = Math.max(0, Math.min(+e.age || 0, Math.floor(+pk[2] || 0)));
  return (tier * 8 + ri + 1) * 1e6 - Math.min(999999, ag) }
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
  s = s.replace(/(https?:\/\/|www\.|[a-z][a-z0-9+.-]*:\/\/)\S+/gi, '[ลิงก์]').replace(/\b[a-z0-9][a-z0-9-]*([.。．][a-z0-9-]+)*[.。．][a-z]{2,24}\b(\/\S*)?/gi, '[ลิงก์]').replace(/\b[a-z0-9][a-z0-9-]*\s*[.。．]\s*(com|net|org|io|gg|me|xyz|th|co|ly|to|cc|link|site|shop|app|dev|info|biz|tv|ru|cn|in\.th|co\.th)\b(\/\S*)?/gi, '[ลิงก์]').replace(/\b[a-z0-9-]+\s*(\(|\[)?\s*dot\s*(\)|\])?\s*(com|net|org|io|gg|me|xyz|th|co|ly|to|cc|link)\b/gi, '[ลิงก์]');
  for (const w of BAD) s = s.split(w).join('*'.repeat([...w].length));
  s = s.replace(/หี(?![บดม])/g, '**');
  return s.trim();
}
// อ่าน query ด้วย WHATWG URL (ไม่แตะ req.query ซึ่งใช้ url.parse ที่เลิกสนับสนุนแล้ว)
const qOf = r => r._q || (r._q = Object.fromEntries(new URL(r.url || '/', 'http://localhost').searchParams));
// ฉายาที่มีจริงในเกม (สร้างจากตัวเกม) → เซิร์ฟเวอร์รับเฉพาะชื่อในรายการ และกำหนดสีระดับเอง
let TITLES = { t: {}, a: {} }; try { TITLES = require('./titles.json') } catch (e) {}
const rkOk = (tt, h) => { try { const k = String(tt || ''), m = RKT_ALL.get(k); if (!k || !Array.isArray(h)) return null; for (let i = 0; i < h.length; i += 2) { const v = JSON.parse(h[i + 1] || 'null'); if (v && v.t === k && v.exp > Date.now()) return { tt: k, tr: RKT_TR[m ? m.p : String(h[i])[0]] || 7 } } } catch (e) {} return null }; // ฉายาสุ่มใหม่ไม่อยู่ในตาราง → ยืนยันจากที่บันทึกไว้ตอนแจกแทน
// ฉายาที่ไม่อยู่ในรายชื่อ (เช่น ฉายาที่สุ่มประกอบขึ้นตอนเล่น หรือของระบบใหม่) ยังแสดงได้ แต่สีกรอบสูงสุดแค่ระดับ 2 กันคนตั้งชื่อหรูปลอม
const ttlOk = (tt, tr) => { const k0 = String(tt || '').slice(0, 40), k = k0.slice(0, 24); if (!k) return { tt: '', tr: 0 }; const has = x => Object.prototype.hasOwnProperty.call(TITLES.t, x); if (has(k0)) return { tt: k0, tr: Math.max(0, Math.min(6, +TITLES.t[k0] || 0)) }; if (has(k)) { const c0 = String(clean(k0, 40) || ''); return { tt: c0 === k0 && /^[\u0E00-\u0E7Fa-zA-Z0-9 ·\-'"()]+$/.test(c0) ? k0 : k, tr: Math.max(0, Math.min(6, +TITLES.t[k] || 0)) } }
  const c = String(clean(k0, 40) || ''); if (!c || c !== k0 || !noAdm(c) || !/^[\u0E00-\u0E7Fa-zA-Z0-9 ·\-'"()]+$/.test(c)) return { tt: '', tr: 0 }; return { tt: c, tr: Math.max(0, Math.min(2, +tr || 0)) } };
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
const RR_PK = { s: [10, 12], m: [29, 40], l: [59, 100] }; // แพ็กสุ่มเกิด: [ราคา บาท, จำนวนครั้ง]
const LK_PK = { '1': [5, 1], '2': [10, 2], '10': [45, 10], '25': [99, 25] }; // 🔒 ตั๋วล็อกชะตา: [ราคา บาท, จำนวนใบ] · 1 ใบ = ล็อก 1 อย่างจนเริ่มชีวิต · รหัสแพ็ก = 'lk' + key
const AK_FREE = [0, 5, 10, 20], AK_MAX = 50, AK_PR = [29, 29, 49, 49, 69, 69, 99, 99, 99], AK_TRIAL = 19; // 🔒 ล็อกคำตอบ: ช่องฟรีตาม VIP · เพดานรวม · ราคาแพ็ก +5 ช่อง (แพงขึ้นตามจำนวนที่เคยซื้อ) · แพ็กทดลอง 3 ช่อง
const akLim = async (id, adm) => { const [v, p, t] = await pipe([['GET', 'vip:' + id], ['GET', 'akp:' + id], ['GET', 'akt:' + id]]); const vt = vipTier(jp(v)), pk = Math.max(0, +p || 0), tr = +t ? 1 : 0, f = AK_FREE[vt] || 0;
  const n = adm ? AK_MAX : Math.min(AK_MAX, (vt ? f + pk * 5 : 0) + (tr ? 3 : 0)), full = !vt ? false : f + pk * 5 + (tr ? 3 : 0) >= AK_MAX || pk >= AK_PR.length;
  return { n, f, v: vt, p: pk, t: tr, nx: full ? 0 : AK_PR[pk], tp: AK_TRIAL, adm: adm ? 1 : 0 } };
// 🏮 ผู้อุปถัมภ์: [ราคา บาท, ระดับ, จำนวนวัน (0 = ถาวร)] — ไม่มีพลัง/เงินในเกม ได้แค่สุ่มเกิดเพิ่ม ป้าย และสิทธิ์สะดวก
const RP_SC = ['inn', 'mkt', 'gate', 'sky'];
// 🎭 ห้องเล่นบท: ห้องเดียว ฉากหมุนทุก 3 ชั่วโมง (เวลาไทย)
const rpCur = () => { const t = Date.now() + 7 * 3600e3, k = Math.floor(t / (3 * 3600e3)); return { sc: RP_SC[k % RP_SC.length], nx: (k + 1) * 3 * 3600e3 - 7 * 3600e3 } };
// 🎭 ผู้เล่าเรื่องในห้องเล่นบท: ฉากละ 3 เรื่อง · เปิดเรื่อง → เบาะแส → โหวต 2 ทาง → ตอนจบตามเสียงส่วนใหญ่
const RP_ST = {
  inn: [
    ['🏮 ชายชุดดำล้มฟุบกลางโรงเตี๊ยม ปากเขียวคล้ำ จอกสุราในมือยังไม่หมด… เสี่ยวเอ้อร์ตัวสั่น ไม่มีใครกล้าขยับ', '🕯️ ในแขนเสื้อผู้ตายมีป้ายหยกสลักตราสำนักลึกลับ และมีคนเห็นสตรีชุดแดงลุกออกไปก่อนเกิดเหตุไม่นาน', 'สตรีชุดแดงถูกจับได้ที่หน้าประตู นางยืนยันว่าตนบริสุทธิ์ — ทุกคนจะทำอย่างไร?',
      ['ปล่อยนางไป', 'นางคารวะทุกคนแล้วหายไปในความมืด คืนนั้นมีจดหมายขอบคุณวางอยู่ทุกโต๊ะ — คนร้ายตัวจริงคือเจ้าของโรงเตี๊ยมที่หนีไปแล้ว'], ['ค้นตัวนาง', 'ในถุงหอมของนางพบผงพิษสีเขียว นางหัวเราะเย็นชาแล้วกระโดดหนีทางหลังคา ทิ้งไว้เพียงคำว่า "สำนักของข้าจะกลับมา"']],
    ['🎵 นักดนตรีตาบอดนั่งดีดพิณอยู่มุมโรงเตี๊ยม เพลงของเขาทำให้แขกบางคนน้ำตาไหลโดยไม่รู้ตัว', '🎶 เพลงเปลี่ยนจังหวะ จอกสุราทุกใบสั่นพร้อมกัน — ลมปราณซ่อนอยู่ในเสียงพิณ ชายชราโต๊ะข้างๆ เริ่มกระอักเลือด', 'ชายชราชี้ไปที่นักดนตรี "เขามาเพื่อฆ่าข้า!" — จะช่วยใคร?',
      ['ปกป้องชายชรา', 'ทุกคนลุกขึ้นขวาง นักดนตรีหยุดดีดแล้วถอนหายใจ "ชายผู้นี้เผาหมู่บ้านข้าเมื่อยี่สิบปีก่อน… วันนี้พวกท่านเลือกแล้ว" เขาเดินจากไปในสายฝน'], ['ฟังนักดนตรีก่อน', 'นักดนตรีเล่าเรื่องหมู่บ้านที่ถูกเผา ชายชราก้มหน้ายอมรับ แล้ววางกระบี่ลงต่อหน้าทุกคน — คืนนั้นไม่มีเลือดตกอีก']],
    ['📜 ทหารเมืองติดป้ายประกาศจับใหม่ที่ผนังโรงเตี๊ยม รางวัลหนึ่งพันตำลึง — ใบหน้าในภาพคล้ายแขกโต๊ะมุมห้องอย่างน่าประหลาด', '👀 แขกโต๊ะมุมห้องดึงหมวกลงต่ำ วางเหรียญทองไว้บนโต๊ะแล้วกระซิบ "ใครช่วยข้าออกจากเมืองได้ เหรียญนี้เป็นของท่าน"', 'ทหารกำลังเดินเข้ามาในโรงเตี๊ยม — จะทำอย่างไร?',
      ['ช่วยเขาหนี', 'พวกท่านก่อเรื่องวุ่นวายจนทหารสับสน ชายผู้นั้นหนีทางหลังครัว ทิ้งม้วนคัมภีร์ไว้พร้อมข้อความ "ข้าถูกใส่ร้าย ขอบคุณที่เชื่อ"'], ['ชี้ตัวให้ทหาร', 'ทหารรวบตัวเขาไว้ ในห่อผ้าพบตราประทับของขุนนางที่หายไป — เมืองสงบลงหนึ่งคืน แต่มีเงาบางคนจ้องมองพวกท่านจากหลังคา']]],
  mkt: [
    ['🍑 แม่ค้าลูกท้อร้องไห้กลางตลาด ถุงเงินทั้งชีวิตถูกขโมยไปเมื่อครู่ มีเด็กผอมแห้งวิ่งหายเข้าไปในตรอก', '🏃 ในตรอกพบเด็กสามคนนั่งแบ่งซาลาเปากัน ถุงเงินวางอยู่ข้างๆ ยังไม่ถูกเปิด', 'เด็กคนโตคุกเข่าขอโทษ "น้องข้าหิวมาสามวันแล้ว" — จะทำอย่างไร?',
      ['คืนเงินแล้วช่วยเด็ก', 'แม่ค้าได้เงินคืน พ่อค้าในตลาดรวมเงินกันคนละนิด เด็กทั้งสามได้งานช่วยแผงผลไม้ ตลาดนี้อบอุ่นขึ้นกว่าเดิม'], ['ส่งตัวให้ทางการ', 'ทางการพาเด็กไป แม่ค้าได้เงินคืนแต่ยืนเงียบอยู่นาน คืนนั้นนางทิ้งลูกท้อไว้หน้าคุกหนึ่งตะกร้า']],
    ['🧪 คนแปลกหน้าตั้งแผงขาย "ยาอายุวัฒนะ" ราคาแค่สิบตำลึง ผู้คนแย่งกันซื้อจนแผงแทบพัง', '🤢 ชายที่ซื้อยาคนแรกเริ่มมีผื่นแดงขึ้นทั่วแขน คนขายยาเก็บของเตรียมหนีอย่างเร่งรีบ', 'คนขายยาวิ่งไปทางประตูเมือง — จะทำอย่างไร?',
      ['ไล่ตามจับ', 'จับได้ที่ประตูเมือง ในเกวียนมีขวดยาปลอมหลายร้อยขวด เงินถูกคืนให้ทุกคน หมอประจำเมืองรักษาผื่นจนหาย'], ['ช่วยคนป่วยก่อน', 'พวกท่านพาคนป่วยไปหาหมอทันเวลา คนขายยาหนีไปได้ แต่ทิ้งสูตรยาไว้ — มันคือยาแก้พิษงูชั้นดี เพียงแต่ขายผิดคน']],
    ['🗡️ พ่อค้าต่างแดนเปิดประมูลกระบี่สนิมเขรอะเล่มหนึ่ง เขาสาบานว่าเป็นกระบี่ของจอมยุทธ์ไร้นามเมื่อร้อยปีก่อน', '✨ มีคนแตะตัวกระบี่ สนิมร่วงลงเผยลายมังกรเรืองแสง ราคาพุ่งขึ้นทันที หัวหน้าสองสำนักใหญ่เริ่มจ้องหน้ากัน', 'สองสำนักกำลังจะลงมือแย่งกระบี่กลางตลาด — จะทำอย่างไร?',
      ['ให้ดวลตัดสิน', 'ตัวแทนสองสำนักดวลกันกลางตลาด สุดท้ายกระบี่เลือกนายเอง มันลอยไปปักหน้าเด็กขายซาลาเปาที่ยืนดูอยู่'], ['ลงขันซื้อฝากวัด', 'ทุกคนลงขันซื้อกระบี่ไปฝากวัดบนเขา คืนนั้นแสงมังกรพาดผ่านฟ้า ผู้คนเล่าลือกันไปทั่วแคว้น']]],
  gate: [
    ['⛩️ ศิษย์หนุ่มคนหนึ่งถูกโยนออกมาจากประตูสำนัก ข้อหาขโมยคัมภีร์ เขาตะโกนว่าตนถูกใส่ร้าย', '📖 ในห่อผ้าของเขามีเพียงบันทึกฝึกวิชาลายมือตัวเอง — แต่ศิษย์พี่ผู้กล่าวหากลับมีหน้าคัมภีร์ที่หายไปโผล่จากแขนเสื้อ', 'ศิษย์พี่ยิ้มเย้ยแล้วกลับเข้าสำนักไป — จะทำอย่างไร?',
      ['แจ้งเจ้าสำนัก', 'เจ้าสำนักสั่งค้น พบคัมภีร์ในห้องศิษย์พี่ ศิษย์หนุ่มได้กลับเข้าสำนัก และคารวะทุกคนที่ประตูสามครั้ง'], ['พาเขาไปตั้งตัวใหม่', 'ศิษย์หนุ่มออกเดินทางกับพวกท่าน สิบปีต่อมาเขาก่อตั้งสำนักของตัวเอง แขวนป้าย "ไม่ทิ้งคนบริสุทธิ์" ไว้ที่ประตู']],
    ['🥁 ชายร่างยักษ์ตีกลองหน้าประตูสำนัก ท้าประลองทุกคนที่ผ่านมา บอกว่าจะไม่ไปจนกว่าจะเจอคู่มือ', '💥 ศิษย์เฝ้าประตูแพ้ไปแล้วห้าคน แต่ชายร่างยักษ์มีบาดแผลเก่าที่หลังซึ่งยังไม่หายดี', 'เขาหันมาทางพวกท่าน "ใครจะสู้กับข้า?" — จะทำอย่างไร?',
      ['รับคำท้า', 'การดวลกินเวลาจนพระอาทิตย์ตก เขาแพ้แต่หัวเราะลั่น "ในที่สุด!" แล้วขอเป็นศิษย์รับใช้สำนักนี้'], ['ถามเหตุผลก่อน', 'เขาเล่าว่าลูกสาวป่วยหนัก ต้องการโอสถของสำนักแต่ไม่มีเงิน พวกท่านพาเขาไปพบหมอของสำนัก ลูกสาวเขาหายป่วยในเจ็ดวัน']],
    ['🩸 นกพิราบตัวหนึ่งตกลงหน้าประตูสำนัก ที่ขามีจดหมายเปื้อนเลือด เขียนว่า "สำนักทางเหนือถูกล้อม"', '🗺️ ในจดหมายมีแผนที่และตราของพันธมิตรเก่า แต่หมึกบางส่วนยังสดใหม่ผิดปกติ', 'เจ้าสำนักถามความเห็นผู้มาเยือน — จะทำอย่างไร?',
      ['ส่งคนไปช่วยทันที', 'กองกำลังออกเดินทางกลางดึก สำนักทางเหนือถูกล้อมจริงและไปถึงทันเวลา มิตรภาพสองสำนักแน่นแฟ้นกว่าเดิม'], ['ส่งหน่วยสอดแนมก่อน', 'หน่วยสอดแนมพบกองซุ่มรอดักกลางทาง จดหมายเป็นกับดัก! สำนักรอดพ้นหายนะเพราะความรอบคอบของพวกท่าน']]],
  sky: [
    ['⛰️ สองพี่น้องร่วมสาบานยืนเผชิญหน้ากันบนยอดเขา คนหนึ่งชักกระบี่ อีกคนไม่ยอมจับอาวุธ เมฆหมุนวนรอบตัว', '⚡ ฟ้าคำรามทุกครั้งที่พี่ยกกระบี่ น้องบอกว่า "ข้าฆ่าอาจารย์เพราะท่านกลายเป็นมาร" แต่ไม่มีใครรู้ว่าจริงหรือไม่', 'ผู้เป็นพี่หันมาถามทุกคน "ข้าควรทำอย่างไร?"',
      ['ให้อภัยน้อง', 'พี่ปักกระบี่ลงพื้น สองพี่น้องกอดกันกลางสายฝน ฟ้าเปิดแสงทองส่องลงบนยอดเขา'], ['ให้ดวลตัดสิน', 'การดวลจบด้วยรอยแผลที่แก้มของน้อง พี่เดินลงเขาโดยไม่หันกลับ ทิ้งน้องไว้กับเมฆหมอกและความจริงที่ไม่มีใครรู้']],
    ['🌠 ดาวตกดวงใหญ่พาดผ่านฟ้าแล้วตกลงหลังยอดเขา แสงสีเงินยังเรืองอยู่ในหลุม', '💎 ในหลุมมีผลึกเหล็กดาวขนาดเท่ากำปั้น มันอุ่นและเต้นเป็นจังหวะเหมือนหัวใจ', 'มีเสียงคนกลุ่มใหญ่เดินขึ้นเขามา — จะทำอย่างไรกับผลึก?',
      ['นำไปตีอาวุธ', 'ช่างตีเหล็กบนเขาตีผลึกเป็นกระบี่สีเงินเล่มหนึ่ง มันส่งเสียงหวีดทุกครั้งที่มีมารอยู่ใกล้'], ['คืนสู่ฟ้า', 'พวกท่านโยนผลึกขึ้นฟ้าตอนรุ่งสาง มันลอยกลับไปเป็นดาวดวงหนึ่ง คนเฒ่าบนเขาบอกว่าคืนนั้นดาวดวงใหม่ส่องแสงเพื่อพวกท่าน']],
    ['🧘 ฤาษีชราผู้นั่งสมาธิบนยอดเขามาร้อยปีลืมตาขึ้นเป็นครั้งแรก "ข้าจะถ่ายทอดวิชาให้ผู้ที่ตอบปริศนาได้"', '📜 ฤาษีวางคัมภีร์ไว้บนหิน แล้วถาม "สิ่งใดหนักกว่าภูเขา แต่ลมพัดก็ปลิว?"', 'ทุกคนต้องตอบด้วยกัน — คำตอบคือ?',
      ['คำสัญญา', 'ฤาษีหัวเราะ "ถูกแล้ว" แล้วมอบคัมภีร์ให้ทุกคนอ่านร่วมกัน ก่อนจะกลายเป็นสายลมหายไป'], ['ความทรงจำ', 'ฤาษีนิ่งไปนาน "นั่นก็ใช่… แต่มิใช่คำตอบของข้า" เขาหลับตาลงอีกครั้ง คัมภีร์ยังวางอยู่บนหินรอผู้มาเยือนคนต่อไป']]]
};
const RP_N1 = 8, RP_N2 = 6, RP_NV = 10, RP_VT = 20 * 60e3; // ข้อความก่อนเบาะแส · ก่อนโหวต · ระหว่างโหวต · เวลาโหวตสูงสุด
const rpNm = (sc, x, ext) => Object.assign({ i: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), t: Date.now(), sc, n: 'ผู้เล่าเรื่อง', nr: 1, a: 0, x, pu: '' }, ext || {});
// เรียกทุกครั้งที่ rpget/rpsay · inc = มีข้อความผู้เล่นใหม่
async function rpStory(inc) {
  const k = Math.floor((Date.now() + 7 * 3600e3) / (3 * 3600e3)), sc = RP_SC[k % RP_SC.length], si = Math.floor(k / RP_SC.length) % 3, S0 = RP_ST[sc][si];
  if (!(await cmd('SET', 'rp:stlk', 1, 'NX', 'PX', 3000))) return null;
  try {
    let st = jp(await cmd('GET', 'rp:st')); const out = [];
    if (!st || st.k !== k) { st = { k, sc, si, step: 1, cnt: 0, t: Date.now() }; out.push(rpNm(sc, S0[0], { st: 1 })) }
    else if (inc) st.cnt++;
    if (st.step === 1 && st.cnt >= RP_N1) { st.step = 2; st.cnt = 0; out.push(rpNm(sc, S0[1], { st: 2 })) }
    else if (st.step === 2 && st.cnt >= RP_N2) { st.step = 3; st.cnt = 0; st.t = Date.now(); st.vid = k.toString(36); out.push(rpNm(sc, S0[2], { st: 3, vo: [S0[3][0], S0[4][0]], vid: st.vid })) }
    else if (st.step === 3) {
      const v = await cmd('HMGET', 'rp:vt:' + st.vid, '0', '1') || [], a = +v[0] || 0, b2 = +v[1] || 0;
      if ((st.cnt >= RP_NV || Date.now() - st.t > RP_VT) && a + b2 > 0) { const w = b2 > a ? 1 : 0; st.step = 4; st.w = w; out.push(rpNm(sc, `🗳️ เสียงส่วนใหญ่เลือก「${S0[3 + w][0]}」(${w ? b2 : a} ต่อ ${w ? a : b2}) — ${S0[3 + w][1]}`, { st: 4 })) }
    }
    const cmds = [['SET', 'rp:st', JSON.stringify(st), 'EX', 86400]];
    out.forEach(m => cmds.push(['LPUSH', 'rp:all', JSON.stringify(m)]));
    if (out.length) cmds.push(['LTRIM', 'rp:all', 0, 59], ['EXPIRE', 'rp:all', 86400 * 3]);
    await pipe(cmds); st.v = null;
    if (st.step === 3) { const v = await cmd('HMGET', 'rp:vt:' + st.vid, '0', '1') || []; st.v = [+v[0] || 0, +v[1] || 0]; st.vo = [S0[3][0], S0[4][0]] }
    return st;
  } catch (e) { return null } finally { try { await cmd('DEL', 'rp:stlk') } catch { } }
}
const VIP_PK = { v1: [39, 1, 30], v2: [99, 2, 30], v3: [599, 3, 0] };
// 🎨 ร้านตกแต่ง (กรอบ/ฉายา/ธีมแชท) — ซื้อครั้งเดียวถาวร ไม่มีผลต่อพลังหรือการแข่งขัน
const COS_FP = [39, 49, 39, 49, 49, 39, 39, 49], COS_SET = [79, 69, 59, 69, 69, 59, 59, 69];
const COS_BASE = Object.create(null); // pk -> [ราคาเต็ม, [ไอเทม]]
for (let i = 1; i <= 8; i++) { COS_BASE['cf' + i] = [COS_FP[i - 1], ['f_p' + i]]; COS_BASE['ct' + i] = [i === 1 ? 29 : 19, ['t_p' + i]]; COS_BASE['cc' + i] = [i === 1 ? 29 : 19, ['c_p' + i]]; COS_BASE['cs' + i] = [COS_SET[i - 1], ['f_p' + i, 't_p' + i, 'c_p' + i]] }
for (let i = 9; i <= 11; i++) COS_BASE['ct' + i] = [9, ['t_p' + i]]; // ฉายาเริ่มต้น 9 บาท
COS_BASE.call = [399, [...Array(8).keys()].flatMap(i => ['f_p' + (i + 1), 't_p' + (i + 1), 'c_p' + (i + 1)])];
const COS_ALL = new Set([...COS_BASE.call[1], 't_p9', 't_p10', 't_p11', 'f_s1', 't_s1', 'c_s1', 'f_s2', 't_s2', 'c_s2', 'f_s3', 't_s3', 'c_s3', 'f_s4', 't_s4', 'f_s5', 't_s5', 'a_s1', 'a_s2', 'a_s3', 'a_s4', 'a_s5', 't_v1', 't_v2', 't_v3']);
// 🧑 รูปโปรไฟล์ขยับได้ (ร้านตกแต่ง หมวดรูปโปรไฟล์) — ราคา 9–29 บาท
for (let i = 1; i <= 10; i++) { COS_BASE['pa' + i] = [[9, 9, 15, 15, 19, 19, 25, 25, 29, 29][i - 1], ['a_p' + i]]; COS_ALL.add('a_p' + i) }
// 📦 แพ็กรูปโปรไฟล์: ครบ 10 แบบ 149 · ตำนาน 5 แบบ 69 · "ส่วนที่ยังไม่มี" คิดราคาต่อคน (prest: ผลรวมส่วนที่ขาด ×0.77 ปัดลงท้าย 9 ไม่เกิน 149)
const PA_ALL = [...Array(10).keys()].map(i => 'a_p' + (i + 1)), PA_LEG = ['a_p1', 'a_p2', 'a_p4', 'a_p9', 'a_p10'];
COS_BASE.pall = [149, PA_ALL]; COS_BASE.pleg = [69, PA_LEG];
const pfPrice = it => { const i = PA_ALL.indexOf(it); return i < 0 ? 0 : COS_BASE['pa' + (i + 1)][0] };
async function paRest(uid) { const own = new Set((await cmd('SMEMBERS', 'cos:' + uid)) || []), left = PA_ALL.filter(x => !own.has(x)); if (!left.length) return { left, amt: 0 }; const sum = left.reduce((a, x) => a + pfPrice(x), 0); const amt = left.length === 1 ? sum : Math.min(149, Math.max(9, Math.round(sum * 0.77 / 10) * 10 - 1)); return { left, amt } }
// 🏙️ ชุดตกแต่งยุคปัจจุบัน: 6 ชุด (กรอบ f_m · ฉายา t_m · ธีมแชท c_m) + ฉายาเสริม 18 แบบ (t_n) — ราคาเดียวกับสูตรของชุดยุทธภพ
const MOD_F = [49, 39, 49, 49, 39, 49], MOD_T = [19, 19, 29, 29, 19, 19], MOD_C = 19, MOD_SET = [69, 59, 79, 79, 59, 69];
for (let i = 1; i <= 6; i++) { COS_BASE['mf' + i] = [MOD_F[i - 1], ['f_m' + i]]; COS_BASE['mt' + i] = [MOD_T[i - 1], ['t_m' + i]]; COS_BASE['mc' + i] = [MOD_C, ['c_m' + i]]; COS_BASE['ms' + i] = [MOD_SET[i - 1], ['f_m' + i, 't_m' + i, 'c_m' + i]] }
COS_BASE.mall = [299, [...Array(6).keys()].flatMap(i => ['f_m' + (i + 1), 't_m' + (i + 1), 'c_m' + (i + 1)])];
for (let i = 1; i <= 18; i++) COS_BASE['mn' + i] = [i <= 14 ? 9 : 19, ['t_n' + i]];
COS_BASE.mall[1].forEach(x => COS_ALL.add(x)); for (let i = 1; i <= 18; i++) COS_ALL.add('t_n' + i);
// 🌍 ชุดตามโลก 9 ชุด (กรอบ f_w · ฉายา t_w · ธีมแชท c_w) · ครบทุกชุด wall
const WLD_F = [39, 49, 49, 39, 49, 49, 39, 49, 49], WLD_T = [19, 19, 29, 19, 19, 29, 19, 19, 29], WLD_C = 19, WLD_SET = [59, 69, 79, 59, 69, 79, 59, 69, 79];
for (let i = 1; i <= 9; i++) { COS_BASE['wf' + i] = [WLD_F[i - 1], ['f_w' + i]]; COS_BASE['wt' + i] = [WLD_T[i - 1], ['t_w' + i]]; COS_BASE['wc' + i] = [WLD_C, ['c_w' + i]]; COS_BASE['ws' + i] = [WLD_SET[i - 1], ['f_w' + i, 't_w' + i, 'c_w' + i]] }
COS_BASE.wall = [449, [...Array(9).keys()].flatMap(i => ['f_w' + (i + 1), 't_w' + (i + 1), 'c_w' + (i + 1)])];
COS_BASE.wall[1].forEach(x => COS_ALL.add(x));
// 📦 เซ็ตแยกประเภท (ยุคปัจจุบัน + ชุดโลก): กรอบทั้งหมด · ฉายาทั้งหมด · ธีมทั้งหมด · ฉายาเสริมทั้งหมด
{ const R = (p, n) => [...Array(n).keys()].map(i => p + (i + 1));
  COS_BASE.mbf = [399, [...R('f_m', 6), ...R('f_w', 9)]]; COS_BASE.mbt = [199, [...R('t_m', 6), ...R('t_w', 9)]];
  COS_BASE.mbc = [169, [...R('c_m', 6), ...R('c_w', 9)]]; COS_BASE.mbn = [129, R('t_n', 18)] }
// 🔥 ลดราคาประจำวัน (เวลาไทย เปลี่ยนตอนเที่ยงคืน): ชุดตกแต่งยุคปัจจุบัน/โลก 1 ชุดลด 30% + ฉายาเสริม 2 แบบลด 25%
const MDEAL_SETS = [...Array(6).keys()].map(i => 'ms' + (i + 1)).concat([...Array(9).keys()].map(i => 'ws' + (i + 1)));
const mDeal = () => { const day = Math.floor((Date.now() + 7 * 3600e3) / 864e5), h = (day * 2654435761) >>> 0; let a = (h >>> 8) % 18, b = (h >>> 16) % 18; if (b === a) b = (b + 1) % 18; return { s: MDEAL_SETS[h % MDEAL_SETS.length], t: ['mn' + (a + 1), 'mn' + (b + 1)], exp: (day + 1) * 864e5 - 7 * 3600e3 } };
// 🏮 อีเวนต์ลอยกระทง 2026 — ขายถึง 17 ธ.ค. 23:59 (เวลาไทย)
// เงิน: [ราคา, ไอเทม, จำนวนจำกัด] (ฉบับเลขลำดับ) · กรรม: [ไอเทม, ราคากรรม, ฝั่ง g=กรรมดี e=กรรมชั่ว]
const EV_END = Date.UTC(2026, 11, 17, 16, 59, 59);
const EVM = { evf1: [49, 'f_e1', 300], evf4: [69, 'f_e4', 100], evt1: [29, 't_e1', 300], evt4: [39, 't_e4', 100], evc1: [29, 'c_e1', 300], evc4: [39, 'c_e4', 100] };
const EVK = { evf2: ['f_e2', 25000, 'g'], evf3: ['f_e3', 15000, 'g'], evf5: ['f_e5', 25000, 'e'], evt2: ['t_e2', 8000, 'g'], evt3: ['t_e3', 8000, 'g'], evt5: ['t_e5', 8000, 'e'], evc2: ['c_e2', 10000, 'g'], evc3: ['c_e3', 10000, 'g'], evc5: ['c_e5', 10000, 'e'] };
const EVB = { evb1: [79, ['evf1', 'evt1', 'evc1']], evb2: [109, ['evf4', 'evt4', 'evc4']] }; // ชุดรวม (ถูกกว่าซื้อแยก ~25%)
const EV_MI = Object.values(EVM).map(x => x[1]);
[...EV_MI, ...Object.values(EVK).map(x => x[0])].forEach(x => COS_ALL.add(x));
const evOpen = () => Date.now() < EV_END;
const EV_IMP_CAP = 0, EV_DEP_MAX = 200, EV_DAY_MAX = 600, KB_V = 2, KB_RANK = { d: [0, 1500, 1000, 600], w: [0, 3000, 2000, 1200], m: [0, 5000, 3500, 2000] }; // คลังกรรมอยู่ที่เซิร์ฟเวอร์อย่างเดียว · KB_V เปลี่ยน = ล้างคลังทุกคน (ล้างตอนอ่านครั้งแรก) // กันโกง: นำเข้าครั้งเดียวไม่เกินนี้ · ฝากต่อครั้ง · ฝากต่อวัน
async function kbFix(id) { const r = await cmd('HMGET', 'kb:' + id, 'v', 'g', 'e'); if (+(r && r[0]) === KB_V) return { g: +(r[1]) || 0, e: +(r[2]) || 0 }; await pipe([['HSET', 'kb:' + id, 'g', 0, 'e', 0, 'v', KB_V], ['HDEL', 'kb:' + id, 'imp'], ['LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u: id, m: 'wipe', g: +(r && r[1]) || 0, e: +(r && r[2]) || 0 })], ['LTRIM', 'evlog', 0, 299]]); return { g: 0, e: 0 } }
// ของแนะนำประจำวัน (เวลาไทย): ลด 20% ทั้งวัน — กรอบเดี่ยวหรือเซ็ต
const COS_FEAT = [...Array(8).keys()].flatMap(i => ['cf' + (i + 1), 'cs' + (i + 1)]);
const cosFeat = () => { const th = Date.now() + 7 * 3600e3, day = Math.floor(th / 864e5), pk = COS_FEAT[day % COS_FEAT.length]; return { pk, exp: (day + 1) * 864e5 - 7 * 3600e3 } };
const cosPrice = pk => { const b = COS_BASE[pk]; if (!b) return 0; if (cosFeat().pk === pk) return Math.round(b[0] * 0.8); const d = mDeal(); if (d.s === pk) return Math.round(b[0] * 0.7); if (d.t.includes(pk)) return Math.round(b[0] * 0.75); return b[0] };
const COS_P = new Proxy({}, { get: (_, pk) => COS_BASE[pk] ? [cosPrice(pk), COS_BASE[pk][1]] : undefined, has: (_, pk) => !!COS_BASE[pk] });
const cosOwn = async id => { try { return (await cmd('SMEMBERS', 'cos:' + id)) || [] } catch { return [] } };
// 🛡️ ตรวจกรอบ/รูปโปรไฟล์ที่ผู้เล่นจะโชว์ให้คนอื่นเห็น (กันแก้ Local Storage แล้วใส่ของที่ยังไม่มี) · คืน '' ถ้าไม่มีสิทธิ์
const frSrv = async (id, fr, keyOk) => { fr = String(fr || ''); if (!fr) return '';
  if (!/^f_[a-z0-9_]{1,20}$/.test(fr)) return '';
  const adm = keyOk || !!(+(await cmd('SISMEMBER', 'admids', id))); if (adm) return fr;
  if (/^f_adm/.test(fr)) return '';
  const vn = vipCosN(fr); if (vn) return vipTier(jp(await cmd('GET', 'vip:' + id))) >= vn ? fr : '';
  if (COS_ALL.has(fr) || /^f_(p|e|s|m|w)\d+$/.test(fr)) return +(await cmd('SISMEMBER', 'cos:' + id, fr)) ? fr : '';
  if (/^f_(hq|wb|sw)\d/.test(fr)) return +(await cmd('SISMEMBER', 'gfr:' + id, fr)) ? fr : '';
  if (/^f_(arc|box|lg)\d/.test(fr)) { const wv = jp(await cmd('HGET', 'arwal', id)); if (wv && wv.own && !(wv.own.fr || []).includes(fr)) return '' }
  return fr };
const avSrv = async (id, pf, keyOk) => { pf = String(pf || ''); if (!pf || !COS_ALL.has(pf)) return true; if (keyOk || +(await cmd('SISMEMBER', 'admids', id))) return true; return !!(+(await cmd('SISMEMBER', 'cos:' + id, pf))) };

const VIP_NM = { 1: 'ผู้อุปถัมภ์สำนัก', 2: 'ผู้อาวุโสอุปถัมภ์', 3: 'บรรพชนผู้อุปถัมภ์' };
const VIP_GIFT_UNTIL = Date.parse('2026-12-01T00:00:00+07:00'); // ผู้สนับสนุนเดิมที่เข้าเกมก่อนวันนี้ รับ VIP ฟรี 1 เดือน
const vipTier = (v, t = Date.now()) => !v ? 0 : v.u ? 3 : (+v.e2 || 0) > t ? 2 : (+v.e1 || 0) > t ? 1 : 0;
const VIP_TT = ['ผู้สนับสนุนสำนัก', 'ศิษย์ใต้โคมแดง', 'ผู้ถือตราชาด', 'ผู้เฝ้าหอโคม', 'สหายแห่งยุทธภพ', 'ผู้ค้ำจุนสำนัก'];
const vipOut = v => ({ t: vipTier(v), e1: +(v && v.e1) || 0, e2: +(v && v.e2) || 0, u: v && v.u ? 1 : 0, tt: String((v && v.tt) || ''), ttl: VIP_TT });
// ❄ คัมภีร์ฤดูกาล: ฤดูละ ~6 สัปดาห์ · 60 ขั้น (1–30 ขั้นละ 300 · 31–60 ขั้นละ 200) · เส้นฟรี + เส้นคัมภีร์ทอง (59) / ฉบับจารึก (129 = ทอง + ข้าม 10 ขั้น + ชุดจักรพรรดิ)
const SEA = [{ id: 's1', n: 'ฤดูหิมะเหนือ', a: Date.parse('2026-11-19T00:00:00+07:00'), b: Date.parse('2027-01-01T00:00:00+07:00') }];
const SP_LV = 300, SP_LV2 = 200, SP_MAX = 60, SP_GRACE = 7 * 864e5; // ขั้น 1–30 ขั้นละ 300 · ขั้น 31–60 ขั้นละ 200
const seaNow = (t = Date.now()) => SEA.find(s => t >= s.a && t < s.b) || null;
const seaClaim = (t = Date.now()) => SEA.find(s => t >= s.a && t < s.b + SP_GRACE) || null;
// รางวัล: f=ตั๋วธรรมดา g=ตั๋วทอง lk=ตั๋วล็อก cos=ของแต่ง ch=บทนำ chx=บทเต็ม org=ชาติกำเนิดฤดู nv=นิยายปกแข็ง
const SPR = { s1: {
  f: { 1: ['f', 2], 2: ['ch', 1], 3: ['f', 2], 5: ['cos', 't_s1'], 6: ['f', 3], 8: ['ch', 2], 10: ['g', 1], 12: ['lk', 1], 14: ['ch', 3], 15: ['f', 3], 18: ['cos', 'c_s1'], 20: ['cos', 'f_s1'], 22: ['ch', 4], 24: ['f', 4], 26: ['ch', 5], 28: ['lk', 1], 30: ['g', 1], 33: ['f', 3], 36: ['lk', 1], 39: ['f', 3], 42: ['g', 1], 45: ['f', 4], 48: ['lk', 1], 51: ['f', 4], 54: ['g', 1], 57: ['f', 5], 60: ['cos', 'a_s2'] },
  p: { 1: ['g', 1], 2: ['chx', 1], 3: ['f', 4], 4: ['lk', 1], 5: ['cos', 'f_s2'], 6: ['f', 4], 7: ['lk', 1], 8: ['chx', 2], 9: ['f', 5], 10: ['cos', 't_s2'], 11: ['g', 1], 12: ['lk', 2], 13: ['f', 5], 14: ['chx', 3], 15: ['cos', 'c_s2'], 16: ['f', 5], 17: ['lk', 1], 18: ['g', 1], 19: ['f', 6], 20: ['org', 'o_s1'], 21: ['lk', 2], 22: ['chx', 4], 23: ['f', 6], 24: ['g', 1], 25: ['nv', 1], 26: ['chx', 5], 27: ['lk', 2], 28: ['f', 8], 29: ['g', 1], 30: ['g', 2],
    31: ['f', 5], 32: ['lk', 1], 33: ['f', 5], 34: ['g', 1], 35: ['cos', 'a_s1'], 36: ['f', 6], 37: ['lk', 2], 38: ['f', 6], 39: ['g', 1], 40: ['nv', 1], 41: ['f', 6], 42: ['lk', 2], 43: ['f', 7], 44: ['g', 1], 45: ['cos', 'a_s3'], 46: ['f', 7], 47: ['lk', 2], 48: ['g', 1], 49: ['f', 8], 50: ['cos', 't_s4'], 51: ['lk', 2], 52: ['f', 8], 53: ['g', 1], 54: ['f', 8], 55: ['cos', 'a_s4'], 56: ['lk', 3], 57: ['g', 2], 58: ['f', 10], 59: ['g', 2], 60: ['cos', 'f_s4'] },
  // 👑 ฉบับจารึก: รางวัลขั้น 60 เฉพาะผู้ถือฉบับจารึก (กรอบ + ฉายา + รูปโปรไฟล์) และได้ป้าย "❄ ผู้พิชิต" ในหน้าจารึก
  i: { 60: ['cosm', ['f_s5', 't_s5', 'a_s5']] } } };
const SP_COS = ['f_s1', 't_s1', 'c_s1', 'f_s2', 't_s2', 'c_s2', 'f_s3', 't_s3', 'c_s3', 'f_s4', 't_s4', 'f_s5', 't_s5', 'a_s1', 'a_s2', 'a_s3', 'a_s4', 'a_s5'];
// 🏮 ของแต่ง VIP: ใช้ได้เฉพาะตอนสิทธิ์ยังไม่หมด (ระดับ n ขึ้นไป) — หมดเดือนแล้วถอดออกเอง ต้องต่อใหม่ · 599 ใช้ได้ตลอด
const vipCosN = x => { const m = /^[ft]_v([1-3])$/.exec(String(x || '')); return m ? +m[1] : 0 };
const spKey = (s, id) => 'sp:' + s.id + ':' + id;
const spLvOf = p => { p = +p || 0; return p < SP_LV * 30 ? Math.floor(p / SP_LV) : Math.min(SP_MAX, 30 + Math.floor((p - SP_LV * 30) / SP_LV2)) };
// ตัวคูณ: ผู้สนับสนุนพิเศษ/ผู้ก่อตั้ง +20% · ตามหลังเกณฑ์ ×1.5 · สัปดาห์สุดท้ายยังไม่ครบ ×2
async function spMul(s, id, p) {
  let m = 1; try { const v = jp(await cmd('GET', 'vip:' + id)); if (vipTier(v) >= 2) m *= 1.2 } catch {}
  const now = Date.now(), lv = spLvOf(p), exp = SP_MAX * (now - s.a) / Math.max(1, s.b - s.a - 7 * 864e5);
  if (lv < SP_MAX && s.b - now <= 7 * 864e5) m *= 2; else if (lv < exp - 2) m *= 1.5;
  return m;
}
async function spAdd(id, pts, cap) {
  const s = seaNow(); if (!s || !okId(id) || !(pts > 0)) return 0;
  if (cap) { const day = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10), ck = 'spd:' + id + ':' + day, u = +(await cmd('HINCRBY', ck, cap[0], 1)) || 0; await cmd('EXPIRE', ck, 172800); if (u > cap[1]) return 0 }
  const k = spKey(s, id), p0 = +(await cmd('HGET', k, 'p')) || 0, add = Math.round(pts * (await spMul(s, id, p0)));
  await pipe([['HINCRBY', k, 'p', add], ['EXPIRE', k, 86400 * 120]]); return add;
}
async function vipAdd(id, tier, days, sign) {
  const v = jp(await cmd('GET', 'vip:' + id)) || {}, t = Date.now();
  if (tier === 3) { if (sign > 0) v.u = 1; else delete v.u }
  else { const k = tier === 2 ? 'e2' : 'e1'; v[k] = sign > 0 ? Math.max(+v[k] || 0, t) + days * 86400e3 : Math.max(0, (+v[k] || 0) - days * 86400e3) }
  await cmd('SET', 'vip:' + id, JSON.stringify(v)); try { await cmd('SADD', 'vipall', id) } catch {} return v;
}
// ผู้ถือบรรพชน (u) ที่ไม่มีชื่อในหอ (เช่น อนุมัติก่อนระบบหอเสร็จ) → ใส่ให้เองตามลำดับเวลาที่จ่าย ชื่อจากรายการจ่ายล่าสุด
// ย้ายของทั้งหมดจากไอดีเก่า f → ไอดีใหม่ to (ใช้ทั้งแอดมินกด และผู้เล่นกู้เองผ่านรายการโอน)
async function moveAcc(f, to, now, why) {
  const rep = { to, rr: 0, vip: 0, cos: 0, sup: 0, saves: 0 };
  const rr = +(await cmd('GET', 'rrc:' + f)) || 0; if (rr > 0) { await pipe([['INCRBY', 'rrc:' + to, rr], ['SET', 'rrc:' + f, 0]]); rep.rr = rr }
  const vf = jp(await cmd('GET', 'vip:' + f)); if (vf) { const vt = jp(await cmd('GET', 'vip:' + to)) || {}; if (vf.u) vt.u = 1; vt.e1 = Math.max(+vt.e1 || 0, +vf.e1 || 0); vt.e2 = Math.max(+vt.e2 || 0, +vf.e2 || 0); if (vf.tt && !vt.tt) vt.tt = vf.tt; await pipe([['SET', 'vip:' + to, JSON.stringify(vt)], ['SADD', 'vipall', to]]); rep.vip = 1; const vu = await cmd('HGET', 'vipu', f); if (vu && !(await cmd('HEXISTS', 'vipu', to))) await pipe([['HSET', 'vipu', to, vu], ['HDEL', 'vipu', f]]) }
  const cs = (await cmd('SMEMBERS', 'cos:' + f)) || []; if (cs.length) { await cmd('SADD', 'cos:' + to, ...cs); rep.cos = cs.length }
  if (+(await cmd('SISMEMBER', 'supok', f))) await cmd('SADD', 'supok', to);
  try { const ids = (await cmd('ZRANGE', 'suppayz', 0, -1)) || []; if (ids.length) { const vals = (await cmd('HMGET', 'suppay', ...ids)) || []; for (let i = 0; i < ids.length; i++) { const r = jp(vals[i]); if (r && r.fid === f) { r.fid = to; r.mvf = f; await cmd('HSET', 'suppay', ids[i], JSON.stringify(r)); rep.sup++ } } } } catch {}
  // เซฟคลาวด์: คัดลอกทุกช่องของไอดีเก่าไปลงช่องที่ว่างของไอดีใหม่ (ไม่ทับเซฟที่ผู้เล่นมีอยู่)
  const src = await cs3Fill(f, await pipe([1, 2, 3, 4, 5].map(n => ['GET', 'cs3:' + f + ':' + n]))), dst = await cs3Fill(to, await pipe([1, 2, 3, 4, 5].map(n => ['GET', 'cs3:' + to + ':' + n])));
  const live = src.filter(v => v && !/^@/.test(String(v))); let slot = 0;
  for (const v of live) { while (slot < 5 && dst[slot]) slot++; if (slot >= 5) break; await cmd('SET', 'cs3:' + to + ':' + (slot + 1), v, 'EX', 86400 * 90); dst[slot] = v; rep.saves++ }
  if (rep.saves && !(await cmd('GET', 'cs2:' + to))) await cmd('SET', 'cs2:' + to, '@1', 'EX', 86400 * 90);
  await cmd('LPUSH', 'acmovelog', JSON.stringify({ f, ...rep, t: now, ...(why || {}) })); await cmd('LTRIM', 'acmovelog', 0, 99);
  return rep;
}
async function vipHeal(id) {
  if (await cmd('HEXISTS', 'vipu', id)) return;
  let nm = '', t0 = 0; try { const ids = (await cmd('ZRANGE', 'suppayz', 0, -1)) || [], vals = ids.length ? ((await cmd('HMGET', 'suppay', ...ids)) || []).map(jp) : []; for (const r of vals) if (r && r.fid === id && r.vp === 'v3' && r.st === 'ok') { nm = String(r.n || ''); t0 = +r.mt || 0 } } catch (e) {}
  const o = +(await cmd('INCR', 'vipuN')) || 1; await cmd('HSET', 'vipu', id, JSON.stringify({ n: clean(nm, 24), o, t: t0 || Date.now() }));
}
async function vipFixAll() {
  const ids = (await cmd('ZRANGE', 'suppayz', 0, -1)) || [], vals = ids.length ? ((await cmd('HMGET', 'suppay', ...ids)) || []).map(jp) : [], fixed = [], maybe = [];
  for (const r of vals) {
    if (!r || r.st !== 'ok' || !okId(r.fid)) continue;
    if (!r.vp && (+r.amt || 0) >= 599) { r.vp = 'v3'; await cmd('HSET', 'suppay', r.i, JSON.stringify(r)) } // แพ็กรีโรลแพงสุด 59 บาท — ยอดตั้งแต่ 599 มีแพ็กเดียวคือบรรพชน
    if (r.vp === 'v3') {
      const cur = jp(await cmd('HGET', 'vipu', r.fid)), v0 = jp(await cmd('GET', 'vip:' + r.fid)) || {};
      if (!v0.u) await vipAdd(r.fid, 3, 0, 1);
      if (!cur) { const o = +(await cmd('INCR', 'vipuN')) || 1; await cmd('HSET', 'vipu', r.fid, JSON.stringify({ n: clean(String(r.n || ''), 24), o, t: +r.tm0 || Date.now() })); fixed.push({ i: r.i, n: r.n, o }) }
      else if (!cur.n && r.n) { cur.n = clean(String(r.n), 24); await cmd('HSET', 'vipu', r.fid, JSON.stringify(cur)); fixed.push({ i: r.i, n: r.n, o: cur.o, name: 1 }) }
      if (!r.vg) { r.vg = 1; await cmd('HSET', 'suppay', r.i, JSON.stringify(r)) }
    } else if (!r.vp && (+r.amt || 0) >= 599) maybe.push({ i: r.i, n: r.n, amt: r.amt, fid: String(r.fid).slice(0, 6) })
  }
  return { fixed, maybe };
}
const cip = req => (String(req.headers['x-real-ip'] || '') || String(req.headers['x-forwarded-for'] || '').split(',')[0]).trim().replace(/[^0-9a-fA-F:.]/g, '').slice(0, 45) || 'x';
// ต่อ IP ต่อนาที: เกิน SOFT ตอบ 429 · เกิน HARD แบน 30 นาที · คำสั่งที่เขียนข้อความให้คนอื่นเห็นจำกัดแยก
// เน็ตมือถือไทยใช้ IP ร่วมกัน (CGNAT) → จำกัดหลักต่อ 'ไอดีผู้เล่น' ส่วนต่อ IP เผื่อไว้สูงมาก (กันแค่ยิงถล่มจริง)
const IP_SOFT = 8000, IP_HARD = 25000, IP_WMAX = 2000, ID_SOFT = 240, ID_WMAX = 30, NOID_SOFT = 900;
const IP_WRITE = new Set(['say', 'bug', 'bugedit', 'mtmsg', 'pachat', 'life', 'profile', 'idea', 'fb', 'mtopen', 'meet', 'migput', 'csave', 'save', 'achfirst', 'glogin', 'gunlink', 'profack', 'pushsub', 'psput']);
// รหัสแอดมิน: ใช้ ADMIN_KEY2 ถ้ามี (รหัสเก่า ADMIN_KEY ใช้ไม่ได้อีก)
const ADM_KEY = process.env.ADMIN_KEY2 || process.env.ADMIN_KEY || '';
const zlib = require('zlib');
// เซฟบนคลาวด์: เก็บแบบบีบอัด (ขึ้นต้น z:) · cs2 เก็บเป็นตัวชี้ไปยังช่อง cs3 (@n) ไม่เก็บซ้ำ
// LOW_CPU (ตั้งโดย Cloudflare Worker): แพ็กฟรีจำกัด CPU 10ms ต่อคำขอ → ลดระดับบีบอัด (q11 ใช้ ~250ms ต่อเซฟ · q4 แทบไม่ใช้ CPU · ไฟล์ใหญ่ขึ้นราว 2 เท่า แต่เก็บใน R2 ถูกมาก)
const BRQ = q => ({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: process.env.LOW_CPU ? 4 : q, [zlib.constants.BROTLI_PARAM_LGWIN]: 24 } });
const zPack = d => { d = String(d); try { if (/^[A-Za-z0-9+/]+=*$/.test(d)) { const raw = Buffer.from(d, 'base64'); if (raw.toString('base64') === d) return 'zr:' + zlib.brotliCompressSync(raw, BRQ(raw.length > 80000 ? 9 : 11)).toString('base64') } const u = Buffer.from(d, 'utf8'); return 'zt:' + zlib.brotliCompressSync(u, BRQ(u.length > 80000 ? 9 : 11)).toString('base64') } catch { return d } };
const zUnpack = v => { if (v == null) return v; v = String(v); try { if (v.startsWith('zr:')) return zlib.brotliDecompressSync(Buffer.from(v.slice(3), 'base64')).toString('base64'); if (v.startsWith('zt:')) return zlib.brotliDecompressSync(Buffer.from(v.slice(3), 'base64')).toString('utf8'); if (v.startsWith('zb:')) return zlib.gunzipSync(Buffer.from(v.slice(3), 'base64')).toString('base64'); if (v.startsWith('z:')) return zlib.gunzipSync(Buffer.from(v.slice(2), 'base64')).toString('utf8') } catch { return null } return v };
// เซฟบนคลาวด์: ตัดบันทึกเหตุการณ์ (feed) ให้เหลือส่วนท้าย — สถานะเกมไม่ถูกแตะ · เซฟในเครื่องผู้เล่นยังครบ
const FEED_MAX = 40000;
const saveTrim = d => { try { d = String(d || ''); if (!/^[A-Za-z0-9+/]+=*$/.test(d)) return d; const j = JSON.parse(Buffer.from(d, 'base64').toString('utf8')); if (!j || !j.S) return d; let ch = 0;
  if (typeof j.feed === 'string' && j.feed.length > FEED_MAX) { const f = j.feed, i = f.indexOf('<div class="', f.length - FEED_MAX); j.feed = i > 0 ? f.slice(i) : ''; ch = 1 }
  const al = j.S.album; if (Array.isArray(al) && al.length > 3) al.forEach((p, i) => { if (p && p.u && i > 0 && i < al.length - 2) { p.u = ''; ch = 1 } }); // อัลบั้ม: เก็บภาพแรก + 2 ภาพล่าสุด · คำบรรยายครบ
  return ch ? Buffer.from(JSON.stringify(j), 'utf8').toString('base64') : d } catch { return d } };
const isAdmKey = k => !!ADM_KEY && String(k || '') === ADM_KEY;
// ===== ตั้งค่าดีเลย์ที่แอดมินปรับสดได้ (Redis hash "cfg") =====
const CFG_DEF = { chatcd: 0, lawgap: 600, lawdig: 600, lawnews: 1 }, CFG_LIM = { chatcd: [0, 60000], lawgap: [0, 86400], lawdig: [0, 3600], lawnews: [0, 1] };
let CFG_C = null, CFG_AT = 0;
async function getCfg(force) {
  if (!force && CFG_C && Date.now() - CFG_AT < 10000) return CFG_C;
  const o = { ...CFG_DEF };
  try { const h = (await cmd('HGETALL', 'cfg')) || []; for (let i = 0; i + 1 < h.length; i += 2) { const k = h[i]; if (k in CFG_DEF) { const v = +h[i + 1]; if (isFinite(v)) o[k] = Math.max(CFG_LIM[k][0], Math.min(CFG_LIM[k][1], Math.round(v))) } } } catch (e) {}
  CFG_C = o; CFG_AT = Date.now(); return o;
}
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
const OWP = { r_soulgod: [3500, 'g'], r_abyss: [3000, 'e'], r_prince: [2000, 'g'], r_suit: [1200, 'e'], r_hunterS: [2500, 'g'], r_idol: [1500, 'g'], r_astro: [2000, 'g'], r_cyber: [2500, 'e'], r_galemp: [5000, 'g'], r_dragon: [3000, 'g'], r_moon: [2000, 'e'], r_blood: [3500, 'e'], r_cloud: [1500, 'g'], r_star: [4000, 'g'], r_phoenix: [3000, 'g'], r_heaven: [5000, 'g'], r_asura: [4000, 'e'] }; // 👘 ชุดหายากตามโลก (ต้องตรงกับ BLOCK 106 ใน app.js)
const SENS_A = new Set(['owbuy', 'owget', 'kbspend', 'kbget', 'lkuse', 'rruse', 'rrtake', 'rrback', 'rrclaim', 'rrearn', 'kbdep', 'kbimp', 'cosclaim', 'cosset', 'vipsay', 'vipttl', 'vipinc', 'vipwall', 'gunlink', 'save', 'profack', 'psput', 'say', 'lifepub', 'lbclaim', 'lawclaim', 'paclaim', 'pabid', 'oneroll', 'mgput', 'sw', 'gpray', 'profile', 'sp', 'nv', 'wtr', 'wpool']); // ไม่ใส่ life/live: การส่งชีวิตขึ้นทำเนียบต้องไม่พังเพราะรหัสเครื่องไม่ตรง

function uaMeta(req, now) {
  const ua = String(req.headers['user-agent'] || '');
  const org = String(req.headers['origin'] || req.headers['referer'] || '').replace(/^https?:\/\//, '').split('/')[0].slice(0, 60);
  return { d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', b: /bot|crawl|spider|headless|preview|facebookexternalhit/i.test(ua) ? 'บอท' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'อื่นๆ', o: org || 'ไม่ระบุ', v: String(qOf(req).v || '').slice(0, 8), c: String(req.headers['cf-ipcountry'] || req.headers['x-vercel-ip-country'] || '?').slice(0, 3), t: now };
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

// ---- ประมูลทั่วยุทธภพ (ผู้เล่นจริง): รอบละ 6 ชิ้น ชิ้นละ 60 วิ · มีคนเสนอราคาแล้วนับถอยหลังใหม่ 20 วิทุกครั้ง · สมบัติระดับเทพ (k>=9e8) โอกาส 22% ต่อชิ้นระดับ 4+ สูงสุด 1 ชิ้นต่อรอบ ราคาเริ่ม ×2.5 · พักรอบละ 10–15 นาที ----
const PA_RW = [0, 4, 10, 18, 24, 22, 14, 0], PA_G0 = [10, 300, 5000, 80000, 1000000, 8000000, 30000000, 100000000], PA_LOT_MS = 30e3, PA_NB_MS = 30e3, PA_GRACE_MS = 1500, PA_LEAD_MS = 60e3;
// v17.12: ราคาเริ่มตามเงินที่ผู้เล่นมีจริง (เดิม ×1 → ระดับสูงลดมาก) · ไม่มีคนเสนอ ราคาลดทุก 5 วิ ครั้งละ 15% จนเหลือ 40%
const PA_GF = [1, .5, .3, .15, .075, .05, .03, .02];
const paPrice = (cur, L, now) => { const st = cur.ls || cur.t0 || now, n = Math.max(0, Math.floor((now - st) / 5000)); return Math.max(Math.ceil(L.g * .4), Math.round(L.g * Math.pow(.85, n))) };
const PA_GW = { m: [10, 100, 1000, 10000, 80000, 400000, 2000000, 10000000], x: [500, 5000, 50000, 400000, 3000000, 15000000, 50000000, 100000000], g: [20000, 200000, 2000000, 8000000, 25000000, 50000000, 80000000, 100000000] }, PA_NB = [10, 30, 100, 300];
for (const w in PA_GW) PA_GW[w] = PA_GW[w].map((v, i) => Math.max(10, Math.round(v * PA_GF[i] / 10) * 10));
const PA_WN = { m: 'ยุทธภพ', x: 'โลกเซียน', g: 'แดนเทพ' };
// ใครประมูลชิ้นนี้ได้: ต้องอยู่โลกเดียวกัน · ชิ้นมือใหม่ = ขั้นไม่เกิน 2 · ของระดับต่ำ (ธรรมดา/หายาก) คนขั้น 5 ขึ้นไปห้ามแย่ง
function paElig(L, w, ri) { if (!L.w) return ''; if (L.w !== w) return 'ชิ้นนี้สำหรับคนใน' + PA_WN[L.w]; if (L.nb && ri > 2) return 'ชิ้นมือใหม่ — สำหรับคนที่ยังอยู่ขั้นต้น'; if (!L.nb && L.r <= 1 && ri >= 5) return 'ของระดับต่ำ เก็บไว้ให้มือใหม่'; return '' }
const PA_BID_LUA = "local hi=tonumber(redis.call('HGET',KEYS[1],'hi') or '0') local en=tonumber(redis.call('GET',KEYS[2]) or '0') local now=tonumber(ARGV[4]) if now>en then return {-1,hi} end local g=tonumber(ARGV[1]) local mn=tonumber(ARGV[5]) if hi>0 then mn=math.ceil(hi*1.05) end if g<mn then return {0,hi} end redis.call('HSET',KEYS[1],'hi',g,'by',ARGV[2],'bn',ARGV[3],'t',now) redis.call('SET',KEYS[2],now+15000,'EX',3600) redis.call('EXPIRE',KEYS[1],3600) return {1,g}";
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
      const sid = (now.toString(36) + Math.random().toString(36).slice(2, 5)).slice(-9), lots = [], nL = act <= 3 ? 3 : 4;
      // โลกของแต่ละชิ้น ตามสัดส่วนคนที่ออนไลน์อยู่จริงในแต่ละโลก (ไม่รู้ = แบบเดิม 50/30/20)
      let WW = { m: .5, x: .3, g: .2 }; try { const ids = (await cmd('ZRANGEBYSCORE', 'online', now - 180e3, '+inf', 'LIMIT', 0, 200)) || []; if (ids.length) { const A = (await cmd('HMGET', 'oa', ...ids)) || [], C = { m: 0, x: 0, g: 0 }; let n0 = 0; A.forEach(v => { const o = jp(v); if (o && C[o.w] != null) { C[o.w]++; n0++ } }); if (n0) WW = { m: C.m / n0, x: C.x / n0, g: C.g / n0 } } } catch {}
      const pickW = () => { const x = Math.random(); return x < WW.m ? 'm' : x < WW.m + WW.x ? 'x' : 'g' };
      let hi6 = 0, hi7 = 0, opN = 0;
      // ของแต่ละชิ้นมีโลกของมัน (ประมูลได้เฉพาะคนในโลกนั้น) + ชิ้นมือใหม่ 1 ชิ้นต่อรอบ
      const rg = r => Math.max(10, Math.round(r * (.8 + Math.random() * .4) / 10) * 10);
      lots.push({ r: Math.random() < .5 ? 2 : 3, k: Math.floor(Math.random() * 1e6), w: WW.m > 0 || !(WW.x + WW.g) ? 'm' : pickW(), nb: 1 }); lots[0].g = rg(PA_NB[lots[0].r]);
      for (let i = 1; i < nL; i++) { let r = Math.min(6, paPick()); if (r >= 6 && hi6 >= 2) r = 5; if (r === 7) hi7++; if (r >= 6) hi6++; const w = pickW(); const op = r >= 4 && !opN && Math.random() < .22; if (op) opN = 1; lots.push({ r, k: op ? 9e8 + Math.floor(Math.random() * 1e6) : Math.floor(Math.random() * 1e6), w, g: rg(PA_GW[w][r] * (op ? 2.5 : 1)) }) }
      for (let i = lots.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [lots[i], lots[j]] = [lots[j], lots[i]] }
      let csOp = null; try { const cq = jp(await cmd('RPOP', 'pa:cq')); if (cq && cq.u) { const li = lots.findIndex(x => !x.nb); if (li >= 0) { const w = ['m', 'x', 'g'].includes(cq.w) ? cq.w : 'm', r = Math.max(2, Math.min(5, +cq.r || 3)); lots[li] = { r, k: Math.floor(Math.random() * 1e6), w, g: rg(PA_GW[w][r]), cn: String(cq.n || '').slice(0, 20) }; csOp = ['HSET', 'pa:cs:' + sid, String(li), cq.u] } } } catch {}
      cur = { sid, t0: now, lots, li: 0, phase: 'open', act, u: 2, ls: now + PA_LEAD_MS };
      if (csOp) await pipe([csOp, ['EXPIRE', 'pa:cs:' + sid, 7200]]);
      if (force) await cmd('DEL', 'pa:force');
      await pipe([['INCR', 'pa:day:' + day], ['EXPIRE', 'pa:day:' + day, 172800]]);
      await pipe([['SET', 'pa:cur', JSON.stringify(cur), 'EX', 7200], ['SET', 'pa:end:' + sid, now + PA_LEAD_MS + PA_LOT_MS, 'EX', 3600]]);
    } finally { await cmd('DEL', 'pa:lk').catch(() => {}) }
    return cur;
  }
  if (cur.phase !== 'open') return cur;
  const end = +(await cmd('GET', 'pa:end:' + cur.sid)) || 0;
  // ไม่มีใครเสนอราคาภายใน 25 วิ → ข้ามไปชิ้นถัดไปทันที
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
    if (L.cn) { try { const su = await cmd('HGET', 'pa:cs:' + cur.sid, String(cur.li)); if (su) ops.push(['LPUSH', 'pacs:' + su, JSON.stringify({ g: H.by ? +H.hi : 0, r: L.r, w: L.w, t: now })], ['LTRIM', 'pacs:' + su, 0, 19], ['EXPIRE', 'pacs:' + su, 86400 * 30]) } catch {} }
    if (H.by) { L.sold = { g: +H.hi, n: H.bn }; const dk = 'pa:wd:' + PA_DAY(now) + ':' + H.by + ':' + (L.w || 'm'); ops.push(['INCR', dk], ['EXPIRE', dk, 172800], ['HINCRBY', 'pa:ws:' + cur.sid, H.by, 1], ['EXPIRE', 'pa:ws:' + cur.sid, 7200], ['LPUSH', 'pa:win:' + H.by, JSON.stringify({ sid: cur.sid, li: cur.li, r: L.r, k: L.k, g: +H.hi, t: now, u: cur.u ? 1 : 0 })], ['EXPIRE', 'pa:win:' + H.by, 86400]) } else L.sold = { g: 0 };
    const rest = cur.lots.map((x, i) => i).filter(i => !cur.lots[i].sold);
    if (!rest.length) { cur.phase = 'done'; const act = +(await cmd('ZCOUNT', 'online', now - 180e3, '+inf')) || 0; cur.next = now + Math.max(5, Math.min(10, act)) * 60e3;
      try { const [bd, vmax, wsH] = await pipe([['SMEMBERS', 'pa:bd:' + cur.sid], ['GET', 'pa:vmax:' + cur.sid], ['HKEYS', 'pa:ws:' + cur.sid]]); const winners = new Set(wsH || []); if (H.by) winners.add(H.by); const B = bd || [];
        ops.push(['LPUSH', 'pa:stat', JSON.stringify({ sid: cur.sid, t: now, act: cur.act || 0, vw: +vmax || 0, bd: B.length, n: cur.lots.length, sold: cur.lots.filter(x => x.sold && x.sold.g).length, w: cur.lots.map(x => x.w + x.r).join(',') })], ['LTRIM', 'pa:stat', 0, 199]);
        for (const u of B) if (!winners.has(u)) ops.push(['SET', 'pa:cons:' + u, cur.sid, 'EX', 86400]) } catch {} }
    else { rest.sort((x, y) => (V['l' + y] || 0) - (V['l' + x] || 0) || x - y); cur.li = rest[0]; const ls0 = now + PA_GRACE_MS; cur.ls = ls0; cur.nbEnd = ls0 + PA_NB_MS; ops.push(['SET', 'pa:end:' + cur.sid, ls0 + PA_LOT_MS, 'EX', 3600]); cur.end = ls0 + PA_LOT_MS }
    ops.push(['SET', 'pa:cur', JSON.stringify(cur), 'EX', 7200]);
    await pipe(ops);
  } finally { await cmd('DEL', 'pa:lk').catch(() => {}) }
  return cur;
}
const PA_DAY = t => new Date(t + 7 * 3600e3).toISOString().slice(0, 10);
const paSum = c => c ? { sid: c.sid, phase: c.phase, t0: c.t0, ls: c.ls || 0, li: c.li, n: c.lots.length, left: c.lots.filter(x => !x.sold).length } : null;
let QUOTA_AT = 0, OOM_AT = 0;
// ฐานข้อมูลเต็ม (OOM): ตัวนับกันสแปมเขียนไม่ได้ → ข้ามการจำกัดไปก่อน ไม่ให้ทุกคำขอล้มทั้งหมด (แชท/โหลดข้อมูลยังใช้ได้)
// เซฟคลาวด์ก้อนใหญ่: ถ้า Worker ผูก R2 (SAVES_R2) ไว้ → เก็บใน R2 แทน RAM ของ Valkey · ไม่ผูก = ใช้ Valkey เหมือนเดิม
const r2Bkt = () => globalThis.SAVES_R2 || null, r2Key = (id, n) => 'cs3/' + id + '/' + n;
const r2Get = async (id, n) => { const b = r2Bkt(); if (!b) return null; try { const o = await b.get(r2Key(id, n)); return o ? await o.text() : null } catch { return null } };
const cs3Fill = async (id, vals) => r2Bkt() ? Promise.all(vals.map(async (v, i) => v != null ? v : await r2Get(id, i + 1))) : vals;
// ย้ายเซฟคลาวด์ 1 ก้อนจาก Valkey → R2: เขียนเฉพาะเมื่อ R2 ยังไม่มีไฟล์นั้น (ไม่ทับของใหม่ที่ผู้เล่นเพิ่งฝาก) → เช็คขนาด → ค่อยลบจาก Valkey · คืน 1=ย้าย/ลบแล้ว 0=ข้าม -1=พลาด
async function csMove(k, bk, go = true) {
  try {
    const [, id, sl] = k.split(':'), [v, ttl] = await pipe([['GET', k], ['TTL', k]]);
    if (v == null || /^@[1-5]$/.test(String(v))) return 0;
    if (!go) return 1;
    const by = Buffer.byteLength(String(v)), nw = Date.now(), t = +ttl > 0 ? nw - Math.max(0, 90 * 86400 - +ttl) * 1000 : nw;
    const put = await bk.put(r2Key(id, sl), String(v), { customMetadata: { t: String(t), mig: '1' }, onlyIf: { etagDoesNotMatch: '*' } });
    if (put) { const hd = await bk.head(r2Key(id, sl)); if (!hd || hd.size !== by) return -1 }
    await cmd('DEL', k); return 1;
  } catch (e) { return -1 }
}
// ย้ายเองเบื้องหลังตอนมีคน ping (ทีละไม่กี่ก้อน) → ฐานข้อมูลเต็มก็ค่อยๆ ว่างเอง ไม่ต้องรอผู้ดูแลกด
let CSM_CUR = '0', CSM_T = 0;
async function autoCs(max = 15) {
  const bk = r2Bkt(); if (!bk || Date.now() - CSM_T < 3e3) return; CSM_T = Date.now();
  try {
    const r = await cmd('SCAN', CSM_CUR, 'MATCH', 'cs3:*', 'COUNT', 1000); CSM_CUR = String(r[0]);
    const ks = (r[1] || []).filter(k => /^cs3:[a-z0-9]{6,24}:[1-5]$/.test(k)).slice(0, max);
    await Promise.all(ks.map(k => csMove(k, bk)));
  } catch (e) {}
}
const pipeSoft = async l => { try { return await pipe(l) } catch (e) { if (/OOM/i.test(String(e && e.message))) { OOM_AT = Date.now(); return null } throw e } };

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
  if (a === 'memfix') { // บีบอัดเซฟคลาวด์เดิม + ตัด cs2 ที่ซ้ำกับ cs3 (ทำซ้ำได้ปลอดภัย) · ผลเขียนลง log เท่านั้น
    if (global._mfB) return res.json({ ok: 0 }); global._mfB = 1; const t0 = Date.now(); let dd = 0, zz = 0, sv = 0, seen = 0;
    try { let cur = String(global._mfC || '0');
      do { const r = await cmd('SCAN', cur, 'MATCH', 'cs*', 'COUNT', 200); cur = String(r[0]); const ks = (r[1] || []).filter(k => /^cs[23]?:/.test(k));
        const pre = ks.length ? await pipe(ks.map(k => ['GETRANGE', k, 0, 2])) : [];
        const todo = ks.filter((k, i) => pre[i] != null && !/^(zb:|z:|zr:|zt:|@)/.test(String(pre[i])));
        const one = async k => { if (Date.now() - t0 > 8500) return; seen++;
          const [v, ttl] = await pipe([['GET', k], ['TTL', k]]); if (v == null || /^(zb?|zr|zt):/.test(String(v)) || /^@[1-5]$/.test(String(v))) return;
          const ex = +ttl > 0 ? +ttl : 86400 * 30;
          if (k.startsWith('cs2:')) { const fid = k.slice(4); const ls = await pipe([1, 2, 3, 4, 5].map(n => ['GET', 'cs3:' + fid + ':' + n])); const hit = ls.findIndex(x => x != null && (x === v || zUnpack(x) === v));
            if (hit >= 0) { await cmd('DEL', k); await cmd('SET', k, '@' + (hit + 1), 'EX', ex); dd++; sv += String(v).length; return } }
          const z = zPack(v); if (z.length < String(v).length * .9) { await cmd('DEL', k); await cmd('SET', k, z, 'EX', ex); zz++; sv += String(v).length - z.length } };
        for (let i = 0; i < todo.length && Date.now() - t0 < 8500; i += 6) await Promise.all(todo.slice(i, i + 6).map(k => one(k).catch(() => {})));
        global._mfC = cur; if (Date.now() - t0 > 8500) break } while (cur !== '0');
      if (cur === '0') global._mfC = '0';
      console.error('MEMFIX seen=' + seen + ' dedup=' + dd + ' zip=' + zz + ' saved=' + Math.round(sv / 1048576) + 'M cursor=' + global._mfC);
    } catch (e) { console.error('MEMFIX err', String(e && e.message)) } finally { global._mfB = 0 }
    return res.json({ ok: 1 });
  }
  if (a === 'memfix2') { // ย่อเซฟคลาวด์เดิม: ตัด feed เก่า + บีบอัด brotli (ทำซ้ำได้ปลอดภัย) · ผลเขียนลง log เท่านั้น
    if (global._mf2B) return res.json({ ok: 0 }); global._mf2B = 1; const t0 = Date.now(); let seen = 0, done = 0, sv = 0, err = 0;
    try { let cur = String(global._mf2C || (await cmd('GET', 'mf2:cur').catch(() => null)) || '0');
      do { const r = await cmd('SCAN', cur, 'MATCH', 'cs*', 'COUNT', 300); cur = String(r[0]); const ks = (r[1] || []).filter(k => /^cs[23]?:/.test(k));
        const pre = ks.length ? await pipe(ks.map(k => ['STRLEN', k])) : [];
        const todo = ks.filter((k, i) => +pre[i] > 45000);
        const one = async k => { if (Date.now() - t0 > 8000) return; seen++;
          const [v, ttl] = await pipe([['GET', k], ['TTL', k]]); if (v == null || /^@[1-5]$/.test(String(v))) return;
          const raw = zUnpack(v); if (raw == null) { err++; return }
          const z = zPack(saveTrim(raw)); if (!/^z[rt]:/.test(z) || z.length >= String(v).length) return;
          const ex = +ttl > 0 ? +ttl : 86400 * 30; await cmd('DEL', k); await cmd('SET', k, z, 'EX', ex); done++; sv += String(v).length - z.length };
        for (let i = 0; i < todo.length && Date.now() - t0 < 8000; i += 4) await Promise.all(todo.slice(i, i + 4).map(k => one(k).catch(() => { err++ })));
        if (Date.now() - t0 > 8000) break; global._mf2C = cur; } while (cur !== '0');
      global._mf2C = cur === '0' ? '0' : global._mf2C; try { await cmd('SET', 'mf2:cur', global._mf2C || '0', 'EX', 86400) } catch {}
      console.error('MEMFIX2 seen=' + seen + ' done=' + done + ' err=' + err + ' saved=' + Math.round(sv / 1048576) + 'M cursor=' + global._mf2C);
    } catch (e) { console.error('MEMFIX2 err', String(e && e.message)) } finally { global._mf2B = 0 }
    return res.json({ ok: 1 });
  }
  if (a === 'memdiag2') { // ดูว่าฟิลด์ไหนในเซฟคลาวด์ใหญ่ (ขนาดเท่านั้น ไม่มีเนื้อหา) → log
    if (global._md2T && Date.now() - global._md2T < 30e3) return res.json({ ok: 0 }); global._md2T = Date.now();
    try { const big = []; let cur = '0'; const t0 = Date.now();
      do { const r = await cmd('SCAN', cur, 'MATCH', 'cs3:*', 'COUNT', 500); cur = String(r[0]); const ks = r[1] || []; if (ks.length) { const sz = await pipe(ks.map(k => ['STRLEN', k])); ks.forEach((k, i) => big.push([k, +sz[i] || 0])) } } while (cur !== '0' && Date.now() - t0 < 4000);
      big.sort((x, y) => y[1] - x[1]); const agg = {}, aggS = {}; let n = 0;
      for (const [k] of big.slice(0, 12)) { const raw = zUnpack(await cmd('GET', k)); if (!raw) continue; let j; try { j = JSON.parse(Buffer.from(raw, 'base64').toString('utf8')) } catch { continue } n++;
        for (const f in j) agg[f] = (agg[f] || 0) + JSON.stringify(j[f] == null ? '' : j[f]).length;
        if (j.S) for (const f in j.S) aggS[f] = (aggS[f] || 0) + JSON.stringify(j.S[f] == null ? '' : j.S[f]).length }
      const fm = o => Object.entries(o).sort((x, y) => y[1] - x[1]).slice(0, 25).map(([f, v]) => f + '=' + Math.round(v / n / 1024) + 'K').join(' ');
      console.error('MEMDIAG2 n=' + n + ' avgStored=' + Math.round(big.slice(0, 12).reduce((x, y) => x + y[1], 0) / 12 / 1024) + 'K top: ' + fm(agg));
      console.error('MEMDIAG2 S: ' + fm(aggS));
    } catch (e) { console.error('MEMDIAG2 err', String(e && e.message)) }
    return res.json({ ok: 1 });
  }
  if (a === 'memdiag') { // ตรวจขนาดฐานข้อมูล → เขียนลง log ฝั่งเซิร์ฟเวอร์เท่านั้น ไม่คืนข้อมูล
    if (global._mdT && Date.now() - global._mdT < 60e3) return res.json({ ok: 0 });
    global._mdT = Date.now();
    try { const info = String(await cmd('INFO', 'memory') || ''); const pick = k => (info.match(new RegExp(k + ':([^\\r\\n]+)')) || [])[1];
      const agg = {}, big = []; let cur = '0', n = 0, keys = 0; const t0 = Date.now();
      do { const r = await cmd('SCAN', cur, 'COUNT', 1000); cur = String(r[0]); const ks = r[1] || []; keys += ks.length;
        if (ks.length) { const sz = await pipe(ks.map(k => ['MEMORY', 'USAGE', k])); ks.forEach((k, i) => { const v = +sz[i] || 0, p = k.split(':')[0]; const g = agg[p] || (agg[p] = [0, 0]); g[0]++; g[1] += v; if (v > 300000) big.push([k.slice(0, 40), v]) }) }
        n++ } while (cur !== '0' && Date.now() - t0 < 8000);
      const top = Object.entries(agg).sort((x, y) => y[1][1] - x[1][1]).slice(0, 30).map(([p, [c, v]]) => p + '=' + c + '/' + Math.round(v / 1024) + 'K').join(' ');
      console.error('MEMDIAG used=' + pick('used_memory_human') + ' max=' + pick('maxmemory_human') + ' pol=' + pick('maxmemory_policy') + ' keys=' + keys + ' done=' + (cur === '0') + ' | ' + top);
      console.error('MEMDIAG big ' + big.sort((x, y) => y[1] - x[1]).slice(0, 25).map(x => x[0] + '=' + Math.round(x[1] / 1024) + 'K').join(' '));
    } catch (e) { console.error('MEMDIAG err', String(e && e.message)) }
    return res.json({ ok: 1 });
  }
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b) } catch { b = {} } }
  const id = req.method === 'GET' ? qOf(req).id : b.id;
  const id0 = id;
  const now = Date.now(), W = week();
  // ฐานข้อมูลเต็มโควตา: ตอบทันทีโดยไม่ยิงซ้ำ (ยกเว้นหน้าผู้ดูแลที่ต้องเห็นสถานะ)
  if (QUOTA_AT && now - QUOTA_AT < 120e3 && a !== 'admin' && a !== 'kvdiag') return res.status(503).json({ err: 'quota' });
  const ip = cip(req);
  // 🔐 คำสั่งที่แตะของของบัญชี (ตั๋วที่ซื้อ · VIP · ของแต่ง · บัญชี Google · ส่งข้อความในนามคนนั้น) ต้องมีรหัสลับของเครื่อง (ctok) ตรงกับที่ผูกไว้ — รหัสผู้เล่นอย่างเดียวไม่พอ เพราะรหัสผู้เล่นเห็นได้จากแชท/ทำเนียบ
  if (SENS_A.has(a) && okId(id) && !isAdmKey(qOf(req).key || b.key)) {
    const tk0 = String(req.headers['x-tk'] || b.tk || qOf(req).tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
    try { const tok = await cmd('GET', 'ctok:' + id); if (tok && tok !== tk0) { try { await pipe([['INCR', 'authfail:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10)], ['EXPIRE', 'authfail:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10), 86400 * 14]]) } catch (e) {} return res.status(403).json({ err: 'auth' }) } } catch (e) { return res.status(503).json({ err: 'db' }) }
  }
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
    // 🎲 สิทธิ์สุ่มเกิดที่ซื้อ (เก็บที่เซิร์ฟเวอร์ ผูกกับรหัสผู้เล่น/บัญชี Google)
    if (a === 'buyann') { const l = ((await cmd('LRANGE', 'buyann', 0, 11)) || []).map(jp).filter(Boolean); return res.json({ l }) }
    if (a === 'cosget') {
      if (!okId(id)) { const ft0 = cosFeat(); return res.json({ own: [], eq: {}, mdeal: mDeal(), feat: { pk: ft0.pk, p: cosPrice(ft0.pk), full: COS_BASE[ft0.pk][0], exp: ft0.exp } }) }
      await kbFix(id);
      const [own, q, ...evr] = await pipe([['SMEMBERS', 'cos:' + id], ['GET', 'cosq:' + id], ...Object.keys(EVM).map(k => ['GET', 'evn:' + k]), ['HMGET', 'evs:' + id, ...EV_MI], ['HGETALL', 'kb:' + id], ['SISMEMBER', 'supok', id]]);
      const ft = cosFeat(), EK = Object.keys(EVM), sn = evr[EK.length] || [], kbr = evr[EK.length + 1], kbo = {}; if (Array.isArray(kbr)) for (let i = 0; i + 1 < kbr.length; i += 2) kbo[kbr[i]] = kbr[i + 1]; else if (kbr && typeof kbr === 'object') Object.assign(kbo, kbr);
      const ev = { end: EV_END, sup: +evr[EK.length + 2] ? 1 : 0, left: {}, sn: {}, kb: { g: +kbo.g || 0, e: +kbo.e || 0, imp: kbo.imp ? 1 : 0 } }; EK.forEach((k, i) => { ev.left[k] = Math.max(0, EVM[k][2] - (+evr[i] || 0)) }); EV_MI.forEach((x, i) => { if (sn[i]) ev.sn[x] = +sn[i] });
      return res.json({ own: own || [], eq: jp(q) || {}, ev, mdeal: mDeal(), feat: { pk: ft.pk, p: cosPrice(ft.pk), full: COS_BASE[ft.pk][0], exp: ft.exp } });
    }
    if (a === 'cosset') {
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const adm = isAdmKey(b.key) || !!(+(await cmd('SISMEMBER', 'admids', id))), own = new Set(await cosOwn(id)), vtq = vipTier(jp(await cmd('GET', 'vip:' + id))), has = x => COS_ALL.has(x) && (adm || own.has(x) || (vipCosN(x) > 0 && vtq >= vipCosN(x)));
      const t = String(b.t || ''), c = String(b.c || '');
      const q = { t: has(t) ? t : '', c: has(c) ? c : '' };
      if (/^t_e/.test(q.t)) { const sn = +(await cmd('HGET', 'evs:' + id, q.t)); if (sn) q.n = sn }
      await cmd('SET', 'cosq:' + id, JSON.stringify(q));
      return res.json({ ok: 1, eq: q });
    }
    // 🏮 กรรมของอีเวนต์: เก็บและหักที่เซิร์ฟเวอร์ ไม่เชื่อตัวเลขในเครื่อง
    if (a === 'kbimp') { // ปิดแล้ว: ไม่รับยอดจากเครื่อง (แก้ค่าได้)
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const r = await kbFix(id); return res.json({ ok: 1, g: r.g, e: r.e });
    }
    if (a === 'kbget') { if (!okId(id)) return res.status(400).json({ err: 'id' }); const r = await kbFix(id); return res.json({ ok: 1, g: r.g, e: r.e }) }
    if (a === 'kbspend') { // ใช้คลังกรรม: หักที่เซิร์ฟเวอร์เท่านั้น
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const sd = b.s === 'e' ? 'e' : 'g', n = Math.floor(+b.n || 0); if (!(n > 0 && n <= 1e7)) return res.status(400).json({ err: 'n' });
      await kbFix(id); const left = +(await cmd('HINCRBY', 'kb:' + id, sd, -n));
      if (left < 0) { await cmd('HINCRBY', 'kb:' + id, sd, n); const r = await kbFix(id); return res.json({ ok: 0, err: 'karma', g: r.g, e: r.e }) }
      await pipe([['LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u: id, m: 'spend', s: sd, c: n, w: String(b.w || '').slice(0, 24), left })], ['LTRIM', 'evlog', 0, 299]]);
      const r = await kbFix(id); return res.json({ ok: 1, g: r.g, e: r.e });
    }
    if (a === 'kbdep') { // ฝากกรรมตอนจบชีวิต: จำกัดต่อครั้ง/ความถี่/ต่อวัน
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const k = Math.max(-EV_DEP_MAX, Math.min(EV_DEP_MAX, Math.round(+b.k || 0))); if (!k) return res.json({ ok: 1 });
      await kbFix(id);
      if ((await cmd('SET', 'kbt:' + id, '1', 'NX', 'EX', 20)) !== 'OK') return res.json({ ok: 0, err: 'fast' });
      const dk = 'kbd:' + id + ':' + Math.floor((now + 7 * 3600e3) / 864e5), used = await cmd('INCRBY', dk, Math.abs(k)); await cmd('EXPIRE', dk, 172800);
      const over = Math.max(0, +used - EV_DAY_MAX), amt = Math.abs(k) - over; if (amt <= 0) return res.json({ ok: 0, err: 'day' });
      await cmd('HINCRBY', 'kb:' + id, k > 0 ? 'g' : 'e', amt); const r2 = await kbFix(id); return res.json({ ok: 1, g: r2.g, e: r2.e });
    }
    if (a === 'cosdyn') { if (!okId(id)) return res.status(400).json({ err: 'id' }); const r = await paRest(id); return res.json({ ok: 1, amt: r.amt, left: r.left }) }
    if (a === 'owget') { if (!okId(id)) return res.status(400).json({ err: 'id' }); const own = (await cmd('SMEMBERS', 'ow:' + id)) || []; const adm = !!(+(await cmd('SISMEMBER', 'admids', id))); return res.json({ own, adm }) }
    if (a === 'owbuy') { // แลกชุดหายากด้วยกรรม: หักที่เซิร์ฟเวอร์ ครั้งเดียวต่อชุด
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const it = String(b.i || ''), K = OWP[it]; if (!K) return res.status(400).json({ err: 'i' });
      if (+(await cmd('SISMEMBER', 'ow:' + id, it))) { const r = await kbFix(id); return res.json({ ok: 1, dup: 1, g: r.g, e: r.e }) }
      await kbFix(id); const left = +(await cmd('HINCRBY', 'kb:' + id, K[1], -K[0]));
      if (left < 0) { await cmd('HINCRBY', 'kb:' + id, K[1], K[0]); const r = await kbFix(id); return res.json({ ok: 0, err: 'karma', g: r.g, e: r.e }) }
      await pipe([['SADD', 'ow:' + id, it], ['LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u: id, i: it, m: 'outfit', c: K[0], s: K[1], left })], ['LTRIM', 'evlog', 0, 299]]);
      const r = await kbFix(id); return res.json({ ok: 1, g: r.g, e: r.e });
    }
    if (a === 'cosclaim') { // แลกของอีเวนต์ด้วยกรรม (หักยอดฝั่งเซิร์ฟเวอร์ ครั้งเดียวต่อรายการ)
      if (!okId(id)) return res.status(400).json({ err: 'id' });
      const pk = String(b.pk || ''), K = EVK[pk]; if (!K) return res.status(400).json({ err: 'pk' });
      if (!evOpen()) return res.json({ ok: 0, err: 'closed' });
      if (+(await cmd('SISMEMBER', 'cos:' + id, K[0]))) return res.json({ ok: 1, dup: 1 });
      await kbFix(id); const bal = +(await cmd('HGET', 'kb:' + id, K[2])) || 0; if (bal < K[1]) return res.json({ ok: 0, err: 'karma', have: bal, need: K[1] });
      const left = +(await cmd('HINCRBY', 'kb:' + id, K[2], -K[1])); if (left < 0) { await cmd('HINCRBY', 'kb:' + id, K[2], K[1]); return res.json({ ok: 0, err: 'karma' }) }
      await pipe([['SADD', 'cos:' + id, K[0]], ['LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u: id, k: pk, i: K[0], m: 'karma', c: K[1], s: K[2], left })], ['LTRIM', 'evlog', 0, 299]]);
      return res.json({ ok: 1, left });
    }
    if (a === 'evlog' || a === 'evrevoke') { // แอดมิน: ดูรายการแลก/ซื้อ และยึดคืน
      if (!isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
      if (a === 'evlog') return res.json({ rows: ((await cmd('LRANGE', 'evlog', 0, 99)) || []).map(jp).filter(Boolean) });
      const u = String(b.u || ''), it = String(b.i || ''); if (!okId(u) || !COS_ALL.has(it)) return res.status(400).json({ err: 'arg' });
      await pipe([['SREM', 'cos:' + u, it], ['LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u, i: it, m: 'revoke' })]]);
      const cq = jp(await cmd('GET', 'cosq:' + u)); if (cq && (cq.t === it || cq.c === it)) { if (cq.t === it) { cq.t = ''; delete cq.n } if (cq.c === it) cq.c = ''; await cmd('SET', 'cosq:' + u, JSON.stringify(cq)) }
      return res.json({ ok: 1 });
    }
    if (a === 'rrget') {
      if (!okId(id)) return res.json({ c: 0 });
      let v = jp(await cmd('GET', 'vip:' + id));
      if (Date.now() < VIP_GIFT_UNTIL && !v && +(await cmd('SISMEMBER', 'supok', id)) && await cmd('SET', 'vipg:' + id, 1, 'NX')) {
        v = await vipAdd(id, 1, 30, 1);
        try { await withCap(noteTo(id, { t: '🏮 ขอบคุณที่สนับสนุนเกม', b: 'ได้รับ ผู้อุปถัมภ์สำนัก ฟรี 30 วัน — สุ่มเกิดได้ 30 ครั้งต่อชีวิต', u: '/' }), 3000) } catch (e) {}
      }
      const vo = vipOut(v);
      if (vo.u) { try { await vipHeal(id) } catch (e) {} }
      if (vo.t) { try { await cmd('SADD', 'vipall', id) } catch (e) {} }
      if (vo.u) { const ul = jp(await cmd('HGET', 'vipu', id)); if (ul) vo.ul = { o: ul.o | 0, t: +ul.t || 0, w: ul.w || '' } }
      // 🔒 ตั๋วล็อกชะตาจาก VIP: ผู้สนับสนุน 2 · พิเศษ 6 ต่อรอบ 30 วัน (ได้ใหม่เมื่อวันหมดอายุเปลี่ยน = สมัคร/ต่ออายุ) · ผู้ก่อตั้ง 10 ครั้งแรก + เดือนละ 5
      try { if (vo.t && await cmd('SET', 'lkvl:' + id, 1, 'NX', 'EX', 5)) { const lk = jp(await cmd('GET', 'lkv:' + id)) || {}; let add = 0; const mon = new Date(now + 7 * 3600e3).toISOString().slice(0, 7);
        if (vo.u) { if (!lk.u) { lk.u = 1; lk.m = mon; add += 10 } else if (lk.m !== mon) { lk.m = mon; add += 5 } }
        else if (vo.t === 2 && vo.e2 > now) { if (String(lk.e2 || '') !== String(vo.e2)) { lk.e2 = vo.e2; add += 6 } }
        else if (vo.t === 1 && vo.e1 > now) { if (String(lk.e1 || '') !== String(vo.e1)) { lk.e1 = vo.e1; add += 2 } }
        if (add > 0) { await cmd('SET', 'lkv:' + id, JSON.stringify(lk)); await cmd('INCRBY', 'lkc:' + id, add); vo.lkg = add } await cmd('DEL', 'lkvl:' + id) } } catch (e) {}
      const rrP = Math.max(0, +(await cmd('GET', 'rrc:' + id)) || 0), rrF = Math.max(0, +(await cmd('GET', 'rrf:' + id)) || 0), rrG = Math.max(0, +(await cmd('GET', 'rrg:' + id)) || 0);
      return res.json({ c: rrP + rrG, f: rrF, g: rrG, pk: RR_PK, vp: VIP_PK, vip: vo });
    }
    if (a === 'vipset') {
      const q = qOf(req); if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      const tid = String(q.id || b.id || ''), tr = Math.max(1, Math.min(3, +(q.t || b.t) || 1)), dy = Math.round(+(q.d || b.d) || 0);
      if (!okId(tid)) return res.json({ err: 'id' });
      const v = await vipAdd(tid, tr, Math.abs(dy), dy < 0 ? -1 : 1);
      if (tr === 3 && dy >= 0 && !(await cmd('HEXISTS', 'vipu', tid))) { const o = Math.max(0, Math.floor(+(q.o || b.o) || 0)) || (+(await cmd('INCR', 'vipuN')) || 1); await cmd('HSET', 'vipu', tid, JSON.stringify({ n: clean(String(q.n || b.n || ''), 24), o, t: Date.now() })) }
      return res.json({ ok: 1, vip: vipOut(v) });
    }
    // ซ่อมหอบรรพชน: คนที่จ่ายแพ็กถาวรและอนุมัติแล้ว แต่ไม่ขึ้นในหอ (เช่น อนุมัติก่อนระบบหอเสร็จ) — ใส่ย้อนหลังตามลำดับเวลาที่จ่าย ไม่ลบอะไร
    if (a === 'vipfix') {
      const q = qOf(req); if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      return res.json(Object.assign({ ok: 1 }, await vipFixAll()));
    }
    // แอดมิน: ย้ายป้ายหนึ่งขึ้นเป็นลำดับที่ 1 (ใส่ n=ชื่อ หรือ id=รหัส) คนอื่นเลื่อนลงทีละ 1 — ถ้าชื่อซ้ำหลายป้ายจะไม่ทำ ให้ส่งรายการกลับมาเลือก
    if (a === 'vipfirst') {
      const q = qOf(req); if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      const nm = String(q.n || b.n || '').trim(), tid = String(q.id || b.id || '');
      const raw = (await cmd('HGETALL', 'vipu')) || [], rows = [];
      for (let i = 0; i + 1 < raw.length; i += 2) { const o = jp(raw[i + 1]); if (o) rows.push({ id: raw[i], o }) }
      const hit = rows.filter(r => tid ? r.id === tid : (nm && String(r.o.n || '') === nm));
      if (hit.length !== 1) return res.json({ ok: 0, found: hit.length, all: rows.sort((x, y) => x.o.o - y.o.o).map(r => ({ id: r.id, n: r.o.n, o: r.o.o })) });
      const t = hit[0], old = t.o.o | 0; const cmds = [];
      for (const r of rows) { if (r === t) continue; if ((r.o.o | 0) < old) { r.o.o = (r.o.o | 0) + 1; cmds.push(['HSET', 'vipu', r.id, JSON.stringify(r.o)]) } }
      t.o.o = 1; cmds.push(['HSET', 'vipu', t.id, JSON.stringify(t.o)]); await pipe(cmds);
      return res.json({ ok: 1, id: t.id, n: t.o.n, from: old });
    }
    if (a === 'vipwall') {
      try { if (await cmd('SET', 'vipfix:lock', 1, 'NX', 'PX', 300000)) await vipFixAll() } catch (e) {}
      const raw = (await cmd('HGETALL', 'vipu')) || [], rows = [];
      for (let i = 0; i + 1 < raw.length; i += 2) { const o = jp(raw[i + 1]); if (o) rows.push({ id: raw[i], pu: String(raw[i]).replace(/[^a-z0-9]/g, '').slice(0, 12), n: String(o.n || ''), o: o.o | 0, t: +o.t || 0, w: String(o.w || '') }) }
      rows.sort((x, y) => x.o - y.o); const top = rows.slice(0, 300);
      const rs = top.length ? await pipe(top.flatMap(r => [['SCARD', 'vinc:' + r.id], ['SISMEMBER', 'vinc:' + r.id, okId(id) ? id : '-']])) : [];
      return res.json({ n: top.map((r, i) => ({ pu: r.pu, n: r.n, o: r.o, t: r.t, w: r.w, c: +rs[i * 2] || 0, m: +rs[i * 2 + 1] ? 1 : 0, k: r.id === id ? 1 : 0 })) });
    }
    // 🎭 ห้องเล่นบท (เฉพาะคนที่ล็อกอิน Google) — แยกจากแชทโลก ข้อความเก็บ 3 วัน
    if (a === 'rpget' || a === 'rpsay' || a === 'rplike') {
      const cur = rpCur(), sc = cur.sc, q0 = qOf(req);
      if (a === 'rpget' && q0.peek) {
        const [pn, last] = await pipe([['ZCOUNT', 'rp:pres', now - 90e3, '+inf'], ['LINDEX', 'rp:all', 0]]); const lm = jp(last);
        return res.json({ sc, nx: cur.nx, n: +pn || 0, last: lm ? lm.t : 0 });
      }
      if (a === 'rplike') {
        if (!okId(id)) return res.status(403).json({ err: 'id' }); const mid = String(b.mid || '').slice(0, 20); if (!/^[a-z0-9]+$/.test(mid)) return res.status(400).json({ err: 'mid' });
        const [ok] = await pipe([['SADD', 'rp:lkby:' + mid, id.slice(0, 16)], ['EXPIRE', 'rp:lkby:' + mid, 86400 * 4]]);
        if (+ok) await pipe([['HINCRBY', 'rp:lk', mid, 1], ['EXPIRE', 'rp:lk', 86400 * 4]]);
        const v = await cmd('HMGET', 'rp:lk', mid); return res.json({ ok: 1, n: +(Array.isArray(v) ? v[0] : v) || 0, me: 1 });
      }
      const [off, gk] = await pipe([['GET', 'rp:off'], okId(id) ? ['GET', 'gof:' + id] : ['GET', 'rp:none']]);
      let linked = 0; if (gk) { const cur2 = jp(await cmd('GET', gk)); if (cur2 && cur2.id === id) linked = 1 }
      if (a === 'rpget') {
        const st = await rpStory(false);
        const cmds = [['LRANGE', 'rp:all', 0, 59], ['SMEMBERS', 'chat:hidden'], ['ZCOUNT', 'rp:pres', now - 90e3, '+inf']];
        if (okId(id)) cmds.push(['ZADD', 'rp:pres', now, id.slice(0, 16)], ['ZREMRANGEBYSCORE', 'rp:pres', 0, now - 600e3]);
        const [list, hidden, pn] = await pipe(cmds), hs = new Set(hidden || []);
        const ms = (list || []).map(jp).filter(m => m && !hs.has(m.i));
        let lk = []; if (ms.length) { try { lk = await cmd('HMGET', 'rp:lk', ...ms.map(m => m.i)) || [] } catch { lk = [] } }
        ms.forEach((m, i) => { const v = +lk[i] || 0; if (v) m.lk = v });
        let myv = null; if (st && st.step === 3 && okId(id)) { try { myv = await cmd('HGET', 'rp:vb:' + st.vid, id.slice(0, 16)) } catch { } }
        return res.json({ off: off ? 1 : 0, ok: linked, sc, nx: cur.nx, n: Math.max(+pn || 0, okId(id) ? 1 : 0), m: ms, st: st ? { step: st.step, vid: st.vid, v: st.v, vo: st.vo, my: myv == null ? null : +myv } : null });
      }
      if (off) return res.status(503).json({ err: 'off' });
      if (!linked) return res.status(403).json({ err: 'login' });
      const x0 = clean(b.x, 170).trim(), whole = /^\*[^*]+\*$/.test(x0), act = whole || b.k === 'act' ? 1 : 0; const x = (act ? x0.replace(/\*/g, '') : x0).trim().slice(0, 160); if (!x) return res.status(400).json({ err: 'empty' });
      const [mu, ch0, ok] = await pipe([['GET', 'mute:' + id], ['SISMEMBER', 'cheaters', id], ['SET', 'rl:rp:' + id, 1, 'NX', 'PX', 2500]]);
      if (mu || ch0) return res.status(429).json({ err: 'muted' });
      if (!ok) return res.status(429).json({ err: 'rate' });
      let hh = 0; for (let q = 0; q < x.length; q++) hh = (hh * 31 + x.charCodeAt(q)) | 0;
      if (!(await cmd('SET', 'dup:rp:' + id + ':' + (hh >>> 0).toString(36), 1, 'NX', 'PX', b.k === 'qa' ? 15000 : 45000))) return res.status(429).json({ err: 'dup' });
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, sc, n: noAdm(clean(b.n, 20)) || 'นิรนาม', ti: noAdm(clean(b.ti, 24)), x, a: act, pu: id.slice(0, 12), rl: clean(b.rl, 24), fn: clean(b.fn, 24), fr: await frSrv(id, /^f_[a-z0-9_]{1,16}$/.test(String(b.fr || '')) ? String(b.fr) : '', isAdmKey(b.key)) };
      try { const vj = jp(await cmd('GET', 'vip:' + id)), vt = vipTier(vj); if (vt) { m.vp = vt; if (vj.tt && (vt === 3 || VIP_TT.includes(vj.tt))) m.vq = String(vj.tt).slice(0, 20) } } catch {}
      try { const cq = jp(await cmd('GET', 'cosq:' + id)); if (cq) { if (cq.t) m.ct = cq.t; if (cq.c) m.cc = cq.c; if (cq.n && /^t_e/.test(cq.t || '')) m.cn = cq.n } } catch {}
      if (vipCosN(m.ct) > (m.vp | 0)) delete m.ct; if (vipCosN(m.fr) > (m.vp | 0)) m.fr = '';
      await pipe([['LPUSH', 'rp:all', JSON.stringify(m)], ['LTRIM', 'rp:all', 0, 59], ['EXPIRE', 'rp:all', 86400 * 3], ['ZADD', 'rp:pres', now, id.slice(0, 16)]]);
      try { await rpStory(true) } catch { }
      return res.json({ ok: 1, m });
    }
    if (a === 'rpvote') {
      if (!okId(id)) return res.status(403).json({ err: 'id' }); const c = +b.c === 1 ? 1 : 0, st = jp(await cmd('GET', 'rp:st'));
      if (!st || st.step !== 3 || String(b.vid || '') !== st.vid) return res.status(400).json({ err: 'closed' });
      const ok = await cmd('HSETNX', 'rp:vb:' + st.vid, id.slice(0, 16), c);
      if (+ok) await pipe([['HINCRBY', 'rp:vt:' + st.vid, String(c), 1], ['EXPIRE', 'rp:vt:' + st.vid, 86400], ['EXPIRE', 'rp:vb:' + st.vid, 86400]]);
      const v = await cmd('HMGET', 'rp:vt:' + st.vid, '0', '1') || []; return res.json({ ok: 1, v: [+v[0] || 0, +v[1] || 0], my: +ok ? c : +(await cmd('HGET', 'rp:vb:' + st.vid, id.slice(0, 16))) });
    }
    if (a === 'kbstat') { // 📊 แอดมิน: การกระจายของคลังกรรม (กรรมดี/กรรมชั่ว) ของผู้เล่นทุกคน
      const q = qOf(req); if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      const ids = []; let cur = '0', it = 0;
      do { const r = await cmd('SCAN', cur, 'MATCH', 'kb:*', 'COUNT', 1000); cur = String(r && r[0] || '0'); (r && r[1] || []).forEach(k => ids.push(k)); it++ } while (cur !== '0' && it < 60 && ids.length < 50000);
      const G = [], E = [];
      for (let i = 0; i < ids.length; i += 200) { const ch = ids.slice(i, i + 200), rs = await pipe(ch.map(k => ['HMGET', k, 'g', 'e'])); (rs || []).forEach(v => { const g = +(v && v[0]) || 0, e = +(v && v[1]) || 0; if (g > 0) G.push(g); if (e > 0) E.push(e) }) }
      const st = A => { A.sort((x, y) => x - y); const n = A.length, P = f => n ? A[Math.min(n - 1, Math.floor(f * n))] : 0, top = A.slice(-10), rest = A.slice(0, Math.max(0, n - 10)), avg = rest.length ? Math.round(rest.reduce((x, y) => x + y, 0) / rest.length) : 0; return { n, p25: P(.25), p50: P(.5), p75: P(.75), p90: P(.9), p99: P(.99), max: n ? A[n - 1] : 0, avgNoTop10: avg, top10: top.reverse(), b: [500, 1000, 3000, 5000, 10000, 20000, 40000].map(t => [t, A.filter(x => x >= t).length]) } };
      const out = { players: ids.length, g: st(G), e: st(E), note: 'นับเฉพาะคลังกรรมบนเซิร์ฟเวอร์ (นำเข้าครั้งแรก ≤40,000 + ฝากตอนจบชีวิต ≤3,000/ครั้ง)' };
      if (!q.html) return res.json(out);
      const row = (t, x) => `<tr><td>${t}</td><td>${x.n}</td><td>${x.p25}</td><td><b>${x.p50}</b></td><td>${x.p75}</td><td>${x.p90}</td><td>${x.p99}</td><td>${x.avgNoTop10}</td><td>${x.max}</td></tr>`;
      const bk = (t, x) => `<tr><td>${t}</td>${x.b.map(v => `<td>${v[1]} <small>(${x.n ? Math.round(v[1] / x.n * 100) : 0}%)</small></td>`).join('')}</tr>`;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>สถิติคลังกรรม</title><style>body{background:#16131d;color:#eee;font-family:system-ui,sans-serif;padding:14px}table{border-collapse:collapse;width:100%;margin:8px 0 18px;font-size:14px}td,th{border:1px solid #3a3346;padding:6px;text-align:center}th{background:#2a2433;color:#f0c860}small{color:#aaa}</style></head><body><h2>📊 สถิติคลังกรรม</h2><p>ผู้เล่นที่มีคลังบนเซิร์ฟเวอร์ <b>${out.players}</b> คน · ${out.note}</p><table><tr><th></th><th>คน</th><th>25%</th><th>มัธยฐาน</th><th>75%</th><th>90%</th><th>99%</th><th>เฉลี่ย (ไม่นับท็อป 10)</th><th>สูงสุด</th></tr>${row('☯️ กรรมดี', out.g)}${row('☠️ กรรมชั่ว', out.e)}</table><h3>มีถึงเท่านี้กี่คน</h3><table><tr><th></th>${out.g.b.map(v => `<th>≥${v[0].toLocaleString()}</th>`).join('')}</tr>${bk('☯️ กรรมดี', out.g)}${bk('☠️ กรรมชั่ว', out.e)}</table><p><small>มัธยฐาน = คนตรงกลาง (ครึ่งหนึ่งมีน้อยกว่านี้) · ท็อป 10 กรรมดี: ${out.g.top10.join(', ')} · กรรมชั่ว: ${out.e.top10.join(', ')}</small></p></body></html>`);
    }
    if (a === 'rpadm') {
      const q = qOf(req); if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      const op = String(q.op || b.op || '');
      if (op === 'off') await cmd('SET', 'rp:off', 1); else if (op === 'on') await cmd('DEL', 'rp:off');
      else if (op === 'clear') await pipe(RP_SC.map(k => ['DEL', 'rp:' + k]).concat([['DEL', 'rp:all'], ['DEL', 'rp:lk'], ['DEL', 'rp:st']]));
      else if (op === 'del') { const mid = String(q.mid || b.mid || '').slice(0, 20); if (mid) await cmd('SADD', 'chat:hidden', mid) }
      return res.json({ ok: 1, off: (await cmd('GET', 'rp:off')) ? 1 : 0 });
    }
    if (a === 'vipttl') {
      if (!okId(id)) return res.json({ err: 'id' });
      const v = jp(await cmd('GET', 'vip:' + id)) || {}, t = vipTier(v); if (!t) return res.status(403).json({ err: 'none' });
      const w = String(b.w || '').trim();
      if (t < 3 && w && !VIP_TT.includes(w)) return res.status(403).json({ err: 'preset' });
      v.tt = w ? (t === 3 ? clean(w, 20) : w) : ''; await cmd('SET', 'vip:' + id, JSON.stringify(v)); return res.json({ ok: 1, tt: v.tt });
    }
    if (a === 'vipstat') {
      const q = qOf(req); if (!isAdmKey(q.key || b.key)) return res.status(403).json({ err: 'admin' });
      const ids = (await cmd('SMEMBERS', 'vipall')) || [], vs = ids.length ? ((await cmd('MGET', ...ids.map(x => 'vip:' + x))) || []).map(jp) : [], now2 = Date.now(), cnt = [0, 0, 0, 0], soon = [], pay = ((await cmd('HVALS', 'suppay')) || []).map(jp).filter(z => z && z.st === 'ok'), nmOf = {};
      for (const z of pay) if (z.fid) nmOf[z.fid] = z.n || '';
      ids.forEach((x, i) => { const v = vs[i], t = vipTier(v, now2); cnt[t]++; if (t && t < 3) { const e = t === 2 ? +v.e2 : +v.e1, left = (e - now2) / 864e5; if (left <= 5) soon.push({ n: nmOf[x] || x.slice(0, 4), t, d: Math.max(0, Math.ceil(left)) }) } });
      let inc = 0, tot = 0; for (const z of pay) if (z.vp && VIP_PK[z.vp]) inc += VIP_PK[z.vp][0]; for (const z of pay) tot += +z.amt || 0;
      soon.sort((x, y) => x.d - y.d); return res.json({ ok: 1, cnt, soon: soon.slice(0, 30), inc, tot, wall: +(await cmd('HLEN', 'vipu')) || 0 });
    }
    if (a === 'vipsay') {
      if (!okId(id)) return res.json({ err: 'id' });
      const ul = jp(await cmd('HGET', 'vipu', id)); if (!ul) return res.status(403).json({ err: 'none' });
      ul.w = clean(String(b.w || ''), 40); await cmd('HSET', 'vipu', id, JSON.stringify(ul)); return res.json({ ok: 1, w: ul.w });
    }
    if (a === 'vipinc') {
      const o = b.o | 0; if (!okId(id) || o < 1) return res.json({ err: 'id' });
      const raw = (await cmd('HGETALL', 'vipu')) || []; let to = '';
      for (let i = 0; i + 1 < raw.length; i += 2) { const x = jp(raw[i + 1]); if (x && (x.o | 0) === o) { to = raw[i]; break } }
      if (!to) return res.json({ err: 'none' });
      await cmd('SADD', 'vinc:' + to, id); return res.json({ ok: 1, c: +(await cmd('SCARD', 'vinc:' + to)) || 0 });
    }
    if (a === 'akget' || a === 'akput') { // 🔒 ล็อกคำตอบ: จำนวนช่องคำนวณฝั่งเซิร์ฟเวอร์ · รายการเก็บไว้กับบัญชี
      if (!okId(id)) return res.json({ n: 0, l: [] });
      const lim = await akLim(id, isAdmKey(b.key) || !!(+(await cmd('SISMEMBER', 'admids', id))));
      if (a === 'akput') {
        if (req.method !== 'POST') return res.status(400).json({ err: 'm' });
        const c = (s, n) => String(s == null ? '' : s).replace(/[<>]/g, '').slice(0, n);
        const l = (Array.isArray(b.l) ? b.l : []).slice(0, AK_MAX).map(x => x && { k: c(x.k, 60), o: c(x.o, 60), t: c(x.t, 60), ot: c(x.ot, 60), ...(Number.isInteger(x.oi) && x.oi >= 0 && x.oi < 6 ? { oi: x.oi } : {}), oo: (Array.isArray(x.oo) ? x.oo : []).slice(0, 5).map(y => c(y, 60)) }).filter(x => x && x.k && x.o);
        await cmd('SET', 'ak:' + id, JSON.stringify(l)); return res.json(Object.assign({ ok: 1, l }, lim));
      }
      return res.json(Object.assign({ l: jp(await cmd('GET', 'ak:' + id)) || [] }, lim));
    }
    if (a === 'lkget') { if (!okId(id)) return res.json({ c: 0, pk: LK_PK }); return res.json({ c: Math.max(0, +(await cmd('GET', 'lkc:' + id)) || 0), pk: LK_PK }) }
    if (a === 'lkuse') { // 🔒 ใช้ตั๋วล็อกชะตา n ใบ (1–2)
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'id' });
      const n = Math.max(1, Math.min(2, b.n | 0 || 1)); const left = +(await cmd('DECRBY', 'lkc:' + id, n));
      if (!(left >= 0)) { await cmd('INCRBY', 'lkc:' + id, n); return res.status(402).json({ err: 'none', c: Math.max(0, +(await cmd('GET', 'lkc:' + id)) || 0) }) }
      return res.json({ ok: 1, c: left });
    }
    if (a === 'rrtake' || a === 'rrback') { // ⚡ สุ่มรัว (ผู้ก่อตั้ง): ดึงตั๋วทีละชุด (ตั๋วทองก่อน แล้วตั๋วซื้อ) · คืนตั๋วที่ดึงไปแต่ไม่ได้ใช้ (ไม่เกินที่ดึงไปใน 1 วัน)
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'id' });
      const n = Math.max(1, Math.min(50, b.n | 0 || 1)), tk = 'rrtk:' + id;
      if (a === 'rrback') { const out = Math.max(0, +(await cmd('GET', tk)) || 0), m = Math.min(n, out); if (m > 0) { await cmd('INCRBY', 'rrc:' + id, m); await cmd('DECRBY', tk, m) } return res.json({ ok: 1, back: m }) }
      let got = 0;
      for (const key of ['rrg:' + id, 'rrc:' + id]) { if (got >= n) break; const have = Math.max(0, +(await cmd('GET', key)) || 0), take = Math.min(have, n - got); if (take > 0) { const left = +(await cmd('DECRBY', key, take)); if (left < 0) { await cmd('INCRBY', key, -left); got += take + left } else got += take } }
      if (got > 0) { await cmd('INCRBY', tk, got); await cmd('EXPIRE', tk, 86400) }
      const c = Math.max(0, +(await cmd('GET', 'rrc:' + id)) || 0) + Math.max(0, +(await cmd('GET', 'rrg:' + id)) || 0);
      return res.json({ ok: 1, got, c });
    }
    if (a === 'rruse') { // k=f → ตั๋วฟรีธรรมดา (จากจบชีวิต) · ปกติ → ตั๋วทองจากของล็อกอินก่อน แล้วค่อยตั๋วที่ซื้อ
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'id' });
      const rest = async () => ({ c: Math.max(0, +(await cmd('GET', 'rrc:' + id)) || 0) + Math.max(0, +(await cmd('GET', 'rrg:' + id)) || 0), f: Math.max(0, +(await cmd('GET', 'rrf:' + id)) || 0) });
      if (b.k === 'f') { const lf = +(await cmd('DECR', 'rrf:' + id)); if (!(lf >= 0)) { await cmd('INCR', 'rrf:' + id); return res.status(402).json({ err: 'none', ...(await rest()) }) } return res.json({ ok: 1, kind: 'f', ...(await rest()) }) }
      const lg = +(await cmd('DECR', 'rrg:' + id)); if (lg >= 0) return res.json({ ok: 1, kind: 'g', ...(await rest()) });
      await cmd('INCR', 'rrg:' + id);
      const left = +(await cmd('DECR', 'rrc:' + id));
      if (!(left >= 0)) { await cmd('INCR', 'rrc:' + id); return res.status(402).json({ err: 'none', c: 0 }) }
      return res.json({ ok: 1, kind: 'p', ...(await rest()) });
    }
    if (a === 'lgget' || a === 'lgclaim') { // 🎁 รับของล็อกอิน: ผู้มาใหม่ 7 วัน (ครั้งเดียว) แล้วต่อด้วยรอบประจำ 14 วัน · ขาดวันไม่รีเซ็ต · วันละ 1 ครั้ง (เวลาไทย)
      if (!okId(id)) return res.json({ err: 'id' });
      const day = new Date(now + 7 * 3600e3).toISOString().slice(0, 10), k = 'lg:' + id;
      const st0 = jp(await cmd('GET', k)) || { n: 0, r: 0, cy: 0, d: '' };
      const NG = { 3: 1, 7: 5 }, RG = { 7: 2, 14: 4 }; // ตั๋วทองที่แจก (วันที่ → จำนวน)
      if (a === 'lgget') return res.json({ ...st0, today: st0.d === day ? 1 : 0, ng: NG, rg: RG });
      if (req.method !== 'POST') return res.status(400).json({ err: 'post' });
      if (!(await cmd('SET', 'lgl:' + id, 1, 'NX', 'EX', 5))) return res.json({ err: 'busy' });
      if (st0.d === day) return res.json({ err: 'done', ...st0, today: 1 });
      const st = { ...st0, d: day }; let tr, dn, g = 0;
      if (st.n < 7) { st.n++; tr = 'n'; dn = st.n; g = NG[dn] || 0 } else { st.r++; tr = 'r'; dn = st.r; g = RG[dn] || 0; if (st.r >= 14) { st.r = 0; st.cy = (st.cy || 0) + 1 } }
      const P = [['SET', k, JSON.stringify(st), 'EX', 86400 * 400]]; if (g) P.push(['INCRBY', 'rrg:' + id, g], ['EXPIRE', 'rrg:' + id, 86400 * 365]);
      await pipe(P);
      return res.json({ ok: 1, tr, dn, g, ...st, today: 1, ng: NG, rg: RG });
    }
    if (a === 'rrearn') { // ตั๋วสุ่มเกิดฟรี 1 ใบเมื่อเล่นจบชีวิต: อายุ 18+, ห่างกัน 5 นาที, ไม่เกิน 3 ใบ/วัน, ถือไว้ไม่เกิน 10 ใบ
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'id' });
      if ((+b.a || 0) < 18) return res.json({ ok: 0, why: 'age' });
      const cur = Math.max(0, +(await cmd('GET', 'rrf:' + id)) || 0);
      if (cur >= 10) return res.json({ ok: 0, why: 'full', f: cur });
      if (!(await cmd('SET', 'rrfc:' + id, 1, 'NX', 'EX', 300))) return res.json({ ok: 0, why: 'wait', f: cur });
      const day = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10), dk = 'rrfd:' + id + ':' + day, n = +(await cmd('INCR', dk)) || 1;
      if (n === 1) await cmd('EXPIRE', dk, 172800);
      if (n > 3) return res.json({ ok: 0, why: 'day', f: cur });
      const f = +(await cmd('INCR', 'rrf:' + id)) || 1; await cmd('EXPIRE', 'rrf:' + id, 86400 * 180);
      return res.json({ ok: 1, f });
    }
    if (a === 'supmark') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const sid = String(qOf(req).i || '').replace(/[^a-z0-9]/g, '').slice(0, 20), v = String(qOf(req).v || '');
      if (!sid) return res.json({ ok: 0 });
      if (v === 'del') await pipe([['HDEL', 'suppay', sid], ['ZREM', 'suppayz', sid], ['DEL', 'supimg:' + sid]]);
      else { const cur = jp(await cmd('HGET', 'suppay', sid)); if (cur) { const was = cur.st; cur.st = v === 'ok' ? 'ok' : v === 'no' ? 'no' : ''; cur.mt = now;
        let pr = null; if (cur.st === 'ok' && was !== 'ok' && okId(cur.fid)) { await cmd('SADD', 'supok', cur.fid); if (String(qOf(req).ty || '1') === '1' && !cur.rp) { const x = '🙏 ได้รับแล้ว ขอบคุณมากครับ! เงินสนับสนุนจะเอาไปพัฒนาเกมต่อ 💛'; cur.rp = { x, t: now, auto: 1 }; pr = await withCap(noteTo(cur.fid, { t: '💬 ผู้พัฒนาตอบคุณ', b: x, u: '/?go=support' }), 4000) } }
        try { if (cur.lk && LK_PK[cur.lk] && okId(cur.fid)) { if (cur.st === 'ok' && !cur.lg) { cur.lg = LK_PK[cur.lk][1]; await cmd('INCRBY', 'lkc:' + cur.fid, cur.lg) } else if (cur.st !== 'ok' && cur.lg) { const left = +(await cmd('DECRBY', 'lkc:' + cur.fid, cur.lg)) || 0; if (left < 0) await cmd('SET', 'lkc:' + cur.fid, 0); cur.lg = 0 } } } catch (e) {}
        try { if (cur.pk && RR_PK[cur.pk] && okId(cur.fid)) { if (cur.st === 'ok' && !cur.rg) { cur.rg = RR_PK[cur.pk][1]; await cmd('INCRBY', 'rrc:' + cur.fid, cur.rg) } else if (cur.st !== 'ok' && cur.rg) { const left = +(await cmd('DECRBY', 'rrc:' + cur.fid, cur.rg)) || 0; if (left < 0) await cmd('SET', 'rrc:' + cur.fid, 0); cur.rg = 0 } } } catch (e) {}
        try { if (cur.vp && VIP_PK[cur.vp] && okId(cur.fid)) { const vx = VIP_PK[cur.vp]; if (cur.st === 'ok' && !cur.vg) { await vipAdd(cur.fid, vx[1], vx[2], 1); cur.vg = 1; if (vx[1] === 3 && !(await cmd('HEXISTS', 'vipu', cur.fid))) { const o = +(await cmd('INCR', 'vipuN')) || 1; await cmd('HSET', 'vipu', cur.fid, JSON.stringify({ n: clean(String(cur.n || ''), 24), o, t: Date.now() })) } } else if (cur.st === 'ok' && cur.vg && vx[1] === 3) { await vipHeal(cur.fid) } else if (cur.st !== 'ok' && cur.vg) { await vipAdd(cur.fid, vx[1], vx[2], -1); cur.vg = 0; if (vx[1] === 3) await cmd('HDEL', 'vipu', cur.fid) } } } catch (e) {}
        if (cur.st !== 'ok' && was === 'ok' && okId(cur.fid)) { const others = ((await cmd('HVALS', 'suppay')) || []).map(jp).filter(z => z && z.fid === cur.fid && z.i !== cur.i && z.st === 'ok'); if (!others.length) await cmd('SREM', 'supok', cur.fid) }
        await cmd('HSET', 'suppay', sid, JSON.stringify(cur)); return res.json({ ok: 1, push: pr }) } }
      return res.json({ ok: 1 });
    }
    if (a === 'supreply') {
      if (!isAdmKey(qOf(req).key) && !isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
      const sid = String(qOf(req).i || b.i || '').replace(/[^a-z0-9]/g, '').slice(0, 20), x = clean(String(b.x != null ? b.x : qOf(req).x || ''), 300);
      const cur = jp(await cmd('HGET', 'suppay', sid)); if (!cur) return res.json({ ok: 0 });
      if (!x) { delete cur.rp; await cmd('HSET', 'suppay', sid, JSON.stringify(cur)); return res.json({ ok: 1, del: 1 }) }
      cur.rp = { x, t: now }; await cmd('HSET', 'suppay', sid, JSON.stringify(cur));
      let pr = { owner: 0 }; if (okId(cur.fid)) pr = await withCap(noteTo(cur.fid, { t: '💬 ผู้พัฒนาตอบคุณ', b: x.slice(0, 160), u: '/?go=support' }), 4000);
      return res.json({ ok: 1, push: pr });
    }
    if (a === 'supmine') {
      if (!okId(id)) return res.json({ l: [] });
      const ids = (await cmd('ZREVRANGE', 'suppayz', 0, 299)) || []; const vals = ids.length ? await cmd('HMGET', 'suppay', ...ids) : [];
      const l = (vals || []).map(jp).filter(z => z && z.fid === id).slice(0, 10).map(z => ({ i: z.i, amt: z.amt, st: z.st || '', t: z.t, rp: z.rp ? { x: z.rp.x, t: z.rp.t } : null }));
      return res.json({ l, sp: +(await cmd('SISMEMBER', 'supok', id)) ? 1 : 0 });
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
      const [bn, rc, wc] = (await pipeSoft([['GET', 'ban:' + ip], ['INCR', 'ipr:' + ip + ':' + mk], WR ? ['INCR', 'ipw:' + ip + ':' + mk] : ['GET', 'ipw:' + ip + ':' + mk], ['EXPIRE', 'ipr:' + ip + ':' + mk, 90], ...(WR ? [['EXPIRE', 'ipw:' + ip + ':' + mk, 90]] : [])])) || [0, 0, 0];
      // แบนตาม IP (เน็ตมือถือใช้ IP ร่วมกัน): ผู้เล่นที่เคยเล่นมาก่อนผ่านได้ ยกเว้นแบนโดยแอดมิน
      if (bn && !(String(bn) !== 'admin' && okId(id) && +(await cmd('EXISTS', 'seen:' + id)))) return res.status(403).json({ err: 'banned', why: String(bn) === 'admin' ? 'admin' : 'ip' });
      if (+rc > IP_HARD) { await pipe([['SET', 'ban:' + ip, 'flood', 'EX', 1800], ['ZADD', 'trap:ips', now, ip], ['HSET', 'trap:info', ip, JSON.stringify({ n: +rc, p: ['(ยิง API ถี่เกิน ' + rc + ' ครั้ง/นาที)'], f: now, l: now, ua: String(req.headers['user-agent'] || '').slice(0, 140), fl: 1 })]]); return res.status(429).json({ err: 'rate' }) }
      if (+rc > IP_SOFT) return res.status(429).json({ err: 'rate' });
      if (WR && +wc > IP_WMAX) return res.status(429).json({ err: 'rate' });
      // จำกัดต่อผู้เล่น (ไอดี) — คนดีที่ใช้ IP เดียวกันไม่โดนลูกหลง
      const uk = okId(id) ? 'idr:' + id : 'ipn:' + ip, [uc, uw] = (await pipeSoft([['INCR', uk + ':' + mk], WR ? ['INCR', uk + ':w:' + mk] : ['GET', uk + ':w:' + mk], ['EXPIRE', uk + ':' + mk, 90], ...(WR ? [['EXPIRE', uk + ':w:' + mk, 90]] : [])])) || [0, 0];
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
    if (a === 'fn') { // 📊 ตัวนับจุดที่ผู้เล่นไปถึง (ไม่เก็บตัวตน · นับรวมต่อวัน · key เดียวต่อวัน)
      const k = String(b.k || ''); if (!/^(open|born|a16|a40|end1|d2|d7|hint|simple|wkc|wkcok|lives2|lgc)$/.test(k)) return res.json({ ok: 0 });
      const dk = 'fn:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
      try { await pipe([['HINCRBY', dk, k, 1], ['EXPIRE', dk, 86400 * 60]]) } catch (e) {}
      return res.json({ ok: 1 });
    }
    if (a === 'fnstat') {
      if (!isAdmKey(qOf(req).key || b.key)) return res.status(403).json({ err: 'admin' });
      const days = []; for (let i = 0; i < 14; i++) days.push(new Date(now + 7 * 3600e3 - i * 86400e3).toISOString().slice(0, 10));
      const rs = await pipe(days.map(d => ['HGETALL', 'fn:' + d]));
      const out = days.map((d, i) => { const r = rs[i], o = {}; if (Array.isArray(r)) for (let j = 0; j + 1 < r.length; j += 2) o[r[j]] = +r[j + 1]; else Object.assign(o, r || {}); return { d, ...o } });
      return res.json({ days: out });
    }
    if (a === 'wkcsub' || a === 'wkc') { // 🗓️ ทำเนียบความท้าทายประจำสัปดาห์ (เก็บ 30 วัน · ท็อป 20)
      const w = String((a === 'wkc' ? qOf(req).w : b.w) || '').replace(/[^0-9]/g, '').slice(0, 6); if (!w) return res.json({ top: [] });
      const zk = 'wkc:' + w, nk = 'wkcn:' + w;
      if (a === 'wkcsub') {
        if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'id' });
        const sc = Math.max(0, Math.min(1e7, Math.round(+b.s || 0))); if (!sc) return res.json({ ok: 0 });
        await pipe([['ZADD', zk, 'GT', sc, id], ['HSET', nk, id, clean(String(b.n || ''), 24) || 'นิรนาม'], ['EXPIRE', zk, 86400 * 30], ['EXPIRE', nk, 86400 * 30], ['ZREMRANGEBYRANK', zk, 0, -201]]);
      }
      const top = await cmd('ZREVRANGE', zk, 0, 19, 'WITHSCORES'), ids = []; for (let i = 0; i < (top || []).length; i += 2) ids.push(top[i]);
      const nm = ids.length ? await cmd('HMGET', nk, ...ids) : [];
      return res.json({ ok: 1, top: ids.map((x, i) => ({ n: nm[i] || 'นิรนาม', s: +top[i * 2 + 1], me: x === id ? 1 : 0 })) });
    }
    if (a === 'pushre') { // 🔔 ดึงผู้เล่นที่หายไปกลับมา: ส่ง push ให้เฉพาะคนที่เปิดแจ้งเตือนไว้ และห่างหาย 3–45 วัน · คนละไม่เกิน 1 ครั้ง/7 วัน · เรียกจาก cron รายวัน (CRON_SECRET) หรือแอดมิน
      const au = String(req.headers['authorization'] || ''), cs = process.env.CRON_SECRET || '';
      if (!(cs && au === 'Bearer ' + cs) && !isAdmKey(qOf(req).key || b.key)) return res.status(403).json({ err: 'forbidden' });
      if (!VAPID_PRIV || !VAPID_PUB) return res.json({ ok: 0, why: 'novapid' });
      if (global._preB && Date.now() - global._preB < 600000) return res.json({ ok: 0, why: 'busy' }); global._preB = Date.now();
      try {
        const dry = qOf(req).dry === '1', ALL = await cmd('HGETALL', 'push'), recs = [];
        const kv = Array.isArray(ALL) ? ALL : Object.entries(ALL || {}).flat();
        for (let i = 0; i + 1 < kv.length; i += 2) { const v = jp(kv[i + 1]); if (v && v.id && v.t) recs.push({ h: kv[i], id: v.id, t: +v.t }) }
        const old = recs.filter(r => now - r.t >= 3 * 86400e3 && now - r.t <= 45 * 86400e3).slice(0, 600), byId = new Map();
        for (const r of old) if (!byId.has(r.id)) byId.set(r.id, []); for (const r of old) byId.get(r.id).push(r.h);
        const ids = [...byId.keys()], okIds = [];
        if (!dry && ids.length) { const rs = await pipe(ids.map(id => ['SET', 'pre:' + id, 1, 'NX', 'EX', 7 * 86400])); ids.forEach((id, i) => { if (rs[i]) okIds.push(id) }) } else okIds.push(...ids);
        const COPY = [['🏯 ยุทธภพยังรอคุณอยู่', 'ชีวิตของคุณค้างอยู่ แตะเพื่อเล่นต่อ'], ['🔮 มรดกวิญญาณรอแลกอยู่', 'เป้าหมายข้ามชีวิตและของขวัญต้อนรับยังรออยู่ กลับมาเล่นต่อ'], ['🏟️ เงาของคุณยังอยู่ที่ลาน', 'มาดูว่ามีใครท้าเงาของคุณหรือยัง'], ['🎟️ ตั๋วสุ่มเกิดฟรีรอคุณอยู่', 'จบชีวิตแล้วรับตั๋วสุ่มเกิดฟรีได้ทุกวัน']];
        let sent = 0, fail = 0, rm = 0;
        if (!dry) for (let i = 0; i < okIds.length; i++) { const c = COPY[(Math.floor(now / 86400e3) + i) % COPY.length], r0 = await withCap(pushHashes(byId.get(okIds[i]), { t: c[0], b: c[1], u: '/', g: 'recall' }), 8000); sent += r0.sent | 0; fail += r0.fail | 0; rm += r0.rm | 0 }
        return res.json({ ok: 1, subs: recs.length, cand: ids.length, targets: okIds.length, sent, fail, rm, dry: dry ? 1 : 0 });
      } finally { global._preB = 0 }
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
        try { await cmd('SET', 'seen:' + id, 1, 'EX', 86400 * 30) } catch {}
        const ua = String(req.headers['user-agent'] || '');
        const org = String(req.headers['origin'] || req.headers['referer'] || '').replace(/^https?:\/\//, '').split('/')[0].slice(0, 60);
        const meta = { d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', b: /bot|crawl|spider|headless|preview|facebookexternalhit/i.test(ua) ? 'บอท' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'อื่นๆ', o: org || 'ไม่ระบุ', v: String(qOf(req).v || '').slice(0, 8), c: String(req.headers['cf-ipcountry'] || req.headers['x-vercel-ip-country'] || '?').slice(0, 3), t: now };
        let act = null;
        try { const r = JSON.parse(String(qOf(req).st || '').slice(0, 600) || 'null'); if (r && typeof r === 'object') { const S0 = v => String(v == null ? '' : v).replace(/[<>]/g, '').slice(0, 40), N0 = v => Math.max(-1, Math.min(1e7, Math.round(+v || 0))); act = { w: ['m', 'x', 'g'].includes(r.w) ? r.w : '', sc: S0(r.sc), md: S0(r.md), ch: r.ch ? 1 : 0, hd: r.hd ? 1 : 0, ia: N0(r.ia), er: N0(r.er), em: String(r.em || '').replace(/[<>]/g, '').slice(0, 120), nm: S0(r.nm), ag: N0(r.ag), al: r.al ? 1 : 0, au: r.au ? 1 : 0, pa: r.pa ? 1 : 0, sp: N0(r.sp), w: S0(r.w).slice(0, 1), yr: N0(r.yr), ri: S0(r.ri), v: S0(qOf(req).v).slice(0, 8), t: now } } } catch {}
        try {
        const hk = 'ipid:' + ip + ':' + Math.floor(now / 3600e3), [, nid] = await pipe([['SADD', hk, id], ['SCARD', hk], ['EXPIRE', hk, 4000]]);
        if (meta.b !== 'บอท' && +nid <= 600) await pipe([['ZADD', 'online', now, id], ['HSET', 'om', id, JSON.stringify(meta)], ...(act ? [['HSET', 'oa', id, JSON.stringify(act)]] : [])]);
        } catch (e) { if (/OOM/i.test(String(e && e.message))) { OOM_AT = Date.now() } else throw e }
      }
      const [, n, lives, annV, cl0, gq0] = await pipe([['ZREMRANGEBYSCORE', 'online', 0, now - 1500e3], ['ZCARD', 'online'], ['GET', 'lives'], ['GET', 'ann'], ['LINDEX', 'chat', 0], ['GET', 'gq:pub']]);
      let cl = null; try { const m = jp(cl0); if (m && m.i) cl = { i: m.i, t: m.t, n: String(m.n || '').slice(0, 20), x: String(m.x || '').slice(0, 90) } } catch {}
      let tg = null; if (okId(id)) { try { const tq = await cmd('LRANGE', 'tagq:' + id, 0, 9); if (tq && tq.length) { await cmd('DEL', 'tagq:' + id); tg = tq.map(jp).filter(Boolean) } } catch (e) {} }
      let ann = null; try { ann = annV ? JSON.parse(annV) : null } catch {}
      ann = await annPoll(ann, id);
      await Promise.race([Promise.all([autoMig(), autoCs()]), new Promise(r => setTimeout(r, 2500))]);
      return res.json({ n: n || 0, lives: +(lives || 0), bd: String(process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7), ann, ...(tg ? { tg } : {}), ...(cl ? { cl } : {}), ...(gq0 ? { gq: jp(gq0) } : {}) });
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
      let srcHtml = '';
      try {
        const sd = [0, 1, 2, 3, 4, 5, 6].map(k => thDay(now, k)), sr = await pipe(sd.map(d => ['HGETALL', 'src:' + d])), agg = { c: {}, r: {}, t: {} }, tod = { c: {}, r: {}, t: {} }; let n7 = 0, n1 = 0;
        sr.forEach((arr, di) => { arr = arr || []; for (let i = 0; i < arr.length; i += 2) { const k = String(arr[i]), val = +arr[i + 1] || 0, ty = k[0]; if (k === 'n:all') { n7 += val; if (!di) n1 += val; continue } if (agg[ty]) { agg[ty][k.slice(2)] = (agg[ty][k.slice(2)] || 0) + val; if (!di) tod[ty][k.slice(2)] = val } } });
        const top = (o, t) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${e(k)} <b>${v}</b>${t && t[k] ? ` <small style="color:#aaa">(วันนี้ ${t[k]})</small>` : ''}`).join(' · ') || '-';
        srcHtml = `<h2>🧭 คนเข้ามาจากไหน <small style="font-weight:normal;color:#aaa">· ผู้เล่นใหม่ที่ 1inanovel.com นับเครื่องละ 1 ครั้งต่อวัน · เริ่มเก็บตั้งแต่อัปเดตนี้</small></h2><p>👥 วันนี้ <b>${n1}</b> · 7 วัน <b>${n7}</b></p><p>🌏 ประเทศ: ${top(agg.c, tod.c)}</p><p>🔗 เว็บต้นทาง: ${top(agg.r, tod.r)}</p><p>🏷️ ลิงก์ติดแท็ก (?ref=): ${top(agg.t, tod.t)}</p><p><small style="color:#aaa">"ตรง" = พิมพ์ลิงก์/บุ๊กมาร์ก/แอปไม่ส่งต้นทาง (LINE, Messenger มักแสดงเป็นตรง) · แปะลิงก์แบบ https://www.1inanovel.com/?ref=tiktok เพื่อแยกช่องทาง</small></p>`
      } catch { }
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
      const acL = (acL0 || []).map(jp).filter(x => x && !/^(jump|cap|pow-age|srv-jump|score|stat)/.test(String(x.why || '').replace(/^tamper:/, ''))), clL = (clL0 || []).map(jp).filter(Boolean);
      const spD = [0, 1, 2, 3, 4, 5, 6].map(k => thDay(now, k));
      const spR = await pipe([...spD.map(d => ['HGETALL', 'supd:' + d]), ['PFCOUNT', 'supu:' + spD[0] + ':view'], ['PFCOUNT', ...spD.map(d => 'supu:' + d + ':view')], ['ZREVRANGE', 'suppayz', 0, 59], ['LRANGE', 'supev', 0, 59], ['SCARD', 'mwwait']]);
      const spH = i => { const r = spR[i] || [], o = {}; for (let k = 0; k < r.length; k += 2)o[r[k]] = +r[k + 1] || 0; return o }, spT = spH(0), sp7 = { view: 0, save: 0, paid: 0 }; for (let i = 0; i < 7; i++) { const o = spH(i); for (const k in sp7) sp7[k] += o[k] || 0 }
      const spIds = spR[9] || [], spPay = spIds.length ? ((await cmd('HMGET', 'suppay', ...spIds)) || []).map(jp).filter(Boolean) : [], spEv = (spR[10] || []).map(jp).filter(Boolean);
      const spSum = spPay.filter(x => x.st === 'ok').reduce((a, x) => a + (+x.amt || 0), 0);
      const spRow = x => `<div class="pl" data-st="${x.st === 'ok' ? 'ok' : x.st === 'no' ? 'no' : ''}" style="${x.st === 'ok' ? 'border-left:4px solid #6ad06a' : x.st === 'no' ? 'border-left:4px solid #d05a5a;opacity:.6' : 'border-left:4px solid #f0c860'}"><div class="plh"><b>💰 ${x.amt ? (+x.amt).toLocaleString('th-TH') + ' บาท' : 'ไม่ระบุยอด'}</b><small>${tAgo(x.t)} ที่แล้ว · ${x.st === 'ok' ? '✅ ยืนยันแล้ว' : x.st === 'no' ? '❌ ไม่พบยอด' : '⏳ รอตรวจ'}</small></div>ชื่อบัญชีที่โอน: <b>${e(x.pn || '-')}</b> · เวลาโอน ${e(x.tm || '-')}<br>ผู้เล่น: ${e(x.n)} <small>(${e(String(x.fid || '').slice(0, 10))} · ${e(x.dev || '')}${x.src ? ' · เปิดจาก' + e(x.src) : ''})</small>${x.msg ? `<br>💬 “${e(x.msg)}”` : ''}${x.img ? `<br><a href="?a=supimg&key=${K}&i=${x.i}" target="_blank"><img src="?a=supimg&key=${K}&i=${x.i}" style="max-width:140px;max-height:200px;border-radius:6px;margin-top:4px;border:1px solid #444" loading="lazy"></a>` : ''}<div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap"><button class="cpb" onclick="spM('${x.i}','ok',this)">✅ ยืนยันว่าได้รับ</button><button class="cpb" onclick="spM('${x.i}','no',this)">❌ ไม่พบยอด</button><button class="cpb" onclick="spM('${x.i}','',this)">↩️ รอตรวจ</button><button class="cpb" onclick="spM('${x.i}','del',this)">🗑️ ลบ</button></div>${x.rp ? `<div style="margin-top:6px;padding:6px 8px;border-radius:8px;background:#2a3a2a;font-size:13px">💬 ตอบแล้ว${x.rp.auto ? ' (อัตโนมัติ)' : ''} · ${tAgo(x.rp.t)} ที่แล้ว<br>“${e(x.rp.x)}”</div>` : ''}<div style="margin-top:6px"><div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:4px"><button class="cpb" onclick="spQ('${x.i}',0)">🙏 ได้รับแล้ว ขอบคุณ</button><button class="cpb" onclick="spQ('${x.i}',1)">❓ ยังไม่พบยอด</button><button class="cpb" onclick="spQ('${x.i}',2)">📸 ขอสลิปอีกครั้ง</button></div><textarea id="spx_${x.i}" rows="2" style="width:100%;box-sizing:border-box;border-radius:8px;padding:6px;font:inherit" placeholder="ตอบกลับ (เว้นว่าง = ลบคำตอบ)">${x.rp ? e(x.rp.x) : ''}</textarea><button class="cpb" style="margin-top:4px" onclick="spR('${x.i}',this)">📨 ส่งคำตอบ</button></div></div>`;
      const EVN = { view: '👀 เปิดดู QR', save: '⬇️ บันทึกรูป QR', stay: '⏱️ เปิด QR ค้างไว้นาน (น่าจะกำลังสแกน)' };
      const supHtml = `<h2>🙏 ค่าสนับสนุน <small style="font-weight:normal;color:#aaa">· สแกน QR เกิดในแอปธนาคาร เว็บจึงรู้ได้แค่ว่าใคร <b>เปิดดู/บันทึก QR</b> และใคร <b>กดแจ้งว่าโอนแล้ว</b> — เอาชื่อบัญชี เวลา และยอดไปเทียบกับรายการในแอปธนาคาร</small></h2>
<div><span class="c"><b>${spT.view || 0}</b>เปิดดู QR วันนี้ (${+spR[7] || 0} คน)</span><span class="c"><b>${spT.stay || 0}</b>เปิดค้าง (น่าจะสแกน) วันนี้</span><span class="c"><b>${spT.save || 0}</b>บันทึก QR วันนี้</span><span class="c"><b>${spT.paid || 0}</b>แจ้งโอนวันนี้</span><span class="c"><b>${sp7.view}</b>เปิดดู 7 วัน (${+spR[8] || 0} คน)</span><span class="c"><b>${sp7.paid}</b>แจ้งโอน 7 วัน</span><span class="c"><b>${spSum.toLocaleString('th-TH')}</b>บาทที่ยืนยันแล้ว</span><span class="c"><b>${+spR[11] || 0}</b>คนกดรอโลกปัจจุบัน 🏙️</span></div>
<details id="evBox" style="margin:8px 0"><summary onclick="evLoad()" style="cursor:pointer">🏮 อีเวนต์ลอยกระทง — รายการซื้อ/แลกกรรมล่าสุด (กดยึดคืนได้)</summary><div id="evList" style="font-size:13px;line-height:1.6"><small>กำลังโหลด…</small></div></details>
<script>var evDone=0;async function evLoad(f){if(evDone&&!f)return;evDone=1;var L=document.getElementById('evList');try{var r=await fetch('/api/online?a=evlog',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:decodeURIComponent('${K}')})});var j=await r.json();var M={pay:'🪙 ซื้อ',karma:'☯️ แลกกรรม',imp:'📥 นำเข้าคลังกรรม',revoke:'⛔ ยึดคืน'};L.innerHTML=(j.rows||[]).map(function(o){var d=new Date(o.t+7*3600e3).toISOString().slice(5,16).replace('T',' ');return '<div class="pl"><div class="plh"><b>'+(M[o.m]||o.m)+'</b> '+(o.i||'')+(o.n?' № '+o.n:'')+(o.c?' · '+o.c+(o.s==='e'?' ☠️':' ☯️'):'')+(o.m==='imp'?' · ได้ '+o.g+'/'+o.e+' (เครื่องอ้าง '+o.rg+'/'+o.re+')':'')+'<small> '+d+'</small></div><small>ผู้เล่น '+o.u+'</small>'+(o.i&&o.m!=='revoke'?' <button onclick="evRev(\\''+o.u+'\\',\\''+o.i+'\\',this)">⛔ ยึดคืน</button>':'')+'</div>'}).join('')||'<small>ยังไม่มีรายการ</small>'}catch(e){L.innerHTML='<small>โหลดไม่สำเร็จ</small>'}}
async function evRev(u,i,b){if(!confirm('ยึดคืน '+i+' ของผู้เล่น '+u+' ?'))return;b.disabled=true;try{var r=await fetch('/api/online?a=evrevoke',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:decodeURIComponent('${K}'),u:u,i:i})});var j=await r.json();alert(j.ok?'ยึดคืนแล้ว':'ไม่สำเร็จ');evLoad(1)}catch(e){alert('ไม่สำเร็จ');b.disabled=false}}</script>
<details id="apBox" style="margin:8px 0"><summary onclick="apLoad()" style="cursor:pointer">💳 สลิปอัตโนมัติ (SlipOK · D1) — กดดูรายการล่าสุด</summary><div id="apList" style="font-size:13px;line-height:1.6"><small>กำลังโหลด…</small></div></details>
<script>var apDone=0;async function apLoad(f){if(apDone&&!f)return;apDone=1;var L=document.getElementById('apList');try{var r=await fetch('/api/pay?a=list&key=${K}');var j=await r.json();if(!j.rows){L.innerHTML='<small>ยังใช้ไม่ได้ (ยังไม่ได้ผูก D1 หรือคีย์ EasySlip)</small>';return}var N={done:'✅ สำเร็จ',donation:'💛 สนับสนุน (ตรวจสลิปแล้ว)',paid_nogrant:'⚠️ จ่ายแล้วแต่สิทธิ์ไม่เข้า',pending:'⏳ รอตรวจ/ไม่ผ่าน',dup:'🔁 สลิปซ้ำ',amount:'💸 ยอดไม่ตรง',acct:'🏦 ไม่ใช่บัญชีเรา',old:'🕒 สลิปเก่า',noslip:'❓ อ่านสลิปไม่ได้',unavailable:'🔌 ระบบตรวจใช้ไม่ได้'};var T=j.today||{};L.innerHTML='<p><b>วันนี้</b> สำเร็จ '+(T.n||0)+' รายการ · '+((T.baht||0)).toLocaleString('th-TH')+' บาท</p>'+(j.rows.length?j.rows.map(function(o){var d=new Date(o.created_at+7*3600e3).toISOString().slice(5,16).replace('T',' ');return '<div class="pl"><div class="plh"><b>'+(N[o.status]||o.status)+'</b> · '+(o.amount_satang/100)+' บาท · '+o.pack+'<small> '+d+'</small></div><small>ผู้เล่น '+o.uid+(o.sender_name?' · ผู้โอน '+o.sender_name:'')+(o.trans_ref?' · ref '+o.trans_ref:'')+(o.note?' · '+o.note:'')+'</small>'+(o.status==='paid_nogrant'?' <button onclick="apRe(\\''+o.id+'\\',this)">🔁 ให้สิทธิ์ซ้ำ</button>':'')+(/^(amount|unavailable|noslip|pending|old|acct|dup)$/.test(o.status)?' <button onclick="apRe(\\''+o.id+'\\',this,1)">✅ อนุมัติเอง</button>':'')+'</div>'}).join(''):'<small>ยังไม่มีรายการ</small>')}catch(e){L.innerHTML='<small>โหลดไม่สำเร็จ</small>'}}
async function apRe(id,b,m){if(m&&!confirm('อนุมัติโดยไม่ผ่านการตรวจสลิป — เช็คยอดเงินเข้าบัญชีจริงแล้วใช่ไหม? (ให้ของทันที)')){return}b.disabled=true;try{var r=await fetch('/api/pay?a=regrant&key=${K}&o='+id+(m?'&m=1':''),{method:'POST'});var j=await r.json();alert(j.ok?'ให้สิทธิ์แล้ว':'ไม่สำเร็จ: '+(j.err||''));apLoad(1)}catch(e){alert('ไม่สำเร็จ');b.disabled=false}}</script>
<h3>📨 แจ้งว่าโอนแล้ว (${spPay.length})</h3>${spPay.length ? spPay.map(spRow).join('') : '<p><small>ยังไม่มีคนแจ้ง</small></p>'}
<details><summary>👀 คนที่เปิดดู/บันทึก QR ล่าสุด (${spEv.length})</summary>${spEv.map(x => `<div class="pl"><div class="plh"><b>${e(x.n)}</b><small>${tAgo(x.t)} ที่แล้ว</small></div>${EVN[x.e] || e(x.e)} · <small>${e(String(x.fid || '').slice(0, 10))} · ${e(x.dev || '')}${x.src ? ' · เปิดจาก' + e(x.src) : ''}</small></div>`).join('') || '<p><small>ยังไม่มี</small></p>'}</details>
<label style="display:block;margin:6px 0"><input type="checkbox" id="spTy" checked onchange="localStorage.setItem('spTy',this.checked?1:0)"> กด ✅ ยืนยันว่าได้รับ แล้วส่งคำขอบคุณอัตโนมัติ</label><button onclick="rpA('off',this)" style="margin:4px 6px 4px 0">🎭 ปิดห้องเล่นบท</button><button onclick="rpA('on',this)" style="margin:4px 6px 4px 0">🎭 เปิดห้องเล่นบท</button><button onclick="if(confirm('ล้างข้อความห้องเล่นบททั้งหมด?'))rpA('clear',this)" style="margin:4px 6px 4px 0">🧹 ล้างห้องเล่นบท</button><button onclick="vStat(this)" style="margin:4px 6px 4px 0">📊 สรุป VIP</button><div id="vStatBox" style="font-size:13px;line-height:1.7"></div><button onclick="vFix(this)" style="margin:4px 0">🏮 ซ่อมหอบรรพชน (ใส่ย้อนหลังคนที่จ่ายถาวรแล้วไม่ขึ้น)</button><script>async function rpA(op,b){b.disabled=true;try{const r=await fetch('?a=rpadm&op='+op+'&key=${K}');const j=await r.json();b.textContent=j.ok?(j.off?'✓ ห้องเล่นบทปิดอยู่':'✓ ห้องเล่นบทเปิดอยู่'):'ไม่สำเร็จ'}catch(e){b.textContent='ไม่สำเร็จ'}b.disabled=false}async function vStat(b){b.disabled=true;try{const r=await fetch('?a=vipstat&key=${K}');const j=await r.json();const nm=['หมดอายุ','สำนัก','อาวุโส','บรรพชน'];document.getElementById('vStatBox').innerHTML=j.ok?'ผู้ถือตอนนี้: สำนัก <b>'+j.cnt[1]+'</b> · อาวุโส <b>'+j.cnt[2]+'</b> · บรรพชน <b>'+j.cnt[3]+'</b> · หมดอายุแล้ว '+j.cnt[0]+' · ในหอ '+j.wall+' ป้าย<br>ยอดแพ็ก VIP ที่อนุมัติ <b>'+j.inc.toLocaleString()+'</b> บาท · ยอดสนับสนุนที่อนุมัติทั้งหมด <b>'+j.tot.toLocaleString()+'</b> บาท'+(j.soon.length?'<br>ใกล้หมดอายุ (≤5 วัน): '+j.soon.map(function(x){return x.n+' ('+nm[x.t]+' อีก '+x.d+' วัน)'}).join(' · '):'<br>ยังไม่มีใครใกล้หมดอายุ'):'ไม่สำเร็จ'}catch(e){document.getElementById('vStatBox').textContent='ไม่สำเร็จ'}b.disabled=false}</script><script>async function vFix(b){b.disabled=true;try{const r=await fetch('?a=vipfix&key=${K}');const j=await r.json();b.textContent=j.ok?'✓ ใส่เพิ่ม '+j.fixed.length+' คน'+(j.maybe&&j.maybe.length?' · พบจ่าย ≥599 ที่ไม่ได้เลือกแพ็ก '+j.maybe.length+' รายการ (ดูในรายการจ่าย)':''):'ไม่สำเร็จ'}catch(e){b.textContent='ไม่สำเร็จ';b.disabled=false}}</script><script>try{if(localStorage.getItem('spTy')==='0')document.getElementById('spTy').checked=false}catch(x){}const SPQ=['🙏 ได้รับแล้ว ขอบคุณมากครับ! เงินสนับสนุนจะเอาไปพัฒนาเกมต่อ 💛','❓ ยังไม่พบยอดโอนครับ รบกวนเช็กชื่อบัญชีและเวลาโอนอีกครั้งนะครับ','📸 รบกวนส่งสลิปอีกครั้งผ่านปุ่มแจ้งโอนในเกมนะครับ รูปเดิมไม่ชัด'];function spQ(i,k){const t=document.getElementById('spx_'+i);if(t)t.value=SPQ[k]}
async function spR(i,b){const t=document.getElementById('spx_'+i);b.disabled=true;try{const r=await fetch('?a=supreply&key=${K}&i='+i,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({x:t?t.value:''})});const j=await r.json();b.textContent=j.ok?(j.del?'✓ ลบคำตอบแล้ว':'✓ ส่งแล้ว'+(j.push&&j.push.sent?' · เด้งถึงมือถือ '+j.push.sent+' เครื่อง':' · เก็บไว้ในกล่องข้อความในเกม')):'ไม่สำเร็จ';if(j.ok)setTimeout(()=>location.reload(),1200)}catch(x){b.textContent='ไม่สำเร็จ';b.disabled=false}}
async function spM(i,v,b){if(v==='del'&&!confirm('ลบรายการนี้?'))return;b.disabled=true;try{const ty=document.getElementById('spTy');const r=await fetch('?a=supmark&key=${K}&i='+i+'&v='+v+'&ty='+(ty&&ty.checked?1:0));const j=await r.json();b.textContent=j.ok?'✓ บันทึกแล้ว'+(j.push?(j.push.sent?' · ส่งคำขอบคุณถึงมือถือแล้ว':' · ส่งคำขอบคุณในเกมแล้ว'):''):'ไม่สำเร็จ';if(j.ok)setTimeout(()=>location.reload(),900)}catch(x){b.textContent='ไม่สำเร็จ'}}</script>`;
      const acHtml = `<h2>🕵️ ผู้ต้องสงสัยโกง <small style="font-weight:normal;color:#aaa">· 🔴 = จับได้ชัด (แก้ค่าผ่านคอนโซล/แก้เซฟ) ถูกตัดจากระบบออนไลน์อัตโนมัติ · 🟡🟠 = สัญญาณให้ตรวจเอง</small></h2>${acL.length ? acL.slice(0, 40).map(x => acRow(x, 'ระบบจับ')).join('') : '<p><small>ยังไม่มี</small></p>'}<details><summary>📋 ถูกตัดจากทำเนียบล่าสุด (${clL.length})</summary>${clL.map(x => acRow(x, 'ทำเนียบ')).join('')}</details>
<script>async function gvGo(b){const m=document.getElementById('gvMsg'),t=document.getElementById('gvId').value.trim(),n=parseInt(document.getElementById('gvN').value)||0;if(t.length<6||n<1){m.textContent='ใส่รหัสเครื่องอย่างน้อย 6 ตัว และจำนวนตั๋ว';return}b.disabled=true;m.textContent='กำลังหา…';try{const q='/api/online?a=acgive&key=${K}&t='+encodeURIComponent(t)+'&n='+n;const d=await (await fetch(q+'&dry=1')).json();if(!d.ok){m.textContent='ไม่สำเร็จ: '+(d.err==='notfound'?'ไม่พบรหัสนี้':d.err==='many'?'ตรงหลายคน ใส่รหัสให้ยาวขึ้น':d.err||'?');b.disabled=false;return}if(!confirm('แจกตั๋วสุ่มเกิด '+n+' ใบ ให้ '+d.to.slice(0,10)+'… (ตอนนี้มี '+d.have+' ใบ) ?')){m.textContent='ยกเลิก';b.disabled=false;return}const r=await (await fetch(q)).json();m.textContent=r.ok?('✅ แจกแล้ว '+r.n+' ใบ → '+r.to.slice(0,10)+'… ตอนนี้มี '+r.total+' ใบ (ผู้เล่นรีเฟรชเกมแล้วจะเห็น)'):'ไม่สำเร็จ: '+(r.err||'?')}catch(x){m.textContent='ผิดพลาด '+x}b.disabled=false}async function acB(p,on,b){if(!confirm(on==='1'?'แบนผู้เล่นนี้จากระบบออนไลน์ทั้งหมด?':'ล้างธงและปลดแบนผู้เล่นนี้?'))return;b.disabled=true;try{const r=await fetch('?a=acban&key=${K}&p='+p+'&on='+on);const j=await r.json();b.textContent=j.ok?(on==='1'?'แบนแล้ว ('+j.n+')':'ปลดแล้ว ('+j.n+')'):'ไม่สำเร็จ'}catch(x){b.textContent='ไม่สำเร็จ'}}</script>`;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>ผู้ดูแล · 1 ใน นวนิยาย</title><script>(function(){var t0=Date.now();setInterval(function(){if(!document.hidden&&Date.now()-t0>=180000&&!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||''))location.reload()},15000);document.addEventListener("visibilitychange",function(){if(!document.hidden&&Date.now()-t0>=180000&&!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||''))location.reload()})})()</script>
<style>.cpb{background:#2a2433;color:#f0c860;border:1px solid #f0c860;border-radius:6px;padding:4px 10px;font-size:13px;cursor:pointer}.pl{background:#211d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.plh{display:flex;flex-wrap:wrap;gap:6px;justify-content:space-between;align-items:baseline}.plh small,.pl small{color:#aaa}body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;margin:0;padding:14px;max-width:760px;margin:auto}h1{font-size:20px}h2{font-size:16px;margin-top:22px;color:#f0c860}table{width:100%;border-collapse:collapse;font-size:13px}td,th{padding:6px;border-bottom:1px solid #333;text-align:left}.c{display:inline-block;background:#2a2433;border-radius:8px;padding:8px 12px;margin:4px 6px 4px 0}.c b{font-size:20px;display:block;color:#f0c860}.bug{background:#221d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.bug.done{opacity:.55}a{color:#8fd0ff}small{opacity:.6}</style></head><body>
<h1>🛡️ หน้าผู้ดูแล</h1><p><a href="?a=kbstat&html=1&key=${K}" style="color:#f0c860">📊 สถิติคลังกรรม (ใช้ตั้งราคาของแลกกรรม)</a></p><div><span class="c"><b>${rows.filter(r => r.b !== 'บอท').length}</b>ออนไลน์ (10 นาที)</span><span class="c"><b>${+(lives || 0)}</b>ชีวิตที่จบแล้ว</span><span class="c"><b>${bugs.length}</b>เรื่องบนกระดานบั๊ก</span><span class="c"><b>${rv || 0}</b>ความคิดเห็น</span></div>
<div class="pl" style="margin-top:12px"><b>🎲 แจกตั๋วสุ่มเกิดให้ผู้เล่น</b><br><small>ใส่รหัสประจำเครื่องของผู้เล่น (เมนู 💾 ย้ายเซฟข้ามเครื่อง → ส่วนหน้าขีด อย่างน้อย 8 ตัว) ใช้ชดเชยตั๋วที่หาย</small><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"><input id="gvId" placeholder="รหัสเครื่อง" maxlength="30" style="flex:1;min-width:150px;padding:6px;border-radius:6px;border:1px solid #555;background:#16131c;color:#eee"><input id="gvN" type="number" value="10" min="1" max="1000" style="width:80px;padding:6px;border-radius:6px;border:1px solid #555;background:#16131c;color:#eee"><button class="cpb" onclick="gvGo(this)">🎲 แจก</button></div><div id="gvMsg" style="margin-top:6px;font-size:13px"></div></div>
<h2>คนที่ออนไลน์ตอนนี้ <small style="font-weight:normal;color:#aaa">· รีเฟรชเองทุก 3 นาที (หยุดเมื่อสลับไปแท็บอื่น)</small></h2><p><small>🟢 กำลังเล่น · 🤔/📋 เลือกเหตุการณ์/เปิดหน้าต่าง · ⏸ หยุดเกม · 😴 เปิดทิ้งไว้ · 🙈 สลับแท็บ · 🏠 อยู่หน้าอื่น · 🔴 อาจค้าง/มี error</small></p>${rows.map(r => { const a = r.a || {}; return `<div class="pl" style="border-left:4px solid ${r.s.c}"><div class="plh"><b style="color:${r.s.c}">${e(r.s.t)}</b><small>${e(r.id)} · ${e(r.d)} · ${e(r.b)} · ${e(r.c)} · อัปเดต ${r.ago == null ? '-' : r.ago + ' วิ'}ก่อน${a.v ? ' · v' + e(a.v) : ''}</small></div>${a.nm ? `<div>👤 <b>${e(a.nm)}</b> อายุ ${e(a.ag)} ปี · ${e(WN[a.w] || '')} · ${e(a.ri || '')}${a.sp ? ' · ความเร็ว ' + e(a.sp) + '×' : ''}</div>` : ''}${r.a ? `<div><small>หน้า: ${e(SCN[a.sc] || a.sc || '-')}${a.md ? ' · หน้าต่าง: ' + e(MDN[a.md] || a.md) : ''} · แตะล่าสุด ${mins(a.ia)}ก่อน${a.sc === 'game' && a.yr >= 0 ? ' · ปีในเกมล่าสุดผ่านไปเมื่อ ' + mins(a.yr) + 'ก่อน' : ''}</small></div>` : ''}${r.s.x ? `<div><small style="color:#ff9b9b">error ล่าสุด: ${e(r.s.x)}</small></div>` : ''}</div>` }).join('') || '<p><small>ตอนนี้ไม่มีใครออนไลน์</small></p>'}
${avHtml}
${supHtml}
${hvHtml}
${srcHtml}
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
${[['bug', '🐞 แจ้งบั๊ก', 'แก้แล้ว'], ['idea', '💡 เสนอฟีเจอร์', 'เพิ่มแล้ว']].map(([kk, tt, dn]) => { const L = bugs.filter(b => (b.k === 'idea' ? 'idea' : 'bug') === kk).sort((x, y) => (ds.has(x.i) ? 1 : 0) - (ds.has(y.i) ? 1 : 0)); const pend = L.filter(b => !ds.has(b.i)).length; return `<h2>${tt} <small style="font-weight:normal;color:#aaa">· รอ ${pend} · ${dn} ${L.length - pend}</small></h2>` + (L.map(b => `<div class="bug ${ds.has(b.i) ? 'done' : ''}">${kk === 'idea' ? '💡' : '🐞'} <b>${e(b.n)}</b> <small>v${e(b.v)} · ${new Date(b.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</small><br>${e(b.x)}<br>${ds.has(b.i) ? `✅ ${dn} · <a href="?a=bugfix&key=${K}&bid=${b.i}&undo=1">ยกเลิก</a>` : `<a href="?a=bugfix&key=${K}&bid=${b.i}">ติด ✅ ${dn}</a>`}</div>`).join('') || '<p>ยังไม่มี</p>') }).join('')}
<p><small>หน้านี้เปิดได้เฉพาะลิงก์ที่มีรหัสผู้ดูแล อย่าแชร์ลิงก์นี้</small></p><style>
body.adtab{max-width:1200px}
#adNav{position:sticky;top:0;z-index:20;background:#16131cf2;backdrop-filter:blur(6px);margin:0 -14px 10px;padding:8px 14px;display:flex;gap:6px;flex-wrap:wrap;border-bottom:1px solid #2e2838}
#adNav button{background:#211d2a;color:#ddd;border:1px solid #3a3346;border-radius:18px;padding:6px 12px;font-size:13px;cursor:pointer;font-family:inherit}
#adNav button.on{background:#f0c860;color:#16131c;border-color:#f0c860;font-weight:700}
#adNav button i{font-style:normal;background:#ff5a6a;color:#fff;border-radius:9px;padding:0 6px;margin-left:4px;font-size:11px}
#adNav .adq{flex:1;min-width:150px;background:#211d2a;color:#eee;border:1px solid #3a3346;border-radius:18px;padding:6px 12px;font-size:13px}
.adP{display:none}.adP.on{display:block}
.adP .adg2{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:8px}
.adP .adg2>.pl,.adP .adg2>.bug{margin:0}
.adP h2{margin-top:8px;display:flex;align-items:baseline;gap:8px;cursor:pointer}
.adP h2::before{content:'▾';color:#888;font-size:12px}.adP h2.cl::before{content:'▸'}
.adP .adBody.cl{display:none}
.adSum{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:6px 0 12px}.adSum .c{margin:0}
@media(max-width:720px){.adP .adg2{grid-template-columns:1fr}#adNav{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}#adNav::-webkit-scrollbar{display:none}#adNav button{flex:0 0 auto;white-space:nowrap}#adNav .adq{flex:0 0 170px;min-width:170px}.adSum{grid-template-columns:repeat(4,1fr);gap:5px}.adSum .c{padding:6px;font-size:11px}.adSum .c b{font-size:16px}.adP .c{padding:6px 9px;font-size:12px;margin:3px 4px 3px 0}.adP .c b{font-size:16px}.adP h2 small{display:block;font-size:11px}}
</style>
<script>(function(){try{
var CAT=[['ov','📊 ภาพรวม',/^คนที่ออนไลน์|เว็บใหม่ vs เว็บเก่า/],['fb','💬 บั๊ก & ไอเดีย',/^🐞 แจ้งบั๊ก|^💡 เสนอฟีเจอร์|ความคิดเห็น|รีวิว/],['sup','💰 สนับสนุน',/ค่าสนับสนุน/],['mod','🖼️ ตรวจเนื้อหา',/รูปโปรไฟล์|คนแรกของเซิร์ฟเวอร์|ทำเนียบสัปดาห์/],['sec','🛡️ ความปลอดภัย',/ผู้บุกรุก|ผู้ต้องสงสัยโกง/],['err','🧯 error',/error จากเครื่อง/],['etc','📁 อื่นๆ',/$^/]];
var b=document.body;b.classList.add('adtab');var h1=b.querySelector('h1'),sum=h1&&h1.nextElementSibling;if(sum)sum.classList.add('adSum');
var nav=document.createElement('div');nav.id='adNav';var P={};
CAT.concat([['all','🗂️ ทั้งหมด',null]]).forEach(function(c){var bt=document.createElement('button');bt.dataset.k=c[0];bt.textContent=c[1];nav.appendChild(bt);if(c[0]!=='all'){var p=document.createElement('div');p.className='adP';p.dataset.k=c[0];P[c[0]]=p}});
var q=document.createElement('input');q.className='adq';q.placeholder='🔎 ค้นหาในหน้านี้ (ชื่อ / id / ข้อความ)';nav.appendChild(q);
(sum||h1).insertAdjacentElement('afterend',nav);
var host=document.createElement('div');nav.insertAdjacentElement('afterend',host);CAT.forEach(function(c){host.appendChild(P[c[0]])});
var hs=[].slice.call(b.querySelectorAll('body>h2'));
hs.forEach(function(h){var t=h.textContent.trim(),k='etc';for(var i=0;i<CAT.length;i++)if(CAT[i][2].test(t)){k=CAT[i][0];break}
 var body=document.createElement('div');body.className='adBody';var n=h.nextSibling,items=[];while(n&&!(n.nodeType===1&&n.tagName==='H2')&&!(n.nodeType===1&&n.tagName==='P'&&/อย่าแชร์ลิงก์/.test(n.textContent))){var nx=n.nextSibling;items.push(n);n=nx}
 var grid=null;items.forEach(function(el){if(el.nodeType===1&&(el.classList.contains('pl')||el.classList.contains('bug'))){if(!grid){grid=document.createElement('div');grid.className='adg2';body.appendChild(grid)}grid.appendChild(el)}else{grid=null;body.appendChild(el)}});
 P[k].appendChild(h);P[k].appendChild(body);
 var key='adcl:'+t.slice(0,20);try{if(localStorage.getItem(key)==='1'){h.classList.add('cl');body.classList.add('cl')}}catch(e){}
 h.addEventListener('click',function(){h.classList.toggle('cl');body.classList.toggle('cl');try{localStorage.setItem(key,h.classList.contains('cl')?'1':'0')}catch(e){}})});
// ตัวเลขแจ้งเตือนบนแท็บ
function fold(panel,sel,lab){[].forEach.call(panel.querySelectorAll('.adBody'),function(bd){var L=[].filter.call(bd.querySelectorAll(sel),function(x){return x.closest('.adBody')===bd});if(!L.length)return;var d=document.createElement('details');d.className='adFold';var sm=document.createElement('summary');sm.textContent=lab+' ('+L.length+')';sm.style.cssText='cursor:pointer;color:#aaa;margin:8px 0;font-size:13px';d.appendChild(sm);var g=document.createElement('div');g.className='adg2';L.forEach(function(x){g.appendChild(x)});d.appendChild(g);bd.appendChild(d)})}
fold(P.fb,'.bug.done','✅ ที่จัดการแล้ว');fold(P.sup,'.pl[data-st="ok"],.pl[data-st="no"]','✅ จัดการแล้ว');
CAT.forEach(function(c){var p=P[c[0]],n=0;if(c[0]==='sec')n=p.querySelectorAll('.pl').length;if(c[0]==='fb')n=p.querySelectorAll('.bug:not(.done)').length;if(c[0]==='sup')n=p.querySelectorAll('.pl[data-st=""]').length;if(c[0]==='mod')n=(p.textContent.match(/รอตรวจ[^0-9]*([0-9]+)/)||[0,0])[1]|0;var bt=nav.querySelector('[data-k="'+c[0]+'"]');if(n&&bt){var i=document.createElement('i');i.textContent=n;bt.appendChild(i)}if(!p.children.length&&bt)bt.style.display='none'});
function show(k){try{localStorage.setItem('adtab',k)}catch(e){}[].forEach.call(nav.querySelectorAll('button'),function(x){x.classList.toggle('on',x.dataset.k===k)});Object.keys(P).forEach(function(x){P[x].classList.toggle('on',k==='all'||x===k)})}
nav.addEventListener('click',function(e){var t=e.target.closest('button');if(t){show(t.dataset.k);window.scrollTo({top:0})}});
var k0='ov';try{k0=localStorage.getItem('adtab')||'ov'}catch(e){}show(P[k0]||k0==='all'?k0:'ov');
q.addEventListener('input',function(){var v=q.value.trim().toLowerCase();if(v)show('all');[].forEach.call(document.querySelectorAll('.adP .pl,.adP .bug'),function(el){el.style.display=!v||el.textContent.toLowerCase().indexOf(v)>=0?'':'none'})});
try{var sy=+sessionStorage.getItem('adsy')||0;if(sy)window.scrollTo(0,sy);window.addEventListener('beforeunload',function(){sessionStorage.setItem('adsy',window.scrollY)})}catch(e){}
}catch(e){console.error(e)}})();</script>
</body></html>`);
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
      const R1 = await pipe(BD_CATS.map(c => ['ZREVRANGE', bdKeyP(p, c, now, 1), 0, 9])), lab = flag.split(':').slice(1).join(':'), rkk = rkKey(lab, await cmd('GET', 'rksalt:' + p + ':' + rkKey(lab)));
      const N1 = await pipe(BD_CATS.map(c => ['ZCARD', bdKeyP(p, c, now, 1)]));
      for (let k = 0; k < BD_CATS.length; k++) { if (p === 'd' && CHF[BD_CATS[k]] && (+N1[k] || 0) < 5) continue; const L1 = (R1[k] || []).map(jp).filter(x => x && x.lid && !x.cu && !x.nf && !(+x.s < 0)); const seen = new Set(); let r = 0;
        for (const x of L1) { if (r >= 3) break; const own = await cmd('GET', 'lifeo:' + x.lid); if (!own || seen.has(own) || await cmd('SISMEMBER', 'cheaters', own)) continue; seen.add(own); r++;
          const isC = BD_CATS[k] === 'c', isR = BD_CATS[k] === 'r', isM = !!CHF[BD_CATS[k]], TT = isM ? RKT_M[BD_CATS[k]] : isC ? RKT_C : isR ? RKT_R : RKT, hf = isM ? p + CHF[BD_CATS[k]] : isC ? p + 'c' : isR ? p + 'r' : p, cur = jp(await cmd('HGET', 'rkttl:' + own, hf)), gc = RKG_C[BD_CATS[k]] || 'm', gt = RKG.title(p, gc, rkk, r), gf = RKG.fid(p, gc, rkk, r), nt = { t: gt, r, c: BD_CATS[k], exp: now + RKT_EXP[p], at: now };
          await kbFix(own); const L2 = [['LPUSH', 'bdrw:' + own, JSON.stringify({ p, c: BD_CATS[k], r, d: lab, n: x.n, s: x.s, tt: gt, gf, exp: nt.exp, ...(x.ch ? { ch: x.ch } : {}) })], ['EXPIRE', 'bdrw:' + own, 86400 * 60], ['HINCRBY', 'bdwins', own, 1], ['HINCRBY', 'kb:' + own, 'g', KB_RANK[p][r]]];
          if (!cur || cur.exp < now || r <= cur.r) L2.push(['HSET', 'rkttl:' + own, hf, JSON.stringify(nt)], ['EXPIRE', 'rkttl:' + own, 86400 * 40]);
          await pipe(L2) }
        // v17.33 หลายบัญชี: คนละรหัสผู้เล่นแต่ IP เดียวกันติดท็อป 10 พร้อมกัน → แจ้งแอดมินเท่านั้น (ไม่แบน · คนในบ้าน/ร้านเน็ตใช้ IP ร่วมได้)
        try { const ow = (await pipe(L1.slice(0, 10).map(x => ['GET', 'lifeo:' + x.lid]))) || [], uo = [...new Set(ow.filter(Boolean))];
          if (uo.length > 1) { const ips = await cmd('MGET', ...uo.map(u => 'idip:' + u)), g = {}; uo.forEach((u, i) => { if (ips[i]) (g[ips[i]] = g[ips[i]] || []).push(u) });
            for (const [ip1, us] of Object.entries(g)) { if (us.length < 2) continue; const nm = []; for (const u of us) { const x = L1[ow.indexOf(u)]; nm.push(clean(String((x && x.n) || ''), 20)) }
              await pipe([['LPUSH', 'acsus', JSON.stringify({ fid: us[0], ids: us, n: nm.join(' / '), age: 0, why: 'multi-acc ' + p + BD_CATS[k], info: 1, t: now })], ['LTRIM', 'acsus', 0, 199]]) } } } catch {} } } catch {} };
    // 📊 v20.3: ทำเนียบวิญญาณยุทธ์/ทะลุฟ้าดาราเรียงตามคะแนนเฉลี่ยชีวิตแบบโหมดปกติ — แปลงรายการเดิมครั้งเดียว
    const avgMig = async () => { try { if (!(await cmd('SET', 'mig:avg1', 1, 'NX', 'EX', 86400 * 90))) return; const cmds = [];
      for (const c of ['cl', 'ck']) for (const p of ['d', 'w', 'm']) for (const bk of [0, 1]) { const k = bdKeyP(p, c, now, bk), L0 = (await cmd('ZRANGE', k, 0, -1)) || [];
        for (const m of L0) { const j = jp(m); if (!j) continue; const hs = Math.max(0, Math.min(999999, Math.round(j.hs != null ? +j.hs : (+j.s || 0) % 1e6))); const nj = JSON.stringify(Object.assign({}, j, { s: hs, hs })); cmds.push(['ZREM', k, m], ['ZADD', k, hs, nj]) } }
      for (let i = 0; i < cmds.length; i += 200) await pipe(cmds.slice(i, i + 200)) } catch (e) { } };
    await avgMig();
    const bdSettle = async () => { const yk = new Date(now + 7 * 3600e3 - 86400e3).toISOString().slice(0, 10);
      await bdSettle1('d', 'bdset:' + yk, 7); await bdSettle1('w', 'bdsetw:' + week(new Date(now - 7 * 86400e3)), 30); await bdSettle1('m', 'bdsetm:' + bdMon(now, 1), 90) };
    // v17.12: ย้ายชีวิตโหมดท้าทายของรอบปัจจุบัน ออกจากทำเนียบรวม/ทำเนียบโลก ไปทำเนียบของโหมดตัวเอง (ครั้งเดียว)
    const bdSplit = async () => { try { if (!(await cmd('SET', 'bdsplit1', 1, 'NX'))) return;
      for (const p of ['d', 'w', 'm']) { for (let back = 0; back <= 1; back++) {
        const ck = bdKeyP(p, 'c', now, back), raw = (await cmd('ZRANGE', ck, 0, -1, 'WITHSCORES')) || [], L = [];
        for (let i = 0; i < raw.length; i += 2) { const x = jp(raw[i]); const c2 = x && CHC[x.ch]; if (!c2) continue; const kk = bdKeyP(p, c2, now, back); L.push(['ZADD', kk, +raw[i + 1] || 0, raw[i]], ['EXPIRE', kk, 86400 * (p === 'd' ? 4 : p === 'w' ? 20 : 70)]) }
        for (const wc of ['m', 'x', 'g', 'b']) { const wk = bdKeyP(p, wc, now, back), wr = (await cmd('ZRANGE', wk, 0, -1)) || []; const rm = wr.filter(v => { const x = jp(v); return x && x.ch }); if (rm.length) L.push(['ZREM', wk, ...rm]) }
        if (L.length) await pipe(L) } } } catch {} };
    // v17.12b: ทุกโหมดใช้คะแนนเฉลี่ยแบบโหมดปกติ → คิดคะแนนใหม่จากรายละเอียดชีวิตที่เก็บไว้ (ครั้งเดียว)
    const bdRescore = async () => { try { if (!(await cmd('SET', 'bdrescore1', 1, 'NX'))) return;
      for (const p of ['d', 'w', 'm']) for (let back = 0; back <= 1; back++) for (const c of ['ch', 'cs', 'cj']) {
        const k = bdKeyP(p, c, now, back), raw = (await cmd('ZRANGE', k, 0, -1)) || [], L = [];
        for (const v of raw) { const x = jp(v); if (!x) continue; let sc = null; try { const det = x.lid ? await cmd('GET', 'lifed:' + x.lid) : null; if (det) sc = bdScore(JSON.parse(det), x) } catch {}
          if (sc == null) { if (x.hd) sc = Math.max(0, (+x.s || 0) - (+x.hl || 0) * 200000); else if (!x.sp && !x.jk) sc = +x.s || 0; else continue }
          const y = Object.assign({}, x, { s: sc }); delete y.sp; delete y.jk; L.push(['ZREM', k, v], ['ZADD', k, sc, JSON.stringify(y)]) }
        if (L.length) await pipe(L) } } catch {} };
    // v17.15b: ทำเนียบนรกเรียงตามชั้นก่อน (ชั้น×1,000,000 + คะแนนเฉลี่ย) → คิดใหม่ให้รายการเดิม (ครั้งเดียว)
    const bdHellFloor = async () => { try { if (!(await cmd('SET', 'bdhellfl1', 1, 'NX'))) return;
      for (const p of ['d', 'w', 'm']) for (let back = 0; back <= 1; back++) { const k = bdKeyP(p, 'ch', now, back), raw = (await cmd('ZRANGE', k, 0, -1)) || [], L = [];
        for (const v of raw) { const x = jp(v); if (!x || x.hd === 2) continue; const hs = Math.max(0, Math.min(999999, Math.round(+x.s || 0))), sc = (+x.hl || 0) * 1e6 + hs; const y = Object.assign({}, x, { s: sc, hs, hd: 2 }); L.push(['ZREM', k, v], ['ZADD', k, sc, JSON.stringify(y)]) }
        if (L.length) await pipe(L) } } catch {} };
    const bdWipe = async () => { await bdSplit(); await bdRescore(); await bdHellFloor(); try { if (!(await cmd('SET', 'bd3init', 1, 'NX'))) return; let cur = '0', n = 0; do { const r = await cmd('SCAN', cur, 'MATCH', 'bd2:*', 'COUNT', 500); cur = String(r[0]); if (r[1].length) await cmd('DEL', ...r[1]); n++ } while (cur !== '0' && n < 200); await cmd('DEL', 'bdhide') } catch {} };
    if (a === 'rgboard') {
      await bdSettle();
      const p0 = String(b.p || qOf(req).p || 'd'), per = ['d', 'w', 'm', 'all'].includes(p0) ? p0 : 'd';
      const key = per === 'all' ? 'rgb:all' : bdKeyP(per, 'r', now);
      const raw = (await cmd('ZREVRANGE', key, 0, 49)) || [];
      const prevRaw = per === 'all' ? [] : ((await cmd('ZREVRANGE', bdKeyP(per, 'r', now, 1), 0, 2)) || []);
      const hide = new Set(['f18abdmw8fuj8d', ...((await cmd('SMEMBERS', 'bdhide')) || [])]);
      const L0 = raw.map(x => { try { return JSON.parse(x) } catch { return null } }).filter(j => j && !(j.lid && hide.has(j.lid)));
      const pubs = L0.length ? await cmd('MGET', ...L0.map(x => 'lifep:' + (x.lid || 'x'))) : [];
      const top = L0.slice(0, 30).map((x, i) => { const v = pubs[i]; const o = Object.assign({}, x, { pub: v === '1' ? 1 : 0 }); if (v === '2') { o.n = 'ผู้ไม่ประสงค์ออกนาม'; o.anon = 1 } return o });
      const prev = prevRaw.map(x => { try { return JSON.parse(x) } catch { return null } }).filter(j => j && !(j.lid && hide.has(j.lid)));
      return res.json({ ok: 1, top, prev, p: per });
    }
    if (a === 'board') {
      await bdWipe(); await bdSettle();
      const ar = await cmd('ZREVRANGE', 'arenaW:' + W, 0, 9, 'WITHSCORES');
      const per = ['d', 'w', 'm'].includes(String(b.p || qOf(req).p || 'd')) ? String(b.p || qOf(req).p || 'd') : 'd';
      const Q = []; BD_CATS.forEach(c => { Q.push(['ZREVRANGE', bdKeyP(per, c, now), 0, 39]); Q.push(['ZREVRANGE', bdKeyP(per, c, now, 1), 0, 2]) });
      const R0 = await pipe(Q);
      const hide = new Set(['f18abdmw8fuj8d', ...((await cmd('SMEMBERS', 'bdhide')) || [])]);
      const pj = l => (l || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(j => j && !j.cu && !(j.lid && hide.has(j.lid)));
      // v17.33 กระดานแสดงคนละ 1 ชีวิต (ชีวิตที่ดีที่สุดของแต่ละคน) · ชีวิตอื่นของคนเดียวกันนับเป็น more
      const PJ = R0.map(pj), lidAll = [...new Set(PJ.flat().map(x => x.lid).filter(Boolean))];
      const ownM = {}; if (lidAll.length) { try { const ov = await cmd('MGET', ...lidAll.map(l => 'lifeo:' + l)); lidAll.forEach((l, i) => { if (ov[i]) ownM[l] = ov[i] }) } catch {} }
      const dd = l => { const seen = new Map(), out = []; for (const x of l) { const o0 = x.lid && ownM[x.lid]; if (o0) { const k0 = seen.get(o0); if (k0) { k0.more = (k0.more || 0) + 1; continue } seen.set(o0, x) } out.push(x) } return out };
      const cmK = CHM[String(b.cm || qOf(req).cm || 'h')] || 'ch';
      let T = [], Pv = [], CT = [], CP = []; BD_CATS.forEach((c, k) => { const a1 = dd(PJ[k * 2]).slice(0, 20), a2 = dd(PJ[k * 2 + 1]).slice(0, 3); if (c === cmK) { CT = a1; CP = a2 } else if (c === 'r' || c === 'c' || CHF[c]) { } else { T = T.concat(a1.filter(x => !x.ch)); Pv = Pv.concat(a2.filter(x => !x.ch)) } });
      // 📊 ภาพรวม: อันดับ 1 ของทุกทำเนียบโหมดท้าทาย/โลกใหม่ (ส่งชื่อกับคะแนนแบบย่อ) + อันดับของผู้ขอในแต่ละทำเนียบ
      const chov = {}; BD_CATS.forEach((c, k) => { const L1 = CHF[c] ? dd(PJ[k * 2]) : null; if (!L1) return; const f0 = L1[0]; let mi = -1; if (okId(id)) mi = L1.findIndex(x => x.lid && ownM[x.lid] === id); chov[CHF[c]] = { _e: f0 || null, n: f0 ? f0.n : '', s: f0 ? (f0.hd === 2 || f0.hd === 3 || CHF[c] === 'k' || CHF[c] === 'l' ? (f0.hs != null ? f0.hs : f0.s) : f0.s) : 0, c: L1.length, me: mi } });
      const arena = []; for (let i = 0; i < (ar || []).length; i += 2) arena.push({ n: ar[i], w: +ar[i + 1] });
      const all = [...new Set(T.concat(Pv, CT, CP, Object.values(chov).map(v => v._e).filter(Boolean)))].filter(x => x.lid);
      const [pubs, kns] = all.length ? await pipe([['MGET', ...all.map(x => 'lifep:' + x.lid)], ['MGET', ...all.map(x => 'lvkn:' + x.lid)]]) : [[], []];
      const pm = {}; all.forEach((x, i) => { pm[x.lid] = pubs[i] === '1' ? 1 : pubs[i] === '2' ? 2 : 0; if (+kns[i] > 0) x.kn = +kns[i] });
      const admB = !!ADM_KEY && String(qOf(req).key || '') === ADM_KEY;
      Object.values(chov).forEach(v => { const e0 = v._e; delete v._e; if (e0 && e0.lid && pm[e0.lid] === 2) v.n = 'ผู้ไม่ประสงค์ออกนาม' });
      const fix = l => l.map(x => { const v = x.lid ? pm[x.lid] || 0 : 0; const o = Object.assign(x, { pub: v === 1 || (admB && x.lid) ? 1 : 0 }); if (v === 2 && !admB) { o.n = 'ผู้ไม่ประสงค์ออกนาม'; o.f = ''; o.anon = 1 } const ow = x.lid && ownM[x.lid]; if (ow && !o.anon) o.pu = String(ow).replace(/[^a-z0-9]/g, '').slice(0, 12); return o });
      return res.json({ top: fix(T), prev: fix(Pv), ctop: fix(CT), cprev: fix(CP), cm: CHF[cmK], chov, arena, daily: 1, p: per, rks: await (async () => { try { const L = { d: new Date(now + 7 * 3600e3).toISOString().slice(0, 10), w: week(new Date(now)), m: bdMon(now) }, v = await pipe(['d', 'w', 'm'].map(p0 => ['GET', 'rksalt:' + p0 + ':' + rkKey(L[p0])])); return { d: v[0] || '', w: v[1] || '', m: v[2] || '' } } catch { return {} } })() });
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
      const d = code ? zUnpack(await cmd('GET', 'cs:' + code)) : null;
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
        const [pubR, prvR] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf', 'WITHSCORES'], ['ZRANGEBYSCORE', 'livezp', now - 330e3, '+inf', 'WITHSCORES']]);
        const sc = {}, un = a => { const o = []; for (let i = 0; i + 1 < (a || []).length; i += 2) { if (a[i] === id) continue; o.push(a[i]); sc[a[i]] = +a[i + 1] } return o }; const pub = un(pubR), prv = un(prvR);
        const all = [...(pub || []).map(x => [x, 'live:', 0]), ...(prv || []).filter(x => !(pub || []).includes(x)).map(x => [x, 'livep:', 1])];

        const rA = all.length ? await pipe([['HMGET', 'livem', ...all.map(x => x[0])], ['HMGET', 'lm', ...all.map(x => x[0])], ...all.map(x => ['ZCOUNT', 'watch:' + x[0], now - 25e3, '+inf'])]) : [[], []];
        let vals = rA[0] || []; const lms = rA[1] || [], cnt = rA.slice(2);
        const missA = all.filter((x, i) => !vals[i]); if (missA.length) { const mv = await cmd('MGET', ...missA.map(x => x[1] + x[0])); vals = vals.slice(); let j = 0; all.forEach((x, i) => { if (!vals[i]) vals[i] = mv[j++] }) }
        const l = [];
        all.forEach(([x, , pv], i) => { if (!vals[i]) return; try { const s0 = JSON.parse(vals[i]); l.push({ k: x.slice(0, 6) + x.slice(-4), id: x.slice(0, 6), pu: x.slice(0, 12), ago: Math.max(0, Math.round((now - (sc[x] || now)) / 1000)), n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, hot: s0.hot ? 1 : 0, p: +s0.p || (s0.st && +s0.st.pow) || 0, wk: ['m', 'x', 'g', 'c'].includes(s0.wk) ? s0.wk : (s0.xt ? 'g' : s0.x ? 'x' : 'm'), look: s0.look || null, wi: ((x => ['normal','hunter','under','ghost','loop','zombie','tower','game','gatewon','doom'].includes(x) ? x : undefined)(s0.wi || (s0.mx && s0.mx.i))), wr: (x => x ? String(x).replace(/[<>]/g, '').slice(0, 30) : undefined)(s0.wr || (s0.mx && s0.mx.r)), w: cnt[i] || 0, pv, m: (() => { try { return JSON.parse(lms[i]) } catch { return null } })() }) } catch {} });
        await pipe([['ZREMRANGEBYSCORE', 'livezp', 0, now - 400e3]]);
        const onIds = await cmd('ZRANGEBYSCORE', 'online', now - 600e3, '+inf');
        const liveSet = new Set(all.map(x => x[0]));
        const rest = (onIds || []).filter(x => !liveSet.has(x));
        const metas = rest.length ? await cmd('HMGET', 'om', ...rest) : [];
        const idle = rest.map((x, i) => { let m = {}; try { m = JSON.parse(metas[i] || '{}') } catch {} return { id: x.slice(0, 4), d: m.d, b: m.b, v: m.v || '', ago: Math.round((now - (m.t || now)) / 1000) } }).filter(x => x.b !== 'บอท');
        const tot = { o: l.filter(q => q.wk !== 'c').length, c: l.filter(q => q.wk === 'c').length }; const capEra = (arr, N, cmp) => { const c = arr.filter(q => q.wk === 'c').sort(cmp).slice(0, Math.ceil(N / 2)), o = arr.filter(q => q.wk !== 'c').sort(cmp).slice(0, N - c.length); return o.concat(c).sort(cmp) }; return res.json({ l: capEra(l, 80, (p, q) => q.age - p.age), adm: 1, idle, tot, now });
      }
      if (!isAdm) return res.json({ l: [], tot: { o: 0, c: 0 }, now, off: 1 });
      const idsR = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf', 'WITHSCORES'); const sc = {}, ids = []; for (let i = 0; i + 1 < (idsR || []).length; i += 2) { if (idsR[i] === id) continue; ids.push(idsR[i]); sc[idsR[i]] = +idsR[i + 1] }
      if (!ids.length) return res.json({ l: [], tot: { o: 0, c: 0 }, now });
      const r1 = await pipe([['HMGET', 'livem', ...ids], ...ids.map(x => ['ZCOUNT', 'watch:' + x, now - 25e3, '+inf'])]);
      let vals = r1[0] || [];const cnt = r1.slice(1);
      const miss = ids.filter((x, i) => !vals[i]); if (miss.length) { const mv = await cmd('MGET', ...miss.map(x => 'live:' + x)); vals = vals.slice(); let j = 0; ids.forEach((x, i) => { if (!vals[i]) vals[i] = mv[j++] }) }
      const l = [];
      ids.forEach((x, i) => { if (!vals[i]) return; try { const s0 = JSON.parse(vals[i]); l.push({ k: x.slice(0, 6) + x.slice(-4), id: x.slice(0, 6), pu: x.slice(0, 12), ago: Math.max(0, Math.round((now - (sc[x] || now)) / 1000)), n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, hot: s0.hot ? 1 : 0, p: +s0.p || (s0.st && +s0.st.pow) || 0, wk: ['m', 'x', 'g', 'c'].includes(s0.wk) ? s0.wk : (s0.xt ? 'g' : s0.x ? 'x' : 'm'), look: s0.look || null, wi: ((x => ['normal','hunter','under','ghost','loop','zombie','tower','game','gatewon','doom'].includes(x) ? x : undefined)(s0.wi || (s0.mx && s0.mx.i))), wr: (x => x ? String(x).replace(/[<>]/g, '').slice(0, 30) : undefined)(s0.wr || (s0.mx && s0.mx.r)), w: cnt[i] || 0 }) } catch {} });
      const gone = await cmd('ZRANGEBYSCORE', 'livez', 0, now - 120e3); await pipe([['ZREMRANGEBYSCORE', 'livez', 0, now - 120e3], ...((gone || []).length ? [['HDEL', 'livem', ...gone]] : [])]);
      const tot = { o: l.filter(q => q.wk !== 'c').length, c: l.filter(q => q.wk === 'c').length }; const capEra = (arr, N, cmp) => { const c = arr.filter(q => q.wk === 'c').sort(cmp).slice(0, Math.ceil(N / 2)), o = arr.filter(q => q.wk !== 'c').sort(cmp).slice(0, N - c.length); return o.concat(c).sort(cmp) }; return res.json({ l: capEra(l, 40, (p, q) => q.w - p.w || q.age - p.age), tot, now });
    }
    if (a === 'lreact' || a === 'lvote' || a === 'lbet') {
      return res.json({ ok: 0, err: 'off' });
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const k2 = String(b.t || '').toLowerCase().replace(/[^a-z0-9]/g, ''); const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'); const full = (ids || []).find(x => x.slice(0, 6) + x.slice(-4) === k2); if (!full || full === id) return res.json({ ok: 0 });
      if (a === 'lreact') { if ((await cmd('SET', 'lrrl:' + id, 1, 'NX', 'PX', 1200)) !== 'OK') return res.json({ ok: 0, err: 'rate' }); const e = Math.max(0, Math.min(3, Math.floor(+b.e || 0))); await pipe([['HINCRBY', 'lrx:' + full, String(e), 1], ['EXPIRE', 'lrx:' + full, 120], ['LPUSH', 'lrxl:' + full, JSON.stringify({ e, t: now, i: Math.random().toString(36).slice(2, 7) })], ['LTRIM', 'lrxl:' + full, 0, 19], ['EXPIRE', 'lrxl:' + full, 60]]); return res.json({ ok: 1 }) }
      const ck = String(b.c || '').replace(/[^a-z0-9]/g, '').slice(0, 12); if (!ck) return res.json({ ok: 0 });
      if (a === 'lvote') { const o = Math.max(0, Math.min(9, Math.floor(+b.o || 0))); if ((await cmd('SET', 'lvd:' + full + ':' + ck + ':' + id, o, 'NX', 'EX', 900)) !== 'OK') return res.json({ ok: 0, err: 'done' }); await pipe([['HINCRBY', 'lvote:' + full + ':' + ck, String(o), 1], ['EXPIRE', 'lvote:' + full + ':' + ck, 900]]); return res.json({ ok: 1 }) }
      const p = +b.p ? 1 : 0; if ((await cmd('SET', 'lbd:' + full + ':' + ck + ':' + id, p, 'NX', 'EX', 3600)) !== 'OK') return res.json({ ok: 0, err: 'done' }); await pipe([['HINCRBY', 'lbet:' + full + ':' + ck, String(p), 1], ['EXPIRE', 'lbet:' + full + ':' + ck, 3600], ['SADD', 'lbs:' + full + ':' + ck, id + '|' + p], ['EXPIRE', 'lbs:' + full + ':' + ck, 3600]]); return res.json({ ok: 1 });
    }
    if (a === 'lbclaim') { if (!okId(id)) return res.json({ l: [] }); const [l] = await pipe([['LRANGE', 'lbw:' + id, 0, 19], ['DEL', 'lbw:' + id]]); return res.json({ l: (l || []).map(jp).filter(Boolean) }) }
    if (a === 'liveend') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const z = jp(String(b.s || '')); if (!z) return res.json({ ok: 0 });
      const e = { n: clean(z.n, 20), age: Math.max(0, Math.floor(+z.age || 0)), r: clean(z.r, 40), cause: clean(z.cause, 120), hl: (Array.isArray(z.hl) ? z.hl : []).slice(0, 6).map(x => clean(x, 140)), look: z.look && JSON.stringify(z.look).length < 1600 ? z.look : null, lid: String(z.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16), t: now };
      await pipe([['SET', 'liveend:' + id, JSON.stringify(e), 'EX', 900], ['ZADD', 'liveendz', now, id], ['ZREMRANGEBYSCORE', 'liveendz', 0, now - 900e3]]); return res.json({ ok: 1 });
    }
    if (a === 'liveget') {
      const k2 = String(qOf(req).t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (ADM_KEY && String(qOf(req).key || '') === ADM_KEY) {
        const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 330e3, '+inf']]);
        const f1 = (pub || []).find(x => x.slice(0, 6) + x.slice(-4) === k2), f2 = (prv || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
        const v = f1 ? await cmd('GET', 'live:' + f1) : f2 ? await cmd('GET', 'livep:' + f2) : null;
        if (!v) return res.status(404).json({ err: 'off' });
        const [, , w] = await pipe([['ZADD', 'watcha:' + (f1 || f2), now, 'adm'], ['EXPIRE', 'watcha:' + (f1 || f2), 120], ['ZCOUNT', 'watch:' + (f1 || f2), now - 25e3, '+inf']]);
        return res.json({ s: JSON.parse(v), pu: (f1 || f2).slice(0, 12), w: w || 0, adm: 1, pv: f1 ? 0 : 1 });
      }
      if (k2) return res.status(404).json({ err: 'off' });
      const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf');
      const full = (ids || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
      const lvEnd = async () => { const e2 = (await cmd('ZRANGEBYSCORE', 'liveendz', now - 900e3, '+inf')) || []; const f = e2.find(x => x.slice(0, 6) + x.slice(-4) === k2); if (!f) return null; return jp(await cmd('GET', 'liveend:' + f)) };
      if (!full) { const e = await lvEnd(); if (e) return res.json({ end: e }); return res.status(404).json({ err: 'off' }) }
      const v = await cmd('GET', 'live:' + full);
      if (!v) { const e = await lvEnd(); if (e) return res.json({ end: e }); return res.status(404).json({ err: 'off' }) }
      const viewer = okId(id) ? id : 'anon' + (req.headers['x-forwarded-for'] || '').slice(0, 15);
      const S0 = JSON.parse(v), ck = S0.ch && String(S0.ch.k || '').replace(/[^a-z0-9]/g, '').slice(0, 12), hk = S0.hot && String(S0.hot.k || '').replace(/[^a-z0-9]/g, '').slice(0, 12);
      const [, , w, , rxl, vt, bt, myv, myb] = await pipe([['ZADD', 'watch:' + full, now, viewer], ['ZREMRANGEBYSCORE', 'watch:' + full, 0, now - 25e3], ['ZCARD', 'watch:' + full], ['EXPIRE', 'watch:' + full, 120], ['LRANGE', 'lrxl:' + full, 0, 19], ['HGETALL', 'lvote:' + full + ':' + (ck || '-')], ['HGETALL', 'lbet:' + full + ':' + (hk || '-')], ['GET', 'lvd:' + full + ':' + (ck || '-') + ':' + viewer], ['GET', 'lbd:' + full + ':' + (hk || '-') + ':' + viewer]]);
      const hm = h => { const o = {}; if (Array.isArray(h)) for (let i = 0; i < h.length; i += 2) o[h[i]] = +h[i + 1]; else for (const k in (h || {})) o[k] = +h[k]; return o };
      return res.json({ s: S0, pu: full.slice(0, 12), w: w || 0, rx: (rxl || []).map(jp).filter(x => x && now - x.t < 15e3), vt: hm(vt), bt: hm(bt), myv: myv == null ? null : +myv, myb: myb == null ? null : +myb });
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
    if (a === 'rkprev') {
      // ผู้ดูแล: ดูฉายา/กรอบของรอบหน้าล่วงหน้า · &roll=d|w|m สุ่มชุดของรอบนั้นใหม่
      const q = qOf(req); if (!isAdmKey(q.key)) return res.status(403).json({ err: 'admin' });
      const nx = { d: new Date(now + 7 * 3600e3).toISOString().slice(0, 10), w: week(new Date(now)), m: bdMon(now) }; // รอบที่กำลังแข่งอยู่ = ชุดที่จะแจกตอนจบรอบ
      if (/^[dwm]$/.test(q.roll || '')) { const sk = 'rksalt:' + q.roll + ':' + rkKey(nx[q.roll]), old = await cmd('GET', sk); let v; do { v = Math.random().toString(36).slice(2, 5).replace(/[^a-z0-9]/g, '') } while (!v || v === old); await cmd('SET', sk, v, 'EX', 86400 * 40) }
      const CN = { m: '⚔️ ยุทธภพ', x: '☁️ เซียน', g: '🌟 เทพ', b: '🐾 อสูร', r: '🔁 ย้อนกาล', h: '🔥 นรก', s: '⏳ ชีวิตสั้น', j: '🦴 รากขยะ', l: '⭕ จิตวิญญาณยุทธ์', k: '🌠 ทะลุฟ้าดารา', n: '🌀 ฮันเตอร์', u: '🌃 ใต้ดิน', o: '👻 ผีไทย', p: '🔁 วนลูป', z: '🧟 ซอมบี้', t: '🗼 หอคอย', e: '🎮 ระบบเกม', q: '💀 เกตชนะ', y: '☄️ วันสิ้นโลก' };
      if (q.fmt === 'json') { const keys = {}; for (const p of ['d', 'w', 'm']) keys[p] = rkKey(nx[p], await cmd('GET', 'rksalt:' + p + ':' + rkKey(nx[p]))); return res.json({ nx, keys }) }
      let html = '<meta name="viewport" content="width=device-width"><style>body{font-family:sans-serif;background:#1a1420;color:#eee;padding:10px}td{padding:3px 6px;border-bottom:1px solid #333}a{color:#ffd040}</style><h3>🏆 ฉายาที่จะแจกรอบนี้</h3>';
      for (const p of ['d', 'w', 'm']) { const k = rkKey(nx[p], await cmd('GET', 'rksalt:' + p + ':' + rkKey(nx[p])));
        html += `<h4>${{ d: 'รายวัน', w: 'รายสัปดาห์', m: 'รายเดือน' }[p]} (รอบ ${nx[p]}) <a href="?a=rkprev&key=${encodeURIComponent(q.key)}&roll=${p}">🎲 สุ่มใหม่</a></h4><table>`;
        for (const c of Object.keys(CN)) html += `<tr><td>${CN[c]}</td>${[1, 2, 3].map(r => `<td>${['', '🥇', '🥈', '🥉'][r]} ${RKG.title(p, c, k, r)}</td>`).join('')}</tr>`;
        html += '</table>' }
      res.setHeader('content-type', 'text/html; charset=utf-8'); return res.send(html + '<p>กรอบสร้างจากฉายาชุดเดียวกัน (สีและลายสุ่มตามรอบ) · กดสุ่มใหม่ได้จนกว่าจะถึงเวลาแจก</p>');
    }
    if (a === 'csprune') {
      // ผู้ดูแลเท่านั้น: ดู/ลบเซฟคลาวด์ของคนที่หายไปนาน (อายุดูจาก TTL ที่เหลือ: เซฟใหม่ = 90 วัน) · ค่าเริ่มต้นเป็นแค่ "ดู" ต้องใส่ go=1 ถึงจะลบ
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const days = Math.max(7, Math.min(89, parseInt(qOf(req).days, 10) || 30)), go = String(qOf(req).go || '') === '1', lim = (90 - days) * 86400;
      const out = { days, go, oomAt: OOM_AT || 0, total: 0, bytes: 0, old: 0, oldBytes: 0, deleted: 0 }; let cur = '0', n = 0;
      try {
        do {
          const r = await cmd('SCAN', cur, 'MATCH', 'cs3:*', 'COUNT', 300); cur = String(r[0]); const ks = r[1] || []; n += ks.length;
          if (ks.length) {
            const rr = await pipe([...ks.map(k => ['TTL', k]), ...ks.map(k => ['STRLEN', k])]);
            const del = [];
            ks.forEach((k, i) => { const ttl = +rr[i], len = +rr[i + ks.length] || 0; out.total++; out.bytes += len; if (ttl >= 0 && ttl < lim) { out.old++; out.oldBytes += len; del.push(k) } });
            if (go && del.length) { await pipe(del.map(k => ['DEL', k])); out.deleted += del.length }
          }
        } while (cur !== '0' && n < 30000);
      } catch (x) { out.err = String(x && x.message || x) }
      out.mb = +(out.bytes / 1048576).toFixed(1); out.oldMb = +(out.oldBytes / 1048576).toFixed(1);
      return res.json(out);
    }
    if (a === 'csmig') {
      // ผู้ดูแลเท่านั้น: ย้ายเซฟคลาวด์เก่าจาก Valkey (RAM) ไป R2 · ค่าเริ่มต้น = ดูเฉยๆ (dry-run) · go=1 ถึงจะย้ายจริง
      // ปลอดภัย: เขียน R2 → เช็คขนาดตรงกัน → ค่อยลบจาก Valkey · ทำทีละ lim ก้อน (เรียกซ้ำจนกว่า left=0) · ไม่แตะกุญแจ cs2 (ตัวชี้) ซึ่งเกมอ่านต่อจาก R2 เองได้
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const bk = r2Bkt(); if (!bk) return res.status(400).json({ err: 'no-r2' });
      const go = String(qOf(req).go || '') === '1', lim = Math.max(1, Math.min(24, parseInt(qOf(req).lim, 10) || 20)); // Workers แพ็กฟรีจำกัดการเรียกต่อคำขอ → ทีละไม่เกิน 24 ก้อน
      const out = { go, lim, scanned: 0, moved: 0, skipped: 0, failed: 0, bytes: 0, left: 0 }; let cur = '0', todo = [];
      try {
        do {
          const r = await cmd('SCAN', cur, 'MATCH', 'cs3:*', 'COUNT', 500); cur = String(r[0]); const ks = r[1] || []; out.scanned += ks.length;
          for (const k of ks) { if (/^cs3:[a-z0-9]{6,24}:[1-5]$/.test(k)) { if (todo.length < lim) todo.push(k); else out.left++ } else out.skipped++ }
        } while (cur !== '0' && out.scanned < 60000 && (todo.length < lim || out.left < 1));
        for (let i = 0; i < todo.length; i += 8) {
          await Promise.all(todo.slice(i, i + 8).map(async k => {
            const r = await csMove(k, bk, go);
            if (r === 1) out.moved++; else if (r === -1) out.failed++; else out.skipped++;
          }));
        }
      } catch (x) { out.err = String(x && x.message || x).slice(0, 120) }
      out.mb = +(out.bytes / 1048576).toFixed(2);
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
    if (a === 'clist' || a === 'cme') {
      // clist: รายการเซฟบนคลาวด์ของเครื่องนี้ (ต้องมี token ของเครื่อง)
      // cme: เหมือน clist แต่อ่าน id/token จาก cookie ที่เซิร์ฟเวอร์ฝากไว้ตอน csave — ใช้กู้เซฟเมื่อ Safari ลบ localStorage ทิ้ง (กฎ 7 วันของ ITP ไม่ลบ cookie ที่ตั้งจากเซิร์ฟเวอร์)
      let id = id0, tk = String(qOf(req).tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      if (a === 'cme') { const m = /(?:^|;\s*)mc=([a-z0-9]{6,24})\.([a-z0-9]{8,20})(?:;|$)/.exec(String(req.headers.cookie || '')); if (!m) return res.json({ l: [] }); id = m[1]; tk = m[2] }
      if (!okId(id)) return res.json({ l: [] });
      const keys = ['cs2:' + id, ...[1, 2, 3, 4, 5].map(n => 'cs3:' + id + ':' + n)];
      const [tok, ...vals0] = await pipe([['GET', 'ctok:' + id], ...keys.map(k => ['GET', k])]);
      if (!tok || tok !== tk) return res.json({ l: [] });
      const sl0 = await cs3Fill(id, vals0.slice(1)); vals0.splice(1, 5, ...sl0);
      const vals = vals0.map(v => /^@[1-5]$/.test(String(v || '')) ? null : zUnpack(v));
      const meta = v => { try { const d = JSON.parse(Buffer.from(v, 'base64').toString('utf8')); const S = d && d.S; if (!S) return null; return { n: String(S.name || '').slice(0, 40), age: +S.age || 0, x: S.xian ? 1 : 0, t: +d.t || 0, seed: S.seed || 0 } } catch { return null } };
      const out = [], seen = new Set();
      vals.forEach((v, i) => { if (!v) return; const m = meta(v); if (!m) return; const sig = m.n + '|' + m.seed + '|' + m.age; if (seen.has(sig)) return; seen.add(sig); out.push({ k: i ? 's' + i : 'cs2', sl: i || 0, n: m.n, age: m.age, x: m.x, t: m.t }) });
      out.sort((a1, b1) => b1.t - a1.t);
      if (a === 'cme') { res.setHeader('Cache-Control', 'no-store'); return res.json({ l: out, p: id, tk }) }
      return res.json({ l: out });
    }
    if (a === 'cload') {
      const p0 = String(qOf(req).p || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24), tk = String(qOf(req).tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      const kq = String(qOf(req).k || 'cs2'), dk = /^s[1-5]$/.test(kq) ? 'cs3:' + p0 + ':' + kq.slice(1) : 'cs2:' + p0;
      let [tok, d] = await pipe([['GET', 'ctok:' + p0], ['GET', dk]]);
      if (!tok || tok !== tk) return res.status(404).json({ err: 'notfound' });
      if (d == null && dk.startsWith('cs3:')) d = await r2Get(p0, +dk.slice(-1));
      if (/^@[1-5]$/.test(String(d || ''))) { const n0 = +String(d).slice(1); d = await cmd('GET', 'cs3:' + p0 + ':' + n0); if (d == null) d = await r2Get(p0, n0) }
      if (!d && dk.startsWith('cs2:')) { const all = await cs3Fill(p0, await pipe([1, 2, 3, 4, 5].map(n => ['GET', 'cs3:' + p0 + ':' + n]))); let best = null, bt = -1; all.forEach(v => { const u = zUnpack(v); if (!u) return; let t = 0; try { t = +JSON.parse(Buffer.from(u, 'base64').toString('utf8')).t || 0 } catch {} if (t > bt) { bt = t; best = u } }); d = best }
      d = zUnpack(d);
      if (!d) return res.status(404).json({ err: 'notfound' });
      return res.json({ d });
    }
    if (a === 'acban') {
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'forbidden' });
      const pre = String(qOf(req).p || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24), on = String(qOf(req).on || '');
      if (pre.length < 6) return res.json({ err: 'pre' });
      const ids = new Set(); if (pre.length >= 12) ids.add(pre);
      for (const hk of ['lm', 'om']) { let cur = '0', n = 0; do { const r = await cmd('HSCAN', hk, cur, 'MATCH', pre + '*', 'COUNT', 1000); cur = String(r[0]); for (let i = 0; i < r[1].length; i += 2) ids.add(r[1][i]); n++ } while (cur !== '0' && n < 400) }
      const L = []; for (const x of ids) { if (on === '1') L.push(['SADD', 'cheaters', x]); else L.push(['SREM', 'cheaters', x], ['DEL', 'acf:' + x], ['DEL', 'acp:' + x], ['DEL', 'acfh:' + x], ['DEL', 'acfn:' + x]) }
      if (L.length) await pipe(L);
      return res.json({ ok: 1, n: ids.size });
    }
    if (a === 'dlput' || a === 'dlget') {
      // ชะตาประจำวัน v2 — กระดานอันดับรายวัน (วันตามเวลาไทย) · นับเฉพาะชีวิตแรกที่จบของวันนั้น
      const dOf = t => new Date(t + 7 * 3600e3).toISOString().slice(0, 10), today = dOf(now), yd = dOf(now - 864e5);
      const unpack = async (d, arr) => { const ids = [], sc = []; for (let i = 0; i < (arr || []).length; i += 2) { ids.push(arr[i]); sc.push(+arr[i + 1]) }
        const m = ids.length ? ((await cmd('HMGET', 'dlm:' + d, ...ids)) || []).map(jp) : [];
        return ids.map((x, i) => Object.assign({ s: sc[i], me: x === id ? 1 : 0 }, m[i] || { n: '?' })) };
      if (a === 'dlput') {
        if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
        const d = String(b.d || ''); if (d !== today && d !== yd) return res.json({ err: 'day' });
        const c = +(await cmd('INCR', 'dlr:' + id)) || 1; if (c === 1) await cmd('EXPIRE', 'dlr:' + id, 3600); if (c > 12) return res.status(429).json({ err: 'rate' });
        const sc = Math.max(0, Math.min(1e12, Math.round(+b.s || 0)));
        const rec = JSON.stringify({ n: clean(String(b.n || ''), 24) || 'ไร้นาม', t: clean(String(b.t || ''), 70), st: Math.max(0, Math.min(999, +b.st | 0)), at: now });
        const added = +(await cmd('ZADD', 'dl:' + d, 'NX', sc, id)) === 1;
        if (added) await pipe([['HSET', 'dlm:' + d, id, rec], ['EXPIRE', 'dl:' + d, 5 * 86400], ['EXPIRE', 'dlm:' + d, 5 * 86400]]);
        const [rk, n] = await pipe([['ZREVRANK', 'dl:' + d, id], ['ZCARD', 'dl:' + d]]);
        return res.json({ ok: 1, first: added ? 1 : 0, rank: rk == null ? null : +rk + 1, n: +n || 0 });
      }
      const qd = String(qOf(req).d || ''), d = /^\d{4}-\d{2}-\d{2}$/.test(qd) ? qd : today;
      const [top, n, rk, yt] = await pipe([['ZREVRANGE', 'dl:' + d, 0, 19, 'WITHSCORES'], ['ZCARD', 'dl:' + d], ['ZREVRANK', 'dl:' + d, okId(id) ? id : '-'], ['ZREVRANGE', 'dl:' + yd, 0, 2, 'WITHSCORES']]);
      let mine = null; if (rk != null && +rk >= 20) { const sc = await cmd('ZSCORE', 'dl:' + d, id); const m = jp(await cmd('HGET', 'dlm:' + d, id)); mine = Object.assign({ s: +sc, rank: +rk + 1, me: 1 }, m || {}) }
      return res.json({ d, today, top: await unpack(d, top), n: +n || 0, rank: rk == null ? null : +rk + 1, mine, yd, ytop: await unpack(yd, yt) });
    }
    if (a === 'hoststat') {
      // ผู้เล่นเข้าเกมจากที่อยู่เว็บไหน (นับจากข้อมูลเครื่องล่าสุดของแต่ละคน) — แอดมินเท่านั้น
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const H = {}; let cur = '0', n = 0;
      do { const r = await cmd('HSCAN', 'lm', cur, 'COUNT', 1000); cur = String(r[0]); const L = r[1] || []; for (let i = 0; i < L.length; i += 2) { let v = null; try { v = JSON.parse(L[i + 1]) } catch {} if (!v) continue; const o = String(v.o || 'ไม่ระบุ').slice(0, 60), t = +v.t || 0, h = H[o] || (H[o] = { all: 0, d7: 0, d1: 0 }); h.all++; if (now - t < 7 * 864e5) h.d7++; if (now - t < 864e5) h.d1++ } n++ } while (cur !== '0' && n < 400);
      return res.json({ ok: 1, hosts: Object.entries(H).sort((x, y) => y[1].d7 - x[1].d7 || y[1].all - x[1].all).slice(0, 40).map(([o, v]) => Object.assign({ o }, v)) });
    }
    if (a === 'mst' || a === 'mstget') {
      // สถิติการเล่นแยกโหมด (นับรายวัน เวลาไทย) — ไม่เก็บข้อมูลส่วนตัว
      const dOf = t => new Date(t + 7 * 3600e3).toISOString().slice(0, 10), today = dOf(now);
      if (a === 'mst') {
        if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
        const c = +(await cmd('INCR', 'msr:' + id)) || 1; if (c === 1) await cmd('EXPIRE', 'msr:' + id, 600); if (c > 60) return res.status(429).json({ err: 'rate' });
        const md = String(b.m || '').replace(/[^a-z0-9_]/g, '').slice(0, 24) || 'x', ev = ['st', 'ed', 'ab', 'in'].includes(b.e) ? b.e : null; if (!ev) return res.json({ err: 'ev' });
        const y = Math.max(0, Math.min(9999, +b.y | 0)), bk = y < 1 ? '0' : y < 3 ? '1-2' : y < 6 ? '3-5' : y < 15 ? '6-14' : y < 40 ? '15-39' : '40+';
        const L = [['HINCRBY', 'ms:' + today, md + ':' + ev, 1], ['EXPIRE', 'ms:' + today, 40 * 86400]];
        if (ev !== 'st' && ev !== 'in') L.push(['HINCRBY', 'ms:' + today, md + ':' + ev + ':' + bk, 1]);
        if (ev === 'st' || ev === 'in') L.push(['PFADD', 'msu:' + today + ':' + md, id], ['EXPIRE', 'msu:' + today + ':' + md, 40 * 86400]);
        await pipe(L); return res.json({ ok: 1 });
      }
      if (!isAdmKey(qOf(req).key)) return res.status(403).json({ err: 'admin' });
      const days = Math.max(1, Math.min(30, +qOf(req).n || 7)), D = []; for (let i = 0; i < days; i++) D.push(dOf(now - i * 864e5));
      const H = await pipe(D.map(d => ['HGETALL', 'ms:' + d])); const out = {};
      H.forEach((h, i) => { const o = {}; if (Array.isArray(h)) for (let k = 0; k < h.length; k += 2) o[h[k]] = +h[k + 1]; else Object.assign(o, h || {}); out[D[i]] = o });
      const modes = new Set(); Object.values(out).forEach(o => Object.keys(o).forEach(k => modes.add(k.split(':')[0])));
      const U = {}; for (const m of modes) { U[m] = +(await cmd('PFCOUNT', ...D.map(d => 'msu:' + d + ':' + m))) || 0 }
      return res.json({ ok: 1, days: D, data: out, users: U });
    }
    // ============================================================
    // 📜 ภารกิจบัญชี (รายวัน/รายสัปดาห์/สมุดรายเดือน/ตำนาน/ลับ) · ⚡ ประกาศิตฟ้า (คนเดียวทั้งเว็บ) · 🐉 บอสโลก · ⚔️ ศึกสำนัก
    // ความคืบหน้าทำในเครื่อง แต่ "ของที่มีค่า" (ตั๋ว) จ่ายที่นี่ และมีเพดานต่อวัน/สัปดาห์/เดือน → โกงได้ไม่เกินที่คนเล่นจริงได้
    // ============================================================
    // ========== ❄ คัมภีร์ฤดูกาล ==========
    if (a === 'sp') {
      const s = seaClaim(), o = String(b.o || qOf(req).o || 'get'), now2 = Date.now(); if (!s) return res.json({ ok: 0, err: 'none' });
      const open = now2 < s.b, day = new Date(now2 + 7 * 3600e3).toISOString().slice(0, 10);
      if (o === 'get') { const S0 = { id: s.id, n: s.n, a: s.a, b: s.b, open: open ? 1 : 0 };
        if (!okId(id)) return res.json({ ok: 1, s: S0, p: 0, lv: 0, t: 0, cl: [], R: SPR[s.id] });
        const [h, cl, dd, en] = await pipe([['HGETALL', spKey(s, id)], ['SMEMBERS', 'spc:' + s.id + ':' + id], ['HGETALL', 'spd:' + id + ':' + day], ['HLEN', 'spe:' + s.id]]);
        const H = {}; if (Array.isArray(h)) for (let i = 0; i + 1 < h.length; i += 2) H[h[i]] = h[i + 1]; else if (h) Object.assign(H, h);
        const D = {}; if (Array.isArray(dd)) for (let i = 0; i + 1 < dd.length; i += 2) D[dd[i]] = +dd[i + 1]; else if (dd) Object.assign(D, dd);
        const p = +H.p || 0, mul = open ? await spMul(s, id, p) : 1;
        return res.json({ ok: 1, s: S0, p, lv: spLvOf(p), t: +H.t || 0, cl: cl || [], R: SPR[s.id], dd: D, mul: Math.round(mul * 100) / 100, en: +en || 0, now: now2 }) }
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'post' });
      if ((o === 'life' || o === 'sev') && (await cmd('SET', 'spr:' + id, 1, 'NX', 'PX', 700)) !== 'OK') return res.json({ ok: 0, err: 'fast' });
      if (o === 'life') { if (!open) return res.json({ ok: 0 }); const ag = Math.max(0, +b.age || 0), add = await spAdd(id, ag >= 60 ? 30 : 20, ['life', 3]); return res.json({ ok: 1, add }) }
      if (o === 'sev') { if (!open) return res.json({ ok: 0 }); const add = await spAdd(id, 10, ['sev', 3]); return res.json({ ok: 1, add }) }
      if (o === 'cl') {
        const tr = b.tr === 'p' ? 'p' : b.tr === 'i' ? 'i' : 'f', lv = Math.floor(+b.lv || 0), R = (SPR[s.id] || {})[tr] || {}, r = R[lv]; if (!r) return res.json({ err: 'lv' });
        const H = await cmd('HMGET', spKey(s, id), 'p', 't'), p = +(H && H[0]) || 0, t = +(H && H[1]) || 0;
        if (spLvOf(p) < lv) return res.json({ ok: 0, err: 'notyet' }); if (tr === 'p' && t < 1) return res.json({ ok: 0, err: 'pass' }); if (tr === 'i' && t < 2) return res.json({ ok: 0, err: 'pass' });
        if (!+(await cmd('SADD', 'spc:' + s.id + ':' + id, tr + lv))) return res.json({ ok: 0, dup: 1 }); await cmd('EXPIRE', 'spc:' + s.id + ':' + id, 86400 * 400);
        const [ty, v] = r;
        if (ty === 'f') await pipe([['INCRBY', 'rrf:' + id, v], ['EXPIRE', 'rrf:' + id, 86400 * 180]]);
        else if (ty === 'g') await pipe([['INCRBY', 'rrg:' + id, v], ['EXPIRE', 'rrg:' + id, 86400 * 365]]);
        else if (ty === 'lk') await cmd('INCRBY', 'lkc:' + id, v);
        else if (ty === 'cos' || ty === 'org') await cmd('SADD', 'cos:' + id, v);
        else if (ty === 'cosm') await cmd('SADD', 'cos:' + id, ...v);
        if (tr === 'i' && lv >= SP_MAX) await pipe([['SADD', 'spw:' + s.id, id], ['EXPIRE', 'spw:' + s.id, 86400 * 400]]);
        else if (ty === 'nv') await cmd('INCRBY', 'nvc:' + id, v);
        return res.json({ ok: 1, r }) }
      if (o === 'ens') { const [h, wn] = await pipe([['HGETALL', 'spe:' + s.id], ['SMEMBERS', 'spw:' + s.id]]), W = new Set(wn || []), L = []; if (Array.isArray(h)) for (let i = 0; i + 1 < h.length; i += 2) { const x = jp(h[i + 1]); if (x) L.push(Object.assign(x, { w: W.has(h[i]) ? 1 : 0 })) } else if (h && typeof h === 'object') for (const k in h) { const x = jp(h[k]); if (x) L.push(Object.assign(x, { w: W.has(k) ? 1 : 0 })) } L.sort((x, y) => x.t - y.t); return res.json({ ok: 1, L: L.slice(0, 300).map(x => ({ n: x.n, t: x.t, w: x.w })) }) }
      return res.json({ err: 'op' });
    }
    // ========== 📕 นิยายปกแข็ง ==========
    if (a === 'nv') {
      const o = String(b.o || qOf(req).o || 'get'), MONn = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 7);
      if (!okId(id)) return res.json({ ok: 0, err: 'id' });
      const vt = vipTier(jp(await cmd('GET', 'vip:' + id))), vf = vt >= 2 ? Math.max(0, 3 - (+(await cmd('GET', 'nvv:' + id + ':' + MONn)) || 0)) : 0;
      if (o === 'get') { const [c, bk] = await pipe([['GET', 'nvc:' + id], ['SMEMBERS', 'nvb:' + id]]); return res.json({ ok: 1, c: +c || 0, vf, vt, bk: bk || [] }) }
      if (o === 'mk') { if (req.method !== 'POST') return res.status(400).json({ err: 'post' });
        const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16); if (lid.length < 6) return res.json({ ok: 0, err: 'lid' });
        const [own, d, hc] = await pipe([['GET', 'lifeo:' + lid], ['EXISTS', 'lifed:' + lid], ['GET', 'lifeh:' + lid]]);
        if (own !== id) return res.json({ ok: 0, err: 'owner' }); if (!+d) return res.json({ ok: 0, err: 'gone' });
        if (!hc) { let paid = ''; if (vf > 0) { const u = +(await cmd('INCR', 'nvv:' + id + ':' + MONn)) || 1; await cmd('EXPIRE', 'nvv:' + id + ':' + MONn, 86400 * 40); if (u <= 3) paid = 'vip' }
          if (!paid) { const left = +(await cmd('DECR', 'nvc:' + id)); if (left < 0) { await cmd('INCR', 'nvc:' + id); return res.json({ ok: 0, err: 'nocredit' }) } paid = 'c' }
          await pipe([['SET', 'lifeh:' + lid, paid], ['PERSIST', 'lifed:' + lid], ['PERSIST', 'lifeo:' + lid], ['SET', 'lifep:' + lid, '1'], ['SADD', 'nvb:' + id, lid]]) }
        return res.json({ ok: 1, lid }) }
      return res.json({ err: 'op' });
    }
    if (a === 'aq' || a === 'hq' || a === 'wb' || a === 'sw') {
      const o = String(b.o || qOf(req).o || 'get'), adm = isAdmKey(b.key || qOf(req).key);
      const DAY = new Date(now + 7 * 3600e3).toISOString().slice(0, 10), MON = DAY.slice(0, 7);
      const MON0 = (() => { const t = new Date(now + 7 * 3600e3); return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() - 1, 15)).toISOString().slice(0, 7) })();
      const nm = clean(String(b.n || ''), 24) || 'ไร้นาม';
      const give = async (u, f, g) => { const P = []; if (f) P.push(['INCRBY', 'rrf:' + u, f], ['EXPIRE', 'rrf:' + u, 86400 * 180]); if (g) P.push(['INCRBY', 'rrg:' + u, g], ['EXPIRE', 'rrg:' + u, 86400 * 365]); if (P.length) await pipe(P) };
      const gfr = async (u, fr) => { await pipe([['SADD', 'gfr:' + u, fr], ['EXPIRE', 'gfr:' + u, 86400 * 400]]) };
      const rl = async (k, n, ex) => { const c = +(await cmd('INCR', k)) || 1; if (c === 1) await cmd('EXPIRE', k, ex); return c <= n };
      const swAdd = async (u, p) => { try { const s = await cmd('HGET', 'swm:' + MON, u); if (s == null) return; const f = await cmd('HSETNX', 'swq:' + MON, u, 1); await pipe([['HINCRBY', 'sw:' + MON, 'p' + s, p], ['HINCRBY', 'swu:' + MON, u, p], ...(+f === 1 ? [['HINCRBY', 'sw:' + MON, 'a' + s, 1]] : []), ['EXPIRE', 'sw:' + MON, 86400 * 75], ['EXPIRE', 'swu:' + MON, 86400 * 75], ['EXPIRE', 'swq:' + MON, 86400 * 75]]) } catch (e) {} };
      // ---------- ⚡ ประกาศิตฟ้า ----------
      const HQN = 15, HQ_CD = 3 * 86400e3, HQ_EXP = 7 * 86400e3, HQ_AUTO = 24 * 3600e3, HQ_MG = ['darts', 'drum', 'strike', 'moon', 'stars', 'pounce', 'heart', 'typing'];
      const pub = async () => { try { const [h, w] = await pipe([['GET', 'hq:s'], ['GET', 'wb:s']]); const H = jp(h), Wb = jp(w), hp = +(await cmd('GET', 'wb:hp')) || 0;
        await cmd('SET', 'gq:pub', JSON.stringify({ hq: H ? { r: H.r, ph: H.ph, wn: H.wn || '', nx: H.ph === 'cd' ? H.wt + HQ_CD : 0 } : null, wb: Wb ? { r: Wb.r, ph: Wb.ph, n: Wb.n, pc: Wb.mx ? Math.max(0, Math.round(hp / Wb.mx * 100)) : 0 } : null }), 'EX', 86400 * 10) } catch (e) {} };
      const hqNew = async (S0) => { const r = (S0 ? S0.r : 0) + 1, lq = ((await cmd('LRANGE', 'hq:lq', 0, 4)) || []).map(Number); if (S0 && !lq.includes(S0.q)) lq.unshift(S0.q); // ไม่ซ้ำ 5 รอบล่าสุด
        const can = Array.from({ length: HQN }, (_, i) => i).filter(i => !lq.slice(0, 5).includes(i)), q = can[Math.floor(Math.random() * can.length)];
        const S1 = { r, q, g: HQ_MG[Math.floor(Math.random() * HQ_MG.length)], t0: now, ph: 'on' }; await pipe([['SET', 'hq:s', JSON.stringify(S1)], ['LPUSH', 'hq:lq', q], ['LTRIM', 'hq:lq', 0, 4]]); if (S0 && S0.ph === 'on') await pipe([['LPUSH', 'hq:hof', JSON.stringify({ r: S0.r, q: S0.q, n: '', t: now, x: 1 })], ['LTRIM', 'hq:hof', 0, 49]]); await pub(); return S1 };
      const hqWin = async (H, c) => { H.ph = 'cd'; H.wt = now; H.wn = c.n; H.wu = c.u; await give(c.u, 0, 3); try { await spAdd(c.u, 200) } catch {} await gfr(c.u, 'f_hq1'); await pipe([['SET', 'hq:s', JSON.stringify(H)], ['LPUSH', 'hq:hof', JSON.stringify({ r: H.r, q: H.q, g: H.g, n: c.n, t: now })], ['LTRIM', 'hq:hof', 0, 49], ['LPUSH', 'hq:rw', c.u], ['LTRIM', 'hq:rw', 0, 1]]); await pub() };
      const hqTick = async () => {
        let H = jp(await cmd('GET', 'hq:s'));
        if (!H) return await hqNew(null);
        if (H.ph === 'cd' && now > H.wt + HQ_CD) return await hqNew(H);
        const CL = ((await cmd('LRANGE', 'hq:c:' + H.r, 0, 19)) || []).map(jp).filter(Boolean);
        // ตรวจอัตโนมัติ: แอดมินไม่ได้ตัดสินใน 24 ชม. → ผ่าน (ตามลำดับเวลาที่ส่ง)
        const rw = (await cmd('LRANGE', 'hq:rw', 0, 1)) || [];
        for (const c of CL) { if (c.st !== 'p' || now - c.t <= HQ_AUTO) continue; if (H.ph !== 'cd' && rw.includes(c.u)) continue; await hqJudge(H, c.u, 1); H = jp(await cmd('GET', 'hq:s')) }
        if (H.ph === 'on' && !CL.some(c => c.st === 'p') && now > H.t0 + HQ_EXP) return await hqNew(H);
        return H };
      async function hqJudge(H, u, ok) {
        const k = 'hq:c:' + H.r, L = (await cmd('LRANGE', k, 0, 19)) || []; const i = L.findIndex(x => (jp(x) || {}).u === u); if (i < 0) return 'none';
        const c = jp(L[i]); if (c.st !== 'p') return 'done'; c.st = ok ? 'ok' : 'no'; await cmd('LSET', k, i, JSON.stringify(c));
        if (!ok) { const rw0 = (await cmd('LRANGE', 'hq:rw', 0, 1)) || [], rest = L.map(jp).filter(x => x && x.st === 'p' && x.u !== u && !rw0.includes(x.u)); if (H.ph === 'chk') { if (rest.length) H.wn = rest[0].n; else { H.ph = 'on'; H.wn = '' } await cmd('SET', 'hq:s', JSON.stringify(H)); await pub() } return 'no' }
        const rw = (await cmd('LRANGE', 'hq:rw', 0, 1)) || [];
        if (H.ph !== 'cd' && !rw.includes(u)) { await hqWin(H, c); return 'win' }
        const nOk = L.map(jp).filter(x => x && x.st === 'ok').length; if (nOk <= 5) { await give(u, 2, 0); await gfr(u, 'f_hq2'); try { await spAdd(u, 50) } catch {} } return 'run' }
      // ---------- 🐉 บอสโลก ----------
      const WBN = [['🐉', 'มังกรเพลิงเก้าหาง'], ['🦂', 'ราชาแมงป่องทะเลทราย'], ['👹', 'อสูรร้อยตา'], ['🐢', 'เต่ายักษ์แบกภูเขา'], ['🦅', 'พญาอินทรีย์สายฟ้า'], ['🕷️', 'แม่นางแมงมุมเงา'], ['🐍', 'งูขาวพันปี'], ['🦍', 'วานรหินผา'], ['🐗', 'หมูป่าเขี้ยวเหล็ก'], ['🦑', 'ปลาหมึกยักษ์ใต้ทะเลลึก'], ['🐻', 'หมีดำกลืนจันทร์'], ['👻', 'เงาเจ้าเมืองไร้หัว'], ['🦇', 'ค้างคาวโลหิตพันปี'], ['🐊', 'จระเข้ราชาบึงดำ']];
      const wbTick = async () => {
        let W0 = jp(await cmd('GET', 'wb:s'));
        const spawn = async () => { const r = (W0 ? W0.r : 0) + 1, pc = W0 ? (+(await cmd('ZCARD', 'wb:d:' + W0.r)) || 0) : 0, mx = 10000000 /* v21: บอสโลกเลือด 10 ล้าน */, z = (() => { const L = WBN.filter(x => !W0 || x[1] !== W0.n); return L[Math.floor(Math.random() * L.length)] })();
          const W1 = { r, ic: z[0], n: z[1], mx, t0: now, ph: 'on' }; await pipe([['SET', 'wb:s', JSON.stringify(W1)], ['SET', 'wb:hp', mx]]); W0 = W1; await pub(); return W1 };
        if (!W0) return await spawn();
        if ((W0.ph === 'dead' || W0.ph === 'gone') && now > W0.dt + 2 * 86400e3) return await spawn();
        if (W0.ph === 'on' && now > W0.t0 + 4 * 86400e3) { W0.ph = 'gone'; W0.dt = now; await cmd('SET', 'wb:s', JSON.stringify(W0)); await pub() }
        return W0 };
      // ========== ภารกิจบัญชี ==========
      if (a === 'aq') {
        // นาฬิกาเครื่องเพี้ยน/ส่งช้าข้ามเที่ยงคืน: รับรอบของเครื่องที่ห่างจากเซิร์ฟเวอร์ไม่เกิน 1 รอบ แล้วนับในรอบของเซิร์ฟเวอร์ (เดิมตอบ period แล้วเครื่องถือว่าส่งแล้ว → กดรับรวมไม่ได้)
        const pOk = (pc, ps, k) => { pc = String(pc || ''); if (pc === ps) return true; const a1 = Date.parse(pc + 'T00:00:00Z'), a2 = Date.parse(ps + 'T00:00:00Z'); return isFinite(a1) && Math.abs(a1 - a2) <= (k === 'w' ? 7 : 1) * 864e5 };
        if (!okId(id)) return res.json({ err: 'id' });
        if (o === 'get') { const [bp, dn, wn, da, wa, lg, sc, fr] = await pipe([['HGET', 'aqb:' + id, MON], ['GET', 'aqn:' + id + ':' + DAY], ['GET', 'aqn:' + id + ':' + W], ['GET', 'aqa:' + id + ':' + DAY], ['GET', 'aqa:' + id + ':' + W], ['HKEYS', 'aql:' + id], ['HKEYS', 'aqs:' + id], ['SMEMBERS', 'gfr:' + id]]);
          const bt = (await cmd('SMEMBERS', 'aqbt:' + id + ':' + MON)) || [];
          return res.json({ ok: 1, d: DAY, w: W, m: MON, bp: +bp || 0, dn: +dn || 0, wn: +wn || 0, da: da ? 1 : 0, wa: wa ? 1 : 0, bt, lg: lg || [], sc: sc || [], fr: fr || [] }) }
        if (req.method !== 'POST') return res.status(400).json({ err: 'post' });
        if (!(await rl('aqr:' + id, 40, 600))) return res.status(429).json({ err: 'rate' });
        if (o === 'pt') { // ทำภารกิจ 1 ข้อสำเร็จ → แต้มสมุด (รายวันสูงสุด 3 ข้อ/วัน · รายสัปดาห์ 3 ข้อ/สัปดาห์)
          const k = b.k === 'w' ? 'w' : 'd', p = k === 'w' ? W : DAY, q = String(b.q || '').replace(/[^a-z0-9_]/gi, '').slice(0, 16);
          if (!pOk(b.p, p, k) || !q) return res.json({ err: 'period' });
          if ((await cmd('SET', 'aqp:' + id + ':' + p + ':' + q, 1, 'NX', 'EX', 86400 * 9)) !== 'OK') return res.json({ ok: 0, dup: 1 });
          const n = +(await cmd('INCR', 'aqn:' + id + ':' + p)) || 1; await cmd('EXPIRE', 'aqn:' + id + ':' + p, 86400 * 9);
          if (n > 3) { if (k === 'd' && n === 4 && vipTier(jp(await cmd('GET', 'vip:' + id))) >= 1) { await give(id, 1, 0); return res.json({ ok: 1, n, t4: 1, f: 1 }) } return res.json({ ok: 0, cap: 1 }) }
          const pt = k === 'w' ? 3 : 1, bp = +(await cmd('HINCRBY', 'aqb:' + id, MON, pt)) || 0; await cmd('EXPIRE', 'aqb:' + id, 86400 * 70); await swAdd(id, pt);
          let sp = 0; try { sp = await spAdd(id, k === 'w' ? 150 : 30) } catch {}
          return res.json({ ok: 1, n, bp, sp }) }
        if (o === 'all') { // ครบ 3 ข้อ: รายวัน → ตั๋วธรรมดา 1 + แต้มสมุด 1 · รายสัปดาห์ → ตั๋วทอง 1
          const k = b.k === 'w' ? 'w' : 'd', p = k === 'w' ? W : DAY; if (!pOk(b.p, p, k)) return res.json({ err: 'period' });
          if ((+(await cmd('GET', 'aqn:' + id + ':' + p)) || 0) < 3) return res.json({ ok: 0, err: 'notyet' });
          if ((await cmd('SET', 'aqa:' + id + ':' + p, 1, 'NX', 'EX', 86400 * 9)) !== 'OK') return res.json({ ok: 0, dup: 1 });
          if (k === 'd') { await give(id, 1, 0); await cmd('HINCRBY', 'aqb:' + id, MON, 1); await swAdd(id, 1) } else await give(id, 0, 1);
          return res.json({ ok: 1, f: k === 'd' ? 1 : 0, g: k === 'w' ? 1 : 0 }) }
        if (o === 'bk') { // สมุดภารกิจ: ขั้นละ 4 แต้ม · 30 ขั้น
          const t = +b.t | 0, RW = { 10: [2, 0], 20: [0, 1], 30: [0, 1] }; if (t < 1 || t > 30) return res.json({ err: 'tier' });
          const bp = +(await cmd('HGET', 'aqb:' + id, MON)) || 0; if (bp < t * 4) return res.json({ ok: 0, err: 'notyet', bp });
          const add = await cmd('SADD', 'aqbt:' + id + ':' + MON, t); await cmd('EXPIRE', 'aqbt:' + id + ':' + MON, 86400 * 70); if (!+add) return res.json({ ok: 0, dup: 1 });
          const r = RW[t] || [0, 0]; await give(id, r[0], r[1]); return res.json({ ok: 1, f: r[0], g: r[1] }) }
        if (o === 'lg') { const L = { multi: 2, l10: 0, l50: 1, l100: 2, mgm: 1, seed: 1, boss: 1 }, l = String(b.l || ''); if (!(l in L)) return res.json({ err: 'arg' });
          if (+(await cmd('HSETNX', 'aql:' + id, l, now)) !== 1) return res.json({ ok: 0, dup: 1 }); await give(id, 0, L[l]); return res.json({ ok: 1, g: L[l] }) }
        if (o === 'sec') { const s = String(b.s || '').replace(/[^a-z0-9_]/gi, '').slice(0, 12); if (!s) return res.json({ err: 'arg' }); const n = +(await cmd('HLEN', 'aqs:' + id)) || 0; if (n >= 12) return res.json({ ok: 0 });
          if (+(await cmd('HSETNX', 'aqs:' + id, s, now)) !== 1) return res.json({ ok: 0, dup: 1 }); await give(id, 1, 0); return res.json({ ok: 1, f: 1 }) }
        return res.json({ err: 'op' });
      }
      // ========== ⚡ ประกาศิตฟ้า ==========
      if (a === 'hq') {
        const H = await hqTick();
        if (o === 'get') { const [cl, hof, rw] = await pipe([['LRANGE', 'hq:c:' + H.r, 0, 19], ['LRANGE', 'hq:hof', 0, 19], ['LRANGE', 'hq:rw', 0, 1]]);
          const CL = (cl || []).map(jp).filter(Boolean), mine = okId(id) ? CL.find(c => c.u === id) : null;
          return res.json({ ok: 1, r: H.r, q: H.q, g: H.g, t0: H.t0, ph: H.ph, wn: H.wn || '', wt: H.wt || 0, nx: H.ph === 'cd' ? H.wt + HQ_CD : H.t0 + HQ_EXP, now, stg: Math.min(2, Math.floor((now - H.t0) / (12 * 3600e3))),
            cl: CL.filter(c => c.st !== 'no').map(c => ({ n: c.n, st: c.st, t: c.t })).reverse(), my: mine ? mine.st : '', cool: okId(id) && rw.includes(id) ? 1 : 0, hof: (hof || []).map(jp).filter(Boolean),
            ...(adm ? { adm: CL.map(c => ({ u: c.u, n: c.n, st: c.st, t: c.t, pf: c.pf })) } : {}) }) }
        if (o === 'claim') {
          if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
          if (!(await rl('hqr:' + id, 6, 3600))) return res.status(429).json({ err: 'rate' });
          if (+b.r !== H.r) return res.json({ err: 'round' });
          const pf = b.pf && typeof b.pf === 'object' ? b.pf : {}; const ls = +pf.ls || 0;
          if (H.q !== 0 && (ls && ls < H.t0 - 60e3)) return res.json({ err: 'old' }); // ชีวิตต้องเริ่มหลังประกาศิตออก
          if (now - H.t0 < 3 * 60e3) return res.json({ err: 'fast' });
          const L = ((await cmd('LRANGE', 'hq:c:' + H.r, 0, 19)) || []).map(jp).filter(Boolean);
          if (L.some(c => c.u === id)) return res.json({ ok: 0, dup: 1 });
          if (L.filter(c => c.st !== 'no').length >= 8) return res.json({ ok: 0, full: 1 });
          const c = { u: id, n: nm, t: now, st: 'p', pf: JSON.stringify(pf).slice(0, 400) };
          await pipe([['RPUSH', 'hq:c:' + H.r, JSON.stringify(c)], ['EXPIRE', 'hq:c:' + H.r, 86400 * 30]]);
          if (H.ph === 'on' && !((await cmd('LRANGE', 'hq:rw', 0, 1)) || []).includes(id)) { H.ph = 'chk'; H.wn = nm; await cmd('SET', 'hq:s', JSON.stringify(H)); await pub() }
          return res.json({ ok: 1, ph: H.ph }) }
        if (o === 'judge') { if (!adm) return res.status(403).json({ err: 'admin' }); const r = await hqJudge(H, String(b.u || ''), +b.ok ? 1 : 0); return res.json({ ok: 1, r }) }
        if (o === 'skip') { if (!adm) return res.status(403).json({ err: 'admin' }); const N = await hqNew(H); return res.json({ ok: 1, r: N.r }) }
        return res.json({ err: 'op' });
      }
      // ========== 🐉 บอสโลก ==========
      if (a === 'wb') {
        const W0 = await wbTick(), hp = Math.max(0, +(await cmd('GET', 'wb:hp')) || 0);
        if (o === 'get') { const [top, my, nn, cl] = await pipe([['ZREVRANGE', 'wb:d:' + W0.r, 0, 9, 'WITHSCORES'], ['ZSCORE', 'wb:d:' + W0.r, okId(id) ? id : '-'], ['ZCARD', 'wb:d:' + W0.r], ['GET', 'wbc:' + W0.r + ':' + (okId(id) ? id : '-')]]);
          const ids = [], sc = []; for (let i = 0; i < (top || []).length; i += 2) { ids.push(top[i]); sc.push(+top[i + 1]) }
          const nms = ids.length ? ((await cmd('HMGET', 'wb:n:' + W0.r, ...ids)) || []) : [];
          const hits = okId(id) ? +(await cmd('GET', 'wbh:' + id + ':' + DAY)) || 0 : 0;
          return res.json({ ok: 1, r: W0.r, ic: W0.ic, n: W0.n, mx: W0.mx, hp, ph: W0.ph, t0: W0.t0, dt: W0.dt || 0, now, kn: W0.kn || '', np: +nn || 0, my: +my || 0, hits, cl: cl ? 1 : 0, top: ids.map((x, i) => ({ n: nms[i] || '?', d: sc[i], me: x === id ? 1 : 0 })) }) }
        if (o === 'hit') {
          if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
          if (W0.ph !== 'on' || hp <= 0) return res.json({ ok: 0, err: 'dead' });
          if ((await cmd('SET', 'wbt:' + id, 1, 'NX', 'EX', 20)) !== 'OK') return res.json({ ok: 0, err: 'fast' });
          const hk = 'wbh:' + id + ':' + DAY, hn = +(await cmd('INCR', hk)) || 1; if (hn === 1) await cmd('EXPIRE', hk, 172800); if (hn > 3) return res.json({ ok: 0, err: 'day' });
          const s = Math.max(0, Math.min(1, +b.s || 0)), dmg = Math.round(300 + 1700 * s * s);
          const [left] = await pipe([['DECRBY', 'wb:hp', dmg], ['ZINCRBY', 'wb:d:' + W0.r, dmg, id], ['HSET', 'wb:n:' + W0.r, id, nm], ['EXPIRE', 'wb:d:' + W0.r, 86400 * 20], ['EXPIRE', 'wb:n:' + W0.r, 86400 * 20]]);
          await swAdd(id, 1); let sp = 0; try { sp = await spAdd(id, 10) } catch {}
          let kill = 0; if (+left <= 0 && (await cmd('SET', 'wbk:' + W0.r, id, 'NX', 'EX', 86400 * 20)) === 'OK') { kill = 1; W0.ph = 'dead'; W0.dt = now; W0.kn = nm; W0.ku = id; await cmd('SET', 'wb:s', JSON.stringify(W0)); await gfr(id, 'f_wb1') }
          await pub(); return res.json({ ok: 1, dmg, hp: Math.max(0, +left), kill, hits: hn, sp }) }
        if (o === 'claim') {
          if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
          const r = +b.r || W0.r; const Wr = r === W0.r ? W0 : null; if (!Wr || Wr.ph !== 'dead') return res.json({ ok: 0, err: 'alive' });
          const my = +(await cmd('ZSCORE', 'wb:d:' + r, id)) || 0; if (!my) return res.json({ ok: 0, err: 'none' });
          if ((await cmd('SET', 'wbc:' + r + ':' + id, 1, 'NX', 'EX', 86400 * 20)) !== 'OK') return res.json({ ok: 0, dup: 1 });
          const rk = +(await cmd('ZREVRANK', 'wb:d:' + r, id)); const top = rk >= 0 && rk < 3; await give(id, 1, top ? 1 : 0); if (top) await gfr(id, 'f_wb2');
          return res.json({ ok: 1, f: 1, g: top ? 1 : 0, rk: rk + 1 }) }
        return res.json({ err: 'op' });
      }
      // ========== ⚔️ ศึกสำนัก (รายเดือน) ==========
      if (a === 'sw') {
        if (o === 'get') { const [sm, my, myp, sm0, my0, c0] = await pipe([['HGETALL', 'sw:' + MON], ['HGET', 'swm:' + MON, okId(id) ? id : '-'], ['HGET', 'swu:' + MON, okId(id) ? id : '-'], ['HGETALL', 'sw:' + MON0], ['HGET', 'swm:' + MON0, okId(id) ? id : '-'], ['GET', 'swc:' + MON0 + ':' + (okId(id) ? id : '-')]]);
          const obj = v => { const o2 = {}; if (Array.isArray(v)) for (let i = 0; i + 1 < v.length; i += 2) o2[v[i]] = +v[i + 1] || 0; else if (v) Object.entries(v).forEach(([k, x]) => o2[k] = +x || 0); return o2 };
          const sc = v => [0, 1, 2].map(s => ({ p: v['p' + s] || 0, a: v['a' + s] || 0, m: v['m' + s] || 0, sc: Math.round((v['p' + s] || 0) / Math.max(3, v['a' + s] || 0) * 10) }));
          const L0 = sc(obj(sm0)); const best = L0.reduce((b2, x, i) => x.sc > L0[b2].sc ? i : b2, 0);
          return res.json({ ok: 1, m: MON, now, s: sc(obj(sm)), my: my == null ? -1 : +my, myp: +myp || 0, m0: MON0, s0: L0, w0: L0[best].sc > 0 ? best : -1, my0: my0 == null ? -1 : +my0, cl0: c0 ? 1 : 0 }) }
        if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
        if (o === 'join') { const s = +b.s | 0; if (s < 0 || s > 2) return res.json({ err: 'arg' }); if (+(await cmd('HSETNX', 'swm:' + MON, id, s)) !== 1) return res.json({ ok: 0, dup: 1 });
          await pipe([['HINCRBY', 'sw:' + MON, 'm' + s, 1], ['EXPIRE', 'swm:' + MON, 86400 * 75], ['EXPIRE', 'sw:' + MON, 86400 * 75]]); return res.json({ ok: 1 }) }
        if (o === 'claim') { const s = await cmd('HGET', 'swm:' + MON0, id); if (s == null) return res.json({ ok: 0, err: 'none' }); const up = +(await cmd('HGET', 'swu:' + MON0, id)) || 0; if (up < 8) return res.json({ ok: 0, err: 'few' });
          const v = (await cmd('HGETALL', 'sw:' + MON0)) || {}, o2 = {}; if (Array.isArray(v)) for (let i = 0; i + 1 < v.length; i += 2) o2[v[i]] = +v[i + 1] || 0; else Object.entries(v).forEach(([k, x]) => o2[k] = +x || 0);
          const scs = [0, 1, 2].map(i => (o2['p' + i] || 0) / Math.max(3, o2['a' + i] || 0)), w = scs.indexOf(Math.max(...scs));
          if ((await cmd('SET', 'swc:' + MON0 + ':' + id, 1, 'NX', 'EX', 86400 * 75)) !== 'OK') return res.json({ ok: 0, dup: 1 });
          const win = +s === w; await give(id, win ? 0 : 1, win ? 1 : 0); try { await spAdd(id, win ? 200 : 50) } catch {} if (win) await gfr(id, 'f_sw' + w); return res.json({ ok: 1, win: win ? 1 : 0, s: +s, w }) }
        return res.json({ err: 'op' });
      }
    }
    if (a === 'mgput' || a === 'mgget') {
      // สนามฝึกประจำวัน — มินิเกม 1 เกม/วัน (เวลาไทย) เก็บคะแนนดีที่สุดของแต่ละคน
      const dOf = t => new Date(t + 7 * 3600e3).toISOString().slice(0, 10), today = dOf(now);
      if (a === 'mgput') {
        if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
        if (String(b.d || '') !== today) return res.json({ err: 'day' });
        const c = +(await cmd('INCR', 'mgr:' + id)) || 1; if (c === 1) await cmd('EXPIRE', 'mgr:' + id, 600); if (c > 30) return res.status(429).json({ err: 'rate' });
        const sc = Math.max(0, Math.min(1000, Math.round(+b.s || 0)));
        await pipe([['ZADD', 'mg:' + today, 'GT', sc, id], ['HSET', 'mgm:' + today, id, JSON.stringify({ n: clean(String(b.n || ''), 24) || 'ไร้นาม' })], ['EXPIRE', 'mg:' + today, 3 * 86400], ['EXPIRE', 'mgm:' + today, 3 * 86400]]);
      }
      const [top, n, rk, my] = await pipe([['ZREVRANGE', 'mg:' + today, 0, 9, 'WITHSCORES'], ['ZCARD', 'mg:' + today], ['ZREVRANK', 'mg:' + today, okId(id) ? id : '-'], ['ZSCORE', 'mg:' + today, okId(id) ? id : '-']]);
      const ids = [], sc = []; for (let i = 0; i < (top || []).length; i += 2) { ids.push(top[i]); sc.push(+top[i + 1]) }
      const m = ids.length ? ((await cmd('HMGET', 'mgm:' + today, ...ids)) || []).map(jp) : [];
      return res.json({ ok: 1, d: today, n: +n || 0, rank: rk == null ? null : +rk + 1, best: my == null ? null : +my, top: ids.map((x, i) => ({ s: sc[i], me: x === id ? 1 : 0, n: (m[i] || {}).n || '?' })) });
    }
    if (a === 'rrclaim') {
      // ผู้เล่นกู้ตั๋วสุ่ม · VIP · ของแต่ง ที่เติมไว้ ย้ายมาไอดีปัจจุบัน — ยืนยันตัวด้วยข้อมูลที่ตรงกับรายการโอนซึ่งแอดมินยืนยันแล้ว (ชื่อบัญชี + ยอด + เวลา)
      if (req.method !== 'POST' || !okId(id)) return res.json({ err: 'id' });
      const c1 = +(await cmd('INCR', 'rcl:' + id)) || 1; if (c1 === 1) await cmd('EXPIRE', 'rcl:' + id, 3600);
      const c2 = +(await cmd('INCR', 'rcli:' + ip)) || 1; if (c2 === 1) await cmd('EXPIRE', 'rcli:' + ip, 3600);
      if (c1 > 6 || c2 > 20) return res.status(429).json({ err: 'rate' });
      const nz = x => String(x || '').toLowerCase().replace(/(นางสาว|น\.ส\.|นาย|นาง|ด\.ช\.|ด\.ญ\.|mr\.?|mrs\.?|miss|ms\.?)/g, '').replace(/[\s.\-_,()]/g, '');
      const pn = nz(clean(String(b.pn || ''), 40)), amt = Math.round((+b.amt || 0) * 100), tm = String(b.tm || '').replace(/\D/g, '').slice(0, 12);
      if (pn.length < 3 || amt <= 0 || tm.length < 3) return res.json({ err: 'input' });
      const ids = (await cmd('ZRANGE', 'suppayz', 0, -1)) || [], vals = ids.length ? ((await cmd('HMGET', 'suppay', ...ids)) || []).map(jp) : [];
      const hit = vals.filter(r => { if (!r || r.st !== 'ok' || !okId(r.fid) || r.fid === id || r.mvf) return false; if (Math.round((+r.amt || 0) * 100) !== amt) return false;
        const rp = nz(r.pn); if (rp.length < 3 || !(rp === pn || (Math.min(rp.length, pn.length) >= 4 && (rp.includes(pn) || pn.includes(rp))))) return false;
        const rt = String(r.tm || '').replace(/\D/g, ''); if (rt.length >= 3 && !(rt.includes(tm) || tm.includes(rt))) return false; return true });
      const fs = [...new Set(hit.map(r => r.fid))];
      if (!fs.length) return res.json({ err: 'nomatch' });
      if (fs.length > 1) return res.json({ err: 'many' });
      const f = fs[0];
      if (await cmd('GET', 'live:' + f) || await cmd('GET', 'livep:' + f)) return res.json({ err: 'active' });
      const rep = await moveAcc(f, id, now, { self: 1 });
      try { const adm = ((await cmd('SMEMBERS', 'admids')) || []).filter(x => x !== id).slice(0, 5); if (adm.length) await withCap(Promise.all(adm.map(x => noteTo(x, { t: '📦 ผู้เล่นกู้ตั๋วเอง', b: `${f.slice(0, 8)} → ${id.slice(0, 8)} · ตั๋ว ${rep.rr} · VIP ${rep.vip ? 'มี' : '-'} · ของแต่ง ${rep.cos}`, u: '/?go=sup', g: 'rcl-' + id }))), 5000) } catch (e) {}
      return res.json({ ok: 1, rr: rep.rr, vip: rep.vip, cos: rep.cos, saves: rep.saves });
    }
    if (a === 'acgive') {
      // แอดมิน: แจกตั๋วสุ่มเกิดให้ผู้เล่นโดยใส่รหัสประจำเครื่อง (ไอดีเต็มหรือขึ้นต้น ≥6 ตัว) — ใช้ชดเชยตั๋วหาย · dry=1 = ดูก่อนไม่แจก
      if (!isAdmKey(qOf(req).key) && !isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
      let to = String(qOf(req).t || b.t || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24); const n = Math.floor(+(qOf(req).n || b.n) || 0), dry = String(qOf(req).dry || b.dry || '') === '1';
      if (to.length < 6) return res.json({ err: 'id' }); if (n < 1 || n > 1000) return res.json({ err: 'n' });
      if (!okId(to) || !(await cmd('HEXISTS', 'lm', to)) && !(await cmd('HEXISTS', 'om', to))) { const found = new Set(); for (const hk of ['lm', 'om']) { let cur = '0', c = 0; do { const r = await cmd('HSCAN', hk, cur, 'MATCH', to + '*', 'COUNT', 1000); cur = String(r[0]); for (let i = 0; i < r[1].length; i += 2) found.add(r[1][i]); c++ } while (cur !== '0' && c < 400) } if (found.size !== 1) return res.json({ err: found.size ? 'many' : 'notfound', n: found.size }); to = [...found][0] }
      const cur0 = +(await cmd('GET', 'rrc:' + to)) || 0;
      if (dry) return res.json({ ok: 1, dry: 1, to, have: cur0 });
      const tot = +(await cmd('INCRBY', 'rrc:' + to, n)) || 0;
      await pipe([['LPUSH', 'acgivelog', JSON.stringify({ to, n, t: now })], ['LTRIM', 'acgivelog', 0, 199]]);
      try { await withCap(noteTo(to, { t: '🎲 ได้รับตั๋วสุ่มเกิด', b: 'ทีมงานเพิ่มตั๋วสุ่มเกิดให้ ' + n + ' ใบ (ตอนนี้มี ' + tot + ' ใบ)', u: '/' }), 3000) } catch (e) {}
      return res.json({ ok: 1, to, n, total: tot });
    }
    if (a === 'acmove') {
      // แอดมิน: ผู้เล่นเซฟหาย/เปลี่ยนเครื่อง → ย้ายตั๋วสุ่มเกิด · VIP · ของแต่งตัว · ประวัติการสนับสนุน · เซฟคลาวด์ จากไอดีเก่าไปไอดีใหม่
      if (!isAdmKey(qOf(req).key) && !isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
      const f = String(qOf(req).f || b.f || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24); let to = String(qOf(req).t || b.t || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24);
      if (!okId(f) || to.length < 6) return res.json({ err: 'id' });
      if (!okId(to) || !(await cmd('HEXISTS', 'lm', to)) && !(await cmd('HEXISTS', 'om', to))) { const found = new Set(); for (const hk of ['lm', 'om']) { let cur = '0', n = 0; do { const r = await cmd('HSCAN', hk, cur, 'MATCH', to + '*', 'COUNT', 1000); cur = String(r[0]); for (let i = 0; i < r[1].length; i += 2) found.add(r[1][i]); n++ } while (cur !== '0' && n < 400) } if (found.size !== 1) return res.json({ err: found.size ? 'many' : 'notfound', n: found.size }); to = [...found][0] }
      if (to === f) return res.json({ err: 'same' });
      const rep = await moveAcc(f, to, now);
      return res.json({ ok: 1, ...rep });
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
      const pre = String(qOf(req).p || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 16); if (pre.length < 4) return res.json({ err: 'pre' });
      const found = new Set();
      for (const hk of ['lm', 'om']) { let cur = '0', n = 0; do { const r = await cmd('HSCAN', hk, cur, 'MATCH', pre + '*', 'COUNT', 1000); cur = String(r[0]); for (let i = 0; i < r[1].length; i += 2) found.add(r[1][i]); n++ } while (cur !== '0' && n < 400) }
      const sum = d0 => { try { d0 = zUnpack(d0); const d = JSON.parse(Buffer.from(d0, 'base64').toString('utf8')), S = d.S || {}; const K = S.key || [];
        return { t: d.t, v: d.v, n: S.name, age: S.age, pow: S.power, fame: S.fame, money: S.money, qi: S.qi, int: S.int, cha: S.cha, ls: S.lifespan, xt: S.xt, xian: S.xian, cu: S.custom, adm: S.admUsed, tp: S._tp, gen: S.gen, lin: (S.lineage || []).slice(-12), sys: S.sys ? { t: S.sys.t, lv: S.sys.lv, g: S.sys.g, done: S.sys.done } : null, tal: S.talent && S.talent.n, nkey: K.length, k0: K.slice(0, 25), k1: K.slice(-70), pcap: S.pcap, fl: Object.keys(S.flags || {}).length } } catch (e) { return { err: String(e).slice(0, 80) } } };
      const out = [];
      for (const fid of [...found].slice(0, 6)) {
        const [lm, om, lv, lp, cs, ch, ctk] = await pipe([['HGET', 'lm', fid], ['HGET', 'om', fid], ['GET', 'live:' + fid], ['GET', 'livep:' + fid], ['GET', 'cs2:' + fid], ['SISMEMBER', 'cheaters', fid], ['GET', 'ctok:' + fid]]);
        const sl = await cs3Fill(fid, await pipe([1, 2, 3, 4, 5].map(i => ['GET', 'cs3:' + fid + ':' + i])));
        const cs0 = /^@[1-5]$/.test(String(cs || '')) ? sl[+String(cs).slice(1) - 1] : cs;
        const cl = ((await cmd('LRANGE', 'cheatlog', 0, 99)) || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(x => x && fid.startsWith(x.id));
        let live = null; try { const z = JSON.parse(lv || lp || 'null'); if (z) live = { n: z.n, age: z.age, r: z.r, x: z.x, st: z.st, sys: z.sys, feed: z.feed, t: z.t } } catch {}
        out.push({ id: fid.slice(0, 8), fid, lm, om, live, cs2: cs0 ? sum(cs0) : null, slots: sl.map(x => x ? sum(x) : null), cheater: ch, cheatlog: cl, ctok: !!ctk, acf: await cmd('GET', 'acf:' + fid), acp: await cmd('GET', 'acp:' + fid) });
      }
      if (qOf(req).h === '1') {
        const E = x => String(x == null ? '' : x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]), N = v => (+v || 0).toLocaleString('en-US', { maximumFractionDigits: 1 });
        const sv = (x, h) => x ? `<div class="b"><b>${h}: ${E(x.n)}</b> · อายุ ${N(x.age)} ปี · รุ่นที่ ${E(x.gen || 1)} · โลก ${x.xt ? 'เทพ' : x.xian ? 'เซียน' : 'มนุษย์'} · v${E(x.v)} · เซฟเมื่อ ${new Date(x.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}<br>⚔️ ${N(x.pow)} · ⭐ ${N(x.fame)} · 💰 ${N(x.money)} · 🌀 ${N(x.qi)} · 📖 ${N(x.int)} · 🌸 ${N(x.cha)} · อายุขัย ${N(x.ls)}${x.sys ? ` · ระบบ ${E(x.sys.t)} Lv.${E(x.sys.lv)}` : ''}${x.adm ? ' · 🛠️ใช้เครื่องมือแอดมิน' : ''}${x.tp ? ' · ⚠️ ' + E(x.tp) : ''}<br><small>สายตระกูล: ${(x.lin || []).map(l => E(l.n) + ' (' + E(l.a) + ')').join(' → ') || '-'}</small><details><summary>เหตุการณ์สำคัญ ${E(x.nkey)} รายการ</summary><small>${[...(x.k0 || []), '…', ...(x.k1 || [])].map(E).join('<br>')}</small></details></div>` : '';
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>ตรวจประวัติผู้เล่น</title><style>body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;padding:14px;max-width:760px;margin:auto;line-height:1.55}.b{background:#211d2a;border-radius:8px;padding:8px 10px;margin:8px 0;font-size:14px}small{color:#aaa}h2{font-size:16px}</style></head><body><h1>🔍 ตรวจประวัติผู้เล่น ${E(pre)}…</h1><p>พบ ${found.size} เครื่อง</p>${out.map(x => { const m = jp(x.lm) || jp(x.om) || {}; return `<h2>เครื่อง ${E(x.id)}… · ${E(m.d)} · ${E(m.b)} · ${E(m.c)} ${x.cheater ? '· 🚫 แบนแล้ว' : ''} ${x.acf ? '· ⚠️ ติดธง: ' + E(x.acf) : ''}</h2><small>${E(m.u || '')}</small>${x.live ? `<div class="b"><b>🔴 ภาพสดล่าสุด: ${E(x.live.n)}</b> · อายุ ${N(x.live.age)} · ⚔️ ${N(x.live.st && x.live.st.pow)} · ⭐ ${N(x.live.st && x.live.st.fame)} · 💰 ${N(x.live.st && x.live.st.money)}</div>` : ''}${sv(x.cs2, '☁️ เซฟคลาวด์ล่าสุด')}${x.slots.map((y, i) => y && (!x.cs2 || y.t !== x.cs2.t) ? sv(y, 'ช่องเซฟ ' + (i + 1)) : '').join('')}<div class="b"><button onclick="mvAcc('${E(x.fid)}',this)" style="padding:6px 10px;border-radius:8px;border:1px solid #6fd8ff;background:#123;color:#fff">📦 ย้ายตั๋วสุ่ม · VIP · ของแต่ง · เซฟคลาวด์ ไปไอดีใหม่</button></div>${x.cheatlog.length ? `<div class="b"><b>📋 ถูกตัดจากทำเนียบ</b><br>${x.cheatlog.map(c => `${E(c.n)} · อายุ ${N(c.age)} · คะแนน ${N(c.s)} · ${E(c.why)} · ${new Date(c.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}`).join('<br>')}</div>` : ''}`}).join('')}<script>async function mvAcc(f,b){const to=prompt('ไอดีใหม่ของผู้เล่น (รหัสอ้างอิง 8 ตัวขึ้นไป ดูได้จากหน้าสรุปชีวิตหรือหน้าโปรไฟล์ในเครื่องใหม่)');if(!to)return;if(!confirm('ย้ายของทั้งหมดจาก '+f.slice(0,8)+' ไป '+to+' ?'))return;b.disabled=true;try{const k=new URLSearchParams(location.search).get('key');const r=await fetch('/api/online?a=acmove&key='+encodeURIComponent(k)+'&f='+f+'&t='+encodeURIComponent(to.toLowerCase().trim()));const j=await r.json();alert(j.ok?('ย้ายแล้ว → '+j.to.slice(0,8)+'\\nตั๋วสุ่ม '+j.rr+' · VIP '+(j.vip?'มี':'-')+' · ของแต่ง '+j.cos+' · รายการสนับสนุน '+j.sup+' · เซฟคลาวด์ '+j.saves+' ช่อง\\nให้ผู้เล่นรีเฟรชเกม แล้วกู้เซฟจากเมนูเซฟคลาวด์'):('ไม่สำเร็จ: '+(j.err||'?')+(j.n?' ('+j.n+' ไอดี)':'')))}catch(e){alert('ผิดพลาด '+e)}b.disabled=false}</script></body></html>`);
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
    if (a === 'pacons') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      if (+(await cmd('SISMEMBER', 'cheaters', id))) return res.status(403).json({ err: 'ban' });
      const day = new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
      if ((await cmd('SET', 'pacd:' + id + ':' + day, 1, 'NX', 'EX', 86400 * 2)) !== 'OK') return res.json({ ok: 0, err: 'day' });
      const qn = +(await cmd('LLEN', 'pa:cq')) || 0; if (qn >= 30) return res.json({ ok: 0, err: 'full' });
      await cmd('LPUSH', 'pa:cq', JSON.stringify({ u: id, n: clean(b.n, 20) || 'พ่อค้านิรนาม', w: ['m', 'x', 'g'].includes(b.w) ? b.w : 'm', r: Math.max(2, Math.min(5, +b.r || 3)) }));
      return res.json({ ok: 1, q: qn + 1 });
    }
    if (a === 'paconcan') { // ถอนของที่ฝากขายซึ่งยังรอคิว (ยังไม่ขึ้นประมูล) คืน
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const L = (await cmd('LRANGE', 'pa:cq', 0, 99)) || []; let n = 0;
      for (const raw of L) { const o = jp(raw); if (o && o.u === id) { n += +(await cmd('LREM', 'pa:cq', 1, raw)) || 0 } }
      return res.json({ ok: 1, n });
    }
    if (a === 'paconst') {
      if (!okId(id)) return res.json({ l: [] });
      const [l] = await pipe([['LRANGE', 'pacs:' + id, 0, 19], ['DEL', 'pacs:' + id]]);
      return res.json({ l: (l || []).map(jp).filter(Boolean) });
    }
    if (a === 'djreg' || a === 'djfind' || a === 'djres' || a === 'djinfo') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      if (a === 'djreg') { const e = { n: clean(b.n, 20) || 'อาจารย์นิรนาม', s: clean(b.s, 20) || 'ศิษย์', p: Math.max(1, Math.min(1e7, Math.round(+b.p || 1))), tal: Math.max(1, Math.min(5, +b.tal || 1)), w: ['m', 'x', 'g'].includes(b.w) ? b.w : 'm', t: now }; await pipe([['HSET', 'dj:e', id, JSON.stringify(e)], ['ZADD', 'djz', e.p, id]]); return res.json({ ok: 1 }) }
      if (a === 'djinfo') { const [h] = await pipe([['HGETALL', 'djw:' + id], ['DEL', 'djw:' + id]]); const o = {}; if (Array.isArray(h)) for (let i = 0; i < h.length; i += 2) o[h[i]] = +h[i + 1]; else for (const k in (h || {})) o[k] = +h[k]; return res.json(o) }
      if (a === 'djfind') { const p = Math.max(1, +b.p || 1); let ids = (await cmd('ZRANGEBYSCORE', 'djz', Math.floor(p * .5), Math.ceil(p * 2), 'LIMIT', 0, 60)) || []; ids = ids.filter(x => x !== id); if (!ids.length) { ids = ((await cmd('ZRANGE', 'djz', 0, 80)) || []).filter(x => x !== id) } if (!ids.length) return res.json({ e: null }); const oid = ids[Math.floor(Math.random() * ids.length)]; const e = jp(await cmd('HGET', 'dj:e', oid)); if (!e || now - (e.t || 0) > 86400e3 * 30) return res.json({ e: null }); const tok = Math.random().toString(36).slice(2, 12); await cmd('SET', 'djt:' + tok, oid + '|' + id, 'EX', 3600); return res.json({ e: { n: e.n, s: e.s, p: e.p, tal: e.tal, w: e.w }, tok }) }
      const tk = String(b.tok || '').replace(/[^a-z0-9]/g, '').slice(0, 12); const v = await cmd('GET', 'djt:' + tk); if (!v) return res.json({ ok: 0 }); const [oid, me] = String(v).split('|'); if (me !== id) return res.json({ ok: 0 }); await cmd('DEL', 'djt:' + tk);
      await pipe([['HINCRBY', 'djw:' + oid, 'c', 1], ['HINCRBY', 'djw:' + oid, b.win ? 'l' : 'w', 1], ['EXPIRE', 'djw:' + oid, 86400 * 30]]); return res.json({ ok: 1 });
    }
    if (a === 'mpput' || a === 'mpboard') {
      const wk = Math.floor((now + 7 * 3600e3 - 4 * 86400e3) / (7 * 86400e3)), K = 'mpw:' + wk, N = 'mpn:' + wk;
      if (a === 'mpput') { if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' }); if (+(await cmd('SISMEMBER', 'cheaters', id))) return res.json({ ok: 0 }); if ((await cmd('SET', 'mprl:' + id, 1, 'NX', 'EX', 60)) !== 'OK') return res.json({ ok: 0 });
        const mp = Math.max(0, Math.min(1e7, Math.round(+b.mp || 0))); const prev = +(await cmd('ZSCORE', K, id)) || 0; if (mp > prev) await pipe([['ZADD', K, mp, id], ['HSET', N, id, JSON.stringify({ n: noAdm(clean(b.n, 20)) || 'มารนิรนาม', r: clean(b.r, 16), w: ['m', 'x', 'g'].includes(b.w) ? b.w : 'm' })], ['EXPIRE', K, 86400 * 15], ['EXPIRE', N, 86400 * 15]]); return res.json({ ok: 1 }) }
      const z = (await cmd('ZREVRANGE', K, 0, 19, 'WITHSCORES')) || []; const ids = []; for (let i = 0; i < z.length; i += 2) ids.push([z[i], +z[i + 1]]);
      const nm = ids.length ? await cmd('HMGET', N, ...ids.map(x => x[0])) : []; return res.json({ l: ids.map((x, i) => Object.assign({ mp: x[1] }, jp(nm[i]) || { n: 'มารนิรนาม' })) });
    }
    if (a === 'yvote') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16), v = Math.max(0, Math.min(3, Math.floor(+b.v || 0)));
      const [pub, own] = await pipe([['GET', 'lifep:' + lid], ['GET', 'lifeo:' + lid]]); if (pub !== '1' || !own) return res.json({ ok: 0, err: 'private' });
      const h = await cmd('HGETALL', 'yv:' + lid); const o = [0, 0, 0, 0]; if (Array.isArray(h)) for (let i = 0; i < h.length; i += 2) o[+h[i]] = +h[i + 1]; else for (const k in (h || {})) o[+k] = +h[k];
      if ((await cmd('SET', 'yvd:' + lid + ':' + id, 1, 'NX', 'EX', 86400 * 40)) === 'OK') await pipe([['HINCRBY', 'yv:' + lid, String(v), 1], ['EXPIRE', 'yv:' + lid, 86400 * 40]]);
      return res.json({ ok: 1, prev: o });
    }
    if (a === 'lifeview') {
      const lid = String(qOf(req).l || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const [pub, d, own] = await pipe([['GET', 'lifep:' + lid], ['GET', 'lifed:' + lid], ['GET', 'lifeo:' + lid]]);
      if (!d) return res.status(404).json({ err: 'notfound' });
      const admV = !!ADM_KEY && String(qOf(req).key || '') === ADM_KEY;
      if (pub !== '1' && own !== id && !admV) return res.status(403).json({ err: 'private' });
      const [kn, eu, kd, em] = await pipe([['GET', 'lvkn:' + lid], ['LRANGE', 'lveu:' + lid, 0, 19], ['EXISTS', 'lvkd:' + lid + ':' + id + ':' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10)], ['EXISTS', 'lvem:' + lid + ':' + id]]);
      const hs0 = new Set((await cmd('SMEMBERS', 'chat:hidden')) || []);
      const eul = (eu || []).map(jp).filter(x => x && !hs0.has(x.i)).map(x => ({ i: x.i, n: x.n, t: x.t, x: x.x, me: x.u === String(id).slice(0, 12) ? 1 : 0 }));
      const hc = await cmd('GET', 'lifeh:' + lid);
      return res.json({ d: JSON.parse(d), pu: pub === '2' ? '' : String(own || '').replace(/[^a-z0-9]/g, '').slice(0, 12), pub: pub === '1' ? 1 : 0, h: hc ? 1 : 0, mine: own === id ? 1 : 0, kn: +kn || 0, kd: +kd ? 1 : 0, eu: eul, em: +em ? 1 : 0 });
    }
    if (a === 'lvkneel' || a === 'lveu') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const [pub, own] = await pipe([['GET', 'lifep:' + lid], ['GET', 'lifeo:' + lid]]);
      if (!own) return res.status(404).json({ err: 'notfound' });
      if (pub !== '1') return res.status(403).json({ err: 'private' });
      if (own === id) return res.status(400).json({ err: 'self' });
      if (a === 'lvkneel') {
        const day = new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
        const ok = await cmd('SET', 'lvkd:' + lid + ':' + id + ':' + day, 1, 'NX', 'EX', 86400 * 2);
        if (ok !== 'OK') return res.json({ ok: 0, err: 'done', kn: +(await cmd('GET', 'lvkn:' + lid)) || 0 });
        const [kn] = await pipe([['INCR', 'lvkn:' + lid], ['EXPIRE', 'lvkn:' + lid, 86400 * 40]]);
        return res.json({ ok: 1, kn: +kn || 0 });
      }
      const [mu, bn] = await pipe([['EXISTS', 'mute:' + id], ['SISMEMBER', 'cheaters', id]]);
      if (+mu || +bn) return res.status(403).json({ err: 'muted' });
      const x = clean(b.x, 60); if (!x) return res.status(400).json({ err: 'empty' });
      const ok = await cmd('SET', 'lvem:' + lid + ':' + id, 1, 'NX', 'EX', 86400 * 40);
      if (ok !== 'OK') return res.json({ ok: 0, err: 'done' });
      const m = { i: 'e' + now.toString(36) + Math.random().toString(36).slice(2, 5), n: clean(b.n, 20) || 'ผู้ผ่านทาง', t: now, x, u: String(id).slice(0, 12) };
      await pipe([['LPUSH', 'lveu:' + lid, JSON.stringify(m)], ['LTRIM', 'lveu:' + lid, 0, 19], ['EXPIRE', 'lveu:' + lid, 86400 * 40]]);
      return res.json({ ok: 1, e: { i: m.i, n: m.n, t: m.t, x: m.x, me: 1 } });
    }

    const findLive = async (k2, adm) => { const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 330e3, '+inf']]); const f1 = (pub || []).find(x => x.slice(0, 6) + x.slice(-4) === k2); if (f1) return f1; if (adm) return (prv || []).find(x => x.slice(0, 6) + x.slice(-4) === k2) || null; return null };
    const RPC = [[120, 350, 800, 2200, 5500, 12000, 24000, 24000], [250, 900, 2500, 7000, 18000, 42000, 90000, 90000]];
    const powOk = (p, ri, x, age) => { ri = Math.max(0, Math.min(7, +ri || 0)); if (!(p >= 0) || !isFinite(p) || p > 1e16) return false; if (ri < 7 && p > RPC[x ? 1 : 0][ri] * 8 + 1000) return false; if (age != null && +age < 1000 && p > (x ? 60000 : 25000) * (1 + (+age || 1) / 8) + 300000) return false; return true };
    // v20: แบนเฉพาะที่แอดมินกดแบนเอง (cheaters) — ธงอัตโนมัติทุกแบบเป็นแค่ 'ข้อมูลให้แอดมินตรวจ' ไม่ตัดชีวิต/ไม่แบน (ค่าแปลกจากการเล่นจริงต้องไม่โดนลงโทษ)
    const isBanned = async () => !!+(await cmd('SISMEMBER', 'cheaters', id));
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
    if (a === 'pfget') {
      // รูปโปรไฟล์ของผู้เล่นหลายคนรวดเดียว (หน้าอันดับ/ดูสด/หอผู้ก่อตั้ง) · เฉพาะรูปที่ผ่านแล้ว
      const us = [...new Set(String(qOf(req).u || '').split(',').map(x => x.replace(/[^a-z0-9]/g, '').slice(0, 12)).filter(x => x.length >= 6))].slice(0, 40);
      if (!us.length) return res.json({ p: {} });
      const pv = await cmd('HMGET', 'prof', ...us), p = {};
      us.forEach((u, i) => { const o = pv[i] && jp(pv[i]); if (o && (o.av || o.fr)) p[u] = { av: o.av || '', fr: o.fr || '' } });
      return res.json({ p });
    }
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
      if (v.length >= 6) { const d = thDay(now); const hr = await pipe([['PFADD', 'hv:' + d + ':' + w, v], ['EXPIRE', 'hv:' + d + ':' + w, 86400 * 40], ['PFADD', 'hv:all:' + w, v]]);
        try { if (w === 'new' && +(hr && hr[0]) === 1) { const q = qOf(req), bad = /[^a-zA-Z0-9._-]/g, ct = String(req.headers['cf-ipcountry'] || req.headers['x-vercel-ip-country'] || '?').replace(bad, '').slice(0, 3) || '?', rf = String(q.r || '').replace(bad, '').slice(0, 40) || 'ตรง', tg = String(q.t || '').replace(bad, '').slice(0, 24), ua = String(req.headers['user-agent'] || ''), bt = /bot|crawl|spider|headless|preview/i.test(ua);
          if (!bt) await pipe([['HINCRBY', 'src:' + d, 'c:' + ct, 1], ['HINCRBY', 'src:' + d, 'r:' + rf, 1], ...(tg ? [['HINCRBY', 'src:' + d, 't:' + tg, 1]] : []), ['HINCRBY', 'src:' + d, 'n:all', 1], ['EXPIRE', 'src:' + d, 86400 * 40]]) } } catch { }
      }
      return res.json({ ok: 1 });
    }
    if (a === 'oneroll') {
      // ทอยลูกเต๋า「หนึ่งเดียวในนวนิยาย」ที่เซิร์ฟเวอร์ (กันแก้โค้ดฝั่งเครื่อง) · จำกัดความถี่ต่อไอดีและต่อ IP
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const day = new Date(now + 7 * 3600e3).toISOString().slice(0, 10), ipk = String(cip(req) || 'x').slice(0, 45);
      const [a1, a2, dn] = await pipe([['SET', 'onerl:' + id, 1, 'NX', 'PX', 15000], ['SET', 'onerip:' + ipk, 1, 'NX', 'PX', 4000], ['INCR', 'oned:' + id + ':' + day], ['EXPIRE', 'oned:' + id + ':' + day, 172800]]);
      if (a1 !== 'OK' || a2 !== 'OK' || +dn > 300) return res.json({ win: 0 });
      if (Math.random() < 1e-6) { await cmd('SET', 'onetk:' + id, 1, 'EX', 900); return res.json({ win: 1 }) }
      return res.json({ win: 0 });
    }
    if (a === 'oneborn') {
      // 🌟 หนึ่งเดียวในนวนิยาย (โอกาส 0.01% ตอนเกิด) — ประกาศในแชทโลก · เก็บสถิติ · เปิดสิทธิ์ป้ายในทำเนียบ
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      if (b.tp || await isBanned() || await cmd('SISMEMBER', 'cheaters', id)) return res.json({ ok: 0 });
      const [tk] = await pipe([['GET', 'onetk:' + id], ['DEL', 'onetk:' + id]]); if (!tk) return res.json({ ok: 0, err: 'roll' });
      if ((await cmd('SET', 'onecd:' + id, 1, 'NX', 'EX', 3600)) !== 'OK') return res.json({ ok: 0, err: 'cd' });
      const n = noAdm(clean(b.n, 20)) || 'นิรนาม', it = clean(b.it, 40) || 'ของเทพ', w = ['m', 'x', 'g'].includes(b.w) ? b.w : 'm';
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: 'ฟ้าลิขิต', k: 'one', x: '🌟 ' + n + ' ถือกำเนิดเป็น「หนึ่งเดียวในนวนิยาย」 พร้อม ' + it, on: n, oi: it, ow: w };
      const [cnt] = await pipe([['INCR', 'onecnt'], ['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199], ['LPUSH', 'oneh', JSON.stringify({ n, it, w, t: now })], ['LTRIM', 'oneh', 0, 49], ['SET', 'onex:' + id, 1, 'EX', 86400 * 60]]);
      return res.json({ ok: 1, cnt: +cnt || 0 });
    }
    if (a === 'laws') {
      // ⚖️ ผู้ครองกฎแห่งแดนเทพ — กฎหนึ่งสาย เจ้าของได้คนเดียวทั้งเซิร์ฟ
      const h = (await cmd('HGETALL', 'law')) || [], l = {};
      if (Array.isArray(h)) { for (let i = 0; i < h.length; i += 2) { const v = jp(h[i + 1]); if (v) l[h[i]] = v } } else for (const k in (h || {})) { const v = jp(h[k]); if (v) l[k] = v }
      const ks = Object.keys(l), LN2 = { blade: 'กฎคมดาบ', fist: 'กฎหมัดฝ่ามือ', fire: 'กฎเพลิง', frost: 'กฎเยือกแข็ง', thunder: 'กฎอัสนี', wind: 'กฎวายุ', death: 'กฎมรณะ', origin: 'กฎปฐมภูมิ' };
      if (ks.length) { const ids = await cmd('HMGET', 'lawid', ...ks); const ps = ids.some(Boolean) ? await cmd('MGET', ...ids.map(x => 'acp:' + (x || '-'))) : []; const ops = [];
        ks.forEach((k, i) => { const v = l[k], ap = jp(ps[i]); if (ap && +ap.p > 0) v.pn = Math.round(+ap.p); v.sh = v.pt && v.pt > now ? v.pt : 0;
          if (now - (v.t || now) >= 7 * 86400e3 && !v.a7) { v.a7 = 1; const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: 'ฟ้าลิขิต', k: 'one', x: '⚖️ ' + v.n + ' ครอง' + (LN2[k] || 'กฎ') + 'ต่อเนื่องครบ 7 วัน — ฟ้าดินยอมรับเป็นเจ้าแห่งกฎสายนี้' }; const v2 = Object.assign({}, v); delete v2.pn; delete v2.sh; ops.push(['HSET', 'law', k, JSON.stringify(v2)], ['LPUSH', 'chat', JSON.stringify(m)]) } });
        if (ops.length) await pipe([...ops, ['LTRIM', 'chat', 0, 199]]) }
      return res.json({ l });
    }
    if (a === 'cfg') {
      if (!isAdmKey(qOf(req).key) && !isAdmKey(b.key)) return res.status(403).json({ err: 'admin' });
      if (req.method === 'POST' && b.set && typeof b.set === 'object') {
        const ops = [];
        for (const k of Object.keys(CFG_DEF)) if (k in b.set) { const v = Math.round(+b.set[k]); if (!isFinite(v)) continue; ops.push(['HSET', 'cfg', k, Math.max(CFG_LIM[k][0], Math.min(CFG_LIM[k][1], v))]) }
        if (b.reset) ops.push(['DEL', 'cfg']);
        if (ops.length) await pipe(ops);
      } else if (b.reset) await cmd('DEL', 'cfg');
      return res.json({ ok: 1, cfg: await getCfg(true), def: CFG_DEF, lim: CFG_LIM });
    }
    if (a === 'lawclaim') {
      const LK = ['blade', 'fist', 'fire', 'frost', 'thunder', 'wind', 'death', 'origin'], LN = { blade: 'กฎคมดาบ', fist: 'กฎหมัดฝ่ามือ', fire: 'กฎเพลิง', frost: 'กฎเยือกแข็ง', thunder: 'กฎอัสนี', wind: 'กฎวายุ', death: 'กฎมรณะ', origin: 'กฎปฐมภูมิ' };
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      const k = String(b.law || ''); if (!LK.includes(k)) return res.status(400).json({ err: 'law' });
      if (b.tp || await isBanned() || await cmd('SISMEMBER', 'cheaters', id)) return res.json({ ok: 0 });
      const lp = jp(await cmd('GET', 'acp:' + id)); if (!lp || !(+lp.p > 0)) return res.json({ ok: 0, err: 'live' });
      const cur = jp(await cmd('HGET', 'law', k)), u = id.slice(0, 6), day = new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
      if (cur && cur.u !== u) {
        if (cur.pt && now < cur.pt) return res.json({ ok: 0, err: 'shield', until: cur.pt, cur });
        const rv = await cmd('GET', 'lawrv:' + k + ':' + u); if (rv && rv === cur.u) return res.json({ ok: 0, err: 'revenge', cur, until: +(await cmd('PTTL', 'lawrv:' + k + ':' + u)) + now });
        if (+(await cmd('GET', 'lawd:' + id + ':' + day)) >= 3) return res.json({ ok: 0, err: 'day' });
      }
      if ((await cmd('SET', 'lawcd:' + id, 1, 'NX', 'EX', 300)) !== 'OK') return res.json({ ok: 0, err: 'cd' });
      if (cur && cur.u !== u && String(b.beat || '') !== String(cur.t)) return res.json({ ok: 0, err: 'beat', cur });
      const n = noAdm(clean(b.n, 20)) || 'นิรนาม', art = clean(b.art, 30) || '', pw = Math.max(0, Math.min(+lp.p * 1.1, +b.pw || 0));
      const seize = cur && cur.u !== u, same = cur && cur.u === u;
      const v = { n, art, pw, t: same ? cur.t : now, u, pt: seize ? now + 3 * 3600e3 : (same ? cur.pt || 0 : 0), a7: same ? cur.a7 || 0 : 0 };
      const ops = [['HSET', 'law', k, JSON.stringify(v)], ['HSET', 'lawid', k, id]];
      if (seize) { const oid = await cmd('HGET', 'lawid', k); ops.push(['INCR', 'lawd:' + id + ':' + day], ['EXPIRE', 'lawd:' + id + ':' + day, 172800]); if (oid) ops.push(['SET', 'lawrv:' + k + ':' + cur.u, u, 'EX', 12 * 3600], ['LPUSH', 'lawlost:' + oid, JSON.stringify({ k, by: n, art, t: now })], ['LTRIM', 'lawlost:' + oid, 0, 9], ['EXPIRE', 'lawlost:' + oid, 86400 * 3]) }
      if (!same) {
        const first = !cur && (await cmd('HSETNX', 'lawfirst', k, now)) === 1;
        if (first || !cur) { const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: 'ฟ้าลิขิต', k: first ? 'one' : 'law', x: '⚖️ ' + n + ' จารึก' + LN[k] + 'ลงในฟ้าดิน' + (first ? 'เป็นคนแรกของโลก' : '') + ' ด้วย《' + art + '》' }; ops.push(['LPUSH', 'chat', JSON.stringify(m)]) }
        else {
          const cf = await getCfg();
          const gapOk = cf.lawnews && (cf.lawgap <= 0 || (await cmd('SET', 'lawng:' + k, 1, 'NX', 'EX', cf.lawgap)) === 'OK');
          if (gapOk) {
            const lm = cf.lawdig > 0 ? jp(await cmd('GET', 'lawdig')) : null, recent = lm && now - lm.t0 < cf.lawdig * 1000; const c = recent ? (lm.c || 1) + 1 : 1;
            const mins = Math.max(1, Math.round(cf.lawdig / 60));
            const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: 'ฟ้าลิขิต', k: 'law', x: '⚖️ ' + (c > 1 ? c + ' กฎเปลี่ยนมือในรอบ ' + mins + ' นาที · ล่าสุด ' + n + ' ชิง' + LN[k] : n + ' ชิง' + LN[k]) + 'จาก ' + cur.n + ' ด้วย《' + art + '》' };
            if (recent && lm.j) ops.push(['LREM', 'chat', 1, lm.j]); const mj = JSON.stringify(m); ops.push(['LPUSH', 'chat', mj]);
            if (cf.lawdig > 0) ops.push(['SET', 'lawdig', JSON.stringify({ j: mj, t0: recent ? lm.t0 : now, c }), 'EX', cf.lawdig + 60]);
          }
        }
        ops.push(['LTRIM', 'chat', 0, 199]);
      }
      await pipe(ops);
      return res.json({ ok: 1, pt: v.pt });
    }
    if (a === 'lawinbox') {
      if (!okId(id)) return res.json({ l: [] }); const [l] = await pipe([['LRANGE', 'lawlost:' + id, 0, 9], ['DEL', 'lawlost:' + id]]); return res.json({ l: (l || []).map(jp).filter(Boolean) });
    }
    if (a === 'kgates') {
      // 🚪 ประตูกัลป์ — วิชาที่ผู้ก้าวพ้นวัฏจักรกัลป์ทิ้งไว้
      const L = ((await cmd('LRANGE', 'kgate', 0, 19)) || []).map(jp).filter(Boolean);
      return res.json({ l: L });
    }
    if (a === 'kgate') {
      if (req.method !== 'POST' || !okId(id)) return res.status(400).json({ err: 'bad' });
      if (b.tp || await isBanned() || await cmd('SISMEMBER', 'cheaters', id)) return res.json({ ok: 0 });
      { const lp = jp(await cmd('GET', 'acp:' + id)); if (!lp || (+lp.a || 0) < 8e6) return res.json({ ok: 0, err: 'live' }) }
      if ((await cmd('SET', 'kgcd:' + id, 1, 'NX', 'EX', 3600)) !== 'OK') return res.json({ ok: 0, err: 'cd' });
      const n = noAdm(clean(b.n, 20)) || 'นิรนาม', art = clean(b.art, 48) || 'วิชาไร้นาม', kp = Math.max(0, Math.min(9, +b.kp || 0)), sk = ['rewind', 'void', 'mem', 'fly', 'array', 'esc', 'time', 'decree'].includes(b.sk) ? b.sk : '';
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: 'ฟ้าลิขิต', k: 'one', x: '🚪 ' + n + ' ก้าวพ้นวัฏจักรกัลป์ทั้งเก้า และจารึก《' + art + '》ไว้บนประตูกัลป์' };
      await pipe([['LPUSH', 'kgate', JSON.stringify({ n, art, kp, sk, t: now })], ['LTRIM', 'kgate', 0, 29], ['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199]]);
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
      if (LK_PK[String(b.lk || '')]) { rec.lk = String(b.lk); rec.msg = ('[🔒 ซื้อตั๋วล็อกชะตา ' + LK_PK[rec.lk][1] + ' ใบ · ' + LK_PK[rec.lk][0] + ' บาท] ' + rec.msg).slice(0, 240) }
      if (RR_PK[String(b.pk || '')]) { rec.pk = String(b.pk); rec.msg = ('[🎲 ซื้อสุ่มเกิด ' + RR_PK[rec.pk][1] + ' ครั้ง · ' + RR_PK[rec.pk][0] + ' บาท] ' + rec.msg).slice(0, 240) }
      if (VIP_PK[String(b.vp || '')]) { rec.vp = String(b.vp); const vx = VIP_PK[rec.vp]; rec.msg = ('[🏮 ' + VIP_NM[vx[1]] + ' · ' + vx[0] + ' บาท' + (vx[2] ? ' · ' + vx[2] + ' วัน' : ' · ถาวร') + '] ' + rec.msg).slice(0, 240) }
      const L = [['HSET', 'suppay', sid, JSON.stringify(rec)], ['ZADD', 'suppayz', now, sid], ['HINCRBY', 'supd:' + d0, 'paid', 1], ['EXPIRE', 'supd:' + d0, 86400 * 120]];
      if (hasImg) L.push(['SET', 'supimg:' + sid, img, 'EX', 86400 * 120]);
      await pipe(L); await supNote('💰 มีคนแจ้งว่าสนับสนุนแล้ว!', `${base.n} แจ้งโอน ${rec.amt ? rec.amt.toLocaleString('th-TH') + ' บาท' : '(ไม่ระบุยอด)'}${rec.pn ? ' · ชื่อบัญชี ' + rec.pn : ''}${rec.tm ? ' · เวลา ' + rec.tm : ''}${rec.img ? ' · มีสลิป' : ''}`); return res.json({ ok: 1, i: sid });
    }
    if (a === 'acsus') {
      if (req.method !== 'POST' || !okId(id)) return res.json({ ok: 0 });
      const why = String(b.why || '').replace(/[^a-z0-9-]/g, '').slice(0, 24); if (!why) return res.json({ ok: 0 });
      // ค่าที่ขึ้นเร็วจากการเล่นจริง (กระโดด/เกินเพดานแบบนุ่ม) ไม่บันทึก ไม่ติดธง — บันทึกเฉพาะการแก้ค่า/แก้ไฟล์
      if (/^(jump|cap|pow-age|srv-jump|score|stat)/.test(why)) return res.json({ ok: 1 });
      const fresh = await cmd('SET', 'acsr:' + id + ':' + why, 1, 'NX', 'EX', 3600); if (!fresh) return res.json({ ok: 1 });
      const st = b.st || {}, hard = /^console/.test(why) && !/^console-(hell|maxHp)/.test(why) ? +(await cmd('INCR', 'acfn:' + id)) >= 4 : false; if (/^console/.test(why)) await cmd('EXPIRE', 'acfn:' + id, 86400 * 14);
      const L = [['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(b.n || ''), 24), age: +b.age || 0, why, st: { pow: +st.pow || 0, fame: +st.fame || 0, money: +st.money || 0 }, t: now })], ['LTRIM', 'acsus', 0, 199]];
      // ธงแรง (console ซ้ำหลายครั้ง) เป็นข้อมูลให้แอดมินตรวจเท่านั้น — ไม่แบนอัตโนมัติ
      if (hard) L[0][2] = JSON.stringify(Object.assign(JSON.parse(L[0][2]), { hard: 1 }));
      await pipe(L); return res.json({ ok: 1 });
    }
    if (a === 'rgp') {
      const RG = ['home', 'capital', 'peak', 'forest', 'desert', 'sea', 'snow', 'jungle', 'forbid'], rg = RG.includes(b.rg) ? b.rg : 'home', L = [];
      if (okId(id)) { for (const r of RG) if (r !== rg) L.push(['ZREM', 'rgz:' + r, id]); L.push(['ZADD', 'rgz:' + rg, now, id], ['EXPIRE', 'rgz:' + rg, 86400]) }
      for (const r of RG) L.push(['ZREMRANGEBYSCORE', 'rgz:' + r, 0, now - 9e5], ['ZCARD', 'rgz:' + r]);
      const out = await pipe(L), cnt = out.slice(-RG.length * 2), c = {}; RG.forEach((r, i) => { c[r] = +cnt[i * 2 + 1] || 0 });
      return res.json({ c });
    }
    if (a === 'live') {
      b.spec = 0; // ดูคนอื่นเล่น: เปิดเฉพาะแอดมิน — ทุกคนเก็บแบบส่วนตัว (livep) ให้แอดมินดูได้อย่างเดียว
      try { const z = JSON.parse(String(b.s || 'null')); if (z && z.st && okId(id)) { const CAP = v => { v = +v || 0; return isFinite(v) ? Math.max(-1e30, Math.min(1e30, v)) : 0 }, p = CAP(z.st.pow), fm = CAP(z.st.fame), mn = CAP(z.st.money), ag = +z.age || 0; let why = '';
        const pv = jp(await cmd('GET', 'acp:' + id));
        const L = [['SET', 'acp:' + id, JSON.stringify({ n: z.n, a: ag, p }), 'EX', 86400 * 7]];
        if (why && !(await cmd('GET', 'acf:' + id))) { L.push(['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(z.n || ''), 24), age: ag, why, st: { pow: p, fame: fm, money: mn }, prev: pv, t: now })], ['LTRIM', 'acsus', 0, 199]); }
        await pipe(L) } } catch {}
      if (okId(id)) { try { const lm = uaMeta(req, now); lm.u = String(req.headers['user-agent'] || '').slice(0, 160); await cmd('HSET', 'lm', id, JSON.stringify(lm)) } catch {} }
      if (!b.spec) {
        const ps = String(b.s || '');
        if (ps && ps.length <= 60000) { try { JSON.parse(ps); const r0 = (await pipe([['HSET', 'livem', id, liveMeta(ps)], ['DEL', 'live:' + id], ['ZREM', 'livez', id], ['SET', 'livep:' + id, ps, 'EX', 360], ['ZADD', 'livezp', now, id], ['GET', 'logreq:' + id], ['ZCOUNT', 'watcha:' + id, now - 25e3, '+inf'], ['LLEN', 'mbox:' + id], ['LLEN', 'gbox:' + id]])).slice(1); return res.json({ w: 0, f: +r0[5] > 0 ? 1 : 0, lr: r0[4] ? 1 : 0, mb: (+r0[6] || 0) + (+r0[7] || 0) > 0 ? 1 : 0 }) } catch {} }
        await pipe([['HDEL', 'livem', id], ['DEL', 'live:' + id], ['ZREM', 'livez', id], ['DEL', 'livep:' + id], ['ZREM', 'livezp', id]]); return res.json({ w: 0 })
      }
      const snap = String(b.s || '');
      if (snap.length > 60000) return res.status(400).json({ err: 'size' });
      try { JSON.parse(snap) } catch { return res.status(400).json({ err: 'json' }) }
      const meta = liveMeta(snap);
      const [, , , , w] = await pipe([['SET', 'live:' + id, snap, 'EX', 70], ['ZADD', 'livez', now, id], ['DEL', 'livep:' + id], ['ZREM', 'livezp', id], ['ZCOUNT', 'watch:' + id, now - 25e3, '+inf'], ['HSET', 'livem', id, meta]]);
      const [lr, fa, mb1, mb2] = await pipe([['GET', 'logreq:' + id], ['ZCOUNT', 'watcha:' + id, now - 25e3, '+inf'], ['LLEN', 'mbox:' + id], ['LLEN', 'gbox:' + id]]);
      let ex = {}; try { const z = JSON.parse(snap), ck = z.ch && String(z.ch.k || '').replace(/[^a-z0-9]/g, '').slice(0, 12);
        const [rx, , vt] = await pipe([['HGETALL', 'lrx:' + id], ['DEL', 'lrx:' + id], ['HGETALL', 'lvote:' + id + ':' + (ck || '-')]]);
        const hm = h => { const o = {}; if (Array.isArray(h)) for (let i = 0; i < h.length; i += 2) o[h[i]] = +h[i + 1]; else for (const k in (h || {})) o[k] = +h[k]; return o };
        ex = { rx: hm(rx), vt: hm(vt), vk: ck || '' };
        const R = z.res; if (R && R.k) { const rk = String(R.k).replace(/[^a-z0-9]/g, '').slice(0, 12); if ((await cmd('SET', 'lbr:' + id + ':' + rk, 1, 'NX', 'EX', 7200)) === 'OK') { const mem = (await cmd('SMEMBERS', 'lbs:' + id + ':' + rk)) || []; const nm = clean(z.n, 20), ops = []; mem.forEach(m => { const [vw, p] = String(m).split('|'); if (okId(vw)) ops.push(['LPUSH', 'lbw:' + vw, JSON.stringify({ n: nm, ok: (+p === 1) === !!R.w ? 1 : 0, ev: clean(R.ev, 30), t: now })], ['LTRIM', 'lbw:' + vw, 0, 19], ['EXPIRE', 'lbw:' + vw, 86400]) }); if (ops.length) await pipe(ops) } } } catch {}
      return res.json(Object.assign({ w: w || 0, f: (+w > 0 || +fa > 0) ? 1 : 0, lr: lr ? 1 : 0, mb: (+mb1 || 0) + (+mb2 || 0) > 0 ? 1 : 0 }, ex));
    }
    if (a === 'csave') {
      const tk = String(b.tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20), d = String(b.d || '');
      if (tk.length < 8 || !d || d.length > 900000) return res.status(400).json({ err: 'bad' });
      const sl = Math.max(1, Math.min(5, parseInt(b.sl, 10) || 1));
      try {
        await cmd('SET', 'ctok:' + id, tk, 'NX');
        const tok = await cmd('GET', 'ctok:' + id);
        if (tok !== tk) return res.status(403).json({ err: 'token' });
        // เขียนทับเลย ไม่ลบของเก่าก่อน — ถ้าฐานข้อมูลเต็ม เซฟเก่าบนคลาวด์ต้องไม่หาย
        const packed = zPack(saveTrim(d)); let inR2 = false;
        if (r2Bkt()) { try { await r2Bkt().put(r2Key(id, sl), packed, { customMetadata: { t: String(now) } }); inR2 = true } catch (e) { console.error('API_ERR csave r2', String(e && e.message || e)) } }
        if (inR2) await pipe([['DEL', 'cs3:' + id + ':' + sl], ['SET', 'cs2:' + id, '@' + sl, 'EX', 86400 * 90], ['EXPIRE', 'ctok:' + id, 86400 * 90]]); // เซฟอยู่ใน R2 แล้ว → ปล่อย RAM ของก้อนเก่าใน Valkey
        else await pipe([['SET', 'cs3:' + id + ':' + sl, packed, 'EX', 86400 * 90], ['SET', 'cs2:' + id, '@' + sl, 'EX', 86400 * 90], ['EXPIRE', 'ctok:' + id, 86400 * 90]]);
      } catch (e) { if (/OOM/i.test(String(e && e.message))) { OOM_AT = Date.now(); return res.status(503).json({ err: 'full' }) } throw e }
      // ฝาก id/token ไว้ใน cookie ที่ตั้งจากเซิร์ฟเวอร์ (HttpOnly) — Safari ลบ localStorage ทิ้งหลังไม่ได้เข้าเว็บ 7 วัน แต่ cookie นี้อยู่ต่อ ใช้กู้เซฟผ่าน ?a=cme
      if (okId(id)) res.setHeader('Set-Cookie', 'mc=' + id + '.' + tk + '; Path=/api; Max-Age=' + 86400 * 90 + '; HttpOnly; Secure; SameSite=Lax');
      return res.json({ ok: 1 });
    }
    // ซิงค์ข้อมูลผู้เล่นทั้งก้อนข้ามเครื่อง (เฉพาะบัญชีที่เชื่อม Google แล้ว) — เก็บ 1 ก้อนต่อบัญชี · ต้องมี token เซฟคลาวด์ตรงกัน
    if (a === 'psput' || a === 'psget') {
      const tk = String(b.tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      if (tk.length < 8) return res.status(400).json({ err: 'bad' });
      const [tok, gk] = await pipe([['GET', 'ctok:' + id], ['GET', 'gof:' + id]]);
      if (!tok || tok !== tk) return res.status(403).json({ err: 'token' });
      let linked = false; if (gk) { const cur = jp(await cmd('GET', gk)); linked = !!(cur && cur.id === id) }
      if (!linked) return res.status(403).json({ err: 'nolink' });
      if (a === 'psget') {
        let v = r2Bkt() ? await r2Get(id, 'pf') : null; if (v == null) v = await cmd('GET', 'pf:' + id);
        if (v == null) return res.json({ none: 1 });
        const o = jp(zUnpack(v)); if (!o || !o.d) return res.json({ none: 1 });
        return res.json({ ok: 1, d: o.d, z: o.z ? 1 : 0, t: o.t || 0, n: o.n || 0 });
      }
      const d = String(b.d || '');
      if (!d || d.length > 4200000) return res.status(400).json({ err: 'big' });
      if (!(await cmd('SET', 'pfth:' + id, 1, 'NX', 'EX', 6))) return res.status(429).json({ err: 'rate' });
      const packed = zPack(JSON.stringify({ d, z: b.z ? 1 : 0, n: Math.min(9999, +b.n || 0), t: now })); let inR2 = false;
      try {
        if (r2Bkt()) { try { await r2Bkt().put(r2Key(id, 'pf'), packed, { customMetadata: { t: String(now) } }); inR2 = true } catch (e) { console.error('API_ERR psput r2', String(e && e.message || e)) } }
        if (inR2) await cmd('DEL', 'pf:' + id); else await cmd('SET', 'pf:' + id, packed, 'EX', 86400 * 365);
      } catch (e) { if (/OOM/i.test(String(e && e.message))) { OOM_AT = Date.now(); return res.status(503).json({ err: 'full' }) } throw e }
      return res.json({ ok: 1, t: now });
    }
    if (a === 'profile') {
      // รูปตัวละครจากเกม (PNG 56×62) ขึ้นได้ทันที · รูปที่อัปโหลดเอง (JPEG/WebP) ต้องรอแอดมินตรวจก่อนคนอื่นจะเห็น
      let av = String(b.av || ''), alt = String(b.alt || ''); const up = b.up ? 1 : 0, pu = id.slice(0, 12); let fr = String(b.fr || '').replace(/[^a-z0-9_]/g, '').slice(0, 20);
      fr = await frSrv(id, fr, isAdmKey(b.key)); // กรอบ: ต้องมีสิทธิ์จริงฝั่งเซิร์ฟเวอร์ (แอดมิน/VIP/ร้านค้า/อีเวนต์/ซีซัน/ภารกิจ/ลาน)
      const pfBad = !(await avSrv(id, b.pf, isAdmKey(b.key))); // รูปโปรไฟล์ร้านค้า/ซีซันที่ยังไม่ได้ซื้อ → ไม่เผยแพร่รูป
      const isUp = /^data:image\/(jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(av);
      if (isUp && !isAdmKey(b.key)) return res.status(403).json({ err: 'noup' }); // อัปโหลดรูปเองปิดไว้ — เฉพาะแอดมิน
      let imgBad = 0; // รูปตัวละครใหญ่เกินเกณฑ์ (ตัวละครลายละเอียดมาก) → ไม่ปฏิเสธทั้งคำขอ เก็บกรอบให้ก่อน แล้วบอกหน้าเว็บให้ย่อรูปส่งใหม่
      if (av && (av.length > 12000 || !(avSnapOk(av) || isUp))) { av = ''; imgBad = 1 }
      if (alt && (alt.length > 8000 || !avSnapOk(alt))) { alt = ''; imgBad = 1 }
      let pend = 0;
      if (up && isUp) {
        if (await cmd('GET', 'avban:' + id)) return res.status(403).json({ err: 'avban' });
        const cur = jp(await cmd('HGET', 'avok', pu));
        if (cur && cur.av === av) { await pipe([['HSET', 'prof', pu, JSON.stringify({ av, fr })], ['HDEL', 'avq', pu]]); return res.json({ ok: 1, st: 'ok' }) }
        await cmd('HSET', 'avq', pu, JSON.stringify({ av, t: now, n: noAdm(clean(b.n, 20)) || 'นิรนาม', id }));
        pend = 1;
      } else await cmd('HDEL', 'avq', pu);
      let pub = pfBad ? '' : avSnapOk(av) ? av : (alt || '');
      if (imgBad && !pub) { const cur0 = jp(await cmd('HGET', 'prof', pu)); pub = (cur0 && cur0.av) || '' }
      await cmd('HSET', 'prof', pu, JSON.stringify({ av: pub, fr, pend }));
      return res.json({ ok: 1, st: pend ? 'pend' : 'ok', img: imgBad ? 0 : 1 });
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
        const m = { i: ann.i, t: now, n: ann.n, ti: 'ผู้ดูแล', x: '@everyone ' + body, k: 'ann', ad: 1, poll: ann.poll, u: String(id || '').slice(0, 4), pu: String(id || '').slice(0, 12) };
        await pipe([['SET', 'ann', JSON.stringify(ann), 'EX', 86400 * 3], ['LPUSH', 'annh', JSON.stringify(ann)], ['LTRIM', 'annh', 0, 29], ['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199]]);
        let pr = null; if (b.push !== 0) { try { pr = await withCap(pushHashes(await cmd('HKEYS', 'push'), { t: '📢 ประกาศจากผู้ดูแล', b: body.slice(0, 160), u: '/?go=chat', g: 'ann-' + ann.i }), 20000) } catch (e) {} }
        return res.json({ ok: 1, ann: await annPoll(ann, id), push: pr });
      }
      const isA = isAdmKey(b.key);
      const x = isA ? String(b.x || '').replace(/[\u0000-\u001f<>]/g, '').slice(0, 400).trim() : clean(b.x, 200);
      if (!x) return res.status(400).json({ err: 'empty' });
      const cfg0 = await getCfg();
      const [mu, ok, chx, rkh] = await pipe([['GET', 'mute:' + id], isA ? ['SET', 'rl:' + id, 1, 'NX', 'PX', 800] : (cfg0.chatcd > 0 ? ['SET', 'rl:' + id, 1, 'NX', 'PX', cfg0.chatcd] : ['SET', 'rl:' + id, 1, 'PX', 1]), ['SISMEMBER', 'cheaters', id], ['HGETALL', 'rkttl:' + id]]);
      if (mu) return res.status(429).json({ err: 'muted' });
      if (!ok) return res.status(429).json({ err: 'rate', cd: isA ? 800 : cfg0.chatcd });
      if (!isA && b.k !== 'share') { let hh = 0; for (let q = 0; q < x.length; q++) hh = (hh * 31 + x.charCodeAt(q)) | 0; const dk = await cmd('SET', 'dup:' + id + ':' + (hh >>> 0).toString(36), 1, 'NX', 'PX', 45000); if (!dk) return res.status(429).json({ err: 'dup' }) }
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: noAdm(clean(b.n, 20)) || 'นิรนาม', ti: noAdm(clean(b.ti, 24)), ...((b.tp || +chx) ? { tt: '', tr: 0 } : rkOk(b.tt, rkh) || (isAdmKey(b.key) && RKT_ALL.has(String(b.tt || '')) ? { tt: String(b.tt), tr: RKT_TR[RKT_ALL.get(String(b.tt)).p] || 7 } : null) || ttlOk(b.tt, b.tr)), x, k: b.k === 'share' ? 'share' : 'msg', u: id.slice(0, 4), pu: id.slice(0, 12) };
      if (isA) m.ad = 1;
      if (!b.nsp) { try { if (+(await cmd('SISMEMBER', 'supok', id))) m.sp = 1 } catch {} }
      try { const vj = jp(await cmd('GET', 'vip:' + id)), vt = vipTier(vj); if (vt) { m.vp = vt; if (vj.tt && (vt === 3 || VIP_TT.includes(vj.tt))) m.vq = String(vj.tt).slice(0, 20) } } catch {}
      try { const cq = jp(await cmd('GET', 'cosq:' + id)); if (cq) { if (cq.t) m.ct = cq.t; if (cq.c) m.cc = cq.c; if (cq.n && /^t_e/.test(cq.t || '')) m.cn = cq.n } } catch {}
      if (vipCosN(m.ct) > (m.vp | 0)) delete m.ct; if (vipCosN(m.fr) > (m.vp | 0)) m.fr = '';
      try { const sp0 = jp(await cmd('HGET', 'supp', id)); if (sp0 && sp0.cb && !sp0.hide && sp0.tier != null) m.st = Math.max(0, Math.min(4, sp0.tier | 0)) } catch {}
      if (/^ตำนานลานซีซั่น \d{1,4}$/.test(String(b.tt || '')) && !m.tt) { const wv0 = jp(await cmd('HGET', 'arwal', id)); if (isAdmKey(b.key) || (wv0 && wv0.own && (wv0.own.tt || []).includes(String(b.tt)))) { m.tt = String(b.tt); m.tr = 6 } }
      if (['นักล่าเงา', 'ผู้ไม่เคยถอย', 'ตำนานแห่งลาน', 'ราชันเงาอสูร', 'เทพสงครามแห่งลาน', 'ผู้ยืนหนึ่งเหนือพันศึก', 'จักรพรรดิแห่งเงา', 'ผู้ไต่ลานทองคำ', 'เพชรแห่งลานเงา', 'จ้าวลานประลอง', 'ปรมาจารย์ผู้ไร้เงา', 'ราชันหมื่นเงา', 'เทพยุทธ์แห่งยุค'].includes(m.tt) && !isAdmKey(b.key)) { const wv = jp(await cmd('HGET', 'arwal', id)); if (wv && wv.own && !(wv.own.tt || []).includes(m.tt)) { m.tt = ''; m.tr = 0 } }
      // แชร์การปลดปล่อยพลัง: แนบข้อมูลฉาก pixel (ตัวเลข/สี/คำสั้นๆ เท่านั้น) ให้คนอื่นเล่นซ้ำในแชทได้
      if (m.k === 'share' && b.rl && typeof b.rl === 'object') {
        try {
          const cs = (v, d) => { if (d > 4) return null; if (typeof v === 'number') return isFinite(v) ? v : 0; if (typeof v === 'boolean') return v; if (typeof v === 'string') return v.replace(/[^\w#.,%() \u0E00-\u0E7F-]/g, '').slice(0, 40); if (Array.isArray(v)) return v.slice(0, 24).map(x => cs(x, d + 1)); if (v && typeof v === 'object') { const o = {}; Object.keys(v).slice(0, 40).forEach(k2 => { if (/^[A-Za-z0-9_]{1,16}$/.test(k2)) { const r = cs(v[k2], d + 1); if (r != null) o[k2] = r } }); return o } return null };
          const rl = cs(b.rl, 0);
          if (rl && JSON.stringify(rl).length <= 2600) m.rl = rl;
        } catch (e) {}
      }
      let tagTo = null;
      const admTo = isAdmKey(b.key);
      if (b.to) { const pu0 = String(b.to).replace(/[^a-z0-9]/g, '').slice(0, 12); if (pu0.length === 12 && pu0 !== m.pu) { m.to = pu0; m.ton = noAdm(clean(b.ton, 20)) || ''; m.re = String(b.re || '').replace(/[^a-z0-9]/g, '').slice(0, 20); const rx = clean(b.rx, 60); if (rx) m.rx = rx; tagTo = await cmd('HGET', 'pupid', pu0) } }
      { const wr = await pipe([['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199], ['HSET', 'pupid', id.slice(0, 12), id]]); if (!wr || typeof wr[0] !== 'number') return res.status(503).json({ err: 'full' }) }
      if (tagTo && okId(tagTo)) { try { const ev = JSON.stringify({ i: m.i, n: m.n, x: m.x.slice(0, 160), t: now, ...(admTo ? { a: 1 } : {}) }); await pipe([['LPUSH', 'tagq:' + tagTo, ev], ['LTRIM', 'tagq:' + tagTo, 0, 9], ['EXPIRE', 'tagq:' + tagTo, 86400 * 14]]); const pOk = admTo || await cmd('SET', 'trp:' + id.slice(0, 12) + ':' + tagTo.slice(0, 12), 1, 'NX', 'PX', 120000); const hs = pOk ? await cmd('SMEMBERS', 'push:id:' + tagTo) : null; if (hs && hs.length) await withCap(pushHashes(hs, { t: admTo ? '💬 ผู้ดูแลตอบคุณในแชท' : '💬 ' + m.n + ' ตอบกลับคุณในแชท', b: m.x.slice(0, 160), u: '/?go=chat', g: 'tag-' + m.i }), 8000) } catch (e) {} }
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
      // ค่าที่โตเกินเพดาน (พลัง/เงิน ฯลฯ ทบกันหลายกัลป์) → ปรับลงเป็นเพดานแล้วรับคะแนนตามปกติ ไม่ตัดทิ้ง
      try { const D0 = JSON.parse(String(b.det || 'null')); if (D0 && typeof D0 === 'object') { let ch = 0; const fx = (o, k) => { const v = o[k]; if (typeof v === 'number' && Math.abs(v) > 1e30) { o[k] = v > 0 ? 1e30 : -1e30; ch = 1 } };
        if (D0.st && typeof D0.st === 'object') for (const k of Object.keys(D0.st)) fx(D0.st, k); fx(D0, 'kc'); fx(D0, 'an'); if (ch) b.det = JSON.stringify(D0) } } catch {}
      const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const e = { n: clean(b.n, 20) || 'นิรนาม', s: Math.max(0, Math.min(1e12, +b.s || 0)), age: +b.age || 0, r: clean(b.r, 30), f: clean(b.f, 30), c: clean(b.c, 60), x: b.x ? 1 : 0, g: b.g ? 1 : 0, ga: Math.max(0, Math.min(1e9, Math.round(+b.ga || 0))), ...(b.tp ? { tt: '', tr: 0 } : ttlOk(b.tt, b.tr)), xa: Math.max(0, Math.min(1e9, Math.round(+b.xa || 0))), cu: b.cu ? 1 : 0, bm: b.bm ? 1 : 0, kl: Math.max(0, Math.min(9, Math.floor(+b.kl || 0))), t: now, lid };
      { const c0 = String(b.ch || ''); if (CH_OK.includes(c0) && !(c0 === 'short' && e.age > 31)) e.ch = c0 }
      if (b.one && okId(id) && await cmd('GET', 'onex:' + id)) e.one = 1;
      // 🔒 จำนวนกัลป์ต้องเข้ากับอายุ (กัลป์ที่ n เริ่มเมื่ออายุราว n ล้านปี)
      if (e.kl > 0 && e.kl > Math.floor((+e.age || 0) / 1e6)) { try { await pipe([['LPUSH', 'acsus', JSON.stringify({ fid: id, n: e.n, age: e.age, why: 'srv-kl', kl: e.kl, t: now, info: 1 })], ['LTRIM', 'acsus', 0, 199]]) } catch {} e.kl = Math.floor((+e.age || 0) / 1e6) }
      try { const dk = 'lifeday:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10); await pipe([['INCR', dk], ['EXPIRE', dk, 86400 * 90]]) } catch {}
      try { e.s = bdScore(JSON.parse(String(b.det || '{}')), e) } catch { e.s = 0 }
      if (e.ch === 'hell') { const hl = Math.max(0, Math.min(100, Math.floor(+b.hl || 0))), cs0 = [20, 40, 60, 80].includes(+b.hcs) ? +b.hcs : 0, hb = okId(id) ? +(await cmd('GET', 'hlb:' + id)) || 0 : 0, cs = cs0 && cs0 <= hb ? cs0 : 0, ag = +e.age || 0;
        const minAge = cs ? 16 + Math.max(0, hl - cs - 1) : hl <= 18 ? 16 + 6 * Math.max(0, hl - 1) : 16 + 6 * 17 + (hl - 19); e.hl = hl === 0 || (ag >= minAge && (!cs0 || cs)) ? hl : 0;
        // 🔒 v17.10.1: ตรวจบันทึกชั้นนรกที่ผ่านจริง (ชั้น 19 ขึ้นไป) — ต้องเรียงต่อกันทีละชั้น อายุไม่ย้อน บอสทุก 10 ชั้น และประตูไม่ต้องสู้ไม่เกิน 1 ใน 3
        if (e.hl > 18 && now > Date.UTC(2026, 10, 16, 17)) { let okL = false, why = 'hlog';
          try { const D0 = JSON.parse(String(b.det || '{}')), G = Array.isArray(D0.hlg) ? D0.hlg : null, st = Math.max(18, cs || 0);
            if (G && D0.hlv) { const L0 = G.filter(x => Array.isArray(x) && +x[0] > st).map(x => [+x[0], +x[1], +x[2]]); let ok = L0.length === e.hl - st, free = 0, run = 0;
              for (let i = 0; ok && i < L0.length; i++) { const [n, a0, k] = L0[i]; if (n !== st + 1 + i) { ok = false; why = 'hlog-seq'; break } if (i && a0 < L0[i - 1][1]) { ok = false; why = 'hlog-age'; break } if ((n % 10 === 0 || n === 100) && k !== 3) { ok = false; why = 'hlog-boss'; break } if (k === 0) { free++; if (run > 0) { ok = false; why = 'hlog-free'; break } run = 2 } else run = Math.max(0, run - 1) }
              if (ok && L0.length && L0[L0.length - 1][1] > ag + 1) { ok = false; why = 'hlog-age2' } okL = ok } }
          catch {}
          if (!okL) { try { await pipe([['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(e.n || ''), 24), age: ag, why, hl: e.hl, t: now, info: 1 })], ['LTRIM', 'acsus', 0, 199]]) } catch {} e.hl = Math.min(e.hl, Math.max(18, cs || 0)) } } if (cs) e.hcs = cs; if (okId(id) && e.hl > hb) await cmd('SET', 'hlb:' + id, e.hl, 'EX', 86400 * 400)
        // 🕳️ อเวจี 1000 ชั้น: ต้องเคยผ่านนรก 100 · เริ่มลึกได้เฉพาะต้นวงที่เคยถึง · ลงได้ปีละไม่เกิน 1 ชั้น
        if (b.ab) { e.hl = 0; const al = Math.max(0, Math.min(1000, Math.floor(+b.al || 0))), acs0 = Math.max(0, Math.min(900, Math.floor((+b.acs || 0) / 100) * 100)), ab0 = okId(id) ? +(await cmd('GET', 'alb:' + id)) || 0 : 0, acs = acs0 && acs0 <= ab0 ? acs0 : 0;
          const okU = hb >= 100 || ab0 > 0, minA = 16 + Math.max(0, al - acs - 1); e.al = okU && al > 0 && ag >= minA && (!acs0 || acs) ? al : 0; if (acs) e.acs = acs;
          if (okId(id) && e.al > ab0) await cmd('SET', 'alb:' + id, e.al, 'EX', 86400 * 400) } }
      let ejC = null; if (e.ch === 'hell') { try { const hs = Math.max(0, Math.min(999999, Math.round(+e.s || 0))); ejC = JSON.stringify(Object.assign({}, e, { s: (e.al ? 100 + e.al : +e.hl || 0) * 1e6 + hs, hs, hd: 2 })) } catch {} }
      if (e.ch === 'soul') { try { const lv = Math.max(0, Math.min(100, Math.floor(+b.sl || 0))), ag = +e.age || 0, hs = Math.max(0, Math.min(999999, Math.round(+e.s || 0))); e.sl = Math.max(0, Math.min(lv, ag - 6)); const sr0 = Math.floor(+b.sr); e.sr = isFinite(sr0) ? Math.max(-1, Math.min(8, sr0)) : -1; if (e.sr >= 5 && ag < 6) e.sr = 4; ejC = JSON.stringify(Object.assign({}, e, { s: hs, hs, hd: 3 })) } catch {} }
      if (e.ch === 'short') { try { ejC = JSON.stringify(Object.assign({}, e, { s: e.s })) } catch {} }
      if (e.ch === 'sky') { try { const ag = +e.age || 0, hs = Math.max(0, Math.min(999999, Math.round(+e.s || 0))); let rk = Math.floor(+b.skr); rk = isFinite(rk) ? Math.max(-1, Math.min(35, rk)) : -1; if (ag < 12) rk = -1; const sb = Math.max(0, Math.min(10, Math.floor(+b.sks || 0))); e.skr = rk; e.sks = rk >= 0 ? sb : 0; ejC = JSON.stringify(Object.assign({}, e, { s: hs, hs })) } catch {} }
      if (/^mw_/.test(e.ch || '')) { try { e.mw = e.ch.slice(3); const hs = Math.max(0, Math.round(+e.s || 0)); ejC = JSON.stringify(Object.assign({}, e, { s: hs, hs })) } catch {} }
      if (e.ch === 'regress') { try { const D0 = JSON.parse(String(b.det || '{}')), G = D0.rg || {}, rl = Math.max(1, Math.min(999, Math.floor(+G.loop || 1))), rf = G.free && (+e.age || 0) >= 15 ? 1 : 0; e.rl = rl; e.rf = rf; const vn = { r5: ' ⏪', nomem: ' 🧠', lim10: ' 🔟' }[String(G.var || '')] || ''; e.c = (rf ? '🔁 หลุดพ้นวงจรใน ' + rl + ' รอบ' : '🔁 ย้อนกาล ' + rl + ' รอบ') + vn + (e.c ? ' · ' + e.c : ''); e.c = e.c.slice(0, 80); ejC = JSON.stringify(Object.assign({}, e, { s: (rf ? 5e8 - rl * 1e6 : 0) + Math.min(4e8, bdScore(D0, e)), rg: 1 })) } catch {} }
      const cat = bdCat(e), ej = JSON.stringify(e), L = [['INCR', 'lives']];
      let rjB = null; if (e.ch === 'regress' && e.rf) { try { const G0 = (JSON.parse(String(b.det || '{}')).rg) || {}, en0 = ['breaker', 'protector', 'lonely'].includes(G0.end) ? G0.end : 'lonely', vr0 = ['normal', 'r5', 'nomem', 'lim10'].includes(G0.var) ? G0.var : 'normal'; rjB = Object.assign({}, e, { end: en0, var: vr0, s: ({ breaker: 3, protector: 2, lonely: 1 })[en0] * 1e8 - Math.min(999, e.rl || 1) * 1e5 + ({ lim10: 3, nomem: 2, r5: 1, normal: 0 })[vr0] * 1e4 }) } catch {} }
      if (e.ch === 'junk') { try { ejC = JSON.stringify(Object.assign({}, e, { s: e.s })) } catch {} }
      if (e.ch === 'regress' && !rjB) { try { rjB = Object.assign({}, e, { nf: 1, s: Math.min(9e8, +e.s || 0) - 1e9 }) } catch {} }
      // v17.12: โหมดท้าทายขึ้นเฉพาะทำเนียบของโหมดตัวเอง (ไม่ปนทำเนียบโลก) · ทุกโหมดใช้คะแนนเฉลี่ยทุกด้านแบบโหมดปกติ
      const mainC = e.ch === 'regress' ? 'r' : e.ch && CHC[e.ch] ? CHC[e.ch] : cat; let mainJ = ej;
      for (const cc of [mainC]) { if (cc === 'r') { if (!rjB) continue; const jj = JSON.stringify(rjB); mainJ = jj; for (const [kk, ex] of [[bdKey('r', now), 4], [bdKeyW('r', now), 20], [bdKeyM('r', now), 70]]) L.push(['ZADD', kk, rjB.s, jj], ['ZREMRANGEBYRANK', kk, 0, -101], ['EXPIRE', kk, 86400 * ex]); continue } const useC = CHF[cc] && ejC, sv = useC ? JSON.parse(ejC).s : e.s, jj = useC ? ejC : ej; mainJ = jj; for (const [kk, ex] of [[bdKey(cc, now), 4], [bdKeyW(cc, now), 20], [bdKeyM(cc, now), 70]]) L.push(['ZADD', kk, sv, jj], ['ZREMRANGEBYRANK', kk, 0, -101], ['EXPIRE', kk, 86400 * ex]) }
      await bdSettle();
      if (e.cu || !(parseFloat(b.ver) >= 6.3)) { await cmd('INCR', 'lives'); return res.json({ ok: 1, skip: 1, why: e.cu ? 'cu' : 'old' }) }
      const det = String(b.det || '');
      // ---- anti-cheat: ตรวจความสมเหตุสมผลของคะแนนและค่าสถานะ ----
      let bad = '';
      try {
        let tpInfo = b.tp ? 'tamper:' + clean(String(b.tp), 40) : '';
        if (!bad && parseFloat(b.ver) >= 9.5 && !det) bad = 'nodet';
        if (!bad && det) {
          const D = JSON.parse(det), st = D.st || {}, kids = (D.kids || []).length, dis = +((String(D.sect || '').match(/ศิษย์\s*([0-9]+)/) || [])[1] || 0);
          const pw = +st.pow || 0, fm = +st.fame || 0, mn = +st.money || 0, ag = Math.max(1, +e.age || 1);
          const BIG = v => !isFinite(v) || v > 1e300; // ช่วงท้ายเกม (แดนเทพ/กัลป์) ค่าโตมากได้จริง — ตัดเฉพาะค่าพัง if (BIG(+st.int || 0) || BIG(+st.cha || 0) || BIG(fm) || BIG(mn) || kids > 1e7 || BIG(dis) || BIG(pw)) bad = 'stat';
          const powCap = ((e.x ? 60000 : 25000) * (1 + ag / 8) + 300000) * (e.bm ? 12 : 1) * (D.sys ? 3 : 1) * (D.ai ? 3 : 1);
          if (!bad && pw > powCap && ag < 1000) { try { await pipe([['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(e.n || ''), 24), age: ag, why: 'pow-age', st: { pow: pw, fame: fm, money: mn }, t: now, info: 1 })], ['LTRIM', 'acsus', 0, 199]]) } catch {} }
          if (!bad && ag >= 1000 && pw > powCap * 50) { try { if (await cmd('SET', 'acold:' + id, 1, 'NX', 'EX', 86400)) await pipe([['LPUSH', 'acsus', JSON.stringify({ fid: id, n: clean(String(e.n || ''), 24), age: ag, why: 'pow-old', st: { pow: pw, fame: fm, money: mn }, t: now, info: 1 })], ['LTRIM', 'acsus', 0, 199]]) } catch {} }
          const upper = (pw + fm * 3 + 20 * Math.sqrt(Math.max(0, mn)) + 2500 + kids * 100 + dis * 20 + 4000) * 2.5 * 1.05 + 1000;
        }
        if (!bad && !det) bad = 'nodet';
        if (!bad && await isBanned()) bad = 'banned';
        if (!bad && tpInfo) { try { await pipe([['LPUSH', 'cheatlog', JSON.stringify({ id: id.slice(0, 10), fid: id, n: e.n, s: e.s, age: e.age, why: tpInfo, info: 1, t: now })], ['LTRIM', 'cheatlog', 0, 99]]) } catch {} }
      } catch { bad = bad || 'parse' }
      if (bad) { await pipe([['INCR', 'lives'], ['LPUSH', 'cheatlog', JSON.stringify({ id: id.slice(0, 10), fid: id, n: e.n, s: e.s, age: e.age, why: bad, t: now })], ['LTRIM', 'cheatlog', 0, 99]]); return res.json({ ok: 1, skip: 1, flag: 1, why: /^tamper/.test(bad) ? 'edit' : bad === 'banned' ? 'ban' : bad === 'stat' ? 'stat' : bad === 'nodet' ? 'old' : 'parse' }) }
      try { const ip0 = cip(req); if (ip0 && okId(id)) L.push(['SET', 'idip:' + id, String(ip0).slice(0, 45), 'EX', 86400 * 40]) } catch {}
      if (lid.length >= 6 && det && det.length < 40000) { try { JSON.parse(det); L.push(['SET', 'lifed:' + lid, det, 'EX', 86400 * 40], ['SET', 'lifeo:' + lid, id, 'EX', 86400 * 40], ['SET', 'lifep:' + lid, +b.pub === 2 ? '2' : b.pub ? '1' : '0', 'EX', 86400 * 40]) } catch {} }
      if (lid.length >= 6 && await cmd('GET', 'lsent:' + lid)) return res.json({ ok: 1, dup: 1 });
      if (e.ch === 'regress' && e.rf) { try { const G = (JSON.parse(det || '{}').rg) || {}, en = ['beyond', 'breaker', 'protector', 'lonely'].includes(G.end) ? G.end : 'lonely', vr = ['normal', 'r5', 'nomem', 'lim10'].includes(G.var) ? G.var : 'normal'; const rj = JSON.stringify({ n: e.n, lid: e.lid, rl: e.rl, end: en, var: vr, age: e.age, r: e.r, t: now, x: e.x, g: e.g }); const rs = ({ beyond: 4, breaker: 3, protector: 2, lonely: 1 })[en] * 1e8 - Math.min(999, e.rl || 1) * 1e5 + ({ lim10: 3, nomem: 2, r5: 1, normal: 0 })[vr] * 1e4 - Math.min(9999, Math.floor((now % 1e9) / 1e5)); L.push(['ZADD', 'rgb:all', rs, rj], ['ZREMRANGEBYRANK', 'rgb:all', 0, -201], ['ZADD', 'rgb:w:' + week(new Date(now)), rs, rj], ['ZREMRANGEBYRANK', 'rgb:w:' + week(new Date(now)), 0, -101], ['EXPIRE', 'rgb:w:' + week(new Date(now)), 86400 * 21]) } catch {} }
      await pipe(L);
      if (lid.length >= 6) { try { await cmd('SET', 'lsent:' + lid, 1, 'EX', 86400 * 20) } catch {} }
      let rk = null; try { const r0 = await cmd('ZREVRANK', bdKey(mainC, now), mainJ); if (r0 != null) rk = +r0 + 1 } catch {}
      return res.json({ ok: 1, ...(rk ? { rk } : {}) });
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
    const AR_TKM = 5, AR_TKR = 1200e3, arBr = b0 => (b0.bm ? 'b' : b0.x ? 'x' : 'm') + ':' + Math.max(0, Math.min(12, +b0.ri || 0)) + ((+b0.ri || 0) >= 7 && +b0.pl >= 0 ? ':t' + Math.min(4, Math.floor(+b0.pl / 9)) : '');
    const arTk = async (use) => { const v = jp(await cmd('HGET', 'artk', id)) || { n: AR_TKM, t: now }; const add = Math.floor((now - v.t) / AR_TKR); if (add > 0) { v.n = Math.max(v.n, Math.min(AR_TKM, v.n + add)); v.t = v.n >= AR_TKM ? now : v.t + add * AR_TKR } if (v.n >= AR_TKM) v.t = now;
      if (use) { if (v.n <= 0) return { ok: 0, n: 0, nx: AR_TKR - (now - v.t) }; if (v.n >= AR_TKM) v.t = now; v.n -= use } if (use || add > 0) await cmd('HSET', 'artk', id, JSON.stringify(v)); return { ok: 1, n: v.n, nx: v.n >= AR_TKM ? 0 : AR_TKR - (now - v.t) } };
    const arRt = async (who) => { const v = await cmd('HGET', 'arr:' + W, who); if (v != null && v !== '') return +v || 0; const pv = await cmd('HGET', 'arr:' + week(new Date(now - 7 * 86400e3)), who); return pv != null && pv !== '' ? Math.round(1000 + ((+pv || 1000) - 1000) / 2) : 1000 }; // เริ่มสัปดาห์ใหม่: ดึงแต้มเก่ากลับเข้าหา 1000 ครึ่งทาง (ไม่รีเซ็ตหมด) // รีเซ็ตทุกสัปดาห์: ทุกคนเริ่ม 1000 ใหม่
    const arSettle = async () => { try { const pw = week(new Date(now - 7 * 86400e3)); if (!(await cmd('SET', 'arset:' + pw, 1, 'NX', 'EX', 86400 * 30))) return; const top = await cmd('ZREVRANGE', 'ars:' + pw, 0, 2, 'WITHSCORES'); for (let i = 0; i < (top || []).length; i += 2) { const own = top[i], r = i / 2 + 1, sc = +top[i + 1]; if (await cmd('SISMEMBER', 'cheaters', own)) continue; const nm = (await cmd('HGET', 'arn', own)) || 'นิรนาม', exp = now + RKT_EXP.w;
      await kbFix(own); await pipe([['HINCRBY', 'kb:' + own, 'g', KB_RANK.w[r]], ['LPUSH', 'bdrw:' + own, JSON.stringify({ p: 'w', c: 'a', r, d: pw, n: nm, s: sc, tt: RKT_A.w[r], exp })], ['EXPIRE', 'bdrw:' + own, 86400 * 60], ['HSET', 'rkttl:' + own, 'wa', JSON.stringify({ t: RKT_A.w[r], r, c: 'a', exp, at: now })], ['EXPIRE', 'rkttl:' + own, 86400 * 40]]) }
      // รางวัลจบซีซั่นตามลีก (ทุกคนที่ลงแข่ง)
      const all = (await cmd('ZRANGE', 'ars:' + pw, 0, 1999, 'WITHSCORES')) || []; const t10 = new Set(((await cmd('ZREVRANGE', 'ars:' + pw, 0, 9)) || [])), sn = +(await cmd('INCR', 'arseason')) || 1; let Q = []; for (let i = 0; i < all.length; i += 2) { const own = all[i], sc = +all[i + 1], lg = t10.has(own) && sc >= 1600 ? 8 : arLg(sc), tt = lg === 8 ? 'ตำนานลานซีซั่น ' + sn : AR_LT[lg]; Q.push(['LPUSH', 'bdrw:' + own, JSON.stringify({ p: 'w', c: 'al', lg, d: pw, s: sc, tt: tt || '', sn })], ['EXPIRE', 'bdrw:' + own, 86400 * 60]); { Q.push(['HINCRBY', 'arpend', own, AR_LGC[lg]]); if (lg >= 1) Q.push(['SADD', 'arpfr:' + own, 'f_lg' + lg], ['EXPIRE', 'arpfr:' + own, 86400 * 60]); if (tt) Q.push(['SADD', 'arptt:' + own, tt], ['EXPIRE', 'arptt:' + own, 86400 * 60]) } if (Q.length >= 200) { await pipe(Q); Q = [] } } if (Q.length) await pipe(Q) } catch {} };
    const arSnapIn = b0 => { let look = null; try { const L = typeof b0.look === 'string' ? JSON.parse(b0.look) : b0.look; if (L && typeof L === 'object' && JSON.stringify(L).length < 1600) look = L } catch {}
      return { n: clean(b0.n, 20) || 'นิรนาม', p: Math.max(0, +b0.p || 0), hp: Math.max(1, Math.min(1e9, +b0.hp || 100)), r: clean(b0.r, 30), ri: Math.max(0, Math.min(12, +b0.ri || 0)), x: b0.x ? 1 : 0, bm: b0.bm ? 1 : 0, st: ['atk', 'def', 'trick', 'all'].includes(b0.st) ? b0.st : 'atk', arts: (Array.isArray(b0.arts) ? b0.arts : []).slice(0, 3).map(a => clean(a, 24)).filter(Boolean), el: clean(b0.el, 10), sr: clean(b0.sr, 3), qo: clean(b0.qo, 50), qw: clean(b0.qw, 50), al: ['d', 'r'].includes(b0.al) ? b0.al : '', au: ['fire', 'thunder', 'dark', 'ice'].includes(b0.au) ? b0.au : '', pl: Math.max(-1, Math.min(44, Math.floor(+b0.pl)))||(+b0.pl===0?0:-1), ag: Math.max(0, Math.min(1e12, Math.floor(+b0.ag || 0))), look, t: now } };
    const arLg = r => r >= 2250 ? 7 : r >= 2000 ? 6 : r >= 1800 ? 5 : r >= 1600 ? 4 : r >= 1400 ? 3 : r >= 1250 ? 2 : r >= 1100 ? 1 : 0;
    const AR_LT = ['', '', 'ผู้ไต่ลานทองคำ', 'เพชรแห่งลานเงา', 'จ้าวลานประลอง', 'ปรมาจารย์ผู้ไร้เงา', 'ราชันหมื่นเงา', 'เทพยุทธ์แห่งยุค'], AR_LGC = [5, 15, 30, 60, 100, 150, 220, 300, 400];
    // ---- กระเป๋าเหรียญลาน (เก็บที่เซิร์ฟเวอร์) ----
    const AR_P = { tt: { 'นักล่าเงา': 80, 'ผู้ไม่เคยถอย': 200, 'ตำนานแห่งลาน': 500, 'ราชันเงาอสูร': 1000, 'เทพสงครามแห่งลาน': 2000, 'ผู้ยืนหนึ่งเหนือพันศึก': 3500, 'จักรพรรดิแห่งเงา': 6000 }, fr: { f_arc1: 40, f_arc2: 120, f_arc3: 250, f_arc4: 400, f_arc5: 1000 }, qt: { qt: 50 }, au: { fire: 120, ice: 120, thunder: 200, dark: 300 }, use: { heal: 8, qi: 12, joy: 6 } };
    const AR_FRX = /^f_(arc[1-5]|box[1-3]|lg[1-8])$/, AR_QN = { w3: 3, man2: 2, adv: 1, rv: 1, cb3: 1, any5: 5 };
    const arDayK = () => new Date(now + 7 * 3600e3).toISOString().slice(0, 10);
    const arQDay = v => { const k = arDayK(); if (!v.q || v.q.k !== k) { const ids = Object.keys(AR_QN).sort(() => Math.random() - .5).slice(0, 3); v.q = { k, q: ids.map(i => ({ id: i, p: 0, done: 0 })), all: 0 } } return v };
    const arWal = async (mig) => { let v = jp(await cmd('HGET', 'arwal', id));
      if (!v) { const m = mig && typeof mig === 'object' ? mig : {}, L = (x, ok) => [...new Set((Array.isArray(x) ? x : []).map(String).filter(ok))].slice(0, 20);
        v = { c: Math.max(0, Math.min(600, Math.floor(+m.c || 0))), own: { tt: L(m.tt, t => t in AR_P.tt), au: L(m.au, t => t in AR_P.au), qt: m.qt ? 1 : 0, fr: L(m.fr, t => AR_FRX.test(t)) }, pity: Math.max(0, Math.min(19, +m.pity || 0)), stk: 0, mig: now } }
      v.own = v.own || { tt: [], au: [], qt: 0, fr: [] };
      const [pc, pf, pt] = await pipe([['HGET', 'arpend', id], ['SMEMBERS', 'arpfr:' + id], ['SMEMBERS', 'arptt:' + id]]); if (+pc || (pf || []).length || (pt || []).length) { v.c += +pc || 0; (pf || []).forEach(f => { if (!v.own.fr.includes(f)) v.own.fr.push(f) }); v.own.tt = v.own.tt || []; (pt || []).forEach(t => { if (!v.own.tt.includes(t)) v.own.tt.push(t) }); await pipe([['HDEL', 'arpend', id], ['DEL', 'arpfr:' + id], ['DEL', 'arptt:' + id]]) }
      return arQDay(v) };
    const arWalSet = v => cmd('HSET', 'arwal', id, JSON.stringify(v));
    const arWalPub = v => ({ c: v.c, own: v.own, pity: v.pity | 0, stk: v.stk | 0, q: v.q });
    const arLock = async () => !!(await cmd('SET', 'arwl:' + id, 1, 'NX', 'PX', 2500));
    const arUnlock = () => cmd('DEL', 'arwl:' + id);
    if (a === 'ar2n') { // แจ้งเตือนเบา ๆ: มีคนท้าเงากี่ครั้ง (อ่านอย่างเดียว ไม่ล้างตัวนับ)
      if (!okId(id)) return res.json({ nw: 0 }); const dn = await cmd('HGET', 'ardefn', id); return res.json({ nw: +dn || 0 })
    }
    if (a === 'ar2') {
      if (!okId(id)) return res.json({ err: 'id' }); await arSettle();
      const [tk, rt, top, dl, dn, wt, pk0] = await Promise.all([arTk(0), arRt(id), cmd('ZREVRANGE', 'ars:' + W, 0, 9, 'WITHSCORES'), cmd('LRANGE', 'ardef:' + id, 0, 19), cmd('HGET', 'ardefn', id), cmd('ZREVRANGE', 'arwin:' + W, 0, 9, 'WITHSCORES'), cmd('HGET', 'arpk', id)]);
      const ids = []; for (let i = 0; i < (top || []).length; i += 2) ids.push(top[i]); const nms = ids.length ? await cmd('HMGET', 'arn', ...ids) : [];
      const T = ids.map((x, i) => ({ n: nms[i] || 'นิรนาม', r: +top[i * 2 + 1], me: x === id ? 1 : 0, lg: arLg(+top[i * 2 + 1]) }));
      const wids = []; for (let i = 0; i < (wt || []).length; i += 2) wids.push(wt[i]); const wn = wids.length ? await cmd('HMGET', 'arn', ...wids) : []; const WT = wids.map((x, i) => ({ n: wn[i] || 'นิรนาม', w: +wt[i * 2 + 1], me: x === id ? 1 : 0 }));
      const D = (dl || []).map(jp).filter(Boolean).map((e, i) => ({ i, n: e.n, w: e.w, d: e.d, t: e.t, rv: e.rv ? 1 : 0 }));
      if (+dn) await cmd('HDEL', 'ardefn', id);
      return res.json({ tk, rt, lg: arLg(rt), pk: Math.max(+pk0 || 0, arLg(rt)), top: T, wins: WT, def: D, nw: +dn || 0, wk: W });
    }
    if (a === 'ar2snap') { // อัปเดตพลังเงาระหว่างเล่น (เฉพาะคนที่มีเงาอยู่แล้ว)
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const old = jp(await cmd('GET', 'arsnap:' + id)); if (!old) return res.json({ ok: 0 });
      const me = arSnapIn(b); if (b.tp || !powOk(me.p, Math.min(7, me.ri), me.x, null) || await isBanned()) return res.status(403).json({ err: 'integrity' });
      if (!(await cmd('SET', 'arl3:' + id, 1, 'NX', 'EX', 120))) return res.json({ ok: 0, rate: 1 });
      me.au = old.au || ''; me.qo = old.qo || ''; me.qw = old.qw || '';
      const ob = arBr(old), nb = arBr(me), ops = [['SET', 'arsnap:' + id, JSON.stringify(me), 'EX', 86400 * 14]];
      if (ob !== nb) ops.push(['SREM', 'ar2:' + ob, id], ['SADD', 'ar2:' + nb, id], ['EXPIRE', 'ar2:' + nb, 86400 * 14]);
      await pipe(ops); return res.json({ ok: 1 });
    }
    if (a === 'ar2go' || a === 'ar2rv') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const me = arSnapIn(b); if (b.tp || !powOk(me.p, Math.min(7, me.ri), me.x, null) || await isBanned()) return res.status(403).json({ err: 'integrity' });
      { const wv = jp(await cmd('HGET', 'arwal', id)); if (wv && wv.own) { if (me.au && !(wv.own.au || []).includes(me.au)) me.au = ''; if (!wv.own.qt) { me.qo = ''; me.qw = '' } } }
      if (!(await cmd('SET', 'arl2:' + id, 1, 'NX', 'PX', 2500))) return res.status(429).json({ err: 'rate' });
      const br = arBr(me); await pipe([['SET', 'arsnap:' + id, JSON.stringify(me), 'EX', 86400 * 14], ['SADD', 'ar2:' + br, id], ['EXPIRE', 'ar2:' + br, 86400 * 14], ['HSET', 'arn', id, me.n]]);
      const myR = await arRt(id); let oid = null, o = null, rv = 0;
      if (a === 'ar2rv') { const i = Math.max(0, Math.min(19, +b.i || 0)), e = jp(await cmd('LINDEX', 'ardef:' + id, i)); if (!e || !e.a || e.rv) return res.json({ o: null, err: 'gone' }); o = jp(await cmd('GET', 'arsnap:' + e.a)); if (!o) return res.json({ o: null, err: 'gone' }); oid = e.a; rv = 1; e.rv = 1; await cmd('LSET', 'ardef:' + id, i, JSON.stringify(e)) }
      else { const rc = new Set((await cmd('LRANGE', 'arrc:' + id, 0, 4)) || []); const C = ((await cmd('SRANDMEMBER', 'ar2:' + br, 24)) || []).filter(x => x !== id); if (C.length) { const [sn, rts] = await pipe([['MGET', ...C.map(x => 'arsnap:' + x)], ['HMGET', 'arr:' + W, ...C]]); const L = C.map((x, k) => ({ x, o: jp(sn[k]), r: +rts[k] || 1000 })).filter(q => q.o && q.o.t > now - 86400e3 * 14);
        // จับคู่: พลังใกล้กันก่อน → อายุใกล้กัน → แต้มลาน · ข้ามคนที่เพิ่งเจอ 5 คนล่าสุด
        const sc = q => { const pd = Math.abs(Math.log((+q.o.p + 1) / (me.p + 1))), a1 = +me.ag || 0, a2 = +q.o.ag || 0, ad = a1 && a2 ? Math.abs(a1 - a2) / Math.max(a1, a2, 20) : .25; return pd * 1000 + ad * 160 + Math.abs(q.r - myR) * .3 + (rc.has(q.x) ? 2500 : 0) + Math.random() * 50 };
        L.forEach(q => q.s = sc(q)); L.sort((p1, p2) => p1.s - p2.s); if (L[0]) { oid = L[0].x; o = L[0].o } } }
      if (o && oid && a === 'ar2go') await pipe([['LREM', 'arrc:' + id, 0, oid], ['LPUSH', 'arrc:' + id, oid], ['LTRIM', 'arrc:' + id, 0, 4], ['EXPIRE', 'arrc:' + id, 86400]]);
      if (!o && a === 'ar2go') { // รุ่นเดียวกันไม่มีใคร → ลองรุ่นข้างเคียงที่พลังใกล้กัน
        try { const base = me.bm ? 'b' : me.x ? 'x' : 'm', tier = me.ri >= 7 && me.pl >= 0 ? Math.min(4, Math.floor(me.pl / 9)) : -1; const keys = tier >= 0 ? [1, -1, 2, -2].map(d => tier + d).filter(t => t >= 0 && t <= 4).map(t => base + ':' + me.ri + ':t' + t).concat([base + ':' + me.ri]) : [-1, 1, -2, 2].map(d => me.ri + d).filter(r2 => r2 >= 0 && r2 <= 12).map(r2 => base + ':' + r2); for (const kk of keys) { if (o) continue; const C2 = ((await cmd('SRANDMEMBER', 'ar2:' + kk, 8)) || []).filter(x => x !== id); if (!C2.length) continue; const sn2 = await cmd('MGET', ...C2.map(x => 'arsnap:' + x)); for (let k = 0; k < C2.length && !o; k++) { const q = jp(sn2[k]); if (q && q.t > now - 86400e3 * 14 && q.p >= me.p * .55 && q.p <= me.p * 1.7) { oid = C2[k]; o = q } } } } catch (e) {}
      }
      let bot = 0;
      if (!o && a === 'ar2go') { // ยังไม่มีอีก → เงาประจำลาน (มีคู่ให้สู้เสมอ)
        bot = 1; oid = '~bot';
        o = { n: ['ผู้พิทักษ์ลาน', 'นักดาบเร่ร่อน', 'ผู้เฒ่าไร้นาม', 'ศิษย์ลานหมื่นเงา', 'จอมยุทธ์ปิดหน้า', 'เงาไร้เจ้าของ'][Math.floor(Math.random() * 6)], p: Math.max(10, Math.round(me.p * (.8 + Math.random() * .3))), hp: me.hp, r: me.r, ri: me.ri, x: me.x, bm: me.bm, st: ['atk', 'def', 'trick', 'all'][Math.floor(Math.random() * 4)], arts: [['ฝ่ามือเงาสลัว', 'เพลงดาบไร้เงา', 'หมัดหมื่นเงา'][Math.floor(Math.random() * 3)]], el: '', sr: '', qo: '', qw: '', au: '', look: null, bot: 1, t: now };
      }
      if (!o) return res.json({ o: null, tk: await arTk(0), rt: myR });
      const tk = await arTk(1); if (!tk.ok) return res.json({ o: null, notk: 1, tk, rt: myR });
      await cmd('SET', 'arm:' + id, JSON.stringify({ o: oid, rv, t: now, bot, ch: ['hell', 'short', 'junk'].includes(b.ch) ? b.ch : '', mp: me.p, op: +o.p || 0, ms: me.st, os: o.st || 'atk' }), 'EX', 900);
      const or = bot ? Math.max(900, myR - 30) : await arRt(oid); delete o.t; return res.json({ o: Object.assign(o, { rt: or, lg: arLg(or) }), rt: myR, tk });
    }
    // ---- ยุคปัจจุบัน: ฝังสมบัติ / จักรวาลซ้อน ----
    if (a === 'tbury' || a === 'tbmine' || a === 'tbdig' || a === 'mwreg' || a === 'mwfind') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const hid = crypto.createHash('sha256').update('tb|' + id).digest('hex').slice(0, 12);
      const pub = r => { const o = Object.assign({}, r); delete o.o; return o };
      if (a === 'tbury') {
        if (!(await cmd('SET', 'tbr:' + id, 1, 'NX', 'EX', 15))) return res.json({ err: 'rate' });
        if ((+(await cmd('HLEN', 'tb:' + id)) || 0) >= 40) return res.json({ err: 'full' });
        const it = ['gold', 'art', 'letter'].includes(b.it) ? b.it : 'gold', loc = ['sect', 'cave', 'home', 'river'].includes(b.loc) ? b.loc : 'cave';
        const k = crypto.randomBytes(6).toString('hex');
        const r = { k, o: hid, on: clean(b.n, 20) || 'นิรนาม', it, loc, v: Math.max(0, Math.min(1e9, Math.round(+b.v || 0))), an: clean(b.an, 30), ar: Math.max(0, Math.min(6, b.ar | 0)), tx: clean(b.tx, 80), fac: clean(b.fac, 30), rl: clean(b.rl, 20), yr: Math.max(1000, Math.min(1900, b.yr | 0)), t: now };
        const j = JSON.stringify(r);
        await pipe([['HSET', 'tb:' + id, k, j], ['HSET', 'tball', k, j], ['LPUSH', 'tbpool', j], ['LTRIM', 'tbpool', 0, 1999]]);
        return res.json({ ok: 1, k });
      }
      if (a === 'tbmine') {
        const L = ((await cmd('HVALS', 'tb:' + id)) || []).map(jp).filter(Boolean).sort((x, y) => x.t - y.t);
        const D = L.length ? await cmd('MGET', ...L.map(r => 'tbd:' + r.k)) : [];
        return res.json({ ok: 1, l: L.map((r, i) => Object.assign(pub(r), { d: D[i] ? jp(D[i]) || 1 : 0 })) });
      }
      if (a === 'tbdig') {
        const k = String(b.k || '').replace(/[^a-f0-9]/g, '').slice(0, 12), r = jp(await cmd('HGET', 'tball', k));
        if (!r) return res.json({ err: 'none' });
        const by = { n: clean(b.n, 20) || 'นิรนาม', t: now, own: r.o === hid ? 1 : 0 };
        if (!(await cmd('SET', 'tbd:' + k, JSON.stringify(by), 'NX'))) return res.json({ ok: 1, gone: 1, by: jp(await cmd('GET', 'tbd:' + k)), r: pub(r) });
        return res.json({ ok: 1, r: pub(r), own: by.own });
      }
      if (a === 'mwreg') {
        if (!(await cmd('SET', 'mwrr:' + id, 1, 'NX', 'EX', 60))) return res.json({ ok: 1 });
        const r = { o: hid, n: clean(b.n, 20) || 'นิรนาม', rl: clean(b.rl, 20), fac: clean(b.fac, 30), cc: String(b.cc || '').replace(/[^a-z]/g, '').slice(0, 2), yr: Math.max(1000, Math.min(1900, b.yr | 0)), t: now };
        await pipe([['LPUSH', 'mwppl', JSON.stringify(r)], ['LTRIM', 'mwppl', 0, 499]]);
        return res.json({ ok: 1 });
      }
      if (a === 'mwfind') {
        const [T0, P0] = await pipe([['LRANGE', 'tbpool', 0, 299], ['LRANGE', 'mwppl', 0, 149]]);
        const sm = (l, n) => { l = l.slice(); for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]] } return l.slice(0, n) };
        const T = sm((T0 || []).map(jp).filter(r => r && r.o !== hid), 4), P = sm((P0 || []).map(jp).filter(r => r && r.o !== hid), 4);
        const seen = new Set(); const P2 = P.filter(r => !seen.has(r.n + r.o) && seen.add(r.n + r.o));
        const D = T.length ? await cmd('MGET', ...T.map(r => 'tbd:' + r.k)) : [];
        return res.json({ ok: 1, tb: T.map((r, i) => Object.assign(pub(r), { d: D[i] ? 1 : 0 })), ppl: P2.map(pub) });
      }
    }
    if (a === 'mwclk') {
      const n = Math.max(0, Math.min(5, b.n | 0)); let c;
      if (n && okId(id) && (await cmd('SET', 'mwck:' + id, 1, 'NX', 'EX', 15))) c = await cmd('INCRBY', 'mwclock', n); else c = await cmd('GET', 'mwclock');
      return res.json({ ok: 1, c: +c || 0, g: 50000 });
    }
    if (a === 'arlesson') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      if (!(await cmd('SET', 'arles:' + id, 1, 'NX'))) return res.json({ ok: 1, g: 0 });
      let v = null; try { for (let t = 0; t < 4 && !(await arLock()); t++) await new Promise(r0 => setTimeout(r0, 300)); v = await arWal(); v.c += 5; await arWalSet(v) } catch (e) { await cmd('DEL', 'arles:' + id); return res.json({ ok: 0 }) } finally { await arUnlock() }
      return res.json({ ok: 1, g: 5, wal: v ? arWalPub(v) : null });
    }
    if (a === 'artkbuy') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const dk = 'artkb:' + id + ':' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10), [c] = await pipe([['INCR', dk], ['EXPIRE', dk, 86400 * 2]]);
      if (+c > 2) return res.json({ err: 'limit' });
      if (!(await arLock())) return res.status(429).json({ err: 'rate' }); let wv; try { wv = await arWal(); if (wv.c < 20) { await cmd('DECR', dk); return res.json({ err: 'coin' }) } wv.c -= 20; await arWalSet(wv) } finally { await arUnlock() }
      const v = jp(await cmd('HGET', 'artk', id)) || { n: AR_TKM, t: now }; await arTk(0); const v2 = jp(await cmd('HGET', 'artk', id)) || v; v2.n = Math.min(AR_TKM + 2, (v2.n | 0) + 1); await cmd('HSET', 'artk', id, JSON.stringify(v2));
      return res.json({ ok: 1, tk: await arTk(0), left: 2 - +c, wal: arWalPub(wv) });
    }
    if (a === 'arcoin') {
      if (!okId(id)) return res.json({ err: 'id' });
      if (!(await arLock())) { const v0 = jp(await cmd('HGET', 'arwal', id)); return res.json({ wal: v0 ? arWalPub(arQDay(v0)) : null }) }
      try { const v = await arWal(b.mig); await arWalSet(v); return res.json({ wal: arWalPub(v) }) } finally { await arUnlock() }
    }
    if (a === 'arbuy') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const k = String(b.k || ''), it = String(b.it || ''), P = AR_P[k]; if (!P || !(it in P)) return res.json({ err: 'item' });
      if (!(await arLock())) return res.status(429).json({ err: 'rate' });
      try { const v = await arWal(), cost = P[it];
        if (k !== 'use') { const L = k === 'qt' ? null : v.own[k]; if (k === 'qt' ? v.own.qt : L.includes(it)) return res.json({ err: 'own', wal: arWalPub(v) }) }
        if (v.c < cost) return res.json({ err: 'coin', wal: arWalPub(v) });
        v.c -= cost; if (k === 'qt') v.own.qt = 1; else if (k !== 'use') v.own[k].push(it); await arWalSet(v); return res.json({ ok: 1, wal: arWalPub(v) }) } finally { await arUnlock() }
    }
    if (a === 'archest') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      if (!(await arLock())) return res.status(429).json({ err: 'rate' });
      try { const v = await arWal(); if (v.c < 30) return res.json({ err: 'coin', wal: arWalPub(v) }); v.c -= 30; v.pity = (v.pity | 0) + 1;
        const left = ['f_box1', 'f_box2', 'f_box3'].filter(x => !v.own.fr.includes(x)), r = Math.random(), alive = !!b.alive; let out;
        const rare = () => { v.pity = 0; if (left.length) { const nb3 = left.filter(x => x !== 'f_box3'), f = Math.random() < .15 && left.includes('f_box3') ? 'f_box3' : (nb3.length ? nb3 : left)[Math.floor(Math.random() * (nb3.length ? nb3 : left).length)]; v.own.fr.push(f); return { k: 'fr', id: f } } v.c += 80; return { k: 'coin', v: 80, full: 1 } };
        if (v.pity >= 20 || r < .07) out = rare();
        else if (r < .2 && alive) out = { k: 'item' };
        else if (r < .5) { const x = 15 + Math.floor(Math.random() * 31); v.c += x; out = { k: 'coin', v: x } }
        else if (alive) out = { k: 'pot' };
        else { const x = 10 + Math.floor(Math.random() * 16); v.c += x; out = { k: 'coin', v: x } }
        await arWalSet(v); return res.json({ ok: 1, res: out, wal: arWalPub(v) }) } finally { await arUnlock() }
    }
    if (a === 'ar2res') {
      if (!okId(id)) return res.status(403).json({ err: 'id' });
      const pm = jp(await cmd('GETDEL', 'arm:' + id)); if (!pm || !pm.o) return res.json({ err: 'nomatch' });
      const AR_SB0 = { atk: 'trick', trick: 'def', def: 'atk' }; let w = b.w ? 1 : 0, sw = null; const au = b.au ? 1 : 0;
      // 🔒 ผลการสู้: โหมดเงาสู้แทน เซิร์ฟเวอร์ทอยผลเอง · สู้เองแล้วชนะคนที่แรงกว่าเกิน 3.3 เท่า ไม่นับ
      if (pm.mp > 0 && pm.op > 0) { const ad = Math.max(-1, Math.min(1, +b.ad || 0)), my = pm.mp * (1 + .12 * ad), sb = AR_SB0[pm.ms] === pm.os ? 1 : AR_SB0[pm.os] === pm.ms ? -1 : 0;
        if (au) { const pr = Math.max(.02, Math.min(.98, my / (my + pm.op) + sb * .08 * Math.min(1, 2 * Math.min(my, pm.op) / Math.max(my, pm.op)))); if (!(w && pr >= .2)) { w = w ? (Math.random() < pr * 2 ? 1 : 0) : 0 } sw = w } // ผลที่เห็นบนจอคือผลจริง: เชื่อผลชนะเมื่อมีโอกาสชนะสมเหตุสมผล (≥20%) — ทอยใหม่เฉพาะชนะแบบเหลือเชื่อ
        else if (w && my / pm.op < .3) { w = 0; sw = 0; pm._void = 1; try { await pipe([['LPUSH', 'acsus', JSON.stringify({ fid: id, age: 0, why: 'srv-ar', st: { pow: Math.round(pm.mp), opp: Math.round(pm.op) }, t: now, info: 1 })], ['LTRIM', 'acsus', 0, 199]]) } catch {} } }
      const bot = !!pm.bot || pm.o === '~bot', ra = await arRt(id), rb = bot ? Math.max(900, ra - 30) : await arRt(pm.o), ea = 1 / (1 + Math.pow(10, (rb - ra) / 400)), K = 32 * (au ? .5 : 1) * (bot ? .7 : 1);
      const da0 = pm._void ? 0 : Math.round(K * (w - ea)), da = bot && da0 > 0 ? Math.max(0, Math.min(da0, 1600 - ra)) : da0, db = -Math.round(da * .5), na = Math.max(0, ra + da), nb = Math.max(0, rb + db), nm = (await cmd('HGET', 'arn', id)) || 'นิรนาม';
      const L = bot ? [['HSET', 'arr:' + W, id, na], ['EXPIRE', 'arr:' + W, 86400 * 40], ['ZADD', 'ars:' + W, na, id], ['EXPIRE', 'ars:' + W, 86400 * 40]] : [['HSET', 'arr:' + W, id, na, pm.o, nb], ['EXPIRE', 'arr:' + W, 86400 * 40], ['ZADD', 'ars:' + W, na, id, nb, pm.o], ['EXPIRE', 'ars:' + W, 86400 * 40],
        ['LPUSH', 'ardef:' + pm.o, JSON.stringify({ n: nm, w: w ? 0 : 1, d: db, t: now, a: id })], ['LTRIM', 'ardef:' + pm.o, 0, 19], ['EXPIRE', 'ardef:' + pm.o, 86400 * 14], ['HINCRBY', 'ardefn', pm.o, 1]];
      if (w) L.push(['ZINCRBY', 'arenaW:' + W, 1, nm], ['EXPIRE', 'arenaW:' + W, 86400 * 40], ['ZINCRBY', 'arwin:' + W, 1, id], ['EXPIRE', 'arwin:' + W, 86400 * 40]);
      await pipe(L);
      let pkNew = 0; try { const pk0 = +(await cmd('HGET', 'arpk', id)) || 0, lgN = arLg(na); if (lgN > pk0) { await cmd('HSET', 'arpk', id, lgN); pkNew = pk0 > 0 ? lgN : 0 } } catch {}
      let g = 0, bonus = 0, qg = 0, fw = 0, v = null; try { for (let t = 0; t < 4 && !(await arLock()); t++) await new Promise(r0 => setTimeout(r0, 300)); v = await arWal(); g = au ? (w ? 1 : 0) : (w ? 3 : 1); const chM = { hell: 1.5, junk: 1.5, short: 1.3 }[pm.ch] || 1; if (g && chM > 1) g = Math.max(g + 1, Math.round(g * chM));
        if (w) { v.stk = (v.stk | 0) + 1; if (v.stk >= 3) bonus = Math.min(5, v.stk - 2) } else v.stk = 0;
        if (w && !au && !pm.bot && v.fw !== thDay(now)) { v.fw = thDay(now); fw = 5 } else if (w && v.fw !== thDay(now)) { v.fw = thDay(now); fw = 3 } // ชนะครั้งแรกของวัน: โบนัสเหรียญ
        const ev = { w, au, ad: +b.ad > 0, rv: !!pm.rv, best: Math.max(0, Math.min(99, +b.cb || 0)) };
        v.q.q.forEach(q => { if (q.done) return; const need = AR_QN[q.id] || 1; let inc = 0; if (q.id === 'w3' && ev.w) inc = 1; if (q.id === 'man2' && !ev.au) inc = 1; if (q.id === 'adv' && ev.w && ev.ad) inc = 1; if (q.id === 'rv' && ev.w && ev.rv) inc = 1; if (q.id === 'cb3' && ev.best >= 3 && !ev.au) inc = 1; if (q.id === 'any5') inc = 1;
          if (inc) { q.p = Math.min(need, q.p + inc); if (q.p >= need) { q.done = 1; qg += 8 } } });
        if (!v.q.all && v.q.q.every(q => q.done)) { v.q.all = 1; qg += 15 }
        v.c += g + bonus + qg + fw; await arWalSet(v) } catch (e) {} finally { await arUnlock() }
      return res.json({ ok: 1, rt: na, d: da, lg: arLg(na), ort: nb, g, bonus, qg, fw, pkNew, chm: pm.ch || '', wal: v ? arWalPub(v) : null, ...(sw != null ? { sw } : {}) });
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
      await cmd('SET', 'cs:' + code, zPack(saveTrim(d)), 'EX', 86400 * 30);
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
      const me = { n: clean(b.n, 20) || 'นิรนาม', ri: Math.max(0, Math.min(12, +b.ri || 0)), p: Math.max(0, Math.min(1e13, +b.p || 0)), f: clean(b.f, 30), age: Math.max(0, +b.age || 0), c: Math.max(0, Math.min(999, Math.round(+b.cha || 0))), t: now, g: b.g === 'f' ? 'f' : 'm', ms: b.ms ? 1 : 0, w: Math.max(0, Math.min(3, +b.w || 0)), td: ['fight', 'ally', 'betray', 'leave', 'bond'].includes(b.td) ? b.td : 'ally' };
      if (b.bm) { me.bm = 1; me.sp = clean(b.sp, 20); me.st = Math.max(0, Math.min(9, +b.st || 0)); me.p = Math.min(me.p, 1e12) }
      const okMe = !b.tp && (me.bm ? me.p <= 1e12 : powOk(me.p, me.ri, x, me.age)) && !(await isBanned());
      const [, all, box, gbox] = await pipe([okMe ? ['HSET', key, id, JSON.stringify(me)] : ['HDEL', key, id], ['HGETALL', key], ['LRANGE', 'mbox:' + id, 0, 9], ['LRANGE', 'gbox:' + id, 0, 9]]);
      // เงาผู้เล่น: เก็บร่องรอยคนที่เพิ่งเล่นไว้ 2 วัน ให้คนที่มาทีหลังเจอ "เงา" ได้แม้ไม่มีใครออนไลน์
      if (okMe && me.age >= 14) { try { await pipe([['HSET', 'mpold:' + x, id, JSON.stringify(me)], ['EXPIRE', 'mpold:' + x, 172800]]) } catch {} }
      const cand = [], stale = [];
      for (let i = 0; i < (all || []).length; i += 2) { const k0 = all[i]; let v = null; try { v = JSON.parse(all[i + 1]) } catch {} if (!v || now - v.t > 300e3) { stale.push(k0); continue } if (k0 !== id) cand.push(Object.assign(v, { k: k0.slice(0, 6) + k0.slice(-4) })) }
      const L2 = [['EXPIRE', key, 3600]]; if (stale.length) L2.push(['HDEL', key, ...stale.slice(0, 50)]); if (box && box.length) L2.push(['DEL', 'mbox:' + id]); if (gbox && gbox.length) L2.push(['DEL', 'gbox:' + id]);
      await pipe(L2);
      // สัตว์อสูรไม่เป็นฝ่ายเริ่ม · มนุษย์มีโอกาสเจอสัตว์อสูร (ผู้เล่นจริง) มากขึ้นเมื่อมีในเซิร์ฟเวอร์
      let o = null;
      if (!me.bm && cand.length) { const bc = cand.filter(c => c.bm), hc = cand.filter(c => !c.bm); const pool = bc.length && (!hc.length || Math.random() < .45) ? bc : hc.length ? hc : bc; o = pool[Math.floor(Math.random() * pool.length)] }
      let pa = null, pw = 0; try { pa = paSum(await paTick(now)); pw = +(await cmd('LLEN', 'pa:win:' + id)) || 0 } catch {}
      let gh = null;
      if (!o && !me.bm && me.age >= 14 && Math.random() < .5) {
        try {
          const rf = await cmd('HRANDFIELD', 'mpold:' + x, 8, 'WITHVALUES'), live = new Set(); for (let i = 0; i < (all || []).length; i += 2) live.add(all[i]);
          const gs = [], old = [];
          for (let i = 0; i < (rf || []).length; i += 2) { const k0 = rf[i]; let v = null; try { v = JSON.parse(rf[i + 1]) } catch {} if (!v || now - v.t > 172800e3) { old.push(k0); continue } if (k0 === id || live.has(k0) || now - v.t < 300e3) continue; gs.push(Object.assign(v, { k: k0.slice(0, 6) + k0.slice(-4), ago: now - v.t })) }
          if (old.length) await cmd('HDEL', 'mpold:' + x, ...old);
          if (gs.length) { const near = gs.filter(v => Math.abs((v.ri || 0) - me.ri) <= 2); const pool = near.length ? near : gs; gh = pool[Math.floor(Math.random() * pool.length)] }
        } catch {}
      }
      const inbox0 = (gbox || []).map(s0 => { try { return JSON.parse(s0) } catch { return null } }).filter(Boolean);
      return res.json({ pa, pw, o, gh, n: cand.length, inbox: inbox0.concat((box || []).map(s0 => { try { return JSON.parse(s0) } catch { return null } }).filter(Boolean)) });
    }
    // ผลการเจอ "เงา" → แจ้งเจ้าของเงาเมื่อเขากลับมาเล่น (เก็บ 3 วัน)
    if (a === 'bsh') {
      if (b.tp || await isBanned()) return res.json({ o: null, notes: [] });
      const ok = await cmd('SET', 'bshl:' + id, 1, 'NX', 'EX', 20);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const x = b.x ? 1 : 0, key = 'bsh:' + x;
      const me = { n: clean(b.n, 20) || 'นิรนาม', sp: clean(b.sp, 16), st: Math.max(0, Math.min(12, +b.st || 0)), p: Math.max(0, Math.min(1e15, +b.p || 0)), k: id.slice(0, 6) + id.slice(-4), t: now };
      const [, , nl] = await pipe([['HSET', key, id, JSON.stringify(me)], ['EXPIRE', key, 86400 * 3], ['LRANGE', 'bsn:' + id, 0, 9], ['DEL', 'bsn:' + id]]);
      let o = null;
      for (let k = 0; k < 4 && !o; k++) {
        const f = await cmd('HRANDFIELD', key, 1);
        const fid = Array.isArray(f) ? f[0] : f;
        if (fid && fid !== id) { try { const v = JSON.parse(await cmd('HGET', key, fid)); if (v && now - v.t < 3 * 864e5) o = v } catch {} }
      }
      const notes = (nl || []).map(s0 => { try { return JSON.parse(s0) } catch { return null } }).filter(Boolean);
      return res.json({ o, notes });
    }
    if (a === 'bshres') {
      if (b.tp || await isBanned()) return res.json({ ok: 0 });
      const ok = await cmd('SET', 'bshr:' + id, 1, 'NX', 'EX', 10);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const to = String(b.to || '').replace(/[^a-z0-9]/g, '').slice(0, 12), x = b.x ? 1 : 0;
      const ks = await cmd('HKEYS', 'bsh:' + x);
      const tid = (ks || []).find(k0 => k0.slice(0, 6) + k0.slice(-4) === to);
      if (!tid || tid === id) return res.json({ ok: 0 });
      const m = { n: clean(b.n, 20) || 'นิรนาม', win: b.win ? 1 : 0, t: now };
      await pipe([['LPUSH', 'bsn:' + tid, JSON.stringify(m)], ['LTRIM', 'bsn:' + tid, 0, 9], ['EXPIRE', 'bsn:' + tid, 259200]]);
      return res.json({ ok: 1 });
    }
    if (a === 'wboss') {
      const K = 'wb:' + W, KN = 'wbn:' + W, KT = 'wbt:' + W;
      if (b.d != null) {
        const ok = await cmd('SET', 'wbl:' + id, 1, 'NX', 'EX', 45);
        if (!ok) return res.status(429).json({ err: 'rate' });
        if (!b.tp && !(await isBanned())) {
          const d = Math.max(0, Math.min(2000, Math.round(+b.d || 0)));
          await pipe([['ZINCRBY', K, d, id], ['HSET', KN, id, clean(b.n, 20) || 'นิรนาม'], ['INCRBY', KT, d], ['EXPIRE', K, 86400 * 14], ['EXPIRE', KN, 86400 * 14], ['EXPIRE', KT, 86400 * 14]]);
        }
      }
      const [top, tot, mine, rk] = await pipe([['ZREVRANGE', K, 0, 9, 'WITHSCORES'], ['GET', KT], ['ZSCORE', K, id], ['ZREVRANK', K, id]]);
      const ids = [], sc = [];
      for (let i = 0; i < (top || []).length; i += 2) { ids.push(top[i]); sc.push(+top[i + 1] || 0) }
      const nms = ids.length ? (await cmd('HMGET', KN, ...ids)) || [] : [];
      return res.json({ top: ids.map((_, i) => [nms[i] || 'นิรนาม', sc[i]]), tot: +tot || 0, mine: +mine || 0, rk: rk == null ? null : +rk });
    }
    if (a === 'ghact') {
      if (b.tp || await isBanned()) return res.json({ ok: 0 });
      const ok = await cmd('SET', 'mtl:' + id, 1, 'NX', 'EX', 15);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const to = String(b.to || '').replace(/[^a-z0-9]/g, '').slice(0, 12), x = b.x ? 1 : 0;
      const ks = await cmd('HKEYS', 'mpold:' + x);
      const tid = (ks || []).find(k0 => k0.slice(0, 6) + k0.slice(-4) === to);
      if (!tid || tid === id) return res.json({ ok: 0 });
      const kind = ['duel', 'flee', 'pact', 'sworn', 'none', 'betr', 'tame', 'yield'].includes(b.kind) ? b.kind : 'none';
      const m = { kind: 'gh', r: kind, n: clean(b.n, 20) || 'นิรนาม', win: b.win ? 1 : 0, w: Math.max(0, Math.min(3, +b.w || 0)), k: id.slice(0, 6) + id.slice(-4), t: now };
      await pipe([['LPUSH', 'gbox:' + tid, JSON.stringify(m)], ['LTRIM', 'gbox:' + tid, 0, 9], ['EXPIRE', 'gbox:' + tid, 259200]]);
      return res.json({ ok: 1 });
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
      const CH = ['fight', 'ally', 'betray', 'leave', 'bond'], CHR = ['fight', 'ally', 'betray', 'leave'];
      const rnd = () => CHR[Math.floor(Math.random() * CHR.length)];
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
        // ผูกสัมพันธ์: ทั้งคู่เลือก "ผูกสัมพันธ์" → คู่รัก (เพศตรงข้าม ยังไม่มีคู่ทั้งคู่) หรือพี่น้องร่วมสาบาน
        if (o.k === 'pact' && ca === 'bond' && cb === 'bond') { o.k = 'bond'; o.love = (r.A.g && r.B.g && r.A.g !== r.B.g && !r.A.ms && !r.B.ms) ? 1 : 0 }   // ไว้ใจกันจริงทั้งคู่
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
        if (!tid || tid === id || !B || now - B.t > 330e3 || B.bm) return res.json({ ok: 0 });
        const A = { n: clean(b.n, 20) || 'นิรนาม', ri: Math.max(0, Math.min(12, +b.ri || 0)), p: Math.max(0, Math.min(1e13, +b.p || 0)), f: clean(b.f, 30), age: Math.max(0, +b.age || 0), c: Math.max(0, Math.min(999, Math.round(+b.cha || 0))), k: id.slice(0, 6) + id.slice(-4), g: b.g === 'f' ? 'f' : 'm', ms: b.ms ? 1 : 0, w: Math.max(0, Math.min(3, +b.w || 0)) };
        B = { n: B.n, ri: B.ri, p: B.p, f: B.f, age: B.age, c: B.c || 0, k: to, g: B.g || '', ms: B.ms ? 1 : 0, w: B.w || 0 };
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
        const tamer = alive.find(i => hc[i] === 'tame');
        // สัตว์ยอมแลกชีวิต/รับสัญญา: ไม่มีใครเสียแก่น
        if (cb === 'yield' || cb === 'accept') {
          if (cb === 'accept' && tamer != null) { o.k = 'pact'; o.taker = tamer }
          else { o.k = 'y'; o.taker = alive.length === 2 ? (Math.random() < P(hp[0], hp[1]) ? 0 : 1) : alive[0] }
          r.res = o; r.rt = now; return r }
        const hunt = alive.reduce((a0, i) => a0 + hp[i], 0) * (o.coop ? .9 : 1) * (tamer != null ? .9 : 1), trap = alive.some(i => hc[i] === 'trap'), bp = r.B.p;
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
        if (role === 'b' && ['fight', 'flee', 'hide', 'yield', 'accept'].includes(c)) W.push(['HSETNX', K, 'cb', c]);
        if (role !== 'b') { if (['hunt', 'trap', 'tame'].includes(c)) W.push(['HSETNX', K, 'c' + hi, c]); if (['coop', 'steal'].includes(j)) W.push(['HSETNX', K, 'j' + hi, j]) } }
      W.push(['EXPIRE', K, 900], ['HGETALL', K]);
      const out = await pipe(W), hv = out[out.length - 1] || [], H = {};
      if (Array.isArray(hv)) for (let k = 0; k < hv.length; k += 2) H[hv[k]] = hv[k + 1]; else Object.assign(H, hv || {});
      if (H.res) { try { r.res = JSON.parse(H.res) } catch {} }
      if (!r.res) { resolve(r, H); if (r.res) { const ok = await cmd('HSETNX', K, 'res', JSON.stringify(r.res)); if (+ok !== 1) { try { r.res = JSON.parse(await cmd('HGET', K, 'res')) } catch {} } else {
        const ids = [r.b, ...r.H.map(h => h.id)].filter(x0 => x0 !== id), L = []; ids.forEach(t => L.push(['LPUSH', 'mbox:' + t, JSON.stringify({ kind: 'bhres', rid, t: now })], ['LTRIM', 'mbox:' + t, 0, 9], ['EXPIRE', 'mbox:' + t, 3600])); L.push(['DEL', 'bhc:' + r.b]); await pipe(L) } } }
      return res.json({ ok: 1, st: view(r, H, role) });
    }
    if (a === 'pastat') { if (!isAdmKey(b.key || qOf(req).key)) return res.status(403).json({ err: 'admin' }); const L = ((await cmd('LRANGE', 'pa:stat', 0, 59)) || []).map(jp).filter(Boolean); return res.json({ ok: 1, l: L }) }
    if (a === 'pa' || a === 'pabid' || a === 'pachat' || a === 'pavote' || a === 'paclaim') {
      if (!okId(id)) return res.json({ ok: 0 });
      if (a !== 'pa' && a !== 'paclaim' && (b.tp || await isBanned())) return res.json({ ok: 0, err: 'ban' });
      const cur = await paTick(now); if (!cur) return res.json({ ok: 1, cur: null });
      const sid = cur.sid;
      if (a === 'pabid') {
        if (String(b.sid) !== sid || +b.li !== cur.li || cur.phase !== 'open') return res.json({ ok: 0, err: 'lot' });
        if (cur.ls && now < cur.ls) return res.json({ ok: 0, code: -5 });
        if ((await cmd('SET', 'pabl:' + id, 1, 'NX', 'PX', 900)) !== 'OK') return res.status(429).json({ err: 'rate' });
        const L = cur.lots[cur.li];
        // โควต้ารายวันแยกตามโลกของชิ้นนั้น (ยุทธภพ / โลกเซียน / แดนเทพ โลกละ 3 ชิ้น) — เหาะขึ้นโลกใหม่แล้วยังซื้อของโลกใหม่ได้ · ปั๊มไม่ได้เพราะเพดานรวม 9
        const [wd, ws] = await pipe([['GET', 'pa:wd:' + PA_DAY(now) + ':' + id + ':' + (L.w || 'm')], ['HGET', 'pa:ws:' + sid, id]]);
        if ((+wd || 0) >= 3) return res.json({ ok: 0, code: -2 });
        if ((+ws || 0) >= 2) return res.json({ ok: 0, code: -3 });
        const g = Math.max(1, Math.min(1e13, Math.floor(+b.g || 0)));
        { const why = paElig(L, ['m', 'x', 'g'].includes(b.w) ? b.w : 'm', Math.max(0, Math.min(9, Math.floor(+b.ri || 0)))); if (why) return res.json({ ok: 0, code: -4, why }) }
        const r = await cmd('EVAL', PA_BID_LUA, 2, 'pa:b:' + sid + ':' + cur.li, 'pa:end:' + sid, g, id, clean(b.n, 20) || 'นิรนาม', now, paPrice(cur, L, now));
        if (+r[0] === 1) { try { await pipe([['SADD', 'pa:bd:' + sid, id], ['EXPIRE', 'pa:bd:' + sid, 7200]]) } catch {} }
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
      const [, , vw, bh, ch0, vh, myv, wins, endV, cons, wdq, wsq] = await pipe([join ? ['ZADD', 'pa:vw:' + sid, now, id] : ['PING'], ['ZREMRANGEBYSCORE', 'pa:vw:' + sid, 0, now - 15e3], ['ZCARD', 'pa:vw:' + sid], ['HGETALL', 'pa:b:' + sid + ':' + cur.li], ['LRANGE', 'pa:c:' + sid, 0, 24], ['HGETALL', 'pa:v:' + sid], ['HGET', 'pa:vu:' + sid, id], ['LRANGE', 'pa:win:' + id, 0, 9], ['GET', 'pa:end:' + sid], ['GET', 'pa:cons:' + id], ['GET', 'pa:wd:' + PA_DAY(now) + ':' + id + ':' + ((cur.lots[cur.li] || {}).w || 'm')], ['HGET', 'pa:ws:' + sid, id]]);
      try { const vk = 'pa:vmax:' + sid; if ((+vw || 0) > (+(await cmd('GET', vk)) || 0)) await cmd('SET', vk, +vw || 0, 'EX', 7200) } catch {}
      let consOk = 0; if (cons && (b.cons || qOf(req).cons)) { const dk = 'pa:consd:' + PA_DAY(now) + ':' + id, [c1] = await pipe([['INCR', dk], ['EXPIRE', dk, 172800], ['DEL', 'pa:cons:' + id]]); consOk = +c1 <= 5 ? 1 : 0 }
      const H = {}; if (Array.isArray(bh)) for (let i = 0; i < bh.length; i += 2) H[bh[i]] = bh[i + 1]; else Object.assign(H, bh || {});
      const V = {}; if (Array.isArray(vh)) for (let i = 0; i < vh.length; i += 2) V[vh[i]] = +vh[i + 1]; else for (const k in (vh || {})) V[k] = +vh[k];
      return res.json({ ok: 1, now, cur: { sid, phase: cur.phase, next: cur.next || 0, li: cur.li, ls: cur.ls || 0, end: +endV || cur.end || 0, nb: cur.nbEnd || 0, lots: cur.lots, votes: V }, bid: { hi: +H.hi || 0, bn: H.bn || '', me: H.by === id ? 1 : 0, ext: +H.ext || 0, pn: cur.phase === 'open' && !(+H.hi) ? paPrice(cur, cur.lots[cur.li], now) : 0 }, cons: cons ? 1 : 0, q: (cur.phase === 'open' && cur.lots[cur.li]) ? { wd: +wdq || 0, ws: +wsq || 0, why: b.w ? paElig(cur.lots[cur.li], ['m', 'x', 'g'].includes(b.w) ? b.w : 'm', Math.max(0, Math.min(9, Math.floor(+b.ri || 0)))) : '' } : null, consOk, vw: +vw || 0, chat: (ch0 || []).map(jp).filter(Boolean).reverse(), myv: myv == null ? -1 : +myv, wins: (wins || []) });
    }
    // ---- 🌐 ร่องรอยผู้เล่นจริงประจำโลก (ข้อความสำเร็จรูปเท่านั้น) + 🤝 ภารกิจร่วมรายวันของแต่ละโลก ----
    if (a === 'wtr' || a === 'wpool') {
      if (!okId(id)) return res.json({ ok: 0 });
      const WLD = ['normal', 'hunter', 'under', 'ghost', 'loop', 'zombie', 'tower', 'game', 'gatewon', 'doom', 'soul'];
      const w = WLD.includes(b.w) ? b.w : null; if (!w) return res.json({ ok: 0 });
      if (a === 'wtr') {
        if (b.put) {
          if (await isBanned()) return res.json({ ok: 0, err: 'ban' });
          const m = Math.floor(+b.m); if (!(m >= 0 && m < 12)) return res.json({ ok: 0 });
          if ((await cmd('SET', 'wtrl:' + w + ':' + id, 1, 'NX', 'EX', 600)) !== 'OK') return res.json({ ok: 0, err: 'rate' });
          await pipeSoft([['LPUSH', 'wtr:' + w, JSON.stringify({ n: noAdm(clean(b.n, 20)) || 'นิรนาม', m, t: now })], ['LTRIM', 'wtr:' + w, 0, 39], ['EXPIRE', 'wtr:' + w, 86400 * 30]]);
        }
        const L = await cmd('LRANGE', 'wtr:' + w, 0, 14);
        return res.json({ ok: 1, l: (L || []).map(jp).filter(Boolean) });
      }
      const day = PA_DAY(now), pk = 'wpl:' + w + ':' + day;
      if (b.g) {
        if (await isBanned()) return res.json({ ok: 0, err: 'ban' });
        const uk = 'wplu:' + w + ':' + day + ':' + id, mine = +(await cmd('GET', uk)) || 0;
        if (mine >= 5) return res.json({ ok: 0, err: 'cap', mine });
        await pipeSoft([['INCR', pk], ['EXPIRE', pk, 172800], ['INCR', uk], ['EXPIRE', uk, 172800]]);
      }
      const [tot, mine] = await pipe([['GET', pk], ['GET', 'wplu:' + w + ':' + day + ':' + id]]);
      return res.json({ ok: 1, day, tot: +tot || 0, mine: +mine || 0 });
    }
    // ---- สุสานผู้เล่นจริง: ป้ายหลุมศพ + คำอำลาของผู้เล่นคนอื่น ----
    if (a === 'grave') {
      if (!okId(id)) return res.json({ err: 'id' });
      if (!(await cmd('SET', 'gvrl:' + id, 1, 'NX', 'EX', 60))) return res.json({ ok: 0, rate: 1 });
      if (await cmd('SISMEMBER', 'cheaters', id)) return res.json({ ok: 1 });
      const g = { i: 'g' + now.toString(36) + Math.random().toString(36).slice(2, 5), n: noAdm(clean(b.n, 20)) || 'นิรนาม', e: clean(b.e, 30), a: Math.max(0, Math.min(1e7, Math.floor(+b.a || 0))), r: clean(b.r, 30), c: clean(b.c, 80), y: clean(b.y, 80), w: ['m', 'x', 'g'].includes(b.w) ? b.w : 'm', ar: clean(b.ar, 30), ri: Math.max(0, Math.min(9, Math.floor(+b.ri || 0))), hl: Math.max(0, Math.min(100, Math.floor(+b.hl || 0))), t: now };
      await pipe([['LPUSH', 'graves', JSON.stringify(g)], ['LTRIM', 'graves', 0, 299]]);
      return res.json({ ok: 1, i: g.i });
    }
    if (a === 'graves') {
      const [list, hidden] = await pipe([['LRANGE', 'graves', 0, 299], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []), L = (list || []).map(jp).filter(x => x && !hs.has(x.i));
      const pick = L.slice(0, 4), rest = L.slice(4);
      const best = rest.slice().sort((x, y) => (y.ri - x.ri) || (y.a - x.a)).slice(0, 3); best.forEach(x => pick.push(x));
      const pool = rest.filter(x => !best.includes(x)); for (let k = 0; k < 8 && pool.length; k++) pick.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      const pr = pick.length ? await cmd('HMGET', 'gvpr', ...pick.map(x => x.i)) : [];
      return res.json({ g: pick.map((x, k) => Object.assign(x, { p: +(pr && pr[k]) || 0 })), n: L.length });
    }
    if (a === 'gpray') {
      const gid = String(b.g || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      if (!okId(id) || !gid) return res.json({ err: 'id' });
      const ok = await cmd('SET', 'gp:' + id + ':' + gid, 1, 'NX', 'EX', 86400 * 7);
      const n = ok ? await cmd('HINCRBY', 'gvpr', gid, 1) : +(await cmd('HGET', 'gvpr', gid)) || 0;
      return res.json({ ok: ok ? 1 : 0, n });
    }
    if (a === 'hgraves') {
      const [list, hidden] = await pipe([['LRANGE', 'graves', 0, 299], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []), L = (list || []).map(jp).filter(x => x && !hs.has(x.i) && (x.hl || 0) >= 19);
      const out = []; while (L.length && out.length < 12) out.push(L.splice(Math.floor(Math.random() * L.length), 1)[0]);
      return res.json({ g: out.map(x => ({ n: x.n, y: x.y, ar: x.ar, hl: x.hl })) });
    }
    if (a === 'shrine') {
      if (!okId(id)) return res.json({ err: 'id' });
      const c = Math.max(0, Math.min(4, Math.floor(+b.c || 0))), k = String(b.k || '').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 24);
      if (!k) return res.json({ err: 'k' });
      if (!(await cmd('SET', 'shrl:' + id, 1, 'NX', 'EX', 20))) return res.json({ err: 'rate' });
      const key = 'shr:' + c, mine = JSON.stringify({ k, n: noAdm(clean(b.n, 20)) || 'นิรนาม', u: id, t: now });
      let got = null; for (let tries = 0; tries < 3; tries++) { const v = jp(await cmd('RPOP', key)); if (!v) break; if (v.u === id) { await cmd('LPUSH', key, JSON.stringify(v)); continue } got = v; break }
      await pipe([['LPUSH', key, mine], ['LTRIM', key, 0, 39]]);
      return res.json(got ? { k: got.k, n: got.n } : { empty: 1 });
    }
    if (a === 'kwall') {
      if (!okId(id)) return res.json({ err: 'id' });
      const k = Math.max(1, Math.min(8, Math.floor(+b.k || 0))), key = 'kw:' + k;
      if (await cmd('SISMEMBER', 'cheaters', id)) return res.json({ l: [] });
      let first = 0;
      if (await cmd('HSETNX', 'kwid:' + k, id, now)) { const n = noAdm(clean(b.n, 20)) || 'นิรนาม'; await cmd('ZADD', key, now, JSON.stringify({ n, u: id.slice(0, 6), t: now })); if ((+(await cmd('ZCARD', key)) || 0) === 1) first = 1 }
      const L = ((await cmd('ZRANGE', key, 0, 19)) || []).map(jp).filter(Boolean), mt = +(await cmd('HGET', 'kwid:' + k, id)) || now;
      const rank = (+(await cmd('ZCOUNT', key, '-inf', mt)) || L.length);
      return res.json({ l: L.map(x => ({ n: x.n, t: x.t })), first, rank });
    }
    // ---- ภัยพิบัติประจำสัปดาห์: ผู้เล่นทุกคนช่วยกันสะสมแต้ม ----
    const CAL_N = 5, calIdx = w => { let h = 7; for (const c of String(w)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % CAL_N };
    const calGoal = async () => { let g = +(await cmd('GET', 'calg2:' + W)) || 0; if (!g) { const pw = week(new Date(now - 7 * 86400e3)), pt = +(await cmd('GET', 'calt:' + pw)) || 0; g = Math.max(120, Math.min(30000, Math.round((pt ? pt * 0.9 : 150) / 10) * 10)); await cmd('SET', 'calg2:' + W, g, 'NX', 'EX', 86400 * 30); g = +(await cmd('GET', 'calg2:' + W)) || g } return g };
    if (a === 'cal') {
      const goal = await calGoal(), pw = week(new Date(now - 7 * 86400e3));
      const [tot, top, mine, cl, ptot, pg, ptop, pg2, fd] = await pipe([['GET', 'calt:' + W], ['ZREVRANGE', 'calz:' + W, 0, 9, 'WITHSCORES'], okId(id) ? ['ZSCORE', 'calz:' + W, id] : ['GET', 'x:none'], okId(id) ? ['SISMEMBER', 'calr:' + W, id] : ['GET', 'x:none'], ['GET', 'calt:' + pw], ['GET', 'calg:' + pw], ['ZREVRANGE', 'calz:' + pw, 0, 2, 'WITHSCORES'], ['GET', 'calg2:' + pw], ['LRANGE', 'calf:' + W, 0, 11]]);
      const ids = []; for (let k = 0; k < (top || []).length; k += 2) ids.push(top[k]); for (let k = 0; k < (ptop || []).length; k += 2) ids.push(ptop[k]);
      const nm = ids.length ? await cmd('HMGET', 'calnm', ...ids) : [];
      const mk = (l, o) => { const r = []; for (let k = 0; k < (l || []).length; k += 2) r.push({ n: (nm && nm[o + k / 2]) || 'นิรนาม', s: +l[k + 1], me: l[k] === id ? 1 : 0 }); return r };
      const tl = (top || []).length / 2;
      return res.json({ w: W, i: calIdx(W), tot: +tot || 0, goal, top: mk(top, 0), mine: +mine || 0, cl: cl ? 1 : 0, end: Math.max(0, (() => { const d = new Date(now + 7 * 3600e3), dw = (d.getUTCDay() + 6) % 7; return (7 - dw) * 86400e3 - (d.getUTCHours() * 3600e3 + d.getUTCMinutes() * 60e3) })()), prev: { i: calIdx(pw), tot: +ptot || 0, goal: +pg2 || +pg || 0, top: mk(ptop, tl) }, feed: (fd || []).map(jp).filter(Boolean) });
    }
    if (a === 'calp') {
      if (!okId(id)) return res.json({ err: 'id' });
      if (!(await cmd('SET', 'calrl:' + id, 1, 'NX', 'EX', 3))) return res.json({ err: 'rate' });
      const v = Math.max(1, Math.min(4, Math.floor(+b.v || 1))), dk = 'cald:' + new Date(now + 7 * 3600e3).toISOString().slice(0, 10) + ':' + id;
      const used = +(await cmd('INCR', dk)) || 0; if (used === 1) await cmd('EXPIRE', dk, 86400 * 2);
      if (used > 8) return res.json({ err: 'cap', used });
      if (await cmd('SISMEMBER', 'cheaters', id)) return res.json({ ok: 1, used });
      const n = noAdm(clean(b.n, 20)) || 'นิรนาม';
      const fk = ['fight', 'give', 'qi'].includes(b.k) ? b.k : 'give', fe = JSON.stringify({ n, k: fk, w: b.wn ? 1 : 0, v, t: now });
      const [tot] = await pipe([['INCRBY', 'calt:' + W, v], ['ZINCRBY', 'calz:' + W, v, id], ['HSET', 'calnm', id, n], ['EXPIRE', 'calt:' + W, 86400 * 30], ['EXPIRE', 'calz:' + W, 86400 * 30], ['LPUSH', 'calf:' + W, fe], ['LTRIM', 'calf:' + W, 0, 19], ['EXPIRE', 'calf:' + W, 86400 * 10]]);
      return res.json({ ok: 1, tot: +tot || 0, used, goal: await calGoal() });
    }
    if (a === 'calc') {
      if (!okId(id)) return res.json({ err: 'id' });
      const goal = await calGoal(), [tot, mine] = await pipe([['GET', 'calt:' + W], ['ZSCORE', 'calz:' + W, id]]);
      if ((+tot || 0) < goal) return res.json({ err: 'goal' });
      if ((+mine || 0) < 6) return res.json({ err: 'mine' });
      const ok = await cmd('SADD', 'calr:' + W, id); await cmd('EXPIRE', 'calr:' + W, 86400 * 30);
      return res.json({ ok: ok ? 1 : 0, dup: ok ? 0 : 1 });
    }
    // ---- บอร์ดโหวตฟีเจอร์: ไอเดียที่คนอยากได้มากสุด ----
    if (a === 'ideas') {
      const [list, hidden, done] = await pipe([['LRANGE', 'bugs2', 0, 299], ['SMEMBERS', 'chat:hidden'], ['SMEMBERS', 'bugdone']]);
      const hs = new Set(hidden || []), ds = new Set(done || []);
      const L = (list || []).map(jp).filter(m => m && m.k === 'idea' && !hs.has(m.i));
      const cnt = L.length ? await pipe(L.map(m => ['SCARD', 'bv:' + m.i])) : [];
      const ed = L.length ? await cmd('HMGET', 'bugedit', ...L.map(m => m.i)) : [];
      const voted = L.length && okId(id) ? await pipe(L.map(m => ['SISMEMBER', 'bv:' + m.i, id])) : [];
      const out = L.map((m, k) => { let e = null; try { e = ed && ed[k] ? JSON.parse(ed[k]) : null } catch {} return { i: m.i, n: m.n, t: m.t, x: e ? e.x : m.x, c: +cnt[k] || 0, d: ds.has(m.i) ? 1 : 0, mv: voted[k] ? 1 : 0 } }).sort((x, y) => (x.d - y.d) || (y.c - x.c) || (y.t - x.t)).slice(0, 40);
      return res.json({ m: out });
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
    console.error('API_ERR', a, String(e && e.message || e).slice(0, 200), process.env.DEBUG_API ? (e && e.stack) : '');
    // บอกแค่ "ประเภท" ของปัญหา (ไม่เปิดข้อความจริง) เพื่อให้ผู้ดูแลเห็นสาเหตุจากหน้าเว็บ/โทรศัพท์ได้
    const em = String(e && e.message || e), why = /NOAUTH|WRONGPASS|AUTH/i.test(em) ? 'auth' : /OOM|maxmemory/i.test(em) ? 'oom' : /timeout/i.test(em) ? 'timeout' : /closed|not connected|ECONN|ENOTFOUND|EAI_AGAIN|socket|TLS|certificate|CERT|reset/i.test(em) ? 'conn' : /max (daily )?requests?|quota/i.test(em) ? 'quota' : /JSON|undefined|null|Cannot read/i.test(em) ? 'code' : 'other';
    return res.status(/timeout|valkey down|not connected|closed/i.test(em) ? 503 : 500).json({ err: /valkey down|connect timeout/i.test(em) ? 'db' : 'server', why });
  }
};
module.exports.vkReset = vkReset;
// ราคาแพ็กล็อกคำตอบขึ้นกับจำนวนที่ผู้เล่นซื้อไปแล้ว (เรียกจาก worker ก่อนตรวจยอดสลิป) · null = ซื้อไม่ได้แล้ว
module.exports.akPrice = async (uid, P) => { if (!P || !okId(uid)) return P; if (P.kind === 'akt') return (+(await cmd('GET', 'akt:' + uid))) ? null : P; if (P.kind !== 'ak') return P; const L = await akLim(uid, 0); if (!L.v || !L.nx) return null; return Object.assign({}, P, { amt: L.nx }) };
module.exports.vkRun = vkRun;
// 💳 ให้สิทธิ์หลังตรวจสลิปอัตโนมัติสำเร็จ (เรียกจาก cloudflare/worker.js /api/pay) — pack: v1|v2|v3 = VIP, rs|rm|rl = ซื้อสุ่มเกิด
module.exports.payPack = pk => { pk = String(pk || ''); if (pk === 'prest') return { kind: 'cos', amt: 149, tier: 0, days: 0, n: 0, items: PA_ALL.slice(), key: pk, dyn: 1 }; if (pk === 'akp') return { kind: 'ak', amt: AK_PR[0], n: 5 }; if (pk === 'akt') return { kind: 'akt', amt: AK_TRIAL, n: 3 }; if (/^sp(1|2|21)$/.test(pk)) { const s = seaNow(); if (!s) return null; return { kind: 'sp', amt: pk === 'sp1' ? 59 : pk === 'sp2' ? 129 : 70, tier: pk === 'sp1' ? 1 : 2, up: pk === 'sp21' ? 1 : 0, sea: s.id, key: pk } } if (pk === 'nv1') return { kind: 'nv', amt: 19, n: 1 }; if (EVB[pk]) return evOpen() ? { kind: 'cos', amt: EVB[pk][0], tier: 0, days: 0, n: 0, items: EVB[pk][1].map(k => EVM[k][1]), key: pk, ev: 1, bun: EVB[pk][1] } : null; if (EVM[pk]) return evOpen() ? { kind: 'cos', amt: EVM[pk][0], tier: 0, days: 0, n: 0, items: [EVM[pk][1]], key: pk, ev: 1, cap: EVM[pk][2] } : null; if (COS_P[pk]) return { kind: 'cos', amt: COS_P[pk][0], tier: 0, days: 0, n: 0, items: COS_P[pk][1], key: pk }; if (VIP_PK[pk]) return { kind: 'vip', amt: VIP_PK[pk][0], tier: VIP_PK[pk][1], days: VIP_PK[pk][2] }; const lk = /^lk\d+$/.test(pk) && LK_PK[pk.slice(2)]; if (lk) return { kind: 'lk', amt: lk[0], n: lk[1] }; const r = pk[0] === 'r' && RR_PK[pk.slice(1)]; return r ? { kind: 'rr', amt: r[0], n: r[1] } : null };
module.exports.cosDyn = async (uid, P) => { if (!P || !P.dyn || !okId(uid)) return P; const r = await paRest(uid); if (!r.left.length) return null; return Object.assign({}, P, { amt: r.amt, items: r.left }) };
module.exports.payGrant = async (uid, pk, name) => {
  const P = pk && typeof pk === 'object' ? pk : module.exports.payPack(pk);
  if (P && P.kind === 'ak' && okId(uid)) { const c = +(await cmd('INCR', 'akp:' + uid)); if (c > AK_PR.length) { await cmd('DECR', 'akp:' + uid); throw new Error('akmax') } await cmd('SADD', 'supok', uid); return P }
  if (P && P.kind === 'akt' && okId(uid)) { if (!(await cmd('SET', 'akt:' + uid, 1, 'NX'))) throw new Error('already'); await cmd('SADD', 'supok', uid); return P }
  if (P && P.bun && okId(uid)) { const own = new Set((await cmd('SMEMBERS', 'cos:' + uid)) || []), todo = P.bun.filter(k => !own.has(EVM[k][1])); for (const k of todo) { if ((+(await cmd('GET', 'evn:' + k)) || 0) >= EVM[k][2]) throw new Error('soldout') } const got = []; for (const k of todo) { const sn = +(await cmd('INCR', 'evn:' + k)); if (sn > EVM[k][2]) { await cmd('DECR', 'evn:' + k); continue } await cmd('HSET', 'evs:' + uid, EVM[k][1], sn); await cmd('LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u: uid, k, i: EVM[k][1], m: 'pay', n: sn })); got.push(EVM[k][1]) } await cmd('LTRIM', 'evlog', 0, 299); if (!got.length) throw new Error('already'); await cmd('SADD', 'cos:' + uid, ...got); await cmd('SADD', 'supok', uid); return P }
  if (P && P.kind === 'cos' && okId(uid)) { const it = (P.items || []).filter(x => COS_ALL.has(x)); if (!it.length) throw new Error('bad pack/id'); if (P.ev && !(+(await cmd('SISMEMBER', 'cos:' + uid, it[0])))) { const sn = +(await cmd('INCR', 'evn:' + P.key)); if (sn > P.cap) { await cmd('DECR', 'evn:' + P.key); throw new Error('soldout') } await cmd('HSET', 'evs:' + uid, it[0], sn); await cmd('LPUSH', 'evlog', JSON.stringify({ t: Date.now(), u: uid, k: P.key, i: it[0], m: 'pay', n: sn })); await cmd('LTRIM', 'evlog', 0, 299) } await cmd('SADD', 'cos:' + uid, ...it); await cmd('SADD', 'supok', uid); return P }
  if (P && P.kind === 'nv' && okId(uid)) { await cmd('INCRBY', 'nvc:' + uid, P.n || 1); await cmd('SADD', 'supok', uid); return P }
  if (P && P.kind === 'sp' && okId(uid)) { const s = SEA.find(x => x.id === P.sea) || seaNow(); if (!s) throw new Error('season');
    const k = spKey(s, uid), t0 = +(await cmd('HGET', k, 't')) || 0;
    if (P.up && t0 < 1) throw new Error('need sp1');
    if (P.tier > t0) await cmd('HSET', k, 't', P.tier);
    if (P.tier === 2 && t0 < 2) { await pipe([['HINCRBY', k, 'p', SP_LV * 10], ['SADD', 'cos:' + uid, 'f_s3', 't_s3', 'c_s3'], ['HSET', 'spe:' + s.id, uid, JSON.stringify({ n: clean(String(name || ''), 24), t: Date.now() })]]) }
    await pipe([['EXPIRE', k, 86400 * 120], ['SADD', 'supok', uid]]); return P }
  if (!P || !okId(uid) || !(P.kind === 'rr' || P.kind === 'lk' ? P.n > 0 : P.tier >= 1 && P.tier <= 3)) throw new Error('bad pack/id');
  if (P.kind === 'lk') { await cmd('INCRBY', 'lkc:' + uid, P.n); await cmd('SADD', 'supok', uid); return P }
  if (P.kind === 'rr') { await cmd('INCRBY', 'rrc:' + uid, P.n); await cmd('SADD', 'supok', uid); return P }
  await vipAdd(uid, P.tier, P.days, 1); await cmd('SADD', 'supok', uid);
  if (P.tier === 3) { if (!(await cmd('HEXISTS', 'vipu', uid))) { const o = +(await cmd('INCR', 'vipuN')) || 1; await cmd('HSET', 'vipu', uid, JSON.stringify({ n: clean(String(name || ''), 24), o, t: Date.now() })) } else await vipHeal(uid) }
  return P;
};

// ประกาศการซื้อด้วยเงินจริงลงแชท (แบนเนอร์ตามระดับราคา) · เก็บ 30 รายการล่าสุด
const EVN = { f_e1: 'กระทงใบตอง', f_e4: 'พญานาคเฝ้าท่า', t_e1: 'ฉายาผู้ปล่อยโคม', t_e4: 'ฉายานาคาเฝ้าท่า', c_e1: 'ธีมริมน้ำคืนเพ็ญ', c_e4: 'ธีมท่าน้ำนาคา' };
const EVBN = { evb1: 'ชุดผู้ปล่อยโคม', evb2: 'ชุดพญานาค' };
const _pgBase = module.exports.payGrant;
module.exports.payGrant = async (uid, pk, name, an) => {
  const P = await _pgBase(uid, pk, name);
  try {
    if (P && P.amt > 0 && okId(uid)) {
      const e = { t: Date.now(), n: an ? '' : clean(String(name || ''), 16), a: P.amt, k: P.kind, ti: P.tier || 0 };
      if (P.kind === 'cos') {
        e.it = (P.items || []).slice(0, 3);
        e.l = P.bun ? (EVBN[P.key] || '') : (EVN[(P.items || [])[0]] || '');
        if (P.ev && !P.bun) { e.sn = +(await cmd('HGET', 'evs:' + uid, P.items[0])) || 0; e.cap = P.cap || 0 }
      }
      if (P.kind === 'sp') e.l = P.tier === 2 ? 'คัมภีร์ฤดูกาล ฉบับจารึก' : 'คัมภีร์ฤดูกาล คัมภีร์ทอง';
      if (P.kind === 'nv') e.l = 'นิยายปกแข็ง';
      if (P.kind === 'ak' || P.kind === 'akt') e.l = P.kind === 'akt' ? 'ล็อกคำตอบ ทดลอง 3 ช่อง' : 'ล็อกคำตอบ +5 ช่อง';
      await cmd('LPUSH', 'buyann', JSON.stringify(e)); await cmd('LTRIM', 'buyann', 0, 29);
    }
  } catch { }
  return P;
};
module.exports.isAdm = isAdmKey;
module.exports.cmd = cmd; module.exports.okId = okId; module.exports.clean = clean; module.exports.pipe = pipe;
