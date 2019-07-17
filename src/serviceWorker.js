self.addEventListener('install', e => {
  console.info('[service worker] installing',e);
});

self.addEventListener('activate', e => {
  console.info('[service worker] activating',e);
});

self.addEventListener('fetch', e => {
  console.info('[service worker] fetching',e);
});
