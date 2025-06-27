const cacheName = "PlaceHolder-Records-1.0";
const contentToCache = [
    "Build/678d150bbd7d4f23cb4592bcf37964dd.loader.js",
    "Build/bc439b2cb15b0b4ad2b184f862743f05.framework.js.unityweb",
    "Build/7ff919501ba64a23216e013abdd15ff9.data.unityweb",
    "Build/7621b68534e8443024f85ee49b58be63.wasm.unityweb",
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
