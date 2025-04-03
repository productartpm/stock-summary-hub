
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
  },
  // Dodajemy 10 nowych nadchodzących raportów finansowych
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
  },
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
  },
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
      roe: { value: 12.4, change: 1.5, unit: '%' }
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
  }
];
