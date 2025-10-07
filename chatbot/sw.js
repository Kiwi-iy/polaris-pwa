self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('polaris-chatbot').then(cache => {
      return cache.addAll(['/chatbot/', '/chatbot/index.html', '/chatbot/style.css', '/chatbot/app.js']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
