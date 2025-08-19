const CACHE_NAME = 'dsr-kiosk-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/accueil.html',
  '/js/main.js',
  '/manifest.json'
  // Ajoutez toutes les autres pages et ressources ici
  // '/manger.html',
  // '/dormir.html',
  // etc.
];

// Installe le service worker et met en cache les actifs
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepte les requêtes et sert les actifs depuis le cache si disponibles
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la ressource depuis le cache si elle est trouvée
        if (response) {
          return response;
        }
        // Sinon, effectue une requête réseau
        return fetch(event.request);
      })
  );
});

// Active le service worker et supprime les anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Supprime les anciens caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
