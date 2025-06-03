
import type { FinancialReport } from "@/lib/types";
import { FinancialIntroduction } from "./financial/FinancialIntroduction";
import { RevenueOverview } from "./financial/RevenueOverview";
import { OperationalCosts } from "./financial/OperationalCosts";
import { ProfitabilityIndicators } from "./financial/ProfitabilityIndicators";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Szczegółowa Analiza Finansowa</h2>
        <p className="text-gray-600 mt-2 pl-4">Kompleksowy przegląd wyników finansowych i ich interpretacja biznesowa</p>
      </div>
      
      <FinancialIntroduction report={report} />
      <RevenueOverview report={report} />
      <OperationalCosts report={report} />
      <ProfitabilityIndicators report={report} />

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-900 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-blue-800">
          Analiza finansowa została przeprowadzona w oparciu o dostępne dane kwartalne oraz porównania rok do roku. 
          Szczegółowa ocena sytuacji finansowej wymaga dostępu do pełnych sprawozdań finansowych, 
          w tym bilansu i rachunku przepływów pieniężnych, które pozwoliłyby na pełniejszą analizę 
          płynności, zadłużenia oraz efektywności zarządzania kapitałem.
        </p>
      </div>
    </div>
  );
};
