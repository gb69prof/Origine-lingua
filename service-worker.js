
const CACHE_NAME = 'origine-lingua-v1.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './pwa.js',
  './service-worker.js',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon-180.png',
  './pages/indice.html',
  './pages/mappa.html',
  './pages/timeline.html',
  './pages/glossario.html',
  './pages/quiz.html',
  './pages/fonti.html',
  './pages/introduzione.html',
  './pages/latino-volgari.html',
  './pages/attestazioni.html',
  './pages/prestigio.html',
  './pages/questione.html',
  './pages/diffusione.html',
  './pages/conclusione.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isStaticAsset(request) {
  return /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|json|md|txt|woff2?|ttf|otf|pdf|glb|gltf|bin|mp4|webm)$/i.test(request.url);
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match('./offline.html'))
    );
    return;
  }

  if (isStaticAsset(request)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});
