// Incrementing CACHE_NAME version
const CACHE_NAME = "confessease-v1.2"; // Updated version
const urlsToCache = [
  "/",
  // Next.js specific paths are usually handled by build output,
  // but for a basic setup, index.html (or equivalent root) is common.
  // For Next.js, '/' itself implies the main page.
  "/manifest.json",
  "/offline.html", // Offline fallback page
  "/about.html",   // Added about page
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable-512x512.png"
  // Add other critical static assets here if not automatically handled by Next.js build/caching
  // e.g., "/styles/globals.css", "/_next/static/css/..." (though these are usually versioned)
];

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install event in progress.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Opened cache:", CACHE_NAME);
      return cache.addAll(urlsToCache).then(() => {
        console.log("[Service Worker] All urlsToCache have been added to cache.");
      }).catch(error => {
        console.error("[Service Worker] Failed to cache one or more URLs:", error, urlsToCache);
        // Optionally, you could decide not to fail the install if some non-critical assets fail
        // For now, any failure in addAll will prevent the SW from installing.
      });
    }).catch(error => {
        console.error("[Service Worker] Cache open failed during install:", error);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // console.log('[Service Worker] Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // console.log('[Service Worker] Found in cache:', event.request.url);
        return cachedResponse;
      }
      // console.log('[Service Worker] Not in cache, fetching from network:', event.request.url);
      return fetch(event.request).then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = networkResponse.clone();

        if (event.request.method === 'GET') { // Only cache GET requests
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
              // console.log('[Service Worker] Cached new resource:', event.request.url);
            });
        }
        return networkResponse;
      });
    }).catch(error => {
      console.error('[Service Worker] Fetch failed or network error:', error);
      // If the request is a navigation request, serve the offline.html page.
      if (event.request.mode === 'navigate') {
        console.log('[Service Worker] Serving offline.html for navigation failure.');
        return caches.match('/offline.html');
      }
      // For other types of requests (e.g., images, API calls),
      // you might want to return a specific response or let the browser handle the error.
      // Currently, it will result in a browser's default network error page for non-navigation requests.
      // To return offline.html for ALL failed fetches:
      // return caches.match('/offline.html');
    })
  );
});


self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate event in progress.");
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      ).then(() => {
        console.log("[Service Worker] Old caches deleted.");
        return self.clients.claim(); // Ensure new SW takes control immediately
      })
    ).catch(error => {
        console.error("[Service Worker] Cache key processing failed during activate:", error);
    })
  );
});
