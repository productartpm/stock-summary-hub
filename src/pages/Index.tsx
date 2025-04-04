
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import FinancialReportsList from "@/components/FinancialReportsList";
import ReportDetail from "@/components/ReportDetail";
import { type FinancialReport } from "@/lib/data";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Index = () => {
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showListOnMobile, setShowListOnMobile] = useState(true);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const handleSelectReport = (report: FinancialReport) => {
    setSelectedReport(report);
    // On mobile, show the report detail when a report is selected
    if (isMobile) {
      setShowListOnMobile(false);
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const handleBackToList = () => {
    setShowListOnMobile(true);
  };

  // If we change from mobile to desktop view, make sure both panels are visible
  useEffect(() => {
    if (!isMobile) {
      setShowListOnMobile(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab="home" />
      <main className="flex-1 p-0 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Show list on mobile view if no report is selected or if we're explicitly showing the list */}
          {(showListOnMobile || !isMobile) && (
            <div className="w-full md:w-1/3 lg:w-2/5 border-r border-border/60 overflow-hidden flex flex-col">
              <FinancialReportsList 
                onSelectReport={handleSelectReport} 
                selectedReportId={selectedReport?.id || null} 
              />
            </div>
          )}
          
          {/* Show report detail if a report is selected, or on desktop view */}
          {((selectedReport && !showListOnMobile) || (!isMobile && selectedReport)) && (
            <div className="w-full md:w-2/3 lg:w-3/5 overflow-hidden bg-muted/20">
              <ReportDetail 
                report={selectedReport} 
                onShare={handleShare} 
                user={user}
                onBackToList={isMobile ? handleBackToList : undefined}
              />
            </div>
          )}

          {/* Show empty state if no report is selected on desktop */}
          {!selectedReport && !isMobile && (
            <div className="w-full md:w-2/3 lg:w-3/5 overflow-hidden bg-muted/20 flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-xl font-semibold mb-2">Wybierz raport z listy</h2>
                <p className="text-muted-foreground">Zapoznaj się ze szczegółowymi analizami raportów finansowych</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
