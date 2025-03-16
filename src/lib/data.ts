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
  },
  {
    id: 'apple-q2-2024',
    companyName: 'Apple Inc.',
    ticker: 'AAPL',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    reportType: 'Quarterly',
    quarterOrYear: 'Q2 2024',
    publicationDate: '2024-05-02',
    title: 'Apple Reports Second Quarter Results',
    reportCategory: ['Technology', 'Consumer Electronics', 'Hardware', 'Services'],
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
    keyHighlights: [
      'iPhone revenue increased 5.5% to $46.28 billion, exceeding expectations.',
      'Services revenue hit a record high of $23.87 billion, up 14.3% year-over-year.',
      'Gross margin improved to 46.6%, up from 45.3% in the same quarter last year.',
      'Board approved $110 billion in additional share repurchases and a 4% increase in quarterly dividend.',
      'Wearables, Home, and Accessories segment declined 7.6% to $7.91 billion.',
      'Cash and marketable securities totaled $167.2 billion at the end of the quarter.'
    ],
    outlook: {
      statement: 'Apple expects continued growth in iPhone and Services segments in the third quarter of fiscal 2024, with revenue growth rates similar to the second quarter. However, the company anticipates that supply constraints for certain components may impact Mac and iPad sales in the near term.',
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
      'Analysts were particularly impressed by the performance of the Services segment, seeing it as a key driver for future growth and margin expansion.',
      'Several investment banks raised their price targets following the better-than-expected results, with an average increase of approximately 7%.',
      'Some concerns were raised about the weakness in the Wearables segment, which may indicate slower adoption of newer products.'
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
    title: 'Tesla Annual Report 2023',
    reportCategory: ['Automotive', 'Electric Vehicles', 'Energy Generation', 'Storage', 'Clean Energy'],
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
    keyHighlights: [
      'Record vehicle deliveries of 1.8 million units in 2023, representing a 38% increase year-over-year.',
      'Energy storage deployments more than doubled to 14.7 GWh, driving a 54% increase in Energy Generation and Storage revenue.',
      'Gross margin decreased to 18.2% from 23.8% in 2022, primarily due to vehicle price reductions.',
      'Automotive revenue grew by 15% to $82.4 billion, while automotive regulatory credits reached $1.8 billion.',
      'Cumulative Supercharger stations increased to 5,117 globally, with 48,082 connectors.',
      'Cash and cash equivalents totaled $29.1 billion at year-end.'
    ],
    outlook: {
      statement: 'Tesla expects vehicle volume growth in 2024 to be notably lower than the growth rate achieved in 2023, as the company works on the launch of next-generation vehicles at Gigafactory Texas. Energy storage deployments are projected to grow approximately 75% in 2024, supported by the ramp of the 40 GWh Megapack factory in Lathrop.',
      guidanceEps: {
        min: 3.80,
        max: 4.50,
        unit: 'USD'
      }
    },
    analystReactions: [
      'Wall Street expressed mixed reactions to Tesla\'s forward guidance, with concerns about reduced growth rates for vehicle deliveries affecting long-term valuation models.',
      'Many analysts highlighted the Energy business as a bright spot, with expectations that it could become a more significant contributor to overall profitability in the coming years.',
      'The lack of specific timeline for new models and the Robotaxi program disappointed some analysts who were looking for more concrete plans.'
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
    title: 'NVIDIA Announces Financial Results for First Quarter Fiscal 2025',
    reportCategory: ['Technology', 'Semiconductors', 'AI Computing', 'Graphics Processing', 'Data Center'],
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
    keyHighlights: [
      'Record Data Center revenue of $22.6 billion, up 427% from a year ago, driven by accelerating demand for NVIDIA Hopper architecture products.',
      'Achieved record gross margin of 78.4%, up 12.3 percentage points year-over-year.',
      'Gaming revenue of $2.6 billion, up 18% from a year ago.',
      'Professional Visualization revenue of $418 million, up 75% from a year ago.',
      'Automotive revenue of $306 million, up 4% from a year ago.',
      'Returned $7.7 billion to shareholders through share repurchases and cash dividends.'
    ],
    outlook: {
      statement: 'For the second quarter of fiscal 2025, NVIDIA expects unprecedented demand to continue for its AI computing platforms. The company anticipates Data Center revenue to grow significantly sequentially, while Gaming revenue is expected to be relatively flat quarter-over-quarter.',
      guidanceRevenue: {
        min: 28.0,
        max: 30.0,
        unit: 'B USD'
      }
    },
    analystReactions: [
      'Analysts described the results as "mind-blowing" and "spectacular," with many raising their price targets substantially following the earnings release.',
      'The strength in Data Center revenue and the outlook for continued sequential growth surpassed even the most optimistic expectations.',
      'Some analysts questioned the sustainability of the current growth rates and high gross margins in the long term, but most agreed that NVIDIA\'s near-term momentum remains exceptionally strong.'
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
    title: 'Amazon.com Announces Full Year 2023 Financial Results',
    reportCategory: ['E-commerce', 'Cloud Computing', 'Digital Content', 'Logistics', 'Retail'],
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
    keyHighlights: [
      'Net sales increased 12% to $574.8 billion, compared with $514.0 billion in 2022.',
      'Operating income increased to $36.9 billion, compared with $12.2 billion in 2022.',
      'AWS operating income increased to $25.4 billion, compared with $22.8 billion in 2022.',
      'North America segment returned to profitability with $14.9 billion in operating income, compared with a loss of $2.8 billion in 2022.',
      'International segment reduced operating loss to $3.5 billion, compared with $7.7 billion in 2022.',
      'Operating cash flow increased 82% to $98.8 billion for the trailing twelve months.'
    ],
    outlook: {
      statement: 'For the first quarter of 2024, Amazon expects net sales to be between $138.0 billion and $143.5 billion, representing growth of 8-13% compared to first quarter 2023. The company anticipates continued investment in AWS, including significant advancements in AI capabilities, while maintaining discipline on capital expenditures.',
      guidanceRevenue: {
        min: 138.0,
        max: 143.5,
        unit: 'B USD'
      }
    },
    analystReactions: [
      'Wall Street reacted positively to Amazon\'s significant improvement in profitability across all business segments, particularly in North America and AWS.',
      'Analysts highlighted the company\'s effective cost-cutting measures, which helped transform a net loss in 2022 to substantial net income in 2023.',
      'The expected continued investment in AI capabilities was seen as strategically important for maintaining AWS\'s competitive position in the cloud market.'
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
    title: 'Pfizer Reports Third Quarter 2024 Results',
    reportCategory: ['Healthcare', 'Pharmaceuticals', 'Biotechnology', 'Vaccines', 'Drug Manufacturing'],
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
    keyHighlights: [
      'Non-COVID product revenue grew 9.8% operationally to $16.53 billion, driven by strong performance from key brands.',
      'Oncology portfolio revenue increased 15.3% to $3.87 billion, including 42% growth from recently launched products.',
      'Prevnar family of vaccines revenue increased 12.7% to $2.32 billion globally.',
      'R&D expenses increased 5.6% to $2.82 billion, reflecting continued investment in the pipeline.',
      'Completed three acquisitions in targeted therapeutic areas, strengthening the company\'s long-term growth prospects.',
      'COVID-19 products (Comirnaty and Paxlovid) generated $1.31 billion in Q3, down from expectations due to lower vaccination rates.'
    ],
    outlook: {
      statement: 'Pfizer narrowed its full-year 2024 revenue guidance to $69.0-$71.0 billion, reflecting strong performance from the non-COVID portfolio offset by lower COVID-19 product revenues. The company expects continued momentum from new product launches and remains on track to deliver on its cost-reduction initiatives of approximately $4 billion by the end of 2024.',
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
      'Analysts viewed the quarter positively, with particular focus on the strength of the non-COVID portfolio offsetting the expected decline in COVID-19 product revenues.',
      'Several equity research teams maintained their "buy" ratings, citing the company\'s robust pipeline and successful integration of recent acquisitions.',
      'Some concerns persisted about patent expirations for key drugs in the coming years, though these were partially offset by optimism about the company\'s R&D productivity.'
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
    title: 'Microsoft Annual Report Fiscal Year 2024',
    reportCategory: ['Technology', 'Software', 'Cloud Computing', 'AI', 'Enterprise Solutions'],
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
    keyHighlights: [
      'Revenue increased 14.9% to a record $245.1 billion, driven by strong cloud and AI services growth.',
      'Intelligent Cloud revenue, including Azure, grew 22% to $114.8 billion.',
      'Microsoft 365 consumer subscribers increased to 82.5 million, up 12% year-over-year.',
      'AI services revenue, though starting from a smaller base, grew by 183% to $12.7 billion.',
      'Operating margin expanded to 44.7%, improving by 2.5 percentage points from fiscal year 2023.',
      'Returned $67.3 billion to shareholders through dividends and share repurchases.'
    ],
    outlook: {
      statement: 'Looking ahead to fiscal year 2025, Microsoft expects continued momentum in its cloud and AI businesses. The company anticipates double-digit revenue and operating income growth, with particular strength in Azure and AI services. Capital expenditures are expected to increase significantly as the company continues to build out AI infrastructure to meet growing demand.',
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
      'Wall Street analysts widely praised Microsoft\'s performance, with many highlighting the company\'s leadership position in enterprise AI solutions.',
      'The strong growth in Azure, particularly the AI components, reinforced confidence in Microsoft\'s long-term growth trajectory.',
      'Some analysts expressed concerns about the planned increase in capital expenditures, but most acknowledged the necessity of these investments to maintain Microsoft\'s competitive advantage in cloud and AI.'
    ],
    premium: true
  }
];
