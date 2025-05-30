
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpenCheck } from 'lucide-react';

interface ExaminationGuideDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const examinationSections = [
  {
    title: "Relationship with God (The First Three Commandments)",
    questions: [
      "Have I loved God with my whole heart, mind, and strength? Or have I put other things (work, money, pleasure, self) before Him?",
      "Have I made time for daily prayer and scripture reading? Have I prayed with sincerity and devotion?",
      "Have I used God's name irreverently, or in vain? Have I cursed or spoken ill of sacred things?",
      "Have I honored the Lord's Day by attending Mass (if applicable and able) and by resting from unnecessary servile work?",
      "Have I doubted God's love, mercy, or providence? Have I despaired of His forgiveness?",
      "Have I engaged in superstitious practices, occultism, or sought spiritual power outside of God?",
      "Have I neglected my religious duties or education in the faith?",
    ],
  },
  {
    title: "Relationship with Others (Commandments 4-10)",
    questions: [
      "Have I honored and obeyed my parents and lawful superiors? Have I cared for them in their need?",
      "Have I shown respect and love to my family members, spouse, children?",
      "Have I been impatient, angry, or resentful towards others? Have I held grudges or refused to forgive?",
      "Have I physically harmed anyone or had thoughts of violence?",
      "Have I engaged in gossip, slander, or detraction, thereby harming another's reputation?",
      "Have I been untruthful, deceitful, or insincere in my words or actions? Have I lied or broken promises?",
      "Have I stolen or damaged another's property? Have I been unjust in business dealings or failed to pay debts?",
      "Have I been envious or jealous of others' possessions, talents, or good fortune?",
      "Have I entertained impure thoughts or desires about others? Have I looked at others with lust?",
      "Have I engaged in impure conversations, jokes, or viewed impure material?",
      "If married, have I been faithful to my spouse in thought and deed? Have I respected the sanctity of marriage?",
      "Have I coveted my neighbor's spouse or possessions?",
      "Have I failed to help those in need when I had the means to do so? Have I been selfish or uncharitable?",
    ],
  },
  {
    title: "Personal Integrity & Virtues",
    questions: [
      "Have I been prideful, arrogant, or sought undue recognition for myself?",
      "Have I been lazy or neglectful in my duties at work, school, or home?",
      "Have I indulged in excessive eating, drinking, or other sensual pleasures?",
      "Have I been vain or overly concerned with my physical appearance or material possessions?",
      "Have I failed to cultivate virtues like humility, patience, chastity, temperance, kindness, diligence?",
      "Have I given in to temptations against purity in thought, word, or deed, alone or with others?",
      "Have I been honest with myself about my faults and failings?",
      "Have I been a source of scandal to others by my words or actions?",
      "Have I cared for my physical and mental health as gifts from God?",
      "Have I used my time, talents, and resources responsibly and for the good of others?",
    ],
  },
  {
    title: "Duties of My State in Life",
    questions: [
      "(Consider your specific roles: e.g., as a spouse, parent, student, employee, citizen, etc.)",
      "Have I fulfilled the responsibilities of my state in life faithfully and to the best of my ability?",
      "If a parent, have I provided for the spiritual and physical well-being of my children? Have I set a good example?",
      "If a student, have I been diligent in my studies and respectful to my teachers?",
      "If an employee, have I been honest, hardworking, and fair to my employer and colleagues?",
      "If an employer, have I been just and fair to my employees?",
      "As a citizen, have I fulfilled my civic duties and worked for the common good?",
      "Have I shown proper respect for the environment and God's creation?",
    ],
  },
];

export default function ExaminationGuideDialog({ isOpen, onOpenChange }: ExaminationGuideDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <BookOpenCheck className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            Examination of Conscience
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            A tool to help you reflect on your actions in preparation for confession or personal spiritual growth.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow mt-4 pr-3">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {examinationSections.map((section, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border rounded-md shadow-sm bg-card">
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline text-base">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {section.questions.map((question, qIndex) => (
                      <li key={qIndex}>{question}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
