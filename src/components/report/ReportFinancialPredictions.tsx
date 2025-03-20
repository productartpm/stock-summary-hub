
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus, PieChart, BarChart4, LineChart } from "lucide-react";

interface ReportFinancialPredictionsProps {
  report: FinancialReport;
}

export const ReportFinancialPredictions = ({ report }: ReportFinancialPredictionsProps) => {
  // Generate predictions based on current data
  const scenarioData = {
    optimistic: {
      revenueGrowth: report.summaryData.revenue.change > 0 ? report.summaryData.revenue.change + 5 : 5,
      epsGrowth: report.summaryData.eps?.change > 0 ? report.summaryData.eps.change + 7 : 7,
      description: `Wzrost przekraczający oczekiwania, udane wprowadzenia nowych produktów i ekspansja rynkowa. Firma może liczyć na zwiększone zainteresowanie inwestorów oraz poprawę wskaźników finansowych. Przewidywane jest również zmniejszenie kosztów operacyjnych dzięki optymalizacji procesów wewnętrznych.`
    },
    neutral: {
      revenueGrowth: report.summaryData.revenue.change > 0 ? report.summaryData.revenue.change : 0,
      epsGrowth: report.summaryData.eps?.change > 0 ? report.summaryData.eps.change : 0,
      description: `Stabilne wyniki zgodne ze średnimi branżowymi i konsekwentna realizacja obecnej strategii. Firma utrzyma obecną pozycję rynkową bez znaczących zmian w strukturze przychodów. Koszty operacyjne pozostaną na podobnym poziomie, a inwestycje będą kontynuowane w umiarkowanym tempie.`
    },
    pessimistic: {
      revenueGrowth: report.summaryData.revenue.change < 0 ? report.summaryData.revenue.change : -5,
      epsGrowth: report.summaryData.eps?.change < 0 ? report.summaryData.eps.change : -5,
      description: `Utrzymujące się wyzwania rynkowe, presja kosztowa i przeciwności konkurencyjne wpływające na wyniki. Możliwe opóźnienia w realizacji kluczowych projektów oraz konieczność rewizji planów inwestycyjnych. Spółka może napotkać trudności w utrzymaniu marży operacyjnej i rentowności netto.`
    }
  };

  // Calculate estimated future values
  const currentRevenue = report.summaryData.revenue.value;
  const currentEps = report.summaryData.eps?.value || 0;
  const revenueUnit = report.summaryData.revenue.unit || '';
  const epsUnit = report.summaryData.eps?.unit || '';

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Predykcje Finansowe</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <BarChart4 className="h-5 w-5 mr-2 text-amber-300" />
              Przychody - Prognoza Roczna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Obecny przychód roczny:</span>
                <span className="font-semibold">{formatNumber(currentRevenue * 4, revenueUnit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scenariusz optymistyczny:</span>
                <span className="font-semibold text-green-400">
                  {formatNumber(currentRevenue * 4 * (1 + scenarioData.optimistic.revenueGrowth/100), revenueUnit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scenariusz neutralny:</span>
                <span className="font-semibold text-amber-300">
                  {formatNumber(currentRevenue * 4 * (1 + scenarioData.neutral.revenueGrowth/100), revenueUnit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scenariusz pesymistyczny:</span>
                <span className="font-semibold text-red-400">
                  {formatNumber(currentRevenue * 4 * (1 + scenarioData.pessimistic.revenueGrowth/100), revenueUnit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <LineChart className="h-5 w-5 mr-2 text-amber-300" />
              Zysk na Akcję - Prognoza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Obecny EPS:</span>
                <span className="font-semibold">{formatNumber(currentEps, epsUnit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scenariusz optymistyczny:</span>
                <span className="font-semibold text-green-400">
                  {formatNumber(currentEps * (1 + scenarioData.optimistic.epsGrowth/100), epsUnit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scenariusz neutralny:</span>
                <span className="font-semibold text-amber-300">
                  {formatNumber(currentEps * (1 + scenarioData.neutral.epsGrowth/100), epsUnit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scenariusz pesymistyczny:</span>
                <span className="font-semibold text-red-400">
                  {formatNumber(currentEps * (1 + scenarioData.pessimistic.epsGrowth/100), epsUnit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              Scenariusz Optymistyczny
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-300">Prognoza Przychodów</div>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(currentRevenue * (1 + scenarioData.optimistic.revenueGrowth/100), revenueUnit)}
                </div>
                <div className="text-sm text-green-400">+{scenarioData.optimistic.revenueGrowth.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Prognoza EPS</div>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(currentEps * (1 + scenarioData.optimistic.epsGrowth/100), epsUnit)}
                </div>
                <div className="text-sm text-green-400">+{scenarioData.optimistic.epsGrowth.toFixed(1)}%</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">{scenarioData.optimistic.description}</p>
            
            <div className="mt-3 pt-3 border-t border-neutral-700">
              <h4 className="text-sm font-medium mb-2 text-amber-300">Kluczowe czynniki wzrostu:</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Zwiększenie udziału w rynku o 2-3 punkty procentowe</li>
                <li>• Wprowadzenie 2-3 nowych produktów z wysoką marżą</li>
                <li>• Optymalizacja łańcucha dostaw i obniżenie kosztów</li>
                <li>• Rozwój kanałów sprzedaży międzynarodowej</li>
                <li>• Korzystne zmiany regulacyjne w sektorze</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <Minus className="h-5 w-5 mr-2 text-amber-300" />
              Scenariusz Neutralny
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-300">Prognoza Przychodów</div>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(currentRevenue * (1 + scenarioData.neutral.revenueGrowth/100), revenueUnit)}
                </div>
                <div className="text-sm text-amber-300">{scenarioData.neutral.revenueGrowth >= 0 ? '+' : ''}{scenarioData.neutral.revenueGrowth.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Prognoza EPS</div>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(currentEps * (1 + scenarioData.neutral.epsGrowth/100), epsUnit)}
                </div>
                <div className="text-sm text-amber-300">{scenarioData.neutral.epsGrowth >= 0 ? '+' : ''}{scenarioData.neutral.epsGrowth.toFixed(1)}%</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">{scenarioData.neutral.description}</p>
            
            <div className="mt-3 pt-3 border-t border-neutral-700">
              <h4 className="text-sm font-medium mb-2 text-amber-300">Kluczowe założenia:</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Utrzymanie obecnej bazy klientów</li>
                <li>• Stabilne marże operacyjne</li>
                <li>• Kontynuacja obecnych projektów R&D</li>
                <li>• Brak znaczących zmian regulacyjnych</li>
                <li>• Umiarkowane inwestycje w modernizację</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <TrendingDown className="h-5 w-5 mr-2 text-red-400" />
              Scenariusz Pesymistyczny
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-300">Prognoza Przychodów</div>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(currentRevenue * (1 + scenarioData.pessimistic.revenueGrowth/100), revenueUnit)}
                </div>
                <div className="text-sm text-red-400">{scenarioData.pessimistic.revenueGrowth >= 0 ? '+' : ''}{scenarioData.pessimistic.revenueGrowth.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Prognoza EPS</div>
                <div className="text-lg font-semibold text-white">
                  {formatNumber(currentEps * (1 + scenarioData.pessimistic.epsGrowth/100), epsUnit)}
                </div>
                <div className="text-sm text-red-400">{scenarioData.pessimistic.epsGrowth >= 0 ? '+' : ''}{scenarioData.pessimistic.epsGrowth.toFixed(1)}%</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">{scenarioData.pessimistic.description}</p>
            
            <div className="mt-3 pt-3 border-t border-neutral-700">
              <h4 className="text-sm font-medium mb-2 text-amber-300">Czynniki ryzyka:</h4>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Zwiększona konkurencja cenowa</li>
                <li>• Wzrost kosztów surowców i energii</li>
                <li>• Spowolnienie gospodarcze w kluczowych rynkach</li>
                <li>• Opóźnienia w realizacji strategicznych projektów</li>
                <li>• Niekorzystne zmiany regulacyjne lub podatkowe</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {report.outlook && (
        <div className="mt-4">
          <Card className="bg-neutral-800 text-white border-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-300">Prognoza Zarządu</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p className="mb-3">{report.outlook.statement}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {report.outlook.guidanceRevenue && (
                  <div className="bg-neutral-700 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-1 text-amber-300">Przychody - Cel Roczny</h4>
                    <div className="text-base font-semibold">
                      {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
                    </div>
                    <p className="text-xs mt-1 text-gray-400">Według oficjalnej prognozy Zarządu</p>
                  </div>
                )}
                
                {report.outlook.guidanceEps && (
                  <div className="bg-neutral-700 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-1 text-amber-300">EPS - Cel Roczny</h4>
                    <div className="text-base font-semibold">
                      {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
                    </div>
                    <p className="text-xs mt-1 text-gray-400">Według oficjalnej prognozy Zarządu</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
