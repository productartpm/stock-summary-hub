import { PremiumContent } from '@/components/PremiumContent';
import { type FinancialReport } from '@/lib/types';
import { User } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { EmptyReportState } from './report/EmptyReportState';
import { LoginPrompt } from './report/LoginPrompt';
import { ReportSummaryMetrics } from './report/ReportSummaryMetrics';
import { ReportHeader } from './report/ReportHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import { ReportFinancialAnalysis } from './report/ReportFinancialAnalysis';
import { ReportTrends } from './report/ReportTrends';
import { ReportFuturePlans } from './report/ReportFuturePlans';
import { ReportRisks } from './report/ReportRisks';
import { ReportTechnicalAnalysis } from './report/ReportTechnicalAnalysis';

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
  const [activeTab, setActiveTab] = useState('financial-analysis');

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
      <Tabs defaultValue="financial-analysis" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-6 bg-neutral-50 p-2 rounded-lg border">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full bg-transparent gap-1">
            <TabsTrigger value="financial-analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-2">
              Dane Finansowe
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-2">
              Trendy
            </TabsTrigger>
            <TabsTrigger value="future-plans" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-2">
              Plany na Przyszłość
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-2">
              Ryzyka
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-2 py-2">
              Analiza Techniczna
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="financial-analysis" className="space-y-4">
          <ReportFinancialAnalysis report={report} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <ReportTrends report={report} />
        </TabsContent>

        <TabsContent value="future-plans" className="space-y-4">
          <ReportFuturePlans report={report} />
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
        
        {/* Krótkie podsumowanie raportu */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">Podsumowanie Raportu</h2>
          <p className="text-sm text-blue-800 leading-relaxed">
            {report.companyName} przedstawia wyniki finansowe za {report.reportType === 'Quarterly' ? 'trzeci kwartał' : 'rok'} {report.quarterOrYear}. 
            Spółka odnotowała {report.summaryData.revenue.change >= 0 ? 'wzrost' : 'spadek'} przychodów o {Math.abs(report.summaryData.revenue.change).toFixed(1)}% 
            oraz {report.summaryData.netIncome.change >= 0 ? 'poprawę' : 'pogorszenie'} wyniku netto o {Math.abs(report.summaryData.netIncome.change).toFixed(1)}% 
            w porównaniu do analogicznego okresu roku poprzedniego. 
            {report.summaryData.revenue.change >= 5 ? 
              'Silny wzrost odzwierciedla skuteczną realizację strategii biznesowej i korzystne warunki rynkowe.' : 
              report.summaryData.revenue.change >= 0 ? 
              'Stabilne wyniki wskazują na odporność biznesu w obecnych warunkach rynkowych.' : 
              'Spadek wyników wymaga intensyfikacji działań operacyjnych i strategicznych w kolejnych okresach.'}
          </p>
        </div>

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
