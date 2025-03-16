
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, type FinancialReport } from '@/lib/data';

interface ReportHeaderProps {
  report: FinancialReport;
  onShare: () => void;
}

export const ReportHeader = ({ report, onShare }: ReportHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share className="mr-2 h-4 w-4" />
          Share Report
        </Button>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">{report.companyName} ({report.ticker})</h1>
        <p className="text-muted-foreground">{report.title}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Published: {formatDate(report.publicationDate)}</span>
          <span className="mx-2">•</span>
          <span>{report.reportType} Report</span>
        </div>
      </div>
    </div>
  );
};
