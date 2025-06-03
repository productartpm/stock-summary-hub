
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

          {/* Szczegółowa interpretacja */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Interpretacja Wyników</h3>
            
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">📈 Analiza Przychodów</h4>
                <p>
                  {report.summaryData.revenue.change >= 5 ? 
                    `${report.companyName} odnotowała silny wzrost przychodów o ${formatPercentage(report.summaryData.revenue.change)}, co wskazuje na skuteczną strategię ekspansji i umacnianie pozycji rynkowej. Ten wynik odzwierciedla pozytywne trendy sektorowe i zwiększenie udziałów w rynku.` :
                    report.summaryData.revenue.change >= 0 ?
                    `Umiarkowany wzrost przychodów o ${formatPercentage(report.summaryData.revenue.change)} odzwierciedla stabilną pozycję ${report.companyName} w dojrzałym rynku. Pomimo wyzwań makroekonomicznych, spółka utrzymuje pozytywną dynamikę.` :
                    `Spadek przychodów o ${formatPercentage(Math.abs(report.summaryData.revenue.change))} sygnalizuje wyzwania rynkowe, z którymi zmaga się ${report.companyName}. Wymaga to strategicznych działań naprawczych w kolejnych okresach.`
                  }
                </p>
              </div>

              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">💰 Analiza Rentowności</h4>
                <p>
                  <strong>Marża operacyjna:</strong> {operatingMarginChange >= 0 ?
                    `Poprawa marży operacyjnej o ${operatingMarginChange.toFixed(1)} p.p. do ${formatPercentage(operatingMargin)} potwierdza wysoką efektywność operacyjną spółki. Skuteczne zarządzanie kosztami i optymalizacja procesów biznesowych przyczyniają się do poprawy rentowności.` :
                    `Spadek marży operacyjnej o ${Math.abs(operatingMarginChange).toFixed(1)} p.p. do ${formatPercentage(operatingMargin)} wskazuje na presję kosztową i konieczność optymalizacji procesów operacyjnych.`
                  }
                </p>
                <p className="mt-2">
                  <strong>Marża netto:</strong> {netMarginChange >= 0 ?
                    `Wzrost marży netto o ${netMarginChange.toFixed(1)} p.p. do ${formatPercentage(netMargin)} potwierdza solidne fundamenty finansowe i skuteczne zarządzanie wszystkimi aspektami działalności.` :
                    `Spadek marży netto o ${Math.abs(netMarginChange).toFixed(1)} p.p. do ${formatPercentage(netMargin)} wymaga szczególnej uwagi zarządu i wdrożenia programów poprawy efektywności.`
                  }
                </p>
              </div>

              {eps !== 0 && (
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Wskaźniki na Akcję</h4>
                  <p>
                    <strong>Zysk na akcję (EPS):</strong> {epsChange >= 0 ?
                      `Wzrost EPS o ${formatPercentage(epsChange)} do ${formatNumber(eps, report.summaryData.eps?.unit)} odzwierciedla poprawę rentowności w przeliczeniu na jedną akcję, co jest pozytywnym sygnałem dla akcjonariuszy.` :
                      `Spadek EPS o ${formatPercentage(Math.abs(epsChange))} do ${formatNumber(eps, report.summaryData.eps?.unit)} może wpływać na atrakcyjność inwestycyjną spółki.`
                    }
                  </p>
                </div>
              )}

              {roe !== 0 && (
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Efektywność Kapitału</h4>
                  <p>
                    <strong>ROE (Return on Equity):</strong> {roeChange >= 0 ?
                      `Poprawa ROE o ${roeChange.toFixed(1)} p.p. do ${formatPercentage(roe)} wskazuje na zwiększenie efektywności wykorzystania kapitału własnego. Spółka generuje większy zwrot dla akcjonariuszy z każdej złotówki zainwestowanego kapitału.` :
                      `Spadek ROE o ${Math.abs(roeChange).toFixed(1)} p.p. do ${formatPercentage(roe)} sygnalizuje obniżenie efektywności wykorzystania kapitału własnego, co wymaga analizy przyczyn tego trendu.`
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Perspektywy i rekomendacje */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">🔮 Perspektywy i Rekomendacje</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-medium text-green-700 mb-2">Mocne Strony</h5>
                  <ul className="space-y-1 text-gray-600">
                    {report.summaryData.revenue.change >= 0 && <li>• Pozytywna dynamika przychodów</li>}
                    {operatingMarginChange >= 0 && <li>• Poprawa marży operacyjnej</li>}
                    {netMarginChange >= 0 && <li>• Wzrost rentowności netto</li>}
                    {roeChange >= 0 && roe !== 0 && <li>• Lepsza efektywność kapitału</li>}
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-medium text-red-700 mb-2">Obszary Uwagi</h5>
                  <ul className="space-y-1 text-gray-600">
                    {report.summaryData.revenue.change < 0 && <li>• Spadek przychodów</li>}
                    {operatingMarginChange < 0 && <li>• Obniżenie marży operacyjnej</li>}
                    {netMarginChange < 0 && <li>• Pogorszenie rentowności</li>}
                    {roeChange < 0 && roe !== 0 && <li>• Spadek efektywności kapitału</li>}
                  </ul>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-700">
                {report.summaryData.revenue.change >= 0 && netMarginChange >= 0 ?
                  `Na podstawie aktualnych wyników, ${report.companyName} wykazuje silne fundamenty finansowe z potencjałem do dalszego wzrostu. Kluczowe będzie utrzymanie pozytywnej dynamiki i kontynuacja strategii ekspansji przy zachowaniu dyscypliny kosztowej.` :
                  `Spółka powinna skoncentrować się na stabilizacji wyników poprzez optymalizację kosztów, wzmocnienie kluczowych segmentów biznesowych i adaptację do zmieniających się warunków rynkowych. Szczególną uwagę należy poświęcić poprawie marż operacyjnych.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-900 font-medium mb-2">💡 Uwaga metodologiczna:</p>
        <p className="text-sm text-blue-800">
          Analiza opiera się na dostępnych danych kwartalnych i porównaniach rok do roku. 
          Marże operacyjna i netto zostały obliczone na podstawie dostępnych danych finansowych.
          Pełna ocena wymaga dostępu do szczegółowych sprawozdań finansowych i analizy przepływów pieniężnych.
        </p>
      </div>
    </div>
  );
};
