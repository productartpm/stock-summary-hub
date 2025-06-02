
import type { FinancialReport } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    // Extract segments from summaryData excluding main financial metrics
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-neutral-800">Trendy</h2>
        
        {/* Segmenty działalności */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-blue-700">Segmenty działalności</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {businessSegments.length > 0 ? (
              <>
                <div>
                  <h4 className="font-medium mb-3">Segmenty biznesowe - wzrost/spadek przychodów:</h4>
                  <div className="space-y-2">
                    {businessSegments.map((segment, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded">
                        <span className="text-sm font-medium capitalize">{segment.name}</span>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${segment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {segment.change >= 0 ? '↑' : '↓'} {Math.abs(segment.change).toFixed(1)}%
                          </span>
                          <div className="text-xs text-neutral-500">
                            {segment.value.toLocaleString()} {segment.unit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Główne czynniki wpływające na zmiany:</h4>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <ul className="space-y-1 text-blue-800">
                      {report.summaryData.revenue.change >= 5 ? (
                        <>
                          <li>• Silny wzrost popytu w kluczowych segmentach rynkowych</li>
                          <li>• Skuteczna realizacja strategii ekspansji i akwizycji</li>
                          <li>• Pozytywne trendy makroekonomiczne w sektorze {translateCategory(categories[0] || '')}</li>
                        </>
                      ) : report.summaryData.revenue.change >= 0 ? (
                        <>
                          <li>• Stabilny popyt przy umiarkowanym wzroście rynku</li>
                          <li>• Optymalizacja portfolio produktowego i segmentów</li>
                          <li>• Dostosowanie do zmieniających się preferencji klientów</li>
                        </>
                      ) : (
                        <>
                          <li>• Spadek popytu w wyniku spowolnienia gospodarczego</li>
                          <li>• Wzrost konkurencji i presja cenowa na rynku</li>
                          <li>• Negatywny wpływ czynników zewnętrznych na sektor</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-amber-50 p-3 rounded text-sm">
                <p className="text-amber-800">
                  Nie posiadamy szczegółowych informacji o przychodach w podziale na segmenty biznesowe dla {report.companyName}.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Zmiany na rynku */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-700">Zmiany na rynku</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Kluczowe trendy rynkowe wpływające na wyniki:</h4>
              <div className="bg-green-50 p-3 rounded text-sm">
                <ul className="space-y-2 text-green-800">
                  {categories.includes('Technology') && (
                    <>
                      <li>• <strong>Cyfryzacja:</strong> Przyspieszenie procesów digitalizacji w przedsiębiorstwach</li>
                      <li>• <strong>AI i automatyzacja:</strong> Rosnący popyt na rozwiązania sztucznej inteligencji</li>
                      <li>• <strong>Chmura obliczeniowa:</strong> Migracja do usług cloud computing</li>
                    </>
                  )}
                  
                  {categories.includes('Financial Services') && (
                    <>
                      <li>• <strong>Fintech:</strong> Rozwój nowoczesnych usług finansowych i płatności cyfrowych</li>
                      <li>• <strong>Regulacje:</strong> Nowe wymogi w zakresie Basel III i MIFID II</li>
                      <li>• <strong>Stopy procentowe:</strong> Wpływ polityki monetarnej na marże bankowe</li>
                    </>
                  )}
                  
                  {categories.includes('Energy') && (
                    <>
                      <li>• <strong>Transformacja energetyczna:</strong> Przejście na odnawialne źródła energii</li>
                      <li>• <strong>Ceny surowców:</strong> Zmienność cen ropy, gazu i węgla</li>
                      <li>• <strong>Regulacje klimatyczne:</strong> Nowe wymogi dotyczące emisji CO2</li>
                    </>
                  )}
                  
                  {!categories.some(cat => ['Technology', 'Financial Services', 'Energy'].includes(cat)) && (
                    <>
                      <li>• <strong>Inflacja:</strong> Wpływ rosnących kosztów na rentowność biznesu</li>
                      <li>• <strong>Łańcuchy dostaw:</strong> Wyzwania logistyczne i wzrost kosztów transportu</li>
                      <li>• <strong>Zmiany konsumenckie:</strong> Ewolucja preferencji i zachowań nabywczych</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Istotne regulacje i standardy:</h4>
              <div className="bg-purple-50 p-3 rounded text-sm">
                <ul className="space-y-2 text-purple-800">
                  {categories.includes('ESG') && (
                    <>
                      <li>• <strong>Dyrektywa CSRD:</strong> Nowe wymogi raportowania zrównoważonego rozwoju</li>
                      <li>• <strong>Taksonomia UE:</strong> Klasyfikacja działalności zgodnych z celami klimatycznymi</li>
                    </>
                  )}
                  
                  {categories.includes('Technology') && (
                    <>
                      <li>• <strong>RODO/GDPR:</strong> Regulacje dotyczące ochrony danych osobowych</li>
                      <li>• <strong>Digital Services Act:</strong> Nowe przepisy dla platform cyfrowych</li>
                    </>
                  )}
                  
                  {categories.includes('Financial Services') && (
                    <>
                      <li>• <strong>Basel III:</strong> Zaostrzenie wymogów kapitałowych dla banków</li>
                      <li>• <strong>PSD2:</strong> Regulacje dotyczące usług płatniczych</li>
                    </>
                  )}
                  
                  {!categories.some(cat => ['ESG', 'Technology', 'Financial Services'].includes(cat)) && (
                    <li>• Brak szczegółowych informacji o nowych regulacjach wpływających na sektor {translateCategory(categories[0] || 'ogólny')}</li>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Zmiany w zachowaniach konsumentów:</h4>
              <div className="bg-orange-50 p-3 rounded text-sm">
                <ul className="space-y-1 text-orange-800">
                  <li>• <strong>Preferencje cyfrowe:</strong> Wzrost znaczenia kanałów online i mobile</li>
                  <li>• <strong>Świadomość ESG:</strong> Rosnące znaczenie czynników zrównoważonego rozwoju</li>
                  <li>• <strong>Personalizacja:</strong> Oczekiwanie spersonalizowanych produktów i usług</li>
                  <li>• <strong>Elastyczność:</strong> Popyt na rozwiązania hybrydowe i adaptacyjne</li>
                </ul>
                
                {businessSegments.length === 0 && (
                  <p className="text-orange-700 mt-2 text-xs">
                    Brak szczegółowych danych o wpływie zmian konsumenckich na konkretne segmenty biznesowe spółki.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
