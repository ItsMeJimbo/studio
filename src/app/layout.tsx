import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ConfessEase - Personal Reflection',
  description: 'A private app for Catholic confession preparation and reflection.',
  // manifest: '/manifest.json', // Next.js handles manifest linking automatically via the file presence in /public
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        
        {/* PWA primary color */}
        <meta name="theme-color" content="#85c7f9" />
        
        {/* Link to manifest file */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple PWA specific tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" /> 
        <meta name="apple-mobile-web-app-title" content="ConfessEase" />
        
        {/* Apple Touch Icons (using placeholders, replace with your actual icons) */}
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" data-ai-hint="app icon" />
        {/* You can add more sizes if needed, e.g.:
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-icon-167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180.png" /> 
        */}

        {/* Generic icon (optional, as manifest icons are primary) */}
        <link rel="icon" href="/icons/favicon.ico" data-ai-hint="app logo" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
