
import type { FinancialReport } from "@/lib/types";
import { MarketSegmentAnalysis } from "./trends/MarketSegmentAnalysis";
import { IndustryTrends } from "./trends/IndustryTrends";
import { RegulatoryEnvironment } from "./trends/RegulatoryEnvironment";
import { ConsumerBehaviorEvolution } from "./trends/ConsumerBehaviorEvolution";
import { MarketPerspectives } from "./trends/MarketPerspectives";

interface ReportTrendsProps {
  report: FinancialReport;
}

export const ReportTrends = ({ report }: ReportTrendsProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analiza Trendów Rynkowych</h1>
        <p className="text-gray-600">Szczegółowe omówienie tendencji branżowych i ich wpływu na działalność spółki</p>
      </div>
      
      <MarketSegmentAnalysis report={report} />
      <IndustryTrends report={report} />
      <RegulatoryEnvironment report={report} />
      <ConsumerBehaviorEvolution report={report} />
      <MarketPerspectives report={report} />

      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
        <p className="text-sm text-gray-700 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-gray-600">
          Analiza trendów rynkowych opiera się na dostępnych danych publicznych, raportach branżowych oraz 
          obserwacji zmian w otoczeniu regulacyjnym i konkurencyjnym. Szczegółowe prognozy rynkowe wymagają 
          dostępu do specjalistycznych baz danych i analiz sektorowych prowadzonych przez wyspecjalizowane 
          firmy doradcze i instytucje badawcze.
        </p>
      </div>
    </div>
  );
};
