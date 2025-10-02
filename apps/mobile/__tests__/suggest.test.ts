import { computeScore, suggestRecipes } from '../src/domain/suggest';
import type { Prefs } from '../src/domain/types';

const prefs: Prefs = { diet: 'omnivora', excludeAllergens: [], preferredTags: [], maxTimeMinutes: undefined };

describe('suggest.ts', () => {
  it('computes positive score with matches', () => {
    const recipe = {
      id: 't',
      title: 'test',
      ingredients: [{ name: 'arroz' }, { name: 'huevo' }],
      steps: ['a'],
      tags: ['rápida'],
      timeMinutes: 10,
      servings: 1,
    };
    const score = computeScore(['arroz'], recipe as any, prefs);
    expect(score.matchCount).toBe(1);
    expect(score.missingCount).toBeGreaterThanOrEqual(1);
    expect(typeof score.score).toBe('number');
  });

  it('suggests recipes sorted by score', () => {
    const results = suggestRecipes(['arroz', 'huevo', 'cebolla', 'aceite', 'sal'], prefs, false);
    expect(results.length).toBeGreaterThan(0);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score.score).toBeGreaterThanOrEqual(results[i].score.score);
    }
  });
});
