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
  H = m.default || m;
  return H;
}

// Workers ห้ามใช้ socket ข้ามคำขอ → แต่ละคำขอมีการเชื่อมต่อฐานข้อมูลของตัวเอง (vkRun ใช้ AsyncLocalStorage) ทำหลายคำขอพร้อมกันได้ ไม่ต้องเข้าคิว
async function api(request, url) {
  const h = await handler();
  const run = h.vkRun ? h.vkRun(() => apiOne(request, url)) : apiOne(request, url);
  return Promise.race([run, new Promise(r => setTimeout(() => r(new Response('{"err":"timeout"}', { status: 504, headers: { 'content-type': 'application/json' } })), 20000))]);
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
const jr = (o, st = 200) => new Response(JSON.stringify(o), { status: st, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
async function payProducts(env) {
  try { const r = await env.PAY_DB.prepare("SELECT sku,kind,scope,world_id,tier,days,n,price_baht FROM products WHERE active=1 ORDER BY sort").all(); return jr({ items: r.results || [] }) } catch (e) { return jr({ items: [] }) }
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
    if (!o || o.status !== 'paid_nogrant') return jr({ ok: 0, err: 'state' });
    try { const run = h.vkRun ? h.vkRun(() => h.payGrant(o.uid, PR || o.pack, '')) : h.payGrant(o.uid, PR || o.pack, ''); await run } catch (e) { return jr({ ok: 0, err: String(e && e.message || e).slice(0, 80) }) }
    await db.prepare("UPDATE orders SET status='done',note='regrant' WHERE id=?").bind(id).run();
    return jr({ ok: 1 });
  }
  return jr({ err: 'a' }, 400);
}
async function pay(request, env) {
  if (request.method !== 'POST') { try { if (new URL(request.url).searchParams.get('diag') === '1') return jr({ db: !!env.PAY_DB, slipok: !!(env.SLIPOK_KEY && env.SLIPOK_BRANCH), easyslip: !!env.EASYSLIP_KEY, name_check: !!env.PAY_NAME }) } catch (e) {} return jr({ err: 'method' }, 405) }
  const useOK = !!(env.SLIPOK_KEY && env.SLIPOK_BRANCH);
  if (!env.PAY_DB || !(useOK || env.EASYSLIP_KEY)) return jr({ ok: 0, st: 'unavailable' });
  let b; try { b = await request.json() } catch (e) { return jr({ ok: 0, st: 'bad' }, 400) }
  const uid = String(b.id || ''), pk = String(b.pk || ''), name = String(b.n || '').slice(0, 24);
  const h = await handler();
  // สินค้า: อ่านจากตาราง products ใน D1 (เพิ่ม/แก้ราคา/เพิ่มโลกได้โดยไม่แก้โค้ด) · ถ้าไม่มีแถวนั้นใช้ค่าตั้งต้นในโค้ดเดิม
  let P = null, worldId = null;
  try { const r = await env.PAY_DB.prepare("SELECT kind,scope,world_id,tier,days,n,price_baht FROM products WHERE sku=? AND active=1").bind(pk).first(); if (r) { P = { kind: r.kind, amt: r.price_baht, tier: r.tier, days: r.days || 0, n: r.n }; worldId = r.scope === 'world' ? r.world_id : null } } catch (e) {}
  if (!P) P = h.payPack && h.payPack(pk);
  if (!P || !/^[a-z0-9]{6,24}$/.test(uid)) return jr({ ok: 0, st: 'bad' }, 400);
  const img = String(b.img || ''); if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img) || img.length > 5.2e6) return jr({ ok: 0, st: 'img' }, 400);
  const db = env.PAY_DB, now = Date.now();
  // กันยิงรัว: ผู้เล่นเดียวกันตรวจได้ไม่เกิน 6 ครั้ง/10 นาที
  try { const c = await db.prepare("SELECT COUNT(*) n FROM orders WHERE uid=? AND created_at>?").bind(uid, now - 600e3).first(); if (c && c.n >= 6) return jr({ ok: 0, st: 'rate' }, 429) } catch (e) {}
  const oid = 'o' + now.toString(36) + Math.random().toString(36).slice(2, 8);
  await db.prepare("INSERT INTO orders(id,uid,pack,amount_satang,channel,status,created_at,expires_at) VALUES(?,?,?,?,?,?,?,?)").bind(oid, uid, pk, P.amt * 100, 'promptpay', 'pending', now, now + 3600e3).run();
  const fail = async (st, note, code = 200) => { try { await db.prepare("UPDATE orders SET status=?,note=? WHERE id=?").bind(st, String(note || '').slice(0, 200), oid).run() } catch (e) {} return jr({ ok: 0, st, note }, code) };
  // ผลตรวจที่ทุกผู้ให้บริการแปลงมาเป็นรูปเดียวกัน: ref, amt(สตางค์), sd(เวลาโอน ms), sender, receiver
  let ref = '', amt = 0, sd = 0, sender = '', receiver = '', raw = {};
  if (useOK) {
    // SlipOK: ส่งรูปแบบ multipart · amount = ให้ SlipOK เทียบยอดให้ · log = ให้ SlipOK จำสลิปไว้กันใช้ซ้ำอีกชั้น
    let j, hs = 0;
    try {
      const bin = Uint8Array.from(atob(img.split(',')[1]), c => c.charCodeAt(0)), fd = new FormData();
      fd.append('files', new Blob([bin], { type: (img.match(/^data:([^;]+)/) || [])[1] || 'image/jpeg' }), 'slip.jpg');
      fd.append('amount', String(P.amt)); fd.append('log', 'true');
      const r = await fetch('https://api.slipok.com/api/line/apikey/' + encodeURIComponent(env.SLIPOK_BRANCH), { method: 'POST', headers: { 'x-authorization': env.SLIPOK_KEY }, body: fd });
      hs = r.status; j = await r.json().catch(() => null);
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
      return fail('unavailable', 'slipok-' + (code || hs) + ':' + String(j.message || '').slice(0, 60));
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
  if (amt !== P.amt * 100) return fail('amount', 'slip=' + amt);
  if (!sd || sd < now - 3 * 3600e3 || sd > now + 600e3) return fail('old', 'date=' + (raw.date || raw.transDate || ''));
  // จองสลิปนี้ (คีย์หลักซ้ำ = เคยใช้แล้ว)
  try { await db.prepare("INSERT INTO slips(channel,trans_ref,order_id,amount_satang,sender_name,receiver_name,slip_date,verified_at) VALUES(?,?,?,?,?,?,?,?)").bind('promptpay', ref, oid, amt, sender, receiver, String(raw.date || raw.transDate || ''), now).run() }
  catch (e) { return fail('dup', 'slip-used') }
  await db.prepare("UPDATE orders SET status='paid',paid_at=?,trans_ref=? WHERE id=?").bind(now, ref, oid).run();
  try {
    const run = h.vkRun ? h.vkRun(() => h.payGrant(uid, P, name)) : h.payGrant(uid, P, name); await run;
    try { h.vkReset && h.vkReset() } catch (e) {}
  } catch (e) { console.error('PAY_GRANT', String(e && e.message || e)); await db.prepare("UPDATE orders SET status='paid_nogrant',note=? WHERE id=?").bind(String(e && e.message || e).slice(0, 150), oid).run().catch(() => {}); return jr({ ok: 0, st: 'grant', order: oid }) }
  try { await db.prepare("INSERT INTO entitlements(uid,kind,starts_at,ends_at,order_id,source,created_at,world_id) VALUES(?,?,?,?,?,?,?,?)").bind(uid, P.kind === 'vip' ? 'vip' + P.tier : 'rr' + P.n, now, P.days ? now + P.days * 86400e3 : null, oid, 'order', now, worldId).run() } catch (e) {}
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
    if (url.pathname === '/api/pay') return url.searchParams.get('a') === 'products' ? payProducts(env) : url.searchParams.get('a') ? payAdmin(request, env, url) : pay(request, env);
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
    return env.ASSETS.fetch(request);
  },
};
