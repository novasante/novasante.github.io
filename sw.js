const cacheName = "NOVA-v0.2.10",
      assets = [
        '/',
        '/index.html',
        '/manifest.json',
        '/assets/js/script.js',
        '/assets/css/style.css',
        // Local images
        '/assets/icons/favicon.svg',
        // CDN images
        // 'https://ik.imagekit.io/sarahdionne/tr:w-30,fo-auto,f-webp/hero/full.jpg',
        // Externals
        // 'https://cdn.polyfill.io/v3/polyfill.min.js',
        'https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&amp;display=swap'
      ];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(assets))
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== cacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  const url = new URL(evt.request.url);

  if (url.searchParams.has("cc")) {
    caches.delete(cacheName);
  }

  // Only handle local GET requests
  if (
    evt.request.method !== "GET" ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).catch(() => {
          if (evt.request.mode === "navigate") {
            return caches.match("/");
          }

          return Response.error();
        })
      );
    })
  );
});