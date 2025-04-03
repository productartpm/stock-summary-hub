
import type { FinancialReport } from "@/lib/data";
import { formatNumber, formatPercentage } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportFinancialDataProps {
  report: FinancialReport;
}

export const ReportFinancialData = ({ report }: ReportFinancialDataProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Dane Finansowe</h2>
      
      <div className="mb-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
        <p className="text-sm text-neutral-700 leading-relaxed">
          Niniejszy raport finansowy prezentuje szczegółową analizę wyników finansowych {report.companyName} za {report.reportType === 'Quarterly' ? 'trzeci kwartał' : 'rok'} {report.quarterOrYear}. 
          Analizujemy strukturę przychodów, koszty operacyjne oraz wskaźniki rentowności, aby dostarczyć kompleksowy obraz sytuacji finansowej spółki.
        </p>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Przegląd Przychodów</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-neutral-100 rounded text-sm text-neutral-700 leading-relaxed">
            W analizowanym okresie {report.companyName} {report.summaryData.revenue.change >= 0 ? 'zwiększyło' : 'odnotowało spadek'} przychodów 
            o {formatPercentage(Math.abs(report.summaryData.revenue.change))} w porównaniu do analogicznego okresu w roku ubiegłym. 
            {report.summaryData.revenue.change >= 5 ? 
              ' Ten znaczący wzrost przychodów świadczy o skuteczności strategii rozwoju spółki oraz umocnieniu jej pozycji na rynku.' : 
              report.summaryData.revenue.change >= 0 ? 
                ' Ten umiarkowany wzrost przychodów wskazuje na stabilną pozycję rynkową pomimo wyzwań makroekonomicznych.' : 
                ' Ten spadek przychodów wymaga szczególnej uwagi i może wskazywać na strukturalne wyzwania lub zwiększoną konkurencję w sektorze.'}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-base mb-2">Przychody Kwartalne</h3>
              <div className="flex justify-between items-center">
                <span>Przychody za bieżący kwartał</span>
                <span className="font-bold">{formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Zmiana względem poprzedniego kwartału</span>
                <span className={`${report.summaryData.revenue.change >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {formatPercentage(report.summaryData.revenue.change)}
                </span>
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                {report.summaryData.revenue.change >= 0 ? 
                  `Wzrost przychodów wynika głównie z ${report.category === "Technology" ? "wprowadzenia nowych produktów i usług oraz zwiększenia bazy użytkowników" : "poprawy warunków rynkowych i skutecznej strategii cenowej"}.` : 
                  `Spadek przychodów związany jest przede wszystkim z ${report.category === "Technology" ? "rosnącą konkurencją i presją cenową w sektorze" : "trudnymi warunkami makroekonomicznymi i zmianami regulacyjnymi"}.`}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Przychody Roczne</h3>
              <div className="flex justify-between items-center">
                <span>Przychody od początku roku</span>
                <span className="font-bold">{formatNumber(report.summaryData.revenue.value * 4, report.summaryData.revenue.unit)}</span>
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                Skumulowane przychody od początku roku finansowego wskazują na {report.summaryData.revenue.change >= 0 ? 'pozytywny' : 'trudny'} trend, 
                który {report.summaryData.revenue.change >= 0 ? 'powinien się utrzymać' : 'wymaga strategicznych działań'} w kolejnych kwartałach.
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Źródła Przychodów</h3>
              <div className="space-y-2">
                {Object.entries(report.summaryData)
                  .filter(([key]) => key !== 'revenue' && key !== 'netIncome' && key !== 'operatingProfit' && key !== 'eps')
                  .map(([key, data]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{formatNumber(data.value, data.unit)}</span>
                    </div>
                  ))}
              </div>
              <div className="mt-3 text-sm text-neutral-600">
                Analiza struktury przychodów wskazuje na {report.category === "Technology" ? 
                  "rosnące znaczenie usług subskrypcyjnych i płatności cyklicznych, co zwiększa przewidywalność przychodów w przyszłych okresach." : 
                  "zróżnicowane źródła generowania wartości, co zmniejsza ryzyko uzależnienia od pojedynczego segmentu rynku."} 
                {report.companyName} aktywnie dywersyfikuje swoje źródła przychodów, aby zwiększyć odporność na zmiany rynkowe.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Koszty Operacyjne</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-neutral-100 rounded text-sm text-neutral-700 leading-relaxed">
            Struktura kosztów operacyjnych {report.companyName} odzwierciedla specyfikę branży {report.category} oraz strategiczne priorytety zarządu.
            W analizowanym okresie {report.summaryData.operatingProfit.change >= 0 ? 
              'spółka skutecznie zarządzała kosztami, co przełożyło się na poprawę marży operacyjnej.' : 
              'spółka doświadczyła presji na marże operacyjne, głównie z powodu rosnących kosztów pracy i surowców.'}
            Długoterminowa strategia zakłada {report.summaryData.operatingProfit.change >= 0 ? 
              'dalszą optymalizację procesów i digitalizację, co powinno przynieść dodatkowe oszczędności.' : 
              'restrukturyzację i optymalizację procesów, aby odwrócić negatywny trend rentowności.'}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-base mb-2">Struktura Kosztów</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Koszty pracownicze i osobowe</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.4, report.summaryData.revenue.unit)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Materiały i zaopatrzenie</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.15, report.summaryData.revenue.unit)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Usługi zewnętrzne</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.2, report.summaryData.revenue.unit)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Pozostałe koszty operacyjne</span>
                  <span>{formatNumber(report.summaryData.revenue.value * 0.1, report.summaryData.revenue.unit)}</span>
                </div>
              </div>
              <div className="mt-3 text-sm text-neutral-600">
                Największą pozycję w strukturze kosztów stanowią wynagrodzenia pracowników, co jest typowe dla sektora {report.category}.
                {report.category === "Technology" ? 
                  " Spółka intensywnie inwestuje w talenty technologiczne, co jest kluczowe dla utrzymania przewagi konkurencyjnej i innowacyjności." : 
                  " Firma dąży do optymalizacji kosztów pracowniczych poprzez automatyzację procesów i zwiększenie efektywności operacyjnej."}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2">Dynamika Kosztów</h3>
              <div className="flex justify-between items-center">
                <span>Zmiana rok do roku</span>
                <span className={`${report.summaryData.operatingProfit.change < 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {formatPercentage(report.summaryData.operatingProfit.change < 0 ? -5 : 5)}
                </span>
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                {report.summaryData.operatingProfit.change >= 0 ? 
                  "Mimo wzrostu kosztów absolutnych, relatywny udział kosztów w przychodach zmniejszył się, co świadczy o rosnącej efektywności operacyjnej i ekonomii skali." : 
                  "Wzrost kosztów przewyższa dynamikę przychodów, co negatywnie wpływa na marże operacyjne i wymaga działań naprawczych w kolejnych kwartałach."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Wskaźniki Rentowności</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-neutral-100 rounded text-sm text-neutral-700 leading-relaxed">
            Wskaźniki rentowności stanowią kluczowy element oceny efektywności finansowej {report.companyName}. 
            W analizowanym okresie {report.summaryData.netIncome.change >= 0 ? 
              'spółka poprawiła swoją rentowność, co potwierdza skuteczność przyjętej strategii biznesowej.' : 
              'spółka doświadczyła presji na rentowność, co wymaga szczególnej uwagi zarządu w kolejnych kwartałach.'}
            Poziom marży operacyjnej wynoszący {formatPercentage(report.summaryData.operatingProfit.value / report.summaryData.revenue.value * 100)} 
            {report.summaryData.operatingProfit.value / report.summaryData.revenue.value > 0.15 ? 
              ' jest powyżej średniej sektorowej, co świadczy o silnej pozycji rynkowej i efektywności operacyjnej.' : 
              ' odzwierciedla wyzwania rynkowe i konkurencyjne, z którymi zmaga się spółka.'}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Zysk Operacyjny (EBIT)</div>
              <div className="text-xl font-bold">
                {formatNumber(report.summaryData.operatingProfit.value, report.summaryData.operatingProfit.unit)}
              </div>
              <div className={`text-sm ${report.summaryData.operatingProfit.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(report.summaryData.operatingProfit.change)}
              </div>
              <div className="mt-2 text-xs text-neutral-600">
                Zysk operacyjny odzwierciedla efektywność podstawowej działalności firmy, bez uwzględnienia kosztów finansowych i podatków.
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Zysk Netto</div>
              <div className="text-xl font-bold">
                {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
              </div>
              <div className={`text-sm ${report.summaryData.netIncome.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(report.summaryData.netIncome.change)}
              </div>
              <div className="mt-2 text-xs text-neutral-600">
                Zysk netto to ostateczny wynik finansowy po uwzględnieniu wszystkich kosztów, podatków i zdarzeń nadzwyczajnych.
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1">Zysk na Akcję (EPS)</div>
              <div className="text-xl font-bold">
                {report.summaryData.eps ? formatNumber(report.summaryData.eps.value, report.summaryData.eps.unit) : 'N/A'}
              </div>
              <div className={`text-sm ${report.summaryData.eps && report.summaryData.eps.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {report.summaryData.eps ? formatPercentage(report.summaryData.eps.change) : ''}
              </div>
              <div className="mt-2 text-xs text-neutral-600">
                Zysk na akcję jest kluczowym wskaźnikiem dla inwestorów, obrazującym rentowność w przeliczeniu na jedną akcję spółki.
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Marża Operacyjna</span>
                <span className="font-medium">
                  {formatPercentage(report.summaryData.operatingProfit.value / report.summaryData.revenue.value * 100)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Marża Zysku Netto</span>
                <span className="font-medium">
                  {formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Marża EBITDA</span>
                <span className="font-medium">
                  {formatPercentage((report.summaryData.operatingProfit.value + report.summaryData.revenue.value * 0.05) / report.summaryData.revenue.value * 100)}
                </span>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-neutral-600">
              Porównanie marż operacyjnych z poprzednimi okresami wskazuje na {report.summaryData.operatingProfit.change >= 0 ? 
                'poprawę efektywności operacyjnej, co jest pozytywnym sygnałem dla inwestorów.' : 
                'wyzwania związane z utrzymaniem rentowności w obecnym otoczeniu rynkowym.'}
              {report.summaryData.netIncome.change >= report.summaryData.operatingProfit.change ? 
                ' Dodatkowo, wyższa dynamika zysku netto w porównaniu do zysku operacyjnego sugeruje korzystne zmiany w obszarze kosztów finansowych lub opodatkowania.' : 
                ' Niższa dynamika zysku netto w porównaniu do zysku operacyjnego wskazuje na rosnące koszty finansowe lub zwiększony efektywny poziom opodatkowania.'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
