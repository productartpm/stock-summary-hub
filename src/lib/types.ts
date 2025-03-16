
export interface PremiumContent {
  title: string;
  description: string;
  unlockPrice?: string;
}

export interface ShareOptions {
  url: string;
  title: string;
  description: string;
}

export interface SummaryDataItem {
  value: number;
  change: number;
  unit?: string;
}

