
import { formatNumber } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Target, Zap } from "lucide-react";

interface ReportOutlookProps {
  report: FinancialReport;
}

export const ReportOutlook = ({ report }: ReportOutlookProps) => {
  if (!report.outlook) {
    return <p className="text-muted-foreground">No outlook information available.</p>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Future Plans</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Management Outlook Statement</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Short-term Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li>• Focus on {report.reportCategory[0]} market segment</li>
              <li>• {report.summaryData.revenue.change >= 0 ? 'Expand' : 'Stabilize'} core business operations</li>
              <li>• Optimize cost structure and operational efficiency</li>
              {report.outlook.guidanceRevenue && <li>• Target revenue of {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)}</li>}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Medium-term Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li>• Market expansion into adjacent segments</li>
              <li>• Product portfolio enhancement and innovation</li>
              <li>• Strategic partnerships and potential acquisitions</li>
              <li>• Technological advancement and digital transformation</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Long-term Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li>• Market leadership in {report.reportCategory[0]}</li>
              <li>• Diversification into new business areas</li>
              <li>• Sustainable growth and shareholder value creation</li>
              <li>• {report.reportCategory.includes('ESG') ? 'Enhanced ESG initiatives' : 'Industry transformation and innovation'}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
