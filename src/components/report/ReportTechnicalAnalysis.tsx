
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRightLeft, 
  TrendingUp, 
  TrendingDown, 
  ActivitySquare, 
  AlertTriangle, 
  Info, 
  Zap, 
  Target,
  BarChart3,
  LineChart,
  Layers,
  ArrowUp,
  ArrowDown,
  Hash,
  Waves
} from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { formatNumber, formatPercentage } from "@/lib/data";

interface ReportTechnicalAnalysisProps {
  report: FinancialReport;
}

export const ReportTechnicalAnalysis = ({ report }: ReportTechnicalAnalysisProps) => {
  // Generate mock technical indicators if they don't exist in stock data
  const currentPrice = report.stockData?.currentPrice || 
    Math.round((report.summaryData.revenue.value * 0.01 + report.summaryData.netIncome.value * 0.05) * 100) / 100;
  
  const mockRSI = report.stockData?.rsi || 
    Math.round(50 + (report.summaryData.netIncome.change * 10));
  
  const mockMACD = report.stockData?.macd || {
    value: Math.round(report.summaryData.netIncome.change * 100) / 100,
    signal: Math.round((report.summaryData.netIncome.change - 1) * 100) / 100,
    histogram: Math.round(report.summaryData.netIncome.change * 50) / 100
  };
  
  const mockStochastic = report.stockData?.stochastic || {
    k: Math.round(40 + (report.summaryData.operatingProfit.change * 5)),
    d: Math.round(35 + (report.summaryData.operatingProfit.change * 4))
  };
  
  const mockBollinger = report.stockData?.bollinger || {
    upper: Math.round((currentPrice * 1.05) * 100) / 100,
    middle: currentPrice,
    lower: Math.round((currentPrice * 0.95) * 100) / 100
  };
  
  const mockATR = report.stockData?.atr || 
    Math.round((currentPrice * 0.02) * 100) / 100;
  
  const mockOBV = report.stockData?.obv || 
    Math.round(report.summaryData.revenue.value * 1000);
    
  const volumeChange = Math.round(report.summaryData.revenue.change * 100) / 100;
  
  // Technical indicator interpretations
  const technicalIndicators = {
    rsi: {
      value: mockRSI,
      interpretation: mockRSI > 70 ? 
        "Wykupienie - potencjalna korekta" : mockRSI < 30 ? 
        "Wyprzedanie - potencjalna okazja zakupu" : "Neutralny"
    },
    macd: {
      value: mockMACD.value,
      signal: mockMACD.signal,
      histogram: mockMACD.histogram,
      interpretation: mockMACD.value > mockMACD.signal ? 
        "Byczo - trend wzrostowy może się utrzymać" : "Niedźwiedzio - trend spadkowy może się utrzymać"
    },
    stoch: {
      k: mockStochastic.k,
      d: mockStochastic.d,
      interpretation: mockStochastic.k > 80 ? 
        "Wykupienie - potencjalna korekta" : mockStochastic.k < 20 ? 
        "Wyprzedanie - potencjalna okazja zakupu" : "Neutralny"
    },
    bollinger: {
      upper: mockBollinger.upper,
      middle: mockBollinger.middle,
      lower: mockBollinger.lower,
      interpretation: currentPrice > mockBollinger.upper ?
        "Cena powyżej górnego pasma - potencjalne wykupienie" : 
        currentPrice < mockBollinger.lower ?
        "Cena poniżej dolnego pasma - potencjalne wyprzedanie" :
        "Cena w zakresie pasm - neutralny"
    },
    atr: {
      value: mockATR,
      interpretation: mockATR > (currentPrice * 0.03) ?
        "Wysoka zmienność - zwiększone ryzyko" :
        "Umiarkowana zmienność"
    },
    obv: {
      value: mockOBV,
      change: volumeChange,
      interpretation: volumeChange > 0 ? 
        "Wzrost - potwierdzenie trendu" : "Spadek - potencjalne osłabienie trendu"
    },
    williamsR: {
      value: Math.round(-50 - (report.summaryData.operatingProfit.change * 5)),
      interpretation: ""  // Will be set based on value
    }
  };
  
  // Set interpretations based on values
  technicalIndicators.williamsR.interpretation = technicalIndicators.williamsR.value < -80 ? 
    "Wyprzedanie - potencjalna okazja zakupu" : technicalIndicators.williamsR.value > -20 ? 
    "Wykupienie - potencjalna korekta" : "Neutralny";
  
  // Mock support and resistance levels
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

  // Function to generate indicator health status
  const getIndicatorHealth = (indicator: string) => {
    if (indicator === 'rsi') {
      return technicalIndicators.rsi.value > 70 ? 'negative' :
             technicalIndicators.rsi.value < 30 ? 'positive' : 'neutral';
    } else if (indicator === 'macd') {
      return technicalIndicators.macd.value > technicalIndicators.macd.signal ? 'positive' : 'negative';
    } else if (indicator === 'stoch') {
      return technicalIndicators.stoch.k > 80 ? 'negative' : 
             technicalIndicators.stoch.k < 20 ? 'positive' : 'neutral';
    } else if (indicator === 'bollinger') {
      return currentPrice > technicalIndicators.bollinger.upper ? 'negative' :
             currentPrice < technicalIndicators.bollinger.lower ? 'positive' : 'neutral';
    } else if (indicator === 'williamsR') {
      return technicalIndicators.williamsR.value < -80 ? 'positive' :
             technicalIndicators.williamsR.value > -20 ? 'negative' : 'neutral';
    }
    return 'neutral';
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Analiza Techniczna</h2>
      
      {/* Dashboard-style key metrics header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">RSI (14)</h3>
            <ActivitySquare className="h-5 w-5 opacity-70" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{technicalIndicators.rsi.value}</div>
            <div className={`text-xs font-medium mt-1 ${
              technicalIndicators.rsi.value > 70 ? 'text-red-200' : 
              technicalIndicators.rsi.value < 30 ? 'text-green-200' : 
              'text-primary-foreground/80'
            }`}>
              {technicalIndicators.rsi.interpretation}
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg p-4 shadow-lg">
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
        
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Cena aktualna</h3>
            <Target className="h-5 w-5 opacity-70" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">${currentPrice}</div>
            <div className="text-xs font-medium mt-1">
              Vol: {(technicalIndicators.obv.value / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Technical Indicators Card - Enhanced */}
        <Card className="bg-card text-card-foreground border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 h-1.5"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-primary" />
              Wskaźniki Momentum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-primary">RSI (14)</span>
                  <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                    technicalIndicators.rsi.value > 70 ? 'bg-red-100 text-red-600' : 
                    technicalIndicators.rsi.value < 30 ? 'bg-green-100 text-green-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>{technicalIndicators.rsi.value}</span>
                </div>
                <div className="w-full bg-muted h-3 rounded-full">
                  <div className="relative w-full h-full">
                    {/* Scale markers */}
                    <div className="absolute top-full mt-1 left-0 right-0 flex justify-between text-xs text-muted-foreground">
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
                <div className="text-xs text-muted-foreground mt-4">
                  {technicalIndicators.rsi.value > 70 ? 
                    "Wskaźnik RSI wskazuje na silne wykupienie rynku. Historycznie, wartości powyżej 70 często poprzedzały korekty cenowe." : 
                    technicalIndicators.rsi.value < 30 ? 
                    "Wskaźnik RSI wskazuje na silne wyprzedanie rynku. Historycznie, wartości poniżej 30 często poprzedzały odbicia cenowe." : 
                    "Wskaźnik RSI znajduje się w strefie neutralnej, nie wskazując na ekstremalne warunki rynkowe."}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-primary">MACD (12,26,9)</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${technicalIndicators.macd.value > technicalIndicators.macd.signal ? 'text-green-600' : 'text-red-600'}`}>
                      {technicalIndicators.macd.value > 0 ? '+' : ''}{technicalIndicators.macd.value}
                    </span>
                    <span className="text-xs text-muted-foreground">Signal: {technicalIndicators.macd.signal}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`px-2.5 py-1 rounded-full text-xs ${
                    technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
                    'bg-green-100 text-green-600' : 
                    'bg-red-100 text-red-600'
                  }`}>
                    {technicalIndicators.macd.interpretation}
                  </div>
                  {technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
                    <TrendingUp className="h-4 w-4 text-green-600" /> : 
                    <TrendingDown className="h-4 w-4 text-red-600" />}
                </div>
                
                {/* MACD histogram visualization */}
                <div className="mt-3 h-12 flex items-end justify-between gap-0.5 relative">
                  {/* Zero line */}
                  <div className="absolute w-full h-px bg-muted top-1/2"></div>
                  
                  {Array.from({ length: 20 }).map((_, i) => {
                    // Generate dynamic histogram values based on index
                    const barIndex = i - 10; // Center at 0
                    const value = technicalIndicators.macd.histogram * Math.cos(barIndex * 0.3);
                    const heightPercentage = Math.min(Math.abs(value) * 100, 100);
                    const isPositive = value >= 0;
                    
                    return (
                      <div 
                        key={i} 
                        className={`w-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ 
                          height: `${heightPercentage}%`,
                          marginTop: isPositive ? '0' : 'auto',
                          marginBottom: isPositive ? 'auto' : '0'
                        }}
                      ></div>
                    );
                  })}
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  {technicalIndicators.macd.value > technicalIndicators.macd.signal ? 
                    "Wskaźnik MACD przekroczył linię sygnałową od dołu, generując sygnał kupna. Histogram MACD potwierdza rosnący momentum cenowy." : 
                    "Wskaźnik MACD przekroczył linię sygnałową od góry, generując sygnał sprzedaży. Histogram MACD wskazuje na słabnący momentum cenowy."}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-primary">Stochastic</span>
                    <div className="flex gap-1 items-center">
                      <span className={`text-sm ${
                        technicalIndicators.stoch.k > 80 ? 'text-red-600' : 
                        technicalIndicators.stoch.k < 20 ? 'text-green-600' : 
                        'text-blue-600'
                      }`}>K: {technicalIndicators.stoch.k}</span>
                      <span className="text-xs text-muted-foreground">D: {technicalIndicators.stoch.d}</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        technicalIndicators.stoch.k > 80 ? 'bg-red-500' : 
                        technicalIndicators.stoch.k < 20 ? 'bg-green-500' : 
                        'bg-blue-500'
                      }`} 
                      style={{ width: `${technicalIndicators.stoch.k}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {technicalIndicators.stoch.k > 80 ? 
                      "Oscylator stochastyczny w strefie wykupienia (>80). Potencjalna zbliżająca się korekta spadkowa." : 
                      technicalIndicators.stoch.k < 20 ? 
                      "Oscylator stochastyczny w strefie wyprzedania (<20). Możliwe nadchodzące odbicie cenowe." : 
                      "Oscylator stochastyczny w strefie neutralnej, bez wyraźnych sygnałów ekstremów."}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-primary">Williams %R</span>
                    <span className={`text-sm ${
                      technicalIndicators.williamsR.value < -80 ? 'text-green-600' : 
                      technicalIndicators.williamsR.value > -20 ? 'text-red-600' : 
                      'text-blue-600'
                    }`}>{technicalIndicators.williamsR.value}</span>
                  </div>
                  
                  {/* Williams %R visualization */}
                  <div className="mt-1 w-full bg-muted h-2 rounded-full overflow-hidden">
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
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {technicalIndicators.williamsR.value < -80 ? 
                      "Williams %R wskazuje na warunki silnego wyprzedania. Historycznie, wartości poniżej -80 często poprzedzały odbicia cenowe." : 
                      technicalIndicators.williamsR.value > -20 ? 
                      "Williams %R wskazuje na warunki silnego wykupienia. Historycznie, wartości powyżej -20 często poprzedzały korekty spadkowe." : 
                      "Williams %R w strefie neutralnej, bez wyraźnych sygnałów ekstremów."}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Volatility and Trend Indicators Card */}
        <Card className="bg-card text-card-foreground border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 h-1.5"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Waves className="h-5 w-5 mr-2 text-primary" />
              Wskaźniki Zmienności i Trendu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {/* Bollinger Bands */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-primary">Wstęgi Bollingera (20,2)</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    currentPrice > technicalIndicators.bollinger.upper ? 'bg-red-100 text-red-600' : 
                    currentPrice < technicalIndicators.bollinger.lower ? 'bg-green-100 text-green-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {currentPrice > technicalIndicators.bollinger.upper ? 'Powyżej pasma' : 
                     currentPrice < technicalIndicators.bollinger.lower ? 'Poniżej pasma' : 
                     'W zakresie pasm'}
                  </span>
                </div>
                
                <div className="mt-2 relative h-16">
                  {/* Bollinger Bands visualization */}
                  <div className="absolute inset-0 bg-blue-50 rounded"></div>
                  
                  {/* Upper band */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-blue-600 flex justify-between">
                    <span className="text-xs text-blue-600 -mt-4">Górne: ${technicalIndicators.bollinger.upper}</span>
                    <span className="text-xs text-blue-600 -mt-4">+{formatPercentage((technicalIndicators.bollinger.upper/currentPrice-1)*100)}</span>
                  </div>
                  
                  {/* Middle band (SMA) */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-card-foreground flex justify-between">
                    <span className="text-xs text-card-foreground -mt-2">SMA: ${technicalIndicators.bollinger.middle}</span>
                  </div>
                  
                  {/* Lower band */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-blue-600 flex justify-between">
                    <span className="text-xs text-blue-600 -mb-4">Dolne: ${technicalIndicators.bollinger.lower}</span>
                    <span className="text-xs text-blue-600 -mb-4">{formatPercentage((technicalIndicators.bollinger.lower/currentPrice-1)*100)}</span>
                  </div>
                  
                  {/* Price indicator */}
                  <div 
                    className="absolute w-4 h-4 bg-primary rounded-full left-1/2 transform -translate-x-1/2"
                    style={{ 
                      top: `${currentPrice > technicalIndicators.bollinger.upper ? 
                        0 : currentPrice < technicalIndicators.bollinger.lower ? 
                        100 : 50}%` 
                    }}
                  ></div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-4">
                  {currentPrice > technicalIndicators.bollinger.upper ? 
                    "Cena znajduje się powyżej górnego pasma Bollingera, co sugeruje silne warunki wykupienia. Możliwa korekta w kierunku średniej lub nawet dolnego pasma." : 
                    currentPrice < technicalIndicators.bollinger.lower ? 
                    "Cena znajduje się poniżej dolnego pasma Bollingera, co sugeruje silne warunki wyprzedania. Możliwe odbicie w kierunku średniej." : 
                    "Cena znajduje się pomiędzy pasmami Bollingera, co wskazuje na normalną zmienność w trendzie."}
                </div>
              </div>
              
              {/* ATR */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-primary">Average True Range (ATR)</span>
                  <div className="flex items-center">
                    <span className="text-sm text-card-foreground">${technicalIndicators.atr.value}</span>
                    <span className="text-xs ml-1 text-muted-foreground">
                      ({formatPercentage((technicalIndicators.atr.value/currentPrice)*100)} od ceny)
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 w-full bg-muted h-3 rounded-full">
                  <div className="relative w-full h-full">
                    {/* Scale for ATR percentage of price */}
                    <div className="absolute top-full mt-1 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>1%</span>
                      <span>2%</span>
                      <span>3%</span>
                      <span>4%</span>
                      <span>5%+</span>
                    </div>
                    
                    {/* Indicator */}
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${Math.min((technicalIndicators.atr.value/currentPrice)*100*20, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mt-4">
                  {technicalIndicators.atr.value > (currentPrice * 0.03) ? 
                    "Wysoki wskaźnik ATR wskazuje na znaczącą zmienność rynku. Inwestorzy powinni dostosować swoje strategie zarządzania ryzykiem do zwiększonej amplitudy ruchów cenowych." : 
                    technicalIndicators.atr.value < (currentPrice * 0.01) ? 
                    "Niski wskaźnik ATR sugeruje zmniejszoną zmienność rynku. Konsolidacja może poprzedzać wybicie cenowe w jednym z kierunków." : 
                    "Umiarkowany poziom ATR wskazuje na normalną zmienność rynkową, zgodną z historycznymi wzorcami dla tego instrumentu."}
                </div>
              </div>
              
              {/* On-Balance Volume (OBV) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-primary">On-Balance Volume (OBV)</span>
                  <span className={`text-sm ${technicalIndicators.obv.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(technicalIndicators.obv.value / 1000000).toFixed(1)}M 
                    ({technicalIndicators.obv.change >= 0 ? '+' : ''}{technicalIndicators.obv.change}%)
                  </span>
                </div>
                
                {/* Volume bars */}
                <div className="mt-3 h-10 flex items-end gap-0.5">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const randomHeight = 40 + Math.random() * 60;
                    const isCurrent = i === 13;
                    const direction = Math.random() > 0.5;
                    
                    return (
                      <div key={i} className="w-full relative">
                        <div 
                          className={`w-full rounded-sm ${
                            isCurrent 
                              ? technicalIndicators.obv.change >= 0 ? 'bg-green-500' : 'bg-red-500'
                              : direction ? 'bg-green-300' : 'bg-red-300'
                          }`}
                          style={{ height: `${isCurrent ? 100 : randomHeight}%` }}
                        ></div>
                        {isCurrent && (
                          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                            {technicalIndicators.obv.change >= 0 
                              ? <ArrowUp className="h-4 w-4 text-green-600" />
                              : <ArrowDown className="h-4 w-4 text-red-600" />
                            }
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  {technicalIndicators.obv.change >= 5 ? 
                    "Znaczący wzrost wskaźnika OBV potwierdza silny trend wzrostowy. Rosnący wolumen przy rosnących cenach to sygnał siły byków." : 
                    technicalIndicators.obv.change <= -5 ? 
                    "Znaczący spadek wskaźnika OBV potwierdza trend spadkowy. Rosnący wolumen przy spadających cenach to sygnał przewagi niedźwiedzi." : 
                    technicalIndicators.obv.change >= 0 ? 
                    "Umiarkowany wzrost OBV sugeruje, że obecny trend wzrostowy ma poparcie w wolumenie, ale bez wyjątkowej siły." : 
                    "Umiarkowany spadek OBV sugeruje, że obecny trend spadkowy ma poparcie w wolumenie, ale bez wyjątkowej siły."}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Support & Resistance Card */}
      <Card className="bg-card text-card-foreground border shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary to-primary/80 h-1.5"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ArrowRightLeft className="h-5 w-5 mr-2 text-primary" />
            Poziomy Wsparcia i Oporu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-base mb-2 flex items-center">
                <span className="text-primary mr-2">●</span>
                Cena bieżąca:
                <span className="ml-2 text-lg font-bold">${currentPrice}</span>
              </h3>
              
              {/* Price indicator with support/resistance visualization */}
              <div className="relative mt-6 mb-10">
                <div className="absolute left-0 right-0 h-0.5 bg-muted"></div>
                
                {/* Current price marker */}
                <div className="absolute left-1/2 -ml-1.5 -mt-1.5 w-3 h-3 bg-primary rounded-full"></div>
                <div className="absolute left-1/2 mt-3 -ml-5 text-sm text-primary font-medium">
                  ${currentPrice}
                </div>
                
                {/* Chart-like visualization */}
                <svg className="w-full h-32 mt-8" viewBox="0 0 400 80">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background pattern */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 0 20 L 20 20" fill="none" stroke="var(--muted)" strokeWidth="0.5"/>
                    <path d="M 20 0 L 20 20" fill="none" stroke="var(--muted)" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="400" height="80" fill="url(#grid)" />
                  
                  {/* Chart line */}
                  <path 
                    d="M0,60 C30,58 60,40 90,38 C120,36 150,50 180,45 C210,40 240,20 270,25 C300,30 330,40 360,35 C390,30 400,35 400,35" 
                    stroke="var(--primary)" 
                    strokeWidth="2" 
                    fill="none"
                  />
                  
                  {/* Area under the line */}
                  <path 
                    d="M0,60 C30,58 60,40 90,38 C120,36 150,50 180,45 C210,40 240,20 270,25 C300,30 330,40 360,35 C390,30 400,35 400,35 V80 H0 Z" 
                    fill="url(#chartGradient)"
                  />
                  
                  {/* Price point */}
                  <circle cx="200" cy="40" r="4" fill="var(--primary)" />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-base mb-3 text-red-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1.5" />
                  Poziomy Oporu
                </h3>
                <div className="space-y-3">
                  {resistanceLevels.map((level, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center bg-red-50 px-3 py-2 rounded-lg border-l-2 border-red-500"
                    >
                      <div className="flex items-center">
                        <span className="text-red-600 font-bold mr-2">R{index+1}</span>
                        <span className="text-card-foreground font-medium">${level}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        +{((level / currentPrice - 1) * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Poziomy oporu to ceny, przy których sprzedaż typowo przewyższa kupno, 
                  powodując zatrzymanie ruchu wzrostowego. Przebicie poziomu oporu może 
                  sygnalizować kontynuację trendu wzrostowego z nowym celem na wyższym poziomie.
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-3 text-green-600 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1.5" />
                  Poziomy Wsparcia
                </h3>
                <div className="space-y-3">
                  {supportLevels.map((level, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg border-l-2 border-green-500"
                    >
                      <div className="flex items-center">
                        <span className="text-green-600 font-bold mr-2">S{index+1}</span>
                        <span className="text-card-foreground font-medium">${level}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {((level / currentPrice - 1) * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Poziomy wsparcia to ceny, przy których kupno typowo przewyższa sprzedaż, 
                  zatrzymując ruch spadkowy. Przebicie poziomu wsparcia może sygnalizować 
                  kontynuację trendu spadkowego z nowym celem na niższym poziomie.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Technical Analysis Summary Card */}
      <Card className="bg-card text-card-foreground border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/80 h-1.5"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-primary" />
            Podsumowanie Analizy Technicznej
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-3">Stan Wskaźników</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                {name: 'RSI', value: technicalIndicators.rsi.value, status: getIndicatorHealth('rsi')},
                {name: 'MACD', value: technicalIndicators.macd.value > technicalIndicators.macd.signal ? 'Powyżej' : 'Poniżej', status: getIndicatorHealth('macd')},
                {name: 'Stochastic', value: technicalIndicators.stoch.k, status: getIndicatorHealth('stoch')},
                {name: 'Bollinger', value: currentPrice > technicalIndicators.bollinger.upper ? 'Ponad' : currentPrice < technicalIndicators.bollinger.lower ? 'Pod' : 'W środku', status: getIndicatorHealth('bollinger')},
                {name: 'Williams %R', value: technicalIndicators.williamsR.value, status: getIndicatorHealth('williamsR')}
              ].map((indicator, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-3 flex flex-col items-center ${
                    indicator.status === 'positive' ? 'bg-green-50 border border-green-500' : 
                    indicator.status === 'negative' ? 'bg-red-50 border border-red-500' : 
                    'bg-blue-50 border border-blue-500'
                  }`}
                >
                  <span className="text-sm font-medium mb-1">{indicator.name}</span>
                  <span className={`text-lg font-bold ${
                    indicator.status === 'positive' ? 'text-green-600' : 
                    indicator.status === 'negative' ? 'text-red-600' : 
                    'text-blue-600'
                  }`}>{indicator.value}</span>
                  <span className="text-xs mt-1">
                    {indicator.status === 'positive' ? 'Byczo' : 
                     indicator.status === 'negative' ? 'Niedźwiedzio' : 
                     'Neutralnie'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
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
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" /> :
                  (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-600" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                }
                <span className="font-medium">Perspektywa krótkoterminowa (1-7 dni)</span>
              </div>
              <p className="text-sm text-card-foreground">
                {(technicalIndicators.rsi.value < 30 || technicalIndicators.macd.value > technicalIndicators.macd.signal) ?
                  "Wskaźniki techniczne sugerują potencjalny krótkoterminowy wzrost. Momentum wskazuje na możliwe odbicie cenowe w najbliższych dniach, szczególnie jeśli wolumen potwierdzi zmianę kierunku." : 
                  (technicalIndicators.rsi.value > 70 || technicalIndicators.macd.value < technicalIndicators.macd.signal) ?
                  "Wskaźniki techniczne sugerują ostrożność w krótkim terminie. Wykres znajduje się w obszarze przewartościowania, a sygnały momentum wskazują na możliwą korektę spadkową w najbliższych dniach." : 
                  "Wskaźniki techniczne są neutralne w krótkim terminie. Brak wyraźnych sygnałów przewartościowania lub niedowartościowania. Cena może kontynuować konsolidację przed wybraniem kierunku."}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              (technicalIndicators.stoch.k < 20 || technicalIndicators.obv.change > 5) ?
              'border-green-500 bg-green-50' :
              (technicalIndicators.stoch.k > 80 || technicalIndicators.obv.change < -5) ?
              'border-red-500 bg-red-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center mb-2">
                {(technicalIndicators.stoch.k < 20 || technicalIndicators.obv.change > 5) ?
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" /> :
                  (technicalIndicators.stoch.k > 80 || technicalIndicators.obv.change < -5) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-600" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                }
                <span className="font-medium">Perspektywa średnioterminowa (1-4 tygodni)</span>
              </div>
              <p className="text-sm text-card-foreground">
                {(technicalIndicators.stoch.k < 20 || technicalIndicators.obv.change > 5) ?
                  "Wskaźniki średnioterminowe sugerują potencjalne umocnienie pozytywnego trendu. Pamiętaj, że mocne poziomy wsparcia na ${supportLevels[0]} mogą służyć jako baza dla dalszych wzrostów, jeśli zostaną utrzymane." : 
                  (technicalIndicators.stoch.k > 80 || technicalIndicators.obv.change < -5) ?
                  "Wskaźniki średnioterminowe wskazują na możliwe wyczerpanie trendu wzrostowego. Kluczowe poziomy oporu w okolicy ${resistanceLevels[0]} mogą stanowić barierę dla dalszych wzrostów w nadchodzących tygodniach." : 
                  "Wskaźniki średnioterminowe pozostają w równowadze. Rozważ obserwację kluczowych poziomów wsparcia i oporu, które mogą determinować kierunek w perspektywie kilku tygodni."}
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
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" /> :
                  (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
                  <TrendingDown className="h-5 w-5 mr-2 text-red-600" /> :
                  <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                }
                <span className="font-medium">Perspektywa długoterminowa (1-6 miesięcy)</span>
              </div>
              <p className="text-sm text-card-foreground">
                {(report.summaryData.netIncome.change > 10 || report.summaryData.revenue.change > 10) ?
                  "Fundamenty spółki wspierają pozytywną długoterminową perspektywę. Silne wyniki finansowe w połączeniu z technicznymi wskaźnikami momentum sugerują potencjał do dalszych wzrostów w perspektywie 6 miesięcy." : 
                  (report.summaryData.netIncome.change < -10 || report.summaryData.revenue.change < -10) ?
                  "Słabsze wyniki finansowe mogą sugerować trudności w utrzymaniu pozytywnego trendu długoterminowego. Monitoruj kluczowe wskaźniki fundamentalne jako potwierdzenie lub zaprzeczenie sygnałów technicznych." : 
                  "W perspektywie długoterminowej sytuacja techniczna pozostaje zrównoważona. Zwróć uwagę na fundamentalne czynniki wzrostu jako potencjalne katalizatory przyszłych ruchów cenowych."}
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded-lg border border-primary bg-primary/5">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
              <span className="font-medium">Ważna informacja</span>
            </div>
            <p className="text-sm text-card-foreground">
              Analiza techniczna powinna być stosowana w połączeniu z analizą fundamentalną i zarządzaniem ryzykiem. 
              Wyniki historyczne nie są gwarancją przyszłych rezultatów. Zawsze przeprowadzaj własne badania przed 
              podejmowaniem decyzji inwestycyjnych.
            </p>
            <p className="text-sm mt-2 text-card-foreground">
              Pamiętaj, że najlepsze wyniki daje połączenie wielu metod i narzędzi analitycznych. Pojedyncze wskaźniki 
              mogą generować fałszywe sygnały, dlatego szukaj potwierdzeń w różnych systemach technicznych.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
