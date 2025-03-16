
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportTrendsProps {
  report: FinancialReport;
}

export const ReportTrends = ({ report }: ReportTrendsProps) => {
  // Extract categories for the report to show industry trends
  const categories = report.reportCategory || [];
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Market Trends</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Industry Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">
                {category}
              </span>
            ))}
          </div>
          
          <h3 className="font-medium text-base mb-2">Revenue Trends by Segment</h3>
          <div className="space-y-2">
            {Object.entries(report.summaryData)
              .filter(([key]) => key !== 'revenue' && key !== 'netIncome' && key !== 'operatingProfit' && key !== 'eps')
              .map(([key, data]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`${data.change >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                    {data.change >= 0 ? '↑' : '↓'} {Math.abs(data.change).toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Market Environment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-base mb-2">Consumer Behavior</h3>
              <p className="text-sm text-muted-foreground">
                {report.companyName} is {report.summaryData.revenue.change >= 0 ? 'seeing growth' : 'facing challenges'} 
                in the {report.reportCategory[0]?.toLowerCase() || ''} sector, with 
                {' '}{report.summaryData.revenue.change >= 5 ? 'strong' : report.summaryData.revenue.change >= 0 ? 'stable' : 'declining'} 
                {' '}consumer demand for its products and services.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-base mb-2">Regulatory Environment</h3>
              <p className="text-sm text-muted-foreground">
                The company operates in a {report.reportCategory.includes('Regulatory') ? 'highly regulated' : 'competitive'} 
                environment with {report.reportType === 'Quarterly' ? 'quarterly' : 'annual'} reporting requirements
                affecting business operations and disclosure practices.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
