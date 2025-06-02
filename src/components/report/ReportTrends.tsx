
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
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="text-xl font-semibold mb-4">Trendy</h2>
        
        {/* Segmenty działalności */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Segmenty Działalności</h3>
          {businessSegments.length > 0 ? (
            <>
              <p className="mb-2">
                <strong>Segmenty biznesowe - wzrost/spadek przychodów:</strong>
              </p>
              {businessSegments.map((segment, index) => (
                <p key={index} className="mb-1 text-xs">
                  • {segment.name}: {segment.change >= 0 ? 'wzrost' : 'spadek'} o {Math.abs(segment.change).toFixed(1)}% 
                  ({segment.value.toLocaleString()} {segment.unit})
                </p>
              ))}
              
              <p className="mb-1 mt-3">
                <strong>Główne czynniki wpływające na zmiany:</strong>
              </p>
              {report.summaryData.revenue.change >= 5 ? (
                <ul className="list-disc list-inside text-xs ml-4 mb-2">
                  <li>Silny wzrost popytu w kluczowych segmentach rynkowych</li>
                  <li>Skuteczna realizacja strategii ekspansji i akwizycji</li>
                  <li>Pozytywne trendy makroekonomiczne w sektorze {translateCategory(categories[0] || '')}</li>
                </ul>
              ) : report.summaryData.revenue.change >= 0 ? (
                <ul className="list-disc list-inside text-xs ml-4 mb-2">
                  <li>Stabilny popyt przy umiarkowanym wzroście rynku</li>
                  <li>Optymalizacja portfolio produktowego i segmentów</li>
                  <li>Dostosowanie do zmieniających się preferencji klientów</li>
                </ul>
              ) : (
                <ul className="list-disc list-inside text-xs ml-4 mb-2">
                  <li>Spadek popytu w wyniku spowolnienia gospodarczego</li>
                  <li>Wzrost konkurencji i presja cenowa na rynku</li>
                  <li>Negatywny wpływ czynników zewnętrznych na sektor</li>
                </ul>
              )}
            </>
          ) : (
            <p className="text-xs text-gray-600">
              Nie posiadamy szczegółowych informacji o przychodach w podziale na segmenty biznesowe dla {report.companyName}.
            </p>
          )}
        </div>

        {/* Zmiany na rynku */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Zmiany na Rynku</h3>
          
          <p className="mb-1">
            <strong>Kluczowe trendy rynkowe wpływające na wyniki:</strong>
          </p>
          {categories.includes('Technology') && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Cyfryzacja: Przyspieszenie procesów digitalizacji w przedsiębiorstwach</li>
              <li>AI i automatyzacja: Rosnący popyt na rozwiązania sztucznej inteligencji</li>
              <li>Chmura obliczeniowa: Migracja do usług cloud computing</li>
            </ul>
          )}
          
          {categories.includes('Financial Services') && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Fintech: Rozwój nowoczesnych usług finansowych i płatności cyfrowych</li>
              <li>Regulacje: Nowe wymogi w zakresie Basel III i MIFID II</li>
              <li>Stopy procentowe: Wpływ polityki monetarnej na marże bankowe</li>
            </ul>
          )}
          
          {categories.includes('Energy') && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Transformacja energetyczna: Przejście na odnawialne źródła energii</li>
              <li>Ceny surowców: Zmienność cen ropy, gazu i węgla</li>
              <li>Regulacje klimatyczne: Nowe wymogi dotyczące emisji CO2</li>
            </ul>
          )}
          
          {!categories.some(cat => ['Technology', 'Financial Services', 'Energy'].includes(cat)) && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Inflacja: Wpływ rosnących kosztów na rentowność biznesu</li>
              <li>Łańcuchy dostaw: Wyzwania logistyczne i wzrost kosztów transportu</li>
              <li>Zmiany konsumenckie: Ewolucja preferencji i zachowań nabywczych</li>
            </ul>
          )}

          <p className="mb-1 mt-3">
            <strong>Istotne regulacje i standardy:</strong>
          </p>
          {categories.includes('ESG') && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Dyrektywa CSRD: Nowe wymogi raportowania zrównoważonego rozwoju</li>
              <li>Taksonomia UE: Klasyfikacja działalności zgodnych z celami klimatycznymi</li>
            </ul>
          )}
          
          {categories.includes('Technology') && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>RODO/GDPR: Regulacje dotyczące ochrony danych osobowych</li>
              <li>Digital Services Act: Nowe przepisy dla platform cyfrowych</li>
            </ul>
          )}
          
          {categories.includes('Financial Services') && (
            <ul className="list-disc list-inside text-xs ml-4 mb-2">
              <li>Basel III: Zaostrzenie wymogów kapitałowych dla banków</li>
              <li>PSD2: Regulacje dotyczące usług płatniczych</li>
            </ul>
          )}
          
          {!categories.some(cat => ['ESG', 'Technology', 'Financial Services'].includes(cat)) && (
            <p className="text-xs text-gray-600">
              Nie posiadamy szczegółowych informacji o nowych regulacjach wpływających na sektor {translateCategory(categories[0] || 'ogólny')}.
            </p>
          )}

          <p className="mb-1 mt-3">
            <strong>Zmiany w zachowaniach konsumentów:</strong>
          </p>
          <ul className="list-disc list-inside text-xs ml-4 mb-2">
            <li>Preferencje cyfrowe: Wzrost znaczenia kanałów online i mobile</li>
            <li>Świadomość ESG: Rosnące znaczenie czynników zrównoważonego rozwoju</li>
            <li>Personalizacja: Oczekiwanie spersonalizowanych produktów i usług</li>
            <li>Elastyczność: Popyt na rozwiązania hybrydowe i adaptacyjne</li>
          </ul>
          
          {businessSegments.length === 0 && (
            <p className="text-xs text-gray-600">
              Nie posiadamy szczegółowych danych o wpływie zmian konsumenckich na konkretne segmenty biznesowe spółki.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
