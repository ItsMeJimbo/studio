
"use client";

import type { Sin } from "@/types";
import { LOCAL_STORAGE_SINS_KEY } from "@/lib/constants";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import SelectSinSection from "./SelectSinSection";
import MySinsSection from "./MySinsSection";
import { Church } from "lucide-react"; // Changed from Peace to Church
import { useToast } from "@/hooks/use-toast";
import React from "react";

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
          <Church className="h-10 w-10 sm:h-12 sm:w-12 text-primary" /> {/* Changed from Peace to Church */}
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
      </footer>
    </div>
  );
}
