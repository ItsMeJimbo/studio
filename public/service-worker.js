// public/service-worker.js
const CACHE_NAME = "confessease-v1.1"; // Increment cache version
const urlsToCache = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable-512x512.png",
  "/offline.html" // Added offline fallback page
  // Add other static assets you want to pre-cache
];

self.addEventListener("install", (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell, content, and offline page');
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.error('[Service Worker] Cache addAll failed:', error);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Cache hit - return response
        if (cachedResponse) {
          return cachedResponse;
        }

        // Not in cache - try network
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response for GET requests
            if (
              event.request.method === 'GET' &&
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === 'basic' // Only cache basic responses (same-origin)
            ) {
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              const responseToCache = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }
        );
      })
      .catch((error) => {
        console.error('[Service Worker] Fetch failed for:', event.request.url, error);
        // If the request is a navigation request, show the offline fallback page.
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        // For other types of failed requests (e.g., images, API calls),
        // the browser's default error handling will take over.
        // Returning offline.html for these might not be appropriate.
        // If you want to return offline.html for ALL failed fetches, remove the if condition:
        // return caches.match('/offline.html');
        // For now, we only show it for navigation.
        return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim()) // Ensure new service worker takes control immediately
  );
});
