
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
      netIncome: { value: -1.32, change: -15.8, unit: 'B PLN' },
      eps: { value: -12.92, change: -15.8, unit: 'PLN' },
      roe: { value: -12.4, change: -1.5, unit: '%' },
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
  },
  {
    id: 'columbus-energy-q3-2024',
    companyName: 'Columbus Energy',
    ticker: 'CLC.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Logo_Columbus_Energy_2021.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-11-15',
    reportDate: '2024-09-30',
    title: 'Columbus Energy - Raport skonsolidowany za III kwartał 2024',
    reportCategory: ['Energy', 'Renewable Energy', 'Photovoltaics', 'Heat Pumps'],
    category: 'Energy',
    financialPeriod: 'Q3 2024 (9 miesięcy)',
    summaryData: {
      revenue: { value: 233.86, change: -35.85, unit: 'M PLN' },
      netIncome: { value: -21.96, change: 63.37, unit: 'M PLN' }, // strata zmniejszyła się r/r
      eps: { value: -0.33, change: 63.37, unit: 'PLN' },
      operatingProfit: { value: 10.38, change: 134.5, unit: 'M PLN' }, // zmiana z -30.098 na +10.382
      ebitda: { value: 20.88, change: 206.1, unit: 'M PLN' } // zmiana z -19.668 na +20.878
    },
    stockData: {
      currentPrice: 4.2 + Math.random() * 0.8,
      priceChange: (Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: -12 + (Math.random() * 8),
      low52Week: 3.5 + Math.random() * 0.5,
      high52Week: 7.8 + Math.random() * 1.2,
      sharesOutstanding: 66.5 + Math.random() * 0.5,
      averageDailyVolume: 250000 + Math.random() * 100000,
      volatility: 1.8 + Math.random() * 0.4,
      rsi: 41 + Math.random() * 10,
      macd: {
        value: -0.12 + (Math.random() * 0.24) - 0.12,
        signal: -0.08 + (Math.random() * 0.16) - 0.08,
        histogram: -0.04 + (Math.random() * 0.08) - 0.04
      },
      stochastic: {
        k: 35 + Math.random() * 15,
        d: 32 + Math.random() * 10
      },
      williams: -65 + (Math.random() * 20) - 10,
      supportLevels: [3.8, 3.6, 3.4],
      resistanceLevels: [4.6, 5.0, 5.5]
    },
    keyHighlights: [
      'Redukcja straty netto o 63,4% w porównaniu do analogicznego okresu 2023',
      'Osiągnięcie dodatniego wyniku EBITDA na poziomie 20,88 mln PLN',
      'Wzrost rentowności operacyjnej do 4,44% z -8,26% w analogicznym okresie 2023',
      'Rozwój projektu Columbus ONE dla konsolidacji rynku OZE',
      'Wdrażanie innowacyjnej usługi Columbus Intelligence do synchronizacji urządzeń energetycznych'
    ],
    premium: false
  }
];
