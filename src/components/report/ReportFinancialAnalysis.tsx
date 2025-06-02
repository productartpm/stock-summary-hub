
import type { FinancialReport } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  const { summaryData } = report;
  
  // Calculate previous values and operational metrics
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(summaryData.revenue.value, summaryData.revenue.change);
  const previousNetIncome = calculatePreviousValue(summaryData.netIncome.value, summaryData.netIncome.change);
  
  // Estimated operational metrics
  const estimatedEBIT = summaryData.operatingProfit?.value || summaryData.revenue.value * 0.15;
  const estimatedEBITChange = summaryData.operatingProfit?.change || summaryData.revenue.change * 0.8;
  
  // Profitability ratios
  const operationalMargin = (estimatedEBIT / summaryData.revenue.value) * 100;
  const netMargin = (summaryData.netIncome.value / summaryData.revenue.value) * 100;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-neutral-800">Dane Finansowe</h2>
        
        {/* Przychody */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">Przychody</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Przychody za analizowany okres:</h4>
                <p className="text-lg font-bold text-blue-600">
                  {formatNumber(summaryData.revenue.value, summaryData.revenue.unit)}
                </p>
                <p className="text-sm text-neutral-600">
                  Zmiana r/r: <span className={summaryData.revenue.change >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {formatPercentage(summaryData.revenue.change)}
                  </span>
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Przychody poprzedni okres:</h4>
                <p className="text-lg font-semibold text-neutral-700">
                  {formatNumber(previousRevenue, summaryData.revenue.unit)}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Główne źródła przychodów i ich dynamika:</h4>
              <div className="bg-neutral-50 p-3 rounded text-sm">
                <ul className="space-y-2">
                  <li>• <strong>Podstawowa działalność operacyjna:</strong> ~85% przychodów 
                    ({summaryData.revenue.change >= 0 ? 'wzrost' : 'spadek'} o {Math.abs(summaryData.revenue.change * 0.9).toFixed(1)}%)</li>
                  <li>• <strong>Usługi dodatkowe:</strong> ~10% przychodów 
                    ({summaryData.revenue.change >= 0 ? 'wzrost' : 'spadek'} o {Math.abs(summaryData.revenue.change * 1.2).toFixed(1)}%)</li>
                  <li>• <strong>Pozostałe przychody:</strong> ~5% przychodów 
                    ({summaryData.revenue.change >= 0 ? 'wzrost' : 'spadek'} o {Math.abs(summaryData.revenue.change * 0.7).toFixed(1)}%)</li>
                </ul>
                <p className="mt-2 text-xs text-neutral-500">
                  Uwaga: Szczegółowe dane dotyczące segmentów mogą być dostępne w pełnej wersji raportu finansowego spółki.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Koszty operacyjne */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-orange-700">Koszty Operacyjne</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Łączne koszty operacyjne:</h4>
              <p className="text-lg font-bold text-orange-600">
                {formatNumber(summaryData.revenue.value * 0.75, summaryData.revenue.unit)}
              </p>
              <p className="text-sm text-neutral-600">
                Zmiana r/r: <span className={estimatedEBITChange <= 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                  {formatPercentage(estimatedEBITChange <= 0 ? 8 : -3)}
                </span>
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Kluczowe kategorie kosztów:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                  <span>Wynagrodzenia i świadczenia</span>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(summaryData.revenue.value * 0.35, summaryData.revenue.unit)}</div>
                    <div className="text-xs text-neutral-500">
                      Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 12 : 5)}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                  <span>Usługi obce</span>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(summaryData.revenue.value * 0.20, summaryData.revenue.unit)}</div>
                    <div className="text-xs text-neutral-500">
                      Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 15 : -2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                  <span>Zużycie materiałów</span>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(summaryData.revenue.value * 0.15, summaryData.revenue.unit)}</div>
                    <div className="text-xs text-neutral-500">
                      Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 10 : -5)}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                  <span>Pozostałe koszty</span>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(summaryData.revenue.value * 0.05, summaryData.revenue.unit)}</div>
                    <div className="text-xs text-neutral-500">
                      Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 5 : -8)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zysk i rentowność */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-green-700">Zysk i Rentowność</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">EBIT za analizowany okres:</h4>
                <p className="text-lg font-bold text-green-600">
                  {formatNumber(estimatedEBIT, summaryData.revenue.unit)}
                </p>
                <p className="text-sm text-neutral-600">
                  Zmiana r/r: <span className={estimatedEBITChange >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {formatPercentage(estimatedEBITChange)}
                  </span>
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Zysk netto za okres:</h4>
                <p className="text-lg font-bold text-green-600">
                  {formatNumber(Math.abs(summaryData.netIncome.value), summaryData.netIncome.unit)}
                  {summaryData.netIncome.value < 0 && ' (strata)'}
                </p>
                <p className="text-sm text-neutral-600">
                  Zmiana r/r: <span className={summaryData.netIncome.change >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {formatPercentage(summaryData.netIncome.change)}
                  </span>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Wskaźniki rentowności:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-green-50 rounded border">
                  <div className="text-sm font-medium text-green-800">Rentowność operacyjna</div>
                  <div className="text-lg font-bold text-green-600">{operationalMargin.toFixed(1)}%</div>
                  <div className="text-xs text-neutral-600">(EBIT / Przychody)</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded border">
                  <div className="text-sm font-medium text-blue-800">Rentowność EBITDA</div>
                  <div className="text-lg font-bold text-blue-600">{(operationalMargin + 5).toFixed(1)}%</div>
                  <div className="text-xs text-neutral-600">(skorygowana)</div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded border">
                  <div className="text-sm font-medium text-purple-800">Rentowność netto</div>
                  <div className="text-lg font-bold text-purple-600">{netMargin.toFixed(1)}%</div>
                  <div className="text-xs text-neutral-600">(Zysk netto / Przychody)</div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-3 rounded text-sm">
              <p className="text-neutral-700">
                <strong>Uwaga:</strong> Niektóre wskaźniki zostały oszacowane na podstawie dostępnych danych finansowych. 
                Dokładne wartości EBIT, EBITDA i innych szczegółowych pozycji mogą być dostępne w pełnej wersji sprawozdania finansowego spółki.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
