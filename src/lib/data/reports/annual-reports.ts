
import { techReports } from './sectors/tech-reports';
import { energyReports } from './sectors/energy-reports';
import { financialReports } from './sectors/financial-reports';
import { telecomReports } from './sectors/telecom-reports';
import { automotiveReports } from './sectors/automotive-reports';
import { miningReports } from './sectors/mining-reports';

export const annualReports = [
  ...automotiveReports,
  ...techReports,
  ...energyReports,
  ...financialReports,
  ...telecomReports,
  ...miningReports
];
