
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpenCheck } from 'lucide-react';
import { ExaminationGuideAccordion } from '@/components/ExaminationGuideAccordion';
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: 'Examination of Conscience - ConfessEase',
  description: 'A guide to help you reflect on your actions.',
};

export default function ExaminationPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <BookOpenCheck className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Examination of Conscience
          </h1>
          <Link href="/" passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Reflection
            </Button>
          </Link>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          A tool to help you reflect on your actions in light of Catholic teachings. Use this guide to prepare your heart. Click the (+) to add an item to your reflection list (it will appear on the main page).
        </p>
      </header>

      <main className="flex-grow">
        <ScrollArea className="h-[calc(100vh-250px)] sm:h-[calc(100vh-220px)] rounded-md border p-1 sm:p-4">
             <ExaminationGuideAccordion />
        </ScrollArea>
      </main>

      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. All data stored locally.</p>
      </footer>
    </div>
  );
}
