
"use client";

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { BookText, Search, Frown } from 'lucide-react';

interface Prayer {
  title: string;
  text: string[];
  keywords?: string[];
}

interface PrayersDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const allPrayers: Prayer[] = [
  {
    title: "Act of Contrition",
    text: [
      "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell; but most of all because they offend Thee, my God, Who art all-good and deserving of all my love.",
      "I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life.",
      "Amen."
    ],
    keywords: ["sorrow", "forgiveness", "amend life", "penance"]
  },
  {
    title: "Our Father (The Lord's Prayer)",
    text: [
      "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven.",
      "Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.",
      "Amen."
    ],
    keywords: ["Lord's Prayer", "forgive trespasses", "daily bread", "kingdom come"]
  },
  {
    title: "Hail Mary",
    text: [
      "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.",
      "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death.",
      "Amen."
    ],
    keywords: ["Ave Maria", "Mother of God", "blessed fruit"]
  },
  {
    title: "Glory Be (Doxology)",
    text: [
      "Glory be to the Father, and to the Son, and to the Holy Spirit,",
      "as it was in the beginning, is now, and ever shall be, world without end.",
      "Amen."
    ],
    keywords: ["Trinity", "praise", "eternal"]
  },
  {
    title: "Nicene Creed",
    text: [
      "I believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible.",
      "I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through him all things were made. For us men and for our salvation he came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man.",
      "For our sake he was crucified under Pontius Pilate, he suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead and his kingdom will have no end.",
      "I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets.",
      "I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen."
    ],
    keywords: ["faith", "Trinity", "Jesus Christ", "Holy Spirit", "Church", "resurrection", "credo"]
  },
  {
    title: "Hail Holy Queen (Salve Regina)",
    text: [
      "Hail, holy Queen, Mother of Mercy, hail, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this vale of tears.",
      "Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus.",
      "O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
    ],
    keywords: ["Mary", "Mother of Mercy", "Advocate", "Salve Regina"]
  },
  {
    title: "Prayer to St. Michael the Archangel",
    text: [
      "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil; May God rebuke him, we humbly pray; And do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all evil spirits who wander through the world seeking the ruin of souls.",
      "Amen."
    ],
    keywords: ["St. Michael", "Archangel", "protection", "devil", "battle", "evil spirits"]
  }
];

export default function PrayersDialog({ isOpen, onOpenChange }: PrayersDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrayers = useMemo(() => {
    if (!searchTerm.trim()) {
      return allPrayers;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allPrayers.filter(prayer =>
      prayer.title.toLowerCase().includes(lowerSearchTerm) ||
      prayer.text.join(' ').toLowerCase().includes(lowerSearchTerm) ||
      (prayer.keywords && prayer.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm)))
    );
  }, [searchTerm]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <BookText className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            Common Prayers
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            A collection of prayers to aid your reflection and spiritual practice. You can search by title, content, or keyword.
          </DialogDescription>
        </DialogHeader>

        <div className="relative my-4 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search prayers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-1 relative overflow-hidden"> {/* This div will handle the flex sizing */}
          <ScrollArea className="absolute inset-0 p-1"> {/* ScrollArea fills the parent */}
            {filteredPrayers.length > 0 ? (
              <div className="space-y-8 pb-4 pr-2">
                {filteredPrayers.map((prayer, prayerIndex) => (
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
            ) : (
               <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                  <Frown className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">No prayers found</p>
                  <p className="text-sm">Try a different search term.</p>
                </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
