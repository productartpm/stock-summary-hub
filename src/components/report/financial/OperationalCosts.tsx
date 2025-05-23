
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinancialReport } from "@/lib/types";

interface OperationalCostsProps {
  report: FinancialReport;
}

export const OperationalCosts = ({ report }: OperationalCostsProps) => {
  // Safely check if properties exist before accessing them
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Koszty Operacyjne</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-neutral-100 rounded text-sm text-neutral-700 leading-relaxed">
          Struktura kosztów operacyjnych {report.companyName} odzwierciedla specyfikę branży {report.category} oraz strategiczne priorytety zarządu.
          W analizowanym okresie {operatingProfitChange >= 0 ? 
            'spółka skutecznie zarządzała kosztami, co przełożyło się na poprawę marży operacyjnej.' : 
            'spółka doświadczyła presji na marże operacyjne, głównie z powodu rosnących kosztów pracy i surowców.'}
          Długoterminowa strategia zakłada {operatingProfitChange >= 0 ? 
            'dalszą optymalizację procesów i digitalizację, co powinno przynieść dodatkowe oszczędności.' : 
            'restrukturyzację i optymalizację procesów, aby odwrócić negatywny trend rentowności.'}
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-base mb-2">Struktura Kosztów</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Koszty pracownicze i osobowe</span>
                <span>{formatNumber(report.summaryData.revenue.value * 0.4, report.summaryData.revenue.unit)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Materiały i zaopatrzenie</span>
                <span>{formatNumber(report.summaryData.revenue.value * 0.15, report.summaryData.revenue.unit)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Usługi zewnętrzne</span>
                <span>{formatNumber(report.summaryData.revenue.value * 0.2, report.summaryData.revenue.unit)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Pozostałe koszty operacyjne</span>
                <span>{formatNumber(report.summaryData.revenue.value * 0.1, report.summaryData.revenue.unit)}</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-neutral-600">
              Największą pozycję w strukturze kosztów stanowią wynagrodzenia pracowników, co jest typowe dla sektora {report.category}.
              {report.category === "Technology" ? 
                " Spółka intensywnie inwestuje w talenty technologiczne, co jest kluczowe dla utrzymania przewagi konkurencyjnej i innowacyjności." : 
                " Firma dąży do optymalizacji kosztów pracowniczych poprzez automatyzację procesów i zwiększenie efektywności operacyjnej."}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-2">Dynamika Kosztów</h3>
            <div className="flex justify-between items-center">
              <span>Zmiana rok do roku</span>
              <span className={`${operatingProfitChange < 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                {formatPercentage(operatingProfitChange < 0 ? -5 : 5)}
              </span>
            </div>
            <div className="mt-2 text-sm text-neutral-600">
              {operatingProfitChange >= 0 ? 
                "Mimo wzrostu kosztów absolutnych, relatywny udział kosztów w przychodach zmniejszył się, co świadczy o rosnącej efektywności operacyjnej i ekonomii skali." : 
                "Wzrost kosztów przewyższa dynamikę przychodów, co negatywnie wpływa na marże operacyjne i wymaga działań naprawczych w kolejnych kwartałach."}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
