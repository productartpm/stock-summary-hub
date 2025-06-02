
import type { FinancialReport } from "@/lib/types";

interface ReportFuturePlansProps {
  report: FinancialReport;
}

export const ReportFuturePlans = ({ report }: ReportFuturePlansProps) => {
  const hasOutlook = report.outlook?.statement;
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Plany na Przyszłość</h1>
        <p className="text-gray-600">Strategiczne kierunki rozwoju spółki w perspektywie krótko- i długoterminowej</p>
      </div>
      
      {/* Krótkookresowe plany */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Krótkookresowe (następne 12 miesięcy)</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Działania operacyjne i rozwojowe</h3>
            
            {hasOutlook ? (
              <div className="bg-white p-4 rounded border space-y-3">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-blue-900 font-medium mb-2">Oficjalne stanowisko spółki:</p>
                  <p className="text-sm text-blue-800">{report.outlook?.statement}</p>
                </div>
                
                {report.outlook?.guidanceRevenue && (
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-medium text-green-900 mb-1">Prognoza przychodów:</p>
                    <p className="text-sm text-green-800">
                      {report.outlook.guidanceRevenue.min} - {report.outlook.guidanceRevenue.max} {report.outlook.guidanceRevenue.unit}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-4 rounded border">
                <div className="grid gap-4">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Ekspansja rynkowa</p>
                      <p className="text-sm text-gray-700">
                        {report.summaryData.revenue.change >= 0 ? 
                          'Planowana dalsza ekspansja na nowe rynki geograficzne i segmenty klientów' : 
                          'Konsolidacja pozycji na obecnych rynkach i optymalizacja portfolio klientów'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Optymalizacja kosztów</p>
                      <p className="text-sm text-gray-700">
                        {report.summaryData.operatingProfit?.change && report.summaryData.operatingProfit.change < 0 ? 
                          'Intensywny program redukcji kosztów operacyjnych i zwiększenia efektywności' : 
                          'Ciągła optymalizacja procesów biznesowych i automatyzacja'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Nowe produkty/usługi</p>
                      <p className="text-sm text-gray-700">
                        Rozwój innowacyjnych rozwiązań zgodnych z trendami branżowymi w sektorze {report.category}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mt-4">
                  <p className="text-xs text-yellow-800">
                    Nie posiadamy szczegółowych informacji o konkretnych planach inwestycyjnych spółki.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Planowane inwestycje</h3>
            
            <div className="bg-white p-4 rounded border">
              {report.category === "Technology" ? (
                <div className="grid gap-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Infrastruktura IT i cyberbezpieczeństwo</p>
                      <p className="text-xs text-gray-600">Modernizacja systemów i wzmocnienie bezpieczeństwa</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Rozwój zespołów R&D</p>
                      <p className="text-xs text-gray-600">Inwestycje w badania i platformy technologiczne</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Cyfryzacja procesów</p>
                      <p className="text-xs text-gray-600">Automatyzacja i digitalizacja operacji biznesowych</p>
                    </div>
                  </div>
                </div>
              ) : report.category === "Financial Services" ? (
                <div className="grid gap-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Bankowość cyfrowa</p>
                      <p className="text-xs text-gray-600">Modernizacja systemów i platform cyfrowych</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Compliance i zarządzanie ryzykiem</p>
                      <p className="text-xs text-gray-600">Dostosowanie do nowych regulacji</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Produkty fintech</p>
                      <p className="text-xs text-gray-600">Rozwój nowoczesnych usług finansowych</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Infrastruktura produkcyjna</p>
                      <p className="text-xs text-gray-600">Modernizacja i rozbudowa zdolności produkcyjnych</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Zrównoważony rozwój i ESG</p>
                      <p className="text-xs text-gray-600">Inwestycje w ekologiczne technologie</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Automatyzacja procesów</p>
                      <p className="text-xs text-gray-600">Digitalizacja i optymalizacja operacji</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-400 mt-4">
                <p className="text-xs text-gray-700">
                  Nie posiadamy informacji o konkretnych kwotach i harmonogramach inwestycji.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Długookresowe plany */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Długookresowe (2–3 lata)</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Strategia ekspansji rynkowej</h3>
            
            <div className="bg-white p-4 rounded border">
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-3">
                  {report.summaryData.revenue.change >= 10 ? 
                    'Agresywna strategia ekspansji oparta na silnych fundamentach finansowych' : 
                    report.summaryData.revenue.change >= 0 ? 
                    'Stopniowa ekspansja z zachowaniem stabilności finansowej' : 
                    'Ostrożna strategia z fokusem na umocnienie pozycji na obecnych rynkach'}
                </p>
              </div>
              
              <div className="grid gap-3">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-sm text-gray-700">Wejście na nowe rynki geograficzne</p>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-sm text-gray-700">Rozwój nowych kanałów dystrybucji</p>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <p className="text-sm text-gray-700">Strategiczne partnerstwa i akwizycje</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mt-4">
                <p className="text-xs text-yellow-800">
                  Nie posiadamy szczegółowych informacji o konkretnych planach ekspansji geograficznej.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Planowane zmiany w portfolio produktowym/usługowym</h3>
            
            <div className="bg-white p-4 rounded border">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Rozwój produktów zgodnych z megatrendami branżowymi</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Wycofanie przestarzałych linii produktowych</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Wprowadzenie rozwiązań premium i niszowych</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p className="text-sm text-gray-700">Rozwój usług okołoproduktowych i subskrypcyjnych</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mt-4">
                <p className="text-xs text-yellow-800">
                  Nie posiadamy szczegółowych informacji o konkretnych planach produktowych spółki.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Digitalizacja, automatyzacja, nowe technologie</h3>
            
            <div className="bg-white p-4 rounded border">
              <div className="grid gap-3">
                <div className="flex items-start">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-sm text-gray-900">AI i machine learning</p>
                    <p className="text-xs text-gray-600">Implementacja rozwiązań sztucznej inteligencji</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-sm text-gray-900">Automatyzacja procesów</p>
                    <p className="text-xs text-gray-600">Usprawnienie operacji produkcyjnych i administracyjnych</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-sm text-gray-900">Platformy e-commerce</p>
                    <p className="text-xs text-gray-600">Rozwój kanałów sprzedaży online i samoobsługowych</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-sm text-gray-900">IoT i Industry 4.0</p>
                    <p className="text-xs text-gray-600">Inwestycje w internet rzeczy i przemysł 4.0</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                  <div>
                    <p className="font-medium text-sm text-gray-900">Transformacja cyfrowa</p>
                    <p className="text-xs text-gray-600">Modernizacja relacji z klientami i procesów</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-400 mt-4">
                <p className="text-xs text-gray-700">
                  Ogólne trendy branżowe - nie posiadamy konkretnych informacji o planach technologicznych spółki.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
