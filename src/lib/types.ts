
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

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

export interface StockData {
  currentPrice: number;
  priceChange: number;
  yearToDateChange: number;
  low52Week: number;
  high52Week: number;
  sharesOutstanding: number;
  averageDailyVolume: number;
  volatility: number;
}

export interface ReportSummary {
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}
