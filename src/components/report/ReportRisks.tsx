
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, DollarSign, Users } from "lucide-react";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  // Determine risk levels based on financial data
  const financialRisk = report.summaryData.netIncome.change < 0 ? 'high' : 
                      report.summaryData.netIncome.change < 5 ? 'medium' : 'low';
  
  const operationalRisk = report.summaryData.operatingProfit.change < 0 ? 'high' : 
                        report.summaryData.operatingProfit.change < 5 ? 'medium' : 'low';
  
  const marketRisk = report.reportCategory.includes('ESG') || 
                   report.reportCategory.includes('Regulatory') ? 'high' : 'medium';

  // Translate risk levels to Polish
  const translateRiskLevel = (level: string) => {
    const translations: Record<string, string> = {
      high: "Wysoki",
      medium: "Średni",
      low: "Niski"
    };
    
    return translations[level] || level;
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Ocena Ryzyka</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="border-l-4 border-l-amber-500 bg-neutral-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-300">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Ryzyka Makroekonomiczne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              {report.companyName} jest narażona na {marketRisk === 'high' ? 'znaczną' : 'umiarkowaną'} ekspozycję na zmienność rynku, 
              zmiany regulacyjne i warunki ekonomiczne wpływające na branżę {report.reportCategory[0]?.toLowerCase() || ''}.
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Spodziewana inflacja oraz potencjalne zmiany stóp procentowych mogą mieć wpływ na decyzje inwestycyjne 
              i strukturę kosztów firmy w nadchodzących kwartałach.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${marketRisk === 'high' ? 'text-red-400' : marketRisk === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>
              {translateRiskLevel(marketRisk)}
            </span></div>
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
            <p className="text-sm text-gray-300 mt-2">
              Zależność od kluczowych dostawców oraz potencjalne zakłócenia w łańcuchu dostaw stanowią 
              istotne wyzwania operacyjne, które mogą wpłynąć na terminowość dostaw i jakość produktów.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${operationalRisk === 'high' ? 'text-red-400' : operationalRisk === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>
              {translateRiskLevel(operationalRisk)}
            </span></div>
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
            <p className="text-sm text-gray-300 mt-2">
              Struktura kosztowa firmy wymaga stałego monitorowania, szczególnie w obszarze kosztów pracy 
              i nakładów inwestycyjnych, które mogą wpłynąć na przyszłą rentowność i przepływy pieniężne.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${financialRisk === 'high' ? 'text-red-400' : financialRisk === 'medium' ? 'text-amber-400' : 'text-green-400'}`}>
              {translateRiskLevel(financialRisk)}
            </span></div>
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
              {report.companyName} działa na {report.reportCategory.includes('Technology') ? 'szybko rozwijającym się' : 'dojrzałym'} rynku z 
              {report.summaryData.revenue.change >= 10 ? ' silną pozycją konkurencyjną' : report.summaryData.revenue.change >= 0 ? ' stabilną pozycją rynkową' : ' trudnym otoczeniem konkurencyjnym'}.
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Pojawienie się nowych graczy rynkowych oraz zmieniające się preferencje klientów wymagają 
              ciągłej adaptacji strategii produktowej i marketingowej, aby utrzymać przewagę konkurencyjną.
            </p>
            <div className="mt-2 text-sm font-medium">Poziom ryzyka: <span className={`${report.summaryData.revenue.change < 0 ? 'text-amber-400' : 'text-green-400'}`}>
              {report.summaryData.revenue.change < 0 ? 'Średni' : 'Niski'}
            </span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
