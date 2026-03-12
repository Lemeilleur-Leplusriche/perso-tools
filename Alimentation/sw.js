const C='recomp-v1',A=['/perso-tools/Alimentation/','/perso-tools/Alimentation/index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('fonts.googleapis.com'))return;
  if(e.request.url.includes('fonts.gstatic.com'))return;
  if(e.request.url.includes('api.anthropic.com'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))
});
