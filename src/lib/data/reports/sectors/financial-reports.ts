
import type { FinancialReport } from '@/lib/types';

export const financialReports: FinancialReport[] = [
  {
    id: 'santander-q1-2025',
    companyName: 'Santander Bank Polska',
    ticker: 'SPL.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/1280px-Banco_Santander_Logotipo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-29',
    reportDate: '2025-05-29',
    title: 'Santander Bank Polska - Wyniki za I kwartał 2025',
    reportCategory: ['Banking', 'Financial Services', 'Mortgage', 'Consumer Banking'],
    category: 'Dywidenda',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 3.8, change: 12.1, unit: 'B PLN' },
      netInterestIncome: { value: 2.85, change: 10.2, unit: 'B PLN' },
      netIncome: { value: 1.32, change: 15.8, unit: 'B PLN' },
      eps: { value: 12.92, change: 15.8, unit: 'PLN' },
      roe: { value: 12.4, change: 1.5, unit: '%' },
      operatingProfit: { value: 1.9, change: 14.2, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 480 + Math.random() * 100,
      priceChange: (Math.random() * 15) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 12 + (Math.random() * 18),
      low52Week: 400 + Math.random() * 50,
      high52Week: 600 + Math.random() * 80,
      sharesOutstanding: 102 + Math.random() * 3,
      averageDailyVolume: 200000 + Math.random() * 100000,
      volatility: 1.0 + Math.random() * 0.3
    },
    keyHighlights: [
      'Wzrost wyniku odsetkowego o 10,2% rok do roku',
      'Liczba aktywnych klientów detalicznych przekroczyła 5,5 mln',
      'Ogłoszenie wypłaty dywidendy w wysokości 15 PLN na akcję',
      'Portfel kredytowy wzrósł o 7,8% rok do roku',
      'Wskaźnik NPL na poziomie 4,2%, poprawa o 0,3 p.p. rok do roku'
    ],
    premium: false
  }
];
