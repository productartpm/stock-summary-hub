
import type { FinancialReport } from "@/lib/types";

interface IndustryTrendsProps {
  report: FinancialReport;
}

export const IndustryTrends = ({ report }: IndustryTrendsProps) => {
  const categories = report.reportCategory || [];

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-green-500 pl-4">Kluczowe Trendy Branżowe</h2>
      
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
  );
};
