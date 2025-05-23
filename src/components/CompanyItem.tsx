
import { useState } from 'react';
import { formatDate } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tag, FileText, TrendingUp, TrendingDown, Calendar, Clock } from 'lucide-react';
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

  const getPerformanceIndicator = (report: FinancialReport) => {
    const revenueChange = report.summaryData.revenue.change;
    if (revenueChange > 5) {
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    } else if (revenueChange < -5) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const formatDateTime = (dateString: string): { date: string, time: string } => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time } = formatDateTime(report.publicationDate);

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-5 rounded-xl transition-all duration-300 cursor-pointer border",
        "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50",
        isSelected 
          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-md" 
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
      )}
    >
      {/* Main content layout */}
      <div className="flex gap-4">
        {/* Logo */}
        <div className="relative w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-600 animate-pulse rounded-xl"></div>
          )}
          <img
            src={report.logoUrl}
            alt={`${report.companyName} logo`}
            className={cn(
              "w-12 h-12 object-contain transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Company name and performance indicator */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {report.companyName}
              </h3>
              <span className="text-lg text-slate-500 dark:text-slate-400 font-mono font-medium">
                {report.ticker}
              </span>
            </div>
            {getPerformanceIndicator(report)}
          </div>
          
          {/* Report title */}
          <div className="flex items-start gap-2 mb-3">
            <FileText className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
              {report.title}
            </h4>
          </div>

          {/* Report type and category */}
          <div className="flex items-center gap-3 mb-3">
            <Badge 
              variant={isSelected ? "default" : "secondary"}
              className="text-sm h-7 flex items-center gap-1 px-3 font-medium"
            >
              {report.reportType === 'Quarterly' ? 'Kwartalny' : 'Roczny'}
            </Badge>
            {report.category && (
              <Badge 
                variant="outline"
                className="text-sm h-7 flex items-center gap-1 px-3"
              >
                <Tag className="h-3 w-3" />
                {report.category}
              </Badge>
            )}
          </div>

          {/* Date and time */}
          <div className="flex items-center gap-4 mb-4 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{time}</span>
            </div>
          </div>
          
          {/* Summary description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {generateSummary(report)}
          </p>

          {/* Financial metrics */}
          <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Przychody: </span>
              <span className={cn(
                "font-bold text-base",
                report.summaryData.revenue.change > 0 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {report.summaryData.revenue.change > 0 ? '+' : ''}{report.summaryData.revenue.change}%
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Zysk netto: </span>
              <span className={cn(
                "font-bold text-base",
                report.summaryData.netIncome.change > 0 
                  ? "text-emerald-600 dark:text-emerald-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {report.summaryData.netIncome.change > 0 ? '+' : ''}{report.summaryData.netIncome.change}%
              </span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium">{report.financialPeriod} • {report.quarterOrYear}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
