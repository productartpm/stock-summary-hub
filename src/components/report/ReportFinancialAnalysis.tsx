
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
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Szczegółowa Analiza Finansowa</h2>
        <p className="text-gray-600 mt-2 pl-4">Kompleksowy przegląd wyników finansowych i ich interpretacja biznesowa</p>
      </div>

      {/* Wprowadzenie analityczne */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Kontekst finansowy:</strong> {report.companyName} przedstawia wyniki finansowe za {report.reportType === 'Quarterly' ? 'trzeci kwartał' : 'rok'} {report.quarterOrYear}, 
          które odzwierciedlają {report.summaryData.revenue.change >= 5 ? 'silną dynamikę wzrostu' : 
                                report.summaryData.revenue.change >= 0 ? 'stabilną sytuację operacyjną' : 'wyzwania rynkowe'} 
          w sektorze {report.category}. Analiza obejmuje strukturę przychodów, efektywność kosztową oraz wskaźniki rentowności 
          w kontekście {report.summaryData.revenue.change >= 0 ? 'pozytywnych' : 'trudnych'} warunków rynkowych.
        </p>
      </div>

      {/* Główna sekcja z danymi finansowymi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kluczowe Dane Finansowe i Interpretacja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Przychody */}
          <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-4 rounded-r-lg">
            <h3 className="font-semibold text-lg mb-3 text-green-800">Analiza Przychodów</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-green-700 mb-1">Przychody bieżące</div>
                <div className="text-2xl font-bold text-green-800">
                  {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
                </div>
                <div className={`text-sm font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(report.summaryData.revenue.change)} rok do roku
                </div>
              </div>
              <div>
                <div className="text-sm text-green-700 mb-1">Przychody roczne (szacunek)</div>
                <div className="text-xl font-semibold text-green-800">
                  {formatNumber(report.summaryData.revenue.value * 4, report.summaryData.revenue.unit)}
                </div>
              </div>
            </div>
            <div className="text-sm text-green-800 leading-relaxed">
              <strong>Interpretacja:</strong> {report.summaryData.revenue.change >= 5 ? 
                `Dynamiczny wzrost przychodów o ${formatPercentage(report.summaryData.revenue.change)} wskazuje na silną pozycję rynkową ${report.companyName}. 
                Ten wynik odzwierciedla skuteczność strategii ekspansji, wprowadzenie innowacyjnych produktów oraz zwiększenie udziałów w rynku. 
                Spółka skutecznie wykorzystuje pozytywne trendy sektorowe i umacnia swoją przewagę konkurencyjną.` :
                report.summaryData.revenue.change >= 0 ?
                `Umiarkowany wzrost przychodów o ${formatPercentage(report.summaryData.revenue.change)} odzwierciedla stabilną pozycję ${report.companyName} 
                w dojrzałym rynku. Pomimo wyzwań makroekonomicznych i rosnącej konkurencji, spółka utrzymuje pozytywną dynamikę, 
                co świadczy o odporności modelu biznesowego i skutecznym zarządzaniu.` :
                `Spadek przychodów o ${formatPercentage(Math.abs(report.summaryData.revenue.change))} sygnalizuje strukturalne wyzwania, 
                z którymi zmaga się ${report.companyName}. Przyczyny mogą obejmować spowolnienie gospodarcze, zmiany preferencji konsumentów 
                lub wzmożoną konkurencję. Wymaga to strategicznych działań naprawczych w kolejnych okresach.`
              }
            </div>
          </div>

          {/* Rentowność */}
          <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 p-4 rounded-r-lg">
            <h3 className="font-semibold text-lg mb-3 text-blue-800">Analiza Rentowności</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-sm text-blue-700 mb-1">Zysk Operacyjny</div>
                <div className="text-xl font-bold text-blue-800">
                  {formatNumber(operatingProfit, report.summaryData.operatingProfit?.unit)}
                </div>
                <div className={`text-sm ${operatingProfitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(operatingProfitChange)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-700 mb-1">Zysk Netto</div>
                <div className="text-xl font-bold text-blue-800">
                  {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
                </div>
                <div className={`text-sm ${netIncomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(netIncomeChange)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-blue-700 mb-1">Marża Netto</div>
                <div className="text-xl font-bold text-blue-800">
                  {formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)}
                </div>
                <div className="text-xs text-blue-600">bieżący okres</div>
              </div>
            </div>
            <div className="text-sm text-blue-800 leading-relaxed">
              <strong>Interpretacja:</strong> {netIncomeChange >= 5 ?
                `Znacząca poprawa rentowności netto o ${formatPercentage(netIncomeChange)} potwierdza wysoką efektywność operacyjną ${report.companyName}. 
                Marża netto na poziomie ${formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)} 
                plasuje spółkę powyżej średniej sektorowej. To osiągnięcie wynika z optymalizacji kosztów, poprawy produktywności 
                oraz skutecznego zarządzania kapitałem obrotowym.` :
                netIncomeChange >= 0 ?
                `Stabilna rentowność z wzrostem o ${formatPercentage(netIncomeChange)} wskazuje na dojrzałość operacyjną ${report.companyName}. 
                Marża netto ${formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)} 
                utrzymuje się na satysfakcjonującym poziomie pomimo presji konkurencyjnej. Spółka skutecznie balansuje wzrost 
                z zachowaniem rentowności.` :
                `Spadek rentowności o ${formatPercentage(Math.abs(netIncomeChange))} wymaga szczególnej uwagi zarządu. 
                Presja na marże może wynikać z rosnących kosztów operacyjnych, spadku cen produktów lub zwiększonych inwestycji 
                w rozwój. Kluczowe będzie odwrócenie tego trendu w kolejnych kwartałach.`
              }
            </div>
          </div>

          {/* Efektywność kosztowa */}
          <div className="border-l-4 border-orange-400 pl-4 bg-orange-50 p-4 rounded-r-lg">
            <h3 className="font-semibold text-lg mb-3 text-orange-800">Efektywność Kosztowa</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-orange-700">Koszty operacyjne (szacunek)</span>
                <span className="font-semibold text-orange-800">
                  {formatNumber(report.summaryData.revenue.value - operatingProfit, report.summaryData.revenue.unit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-700">Wskaźnik kosztów do przychodów</span>
                <span className="font-semibold text-orange-800">
                  {formatPercentage((report.summaryData.revenue.value - operatingProfit) / report.summaryData.revenue.value * 100)}
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-orange-800 leading-relaxed">
              <strong>Interpretacja:</strong> {operatingProfitChange >= 0 ?
                `Efektywne zarządzanie kosztami operacyjnymi przyczyniło się do poprawy marży operacyjnej. 
                ${report.companyName} skutecznie implementuje programy oszczędnościowe i optymalizuje procesy biznesowe. 
                Wskaźnik kosztów do przychodów na poziomie ${formatPercentage((report.summaryData.revenue.value - operatingProfit) / report.summaryData.revenue.value * 100)} 
                wskazuje na dobrą dyscyplinę kosztową i operacyjną efektywność.` :
                `Rosnące koszty operacyjne stanowią wyzwanie dla ${report.companyName}. Presja inflacyjna, 
                wzrost kosztów surowców i energii oraz zwiększone wydatki na wynagrodzenia wpływają na rentowność. 
                Kluczowe będzie wdrożenie programów optymalizacji kosztów i poszukiwanie oszczędności operacyjnych.`
              }
            </div>
          </div>

          {/* Perspektywy i podsumowanie */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">Perspektywy Finansowe</h3>
            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
              <p>
                <strong>Krótkoterminowo:</strong> {report.summaryData.revenue.change >= 0 ?
                  'Pozytywne trendy finansowe powinny się utrzymać w kolejnych kwartałach, wspierane przez solidne fundamenty operacyjne i korzystne warunki rynkowe.' :
                  'Spółka będzie koncentrować się na stabilizacji wyników finansowych poprzez optymalizację kosztów i wzmocnienie kluczowych segmentów biznesowych.'
                }
              </p>
              <p>
                <strong>Długoterminowo:</strong> {report.summaryData.revenue.change >= 0 ?
                  `${report.companyName} ma potencjał do dalszego wzrostu poprzez ekspansję na nowe rynki, rozwój innowacyjnych produktów oraz ciągłe doskonalenie efektywności operacyjnej.` :
                  `Kluczowe będzie przeprowadzenie strategicznej transformacji, dywersyfikacja źródeł przychodów oraz poprawa konkurencyjności w core biznesie.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-900 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-blue-800">
          Analiza finansowa została przeprowadzona w oparciu o dostępne dane kwartalne oraz porównania rok do roku. 
          Szczegółowa ocena sytuacji finansowej wymaga dostępu do pełnych sprawozdań finansowych, 
          w tym bilansu i rachunku przepływów pieniężnych, które pozwoliłyby na pełniejszą analizę 
          płynności, zadłużenia oraz efektywności zarządzania kapitałem.
        </p>
      </div>
    </div>
  );
};
