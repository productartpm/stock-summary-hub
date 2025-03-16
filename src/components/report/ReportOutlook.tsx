
import { formatNumber } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";

interface ReportOutlookProps {
  report: FinancialReport;
}

export const ReportOutlook = ({ report }: ReportOutlookProps) => {
  if (!report.outlook) {
    return <p className="text-muted-foreground">No outlook information available.</p>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Future Outlook</h2>
      <p className="mb-4">{report.outlook.statement}</p>
      
      {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {report.outlook.guidanceRevenue && (
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Revenue Guidance</div>
              <div className="text-xl font-bold">
                {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
              </div>
            </div>
          )}
          
          {report.outlook.guidanceEps && (
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">EPS Guidance</div>
              <div className="text-xl font-bold">
                {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
