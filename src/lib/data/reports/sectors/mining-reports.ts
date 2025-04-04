
import type { FinancialReport } from '@/lib/types';

export const miningReports: FinancialReport[] = [
  {
    id: 'kghm-q1-2025',
    companyName: 'KGHM Polska Miedź',
    ticker: 'KGH.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/KGHM_logo.svg/1280px-KGHM_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-16',
    reportDate: '2025-05-16',
    title: 'KGHM - Raport za I kwartał 2025',
    reportCategory: ['Mining', 'Metals', 'Copper', 'Silver'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 9.7, change: 12.4, unit: 'B PLN' },
      operatingProfit: { value: 1.8, change: 37.2, unit: 'B PLN' },
      netIncome: { value: 1.4, change: 42.5, unit: 'B PLN' },
      eps: { value: 7.02, change: 42.5, unit: 'PLN' },
      ebitda: { value: 2.9, change: 32.8, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 140 + Math.random() * 40,
      priceChange: (Math.random() * 8) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 15 + (Math.random() * 20),
      low52Week: 110 + Math.random() * 20,
      high52Week: 190 + Math.random() * 30,
      sharesOutstanding: 200 + Math.random() * 5,
      averageDailyVolume: 700000 + Math.random() * 300000,
      volatility: 1.4 + Math.random() * 0.5
    },
    keyHighlights: [
      'Wzrost produkcji miedzi o 8,2% w porównaniu do analogicznego okresu roku poprzedniego',
      'Ceny miedzi na poziomie 10.800 USD/t wspierają wyniki finansowe',
      'Zakończenie modernizacji huty w Głogowie przyczyniło się do poprawy efektywności produkcji',
      'Produkcja w kopalni Sierra Gorda wzrosła o 12,4% rok do roku',
      'Inwestycje w projekty związane z transformacją energetyczną wyniosły 0,6 mld PLN'
    ],
    premium: false
  },
  {
    id: 'jsw-q1-2025',
    companyName: 'Jastrzębska Spółka Węglowa',
    ticker: 'JSW.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/JSW_SA_logo.svg/1280px-JSW_SA_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-23',
    reportDate: '2025-05-23',
    title: 'JSW - Wyniki finansowe za I kwartał 2025',
    reportCategory: ['Mining', 'Coal', 'Coke', 'Steel'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 2.85, change: -8.2, unit: 'B PLN' },
      operatingProfit: { value: 0.32, change: -42.1, unit: 'B PLN' },
      netIncome: { value: 0.24, change: -51.3, unit: 'B PLN' },
      eps: { value: 2.04, change: -51.3, unit: 'PLN' },
      ebitda: { value: 0.68, change: -35.6, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 32 + Math.random() * 15,
      priceChange: (Math.random() * 4) * (Math.random() > 0.6 ? 1 : -1),
      yearToDateChange: -18 + (Math.random() * 25),
      low52Week: 28 + Math.random() * 8,
      high52Week: 75 + Math.random() * 15,
      sharesOutstanding: 117 + Math.random() * 3,
      averageDailyVolume: 450000 + Math.random() * 200000,
      volatility: 2.1 + Math.random() * 0.6
    },
    keyHighlights: [
      'Spadek średnich cen węgla koksowego o 18% rok do roku',
      'Wzrost produkcji węgla o 4,2% do 3,6 mln ton',
      'Redukcja nakładów inwestycyjnych o 12% w porównaniu do analogicznego okresu poprzedniego roku',
      'Spadek zadłużenia netto o 15,3%',
      'Wdrożenie programu optymalizacji kosztów operacyjnych w odpowiedzi na niższe ceny surowców'
    ],
    premium: true
  }
];
