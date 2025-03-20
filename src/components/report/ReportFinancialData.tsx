
import type { FinancialReport } from "@/lib/data";
import { formatNumber, formatPercentage } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportFinancialDataProps {
  report: FinancialReport;
}

export const ReportFinancialData = ({ report }: ReportFinancialDataProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Financial Data</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-base mb-2">Quarterly Revenue</h3>
              <div className="flex justify-between items-center">
                <span>Revenue for this quarter</span>
                <span className="font-bold">{formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Change from previous quarter</span>
                <span className={`${report.summaryData.revenue.change >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {formatPercentage(report.summaryData.revenue.change)}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Annual Revenue</h3>
              <div className="flex justify-between items-center">
                <span>Year-to-date revenue</span>
                <span className="font-bold">{formatNumber(report.summaryData.revenue.value * 4, report.summaryData.revenue.unit)}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Revenue Sources</h3>
              <div className="space-y-2">
                {Object.entries(report.summaryData)
                  .filter(([key]) => key !== 'revenue' && key !== 'netIncome' && key !== 'operatingProfit' && key !== 'eps')
                  .map(([key, data]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{formatNumber(data.value, data.unit)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Operating Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-base mb-2">Cost Components</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Labor and personnel</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.4, report.summaryData.revenue.unit)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Materials and supplies</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.15, report.summaryData.revenue.unit)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>External services</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.2, report.summaryData.revenue.unit)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Other operational expenses</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.1, report.summaryData.revenue.unit)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Cost Dynamics</h3>
              <div className="flex justify-between items-center">
                <span>Year-over-year change</span>
                <span className={`${report.summaryData.operatingProfit.change < 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {formatPercentage(report.summaryData.operatingProfit.change < 0 ? -5 : 5)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Profitability Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Operating Profit (EBIT)</div>
              <div className="text-xl font-bold">
                {formatNumber(report.summaryData.operatingProfit.value, report.summaryData.operatingProfit.unit)}
              </div>
              <div className={`text-sm ${report.summaryData.operatingProfit.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(report.summaryData.operatingProfit.change)}
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Net Income</div>
              <div className="text-xl font-bold">
                {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
              </div>
              <div className={`text-sm ${report.summaryData.netIncome.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(report.summaryData.netIncome.change)}
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Earnings Per Share (EPS)</div>
              <div className="text-xl font-bold">
                {report.summaryData.eps ? formatNumber(report.summaryData.eps.value, report.summaryData.eps.unit) : 'N/A'}
              </div>
              <div className={`text-sm ${report.summaryData.eps && report.summaryData.eps.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {report.summaryData.eps ? formatPercentage(report.summaryData.eps.change) : ''}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Operating Margin</span>
                <span className="font-medium">
                  {formatPercentage(report.summaryData.operatingProfit.value / report.summaryData.revenue.value * 100)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Net Profit Margin</span>
                <span className="font-medium">
                  {formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>EBITDA Margin</span>
                <span className="font-medium">
                  {formatPercentage((report.summaryData.operatingProfit.value + report.summaryData.revenue.value * 0.05) / report.summaryData.revenue.value * 100)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
