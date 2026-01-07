/* ============================================
   GANESH NEELI - PORTFOLIO SERVICE WORKER
   ============================================ */

const CACHE_NAME = 'ganesh-portfolio-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/favicon.png',
    '/manifest.json'
];

// Install: Cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
});

// Fetch: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});