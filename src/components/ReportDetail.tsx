
import { PremiumContent } from '@/components/PremiumContent';
import { type FinancialReport } from '@/lib/data';
import { User } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { EmptyReportState } from './report/EmptyReportState';
import { LoginPrompt } from './report/LoginPrompt';
import { ReportSummaryMetrics } from './report/ReportSummaryMetrics';
import { ReportHighlights } from './report/ReportHighlights';
import { ReportOutlook } from './report/ReportOutlook';
import { ReportAnalystReactions } from './report/ReportAnalystReactions';
import { ReportMobileTabs } from './report/ReportMobileTabs';
import { ReportHeader } from './report/ReportHeader';

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
        <ReportHeader report={report} onShare={onShare} />
        <ReportSummaryMetrics report={report} />
        {isMobile ? <ReportMobileTabs report={report} /> : renderDesktopContent()}
      </>
    );
  };

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto">
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
