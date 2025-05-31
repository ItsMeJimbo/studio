
// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

// This file is intended to be imported by client-side Next.js components.
// For the service worker (firebase-messaging-sw.js), the config is typically duplicated
// or loaded via importScripts if it were in a separate, servable JS file.
// Given the project structure and to keep it simple for this prototype,
// if firebase-messaging-sw.js needs this, it will have it duplicated.

// We are not initializing the app here directly to avoid issues with Next.js SSR.
// Initialization will happen in the component where Firebase is used.
export { firebaseConfig };
