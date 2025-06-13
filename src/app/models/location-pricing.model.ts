export interface LocationPricing {
  name: string;
  slug: string;
  state: string;
  prices: {
    basic: number;
    standard: number;
    premium: number;
  };
  features?: {
    installationIncluded: boolean;
    support24h: boolean;
    wifi5g: boolean;
    hdChannels: number;
    speedGuarantee: boolean;
  };
}
