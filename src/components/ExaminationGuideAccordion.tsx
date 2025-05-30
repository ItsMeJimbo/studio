
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from "lucide-react";
import { TEMP_EXAMINATION_SINS_KEY } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

interface ExaminationItem {
  id: string;
  text: string;
  isAddable?: boolean; // True if it's a question/sin that can be added to the list
}

interface ExaminationSubSection {
  title: string;
  items: ExaminationItem[];
  description?: string;
}
interface ExaminationSection {
  id: string;
  title: string;
  mainDescription?: string; // Optional description for the whole section
  subSections?: ExaminationSubSection[]; // For nested structure like Capital Sins
  questions?: ExaminationItem[]; // For direct list of questions
}


const newExaminationSections: ExaminationSection[] = [
  {
    id: "prayer-before",
    title: "Prayer Before Confession",
    mainDescription: "Come, Holy Spirit, enlighten my mind that I may clearly know my sins. Move my heart that I may be sincerely sorry for them, honestly confess them and firmly resolve to amend my life. Spirit of Wisdom, grant me to see the malice of sin and my ingratitude toward You, the all-loving God. Spirit of Fortitude, help me to make whatever sacrifice is needed to avoid sin in the future. Amen.",
  },
  {
    id: "way-of-darkness",
    title: "The Way of Darkness (Sin)",
    subSections: [
      {
        title: "The Seven Capital Sins",
        items: [
          { id: "pride", text: "Pride: Preoccupation with one's own excellence or misery.", isAddable: true },
          { id: "avarice", text: "Avarice/Greed: Disordered desire for possessions; setting our hearts on material things: selfishness.", isAddable: true },
          { id: "lust", text: "Lust: Disordered desire for or inordinate enjoyment of sexual pleasure.", isAddable: true },
          { id: "anger", text: "Anger: Uncontrolled emotion which results in desire for revenge; holding resentment.", isAddable: true },
          { id: "gluttony", text: "Gluttony: The inordinate use of created goods- especially food and drink- that put the pleasures of the body over the goods of the soul.", isAddable: true },
          { id: "envy", text: "Envy: Sadness at the good of another.", isAddable: true },
          { id: "sloth", text: "Sloth: Bodily or Spiritual laziness or neglect.", isAddable: true },
        ]
      },
      {
        title: "Sins Against the Theological Virtues",
        items: [
          { id: "presumption", text: "Presumption on God's Mercy.", isAddable: true },
          { id: "despair", text: "Despair of God's Mercy.", isAddable: true },
          { id: "resist-truth", text: "Resisting and/or Attacking the known truth.", isAddable: true },
          { id: "envy-spiritual", text: "Envy at another's spiritual good.", isAddable: true },
          { id: "obstinacy", text: "Obstinacy in sin.", isAddable: true },
          { id: "final-impenitence", text: "Final impenitence (refusal to repent).", isAddable: true },
        ]
      },
      {
        title: "Sins Crying to Heaven",
        items: [
          { id: "willful-murder", text: "Willful murder.", isAddable: true },
          { id: "sodomy", text: "Sodomy.", isAddable: true },
          { id: "oppression-poor", text: "Oppression of the poor.", isAddable: true },
          { id: "defrauding-laborers", text: "Defrauding laborers of their wages.", isAddable: true },
        ]
      },
      {
        title: "Being an Accessory to Another's Sin",
        items: [
          { id: "accessory-counsel", text: "By counsel.", isAddable: true },
          { id: "accessory-command", text: "By command.", isAddable: true },
          { id: "accessory-consent", text: "By consent.", isAddable: true },
          { id: "accessory-provocation", text: "By provocation.", isAddable: true },
          { id: "accessory-praise", text: "By praise or flattery.", isAddable: true },
          { id: "accessory-concealment", text: "By concealment.", isAddable: true },
          { id: "accessory-partaking", text: "By partaking.", isAddable: true },
          { id: "accessory-silence", text: "By silence.", isAddable: true },
          { id: "accessory-defense", text: "By defense of the sinful action.", isAddable: true },
        ]
      },
      {
        title: "The Works of the Flesh (Gal. 5:19-21)",
        items: [
          { id: "flesh-immorality", text: "Immorality", isAddable: true },
          { id: "flesh-impurity", text: "Impurity", isAddable: true },
          { id: "flesh-licentiousness", text: "Licentiousness", isAddable: true },
          { id: "flesh-idolatry", text: "Idolatry", isAddable: true },
          { id: "flesh-sorcery", text: "Sorcery", isAddable: true },
          { id: "flesh-hatreds", text: "Hatreds", isAddable: true },
          { id: "flesh-rivalry", text: "Rivalry", isAddable: true },
          { id: "flesh-jealousy", text: "Jealousy", isAddable: true },
          { id: "flesh-fury", text: "Outbursts of fury", isAddable: true },
          { id: "flesh-selfishness", text: "Acts of selfishness", isAddable: true },
          { id: "flesh-dissensions", text: "Dissensions", isAddable: true },
          { id: "flesh-factions", text: "Factions", isAddable: true },
          { id: "flesh-envy-occasions", text: "Occasions of envy", isAddable: true },
          { id: "flesh-drinking", text: "Drinking bouts", isAddable: true },
          { id: "flesh-orgies", text: "Orgies", isAddable: true },
        ],
        description: "Consider: Immorality, impurity, licentiousness, idolatry, sorcery, hatreds, rivalry, jealousy, outbursts of fury, acts of selfishness, dissensions, factions, occasions of envy, drinking bouts, orgies."
      }
    ]
  },
  {
    id: "ten-commandments-intro",
    title: "The Ten Commandments",
    mainDescription: "Reflect on how you have lived by God's laws.",
    subSections: [
      { title: "I. I am the Lord Thy God. Thou shall not have strange gods before Me.", items: [] },
      { title: "II. Thou shall not take the Name of the Lord thy God in vain.", items: [] },
      { title: "III. Remember to keep holy the Lord's Day.", items: [] },
      { title: "IV. Honor thy father and thy mother.", items: [] },
      { title: "V. Thou shall not kill.", items: [] },
      { title: "VI. Thou shall not commit adultery.", items: [] },
      { title: "VII. Thou shall not steal.", items: [] },
      { title: "VIII. Thou shall not bear false witness.", items: [] },
      { title: "IX. Thou shall not covet thy neighbor's wife.", items: [] },
      { title: "X. Thou shall not covet thy neighbor's goods.", items: [] },
    ]
  },
  {
    id: "two-greatest-commandments",
    title: "The Two Greatest Commandments",
    subSections: [
        { title: "I. You shall love the Lord your God with your whole heart, with your whole soul and with all your mind.", items: []},
        { title: "II. You shall love your neighbor as yourself.", items: []},
    ]
  },
  {
    id: "precepts-of-church",
    title: "The Precepts of the Church",
    subSections: [
        { title: "You shall attend Mass on Sundays and on Holy Days of Obligation and rest from servile labor.", items: []},
        { title: "You shall confess your sins at least once a year.", items: []},
        { title: "You shall receive the Sacrament of the Eucharist at least during the Easter Season.", items: []},
        { title: "You shall observe the days of fasting and abstinence established by the Church.", items: []},
        { title: "You shall help to provide for the needs of the Church.", items: []},
    ]
  },
  {
    id: "examination-questions",
    title: "Detailed Examination of Conscience (Questions)",
    questions: [
      // These questions are based on the Ten Commandments and general moral theology
      { id: "q1", text: "Did I deny or doubt God's existence?", isAddable: true },
      { id: "q2", text: "Did I refuse to believe God's revelation?", isAddable: true },
      { id: "q3", text: "Did I believe in (or use) horoscopes, fortune telling, good luck charms, tarot cards, Ouija boards or reincarnation?", isAddable: true },
      { id: "q4", text: "Did I deny that I was a Catholic?", isAddable: true },
      { id: "q5", text: "Did I abandon the Catholic Faith for any period of time?", isAddable: true },
      { id: "q6", text: "Did I despair of or presume on God's mercy?", isAddable: true },
      { id: "q7", text: "Did I neglect prayer for a long time? Did I fail to pray daily?", isAddable: true },
      { id: "q8", text: "Did I blaspheme God or take God's Name in vain, curse or break an oath or vow?", isAddable: true },
      { id: "q9", text: "Did I miss Mass on a Sunday or on a Holy Day of Obligation through my own fault?", isAddable: true },
      { id: "q10", text: "Am I always reverent in the presence of the Most Blessed Sacrament? Was I voluntarily inattentive at Mass?", isAddable: true },
      { id: "q11", text: "Did I arrive at Mass late through my own fault? Did I leave Mass early?", isAddable: true },
      { id: "q12", text: "Did I do unnecessary servile work on Sunday?", isAddable: true },
      { id: "q13", text: "Did I disobey or disrespect my parents or legitimate superiors?", isAddable: true },
      { id: "q14", text: "Did I neglect my duties to my husband, wife, children or parents?", isAddable: true },
      { id: "q15", text: "Did I fail to actively take an interest in the religious education and formation of my children?", isAddable: true },
      { id: "q16", text: "Have I failed to educate myself concerning the teachings of the Church?", isAddable: true },
      { id: "q17", text: "Did I give a full day's work in return for a full day's pay? Did I give a fair wage to my employee(s)?", isAddable: true },
      { id: "q18", text: "Did I give scandal by what I said or did, especially to the young?", isAddable: true },
      { id: "q19", text: "Did I contribute to anyone's abandoning of the Catholic Faith?", isAddable: true },
      { id: "q20", text: "Was I impatient, angry, envious, unkind, proud, jealous, revengeful, hateful toward others or lazy?", isAddable: true },
      { id: "q21", text: "Did I give bad example, abuse drugs, drink alcohol to excess, fight or quarrel?", isAddable: true },
      { id: "q22", text: "Did I physically injure or kill anyone?", isAddable: true },
      { id: "q23", text: "Have I had an abortion, or advised or supported an abortion?", isAddable: true },
      { id: "q24", text: "Did I participate in or approve of the grave evil known as \"mercy killing,\" euthanasia or doctor assisted suicide?", isAddable: true },
      { id: "q25", text: "Did I attempt suicide or physically harm myself?", isAddable: true },
      { id: "q26", text: "Did I willfully entertain impure thoughts and desires?", isAddable: true },
      { id: "q27", text: "Did I dress immodestly or provocatively?", isAddable: true },
      { id: "q28", text: "Did I use impure or suggestive words? Did I tell impure stories or listen to them?", isAddable: true },
      { id: "q29", text: "Did I deliberately look at impure television, internet, plays, pictures or movies?", isAddable: true },
      { id: "q30", text: "Did I deliberately read or send impure material?", isAddable: true },
      { id: "q31", text: "Did I perform impure acts by myself (masturbation) or with another (adultery, fornication or sodomy)?", isAddable: true },
      { id: "q32", text: "Did I marry or advise another to marry outside of the Church?", isAddable: true },
      { id: "q33", text: "Did I abuse my marriage rights? Was I unfaithful to my marriage vows?", isAddable: true },
      { id: "q34", text: "Have I kept company with someone else's spouse?", isAddable: true },
      { id: "q35", text: "Did I practice artificial birth control or was I or my spouse permanently sterilized (tubal ligation or vasectomy)?", isAddable: true },
      { id: "q36", text: "Did I steal, cheat, help or encourage others to steal, cheat, or keep stolen goods? Have I made restitution for stolen goods?", isAddable: true },
      { id: "q37", text: "Did I deliberately fail to fulfill my contracts or to pay my bills?", isAddable: true },
      { id: "q38", text: "Did I give or accept bribes?", isAddable: true },
      { id: "q39", text: "Did I rashly gamble or speculate or deprive my family of the necessities of life?", isAddable: true },
      { id: "q40", text: "Did I tell lies? Deliberately in order to deceive or injure others? (slander or calumny)", isAddable: true },
      { id: "q41", text: "Did I commit perjury?", isAddable: true },
      { id: "q42", text: "Did I vote in accordance with a properly informed conscience, in a way consistent with the teachings of the Church, in regard to the sanctity of marriage and of human life issues?", isAddable: true },
      { id: "q43", text: "Was I uncharitable in thought, word or deed? Did I gossip or reveal the faults or sins of others? (detraction)", isAddable: true },
      { id: "q44", text: "Did I fail to keep secrets that I should have kept?", isAddable: true },
      { id: "q45", text: "Did I eat meat knowingly on the Fridays during Lent or on Ash Wednesday? (Ages 14+)", isAddable: true },
      { id: "q46", text: "Did I fast as required on Ash Wednesday and Good Friday? (Ages 18-59)", isAddable: true },
      { id: "q47", text: "Did I fail to receive Holy Communion during the Easter Season? Did I fail to confess my sins at least once a year?", isAddable: true },
      { id: "q48", text: "Did I receive Holy Communion in the state of mortal sin?", isAddable: true },
      { id: "q49", text: "Did I receive Holy Communion without fasting for one hour or more from food and drink? (water and medicine are permitted)", isAddable: true },
      { id: "q50", text: "Did I make a bad Confession by deliberately not telling all the mortal sins I had committed?", isAddable: true },
      { id: "q51", text: "Did I fail to contribute to the support of the Church?", isAddable: true },
      { id: "q52", text: "Have I forgiven those who have hurt or harmed me or my loved ones?", isAddable: true },
    ]
  },
  {
    id: "way-of-light",
    title: "The Way of Light (Holiness)",
    mainDescription: "This section lists virtues and holy practices for reflection. These are not sins to be added to your list, but ideals to strive for and areas for growth.",
    subSections: [
      { title: "The Seven Capital Virtues", items: [
        { id: "wv-humility", text: "Humility: Acknowledgment of truth about God, oneself and others." },
        { id: "wv-generosity", text: "Generosity: Doing actions for the benefit of others; selflessness." },
        { id: "wv-chastity", text: "Chastity: Proper integration of sexuality within the human person according to the mind of God and one's state in life." },
        { id: "wv-meekness", text: "Meekness: Gentleness of spirit that gives power of self-possession governs anger." },
        { id: "wv-temperance", text: "Temperance: Moderation of the desire for pleasure." },
        { id: "wv-brotherlylove", text: "Brotherly Love: Desire for the true good of one's neighbor, which leads one to act rightly toward him." },
        { id: "wv-diligence", text: "Diligence: Consistency in doing what is right." },
      ]},
      { title: "The Theological Virtues", items: [{ id: "wt-faith", text: "Faith, Hope and Charity." }] },
      { title: "The Cardinal Virtues", items: [{ id: "wc-prudence", text: "Prudence, Justice, Temperance and Fortitude." }] },
      { title: "The Corporal Works of Mercy", items: [{ id: "wcwm-feed", text: "To feed the hungry, give drink to the thirsty, clothe the naked, visit the imprisoned, shelter the homeless, visit the sick and bury the dead." }] },
      { title: "The Spiritual Works of Mercy", items: [{ id: "wswm-admonish", text: "To admonish the sinner, instruct the ignorant, counsel the doubtful, comfort the sorrowful, bear wrongs patiently, forgive all injuries and pray for the living and the dead." }] },
      { title: "The Gifts of the Holy Spirit", items: [{ id: "wghs-wisdom", text: "Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, and Fear of the Lord." }] },
      { title: "The Fruits of the Holy Spirit (Gal. 5:22-23)", items: [{ id: "wfhs-charity", text: "Charity, Joy, Peace, Patience, Kindness, Goodness, Generosity, Gentleness, Faithfulness, Modesty, Self-Control and Chastity." }]},
      { title: "The Evangelical Counsels", items: [{ id: "wec-chastity", text: "Chastity, Poverty and Obedience." }]},
      { title: "The Beatitudes", items: [
          { id: "beatitudes1", text: "Blessed are the poor in spirit; for theirs is the Kingdom of Heaven." },
          { id: "beatitudes2", text: "Blessed are the meek; for they shall possess the land." },
          { id: "beatitudes3", text: "Blessed are they that mourn; for they shall be comforted." },
          { id: "beatitudes4", text: "Blessed are they that hunger and thirst for justice; for they shall be satisfied." },
          { id: "beatitudes5", text: "Blessed are the merciful; for they shall obtain mercy." },
          { id: "beatitudes6", text: "Blessed are the pure of heart; for they shall see God." },
          { id: "beatitudes7", text: "Blessed are the peacemakers; for they shall be called the children of God." },
          { id: "beatitudes8", text: "Blessed are they that suffer persecution for justice's sake; for theirs is the Kingdom of Heaven." },
          { id: "beatitudes9", text: "Blessed are you when people revile you and persecute you and utter all kinds of evil against you falsely on my account. Rejoice and be glad, for your reward will be great in heaven." },
      ]},
      { title: "Three Eminent Good Works to Overcome our Sinfulness", items: [{id: "w3gw-prayer", text: "Prayer, Fasting and Almsgiving."}]},
    ]
  },
  {
    id: "how-to-confess",
    title: "How to go to Confession",
    mainDescription: 
`The priest will greet you.
The penitent says: "Bless me, Father, for I have sinned." You then say how long it has been since your last Confession.
The penitent tells the priest his sins simply and forthrightly (if mortal sin, give kind and approximate number).
The priest will give you some advice and will assign you a penance.
The penitent will next pray the Act of Contrition (available on the Prayers page).
The priest then gives the penitent absolution.
The priest will then say: "Give thanks to the Lord, for He is good."
The penitent responds: "His mercy endures forever." The priest will then dismiss you.
The penitent carries out the assigned penance.`
  },
   {
    id: "fathers-of-mercy-info",
    title: "About This Examination Guide",
    mainDescription: "This Examination of Conscience is adapted from material provided by The Fathers of Mercy. For more information, visit: www.fathersofmercy.com. Imprimi Potest: Very Rev. David M. Wilton, CPM, Superior General of the Fathers of Mercy, February 11, 2020, Our Lady of Lourdes."
  }
];


export function ExaminationGuideAccordion() {
  const { toast } = useToast();

  const handleAddToList = (itemText: string) => {
    try {
      const existingItemsRaw = localStorage.getItem(TEMP_EXAMINATION_SINS_KEY);
      let existingItems: string[] = [];
      if (existingItemsRaw) {
        try {
            existingItems = JSON.parse(existingItemsRaw);
            if (!Array.isArray(existingItems)) existingItems = []; // Ensure it's an array
        } catch (e) {
            console.error("Error parsing existing examination items from localStorage:", e);
            existingItems = []; // Reset if parsing fails
        }
      }
      
      if (!existingItems.includes(itemText)) { // Avoid duplicates in the temp list
        existingItems.push(itemText);
        localStorage.setItem(TEMP_EXAMINATION_SINS_KEY, JSON.stringify(existingItems));
        toast({
          title: "Added to Reflection List",
          description: `"${itemText.substring(0, 50)}..." is ready. View on the main reflection page.`,
          duration: 4000,
        });
      } else {
         toast({
          title: "Item Already Queued",
          description: `"${itemText.substring(0, 50)}..." is already queued to be added.`,
          duration: 3000,
        });
      }

    } catch (error) {
      console.error("Error adding examination item to localStorage:", error);
      toast({
        title: "Error",
        description: "Could not add item to list. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderAccordionItemContent = (section: ExaminationSection) => {
    if (section.mainDescription && !section.subSections && !section.questions) {
      return <div className="px-4 pb-4 text-sm text-muted-foreground whitespace-pre-line">{section.mainDescription}</div>;
    }

    return (
      <>
        {section.mainDescription && <p className="px-4 pb-2 text-sm text-muted-foreground">{section.mainDescription}</p>}
        {section.subSections && section.subSections.map((sub, subIndex) => (
          <div key={`${section.id}-sub-${subIndex}`} className="pt-2">
            <h4 className="font-semibold text-sm px-4 mb-1 text-foreground">{sub.title}</h4>
            {sub.description && <p className="px-4 pb-1 text-xs text-muted-foreground">{sub.description}</p>}
            <ul className="space-y-1 text-sm text-muted-foreground pl-4">
              {sub.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-2 py-0.5 pr-2">
                  <span className="flex-grow break-words">{item.text}</span>
                  {item.isAddable && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 text-primary hover:text-primary/80"
                      onClick={() => handleAddToList(item.text)}
                      aria-label="Add to reflection list"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {section.questions && (
          <ul className="space-y-1 text-sm text-muted-foreground px-4">
            {section.questions.map((question) => (
              <li key={question.id} className="flex items-start justify-between gap-2 py-0.5">
                <span className="flex-grow break-words">{question.text}</span>
                {question.isAddable && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-primary hover:text-primary/80"
                    onClick={() => handleAddToList(question.text)}
                    aria-label="Add to reflection list"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };


  return (
    <Accordion type="single" collapsible className="w-full space-y-3 pb-4 px-1">
      {newExaminationSections.map((section) => (
        <AccordionItem value={section.id} key={section.id} className="border rounded-md shadow-sm bg-card">
          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline text-base font-medium">
             <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                {section.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-0">
            {renderAccordionItemContent(section)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
