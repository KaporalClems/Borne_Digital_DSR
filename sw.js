const CACHE_NAME = 'kiosk-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/05 ST PIERRE BY NIGHT DSR WEB HD.mp4',
    'https://cdn.tailwindcss.com',
    'https://srias.re/wp-content/uploads/2020/12/Destination-Sud-Reunion-png-1-min.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    'https://flagcdn.com/w40/fr.png',
    'https://flagcdn.com/w40/gb.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Ouverture du cache et mise en cache des URLs');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Le cache a une réponse
            if (response) {
                return response;
            }
            // Aucune réponse dans le cache, faire la requête réseau
            return fetch(event.request);
        })
    );
});
