
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Search, ChevronRight, Lock, Filter } from 'lucide-react';
import { financialReports, type FinancialReport, reportCategories } from '@/lib/data';
import CompanyItem from '@/components/CompanyItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState<FinancialReport[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  // Apply filters when dependencies change
  useEffect(() => {
    let results = [...reports];
    
    // Filter by report type
    if (filterType !== 'all') {
      results = results.filter(report => 
        report.reportType.toLowerCase() === filterType.toLowerCase()
      );
    }
    
    // Filter by category
    if (filterCategory !== 'all') {
      results = results.filter(report => 
        report.category === filterCategory
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
  }, [filterType, filterCategory, searchQuery, reports]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/60">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Szukaj po symbolu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Tabs 
            defaultValue="all" 
            value={filterType} 
            onValueChange={setFilterType}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="all" className="px-3">Wszystkie</TabsTrigger>
              <TabsTrigger value="quarterly" className="px-3">Kwartalne</TabsTrigger>
              <TabsTrigger value="annual" className="px-3">Roczne</TabsTrigger>
            </TabsList>
          </Tabs>

          <Popover open={showCategoryFilter} onOpenChange={setShowCategoryFilter}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Kategoria
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="end">
              <div className="p-2 max-h-[300px] overflow-y-auto">
                <div 
                  className={`px-2 py-1.5 rounded cursor-pointer mb-1 ${filterCategory === 'all' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  onClick={() => {
                    setFilterCategory('all');
                    setShowCategoryFilter(false);
                  }}
                >
                  Wszystkie kategorie
                </div>
                {reportCategories.map((category) => (
                  <div 
                    key={category}
                    className={`px-2 py-1.5 rounded cursor-pointer mb-1 ${filterCategory === category ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    onClick={() => {
                      setFilterCategory(category);
                      setShowCategoryFilter(false);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {filterCategory !== 'all' && (
          <div className="flex items-center mb-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              {filterCategory}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => setFilterCategory('all')}
              >
                <span className="sr-only">Usuń filtr</span>
                &times;
              </Button>
            </Badge>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {searchQuery && (
          <div className="px-4 py-2 bg-muted text-sm">
            Wyniki dla: <strong>{searchQuery}</strong>
          </div>
        )}
        
        {filteredReports.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <p>Nie znaleziono raportów. Spróbuj dostosować filtry.</p>
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
