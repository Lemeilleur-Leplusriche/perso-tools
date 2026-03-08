const CACHE_NAME = 'ppl-v1';
const ASSETS = ['/perso-tools/', '/perso-tools/index.html', '/perso-tools/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(e.request, c)); return res; }).catch(() => caches.match(e.request)));
});
