
// v1.3 - Added more precaching for app-like experience
const CACHE_NAME = 'confessease-v1.3';
const urlsToCache = [
  '/',
  '/examination',
  '/prayers',
  '/resources',
  '/settings',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png', // Common PWA icon sizes
  '/icons/icon-512x512.png',
  // Note: User-provided icons from iconarchive.com will be cached by runtime caching if fetched.
  // Add other critical static assets here, e.g., main JS/CSS bundles if not automatically handled
  // by Next.js service worker strategies (if using one - this is a manual SW).
  // For a typical Next.js app, the built JS/CSS files would have hashed names.
  // This basic service worker is primarily for static assets in /public and defined routes.
];

// Install a service worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching offline page and assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All assets pre-cached successfully');
        return self.skipWaiting(); // Activate the new SW immediately
      })
      .catch(error => {
        console.error('[Service Worker] Pre-caching failed:', error);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    // Don't cache non-GET requests
    return;
  }

  // For navigation requests, try network first, then cache (NetworkFallingToCache)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            // If network fails or returns an error, try to serve from cache
            return caches.match(event.request)
              .then(cachedResponse => {
                return cachedResponse || caches.match('/'); // Fallback to home page or a generic offline page
              });
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        })
        .catch(() => {
          // Network request failed, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/'); // Fallback to home page or a generic offline page
            });
        })
    );
    return;
  }

  // For other requests (CSS, JS, images), use CacheFirst strategy
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Cache hit - return response
        if (cachedResponse) {
          return cachedResponse;
        }

        // Not in cache - fetch from network, cache, and return
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 /*|| networkResponse.type !== 'basic' - allow opaque for CDN assets */) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        ).catch(error => {
          console.error('[Service Worker] Fetch failed for:', event.request.url, error);
          // Optionally, return a placeholder for failed assets like images
        });
      })
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activated successfully and old caches cleared');
      return self.clients.claim(); // Take control of all open clients
    })
  );
});

// --- Push Notification Handling ---
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data ? event.data.text() : 'No data'}"`);

  const title = 'ConfessEase Reminder';
  const options = {
    body: event.data ? event.data.text() : 'Time for reflection!',
    icon: '/icons/icon-192x192.png', // Path to an icon for the notification
    badge: '/icons/badge-72x72.png' // Path to a badge icon (optional)
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // Open the app when notification is clicked
  );
});
