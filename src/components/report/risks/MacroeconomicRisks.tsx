
import type { FinancialReport } from "@/lib/types";

interface MacroeconomicRisksProps {
  report: FinancialReport;
}

export const MacroeconomicRisks = ({ report }: MacroeconomicRisksProps) => {
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-red-500 pl-4">Ryzyka Makroekonomiczne</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Inflacja i Wzrost Kosztów</h3>
          <p className="text-gray-700 mb-4">
            {operatingProfitChange < 0 ? 
              `Rosnąca presja inflacyjna stanowi obecnie najistotniejsze zagrożenie dla rentowności spółki ${report.companyName}. Wzrost kosztów surowców o 15-20%, energii o 25% oraz usług zewnętrznych o 12% w ciągu ostatnich 12 miesięcy bezpośrednio wpływa na pogorszenie marż operacyjnych. Spółka napotyka trudności w przenoszeniu rosnących kosztów na ceny produktów ze względu na intensywną konkurencję rynkową.` :
              `Pomimo obecnej stabilności kosztowej, spółka pozostaje narażona na ryzyko dalszego wzrostu inflacji. Szczególnie wrażliwe są koszty personelu (stanowiące ~35% przychodów) oraz energii (~8% przychodów). Zarząd monitoruje sytuację i przygotowuje mechanizmy hedgingowe oraz klauzule waloryzacyjne w kontraktach długoterminowych.`
            }
          </p>
          
          <p className="text-gray-700">
            Długoterminowe prognozy wskazują na utrzymanie podwyższonej inflacji przez kolejne 18-24 miesiące, co może wymagać strukturalnych zmian w modelu biznesowym. Kluczowe będą inwestycje w automatyzację oraz renegocjacja umów z kluczowymi dostawcami w celu zabezpieczenia stabilności kosztowej.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Wahania Kursów Walutowych</h3>
          <p className="text-gray-700 mb-4">
            {report.category === "Technology" || report.category === "Financial Services" ? 
              `Znacząca ekspozycja na rynki międzynarodowe (około 30-40% przychodów) naraża spółkę na ryzyko kursowe. Osłabienie złotego o 10% względem euro i dolara może pozytywnie wpłynąć na przychody eksportowe, ale jednocześnie zwiększyć koszty importowanych komponentów i licencji technologicznych. Saldo netto ekspozycji walutowej wynosi około -15% przychodów, co oznacza negatywny wpływ aprecjacji złotego.` :
              `Ograniczona ekspozycja walutowa (około 10-15% przychodów) minimalizuje bezpośrednie ryzyko kursowe. Jednak pośredni wpływ przez wahania cen surowców denominowanych w dolarze oraz konkurencję ze strony importerów może być istotny. Spółka rozważa implementację naturalnego hedgingu poprzez zwiększenie eksportu.`
            }
          </p>
          
          <p className="text-gray-700">
            Strategia zarządzania ryzykiem walutowym obejmuje wykorzystanie instrumentów pochodnych dla 60-70% ekspozycji, utrzymanie naturalnego hedgingu oraz monitoring korelacji między kursami a cenami surowców. Zarząd planuje zwiększenie udziału kontraktów w złotych w strukturze przychodów.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Zmiany Regulacyjne i Polityka Fiskalna</h3>
          <p className="text-gray-700 mb-4">
            {report.category === "Financial Services" ? 
              `Sektor finansowy podlega intensywnym zmianom regulacyjnym, w szczególności związanym z implementacją Basel IV, regulacji ESG oraz nowych wymogów w zakresie cyberbezpieczeństwa. Szacunkowe koszty compliance wynoszą około 15-20 mln zł rocznie i będą rosnąć wraz z nowymi wymogami. Kluczowe ryzyka obejmują zmiany w regulacjach kapitałowych, wymogi dotyczące rezerw oraz potencjalne ograniczenia w działalności kredytowej.` :
              `Zmiany w prawie podatkowym, regulacjach środowiskowych oraz wymogach ESG mogą znacząco wpłynąć na koszty operacyjne. Planowana rewizja systemu opłat środowiskowych może zwiększyć koszty o 3-5% przychodów. Dodatkowo, nowe regulacje dotyczące raportowania ESG wymagają inwestycji w systemy monitorowania i sprawozdawczości w wysokości około 5-8 mln zł.`
            }
          </p>
          
          <p className="text-gray-700">
            Spółka aktywnie monitoruje zmiany legislacyjne poprzez uczestnictwo w organizacjach branżowych oraz współpracę z kancelariami prawnymi. Budżet na działania związane z compliance został zwiększony o 25% w celu zapewnienia pełnej zgodności z nowymi wymogami regulacyjnymi.
          </p>
        </div>
      </div>
    </section>
  );
};
