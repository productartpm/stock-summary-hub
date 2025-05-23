
import type { FinancialReport } from "@/lib/types";
import { FinancialIntroduction } from "./financial/FinancialIntroduction";
import { RevenueOverview } from "./financial/RevenueOverview";
import { OperationalCosts } from "./financial/OperationalCosts";
import { ProfitabilityIndicators } from "./financial/ProfitabilityIndicators";

interface ReportFinancialDataProps {
  report: FinancialReport;
}

export const ReportFinancialData = ({ report }: ReportFinancialDataProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Dane Finansowe</h2>
      
      <FinancialIntroduction report={report} />
      <RevenueOverview report={report} />
      <OperationalCosts report={report} />
      <ProfitabilityIndicators report={report} />
    </div>
  );
};
