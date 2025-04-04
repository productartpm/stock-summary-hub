
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
  },
  {
    id: 'cyfrowy-polsat-q4-2024',
    companyName: 'Cyfrowy Polsat',
    ticker: 'CPS.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Polsat_2021.svg/1200px-Polsat_2021.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q4 2024',
    publicationDate: '2025-03-21',
    reportDate: '2025-03-21',
    title: 'Cyfrowy Polsat - Skonsolidowane wyniki za IV kwartał 2024',
    reportCategory: ['Telecommunications', 'Media', 'Entertainment', 'Pay TV'],
    category: 'Wyniki',
    financialPeriod: 'Q4 2024',
    summaryData: {
      revenue: { value: 3.45, change: 2.1, unit: 'B PLN' },
      operatingProfit: { value: 0.56, change: -3.4, unit: 'B PLN' },
      netIncome: { value: 0.31, change: -8.2, unit: 'B PLN' },
      eps: { value: 0.49, change: -8.2, unit: 'PLN' },
      ebitda: { value: 0.98, change: -1.5, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 14 + Math.random() * 4,
      priceChange: (Math.random() * 0.8) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: -3 + (Math.random() * 12),
      low52Week: 12 + Math.random() * 2,
      high52Week: 21 + Math.random() * 3,
      sharesOutstanding: 640 + Math.random() * 15,
      averageDailyVolume: 350000 + Math.random() * 200000,
      volatility: 1.2 + Math.random() * 0.4
    },
    keyHighlights: [
      'Łączna liczba klientów usług multiplay przekroczyła 2,5 mln',
      'Spadek wskaźnika odejść klientów (churn) do poziomu 7,2% rocznie',
      'Średni przychód na użytkownika (ARPU) wzrósł o 3,1% do 70,8 PLN',
      'Zakończenie wdrażania sieci 5G na częstotliwości 2600 MHz',
      'Wzrost zadłużenia netto związany z inwestycjami w infrastrukturę i akwizycjami'
    ],
    premium: true
  }
];
