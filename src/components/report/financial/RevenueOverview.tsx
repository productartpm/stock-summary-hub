
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinancialReport } from "@/lib/types";

interface RevenueOverviewProps {
  report: FinancialReport;
}

export const RevenueOverview = ({ report }: RevenueOverviewProps) => {
  return (
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
  );
};
