
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X, Building2 } from 'lucide-react';
import { financialReports, type FinancialReport, reportCategories } from '@/lib/data';
import CompanyItem from '@/components/CompanyItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';

const polishCompanies = [
  'PKO BP', 'Bank Pekao', 'KGHM', 'JSW', 'Orlen', 'PZU', 'Cyfrowy Polsat', 
  'Santander Bank Polska', 'Orange Polska', 'PGE', 'Alior Bank', 'Dino', 
  'LPP', 'Allegro', 'CD Projekt', 'mBank', 'PGNiG', 'Tauron', 'Lotos'
];

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
  const polishReports = reports.filter(report => 
    polishCompanies.some(company => report.companyName.includes(company))
  );
  
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState<FinancialReport[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let results = [...polishReports];
    
    if (filterType !== 'all') {
      results = results.filter(report => 
        report.reportType.toLowerCase() === filterType.toLowerCase()
      );
    }
    
    if (filterCategory !== 'all') {
      results = results.filter(report => 
        report.category === filterCategory
      );
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(report => 
        report.ticker.toLowerCase().includes(query) ||
        report.companyName.toLowerCase().includes(query)
      );
    }
    
    // Sort by date (newest first) and then by company name
    results.sort((a, b) => {
      const dateComparison = new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      if (dateComparison !== 0) return dateComparison;
      return a.companyName.localeCompare(b.companyName, 'pl');
    });
    
    setFilteredReports(results);
  }, [filterType, filterCategory, searchQuery, polishReports]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const hasActiveFilters = filterType !== 'all' || filterCategory !== 'all' || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setFilterType('all');
    setFilterCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header with improved styling */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Raporty finansowe</h2>
          <Badge variant="secondary" className="ml-auto">
            {filteredReports.length}
          </Badge>
        </div>

        {/* Search with clear button */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 pr-10 bg-background"
              placeholder="Szukaj po symbolu lub nazwie spółki..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter tabs with improved styling */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <Tabs 
            defaultValue="all" 
            value={filterType} 
            onValueChange={setFilterType}
            className="w-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="all" className="text-xs sm:text-sm px-3">
                Wszystkie
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="text-xs sm:text-sm px-3">
                Kwartalne
              </TabsTrigger>
              <TabsTrigger value="annual" className="text-xs sm:text-sm px-3">
                Roczne
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Wyczyść
              </Button>
            )}
            
            <Popover open={showCategoryFilter} onOpenChange={setShowCategoryFilter}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Kategoria
                  {filterCategory !== 'all' && (
                    <Badge variant="secondary" className="ml-2">1</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="end">
                <div className="p-2 max-h-[300px] overflow-y-auto">
                  <div 
                    className={`px-3 py-2 rounded cursor-pointer mb-1 transition-colors ${
                      filterCategory === 'all' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
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
                      className={`px-3 py-2 rounded cursor-pointer mb-1 transition-colors ${
                        filterCategory === category 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
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
        </div>

        {/* Active filters display */}
        {(filterCategory !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Szukaj: "{searchQuery}"
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent" 
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filterCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filterCategory}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent" 
                  onClick={() => setFilterCategory('all')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results section */}
      <div className="flex-1 overflow-y-auto">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Brak raportów</h3>
            <p className="text-muted-foreground">
              {hasActiveFilters 
                ? "Nie znaleziono raportów spełniających kryteria wyszukiwania."
                : "Brak dostępnych raportów finansowych."
              }
            </p>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={clearAllFilters}
              >
                Wyczyść filtry
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`list-item-hover ${
                  selectedReportId === report.id ? 'active-item' : ''
                }`}
              >
                <CompanyItem 
                  report={report} 
                  isSelected={selectedReportId === report.id}
                  onClick={() => onSelectReport(report)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReportsList;
