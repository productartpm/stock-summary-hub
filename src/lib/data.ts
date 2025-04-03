import type { SummaryDataItem, StockData } from './types';

export interface FinancialReport {
  id: string;
  companyName: string;
  ticker: string;
  logoUrl: string;
  reportType: 'Quarterly' | 'Annual';
  quarterOrYear: string;
  publicationDate: string;
  reportDate: string;
  title: string;
  reportCategory: string[];
  category?: string;
  summaryData: Record<string, SummaryDataItem>;
  keyHighlights: string[];
  financialPeriod?: string;
  outlook?: {
    statement: string;
    guidanceRevenue?: {
      min: number;
      max: number;
      unit: string;
    };
    guidanceEps?: {
      min: number;
      max: number;
      unit: string;
    };
  };
  analystReactions?: string[];
  premium?: boolean;
  stockData: StockData;
}

export const formatNumber = (value: number, unit?: string): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B${unit ? ' ' + unit : ''}`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M${unit ? ' ' + unit : ''}`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K${unit ? ' ' + unit : ''}`;
  } else {
    return `${value.toFixed(2)}${unit ? ' ' + unit : ''}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const reportCategories = [
  'Dywidenda',
  'Działalność finansowa',
  'Emisja akcji',
  'Emisja lub wykup obligacji',
  'Grupa kapitałowa',
  'Klasyfikacje giełdowe',
  'Koncesje, kontrole, regulacje',
  'Pozostałe',
  'Rozwój firmy',
  'Skup lub zbycie akcji własnych',
  'Split',
  'Spory, procesy, windykacja',
  'Sprawy kadrowe',
  'Terminy raportów okresowych',
  'Transakcje animatora',
  'Transakcje insidera',
  'Transakcje insidera lub znaczącego inwestora',
  'Transakcje pakietowe',
  'Walne Zgromadzenie',
  'Wejście znaczącego inwestora lub insidera',
  'Wyjście znaczącego inwestora lub insidera',
  'Wyniki',
  'Zdarzenia losowe',
  'Zmiana strategii',
  'Zmiany w kadrze zarządzającej',
  'Znacząca umowa'
];

export const financialReports: FinancialReport[] = [
  {
    id: 'columbus-energy-q3-2024',
    companyName: 'Columbus Energy',
    ticker: 'CLC.WA',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/columbus-energy--600.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-11-15',
    reportDate: '2024-11-15',
    title: 'Raport Kwartalny - Columbus Energy Q3 2024',
    reportCategory: ['Energy', 'Renewable Energy', 'Solar Power', 'Green Tech', 'ESG'],
    category: 'Wyniki',
    financialPeriod: '9M 2024',
    summaryData: {
      revenue: {
        value: 233.86,
        change: -35.85,
        unit: 'mln PLN'
      },
      operatingProfit: {
        value: 10.38,
        change: 134.5,
        unit: 'mln PLN'
      },
      netIncome: {
        value: -21.96,
        change: 63.37,
        unit: 'mln PLN'
      },
      ebitda: {
        value: 20.88,
        change: 206.14,
        unit: 'mln PLN'
      },
      eps: {
        value: -0.33,
        change: 60.24,
        unit: 'PLN'
      },
      cashFlow: {
        value: 14.2,
        change: 340.12,
        unit: 'mln PLN'
      }
    },
    stockData: {
      currentPrice: 8.95,
      priceChange: -1.32,
      yearToDateChange: -12.45,
      low52Week: 7.21,
      high52Week: 14.82,
      sharesOutstanding: 66.5,
      averageDailyVolume: 125000,
      volatility: 2.1
    },
    keyHighlights: [
      'Przychody spadły o 35,85% do 233,86 mln PLN w okresie 9 miesięcy zakończonym 30 września 2024 r., w porównaniu z analogicznym okresem 2023 r.',
      'Spółka zdołała przejść od straty operacyjnej do zysku operacyjnego w wysokości 10,38 mln PLN.',
      'EBITDA znacząco się poprawiła do 20,88 mln PLN, w porównaniu z ujemną EBITDA w poprzednim roku.',
      'Strata netto zmniejszyła się o 63,37% do -21,96 mln PLN, pokazując postęp w kierunku rentowności.',
      'Dalszy nacisk na instalacje fotowoltaiczne, które pozostają największym segmentem przychodów (135,38 mln PLN).',
      'Znaczący wzrost w segmencie "Pozostała sprzedaż" (48,45 mln PLN, +506,5% r/r) głównie dzięki usługom związanym z projektem magazynowania energii sprzedanym firmie DTEK.'
    ],
    outlook: {
      statement: 'Columbus Energy spodziewa się kontynuacji strategicznego repozycjonowania z naciskiem na ustanowienie platformy Columbus ONE w celu konsolidacji rynku energii odnawialnej w Polsce. Firma przewiduje powrót do wzrostu przychodów w 2025 roku, wraz z poprawą marżą dzięki zwiększonej efektywności operacyjnej.',
      guidanceRevenue: {
        min: 320,
        max: 350,
        unit: 'mln PLN'
      },
      guidanceEps: {
        min: -0.10,
        max: 0.05,
        unit: 'PLN'
      }
    },
    analystReactions: [
      'Analitycy dostrzegają znaczącą poprawę efektywności operacyjnej, co potwierdza powrót do dodatniej EBITDA i zmniejszenie straty netto.',
      'Reakcja rynku była ostrożnie pozytywna, z większością analityków utrzymujących rekomendacje TRZYMAJ, jednocześnie doceniając postępy spółki w restrukturyzacji.',
      'Obawy dotyczą nadal spadającej trajektorii przychodów w podstawowych segmentach biznesowych, ale strategiczne przesunięcie w kierunku usług o wyższej marży i rozwoju Columbus ONE jest postrzegane korzystnie.'
    ]
  },
  {
    id: 'jpmorgan-q3-2024',
    companyName: 'JPMorgan Chase',
    ticker: 'JPM',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J.P._Morgan_Logo_2008_1.svg/1280px-J.P._Morgan_Logo_2008_1.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-10-11',
    reportDate: '2024-10-11',
    title: 'JPMorgan Chase - Wyniki Finansowe za III Kwartał 2024',
    reportCategory: ['Banking', 'Financial Services', 'Investment Banking', 'Consumer Banking'],
    category: 'Wyniki',
    financialPeriod: 'Q3 2024',
    summaryData: {
      revenue: {
        value: 43.32,
        change: 5.2,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 17.8,
        change: 7.1,
        unit: 'B USD'
      },
      netIncome: {
        value: 13.92,
        change: 6.8,
        unit: 'B USD'
      },
      eps: {
        value: 4.87,
        change: 8.5,
        unit: 'USD'
      },
      cashFlow: {
        value: 22.4,
        change: 11.2,
        unit: 'B USD'
      },
      roa: {
        value: 1.35,
        change: 0.04,
        unit: '%'
      }
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
      'Rekordowe przychody w wysokości 43,32 mld USD za III kwartał 2024 r., wzrost o 5,2% rok do roku.',
      'Zysk netto wzrósł do 13,92 mld USD, o 6,8% w porównaniu z III kwartałem 2023 r.',
      'Zysk na akcję wzrósł o 8,5% do 4,87 USD, przekraczając oczekiwania analityków wynoszące 4,65 USD.',
      'Rezerwy na straty kredytowe wzrosły do 2,4 mld USD, odzwierciedlając utrzymującą się niepewność gospodarczą.',
      'Opłaty z tytułu bankowości inwestycyjnej wzrosły o 12% do 2,1 mld USD, napędzane silną aktywnością w obszarze fuzji i przejęć.',
      'Utrzymano silną pozycję kapitałową ze wskaźnikiem kapitału CET1 na poziomie 15,3%.'
    ],
    outlook: {
      statement: 'JPMorgan Chase utrzymuje pozytywne perspektywy na pozostałą część 2024 roku i na rok 2025, oczekując dalszego wzrostu w bankowości inwestycyjnej i zarządzaniu majątkiem, przy jednoczesnym zachowaniu ostrożności co do trendów w kredytach konsumenckich w niepewnym środowisku gospodarczym.',
      guidanceEps: {
        min: 18.5,
        max: 19.5,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Analitycy szeroko chwalili zdolność JPMorgana do generowania silnych wyników we wszystkich segmentach biznesowych pomimo trudności gospodarczych.',
      'Kilka zespołów badawczych podwyższyło swoje cele cenowe po ogłoszeniu wyników, ze średnim wzrostem o 8%.',
      'Wskaźniki jakości kredytów pozostają obszarem ściśle monitorowanym, chociaż obecne poziomy są postrzegane jako możliwe do zarządzania i odpowiednio zabezpieczone.'
    ],
    premium: true
  },
  {
    id: 'paypal-q3-2024',
    companyName: 'PayPal',
    ticker: 'PYPL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-10-29',
    reportDate: '2024-10-29',
    title: 'PayPal Holdings, Inc. - Wyniki za III Kwartał 2024',
    reportCategory: ['Fintech', 'Payment Processing', 'E-commerce', 'Digital Payments'],
    category: 'Działalność finansowa',
    financialPeriod: 'Q3 2024',
    summaryData: {
      revenue: {
        value: 8.12,
        change: 9.3,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 1.42,
        change: 11.8,
        unit: 'B USD'
      },
      netIncome: {
        value: 1.18,
        change: 15.2,
        unit: 'B USD'
      },
      eps: {
        value: 1.15,
        change: 18.6,
        unit: 'USD'
      },
      tpv: {
        value: 420.5,
        change: 12.2,
        unit: 'B USD'
      },
      activeAccounts: {
        value: 438,
        change: 2.1,
        unit: 'M'
      }
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
      'Przychody wzrosły o 9,3% rok do roku do 8,12 mld USD, przewyższając konsensus szacunków wynoszące 7,95 mld USD.',
      'Całkowita Wartość Płatności (TPV) wzrosła o 12,2% do 420,5 mld USD.',
      'Dodano 6,2 mln nowych aktywnych kont, osiągając łącznie 438 mln aktywnych kont.',
      'Marża transakcyjna wzrosła do 48,6%, o 70 punktów bazowych w porównaniu z poprzednim rokiem.',
      'TPV Venmo wzrosło o 18% rok do roku, znacząco przyczyniając się do ogólnego wzrostu.',
      'W ciągu kwartału przeprowadzono odkup akcji o wartości 1,5 mld USD.'
    ],
    outlook: {
      statement: 'PayPal podniósł swoją prognozę na cały rok, oczekując teraz wzrostu przychodów o 9,5-10% w 2024 roku. Firma nadal koncentruje się na integracji sztucznej inteligencji na swojej platformie w celu ulepszenia wykrywania oszustw i doświadczeń użytkowników, co ma na celu zwiększenie efektywności operacyjnej w 2025 roku.',
      guidanceRevenue: {
        min: 32.5,
        max: 33.0,
        unit: 'B USD'
      },
      guidanceEps: {
        min: 4.2,
        max: 4.3,
        unit: 'USD'
      }
    }
  },
  {
    id: 'disney-q4-2024',
    companyName: 'The Walt Disney Company',
    ticker: 'DIS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Walt_Disney_Studios_2023_logo.svg/2560px-Walt_Disney_Studios_2023_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q4 2024',
    publicationDate: '2024-11-07',
    reportDate: '2024-11-07',
    title: 'The Walt Disney Company - Wyniki IV Kwartału i Całego Roku 2024',
    reportCategory: ['Entertainment', 'Media', 'Streaming', 'Theme Parks'],
    category: 'Znacząca umowa',
    financialPeriod: 'Q4 2024',
    summaryData: {
      revenue: {
        value: 22.8,
        change: 3.5,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 3.7,
        change: 15.2,
        unit: 'B USD'
      },
      netIncome: {
        value: 2.4,
        change: 28.6,
        unit: 'B USD'
      },
      eps: {
        value: 1.42,
        change: 30.3,
        unit: 'USD'
      },
      dTCSubscribers: {
        value: 312,
        change: 14.8,
        unit: 'M'
      },
      parkRevenue: {
        value: 9.1,
        change: 7.2,
        unit: 'B USD'
      }
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
      'Przychody wzrosły o 3,5% rok do roku do 22,8 mld USD, nieznacznie poniżej oczekiwań wynoszących 23,1 mld USD.',
      'Segment Direct-to-Consumer osiągnął rentowność drugi kwartał z rzędu z zyskiem operacyjnym wynoszącym 380 mln USD.',
      'Liczba subskrybentów Disney+ wzrosła do 159 mln, a łączna liczba subskrybentów usług streamingowych (w tym Hulu i ESPN+) osiągnęła 312 mln.',
      'Segment Parków, Doświadczeń i Produktów odnotował wzrost przychodów o 7,2% do 9,1 mld USD, przy wzroście zysku operacyjnego o 8,3%.',
      'Przychody Studia Rozrywki spadły o 2,1% do 2,4 mld USD z powodu mniejszej liczby premier kinowych w porównaniu z poprzednim rokiem.',
      'Osiągnięto 7,5 mld USD oszczędności kosztów, przekraczając pierwotny cel 5,5 mld USD ustalony w lutym 2023 roku.'
    ],
    outlook: {
      statement: 'Disney spodziewa się, że rok obrotowy 2025 przyniesie dalszy wzrost rentowności streamingu i stabilne wyniki segmentu Parków pomimo niepewności gospodarczych. Firma przewiduje wzrost skorygowanego zysku na akcję o wysoki jednocyfrowy procent, koncentrując się na rozwijaniu swoich franczyz we wszystkich segmentach biznesowych.',
      guidanceEps: {
        min: 5.2,
        max: 5.5,
        unit: 'USD'
      }
    },
    premium: true
  },
  {
    id: 'cisco-q1-2025',
    companyName: 'Cisco Systems',
    ticker: 'CSCO',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2024-11-13',
    reportDate: '2024-11-13',
    title: 'Cisco - Wyniki za Pierwszy Kwartał Roku Obrotowego 2025',
    reportCategory: ['Technology', 'Networking', 'Cybersecurity', 'Infrastructure'],
    category: 'Rozwój firmy',
    financialPeriod: 'Q1 2025',
    summaryData: {
      revenue: {
        value: 13.9,
        change: 2.8,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 4.2,
        change: 3.4,
        unit: 'B USD'
      },
      netIncome: {
        value: 3.3,
        change: 2.1,
        unit: 'B USD'
      },
      eps: {
        value: 0.87,
        change: 3.6,
        unit: 'USD'
      },
      grossMargin: {
        value: 67.2,
        change: 0.7,
        unit: '%'
      },
      arpu: {
        value: 32.5,
        change: 5.2,
        unit: 'K USD'
      }
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
      'Przychody wzrosły o 2,8% rok do roku do 13,9 mld USD, nieznacznie powyżej oczekiwań wynoszących 13,8 mld USD.',
      'Przychody z produktów wzrosły o 1,9%, a przychody z usług o 4,8%.',
      'Przychody z segmentu bezpieczeństwa wzrosły o 15% rok do roku, odzwierciedlając silne wyniki w segmencie cyberbezpieczeństwa.',
      'Roczny Powtarzalny Przychód (ARR) osiągnął 27,3 mld USD, wzrost o 14% rok do roku.',
      'Przepływy pieniężne z działalności operacyjnej wyniosły 4,3 mld USD, wzrost o 6% rok do roku.',
      'Zwrócono akcjonariuszom 2,8 mld USD poprzez wykup akcji i dywidendy.'
    ],
    outlook: {
      statement: 'Cisco prognozuje wzrost przychodów w II kwartale roku obrotowego 2025 między 1% a 3%, z dalszą siłą w segmencie bezpieczeństwa i oprogramowania. Firma pozostaje skoncentrowana na swoich możliwościach sieciowych opartych na sztucznej inteligencji i wzroście ofert opartych na subskrypcji, które mają przyczynić się do rozszerzenia marży w czasie.',
      guidanceRevenue: {
        min: 54.5,
        max: 56.0,
        unit: 'B USD'
      },
      guidanceEps: {
        min: 3.56,
        max: 3.62,
        unit: 'USD'
      }
    },
    premium: true
  },
  {
    id: 'apple-q2-2024',
    companyName: 'Apple Inc.',
    ticker: 'AAPL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q2 2024',
    publicationDate: '2024-05-02',
    reportDate: '2024-05-02',
    title: 'Apple - Wyniki za Drugi Kwartał',
    reportCategory: ['Technology', 'Consumer Electronics', 'Hardware', 'Services'],
    category: 'Wyniki',
    financialPeriod: 'Q2 2024',
    summaryData: {
      revenue: {
        value: 94.83,
        change: 3.8,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 29.48,
        change: 2.3,
        unit: 'B USD'
      },
      netIncome: {
        value: 23.64,
        change: 5.2,
        unit: 'B USD'
      },
      eps: {
        value: 1.53,
        change: 6.3,
        unit: 'USD'
      },
      cashFlow: {
        value: 28.33,
        change: 1.1,
        unit: 'B USD'
      },
      iPhoneRevenue: {
        value: 46.28,
        change: 5.5,
        unit: 'B USD'
      }
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
      'Przychody z iPhone\'a wzrosły o 5,5% do 46,28 mld USD, przekraczając oczekiwania.',
      'Przychody z usług osiągnęły rekordowy poziom 23,87 mld USD, wzrost o 14,3% rok do roku.',
      'Marża brutto wzrosła do 46,6%, z 45,3% w tym samym kwartale ubiegłego roku.',
      'Zarząd zatwierdził dodatkowy wykup akcji o wartości 110 mld USD oraz 4% wzrost kwartalnej dywidendy.',
      'Segment akcesoriów, domu i wearables odnotował spadek o 7,6% do 7,91 mld USD.',
      'Na koniec kwartału gotówka i zbywalne papiery wartościowe wyniosły łącznie 167,2 mld USD.'
    ],
    outlook: {
      statement: 'Apple oczekuje dalszego wzrostu segmentów iPhone i Usług w trzecim kwartale roku obrotowego 2024, przy stopach wzrostu przychodów podobnych do drugiego kwartału. Jednak firma przewiduje, że ograniczenia w dostawach niektórych komponentów mogą wpłynąć na sprzedaż Mac i iPad w najbliższym czasie.',
      guidanceRevenue: {
        min: 90.0,
        max: 93.0,
        unit: 'B USD'
      },
      guidanceEps: {
        min: 1.48,
        max: 1.52,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Analitycy byli szczególnie pod wrażeniem wyników segmentu Usług, widząc w nim kluczowy czynnik przyszłego wzrostu i rozszerzania marży.',
      'Kilka banków inwestycyjnych podniosło swoje cele cenowe po lepszych niż oczekiwano wynikach, ze średnim wzrostem o około 7%.',
      'Pojawiły się pewne obawy dotyczące słabości w segmencie Wearables, co może wskazywać na wolniejszą adopcję nowszych produktów.'
    ],
    premium: true
  },
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
      revenue: {
        value: 96.77,
        change: 18.8,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 13.65,
        change: -13.4,
        unit: 'B USD'
      },
      netIncome: {
        value: 14.99,
        change: 19.5,
        unit: 'B USD'
      },
      eps: {
        value: 4.29,
        change: 18.0,
        unit: 'USD'
      },
      vehicleDeliveries: {
        value: 1.8,
        change: 38.0,
        unit: 'M'
      },
      energyStorage: {
        value: 14.7,
        change: 125.0,
        unit: 'GWh'
      }
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
      'Rekordowa liczba dostarczonych pojazdów: 1,8 miliona sztuk w 2023 roku, co stanowi wzrost o 38% rok do roku.',
      'Wdrożenia magazynów energii więcej niż podwoiły się do 14,7 GWh, napędzając wzrost przychodów z Wytwarzania i Magazynowania Energii o 54%.',
      'Marża brutto spadła do 18,2% z 23,8% w 2022 roku, głównie z powodu obniżek cen pojazdów.',
      'Przychody z segmentu motoryzacyjnego wzrosły o 15% do 82,4 mld USD, podczas gdy kredyty regulacyjne w motoryzacji osiągnęły 1,8 mld USD.',
      'Skumulowana liczba stacji Supercharger wzrosła do 5 117 na całym świecie, z 48 082 złączami.',
      'Środki pieniężne i ich ekwiwalenty wyniosły 29,1 mld USD na koniec roku.'
    ],
    outlook: {
      statement: 'Tesla oczekuje, że wzrost wolumenu pojazdów w 2024 roku będzie znacznie niższy niż stopa wzrostu osiągnięta w 2023 roku, ponieważ firma pracuje nad uruchomieniem pojazdów nowej generacji w Gigafactory Texas. Przewiduje się, że wdrożenia magazynów energii wzrosną o około 75% w 2024 roku, wspierane przez zwiększanie produkcji w fabryce Megapack o mocy 40 GWh w Lathrop.',
      guidanceEps: {
        min: 3.80,
        max: 4.50,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Wall Street wyraziło mieszane reakcje na prognozę Tesli, z obawami dotyczącymi zmniejszonych stóp wzrostu dostaw pojazdów wpływających na długoterminowe modele wyceny.',
      'Wielu analityków wyróżniło biznes energetyczny jako jasny punkt, z oczekiwaniami, że w nadchodzących latach może on stać się bardziej znaczącym czynnikiem ogólnej rentowności.',
      'Brak konkretnego harmonogramu dla nowych modeli i programu Robotaxi rozczarował niektórych analityków, którzy szukali bardziej konkretnych planów.'
    ]
  },
  {
    id: 'nvidia-q1-2025',
    companyName: 'NVIDIA Corporation',
    ticker: 'NVDA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Nvidia_logo.svg/1280px-Nvidia_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q1 2025',
    publicationDate: '2024-05-22',
    reportDate: '2024-05-22',
    title: 'NVIDIA - Wyniki Finansowe za Pierwszy Kwartał Roku Obrotowego 2025',
    reportCategory: ['Technology', 'Semiconductors', 'AI Computing', 'Graphics Processing', 'Data Center'],
    category: 'Wyniki',
    financialPeriod: 'Q1 FY2025',
    summaryData: {
      revenue: {
        value: 26.04,
        change: 262.0,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 16.09,
        change: 655.0,
        unit: 'B USD'
      },
      netIncome: {
        value: 14.88,
        change: 632.0,
        unit: 'B USD'
      },
      eps: {
        value: 5.98,
        change: 629.0,
        unit: 'USD'
      },
      dataCenter: {
        value: 22.60,
        change: 427.0,
        unit: 'B USD'
      },
      grossMargin: {
        value: 78.4,
        change: 12.3,
        unit: '%'
      }
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
      'Rekordowe przychody Centrum Danych w wysokości 22,6 mld USD, wzrost o 427% w porównaniu z rokiem poprzednim, napędzane rosnącym popytem na produkty architektury NVIDIA Hopper.',
      'Osiągnięto rekordową marżę brutto 78,4%, wzrost o 12,3 punktu procentowego rok do roku.',
      'Przychody z segmentu gier wyniosły 2,6 mld USD, wzrost o 18% w porównaniu z rokiem poprzednim.',
      'Przychody z Profesjonalnej Wizualizacji wyniosły 418 mln USD, wzrost o 75% w porównaniu z rokiem poprzednim.',
      'Przychody z segmentu motoryzacyjnego wyniosły 306 mld USD, wzrost o 4% w porównaniu z rokiem poprzednim.',
      'Zwrócono akcjonariuszom 7,7 mld USD poprzez wykup akcji i dywidendy w gotówce.'
    ],
    outlook: {
      statement: 'Na drugi kwartał roku obrotowego 2025 NVIDIA oczekuje, że bezprecedensowy popyt na jej platformy obliczeniowe AI będzie się utrzymywał. Firma przewiduje, że przychody Centrum Danych znacznie wzrosną sekwencyjnie, podczas gdy przychody z Gier powinny pozostać relatywnie płaskie kwartał do kwartału.',
      guidanceRevenue: {
        min: 28.0,
        max: 30.0,
        unit: 'B USD'
      }
    },
    analystReactions: [
      'Analitycy określili wyniki jako "zapierające dech w piersiach" i "spektakularne", przy czym wielu znacząco podniosło swoje cele cenowe po ogłoszeniu wyników.',
      'Siła przychodów Centrum Danych i perspektywa dalszego sekwencyjnego wzrostu przewyższyły nawet najbardziej optymistyczne oczekiwania.',
      'Niektórzy analitycy kwestionowali długoterminową stabilność obecnych stóp wzrostu i wysokich marż brutto, ale większość zgodziła się, że krótkoterminowy impet NVIDIA pozostaje wyjątkowo silny.'
    ],
    premium: true
  },
  {
    id: 'amazon-annual-2023',
    companyName: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    reportType: 'Annual',
    quarterOrYear: 'FY 2023',
    publicationDate: '2024-02-01',
    reportDate: '2024-02-01',
    title: 'Amazon.com - Wyniki Finansowe za Cały Rok 2023',
    reportCategory: ['E-commerce', 'Cloud Computing', 'Digital Content', 'Logistics', 'Retail'],
    category: 'Dywidenda',
    financialPeriod: 'FY 2023',
    summaryData: {
      revenue: {
        value: 574.78,
        change: 12.0,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 36.86,
        change: 218.0,
        unit: 'B USD'
      },
      netIncome: {
        value: 30.43,
        change: 2334.0,
        unit: 'B USD'
      },
      eps: {
        value: 2.90,
        change: 2248.0,
        unit: 'USD'
      },
      awsRevenue: {
        value: 90.8,
        change: 13.0,
        unit: 'B USD'
      },
      freeShipping: {
        value: 1.53,
        change: 14.0,
        unit: 'B Units'
      }
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
      'Sprzedaż netto wzrosła o 12% do 574,8 mld USD, w porównaniu z 514,0 mld USD w 2022 roku.',
      'Zysk operacyjny wzrósł do 36,9 mld USD, w porównaniu z 12,2 mld USD w 2022 roku.',
      'Zysk operacyjny AWS wzrósł do 25,4 mld USD, w porównaniu z 22,8 mld USD w 2022 roku.',
      'Segment Ameryki Północnej powrócił do rentowności z zyskiem operacyjnym 14,9 mld USD, w porównaniu ze stratą 2,8 mld USD w 2022 roku.',
      'Segment Międzynarodowy zmniejszył stratę operacyjną do 3,5 mld USD, w porównaniu z 7,7 mld USD w 2022 roku.',
      'Przepływy pieniężne z działalności operacyjnej wzrosły o 82% do 98,8 mld USD za dwanaście miesięcy.'
    ],
    outlook: {
      statement: 'Na pierwszy kwartał 2024 roku Amazon oczekuje, że sprzedaż netto wyniesie od 138,0 do 143,5 mld USD, co oznacza wzrost o 8-13% w porównaniu z pierwszym kwartałem 2023 roku. Firma przewiduje dalsze inwestycje w AWS, w tym znaczące postępy w możliwościach AI, przy jednoczesnym zachowaniu dyscypliny w zakresie nakładów inwestycyjnych.',
      guidanceRevenue: {
        min: 138.0,
        max: 143.5,
        unit: 'B USD'
      }
    },
    analystReactions: [
      'Wall Street zareagowało pozytywnie na znaczącą poprawę rentowności Amazona we wszystkich segmentach biznesowych, szczególnie w Ameryce Północnej i AWS.',
      'Analitycy podkreślili skuteczne działania firmy w zakresie redukcji kosztów, które pomogły przekształcić stratę netto w 2022 roku w znaczący zysk netto w 2023 roku.',
      'Oczekiwane dalsze inwestycje w możliwości AI zostały uznane za strategicznie ważne dla utrzymania konkurencyjnej pozycji AWS na rynku chmury.'
    ]
  },
  {
    id: 'pfizer-q3-2024',
    companyName: 'Pfizer Inc.',
    ticker: 'PFE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Pfizer_logo.svg/2560px-Pfizer_logo.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-10-29',
    reportDate: '2024-10-29',
    title: 'Pfizer - Wyniki za Trzeci Kwartał 2024',
    reportCategory: ['Healthcare', 'Pharmaceuticals', 'Biotechnology', 'Vaccines', 'Drug Manufacturing'],
    category: 'Sprawy kadrowe',
    financialPeriod: 'Q3 2024',
    summaryData: {
      revenue: {
        value: 17.84,
        change: 3.5,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 5.76,
        change: 8.3,
        unit: 'B USD'
      },
      netIncome: {
        value: 4.67,
        change: 12.6,
        unit: 'B USD'
      },
      eps: {
        value: 0.82,
        change: 13.9,
        unit: 'USD'
      },
      rndExpense: {
        value: 2.82,
        change: 5.6,
        unit: 'B USD'
      },
      nonCovid: {
        value: 16.53,
        change: 9.8,
        unit: 'B USD'
      }
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
      'Przychody z produktów non-COVID wzrosły o 9,8% operacyjnie do 16,53 mld USD, napędzane silnymi wynikami kluczowych marek.',
      'Przychody z portfolio onkologicznego wzrosły o 15,3% do 3,87 mld USD, w tym 42% wzrost z niedawno wprowadzonych produktów.',
      'Przychody z rodziny szczepionek Prevnar wzrosły globalnie o 12,7% do 2,32 mld USD.',
      'Wydatki na badania i rozwój wzrosły o 5,6% do 2,82 mld USD, odzwierciedlając dalsze inwestycje w pipeline.',
      'Zakończono trzy przejęcia w ukierunkowanych obszarach terapeutycznych, wzmacniając długoterminowe perspektywy wzrostu firmy.',
      'Produkty COVID-19 (Comirnaty i Paxlovid) wygenerowały 1,31 mld USD w III kwartale, poniżej oczekiwań ze względu na niższe wskaźniki szczepień.'
    ],
    outlook: {
      statement: 'Pfizer zawęził prognozę przychodów na cały rok 2024 do 69,0-71,0 mld USD, odzwierciedlając silne wyniki portfolio non-COVID, które zrównoważyły niższe przychody z produktów COVID-19. Firma oczekuje dalszego impulsu z nowych wprowadzeń produktów i pozostaje na dobrej drodze do realizacji inicjatyw redukcji kosztów o około 4 mld USD do końca 2024 roku.',
      guidanceRevenue: {
        min: 69.0,
        max: 71.0,
        unit: 'B USD'
      },
      guidanceEps: {
        min: 2.45,
        max: 2.65,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Analitycy ocenili kwartał pozytywnie, zwracając szczególną uwagę na siłę portfolio non-COVID, która zrównoważyła oczekiwany spadek przychodów z produktów COVID-19.',
      'Kilka zespołów badawczych utrzymało swoje rekomendacje "kupuj", powołując się na solidny pipeline firmy i udaną integrację ostatnich przejęć.',
      'Nadal utrzymują się pewne obawy dotyczące wygaśnięcia patentów na kluczowe leki w nadchodzących latach, choć zostały one częściowo zrównoważone optymizmem co do produktywności firmy w zakresie badań i rozwoju.'
    ]
  },
  {
    id: 'microsoft-annual-2024',
    companyName: 'Microsoft Corporation',
    ticker: 'MSFT',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    reportType: 'Annual',
    quarterOrYear: 'FY 2024',
    publicationDate: '2024-07-30',
    reportDate: '2024-07-30',
    title: 'Microsoft - Raport Roczny za Rok Obrotowy 2024',
    reportCategory: ['Technology', 'Software', 'Cloud Computing', 'AI', 'Enterprise Solutions'],
    category: 'Koncesje, kontrole, regulacje',
    financialPeriod: 'FY 2024',
    summaryData: {
      revenue: {
        value: 245.08,
        change: 14.9,
        unit: 'B USD'
      },
      operatingProfit: {
        value: 109.55,
        change: 21.8,
        unit: 'B USD'
      },
      netIncome: {
        value: 89.34,
        change: 18.7,
        unit: 'B USD'
      },
      eps: {
        value: 11.98,
        change: 18.4,
        unit: 'USD'
      },
      azureRevenue: {
        value: 91.24,
        change: 31.2,
        unit: 'B USD'
      },
      aiRevenue: {
        value: 12.67,
        change: 183.4,
        unit: 'B USD'
      }
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
      'Przychody wzrosły o 14,9% do rekordowych 245,1 mld USD, napędzane silnym wzrostem usług chmurowych i AI.',
      'Przychody Intelligent Cloud, w tym Azure, wzrosły o 22% do 114,8 mld USD.',
      'Liczba konsumenckich subskrybentów Microsoft 365 wzrosła do 82,5 mln, o 12% rok do roku.',
      'Przychody z usług AI, choć zaczynając od mniejszej bazy, wzrosły o 183% do 12,7 mld USD.',
      'Marża operacyjna wzrosła do 44,7%, poprawiając się o 2,5 punktu procentowego w porównaniu z rokiem obrotowym 2023.',
      'Zwrócono 67,3 mld USD akcjonariuszom poprzez dywidendy i wykup akcji.'
    ],
    outlook: {
      statement: 'Patrząc na rok obrotowy 2025, Microsoft oczekuje dalszego impetu w biznesie chmurowym i AI. Firma przewiduje dwucyfrowy wzrost przychodów i zysku operacyjnego, ze szczególną siłą w Azure i usługach AI. Oczekuje się, że nakłady inwestycyjne znacząco wzrosną, ponieważ firma nadal buduje infrastrukturę AI, aby sprostać rosnącemu popytowi.',
      guidanceRevenue: {
        min: 271.0,
        max: 277.0,
        unit: 'B USD'
      },
      guidanceEps: {
        min: 13.15,
        max: 13.55,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Analitycy Wall Street szeroko chwalili wyniki Microsoftu, przy czym wielu podkreślało wiodącą pozycję firmy w rozwiązaniach AI dla przedsiębiorstw.',
      'Silny wzrost w Azure, szczególnie komponentów AI, wzmocnił pewność co do długoterminowej trajektorii wzrostu Microsoftu.',
      'Niektórzy analitycy wyrazili obawy dotyczące planowanego wzrostu nakładów inwestycyjnych, ale większość uznała niezbędność tych inwestycji dla utrzymania przewagi konkurencyjnej Microsoftu w chmurze i AI.'
    ],
    premium: true
  }
];

for (let i = 1; i < financialReports.length; i++) {
  if (!financialReports[i].stockData) {
    financialReports[i].stockData = {
      currentPrice: 100 + Math.random() * 200,
      priceChange: (Math.random() * 10) * (Math.random() > 0.5 ? 1 : -1),
      yearToDateChange: (Math.random() * 30) * (Math.random() > 0.5 ? 1 : -1),
      low52Week: 80 + Math.random() * 50,
      high52Week: 150 + Math.random() * 200,
      sharesOutstanding: 50 + Math.random() * 950,
      averageDailyVolume: 100000 + Math.random() * 9900000,
      volatility: 1 + Math.random() * 3
    };
  }
  
  if (!financialReports[i].reportDate) {
    financialReports[i].reportDate = financialReports[i].publicationDate;
  }
}
