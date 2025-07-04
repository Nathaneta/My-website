const CACHE_NAME = 'brightgrade-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/teacher.html',
  '/student.html',
  '/styles/main.css',
  '/js/main.js',
  '/js/admin.js',
  '/js/auth.js',
  '/assets/brightlogo.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
}); 