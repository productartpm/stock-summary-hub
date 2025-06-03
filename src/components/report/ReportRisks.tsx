
import type { FinancialReport } from "@/lib/types";
import { MacroeconomicRisks } from "./risks/MacroeconomicRisks";
import { OperationalRisks } from "./risks/OperationalRisks";
import { FinancialRisks } from "./risks/FinancialRisks";
import { StrategicRisks } from "./risks/StrategicRisks";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analiza Ryzyk Biznesowych</h1>
        <p className="text-gray-600">Kompleksowa ocena czynników ryzyka wpływających na działalność spółki</p>
      </div>
      
      <MacroeconomicRisks report={report} />
      <OperationalRisks report={report} />
      <FinancialRisks report={report} />
      <StrategicRisks report={report} />

      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
        <p className="text-sm text-gray-700 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-gray-600">
          Analiza ryzyk opiera się na dostępnych danych finansowych, trendach branżowych oraz standardowych metodologiach oceny ryzyka. 
          Szczegółowa kwantyfikacja poszczególnych rodzajów ryzyka wymaga dostępu do wewnętrznych danych spółki, 
          systemów risk management oraz stresstestów scenariuszowych.
        </p>
      </div>
    </div>
  );
};
