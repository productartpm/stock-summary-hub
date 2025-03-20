
import { formatNumber } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Target, Zap } from "lucide-react";

interface ReportOutlookProps {
  report: FinancialReport;
}

export const ReportOutlook = ({ report }: ReportOutlookProps) => {
  if (!report.outlook) {
    return <p className="text-neutral-600">Brak dostępnych informacji o perspektywach.</p>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Plany na Przyszłość</h2>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-300">Oświadczenie Zarządu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-300">{report.outlook.statement}</p>
          
          {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.outlook.guidanceRevenue && (
                <div className="bg-neutral-700 rounded-lg p-4 border border-amber-400">
                  <div className="text-sm font-medium mb-1 text-amber-300">Prognoza Przychodów</div>
                  <div className="text-xl font-bold text-white">
                    {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
                  </div>
                </div>
              )}
              
              {report.outlook.guidanceEps && (
                <div className="bg-neutral-700 rounded-lg p-4 border border-amber-400">
                  <div className="text-sm font-medium mb-1 text-amber-300">Prognoza Zysku na Akcję</div>
                  <div className="text-xl font-bold text-white">
                    {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-amber-300">
              <Calendar className="h-4 w-4 mr-2 text-amber-300" />
              Plany Krótkoterminowe
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-300">
            <ul className="space-y-2">
              <li>• Koncentracja na segmencie {report.reportCategory[0]}</li>
              <li>• {report.summaryData.revenue.change >= 0 ? 'Rozwój' : 'Stabilizacja'} kluczowych operacji biznesowych</li>
              <li>• Optymalizacja struktury kosztów i efektywności operacyjnej</li>
              <li>• Wdrożenie nowych systemów zarządzania jakością</li>
              <li>• Rozwój platformy sprzedażowej online</li>
              {report.outlook.guidanceRevenue && <li>• Cel przychodowy: {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)}</li>}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-amber-300">
              <Target className="h-4 w-4 mr-2 text-amber-300" />
              Strategia Średnioterminowa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-300">
            <ul className="space-y-2">
              <li>• Ekspansja rynkowa na sąsiednie segmenty</li>
              <li>• Rozbudowa portfolio produktowego i innowacje</li>
              <li>• Partnerstwa strategiczne i potencjalne przejęcia</li>
              <li>• Rozwój technologiczny i transformacja cyfrowa</li>
              <li>• Inwestycje w badania i rozwój nowych produktów</li>
              <li>• Optymalizacja łańcucha dostaw i logistyki</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-amber-300">
              <Zap className="h-4 w-4 mr-2 text-amber-300" />
              Wizja Długoterminowa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-300">
            <ul className="space-y-2">
              <li>• Osiągnięcie pozycji lidera w segmencie {report.reportCategory[0]}</li>
              <li>• Dywersyfikacja w kierunku nowych obszarów biznesowych</li>
              <li>• Zrównoważony wzrost i tworzenie wartości dla akcjonariuszy</li>
              <li>• {report.reportCategory.includes('ESG') ? 'Rozszerzone inicjatywy ESG' : 'Transformacja branży i innowacje'}</li>
              <li>• Rozwój globalnej obecności i ekspansja międzynarodowa</li>
              <li>• Budowanie silnej kultury organizacyjnej opartej na innowacji</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
