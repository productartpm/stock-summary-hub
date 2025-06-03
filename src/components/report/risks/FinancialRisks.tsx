
import type { FinancialReport } from "@/lib/types";

interface FinancialRisksProps {
  report: FinancialReport;
}

export const FinancialRisks = ({ report }: FinancialRisksProps) => {
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const revenueChange = report.summaryData.revenue?.change ?? 0;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Ryzyka Finansowe</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Płynność i Zarządzanie Kapitałem</h3>
          <p className="text-gray-700 mb-4">
            {netIncomeChange < -10 ? 
              `Pogorszenie wyników finansowych zwiększa ryzyko płynnościowe spółki. Przy obecnym poziomie generowania gotówki, zabezpieczenie finansowania planowanych inwestycji może wymagać pozyskania zewnętrznego finansowania w wysokości 100-150 mln zł w ciągu najbliższych 18 miesięcy. Covenant'y w istniejących umowach kredytowych mogą zostać naruszone jeśli trend spadkowy się utrzyma.` :
              netIncomeChange < 0 ? 
              `Spadek rentowności wpływa na generowanie wolnych przepływów pieniężnych, ale nie zagraża bezpośrednio płynności. Spółka utrzymuje linie kredytowe w wysokości 200 mln zł, z których wykorzystane jest około 40%. Monitoring wskaźników finansowych wymaga jednak zwiększonej uwagi.` :
              `Stabilna sytuacja finansowa zapewnia odpowiednią płynność dla bieżącej działalności i planowanych inwestycji. Spółka generuje pozytywne przepływy operacyjne i utrzymuje niskie wskaźniki zadłużenia. Ryzyko płynnościowe oceniane jest jako niskie.`
            }
          </p>
          
          <p className="text-gray-700">
            Strategia zarządzania płynnością obejmuje utrzymanie rezerw gotówkowych na poziomie 3-miesięcznych kosztów operacyjnych, dywersyfikację źródeł finansowania oraz monitoring wskaźników wczesnego ostrzegania. Spółka planuje również emisję obligacji korporacyjnych dla refinansowania zadłużenia.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ryzyko Stóp Procentowych</h3>
          <p className="text-gray-700 mb-4">
            Około 60% zadłużenia spółki oparte jest na zmiennych stopach procentowych, co naraża na ryzyko wzrostu kosztów finansowych. Każde 100 punktów bazowych wzrostu stóp procentowych zwiększa roczne koszty finansowe o około 2-3 mln zł. W obecnym cyklu podwyżek stóp, koszty finansowe mogą wzrosnąć o 15-25% w ciągu najbliższych 12 miesięcy.
          </p>
          
          <p className="text-gray-700">
            Zarząd rozważa zwiększenie udziału zadłużenia o stałej stopie do 70% poprzez refinansowanie części kredytów oraz wykorzystanie instrumentów pochodnych (IRS) dla zabezpieczenia ryzyka stóp procentowych na okres 3-5 lat.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ryzyko Kredytowe i Należności</h3>
          <p className="text-gray-700 mb-4">
            {revenueChange < 0 ? 
              `Pogorszenie koniunktury zwiększa ryzyko niewypłacalności klientów. Wartość zagrożonych należności wzrosła o 25% w ciągu ostatnich 6 miesięcy, a średni okres spłaty wydłużył się z 35 do 42 dni. Szczególnie narażone są należności od klientów z sektorów dotkniętych kryzysem.` :
              `Stabilna sytuacja gospodarcza utrzymuje ryzyko kredytowe na umiarkowanym poziomie. Spółka utrzymuje zdywersyfikowane portfolio klientów z ograniczoną koncentracją ryzyka (największy klient stanowi 8% przychodów). Wskaźnik należności przeterminowanych pozostaje na poziomie 2-3%.`
            }
          </p>
          
          <p className="text-gray-700">
            Polityka kredytowa obejmuje regularne weryfikacje zdolności płatniczej klientów, ubezpieczenie należności dla 80% ekspozycji oraz wdrożenie systemu credit scoringu. Spółka rozważa również factoring dla należności od klientów o wyższym profilu ryzyka.
          </p>
        </div>
      </div>
    </section>
  );
};
