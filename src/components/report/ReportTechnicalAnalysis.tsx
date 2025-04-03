
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, TrendingUp, TrendingDown, LineChart, BarChart3, AlertTriangle, Info, ActivitySquare, Zap, Target } from "lucide-react";

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
    "Wykupienie - potencjalna korekta" : technicalIndicators.rsi.value < 30 ? 
    "Wyprzedanie - potencjalna okazja zakupu" : "Neutralny";
    
  technicalIndicators.macd.interpretation = technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
    "Byczo - trend wzrostowy może się utrzymać" : "Niedźwiedzio - trend spadkowy może się utrzymać";
    
  technicalIndicators.stoch.interpretation = technicalIndicators.stoch.value > 80 ? 
    "Wykupienie - potencjalna korekta" : technicalIndicators.stoch.value < 20 ? 
    "Wyprzedanie - potencjalna okazja zakupu" : "Neutralny";
    
  technicalIndicators.williamsR.interpretation = technicalIndicators.williamsR.value < -80 ? 
    "Wyprzedanie - potencjalna okazja zakupu" : technicalIndicators.williamsR.value > -20 ? 
    "Wykupienie - potencjalna korekta" : "Neutralny";
    
  technicalIndicators.volume.interpretation = technicalIndicators.volume.change > 0 ? 
    "Wzrost - potwierdzenie trendu" : "Spadek - potencjalne osłabienie trendu";
  
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
      <h2 className="text-xl font-semibold mb-3">Analiza Techniczna</h2>
      
      {/* Dashboard-style key metrics header */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-black rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">RSI (14)</h3>
            <ActivitySquare className="h-5 w-5 opacity-70" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{technicalIndicators.rsi.value}</div>
            <div className={`text-xs font-medium mt-1 ${
              technicalIndicators.rsi.value > 70 ? 'text-red-900' : 
              technicalIndicators.rsi.value < 30 ? 'text-green-900' : 
              'text-black'
            }`}>
              {technicalIndicators.rsi.interpretation}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">MACD (12,26,9)</h3>
            <Zap className="h-5 w-5 opacity-70" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {technicalIndicators.macd.value > 0 ? '+' : ''}{technicalIndicators.macd.value}
            </div>
            <div className={`text-xs font-medium mt-1 ${
              technicalIndicators.macd.value > technicalIndicators.macd.signal ? 'text-green-200' : 'text-red-200'
            }`}>
              {technicalIndicators.macd.interpretation}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Cena aktualna</h3>
            <Target className="h-5 w-5 opacity-70" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">${currentPrice}</div>
            <div className="text-xs font-medium mt-1">
              Vol: {(technicalIndicators.volume.value / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Technical Indicators Card - New Design */}
        <Card className="bg-neutral-800 text-white border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-1.5"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-amber-400" />
              Wskaźniki Techniczne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-amber-300">RSI (14)</span>
                  <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                    technicalIndicators.rsi.value > 70 ? 'bg-red-900/30 text-red-400' : 
                    technicalIndicators.rsi.value < 30 ? 'bg-green-900/30 text-green-400' : 
                    'bg-blue-900/30 text-blue-400'
                  }`}>{technicalIndicators.rsi.value}</span>
                </div>
                <div className="w-full bg-neutral-700 h-3 rounded-full">
                  <div className="relative w-full h-full">
                    {/* Scale markers */}
                    <div className="absolute top-full mt-1 left-0 right-0 flex justify-between text-xs text-neutral-500">
                      <span>0</span>
                      <span>30</span>
                      <span>70</span>
                      <span>100</span>
                    </div>
                    {/* Colored zones */}
                    <div className="absolute inset-0 flex">
                      <div className="h-full w-[30%] bg-green-500/20 rounded-l-full"></div>
                      <div className="h-full w-[40%] bg-blue-500/20"></div>
                      <div className="h-full w-[30%] bg-red-500/20 rounded-r-full"></div>
                    </div>
                    {/* Value indicator */}
                    <div 
                      className={`absolute h-5 w-5 top-1/2 -mt-2.5 -ml-2.5 rounded-full border-2 border-white ${
                        technicalIndicators.rsi.value > 70 ? 'bg-red-500' : 
                        technicalIndicators.rsi.value < 30 ? 'bg-green-500' : 
                        'bg-blue-500'
                      }`} 
                      style={{ left: `${Math.min(Math.max(technicalIndicators.rsi.value, 0), 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-neutral-400 mt-4">{technicalIndicators.rsi.interpretation}</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-amber-300">MACD (12,26,9)</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${technicalIndicators.macd.value > technicalIndicators.macd.signal ? 'text-green-400' : 'text-red-400'}`}>
                      {technicalIndicators.macd.value > 0 ? '+' : ''}{technicalIndicators.macd.value}
                    </span>
                    <span className="text-xs text-neutral-400">vs {technicalIndicators.macd.signal}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`px-2.5 py-1 rounded-full text-xs ${
                    technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
                    'bg-green-900/30 text-green-400' : 
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {technicalIndicators.macd.interpretation}
                  </div>
                  {technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
                    <TrendingUp className="h-4 w-4 text-green-400" /> : 
                    <TrendingDown className="h-4 w-4 text-red-400" />}
                </div>
                
                {/* MACD histogram visualization */}
                <div className="mt-3 h-10 flex items-end justify-between gap-0.5">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const value = Math.sin(i * 0.5) * technicalIndicators.macd.value;
                    const height = Math.abs(value) * 35 + 5;
                    return (
                      <div 
                        key={i} 
                        className={`w-full ${value >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-amber-300">Stochastic</span>
                    <span className={`text-sm ${
                      technicalIndicators.stoch.value > 80 ? 'text-red-400' : 
                      technicalIndicators.stoch.value < 20 ? 'text-green-400' : 
                      'text-blue-400'
                    }`}>{technicalIndicators.stoch.value}</span>
                  </div>
                  <div className="w-full bg-neutral-700 h-2 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        technicalIndicators.stoch.value > 80 ? 'bg-red-500' : 
                        technicalIndicators.stoch.value < 20 ? 'bg-green-500' : 
                        'bg-blue-500'
                      }`} 
                      style={{ width: `${technicalIndicators.stoch.value}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{technicalIndicators.stoch.interpretation}</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-amber-300">Williams %R</span>
                    <span className={`text-sm ${
                      technicalIndicators.williamsR.value < -80 ? 'text-green-400' : 
                      technicalIndicators.williamsR.value > -20 ? 'text-red-400' : 
                      'text-blue-400'
                    }`}>{technicalIndicators.williamsR.value}</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{technicalIndicators.williamsR.interpretation}</div>
                  
                  {/* Williams %R visualization */}
                  <div className="mt-1 w-full bg-neutral-700 h-2 rounded-full overflow-hidden">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex">
                        <div className="h-full w-[20%] bg-red-500/20"></div>
                        <div className="h-full w-[60%] bg-blue-500/20"></div>
                        <div className="h-full w-[20%] bg-green-500/20"></div>
                      </div>
                      <div 
                        className="absolute w-3 h-3 bg-white rounded-full -mt-0.5" 
                        style={{ left: `${Math.min(Math.max((technicalIndicators.williamsR.value + 100) / 100 * 100, 0), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-amber-300">Wolumen</span>
                  <span className={`text-sm ${technicalIndicators.volume.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {(technicalIndicators.volume.value / 1000000).toFixed(1)}M 
                    ({technicalIndicators.volume.change >= 0 ? '+' : ''}{technicalIndicators.volume.change}%)
                  </span>
                </div>
                
                {/* Volume bars */}
                <div className="mt-1 h-8 flex items-end gap-0.5">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const randomHeight = 40 + Math.random() * 60;
                    const isCurrent = i === 13;
                    return (
                      <div 
                        key={i} 
                        className={`w-full rounded-sm ${
                          isCurrent 
                            ? technicalIndicators.volume.change >= 0 ? 'bg-green-500' : 'bg-red-500'
                            : 'bg-neutral-600'
                        }`}
                        style={{ height: `${isCurrent ? 100 : randomHeight}%` }}
                      ></div>
                    );
                  })}
                </div>
                
                <div className="text-xs text-neutral-400 mt-1">{technicalIndicators.volume.interpretation}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Support & Resistance Card - New Design */}
        <Card className="bg-neutral-800 text-white border-none shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ArrowRightLeft className="h-5 w-5 mr-2 text-blue-400" />
              Poziomy Wsparcia i Oporu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-base mb-2 flex items-center">
                  <span className="text-blue-400 mr-2">●</span>
                  Cena bieżąca:
                  <span className="ml-2 text-lg font-bold">${currentPrice}</span>
                </h3>
                
                {/* Price indicator with support/resistance visualization */}
                <div className="relative mt-6 mb-10">
                  <div className="absolute left-0 right-0 h-0.5 bg-neutral-600"></div>
                  
                  {/* Current price marker */}
                  <div className="absolute left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute left-1/2 mt-3 -ml-5 text-sm text-blue-400 font-medium">
                    ${currentPrice}
                  </div>
                  
                  {/* Chart-like visualization */}
                  <svg className="w-full h-32 mt-8" viewBox="0 0 400 80">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Background pattern */}
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 0 20 L 20 20" fill="none" stroke="#3f4756" strokeWidth="0.5"/>
                      <path d="M 20 0 L 20 20" fill="none" stroke="#3f4756" strokeWidth="0.5"/>
                    </pattern>
                    <rect width="400" height="80" fill="url(#grid)" />
                    
                    {/* Chart line */}
                    <path 
                      d="M0,60 C30,58 60,40 90,38 C120,36 150,50 180,45 C210,40 240,20 270,25 C300,30 330,40 360,35 C390,30 400,35 400,35" 
                      stroke="#60a5fa" 
                      strokeWidth="2" 
                      fill="none"
                    />
                    
                    {/* Area under the line */}
                    <path 
                      d="M0,60 C30,58 60,40 90,38 C120,36 150,50 180,45 C210,40 240,20 270,25 C300,30 330,40 360,35 C390,30 400,35 400,35 V80 H0 Z" 
                      fill="url(#chartGradient)"
                    />
                    
                    {/* Price point */}
                    <circle cx="200" cy="40" r="4" fill="#3b82f6" />
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-base mb-3 text-red-400 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1.5" />
                    Poziomy Oporu
                  </h3>
                  <div className="space-y-3">
                    {resistanceLevels.map((level, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center bg-red-900/20 px-3 py-2 rounded-lg border-l-2 border-red-500"
                      >
                        <div className="flex items-center">
                          <span className="text-red-400 font-bold mr-2">R{index+1}</span>
                          <span className="text-white font-medium">${level}</span>
                        </div>
                        <span className="text-sm text-neutral-400">
                          +{((level / currentPrice - 1) * 100).toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-base mb-3 text-green-400 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1.5" />
                    Poziomy Wsparcia
                  </h3>
                  <div className="space-y-3">
                    {supportLevels.map((level, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center bg-green-900/20 px-3 py-2 rounded-lg border-l-2 border-green-500"
                      >
                        <div className="flex items-center">
                          <span className="text-green-400 font-bold mr-2">S{index+1}</span>
                          <span className="text-white font-medium">${level}</span>
                        </div>
                        <span className="text-sm text-neutral-400">
                          {((level / currentPrice - 1) * 100).toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-neutral-800 text-white border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-1.5"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-purple-400" />
            Podsumowanie Analizy Technicznej
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${
              (technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
              'border-green-500 bg-green-900/20' :
              (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
              'border-red-500 bg-red-900/20' :
              'border-blue-500 bg-blue-900/20'
            }`}>
              <div className="flex items-center mb-2">
                {(technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" /> :
                  (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-400" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                }
                <span className="font-medium">Perspektywa krótkoterminowa (1-7 dni)</span>
              </div>
              <p className="text-sm text-gray-300">
                {(technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
                  "Wskaźniki techniczne sugerują potencjalny krótkoterminowy wzrost. Rozważ monitorowanie sygnałów potwierdzających." :
                  (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
                  "Wskaźniki techniczne sugerują ostrożność w krótkim terminie. Obserwuj potencjalne sygnały odwrócenia." :
                  "Wskaźniki techniczne są neutralne w krótkim terminie. Poczekaj na wyraźniejsze sygnały przed podjęciem działań."
                }
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              (technicalIndicators.stoch.value < 20 || technicalIndicators.volume.change > 5) ?
              'border-green-500 bg-green-900/20' :
              (technicalIndicators.stoch.value > 80 || technicalIndicators.volume.change < -5) ?
              'border-red-500 bg-red-900/20' :
              'border-blue-500 bg-blue-900/20'
            }`}>
              <div className="flex items-center mb-2">
                {(technicalIndicators.stoch.value < 20 || technicalIndicators.volume.change > 5) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" /> :
                  (technicalIndicators.stoch.value > 80 || technicalIndicators.volume.change < -5) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-400" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                }
                <span className="font-medium">Perspektywa średnioterminowa (1-4 tygodni)</span>
              </div>
              <p className="text-sm text-gray-300">
                {(technicalIndicators.stoch.value < 20 || technicalIndicators.volume.change > 5) ?
                  "Wskaźniki średnioterminowe sugerują możliwe odwrócenie trendu wzwyż. Monitoruj wolumen dla potwierdzenia." :
                  (technicalIndicators.stoch.value > 80 || technicalIndicators.volume.change < -5) ?
                  "Wskaźniki średnioterminowe sugerują ostrożność. Potencjalne poziomy oporu mogą ograniczać wzrosty." :
                  "Wskaźniki średnioterminowe są neutralne. Rozważ czynniki fundamentalne dla określenia kierunku."
                }
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              (report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
              'border-green-500 bg-green-900/20' :
              (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
              'border-red-500 bg-red-900/20' :
              'border-blue-500 bg-blue-900/20'
            }`}>
              <div className="flex items-center mb-2">
                {(report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" /> :
                  (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-400" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                }
                <span className="font-medium">Perspektywa długoterminowa (1-6 miesięcy)</span>
              </div>
              <p className="text-sm text-gray-300">
                {(report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
                  "Trend długoterminowy pozostaje pozytywny. Wyniki finansowe wspierają kontynuację potencjału wzrostowego." :
                  (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
                  "Trend długoterminowy wykazuje sygnały ostrzegawcze. Rozważ redukcję ekspozycji przy wzrostach." :
                  "Trend długoterminowy jest neutralny. Dostosuj pozycję do tolerancji ryzyka i horyzontu inwestycyjnego."
                }
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded-lg border border-amber-500 bg-amber-950/30">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-400" />
              <span className="font-medium">Ważna informacja</span>
            </div>
            <p className="text-sm text-amber-200">
              Analiza techniczna powinna być stosowana w połączeniu z analizą fundamentalną i zarządzaniem ryzykiem. 
              Wyniki historyczne nie są gwarancją przyszłych rezultatów. Zawsze przeprowadzaj własne badania przed 
              podejmowaniem decyzji inwestycyjnych.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
