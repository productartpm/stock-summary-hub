
import { annualReports } from './annual-reports';
import { quarterlyReports } from './quarterly-reports';
import type { FinancialReport } from '@/lib/types';

export const financialReports: FinancialReport[] = [
  ...quarterlyReports,
  ...annualReports
];
