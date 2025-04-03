
import type { FinancialReport } from '@/lib/types';

export const energyReports: FinancialReport[] = [
  {
    id: 'orlen-q1-2025',
    companyName: 'Orlen',
    ticker: 'PKN.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PKN_ORLEN_logo.svg/1280px-PKN_ORLEN_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-09',
    reportDate: '2025-05-09',
    title: 'Orlen - Skonsolidowany raport za I kwartał 2025',
    reportCategory: ['Energy', 'Oil & Gas', 'Petrochemicals', 'Retail'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 78.4, change: -5.2, unit: 'B PLN' },
      operatingProfit: { value: 6.2, change: -18.7, unit: 'B PLN' },
      netIncome: { value: 4.8, change: -22.3, unit: 'B PLN' },
      eps: { value: 4.12, change: -21.8, unit: 'PLN' },
      ebitda: { value: 9.1, change: -15.4, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 70 + Math.random() * 20,
      priceChange: (Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: -8 + (Math.random() * 16),
      low52Week: 60 + Math.random() * 10,
      high52Week: 90 + Math.random() * 15,
      sharesOutstanding: 1170 + Math.random() * 30,
      averageDailyVolume: 2500000 + Math.random() * 1000000,
      volatility: 1.1 + Math.random() * 0.4
    },
    keyHighlights: [
      'Spadek EBITDA o 15,4% rok do roku w wyniku presji marż rafineryjnych',
      'Segment Energetyki odnotował wzrost przychodów o 8,2%',
      'Rozwój sieci stacji paliw - 135 nowych lokalizacji w ciągu ostatnich 12 miesięcy',
      'Inwestycje w segmencie OZE osiągnęły 1,2 mld PLN w I kwartale',
      'Zakończenie procesu rebrandingu stacji Lotosu do marki Orlen'
    ],
    premium: false
  },
  {
    id: 'pknorlen-q1-2025',
    companyName: 'PKN Orlen',
    ticker: 'PKN.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PKN_ORLEN_logo.svg/1280px-PKN_ORLEN_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-23',
    reportDate: '2025-05-23',
    title: 'PKN Orlen - Wyniki za I kwartał 2025',
    reportCategory: ['Energy', 'Oil & Gas', 'Petrochemicals', 'Retail'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 78.4, change: -5.2, unit: 'B PLN' },
      operatingProfit: { value: 6.2, change: -18.7, unit: 'B PLN' },
      netIncome: { value: 4.8, change: -22.3, unit: 'B PLN' },
      eps: { value: 4.12, change: -21.8, unit: 'PLN' },
      ebitda: { value: 9.1, change: -15.4, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 70 + Math.random() * 20,
      priceChange: (Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: -8 + (Math.random() * 16),
      low52Week: 60 + Math.random() * 10,
      high52Week: 90 + Math.random() * 15,
      sharesOutstanding: 1170 + Math.random() * 30,
      averageDailyVolume: 2500000 + Math.random() * 1000000,
      volatility: 1.1 + Math.random() * 0.4
    },
    keyHighlights: [
      'Spadek EBITDA o 15,4% rok do roku w wyniku presji marż rafineryjnych',
      'Segment Energetyki odnotował wzrost przychodów o 8,2%',
      'Rozwój sieci stacji paliw - 135 nowych lokalizacji w ciągu ostatnich 12 miesięcy',
      'Inwestycje w segmencie OZE osiągnęły 1,2 mld PLN w I kwartale',
      'Zakończenie procesu rebrandingu stacji Lotosu do marki Orlen'
    ],
    premium: false
  }
];
