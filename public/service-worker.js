
const CACHE_NAME = "confessease-v1"; // Changed cache name to be more specific
const urlsToCache = [
  "/", // Caches the start_url
  // Add other critical static assets your app shell needs.
  // Be careful with Next.js assets as their names can include hashes.
  // For a Next.js app, dynamic pages and JS chunks are better handled
  // by workbox (e.g. via next-pwa) or a more advanced custom SW.
  // This basic SW will primarily cache the assets explicitly listed.
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable-512x512.png"
  // Add more paths to essential CSS, JS, or images if they are static and unhashed
];

self.addEventListener("install", (event) => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[Service Worker] Failed to cache app shell:', error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[Service Worker] Returning from cache:', event.request.url);
        return response;
      }
      console.log('[Service Worker] Fetching from network:', event.request.url);
      return fetch(event.request).then(networkResponse => {
        // Optionally, cache new requests dynamically if needed
        // Be cautious with this for a Next.js app as you might cache too much or stale data
        // if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
        //   return networkResponse;
        // }
        // const responseToCache = networkResponse.clone();
        // caches.open(CACHE_NAME).then(cache => {
        //   cache.put(event.request, responseToCache);
        // });
        return networkResponse;
      }).catch(error => {
        console.error('[Service Worker] Fetch failed; returning offline page if available or error', error);
        // You could return a custom offline fallback page here:
        // return caches.match('/offline.html');
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => {
      console.log('[Service Worker] Activated successfully and old caches deleted.');
      return self.clients.claim(); // Ensures the activate SW takes control immediately
    })
  );
});
