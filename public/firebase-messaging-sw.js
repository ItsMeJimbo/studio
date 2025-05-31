
// firebase-messaging-sw.js

// Scripts for Firebase products are imported using the window.firebase namespace.
// Make sure you have included the Firebase JS SDKs in your app.
// For example, if you are using a bundler:
// import { initializeApp } from 'firebase/app';
// import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

// If you are using the CDN:
// firebase.initializeApp({ /* ... */ });

// IMPORTANT: This service worker must be named firebase-messaging-sw.js and
// be in the public root of your project.

// Scripts for Firebase products are imported using the window.firebase namespace.
// Make sure you have included the Firebase JS SDKs in your app.

// For ES modules, you would use:
// import { initializeApp } from "firebase/app";
// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Since this file is served directly and not part of the Next.js build,
// we assume Firebase SDKs (especially app and messaging/sw) are available globally
// or are imported using a mechanism compatible with service workers (like importScripts).
// For a simple setup, we'll try to use dynamic imports if available in this context,
// or you might need to use importScripts to load the Firebase SDKs.

// A more common and robust way in modern setups is to have this file
// be processed by a bundler or use importScripts if you're managing SDKs manually.

// Placeholder for Firebase configuration (REPLACE with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

// Try to dynamically import Firebase modules. This might not work in all SW environments without bundling.
// If this fails, you might need to use `importScripts` to load the Firebase SDKs.
try {
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  if (typeof firebase.messaging === 'function') {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);

      // Customize notification here
      const notificationTitle = payload.notification?.title || 'New Message';
      const notificationOptions = {
        body: payload.notification?.body || 'You have a new message.',
        icon: payload.notification?.icon || '/icons/icon-192x192.png' // Default icon
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
    console.log('[firebase-messaging-sw.js] Background message handler set up.');
  } else {
    console.error('[firebase-messaging-sw.js] Firebase messaging is not available.');
  }
} catch (e) {
  console.error('[firebase-messaging-sw.js] Error loading Firebase SDKs or setting up background message handler:', e);
  console.error('[firebase-messaging-sw.js] Make sure Firebase SDKs are correctly loaded, e.g., via importScripts if dynamic import fails.');
}
