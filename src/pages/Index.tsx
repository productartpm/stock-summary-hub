
import { useState } from 'react';
import FinancialReportsList from '@/components/FinancialReportsList';
import ReportDetail from '@/components/ReportDetail';
import { financialReports } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { ShareReport } from '@/components/ShareReport';

const Index = () => {
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShare = () => {
    setIsShareOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Stock Summary Hub</h1>
          <nav className="flex space-x-4 text-sm">
            <a href="#" className="text-primary">Reports</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Markets</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Watchlist</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Insights</a>
          </nav>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Left column: Company list - increased width from w-[400px] to w-[450px] */}
        <div className="w-full md:w-[450px] border-r border-border/60 overflow-hidden">
          <FinancialReportsList 
            onSelectReport={setSelectedReport} 
            selectedReportId={selectedReport?.id || null}
          />
        </div>
        
        {/* Right column: Report detail */}
        <div className="flex-1 overflow-hidden">
          <ReportDetail 
            report={selectedReport} 
            onShare={handleShare}
          />
        </div>
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
