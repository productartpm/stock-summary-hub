
import type { FinancialReport } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, BarChart3, Target } from "lucide-react";

interface ReportTechnicalAnalysisProps {
  report: FinancialReport;
}

export const ReportTechnicalAnalysis = ({ report }: ReportTechnicalAnalysisProps) => {
  const { stockData } = report;

  if (!stockData) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-neutral-800">Analiza Techniczna</h2>
        <Card className="bg-neutral-800 text-white">
          <CardContent className="p-6">
            <p className="text-gray-300">Dane techniczne nie są dostępne dla tego raportu.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => `${price.toFixed(2)} PLN`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const getRSIColor = (rsi: number) => {
    if (rsi > 70) return "text-red-400";
    if (rsi < 30) return "text-green-400";
    return "text-yellow-400";
  };

  const getRSIDescription = (rsi: number) => {
    if (rsi > 70) return "Wykupienie";
    if (rsi < 30) return "Wyprzedanie";
    return "Neutralny";
  };

  const getTrendDirection = () => {
    if (stockData.priceChange > 0) return { icon: TrendingUp, color: "text-green-400", text: "Trend wzrostowy" };
    if (stockData.priceChange < 0) return { icon: TrendingDown, color: "text-red-400", text: "Trend spadkowy" };
    return { icon: Activity, color: "text-yellow-400", text: "Trend boczny" };
  };

  const trend = getTrendDirection();
  const TrendIcon = trend.icon;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Analiza Techniczna</h2>
      
      <div className="mb-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
        <p className="text-sm text-neutral-700 leading-relaxed">
          Analiza techniczna akcji {report.companyName} na podstawie kluczowych wskaźników i poziomów wsparcia/oporu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Kurs i trend */}
        <Card className="bg-neutral-800 text-white border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-blue-300">
              <TrendIcon className="h-5 w-5 mr-2 text-blue-500" />
              Kurs i Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Aktualny kurs:</span>
                <span className="font-semibold text-white">{formatPrice(stockData.currentPrice)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Zmiana dzisiaj:</span>
                <span className={`font-semibold ${stockData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stockData.priceChange >= 0 ? '+' : ''}{formatPercent(stockData.priceChange)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Trend:</span>
                <span className={`font-semibold ${trend.color}`}>{trend.text}</span>
              </div>

              <div className="border-t border-neutral-700 pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">Min 52 tyg:</span>
                  <span className="text-sm text-gray-300">{formatPrice(stockData.low52Week)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Max 52 tyg:</span>
                  <span className="text-sm text-gray-300">{formatPrice(stockData.high52Week)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RSI */}
        <Card className="bg-neutral-800 text-white border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-purple-300">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
              RSI (14)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Wartość:</span>
                <span className={`font-semibold text-2xl ${getRSIColor(stockData.rsi || 50)}`}>
                  {(stockData.rsi || 50).toFixed(1)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Status:</span>
                <span className={`font-semibold ${getRSIColor(stockData.rsi || 50)}`}>
                  {getRSIDescription(stockData.rsi || 50)}
                </span>
              </div>

              <div className="border-t border-neutral-700 pt-3">
                <div className="text-xs text-gray-400 mb-2">Interpretacja:</div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  {stockData.rsi && stockData.rsi > 70 ? 
                    "Akcja może być wykupiona. Rozważ sprzedaż lub czekaj na korektę." :
                    stockData.rsi && stockData.rsi < 30 ?
                    "Akcja może być wyprzedana. Potencjalna okazja do zakupu." :
                    "RSI w strefie neutralnej. Obserwuj inne wskaźniki."
                  }
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Poziomy wsparcia i oporu */}
      <Card className="bg-neutral-800 text-white border-l-4 border-l-amber-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-amber-300">
            <Target className="h-5 w-5 mr-2 text-amber-500" />
            Kluczowe Poziomy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-amber-300 mb-2">Poziomy Wsparcia</h4>
              <div className="space-y-1">
                {stockData.supportLevels?.map((level, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">S{index + 1}:</span>
                    <span className="text-sm text-green-400 font-medium">{formatPrice(level)}</span>
                  </div>
                )) || (
                  <span className="text-xs text-gray-400">Brak danych</span>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-amber-300 mb-2">Poziomy Oporu</h4>
              <div className="space-y-1">
                {stockData.resistanceLevels?.map((level, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">R{index + 1}:</span>
                    <span className="text-sm text-red-400 font-medium">{formatPrice(level)}</span>
                  </div>
                )) || (
                  <span className="text-xs text-gray-400">Brak danych</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-neutral-700 pt-3">
            <div className="text-xs text-gray-400 mb-2">Rekomendacja:</div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Obserwuj reakcję kursu na kluczowych poziomach wsparcia i oporu. 
              Przebicie poziomu oporu może sygnalizować kontynuację trendu wzrostowego, 
              natomiast spadek poniżej wsparcia może oznaczać dalsze osłabienie.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
