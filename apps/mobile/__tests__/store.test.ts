import { act } from 'react-test-renderer';
import { useAppStore } from '../src/store/useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    const { getState, setState } = useAppStore;
    setState({
      ...getState(),
      ingredientsHave: [],
      favorites: {},
      prefs: { diet: 'omnivora', excludeAllergens: [], maxTimeMinutes: undefined, preferredTags: [] },
      isPremium: false,
      openDetailsCount: 0,
    });
  });

  it('adds and removes ingredients', () => {
    act(() => useAppStore.getState().addIngredient('arroz'));
    expect(useAppStore.getState().ingredientsHave).toContain('arroz');
    act(() => useAppStore.getState().removeIngredient('arroz'));
    expect(useAppStore.getState().ingredientsHave).not.toContain('arroz');
  });
});
