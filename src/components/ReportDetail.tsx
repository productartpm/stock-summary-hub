
import { PremiumContent } from '@/components/PremiumContent';
import { type FinancialReport } from '@/lib/types';
import { User } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { EmptyReportState } from './report/EmptyReportState';
import { LoginPrompt } from './report/LoginPrompt';
import { ReportSummaryMetrics } from './report/ReportSummaryMetrics';
import { ReportRisks } from './report/ReportRisks';
import { ReportTechnicalAnalysis } from './report/ReportTechnicalAnalysis';
import { ReportFinancialData } from './report/ReportFinancialData';
import { ReportHeader } from './report/ReportHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

interface ReportDetailProps {
  report: FinancialReport | null;
  onShare: () => void;
  user: User | null;
  onBackToList?: () => void;
}

// Lista raportów, które nie wymagają premium (oprócz tych, które już mają premium: false)
const nonPremiumReportIds = ['paypal-q3-2024', 'jpmorgan-q3-2024', 'columbus-energy-q3-2024'];

const ReportDetail = ({ report, onShare, user, onBackToList }: ReportDetailProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('financial-data');

  if (!report) {
    return <EmptyReportState />;
  }

  // Sprawdź czy raport ma być dostępny bez premium (albo jest już not premium, albo jest na liście nonPremiumReportIds)
  const isNonPremium = !report.premium || nonPremiumReportIds.includes(report.id);

  // Pokaż zachętę do logowania dla raportów premium, gdy użytkownik nie jest zalogowany
  if (report.premium && !isNonPremium && !user) {
    return <LoginPrompt report={report} />;
  }

  const renderTabbedContent = () => {
    return (
      <Tabs defaultValue="financial-data" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-4 bg-neutral-100 p-1 rounded-md">
          <TabsList className="grid grid-cols-3 w-full bg-transparent">
            <TabsTrigger value="financial-data" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              1. Dane Finansowe
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              2. Ryzyka
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              3. Analiza Techniczna
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="financial-data" className="space-y-4">
          <ReportFinancialData report={report} />
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <ReportRisks report={report} />
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
        <ReportHeader report={report} onShare={onShare} onBackToList={onBackToList} />
        <ReportSummaryMetrics report={report} />
        {renderTabbedContent()}
      </>
    );
  };

  return (
    <div className="p-4 md:p-8 overflow-y-auto h-full bg-background">
      <div className="max-w-4xl mx-auto">
        {report.premium && !isNonPremium ? (
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
