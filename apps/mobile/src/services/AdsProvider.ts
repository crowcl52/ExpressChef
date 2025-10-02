export type AdsAdapter = {
  showInterstitial: () => Promise<void>;
  showBanner: (containerId: string) => void;
  hideBanner: (containerId: string) => void;
};

export class MockAds implements AdsAdapter {
  async showInterstitial(): Promise<void> {
    // no-op in development
    return Promise.resolve();
  }
  showBanner(_containerId: string): void {}
  hideBanner(_containerId: string): void {}
}

export const ads = new MockAds();
