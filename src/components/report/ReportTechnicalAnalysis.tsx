
import type { FinancialReport } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface ReportTechnicalAnalysisProps {
  report: FinancialReport;
}

export const ReportTechnicalAnalysis = ({ report }: ReportTechnicalAnalysisProps) => {
  const stockData = report.stockData;
  
  // Helper functions for technical analysis interpretation
  const getRSIInterpretation = (rsi: number) => {
    if (rsi >= 70) return { status: "wykupienie", color: "text-red-600", signal: "sygnał sprzedaży" };
    if (rsi <= 30) return { status: "wyprzedanie", color: "text-green-600", signal: "sygnał kupna" };
    return { status: "neutralna", color: "text-blue-600", signal: "brak silnego sygnału" };
  };

  const getMACDInterpretation = (macd: any) => {
    if (!macd) return { trend: "brak danych", color: "text-gray-600" };
    
    const signal = macd.value - macd.signal;
    if (signal > 0 && macd.value > 0) return { trend: "silny trend wzrostowy", color: "text-green-600" };
    if (signal > 0 && macd.value < 0) return { trend: "słaby trend wzrostowy", color: "text-green-500" };
    if (signal < 0 && macd.value > 0) return { trend: "słaby trend spadkowy", color: "text-red-500" };
    return { trend: "trend spadkowy", color: "text-red-600" };
  };

  const getStochasticInterpretation = (stoch: any) => {
    if (!stoch) return { status: "brak danych", color: "text-gray-600" };
    
    if (stoch.k <= 20 || stoch.d <= 20) return { status: "strefa wyprzedania", color: "text-green-600" };
    if (stoch.k >= 80 || stoch.d >= 80) return { status: "strefa wykupienia", color: "text-red-600" };
    return { status: "strefa neutralna", color: "text-blue-600" };
  };

  const getWilliamsRInterpretation = (williamsR: number) => {
    if (williamsR >= -20) return { status: "blisko punktu zwrotnego (wykupienie)", color: "text-red-600" };
    if (williamsR <= -80) return { status: "blisko punktu zwrotnego (wyprzedanie)", color: "text-green-600" };
    return { status: "strefa neutralna", color: "text-blue-600" };
  };

  const getVolumeInterpretation = (volumeChange: number, avgVolume: number) => {
    if (volumeChange > 50) return { 
      interest: "bardzo wysokie zainteresowanie", 
      color: "text-green-600",
      description: "znacznie powyżej średniej"
    };
    if (volumeChange > 20) return { 
      interest: "podwyższone zainteresowanie", 
      color: "text-blue-600",
      description: "powyżej średniej"
    };
    if (volumeChange < -20) return { 
      interest: "niskie zainteresowanie", 
      color: "text-red-600",
      description: "poniżej średniej"
    };
    return { 
      interest: "umiarkowane zainteresowanie", 
      color: "text-neutral-600",
      description: "na poziomie średniej"
    };
  };

  if (!report.ticker || report.ticker === 'N/A') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-neutral-800">Analiza Techniczna</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-700 mb-2">
                  Analiza techniczna niedostępna
                </h3>
                <p className="text-neutral-600">
                  {report.companyName} nie jest spółką giełdową lub nie posiada dostępnych danych technicznych.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const rsiInterpretation = stockData.rsi ? getRSIInterpretation(stockData.rsi) : null;
  const macdInterpretation = getMACDInterpretation(stockData.macd);
  const stochInterpretation = getStochasticInterpretation(stockData.stochastic);
  const williamsRInterpretation = stockData.williamsR ? getWilliamsRInterpretation(stockData.williamsR) : null;
  const volumeInterpretation = getVolumeInterpretation(
    stockData.volumeChangePercent || 0, 
    stockData.averageDailyVolume
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-neutral-800">Analiza Techniczna</h2>
        
        {/* Główne wskaźniki techniczne */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">Główne wskaźniki techniczne</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* RSI */}
            <div className="border-b border-neutral-200 pb-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">RSI (Relative Strength Index)</h4>
                {stockData.rsi ? (
                  <span className="text-lg font-bold">{stockData.rsi.toFixed(1)}</span>
                ) : (
                  <span className="text-sm text-neutral-500">Brak danych</span>
                )}
              </div>
              {rsiInterpretation ? (
                <p className={`text-sm ${rsiInterpretation.color}`}>
                  Wskazuje na <strong>{rsiInterpretation.status}</strong> - {rsiInterpretation.signal}
                </p>
              ) : (
                <p className="text-sm text-neutral-500">Nie posiadamy danych RSI dla tej spółki</p>
              )}
            </div>

            {/* MACD */}
            <div className="border-b border-neutral-200 pb-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">MACD (Moving Average Convergence Divergence)</h4>
                {stockData.macd ? (
                  <div className="text-right">
                    <div className="text-lg font-bold">{stockData.macd.value.toFixed(3)}</div>
                    <div className="text-xs text-neutral-500">Signal: {stockData.macd.signal.toFixed(3)}</div>
                  </div>
                ) : (
                  <span className="text-sm text-neutral-500">Brak danych</span>
                )}
              </div>
              <p className={`text-sm ${macdInterpretation.color}`}>
                {stockData.macd ? (
                  <>Sygnalizuje <strong>{macdInterpretation.trend}</strong></>
                ) : (
                  <>Nie posiadamy danych MACD dla tej spółki</>
                )}
              </p>
            </div>

            {/* Stochastic */}
            <div className="border-b border-neutral-200 pb-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">STOCH (Stochastic Oscillator)</h4>
                {stockData.stochastic ? (
                  <div className="text-right">
                    <div className="text-lg font-bold">K: {stockData.stochastic.k.toFixed(1)}</div>
                    <div className="text-xs text-neutral-500">D: {stockData.stochastic.d.toFixed(1)}</div>
                  </div>
                ) : (
                  <span className="text-sm text-neutral-500">Brak danych</span>
                )}
              </div>
              <p className={`text-sm ${stochInterpretation.color}`}>
                {stockData.stochastic ? (
                  <>Akcje znajdują się w <strong>{stochInterpretation.status}</strong></>
                ) : (
                  <>Nie posiadamy danych Stochastic dla tej spółki</>
                )}
              </p>
            </div>

            {/* Williams %R */}
            <div className="border-b border-neutral-200 pb-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Williams %R</h4>
                {stockData.williamsR ? (
                  <span className="text-lg font-bold">{stockData.williamsR.toFixed(1)}%</span>
                ) : (
                  <span className="text-sm text-neutral-500">Brak danych</span>
                )}
              </div>
              {williamsRInterpretation ? (
                <p className={`text-sm ${williamsRInterpretation.color}`}>
                  Spółka jest <strong>{williamsRInterpretation.status}</strong>
                </p>
              ) : (
                <p className="text-sm text-neutral-500">Nie posiadamy danych Williams %R dla tej spółki</p>
              )}
            </div>

            {/* Volume */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Wolumen obrotu</h4>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {stockData.averageDailyVolume.toLocaleString()}
                  </div>
                  {stockData.volumeChangePercent && (
                    <div className={`text-xs ${stockData.volumeChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stockData.volumeChangePercent >= 0 ? '+' : ''}{stockData.volumeChangePercent.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-sm ${volumeInterpretation.color}`}>
                Rynek wykazuje <strong>{volumeInterpretation.interest}</strong> ({volumeInterpretation.description})
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Strategia dla inwestorów */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-700">Strategia dla inwestorów</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Sygnały techniczne - dalsze wzrosty/spadki:</h4>
              <div className="bg-purple-50 p-3 rounded text-sm">
                <ul className="space-y-2 text-purple-800">
                  {stockData.rsi && stockData.rsi > 70 && (
                    <li>• <strong>RSI wykupiony:</strong> Możliwa korekta spadkowa w krótkim terminie</li>
                  )}
                  {stockData.rsi && stockData.rsi < 30 && (
                    <li>• <strong>RSI wyprzedany:</strong> Potencjał odbicia w górę</li>
                  )}
                  
                  {stockData.macd && stockData.macd.value > stockData.macd.signal && (
                    <li>• <strong>MACD pozytywny:</strong> Kontynuacja trendu wzrostowego prawdopodobna</li>
                  )}
                  {stockData.macd && stockData.macd.value < stockData.macd.signal && (
                    <li>• <strong>MACD negatywny:</strong> Osłabienie momentum wzrostowego</li>
                  )}
                  
                  {stockData.stochastic && (stockData.stochastic.k > 80 || stockData.stochastic.d > 80) && (
                    <li>• <strong>Stochastic wykupiony:</strong> Ryzyko spadków w najbliższym czasie</li>
                  )}
                  {stockData.stochastic && (stockData.stochastic.k < 20 || stockData.stochastic.d < 20) && (
                    <li>• <strong>Stochastic wyprzedany:</strong> Okazja do zakupu przy odbiciu</li>
                  )}

                  {(!stockData.rsi && !stockData.macd && !stockData.stochastic) && (
                    <li>• Brak wystarczających danych technicznych do precyzyjnej analizy sygnałów</li>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Poziomy wsparcia i oporu do obserwacji:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded">
                  <h5 className="font-medium text-green-800 mb-2">Poziomy wsparcia</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    {stockData.supportLevels && stockData.supportLevels.length > 0 ? (
                      stockData.supportLevels.map((level, index) => (
                        <li key={index}>• {level.toFixed(2)} {stockData.currentPrice > level ? '(aktywne)' : '(przełamane)'}</li>
                      ))
                    ) : (
                      <>
                        <li>• {stockData.low52Week.toFixed(2)} (minimum 52-tygodniowe)</li>
                        <li>• {(stockData.currentPrice * 0.95).toFixed(2)} (5% poniżej ceny bieżącej)</li>
                        <li>• {(stockData.currentPrice * 0.90).toFixed(2)} (10% poniżej ceny bieżącej)</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="bg-red-50 p-3 rounded">
                  <h5 className="font-medium text-red-800 mb-2">Poziomy oporu</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    {stockData.resistanceLevels && stockData.resistanceLevels.length > 0 ? (
                      stockData.resistanceLevels.map((level, index) => (
                        <li key={index}>• {level.toFixed(2)} {stockData.currentPrice < level ? '(aktywny)' : '(przełamany)'}</li>
                      ))
                    ) : (
                      <>
                        <li>• {stockData.high52Week.toFixed(2)} (maksimum 52-tygodniowe)</li>
                        <li>• {(stockData.currentPrice * 1.05).toFixed(2)} (5% powyżej ceny bieżącej)</li>
                        <li>• {(stockData.currentPrice * 1.10).toFixed(2)} (10% powyżej ceny bieżącej)</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              {(!stockData.supportLevels || !stockData.resistanceLevels) && (
                <p className="text-xs text-neutral-500 mt-2">
                  Poziomy wsparcia i oporu obliczone na podstawie dostępnych danych cenowych. 
                  Dokładne poziomy techniczne mogą wymagać bardziej szczegółowej analizy.
                </p>
              )}
            </div>

            <div className="bg-amber-50 p-3 rounded">
              <h5 className="font-medium text-amber-800 mb-2">Ostrzeżenie</h5>
              <p className="text-xs text-amber-700">
                Analiza techniczna bazuje na danych historycznych i nie gwarantuje przyszłych wyników. 
                Decyzje inwestycyjne powinny uwzględniać także analizę fundamentalną i czynniki makroekonomiczne.
                Dane techniczne mogą pochodzić z poprzedniego dnia sesyjnego.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
