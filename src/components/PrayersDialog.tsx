
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookText } from 'lucide-react';

interface PrayersDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const actOfContrition = {
  title: "Act of Contrition",
  text: [
    "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell; but most of all because they offend Thee, my God, Who art all-good and deserving of all my love.",
    "I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life.",
    "Amen."
  ]
};

export default function PrayersDialog({ isOpen, onOpenChange }: PrayersDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <BookText className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            Prayers
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            The Act of Contrition to aid your reflection.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 mt-4 relative overflow-hidden">
          <ScrollArea className="absolute inset-0 p-2">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{actOfContrition.title}</h3>
                {actOfContrition.text.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-3 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
              {/* Future prayers can be added here as new sections */}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
