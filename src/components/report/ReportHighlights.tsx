
import type { FinancialReport } from "@/lib/data";
import { formatDate, formatNumber } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface ReportHighlightsProps {
  report: FinancialReport;
}

export const ReportHighlights = ({ report }: ReportHighlightsProps) => {
  // Generuj podsumowanie kondycji firmy na podstawie danych
  const getCompanyCondition = () => {
    const revenueChange = report.summaryData.revenue.change;
    const netIncomeChange = report.summaryData.netIncome.change;
    const operatingProfitChange = report.summaryData.operatingProfit.change;
    
    if (revenueChange > 10 && netIncomeChange > 10) {
      return {
        status: "Doskonała",
        description: "Firma wykazuje wyjątkową dynamikę wzrostu zarówno przychodów jak i zysków netto, co wskazuje na skuteczną strategię biznesową i silną pozycję rynkową.",
        color: "text-green-500"
      };
    } else if (revenueChange > 5 && netIncomeChange > 0) {
      return {
        status: "Dobra",
        description: "Firma znajduje się w dobrej kondycji finansowej z umiarkowanym wzrostem przychodów i pozytywnym trendem w zakresie zysków, choć istnieje potencjał do optymalizacji efektywności operacyjnej.",
        color: "text-emerald-400"
      };
    } else if (revenueChange > 0 && netIncomeChange > -5) {
      return {
        status: "Stabilna",
        description: "Firma utrzymuje stabilną pozycję z niewielkim wzrostem przychodów, jednak widoczne są pewne wyzwania w obszarze rentowności, które wymagają uwagi zarządu.",
        color: "text-amber-400"
      };
    } else if (revenueChange < 0 && netIncomeChange < 0) {
      return {
        status: "Niepokojąca",
        description: "Firma doświadcza spadku zarówno przychodów jak i zysków, co może wskazywać na strukturalne problemy biznesowe lub niekorzystne warunki rynkowe wymagające natychmiastowej interwencji.",
        color: "text-red-500"
      };
    } else {
      return {
        status: "Mieszana",
        description: "Firma wykazuje niejednoznaczne wyniki z rozbieżnymi trendami w przychodach i zyskach, co sugeruje złożone wyzwania biznesowe wymagające zróżnicowanej strategii naprawczej.",
        color: "text-blue-400"
      };
    }
  };

  const companyCondition = getCompanyCondition();
  
  // Określ główne czynniki wpływające na wyniki
  const getKeyFactors = () => {
    const factors = [];
    
    if (report.summaryData.revenue.change > 5) {
      factors.push("Znaczący wzrost przychodów o " + report.summaryData.revenue.change.toFixed(1) + "%, wskazujący na rosnący udział w rynku lub skuteczną strategię cenową");
    } else if (report.summaryData.revenue.change < 0) {
      factors.push("Niepokojący spadek przychodów o " + Math.abs(report.summaryData.revenue.change).toFixed(1) + "%, sugerujący utratę udziału w rynku lub presję cenową");
    }
    
    if (report.summaryData.grossMargin && report.summaryData.grossMargin.change > 2) {
      factors.push("Poprawa marży brutto o " + report.summaryData.grossMargin.change.toFixed(1) + "%, świadcząca o optymalizacji kosztów produkcji lub korzystnych zmianach w strukturze przychodów");
    } else if (report.summaryData.grossMargin && report.summaryData.grossMargin.change < -2) {
      factors.push("Spadek marży brutto o " + Math.abs(report.summaryData.grossMargin.change).toFixed(1) + "%, wskazujący na rosnące koszty materiałów lub presję na obniżenie cen");
    }
    
    if (report.summaryData.operatingProfit.change > 5) {
      factors.push("Znacząca poprawa zysku operacyjnego o " + report.summaryData.operatingProfit.change.toFixed(1) + "%, wskazująca na zwiększoną efektywność działalności podstawowej");
    } else if (report.summaryData.operatingProfit.change < -5) {
      factors.push("Istotny spadek zysku operacyjnego o " + Math.abs(report.summaryData.operatingProfit.change).toFixed(1) + "%, sygnalizujący problemy w podstawowej działalności biznesowej");
    }
    
    if (report.summaryData.eps && report.summaryData.eps.change > 10) {
      factors.push("Znaczący wzrost zysku na akcję (EPS) o " + report.summaryData.eps.change.toFixed(1) + "%, co powinno pozytywnie wpłynąć na wycenę akcji");
    } else if (report.summaryData.eps && report.summaryData.eps.change < -10) {
      factors.push("Istotny spadek zysku na akcję (EPS) o " + Math.abs(report.summaryData.eps.change).toFixed(1) + "%, co może negatywnie wpłynąć na wycenę rynkową");
    }
    
    return factors.length > 0 ? factors : ["Brak wyraźnych czynników wyróżniających się w analizowanym okresie"];
  };
  
  const keyFactors = getKeyFactors();

  // Analiza sektorowa
  const getSectorAnalysis = () => {
    const sectorCategory = report.reportCategory[0] || "Ogólny";
    const performanceRelative = report.summaryData.revenue.change > 3 ? "ponadprzeciętne" : 
                               report.summaryData.revenue.change > 0 ? "przeciętne" : "poniżej średniej";
    
    let sectorTrend = "";
    if (sectorCategory.includes("Technology")) {
      sectorTrend = "Sektor technologiczny charakteryzuje się obecnie wysoką dynamiką wzrostu, szczególnie w obszarach AI, cloud computing i cyberbezpieczeństwa. W tym kontekście, wyniki spółki są " + performanceRelative + ".";
    } else if (sectorCategory.includes("Healthcare")) {
      sectorTrend = "Sektor ochrony zdrowia doświadcza obecnie transformacji w kierunku medycyny cyfrowej i personalizowanej. Wyniki spółki na tym tle są " + performanceRelative + ".";
    } else if (sectorCategory.includes("Finance")) {
      sectorTrend = "Sektor finansowy przechodzi intensywną cyfryzację i konsolidację. W porównaniu do konkurencji, wyniki spółki można określić jako " + performanceRelative + ".";
    } else if (sectorCategory.includes("Retail")) {
      sectorTrend = "Sektor detaliczny mierzy się z wyzwaniami transformacji omnichannel i zmieniających się preferencji konsumentów. Na tym tle spółka radzi sobie " + performanceRelative + ".";
    } else if (sectorCategory.includes("Energy")) {
      sectorTrend = "Sektor energetyczny przechodzi transformację w kierunku zrównoważonych źródeł energii. W tym kontekście, wyniki spółki są " + performanceRelative + ".";
    } else {
      sectorTrend = "W kontekście trendów sektorowych i dynamiki rynkowej, wyniki spółki można określić jako " + performanceRelative + ".";
    }
    
    return sectorTrend;
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Kluczowe Informacje</h2>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-300">Przegląd Raportu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-300">Typ Raportu</div>
              <div className="font-medium text-white">{report.reportType}</div>
            </div>
            <div>
              <div className="text-gray-300">Okres</div>
              <div className="font-medium text-white">{report.quarterOrYear}</div>
            </div>
            <div>
              <div className="text-gray-300">Data Publikacji</div>
              <div className="font-medium text-white">{formatDate(report.publicationDate)}</div>
            </div>
            <div>
              <div className="text-gray-300">Ticker</div>
              <div className="font-medium text-white">{report.ticker}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-300 flex items-center">
            <LineChart className="h-5 w-5 mr-2" />
            Kondycja Finansowa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <div className={`text-lg font-semibold ${companyCondition.color}`}>{companyCondition.status}</div>
              <div className="ml-2 px-2 py-0.5 rounded-full bg-neutral-700 text-xs">
                Q{report.quarter} {report.fiscalYear}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{companyCondition.description}</p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-neutral-700">
            <div className="flex items-center mb-2">
              <BarChart className="h-4 w-4 mr-2 text-amber-300" />
              <div className="text-sm font-medium text-amber-300">Kluczowe Wskaźniki</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex">
                <span className="text-amber-300 mr-2">•</span>
                Przychody: {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
                <span className={`ml-2 ${report.summaryData.revenue.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ({report.summaryData.revenue.change >= 0 ? '+' : ''}{report.summaryData.revenue.change.toFixed(1)}%)
                </span>
              </li>
              <li className="flex">
                <span className="text-amber-300 mr-2">•</span>
                Zysk operacyjny: {formatNumber(report.summaryData.operatingProfit.value, report.summaryData.operatingProfit.unit)}
                <span className={`ml-2 ${report.summaryData.operatingProfit.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ({report.summaryData.operatingProfit.change >= 0 ? '+' : ''}{report.summaryData.operatingProfit.change.toFixed(1)}%)
                </span>
              </li>
              <li className="flex">
                <span className="text-amber-300 mr-2">•</span>
                Zysk netto: {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
                <span className={`ml-2 ${report.summaryData.netIncome.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ({report.summaryData.netIncome.change >= 0 ? '+' : ''}{report.summaryData.netIncome.change.toFixed(1)}%)
                </span>
              </li>
              {report.summaryData.eps && (
                <li className="flex">
                  <span className="text-amber-300 mr-2">•</span>
                  Zysk na akcję: {formatNumber(report.summaryData.eps.value, report.summaryData.eps.unit)}
                  <span className={`ml-2 ${report.summaryData.eps.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ({report.summaryData.eps.change >= 0 ? '+' : ''}{report.summaryData.eps.change.toFixed(1)}%)
                  </span>
                </li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-300 flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Analiza Wyników
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300 mb-3">
            {report.companyName} {report.summaryData.revenue.change >= 0 ? 'wykazuje wzrost' : 'odnotowuje spadek'} o {Math.abs(report.summaryData.revenue.change).toFixed(1)}% 
            w przychodach za {report.quarterOrYear}, przy {report.summaryData.netIncome.change >= 0 ? 'poprawie' : 'pogorszeniu'} rentowności. 
            {report.summaryData.operatingProfit.change >= 0 
              ? ` Zysk operacyjny wzrósł o ${report.summaryData.operatingProfit.change.toFixed(1)}%, co świadczy o zwiększonej efektywności operacyjnej.` 
              : ` Zysk operacyjny spadł o ${Math.abs(report.summaryData.operatingProfit.change).toFixed(1)}%, co wskazuje na wyzwania operacyjne.`}
          </p>
          
          <div className="mt-3 pt-3 border-t border-neutral-700">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-300" />
              <div className="text-sm font-medium text-amber-300">Kluczowe Czynniki Wpływające</div>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {keyFactors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-300 mr-2 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3 pt-3 border-t border-neutral-700">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-4 w-4 mr-2 text-amber-300" />
              <div className="text-sm font-medium text-amber-300">Analiza Sektorowa</div>
            </div>
            <p className="text-sm text-gray-300">{getSectorAnalysis()}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold text-neutral-800">Najważniejsze Wyniki i Wydarzenia</h3>
        {report.keyHighlights.map((highlight, index) => (
          <div key={index} className="flex gap-2 items-start bg-neutral-800 p-3 rounded-md border-l-4 border-amber-400">
            <div className="h-6 w-6 rounded-full bg-amber-400 text-black flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p className="text-white">{highlight}</p>
          </div>
        ))}
      </div>
      
      <Card className="bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-300">Interpretacja Wyników</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300 mb-3">
            Przedstawione wyniki finansowe {report.companyName} za {report.quarterOrYear} należy interpretować w kontekście
            {report.summaryData.revenue.change >= 0 ? ' pozytywnego trendu wzrostowego' : ' wyzwań rynkowych'} oraz
            {report.summaryData.netIncome.change >= report.summaryData.revenue.change ? ' rosnącej efektywności kosztowej' : ' presji na marże'}.
          </p>
          <p className="text-sm text-gray-300 mb-3">
            {report.summaryData.revenue.change > 5 
              ? `Znaczący wzrost przychodów o ${report.summaryData.revenue.change.toFixed(1)}% wskazuje na silną pozycję rynkową i skuteczną strategię sprzedażową. `
              : report.summaryData.revenue.change > 0 
                ? `Umiarkowany wzrost przychodów o ${report.summaryData.revenue.change.toFixed(1)}% sugeruje stabilną, choć nie dynamiczną pozycję rynkową. `
                : `Spadek przychodów o ${Math.abs(report.summaryData.revenue.change).toFixed(1)}% sygnalizuje istotne wyzwania rynkowe lub produktowe. `}
            
            {report.summaryData.operatingProfit.change > report.summaryData.revenue.change 
              ? `Wzrost zysku operacyjnego przewyższający dynamikę przychodów świadczy o poprawie efektywności operacyjnej i skutecznej kontroli kosztów.`
              : report.summaryData.operatingProfit.change > 0 
                ? `Wzrost zysku operacyjnego, choć niższy od dynamiki przychodów, wskazuje na pewne wyzwania w obszarze kosztów operacyjnych.`
                : `Spadek zysku operacyjnego przy ${report.summaryData.revenue.change >= 0 ? 'rosnących' : 'spadających'} przychodach sygnalizuje problemy z kontrolą kosztów i efektywnością działalności podstawowej.`}
          </p>
          <p className="text-sm text-gray-300">
            {report.summaryData.eps 
              ? (report.summaryData.eps.change > 0 
                ? `Wzrost zysku na akcję o ${report.summaryData.eps.change.toFixed(1)}% powinien pozytywnie wpłynąć na ocenę spółki przez inwestorów i potencjalnie na wycenę rynkową.` 
                : `Spadek zysku na akcję o ${Math.abs(report.summaryData.eps.change).toFixed(1)}% może budzić obawy inwestorów i negatywnie wpłynąć na wycenę rynkową akcji.`)
              : "Brak danych o zysku na akcję utrudnia pełną ocenę efektywności spółki z perspektywy akcjonariuszy."}
            {report.dividendYield 
              ? ` Przy obecnej stopie dywidendy wynoszącej ${report.dividendYield.toFixed(2)}%, spółka oferuje ${report.dividendYield > 3 ? 'atrakcyjny' : 'umiarkowany'} zwrot dla inwestorów dywidendowych.`
              : ""}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
