// 1 ใน นวนิยาย — ตัวกลางให้ api/online.js (เขียนแบบ Vercel req/res) รันบน Cloudflare Workers ได้โดยไม่ต้องแก้โค้ดเดิม
import { env as ENV } from 'cloudflare:workers';

// เส้นทางกับดักบอทสแกนไฟล์ (เหมือน rewrites ใน vercel.json)
const TRAP = [
  /^\/\.(env|git|aws|ssh|svn|hg|docker|vscode|idea|npmrc|htaccess|htpasswd|DS_Store|anthropic|kube|terraform|circleci|config|composer|bash_history)/i,
  /^\/.*\/\.(env|git|aws)/i, /^\/.*\.(php|asp|jsp|cgi)/i, /^\/.*\.(sql|bak|old|swp|ini|yml|yaml|pem|key|zip|rar|7z)$/i, /^\/.*\.tar/i,
  /^\/(wp-|wordpress|phpmyadmin|pma|actuator|server-status|server-info|cgi-bin|vendor\/|node_modules|config\.json|credentials|secrets|backup|dump|xmlrpc|telescope|_profiler|debug\/|admin\/config|owa\/|autodiscover)/i,
  /^\/(api\/online\.js|vercel\.json|package\.json|wrangler\.toml)$/i, /^\/.*\/config\.json$/i,
];

let H = null;
async function handler() {
  if (H) return H;
  // ค่าลับจาก Cloudflare → process.env ก่อนโหลด online.js (online.js อ่านค่าตอนโหลด)
  for (const [k, v] of Object.entries(ENV)) if (typeof v === 'string') process.env[k] = v;
  process.env.LOW_CPU = process.env.LOW_CPU || '1'; // ลด CPU ตอนบีบอัดเซฟ (Workers แพ็กฟรีจำกัด 10ms/คำขอ)
  try { if (ENV.SAVES && typeof ENV.SAVES.put === 'function') globalThis.SAVES_R2 = ENV.SAVES } catch (e) {} // ที่เก็บเซฟคลาวด์ R2 (ถ้าผูกไว้ใน wrangler.toml)
  const m = await import('../api/online.js');
  // 🎖️ ยศผู้สนับสนุนใน Discord: อ่านยอดสะสมจาก D1 ให้ online.js (เกณฑ์เดียวกับหอผู้สนับสนุน: ≥1฿ · 200 · 1,000 · 5,000 · 20,000 → ขั้น 0..4, ไม่มียอด = -1)
  try { if (m.setSupTierFn && ENV.PAY_DB) m.setSupTierFn(async uid => { const r = await ENV.PAY_DB.prepare("SELECT COALESCE(SUM(amount_satang),0) s FROM orders WHERE uid=? AND status IN ('done','donation')").bind(uid).first(); const b = Math.round(((r && r.s) || 0) / 100); const T = [20000, 5000, 1000, 200, 1]; for (let i = 0; i < T.length; i++) if (b >= T[i]) return 4 - i; return -1 }) } catch (e) {}
  H = m.default || m;
  return H;
}

// Workers ห้ามใช้ socket ข้ามคำขอ → แต่ละคำขอมีการเชื่อมต่อฐานข้อมูลของตัวเอง (vkRun ใช้ AsyncLocalStorage) ทำหลายคำขอพร้อมกันได้ ไม่ต้องเข้าคิว
async function api(request, url) {
  const h = await handler();
  const run = h.vkRun ? h.vkRun(() => apiOne(request, url)) : apiOne(request, url);
  return Promise.race([run, new Promise(r => setTimeout(() => r(new Response('{"err":"timeout"}', { status: 504, headers: { 'content-type': 'application/json' } })), 12000))]);
}

async function apiOne(request, url) {
  const h = await handler();
  try { h.vkReset && h.vkReset() } catch (e) {}
  const headers = {};
  request.headers.forEach((v, k) => { headers[k.toLowerCase()] = v });
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) { headers['x-real-ip'] = ip; headers['x-forwarded-for'] = ip }
  let body = {};
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const t = await request.text();
    try { body = t ? JSON.parse(t) : {} } catch (e) { body = t }
  }
  const req = { method: request.method, url: url.pathname + url.search, headers, body, query: Object.fromEntries(url.searchParams) };
  let status = 200, done = false, resolve;
  const out = new Headers(), p = new Promise(r => { resolve = r });
  const fin = b => { if (done) return; done = true; resolve(new Response(request.method === 'HEAD' || status === 204 || status === 304 ? null : b, { status, headers: out })) };
  const res = {
    get statusCode() { return status }, set statusCode(v) { status = +v || 200 },
    setHeader(k, v) { out.set(k, Array.isArray(v) ? v.join(', ') : String(v)); return res },
    getHeader(k) { return out.get(k) }, removeHeader(k) { out.delete(k); return res },
    status(c) { status = +c || 200; return res },
    json(o) { if (!out.has('content-type')) out.set('content-type', 'application/json; charset=utf-8'); fin(JSON.stringify(o)); return res },
    send(b) {
      if (b != null && typeof b === 'object' && !(b instanceof Uint8Array) && !(b instanceof ArrayBuffer)) return res.json(b);
      if (typeof b === 'string' && !out.has('content-type')) out.set('content-type', 'text/html; charset=utf-8');
      fin(b == null ? '' : b); return res
    },
    end(b) { fin(b == null ? null : b); return res },
    redirect(a, b) { const u = b === undefined ? a : b; status = b === undefined ? 302 : +a; out.set('location', String(u)); fin(null); return res },
  };
  try { await h(req, res) } catch (e) { console.error('API_ERR worker', String(e && e.message || e)); if (!done) { status = 500; out.set('content-type', 'application/json; charset=utf-8'); fin('{"err":"server"}') } }
  fin(null);
  const r = await p;
  try { h.vkReset && h.vkReset() } catch (e) {}
  return r;
}

// 💳 ตรวจสลิปพร้อมเพย์อัตโนมัติ (SlipOK หรือ EasySlip v2 + D1 "PAY_DB") — ต้องมีค่าลับ SLIPOK_KEY + SLIPOK_BRANCH (หรือ EASYSLIP_KEY) และ binding PAY_DB · ตั้ง PAY_NAME เพิ่มได้เพื่อเช็กชื่อผู้รับ ไม่มี = ตอบ unavailable แล้วหน้าเว็บจะใช้ระบบส่งสลิปให้ผู้พัฒนาตรวจเหมือนเดิม
// 🛡️ หัวข้อความปลอดภัยของหน้าเว็บ (ใส่ซ้ำกับ _headers เผื่อกรณีไฟล์นั้นไม่ถูกใช้)
const SEC_H = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://accounts.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; media-src 'self' data: blob:; connect-src 'self' https://www.1inanovel.com https://1inanovel.com wss://www.1inanovel.com wss://1inanovel.com https://accounts.google.com; frame-src https://accounts.google.com; worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
};
function withSec(r) { try { if (!r || r.status === 101) return r; const o = new Response(r.body, r); for (const k in SEC_H) if (!o.headers.has(k)) o.headers.set(k, SEC_H[k]); return o } catch (e) { return r } }
const jr = (o, st = 200) => new Response(JSON.stringify(o), { status: st, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
async function payProducts(env) {
  try { const r = await env.PAY_DB.prepare("SELECT sku,kind,scope,world_id,tier,days,n,price_baht FROM products WHERE active=1 ORDER BY sort").all(); return jr({ items: r.results || [] }) } catch (e) { return jr({ items: [] }) }
}

// 💛 หอผู้สนับสนุน: จัดอันดับตามยอดที่ยืนยันแล้ว (orders สถานะ done/donation) · ผู้เล่นเลือกเองว่าจะขึ้นชื่อ/โชว์ยอดหรือไม่ (ค่าเริ่มต้นนิรนาม ไม่ส่ง uid ออกนอกเซิร์ฟเวอร์)
async function supHall(request, env, url) {
  const h = await handler(), a = url.searchParams.get('a'), cmd = h.cmd; if (!env.PAY_DB || !cmd) return jr({ rows: [], me: null });
  const db = env.PAY_DB, ST = "status IN ('done','donation')";
  let uid = String(url.searchParams.get('uid') || ''), body = null;
  if (a === 'supjoin') { try { body = await request.json() } catch (e) { return jr({ ok: 0 }, 400) } uid = String(body.id || '') }
  const okU = /^[a-z0-9]{6,24}$/.test(uid);
  const TIER = [20000, 5000, 1000, 200, 1], tierOf = b => { for (let i = 0; i < TIER.length; i++) if (b >= TIER[i]) return 4 - i; return 0 };
  const bk = new Date(Date.now() + 7 * 3600e3), ms = Date.UTC(bk.getUTCFullYear(), bk.getUTCMonth(), 1) - 7 * 3600e3;
  const sum = async (u, since) => { const r = await db.prepare("SELECT COALESCE(SUM(amount_satang),0) s FROM orders WHERE uid=? AND " + ST + " AND paid_at>=?").bind(u, since).first(); return (r && r.s) || 0 };
  if (a === 'supjoin') {
    if (!okU || (await sum(uid, 0)) <= 0) return jr({ ok: 0, err: 'nopay' }, 403);
    const dm = ['tier', 'mask', 'hide'].includes(String(body.dm || '')) ? String(body.dm) : 'tier';
    const tier = tierOf(Math.round((await sum(uid, 0)) / 100)), cb = body.cb ? 1 : 0;
    if (body.off) { let p0 = null; try { p0 = JSON.parse(await cmd('HGET', 'supp', uid) || 'null') } catch (e) {} await cmd('HSET', 'supp', uid, JSON.stringify(Object.assign({}, p0 || {}, { hide: 1, dm, tier, t: Date.now() }))); return jr({ ok: 1 }) }
    const n = h.clean(String(body.n || ''), 24).trim(); if (!n) return jr({ ok: 0, err: 'name' }, 400);
    const look = body.look && JSON.stringify(body.look).length < 1600 ? body.look : null;
    await cmd('HSET', 'supp', uid, JSON.stringify({ n, dm, look, cb, tier, t: Date.now() })); return jr({ ok: 1 });
  }
  const scope = url.searchParams.get('s') === 'm' ? 'm' : 'a', since = scope === 'm' ? ms : 0, ck = 'supb:' + scope + ':' + (scope === 'm' ? ms : 0);
  let raw = null; try { raw = JSON.parse(await cmd('GET', ck) || 'null') } catch (e) {}
  if (!raw) {
    const rs = await db.prepare("SELECT uid u, SUM(amount_satang) s FROM orders WHERE " + ST + " AND paid_at>=? GROUP BY uid HAVING s>0 ORDER BY s DESC LIMIT 200").bind(since).all();
    raw = (rs.results || []).map(r => [r.u, r.s]); try { await cmd('SET', ck, JSON.stringify(raw), 'EX', 300) } catch (e) {}
  }
  // ระดับผู้สนับสนุน (ตามยอดสะสมตลอดกาล) · โชว์ยอดแบบปิดบางส่วนเท่านั้น (ยอดเต็มไม่ออกจากเซิร์ฟเวอร์)
  const mask = b => { b = Math.max(0, Math.round(b)); const t = String(b); if (t.length <= 1) return t; const m = t[0] + 'x'.repeat(t.length - 1); return m.replace(/\B(?=(.{3})+(?!.))/g, ',') };
  const ids = raw.map(r => r[0]), ps = ids.length ? await cmd('HMGET', 'supp', ...ids) : [], ac = ids.length ? await h.pipe(ids.map(u => ['GET', 'acp:' + u])) : [];
  let allT = {}; if (ids.length) { try { if (scope === 'a') raw.forEach(r => allT[r[0]] = r[1]); else { const q = await db.prepare("SELECT uid u, SUM(amount_satang) s FROM orders WHERE " + ST + " AND uid IN (" + ids.map(() => '?').join(',') + ") GROUP BY uid").bind(...ids).all(); (q.results || []).forEach(x => allT[x.u] = x.s) } } catch (e) {} }
  const rows = raw.map((r, i) => { let p = null, a2 = null; try { p = JSON.parse(ps[i] || 'null') } catch (e) {} try { a2 = JSON.parse((ac && ac[i]) || 'null') } catch (e) {}
    const hide = !!(p && p.hide), dm = p && p.dm ? p.dm : (p && p.sa ? 'mask' : 'tier'), n = hide ? '' : (p && p.n ? p.n : (a2 && a2.n ? h.clean(String(a2.n), 24) : ''));
    return { r: i + 1, n, pu: hide ? '' : String(r[0]).replace(/[^a-z0-9]/g, '').slice(0, 12), look: !hide && p ? p.look : null, tier: tierOf(Math.round((allT[r[0]] || r[1]) / 100)), mask: !hide && dm === 'mask' ? mask(r[1] / 100) : null, amt: null, auto: !p ? 1 : 0, me: r[0] === uid ? 1 : 0 } });
  let me = null;
  if (okU) {
    const tot = await sum(uid, 0), mon = await sum(uid, ms); let p = null; try { p = JSON.parse(await cmd('HGET', 'supp', uid) || 'null') } catch (e) {}
    const mine = scope === 'm' ? mon : tot; let rank = 0;
    if (mine > 0) { const c = await db.prepare("SELECT COUNT(*) n FROM (SELECT uid, SUM(amount_satang) s FROM orders WHERE " + ST + " AND paid_at>=? GROUP BY uid HAVING s>?)").bind(since, mine).first(); rank = ((c && c.n) || 0) + 1 }
    try { const tq = tierOf(Math.round(tot / 100)); if (p && p.tier !== tq) { p.tier = tq; await cmd('HSET', 'supp', uid, JSON.stringify(p)) } } catch (e) {}
    me = { cb: p && p.cb ? 1 : 0, tot: Math.round(tot / 100), mon: Math.round(mon / 100), rank, ok: tot > 0 ? 1 : 0, n: p ? p.n || '' : '', dm: p && p.dm ? p.dm : (p && p.sa ? 'mask' : 'tier'), hide: p && p.hide ? 1 : 0, joined: p && !p.hide ? 1 : 0, tier: tierOf(Math.round(tot / 100)) };
  }
  return jr({ rows, me, s: scope });
}
// 🏮 ระเบียงผู้อุปถัมภ์รายเดือน (39/99): ป้ายขึ้นเฉพาะช่วงที่สิทธิ์ยังไม่หมด + สมุดรายนามประจำเดือน (ย้อนหลังจาก entitlements จริง)
// ชื่อ: ที่ตั้งเองในระเบียง (vmn) > หอผู้สนับสนุน (supp) > ชื่อตัวละครล่าสุด (เหมือนหอผู้สนับสนุน) · กดซ่อนเป็นนิรนามได้ทุกเมื่อ
async function vipMon(request, env, url) {
  const h = await handler(), cmd = h.cmd, a = url.searchParams.get('a'); if (!env.PAY_DB || !cmd) return jr({ act: [], book: [], me: null });
  const db = env.PAY_DB, now = Date.now(), M30 = 30 * 86400e3;
  const mk = t => { const d = new Date(t + 7 * 3600e3); return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') };
  if (a === 'vipmonjoin') {
    let b = null; try { b = await request.json() } catch (e) { return jr({ ok: 0 }, 400) }
    const uid = String(b.id || ''); if (!/^[a-z0-9]{6,24}$/.test(uid)) return jr({ ok: 0 }, 400);
    const c = await db.prepare("SELECT COUNT(*) n FROM entitlements WHERE uid=? AND kind IN ('vip1','vip2')").bind(uid).first(); if (!c || !c.n) return jr({ ok: 0, err: 'nopay' }, 403);
    if (b.off) { await cmd('HSET', 'vmn', uid, JSON.stringify({ hide: 1, t: now })); await cmd('DEL', 'vmon:c'); return jr({ ok: 1 }) }
    const n = h.clean(String(b.n || ''), 24).trim(); if (!n) return jr({ ok: 0, err: 'name' }, 400);
    await cmd('HSET', 'vmn', uid, JSON.stringify({ n, w: h.clean(String(b.w || ''), 40).trim(), t: now })); await cmd('DEL', 'vmon:c'); return jr({ ok: 1 });
  }
  let rows = null; try { rows = JSON.parse(await cmd('GET', 'vmon:c') || 'null') } catch (e) {}
  if (!rows) { const r = await db.prepare("SELECT uid u, kind k, starts_at s, ends_at e FROM entitlements WHERE kind IN ('vip1','vip2') ORDER BY starts_at").all(); rows = (r.results || []).map(x => [x.u, x.k === 'vip2' ? 2 : 1, +x.s || 0, +x.e || 0]); try { await cmd('SET', 'vmon:c', JSON.stringify(rows), 'EX', 120) } catch (e) {} }
  const P = {}; for (const [u, t, s, e] of rows) { const p = P[u] || (P[u] = { u, mo: 0, f: s, end: 0, top: 0, ms: {} }); const k = Math.max(1, Math.round((e - s) / M30)); p.mo += k; p.end = Math.max(p.end, e); p.top = Math.max(p.top, t); const m = mk(s); p.ms[m] = Math.max(p.ms[m] || 0, t) }
  const ids = Object.keys(P);
  const [vs, nm, sp, ac] = ids.length ? await Promise.all([cmd('MGET', ...ids.map(u => 'vip:' + u)), cmd('HMGET', 'vmn', ...ids), cmd('HMGET', 'supp', ...ids), cmd('MGET', ...ids.map(u => 'acp:' + u))]) : [[], [], [], []];
  const J = x => { try { return JSON.parse(x || 'null') } catch (e) { return null } };
  ids.forEach((u, i) => { const p = P[u], v = J(vs && vs[i]) || {}, q = J(nm && nm[i]), s2 = J(sp && sp[i]), a2 = J(ac && ac[i]);
    const e2 = +v.e2 || 0, e1 = +v.e1 || 0; p.tier = e2 > now ? 2 : e1 > now ? 1 : 0; p.until = p.tier === 2 ? e2 : p.tier === 1 ? e1 : 0; p.fd = v.u ? 1 : 0;
    p.hide = q ? (q.hide ? 1 : 0) : (s2 && s2.hide ? 1 : 0); p.ok = q && !q.hide ? 1 : 0; p.n = p.hide ? '' : (q && q.n) || (s2 && s2.n) || (a2 && a2.n ? h.clean(String(a2.n), 24) : ''); p.w = p.ok ? q.w || '' : ''; p.look = !p.hide && s2 && s2.look ? s2.look : null });
  const pu = u => String(u).replace(/[^a-z0-9]/g, '').slice(0, 12), uid = String(url.searchParams.get('uid') || '');
  const act = ids.map(u => P[u]).filter(p => p.tier).sort((x, y) => y.tier - x.tier || y.mo - x.mo || x.f - y.f)
    .map(p => ({ pu: pu(p.u), n: p.n, w: p.w, t: p.tier, mo: p.mo, f: p.f, fd: p.fd, look: p.look, me: p.u === uid ? 1 : 0 }));
  const B = {}; ids.forEach(u => { const p = P[u]; for (const m in p.ms) (B[m] || (B[m] = [])).push({ n: p.n, t: p.ms[m], mo: p.mo, me: u === uid ? 1 : 0 }) });
  const book = Object.keys(B).sort().reverse().map(m => ({ m, l: B[m].sort((x, y) => y.t - x.t || y.mo - x.mo) }));
  const p = P[uid]; const me = p ? { has: 1, n: p.n, w: p.w, ok: p.ok, hide: p.hide, mo: p.mo, t: p.tier, until: p.until, top: p.top } : { has: 0 };
  return jr({ act, book, me, now });
}
async function payAdmin(request, env, url) {
  const h = await handler(), a = url.searchParams.get('a');
  if (!h.isAdm || !h.isAdm(url.searchParams.get('key'))) return jr({ err: 'admin' }, 403);
  if (!env.PAY_DB) return jr({ ok: 0 });
  const db = env.PAY_DB;
  if (a === 'list') {
    const rs = await db.prepare("SELECT o.id,o.uid,o.pack,o.amount_satang,o.status,o.created_at,o.trans_ref,o.note,s.sender_name FROM orders o LEFT JOIN slips s ON s.order_id=o.id ORDER BY o.created_at DESC LIMIT 60").all();
    const t = await db.prepare("SELECT COUNT(*) n, COALESCE(SUM(amount_satang),0) s FROM orders WHERE status='done' AND created_at>?").bind(Date.now() - ((Date.now() + 7 * 3600e3) % 86400e3)).first();
    return jr({ rows: rs.results || [], today: { n: t ? t.n : 0, baht: t ? t.s / 100 : 0 } });
  }
  if (a === 'regrant' && request.method === 'POST') {
    const id = String(url.searchParams.get('o') || '').replace(/[^a-z0-9]/g, '');
    const o = await db.prepare("SELECT uid,pack,status FROM orders WHERE id=?").bind(id).first(); let PR = null; try { const r = o && await db.prepare("SELECT kind,tier,days,n,price_baht FROM products WHERE sku=?").bind(o.pack).first(); if (r) PR = { kind: r.kind, amt: r.price_baht, tier: r.tier, days: r.days || 0, n: r.n } } catch (e) {}
    const manual = url.searchParams.get('m') === '1';
    if (!o || !(o.status === 'paid_nogrant' || (manual && ['amount', 'unavailable', 'noslip', 'pending', 'old', 'acct', 'dup'].includes(o.status)))) return jr({ ok: 0, err: 'state' });
    try { const run = h.vkRun ? h.vkRun(() => h.payGrant(o.uid, PR || o.pack, '')) : h.payGrant(o.uid, PR || o.pack, ''); await run } catch (e) { return jr({ ok: 0, err: String(e && e.message || e).slice(0, 80) }) }
    await db.prepare("UPDATE orders SET status='done',note=? WHERE id=?").bind(manual ? 'manual-approve(' + o.status + ')' : 'regrant', id).run();
    return jr({ ok: 1 });
  }
  return jr({ err: 'a' }, 400);
}
// สร้าง multipart เอง (ไม่พึ่ง FormData ของ runtime) เพื่อให้ SlipOK เห็นช่อง files แน่นอน (SlipOK 1000 = ไม่พบ data/files/url)
function mpBody(parts) {
  const bd = '----slip' + Math.random().toString(36).slice(2) + Date.now().toString(36), enc = new TextEncoder(), out = [];
  for (const p of parts) {
    out.push(enc.encode('--' + bd + '\r\nContent-Disposition: form-data; name="' + p.name + '"' + (p.filename ? '; filename="' + p.filename + '"' : '') + '\r\n' + (p.type ? 'Content-Type: ' + p.type + '\r\n' : '') + '\r\n'));
    out.push(typeof p.value === 'string' ? enc.encode(p.value) : p.value); out.push(enc.encode('\r\n'));
  }
  out.push(enc.encode('--' + bd + '--\r\n'));
  let n = 0; for (const o of out) n += o.length; const buf = new Uint8Array(n); let k = 0; for (const o of out) { buf.set(o, k); k += o.length }
  return { body: buf, type: 'multipart/form-data; boundary=' + bd };
}
// รหัสสาขา SlipOK: รับได้ทั้งตัวเลขล้วน หรือลิงก์เต็ม (https://api.slipok.com/api/line/apikey/12345) → ตัดเอาส่วนท้าย
const branchId = env => String(env.SLIPOK_BRANCH || '').trim().replace(/\/+$/, '').split('/').pop();
async function slipokCall(env, bin, mt, amount, withLog) {
  const parts = [{ name: 'files', filename: 'slip.' + (/png/.test(mt) ? 'png' : 'jpg'), type: mt, value: bin }];
  if (withLog) parts.push({ name: 'log', value: 'true' });
  if (amount != null) parts.push({ name: 'amount', value: String(amount) });
  const m = mpBody(parts);
  const r = await fetch('https://api.slipok.com/api/line/apikey/' + encodeURIComponent(branchId(env)), { method: 'POST', headers: { 'x-authorization': String(env.SLIPOK_KEY).trim(), 'Content-Type': m.type }, body: m.body });
  return { hs: r.status, j: await r.json().catch(() => null) };
}
async function pay(request, env) {
  if (request.method !== 'POST') { try { if (new URL(request.url).searchParams.get('diag') === 'slip') { const png = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='), c => c.charCodeAt(0)); const o = { key: !!env.SLIPOK_KEY, branch: !!env.SLIPOK_BRANCH, keyLen: String(env.SLIPOK_KEY || '').length, branchLen: String(env.SLIPOK_BRANCH || '').length, branchUsed: branchId(env).length, branchWasUrl: /\//.test(String(env.SLIPOK_BRANCH || '')) }; try { const a = await slipokCall(env, png, 'image/png', null, false); o.test = { hs: a.hs, code: a.j && a.j.code, msg: a.j && String(a.j.message || '').slice(0, 80) } } catch (e) { o.test = { err: String(e && e.message || e).slice(0, 80) } } return jr(o) } if (new URL(request.url).searchParams.get('diag') === '1') return jr({ db: !!env.PAY_DB, slipok: !!(env.SLIPOK_KEY && env.SLIPOK_BRANCH), easyslip: !!env.EASYSLIP_KEY, name_check: !!env.PAY_NAME }) } catch (e) {} return jr({ err: 'method' }, 405) }
  const useOK = !!(env.SLIPOK_KEY && env.SLIPOK_BRANCH);
  if (!env.PAY_DB || !(useOK || env.EASYSLIP_KEY)) return jr({ ok: 0, st: 'unavailable' });
  let b; try { b = await request.json() } catch (e) { return jr({ ok: 0, st: 'bad' }, 400) }
  const uid = String(b.id || ''), pk = String(b.pk || ''), name = String(b.n || '').slice(0, 24);
  const h = await handler();
  // สินค้า: อ่านจากตาราง products ใน D1 (เพิ่ม/แก้ราคา/เพิ่มโลกได้โดยไม่แก้โค้ด) · ถ้าไม่มีแถวนั้นใช้ค่าตั้งต้นในโค้ดเดิม
  let P = null, worldId = null;
  try { const r = await env.PAY_DB.prepare("SELECT kind,scope,world_id,tier,days,n,price_baht FROM products WHERE sku=? AND active=1").bind(pk).first(); if (r) { P = { kind: r.kind, amt: r.price_baht, tier: r.tier, days: r.days || 0, n: r.n }; worldId = r.scope === 'world' ? r.world_id : null } } catch (e) {}
  if (!P) P = h.payPack && h.payPack(pk);
  try { if (P && (P.kind === 'ak' || P.kind === 'akt') && h.akPrice && /^[a-z0-9]{6,24}$/.test(uid)) { const q = () => h.akPrice(uid, P); P = h.vkRun ? await h.vkRun(q) : await q() } } catch (e) { P = null }
  try { if (P && P.dyn && h.cosDyn && /^[a-z0-9]{6,24}$/.test(uid)) { const q = () => h.cosDyn(uid, P); P = h.vkRun ? await h.vkRun(q) : await q() } } catch (e) { P = null }
  // ผู้สนับสนุน (เคยซื้อ/สนับสนุนจริง) ลด 20% สินค้าอีเวนต์ · ฝั่งเกมแสดงราคาเดียวกัน (ceil)
  try { if (P && P.ev && h.cmd && /^[a-z0-9]{6,24}$/.test(uid)) { const q = () => h.cmd('SISMEMBER', 'supok', uid); const v = h.vkRun ? await h.vkRun(q) : await q(); if (+v) P = Object.assign({}, P, { amt: Math.ceil(P.amt * 0.8) }) } } catch (e) {}
  const DON = pk === 'donate'; if (DON) P = { kind: 'donate', amt: 0, tier: 0, days: 0, n: 0 }; // โหมดสนับสนุน: ตรวจว่าสลิปจริง/ไม่ซ้ำ/เข้าบัญชีเรา แต่ไม่ให้สิทธิ์ใดๆ
  if (!P || !/^[a-z0-9]{6,24}$/.test(uid)) return jr({ ok: 0, st: 'bad' }, 400);
  const img = String(b.img || ''); if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img) || img.length > 5.2e6) return jr({ ok: 0, st: 'img' }, 400);
  const db = env.PAY_DB, now = Date.now();
  // กันยิงรัว: ผู้เล่นเดียวกันตรวจได้ไม่เกิน 6 ครั้ง/10 นาที
  try { const c = await db.prepare("SELECT COUNT(*) n FROM orders WHERE uid=? AND created_at>?").bind(uid, now - 600e3).first(); if (c && c.n >= 6) return jr({ ok: 0, st: 'rate' }, 429) } catch (e) {}
  const oid = 'o' + now.toString(36) + Math.random().toString(36).slice(2, 8);
  await db.prepare("INSERT INTO orders(id,uid,pack,amount_satang,channel,status,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?)").bind(oid, uid, pk, P.amt * 100, 'promptpay', 'pending', now, now + 3600e3).run();
  const fail = async (st, note, code = 200) => { try { await db.prepare("UPDATE orders SET status=?,note=? WHERE id=?").bind(st, String(note || '').slice(0, 200), oid).run() } catch (e) {} return jr({ ok: 0, st, note, need: P.amt }, code) };
  // ผลตรวจที่ทุกผู้ให้บริการแปลงมาเป็นรูปเดียวกัน: ref, amt(สตางค์), sd(เวลาโอน ms), sender, receiver
  let ref = '', amt = 0, sd = 0, sender = '', receiver = '', raw = {};
  if (useOK) {
    // SlipOK: ส่งรูปแบบ multipart · amount = ให้ SlipOK เทียบยอดให้ · log = ให้ SlipOK จำสลิปไว้กันใช้ซ้ำอีกชั้น
    let j, hs = 0;
    let sz = 0, mt = '';
    const callOK = async extras => {
      const bin = Uint8Array.from(atob(img.split(',')[1]), c => c.charCodeAt(0)); sz = bin.length; mt = (img.match(/^data:([^;]+)/) || [])[1] || 'image/jpeg';
      const rr = await slipokCall(env, bin, mt, extras && !DON ? P.amt : null, !!extras); hs = rr.hs; return rr.j;
    };
    try {
      j = await callOK(true);
      // 1000 = พารามิเตอร์ไม่ถูกต้อง → ลองใหม่แบบส่งแค่รูป (ยอดเทียบเองฝั่งเรา)
      if (j && Number(j.code || (j.data && j.data.code) || 0) === 1000) j = await callOK(false);
    } catch (e) { return fail('unavailable', 'fetch') }
    if (!j) return fail('unavailable', 'nojson' + hs);
    const code = Number(j.code || (j.data && j.data.code) || 0);
    if (j.success !== true || !j.data) {
      // รหัสของ SlipOK: 1012 สลิปซ้ำ · 1013 ยอดไม่ตรง · 1014 บัญชีผู้รับไม่ตรง · 1006/1007/1008 อ่านสลิปไม่ได้/ไม่ใช่สลิป · 1009/1010 ธนาคารยังไม่พร้อม
      if (code === 1012) return fail('dup', 'slipok-1012');
      if (code === 1013) return fail('amount', 'slipok-1013');
      if (code === 1014) return fail('acct', 'slipok-1014');
      if (code === 1009 || code === 1010) return fail('pending', 'slipok-' + code);
      if (code >= 1005 && code <= 1008 || code === 1011) return fail('noslip', 'slipok-' + code);
      return fail('unavailable', 'slipok-' + (code || hs) + ':' + String(j.message || '').slice(0, 60) + ' [' + mt + ' ' + sz + 'B]');
    }
    raw = j.data;
    ref = String(raw.transRef || '');
    amt = Math.round(Number(raw.amount || 0) * 100);
    const td = String(raw.transDate || ''), tt = String(raw.transTime || '00:00:00');
    sd = raw.transTimestamp ? Date.parse(raw.transTimestamp) : /^\d{8}$/.test(td) ? Date.parse(td.slice(0, 4) + '-' + td.slice(4, 6) + '-' + td.slice(6, 8) + 'T' + tt.slice(0, 8) + '+07:00') : 0;
    const nm = o => String((o && (o.displayName || o.name)) || '');
    sender = nm(raw.sender).slice(0, 60); receiver = nm(raw.receiver).slice(0, 60);
    // ตั้ง PAY_NAME (ชื่อผู้รับตามสลิป เช่น นามสกุล/ชื่อบางส่วน) เพื่อให้เว็บเช็กเองอีกชั้นว่าโอนเข้าบัญชีเราจริง
    if (env.PAY_NAME && !receiver.replace(/\s+/g, '').toLowerCase().includes(String(env.PAY_NAME).replace(/\s+/g, '').toLowerCase())) return fail('acct', 'receiver=' + receiver);
  } else {
    let j;
    try {
      const r = await fetch('https://api.easyslip.com/v2/verify/bank', { method: 'POST', headers: { authorization: 'Bearer ' + env.EASYSLIP_KEY, 'content-type': 'application/json' }, body: JSON.stringify({ base64: img, matchAccount: true, matchAmount: P.amt, checkDuplicate: true }) });
      j = await r.json().catch(() => null);
    } catch (e) { return fail('unavailable', 'fetch') }
    if (!j) return fail('unavailable', 'nojson');
    if (!j.success) { const c = (j.error && j.error.code) || ''; return fail(c === 'SLIP_PENDING' ? 'pending' : /SIZE|VALIDATION|INVALID|NOT_FOUND|SLIP/i.test(c) ? 'noslip' : 'unavailable', c) }
    const d = j.data || {}; raw = d.rawSlip || {}; ref = String(raw.transRef || '');
    if (!ref) return fail('noslip', 'noref');
    if (d.isDuplicate) return fail('dup', 'easyslip-dup');
    if (!d.matchedAccount) return fail('acct', 'not-our-account');
    amt = Math.round(((raw.amount && raw.amount.amount) || 0) * 100);
    if (d.isAmountMatched === false) return fail('amount', 'slip=' + amt);
    sd = Date.parse(raw.date || '');
    sender = String(((raw.sender || {}).account || {}).name && raw.sender.account.name.th || '').slice(0, 60); receiver = String(((raw.receiver || {}).account || {}).name && raw.receiver.account.name.th || '').slice(0, 60);
  }
  if (!ref) return fail('noslip', 'noref');
  if (!DON && amt !== P.amt * 100) return fail('amount', 'slip=' + amt);
  if (!sd || sd < now - 3 * 3600e3 || sd > now + 600e3) return fail('old', 'date=' + (raw.date || raw.transDate || ''));
  // จองสลิปนี้ (คีย์หลักซ้ำ = เคยใช้แล้ว)
  try { await db.prepare("INSERT INTO slips(channel,trans_ref,order_id,amount_satang,sender_name,receiver_name,slip_date,verified_at) VALUES(?,?,?,?,?,?,?,?)").bind('promptpay', ref, oid, amt, sender, receiver, String(raw.date || raw.transDate || ''), now).run() }
  catch (e) { return fail('dup', 'slip-used') }
  if (DON) { await db.prepare("UPDATE orders SET status='donation',paid_at=?,trans_ref=?,amount_satang=?,note=? WHERE id=?").bind(now, ref, amt, 'สนับสนุน ' + sender, oid).run(); return jr({ ok: 1, order: oid, don: 1, amt: amt / 100, ref }) }
  await db.prepare("UPDATE orders SET status='paid',paid_at=?,trans_ref=? WHERE id=?").bind(now, ref, oid).run();
  try {
    const run = h.vkRun ? h.vkRun(() => h.payGrant(uid, P, name, b.an ? 1 : 0)) : h.payGrant(uid, P, name, b.an ? 1 : 0); await run;
    try { h.vkReset && h.vkReset() } catch (e) {}
  } catch (e) { console.error('PAY_GRANT', String(e && e.message || e)); await db.prepare("UPDATE orders SET status='paid_nogrant',note=? WHERE id=?").bind(String(e && e.message || e).slice(0, 150), oid).run().catch(() => {}); return jr({ ok: 0, st: 'grant', order: oid }) }
  try { await db.prepare("INSERT INTO entitlements(uid,kind,starts_at,ends_at,order_id,source,created_at,world_id) VALUES(?,?,?,?,?,?,?,?)").bind(uid, P.kind === 'vip' ? 'vip' + P.tier : P.kind === 'sp' ? 'sp' + P.tier + ':' + (P.sea || '') : P.kind === 'nv' ? 'nv' : P.kind === 'cos' ? 'cos:' + (P.key || '') : P.kind === 'lk' ? 'lk' + P.n : P.kind === 'ak' || P.kind === 'akt' ? P.kind + P.n : 'rr' + P.n, now, P.days ? now + P.days * 86400e3 : null, oid, 'order', now, worldId).run() } catch (e) {}
  await db.prepare("UPDATE orders SET status='done' WHERE id=?").bind(oid).run().catch(() => {});
  return jr({ ok: 1, order: oid });
}

// 💬 แชทเรียลไทม์: ห้องเดียวทั้งโลก (Durable Object แบบ SQLite ใช้ได้ในแพ็กฟรี) — แค่กระจายข้อความ ไม่เก็บข้อมูล
// ผู้เล่นต่อ WebSocket แบบจำศีล (ไม่มีข้อความ = ไม่เสียโควต้า) · ข้อความจริงยังบันทึกใน Valkey ผ่าน api/online.js เหมือนเดิม
export class ChatHub {
  constructor(ctx, env) { this.ctx = ctx; try { ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong')) } catch (e) {} }
  async fetch(req) {
    const u = new URL(req.url);
    if (u.pathname === '/b' && req.method === 'POST') { const t = await req.text(); let n = 0; for (const ws of this.ctx.getWebSockets()) { try { ws.send(t); n++ } catch (e) {} } return new Response(String(n)) }
    if (u.pathname === '/n') return new Response(String(this.ctx.getWebSockets().length));
    if ((req.headers.get('Upgrade') || '').toLowerCase() !== 'websocket') return new Response('ws only', { status: 426 });
    if (this.ctx.getWebSockets().length >= 3000) return new Response('full', { status: 503 });
    const pair = new WebSocketPair(), c = pair[0], s = pair[1];
    this.ctx.acceptWebSocket(s);
    return new Response(null, { status: 101, webSocket: c });
  }
  webSocketMessage(ws, msg) {}
  webSocketClose(ws, code) { try { ws.close(code === 1005 || code === 1006 ? 1000 : code, 'bye') } catch (e) {} }
  webSocketError(ws) { try { ws.close(1011, 'err') } catch (e) {} }
}
const hub = env => env && env.CHAT ? env.CHAT.get(env.CHAT.idFromName('world')) : null;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/ws/chat') { const h = hub(env); return h ? h.fetch(request) : new Response('no hub', { status: 404 }) }
    // แชทโลก: แคชที่ขอบ Cloudflare 3 วินาที (ทุกคนได้คำตอบเดียวกัน ไม่ต้องวิ่งไป Valkey ทุกครั้ง) · ไม่แคชถ้าประกาศมีโพลซึ่งแยกตามผู้เล่น
    if (request.method === 'GET' && url.pathname === '/api/online' && url.searchParams.get('a') === 'chat' && !url.searchParams.get('fresh')) {
      try {
        const ck = new Request(url.origin + '/__edge/chat'), c = caches.default, hit = await c.match(ck);
        if (hit) { const r = new Response(hit.body, hit); r.headers.set('x-edge', 'HIT'); return r }
        const r = await api(request, url);
        if (r.status === 200) {
          const t = await r.clone().text();
          let ok = false; try { const j = JSON.parse(t); ok = !(j && j.ann && Array.isArray(j.ann.poll) && j.ann.poll.length) } catch (e) {}
          if (ok) ctx.waitUntil(c.put(ck, new Response(t, { status: 200, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=3' } })));
        }
        return r;
      } catch (e) { console.error('API_ERR edgecache', String(e && e.message || e)) }
    }
    if (url.pathname === '/api/pay') return url.searchParams.get('a') === 'products' ? payProducts(env) : /^(supboard|supjoin)$/.test(url.searchParams.get('a') || '') ? supHall(request, env, url) : /^(vipmon|vipmonjoin)$/.test(url.searchParams.get('a') || '') ? vipMon(request, env, url) : url.searchParams.get('a') ? payAdmin(request, env, url) : pay(request, env);
    if (TRAP.some(r => r.test(url.pathname))) { url.search = '?a=trap&p=' + encodeURIComponent(url.pathname.slice(1)); url.pathname = '/api/online' }
    if (url.pathname === '/api/online' || url.pathname === '/api/online/') {
      const r = await api(request, url);
      // มีคนส่งข้อความ/ประกาศ → ล้างแคชแชทที่ขอบทันที ข้อความใหม่จะขึ้นในการดึงรอบถัดไป
      try { if (request.method === 'POST' && /^(say|annrm|annclear|annvote|chathide|chatdel)$/.test(url.searchParams.get('a') || '') && r.status === 200) await caches.default.delete(new Request(url.origin + '/__edge/chat')) } catch (e) {}
      // กระจายข้อความใหม่ถึงทุกคนที่เปิดแชทอยู่ทันที (ไม่ต้องรอรอบดึง)
      try { const a0 = url.searchParams.get('a') || ''; if (request.method === 'POST' && r.status === 200 && /^(say|annrm|annclear|annvote|chathide|chatdel)$/.test(a0)) { const h = hub(env); if (h) { let msg = '{"t":"r"}'; if (a0 === 'say') { try { const j = await r.clone().json(); if (j && j.m && !j.ann) msg = JSON.stringify({ t: 'm', m: j.m }) } catch (e) {} } ctx.waitUntil(h.fetch('https://hub/b', { method: 'POST', body: msg }).catch(() => {})) } } } catch (e) {}
      return r;
    }
    // โดเมนเดิม (www) → ใช้ไฟล์หน้าเว็บ
    return withSec(await env.ASSETS.fetch(request));
  },
  // ⏰ cron (ตั้งใน wrangler.toml [triggers]) → ส่ง push ดึงผู้เล่นที่หายไปกลับมา (แทน Vercel cron) · ใช้ CRON_SECRET หรือ ADMIN_KEY2 ที่ตั้งไว้ใน secret
  async scheduled(event, env, ctx) {
    const key = env.CRON_SECRET || '';
    try { const k2 = env.CRON_SECRET || ''; const u2 = new URL('https://1inanovel.com/api/online?a=dcsync'); if (!k2 && env.ADMIN_KEY2) u2.searchParams.set('key', env.ADMIN_KEY2); ctx.waitUntil(api(new Request(u2, { method: 'GET', headers: k2 ? { authorization: 'Bearer ' + k2 } : {} }), u2).then(r => r.text()).then(t => console.log('dcsync', String(t).slice(0, 200))).catch(e => console.error('dcsync err', String(e && e.message || e)))) } catch (e) { }
    const req = new Request('https://1inanovel.com/api/online?a=pushre', { method: 'GET', headers: key ? { authorization: 'Bearer ' + key } : {} });
    const url = new URL(req.url); if (!key && env.ADMIN_KEY2) url.searchParams.set('key', env.ADMIN_KEY2);
    ctx.waitUntil(api(key ? req : new Request(url, { method: 'GET' }), url).then(r => r.text()).then(t => console.log('pushre', String(t).slice(0, 300))).catch(e => console.error('pushre err', String(e && e.message || e))));
    // 🎮 ปรับยศ VIP/ผู้สนับสนุนใน Discord ของคนที่ผูกบัญชีไว้ (ถอดเมื่อหมดอายุ) · ไม่ตั้ง env Discord = ตอบ off เฉยๆ
    const req2 = new Request('https://1inanovel.com/api/online?a=dcsync', { method: 'GET', headers: key ? { authorization: 'Bearer ' + key } : {} });
    const url2 = new URL(req2.url); if (!key && env.ADMIN_KEY2) url2.searchParams.set('key', env.ADMIN_KEY2);
    ctx.waitUntil(api(key ? req2 : new Request(url2, { method: 'GET' }), url2).then(r => r.text()).then(t => console.log('dcsync', String(t).slice(0, 300))).catch(e => console.error('dcsync err', String(e && e.message || e))));
  },
};
