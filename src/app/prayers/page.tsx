
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { BookText, Search, Frown, Info } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCurrentLiturgicalSeason, type LiturgicalSeasonInfo } from '@/lib/liturgicalYear';


interface Prayer {
  title: string;
  text: string[];
  keywords?: string[];
  tags?: string[]; // e.g., ['contrition', 'marian', 'daily']
}

const allPrayers: Prayer[] = [
  {
    title: "Act of Contrition",
    text: [
      "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because I dread the loss of Heaven and the pains of Hell; but most of all because they offend Thee, my God, Who art all-good and deserving of all my love.",
      "I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life.",
      "Amen."
    ],
    keywords: ["sorrow", "forgiveness", "amend life", "penance"],
    tags: ["contrition", "essential", "lent", "anytime"]
  },
  {
    title: "Our Father (The Lord's Prayer)",
    text: [
      "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven.",
      "Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.",
      "Amen."
    ],
    keywords: ["Lord's Prayer", "forgive trespasses", "daily bread", "kingdom come"],
    tags: ["essential", "daily", "anytime"]
  },
  {
    title: "Hail Mary",
    text: [
      "Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus.",
      "Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death.",
      "Amen."
    ],
    keywords: ["Ave Maria", "Mother of God", "blessed fruit"],
    tags: ["marian", "daily", "anytime", "advent", "christmas"]
  },
  {
    title: "Glory Be (Doxology)",
    text: [
      "Glory be to the Father, and to the Son, and to the Holy Spirit,",
      "as it was in the beginning, is now, and ever shall be, world without end.",
      "Amen."
    ],
    keywords: ["Trinity", "praise", "eternal"],
    tags: ["praise", "daily", "anytime"]
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
    keywords: ["faith", "Trinity", "Jesus Christ", "Holy Spirit", "Church", "resurrection", "credo"],
    tags: ["faith", "essential", "sunday", "easter"]
  },
  {
    title: "Hail Holy Queen (Salve Regina)",
    text: [
      "Hail, holy Queen, Mother of Mercy, hail, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this vale of tears.",
      "Turn then, most gracious Advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus.",
      "O clement, O loving, O sweet Virgin Mary! Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
    ],
    keywords: ["Mary", "Mother of Mercy", "Advocate", "Salve Regina"],
    tags: ["marian", "anytime", "advent"]
  },
  {
    title: "Prayer to St. Michael the Archangel",
    text: [
      "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil; May God rebuke him, we humbly pray; And do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all evil spirits who wander through the world seeking the ruin of souls.",
      "Amen."
    ],
    keywords: ["St. Michael", "Archangel", "protection", "devil", "battle", "evil spirits"],
    tags: ["protection", "spiritual warfare", "anytime"]
  },
  {
    title: "Come, Holy Spirit",
    text: [
        "Come, Holy Spirit, fill the hearts of Your faithful and kindle in them the fire of Your love.",
        "V. Send forth Your Spirit, and they shall be created.",
        "R. And You shall renew the face of the earth.",
        "Let us pray. O God, Who by the light of the Holy Spirit, did instruct the hearts of the faithful, grant that by the same Holy Spirit we may be truly wise and ever rejoice in His consolations. Through Christ Our Lord. Amen."
    ],
    keywords: ["Holy Spirit", "Veni Sancte Spiritus", "guidance", "wisdom"],
    tags: ["Holy Spirit", "pentecost", "easter", "guidance", "anytime"]
  }
];


export default function PrayersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSeasonInfo, setCurrentSeasonInfo] = useState<LiturgicalSeasonInfo | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentSeasonInfo(getCurrentLiturgicalSeason());
    }
  }, []);

  const getSeasonalPrayerHint = (): { title: string; prayers: string[] } | null => {
    if (!currentSeasonInfo) return null;
    switch (currentSeasonInfo.name) {
      case "Advent":
        return { title: "Prayers for Advent", prayers: ["Hail Mary", "Hail Holy Queen"] };
      case "Christmas Time":
        return { title: "Prayers for Christmas", prayers: ["Hail Mary", "Glory Be"] };
      case "Lent":
        return { title: "Prayers for Lent", prayers: ["Act of Contrition", "Our Father"] };
      case "Easter Time":
        return { title: "Prayers for Easter", prayers: ["Nicene Creed", "Come, Holy Spirit", "Glory Be"] };
      case "Pentecost Sunday":
        return { title: "Prayers for Pentecost", prayers: ["Come, Holy Spirit", "Glory Be"] };
      case "Ordinary Time":
        return { title: "Prayers for Daily Life", prayers: ["Our Father", "Hail Mary", "Glory Be", "Act of Contrition"] };
      default:
        return { title: "General Prayers", prayers: ["Our Father", "Hail Mary"] };
    }
  };
  const seasonalHint = getSeasonalPrayerHint();


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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col font-sans">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3 text-center sm:text-left">
            <BookText className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            Common Prayers
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center sm:text-left">
          A collection of prayers to aid your reflection and spiritual practice. You can search by title, content, or keyword.
        </p>
         <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search prayers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      
      {currentSeasonInfo && seasonalHint && (
        <Alert className="mb-6 border-primary/30 bg-primary/5">
          <Info className="h-5 w-5 text-primary" />
          <AlertTitle className="font-semibold text-primary">
            {seasonalHint.title} ({currentSeasonInfo.name})
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Consider focusing on prayers like: {seasonalHint.prayers.join(', ')}.
          </AlertDescription>
        </Alert>
      )}

      <main className="flex-grow">
        <ScrollArea className="h-[calc(100vh-360px)] sm:h-[calc(100vh-340px)] rounded-md border p-1 sm:p-4">
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
      </main>

      <footer className="text-center py-6 mt-8 text-xs sm:text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ConfessEase. All data stored locally.</p>
      </footer>
    </div>
  );
}
