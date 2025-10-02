export function normalizeText(input: string): string {
  if (!input) return '';
  const lower = input.toLowerCase();
  const noDiacritics = lower.normalize('NFD').replace(/\p{Diacritic}+/gu, '');
  const trimmed = noDiacritics.trim();
  return singularize(trimmed.replace(/\s+/g, ' '));
}

export function singularize(word: string): string {
  // Naive Spanish singularization for simple plural forms
  if (word.length <= 3) return word;
  if (/ces$/.test(word)) {
    // luces -> luz, peces -> pez (approximate)
    return word.replace(/ces$/, 'z');
  }
  if (/es$/.test(word) && word.length > 4) {
    return word.replace(/es$/, '');
  }
  if (/s$/.test(word) && word.length > 3) {
    return word.replace(/s$/, '');
  }
  return word;
}

export function normalizeList(values: string[]): string[] {
  return Array.from(
    new Set(values.map((v) => normalizeText(v)).filter(Boolean))
  );
}
