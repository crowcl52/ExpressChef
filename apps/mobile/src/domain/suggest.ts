import baseRecipes from '../data/recipes.base.json';
import premiumRecipes from '../data/recipes.premium.json';
import substitutions from '../data/substitutions.json';
import { normalizeList, normalizeText } from '../utils/normalize';
import type { Prefs, Recipe, SuggestionScore } from './types';

export type SuggestResult = {
  recipe: Recipe;
  score: SuggestionScore;
};

const SUB_MAP = (() => {
  const map = new Map<string, string[]>();
  for (const pair of substitutions) {
    const key = normalizeText(pair.from);
    const to = normalizeText(pair.to);
    const list = map.get(key) ?? [];
    list.push(to);
    map.set(key, list);
  }
  return map;
})();

function isRecipeAllowedByDiet(recipe: Recipe, diet: Prefs['diet']): boolean {
  const hasMeat = recipe.tags.some((t) => /carne|pollo|cerdo|pavo|res|vacuno/i.test(t));
  const hasAnimal = recipe.tags.some((t) => /pollo|pescado|atún|queso|huevo|lácte|mantequilla/i.test(t));
  if (diet === 'vegana') {
    return !hasAnimal && !hasMeat;
  }
  if (diet === 'vegetariana') {
    return !hasMeat;
  }
  return true;
}

function hasExcludedAllergens(recipe: Recipe, allergens: string[]): boolean {
  if (allergens.length === 0) return false;
  const allergensNorm = allergens.map(normalizeText);
  const inIngredients = recipe.ingredients.some((ing) =>
    allergensNorm.some((a) => normalizeText(ing.name).includes(a))
  );
  const inTags = recipe.tags.some((t) => allergensNorm.some((a) => normalizeText(t).includes(a)));
  return inIngredients || inTags;
}

export function computeScore(
  haveInput: string[],
  recipe: Recipe,
  prefs: Prefs
): SuggestionScore {
  const have = new Set(normalizeList(haveInput));
  const recipeIngredients = recipe.ingredients.map((i) => normalizeText(i.name));

  let matchCount = 0;
  const missing: string[] = [];

  for (const ing of recipeIngredients) {
    if (Array.from(have).some((h) => ing.includes(h) || h.includes(ing))) {
      matchCount += 1;
    } else {
      missing.push(ing);
    }
  }

  let missingCount = missing.length;
  const usedSubstitutions: { missing: string; substitute: string }[] = [];

  for (const miss of [...missing]) {
    const subs = SUB_MAP.get(miss);
    if (!subs) continue;
    const found = subs.find((sub) => Array.from(have).some((h) => h.includes(sub) || sub.includes(h)));
    if (found) {
      usedSubstitutions.push({ missing: miss, substitute: found });
      missingCount -= 1;
    }
  }

  let score = matchCount * 2 - missingCount;
  if (prefs.preferredTags && prefs.preferredTags.length > 0) {
    const bonus = recipe.tags.reduce((acc, t) =>
      acc + (prefs.preferredTags!.some((pt) => normalizeText(pt) === normalizeText(t)) ? 1 : 0), 0);
    score += bonus;
  }

  return { matchCount, missingCount, score, usedSubstitutions };
}

export function suggestRecipes(
  have: string[],
  prefs: Prefs,
  isPremium: boolean
): SuggestResult[] {
  const all: Recipe[] = isPremium ? [...baseRecipes, ...premiumRecipes] : baseRecipes;

  const filtered = all.filter((r) => {
    if (!isRecipeAllowedByDiet(r, prefs.diet)) return false;
    if (prefs.maxTimeMinutes && r.timeMinutes > prefs.maxTimeMinutes) return false;
    if (hasExcludedAllergens(r, prefs.excludeAllergens)) return false;
    return true;
  });

  const scored = filtered.map((recipe) => ({ recipe, score: computeScore(have, recipe, prefs) }));
  return scored.sort((a, b) => b.score.score - a.score.score);
}
