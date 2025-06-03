
import type { FinancialReport } from "@/lib/types";

interface LongTermVisionProps {
  report: FinancialReport;
}

export const LongTermVision = ({ report }: LongTermVisionProps) => {
  const revenueChange = report.summaryData.revenue.change;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Wizja Długoterminowa (3-5 lat)</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Transformacja Cyfrowa i Technologiczna</h3>
          <p className="text-gray-700 mb-4">
            Spółka planuje kompleksową transformację cyfrową mającą na celu zwiększenie konkurencyjności i efektywności operacyjnej. Kluczowe elementy strategii obejmują implementację rozwiązań Industry 4.0, rozwój ekosystemu cyfrowego oraz budowę platformy danych umożliwiającej zaawansowaną analitykę biznesową.
          </p>
          <p className="text-gray-700 mb-4">
            {report.category === "Technology" ? 
              `W sektorze technologicznym, spółka dąży do pozycji lidera w obszarze innowacyjnych rozwiązań. Planowane inwestycje w wysokości 200-300 mln zł w kolejnych 3 latach będą skierowane na rozwój platformy AI/ML, rozwiązania cloud-native oraz zaawansowane systemy automatyzacji. Celem jest osiągnięcie 40% udziału przychodów z nowych technologii do 2027 roku.` :
              `Digitalizacja procesów biznesowych stanowi fundament długoterminowej strategii. Spółka planuje inwestycje w nowoczesne systemy ERP, platformy e-commerce oraz rozwiązania IoT. Oczekiwanym rezultatem jest 30% redukcja kosztów operacyjnych oraz zwiększenie produktywności o 25% w horyzoncie 5 lat.`
            }
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Zrównoważony Rozwój i ESG</h3>
          <p className="text-gray-700 mb-4">
            Strategia ESG stanowi integralną część długoterminowych planów rozwoju spółki. Zarząd zobowiązał się do osiągnięcia neutralności węglowej do 2030 roku oraz implementacji zasad gospodarki obiegu zamkniętego w procesach produkcyjnych. Planowane inwestycje w zielone technologie wynoszą około 15% całkowitych nakładów inwestycyjnych.
          </p>
          <p className="text-gray-700 mb-4">
            Kluczowe inicjatywy obejmują przejście na odnawialne źródła energii, redukcję emisji CO2 o 50% do 2028 roku oraz wdrożenie programów społecznej odpowiedzialności biznesu. Spółka planuje również uzyskanie certyfikatów międzynarodowych w zakresie zrównoważonego rozwoju, co ma wzmocnić jej pozycję wśród inwestorów ESG.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Międzynarodowa Ekspansja i Partnerstwa</h3>
          <p className="text-gray-700 mb-4">
            Długoterminowa wizja spółki zakłada znaczące zwiększenie udziału przychodów z rynków międzynarodowych z obecnych ~20% do 45% w horyzoncie 5 lat. Strategia ekspansji będzie realizowana poprzez kombinację inwestycji organicznych, strategicznych akwizycji oraz partnerstw joint venture.
          </p>
          <p className="text-gray-700">
            {revenueChange >= 0 ? 
              `Stabilna sytuacja finansowa umożliwia realizację ambitnych planów ekspansji międzynarodowej. Spółka rozważa wejście na rynki Ameryki Północnej oraz wybrane kraje azjatyckie. Budżet na działania ekspansyjne w kolejnych 5 latach wynosi 500-700 mln zł, finansowany z połączenia środków własnych oraz zewnętrznego finansowania dłużnego.` :
              `Pomimo obecnych wyzwań finansowych, spółka utrzymuje długoterminowe ambicje ekspansji międzynarodowej. Strategia zostanie jednak zmodyfikowana w kierunku ostrożniejszego podejścia, z priorytetem dla rynków o wyższej rentowności i niższym ryzyku. Ekspansja będzie finansowana głównie poprzez partnerstwa strategiczne minimalizujące nakłady kapitałowe.`
            }
          </p>
        </div>
      </div>
    </section>
  );
};
