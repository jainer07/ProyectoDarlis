const CACHE_NAME = 'ecoalga-cache-v1';
const BASE_PATH = '/ProyectoDarlis';
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/assets/css/creative-design.css`,
  `${BASE_PATH}/assets/js/creative-design.js`,
  `${BASE_PATH}/assets/vendors/bootstrap/bootstrap.bundle.js`,
  `${BASE_PATH}/assets/vendors/bootstrap/bootstrap.affix.js`,
  `${BASE_PATH}/assets/vendors/jquery/jquery-3.4.1.js`,
  `${BASE_PATH}/assets/vendors/themify-icons/css/themify-icons.css`,
  `${BASE_PATH}/assets/imgs/icon-192.png`,
  `${BASE_PATH}/assets/imgs/icon-512.png`,
  `${BASE_PATH}/assets/imgs/apple-touch-icon.png`,
  `${BASE_PATH}/assets/imgs/favicon-96x96.png`,
  `${BASE_PATH}/assets/imgs/favicon.svg`,
  `${BASE_PATH}/assets/imgs/favicon.ico`,
  `${BASE_PATH}/assets/imgs/header.jpg`,
  `${BASE_PATH}/assets/imgs/bg-img-1.jpg`,
  `${BASE_PATH}/assets/imgs/bg-img-2.jpg`
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