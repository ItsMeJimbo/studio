
"use client"; // Keep this as ExaminationGuideAccordion uses client features like toast

import type { Metadata } from 'next'; // Metadata for server components, can be removed if not used
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpenCheck, HelpCircle } from 'lucide-react';
import { ExaminationGuideAccordion } from '@/components/ExaminationGuideAccordion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// export const metadata: Metadata = { // Metadata cannot be exported from client components
//   title: 'Examination of Conscience - ConfessEase',
//   description: 'A guide to help you reflect on your actions.',
// };

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
          This guide is designed to help you reflect on your actions in light of Catholic teachings. Use this tool to prepare your heart. Click the (+) icon next to an item to queue it for addition to your reflection list on the main page.
        </p>
      </header>

      <main className="flex-grow flex flex-col">
         <Alert className="mb-6 border-primary/50">
          <HelpCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="font-semibold text-primary">Using This Guide</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Expand the sections below to explore different areas of reflection. Items marked with a (+) can be added to your personal list on the main ConfessEase page for further consideration.
          </AlertDescription>
        </Alert>
        <ScrollArea className="flex-1 rounded-md border p-1 sm:p-4 bg-background">
             <ExaminationGuideAccordion />
        </ScrollArea>
      </main>

      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. All data stored locally.</p>
        <p className="text-xs mt-1">Examination content adapted from The Fathers of Mercy (www.fathersofmercy.com).</p>
      </footer>
    </div>
  );
}
