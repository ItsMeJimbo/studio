
"use client";

import type { Sin } from "@/types";
import { LOCAL_STORAGE_SINS_KEY } from "@/lib/constants";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SelectSinSection from "./SelectSinSection";
import MySinsSection from "./MySinsSection";
import { Church, Instagram, Twitter, Facebook, Youtube } from "lucide-react"; // Changed DollarSign to Youtube
import { useToast } from "@/hooks/use-toast";
import React from "react";

// Simple TikTok SVG icon
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
  </svg>
);


export default function ConfessEaseApp() {
  const [sins, setSins] = useLocalStorageState<Sin[]>(LOCAL_STORAGE_SINS_KEY, []);
  const { toast } = useToast();

  const addSin = (sinDetails: Omit<Sin, 'id' | 'addedAt'>) => {
    const newSin: Sin = {
      ...sinDetails,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString(),
    };
    setSins((prevSins) => [...prevSins, newSin]);
    toast({
      title: "Sin Added",
      description: `"${newSin.title}" has been added to your list.`,
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans"> {/* Use --font-geist-sans from layout */}
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-3">
          <Church className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            ConfessEase
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
          A peaceful space for personal reflection and spiritual preparation. All data is stored locally on your device.
        </p>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <SelectSinSection onAddSin={addSin} />
        <MySinsSection sins={sins} onClearSins={clearSins} />
      </main>

      <footer className="text-center py-8 mt-12 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. 100% private and offline.</p>
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Support Us</h3>
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
          <p className="text-xs mt-3 max-w-md mx-auto">
            Your support helps keep ConfessEase running and improving. Follow us on our social media!
          </p>
        </div>
      </footer>
    </div>
  );
}
