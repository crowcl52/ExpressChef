import { useMemo } from 'react';
import { normalizeList } from '../utils/normalize';
import { suggestRecipes, type SuggestResult } from '../domain/suggest';
import type { Prefs } from '../domain/types';

export function useRecipeSuggestor(
  have: string[],
  prefs: Prefs,
  isPremium: boolean
): SuggestResult[] {
  const depsKey = useMemo(() => {
    const a = normalizeList(have).sort().join('|');
    const p = JSON.stringify(prefs);
    return `${a}__${p}__${isPremium ? '1' : '0'}`;
  }, [have, prefs, isPremium]);

  const results = useMemo(() => {
    return suggestRecipes(have, prefs, isPremium);
  }, [depsKey]);

  return results;
}
