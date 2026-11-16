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
