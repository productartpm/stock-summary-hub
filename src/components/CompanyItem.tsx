
import { useState } from 'react';
import { formatDate } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tag, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyItemProps {
  report: FinancialReport;
  isSelected: boolean;
  onClick: () => void;
}

const CompanyItem = ({ report, isSelected, onClick }: CompanyItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  const generateSummary = (report: FinancialReport): string => {
    const revenueChange = report.summaryData.revenue.change;
    const incomeChange = report.summaryData.netIncome.change;
    
    if (revenueChange > 0 && incomeChange > 0) {
      return `Silny wzrost z przychodami wyższymi o ${report.summaryData.revenue.change}% i zyskiem netto wyższym o ${report.summaryData.netIncome.change}%.`;
    } else if (revenueChange < 0 && incomeChange < 0) {
      return `Wyzwania z przychodami niższymi o ${Math.abs(report.summaryData.revenue.change)}% i zyskiem netto niższym o ${Math.abs(report.summaryData.netIncome.change)}%.`;
    } else if (revenueChange > 0) {
      return `Wzrost przychodów o ${report.summaryData.revenue.change}% pomimo ${incomeChange >= 0 ? 'zmian' : 'spadku'} w zysku netto.`;
    } else {
      return `${revenueChange >= 0 ? 'Stabilne' : 'Malejące'} przychody z ${incomeChange >= 0 ? 'poprawioną' : 'zmniejszoną'} rentownością.`;
    }
  };

  const getPerformanceIndicator = () => {
    const revenueChange = report.summaryData.revenue.change;
    if (revenueChange > 5) {
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    } else if (revenueChange < -5) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl transition-all duration-300 cursor-pointer border",
        "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50",
        isSelected 
          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-md" 
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
      )}
    >
      {/* Header section with date and report type */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {formatDate(report.publicationDate)}
        </div>
        <div className="flex items-center gap-2">
          {getPerformanceIndicator()}
          <div className={cn(
            "text-xs px-2 py-1 rounded-full font-medium",
            isSelected 
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" 
              : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          )}>
            {report.reportType === 'Quarterly' ? 'Kwartalny' : 'Roczny'}
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="flex items-start gap-3">
        {/* Company logo */}
        <div className="relative w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-600 animate-pulse rounded-lg"></div>
          )}
          <img
            src={report.logoUrl}
            alt={`${report.companyName} logo`}
            className={cn(
              "w-8 h-8 object-contain transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Company info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
              {report.companyName}
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">
              {report.ticker}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-3 w-3 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300 line-clamp-1">
              {report.title}
            </span>
          </div>

          {/* Financial period and category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {report.financialPeriod} • {report.quarterOrYear}
            </span>
            {report.category && (
              <Badge 
                variant={isSelected ? "default" : "secondary"}
                className="text-xs h-5 flex items-center gap-1"
              >
                <Tag className="h-2 w-2" />
                {report.category}
              </Badge>
            )}
          </div>
          
          {/* Summary */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {generateSummary(report)}
          </p>

          {/* Performance metrics */}
          <div className="flex items-center gap-4 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="text-xs">
              <span className="text-slate-500 dark:text-slate-400">Przychody: </span>
              <span className={cn(
                "font-medium",
                report.summaryData.revenue.change > 0 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {report.summaryData.revenue.change > 0 ? '+' : ''}{report.summaryData.revenue.change}%
              </span>
            </div>
            <div className="text-xs">
              <span className="text-slate-500 dark:text-slate-400">Zysk netto: </span>
              <span className={cn(
                "font-medium",
                report.summaryData.netIncome.change > 0 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {report.summaryData.netIncome.change > 0 ? '+' : ''}{report.summaryData.netIncome.change}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
