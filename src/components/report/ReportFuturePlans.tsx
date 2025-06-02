
import type { FinancialReport } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Calendar, TrendingUp } from "lucide-react";

interface ReportFuturePlansProps {
  report: FinancialReport;
}

export const ReportFuturePlans = ({ report }: ReportFuturePlansProps) => {
  const hasOutlook = report.outlook?.statement;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-neutral-800">Plany na Przyszłość</h2>
        
        {/* Krótkookresowe plany */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Krótkookresowe (następne 12 miesięcy)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Działania operacyjne i rozwojowe:</h4>
              {hasOutlook ? (
                <div className="bg-blue-50 p-3 rounded text-sm">
                  <p className="text-blue-800 mb-2">{report.outlook?.statement}</p>
                  {report.outlook?.guidanceRevenue && (
                    <p className="text-blue-700">
                      <strong>Prognoza przychodów:</strong> {report.outlook.guidanceRevenue.min} - {report.outlook.guidanceRevenue.max} {report.outlook.guidanceRevenue.unit}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p>• <strong>Ekspansja rynkowa:</strong> {report.summaryData.revenue.change >= 0 ? 
                    'Planowana dalsza ekspansja na nowe rynki geograficzne i segmenty klientów' : 
                    'Konsolidacja pozycji na obecnych rynkach i optymalizacja portfolio klientów'}</p>
                  <p>• <strong>Optymalizacja kosztów:</strong> {report.summaryData.operatingProfit?.change && report.summaryData.operatingProfit.change < 0 ? 
                    'Intensywny program redukcji kosztów operacyjnych i zwiększenia efektywności' : 
                    'Ciągła optymalizacja procesów biznesowych i automatyzacja'}</p>
                  <p>• <strong>Nowe produkty/usługi:</strong> Rozwój innowacyjnych rozwiązań zgodnych z trendami branżowymi w sektorze {report.category}</p>
                  <p className="text-xs text-neutral-500 mt-2">
                    Uwaga: Nie posiadamy szczegółowych informacji o konkretnych planach inwestycyjnych spółki.
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Planowane inwestycje:</h4>
              <div className="bg-neutral-50 p-3 rounded text-sm">
                {report.category === "Technology" ? (
                  <ul className="space-y-1">
                    <li>• Inwestycje w infrastrukturę IT i cyberbezpieczeństwo</li>
                    <li>• Rozwój zespołów R&D i platform technologicznych</li>
                    <li>• Cyfryzacja procesów biznesowych</li>
                  </ul>
                ) : report.category === "Financial Services" ? (
                  <ul className="space-y-1">
                    <li>• Modernizacja systemów bankowości cyfrowej</li>
                    <li>• Inwestycje w compliance i zarządzanie ryzykiem</li>
                    <li>• Rozwój produktów fintech</li>
                  </ul>
                ) : (
                  <ul className="space-y-1">
                    <li>• Modernizacja infrastruktury produkcyjnej</li>
                    <li>• Inwestycje w zrównoważony rozwój i ESG</li>
                    <li>• Automatyzacja i digitalizacja procesów</li>
                  </ul>
                )}
                <p className="text-xs text-neutral-500 mt-2">
                  Brak szczegółowych informacji o konkretnych kwotach i harmonogramach inwestycji.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Długookresowe plany */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-green-700 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Długookresowe (2–3 lata)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Strategia ekspansji rynkowej:</h4>
              <div className="bg-green-50 p-3 rounded text-sm">
                <p className="text-green-800 mb-2">
                  {report.summaryData.revenue.change >= 10 ? 
                    'Agresywna strategia ekspansji oparta na silnych fundamentach finansowych' : 
                    report.summaryData.revenue.change >= 0 ? 
                    'Stopniowa ekspansja z zachowaniem stabilności finansowej' : 
                    'Ostrożna strategia z fokusem na umocnienie pozycji na obecnych rynkach'}
                </p>
                <ul className="space-y-1 text-green-700">
                  <li>• Wejście na nowe rynki geograficzne</li>
                  <li>• Rozwój nowych kanałów dystrybucji</li>
                  <li>• Strategiczne partnerstwa i akwizycje</li>
                </ul>
                <p className="text-xs text-neutral-500 mt-2">
                  Brak szczegółowych informacji o konkretnych planach ekspansji geograficznej.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Zmiany w portfolio produktowym/usługowym:</h4>
              <div className="bg-purple-50 p-3 rounded text-sm">
                <ul className="space-y-1 text-purple-800">
                  <li>• Rozwój produktów zgodnych z megatrendami branżowymi</li>
                  <li>• Wycofanie przestarzałych linii produktowych</li>
                  <li>• Wprowadzenie rozwiązań premium i niszowych</li>
                  <li>• Rozwój usług okołoproduktowych i subskrypcyjnych</li>
                </ul>
                <p className="text-xs text-neutral-500 mt-2">
                  Brak szczegółowych informacji o konkretnych planach produktowych spółki.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Digitalizacja, automatyzacja, nowe technologie:</h4>
              <div className="bg-blue-50 p-3 rounded text-sm">
                <ul className="space-y-1 text-blue-800">
                  <li>• Implementacja rozwiązań AI i machine learning</li>
                  <li>• Automatyzacja procesów produkcyjnych i administracyjnych</li>
                  <li>• Rozwój platform e-commerce i samoobsługowych</li>
                  <li>• Inwestycje w IoT i Industry 4.0</li>
                  <li>• Transformacja cyfrowa relacji z klientami</li>
                </ul>
                <p className="text-xs text-neutral-500 mt-2">
                  Ogólne trendy branżowe - brak konkretnych informacji o planach technologicznych spółki.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kluczowe wskaźniki docelowe */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-700 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Kluczowe Cele Strategiczne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Cele finansowe (estymowane):</h4>
                <ul className="space-y-1 text-neutral-700">
                  <li>• Wzrost przychodów: {report.summaryData.revenue.change >= 0 ? '10-15% rocznie' : '5-10% po stabilizacji'}</li>
                  <li>• Poprawa marży EBITDA: {report.summaryData.operatingProfit?.change && report.summaryData.operatingProfit.change >= 0 ? '+2-3 p.p.' : 'powrót do 15-20%'}</li>
                  <li>• Redukcja zadłużenia netto do 2x EBITDA</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Cele operacyjne:</h4>
                <ul className="space-y-1 text-neutral-700">
                  <li>• Digitalizacja 80% procesów biznesowych</li>
                  <li>• Zwiększenie automatyzacji o 50%</li>
                  <li>• Poprawa wskaźników ESG</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 rounded text-sm">
              <p className="text-amber-800">
                <strong>Zastrzeżenie:</strong> Przedstawione cele i plany są estymacjami opartymi na ogólnych trendach branżowych 
                i wynikach finansowych spółki. Dokładne cele strategiczne mogą być dostępne w oficjalnych komunikatach i prezentacjach spółki.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
