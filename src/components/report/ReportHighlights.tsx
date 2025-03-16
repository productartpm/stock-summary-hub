
import type { FinancialReport } from "@/lib/data";
import { formatDate } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportHighlightsProps {
  report: FinancialReport;
}

export const ReportHighlights = ({ report }: ReportHighlightsProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Key Highlights</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Report Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Report Type</div>
              <div className="font-medium">{report.reportType}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Period</div>
              <div className="font-medium">{report.quarterOrYear}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Publication Date</div>
              <div className="font-medium">{formatDate(report.publicationDate)}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Ticker</div>
              <div className="font-medium">{report.ticker}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2 mb-4">
        {report.keyHighlights.map((highlight, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p>{highlight}</p>
          </div>
        ))}
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {report.companyName} reported {report.summaryData.revenue.change >= 0 ? 'growth' : 'a decline'} of {Math.abs(report.summaryData.revenue.change).toFixed(1)}% 
            in revenue for {report.quarterOrYear}, with {report.summaryData.netIncome.change >= 0 ? 'improved' : 'decreased'} profitability. 
            {report.summaryData.operatingProfit.change >= 0 
              ? ` Operating profit increased by ${report.summaryData.operatingProfit.change.toFixed(1)}%, showing operational efficiencies.` 
              : ` Operating profit decreased by ${Math.abs(report.summaryData.operatingProfit.change).toFixed(1)}%, indicating operational challenges.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
