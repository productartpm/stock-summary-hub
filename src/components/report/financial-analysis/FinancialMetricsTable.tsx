
import type { FinancialReport } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FinancialMetricsTableProps {
  report: FinancialReport;
}

export const FinancialMetricsTable = ({ report }: FinancialMetricsTableProps) => {
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  const operatingProfit = report.summaryData.operatingProfit?.value ?? 0;
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const epsChange = report.summaryData.eps?.change ?? 0;
  const eps = report.summaryData.eps?.value ?? 0;
  const roe = report.summaryData.roe?.value ?? 0;
  const roeChange = report.summaryData.roe?.change ?? 0;
  const ebitda = report.summaryData.ebitda?.value ?? 0;
  const ebitdaChange = report.summaryData.ebitda?.change ?? 0;

  // Calculate previous values based on change percentage
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(report.summaryData.revenue.value, report.summaryData.revenue.change);
  const previousOperatingProfit = calculatePreviousValue(operatingProfit, operatingProfitChange);
  const previousNetIncome = calculatePreviousValue(report.summaryData.netIncome.value, netIncomeChange);
  const previousEps = calculatePreviousValue(eps, epsChange);
  const previousRoe = calculatePreviousValue(roe, roeChange);
  const previousEbitda = calculatePreviousValue(ebitda, ebitdaChange);

  // Calculate margins
  const netMargin = (report.summaryData.netIncome.value / report.summaryData.revenue.value) * 100;
  const operatingMargin = (operatingProfit / report.summaryData.revenue.value) * 100;
  const previousNetMargin = (previousNetIncome / previousRevenue) * 100;
  const previousOperatingMargin = (previousOperatingProfit / previousRevenue) * 100;
  const netMarginChange = netMargin - previousNetMargin;
  const operatingMarginChange = operatingMargin - previousOperatingMargin;

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900">Wskaźnik</TableHead>
            <TableHead className="text-right font-semibold text-gray-900">Poprzedni okres</TableHead>
            <TableHead className="text-right font-semibold text-gray-900">Bieżący okres</TableHead>
            <TableHead className="text-right font-semibold text-gray-900">Zmiana</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium text-gray-900">Przychody</TableCell>
            <TableCell className="text-right text-gray-700">
              {formatNumber(previousRevenue, report.summaryData.revenue.unit)}
            </TableCell>
            <TableCell className="text-right font-semibold text-gray-900">
              {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
            </TableCell>
            <TableCell className={`text-right font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(report.summaryData.revenue.change)}
            </TableCell>
          </TableRow>
          
          {ebitda > 0 && (
            <TableRow className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">EBITDA</TableCell>
              <TableCell className="text-right text-gray-700">
                {formatNumber(previousEbitda, report.summaryData.ebitda?.unit)}
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-900">
                {formatNumber(ebitda, report.summaryData.ebitda?.unit)}
              </TableCell>
              <TableCell className={`text-right font-medium ${ebitdaChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(ebitdaChange)}
              </TableCell>
            </TableRow>
          )}
          
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium text-gray-900">Zysk Operacyjny</TableCell>
            <TableCell className="text-right text-gray-700">
              {formatNumber(previousOperatingProfit, report.summaryData.operatingProfit?.unit)}
            </TableCell>
            <TableCell className="text-right font-semibold text-gray-900">
              {formatNumber(operatingProfit, report.summaryData.operatingProfit?.unit)}
            </TableCell>
            <TableCell className={`text-right font-medium ${operatingProfitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(operatingProfitChange)}
            </TableCell>
          </TableRow>
          
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium text-gray-900">Zysk Netto</TableCell>
            <TableCell className="text-right text-gray-700">
              {formatNumber(previousNetIncome, report.summaryData.netIncome.unit)}
            </TableCell>
            <TableCell className="text-right font-semibold text-gray-900">
              {formatNumber(report.summaryData.netIncome.value, report.summaryData.netIncome.unit)}
            </TableCell>
            <TableCell className={`text-right font-medium ${netIncomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(netIncomeChange)}
            </TableCell>
          </TableRow>

          {eps !== 0 && (
            <TableRow className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">Zysk na akcję (EPS)</TableCell>
              <TableCell className="text-right text-gray-700">
                {formatNumber(previousEps, report.summaryData.eps?.unit)}
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-900">
                {formatNumber(eps, report.summaryData.eps?.unit)}
              </TableCell>
              <TableCell className={`text-right font-medium ${epsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(epsChange)}
              </TableCell>
            </TableRow>
          )}

          {roe !== 0 && (
            <TableRow className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">ROE</TableCell>
              <TableCell className="text-right text-gray-700">
                {formatPercentage(previousRoe)}
              </TableCell>
              <TableCell className="text-right font-semibold text-gray-900">
                {formatPercentage(roe)}
              </TableCell>
              <TableCell className={`text-right font-medium ${roeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {roeChange >= 0 ? '+' : ''}{roeChange.toFixed(1)} p.p.
              </TableCell>
            </TableRow>
          )}

          <TableRow className="border-t-2 border-gray-200 bg-blue-50 hover:bg-blue-100">
            <TableCell className="font-semibold text-blue-900">Marża Operacyjna</TableCell>
            <TableCell className="text-right text-blue-700">
              {formatPercentage(previousOperatingMargin)}
            </TableCell>
            <TableCell className="text-right font-semibold text-blue-900">
              {formatPercentage(operatingMargin)}
            </TableCell>
            <TableCell className={`text-right font-medium ${operatingMarginChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {operatingMarginChange >= 0 ? '+' : ''}{operatingMarginChange.toFixed(1)} p.p.
            </TableCell>
          </TableRow>

          <TableRow className="bg-blue-50 hover:bg-blue-100">
            <TableCell className="font-semibold text-blue-900">Marża Netto</TableCell>
            <TableCell className="text-right text-blue-700">
              {formatPercentage(previousNetMargin)}
            </TableCell>
            <TableCell className="text-right font-semibold text-blue-900">
              {formatPercentage(netMargin)}
            </TableCell>
            <TableCell className={`text-right font-medium ${netMarginChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netMarginChange >= 0 ? '+' : ''}{netMarginChange.toFixed(1)} p.p.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
