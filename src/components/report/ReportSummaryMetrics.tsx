
import { formatNumber, formatPercentage } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportSummaryMetricsProps {
  report: FinancialReport;
}

export const ReportSummaryMetrics = ({ report }: ReportSummaryMetricsProps) => {
  // Function to translate key names to Polish
  const translateKey = (key: string) => {
    const translations: Record<string, string> = {
      revenue: "Przychody",
      netIncome: "Zysk Netto",
      operatingProfit: "Zysk Operacyjny",
      eps: "Zysk na Akcję",
      marketCap: "Kapitalizacja",
      peRatio: "Wskaźnik P/E",
      dividendYield: "Stopa Dywidendy",
      debtToEquity: "Zadłużenie/Kapitał",
      currentRatio: "Wskaźnik Płynności",
      quickRatio: "Wskaźnik Szybki",
      returnOnEquity: "ROE",
      priceSales: "Cena/Przychody"
    };
    
    return translations[key] || key.replace(/([A-Z])/g, ' $1').trim();
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Podsumowanie Finansowe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(report.summaryData).map(([key, data]) => (
          <div key={key} className="bg-neutral-800 rounded-lg p-4 border border-amber-400 text-white shadow-md hover:shadow-lg transition-shadow">
            <div className="text-sm font-medium mb-1 capitalize text-amber-300">
              {translateKey(key)}
            </div>
            <div className="text-2xl font-bold text-white">
              {typeof data.value === 'number' 
                ? formatNumber(data.value, data.unit) 
                : data.value}
            </div>
            <div className={`text-sm flex items-center ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.change >= 0 ? '↑' : '↓'} {formatPercentage(data.change)}
              <span className="text-xs text-gray-400 ml-2">vs poprzedni {report.reportType === 'Quarterly' ? 'kwartał' : 'rok'}</span>
            </div>
          </div>
        ))}
      </div>
      
      {report.financialPeriod && (
        <div className="text-sm text-neutral-600 mb-2 bg-neutral-200 p-2 rounded-md inline-block">
          <span className="font-medium">Okres finansowy:</span> {report.financialPeriod}
        </div>
      )}
    </div>
  );
};
