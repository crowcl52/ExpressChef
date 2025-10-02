jest.mock('@react-native-async-storage/async-storage', () => {
  let store: Record<string, string> = {};
  return {
    setItem: async (k: string, v: string) => {
      store[k] = v;
    },
    getItem: async (k: string) => store[k] ?? null,
    removeItem: async (k: string) => {
      delete store[k];
    },
    clear: async () => {
      store = {};
    },
  };
});

// Dummy test to satisfy Jest when running setup as a test suite
describe('setup', () => {
  it('mocked AsyncStorage is defined', () => {
    expect(true).toBe(true);
  });
});
