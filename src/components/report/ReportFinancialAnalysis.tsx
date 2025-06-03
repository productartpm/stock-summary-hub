
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
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Analiza Finansowa</h2>
        <p className="text-gray-600 mt-2 pl-4">Szczegółowe porównanie wyników finansowych między okresami</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Wyniki Finansowe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Tabela z danymi finansowymi */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Wskaźnik</TableHead>
                  <TableHead className="text-right font-semibold">Poprzedni okres</TableHead>
                  <TableHead className="text-right font-semibold">Bieżący okres</TableHead>
                  <TableHead className="text-right font-semibold">Zmiana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Przychody</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(previousRevenue, report.summaryData.revenue.unit)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(report.summaryData.revenue.change)}
                  </TableCell>
                </TableRow>
                
                {ebitda > 0 && (
                  <TableRow>
                    <TableCell className="font-medium">EBITDA</TableCell>
                    <TableCell className="text-right">
                      {formatNumber(previousEbitda, report.summaryData.ebitda?.unit)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatNumber(ebitda, report.summaryData.ebitda?.unit)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${ebitdaChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(ebitdaChange)}
                    </TableCell>
                  </TableRow>
                )}
                
                <TableRow>
                  <TableCell className="font-medium">Zysk Operacyjny</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(previousOperatingProfit, report.summaryData.operatingProfit?.unit)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatNumber(operatingProfit, report.summaryData.operatingProfit?.unit)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${operatingProfitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(operatingProfitChange)}
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Zysk Netto</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(previousNetIncome, report.summaryData.netIncome.unit)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${netIncomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(netIncomeChange)}
                  </TableCell>
                </TableRow>

                {eps !== 0 && (
                  <TableRow>
                    <TableCell className="font-medium">Zysk na akcję (EPS)</TableCell>
                    <TableCell className="text-right">
                      {formatNumber(previousEps, report.summaryData.eps?.unit)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatNumber(eps, report.summaryData.eps?.unit)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${epsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(epsChange)}
                    </TableCell>
                  </TableRow>
                )}

                {roe !== 0 && (
                  <TableRow>
                    <TableCell className="font-medium">ROE</TableCell>
                    <TableCell className="text-right">
                      {formatPercentage(previousRoe)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatPercentage(roe)}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${roeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {roeChange >= 0 ? '+' : ''}{roeChange.toFixed(1)} p.p.
                    </TableCell>
                  </TableRow>
                )}

                <TableRow className="border-t-2 border-gray-200">
                  <TableCell className="font-medium text-blue-700">Marża Operacyjna</TableCell>
                  <TableCell className="text-right text-blue-600">
                    {formatPercentage(previousOperatingMargin)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-blue-700">
                    {formatPercentage(operatingMargin)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${operatingMarginChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {operatingMarginChange >= 0 ? '+' : ''}{operatingMarginChange.toFixed(1)} p.p.
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-blue-700">Marża Netto</TableCell>
                  <TableCell className="text-right text-blue-600">
                    {formatPercentage(previousNetMargin)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-blue-700">
                    {formatPercentage(netMargin)}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${netMarginChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {netMarginChange >= 0 ? '+' : ''}{netMarginChange.toFixed(1)} p.p.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Uproszczona interpretacja - przystępna i praktyczna */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Co to oznacza dla inwestora?</h3>
            
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              
              <div className="bg-white p-4 rounded border-l-4 border-blue-400">
                <h4 className="font-semibold text-gray-900 mb-2">Przychody i Sprzedaż</h4>
                <p>
                  {report.summaryData.revenue.change >= 5 ? 
                    `Spółka bardzo dobrze radzi sobie ze sprzedażą - wzrost o ${formatPercentage(report.summaryData.revenue.change)} to mocny sygnał. Firma zwiększa swój udział w rynku i skutecznie rozwija biznes.` :
                    report.summaryData.revenue.change >= 0 ?
                    `Przychody rosną umiarkowanie (${formatPercentage(report.summaryData.revenue.change)}). To pokazuje, że firma utrzymuje stabilną pozycję, ale rozwija się powoli.` :
                    `Spadek przychodów o ${formatPercentage(Math.abs(report.summaryData.revenue.change))} to niepokojący sygnał. Firma traci klientów lub ceny jej produktów maleją.`
                  }
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-400">
                <h4 className="font-semibold text-gray-900 mb-2">Zyskowność</h4>
                <p>
                  <strong>Zysk netto:</strong> {netIncomeChange >= 0 ?
                    `Firma zarabia więcej - wzrost o ${formatPercentage(netIncomeChange)}. To dobra wiadomość dla akcjonariuszy, którzy mogą liczyć na wyższe dywidendy i wzrost wartości akcji.` :
                    `Zyski spadły o ${formatPercentage(Math.abs(netIncomeChange))}. Firma ma problemy z kosztami lub konkurencją. To może wpłynąć negatywnie na cenę akcji.`
                  }
                </p>
                <p className="mt-2">
                  <strong>Marża zysku:</strong> Firma zarabia {formatPercentage(netMargin)} z każdej złotówki sprzedaży. {netMarginChange >= 0 ?
                    `To więcej niż wcześniej - firma lepiej kontroluje koszty.` :
                    `To mniej niż wcześniej - koszty rosną szybciej niż przychody.`
                  }
                </p>
              </div>

              {eps !== 0 && (
                <div className="bg-white p-4 rounded border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-gray-900 mb-2">Zysk na Akcję</h4>
                  <p>
                    Na jedną akcję przypada {formatNumber(eps, report.summaryData.eps?.unit)} zysku. {epsChange >= 0 ?
                      `To więcej niż rok temu o ${formatPercentage(epsChange)} - każda akcja staje się bardziej wartościowa.` :
                      `To mniej niż rok temu o ${formatPercentage(Math.abs(epsChange))} - wartość pojedynczej akcji maleje.`
                    }
                  </p>
                </div>
              )}

              {roe !== 0 && (
                <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                  <h4 className="font-semibold text-gray-900 mb-2">Efektywność Zarządzania</h4>
                  <p>
                    Firma generuje {formatPercentage(roe)} zwrotu z kapitału akcjonariuszy. {roeChange >= 0 ?
                      `To więcej niż wcześniej - zarząd lepiej wykorzystuje pieniądze inwestorów.` :
                      `To mniej niż wcześniej - zarząd gorzej radzi sobie z kapitałem akcjonariuszy.`
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Praktyczne wnioski */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Praktyczne Wnioski</h4>
              <div className="text-sm space-y-2">
                {report.summaryData.revenue.change >= 0 && netIncomeChange >= 0 ? (
                  <p className="text-green-700 bg-green-50 p-3 rounded">
                    <strong>Pozytywny sygnał:</strong> Firma rozwija się i zwiększa zyskowność. To może być dobry moment dla długoterminowych inwestorów.
                  </p>
                ) : report.summaryData.revenue.change < 0 && netIncomeChange < 0 ? (
                  <p className="text-red-700 bg-red-50 p-3 rounded">
                    <strong>Sygnał ostrzegawczy:</strong> Firma ma problemy z przychodami i zyskami. Inwestorzy powinni być ostrożni i monitorować sytuację.
                  </p>
                ) : (
                  <p className="text-amber-700 bg-amber-50 p-3 rounded">
                    <strong>Mieszane sygnały:</strong> Wyniki pokazują zarówno pozytywne jak i negatywne trendy. Potrzeba więcej czasu na ocenę kierunku rozwoju.
                  </p>
                )}
                
                <p className="text-gray-700 mt-3">
                  {operatingMarginChange >= 0 && netMarginChange >= 0 ?
                    `Firma poprawia efektywność operacyjną, co jest dobrym fundamentem na przyszłość.` :
                    `Koszty rosną szybciej niż przychody. Firma powinna skupić się na optymalizacji wydatków.`
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-900 font-medium mb-2">Uwaga:</p>
        <p className="text-sm text-blue-800">
          Powyższa analiza opiera się na dostępnych danych finansowych. Pełna ocena inwestycyjna wymaga analizy wielu dodatkowych czynników, w tym sytuacji konkurencyjnej, trendów branżowych i planów strategicznych spółki.
        </p>
      </div>
    </div>
  );
};
