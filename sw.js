// NAIKKAN VERSI CACHE (Misal dari v2 ke v3)
const CACHE_NAME = 'kasva-admin-v3'; 

const urlsToCache = [
  
  'index.html',
  
  'manifest.json',
  
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('PWA: Mencache file baru index.html');
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('PWA: Menghapus cache lama', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
