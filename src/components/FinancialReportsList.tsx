
import { useState } from 'react';
import CompanyItem from './CompanyItem';
import { financialReports } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FinancialReportsListProps {
  onSelectReport: (report: FinancialReport) => void;
  selectedReportId: string | null;
}

const FinancialReportsList = ({ onSelectReport, selectedReportId }: FinancialReportsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredReports = financialReports.filter(report => 
    report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-semibold mb-6">Financial Reports</h2>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-10 bg-secondary/50 border-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4 flex space-x-2">
          <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            All Reports
          </div>
          <div className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-full cursor-pointer hover:bg-secondary/80">
            Quarterly
          </div>
          <div className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-full cursor-pointer hover:bg-secondary/80">
            Annual
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <CompanyItem
              key={report.id}
              report={report}
              isSelected={report.id === selectedReportId}
              onClick={() => onSelectReport(report)}
            />
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No reports found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReportsList;
