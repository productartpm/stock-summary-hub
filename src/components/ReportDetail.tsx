
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
        <div className="mb-4 bg-neutral-800 p-1 rounded-md">
          <TabsList className="grid grid-cols-4 w-full bg-transparent">
            <TabsTrigger value="financial-data" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              1. Dane Finansowe
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              2. Trendy Rynkowe
            </TabsTrigger>
            <TabsTrigger value="outlook" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              3. Plany na Przyszłość
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              4. Ryzyka
            </TabsTrigger>
          </TabsList>
          
          <TabsList className="grid grid-cols-3 w-full mt-1 bg-transparent">
            <TabsTrigger value="predictions" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              5. Predykcje Finansowe
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              6. Predykcje Kursu
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
              7. Analiza Techniczna
            </TabsTrigger>
          </TabsList>
        </div>

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
    <div className="p-6 md:p-8 overflow-y-auto h-full bg-neutral-100">
      <div className="max-w-4xl mx-auto">
        {report.premium ? (
          <PremiumContent 
            content={{
              title: "Premium Analizy Finansowe",
              description: "Ten raport premium zawiera szczegółową analizę finansową, eksperckie komentarze i projekcje przyszłych wyników.",
              unlockPrice: "9,99 zł"
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
