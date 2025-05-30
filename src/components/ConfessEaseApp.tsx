
"use client";

import type { Sin } from "@/types";
import { LOCAL_STORAGE_SINS_KEY } from "@/lib/constants";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SelectSinSection from "./SelectSinSection";
import MySinsSection from "./MySinsSection";
// ExaminationGuideDialog is removed
import PrayersDialog from "./PrayersDialog";
import { Church, Instagram, Twitter, Facebook, Youtube, BookOpenCheck, Heart, BookText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link'; // Added Link import

// Simple TikTok SVG icon
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
  </svg>
);


export default function ConfessEaseApp() {
  const [sins, setSins] = useLocalStorageState<Sin[]>(LOCAL_STORAGE_SINS_KEY, []);
  const { toast } = useToast();
  // State for ExaminationGuideDialog is removed
  const [isPrayersDialogOpen, setIsPrayersDialogOpen] = React.useState(false);

  const addSin = (sinDetails: Omit<Sin, 'id' | 'addedAt' | 'count'>) => {
    setSins((prevSins) => {
      const existingSinIndex = prevSins.findIndex(
        (s) => s.title === sinDetails.title && s.type === sinDetails.type
      );

      let newSinsList;
      let toastMessageTitle = "Sin Added";
      let toastMessageDescription = `"${sinDetails.title.substring(0,50)}..." has been added to your list.`;

      if (existingSinIndex !== -1 && sinDetails.type !== 'Custom') {
        newSinsList = prevSins.map((s, index) => {
          if (index === existingSinIndex) {
            const newCount = (s.count || 1) + 1;
            toastMessageTitle = "Sin Count Increased";
            toastMessageDescription = `Count for "${s.title.substring(0,50)}..." is now ${newCount}.`;
            return { ...s, count: newCount };
          }
          return s;
        });
      } else {
        const newSinEntry: Sin = {
          ...sinDetails,
          id: crypto.randomUUID(),
          addedAt: new Date().toISOString(),
          count: 1,
        };
        newSinsList = [...prevSins, newSinEntry];
      }
      
      toast({
        title: toastMessageTitle,
        description: toastMessageDescription,
      });
      return newSinsList;
    });
  };

  const removeSin = (sinId: string) => {
    let removedSinTitle = "The item";
    setSins((prevSins) => {
      const sinToRemove = prevSins.find(sin => sin.id === sinId);
      if (sinToRemove) {
        removedSinTitle = `"${sinToRemove.title.substring(0,50)}..."`;
      }
      return prevSins.filter((sin) => sin.id !== sinId)
    });
    toast({
      title: "Sin Removed",
      description: `${removedSinTitle} has been removed from your list.`,
    });
  };

  const clearSins = () => {
    setSins([]);
    toast({
      title: "Confession Finished",
      description: "Your list has been cleared. May you find peace.",
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Church className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Inner Peace
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Link href="/examination" passHref>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
              >
                <BookOpenCheck className="mr-2 h-5 w-5" />
                Examination of Conscience
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setIsPrayersDialogOpen(true)}
              className="w-full sm:w-auto"
            >
              <BookText className="mr-2 h-5 w-5" />
              Prayers
            </Button>
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-4 text-center sm:text-left max-w-xl mx-auto sm:mx-0">
          A peaceful space for personal reflection and spiritual preparation. All data is stored locally on your device.
        </p>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <SelectSinSection onAddSin={addSin} />
        <MySinsSection sins={sins} onClearSins={clearSins} onRemoveSin={removeSin} />
      </main>

      <footer className="text-center py-8 mt-12 text-xs sm:text-sm text-muted-foreground border-t">
        <div className="mb-8">
          <h3 className="text-base font-semibold text-foreground mb-3">Support Our Mission</h3>
          <a 
            href="https://www.patreon.com/c/MoroccanChristians" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Patreon" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors shadow-md"
          >
            <Heart className="mr-2 h-5 w-5" />
            Support on Patreon
          </a>
          <p className="text-xs mt-3 max-w-md mx-auto">
            Your generosity helps us continue developing and maintaining Inner Peace.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Follow Us</h3>
          <div className="flex justify-center items-center space-x-4 sm:space-x-5">
            <a href="https://instagram.com/moroccanchristians" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="https://x.com/moroccanmasihis" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100088868626501" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="https://tiktok.com/@moroccanchristians" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
              <TikTokIcon />
            </a>
            <a href="https://www.youtube.com/@moroccanchristians" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>
        <p className="mt-8">&copy; {new Date().getFullYear()} Inner Peace. 100% private and offline.</p>
      </footer>

      {/* ExaminationGuideDialog component and its toggle logic are removed */}
      <PrayersDialog
        isOpen={isPrayersDialogOpen}
        onOpenChange={setIsPrayersDialogOpen}
      />
    </div>
  );
}
