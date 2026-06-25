const CACHE_NAME = 'alertavecinal-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// Dominios de tiles y APIs que NUNCA deben cachearse
const NO_CACHE_DOMAINS = [
  'basemaps.cartocdn.com',
  'nominatim.openstreetmap.org',
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Instalar y cachear solo los assets propios
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Limpiar caches viejos (incluyendo v1 con tiles bloqueados)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Tiles y APIs externas van siempre a la red; assets propios desde cache
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isExternal = NO_CACHE_DOMAINS.some(d => url.hostname.includes(d));

  if (isExternal) {
    // Siempre a la red, sin cachear
    e.respondWith(fetch(e.request));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

