const cacheName = "PlaceHolder-Records-1.0";
const contentToCache = [
    "Build/67ae9879fab59c2dce42cd26880f564e.loader.js",
    "Build/bc439b2cb15b0b4ad2b184f862743f05.framework.js.unityweb",
    "Build/afec0317694d4c6b35ca6f8460f5a463.data.unityweb",
    "Build/0e2c183d2701ba0c0ad28a771b35fb4f.wasm.unityweb",
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
