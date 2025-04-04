
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
  },
  {
    id: 'pekao-q1-2025',
    companyName: 'Bank Pekao',
    ticker: 'PEO.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Logo_Bank_Pekao.svg/1200px-Logo_Bank_Pekao.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-14',
    reportDate: '2025-05-14',
    title: 'Bank Pekao - Wyniki finansowe za I kwartał 2025',
    reportCategory: ['Banking', 'Financial Services', 'Investment Banking', 'Mortgage'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 3.35, change: 8.4, unit: 'B PLN' },
      netInterestIncome: { value: 2.42, change: 6.8, unit: 'B PLN' },
      netIncome: { value: 1.08, change: 12.3, unit: 'B PLN' },
      eps: { value: 4.12, change: 12.3, unit: 'PLN' },
      roe: { value: 11.8, change: 0.9, unit: '%' },
      operatingProfit: { value: 1.56, change: 10.5, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 145 + Math.random() * 40,
      priceChange: (Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 8 + (Math.random() * 15),
      low52Week: 120 + Math.random() * 20,
      high52Week: 190 + Math.random() * 30,
      sharesOutstanding: 262 + Math.random() * 5,
      averageDailyVolume: 350000 + Math.random() * 150000,
      volatility: 1.1 + Math.random() * 0.3
    },
    keyHighlights: [
      'Wynik z tytułu prowizji i opłat wzrósł o 9,3% rok do roku',
      'Liczba aktywnych użytkowników bankowości mobilnej wzrosła do 3,2 mln',
      'Spadek kosztów ryzyka o 0,2 p.p. do poziomu 0,58%',
      'Współczynnik wypłacalności (TCR) na poziomie 18,2%',
      'Zapowiedź kontynuacji strategii transformacji cyfrowej i optymalizacji sieci placówek'
    ],
    premium: true
  },
  {
    id: 'pkobp-q1-2025',
    companyName: 'PKO Bank Polski',
    ticker: 'PKO.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/PKO_Bank_Polski_logo.svg/1280px-PKO_Bank_Polski_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-20',
    reportDate: '2025-05-20',
    title: 'PKO BP - Skonsolidowane sprawozdanie finansowe za I kwartał 2025',
    reportCategory: ['Banking', 'Financial Services', 'Consumer Banking', 'Mortgage'],
    category: 'Dywidenda',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 5.8, change: 7.2, unit: 'B PLN' },
      netInterestIncome: { value: 4.3, change: 5.9, unit: 'B PLN' },
      netIncome: { value: 1.95, change: 10.8, unit: 'B PLN' },
      eps: { value: 1.56, change: 10.8, unit: 'PLN' },
      roe: { value: 13.2, change: 0.7, unit: '%' },
      operatingProfit: { value: 2.85, change: 8.4, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 52 + Math.random() * 10,
      priceChange: (Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 15 + (Math.random() * 12),
      low52Week: 42 + Math.random() * 8,
      high52Week: 60 + Math.random() * 10,
      sharesOutstanding: 1250 + Math.random() * 20,
      averageDailyVolume: 1800000 + Math.random() * 500000,
      volatility: 0.95 + Math.random() * 0.25
    },
    keyHighlights: [
      'Zysk netto wzrósł o 10,8% rok do roku, osiągając 1,95 mld PLN',
      'Wynik z tytułu odsetek wzrósł o 5,9% r/r do 4,3 mld PLN',
      'Zarząd rekomenduje wypłatę dywidendy w wysokości 0,80 PLN na akcję',
      'Liczba klientów korzystających z aplikacji IKO przekroczyła 8,5 mln',
      'Współczynnik kapitałowy Tier 1 na poziomie 17,8%, znacznie powyżej wymogów regulacyjnych'
    ],
    premium: true
  }
];
