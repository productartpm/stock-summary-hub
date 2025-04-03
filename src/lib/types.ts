
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
  rsi?: number;
  macd?: {
    value: number;
    signal: number;
    histogram: number;
  };
  bollinger?: {
    upper: number;
    middle: number;
    lower: number;
  };
  stochastic?: {
    k: number;
    d: number;
  };
  atr?: number;
  obv?: number;
}

export interface ReportSummary {
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  marketContext?: string;
  keyFactors?: string[];
}
