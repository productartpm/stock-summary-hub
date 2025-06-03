
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

  // Calculate previous values based on change percentage
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(report.summaryData.revenue.value, report.summaryData.revenue.change);
  const previousOperatingProfit = calculatePreviousValue(operatingProfit, operatingProfitChange);
  const previousNetIncome = calculatePreviousValue(report.summaryData.netIncome.value, netIncomeChange);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Analiza Finansowa</h2>
        <p className="text-gray-600 mt-2 pl-4">Porównanie wyników finansowych między okresami</p>
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
              </TableBody>
            </Table>
          </div>

          {/* Szczegółowa interpretacja */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Interpretacja Wyników</h3>
            
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                <strong>Dynamika przychodów:</strong> {report.summaryData.revenue.change >= 5 ? 
                  `${report.companyName} odnotowała silny wzrost przychodów o ${formatPercentage(report.summaryData.revenue.change)}, co wskazuje na skuteczną strategię ekspansji i umacnianie pozycji rynkowej. Ten wynik odzwierciedla pozytywne trendy sektorowe i zwiększenie udziałów w rynku.` :
                  report.summaryData.revenue.change >= 0 ?
                  `Umiarkowany wzrost przychodów o ${formatPercentage(report.summaryData.revenue.change)} odzwierciedla stabilną pozycję ${report.companyName} w dojrzałym rynku. Pomimo wyzwań makroekonomicznych, spółka utrzymuje pozytywną dynamikę.` :
                  `Spadek przychodów o ${formatPercentage(Math.abs(report.summaryData.revenue.change))} sygnalizuje wyzwania rynkowe, z którymi zmaga się ${report.companyName}. Wymaga to strategicznych działań naprawczych w kolejnych okresach.`
                }
              </p>

              <p>
                <strong>Rentowność operacyjna:</strong> {operatingProfitChange >= 0 ?
                  `Poprawa zysku operacyjnego o ${formatPercentage(operatingProfitChange)} potwierdza wysoką efektywność operacyjną spółki. Skuteczne zarządzanie kosztami i optymalizacja procesów biznesowych przyczyniają się do poprawy marży.` :
                  `Spadek zysku operacyjnego o ${formatPercentage(Math.abs(operatingProfitChange))} wskazuje na presję kosztową i konieczność optymalizacji procesów operacyjnych.`
                }
              </p>

              <p>
                <strong>Wynik końcowy:</strong> {netIncomeChange >= 0 ?
                  `Wzrost zysku netto o ${formatPercentage(netIncomeChange)} potwierdza solidne fundamenty finansowe i skuteczne zarządzanie wszystkimi aspektami działalności. Marża netto na poziomie ${formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)} plasuje spółkę korzystnie na tle sektora.` :
                  `Spadek zysku netto o ${formatPercentage(Math.abs(netIncomeChange))} wymaga szczególnej uwagi zarządu i wdrożenia programów poprawy efektywności.`
                }
              </p>
            </div>

            {/* Perspektywy */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Perspektywy</h4>
              <p className="text-sm text-gray-700">
                {report.summaryData.revenue.change >= 0 ?
                  `Na podstawie aktualnych wyników, ${report.companyName} ma potencjał do dalszego wzrostu. Kluczowe będzie utrzymanie pozytywnej dynamiki i kontynuacja strategii ekspansji przy zachowaniu dyscypliny kosztowej.` :
                  `Spółka powinna skoncentrować się na stabilizacji wyników poprzez optymalizację kosztów, wzmocnienie kluczowych segmentów biznesowych i adaptację do zmieniających się warunków rynkowych.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-900 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-blue-800">
          Analiza opiera się na dostępnych danych kwartalnych i porównaniach rok do roku. 
          Pełna ocena wymaga dostępu do szczegółowych sprawozdań finansowych.
        </p>
      </div>
    </div>
  );
};
