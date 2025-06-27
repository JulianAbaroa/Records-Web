const cacheName = "PlaceHolder-Records-1.0";
const contentToCache = [
    "Build/b86435b580c7881eb2940c2e80893b53.loader.js",
    "Build/bc439b2cb15b0b4ad2b184f862743f05.framework.js.unityweb",
    "Build/021748315fc1f7aadf0790f3bf7a9719.data.unityweb",
    "Build/7bde0852fd758b6f9384d08e5b12e89e.wasm.unityweb",
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
