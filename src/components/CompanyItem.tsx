import { useState } from 'react';
import { formatDate } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Clock } from 'lucide-react';
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
    const changeDirection = revenueChange >= 0 ? 'zwiększyło' : 'odnotowało spadek';
    const changeText = revenueChange >= 0 ? `+${revenueChange.toFixed(2)}%` : `${revenueChange.toFixed(2)}%`;
    
    let trendDescription = '';
    if (revenueChange >= 5) {
      trendDescription = 'Znaczący wzrost świadczy o skutecznej strategii rozwoju.';
    } else if (revenueChange >= 0) {
      trendDescription = 'Umiarkowany wzrost wskazuje na stabilną pozycję rynkową.';
    } else if (revenueChange >= -5) {
      trendDescription = 'Spadek może wskazywać na przejściowe trudności.';
    } else {
      trendDescription = 'Znaczący spadek wymaga szczególnej uwagi.';
    }
    
    return `${report.companyName} ${changeDirection} przychodów o ${changeText}. ${trendDescription} Zysk netto ${incomeChange >= 0 ? 'wzrósł' : 'spadł'} o ${incomeChange >= 0 ? '+' : ''}${incomeChange.toFixed(2)}%.`;
  };

  const generateDescriptionLines = (report: FinancialReport): string[] => {
    const summary = generateSummary(report);
    
    // Podziel podsumowanie na 3 logiczne części
    const words = summary.split(' ');
    const thirdLength = Math.ceil(words.length / 3);
    
    return [
      words.slice(0, thirdLength).join(' '),
      words.slice(thirdLength, thirdLength * 2).join(' '),
      words.slice(thirdLength * 2).join(' ')
    ].filter(line => line.trim()); // Usuń puste linie
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

  const cleanReportTitle = (title: string, companyName: string): string => {
    // Usuń nazwę firmy z tytułu jeśli się tam znajduje
    return title.replace(new RegExp(companyName, 'gi'), '').replace(/^[\s\-]+|[\s\-]+$/g, '').trim();
  };

  const { date, time } = formatDateTime(report.publicationDate);
  const descriptionLines = generateDescriptionLines(report);

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg transition-all duration-300 cursor-pointer border",
        "hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50",
        isSelected 
          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-md" 
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
      )}
    >
      {/* Data i czas na samej górze */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="font-medium">{time}</span>
          </div>
        </div>
        <div className="text-slate-500 dark:text-slate-400">
          <span className="font-medium">{report.financialPeriod} • {report.quarterOrYear}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {/* Logo - większy */}
        <div className="relative w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
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

        {/* Główna zawartość - szerszy layout */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Ticker i nazwa firmy */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
              {report.ticker}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {report.companyName}
            </h3>
          </div>
          
          {/* Nazwa raportu - bez nazwy firmy */}
          <div className="flex items-start gap-2">
            <FileText className="h-3 w-3 text-slate-400 mt-0.5 flex-shrink-0" />
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
              {cleanReportTitle(report.title, report.companyName)}
            </h4>
          </div>

          {/* Typ raportu bez kategorii */}
          <div className="flex items-center gap-2">
            <Badge 
              variant={isSelected ? "default" : "secondary"}
              className="text-xs h-5 flex items-center gap-1 px-2 font-medium"
            >
              {report.reportType === 'Quarterly' ? 'Raport Kwartalny' : 'Raport Roczny'}
            </Badge>
          </div>
          
          {/* 3 linijki opisu */}
          <div className="space-y-1">
            {descriptionLines.map((line, index) => (
              <p key={index} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
