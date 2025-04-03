
import { useState } from "react";
import { Header } from "@/components/Header";
import FinancialReportsList from "@/components/FinancialReportsList";
import ReportDetail from "@/components/ReportDetail";
import { type FinancialReport } from "@/lib/data";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { user } = useAuth();

  const handleSelectReport = (report: FinancialReport) => {
    setSelectedReport(report);
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab="home" />
      <main className="flex-1 p-0 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          <div className="w-full md:w-1/3 lg:w-2/5 border-r border-border/60 overflow-hidden flex flex-col">
            <FinancialReportsList 
              onSelectReport={handleSelectReport} 
              selectedReportId={selectedReport?.id || null} 
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/5 overflow-hidden bg-muted/20">
            <ReportDetail 
              report={selectedReport} 
              onShare={handleShare} 
              user={user}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
