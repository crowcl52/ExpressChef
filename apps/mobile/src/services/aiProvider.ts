export type AiProvider = {
  suggest: (have: string[], prefs: Record<string, unknown>) => Promise<string[]>;
};

export class MockAi implements AiProvider {
  async suggest(have: string[]): Promise<string[]> {
    // Future: use external model. For now, echo back a stub.
    return Promise.resolve(have.slice(0, 3));
  }
}

export const ai = new MockAi();
