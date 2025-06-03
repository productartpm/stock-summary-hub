
import type { FinancialReport } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  const operatingProfit = report.summaryData.operatingProfit?.value ?? 0;
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Analiza Finansowa</h2>
        <p className="text-gray-600 mt-2 pl-4">Kluczowe wyniki finansowe i ich interpretacja</p>
      </div>

      {/* Główna sekcja finansowa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Wyniki Finansowe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Kluczowe dane w jednej sekcji */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700 mb-1">Przychody</div>
              <div className="text-2xl font-bold text-blue-900">
                {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
              </div>
              <div className={`text-sm font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(report.summaryData.revenue.change)} YoY
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-700 mb-1">Zysk Operacyjny</div>
              <div className="text-2xl font-bold text-green-900">
                {formatNumber(operatingProfit, report.summaryData.operatingProfit?.unit)}
              </div>
              <div className={`text-sm font-medium ${operatingProfitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(operatingProfitChange)} YoY
              </div>
            </div>

            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-sm text-emerald-700 mb-1">Zysk Netto</div>
              <div className="text-2xl font-bold text-emerald-900">
                {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
              </div>
              <div className={`text-sm font-medium ${netIncomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(netIncomeChange)} YoY
              </div>
            </div>
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
