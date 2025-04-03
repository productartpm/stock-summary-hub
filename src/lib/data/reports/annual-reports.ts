
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
    stockData: // ... keep existing code (stock data object)
    keyHighlights: // ... keep existing code (key highlights array)
    outlook: // ... keep existing code (outlook object)
    premium: true
  }
];
