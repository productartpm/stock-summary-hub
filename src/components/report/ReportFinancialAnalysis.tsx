
import type { FinancialReport } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  const operatingProfit = report.summaryData.operatingProfit?.value ?? 0;
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const epsChange = report.summaryData.eps?.change ?? 0;
  const eps = report.summaryData.eps?.value ?? 0;
  const roe = report.summaryData.roe?.value ?? 0;
  const roeChange = report.summaryData.roe?.change ?? 0;
  const ebitda = report.summaryData.ebitda?.value ?? 0;
  const ebitdaChange = report.summaryData.ebitda?.change ?? 0;

  // Calculate previous values based on change percentage
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(report.summaryData.revenue.value, report.summaryData.revenue.change);
  const previousOperatingProfit = calculatePreviousValue(operatingProfit, operatingProfitChange);
  const previousNetIncome = calculatePreviousValue(report.summaryData.netIncome.value, netIncomeChange);
  const previousEps = calculatePreviousValue(eps, epsChange);
  const previousRoe = calculatePreviousValue(roe, roeChange);
  const previousEbitda = calculatePreviousValue(ebitda, ebitdaChange);

  // Calculate margins
  const netMargin = (report.summaryData.netIncome.value / report.summaryData.revenue.value) * 100;
  const operatingMargin = (operatingProfit / report.summaryData.revenue.value) * 100;
  const previousNetMargin = (previousNetIncome / previousRevenue) * 100;
  const previousOperatingMargin = (previousOperatingProfit / previousRevenue) * 100;
  const netMarginChange = netMargin - previousNetMargin;
  const operatingMarginChange = operatingMargin - previousOperatingMargin;

  return (
    <div className="space-y-6">
      {/* Nagłówek sekcji */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Analiza Finansowa</h2>
        <p className="text-sm text-gray-600 mt-2">Szczegółowe porównanie wyników finansowych między okresami</p>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Wyniki Finansowe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Tabela z danymi finansowymi */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Wskaźnik</TableHead>
                  <TableHead className="text-right font-semibold text-gray-900">Poprzedni okres</TableHead>
                  <TableHead className="text-right font-semibold text-gray-900">Bieżący okres</TableHead>
                  <TableHead className="text-right font-semibold text-gray-900">Zmiana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">Przychody</TableCell>
                  <TableCell className="text-right text-gray-700">
                    {formatNumber(previousRevenue, report.summaryData.revenue.unit)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-900">
                    {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(report.summaryData.revenue.change)}
                  </TableCell>
                </TableRow>
                
                {ebitda > 0 && (
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">EBITDA</TableCell>
                    <TableCell className="text-right text-gray-700">
                      {formatNumber(previousEbitda, report.summaryData.ebitda?.unit)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatNumber(ebitda, report.summaryData.ebitda?.unit)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${ebitdaChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(ebitdaChange)}
                    </TableCell>
                  </TableRow>
                )}
                
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">Zysk Operacyjny</TableCell>
                  <TableCell className="text-right text-gray-700">
                    {formatNumber(previousOperatingProfit, report.summaryData.operatingProfit?.unit)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-900">
                    {formatNumber(operatingProfit, report.summaryData.operatingProfit?.unit)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${operatingProfitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(operatingProfitChange)}
                  </TableCell>
                </TableRow>
                
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">Zysk Netto</TableCell>
                  <TableCell className="text-right text-gray-700">
                    {formatNumber(previousNetIncome, report.summaryData.netIncome.unit)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-900">
                    {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${netIncomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(netIncomeChange)}
                  </TableCell>
                </TableRow>

                {eps !== 0 && (
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">Zysk na akcję (EPS)</TableCell>
                    <TableCell className="text-right text-gray-700">
                      {formatNumber(previousEps, report.summaryData.eps?.unit)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatNumber(eps, report.summaryData.eps?.unit)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${epsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(epsChange)}
                    </TableCell>
                  </TableRow>
                )}

                {roe !== 0 && (
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">ROE</TableCell>
                    <TableCell className="text-right text-gray-700">
                      {formatPercentage(previousRoe)}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {formatPercentage(roe)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${roeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {roeChange >= 0 ? '+' : ''}{roeChange.toFixed(1)} p.p.
                    </TableCell>
                  </TableRow>
                )}

                <TableRow className="border-t-2 border-gray-200 bg-blue-50 hover:bg-blue-100">
                  <TableCell className="font-semibold text-blue-900">Marża Operacyjna</TableCell>
                  <TableCell className="text-right text-blue-700">
                    {formatPercentage(previousOperatingMargin)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-blue-900">
                    {formatPercentage(operatingMargin)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${operatingMarginChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {operatingMarginChange >= 0 ? '+' : ''}{operatingMarginChange.toFixed(1)} p.p.
                  </TableCell>
                </TableRow>

                <TableRow className="bg-blue-50 hover:bg-blue-100">
                  <TableCell className="font-semibold text-blue-900">Marża Netto</TableCell>
                  <TableCell className="text-right text-blue-700">
                    {formatPercentage(previousNetMargin)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-blue-900">
                    {formatPercentage(netMargin)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${netMarginChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netMarginChange >= 0 ? '+' : ''}{netMarginChange.toFixed(1)} p.p.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Sekcja interpretacji */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Co to oznacza dla inwestora?</h3>
            
            <div className="space-y-4">
              
              {/* Przychody */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Sprzedaż</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {report.summaryData.revenue.change >= 5 ? 
                    `Bardzo dobry wynik - wzrost o ${formatPercentage(report.summaryData.revenue.change)}. Firma skutecznie rozwija biznes.` :
                    report.summaryData.revenue.change >= 0 ?
                    `Stabilny wzrost o ${formatPercentage(report.summaryData.revenue.change)}. Firma utrzymuje pozycję na rynku.` :
                    `Spadek o ${formatPercentage(Math.abs(report.summaryData.revenue.change))} to niepokojący sygnał. Firma traci klientów.`
                  }
                </p>
              </div>

              {/* Zyskowność */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Zyski</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {netIncomeChange >= 0 ?
                    `Zysk wzrósł o ${formatPercentage(netIncomeChange)}. To dobra wiadomość dla akcjonariuszy - mogą liczyć na wyższe dywidendy.` :
                    `Zysk spadł o ${formatPercentage(Math.abs(netIncomeChange))}. Firma ma problemy z kosztami, co może wpłynąć na cenę akcji.`
                  }
                  {` Firma zarabia ${formatPercentage(netMargin)} z każdej złotówki sprzedaży.`}
                </p>
              </div>

              {eps !== 0 && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Wartość akcji</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {`Na jedną akcję przypada ${formatNumber(eps, report.summaryData.eps?.unit)} zysku. `}
                    {epsChange >= 0 ?
                      `To więcej niż rok temu - każda akcja staje się bardziej wartościowa.` :
                      `To mniej niż rok temu - wartość pojedynczej akcji maleje.`
                    }
                  </p>
                </div>
              )}

              {roe !== 0 && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Zarządzanie</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {`Firma generuje ${formatPercentage(roe)} zwrotu z kapitału akcjonariuszy. `}
                    {roeChange >= 0 ?
                      `Zarząd lepiej wykorzystuje pieniądze inwestorów.` :
                      `Zarząd gorzej radzi sobie z kapitałem akcjonariuszy.`
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Wnioski */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Praktyczne wnioski</h4>
              <div className="text-sm">
                {report.summaryData.revenue.change >= 0 && netIncomeChange >= 0 ? (
                  <p className="text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
                    <strong>Pozytywny sygnał:</strong> Firma rozwija się i zwiększa zyski. Może być dobrą opcją dla długoterminowych inwestorów.
                  </p>
                ) : report.summaryData.revenue.change < 0 && netIncomeChange < 0 ? (
                  <p className="text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                    <strong>Ostrzeżenie:</strong> Firma ma problemy z przychodami i zyskami. Inwestorzy powinni być ostrożni.
                  </p>
                ) : (
                  <p className="text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <strong>Mieszane sygnały:</strong> Wyniki pokazują zarówno pozytywne jak i negatywne trendy. Potrzeba więcej czasu na ocenę.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zastrzeżenie prawne */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800 font-medium mb-2">⚠️ Uwaga:</p>
        <p className="text-sm text-amber-700">
          Powyższa analiza ma charakter informacyjny. Pełna ocena inwestycyjna wymaga analizy dodatkowych czynników, w tym sytuacji konkurencyjnej i planów strategicznych spółki.
        </p>
      </div>
    </div>
  );
};
