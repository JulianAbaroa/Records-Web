const cacheName = "PlaceHolder-Records-1.0";
const contentToCache = [
    "Build/9abb61c9989c0402de36243c39d011d3.loader.js",
    "Build/bc439b2cb15b0b4ad2b184f862743f05.framework.js.unityweb",
    "Build/406ad0e98955c7ba65d32c62240482a4.data.unityweb",
    "Build/19e45f48b25d9321d4ffc8dd7446e982.wasm.unityweb",
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
