
import type { FinancialReport } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";

interface InvestorInsightsProps {
  report: FinancialReport;
}

export const InvestorInsights = ({ report }: InvestorInsightsProps) => {
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const epsChange = report.summaryData.eps?.change ?? 0;
  const eps = report.summaryData.eps?.value ?? 0;
  const roe = report.summaryData.roe?.value ?? 0;
  const roeChange = report.summaryData.roe?.change ?? 0;

  // Calculate net margin for insights
  const netMargin = (report.summaryData.netIncome.value / report.summaryData.revenue.value) * 100;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Co to oznacza dla inwestora?</h3>
      
      <div className="space-y-4">
        
        {/* Przychody */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Sprzedaż</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {report.summaryData.revenue.change >= 5 ? 
              `Bardzo dobry wynik - wzrost o ${formatPercentage(report.summaryData.revenue.change)}. Firma skutecznie rozwija biznes.` :
              report.summaryData.revenue.change >= 0 ?
              `Stabilny wzrost o ${formatPercentage(report.summaryData.revenue.change)}. Firma utrzymuje pozycję na rynku.` :
              `Spadek o ${formatPercentage(Math.abs(report.summaryData.revenue.change))} to niepokojący sygnał. Firma traci klientów.`
            }
          </p>
        </div>

        {/* Zyskowność */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Zyski</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {netIncomeChange >= 0 ?
              `Zysk wzrósł o ${formatPercentage(netIncomeChange)}. To dobra wiadomość dla akcjonariuszy - mogą liczyć na wyższe dywidendy.` :
              `Zysk spadł o ${formatPercentage(Math.abs(netIncomeChange))}. Firma ma problemy z kosztami, co może wpłynąć na cenę akcji.`
            }
            {` Firma zarabia ${formatPercentage(netMargin)} z każdej złotówki sprzedaży.`}
          </p>
        </div>

        {eps !== 0 && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Wartość akcji</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {`Na jedną akcję przypada ${formatNumber(eps, report.summaryData.eps?.unit)} zysku. `}
              {epsChange >= 0 ?
                `To więcej niż rok temu - każda akcja staje się bardziej wartościowa.` :
                `To mniej niż rok temu - wartość pojedynczej akcji maleje.`
              }
            </p>
          </div>
        )}

        {roe !== 0 && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Zarządzanie</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {`Firma generuje ${formatPercentage(roe)} zwrotu z kapitału akcjonariuszy. `}
              {roeChange >= 0 ?
                `Zarząd lepiej wykorzystuje pieniądze inwestorów.` :
                `Zarząd gorzej radzi sobie z kapitałem akcjonariuszy.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Wnioski */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Praktyczne wnioski</h4>
        <div className="text-sm">
          {report.summaryData.revenue.change >= 0 && netIncomeChange >= 0 ? (
            <p className="text-green-700 bg-green-50 p-3 rounded-lg border border-green-200">
              <strong>Pozytywny sygnał:</strong> Firma rozwija się i zwiększa zyski. Może być dobrą opcją dla długoterminowych inwestorów.
            </p>
          ) : report.summaryData.revenue.change < 0 && netIncomeChange < 0 ? (
            <p className="text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
              <strong>Ostrzeżenie:</strong> Firma ma problemy z przychodami i zyskami. Inwestorzy powinni być ostrożni.
            </p>
          ) : (
            <p className="text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <strong>Mieszane sygnały:</strong> Wyniki pokazują zarówno pozytywne jak i negatywne trendy. Potrzeba więcej czasu na ocenę.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
