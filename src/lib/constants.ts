
export const LOCAL_STORAGE_SINS_KEY = 'confessEaseSins';

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
    { id: 'v11', title: 'Wasting time or talents that God has given.', keywords: ['laziness', 'unproductivity'] },
    { id: 'v12', title: 'Showing excessive anger or frustration over small matters.', keywords: ['temper tantrums', 'irritability'] },
    { id: 'v13', title: 'Exaggerating or embellishing stories for self-promotion.', keywords: ['boasting', 'bragging', 'showing off'] },
    { id: 'v14', title: 'Failing to pray regularly or with devotion.', keywords: ['prayerlessness', 'neglecting prayer'] },
    { id: 'v15', title: 'Being ungrateful for blessings received.', keywords: ['thanklessness', 'entitlement'] },
    { id: 'v16', title: 'Complaining excessively or fostering a negative attitude.', keywords: ['negativity', 'pessimism', 'grumbling'] },
    { id: 'v17', title: 'Indulging in minor forms of vanity or self-centeredness.', keywords: ['egotism', 'self-obsession'] },
    { id: 'v18', title: 'Neglecting to offer help when it\'s reasonably within one\'s capacity.', keywords: ['apathy', 'indifference'] },
  ],
  Mortal: [
    { id: 'm1', title: 'Deliberately missing Mass on Sunday or a Holy Day of Obligation without a serious reason', keywords: ['skipping church', 'neglecting Mass'] },
    { id: 'm2', title: 'Committing serious blasphemy or sacrilege', keywords: ['profanity against God', 'desecration', 'irreverence'] },
    { id: 'm3', title: 'Engaging in grave theft or fraud', keywords: ['stealing', 'embezzlement', 'deception for gain'] },
    { id: 'm4', title: 'Committing adultery or other grave sexual sins', keywords: ['infidelity', 'fornication', 'lustful acts'] },
    { id: 'm5', title: 'Intentionally causing serious harm or death to another (Murder)', keywords: ['homicide', 'killing'] },
    { id: 'm6', title: 'Procuring or directly assisting in an abortion', keywords: ['ending pregnancy'] },
    { id: 'm7', title: 'Apostasy (total repudiation of the Christian faith)', keywords: ['denying faith', 'abandoning religion'] },
    { id: 'm8', title: 'Receiving Holy Communion in a state of mortal sin', keywords: ['sacrilegious communion'] },
    { id: 'm9', title: 'Serious detraction or calumny (ruining someone\'s reputation with lies or truths without just cause)', keywords: ['slander', 'libel', 'defamation', 'gossip (grave)'] },
    { id: 'm10', title: 'Willful and grave disobedience to lawful authority in serious matters', keywords: ['rebellion', 'insubordination (grave)'] },
    { id: 'm11', title: 'Engaging in occult practices (divination, magic, sorcery)', keywords: ['witchcraft', 'fortune telling', 'spiritism'] },
    { id: 'm12', title: 'Deliberate hatred of God or neighbor', keywords: ['malice', 'extreme animosity'] },
    { id: 'm13', title: 'Perjury (lying under oath)', keywords: ['false testimony'] },
    { id: 'm14', title: 'Grave scandal (leading others into serious sin by one\'s actions or words)', keywords: ['bad example (grave)', 'corrupting others'] },
    { id: 'm15', title: 'Simony (buying or selling spiritual things)', keywords: ['trafficking sacred items'] },
    { id: 'm16', title: 'Despair (willful abandonment of hope in God\'s mercy)', keywords: ['hopelessness in God', 'giving up on salvation'] },
    { id: 'm17', title: 'Presumption (expecting God\'s mercy without repentance or God\'s help without deserving it)', keywords: ['overconfidence in salvation without effort'] },
    { id: 'm18', title: 'Serious neglect of one\'s duties towards family, work, or society', keywords: ['grave irresponsibility'] },
  ],
};
