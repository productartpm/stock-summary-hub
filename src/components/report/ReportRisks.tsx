
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, DollarSign, Users, Shield, Globe } from "lucide-react";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  // Safely access all properties with null checks and fallbacks
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const financialRisk = netIncomeChange < 0 ? 'high' : 
                      netIncomeChange < 5 ? 'medium' : 'low';
  
  // Safe access to operatingProfit with fallback
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  const operationalRisk = operatingProfitChange < 0 ? 'high' : 
                        operatingProfitChange < 5 ? 'medium' : 'low';
  
  const marketRisk = report.reportCategory?.includes('ESG') || 
                   report.reportCategory?.includes('Regulatory') ? 'high' : 'medium';

  // Translate risk levels to Polish
  const translateRiskLevel = (level: string) => {
    const translations: Record<string, string> = {
      high: "Wysoki",
      medium: "Średni",
      low: "Niski"
    };
    
    return translations[level] || level;
  };

  // Generate more detailed risk descriptions based on company characteristics
  const getFinancialRiskDetails = () => {
    return [
      financialRisk === 'high' ? 
        `Presja na marże wynikająca z rosnących kosztów operacyjnych i surowców przy ograniczonych możliwościach podnoszenia cen produktów.` : 
        `Umiarkowana presja na marże, wymagająca stałego monitorowania struktury kosztów i strategii cenowej.`,
      financialRisk === 'high' ? 
        `Ryzyko pogorszenia płynności finansowej w przypadku przedłużającej się dekoniunktury rynkowej.` : 
        `Zadowalający poziom płynności finansowej, zapewniający bufor bezpieczeństwa.`
    ];
  };

  const getOperationalRiskDetails = () => {
    return [
      operationalRisk === 'high' ? 
        `Złożoność łańcucha dostaw zwiększa ryzyko zakłóceń operacyjnych, zwłaszcza w obecnych warunkach geopolitycznych.` : 
        `Względnie stabilny łańcuch dostaw, z wdrożonymi procedurami zarządzania ciągłością biznesową.`,
      operationalRisk === 'high' ? 
        `Wysoka zależność od kluczowych dostawców i partnerów biznesowych, co ogranicza elastyczność operacyjną.` : 
        `Dywersyfikacja dostawców i partnerów biznesowych zapewnia względną odporność na zakłócenia.`
    ];
  };

  const getMarketRiskDetails = () => {
    return [
      marketRisk === 'high' ? 
        `Istotne ryzyko związane ze zmianami regulacyjnymi, szczególnie w obszarze ${report.category === "Financial Services" ? "usług finansowych" : report.category === "Technology" ? "ochrony danych" : "ochrony środowiska"}.` : 
        `Umiarkowane ryzyko związane z ewolucją otoczenia regulacyjnego, wymagające stałego monitorowania.`,
      marketRisk === 'high' ? 
        `Znaczna ekspozycja na wahania cyklu gospodarczego i potencjalne spowolnienie ekonomiczne.` : 
        `Relatywna odporność na krótkoterminowe wahania cyklu gospodarczego.`
    ];
  };

  const getCompetitiveRiskDetails = () => {
    const revenueChange = report.summaryData.revenue?.change ?? 0;
    
    return [
      revenueChange < 0 ? 
        `Rosnąca presja ze strony konkurencji, zarówno ze strony tradycyjnych graczy, jak i nowych, innowacyjnych podmiotów.` : 
        `Stabilna pozycja konkurencyjna, wsparta przez rozpoznawalność marki i lojalność klientów.`,
      report.category === "Technology" ? 
        `Ryzyko szybkiej dezaktualizacji technologii i produktów w dynamicznie zmieniającym się środowisku technologicznym.` : 
        `Wyzwania związane z dotrzymaniem kroku innowacjom i cyfrowej transformacji sektora.`
    ];
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Ocena Ryzyka</h2>
      
      <div className="mb-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
        <p className="text-sm text-neutral-700 leading-relaxed">
          Kompleksowa ocena ryzyka stanowi kluczowy element analizy perspektyw rozwoju {report.companyName}. 
          Identyfikujemy i analizujemy główne czynniki ryzyka w czterech kluczowych obszarach: makroekonomicznym, operacyjnym, 
          finansowym oraz konkurencyjnym.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="border-l-4 border-l-amber-500 bg-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <Globe className="h-5 w-5 mr-2 text-amber-500" />
              Ryzyka Makroekonomiczne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              {report.companyName} jest narażona na {marketRisk === 'high' ? 'znaczną' : 'umiarkowaną'} ekspozycję na zmienność rynku, 
              zmiany regulacyjne i warunki ekonomiczne wpływające na branżę {report.category?.toLowerCase() || ''}.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${marketRisk === 'high' ? 'text-red-400' : marketRisk === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>
              {translateRiskLevel(marketRisk)}
            </span></div>
            
            <div className="mt-3 border-t border-neutral-700 pt-3">
              <h4 className="text-xs font-medium text-amber-300 mb-2">Szczegółowe czynniki ryzyka:</h4>
              <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                {getMarketRiskDetails().map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500 bg-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <TrendingDown className="h-5 w-5 mr-2 text-blue-500" />
              Ryzyka Operacyjne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Wyniki operacyjne firmy wskazują na {operationalRisk === 'high' ? 'niepokojące' : operationalRisk === 'medium' ? 'umiarkowane' : 'minimalne'} czynniki 
              ryzyka związane z realizacją, łańcuchem dostaw i ciągłością biznesową.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${operationalRisk === 'high' ? 'text-red-400' : operationalRisk === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>
              {translateRiskLevel(operationalRisk)}
            </span></div>
            
            <div className="mt-3 border-t border-neutral-700 pt-3">
              <h4 className="text-xs font-medium text-amber-300 mb-2">Szczegółowe czynniki ryzyka:</h4>
              <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                {getOperationalRiskDetails().map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-green-500 bg-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              Ryzyka Finansowe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Wskaźniki finansowe sugerują {financialRisk === 'high' ? 'znaczną' : financialRisk === 'medium' ? 'umiarkowaną' : 'dobrze zarządzaną'} ekspozycję 
              na wyzwania związane z płynnością, zadłużeniem i rentownością.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${financialRisk === 'high' ? 'text-red-400' : financialRisk === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>
              {translateRiskLevel(financialRisk)}
            </span></div>
            
            <div className="mt-3 border-t border-neutral-700 pt-3">
              <h4 className="text-xs font-medium text-amber-300 mb-2">Szczegółowe czynniki ryzyka:</h4>
              <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                {getFinancialRiskDetails().map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500 bg-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Ryzyka Konkurencyjne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              {report.companyName} działa na {report.category === "Technology" ? 'szybko rozwijającym się' : 'dojrzałym'} rynku z 
              {(report.summaryData.revenue?.change ?? 0) >= 10 ? ' silną pozycją konkurencyjną' : (report.summaryData.revenue?.change ?? 0) >= 0 ? ' stabilną pozycją rynkową' : ' trudnym otoczeniem konkurencyjnym'}.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${(report.summaryData.revenue?.change ?? 0) < 0 ? 'text-amber-400' : 'text-green-400'}`}>
              {(report.summaryData.revenue?.change ?? 0) < 0 ? 'Średni' : 'Niski'}
            </span></div>
            
            <div className="mt-3 border-t border-neutral-700 pt-3">
              <h4 className="text-xs font-medium text-amber-300 mb-2">Szczegółowe czynniki ryzyka:</h4>
              <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                {getCompetitiveRiskDetails().map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <Card className="border-l-4 border-l-red-500 bg-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <Shield className="h-5 w-5 mr-2 text-red-500" />
              Matryca Ryzyka
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300 mb-3">
              Podsumowanie kluczowych czynników ryzyka wraz z potencjalnymi działaniami mitygującymi, 
              które zarząd {report.companyName} powinien rozważyć w swojej strategii zarządzania ryzykiem.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-neutral-700 rounded p-3">
                <h4 className="text-xs font-semibold text-amber-300 mb-1">Najwyższe priorytety:</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                  <li>Rozwój planów ciągłości działania na wypadek {report.category === "Technology" ? "cyberataków i awarii systemów IT" : "zakłóceń w łańcuchu dostaw"}</li>
                  <li>Optymalizacja struktury kosztów operacyjnych w celu poprawy marż i rentowności</li>
                </ul>
              </div>
              
              <div className="bg-neutral-700 rounded p-3">
                <h4 className="text-xs font-semibold text-amber-300 mb-1">Działania średnioterminowe:</h4>
                <ul className="text-xs text-gray-300 space-y-1 list-disc pl-4">
                  <li>Dywersyfikacja bazy dostawców i partnerów biznesowych</li>
                  <li>Inwestycje w innowacje produktowe i technologiczne</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
