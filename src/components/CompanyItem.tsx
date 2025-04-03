
import { useState } from 'react';
import { formatDate } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tag, FileText } from 'lucide-react';

interface CompanyItemProps {
  report: FinancialReport;
  isSelected: boolean;
  onClick: () => void;
}

const CompanyItem = ({ report, isSelected, onClick }: CompanyItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Generate a one-sentence summary based on the report data
  const generateSummary = (report: FinancialReport): string => {
    const revenueChange = report.summaryData.revenue.change;
    const incomeChange = report.summaryData.netIncome.change;
    
    if (revenueChange > 0 && incomeChange > 0) {
      return `${report.companyName} zaraportowała silny wzrost z przychodami wyższymi o ${report.summaryData.revenue.change}% i zyskiem netto wyższym o ${report.summaryData.netIncome.change}%.`;
    } else if (revenueChange < 0 && incomeChange < 0) {
      return `${report.companyName} zaraportowała wyzwania z przychodami niższymi o ${Math.abs(report.summaryData.revenue.change)}% i zyskiem netto niższym o ${Math.abs(report.summaryData.netIncome.change)}%.`;
    } else if (revenueChange > 0) {
      return `${report.companyName} zaraportowała wzrost przychodów o ${report.summaryData.revenue.change}% pomimo ${incomeChange >= 0 ? 'zmian' : 'spadku'} w zysku netto.`;
    } else {
      return `${report.companyName} zaraportowała ${revenueChange >= 0 ? 'stabilne' : 'malejące'} przychody z ${incomeChange >= 0 ? 'poprawioną' : 'zmniejszoną'} rentownością.`;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 mb-3 rounded-xl transition-all duration-300 cursor-pointer",
        "hover:bg-secondary/80 border border-border/40 hover:border-border",
        "transform hover:-translate-y-1 hover:shadow-lg",
        isSelected ? "bg-secondary border-primary/20" : "bg-card hover:bg-secondary/80"
      )}
    >
      {/* Date and time first */}
      <div className="text-xs text-muted-foreground mb-2">
        {formatDate(report.publicationDate)}
      </div>

      {/* Report Title */}
      <div className="flex items-center mb-3">
        <FileText className="h-4 w-4 text-primary mr-2" />
        <h4 className="font-semibold text-sm">{report.title}</h4>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12 bg-secondary/50 rounded-lg overflow-hidden flex items-center justify-center">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary/80 animate-pulse rounded-lg"></div>
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
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium truncate pr-2">{report.companyName}</h3>
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <span>{report.ticker}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40"></span>
                <span>{report.reportType === 'Quarterly' ? 'Kwartalny' : 'Roczny'} {report.quarterOrYear}</span>
              </div>
            </div>
            <div className={cn(
              "text-xs px-2 py-1 rounded-full",
              isSelected ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
            )}>
              {report.financialPeriod}
            </div>
          </div>
          
          {/* Report categories */}
          <div className="mt-2 flex flex-wrap gap-1">
            {report.category && (
              <Badge 
                key="main-category"
                variant={isSelected ? "default" : "secondary"}
                className="text-[10px] py-0 h-5 flex items-center gap-1"
              >
                <Tag className="h-3 w-3" />
                {report.category}
              </Badge>
            )}
          </div>
          
          {/* One sentence summary */}
          <div className="mt-2 text-sm line-clamp-2">
            {generateSummary(report)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
