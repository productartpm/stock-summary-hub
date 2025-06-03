
import type { FinancialReport } from "@/lib/types";

interface OperationalRisksProps {
  report: FinancialReport;
}

export const OperationalRisks = ({ report }: OperationalRisksProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-4">Ryzyka Operacyjne</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Stabilność Łańcucha Dostaw</h3>
          <p className="text-gray-700 mb-4">
            {report.category === "Manufacturing" || report.category === "Energy" ? 
              `Wysoka zależność od stabilności łańcucha dostaw stanowi krytyczne ryzyko operacyjne. Spółka pozyskuje około 60% kluczowych komponentów od dostawców z Azji, co naraża na ryzyko opóźnień, wzrostu kosztów transportu oraz zakłóceń geopolitycznych. Obecne zapasy strategiczne zabezpieczają potrzeby na 45-60 dni, co może okazać się niewystarczające w przypadku dłuższych zakłóceń.` :
              `Umiarkowana zależność od łańcucha dostaw (głównie usługi IT, materiały biurowe, infrastruktura) minimalizuje operacyjne ryzyka. Jednak kluczowe komponenty technologiczne oraz licencje oprogramowania pochodzą od ograniczonej liczby dostawców, co może stanowić punkty pojedynczego ryzyka.`
            }
          </p>
          
          <p className="text-gray-700">
            Strategia mitygacji obejmuje dywersyfikację bazy dostawców, zwiększenie zapasów strategicznych do 90-dni oraz rozwój lokalnych źródeł dostaw. Spółka inwestuje również w rozwiązania predictive analytics dla lepszego prognozowania zakłóceń w łańcuchu dostaw.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Cyberbezpieczeństwo i Ryzyko Technologiczne</h3>
          <p className="text-gray-700 mb-4">
            Rosnące zagrożenia cybernetyczne stanowią istotne ryzyko dla ciągłości działalności. Spółka odnotowała 15% wzrost prób ataków w ciągu ostatnich 12 miesięcy, a średni koszt potencjalnego naruszenia bezpieczeństwa szacuje się na 5-10 mln zł. Szczególnie wrażliwe są systemy finansowe, bazy danych klientów oraz infrastruktura IT wspierająca procesy produkcyjne.
          </p>
          
          <p className="text-gray-700 mb-4">
            {report.category === "Technology" ? 
              `W sektorze technologicznym, ryzyko cyberataków jest szczególnie wysokie ze względu na atrakcyjność danych oraz know-how technologicznego. Spółka inwestuje rocznie około 8-12 mln zł w cyberbezpieczeństwo, ale rosnące wyrafinowanie ataków wymaga ciągłego zwiększania nakładów.` :
              `Infrastruktura IT spółki wymaga modernizacji w zakresie zabezpieczeń. Planowane inwestycje w wysokości 15-20 mln zł w kolejnych 2 latach obejmują implementację systemów wykrywania zagrożeń, backup'y w chmurze oraz szkolenia personelu.`
            }
          </p>
          
          <p className="text-gray-700">
            Strategia cyberbezpieczeństwa obejmuje implementację standardu ISO 27001, regularne audyty bezpieczeństwa, ubezpieczenie cyber oraz program ciągłego szkolenia pracowników. Zarząd rozważa również outsourcing części funkcji bezpieczeństwa do wyspecjalizowanych firm.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Zarządzanie Talentami i Kapitałem Ludzkim</h3>
          <p className="text-gray-700 mb-4">
            Deficyt wykwalifikowanych specjalistów, szczególnie w obszarach IT, data science oraz automatyzacji, stanowi rosnące wyzwanie operacyjne. Rotacja w kluczowych pozycjach wynosi 12-15% rocznie, a czas rekrutacji wzrósł do 3-4 miesięcy. Koszty pozyskania nowych talentów wzrosły o 20-25% w ciągu ostatnich 2 lat.
          </p>
          
          <p className="text-gray-700">
            Spółka wdraża kompleksowy program retencji talentów obejmujący programy rozwojowe, elastyczne formy pracy, dodatkowe benefity oraz partycypację w zyskach. Budżet na rozwój personelu został zwiększony o 30%, a spółka rozważa partnerstwa z uczelniami technicznymi dla zapewnienia pipeline'u talentów.
          </p>
        </div>
      </div>
    </section>
  );
};
