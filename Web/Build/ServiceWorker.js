const cacheName = "PlaceHolder-Records-1.0";
const contentToCache = [
    "Build/8f05c9cccfd9192df3d69e09a864e09b.loader.js",
    "Build/bc439b2cb15b0b4ad2b184f862743f05.framework.js.unityweb",
    "Build/184a563fbe1498c23e356588437b85bd.data.unityweb",
    "Build/09d9398cc1018e97e99cc7ba40867f32.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
