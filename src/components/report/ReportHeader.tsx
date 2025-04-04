
import { Share, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, type FinancialReport } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';

interface ReportHeaderProps {
  report: FinancialReport;
  onShare: () => void;
  onBackToList?: () => void;
}

export const ReportHeader = ({ report, onShare, onBackToList }: ReportHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {isMobile && onBackToList && (
          <Button variant="ghost" size="sm" onClick={onBackToList} className="mr-auto">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Wróć
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onShare} className={isMobile && onBackToList ? "ml-auto" : ""}>
          <Share className="mr-2 h-4 w-4" />
          Udostępnij
        </Button>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl md:text-3xl font-bold">{report.companyName} ({report.ticker})</h1>
        <p className="text-muted-foreground text-sm">{report.title}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>Opublikowano: {formatDate(report.publicationDate)}</span>
          <span className="mx-2">•</span>
          <span>{report.reportType === 'Quarterly' ? 'Raport Kwartalny' : 'Raport Roczny'}</span>
        </div>
      </div>
    </div>
  );
};
