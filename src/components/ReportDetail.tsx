
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
import { ReportFinancialData } from './report/ReportFinancialData';
import { ReportStockPredictions } from './report/ReportStockPredictions';
import { ReportTechnicalAnalysis } from './report/ReportTechnicalAnalysis';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

interface ReportDetailProps {
  report: FinancialReport | null;
  onShare: () => void;
  user: User | null;
}

const ReportDetail = ({ report, onShare, user }: ReportDetailProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('financial-data');

  if (!report) {
    return <EmptyReportState />;
  }

  // Show login prompt for premium reports when user is not logged in
  if (report.premium && !user) {
    return <LoginPrompt report={report} />;
  }

  const renderTabbedContent = () => {
    return (
      <Tabs defaultValue="financial-data" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-1' : 'grid-cols-7'} mb-4 overflow-x-auto`}>
          <TabsTrigger value="financial-data">1. Financial Data</TabsTrigger>
          <TabsTrigger value="trends">2. Market Trends</TabsTrigger>
          <TabsTrigger value="outlook">3. Future Plans</TabsTrigger>
          <TabsTrigger value="risks">4. Risks</TabsTrigger>
          <TabsTrigger value="predictions">5. Financial Predictions</TabsTrigger>
          <TabsTrigger value="stock">6. Stock Price Predictions</TabsTrigger>
          <TabsTrigger value="technical">7. Technical Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="financial-data" className="space-y-4">
          <ReportFinancialData report={report} />
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

        <TabsContent value="stock" className="space-y-4">
          <ReportStockPredictions report={report} />
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <ReportTechnicalAnalysis report={report} />
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
