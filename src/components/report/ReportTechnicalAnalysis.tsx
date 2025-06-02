
import type { FinancialReport } from "@/lib/types";

interface ReportTechnicalAnalysisProps {
  report: FinancialReport;
}

export const ReportTechnicalAnalysis = ({ report }: ReportTechnicalAnalysisProps) => {
  const stockData = report.stockData;
  
  // Helper functions for technical analysis interpretation
  const getRSIInterpretation = (rsi: number) => {
    if (rsi >= 70) return { status: "wykupienie", signal: "sygnał sprzedaży", color: "red" };
    if (rsi <= 30) return { status: "wyprzedanie", signal: "sygnał kupna", color: "green" };
    return { status: "neutralna", signal: "brak silnego sygnału", color: "blue" };
  };

  const getMACDInterpretation = (macd: any) => {
    if (!macd) return { trend: "brak danych", color: "gray" };
    
    const signal = macd.value - macd.signal;
    if (signal > 0 && macd.value > 0) return { trend: "silny trend wzrostowy", color: "green" };
    if (signal > 0 && macd.value < 0) return { trend: "słaby trend wzrostowy", color: "green" };
    if (signal < 0 && macd.value > 0) return { trend: "słaby trend spadkowy", color: "red" };
    return { trend: "trend spadkowy", color: "red" };
  };

  const getStochasticInterpretation = (stoch: any) => {
    if (!stoch) return { status: "brak danych", color: "gray" };
    
    if (stoch.k <= 20 || stoch.d <= 20) return { status: "strefa wyprzedania", color: "green" };
    if (stoch.k >= 80 || stoch.d >= 80) return { status: "strefa wykupienia", color: "red" };
    return { status: "strefa neutralna", color: "blue" };
  };

  const getWilliamsRInterpretation = (williamsR: number) => {
    if (williamsR >= -20) return { status: "blisko punktu zwrotnego (wykupienie)", color: "red" };
    if (williamsR <= -80) return { status: "blisko punktu zwrotnego (wyprzedanie)", color: "green" };
    return { status: "strefa neutralna", color: "blue" };
  };

  const getVolumeInterpretation = (volumeChange: number) => {
    if (volumeChange > 50) return { interest: "bardzo wysokie zainteresowanie", color: "green" };
    if (volumeChange > 20) return { interest: "podwyższone zainteresowanie", color: "blue" };
    if (volumeChange < -20) return { interest: "niskie zainteresowanie", color: "red" };
    return { interest: "umiarkowane zainteresowanie", color: "gray" };
  };

  if (!report.ticker || report.ticker === 'N/A') {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analiza Techniczna</h1>
          <p className="text-gray-600">Analiza wskaźników technicznych dla spółek giełdowych</p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak danych technicznych</h3>
          <p className="text-gray-600">
            {report.companyName} nie jest spółką giełdową lub nie posiada dostępnych danych technicznych do analizy.
          </p>
        </div>
      </div>
    );
  }

  const rsiInterpretation = stockData.rsi ? getRSIInterpretation(stockData.rsi) : null;
  const macdInterpretation = getMACDInterpretation(stockData.macd);
  const stochInterpretation = getStochasticInterpretation(stockData.stochastic);
  const williamsRInterpretation = stockData.williamsR ? getWilliamsRInterpretation(stockData.williamsR) : null;
  const volumeInterpretation = getVolumeInterpretation(stockData.volumeChangePercent || 0);
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analiza Techniczna</h1>
        <p className="text-gray-600">Wskaźniki techniczne i strategia inwestycyjna dla {report.ticker}</p>
      </div>
      
      {/* Główne wskaźniki techniczne */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Główne Wskaźniki Techniczne</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="grid gap-4">
            {/* RSI */}
            <div className="bg-white p-4 rounded border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">RSI (Relative Strength Index)</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stockData.rsi ? stockData.rsi.toFixed(1) : 'brak danych'}
                  </p>
                </div>
                {rsiInterpretation && (
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    rsiInterpretation.color === 'red' ? 'bg-red-100 text-red-800' :
                    rsiInterpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {rsiInterpretation.status}
                  </span>
                )}
              </div>
              {rsiInterpretation ? (
                <p className="text-sm text-gray-700">
                  Wskazuje na <strong>{rsiInterpretation.status}</strong> - {rsiInterpretation.signal}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Nie posiadamy danych RSI dla tej spółki</p>
              )}
            </div>

            {/* MACD */}
            <div className="bg-white p-4 rounded border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">MACD (Moving Average Convergence Divergence)</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {stockData.macd ? `${stockData.macd.value.toFixed(3)}` : 'brak danych'}
                  </p>
                  {stockData.macd && (
                    <p className="text-sm text-gray-600">Signal: {stockData.macd.signal.toFixed(3)}</p>
                  )}
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  macdInterpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                  macdInterpretation.color === 'red' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {macdInterpretation.trend.includes('wzrost') ? 'Wzrostowy' : 
                   macdInterpretation.trend.includes('spadk') ? 'Spadkowy' : 'Brak danych'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {stockData.macd ? (
                  <>Sygnalizuje <strong>{macdInterpretation.trend}</strong></>
                ) : (
                  <>Nie posiadamy danych MACD dla tej spółki</>
                )}
              </p>
            </div>

            {/* STOCH */}
            <div className="bg-white p-4 rounded border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">STOCH (Stochastic Oscillator)</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {stockData.stochastic ? `K: ${stockData.stochastic.k.toFixed(1)}, D: ${stockData.stochastic.d.toFixed(1)}` : 'brak danych'}
                  </p>
                </div>
                {stockData.stochastic && (
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    stochInterpretation.color === 'red' ? 'bg-red-100 text-red-800' :
                    stochInterpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {stochInterpretation.status.includes('wykup') ? 'Wykupienie' :
                     stochInterpretation.status.includes('wyprz') ? 'Wyprzedanie' : 'Neutralne'}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">
                {stockData.stochastic ? (
                  <>Akcje znajdują się w <strong>{stochInterpretation.status}</strong></>
                ) : (
                  <>Nie posiadamy danych Stochastic dla tej spółki</>
                )}
              </p>
            </div>

            {/* Williams %R */}
            <div className="bg-white p-4 rounded border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Williams %R</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {stockData.williamsR ? `${stockData.williamsR.toFixed(1)}%` : 'brak danych'}
                  </p>
                </div>
                {williamsRInterpretation && (
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    williamsRInterpretation.color === 'red' ? 'bg-red-100 text-red-800' :
                    williamsRInterpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {williamsRInterpretation.status.includes('wykup') ? 'Wykupienie' :
                     williamsRInterpretation.status.includes('wyprz') ? 'Wyprzedanie' : 'Neutralne'}
                  </span>
                )}
              </div>
              {williamsRInterpretation ? (
                <p className="text-sm text-gray-700">
                  Spółka jest <strong>{williamsRInterpretation.status}</strong>
                </p>
              ) : (
                <p className="text-sm text-gray-500">Nie posiadamy danych Williams %R dla tej spółki</p>
              )}
            </div>

            {/* Wolumen */}
            <div className="bg-white p-4 rounded border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Wolumen obrotu</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {stockData.averageDailyVolume.toLocaleString()}
                  </p>
                  {stockData.volumeChangePercent && (
                    <p className={`text-sm font-medium ${stockData.volumeChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Zmiana: {stockData.volumeChangePercent >= 0 ? '+' : ''}{stockData.volumeChangePercent.toFixed(1)}%
                    </p>
                  )}
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  volumeInterpretation.color === 'green' ? 'bg-green-100 text-green-800' :
                  volumeInterpretation.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  volumeInterpretation.color === 'red' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {volumeInterpretation.interest.includes('wysokie') ? 'Wysokie' :
                   volumeInterpretation.interest.includes('podwyższone') ? 'Podwyższone' :
                   volumeInterpretation.interest.includes('niskie') ? 'Niskie' : 'Umiarkowane'}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Rynek wykazuje <strong>{volumeInterpretation.interest}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategia dla inwestorów */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Strategia dla Inwestorów</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Sygnały techniczne - dalsze wzrosty/spadki</h3>
            
            <div className="bg-white p-4 rounded border">
              <div className="space-y-3">
                {stockData.rsi && stockData.rsi > 70 && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">RSI wykupiony: Możliwa korekta spadkowa w krótkim terminie</p>
                  </div>
                )}
                {stockData.rsi && stockData.rsi < 30 && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">RSI wyprzedany: Potencjał odbicia w górę</p>
                  </div>
                )}
                
                {stockData.macd && stockData.macd.value > stockData.macd.signal && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">MACD pozytywny: Kontynuacja trendu wzrostowego prawdopodobna</p>
                  </div>
                )}
                {stockData.macd && stockData.macd.value < stockData.macd.signal && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">MACD negatywny: Osłabienie momentum wzrostowego</p>
                  </div>
                )}
                
                {stockData.stochastic && (stockData.stochastic.k > 80 || stockData.stochastic.d > 80) && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Stochastic wykupiony: Ryzyko spadków w najbliższym czasie</p>
                  </div>
                )}
                {stockData.stochastic && (stockData.stochastic.k < 20 || stockData.stochastic.d < 20) && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Stochastic wyprzedany: Okazja do zakupu przy odbiciu</p>
                  </div>
                )}

                {(!stockData.rsi && !stockData.macd && !stockData.stochastic) && (
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Brak wystarczających danych technicznych do precyzyjnej analizy sygnałów</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Poziomy wsparcia i oporu do obserwacji</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-green-800 mb-3">Poziomy wsparcia</h4>
                <div className="space-y-2">
                  {stockData.supportLevels && stockData.supportLevels.length > 0 ? (
                    stockData.supportLevels.map((level, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{level.toFixed(2)}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          stockData.currentPrice > level ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {stockData.currentPrice > level ? 'aktywne' : 'przełamane'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{stockData.low52Week.toFixed(2)}</span>
                        <span className="text-xs text-gray-600">minimum 52-tyg.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{(stockData.currentPrice * 0.95).toFixed(2)}</span>
                        <span className="text-xs text-gray-600">-5% od ceny</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{(stockData.currentPrice * 0.90).toFixed(2)}</span>
                        <span className="text-xs text-gray-600">-10% od ceny</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium text-red-800 mb-3">Poziomy oporu</h4>
                <div className="space-y-2">
                  {stockData.resistanceLevels && stockData.resistanceLevels.length > 0 ? (
                    stockData.resistanceLevels.map((level, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{level.toFixed(2)}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          stockData.currentPrice < level ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {stockData.currentPrice < level ? 'aktywny' : 'przełamany'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{stockData.high52Week.toFixed(2)}</span>
                        <span className="text-xs text-gray-600">maksimum 52-tyg.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{(stockData.currentPrice * 1.05).toFixed(2)}</span>
                        <span className="text-xs text-gray-600">+5% od ceny</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{(stockData.currentPrice * 1.10).toFixed(2)}</span>
                        <span className="text-xs text-gray-600">+10% od ceny</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {(!stockData.supportLevels || !stockData.resistanceLevels) && (
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400 mt-4">
                <p className="text-xs text-blue-800">
                  Poziomy wsparcia i oporu obliczone na podstawie dostępnych danych cenowych. 
                  Dokładne poziomy techniczne mogą wymagać bardziej szczegółowej analizy.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <div className="flex items-start">
            <div className="w-5 h-5 text-yellow-600 mr-3 mt-0.5">⚠️</div>
            <div>
              <p className="text-sm font-medium text-yellow-900 mb-1">Ostrzeżenie</p>
              <p className="text-xs text-yellow-800">
                Analiza techniczna bazuje na danych historycznych i nie gwarantuje przyszłych wyników. 
                Decyzje inwestycyjne powinny uwzględniać także analizę fundamentalną i czynniki makroekonomiczne.
                Dane techniczne mogą pochodzić z poprzedniego dnia sesyjnego.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
