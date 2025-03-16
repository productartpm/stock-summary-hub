
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Search, ChevronRight, Lock } from 'lucide-react';
import { financialReports, type FinancialReport } from '@/lib/data';
import CompanyItem from '@/components/CompanyItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FinancialReportsListProps {
  onSelectReport: (report: FinancialReport) => void;
  selectedReportId: string | null;
  reports?: FinancialReport[];
}

const FinancialReportsList = ({ 
  onSelectReport, 
  selectedReportId,
  reports = financialReports
}: FinancialReportsListProps) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState<FinancialReport[]>([]);

  // Apply filters when dependencies change
  useEffect(() => {
    let results = [...reports];
    
    // Filter by report type
    if (filterType !== 'all') {
      results = results.filter(report => 
        report.reportType.toLowerCase() === filterType.toLowerCase()
      );
    }
    
    // Filter by search query (ticker)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(report => 
        report.ticker.toLowerCase().includes(query)
      );
    }
    
    setFilteredReports(results);
  }, [filterType, searchQuery, reports]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/60">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search by ticker symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs 
          defaultValue="all" 
          value={filterType} 
          onValueChange={setFilterType}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="quarterly" className="flex-1">Quarterly</TabsTrigger>
            <TabsTrigger value="annual" className="flex-1">Annual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto">
        {searchQuery && (
          <div className="px-4 py-2 bg-muted text-sm">
            Showing results for: <strong>{searchQuery}</strong>
          </div>
        )}
        
        {filteredReports.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <p>No reports found. Try adjusting your filters.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filteredReports.map((report) => (
              <li key={report.id} className="hover:bg-muted/50">
                <CompanyItem 
                  report={report} 
                  isSelected={selectedReportId === report.id}
                  onClick={() => onSelectReport(report)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FinancialReportsList;
