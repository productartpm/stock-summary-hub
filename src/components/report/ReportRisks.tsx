
import type { FinancialReport } from "@/lib/data";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h2 className="text-xl font-semibold mb-4">Ryzyka dla Spółki</h2>
        
        {/* Makroekonomiczne */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Makroekonomiczne</h3>
          <p className="mb-1">
            <strong>Inflacja:</strong> {netIncomeChange < 0 ? 
              'Rosnące koszty surowców i energii negatywnie wpływają na marże operacyjne spółki.' :
              'Umiarkowany wpływ inflacji na koszty operacyjne, częściowo kompensowany przez wzrost cen.'}
          </p>
          <p className="mb-1">
            <strong>Kursy walutowe:</strong> {report.category === "Technology" || report.category === "Financial Services" ?
              'Ekspozycja na wahania kursów walutowych może wpływać na wyniki operacji zagranicznych.' :
              'Ograniczona ekspozycja walutowa ze względu na głównie krajowy charakter działalności.'}
          </p>
          <p className="mb-1">
            <strong>Zmiany regulacyjne:</strong> {report.reportCategory?.includes('ESG') || report.reportCategory?.includes('Regulatory') ?
              'Nowe regulacje ESG i branżowe mogą wymagać znacznych inwestycji dostosowawczych.' :
              'Standardowe ryzyko zmian regulacyjnych typowe dla sektora.'}
          </p>
          <p className="mb-2">
            <strong>Kondycja branży:</strong> {report.summaryData.revenue.change >= 0 ?
              'Branża wykazuje stabilność z tendencją wzrostową.' :
              'Branża doświadcza spowolnienia, co wpływa na wyniki całego sektora.'}
          </p>
          <p className="text-xs text-gray-600">
            Nie posiadamy szczegółowych informacji o konkretnych ekspozycjach makroekonomicznych spółki.
          </p>
        </div>

        {/* Operacyjne */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Operacyjne</h3>
          <p className="mb-1">
            <strong>Inwestycje w infrastrukturę:</strong> {operatingProfitChange >= 0 ?
              'Planowane inwestycje mogą czasowo obciążyć wyniki, ale wzmocnią długoterminową pozycję.' :
              'Konieczność inwestycji infrastrukturalnych przy ograniczonych zasobach finansowych.'}
          </p>
          <p className="mb-1">
            <strong>Ryzyko opóźnień w projektach:</strong> {report.category === "Technology" ?
              'Złożoność projektów technologicznych niesie ryzyko przekroczeń budżetu i terminów.' :
              'Standardowe ryzyko opóźnień typowe dla projektów inwestycyjnych w branży.'}
          </p>
          <p className="mb-1">
            <strong>Łańcuch dostaw:</strong> {report.category === "Manufacturing" || report.category === "Energy" ?
              'Wysoka zależność od stabilności łańcucha dostaw i dostępności surowców.' :
              'Umiarkowane ryzyko związane z dostawami podstawowych materiałów i usług.'}
          </p>
          <p className="text-xs text-gray-600">
            Nie posiadamy szczegółowych informacji o konkretnych projektach infrastrukturalnych spółki.
          </p>
        </div>

        {/* Finansowe */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Finansowe</h3>
          <p className="mb-1">
            <strong>Konieczność dodatkowego finansowania:</strong> {netIncomeChange < -10 ?
              'Pogorszenie wyników może wymagać pozyskania zewnętrznego finansowania.' :
              netIncomeChange < 0 ?
              'Umiarkowane ryzyko konieczności dodatkowego finansowania w przypadku realizacji planów inwestycyjnych.' :
              'Stabilna sytuacja finansowa nie wskazuje na potrzebę dodatkowego finansowania.'}
          </p>
          <p className="mb-1">
            <strong>Wpływ rosnących kosztów na rentowność:</strong> {operatingProfitChange < 0 ?
              'Rosnące koszty operacyjne przy ograniczonych możliwościach podnoszenia cen zagrażają rentowności.' :
              'Spółka skutecznie zarządza kosztami, minimalizując wpływ inflacji na marże.'}
          </p>
          <p className="mb-1">
            <strong>Ryzyko płynności:</strong> {netIncomeChange < -5 ?
              'Pogorszenie wyników może wpływać na dostępność finansowania i warunki kredytowe.' :
              'Brak istotnych zagrożeń dla płynności finansowej spółki.'}
          </p>
          <p className="text-xs text-gray-600">
            Nie posiadamy szczegółowych informacji o strukturze zadłużenia i umowach kredytowych spółki.
          </p>
        </div>

        {/* Konkurencyjne */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Konkurencyjne</h3>
          <p className="mb-1">
            <strong>Wzrost konkurencji:</strong> {report.summaryData.revenue.change < 0 ?
              'Rosnąca presja konkurencyjna widoczna w spadku udziałów rynkowych.' :
              'Stabilna pozycja konkurencyjna, ale wymagająca ciągłych inwestycji w innowacje.'}
          </p>
          <p className="mb-1">
            <strong>Zmiany technologiczne:</strong> {report.category === "Technology" ?
              'Szybki rozwój technologii wymaga ciągłych inwestycji w R&D i aktualizację oferty.' :
              'Digitalizacja branży wymaga adaptacji modeli biznesowych i procesów.'}
          </p>
          <p className="mb-1">
            <strong>Nowi gracze na rynku:</strong> {report.category === "Financial Services" ?
              'Fintechy i platformy cyfrowe stanowią rosnące zagrożenie dla tradycyjnych modeli biznesowych.' :
              'Pojawienie się nowych konkurentów z innowacyjnymi rozwiązaniami.'}
          </p>
          <p className="text-xs text-gray-600">
            Nie posiadamy szczegółowych informacji o konkretnych zagrożeniach konkurencyjnych dla spółki.
          </p>
        </div>
      </div>
    </div>
  );
};
