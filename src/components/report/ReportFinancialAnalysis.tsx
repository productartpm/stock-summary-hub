
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
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Szczegółowa Analiza Finansowa</h1>
        <p className="text-gray-600">Kompleksowy przegląd wyników finansowych i ich interpretacja biznesowa</p>
      </div>
      
      <FinancialIntroduction report={report} />
      <RevenueOverview report={report} />
      <OperationalCosts report={report} />
      <ProfitabilityIndicators report={report} />

      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
        <p className="text-sm text-gray-700 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-gray-600">
          Analiza finansowa została przeprowadzona w oparciu o dostępne dane kwartalne oraz porównania rok do roku. 
          Szczegółowa ocena sytuacji finansowej wymaga dostępu do pełnych sprawozdań finansowych, 
          w tym bilansu i rachunku przepływów pieniężnych, które pozwoliłyby na pełniejszą analizę 
          płynności, zadłużenia oraz efektywności zarządzania kapitałem.
        </p>
      </div>
    </div>
  );
};
