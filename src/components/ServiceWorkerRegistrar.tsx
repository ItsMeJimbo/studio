
"use client";

import React, { useEffect } from 'react';

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => console.log('ConfessEase Service Worker Registered. Scope:', registration.scope))
        .catch(error => console.error('ConfessEase SW registration failed:', error));
    }
  }, []);

  return null; // This component doesn't render anything visible
}
