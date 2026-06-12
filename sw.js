// FilePhile Service Worker v1.9
const CACHE_NAME = 'filephile-v1.9';
// Relative URLs (resolved against the SW location) so precaching works at
// both domain root (Vercel) and a subpath (GitHub Pages project site).
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest?v=1.7',
  './icons/FilePhile-official.svg?v=1.7',
  './icons/icon-192.png?v=1.7',
  './icons/icon-512.png?v=1.7',
  './icons/icon-512-maskable.png?v=1.7',
  './icons/apple-touch-icon.png?v=1.7',
  './favicon.ico?v=1.7'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            })
            .catch((error) => {
              console.error('Failed to cache response:', error);
            });

          return response;
        }).catch(() => {
          // If both cache and network fail, return a basic offline page
          return new Response('Offline - FilePhile requires internet connection for first load', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});
