const CACHE_NAME = 'offline-v1';
const ARCHIVOS_A_CACHEAR = [
  '/offline.html',
  '/css/index.bundle.css',
  '/js/index.min.js',
  '/svg/logo.svg',
  '/svg/themes.svg',
  '/favicon.ico',
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARCHIVOS_A_CACHEAR))
  );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches
        .match(event.request)
        .then(cachedResponse => cachedResponse || caches.match('/offline.html'))
    )
  );
});

// Actualizar la caché
self.addEventListener('activate', event => {
  const cachesPermitidos = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (!cachesPermitidos.includes(key)) return caches.delete(key);
        })
      );
    })
  );
});
