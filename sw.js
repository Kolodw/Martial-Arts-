// 1 ใน นวนิยาย — service worker: แจ้งเตือน + เก็บไฟล์เกมใหญ่ (app.js / pfx.js) ไว้ในเครื่อง
// เปิดเกมครั้งถัดไปใช้ไฟล์ในเครื่องทันที แล้วเช็คเวอร์ชันใหม่เบื้องหลัง — ถ้ามีใหม่จะเก็บไว้ใช้ครั้งหน้า และบอกหน้าเกม
const GC = 'game-files-v1', SWR = /^\/(app|pfx)\.js$/;
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => { try { for (const k of await caches.keys()) if (k !== GC && k.startsWith('game-files-')) await caches.delete(k) } catch (x) {} await self.clients.claim() })()));
const tagOf = r => r ? (r.headers.get('etag') || r.headers.get('last-modified') || '') : '';
const bg = {};
async function refresh(path, req, hit) {
  if (bg[path]) return bg[path];
  return bg[path] = (async () => {
    try {
      const r = await fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' });
      if (!r.ok || r.status !== 200) return null;
      const nt = tagOf(r), ot = tagOf(hit);
      if (!hit || !nt || nt !== ot) {
        const c = await caches.open(GC); await c.put(path, r.clone());
        if (hit && nt && nt !== ot && path === '/app.js') { try { for (const w of await self.clients.matchAll({ type: 'window' })) w.postMessage({ upd: 1 }) } catch (x) {} }
      }
      return r;
    } catch (x) { return null } finally { delete bg[path] }
  })();
}
self.addEventListener('fetch', e => {
  const q = e.request; if (q.method !== 'GET') return;
  let u; try { u = new URL(q.url) } catch (x) { return }
  if (u.origin !== self.location.origin || !SWR.test(u.pathname) || u.search) return;
  e.respondWith((async () => {
    let hit = null; try { hit = await (await caches.open(GC)).match(u.pathname) } catch (x) {}
    if (hit) { e.waitUntil(refresh(u.pathname, q, hit)); return hit }
    const r = await refresh(u.pathname, q, null);
    return r ? r.clone() : fetch(q);
  })());
});
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {} } catch (x) { d = { b: e.data ? e.data.text() : '' } }
  const title = d.t || '1 ใน นวนิยาย';
  e.waitUntil(self.registration.showNotification(title, {
    body: d.b || '', icon: '/icon-192.png', badge: '/badge-96.png', tag: d.g || undefined, renotify: !!d.g,
    data: { u: d.u || '/' }, lang: 'th'
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const u = new URL((e.notification.data && e.notification.data.u) || '/', self.location.origin).href;
  e.waitUntil((async () => {
    const L = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of L) {
      if (new URL(c.url).origin === self.location.origin) {
        try { await c.focus() } catch (x) {}
        try { c.postMessage({ go: new URL(u).searchParams.get('go') || '' }) } catch (x) {}
        return;
      }
    }
    await self.clients.openWindow(u);
  })());
});
