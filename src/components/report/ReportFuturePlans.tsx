
import type { FinancialReport } from "@/lib/types";
import { ShortTermStrategy } from "./future-plans/ShortTermStrategy";
import { LongTermVision } from "./future-plans/LongTermVision";
import { StrategicChallenges } from "./future-plans/StrategicChallenges";

interface ReportFuturePlansProps {
  report: FinancialReport;
}

export const ReportFuturePlans = ({ report }: ReportFuturePlansProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Plany na Przyszłość</h1>
        <p className="text-gray-600">Strategiczne kierunki rozwoju spółki w perspektywie krótko- i długoterminowej</p>
      </div>

      <ShortTermStrategy report={report} />
      <LongTermVision report={report} />
      <StrategicChallenges />
    </div>
  );
};
