
import type { FinancialReport } from '@/lib/types';

export const annualReports: FinancialReport[] = [
  {
    id: 'tesla-annual-2023',
    companyName: 'Tesla, Inc.',
    ticker: 'TSLA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Tesla_Motors_logo.svg/1280px-Tesla_Motors_logo.svg.png',
    reportType: 'Annual',
    quarterOrYear: 'FY 2023',
    publicationDate: '2024-01-24',
    reportDate: '2024-01-24',
    title: 'Tesla - Raport Roczny 2023',
    reportCategory: ['Automotive', 'Electric Vehicles', 'Energy Generation', 'Storage', 'Clean Energy'],
    category: 'Zmiana strategii',
    financialPeriod: 'FY 2023',
    summaryData: {
      revenue: { value: 96.77, change: 18.8, unit: 'B USD' },
      operatingProfit: { value: 13.65, change: -13.4, unit: 'B USD' },
      netIncome: { value: 14.99, change: 19.5, unit: 'B USD' },
      eps: { value: 4.29, change: 18.0, unit: 'USD' },
      vehicleDeliveries: { value: 1.8, change: 38.0, unit: 'M' },
      energyStorage: { value: 14.7, change: 85.0, unit: 'GWh' }
    },
    stockData: {
      currentPrice: 100 + Math.random() * 200,
      priceChange: (Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: (Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1),
      low52Week: 80 + Math.random() * 50,
      high52Week: 150 + Math.random() * 200,
      sharesOutstanding: 50 + Math.random() * 950,
      averageDailyVolume: 100000 + Math.random() * 9900000,
      volatility: 1 + Math.random() * 3
    },
    keyHighlights: [
      'Rekordowy przychód roczny 96,77 mld USD, wzrost o 18,8% rok do roku',
      'Wzrost dostaw pojazdów o 38% do 1,8 mln jednostek',
      'Spadek marży operacyjnej ze względu na obniżki cen i inwestycje w rozwój',
      'Znaczący wzrost w segmencie magazynowania energii o 85%',
      'Rozpoczęcie produkcji Cybertrucka i rozbudowa globalnych mocy produkcyjnych',
      'Silna pozycja gotówkowa umożliwiająca dalsze inwestycje w rozwój'
    ],
    outlook: {
      statement: 'Tesla przewiduje dalszy wzrost dostaw pojazdów w 2024 roku, choć w wolniejszym tempie. Firma koncentruje się na optymalizacji kosztów produkcji i rozwoju nowych technologii, w tym autonomicznej jazdy. Oczekuje się, że segment magazynowania energii będzie nadal rósł w szybkim tempie.',
      guidanceRevenue: {
        min: 110.0,
        max: 120.0,
        unit: 'B USD'
      },
      guidanceEps: {
        min: 4.5,
        max: 5.0,
        unit: 'USD'
      }
    },
    premium: true
  }
];

