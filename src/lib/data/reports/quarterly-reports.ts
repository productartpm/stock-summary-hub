import type { FinancialReport } from '@/lib/types';

export const quarterlyReports: FinancialReport[] = [
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
    reportSummary: {
      text: 'Columbus Energy wykazuje pozytywne oznaki transformacji operacyjnej, z powrotem do dodatniej EBITDA i znaczącym zmniejszeniem straty netto pomimo spadku przychodów. Restrukturyzacja i przesunięcie w stronę usług o wyższej marży zaczyna przynosić rezultaty, ale spółka nadal jest na drodze do pełnej rentowności.',
      sentiment: 'neutral'
    },
    premium: false
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
    reportSummary: {
      text: 'JPMorgan Chase osiągnął rekordowe wyniki w trzecim kwartale 2024 roku, z solidnym wzrostem przychodów i zysków we wszystkich segmentach biznesowych. Bank wykazuje silną odporność na niepewność gospodarczą dzięki zdywersyfikowanemu modelowi biznesowemu i skutecznemu zarządzaniu ryzykiem.',
      sentiment: 'positive'
    },
    premium: false
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
    },
    reportSummary: {
      text: 'PayPal kontynuuje silny wzrost, z wynikami przekraczającymi oczekiwania analityków w trzecim kwartale 2024 roku. Firma skutecznie zwiększa bazę użytkowników i poprawia marże, jednocześnie inwestując w technologie AI dla dalszego rozwoju. Podniesienie prognozy na cały rok odzwierciedla rosnące zaufanie zarządu do modelu biznesowego i strategii firmy.',
      sentiment: 'positive'
    },
    premium: false
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
      }
    },
    analystReactions: [
      'Analitycy byli szczególnie pod wrażeniem wyników segmentu Usług, widząc w nim kluczowy czynnik przyszłego wzrostu i rozszerzania marży.',
      'Kilka banków inwestycyjnych podniosło swoje cele cenowe po lepszych niż oczekiwano wynikach, ze średnim wzrostem o około 7%.',
      'Pojawiły się pewne obawy dotyczące słabości w segmencie Wearables, co może wskazywać na wolniejszą adopcję nowszych produktów.'
    ],
    premium: true
  }
];
