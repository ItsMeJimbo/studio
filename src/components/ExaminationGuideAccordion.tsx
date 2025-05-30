
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Data for examination sections
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
      "Have I been neglectful in my duties towards my spouse, such as providing emotional support or fulfilling marital obligations with charity?",
      "Have I failed to educate myself on important moral or social teachings of the Church relevant to my state in life?",
      "Have I been imprudent in managing household finances, leading to unnecessary stress or hardship for my family?",
      "Have I failed to correct my children with patience and love, or have I been overly harsh or permissive?",
      "Have I been a poor witness to the faith in my workplace or community through my actions or inaction?",
      "Have I shirked responsibilities that were reasonably expected of me in my professional or community roles?",
      "Have I failed to vote or participate in civic life according to a well-formed conscience?",
      "Have I exploited or taken unfair advantage of others in my professional or personal dealings?",
    ],
  },
];

export function ExaminationGuideAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3 pb-4 px-1">
      {examinationSections.map((section, index) => (
        <AccordionItem value={`item-${index}`} key={index} className="border rounded-md shadow-sm bg-card">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline text-base">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {examinationSections[index].questions.map((question, qIndex) => (
                <li key={qIndex} className="flex items-start justify-between gap-2 py-1">
                  <span className="flex-grow break-words">{question}</span>
                  {/* "Add to list" button removed for this page-based version */}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
