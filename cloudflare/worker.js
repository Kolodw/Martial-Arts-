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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (TRAP.some(r => r.test(url.pathname))) { url.search = '?a=trap&p=' + encodeURIComponent(url.pathname.slice(1)); url.pathname = '/api/online' }
    if (url.pathname === '/api/online' || url.pathname === '/api/online/') return api(request, url);
    // โดเมนเดิม (www) → ใช้ไฟล์หน้าเว็บ
    return env.ASSETS.fetch(request);
  },
};
