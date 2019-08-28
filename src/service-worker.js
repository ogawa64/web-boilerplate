const CACHE_VERSION = 'CACHE_VERSION_PRACEHOLDER';

const STATIC_CACHE_KEY = 'cahce_v_' + CACHE_VERSION;
const CACHE_FILES = [];

const CACHE_KEYS = [
  STATIC_CACHE_KEY
]

self.addEventListener('install', event => {
  event.waitUntill(
    caches.open(STATIC_CACHE_KEY).then(cache => {
      return Promise.all(
        CACHE_FILES.map(url => {
          return fetch(new Request(url, {
            cache: 'no-cache',
            mode: 'no-cors'
          })).then(response => {
            return cache.put(url, response);
          })
        })
      )
    })
  )
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (CACHE_KEYS.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      }))
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
