const CACHE_NAME = 'ecoalga-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/creative-design.css',
  '/assets/js/creative-design.js',
  '/assets/vendors/bootstrap/bootstrap.bundle.js',
  '/assets/vendors/bootstrap/bootstrap.affix.js',
  '/assets/vendors/jquery/jquery-3.4.1.js',
  '/assets/vendors/themify-icons/css/themify-icons.css',
  '/assets/imgs/icon-192.png',
  '/assets/imgs/icon-512.png',
  '/assets/imgs/apple-touch-icon.png',
  '/assets/imgs/favicon-96x96.png',
  '/assets/imgs/favicon.svg',
  '/assets/imgs/favicon.ico',
  '/assets/imgs/header.jpg',
  '/assets/imgs/bg-img-1.jpg',
  '/assets/imgs/bg-img-2.jpg'
];

// Instalar el SW y guardar archivos en caché
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
      })
    );
  });

  // Interceptar peticiones y responder desde caché o red
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });

  // Limpiar caché antigua si se cambia el nombre del caché
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(names => {
        return Promise.all(
          names.map(name => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
    );
  });