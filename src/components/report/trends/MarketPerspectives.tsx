
import type { FinancialReport } from "@/lib/types";

interface MarketPerspectivesProps {
  report: FinancialReport;
}

export const MarketPerspectives = ({ report }: MarketPerspectivesProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-indigo-500 pl-4">Perspektywy i Prognozy</h2>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Analiza trendów rynkowych wskazuje na {report.summaryData.revenue.change >= 5 ? 'optymistyczne' : 
            report.summaryData.revenue.change >= 0 ? 'umiarkowanie pozytywne' : 'wyzwaniowe'} 
          perspektywy dla spółki {report.companyName} w perspektywie krótko- i średnioterminowej.
        </p>
        
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong>Perspektywa 12-18 miesięcy:</strong> {report.summaryData.revenue.change >= 0 ?
              'Pozytywne trendy rynkowe powinny wspierać dalszy wzrost, pod warunkiem skutecznej realizacji strategii digitalizacji i ekspansji na nowe segmenty.' :
              'Wyzwania rynkowe wymagają skoncentrowania się na optymalizacji kosztów i szukaniu nowych źródeł przychodów. Kluczowa będzie elastyczność w dostosowaniu się do zmieniających się warunków.'
            }
          </p>
          
          <p className="text-gray-700">
            <strong>Perspektywa 2-3 lata:</strong> Długoterminowe trendy związane z transformacją cyfrową, 
            zrównoważonym rozwojem i zmianami demograficznymi będą kształtować krajobraz konkurencyjny. 
            Spółki, które skutecznie zaadaptują się do tych trendów, mogą oczekiwać przewagi konkurencyjnej.
          </p>
        </div>
        
        <div className="pl-4 border-l-2 border-purple-300 bg-purple-50 p-3">
          <p className="text-sm text-purple-800">
            <strong>Kluczowe czynniki sukcesu:</strong> Zdolność do szybkiej adaptacji do zmieniających się 
            warunków rynkowych, inwestycje w kompetencje cyfrowe, skuteczne zarządzanie ESG oraz budowanie 
            odpornych łańcuchów dostaw będą decydować o długoterminowym sukcesie na rynku.
          </p>
        </div>
      </div>
    </section>
  );
};
