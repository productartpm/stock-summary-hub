
import type { FinancialReport } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialMetricsTable } from "./financial-analysis/FinancialMetricsTable";
import { InvestorInsights } from "./financial-analysis/InvestorInsights";
import { LegalDisclaimer } from "./financial-analysis/LegalDisclaimer";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  return (
    <div className="space-y-6">
      {/* Nagłówek sekcji */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Analiza Finansowa</h2>
        <p className="text-sm text-gray-600 mt-2">Szczegółowe porównanie wyników finansowych między okresami</p>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Wyniki Finansowe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Tabela z danymi finansowymi */}
          <FinancialMetricsTable report={report} />

          {/* Sekcja interpretacji */}
          <InvestorInsights report={report} />
        </CardContent>
      </Card>

      {/* Zastrzeżenie prawne */}
      <LegalDisclaimer />
    </div>
  );
};
