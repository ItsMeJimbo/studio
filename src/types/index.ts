export interface Sin {
  id: string;
  title: string;
  type: 'Venial' | 'Mortal' | 'Custom';
  description?: string; // For custom sin notes or user reflections
  tags?: string[];
  addedAt: string; // ISO Date string
}
