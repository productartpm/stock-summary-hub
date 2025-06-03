
import type { FinancialReport } from "@/lib/types";

interface StrategicRisksProps {
  report: FinancialReport;
}

export const StrategicRisks = ({ report }: StrategicRisksProps) => {
  const revenueChange = report.summaryData.revenue?.change ?? 0;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-indigo-500 pl-4">Ryzyka Strategiczne i Konkurencyjne</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Intensyfikacja Konkurencji</h3>
          <p className="text-gray-700 mb-4">
            {revenueChange < 0 ? 
              `Rosnąca presja konkurencyjna jest już widoczna w spadku udziałów rynkowych oraz konieczności obniżek cen. Nowi gracze oferujący rozwiązania o 15-20% niższych cenach wymuszają rewizję strategii cenowej. Szczególnie dotkliwa jest konkurencja ze strony firm technologicznych oferujących alternatywne modele biznesowe.` :
              `Mimo stabilnej pozycji rynkowej, spółka obserwuje nasilenie konkurencji, szczególnie ze strony firm zagranicznych oraz start-upów technologicznych. Kluczowe będzie utrzymanie przewagi konkurencyjnej poprzez inwestycje w innowacje, jakość obsługi oraz optymalizację kosztów.`
            }
          </p>
          
          <p className="text-gray-700 mb-4">
            {report.category === "Technology" ? 
              `Sektor technologiczny charakteryzuje się szczególnie dynamiczną konkurencją oraz niskimi barierami wejścia dla nowych graczy. Duzi gracze międzynarodowi mogą stosować strategie cenowe mające na celu zdobycie udziałów rynkowych, co może wpłynąć na rentowność całego sektora.` :
              report.category === "Financial Services" ? 
              `Fintechy i neobanki stanowią rosnące zagrożenie dla tradycyjnych modeli biznesowych. Ich elastyczność regulacyjna oraz innowacyjne podejście do obsługi klienta może prowadzić do migracji klientów, szczególnie w segmencie retail.` :
              `Konsolidacja w branży może prowadzić do powstania silniejszych konkurentów o większej skali działania i możliwościach inwestycyjnych. Spółka musi być przygotowana na potencjalne wojny cenowe oraz konieczność zwiększenia nakładów marketingowych.`
            }
          </p>
          
          <p className="text-gray-700">
            Strategia konkurencyjna obejmuje focus na nisze rynkowe o wyższej rentowności, budowę lojalności klientów poprzez superior customer experience oraz inwestycje w unikalne kompetencje trudne do replikacji przez konkurencję.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Disrupcja Technologiczna</h3>
          <p className="text-gray-700 mb-4">
            Szybki rozwój technologii, w szczególności AI, automatyzacji oraz platformowych modeli biznesowych, może prowadzić do przestarzałości obecnych rozwiązań. Spółka musi inwestować 10-15% przychodów w R&D oraz modernizację technologiczną, aby utrzymać konkurencyjność.
          </p>
          
          <p className="text-gray-700">
            Kluczowe obszary narażone na disrupcję obejmują tradycyjne procesy sprzedażowe, modele dystrybucji oraz metody obsługi klienta. Spółka rozwija cyfrowe kanały, inwestuje w data analytics oraz buduje partnerstwa technologiczne dla dostępu do najnowszych rozwiązań.
          </p>
        </div>
      </div>
    </section>
  );
};
