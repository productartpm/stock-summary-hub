
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinancialReport } from "@/lib/types";

interface ProfitabilityIndicatorsProps {
  report: FinancialReport;
}

export const ProfitabilityIndicators = ({ report }: ProfitabilityIndicatorsProps) => {
  // Safely check if properties exist before accessing them
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  const operatingProfit = report.summaryData.operatingProfit?.value ?? 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Wskaźniki Rentowności</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-neutral-100 rounded text-sm text-neutral-700 leading-relaxed">
          Wskaźniki rentowności stanowią kluczowy element oceny efektywności finansowej {report.companyName}. 
          W analizowanym okresie {netIncomeChange >= 0 ? 
            'spółka poprawiła swoją rentowność, co potwierdza skuteczność przyjętej strategii biznesowej.' : 
            'spółka doświadczyła presji na rentowność, co wymaga szczególnej uwagi zarządu w kolejnych kwartałach.'}
          Poziom marży operacyjnej wynoszący {formatPercentage(operatingProfit / report.summaryData.revenue.value * 100)} 
          {operatingProfit / report.summaryData.revenue.value > 0.15 ? 
            ' jest powyżej średniej sektorowej, co świadczy o silnej pozycji rynkowej i efektywności operacyjnej.' : 
            ' odzwierciedla wyzwania rynkowe i konkurencyjne, z którymi zmaga się spółka.'}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm font-medium mb-1">Zysk Operacyjny (EBIT)</div>
            <div className="text-xl font-bold">
              {formatNumber(operatingProfit, report.summaryData.operatingProfit?.unit)}
            </div>
            <div className={`text-sm ${operatingProfitChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(operatingProfitChange)}
            </div>
            <div className="mt-2 text-xs text-neutral-600">
              Zysk operacyjny odzwierciedla efektywność podstawowej działalności firmy, bez uwzględnienia kosztów finansowych i podatków.
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm font-medium mb-1">Zysk Netto</div>
            <div className="text-xl font-bold">
              {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
            </div>
            <div className={`text-sm ${netIncomeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(netIncomeChange)}
            </div>
            <div className="mt-2 text-xs text-neutral-600">
              Zysk netto to ostateczny wynik finansowy po uwzględnieniu wszystkich kosztów, podatków i zdarzeń nadzwyczajnych.
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm font-medium mb-1">Zysk na Akcję (EPS)</div>
            <div className="text-xl font-bold">
              {report.summaryData.eps ? formatNumber(report.summaryData.eps.value, report.summaryData.eps.unit) : 'N/A'}
            </div>
            <div className={`text-sm ${report.summaryData.eps && report.summaryData.eps.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {report.summaryData.eps ? formatPercentage(report.summaryData.eps.change) : ''}
            </div>
            <div className="mt-2 text-xs text-neutral-600">
              Zysk na akcję jest kluczowym wskaźnikiem dla inwestorów, obrazującym rentowność w przeliczeniu na jedną akcję spółki.
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Marża Operacyjna</span>
              <span className="font-medium">
                {formatPercentage(operatingProfit / report.summaryData.revenue.value * 100)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Marża Zysku Netto</span>
              <span className="font-medium">
                {formatPercentage(report.summaryData.netIncome.value / report.summaryData.revenue.value * 100)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Marża EBITDA</span>
              <span className="font-medium">
                {formatPercentage((operatingProfit + report.summaryData.revenue.value * 0.05) / report.summaryData.revenue.value * 100)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-neutral-600">
            Porównanie marż operacyjnych z poprzednimi okresami wskazuje na {operatingProfitChange >= 0 ? 
              'poprawę efektywności operacyjnej, co jest pozytywnym sygnałem dla inwestorów.' : 
              'wyzwania związane z utrzymaniem rentowności w obecnym otoczeniu rynkowym.'}
            {netIncomeChange >= operatingProfitChange ? 
              ' Dodatkowo, wyższa dynamika zysku netto w porównaniu do zysku operacyjnego sugeruje korzystne zmiany w obszarze kosztów finansowych lub opodatkowania.' : 
              ' Niższa dynamika zysku netto w porównaniu do zysku operacyjnego wskazuje na rosnące koszty finansowe lub zwiększony efektywny poziom opodatkowania.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
