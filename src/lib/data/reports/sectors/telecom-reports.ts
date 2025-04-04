
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
  },
  {
    id: 'pko-bp-q1-2025',
    companyName: 'PKO Bank Polski',
    ticker: 'PKO.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/PKO_Bank_Polski.svg/1200px-PKO_Bank_Polski.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-14',
    reportDate: '2025-05-14',
    title: 'PKO Bank Polski - Wyniki finansowe za I kwartał 2025 roku',
    reportCategory: ['Finance', 'Banking', 'Consumer Banking'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 5.82, change: 1.7, unit: 'B PLN' },
      operatingProfit: { value: 2.41, change: 5.3, unit: 'B PLN' },
      netIncome: { value: 1.85, change: 4.2, unit: 'B PLN' },
      eps: { value: 1.48, change: 4.2, unit: 'PLN' },
      ebitda: { value: 2.74, change: 3.1, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 58 + Math.random() * 6,
      priceChange: (Math.random() * 1.2) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 4 + (Math.random() * 15),
      low52Week: 45 + Math.random() * 5,
      high52Week: 65 + Math.random() * 8,
      sharesOutstanding: 1250 + Math.random() * 20,
      averageDailyVolume: 1800000 + Math.random() * 800000,
      volatility: 0.85 + Math.random() * 0.3
    },
    keyHighlights: [
      'Wzrost portfela kredytowego o 3,8% rok do roku',
      'Spadek kosztów ryzyka do 0,52%',
      'Wskaźnik kredytów niepracujących (NPL) na poziomie 3,9%',
      'Wzrost liczby aktywnych klientów aplikacji mobilnej IKO o 18% r/r',
      'ROE na poziomie 12,3%, powyżej średniej rynkowej'
    ],
    premium: true
  },
  {
    id: 'pekao-q4-2024',
    companyName: 'Bank Pekao',
    ticker: 'PEO.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bank_Pekao_%28logomark%29.svg/1200px-Bank_Pekao_%28logomark%29.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q4 2024',
    publicationDate: '2025-02-27',
    reportDate: '2025-02-27',
    title: 'Bank Pekao - Raport finansowy za IV kwartał 2024',
    reportCategory: ['Finance', 'Banking', 'Corporate Banking'],
    category: 'Wyniki',
    financialPeriod: 'Q4 2024',
    summaryData: {
      revenue: { value: 3.91, change: 0.8, unit: 'B PLN' },
      operatingProfit: { value: 1.74, change: 2.1, unit: 'B PLN' },
      netIncome: { value: 1.31, change: 1.5, unit: 'B PLN' },
      eps: { value: 5.01, change: 1.5, unit: 'PLN' },
      ebitda: { value: 1.88, change: 1.2, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 145 + Math.random() * 12,
      priceChange: (Math.random() * 2) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 6 + (Math.random() * 10),
      low52Week: 125 + Math.random() * 10,
      high52Week: 170 + Math.random() * 15,
      sharesOutstanding: 262 + Math.random() * 10,
      averageDailyVolume: 850000 + Math.random() * 350000,
      volatility: 0.95 + Math.random() * 0.25
    },
    keyHighlights: [
      'Stabilny wzrost dochodów komercyjnych banku o 0,8% rok do roku',
      'Wzrost portfela kredytów korporacyjnych o 2,7%',
      'Współczynnik wypłacalności (TCR) na poziomie 18,1%',
      'Nowa strategia cyfryzacji i automatyzacji procesów',
      'Poprawa wskaźnika kosztów do dochodów (C/I) o 1,2 pp.'
    ],
    premium: false
  },
  {
    id: 'kghm-q3-2024',
    companyName: 'KGHM Polska Miedź',
    ticker: 'KGH.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/KGHM_logo.svg/1200px-KGHM_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-11-15',
    reportDate: '2024-11-15',
    title: 'KGHM - Skonsolidowany raport za III kwartał 2024 roku',
    reportCategory: ['Mining', 'Commodities', 'Metals'],
    category: 'Wyniki',
    financialPeriod: 'Q3 2024',
    summaryData: {
      revenue: { value: 7.82, change: -2.3, unit: 'B PLN' },
      operatingProfit: { value: 1.28, change: -8.4, unit: 'B PLN' },
      netIncome: { value: 0.93, change: -12.1, unit: 'B PLN' },
      eps: { value: 4.65, change: -12.1, unit: 'PLN' },
      ebitda: { value: 2.35, change: -5.8, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 134 + Math.random() * 15,
      priceChange: (Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: -8 + (Math.random() * 20),
      low52Week: 110 + Math.random() * 15,
      high52Week: 180 + Math.random() * 20,
      sharesOutstanding: 200 + Math.random() * 5,
      averageDailyVolume: 750000 + Math.random() * 320000,
      volatility: 1.3 + Math.random() * 0.4
    },
    keyHighlights: [
      'Spadek produkcji miedzi płatnej o 3,2% r/r z powodu planowanych remontów',
      'Wzrost średniej ceny srebra o 8,1% r/r',
      'Spadek kosztów C1 o 1,8% kwartał do kwartału',
      'Zaawansowanie programu inwestycyjnego Sierra Gorda na poziomie 67%',
      'Negatywny wpływ spadku notowań miedzi na światowych giełdach'
    ],
    premium: true
  },
  {
    id: 'jsw-annual-2024',
    companyName: 'Jastrzębska Spółka Węglowa',
    ticker: 'JSW.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_JSW_2019.svg/1200px-Logo_JSW_2019.svg.png',
    reportType: 'Annual',
    quarterOrYear: '2024',
    publicationDate: '2025-03-30',
    reportDate: '2025-03-30',
    title: 'JSW - Skonsolidowany raport roczny za 2024 rok',
    reportCategory: ['Mining', 'Energy', 'Coal'],
    category: 'Wyniki roczne',
    financialPeriod: '2024',
    summaryData: {
      revenue: { value: 12.45, change: -15.7, unit: 'B PLN' },
      operatingProfit: { value: 0.62, change: -78.4, unit: 'B PLN' },
      netIncome: { value: 0.41, change: -84.1, unit: 'B PLN' },
      eps: { value: 3.49, change: -84.1, unit: 'PLN' },
      ebitda: { value: 2.16, change: -65.9, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 28 + Math.random() * 8,
      priceChange: (Math.random() * 1.5) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: -38 + (Math.random() * 15),
      low52Week: 25 + Math.random() * 5,
      high52Week: 65 + Math.random() * 10,
      sharesOutstanding: 117 + Math.random() * 3,
      averageDailyVolume: 950000 + Math.random() * 450000,
      volatility: 1.8 + Math.random() * 0.5
    },
    keyHighlights: [
      'Znaczący spadek cen węgla koksowego na światowych rynkach',
      'Produkcja węgla koksowego na poziomie 10,2 mln ton (spadek o 8,3% r/r)',
      'Produkcja koksu na poziomie 3,4 mln ton (spadek o 5,1% r/r)',
      'Realizacja programu inwestycyjnego o wartości 2,1 mld PLN',
      'Kontynuacja programu redukcji kosztów operacyjnych'
    ],
    premium: false
  }
];
