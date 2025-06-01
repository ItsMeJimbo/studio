
// REMOVED "use client"; -- RootLayout is now a Server Component

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/context/AuthContext';
import React from 'react'; // Removed useEffect import from here
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar'; // Import the new component
import BottomNavigationBar from '@/components/BottomNavigationBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ConfessEase - Catholic Reflection Aid',
  description: 'A private app for Catholic confession preparation and reflection.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5DC' }, // Updated to match new theme bg
    { media: '(prefers-color-scheme: dark)', color: '#2F2B23' }, // Updated to match new theme bg
  ],
  colorScheme: 'light dark',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  width: 'device-width',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect for service worker registration is now in ServiceWorkerRegistrar component

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        {/* Viewport meta is handled by Next.js 'viewport' export above */}
        {/* theme-color meta is handled by Next.js 'viewport' export above */}
        {/* manifest link is handled by Next.js 'metadata' export above */}
        {/* favicons are handled by Next.js 'metadata' export above */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16 sm:pb-0`} suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-grow">{children}</main>
              <BottomNavigationBar />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
        <ServiceWorkerRegistrar /> {/* Add the client component here */}
      </body>
    </html>
  );
}
