
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
  williamsR?: number;
  sma50?: number;
  sma200?: number;
  consecutiveUpDays?: number;
  consecutiveDownDays?: number;
  volumeChangePercent?: number;
  supportLevels?: number[];
  resistanceLevels?: number[];
}

export interface ReportSummary {
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  marketContext?: string;
  keyFactors?: string[];
}

export interface CalendarEvent {
  id: string;
  company: string;
  ticker: string;
  date: Date;
  type: 'quarterly' | 'annual';
  description: string;
}

export interface FinancialReport {
  id: string;
  ticker: string;
  companyName: string;
  title: string;
  summary?: string;
  reportType: 'Quarterly' | 'Annual';
  quarterOrYear: string;
  reportDate: string;
  publicationDate: string;
  category: string;
  reportCategory: string[];
  premium: boolean;
  summaryData: {
    revenue: SummaryDataItem;
    profit?: SummaryDataItem; // Made profit optional
    operatingProfit: SummaryDataItem;
    netIncome: SummaryDataItem;
    eps?: SummaryDataItem;
    [key: string]: SummaryDataItem | undefined; // Made value optional since some properties like eps are optional
  };
  stockData: StockData;
  outlook?: {
    statement: string;
    guidanceRevenue?: {
      min: number;
      max: number;
      unit: string;
    };
    guidanceEps?: {
      min: number;
      max: number;
      unit: string;
    };
  };
  keyHighlights?: string[];
  reportSummary?: ReportSummary;
  financialPeriod?: string;
  logoUrl?: string;
}
