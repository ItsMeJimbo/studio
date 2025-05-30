
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, SettingsIcon, LanguagesIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Settings - Inner Peace',
  description: 'Configure app settings.',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <SettingsIcon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Settings
          </h1>
          <Link href="/" passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Reflection
            </Button>
          </Link>
        </div>
         <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          Manage your application preferences here.
        </p>
      </header>

      <main className="flex-grow space-y-6">
        <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-4">
                <LanguagesIcon className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Language</h2>
            </div>
            <p className="text-muted-foreground mb-2">
                Current language: English (US)
            </p>
            <p className="text-sm text-muted-foreground">
                Multilingual support (including Arabic, French, etc.) is planned for a future update.
                Implementing full language switching requires a significant setup for internationalization (i18n)
                and translation of all app content.
            </p>
             {/* Placeholder for language selection UI when implemented */}
            {/* <Button variant="outline" disabled className="mt-4">Change Language (Coming Soon)</Button> */}
        </section>

        {/* Add more settings sections here as needed */}
        {/* 
        <section className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-2">Theme</h2>
            <p className="text-muted-foreground">Theme settings (e.g., light/dark mode override) could go here.</p>
        </section>
        */}
      </main>

      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Inner Peace. All data stored locally.</p>
      </footer>
    </div>
  );
}
