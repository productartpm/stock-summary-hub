
import type { FinancialReport } from "@/lib/types";

interface ReportTrendsProps {
  report: FinancialReport;
}

export const ReportTrends = ({ report }: ReportTrendsProps) => {
  const categories = report.reportCategory || [];
  
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      "Technology": "Technologia",
      "Finance": "Finanse", 
      "Financial Services": "Usługi Finansowe",
      "Healthcare": "Ochrona Zdrowia",
      "Regulatory": "Regulacje",
      "ESG": "ESG",
      "Manufacturing": "Produkcja",
      "Energy": "Energetyka",
      "Retail": "Handel Detaliczny",
      "E-commerce": "E-commerce",
      "Consumer Goods": "Dobra Konsumpcyjne"
    };
    
    return translations[category] || category;
  };

  const getBusinessSegments = () => {
    const segments = Object.entries(report.summaryData)
      .filter(([key]) => !['revenue', 'netIncome', 'operatingProfit', 'eps', 'profit'].includes(key))
      .map(([key, data]) => ({
        name: key.replace(/([A-Z])/g, ' $1').trim(),
        change: data.change,
        value: data.value,
        unit: data.unit || ''
      }));

    return segments;
  };

  const businessSegments = getBusinessSegments();
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trendy</h1>
        <p className="text-gray-600">Analiza trendów rynkowych i zmian w segmentach działalności</p>
      </div>
      
      {/* Segmenty działalności */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Segmenty Działalności</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg space-y-4">
          {businessSegments.length > 0 ? (
            <>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Segmenty biznesowe - wzrost/spadek przychodów</h3>
                <div className="grid gap-3">
                  {businessSegments.map((segment, index) => (
                    <div key={index} className="bg-white p-4 rounded border flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{segment.name}</p>
                        <p className="text-sm text-gray-600">{segment.value.toLocaleString()} {segment.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${segment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {segment.change >= 0 ? 'Wzrost' : 'Spadek'}
                        </p>
                        <p className={`text-sm ${segment.change >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {Math.abs(segment.change).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Główne czynniki wpływające na zmiany</h3>
                <div className="bg-white p-4 rounded border">
                  {report.summaryData.revenue.change >= 5 ? (
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Silny wzrost popytu w kluczowych segmentach rynkowych
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Skuteczna realizacja strategii ekspansji i akwizycji
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Pozytywne trendy makroekonomiczne w sektorze {translateCategory(categories[0] || '')}
                      </li>
                    </ul>
                  ) : report.summaryData.revenue.change >= 0 ? (
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Stabilny popyt przy umiarkowanym wzroście rynku
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Optymalizacja portfolio produktowego i segmentów
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Dostosowanie do zmieniających się preferencji klientów
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Spadek popytu w wyniku spowolnienia gospodarczego
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Wzrost konkurencji i presja cenowa na rynku
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Negatywny wpływ czynników zewnętrznych na sektor
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>Brak danych:</strong> Nie posiadamy szczegółowych informacji o przychodach w podziale na segmenty biznesowe dla {report.companyName}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Zmiany na rynku */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Zmiany na Rynku</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Kluczowe trendy rynkowe wpływające na wyniki</h3>
            
            {categories.includes('Technology') && (
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-medium text-blue-900 mb-3">Sektor Technologiczny</h4>
                <div className="grid gap-2">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Cyfryzacja</p>
                      <p className="text-xs text-gray-600">Przyspieszenie procesów digitalizacji w przedsiębiorstwach</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">AI i automatyzacja</p>
                      <p className="text-xs text-gray-600">Rosnący popyt na rozwiązania sztucznej inteligencji</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Chmura obliczeniowa</p>
                      <p className="text-xs text-gray-600">Migracja do usług cloud computing</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {categories.includes('Financial Services') && (
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-medium text-green-900 mb-3">Usługi Finansowe</h4>
                <div className="grid gap-2">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Fintech</p>
                      <p className="text-xs text-gray-600">Rozwój nowoczesnych usług finansowych i płatności cyfrowych</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Regulacje</p>
                      <p className="text-xs text-gray-600">Nowe wymogi w zakresie Basel III i MIFID II</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Stopy procentowe</p>
                      <p className="text-xs text-gray-600">Wpływ polityki monetarnej na marże bankowe</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {categories.includes('Energy') && (
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-medium text-orange-900 mb-3">Energetyka</h4>
                <div className="grid gap-2">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Transformacja energetyczna</p>
                      <p className="text-xs text-gray-600">Przejście na odnawialne źródła energii</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Ceny surowców</p>
                      <p className="text-xs text-gray-600">Zmienność cen ropy, gazu i węgla</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Regulacje klimatyczne</p>
                      <p className="text-xs text-gray-600">Nowe wymogi dotyczące emisji CO2</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!categories.some(cat => ['Technology', 'Financial Services', 'Energy'].includes(cat)) && (
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Trendy Ogólne</h4>
                <div className="grid gap-2">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Inflacja</p>
                      <p className="text-xs text-gray-600">Wpływ rosnących kosztów na rentowność biznesu</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Łańcuchy dostaw</p>
                      <p className="text-xs text-gray-600">Wyzwania logistyczne i wzrost kosztów transportu</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm">Zmiany konsumenckie</p>
                      <p className="text-xs text-gray-600">Ewolucja preferencji i zachowań nabywczych</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Istotne regulacje i standardy</h3>
            <div className="bg-white p-4 rounded border">
              {categories.includes('ESG') && (
                <div className="mb-4">
                  <h4 className="font-medium text-green-800 mb-2">Regulacje ESG</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Dyrektywa CSRD: Nowe wymogi raportowania zrównoważonego rozwoju</li>
                    <li>• Taksonomia UE: Klasyfikacja działalności zgodnych z celami klimatycznymi</li>
                  </ul>
                </div>
              )}
              
              {categories.includes('Technology') && (
                <div className="mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">Regulacje Technologiczne</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• RODO/GDPR: Regulacje dotyczące ochrony danych osobowych</li>
                    <li>• Digital Services Act: Nowe przepisy dla platform cyfrowych</li>
                  </ul>
                </div>
              )}
              
              {categories.includes('Financial Services') && (
                <div className="mb-4">
                  <h4 className="font-medium text-purple-800 mb-2">Regulacje Finansowe</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Basel III: Zaostrzenie wymogów kapitałowych dla banków</li>
                    <li>• PSD2: Regulacje dotyczące usług płatniczych</li>
                  </ul>
                </div>
              )}
              
              {!categories.some(cat => ['ESG', 'Technology', 'Financial Services'].includes(cat)) && (
                <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    Nie posiadamy szczegółowych informacji o nowych regulacjach wpływających na sektor {translateCategory(categories[0] || 'ogólny')}.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Zmiany w zachowaniach konsumentów</h3>
            <div className="bg-white p-4 rounded border">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Preferencje cyfrowe</p>
                      <p className="text-xs text-gray-600">Wzrost znaczenia kanałów online i mobile</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Świadomość ESG</p>
                      <p className="text-xs text-gray-600">Rosnące znaczenie czynników zrównoważonego rozwoju</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Personalizacja</p>
                      <p className="text-xs text-gray-600">Oczekiwanie spersonalizowanych produktów i usług</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1 mr-3 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Elastyczność</p>
                      <p className="text-xs text-gray-600">Popyt na rozwiązania hybrydowe i adaptacyjne</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {businessSegments.length === 0 && (
                <div className="bg-gray-50 p-3 rounded border-l-4 border-gray-400 mt-4">
                  <p className="text-xs text-gray-700">
                    Nie posiadamy szczegółowych danych o wpływie zmian konsumenckich na konkretne segmenty biznesowe spółki.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
