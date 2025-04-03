
import { techReports } from './tech-reports';
import { energyReports } from './energy-reports';
import { financialReports } from './financial-reports';
import { telecomReports } from './telecom-reports';
import { automotiveReports } from './automotive-reports';
import { miningReports } from './mining-reports';
import type { FinancialReport } from '@/lib/types';

// Combine all sector reports
export const annualReports: FinancialReport[] = [
  ...automotiveReports,
  ...techReports,
  ...energyReports,
  ...financialReports,
  ...telecomReports,
  ...miningReports
];
