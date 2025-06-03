
import type { FinancialReport } from "@/lib/types";

interface RegulatoryEnvironmentProps {
  report: FinancialReport;
}

export const RegulatoryEnvironment = ({ report }: RegulatoryEnvironmentProps) => {
  const categories = report.reportCategory || [];

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-yellow-500 pl-4">Wpływ Regulacji i Standardów</h2>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Zmieniające się otoczenie regulacyjne ma kluczowy wpływ na strategię i operacje spółki. 
          Najważniejsze obszary regulacyjne obejmują:
        </p>
        
        <div className="space-y-4">
          {categories.includes('ESG') && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Regulacje ESG i Zrównoważony Rozwój</h4>
              <p className="text-gray-700">
                Dyrektywa CSRD (Corporate Sustainability Reporting Directive) wprowadza nowe wymogi 
                raportowania zrównoważonego rozwoju, które będą obowiązywać spółki publiczne od 2024 roku. 
                Taksonomia UE klasyfikuje działalności gospodarcze pod kątem zgodności z celami klimatycznymi, 
                co bezpośrednio wpływa na dostęp do finansowania i wyceny spółek. Spółki muszą inwestować 
                w systemy raportowania ESG i dostosować modele biznesowe do wymogów zrównoważonego rozwoju.
              </p>
            </div>
          )}
          
          {categories.includes('Technology') && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Regulacje Technologiczne i Ochrona Danych</h4>
              <p className="text-gray-700">
                RODO/GDPR nadal stanowi kluczowy framework dla firm technologicznych, z karami sięgającymi 
                4% rocznych obrotów. Digital Services Act (DSA) wprowadza nowe obowiązki dla platform 
                cyfrowych, w tym wymogi moderacji treści i transparentności algorytmów. AI Act reguluje 
                rozwój i wdrażanie systemów sztucznej inteligencji, klasyfikując je według poziomów ryzyka.
              </p>
            </div>
          )}
          
          {categories.includes('Financial Services') && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Regulacje Finansowe i Bankowe</h4>
              <p className="text-gray-700">
                Basel III wprowadza zaostrzenie wymogów kapitałowych dla banków, wymagając wyższych 
                buforów kapitałowych i lepszego zarządzania ryzykiem płynności. PSD2 (Payment Services Directive) 
                otwiera rynek płatności na konkurencję, umożliwiając fintechom dostęp do danych bankowych klientów. 
                MIFID II wzmacnia ochronę inwestorów i transparentność rynków finansowych.
              </p>
            </div>
          )}
        </div>
        
        <div className="pl-4 border-l-2 border-orange-300 bg-orange-50 p-3">
          <p className="text-sm text-orange-800">
            <strong>Koszty compliance:</strong> Dostosowanie do nowych regulacji wymaga znaczących inwestycji 
            w systemy IT, procesy i personel. Szacuje się, że średnie koszty compliance w regulowanych sektorach 
            wzrosły o 25-30% w ciągu ostatnich trzech lat. Spółki muszą balansować między wymogami regulacyjnymi 
            a efektywnością operacyjną.
          </p>
        </div>
      </div>
    </section>
  );
};
