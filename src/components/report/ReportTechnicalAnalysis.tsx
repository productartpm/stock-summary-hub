
import type { FinancialReport } from "@/lib/types";

interface ReportTechnicalAnalysisProps {
  report: FinancialReport;
}

export const ReportTechnicalAnalysis = ({ report }: ReportTechnicalAnalysisProps) => {
  const stockData = report.stockData;
  
  // Helper functions for technical analysis interpretation
  const getRSIInterpretation = (rsi: number) => {
    if (rsi >= 70) return { status: "wykupienie", signal: "sygnał sprzedaży" };
    if (rsi <= 30) return { status: "wyprzedanie", signal: "sygnał kupna" };
    return { status: "neutralna", signal: "brak silnego sygnału" };
  };

  const getMACDInterpretation = (macd: any) => {
    if (!macd) return { trend: "brak danych" };
    
    const signal = macd.value - macd.signal;
    if (signal > 0 && macd.value > 0) return { trend: "silny trend wzrostowy" };
    if (signal > 0 && macd.value < 0) return { trend: "słaby trend wzrostowy" };
    if (signal < 0 && macd.value > 0) return { trend: "słaby trend spadkowy" };
    return { trend: "trend spadkowy" };
  };

  const getStochasticInterpretation = (stoch: any) => {
    if (!stoch) return { status: "brak danych" };
    
    if (stoch.k <= 20 || stoch.d <= 20) return { status: "strefa wyprzedania" };
    if (stoch.k >= 80 || stoch.d >= 80) return { status: "strefa wykupienia" };
    return { status: "strefa neutralna" };
  };

  const getWilliamsRInterpretation = (williamsR: number) => {
    if (williamsR >= -20) return { status: "blisko punktu zwrotnego (wykupienie)" };
    if (williamsR <= -80) return { status: "blisko punktu zwrotnego (wyprzedanie)" };
    return { status: "strefa neutralna" };
  };

  const getVolumeInterpretation = (volumeChange: number) => {
    if (volumeChange > 50) return { interest: "bardzo wysokie zainteresowanie" };
    if (volumeChange > 20) return { interest: "podwyższone zainteresowanie" };
    if (volumeChange < -20) return { interest: "niskie zainteresowanie" };
    return { interest: "umiarkowane zainteresowanie" };
  };

  if (!report.ticker || report.ticker === 'N/A') {
    return (
      <div className="space-y-6 text-sm">
        <div>
          <h2 className="text-xl font-semibold mb-4">Analiza Techniczna</h2>
          <p className="text-gray-600">
            {report.companyName} nie jest spółką giełdową lub nie posiada dostępnych danych technicznych.
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
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="text-xl font-semibold mb-4">Analiza Techniczna</h2>
        
        {/* Główne wskaźniki techniczne */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Główne Wskaźniki Techniczne</h3>
          
          <p className="mb-1">
            <strong>RSI (Relative Strength Index):</strong> {stockData.rsi ? stockData.rsi.toFixed(1) : 'brak danych'}
          </p>
          {rsiInterpretation ? (
            <p className="mb-2 text-xs">
              Wskazuje na <strong>{rsiInterpretation.status}</strong> - {rsiInterpretation.signal}
            </p>
          ) : (
            <p className="mb-2 text-xs text-gray-600">Nie posiadamy danych RSI dla tej spółki</p>
          )}

          <p className="mb-1">
            <strong>MACD (Moving Average Convergence Divergence):</strong> {stockData.macd ? `${stockData.macd.value.toFixed(3)} (Signal: ${stockData.macd.signal.toFixed(3)})` : 'brak danych'}
          </p>
          <p className="mb-2 text-xs">
            {stockData.macd ? (
              <>Sygnalizuje <strong>{macdInterpretation.trend}</strong></>
            ) : (
              <>Nie posiadamy danych MACD dla tej spółki</>
            )}
          </p>

          <p className="mb-1">
            <strong>STOCH (Stochastic Oscillator):</strong> {stockData.stochastic ? `K: ${stockData.stochastic.k.toFixed(1)}, D: ${stockData.stochastic.d.toFixed(1)}` : 'brak danych'}
          </p>
          <p className="mb-2 text-xs">
            {stockData.stochastic ? (
              <>Akcje znajdują się w <strong>{stochInterpretation.status}</strong></>
            ) : (
              <>Nie posiadamy danych Stochastic dla tej spółki</>
            )}
          </p>

          <p className="mb-1">
            <strong>Williams %R:</strong> {stockData.williamsR ? `${stockData.williamsR.toFixed(1)}%` : 'brak danych'}
          </p>
          {williamsRInterpretation ? (
            <p className="mb-2 text-xs">
              Spółka jest <strong>{williamsRInterpretation.status}</strong>
            </p>
          ) : (
            <p className="mb-2 text-xs text-gray-600">Nie posiadamy danych Williams %R dla tej spółki</p>
          )}

          <p className="mb-1">
            <strong>Wolumen obrotu:</strong> {stockData.averageDailyVolume.toLocaleString()}
            {stockData.volumeChangePercent && ` (zmiana: ${stockData.volumeChangePercent >= 0 ? '+' : ''}${stockData.volumeChangePercent.toFixed(1)}%)`}
          </p>
          <p className="mb-2 text-xs">
            Rynek wykazuje <strong>{volumeInterpretation.interest}</strong>
          </p>
        </div>

        {/* Strategia dla inwestorów */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Strategia dla Inwestorów</h3>
          
          <p className="mb-1">
            <strong>Sygnały techniczne - dalsze wzrosty/spadki:</strong>
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            {stockData.rsi && stockData.rsi > 70 && (
              <li>RSI wykupiony: Możliwa korekta spadkowa w krótkim terminie</li>
            )}
            {stockData.rsi && stockData.rsi < 30 && (
              <li>RSI wyprzedany: Potencjał odbicia w górę</li>
            )}
            
            {stockData.macd && stockData.macd.value > stockData.macd.signal && (
              <li>MACD pozytywny: Kontynuacja trendu wzrostowego prawdopodobna</li>
            )}
            {stockData.macd && stockData.macd.value < stockData.macd.signal && (
              <li>MACD negatywny: Osłabienie momentum wzrostowego</li>
            )}
            
            {stockData.stochastic && (stockData.stochastic.k > 80 || stockData.stochastic.d > 80) && (
              <li>Stochastic wykupiony: Ryzyko spadków w najbliższym czasie</li>
            )}
            {stockData.stochastic && (stockData.stochastic.k < 20 || stockData.stochastic.d < 20) && (
              <li>Stochastic wyprzedany: Okazja do zakupu przy odbiciu</li>
            )}

            {(!stockData.rsi && !stockData.macd && !stockData.stochastic) && (
              <li>Brak wystarczających danych technicznych do precyzyjnej analizy sygnałów</li>
            )}
          </ul>

          <p className="mb-1">
            <strong>Poziomy wsparcia i oporu do obserwacji:</strong>
          </p>
          <p className="mb-1 text-xs">
            <strong>Poziomy wsparcia:</strong>
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            {stockData.supportLevels && stockData.supportLevels.length > 0 ? (
              stockData.supportLevels.map((level, index) => (
                <li key={index}>{level.toFixed(2)} {stockData.currentPrice > level ? '(aktywne)' : '(przełamane)'}</li>
              ))
            ) : (
              <>
                <li>{stockData.low52Week.toFixed(2)} (minimum 52-tygodniowe)</li>
                <li>{(stockData.currentPrice * 0.95).toFixed(2)} (5% poniżej ceny bieżącej)</li>
                <li>{(stockData.currentPrice * 0.90).toFixed(2)} (10% poniżej ceny bieżącej)</li>
              </>
            )}
          </ul>
          
          <p className="mb-1 text-xs">
            <strong>Poziomy oporu:</strong>
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            {stockData.resistanceLevels && stockData.resistanceLevels.length > 0 ? (
              stockData.resistanceLevels.map((level, index) => (
                <li key={index}>{level.toFixed(2)} {stockData.currentPrice < level ? '(aktywny)' : '(przełamany)'}</li>
              ))
            ) : (
              <>
                <li>{stockData.high52Week.toFixed(2)} (maksimum 52-tygodniowe)</li>
                <li>{(stockData.currentPrice * 1.05).toFixed(2)} (5% powyżej ceny bieżącej)</li>
                <li>{(stockData.currentPrice * 1.10).toFixed(2)} (10% powyżej ceny bieżącej)</li>
              </>
            )}
          </ul>
          
          {(!stockData.supportLevels || !stockData.resistanceLevels) && (
            <p className="text-xs text-gray-600 mb-2">
              Poziomy wsparcia i oporu obliczone na podstawie dostępnych danych cenowych. 
              Dokładne poziomy techniczne mogą wymagać bardziej szczegółowej analizy.
            </p>
          )}

          <p className="text-xs text-gray-600">
            <strong>Ostrzeżenie:</strong> Analiza techniczna bazuje na danych historycznych i nie gwarantuje przyszłych wyników. 
            Decyzje inwestycyjne powinny uwzględniać także analizę fundamentalną i czynniki makroekonomiczne.
            Dane techniczne mogą pochodzić z poprzedniego dnia sesyjnego.
          </p>
        </div>
      </div>
    </div>
  );
};
