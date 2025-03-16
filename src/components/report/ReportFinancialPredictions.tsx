
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ReportFinancialPredictionsProps {
  report: FinancialReport;
}

export const ReportFinancialPredictions = ({ report }: ReportFinancialPredictionsProps) => {
  // Generate predictions based on current data
  const scenarioData = {
    optimistic: {
      revenueGrowth: report.summaryData.revenue.change > 0 ? report.summaryData.revenue.change + 5 : 5,
      epsGrowth: report.summaryData.eps?.change > 0 ? report.summaryData.eps.change + 7 : 7,
      description: `Growth exceeding expectations, successful product launches, and market expansion.`
    },
    neutral: {
      revenueGrowth: report.summaryData.revenue.change > 0 ? report.summaryData.revenue.change : 0,
      epsGrowth: report.summaryData.eps?.change > 0 ? report.summaryData.eps.change : 0,
      description: `Stable performance in line with industry averages and consistent execution of current strategy.`
    },
    pessimistic: {
      revenueGrowth: report.summaryData.revenue.change < 0 ? report.summaryData.revenue.change : -5,
      epsGrowth: report.summaryData.eps?.change < 0 ? report.summaryData.eps.change : -5,
      description: `Continued market challenges, cost pressures, and competitive headwinds affecting performance.`
    }
  };

  // Calculate estimated future values
  const currentRevenue = report.summaryData.revenue.value;
  const currentEps = report.summaryData.eps?.value || 0;
  const revenueUnit = report.summaryData.revenue.unit || '';
  const epsUnit = report.summaryData.eps?.unit || '';

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Financial Predictions</h2>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Optimistic Scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-muted-foreground">Projected Revenue</div>
                <div className="text-lg font-semibold">
                  {formatNumber(currentRevenue * (1 + scenarioData.optimistic.revenueGrowth/100), revenueUnit)}
                </div>
                <div className="text-sm text-green-500">+{scenarioData.optimistic.revenueGrowth.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Projected EPS</div>
                <div className="text-lg font-semibold">
                  {formatNumber(currentEps * (1 + scenarioData.optimistic.epsGrowth/100), epsUnit)}
                </div>
                <div className="text-sm text-green-500">+{scenarioData.optimistic.epsGrowth.toFixed(1)}%</div>
              </div>
            </div>
            <p className="text-sm">{scenarioData.optimistic.description}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Minus className="h-5 w-5 mr-2 text-blue-500" />
              Neutral Scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-muted-foreground">Projected Revenue</div>
                <div className="text-lg font-semibold">
                  {formatNumber(currentRevenue * (1 + scenarioData.neutral.revenueGrowth/100), revenueUnit)}
                </div>
                <div className="text-sm text-blue-500">{scenarioData.neutral.revenueGrowth >= 0 ? '+' : ''}{scenarioData.neutral.revenueGrowth.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Projected EPS</div>
                <div className="text-lg font-semibold">
                  {formatNumber(currentEps * (1 + scenarioData.neutral.epsGrowth/100), epsUnit)}
                </div>
                <div className="text-sm text-blue-500">{scenarioData.neutral.epsGrowth >= 0 ? '+' : ''}{scenarioData.neutral.epsGrowth.toFixed(1)}%</div>
              </div>
            </div>
            <p className="text-sm">{scenarioData.neutral.description}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              Pessimistic Scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-muted-foreground">Projected Revenue</div>
                <div className="text-lg font-semibold">
                  {formatNumber(currentRevenue * (1 + scenarioData.pessimistic.revenueGrowth/100), revenueUnit)}
                </div>
                <div className="text-sm text-red-500">{scenarioData.pessimistic.revenueGrowth >= 0 ? '+' : ''}{scenarioData.pessimistic.revenueGrowth.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Projected EPS</div>
                <div className="text-lg font-semibold">
                  {formatNumber(currentEps * (1 + scenarioData.pessimistic.epsGrowth/100), epsUnit)}
                </div>
                <div className="text-sm text-red-500">{scenarioData.pessimistic.epsGrowth >= 0 ? '+' : ''}{scenarioData.pessimistic.epsGrowth.toFixed(1)}%</div>
              </div>
            </div>
            <p className="text-sm">{scenarioData.pessimistic.description}</p>
          </CardContent>
        </Card>
      </div>
      
      {report.outlook && (
        <div className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Company Guidance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {report.outlook.statement}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
