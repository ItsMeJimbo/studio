
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

const prayers = [
  {
    title: "Act of Contrition",
    text: [
      "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell; but most of all because they offend Thee, my God, Who art all-good and deserving of all my love.",
      "I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life.",
      "Amen."
    ]
  },
  {
    title: "Our Father (The Lord's Prayer)",
    text: [
      "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven.",
      "Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.",
      "Amen."
    ]
  },
  {
    title: "Hail Mary",
    text: [
      "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.",
      "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death.",
      "Amen."
    ]
  },
  {
    title: "Glory Be (Doxology)",
    text: [
      "Glory be to the Father, and to the Son, and to the Holy Spirit,",
      "as it was in the beginning, is now, and ever shall be, world without end.",
      "Amen."
    ]
  }
];

export default function PrayersDialog({ isOpen, onOpenChange }: PrayersDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <BookText className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            Common Prayers
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            A collection of prayers to aid your reflection and spiritual practice.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 mt-4 relative overflow-hidden">
          <ScrollArea className="absolute inset-0 p-2">
            <div className="space-y-8"> {/* Increased space between prayer sections */}
              {prayers.map((prayer, prayerIndex) => (
                <section key={prayerIndex}>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{prayer.title}</h3>
                  {prayer.text.map((paragraph, paraIndex) => (
                    <p key={paraIndex} className="text-muted-foreground mb-3 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
