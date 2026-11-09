// ระบบออนไลน์ของ "1 ในยุทธภพ" — Vercel Function + Upstash Redis (REST)
// ต้องตั้งค่าตัวแปร KV_REST_API_URL / KV_REST_API_TOKEN (หรือ UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function cmd(...args) {
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(args) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
async function pipe(list) {
  const r = await fetch(URL_ + '/pipeline', { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: JSON.stringify(list) });
  const j = await r.json();
  return j.map(x => x.result);
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
const isAdmKey = k => !!process.env.ADMIN_KEY && String(k || '') === process.env.ADMIN_KEY;
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
  try {
    if (a === 'ping') {
      if (okId(id)) {
        const ua = String(req.headers['user-agent'] || '');
        const org = String(req.headers['origin'] || req.headers['referer'] || '').replace(/^https?:\/\//, '').split('/')[0].slice(0, 60);
        const meta = { d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', b: /bot|crawl|spider|headless|preview|facebookexternalhit/i.test(ua) ? 'บอท' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'อื่นๆ', o: org || 'ไม่ระบุ', v: String(qOf(req).v || '').slice(0, 8), c: String(req.headers['x-vercel-ip-country'] || '?').slice(0, 3), t: now };
        let act = null;
        try { const r = JSON.parse(String(qOf(req).st || '').slice(0, 600) || 'null'); if (r && typeof r === 'object') { const S0 = v => String(v == null ? '' : v).replace(/[<>]/g, '').slice(0, 40), N0 = v => Math.max(-1, Math.min(1e7, Math.round(+v || 0))); act = { sc: S0(r.sc), md: S0(r.md), ch: r.ch ? 1 : 0, hd: r.hd ? 1 : 0, ia: N0(r.ia), er: N0(r.er), em: String(r.em || '').replace(/[<>]/g, '').slice(0, 120), nm: S0(r.nm), ag: N0(r.ag), al: r.al ? 1 : 0, au: r.au ? 1 : 0, pa: r.pa ? 1 : 0, sp: N0(r.sp), w: S0(r.w).slice(0, 1), yr: N0(r.yr), ri: S0(r.ri), v: S0(qOf(req).v).slice(0, 8), t: now } } } catch {}
        if (meta.b !== 'บอท') await pipe([['ZADD', 'online', now, id], ['HSET', 'om', id, JSON.stringify(meta)], ...(act ? [['HSET', 'oa', id, JSON.stringify(act)]] : [])]);
      }
      const [, n, lives, annV] = await pipe([['ZREMRANGEBYSCORE', 'online', 0, now - 300e3], ['ZCARD', 'online'], ['GET', 'lives'], ['GET', 'ann']]);
      let ann = null; try { ann = annV ? JSON.parse(annV) : null } catch {}
      ann = await annPoll(ann, id);
      return res.json({ n: n || 0, lives: +(lives || 0), bd: String(process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7), ann });
    }
    if (a === 'who' || a === 'admin' || a === 'bugfix') {
      const AK = process.env.ADMIN_KEY;
      if (!AK || String(qOf(req).key || '') !== AK) return res.status(403).json({ err: 'forbidden' });
      if (a === 'bugfix') {
        const bid = String(qOf(req).bid || '').slice(0, 20);
        await cmd(qOf(req).undo ? 'SREM' : 'SADD', 'bugdone', bid);
        res.setHeader('Location', '?a=admin&key=' + encodeURIComponent(AK));
        return res.status(302).end();
      }
      const ids = await cmd('ZRANGEBYSCORE', 'online', now - 300e3, '+inf');
      const metas = ids && ids.length ? await cmd('HMGET', 'om', ...ids) : [];
      const acts = ids && ids.length ? await cmd('HMGET', 'oa', ...ids) : [];
      const SCN = { title: 'หน้าแรก', birth: 'หน้าสุ่มชาติกำเนิด', create: 'หน้าสร้างตัวละคร', end: 'หน้าสรุปชีวิต', game: 'ในเกม' };
      const MDN = { choice: 'เลือกเหตุการณ์', online: 'ออนไลน์', spec: 'ดูคนอื่นเล่น', menu: 'เมนู', market: 'ตลาด', family: 'ครอบครัว', duel: 'ดวล', think: 'ถามความคิด', bye: 'คำอำลา', update: 'บันทึกอัปเดต', equip: 'ชุดสวมใส่', archive: 'คลังสำรอง', annview: 'อ่านประกาศ', annlist: 'ประกาศทั้งหมด', town: 'เมือง', sys: 'ระบบ', bag: 'กระเป๋า', arts: 'วิชา', quests: 'เควส', craft: 'งานช่าง', people: 'ผู้คน', faction: 'สำนัก', house: 'ตระกูล', dungeon: 'ดันเจี้ยน', dungeons: 'ดันเจี้ยน', map: 'แผนที่', lifelog: 'บันทึกชีวิต', ranking: 'ทำเนียบสำนัก', auto: 'ตั้งค่าอัตโนมัติ', sound: 'เสียง', profile: 'โปรไฟล์', frame: 'ร้านกรอบ', gacha: 'สุ่มคัมภีร์', heir: 'เลือกทายาท', beastno: 'แจ้งเตือนสัตว์', cloudr: 'กู้เซฟ', anncomp: 'สร้างประกาศ', specask: 'ขออนุญาตดู', 'online': 'ออนไลน์' };
      const mins = sec => sec >= 3600 ? Math.round(sec / 3600) + ' ชม.' : sec >= 60 ? Math.round(sec / 60) + ' นาที' : sec + ' วิ';
      const stat = (a, seen) => {
        if (!a) return { k: 9, t: '⚪ ไม่มีข้อมูล (ยังใช้เวอร์ชันเก่า)', c: '#888' };
        if (!a.hd && seen > 150) return { k: 8, t: '⚫ เงียบไป ' + mins(seen) + ' (ปิดเว็บ/เน็ตหลุด)', c: '#888' };
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
      const jsRows = Object.values(jsg).sort((g1, g2) => g2.last.t - g1.last.t);
      const tday = new Date(now + 7 * 3600e3).toISOString().slice(0, 10), TP = [['chat', 'แชทโลก'], ['live', 'ดูคนอื่นเล่น'], ['spec', 'เปิดดูผู้เล่น'], ['board', 'ทำเนียบ'], ['arena', 'ประลองเงา'], ['me', 'ตั้งชื่อ']];
      const td = []; for (let i = 0; i < 7; i++) td.push(new Date(now + 7 * 3600e3 - i * 86400e3).toISOString().slice(0, 10));
      const tops = []; td.forEach(d => { tops.push(['HGETALL', 'trk:' + d], ['SCARD', 'trku:' + d]); TP.forEach(p => tops.push(['SCARD', 'trku:' + d + ':' + p[0]])) }); tops.push(['LRANGE', 'trklog', 0, 39]);
      const tr = await pipe(tops); let tk = 0;
      const trows = td.map(d => { const h = tr[tk++] || [], c = {}; for (let i = 0; i < h.length; i += 2) c[h[i]] = +h[i + 1]; const u = +tr[tk++] || 0, up = TP.map(p => (+tr[tk++] || 0)); return { d, u, c, up } });
      const tlog = (tr[tk] || []).map(x => { try { return JSON.parse(x) } catch { return null } }).filter(Boolean);
      const ds = new Set(done || []), bugs = (bl || []).map(x => JSON.parse(x));
      const e = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const K = encodeURIComponent(AK);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="30"><title>ผู้ดูแล · 1 ใน นวนิยาย</title>
<style>.pl{background:#211d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.plh{display:flex;flex-wrap:wrap;gap:6px;justify-content:space-between;align-items:baseline}.plh small,.pl small{color:#aaa}body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;margin:0;padding:14px;max-width:760px;margin:auto}h1{font-size:20px}h2{font-size:16px;margin-top:22px;color:#f0c860}table{width:100%;border-collapse:collapse;font-size:13px}td,th{padding:6px;border-bottom:1px solid #333;text-align:left}.c{display:inline-block;background:#2a2433;border-radius:8px;padding:8px 12px;margin:4px 6px 4px 0}.c b{font-size:20px;display:block;color:#f0c860}.bug{background:#221d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.bug.done{opacity:.55}a{color:#8fd0ff}small{opacity:.6}</style></head><body>
<h1>🛡️ หน้าผู้ดูแล</h1><div><span class="c"><b>${rows.filter(r => r.b !== 'บอท').length}</b>ออนไลน์ (5 นาที)</span><span class="c"><b>${+(lives || 0)}</b>ชีวิตที่จบแล้ว</span><span class="c"><b>${bugs.length}</b>เรื่องบนกระดานบั๊ก</span><span class="c"><b>${rv || 0}</b>ความคิดเห็น</span></div>
<h2>คนที่ออนไลน์ตอนนี้ <small style="font-weight:normal;color:#aaa">· รีเฟรชเองทุก 30 วิ</small></h2><p><small>🟢 กำลังเล่น · 🤔/📋 เลือกเหตุการณ์/เปิดหน้าต่าง · ⏸ หยุดเกม · 😴 เปิดทิ้งไว้ · 🙈 สลับแท็บ · 🏠 อยู่หน้าอื่น · 🔴 อาจค้าง/มี error</small></p>${rows.map(r => { const a = r.a || {}; return `<div class="pl" style="border-left:4px solid ${r.s.c}"><div class="plh"><b style="color:${r.s.c}">${e(r.s.t)}</b><small>${e(r.id)} · ${e(r.d)} · ${e(r.b)} · ${e(r.c)} · อัปเดต ${r.ago == null ? '-' : r.ago + ' วิ'}ก่อน${a.v ? ' · v' + e(a.v) : ''}</small></div>${a.nm ? `<div>👤 <b>${e(a.nm)}</b> อายุ ${e(a.ag)} ปี · ${e(WN[a.w] || '')} · ${e(a.ri || '')}${a.sp ? ' · ความเร็ว ' + e(a.sp) + '×' : ''}</div>` : ''}${r.a ? `<div><small>หน้า: ${e(SCN[a.sc] || a.sc || '-')}${a.md ? ' · หน้าต่าง: ' + e(MDN[a.md] || a.md) : ''} · แตะล่าสุด ${mins(a.ia)}ก่อน${a.sc === 'game' && a.yr >= 0 ? ' · ปีในเกมล่าสุดผ่านไปเมื่อ ' + mins(a.yr) + 'ก่อน' : ''}</small></div>` : ''}${r.s.x ? `<div><small style="color:#ff9b9b">error ล่าสุด: ${e(r.s.x)}</small></div>` : ''}</div>` }).join('') || '<p><small>ตอนนี้ไม่มีใครออนไลน์</small></p>'}
<h2>การเปิดหน้าออนไลน์ (7 วัน)</h2><p><small>ตัวเลข = คนไม่ซ้ำ / จำนวนครั้ง · เริ่มนับตั้งแต่ v10.2</small></p><table><tr><th>วัน</th><th>คน</th>${TP.map(p => `<th>${p[1]}</th>`).join('')}</tr>${trows.map(r => `<tr><td>${r.d.slice(5)}</td><td>${r.u}</td>${TP.map((p, i) => `<td>${r.up[i]} / ${r.c[p[0]] || 0}</td>`).join('')}</tr>`).join('')}</table>
<h2>คลิกล่าสุด</h2><table><tr><th>รหัส</th><th>หน้า</th><th>เครื่อง</th><th>เวลา</th></tr>${tlog.map(x => `<tr><td>${e(x.u)}…</td><td>${e((TP.find(p => p[0] === x.p) || [0, x.p])[1])}</td><td>${e(x.d)}</td><td>${new Date(x.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</td></tr>`).join('') || '<tr><td colspan=4>ยังไม่มี</td></tr>'}</table>
<h2>🐞 error จากเครื่องผู้เล่น <small style="font-weight:normal;color:#aaa">· 200 ครั้งล่าสุด จัดกลุ่มตามข้อความ</small></h2>${Object.values(jsg).sort((g1, g2) => g2.last.t - g1.last.t).slice(0, 25).map(g => `<div class="pl" style="border-left:4px solid #ff6b6b"><div class="plh"><b style="color:#ff9b9b">${e(g.last.m)}</b><small>${g.n} ครั้ง · ${g.users.size} คน · v${e([...g.vers].join(', v'))}</small></div><div><small>ล่าสุด ${new Date(g.last.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })} · ${e(g.last.d)}${g.last.l ? ' · บรรทัด ' + g.last.l + ':' + g.last.c : ''} · หน้า ${e(g.last.x.sc)}${g.last.x.md ? ' · หน้าต่าง ' + e(g.last.x.md) : ''}${g.last.x.ch ? ' · เหตุการณ์ ' + e(g.last.x.ch) : ''}${g.last.x.ag ? ' · อายุ ' + g.last.x.ag + ' · ' + e(g.last.x.fo) + ' · ' + e(g.last.x.w) : ''}</small></div>${g.last.s ? `<div><small style="color:#aaa;word-break:break-all">${e(g.last.s)}</small></div>` : ''}</div>`).join('') || '<p><small>ยังไม่มี error</small></p>'}
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
      const AK = process.env.ADMIN_KEY;
      if (!AK || String(qOf(req).key || '') !== AK) return res.status(403).json({ err: 'forbidden' });
      const PAGES = ['chat', 'live', 'board', 'arena', 'me', 'spec'], days = [];
      for (let i = 0; i < 7; i++) days.push(new Date(now + 7 * 3600e3 - i * 86400e3).toISOString().slice(0, 10));
      const ops = [];
      days.forEach(d => { ops.push(['HGETALL', 'trk:' + d], ['SCARD', 'trku:' + d]); PAGES.forEach(p => ops.push(['SCARD', 'trku:' + d + ':' + p])) });
      ops.push(['LRANGE', 'trklog', 0, 99]);
      const r = await pipe(ops); let k = 0;
      const out = days.map(d => { const h = r[k++] || []; const clicks = {}; for (let i = 0; i < h.length; i += 2) clicks[h[i]] = +h[i + 1]; const uniq = +r[k++] || 0; const up = {}; PAGES.forEach(p => { up[p] = +r[k++] || 0 }); return { d, uniq, clicks, up } });
      const log = (r[k] || []).map(x => JSON.parse(x));
      return res.json({ days: out, log });
    }
    if (a === 'chat') {
      const [list, hidden] = await pipe([['LRANGE', 'chat', 0, 79], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []);
      const ms = (list || []).map(x => JSON.parse(x)).filter(m => !hs.has(m.i));
      const pus = [...new Set(ms.map(m => m.pu).filter(Boolean))];
      const pv = pus.length ? await cmd('HMGET', 'prof', ...pus) : [];
      const p = {}; pus.forEach((u, i) => { if (pv[i]) { try { p[u] = JSON.parse(pv[i]) } catch {} } });
      return res.json({ m: ms, p, ann: await annPoll(await annGet(), id) });
    }
    if (a === 'board') {
      const prevW = week(new Date(now - 7 * 86400e3));
      const [top, prev, ar] = await pipe([['ZREVRANGE', 'bd2:' + W, 0, 99, 'WITHSCORES'], ['ZREVRANGE', 'bd2:' + prevW, 0, 49, 'WITHSCORES'], ['ZREVRANGE', 'arenaW:' + W, 0, 9, 'WITHSCORES']]);
      const pairs = l => { const o = []; for (let i = 0; i < (l || []).length; i += 2) o.push(l[i]); return o.map(x => JSON.parse(x)) };
      const arena = []; for (let i = 0; i < (ar || []).length; i += 2) arena.push({ n: ar[i], w: +ar[i + 1] });
      const T = pairs(top).filter(x => !x.cu).slice(0, 60), Pv = pairs(prev).filter(x => !x.cu).slice(0, 20), all = T.concat(Pv).filter(x => x.lid);
      const pubs = all.length ? await cmd('MGET', ...all.map(x => 'lifep:' + x.lid)) : [];
      const pm = {}; all.forEach((x, i) => pm[x.lid] = pubs[i] === '1' ? 1 : pubs[i] === '2' ? 2 : 0);
      const admB = !!process.env.ADMIN_KEY && String(qOf(req).key || '') === process.env.ADMIN_KEY;
      const fix = l => l.map(x => { const v = x.lid ? pm[x.lid] || 0 : 0; const o = Object.assign(x, { pub: v === 1 || (admB && x.lid) ? 1 : 0 }); if (v === 2 && !admB) { o.n = 'ผู้ไม่ประสงค์ออกนาม'; o.f = ''; o.anon = 1 } return o });
      return res.json({ top: fix(T), prev: fix(Pv), arena });
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
      const L = (list || []).map(x => JSON.parse(x)).filter(m => !hs.has(m.i));
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
      const L0 = (all || []).map(x => JSON.parse(x)).filter(m => !hs.has(m.i)).sort((x, y) => y.t - x.t);
      const rpr = L0.length ? await cmd('HMGET', 'replies', ...L0.map(m => 'r:' + m.i)) : [];
      const myR = 'r' + String(id || '').slice(0, 8);
      const L = L0.map((m, i) => Object.assign(m, { rp: rpr[i] ? JSON.parse(rpr[i]) : null, me: id && m.i === myR ? 1 : 0 }));
      const avg = L.length ? L.reduce((s0, m) => s0 + m.r, 0) / L.length : 0;
      const dist = [1, 2, 3, 4, 5].map(r => L.filter(m => m.r === r).length);
      return res.json({ n: L.length, avg, dist, m: L.slice(0, 80) });
    }
    if (a === 'livelist') {
      const isAdm = !!process.env.ADMIN_KEY && String(qOf(req).key || '') === process.env.ADMIN_KEY;
      if (isAdm) {
        const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 90e3, '+inf']]);
        const all = [...(pub || []).map(x => [x, 'live:', 0]), ...(prv || []).filter(x => !(pub || []).includes(x)).map(x => [x, 'livep:', 1])];

        const vals = all.length ? await cmd('MGET', ...all.map(x => x[1] + x[0])) : [];
        const cnt = all.length ? await pipe(all.map(x => ['ZCOUNT', 'watch:' + x[0], now - 20e3, '+inf'])) : [];
        const lms = all.length ? await cmd('HMGET', 'lm', ...all.map(x => x[0])) : [];
        const l = [];
        all.forEach(([x, , pv], i) => { if (!vals[i]) return; try { const s0 = JSON.parse(vals[i]); l.push({ k: x.slice(0, 6) + x.slice(-4), id: x.slice(0, 6), n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, w: cnt[i] || 0, pv, m: (() => { try { return JSON.parse(lms[i]) } catch { return null } })() }) } catch {} });
        await pipe([['ZREMRANGEBYSCORE', 'livezp', 0, now - 180e3]]);
        const onIds = await cmd('ZRANGEBYSCORE', 'online', now - 300e3, '+inf');
        const liveSet = new Set(all.map(x => x[0]));
        const rest = (onIds || []).filter(x => !liveSet.has(x));
        const metas = rest.length ? await cmd('HMGET', 'om', ...rest) : [];
        const idle = rest.map((x, i) => { let m = {}; try { m = JSON.parse(metas[i] || '{}') } catch {} return { id: x.slice(0, 4), d: m.d, b: m.b, v: m.v || '', ago: Math.round((now - (m.t || now)) / 1000) } }).filter(x => x.b !== 'บอท');
        return res.json({ l: l.sort((p, q) => q.age - p.age).slice(0, 80), adm: 1, idle });
      }
      const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf');
      if (!ids || !ids.length) return res.json({ l: [] });
      const vals = await cmd('MGET', ...ids.map(x => 'live:' + x));
      const cnt = await pipe(ids.map(x => ['ZCOUNT', 'watch:' + x, now - 20e3, '+inf']));
      const l = [];
      ids.forEach((x, i) => { if (!vals[i]) return; try { const s0 = JSON.parse(vals[i]); l.push({ k: x.slice(0, 6) + x.slice(-4), id: x.slice(0, 6), n: s0.n, age: s0.age, r: s0.r, f: s0.f, fo: s0.fo, x: s0.x, w: cnt[i] || 0 }) } catch {} });
      await cmd('ZREMRANGEBYSCORE', 'livez', 0, now - 120e3);
      return res.json({ l: l.sort((p, q) => q.w - p.w || q.age - p.age).slice(0, 40) });
    }
    if (a === 'liveget') {
      const k2 = String(qOf(req).t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (process.env.ADMIN_KEY && String(qOf(req).key || '') === process.env.ADMIN_KEY) {
        const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 90e3, '+inf']]);
        const f1 = (pub || []).find(x => x.slice(0, 6) + x.slice(-4) === k2), f2 = (prv || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
        const v = f1 ? await cmd('GET', 'live:' + f1) : f2 ? await cmd('GET', 'livep:' + f2) : null;
        if (!v) return res.status(404).json({ err: 'off' });
        const w = await cmd('ZCOUNT', 'watch:' + (f1 || f2), now - 20e3, '+inf');
        return res.json({ s: JSON.parse(v), w: w || 0, adm: 1, pv: f1 ? 0 : 1 });
      }
      const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf');
      const full = (ids || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
      if (!full) return res.status(404).json({ err: 'off' });
      const v = await cmd('GET', 'live:' + full);
      if (!v) return res.status(404).json({ err: 'off' });
      const viewer = okId(id) ? id : 'anon' + (req.headers['x-forwarded-for'] || '').slice(0, 15);
      const [, , w] = await pipe([['ZADD', 'watch:' + full, now, viewer], ['ZREMRANGEBYSCORE', 'watch:' + full, 0, now - 20e3], ['ZCARD', 'watch:' + full], ['EXPIRE', 'watch:' + full, 120]]);
      return res.json({ s: JSON.parse(v), w: w || 0 });
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
    if (a === 'boarddel' || a === 'cheatlog') {
      if (!process.env.ADMIN_KEY || String(qOf(req).key || '') !== process.env.ADMIN_KEY) return res.status(403).json({ err: 'forbidden' });
      if (a === 'cheatlog') { const L0 = await cmd('LRANGE', 'cheatlog', 0, 99); return res.json({ l: (L0 || []).map(s0 => JSON.parse(s0)) }) }
      const lid = String(qOf(req).l || '').replace(/[^a-z0-9]/g, '').slice(0, 16), ban = qOf(req).ban === '1';
      const prevW = week(new Date(now - 7 * 86400e3)); let removed = 0;
      for (const k0 of ['bd2:' + W, 'bd2:' + prevW]) { const all = await cmd('ZRANGE', k0, 0, -1); for (const m of (all || [])) { try { if (JSON.parse(m).lid === lid) { await cmd('ZREM', k0, m); removed++ } } catch {} } }
      let banned = 0; if (ban) { const own = await cmd('GET', 'lifeo:' + lid); if (own) { await cmd('SADD', 'cheaters', own); banned = 1 } }
      return res.json({ ok: 1, removed, banned });
    }
    if (a === 'lifeview') {
      const lid = String(qOf(req).l || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const [pub, d, own] = await pipe([['GET', 'lifep:' + lid], ['GET', 'lifed:' + lid], ['GET', 'lifeo:' + lid]]);
      if (!d) return res.status(404).json({ err: 'notfound' });
      const admV = !!process.env.ADMIN_KEY && String(qOf(req).key || '') === process.env.ADMIN_KEY;
      if (pub !== '1' && own !== id && !admV) return res.status(403).json({ err: 'private' });
      return res.json({ d: JSON.parse(d), pub: pub === '1' ? 1 : 0, mine: own === id ? 1 : 0 });
    }

    const findLive = async (k2, adm) => { const [pub, prv] = await pipe([['ZRANGEBYSCORE', 'livez', now - 60e3, '+inf'], ['ZRANGEBYSCORE', 'livezp', now - 90e3, '+inf']]); const f1 = (pub || []).find(x => x.slice(0, 6) + x.slice(-4) === k2); if (f1) return f1; if (adm) return (prv || []).find(x => x.slice(0, 6) + x.slice(-4) === k2) || null; return null };
    const RPC = [[120, 350, 800, 2200, 5500, 12000, 24000, 24000], [250, 900, 2500, 7000, 18000, 42000, 90000, 90000]];
    const powOk = (p, ri, x, age) => { ri = Math.max(0, Math.min(7, +ri || 0)); if (!(p >= 0) || !isFinite(p) || p > 2e9) return false; if (ri < 7 && p > RPC[x ? 1 : 0][ri] * 8 + 1000) return false; if (age != null && +age < 1000 && p > (x ? 60000 : 25000) * (1 + (+age || 1) / 8) + 300000) return false; return true };
    const isBanned = async () => !!(await cmd('SISMEMBER', 'cheaters', id));
    const isAdmQ = k => !!process.env.ADMIN_KEY && String(k || '') === process.env.ADMIN_KEY;
    if (a === 'logget') {
      const k2 = String(qOf(req).t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const full = await findLive(k2, isAdmQ(qOf(req).key));
      if (!full) return res.status(404).json({ err: 'off' });
      const v = await cmd('GET', 'logfull:' + full);
      if (!v) return res.json({ wait: 1 });
      return res.json({ l: JSON.parse(v) });
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
    if (a === 'live') {
      if (b.spec && (b.tp || await isBanned())) b.spec = 0;
      if (okId(id)) { try { const lm = uaMeta(req, now); lm.u = String(req.headers['user-agent'] || '').slice(0, 160); await cmd('HSET', 'lm', id, JSON.stringify(lm)) } catch {} }
      if (!b.spec) {
        const ps = String(b.s || '');
        if (ps && ps.length <= 60000) { try { JSON.parse(ps); const r0 = await pipe([['DEL', 'live:' + id], ['ZREM', 'livez', id], ['SET', 'livep:' + id, ps, 'EX', 100], ['ZADD', 'livezp', now, id], ['GET', 'logreq:' + id]]); return res.json({ w: 0, lr: r0[4] ? 1 : 0 }) } catch {} }
        await pipe([['DEL', 'live:' + id], ['ZREM', 'livez', id], ['DEL', 'livep:' + id], ['ZREM', 'livezp', id]]); return res.json({ w: 0 })
      }
      const snap = String(b.s || '');
      if (snap.length > 60000) return res.status(400).json({ err: 'size' });
      try { JSON.parse(snap) } catch { return res.status(400).json({ err: 'json' }) }
      const [, , , , w] = await pipe([['SET', 'live:' + id, snap, 'EX', 70], ['ZADD', 'livez', now, id], ['DEL', 'livep:' + id], ['ZREM', 'livezp', id], ['ZCOUNT', 'watch:' + id, now - 20e3, '+inf']]);
      const lr = await cmd('GET', 'logreq:' + id);
      return res.json({ w: w || 0, lr: lr ? 1 : 0 });
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
      const av = String(b.av || ''), fr = String(b.fr || '').replace(/[^a-z0-9_]/g, '').slice(0, 20);
      if (av && (av.length > 8000 || !/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(av))) return res.status(400).json({ err: 'av' });
      await cmd('HSET', 'prof', id.slice(0, 12), JSON.stringify({ av, fr }));
      return res.json({ ok: 1 });
    }
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
        return res.json({ ok: 1, ann: await annPoll(ann, id) });
      }
      if (await cmd('GET', 'mute:' + id)) return res.status(429).json({ err: 'muted' });
      const ok = await cmd('SET', 'rl:' + id, 1, 'NX', 'EX', 3);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const x = clean(b.x, 200);
      if (!x) return res.status(400).json({ err: 'empty' });
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: clean(b.n, 20) || 'นิรนาม', ti: clean(b.ti, 24), x, k: b.k === 'share' ? 'share' : 'msg', u: id.slice(0, 4), pu: id.slice(0, 12) };
      await pipe([['LPUSH', 'chat', JSON.stringify(m)], ['LTRIM', 'chat', 0, 199]]);
      return res.json({ ok: 1 });
    }
    if (a === 'report') {
      const mid = String(b.mid || '').slice(0, 20);
      const [, cnt] = await pipe([['SADD', 'rep:' + mid, id], ['SCARD', 'rep:' + mid], ['EXPIRE', 'rep:' + mid, 86400 * 3]]);
      if (cnt >= 5) await cmd('SADD', 'chat:hidden', mid);
      return res.json({ ok: 1 });
    }
    if (a === 'life') {
      const lid = String(b.lid || '').replace(/[^a-z0-9]/g, '').slice(0, 16);
      const e = { n: clean(b.n, 20) || 'นิรนาม', s: Math.max(0, Math.min(1e12, +b.s || 0)), age: +b.age || 0, r: clean(b.r, 30), f: clean(b.f, 30), c: clean(b.c, 60), x: b.x ? 1 : 0, cu: b.cu ? 1 : 0, bm: b.bm ? 1 : 0, t: now, lid };
      const key = 'bd2:' + W, L = [['INCR', 'lives'], ['ZADD', key, e.s, JSON.stringify(e)], ['ZREMRANGEBYRANK', key, 0, -101], ['EXPIRE', key, 86400 * 40]];
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
          if ((+st.int || 0) > 20000 || (+st.cha || 0) > 20000 || fm > 2e7 || mn > 1e11 || kids > 150 || dis > 2e6 || pw > 2e9) bad = 'stat';
          const powCap = (e.x ? 60000 : 25000) * (1 + ag / 8) + 300000;
          if (!bad && pw > powCap && ag < 1000) bad = 'pow-age';
          const upper = (pw + fm * 3 + 20 * Math.sqrt(Math.max(0, mn)) + 2500 + kids * 100 + dis * 20 + 4000) * 1.5 * 1.05 + 1000;
          if (!bad && e.s > upper) bad = 'score';
        }
        if (!bad && !det && e.s > 50000) bad = 'nodet-big';
        if (!bad && await cmd('SISMEMBER', 'cheaters', id)) bad = 'banned';
      } catch { bad = bad || 'parse' }
      if (bad) { await pipe([['INCR', 'lives'], ['LPUSH', 'cheatlog', JSON.stringify({ id: id.slice(0, 10), n: e.n, s: e.s, age: e.age, why: bad, t: now })], ['LTRIM', 'cheatlog', 0, 99]]); return res.json({ ok: 1, skip: 1, flag: 1 }) }
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
      if (!process.env.ADMIN_KEY || String(b.key || '') !== process.env.ADMIN_KEY) return res.status(403).json({ err: 'forbidden' });
      const kind = b.kind === 'r' ? 'r' : 'b', mid = String(b.mid || '').replace(/[^a-z0-9]/gi, '').slice(0, 30);
      if (!mid) return res.status(400).json({ err: 'mid' });
      const x = clean(b.x, 400);
      if (!x) { await cmd('HDEL', 'replies', kind + ':' + mid); return res.json({ ok: 1, del: 1 }) }
      await cmd('HSET', 'replies', kind + ':' + mid, JSON.stringify({ x, t: now }));
      return res.json({ ok: 1 });
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
      const me = { n: clean(b.n, 20) || 'นิรนาม', ri: Math.max(0, Math.min(12, +b.ri || 0)), p: Math.max(0, Math.min(1e13, +b.p || 0)), f: clean(b.f, 30), age: Math.max(0, +b.age || 0), t: now };
      const okMe = !b.tp && powOk(me.p, me.ri, x, me.age) && !(await isBanned());
      const [, all, box] = await pipe([okMe ? ['HSET', key, id, JSON.stringify(me)] : ['HDEL', key, id], ['HGETALL', key], ['LRANGE', 'mbox:' + id, 0, 9]]);
      const cand = [], stale = [];
      for (let i = 0; i < (all || []).length; i += 2) { const k0 = all[i]; let v = null; try { v = JSON.parse(all[i + 1]) } catch {} if (!v || now - v.t > 120e3) { stale.push(k0); continue } if (k0 !== id) cand.push(Object.assign(v, { k: k0.slice(0, 6) + k0.slice(-4) })) }
      const L2 = [['EXPIRE', key, 3600]]; if (stale.length) L2.push(['HDEL', key, ...stale.slice(0, 50)]); if (box && box.length) L2.push(['DEL', 'mbox:' + id]);
      await pipe(L2);
      const o = cand.length ? cand[Math.floor(Math.random() * cand.length)] : null;
      return res.json({ o, n: cand.length, inbox: (box || []).map(s0 => { try { return JSON.parse(s0) } catch { return null } }).filter(Boolean) });
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
    return res.status(500).json({ err: 'server' });
  }
};
