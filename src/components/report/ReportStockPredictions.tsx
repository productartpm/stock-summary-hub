
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus, LineChart } from "lucide-react";

interface ReportStockPredictionsProps {
  report: FinancialReport;
}

export const ReportStockPredictions = ({ report }: ReportStockPredictionsProps) => {
  // Generate mock stock data based on report data
  const currentStockPrice = Math.round((report.summaryData.revenue.value * 0.01 + report.summaryData.netIncome.value * 0.05) * 100) / 100;
  const stockChange = report.summaryData.netIncome.change;
  
  // Mock scenarios for stock price
  const scenarios = {
    optimistic: {
      price: Math.round((currentStockPrice * (1 + 0.15)) * 100) / 100,
      change: "+15%",
      factors: [
        "Strong revenue growth above market expectations",
        "Successful product launches or expansion",
        "Favorable regulatory developments",
        "Strategic acquisitions or partnerships"
      ]
    },
    neutral: {
      price: Math.round((currentStockPrice * (1 + 0.05)) * 100) / 100,
      change: "+5%",
      factors: [
        "Revenue and earnings in line with expectations",
        "Stable market conditions",
        "Continued execution of current strategy",
        "No major changes in competitive landscape"
      ]
    },
    pessimistic: {
      price: Math.round((currentStockPrice * (1 - 0.10)) * 100) / 100,
      change: "-10%",
      factors: [
        "Revenue or earnings below expectations",
        "Increased competition pressure",
        "Unfavorable regulatory changes",
        "Rising operational costs impacting margins"
      ]
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Stock Price Predictions</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Current Stock Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="text-2xl font-bold">${currentStockPrice}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Daily Change</div>
              <div className={`text-lg font-bold ${stockChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stockChange >= 0 ? '+' : ''}{(stockChange * 0.3).toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">52-Week High</div>
              <div className="text-lg font-bold">${(currentStockPrice * 1.3).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">52-Week Low</div>
              <div className="text-lg font-bold">${(currentStockPrice * 0.7).toFixed(2)}</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>1-Month Performance</span>
              <span className={`${stockChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                {stockChange >= 0 ? '+' : ''}{(stockChange * 1.5).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>6-Month Performance</span>
              <span className={`${stockChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                {stockChange >= 0 ? '+' : ''}{(stockChange * 2.2).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Year-to-Date Performance</span>
              <span className={`${stockChange >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                {stockChange >= 0 ? '+' : ''}{(stockChange * 3).toFixed(2)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Optimistic Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="text-2xl font-bold text-green-500 mb-2">${scenarios.optimistic.price}</div>
            <div className="mb-2 text-green-500 font-medium">{scenarios.optimistic.change}</div>
            <ul className="space-y-1">
              {scenarios.optimistic.factors.map((factor, index) => (
                <li key={index}>• {factor}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Minus className="h-4 w-4 mr-2 text-blue-500" />
              Neutral Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="text-2xl font-bold text-blue-500 mb-2">${scenarios.neutral.price}</div>
            <div className="mb-2 text-blue-500 font-medium">{scenarios.neutral.change}</div>
            <ul className="space-y-1">
              {scenarios.neutral.factors.map((factor, index) => (
                <li key={index}>• {factor}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
              Pessimistic Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="text-2xl font-bold text-red-500 mb-2">${scenarios.pessimistic.price}</div>
            <div className="mb-2 text-red-500 font-medium">{scenarios.pessimistic.change}</div>
            <ul className="space-y-1">
              {scenarios.pessimistic.factors.map((factor, index) => (
                <li key={index}>• {factor}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Key Valuation Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">P/E Ratio</div>
              <div className="text-lg font-bold">
                {report.summaryData.eps ? 
                  (currentStockPrice / report.summaryData.eps.value).toFixed(2) : 
                  'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Price-to-Sales</div>
              <div className="text-lg font-bold">
                {(currentStockPrice / (report.summaryData.revenue.value / 1000000)).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="text-lg font-bold">
                ${formatNumber(currentStockPrice * 1000000, 'M')}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Dividend Yield</div>
              <div className="text-lg font-bold">
                {report.summaryData.netIncome.value > 0 ? (2.5).toFixed(2) : 0}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
