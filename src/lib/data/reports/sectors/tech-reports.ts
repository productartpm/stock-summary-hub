
import type { FinancialReport } from '@/lib/types';

export const techReports: FinancialReport[] = [
  {
    id: 'apple-annual-2024',
    companyName: 'Apple Inc.',
    ticker: 'AAPL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    reportType: 'Annual',
    quarterOrYear: 'FY 2024',
    publicationDate: '2024-04-28',
    reportDate: '2024-04-28',
    title: 'Apple - Raport Roczny 2024',
    reportCategory: ['Technology', 'Consumer Electronics', 'Hardware', 'Services'],
    category: 'Wyniki',
    financialPeriod: 'FY 2024',
    summaryData: {
      revenue: { value: 395.5, change: 5.2, unit: 'B USD' },
      operatingProfit: { value: 123.8, change: 6.7, unit: 'B USD' },
      netIncome: { value: 101.2, change: 7.3, unit: 'B USD' },
      eps: { value: 6.52, change: 8.1, unit: 'USD' },
      cashFlow: { value: 115.4, change: 4.2, unit: 'B USD' }
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
      'Rekordowy roczny przychód 395,5 mld USD, wzrost o 5,2% rok do roku',
      'Usługi stanowią już 25% całkowitych przychodów Apple',
      'Sprzedaż iPhone wzrosła o 3,8% pomimo nasycenia rynku',
      'Mocny wzrost w regionie Azji i Pacyfiku o 12,5%',
      'Uruchomienie Apple Intelligence jako strategicznego kierunku rozwoju AI'
    ],
    premium: true
  },
  {
    id: 'microsoft-annual-2024',
    companyName: 'Microsoft Corporation',
    ticker: 'MSFT',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    reportType: 'Annual',
    quarterOrYear: 'FY 2024',
    publicationDate: '2024-05-02',
    reportDate: '2024-05-02',
    title: 'Microsoft - Raport Roczny 2024',
    reportCategory: ['Technology', 'Cloud Computing', 'Software', 'AI'],
    category: 'Rozwój firmy',
    financialPeriod: 'FY 2024',
    summaryData: {
      revenue: { value: 242.8, change: 14.2, unit: 'B USD' },
      operatingProfit: { value: 108.5, change: 18.7, unit: 'B USD' },
      netIncome: { value: 89.4, change: 17.5, unit: 'B USD' },
      eps: { value: 12.05, change: 18.2, unit: 'USD' },
      cloudRevenue: { value: 118.3, change: 26.4, unit: 'B USD' }
    },
    stockData: {
      currentPrice: 350 + Math.random() * 50,
      priceChange: (Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 22 + (Math.random() * 10),
      low52Week: 300 + Math.random() * 20,
      high52Week: 400 + Math.random() * 50,
      sharesOutstanding: 7400 + Math.random() * 100,
      averageDailyVolume: 22000000 + Math.random() * 5000000,
      volatility: 0.9 + Math.random() * 0.5
    },
    keyHighlights: [
      'Przychody z chmury Azure wzrosły o 26,4%, napędzane usługami AI',
      'Segment Intelligent Cloud stanowi teraz 48,7% całkowitych przychodów',
      'Przejęcie Activision Blizzard w pełni zintegrowane z wynikami finansowymi',
      'Inwestycje w infrastrukturę AI przekroczyły 20 mld USD w ciągu roku',
      'Wzrost marży operacyjnej do 44,7% dzięki ekonomii skali w usługach chmurowych'
    ],
    premium: true
  },
  {
    id: 'allegro-q1-2025',
    companyName: 'Allegro',
    ticker: 'ALE.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Allegro.pl_logo.svg/1280px-Allegro.pl_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-04-12',
    reportDate: '2025-04-12',
    title: 'Allegro - Wyniki za I kwartał 2025',
    reportCategory: ['E-commerce', 'Retail', 'Technology'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 2.82, change: 15.4, unit: 'B PLN' },
      operatingProfit: { value: 0.42, change: 21.3, unit: 'B PLN' },
      netIncome: { value: 0.31, change: 18.7, unit: 'B PLN' },
      eps: { value: 0.29, change: 16.0, unit: 'PLN' },
      gmv: { value: 15.4, change: 13.8, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 40 + Math.random() * 10,
      priceChange: (Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 8 + (Math.random() * 12),
      low52Week: 35 + Math.random() * 5,
      high52Week: 55 + Math.random() * 8,
      sharesOutstanding: 1020 + Math.random() * 30,
      averageDailyVolume: 1200000 + Math.random() * 800000,
      volatility: 1.2 + Math.random() * 0.4
    },
    keyHighlights: [
      'GMV wzrósł o 13,8% rok do roku osiągając 15,4 mld PLN',
      'Liczba aktywnych kupujących przekroczyła 14,5 miliona',
      'Allegro Pay osiągnął 1,2 mld PLN udzielonych pożyczek',
      'Usługa Allegro Smart! ma już ponad 6 milionów subskrybentów',
      'Integracja Mall Group przynosi oczekiwane synergie kosztowe'
    ],
    premium: false
  },
  {
    id: 'cdprojekt-q1-2025',
    companyName: 'CD Projekt',
    ticker: 'CDR.WA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/CD_Projekt_logo.svg',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-04-20',
    reportDate: '2025-04-20',
    title: 'CD Projekt - Wyniki za I kwartał 2025',
    reportCategory: ['Gaming', 'Entertainment', 'Software Development'],
    category: 'Znacząca umowa',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 0.48, change: 128.6, unit: 'B PLN' },
      operatingProfit: { value: 0.25, change: 215.7, unit: 'B PLN' },
      netIncome: { value: 0.21, change: 198.3, unit: 'B PLN' },
      eps: { value: 2.08, change: 197.1, unit: 'PLN' },
      cashFlow: { value: 0.29, change: 124.8, unit: 'B PLN' }
    },
    stockData: {
      currentPrice: 150 + Math.random() * 50,
      priceChange: (Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 35 + (Math.random() * 20),
      low52Week: 120 + Math.random() * 20,
      high52Week: 220 + Math.random() * 30,
      sharesOutstanding: 100 + Math.random() * 5,
      averageDailyVolume: 800000 + Math.random() * 400000,
      volatility: 1.8 + Math.random() * 0.7
    },
    keyHighlights: [
      'Premiera nowej gry z uniwersum Wiedźmina przyczyniła się do skokowego wzrostu przychodów',
      'Sprzedaż Cyberpunk 2077 przekroczyła 30 milionów egzemplarzy',
      'Ogłoszenie współpracy strategicznej z Netflix przy kolejnych projektach',
      'Rozpoczęcie produkcji nowej marki opartej na oryginalnej własności intelektualnej',
      'Wzrost zatrudnienia o 15% w związku z rozwojem nowych projektów'
    ],
    premium: true
  },
  {
    id: 'nvidia-q1-2025',
    companyName: 'NVIDIA Corporation',
    ticker: 'NVDA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/1280px-Nvidia_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2025-05-15',
    reportDate: '2025-05-15',
    title: 'NVIDIA - Wyniki za I kwartał roku obrotowego 2025',
    reportCategory: ['Semiconductors', 'AI', 'Graphics', 'Data Centers'],
    category: 'Wyniki',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: { value: 32.5, change: 74.2, unit: 'B USD' },
      operatingProfit: { value: 21.8, change: 95.7, unit: 'B USD' },
      netIncome: { value: 18.4, change: 92.3, unit: 'B USD' },
      eps: { value: 7.42, change: 91.7, unit: 'USD' },
      dataCenterRevenue: { value: 24.8, change: 112.5, unit: 'B USD' }
    },
    stockData: {
      currentPrice: 950 + Math.random() * 200,
      priceChange: (Math.random() * 20) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: 80 + (Math.random() * 50),
      low52Week: 700 + Math.random() * 100,
      high52Week: 1200 + Math.random() * 150,
      sharesOutstanding: 2400 + Math.random() * 100,
      averageDailyVolume: 35000000 + Math.random() * 15000000,
      volatility: 1.6 + Math.random() * 0.8
    },
    keyHighlights: [
      'Rekordowe przychody z segmentu Data Center, wzrost o 112,5% rok do roku',
      'Wprowadzenie nowej generacji procesorów graficznych Blackwell',
      'Marża brutto wzrosła do 78,2%, z 72,5% w analogicznym kwartale ubiegłego roku',
      'Popyt na układy Nvidia dla centrów danych przewyższa podaż mimo zwiększenia mocy produkcyjnych',
      'Zapowiedź kolejnej generacji układów do trenowania AI na 2026 rok'
    ],
    premium: true
  }
];
