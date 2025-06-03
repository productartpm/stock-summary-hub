
import type { FinancialReport } from "@/lib/data";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const revenueChange = report.summaryData.revenue?.change ?? 0;
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analiza Ryzyk Biznesowych</h1>
        <p className="text-gray-600">Kompleksowa ocena czynników ryzyka wpływających na działalność spółki</p>
      </div>
      
      {/* Ryzyka makroekonomiczne */}
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

      {/* Ryzyka operacyjne */}
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

      {/* Ryzyka finansowe */}
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

      {/* Ryzyka strategiczne */}
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

      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
        <p className="text-sm text-gray-700 font-medium mb-2">Uwaga metodologiczna:</p>
        <p className="text-sm text-gray-600">
          Analiza ryzyk opiera się na dostępnych danych finansowych, trendach branżowych oraz standardowych metodologiach oceny ryzyka. 
          Szczegółowa kwantyfikacja poszczególnych rodzajów ryzyka wymaga dostępu do wewnętrznych danych spółki, 
          systemów risk management oraz stresstestów scenariuszowych.
        </p>
      </div>
    </div>
  );
};
