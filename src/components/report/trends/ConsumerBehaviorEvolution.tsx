
import type { FinancialReport } from "@/lib/types";

interface ConsumerBehaviorEvolutionProps {
  report: FinancialReport;
}

export const ConsumerBehaviorEvolution = ({ report }: ConsumerBehaviorEvolutionProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Ewolucja Zachowań Konsumentów</h2>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Pandemia COVID-19 przyspieszyła fundamentalne zmiany w zachowaniach konsumentów, 
          które mają trwały wpływ na strategie biznesowe:
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Digitalizacja Doświadczeń Klienta</h4>
            <p className="text-gray-700">
              Konsumenci oczekują obecnie bezproblemowych doświadczeń omnichannel, łączących kanały 
              online i offline. E-commerce rośnie w tempie 15-20% rocznie, podczas gdy znaczenie 
              kanałów mobilnych wzrasta jeszcze szybciej. Spółki muszą inwestować w platformy 
              cyfrowe i personalizację doświadczeń klienta.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Świadomość ESG i Zrównoważony Konsumpcja</h4>
            <p className="text-gray-700">
              Rosnąca świadomość ekologiczna konsumentów wpływa na decyzje zakupowe. 65% konsumentów 
              deklaruje gotowość płacenia premium za produkty zrównoważone. Transparentność łańcucha 
              dostaw i praktyki ESG stają się czynnikami różnicującymi marki.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Personalizacja i Elastyczność</h4>
            <p className="text-gray-700">
              Konsumenci oczekują spersonalizowanych produktów i usług dostosowanych do indywidualnych 
              potrzeb. Modele subskrypcyjne i usługi "as-a-service" zyskują popularność kosztem 
              tradycyjnych modeli sprzedaży. Elastyczność w zakresie płatności, dostaw i zwrotów 
              staje się standardem rynkowym.
            </p>
          </div>
        </div>
        
        <div className="pl-4 border-l-2 border-green-300 bg-green-50 p-3">
          <p className="text-sm text-green-800">
            <strong>Implikacje strategiczne:</strong> Spółki muszą przekształcić swoje modele biznesowe 
            w kierunku większej elastyczności i responsywności na zmieniające się potrzeby klientów. 
            Inwestycje w technologie CRM, analytics i automatyzację marketingu stają się kluczowe 
            dla utrzymania konkurencyjności. Tradycyjne podejście "one-size-fits-all" traci na znaczeniu 
            na rzecz segmentacji i mikrotargetingu.
          </p>
        </div>
      </div>
    </section>
  );
};
