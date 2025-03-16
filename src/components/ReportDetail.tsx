
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
import { ReportTrends } from './report/ReportTrends';
import { ReportRisks } from './report/ReportRisks';
import { ReportFinancialPredictions } from './report/ReportFinancialPredictions';
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

  // Always show the full report content regardless of premium status
  const renderTabbedContent = () => {
    return (
      <Tabs defaultValue="highlights" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-6 max-w-3xl'} mb-4`}>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="outlook">Future Plans</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="highlights" className="space-y-4">
          <ReportHighlights report={report} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <ReportTrends report={report} />
        </TabsContent>

        <TabsContent value="outlook" className="space-y-4">
          <ReportOutlook report={report} />
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <ReportRisks report={report} />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <ReportFinancialPredictions report={report} />
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
        {renderContent()}
      </div>
    </div>
  );
};

export default ReportDetail;
