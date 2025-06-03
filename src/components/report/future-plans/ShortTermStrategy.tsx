
import type { FinancialReport } from "@/lib/types";

interface ShortTermStrategyProps {
  report: FinancialReport;
}

export const ShortTermStrategy = ({ report }: ShortTermStrategyProps) => {
  const hasOutlook = report.outlook?.statement;
  const revenueChange = report.summaryData.revenue.change;
  const netIncomeChange = report.summaryData.netIncome.change;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Strategia Krótkoterminowa (12-18 miesięcy)</h2>
      
      <div className="space-y-4">
        {hasOutlook && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">Oficjalne stanowisko zarządu:</h3>
            <p className="text-blue-800 leading-relaxed">{report.outlook.statement}</p>
            {report.outlook?.guidanceRevenue && (
              <div className="mt-3 p-3 bg-blue-100 rounded">
                <p className="font-medium text-blue-900">Prognoza przychodów na następny okres:</p>
                <p className="text-blue-800">{report.outlook.guidanceRevenue.min} - {report.outlook.guidanceRevenue.max} {report.outlook.guidanceRevenue.unit}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Optymalizacja Operacyjna</h3>
            <p className="text-gray-700 mb-4">
              {revenueChange >= 0 && netIncomeChange >= 0 ? 
                `Spółka ${report.companyName} planuje kontynuować pozytywny trend operacyjny poprzez dalszą optymalizację procesów biznesowych. Zarząd koncentruje się na zwiększeniu efektywności operacyjnej przy jednoczesnym utrzymaniu wysokiej jakości produktów i usług. Kluczowe działania obejmują automatyzację procesów produkcyjnych, usprawnienie łańcucha dostaw oraz implementację nowoczesnych systemów zarządzania.` :
                revenueChange >= 0 ? 
                `Pomimo wzrostu przychodów, wyzwania w obszarze rentowności wymagają intensywnych działań optymalizacyjnych. Spółka planuje kompleksowy przegląd struktury kosztowej, renegocjację umów z dostawcami oraz wdrożenie programu efektywności operacyjnej. Priorytetem jest przywrócenie marż do poziomów historycznych.` :
                `W obliczu spadku przychodów, spółka wdraża plan restrukturyzacji operacyjnej mający na celu stabilizację sytuacji finansowej. Działania obejmują redukcję kosztów stałych, optymalizację zatrudnienia oraz koncentrację na najbardziej rentownych segmentach biznesowych. Zarząd przewiduje powrót do wzrostu w drugim półroczu.`
              }
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Rozwój Produktowy i Innowacje</h3>
            <p className="text-gray-700 mb-4">
              {report.category === "Technology" ? 
                `Sektor technologiczny wymaga ciągłych inwestycji w badania i rozwój. Spółka planuje zwiększenie nakładów na R&D o 15-20% w stosunku do poprzedniego roku, koncentrując się na rozwoju rozwiązań opartych o sztuczną inteligencję, cloud computing oraz cyberbezpieczeństwo. Kluczowe projekty obejmują modernizację platformy technologicznej, rozwój nowych API oraz wdrożenie rozwiązań machine learning w procesach biznesowych.` :
                report.category === "Financial Services" ? 
                `Branża finansowa przechodzi dynamiczną transformację cyfrową. Spółka inwestuje w rozwój bankowości cyfrowej, płatności bezgotówkowe oraz rozwiązania fintech. Planowane są znaczące nakłady na modernizację systemów IT, implementację blockchain technology oraz rozwój usług opartych o big data analytics. Celem jest zwiększenie udziału usług cyfrowych do 60% całkowitych przychodów.` :
                `Spółka koncentruje się na rozwoju produktów odpowiadających na zmieniające się potrzeby rynku. Planowane inwestycje w innowacje obejmują ekologiczne technologie produkcji, automatyzację procesów oraz digitalizację obsługi klienta. Kluczowym elementem strategii jest wprowadzenie nowej linii produktów zgodnych z trendami ESG oraz wymaganiami zrównoważonego rozwoju.`
              }
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ekspansja Rynkowa</h3>
            <p className="text-gray-700">
              {revenueChange >= 5 ? 
                `Silne wyniki finansowe umożliwiają spółce realizację ambitnych planów ekspansji. Zarząd rozważa wejście na nowe rynki geograficzne, w szczególności w regionie Europy Środkowo-Wschodniej oraz na wybrane rynki azjatyckie. Ekspansja będzie realizowana poprzez bezpośrednie inwestycje, partnerstwa strategiczne oraz potencjalne akwizycje lokalnych graczy. Budżet na działania ekspansyjne wynosi około 25% wolnych przepływów pieniężnych.` :
                revenueChange >= 0 ?
                `Spółka przyjmuje ostrożną strategię ekspansji, koncentrując się na umocnieniu pozycji na obecnych rynkach. Planowane działania obejmują zwiększenie penetracji rynkowej, rozwój nowych kanałów sprzedaży oraz wzmocnienie relacji z kluczowymi klientami. Ekspansja geograficzna zostanie odłożona do czasu ustabilizowania wyników finansowych.` :
                `W obecnej sytuacji finansowej spółka rezygnuje z planów ekspansji geograficznej, koncentrując się na ochronie udziałów rynkowych na kluczowych rynkach. Priorytetem jest retencja klientów strategicznych oraz optymalizacja portfolio produktowego. Ewentualna ekspansja zostanie rozważona po przywróceniu rentowności na poziomie co najmniej 8%.`
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
