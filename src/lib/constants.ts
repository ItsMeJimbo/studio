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
  ],
};
