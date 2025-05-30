
export const LOCAL_STORAGE_SINS_KEY = 'confessEaseSins';
export const LOCAL_STORAGE_LAST_CONFESSION_KEY = 'confessEaseLastConfessionDate';
export const LOCAL_STORAGE_THEME_KEY = 'confessEaseTheme';

export const PREDEFINED_SINS_CATEGORIES = {
  VENIAL: 'Venial',
  MORTAL: 'Mortal',
} as const;

export type SinCategoryType = 'Venial' | 'Mortal';


export interface PredefinedSinEntry {
  id: string;
  title: string;
  keywords?: string[];
}

export const PREDEFINED_SINS_DATA: {
  [key in SinCategoryType]: PredefinedSinEntry[];
} = {
  Venial: [
    { id: 'v1', title: 'Impatience with others', keywords: ['irritability', 'short temper'] },
    { id: 'v2', title: 'Minor dishonesty (e.g., a white lie)', keywords: ['fibbing', 'not truthful'] },
    { id: 'v3', title: 'Engaging in idle chatter or gossip', keywords: ['rumors', 'tale-bearing', 'backbiting'] },
    { id: 'v4', title: 'Procrastination in important duties', keywords: ['delaying', 'putting off tasks'] },
    { id: 'v5', title: 'Prideful thoughts or vanity', keywords: ['arrogance', 'conceit', 'self-importance'] },
    { id: 'v6', title: 'Holding a small grudge or resentment', keywords: ['bitterness', 'unforgiveness'] },
    { id: 'v7', title: 'Excessive attachment to material things', keywords: ['materialism', 'possessions'] },
    { id: 'v8', title: 'Neglecting small acts of charity', keywords: ['unkindness', 'selfishness'] },
    { id: 'v9', title: 'Giving in to jealousy or envy of others\' success or possessions.', keywords: ['coveting', 'resentfulness'] },
    { id: 'v10', title: 'Speaking unkindly or harshly to or about others.', keywords: ['cursing', 'insulting', 'rude language', 'verbal abuse', 'sharp tongue'] },
    { id: 'v11', title: 'Wasting time or talents that God has given.', keywords: ['laziness', 'unproductivity', 'sloth'] },
    { id: 'v12', title: 'Showing excessive anger or frustration over small matters.', keywords: ['temper tantrums', 'irritability'] },
    { id: 'v13', title: 'Exaggerating or embellishing stories for self-promotion.', keywords: ['boasting', 'bragging', 'showing off'] },
    { id: 'v14', title: 'Failing to pray regularly or with devotion.', keywords: ['prayerlessness', 'neglecting prayer'] },
    { id: 'v15', title: 'Being ungrateful for blessings received.', keywords: ['thanklessness', 'entitlement'] },
    { id: 'v16', title: 'Complaining excessively or fostering a negative attitude.', keywords: ['negativity', 'pessimism', 'grumbling'] },
    { id: 'v17', title: 'Indulging in minor forms of vanity or self-centeredness.', keywords: ['egotism', 'self-obsession'] },
    { id: 'v18', title: 'Neglecting to offer help when it\'s reasonably within one\'s capacity.', keywords: ['apathy', 'indifference'] },
    { id: 'v19', title: 'Uncharitable thoughts or judgments about others.', keywords: ['criticism', 'judgmental'] },
    { id: 'v20', title: 'Dwelling on impure thoughts or fantasies.', keywords: ['lustful thoughts (minor)'] },
    { id: 'v21', title: 'Excessive curiosity about others\' private lives.', keywords: ['nosiness', 'prying'] },
    { id: 'v22', title: 'Failing to control one\'s tongue (e.g., interrupting, speaking too much).', keywords: ['talkativeness', 'blabbering'] },
    { id: 'v23', title: 'Being stubborn or unwilling to admit fault.', keywords: ['obstinacy', 'hard-headed'] },
    { id: 'v24', title: 'Neglecting one\'s health or well-being through minor carelessness.', keywords: ['poor self-care'] },
    { id: 'v25', title: 'Showing disrespect to sacred places or objects (minor).', keywords: ['slight irreverence'] },
  ],
  Mortal: [
    { id: 'm1', title: 'Deliberately missing Mass on Sunday or a Holy Day of Obligation without a serious reason', keywords: ['skipping church', 'neglecting Mass obligation'] },
    { id: 'm2', title: 'Committing serious blasphemy or sacrilege', keywords: ['profanity against God', 'desecration', 'irreverence (grave)'] },
    { id: 'm3', title: 'Engaging in grave theft or fraud', keywords: ['stealing large amounts', 'grand larceny', 'embezzlement', 'serious deception for gain'] },
    { id: 'm4', title: 'Committing adultery or other grave sexual sins (e.g., fornication, pornography, homosexual acts)', keywords: ['infidelity', 'premarital sex', 'extramarital sex', 'impure acts (grave)'] },
    { id: 'm5', title: 'Intentionally causing serious harm or death to another (Murder)', keywords: ['homicide', 'killing', 'manslaughter (intentional)'] },
    { id: 'm6', title: 'Procuring or directly assisting in an abortion', keywords: ['ending pregnancy', 'cooperating with abortion'] },
    { id: 'm7', title: 'Apostasy (total repudiation of the Christian faith)', keywords: ['denying faith', 'abandoning religion'] },
    { id: 'm8', title: 'Receiving Holy Communion in a state of mortal sin', keywords: ['sacrilegious communion', 'unworthy reception'] },
    { id: 'm9', title: 'Serious detraction or calumny (ruining someone\'s reputation with lies or grave truths without just cause)', keywords: ['slander (grave)', 'libel (grave)', 'defamation (grave)', 'character assassination'] },
    { id: 'm10', title: 'Willful and grave disobedience to lawful authority in serious matters (e.g., Church, parents in grave matters)', keywords: ['rebellion (grave)', 'serious insubordination'] },
    { id: 'm11', title: 'Engaging in occult practices (divination, magic, sorcery, spiritism)', keywords: ['witchcraft', 'fortune telling', 'summoning spirits'] },
    { id: 'm12', title: 'Deliberate hatred of God or neighbor', keywords: ['malice', 'extreme animosity', 'cursing others (grave)'] },
    { id: 'm13', title: 'Perjury (lying under oath)', keywords: ['false testimony in court'] },
    { id: 'm14', title: 'Grave scandal (leading others into serious sin by one\'s actions or words)', keywords: ['bad example (grave)', 'corrupting others spiritually'] },
    { id: 'm15', title: 'Simony (buying or selling spiritual things or offices)', keywords: ['trafficking sacred items or roles'] },
    { id: 'm16', title: 'Despair (willful abandonment of hope in God\'s mercy or salvation)', keywords: ['hopelessness in God', 'giving up on salvation entirely'] },
    { id: 'm17', title: 'Presumption (expecting God\'s mercy without repentance or God\'s help without effort/merit)', keywords: ['overconfidence in salvation without effort', 'sinning boldly expecting forgiveness'] },
    { id: 'm18', title: 'Serious neglect of one\'s duties towards family, work, or society that causes grave harm.', keywords: ['grave irresponsibility', 'abandonment of grave duties'] },
    { id: 'm19', title: 'Heresy (obstinate denial or doubt of a truth which must be believed with divine and Catholic faith)', keywords: ['denying dogma', 'false teaching (obstinate)'] },
    { id: 'm20', title: 'Schism (refusal of submission to the Supreme Pontiff or of communion with the members of the Church subject to him)', keywords: ['separating from Church unity'] },
    { id: 'm21', title: 'Idolatry (worshipping false gods or creatures)', keywords: ['idol worship', 'putting creation before Creator'] },
    { id: 'm22', title: 'Grave envy that leads to wishing serious evil upon another.', keywords: ['malicious envy', 'rejoicing in others misfortune (grave)'] },
    { id: 'm23', title: 'Deliberate and consensual entertaining of lustful thoughts about a specific person not one\'s spouse, if consent is given to the desire itself.', keywords: ['lustful thoughts (deliberate, consensual, grave)'] },
    { id: 'm24', title: 'Drunkenness or substance abuse that leads to loss of reason or serious neglect of duties.', keywords: ['grave intoxication', 'serious addiction impacting duties'] },
    { id: 'm25', title: 'Mutilation or serious self-harm.', keywords: ['grave self-harm'] },
  ],
};

