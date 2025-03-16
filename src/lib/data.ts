
import { format } from 'date-fns';

export type ReportType = 
  | 'Dywidenda'
  | 'Działalność finansowa'
  | 'Emisja akcji'
  | 'Emisja lub wykup obligacji'
  | 'Grupa kapitałowa'
  | 'Klasyfikacje giełdowe'
  | 'Koncesje, kontrole, regulacje'
  | 'Pozostałe'
  | 'Rozwój firmy'
  | 'Skup lub zbycie akcji własnych'
  | 'Split'
  | 'Spory, procesy, windykacja'
  | 'Sprawy kadrowe'
  | 'Terminy raportów okresowych'
  | 'Transakcje animatora'
  | 'Transakcje insidera'
  | 'Transakcje insidera lub znaczącego inwestora'
  | 'Transakcje pakietowe'
  | 'Walne Zgromadzenie';

export interface FinancialReport {
  id: string;
  companyName: string;
  ticker: string;
  logoUrl: string;
  title: string; // Added title field
  publicationDate: Date;
  quarterOrYear: string;
  financialPeriod: string;
  reportType: 'Quarterly' | 'Annual';
  reportCategory: ReportType[];
  summaryData: {
    revenue: {
      value: number;
      change: number;
      unit: string;
    };
    netIncome: {
      value: number;
      change: number;
      unit: string;
    };
    eps: {
      value: number;
      change: number;
      unit: string;
    };
    ebitda?: {
      value: number;
      change: number;
      unit: string;
    };
  };
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
  keyHighlights: string[];
  analystReactions?: string[];
}

// Helper function to create dates
const createDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Mock data for financial reports
export const financialReports: FinancialReport[] = [
  {
    id: '1',
    companyName: 'Apple Inc.',
    ticker: 'AAPL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    title: 'Q2 2024 Earnings Release',
    publicationDate: createDate(2),
    quarterOrYear: 'Q2',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Działalność finansowa', 'Rozwój firmy'],
    summaryData: {
      revenue: {
        value: 94.84,
        change: -4.3,
        unit: 'billion USD'
      },
      netIncome: {
        value: 23.6,
        change: -2.8,
        unit: 'billion USD'
      },
      eps: {
        value: 1.53,
        change: -0.8,
        unit: 'USD'
      },
      ebitda: {
        value: 33.2,
        change: -1.2,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Apple expects revenue for the June quarter to be similar to the year-ago quarter, with significant continued weakness in China offset by improvement in other emerging markets.",
      guidanceRevenue: {
        min: 81.8,
        max: 84.9,
        unit: 'billion USD'
      },
      guidanceEps: {
        min: 1.12,
        max: 1.22,
        unit: 'USD'
      }
    },
    keyHighlights: [
      "iPhone revenue decreased 10.5% year-over-year",
      "Services revenue reached an all-time high of $21.9 billion",
      "Repurchased $20 billion of Apple stock during the quarter",
      "Announced a 4% increase in quarterly dividend"
    ],
    analystReactions: [
      "Morgan Stanley maintains Overweight rating, though lowers price target to $216",
      "JP Morgan notes concern about iPhone performance in China, but remains positive on Services growth"
    ]
  },
  {
    id: '2',
    companyName: 'Microsoft Corporation',
    ticker: 'MSFT',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    title: 'Q3 FY24 Financial Results',
    publicationDate: createDate(3),
    quarterOrYear: 'Q3',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Grupa kapitałowa', 'Emisja akcji'],
    summaryData: {
      revenue: {
        value: 61.9,
        change: 17.0,
        unit: 'billion USD'
      },
      netIncome: {
        value: 21.9,
        change: 20.0,
        unit: 'billion USD'
      },
      eps: {
        value: 2.93,
        change: 20.1,
        unit: 'USD'
      },
      ebitda: {
        value: 30.6,
        change: 19.2,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Microsoft expects continued strong growth in its cloud business, with Azure expected to maintain growth above 30% in constant currency."
    },
    keyHighlights: [
      "Azure cloud revenue grew 31% year-over-year in constant currency",
      "AI services driving increased demand for cloud infrastructure",
      "Office 365 Commercial revenue increased 15%",
      "LinkedIn revenue up 10% year-over-year"
    ],
    analystReactions: [
      "Goldman Sachs raises price target to $450, maintains Buy rating",
      "Wedbush sees Microsoft as best positioned for the 'AI Revolution'"
    ]
  },
  {
    id: '3',
    companyName: 'Tesla, Inc.',
    ticker: 'TSLA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1280px-Tesla_Motors.svg.png',
    title: 'Q1 2024 Update Letter',
    publicationDate: createDate(5),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Sprawy kadrowe', 'Spory, procesy, windykacja'],
    summaryData: {
      revenue: {
        value: 21.3,
        change: -8.7,
        unit: 'billion USD'
      },
      netIncome: {
        value: 1.13,
        change: -55.0,
        unit: 'billion USD'
      },
      eps: {
        value: 0.34,
        change: -53.0,
        unit: 'USD'
      }
    },
    outlook: {
      statement: "Tesla maintains its prior guidance of industry-leading volume growth in 2024, but warned of a 'notably lower' growth rate compared to 2023."
    },
    keyHighlights: [
      "Vehicle deliveries fell 8.5% year-over-year to 386,810",
      "Automotive gross margin fell to 18.5% from 21.1% last year",
      "Energy generation and storage revenue up 7% to $1.64 billion",
      "Full Self-Driving (FSD) deployed to over 1 million vehicles"
    ],
    analystReactions: [
      "Bernstein maintains Underperform rating, citing increased competition",
      "Wedbush remains bullish long-term but expects 'bumpy road ahead'"
    ]
  },
  {
    id: '4',
    companyName: 'Amazon.com, Inc.',
    ticker: 'AMZN',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    title: 'First Quarter 2024 Financial Results',
    publicationDate: createDate(7),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Rozwój firmy', 'Dywidenda'],
    summaryData: {
      revenue: {
        value: 143.3,
        change: 12.5,
        unit: 'billion USD'
      },
      netIncome: {
        value: 10.4,
        change: 216.0,
        unit: 'billion USD'
      },
      eps: {
        value: 0.98,
        change: 214.0,
        unit: 'USD'
      },
      ebitda: {
        value: 25.8,
        change: 63.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Amazon expects Q2 2024 revenue between $144 billion and $149 billion, representing growth of 7-11% year-over-year."
    },
    keyHighlights: [
      "AWS revenue grew 17% year-over-year to $25 billion",
      "North America segment operating income doubled year-over-year",
      "Advertising revenue increased 24% to $11.8 billion",
      "Operating margin expanded to 8.3%, up from 3.8% in Q1 2023"
    ],
    analystReactions: [
      "JPMorgan raises price target to $225, citing margin expansion",
      "Bank of America highlights strength in AWS and advertising businesses"
    ]
  },
  {
    id: '5',
    companyName: 'Alphabet Inc.',
    ticker: 'GOOGL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Google_logo_%282010-2013%29.svg/2560px-Google_logo_%282010-2013%29.svg.png',
    title: 'Q1 2024 Earnings Report',
    publicationDate: createDate(10),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Koncesje, kontrole, regulacje', 'Transakcje pakietowe'],
    summaryData: {
      revenue: {
        value: 80.5,
        change: 15.0,
        unit: 'billion USD'
      },
      netIncome: {
        value: 23.7,
        change: 57.0,
        unit: 'billion USD'
      },
      eps: {
        value: 1.89,
        change: 58.0,
        unit: 'USD'
      },
      ebitda: {
        value: 32.8,
        change: 45.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Google did not provide specific financial guidance, but highlighted ongoing investments in AI across its products and services."
    },
    keyHighlights: [
      "Google Search revenue increased 14% year-over-year",
      "YouTube advertising revenue grew 21% to $8.1 billion",
      "Google Cloud revenue rose 28% to $9.6 billion, achieving profitability",
      "Board approved a quarterly dividend of $0.20 per share"
    ],
    analystReactions: [
      "Goldman Sachs maintains Buy rating with $205 price target",
      "Needham highlights positive trajectory in AI investments"
    ]
  },
  {
    id: '6',
    companyName: 'Meta Platforms, Inc.',
    ticker: 'META',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png',
    title: 'First Quarter 2024 Results',
    publicationDate: createDate(12),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Walne Zgromadzenie', 'Klasyfikacje giełdowe'],
    summaryData: {
      revenue: {
        value: 36.5,
        change: 27.0,
        unit: 'billion USD'
      },
      netIncome: {
        value: 12.4,
        change: 117.0,
        unit: 'billion USD'
      },
      eps: {
        value: 4.71,
        change: 114.0,
        unit: 'USD'
      },
      ebitda: {
        value: 18.2,
        change: 93.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Meta expects Q2 2024 revenue to be in the range of $36.5-39 billion, and anticipates full-year 2024 expenses to be $96-99 billion, lowered from the prior range of $97-100 billion."
    },
    keyHighlights: [
      "Daily Active Users across Meta's apps reached 3.24 billion, up 7% year-over-year",
      "Ad impressions delivered across Meta's apps increased 12% year-over-year",
      "Average price per ad increased 6% year-over-year",
      "Reality Labs operating loss was $3.8 billion for the quarter"
    ],
    analystReactions: [
      "Morgan Stanley raises price target to $550, maintains Overweight rating",
      "Jefferies highlights improved operational efficiency and ad targeting"
    ]
  },
  {
    id: '7',
    companyName: 'NVIDIA Corporation',
    ticker: 'NVDA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
    title: 'Q1 FY2025 Financial Results',
    publicationDate: createDate(15),
    quarterOrYear: 'Q1',
    financialPeriod: 'Feb-Apr 2024',
    reportType: 'Quarterly',
    reportCategory: ['Split', 'Transakcje insidera'],
    summaryData: {
      revenue: {
        value: 26.0,
        change: 262.0,
        unit: 'billion USD'
      },
      netIncome: {
        value: 14.9,
        change: 629.0,
        unit: 'billion USD'
      },
      eps: {
        value: 5.98,
        change: 629.0,
        unit: 'USD'
      },
      ebitda: {
        value: 17.0,
        change: 523.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "NVIDIA expects Q2 revenue of approximately $28 billion, plus or minus 2%, which would represent growth of 107% year-over-year."
    },
    keyHighlights: [
      "Data Center revenue reached $18.4 billion, up 427% year-over-year",
      "Gaming revenue was $2.6 billion, up 18% year-over-year",
      "Announced new Blackwell AI architecture with performance up to 30x faster than Hopper",
      "Gross margin expanded to 78.4% from 66.8% a year ago"
    ],
    analystReactions: [
      "Bank of America raises price target to $1,100, calls NVIDIA 'the defining company of the AI era'",
      "Rosenblatt Securities maintains Buy rating, citing continued AI demand"
    ]
  },
  {
    id: '8',
    companyName: 'Netflix, Inc.',
    ticker: 'NFLX',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    title: 'Q1 2024 Shareholder Letter',
    publicationDate: createDate(18),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Terminy raportów okresowych', 'Emisja lub wykup obligacji'],
    summaryData: {
      revenue: {
        value: 9.37,
        change: 14.7,
        unit: 'billion USD'
      },
      netIncome: {
        value: 2.33,
        change: 79.0,
        unit: 'billion USD'
      },
      eps: {
        value: 5.28,
        change: 79.0,
        unit: 'USD'
      },
      ebitda: {
        value: 2.95,
        change: 61.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Netflix expects Q2 2024 revenue to grow 16% year-over-year, with operating margin expanding to 26.8%."
    },
    keyHighlights: [
      "Global paid subscribers increased by 9.3 million to 269.6 million",
      "Ad-supported plan now represents over 40% of all sign-ups in markets where it's available",
      "Operating margin expanded to 28.1%, up from 21.0% a year ago",
      "Announced plans to stop reporting quarterly subscriber numbers starting in 2025"
    ],
    analystReactions: [
      "Goldman Sachs raises price target to $750, maintains Buy rating",
      "Citi notes potential for further operating margin expansion"
    ]
  },
  {
    id: '9',
    companyName: 'JPMorgan Chase & Co.',
    ticker: 'JPM',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J.P._Morgan_Logo_2008_1.svg/1280px-J.P._Morgan_Logo_2008_1.svg.png',
    title: 'First-Quarter 2024 Results',
    publicationDate: createDate(20),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Dywidenda', 'Działalność finansowa'],
    summaryData: {
      revenue: {
        value: 41.9,
        change: 8.0,
        unit: 'billion USD'
      },
      netIncome: {
        value: 13.4,
        change: -7.0,
        unit: 'billion USD'
      },
      eps: {
        value: 4.63,
        change: -6.0,
        unit: 'USD'
      },
      ebitda: {
        value: 19.2,
        change: -5.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "JPMorgan expects full-year 2024 net interest income of approximately $88 billion, slightly lower than previous guidance."
    },
    keyHighlights: [
      "Investment banking fees up 27% year-over-year",
      "Credit card spend increased 9% year-over-year",
      "Commercial banking loans up 3% year-over-year",
      "Asset & Wealth Management AUM up 17% to $3.3 trillion"
    ],
    analystReactions: [
      "Wells Fargo maintains Overweight rating, citing strong fee income growth",
      "Barclays notes concerns about net interest income outlook"
    ]
  },
  {
    id: '10',
    companyName: 'PayPal Holdings, Inc.',
    ticker: 'PYPL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png',
    title: 'Q1 2024 Earnings Release',
    publicationDate: createDate(22),
    quarterOrYear: 'Q1',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Rozwój firmy', 'Koncesje, kontrole, regulacje'],
    summaryData: {
      revenue: {
        value: 7.74,
        change: 8.2,
        unit: 'billion USD'
      },
      netIncome: {
        value: 1.02,
        change: 12.0,
        unit: 'billion USD'
      },
      eps: {
        value: 0.98,
        change: 17.0,
        unit: 'USD'
      },
      ebitda: {
        value: 1.56,
        change: 14.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "PayPal raised its full-year 2024 EPS growth outlook to approximately 15% from at least 13% previously."
    },
    keyHighlights: [
      "Total Payment Volume increased 14% to $403.9 billion",
      "Added 6.4 million net new active accounts",
      "Payment transactions per active account up 13% to 60.4",
      "Announced new strategic partnerships with Booking Holdings and Uber"
    ],
    analystReactions: [
      "Mizuho Securities maintains Buy rating with $125 price target",
      "Morgan Stanley highlights improved operating efficiency and TPV growth"
    ]
  },
  {
    id: '11',
    companyName: 'Walt Disney Company',
    ticker: 'DIS',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Disney_Logo.svg/2560px-Disney_Logo.svg.png',
    title: 'Q2 FY2024 Earnings Report',
    publicationDate: createDate(24),
    quarterOrYear: 'Q2',
    financialPeriod: 'Jan-Mar 2024',
    reportType: 'Quarterly',
    reportCategory: ['Grupa kapitałowa', 'Klasyfikacje giełdowe'],
    summaryData: {
      revenue: {
        value: 22.3,
        change: 1.3,
        unit: 'billion USD'
      },
      netIncome: {
        value: 2.4,
        change: 41.0,
        unit: 'billion USD'
      },
      eps: {
        value: 1.21,
        change: 30.0,
        unit: 'USD'
      },
      ebitda: {
        value: 4.2,
        change: 25.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Disney expects its streaming business to reach profitability in Q4 of fiscal 2024, with projected full-year EPS growth of 25%."
    },
    keyHighlights: [
      "Disney+ subscribers reached 112.7 million, up 4% year-over-year",
      "Parks & Experiences revenue increased 4% to $8.4 billion",
      "Entertainment segment operating income improved by $324 million",
      "Announced $3 billion share repurchase program for fiscal 2024"
    ],
    analystReactions: [
      "Bank of America maintains Buy rating with $130 price target",
      "JPMorgan highlights improved streaming economics and parks resilience"
    ]
  },
  {
    id: '12',
    companyName: 'Cisco Systems, Inc.',
    ticker: 'CSCO',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png',
    title: 'Q3 FY2024 Financial Results',
    publicationDate: createDate(26),
    quarterOrYear: 'Q3',
    financialPeriod: 'Feb-Apr 2024',
    reportType: 'Quarterly',
    reportCategory: ['Sprawy kadrowe', 'Emisja akcji'],
    summaryData: {
      revenue: {
        value: 12.7,
        change: -3.0,
        unit: 'billion USD'
      },
      netIncome: {
        value: 2.8,
        change: -7.0,
        unit: 'billion USD'
      },
      eps: {
        value: 0.72,
        change: -5.0,
        unit: 'USD'
      },
      ebitda: {
        value: 4.1,
        change: -4.0,
        unit: 'billion USD'
      }
    },
    outlook: {
      statement: "Cisco expects Q4 FY2024 revenue between $13.4 billion and $13.6 billion, with non-GAAP EPS of $0.84 to $0.86."
    },
    keyHighlights: [
      "Product order growth of 9% year-over-year",
      "Annualized Recurring Revenue (ARR) of $27.1 billion, up 6%",
      "Security revenue increased 3% year-over-year",
      "Returned $2.8 billion to shareholders through dividends and share repurchases"
    ],
    analystReactions: [
      "Goldman Sachs maintains Neutral rating with $52 price target",
      "Morgan Stanley notes encouraging order trends despite revenue decline"
    ]
  }
];

// Helper function to format date
export const formatDate = (date: Date): string => {
  return format(date, "MMM dd, yyyy 'at' h:mm a");
};

// Helper function to format financial numbers
export const formatNumber = (value: number, unit: string): string => {
  if (unit.toLowerCase().includes('billion')) {
    return `$${value.toFixed(1)}B`;
  } else if (unit.toLowerCase().includes('million')) {
    return `$${value.toFixed(1)}M`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

// Helper function to format percentage changes
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};
