
import type { FinancialReport } from "@/lib/data";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ryzyka dla Spółki</h1>
        <p className="text-gray-600">Identyfikacja i analiza głównych czynników ryzyka wpływających na działalność</p>
      </div>
      
      {/* Makroekonomiczne */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-red-500 pl-4">Makroekonomiczne</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Inflacja</h3>
                  <p className="text-sm text-gray-700">
                    {netIncomeChange < 0 ? 
                      'Rosnące koszty surowców i energii negatywnie wpływają na marże operacyjne spółki.' :
                      'Umiarkowany wpływ inflacji na koszty operacyjne, częściowo kompensowany przez wzrost cen.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Kursy walutowe</h3>
                  <p className="text-sm text-gray-700">
                    {report.category === "Technology" || report.category === "Financial Services" ?
                      'Ekspozycja na wahania kursów walutowych może wpływać na wyniki operacji zagranicznych.' :
                      'Ograniczona ekspozycja walutowa ze względu na głównie krajowy charakter działalności.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Zmiany regulacyjne</h3>
                  <p className="text-sm text-gray-700">
                    {report.reportCategory?.includes('ESG') || report.reportCategory?.includes('Regulatory') ?
                      'Nowe regulacje ESG i branżowe mogą wymagać znacznych inwestycji dostosowawczych.' :
                      'Standardowe ryzyko zmian regulacyjnych typowe dla sektora.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Kondycja branży</h3>
                  <p className="text-sm text-gray-700">
                    {report.summaryData.revenue.change >= 0 ?
                      'Branża wykazuje stabilność z tendencją wzrostową.' :
                      'Branża doświadcza spowolnienia, co wpływa na wyniki całego sektora.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-3 rounded border-l-4 border-red-400 mt-4">
            <p className="text-xs text-red-800">
              Nie posiadamy szczegółowych informacji o konkretnych ekspozycjach makroekonomicznych spółki.
            </p>
          </div>
        </div>
      </section>

      {/* Operacyjne */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-4">Operacyjne</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Inwestycje w infrastrukturę</h3>
                  <p className="text-sm text-gray-700">
                    {operatingProfitChange >= 0 ?
                      'Planowane inwestycje mogą czasowo obciążyć wyniki, ale wzmocnią długoterminową pozycję.' :
                      'Konieczność inwestycji infrastrukturalnych przy ograniczonych zasobach finansowych.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Ryzyko opóźnień w projektach</h3>
                  <p className="text-sm text-gray-700">
                    {report.category === "Technology" ?
                      'Złożoność projektów technologicznych niesie ryzyko przekroczeń budżetu i terminów.' :
                      'Standardowe ryzyko opóźnień typowe dla projektów inwestycyjnych w branży.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-red-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Łańcuch dostaw</h3>
                  <p className="text-sm text-gray-700">
                    {report.category === "Manufacturing" || report.category === "Energy" ?
                      'Wysoka zależność od stabilności łańcucha dostaw i dostępności surowców.' :
                      'Umiarkowane ryzyko związane z dostawami podstawowych materiałów i usług.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400 mt-4">
            <p className="text-xs text-orange-800">
              Nie posiadamy szczegółowych informacji o konkretnych projektach infrastrukturalnych spółki.
            </p>
          </div>
        </div>
      </section>

      {/* Finansowe */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-purple-500 pl-4">Finansowe</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className={`w-4 h-4 rounded-full mt-1 mr-4 flex-shrink-0 ${netIncomeChange < -10 ? 'bg-red-500' : netIncomeChange < 0 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Konieczność dodatkowego finansowania</h3>
                  <p className="text-sm text-gray-700">
                    {netIncomeChange < -10 ?
                      'Pogorszenie wyników może wymagać pozyskania zewnętrznego finansowania.' :
                      netIncomeChange < 0 ?
                      'Umiarkowane ryzyko konieczności dodatkowego finansowania w przypadku realizacji planów inwestycyjnych.' :
                      'Stabilna sytuacja finansowa nie wskazuje na potrzebę dodatkowego finansowania.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className={`w-4 h-4 rounded-full mt-1 mr-4 flex-shrink-0 ${operatingProfitChange < 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Wpływ rosnących kosztów na rentowność</h3>
                  <p className="text-sm text-gray-700">
                    {operatingProfitChange < 0 ?
                      'Rosnące koszty operacyjne przy ograniczonych możliwościach podnoszenia cen zagrażają rentowności.' :
                      'Spółka skutecznie zarządza kosztami, minimalizując wpływ inflacji na marże.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className={`w-4 h-4 rounded-full mt-1 mr-4 flex-shrink-0 ${netIncomeChange < -5 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Ryzyko płynności</h3>
                  <p className="text-sm text-gray-700">
                    {netIncomeChange < -5 ?
                      'Pogorszenie wyników może wpływać na dostępność finansowania i warunki kredytowe.' :
                      'Brak istotnych zagrożeń dla płynności finansowej spółki.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400 mt-4">
            <p className="text-xs text-purple-800">
              Nie posiadamy szczegółowych informacji o strukturze zadłużenia i umowach kredytowych spółki.
            </p>
          </div>
        </div>
      </section>

      {/* Konkurencyjne */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-indigo-500 pl-4">Konkurencyjne</h2>
        
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className={`w-4 h-4 rounded-full mt-1 mr-4 flex-shrink-0 ${report.summaryData.revenue.change < 0 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Wzrost konkurencji</h3>
                  <p className="text-sm text-gray-700">
                    {report.summaryData.revenue.change < 0 ?
                      'Rosnąca presja konkurencyjna widoczna w spadku udziałów rynkowych.' :
                      'Stabilna pozycja konkurencyjna, ale wymagająca ciągłych inwestycji w innowacje.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Zmiany technologiczne</h3>
                  <p className="text-sm text-gray-700">
                    {report.category === "Technology" ?
                      'Szybki rozwój technologii wymaga ciągłych inwestycji w R&D i aktualizację oferty.' :
                      'Digitalizacja branży wymaga adaptacji modeli biznesowych i procesów.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <div className="flex items-start">
                <div className="w-4 h-4 bg-indigo-500 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Nowi gracze na rynku</h3>
                  <p className="text-sm text-gray-700">
                    {report.category === "Financial Services" ?
                      'Fintechy i platformy cyfrowe stanowią rosnące zagrożenie dla tradycyjnych modeli biznesowych.' :
                      'Pojawienie się nowych konkurentów z innowacyjnymi rozwiązaniami.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-400 mt-4">
            <p className="text-xs text-indigo-800">
              Nie posiadamy szczegółowych informacji o konkretnych zagrożeniach konkurencyjnych dla spółki.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
