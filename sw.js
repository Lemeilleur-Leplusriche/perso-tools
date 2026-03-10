const C='ppl-v2',A=['/perso-tools/','/perso-tools/index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const url=e.request.url;
  if(url.includes('/hub/'))return;
  if(url.includes('/tester/'))return;
  if(url.includes('/face/'))return;
  if(url.includes('/convo/'))return;
  if(url.includes('/glowup/'))return;
  if(url.includes('fonts.googleapis.com'))return;
  if(url.includes('fonts.gstatic.com'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))
});
