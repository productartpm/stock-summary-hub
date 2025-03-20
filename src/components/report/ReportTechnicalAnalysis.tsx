
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, TrendingUp, TrendingDown, LineChart, BarChart3, AlertTriangle, Info } from "lucide-react";

interface ReportTechnicalAnalysisProps {
  report: FinancialReport;
}

export const ReportTechnicalAnalysis = ({ report }: ReportTechnicalAnalysisProps) => {
  // Generate mock technical indicators based on report data
  const technicalIndicators = {
    rsi: {
      value: Math.round(50 + (report.summaryData.netIncome.change * 10)),
      interpretation: ""  // Will be set based on value
    },
    macd: {
      value: Math.round(report.summaryData.netIncome.change * 100) / 100,
      signal: Math.round((report.summaryData.netIncome.change - 1) * 100) / 100,
      interpretation: ""  // Will be set based on comparison
    },
    stoch: {
      value: Math.round(40 + (report.summaryData.operatingProfit.change * 5)),
      interpretation: ""  // Will be set based on value
    },
    williamsR: {
      value: Math.round(-50 - (report.summaryData.operatingProfit.change * 5)),
      interpretation: ""  // Will be set based on value
    },
    volume: {
      value: Math.round(report.summaryData.revenue.value * 1000),
      change: Math.round(report.summaryData.revenue.change * 100) / 100,
      interpretation: ""  // Will be set based on change
    }
  };
  
  // Set interpretations based on values
  technicalIndicators.rsi.interpretation = technicalIndicators.rsi.value > 70 ? 
    "Overbought - potential reversal" : technicalIndicators.rsi.value < 30 ? 
    "Oversold - potential buying opportunity" : "Neutral";
    
  technicalIndicators.macd.interpretation = technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
    "Bullish - uptrend may continue" : "Bearish - downtrend may continue";
    
  technicalIndicators.stoch.interpretation = technicalIndicators.stoch.value > 80 ? 
    "Overbought - potential reversal" : technicalIndicators.stoch.value < 20 ? 
    "Oversold - potential buying opportunity" : "Neutral";
    
  technicalIndicators.williamsR.interpretation = technicalIndicators.williamsR.value < -80 ? 
    "Oversold - potential buying opportunity" : technicalIndicators.williamsR.value > -20 ? 
    "Overbought - potential reversal" : "Neutral";
    
  technicalIndicators.volume.interpretation = technicalIndicators.volume.change > 0 ? 
    "Increasing - confirming trend" : "Decreasing - potential trend weakness";
  
  // Mock support and resistance levels
  const currentPrice = Math.round((report.summaryData.revenue.value * 0.01 + report.summaryData.netIncome.value * 0.05) * 100) / 100;
  const supportLevels = [
    Math.round((currentPrice * 0.95) * 100) / 100,
    Math.round((currentPrice * 0.90) * 100) / 100,
    Math.round((currentPrice * 0.85) * 100) / 100
  ];
  const resistanceLevels = [
    Math.round((currentPrice * 1.05) * 100) / 100,
    Math.round((currentPrice * 1.10) * 100) / 100,
    Math.round((currentPrice * 1.15) * 100) / 100
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Technical Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              Technical Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">RSI (14)</span>
                  <span className={`${
                    technicalIndicators.rsi.value > 70 ? 'text-red-500' : 
                    technicalIndicators.rsi.value < 30 ? 'text-green-500' : 
                    'text-blue-500'
                  }`}>{technicalIndicators.rsi.value}</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      technicalIndicators.rsi.value > 70 ? 'bg-red-500' : 
                      technicalIndicators.rsi.value < 30 ? 'bg-green-500' : 
                      'bg-blue-500'
                    }`} 
                    style={{ width: `${Math.min(technicalIndicators.rsi.value, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{technicalIndicators.rsi.interpretation}</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">MACD (12,26,9)</span>
                  <span className={`${technicalIndicators.macd.value > technicalIndicators.macd.signal ? 'text-green-500' : 'text-red-500'}`}>
                    {technicalIndicators.macd.value > 0 ? '+' : ''}{technicalIndicators.macd.value}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs">Signal: {technicalIndicators.macd.signal}</div>
                  <div className={`px-2 py-0.5 rounded-full text-xs ${
                    technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
                    'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {technicalIndicators.macd.interpretation}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Stochastic (14,3)</span>
                  <span className={`${
                    technicalIndicators.stoch.value > 80 ? 'text-red-500' : 
                    technicalIndicators.stoch.value < 20 ? 'text-green-500' : 
                    'text-blue-500'
                  }`}>{technicalIndicators.stoch.value}</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      technicalIndicators.stoch.value > 80 ? 'bg-red-500' : 
                      technicalIndicators.stoch.value < 20 ? 'bg-green-500' : 
                      'bg-blue-500'
                    }`} 
                    style={{ width: `${technicalIndicators.stoch.value}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{technicalIndicators.stoch.interpretation}</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Williams %R (10)</span>
                  <span className={`${
                    technicalIndicators.williamsR.value < -80 ? 'text-green-500' : 
                    technicalIndicators.williamsR.value > -20 ? 'text-red-500' : 
                    'text-blue-500'
                  }`}>{technicalIndicators.williamsR.value}</span>
                </div>
                <div className="text-xs text-muted-foreground">{technicalIndicators.williamsR.interpretation}</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Volume</span>
                  <span className={`${technicalIndicators.volume.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {technicalIndicators.volume.value.toLocaleString()} 
                    ({technicalIndicators.volume.change >= 0 ? '+' : ''}{technicalIndicators.volume.change}%)
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{technicalIndicators.volume.interpretation}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ArrowRightLeft className="h-5 w-5 mr-2" />
              Support & Resistance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-base mb-2">Current Price: ${currentPrice}</h3>
                <div className="w-full h-1.5 bg-muted relative mb-6">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full" style={{ left: '50%', top: '-4px', transform: 'translateX(-50%)' }}></div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-2 text-red-500">Resistance Levels</h3>
                <div className="space-y-2">
                  {resistanceLevels.map((level, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-red-500">R{index+1}</span>
                      <span className="font-medium">${level}</span>
                      <span className="text-sm text-muted-foreground">{((level / currentPrice - 1) * 100).toFixed(2)}% from current</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-2 text-green-500">Support Levels</h3>
                <div className="space-y-2">
                  {supportLevels.map((level, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-green-500">S{index+1}</span>
                      <span className="font-medium">${level}</span>
                      <span className="text-sm text-muted-foreground">{((level / currentPrice - 1) * 100).toFixed(2)}% from current</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Technical Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${
              (technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
              'border-green-500 bg-green-50' :
              (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
              'border-red-500 bg-red-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center mb-2">
                {(technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" /> :
                  (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-500" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                }
                <span className="font-medium">Short-term Outlook (1-7 days)</span>
              </div>
              <p className="text-sm">
                {(technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
                  "Technical indicators suggest a potential short-term upside. Consider monitoring for confirmation signals." :
                  (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
                  "Technical indicators suggest caution in the short-term. Watch for potential reversal signals." :
                  "Technical indicators are neutral in the short-term. Wait for clearer signals before taking action."
                }
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              (technicalIndicators.stoch.value < 20 || technicalIndicators.volume.change > 5) ?
              'border-green-500 bg-green-50' :
              (technicalIndicators.stoch.value > 80 || technicalIndicators.volume.change < -5) ?
              'border-red-500 bg-red-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center mb-2">
                {(technicalIndicators.stoch.value < 20 || technicalIndicators.volume.change > 5) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" /> :
                  (technicalIndicators.stoch.value > 80 || technicalIndicators.volume.change < -5) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-500" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                }
                <span className="font-medium">Medium-term Outlook (1-4 weeks)</span>
              </div>
              <p className="text-sm">
                {(technicalIndicators.stoch.value < 20 || technicalIndicators.volume.change > 5) ?
                  "Medium-term indicators suggest a possible trend reversal upward. Monitor volume for confirmation." :
                  (technicalIndicators.stoch.value > 80 || technicalIndicators.volume.change < -5) ?
                  "Medium-term indicators suggest caution. Potential resistance levels may cap upside." :
                  "Medium-term indicators are neutral. Consider fundamental factors for direction."
                }
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              (report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
              'border-green-500 bg-green-50' :
              (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
              'border-red-500 bg-red-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center mb-2">
                {(report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" /> :
                  (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-500" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-500" />
                }
                <span className="font-medium">Long-term Outlook (1-6 months)</span>
              </div>
              <p className="text-sm">
                {(report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
                  "Long-term trend remains positive. Financial results support continued upside potential." :
                  (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
                  "Long-term trend shows warning signs. Consider reducing exposure on strength." :
                  "Long-term trend is neutral. Position according to risk tolerance and investment horizon."
                }
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 rounded-lg border border-amber-500 bg-amber-50">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              <span className="font-medium">Important Note</span>
            </div>
            <p className="text-sm">
              Technical analysis should be used in conjunction with fundamental analysis and risk management. 
              Past performance is not indicative of future results. Always conduct your own research before 
              making investment decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
