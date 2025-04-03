
import { formatNumber, formatPercentage } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, ThumbsUp } from "lucide-react";

interface ReportSummaryMetricsProps {
  report: FinancialReport;
}

export const ReportSummaryMetrics = ({ report }: ReportSummaryMetricsProps) => {
  // Function to translate key names to Polish
  const translateKey = (key: string) => {
    const translations: Record<string, string> = {
      revenue: "Przychody",
      netIncome: "Zysk Netto",
      operatingProfit: "Zysk Operacyjny",
      eps: "Zysk na Akcję",
      marketCap: "Kapitalizacja",
      peRatio: "Wskaźnik P/E",
      dividendYield: "Stopa Dywidendy",
      debtToEquity: "Zadłużenie/Kapitał",
      currentRatio: "Wskaźnik Płynności",
      quickRatio: "Wskaźnik Szybki",
      returnOnEquity: "ROE",
      priceSales: "Cena/Przychody",
      ebitda: "EBITDA",
      cashFlow: "Przepływy Pieniężne",
      roa: "ROA",
      tpv: "Całkowita Wartość Płatności",
      activeAccounts: "Aktywne Konta",
    };
    
    return translations[key] || key.replace(/([A-Z])/g, ' $1').trim();
  };

  const getSentimentIcon = () => {
    if (!report.reportSummary) return null;
    
    switch (report.reportSummary.sentiment) {
      case 'positive':
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'neutral':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const getSentimentLabel = () => {
    if (!report.reportSummary) return "";
    
    switch (report.reportSummary.sentiment) {
      case 'positive':
        return "Pozytywna ocena wyników";
      case 'negative':
        return "Negatywna ocena wyników";
      case 'neutral':
        return "Neutralna ocena wyników";
      default:
        return "";
    }
  };

  // Generate a more comprehensive market context description
  const getMarketContext = () => {
    if (!report.reportSummary) return null;
    
    const revenueChange = report.summaryData.revenue.change;
    const incomeChange = report.summaryData.netIncome.change;
    
    let marketTrend = "";
    if (report.category === "Technology") {
      marketTrend = "Sektor technologiczny wykazuje oznaki stabilizacji po okresie dynamicznego wzrostu, z większym naciskiem inwestorów na rentowność niż na same przychody.";
    } else if (report.category === "Financial Services") {
      marketTrend = "Sektor finansowy zmaga się z wyzwaniami związanymi ze zmianami stóp procentowych i regulacyjnymi, co wpływa na marże operacyjne wielu instytucji.";
    } else if (report.category === "Energy") {
      marketTrend = "Sektor energetyczny przechodzi transformację w kierunku odnawialnych źródeł energii, co wiąże się z istotnymi inwestycjami i zmianami w strukturze przychodów.";
    } else {
      marketTrend = "Obecne warunki rynkowe charakteryzują się zwiększoną zmiennością i ostrożnością inwestorów, szczególnie w kontekście inflacji i potencjalnego spowolnienia gospodarczego.";
    }
    
    return marketTrend;
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Podsumowanie Finansowe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(report.summaryData).map(([key, data]) => (
          <div key={key} className="bg-neutral-800 rounded-lg p-4 border border-amber-400 text-white shadow-md hover:shadow-lg transition-shadow">
            <div className="text-sm font-medium mb-1 capitalize text-amber-300">
              {translateKey(key)}
            </div>
            <div className="text-2xl font-bold text-white">
              {typeof data.value === 'number' 
                ? formatNumber(data.value, data.unit) 
                : data.value}
            </div>
            <div className={`text-sm flex items-center ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.change >= 0 ? '↑' : '↓'} {formatPercentage(data.change)}
              <span className="text-xs text-gray-400 ml-2">vs poprzedni {report.reportType === 'Quarterly' ? 'kwartał' : 'rok'}</span>
            </div>
          </div>
        ))}
      </div>
      
      {report.reportSummary && (
        <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-300 mb-6">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {getSentimentIcon()}
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1 text-neutral-800 flex items-center">
                {getSentimentLabel()}
              </h3>
              <p className="text-neutral-700 mb-3">{report.reportSummary.text}</p>
              
              <div className="mt-4 border-t pt-3 border-neutral-200">
                <h4 className="font-medium text-sm mb-2 text-neutral-700">Kontekst rynkowy:</h4>
                <p className="text-neutral-600 text-sm">{getMarketContext()}</p>
              </div>
              
              <div className="mt-4 border-t pt-3 border-neutral-200">
                <h4 className="font-medium text-sm mb-2 text-neutral-700">Kluczowe czynniki wpływające na wyniki:</h4>
                <ul className="text-neutral-600 text-sm list-disc pl-5 space-y-1">
                  {report.summaryData.revenue.change >= 0 ? (
                    <li>Wzrost przychodów o {formatPercentage(report.summaryData.revenue.change)} dzięki {report.category === "Technology" ? "zwiększonej bazie użytkowników i nowym produktom" : "poprawie warunków rynkowych i strategiom cenowym"}</li>
                  ) : (
                    <li>Spadek przychodów o {formatPercentage(Math.abs(report.summaryData.revenue.change))} spowodowany {report.category === "Technology" ? "zwiększoną konkurencją i nasyceniem rynku" : "trudnymi warunkami makroekonomicznymi"}</li>
                  )}
                  
                  {report.summaryData.netIncome.change >= 0 ? (
                    <li>Poprawa zysku netto o {formatPercentage(report.summaryData.netIncome.change)} dzięki {report.summaryData.operatingProfit.change >= 0 ? "efektywności operacyjnej i kontroli kosztów" : "jednorazowym pozycjom zysków nadzwyczajnych"}</li>
                  ) : (
                    <li>Spadek zysku netto o {formatPercentage(Math.abs(report.summaryData.netIncome.change))} wynikający z {report.summaryData.operatingProfit.change < 0 ? "rosnących kosztów operacyjnych i presji na marże" : "wyższych kosztów finansowania i podatków"}</li>
                  )}
                  
                  <li>Obecne warunki makroekonomiczne charakteryzują się {report.category === "Financial Services" ? "zmiennością stóp procentowych i regulacjami sektora finansowego" : "presją inflacyjną i niepewnością geopolityczną"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {report.financialPeriod && (
        <div className="text-sm text-neutral-600 mb-2 bg-neutral-200 p-2 rounded-md inline-block">
          <span className="font-medium">Okres finansowy:</span> {report.financialPeriod}
        </div>
      )}
    </div>
  );
};
