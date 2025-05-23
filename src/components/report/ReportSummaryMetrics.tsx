
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import type { FinancialReport } from '@/lib/types';

interface ReportSummaryMetricsProps {
  report: FinancialReport;
}

export const ReportSummaryMetrics = ({ report }: ReportSummaryMetricsProps) => {
  const { revenue, netIncome } = report.summaryData;

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  // Calculate previous values based on change percentage
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(revenue.value, revenue.change);
  const previousNetIncome = calculatePreviousValue(netIncome.value, netIncome.change);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Przychody */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Przychody
              </h3>
            </div>
            <div className={`flex items-center gap-1 ${getChangeColor(revenue.change)}`}>
              {getChangeIcon(revenue.change)}
              <span className="font-semibold text-sm">
                {formatPercentage(revenue.change)}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-blue-600 dark:text-blue-300 font-medium mb-1">
                {report.financialPeriod || report.quarterOrYear}
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {formatNumber(revenue.value, revenue.unit)}
              </div>
            </div>
            
            <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
              <div className="text-xs text-blue-600 dark:text-blue-300 font-medium mb-1">
                Poprzedni okres
              </div>
              <div className="text-xl font-semibold text-blue-700 dark:text-blue-200">
                {formatNumber(previousRevenue, revenue.unit)}
              </div>
            </div>
            
            <p className="text-sm text-blue-700 dark:text-blue-300 pt-1">
              {revenue.change >= 0 ? 'Wzrost' : 'Spadek'} o {Math.abs(revenue.change).toFixed(2)}% 
              {revenue.change >= 0 ? ' rok do roku' : ' względem roku poprzedniego'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Zysk netto */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                Zysk Netto
              </h3>
            </div>
            <div className={`flex items-center gap-1 ${getChangeColor(netIncome.change)}`}>
              {getChangeIcon(netIncome.change)}
              <span className="font-semibold text-sm">
                {formatPercentage(netIncome.change)}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium mb-1">
                {report.financialPeriod || report.quarterOrYear}
              </div>
              <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                {formatNumber(netIncome.value, netIncome.unit)}
              </div>
            </div>
            
            <div className="pt-2 border-t border-emerald-200 dark:border-emerald-700">
              <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium mb-1">
                Poprzedni okres
              </div>
              <div className="text-xl font-semibold text-emerald-700 dark:text-emerald-200">
                {formatNumber(previousNetIncome, netIncome.unit)}
              </div>
            </div>
            
            <p className="text-sm text-emerald-700 dark:text-emerald-300 pt-1">
              {netIncome.change >= 0 ? 'Wzrost' : 'Spadek'} o {Math.abs(netIncome.change).toFixed(2)}% 
              {netIncome.change >= 0 ? ' rok do roku' : ' względem roku poprzedniego'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
