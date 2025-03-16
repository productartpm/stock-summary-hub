
import { formatNumber, formatPercentage } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";

interface ReportSummaryMetricsProps {
  report: FinancialReport;
}

export const ReportSummaryMetrics = ({ report }: ReportSummaryMetricsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {Object.entries(report.summaryData).map(([key, data]) => (
        <div key={key} className="bg-card rounded-lg p-4 border border-border">
          <div className="text-sm font-medium mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </div>
          <div className="text-2xl font-bold">
            {typeof data.value === 'number' 
              ? formatNumber(data.value, data.unit) 
              : data.value}
          </div>
          <div className={`text-sm ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(data.change)}
          </div>
        </div>
      ))}
    </div>
  );
};
