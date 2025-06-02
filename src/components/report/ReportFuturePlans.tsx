
import type { FinancialReport } from "@/lib/types";

interface ReportFuturePlansProps {
  report: FinancialReport;
}

export const ReportFuturePlans = ({ report }: ReportFuturePlansProps) => {
  const hasOutlook = report.outlook?.statement;
  
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="text-xl font-semibold mb-4">Plany na Przyszłość</h2>
        
        {/* Krótkookresowe plany */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Krótkookresowe (następne 12 miesięcy)</h3>
          
          <p className="mb-1">
            <strong>Działania operacyjne i rozwojowe:</strong>
          </p>
          {hasOutlook ? (
            <>
              <p className="mb-2 text-xs">{report.outlook?.statement}</p>
              {report.outlook?.guidanceRevenue && (
                <p className="mb-2 text-xs">
                  <strong>Prognoza przychodów:</strong> {report.outlook.guidanceRevenue.min} - {report.outlook.guidanceRevenue.max} {report.outlook.guidanceRevenue.unit}
                </p>
              )}
            </>
          ) : (
            <>
              <ul className="list-disc list-inside text-xs ml-4 mb-2">
                <li>Ekspansja rynkowa: {report.summaryData.revenue.change >= 0 ? 
                  'Planowana dalsza ekspansja na nowe rynki geograficzne i segmenty klientów' : 
                  'Konsolidacja pozycji na obecnych rynkach i optymalizacja portfolio klientów'}</li>
                <li>Optymalizacja kosztów: {report.summaryData.operatingProfit?.change && report.summaryData.operatingProfit.change < 0 ? 
                  'Intensywny program redukcji kosztów operacyjnych i zwiększenia efektywności' : 
                  'Ciągła optymalizacja procesów biznesowych i automatyzacja'}</li>
                <li>Nowe produkty/usługi: Rozwój innowacyjnych rozwiązań zgodnych z trendami branżowymi w sektorze {report.category}</li>
              </ul>
              <p className="text-xs text-gray-600 mb-2">
                Nie posiadamy szczegółowych informacji o konkretnych planach inwestycyjnych spółki.
              </p>
            </>
          )}
          
          <p className="mb-1">
            <strong>Planowane inwestycje:</strong>
          </p>
          {report.category === "Technology" ? (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Inwestycje w infrastrukturę IT i cyberbezpieczeństwo</li>
              <li>Rozwój zespołów R&D i platform technologicznych</li>
              <li>Cyfryzacja procesów biznesowych</li>
            </ul>
          ) : report.category === "Financial Services" ? (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Modernizacja systemów bankowości cyfrowej</li>
              <li>Inwestycje w compliance i zarządzanie ryzykiem</li>
              <li>Rozwój produktów fintech</li>
            </ul>
          ) : (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Modernizacja infrastruktury produkcyjnej</li>
              <li>Inwestycje w zrównoważony rozwój i ESG</li>
              <li>Automatyzacja i digitalizacja procesów</li>
            </ul>
          )}
          <p className="text-xs text-gray-600">
            Nie posiadamy informacji o konkretnych kwotach i harmonogramach inwestycji.
          </p>
        </div>

        {/* Długookresowe plany */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Długookresowe (2–3 lata)</h3>
          
          <p className="mb-1">
            <strong>Strategia ekspansji rynkowej:</strong>
          </p>
          <p className="mb-2 text-xs">
            {report.summaryData.revenue.change >= 10 ? 
              'Agresywna strategia ekspansji oparta na silnych fundamentach finansowych' : 
              report.summaryData.revenue.change >= 0 ? 
              'Stopniowa ekspansja z zachowaniem stabilności finansowej' : 
              'Ostrożna strategia z fokusem na umocnienie pozycji na obecnych rynkach'}
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            <li>Wejście na nowe rynki geograficzne</li>
            <li>Rozwój nowych kanałów dystrybucji</li>
            <li>Strategiczne partnerstwa i akwizycje</li>
          </ul>
          <p className="text-xs text-gray-600 mb-3">
            Nie posiadamy szczegółowych informacji o konkretnych planach ekspansji geograficznej.
          </p>
          
          <p className="mb-1">
            <strong>Planowane zmiany w portfolio produktowym/usługowym:</strong>
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            <li>Rozwój produktów zgodnych z megatrendami branżowymi</li>
            <li>Wycofanie przestarzałych linii produktowych</li>
            <li>Wprowadzenie rozwiązań premium i niszowych</li>
            <li>Rozwój usług okołoproduktowych i subskrypcyjnych</li>
          </ul>
          <p className="text-xs text-gray-600 mb-3">
            Nie posiadamy szczegółowych informacji o konkretnych planach produktowych spółki.
          </p>
          
          <p className="mb-1">
            <strong>Digitalizacja, automatyzacja, nowe technologie:</strong>
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            <li>Implementacja rozwiązań AI i machine learning</li>
            <li>Automatyzacja procesów produkcyjnych i administracyjnych</li>
            <li>Rozwój platform e-commerce i samoobsługowych</li>
            <li>Inwestycje w IoT i Industry 4.0</li>
            <li>Transformacja cyfrowa relacji z klientami</li>
          </ul>
          <p className="text-xs text-gray-600">
            Ogólne trendy branżowe - nie posiadamy konkretnych informacji o planach technologicznych spółki.
          </p>
        </div>
      </div>
    </div>
  );
};
