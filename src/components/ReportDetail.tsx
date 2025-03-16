
import { PremiumContent } from '@/components/PremiumContent';
import { formatDate, type FinancialReport } from '@/lib/data';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { EmptyReportState } from './report/EmptyReportState';
import { LoginPrompt } from './report/LoginPrompt';
import { ReportSummaryMetrics } from './report/ReportSummaryMetrics';
import { ReportHighlights } from './report/ReportHighlights';
import { ReportOutlook } from './report/ReportOutlook';
import { ReportAnalystReactions } from './report/ReportAnalystReactions';
import { ReportMobileTabs } from './report/ReportMobileTabs';

interface ReportDetailProps {
  report: FinancialReport | null;
  onShare: () => void;
  user: User | null;
}

const ReportDetail = ({ report, onShare, user }: ReportDetailProps) => {
  const isMobile = useIsMobile();

  if (!report) {
    return <EmptyReportState />;
  }

  // Show login prompt for premium reports when user is not logged in
  if (report.premium && !user) {
    return <LoginPrompt report={report} />;
  }

  const renderDesktopContent = () => {
    return (
      <>
        <ReportHighlights report={report} />
        <ReportOutlook report={report} />
        <ReportAnalystReactions report={report} />
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">{report.companyName} ({report.ticker})</h1>
          <p className="text-muted-foreground">{report.title}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Published: {formatDate(report.publicationDate)}</span>
            <span className="mx-2">•</span>
            <span>{report.reportType} Report</span>
          </div>
        </div>

        <ReportSummaryMetrics report={report} />

        {isMobile ? <ReportMobileTabs report={report} /> : renderDesktopContent()}
      </>
    );
  };

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>

        {report.premium ? (
          <PremiumContent 
            content={{
              title: "Premium Financial Insights",
              description: "This premium report includes detailed financial analysis, expert insights, and future outlook projections.",
              unlockPrice: "$9.99"
            }}
            requireAuth={true}
          >
            {renderContent()}
          </PremiumContent>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
