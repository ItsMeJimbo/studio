
// Service Worker for ConfessEase - Caching and Push Notifications

const CACHE_NAME = 'confessease-v1.3'; // Incremented version
const urlsToCache = [
  '/',
  '/examination',
  '/prayers',
  '/resources',
  '/settings',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png', // Main app icons
  '/icons/icon-512x512.png',
  // Note: User-provided external icon URLs (from iconarchive) will be cached by the browser's
  // regular HTTP cache if the fetch handler passes them through, or by a runtime caching strategy if implemented.
  // Pre-caching external URLs directly in service worker install can be risky if they become unavailable.

  // Add paths to your main JS/CSS bundles if you know them and they are static.
  // Next.js often generates hashed filenames, so this might need a more dynamic approach
  // or reliance on runtime caching for those. For a PWA shell, caching core pages is key.
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache: ', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('All specified URLs have been cached.');
        return self.skipWaiting(); // Force the waiting service worker to become the active service worker.
      })
      .catch(error => {
        console.error('Failed to cache URLs during install:', error);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip caching for Firebase and Google APIs to ensure they are always fresh
  if (event.request.url.includes('firebase') || event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
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
          }
        );
      })
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Keep the current cache
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('Service worker activated and old caches cleaned.');
        return self.clients.claim(); // Become the active service worker for all clients.
    })
  );
});


// --- Firebase Cloud Messaging (FCM) Push Notification Handling ---
// This section requires firebase-app.js and firebase-messaging.js to be imported.
// However, in a service worker, you typically use importScripts().

// IMPORTANT: You MUST create a firebase-messaging-sw.js file in your public directory
// that looks something like this:
/*
  importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

  // Initialize the Firebase app in the service worker
  // with the same Firebase config object as used in the web app.
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional
  };

  firebase.initializeApp(firebaseConfig);

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title || 'New Message';
    const notificationOptions = {
      body: payload.notification.body || 'You have a new message.',
      icon: payload.notification.icon || '/icons/icon-192x192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
*/

// The above firebase-messaging-sw.js content is a separate file.
// This service-worker.js file here is primarily for caching.
// If you want to combine them, you would import firebase scripts here
// and include the FCM setup. For now, assuming firebase-messaging-sw.js
// is separate and correctly set up in your /public folder and registered
// by Firebase itself when you initialize FCM in your app.

// If you are NOT using a separate firebase-messaging-sw.js and want this
// service worker to handle FCM background messages, you would uncomment
// and configure the importScripts and FCM setup here.
// For simplicity with the current project structure, we're assuming
// Firebase will handle its own `firebase-messaging-sw.js`.

console.log('ConfessEase Service Worker V1.3 Loaded');
