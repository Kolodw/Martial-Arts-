// 1 ใน นวนิยาย — service worker สำหรับแจ้งเตือน (ไม่แคชไฟล์เกม เพื่อให้อัปเดตทันทีเสมอ)
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
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
