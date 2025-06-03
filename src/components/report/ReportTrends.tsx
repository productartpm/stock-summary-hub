
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analiza Trendów Rynkowych</h1>
        <p className="text-gray-600">Szczegółowe omówienie tendencji branżowych i ich wpływu na działalność spółki</p>
      </div>
      
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Analiza Segmentów Biznesowych</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            Spółka {report.companyName} funkcjonuje w sektorze {translateCategory(categories[0] || 'ogólnym')}, 
            gdzie odnotowuje się {report.summaryData.revenue.change >= 5 ? 'dynamiczny wzrost' : 
                                 report.summaryData.revenue.change >= 0 ? 'stabilny rozwój' : 'spowolnienie'} 
            aktivności biznesowej. Główne segmenty działalności spółki obejmują:
          </p>
          
          <div className="space-y-3 pl-4">
            <p className="text-gray-700">
              <strong>Segment podstawowy (około 70-80% przychodów):</strong> Stanowi trzon działalności operacyjnej 
              i wykazuje {report.summaryData.revenue.change >= 0 ? 'tendencję wzrostową' : 'objawy spowolnienia'}. 
              {report.summaryData.revenue.change >= 5 ? 
                'Silny wzrost w tym segmencie wynika z ekspansji na nowe rynki oraz zwiększenia udziałów w segmentach premium.' :
                report.summaryData.revenue.change >= 0 ?
                'Umiarkowany wzrost odzwierciedla stabilność rynku przy jednoczesnym wzroście konkurencji.' :
                'Spadek wyników w głównym segmencie sygnalizuje strukturalne wyzwania rynkowe wymagające strategicznej reorientacji.'
              }
            </p>
            
            <p className="text-gray-700">
              <strong>Segment usług dodatkowych (około 15-20% przychodów):</strong> Wykazuje 
              {report.summaryData.revenue.change >= 0 ? 'potencjał wzrostu' : 'presję na marże'} 
              i stanowi kluczowy element strategii dywersyfikacji. Rozwój tego segmentu jest ściśle powiązany 
              z trendami digitalizacji i automatyzacji procesów biznesowych.
            </p>
            
            <p className="text-gray-700">
              <strong>Pozostałe działalności (około 5-10% przychodów):</strong> Obejmują działalności 
              komplementarne i eksperymentalne projekty. {report.summaryData.revenue.change >= 0 ?
                'Segment ten może stać się nowym motorem wzrostu w perspektywie średnioterminowej.' :
                'W obliczu wyzwań w podstawowej działalności, segment ten wymaga przeglądu strategicznego.'
              }
            </p>
          </div>
          
          <div className="pl-4 border-l-2 border-blue-300 bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <strong>Czynniki wpływające na wyniki segmentowe:</strong> {report.summaryData.revenue.change >= 5 ?
                'Silny wzrost wyników jest efektem skutecznej realizacji strategii ekspansji, wprowadzenia innowacyjnych produktów oraz optymalizacji procesów operacyjnych. Spółka skutecznie wykorzystuje pozytywne trendy rynkowe i umacnia swoją pozycję konkurencyjną.' :
                report.summaryData.revenue.change >= 0 ?
                'Stabilne wyniki odzwierciedlają dojrzałość rynku i rosnącą konkurencję. Spółka utrzymuje pozycję poprzez ciągłe doskonalenie oferty i optymalizację kosztów.' :
                'Spadek wyników jest konsekwencją niekorzystnych czynników zewnętrznych, w tym spowolnienia gospodarczego, zmian preferencji konsumentów oraz wzrostu konkurencji cenowej.'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Kluczowe Trendy Branżowe</h2>
        
        <div className="space-y-5">
          {categories.includes('Technology') && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Transformacja Cyfrowa i Technologiczna</h3>
              <p className="text-gray-700">
                Sektor technologiczny przechodzi obecnie przez okres intensywnej transformacji napędzanej przez 
                rozwój sztucznej inteligencji, automatyzacji oraz rozwiązań chmurowych. Główne trendy obejmują:
              </p>
              <div className="pl-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Sztuczna inteligencja i machine learning:</strong> Rosnący popyt na rozwiązania AI 
                  napędza inwestycje w R&D oraz akwizycje specjalistycznych firm technologicznych. Spółki inwestują 
                  średnio 15-20% przychodów w rozwój kompetencji związanych z AI.
                </p>
                <p className="text-gray-700">
                  <strong>Cloud computing:</strong> Migracja do chmury przyspiesza, z oczekiwanym wzrostem rynku 
                  o 12-15% rocznie. Spółki oferujące usługi chmurowe odnotowują silny wzrost przychodów recurrentowych.
                </p>
                <p className="text-gray-700">
                  <strong>Cyberbezpieczeństwo:</strong> Wzrost zagrożeń cybernetycznych napędza popyt na rozwiązania 
                  bezpieczeństwa, tworząc nowy segment wzrostu dla firm technologicznych.
                </p>
              </div>
            </div>
          )}
          
          {categories.includes('Financial Services') && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Rewolucja Fintech i Regulacje</h3>
              <p className="text-gray-700">
                Sektor usług finansowych doświadcza fundamentalnych zmian napędzanych przez digitalizację, 
                nowe regulacje oraz zmieniające się oczekiwania klientów:
              </p>
              <div className="pl-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Płatności cyfrowe:</strong> Gwałtowny wzrost popularności płatności mobilnych i bezgotówkowych 
                  zmienia krajobraz konkurencyjny. Tradycyjne banki muszą inwestować w nowoczesne platformy płatnicze.
                </p>
                <p className="text-gray-700">
                  <strong>Open Banking:</strong> Regulacje PSD2 i Open Banking tworzą nowe możliwości dla fintechów 
                  przy jednoczesnym wzroście konkurencji dla tradycyjnych instytucji finansowych.
                </p>
                <p className="text-gray-700">
                  <strong>Stopy procentowe:</strong> Zmiany w polityce monetarnej bezpośrednio wpływają na marże 
                  bankowe i rentowność tradycyjnej działalności kredytowej.
                </p>
              </div>
            </div>
          )}
          
          {categories.includes('Energy') && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Transformacja Energetyczna</h3>
              <p className="text-gray-700">
                Sektor energetyczny przechodzi przez historyczną transformację w kierunku źródeł odnawialnych 
                i zrównoważonego rozwoju:
              </p>
              <div className="pl-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Energia odnawialna:</strong> Inwestycje w OZE rosną w tempie 20-25% rocznie. 
                  Spółki energetyczne przekierowują kapitał z tradycyjnych źródeł na projekty wiatrowe i fotowoltaiczne.
                </p>
                <p className="text-gray-700">
                  <strong>Magazynowanie energii:</strong> Rozwój technologii bateryjnych i systemów magazynowania 
                  otwiera nowe obszary biznesowe i modele przychodowe.
                </p>
                <p className="text-gray-700">
                  <strong>Regulacje klimatyczne:</strong> Nowe wymogi dotyczące emisji CO2 wymuszają masowe inwestycje 
                  w czyste technologie i modernizację infrastruktury.
                </p>
              </div>
            </div>
          )}
          
          {!categories.some(cat => ['Technology', 'Financial Services', 'Energy'].includes(cat)) && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Trendy Makroekonomiczne</h3>
              <p className="text-gray-700">
                Obecne środowisko biznesowe charakteryzuje się zwiększoną niepewnością i zmiennością, 
                co wpływa na wszystkie sektory gospodarki:
              </p>
              <div className="pl-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Inflacja i koszty:</strong> Rosnące koszty energii, surowców i pracy wpływają negatywnie 
                  na marże operacyjne. Spółki muszą optymalizować strukturę kosztową i podnosić ceny.
                </p>
                <p className="text-gray-700">
                  <strong>Łańcuchy dostaw:</strong> Globalne zakłócenia w łańcuchach dostaw wymuszają większą 
                  elastyczność i lokalizację produkcji.
                </p>
                <p className="text-gray-700">
                  <strong>Digitalizacja:</strong> Przyspieszenie procesów cyfrowych we wszystkich branżach 
                  tworzy nowe możliwości biznesowe i wymusza adaptację tradycyjnych modeli.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Wpływ Regulacji i Standardów</h2>
        
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

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Ewolucja Zachowań Konsumentów</h2>
        
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

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Perspektywy i Prognozy</h2>
        
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
    </div>
  );
};
