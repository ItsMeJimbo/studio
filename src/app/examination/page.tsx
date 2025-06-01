
"use client";

import { BookOpenCheck, HelpCircle, Info } from 'lucide-react';
import { ExaminationGuideAccordion } from '@/components/ExaminationGuideAccordion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useState, useEffect } from 'react';
import { getCurrentLiturgicalSeason, type LiturgicalSeasonInfo } from '@/lib/liturgicalYear';

export default function ExaminationPage() {
  const [currentSeasonInfo, setCurrentSeasonInfo] = useState<LiturgicalSeasonInfo | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentSeasonInfo(getCurrentLiturgicalSeason());
    }
  }, []);

  const getSeasonalReflectionHint = (): string | null => {
    if (!currentSeasonInfo) return null;
    switch (currentSeasonInfo.name) {
      case "Advent":
        return "During Advent, reflect on watchfulness, preparation for Christ's coming, and areas where you can grow in hope and charity.";
      case "Christmas Time":
        return "In Christmas Time, consider your gratitude for God's gift of His Son, and how you share Christ's light and joy with others.";
      case "Lent":
        return "Lent is a key time for examining areas of sin. Focus on penance, prayer, fasting, and almsgiving. Consider temptations you struggle with and areas for conversion.";
      case "Easter Time":
        return "During Easter, reflect on the new life Christ offers, areas where you need to embrace His victory over sin, and how you live out your baptismal promises.";
      case "Ordinary Time":
        return "In Ordinary Time, examine your daily faithfulness to God's commandments, your growth in virtue, and your witness to Christ in everyday life.";
      case "Pentecost Sunday":
        return "On Pentecost, reflect on your openness to the Holy Spirit and the gifts you've received to build up the Church and serve others.";
      default:
        return "Consider how your actions align with God's will and the teachings of the Church in this current season.";
    }
  };

  const seasonalHint = getSeasonalReflectionHint();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <BookOpenCheck className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Examination of Conscience
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          This guide is designed to help you reflect on your actions in light of Catholic teachings. Use this tool to prepare your heart. Click the (+) icon next to an item to queue it for addition to your reflection list on the main page.
        </p>
      </header>

      <main className="flex-grow flex flex-col">
         {currentSeasonInfo && seasonalHint && (
          <Alert className="mb-6 border-primary/30 bg-primary/5">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary">
              Reflection for {currentSeasonInfo.name}
            </AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {seasonalHint}
            </AlertDescription>
          </Alert>
        )}
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
