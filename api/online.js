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
const okId = id => typeof id === 'string' && /^[a-z0-9]{6,24}$/.test(id);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!URL_ || !TOKEN) return res.status(503).json({ err: 'nodb' });
  const a = req.query.a;
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b) } catch { b = {} } }
  const id = req.method === 'GET' ? req.query.id : b.id;
  const now = Date.now(), W = week();
  try {
    if (a === 'ping') {
      if (okId(id)) {
        const ua = String(req.headers['user-agent'] || '');
        const org = String(req.headers['origin'] || req.headers['referer'] || '').replace(/^https?:\/\//, '').split('/')[0].slice(0, 60);
        const meta = { d: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'มือถือ' : 'คอม', b: /bot|crawl|spider|headless|preview|facebookexternalhit/i.test(ua) ? 'บอท' : /Line\//.test(ua) ? 'LINE' : /FBAN|FBAV/.test(ua) ? 'Facebook' : /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'อื่นๆ', o: org || 'ไม่ระบุ', c: String(req.headers['x-vercel-ip-country'] || '?').slice(0, 3), t: now };
        if (meta.b !== 'บอท') await pipe([['ZADD', 'online', now, id], ['HSET', 'om', id, JSON.stringify(meta)]]);
      }
      const [, n, lives] = await pipe([['ZREMRANGEBYSCORE', 'online', 0, now - 300e3], ['ZCARD', 'online'], ['GET', 'lives']]);
      return res.json({ n: n || 0, lives: +(lives || 0) });
    }
    if (a === 'who' || a === 'admin' || a === 'bugfix') {
      const AK = process.env.ADMIN_KEY;
      if (!AK || String(req.query.key || '') !== AK) return res.status(403).json({ err: 'forbidden' });
      if (a === 'bugfix') {
        const bid = String(req.query.bid || '').slice(0, 20);
        await cmd(req.query.undo ? 'SREM' : 'SADD', 'bugdone', bid);
        res.setHeader('Location', '?a=admin&key=' + encodeURIComponent(AK));
        return res.status(302).end();
      }
      const ids = await cmd('ZRANGEBYSCORE', 'online', now - 300e3, '+inf');
      const metas = ids && ids.length ? await cmd('HMGET', 'om', ...ids) : [];
      const rows = (ids || []).map((x, i) => { let m = null; try { m = JSON.parse(metas[i]) } catch {} return { id: x.slice(0, 4) + '…', d: m ? m.d : '-', b: m ? m.b : '-', o: m ? m.o : '-', c: m ? m.c : '-', ago: m ? Math.round((now - m.t) / 1000) : null } });
      if (a === 'who') return res.json({ n: rows.length, rows });
      const [lives, bl, done, rv] = await pipe([['GET', 'lives'], ['LRANGE', 'bugs2', 0, 49], ['SMEMBERS', 'bugdone'], ['HLEN', 'reviews']]);
      const ds = new Set(done || []), bugs = (bl || []).map(x => JSON.parse(x));
      const e = t => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const K = encodeURIComponent(AK);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>ผู้ดูแล · 1 ใน นวนิยาย</title>
<style>body{font-family:system-ui,sans-serif;background:#16131c;color:#eee;margin:0;padding:14px;max-width:760px;margin:auto}h1{font-size:20px}h2{font-size:16px;margin-top:22px;color:#f0c860}table{width:100%;border-collapse:collapse;font-size:13px}td,th{padding:6px;border-bottom:1px solid #333;text-align:left}.c{display:inline-block;background:#2a2433;border-radius:8px;padding:8px 12px;margin:4px 6px 4px 0}.c b{font-size:20px;display:block;color:#f0c860}.bug{background:#221d2a;border-radius:8px;padding:8px 10px;margin:6px 0;font-size:14px}.bug.done{opacity:.55}a{color:#8fd0ff}small{opacity:.6}</style></head><body>
<h1>🛡️ หน้าผู้ดูแล</h1><div><span class="c"><b>${rows.filter(r => r.b !== 'บอท').length}</b>ออนไลน์ (5 นาที)</span><span class="c"><b>${+(lives || 0)}</b>ชีวิตที่จบแล้ว</span><span class="c"><b>${bugs.length}</b>เรื่องบนกระดานบั๊ก</span><span class="c"><b>${rv || 0}</b>ความคิดเห็น</span></div>
<h2>คนที่ออนไลน์ตอนนี้</h2><table><tr><th>รหัส</th><th>เครื่อง</th><th>เบราว์เซอร์</th><th>เข้าจาก</th><th>ประเทศ</th><th>ล่าสุด</th></tr>${rows.map(r => `<tr><td>${e(r.id)}</td><td>${e(r.d)}</td><td>${e(r.b)}</td><td>${e(r.o)}</td><td>${e(r.c)}</td><td>${r.ago == null ? '-' : r.ago + ' วิ'}</td></tr>`).join('') || '<tr><td colspan=6>ไม่มี</td></tr>'}</table>
<h2>กระดานบั๊ก</h2>${bugs.map(b => `<div class="bug ${ds.has(b.i) ? 'done' : ''}">${b.k === 'idea' ? '💡' : '🐞'} <b>${e(b.n)}</b> <small>v${e(b.v)} · ${new Date(b.t).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</small><br>${e(b.x)}<br>${ds.has(b.i) ? `✅ แก้แล้ว · <a href="?a=bugfix&key=${K}&bid=${b.i}&undo=1">ยกเลิก</a>` : `<a href="?a=bugfix&key=${K}&bid=${b.i}">ติด ✅ แก้แล้ว</a>`}</div>`).join('') || '<p>ยังไม่มี</p>'}
<p><small>หน้านี้เปิดได้เฉพาะลิงก์ที่มีรหัสผู้ดูแล อย่าแชร์ลิงก์นี้</small></p></body></html>`);
    }
    if (a === 'chat') {
      const [list, hidden] = await pipe([['LRANGE', 'chat', 0, 79], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []);
      return res.json({ m: (list || []).map(x => JSON.parse(x)).filter(m => !hs.has(m.i)) });
    }
    if (a === 'board') {
      const prevW = week(new Date(now - 7 * 86400e3));
      const [top, prev, ar] = await pipe([['ZREVRANGE', 'board:' + W, 0, 19, 'WITHSCORES'], ['ZREVRANGE', 'board:' + prevW, 0, 2, 'WITHSCORES'], ['ZREVRANGE', 'arenaW:' + W, 0, 9, 'WITHSCORES']]);
      const pairs = l => { const o = []; for (let i = 0; i < (l || []).length; i += 2) o.push(l[i]); return o.map(x => JSON.parse(x)) };
      const arena = []; for (let i = 0; i < (ar || []).length; i += 2) arena.push({ n: ar[i], w: +ar[i + 1] });
      return res.json({ top: pairs(top), prev: pairs(prev), arena });
    }
    if (a === 'load') {
      const code = String(req.query.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
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
      return res.json({ m: L.map((m, i) => Object.assign(m, { c: cnt[i] || 0, d: ds.has(m.i) ? 1 : 0 })) });
    }
    if (a === 'reviews') {
      const [all, hidden] = await pipe([['HVALS', 'reviews'], ['SMEMBERS', 'chat:hidden']]);
      const hs = new Set(hidden || []);
      const L = (all || []).map(x => JSON.parse(x)).filter(m => !hs.has(m.i)).sort((x, y) => y.t - x.t);
      const avg = L.length ? L.reduce((s0, m) => s0 + m.r, 0) / L.length : 0;
      const dist = [1, 2, 3, 4, 5].map(r => L.filter(m => m.r === r).length);
      return res.json({ n: L.length, avg, dist, m: L.slice(0, 80) });
    }
    if (a === 'livelist') {
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
      const k2 = String(req.query.t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const ids = await cmd('ZRANGEBYSCORE', 'livez', now - 60e3, '+inf');
      const full = (ids || []).find(x => x.slice(0, 6) + x.slice(-4) === k2);
      if (!full) return res.status(404).json({ err: 'off' });
      const v = await cmd('GET', 'live:' + full);
      if (!v) return res.status(404).json({ err: 'off' });
      const viewer = okId(id) ? id : 'anon' + (req.headers['x-forwarded-for'] || '').slice(0, 15);
      const [, , w] = await pipe([['ZADD', 'watch:' + full, now, viewer], ['ZREMRANGEBYSCORE', 'watch:' + full, 0, now - 20e3], ['ZCARD', 'watch:' + full], ['EXPIRE', 'watch:' + full, 120]]);
      return res.json({ s: JSON.parse(v), w: w || 0 });
    }
    if (a === 'cload') {
      const p0 = String(req.query.p || '').replace(/[^a-z0-9]/g, '').slice(0, 24), tk = String(req.query.tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20);
      const [tok, d] = await pipe([['GET', 'ctok:' + p0], ['GET', 'cs2:' + p0]]);
      if (!tok || tok !== tk || !d) return res.status(404).json({ err: 'notfound' });
      return res.json({ d });
    }
    if (req.method !== 'POST') return res.status(405).json({ err: 'method' });
    if (!okId(id)) return res.status(400).json({ err: 'id' });
    if (a === 'live') {
      if (!b.spec) { await pipe([['DEL', 'live:' + id], ['ZREM', 'livez', id]]); return res.json({ w: 0 }) }
      const snap = String(b.s || '');
      if (snap.length > 60000) return res.status(400).json({ err: 'size' });
      try { JSON.parse(snap) } catch { return res.status(400).json({ err: 'json' }) }
      const [, , w] = await pipe([['SET', 'live:' + id, snap, 'EX', 70], ['ZADD', 'livez', now, id], ['ZCOUNT', 'watch:' + id, now - 20e3, '+inf']]);
      return res.json({ w: w || 0 });
    }
    if (a === 'csave') {
      const tk = String(b.tk || '').replace(/[^a-z0-9]/g, '').slice(0, 20), d = String(b.d || '');
      if (tk.length < 8 || !d || d.length > 900000) return res.status(400).json({ err: 'bad' });
      await cmd('SET', 'ctok:' + id, tk, 'NX');
      const tok = await cmd('GET', 'ctok:' + id);
      if (tok !== tk) return res.status(403).json({ err: 'token' });
      await pipe([['SET', 'cs2:' + id, d, 'EX', 86400 * 90], ['EXPIRE', 'ctok:' + id, 86400 * 90]]);
      return res.json({ ok: 1 });
    }
    if (a === 'say') {
      if (await cmd('GET', 'mute:' + id)) return res.status(429).json({ err: 'muted' });
      const ok = await cmd('SET', 'rl:' + id, 1, 'NX', 'EX', 3);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const x = clean(b.x, 200);
      if (!x) return res.status(400).json({ err: 'empty' });
      const m = { i: now.toString(36) + Math.random().toString(36).slice(2, 6), t: now, n: clean(b.n, 20) || 'นิรนาม', ti: clean(b.ti, 24), x, k: b.k === 'share' ? 'share' : 'msg', u: id.slice(0, 4) };
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
      const e = { n: clean(b.n, 20) || 'นิรนาม', s: Math.max(0, Math.min(1e12, +b.s || 0)), age: +b.age || 0, r: clean(b.r, 30), f: clean(b.f, 30), c: clean(b.c, 60), x: b.x ? 1 : 0, cu: b.cu ? 1 : 0, t: now };
      const key = 'board:' + W;
      await pipe([['INCR', 'lives'], ['ZADD', key, e.s, JSON.stringify(e)], ['ZREMRANGEBYRANK', key, 0, -101], ['EXPIRE', key, 86400 * 40]]);
      return res.json({ ok: 1 });
    }
    if (a === 'arena') {
      const me = { n: clean(b.n, 20) || 'นิรนาม', p: Math.max(0, +b.p || 0), hp: +b.hp || 100, r: clean(b.r, 30), ri: Math.max(0, Math.min(12, +b.ri || 0)), x: b.x ? 1 : 0, t: now };
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
      await pipe([['LPUSH', 'bugs2', JSON.stringify(m)], ['LTRIM', 'bugs2', 0, 299], ['HSET', 'buginfo', m.i, String(b.info || '').slice(0, 1500)]]);
      return res.json({ ok: 1, i: m.i });
    }
    if (a === 'bugvote') {
      const bid = String(b.bid || '').slice(0, 20);
      const [, n] = await pipe([['SADD', 'bv:' + bid, id], ['SCARD', 'bv:' + bid]]);
      return res.json({ n });
    }
    if (a === 'review') {
      const ok = await cmd('SET', 'rvrl:' + id, 1, 'NX', 'EX', 20);
      if (!ok) return res.status(429).json({ err: 'rate' });
      const r = Math.max(1, Math.min(5, Math.round(+b.r || 0)));
      const m = { i: 'r' + id.slice(0, 8), t: now, n: clean(b.n, 20) || 'นิรนาม', r, x: clean(b.x, 400), v: clean(b.v, 10) };
      await cmd('HSET', 'reviews', id, JSON.stringify(m));
      return res.json({ ok: 1 });
    }
    return res.status(400).json({ err: 'action' });
  } catch (e) {
    return res.status(500).json({ err: 'server' });
  }
};
