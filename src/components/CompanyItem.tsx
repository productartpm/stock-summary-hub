
import { useState } from 'react';
import { formatDate } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CompanyItemProps {
  report: FinancialReport;
  isSelected: boolean;
  onClick: () => void;
}

const CompanyItem = ({ report, isSelected, onClick }: CompanyItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
                <span>{report.reportType} {report.quarterOrYear}</span>
              </div>
            </div>
            <div className={cn(
              "text-xs px-2 py-1 rounded-full",
              isSelected ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
            )}>
              {report.financialPeriod}
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {formatDate(report.publicationDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
