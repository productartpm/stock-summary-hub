
import type { FinancialReport } from '@/lib/types';

export const telecomReports: FinancialReport[] = [
  {
    id: 'orange-polska-q1-2025',
    companyName: 'Orange Polska',
    ticker: 'OPL.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1280px-Orange_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-06-05',
    reportDate: '2025-06-05',
    title: 'Orange Polska - Wyniki za I kwartał 2025',
    reportCategory: ['Telecommunications', 'Internet', 'Mobile', 'Broadband'],
    category: 'Znacząca umowa',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 3.12, change: 4.8, unit: 'B PLN' },
      operatingProfit: { value: 0.42, change: 9.2, unit: 'B PLN' },
      netIncome: { value: 0.28, change: 12.5, unit: 'B PLN' },
      eps: { value: 0.22, change: 12.5, unit: 'PLN' },
      ebitda: { value: 0.85, change: 7.6, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 9 + Math.random() * 3,
      priceChange: (Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 5 + (Math.random() * 10),
      low52Week: 7 + Math.random() * 1,
      high52Week: 12 + Math.random() * 2,
      sharesOutstanding: 1300 + Math.random() * 10,
      averageDailyVolume: 1200000 + Math.random() * 800000,
      volatility: 0.9 + Math.random() * 0.3
    },
    keyHighlights: [
      'Wzrost liczby klientów światłowodowych o 12,2% rok do roku',
      'Usługi konwergentne osiągnęły 2,3 mln klientów',
      'Podpisanie umowy z Play na współdzielenie infrastruktury światłowodowej',
      'EBITDAaL wzrosła o 7,6% rok do roku',
      'Inwestycje w rozbudowę sieci 5G wyniosły 0,4 mld PLN w I kwartale'
    ],
    premium: false
  }
];
