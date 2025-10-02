export type Ingredient = {
  name: string;
  qty?: string;
};

export type Substitution = {
  from: string;
  to: string;
};

export type Recipe = {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: string[]; // 4–6 steps
  tags: string[]; // "rápida", "barata", "vegana", etc.
  timeMinutes: number;
  servings: number;
  substitutions?: Substitution[];
  image?: string;
};

export type DietType = 'omnivora' | 'vegetariana' | 'vegana';

export type Prefs = {
  diet: DietType;
  excludeAllergens: string[]; // e.g., ['gluten', 'lactosa', 'frutos secos']
  maxTimeMinutes?: number;
  preferredTags?: string[];
};

export type SuggestionScore = {
  matchCount: number;
  missingCount: number;
  score: number;
  usedSubstitutions?: { missing: string; substitute: string }[];
};
