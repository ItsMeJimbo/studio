
export const LOCAL_STORAGE_SINS_KEY = 'confessEaseSins';

export const PREDEFINED_SINS_CATEGORIES = {
  VENIAL: 'Venial',
  MORTAL: 'Mortal',
} as const;

export type SinCategoryType = 'Venial' | 'Mortal';


export const PREDEFINED_SINS_DATA: {
  [key in SinCategoryType]: { id: string; title: string }[];
} = {
  Venial: [
    { id: 'v1', title: 'Impatience with others' },
    { id: 'v2', title: 'Minor dishonesty (e.g., a white lie)' },
    { id: 'v3', title: 'Engaging in idle chatter or gossip' },
    { id: 'v4', title: 'Procrastination in important duties' },
    { id: 'v5', title: 'Prideful thoughts or vanity' },
    { id: 'v6', title: 'Holding a small grudge or resentment' },
    { id: 'v7', title: 'Excessive attachment to material things' },
    { id: 'v8', title: 'Neglecting small acts of charity' },
    { id: 'v9', title: 'Giving in to jealousy or envy of others\' success or possessions.' },
    { id: 'v10', title: 'Speaking unkindly or harshly to or about others.' },
    { id: 'v11', title: 'Wasting time or talents that God has given.' },
    { id: 'v12', title: 'Showing excessive anger or frustration over small matters.' },
    { id: 'v13', title: 'Exaggerating or embellishing stories for self-promotion.' },
    { id: 'v14', title: 'Failing to pray regularly or with devotion.' },
    { id: 'v15', title: 'Being ungrateful for blessings received.' },
    { id: 'v16', title: 'Complaining excessively or fostering a negative attitude.' },
    { id: 'v17', title: 'Indulging in minor forms of vanity or self-centeredness.' },
    { id: 'v18', title: 'Neglecting to offer help when it\'s reasonably within one\'s capacity.' },
  ],
  Mortal: [
    { id: 'm1', title: 'Deliberately missing Mass on Sunday or a Holy Day of Obligation without a serious reason' },
    { id: 'm2', title: 'Committing serious blasphemy or sacrilege' },
    { id: 'm3', title: 'Engaging in grave theft or fraud' },
    { id: 'm4', title: 'Committing adultery or other grave sexual sins' },
    { id: 'm5', title: 'Intentionally causing serious harm or death to another (Murder)' },
    { id: 'm6', title: 'Procuring or directly assisting in an abortion' },
    { id: 'm7', title: 'Apostasy (total repudiation of the Christian faith)' },
    { id: 'm8', title: 'Receiving Holy Communion in a state of mortal sin' },
    { id: 'm9', title: 'Serious detraction or calumny (ruining someone\'s reputation with lies or truths without just cause)' },
    { id: 'm10', title: 'Willful and grave disobedience to lawful authority in serious matters' },
    { id: 'm11', title: 'Engaging in occult practices (divination, magic, sorcery)' },
    { id: 'm12', title: 'Deliberate hatred of God or neighbor' },
    { id: 'm13', title: 'Perjury (lying under oath)' },
    { id: 'm14', title: 'Grave scandal (leading others into serious sin by one\'s actions or words)' },
    { id: 'm15', title: 'Simony (buying or selling spiritual things)' },
    { id: 'm16', title: 'Despair (willful abandonment of hope in God\'s mercy)' },
    { id: 'm17', title: 'Presumption (expecting God\'s mercy without repentance or God\'s help without deserving it)' },
    { id: 'm18', title: 'Serious neglect of one\'s duties towards family, work, or society' },
  ],
};
