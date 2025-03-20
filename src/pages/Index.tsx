
import { useState, useEffect } from 'react';
import FinancialReportsList from '@/components/FinancialReportsList';
import ReportDetail from '@/components/ReportDetail';
import { financialReports } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { ShareReport } from '@/components/ShareReport';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthButtons } from '@/components/AuthButtons';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const { user } = useAuth();
  const [processedReports, setProcessedReports] = useState<FinancialReport[]>([]);

  useEffect(() => {
    const reportsCopy = JSON.parse(JSON.stringify(financialReports)) as FinancialReport[];
    const reportsWithRandomPremium = reportsCopy.map(report => {
      if (report.premium) return report;
      const shouldBePremium = Math.random() < 0.3;
      return {
        ...report,
        premium: shouldBePremium
      };
    });
    setProcessedReports(reportsWithRandomPremium);
  }, []);

  // Filter to show ALL reports in the list, but mark premium ones
  // Premium reports will be handled by the ReportDetail component

  const handleSelectReport = (report: FinancialReport) => {
    setSelectedReport(report);
    if (isMobile) {
      setShowListOnMobile(false);
    }
  };

  const handleBackToList = () => {
    setShowListOnMobile(true);
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Stock Summary Hub</h1>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-4 text-sm">
              <a href="#" className="text-primary">Reports</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Markets</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Watchlist</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Insights</a>
            </nav>
            <AuthButtons />
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {(!isMobile || (isMobile && showListOnMobile)) && (
          <div className="w-full md:w-[450px] border-r border-border/60 overflow-hidden">
            <FinancialReportsList 
              reports={processedReports}
              onSelectReport={handleSelectReport} 
              selectedReportId={selectedReport?.id || null}
            />
          </div>
        )}
        
        {(!isMobile || (isMobile && !showListOnMobile)) && (
          <div className="flex-1 overflow-hidden">
            {isMobile && selectedReport && (
              <div className="p-4 border-b border-border/60">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToList} 
                  className="flex items-center text-sm font-medium"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Reports
                </Button>
              </div>
            )}
            <ReportDetail 
              report={selectedReport} 
              onShare={handleShare}
              user={user}
            />
          </div>
        )}
      </main>

      {selectedReport && (
        <ShareReport 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          report={selectedReport}
        />
      )}
    </div>
  );
};

export default Index;
