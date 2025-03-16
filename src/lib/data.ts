import type { SummaryDataItem } from './types';

export interface FinancialReport {
  id: string;
  companyName: string;
  ticker: string;
  logoUrl: string;
  reportType: 'Quarterly' | 'Annual';
  quarterOrYear: string;
  publicationDate: string;
  title: string;
  reportCategory: string[];
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
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const financialReports: FinancialReport[] = [
  {
    id: 'columbus-energy-q3-2024',
    companyName: 'Columbus Energy',
    ticker: 'CLC.WA',
    logoUrl: 'https://s3-symbol-logo.tradingview.com/columbus-energy--600.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q3 2024',
    publicationDate: '2024-11-15',
    title: 'Quarterly Financial Report - Columbus Energy Q3 2024',
    reportCategory: ['Energy', 'Renewable Energy', 'Solar Power', 'Green Tech', 'ESG'],
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
    keyHighlights: [
      'Revenue decreased by 35.85% to 233.86 million PLN for the 9 months ending September 30, 2024, compared to the same period of 2023.',
      'The company managed to turn around from an operating loss to an operating profit of 10.38 million PLN.',
      'EBITDA significantly improved to 20.88 million PLN, compared to a negative EBITDA in the previous year.',
      'Net loss decreased by 63.37% to -21.96 million PLN, showing progress towards profitability.',
      'Continued focus on photovoltaic installations, which remains the largest revenue segment (135.38 million PLN).',
      'Significant growth in the "Other sales" segment (48.45 million PLN, +506.5% YoY) primarily due to services related to energy storage project sold to DTEK.'
    ],
    outlook: {
      statement: 'Columbus Energy expects to continue its strategic repositioning with a focus on establishing the Columbus ONE platform to consolidate the renewable energy market in Poland. The company anticipates returning to revenue growth in 2025, with improving margins as operations become more efficient.',
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
      'Analysts recognize the significant improvement in operational efficiency, as demonstrated by the return to positive EBITDA and reduced net loss.',
      'The market response has been cautiously positive, with most analysts maintaining HOLD ratings while acknowledging the company\'s progress in restructuring.',
      'Concerns remain about the declining revenue trajectory in core business segments, but the strategic shift towards higher-margin services and Columbus ONE development is viewed favorably.'
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
    title: 'JPMorgan Chase Reports Third Quarter 2024 Financial Results',
    reportCategory: ['Banking', 'Financial Services', 'Investment Banking', 'Consumer Banking'],
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
    keyHighlights: [
      'Record revenue of $43.32 billion for Q3 2024, a 5.2% increase year-over-year.',
      'Net income rose to $13.92 billion, up 6.8% compared to Q3 2023.',
      'Earnings per share increased by 8.5% to $4.87, exceeding analyst expectations of $4.65.',
      'Credit loss provisions increased to $2.4 billion, reflecting continued economic uncertainty.',
      'Investment banking fees grew by 12% to $2.1 billion, driven by strong M&A activity.',
      'Maintained strong capital position with CET1 capital ratio of 15.3%.'
    ],
    outlook: {
      statement: 'JPMorgan Chase maintains a positive outlook for the remainder of 2024 and into 2025, expecting continued growth in investment banking and wealth management, while remaining cautious about consumer credit trends in an uncertain economic environment.',
      guidanceEps: {
        min: 18.5,
        max: 19.5,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Analysts widely praised JPMorgan\'s ability to generate strong results across all business segments despite economic headwinds.',
      'Several equity research teams upgraded their price targets following the earnings release, with an average increase of 8%.',
      'Credit quality metrics remain a closely watched area, though current levels are seen as manageable and appropriately provisioned for.'
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
    title: 'PayPal Holdings, Inc. Q3 2024 Results',
    reportCategory: ['Fintech', 'Payment Processing', 'E-commerce', 'Digital Payments'],
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
    keyHighlights: [
      'Revenue grew 9.3% year-over-year to $8.12 billion, beating consensus estimates of $7.95 billion.',
      'Total Payment Volume (TPV) increased 12.2% to $420.5 billion.',
      'Added 6.2 million net new active accounts, bringing the total to 438 million active accounts.',
      'Transaction margin improved to 48.6%, up 70 basis points from the previous year.',
      'Venmo TPV grew 18% year-over-year, contributing significantly to overall growth.',
      'Completed $1.5 billion in share repurchases during the quarter.'
    ],
    outlook: {
      statement: 'PayPal raised its full-year guidance, now expecting revenue growth of 9.5-10% for 2024. The company continues to focus on artificial intelligence integration across its platform to enhance fraud detection and user experience, which is expected to drive operating efficiencies in 2025.',
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
    title: 'The Walt Disney Company Reports Fourth Quarter and Full Year Earnings for Fiscal 2024',
    reportCategory: ['Entertainment', 'Media', 'Streaming', 'Theme Parks'],
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
    keyHighlights: [
      'Revenue rose 3.5% year-over-year to $22.8 billion, slightly below expectations of $23.1 billion.',
      'Direct-to-Consumer segment reached profitability for the second consecutive quarter with operating income of $380 million.',
      'Disney+ subscribers grew to 159 million, with total streaming subscribers (including Hulu and ESPN+) reaching 312 million.',
      'Parks, Experiences and Products segment saw 7.2% revenue growth to $9.1 billion with operating income up 8.3%.',
      'Studio Entertainment revenue declined 2.1% to $2.4 billion due to fewer theatrical releases compared to the prior year.',
      'Achieved $7.5 billion in cost reductions, exceeding the original target of $5.5 billion set in February 2023.'
    ],
    outlook: {
      statement: 'Disney expects fiscal 2025 to see continued growth in streaming profitability and stable performance from its Parks business despite economic uncertainties. The company anticipates high-single-digit growth in adjusted EPS, with a focus on expanding its franchises across all business segments.',
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
    title: 'Cisco Reports First Quarter Earnings for Fiscal Year 2025',
    reportCategory: ['Technology', 'Networking', 'Cybersecurity', 'Infrastructure'],
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
    keyHighlights: [
      'Revenue increased 2.8% year-over-year to $13.9 billion, slightly above expectations of $13.8 billion.',
      'Product revenue grew by 1.9% while service revenue increased by 4.8%.',
      'Security revenue grew 15% year-over-year, reflecting strong performance in the cybersecurity segment.',
      'Annualized Recurring Revenue (ARR) reached $27.3 billion, up 14% year-over-year.',
      'Operating cash flow of $4.3 billion, up 6% year-over-year.',
      'Returned $2.8 billion to shareholders through share repurchases and dividends.'
    ],
    outlook: {
      statement: 'Cisco projects Q2 FY2025 revenue growth between 1% and 3%, with continued strength in security and software. The company remains focused on its AI-driven networking capabilities and growth in subscription-based offerings, which are expected to contribute to margin expansion over time.',
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
  }
];
