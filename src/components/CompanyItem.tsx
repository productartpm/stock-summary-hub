
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
      return `Pozytywne wyniki finansowe spółki z rosnącymi wskaźnikami operacyjnymi.`;
    } else if (revenueChange < 0 && incomeChange < 0) {
      return `Wyzwania operacyjne z potrzebą optymalizacji procesów biznesowych.`;
    } else if (revenueChange > 0) {
      return `Rozwój działalności z fokusem na poprawę efektywności operacyjnej.`;
    } else {
      return `Stabilizacja wyników z koncentracją na długoterminowym wzroście.`;
    }
  };

  const getPerformanceIndicator = (report: FinancialReport) => {
    const revenueChange = report.summaryData.revenue.change;
    if (revenueChange > 5) {
      return <TrendingUp className="h-5 w-5 text-emerald-500" />;
    } else if (revenueChange < -5) {
      return <TrendingDown className="h-5 w-5 text-red-500" />;
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
        "p-6 rounded-xl transition-all duration-300 cursor-pointer border",
        "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50",
        isSelected 
          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-md" 
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
      )}
    >
      <div className="flex gap-5">
        {/* Logo */}
        <div className="relative w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-600 animate-pulse rounded-xl"></div>
          )}
          <img
            src={report.logoUrl}
            alt={`${report.companyName} logo`}
            className={cn(
              "w-14 h-14 object-contain transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Company name and performance indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {report.companyName}
              </h3>
              <span className="text-xl text-slate-500 dark:text-slate-400 font-mono font-medium">
                {report.ticker}
              </span>
            </div>
            {getPerformanceIndicator(report)}
          </div>
          
          {/* Report title */}
          <div className="flex items-start gap-3">
            <FileText className="h-6 w-6 text-slate-400 mt-1 flex-shrink-0" />
            <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
              {report.title}
            </h4>
          </div>

          {/* Report type and category */}
          <div className="flex items-center gap-4">
            <Badge 
              variant={isSelected ? "default" : "secondary"}
              className="text-base h-8 flex items-center gap-2 px-4 font-medium"
            >
              {report.reportType === 'Quarterly' ? 'Raport Kwartalny' : 'Raport Roczny'}
            </Badge>
            {report.category && (
              <Badge 
                variant="outline"
                className="text-base h-8 flex items-center gap-2 px-4"
              >
                <Tag className="h-4 w-4" />
                {report.category}
              </Badge>
            )}
          </div>

          {/* Date and time */}
          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <span className="text-base font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5" />
              <span className="text-base font-medium">{time}</span>
            </div>
            <div className="text-base text-slate-500 dark:text-slate-400">
              <span className="font-medium">{report.financialPeriod} • {report.quarterOrYear}</span>
            </div>
          </div>
          
          {/* Summary description */}
          <p className="text-base text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {generateSummary(report)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
