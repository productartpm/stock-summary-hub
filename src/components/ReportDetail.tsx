
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
import { ReportHeader } from './report/ReportHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

interface ReportDetailProps {
  report: FinancialReport | null;
  onShare: () => void;
  user: User | null;
}

const ReportDetail = ({ report, onShare, user }: ReportDetailProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('highlights');

  if (!report) {
    return <EmptyReportState />;
  }

  // Show login prompt for premium reports when user is not logged in
  if (report.premium && !user) {
    return <LoginPrompt report={report} />;
  }

  const renderTabbedContent = () => {
    return (
      <Tabs defaultValue="highlights" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-3 max-w-md'} mb-4`}>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="outlook">Outlook</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="highlights" className="space-y-4">
          <ReportHighlights report={report} />
        </TabsContent>

        <TabsContent value="outlook" className="space-y-4">
          <ReportOutlook report={report} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <ReportAnalystReactions report={report} />
        </TabsContent>
      </Tabs>
    );
  };

  const renderContent = () => {
    return (
      <>
        <ReportHeader report={report} onShare={onShare} />
        <ReportSummaryMetrics report={report} />
        {renderTabbedContent()}
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
