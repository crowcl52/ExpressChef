import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Prefs, Recipe } from '../domain/types';

export type AppState = {
  ingredientsHave: string[];
  favorites: Record<string, Recipe>;
  prefs: Prefs;
  isPremium: boolean;
  openDetailsCount: number;
};

export type AppActions = {
  addIngredient: (name: string) => void;
  removeIngredient: (name: string) => void;
  clearIngredients: () => void;
  toggleFavorite: (recipe: Recipe) => void;
  setPrefs: (prefs: Partial<Prefs>) => void;
  setPremium: (value: boolean) => void;
  incrementDetailsOpen: () => void;
  resetDetailsOpen: () => void;
};

const defaultPrefs: Prefs = {
  diet: 'omnivora',
  excludeAllergens: [],
  maxTimeMinutes: undefined,
  preferredTags: [],
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      ingredientsHave: [],
      favorites: {},
      prefs: defaultPrefs,
      isPremium: false,
      openDetailsCount: 0,

      addIngredient: (name) =>
        set((state) => ({
          ingredientsHave: Array.from(new Set([...state.ingredientsHave, name])),
        })),

      removeIngredient: (name) =>
        set((state) => ({
          ingredientsHave: state.ingredientsHave.filter((n) => n !== name),
        })),

      clearIngredients: () => set({ ingredientsHave: [] }),

      toggleFavorite: (recipe) =>
        set((state) => {
          const next = { ...state.favorites };
          if (next[recipe.id]) delete next[recipe.id];
          else next[recipe.id] = recipe;
          return { favorites: next };
        }),

      setPrefs: (prefs) => set((state) => ({ prefs: { ...state.prefs, ...prefs } })),

      setPremium: (value) => set({ isPremium: value }),

      incrementDetailsOpen: () => set((s) => ({ openDetailsCount: s.openDetailsCount + 1 })),

      resetDetailsOpen: () => set({ openDetailsCount: 0 }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        ingredientsHave: state.ingredientsHave,
        favorites: state.favorites,
        prefs: state.prefs,
        isPremium: state.isPremium,
      }),
    }
  )
);
