
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X, Building2, Star, TrendingUp, Clock } from 'lucide-react';
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
  const [sortBy, setSortBy] = useState<'date' | 'company' | 'performance'>('date');
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
    
    // Enhanced sorting options
    results.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
        case 'company':
          return a.companyName.localeCompare(b.companyName, 'pl');
        case 'performance':
          const aPerformance = a.summaryData?.revenue?.change || 0;
          const bPerformance = b.summaryData?.revenue?.change || 0;
          return bPerformance - aPerformance;
        default:
          return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
      }
    });
    
    setFilteredReports(results);
  }, [filterType, filterCategory, searchQuery, sortBy, polishReports]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const hasActiveFilters = filterType !== 'all' || filterCategory !== 'all' || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setFilterType('all');
    setFilterCategory('all');
    setSearchQuery('');
    setSortBy('date');
  };

  const getReportIcon = (report: FinancialReport) => {
    if (report.premium) return <Star className="h-3 w-3 text-amber-500" />;
    return <TrendingUp className="h-3 w-3 text-emerald-500" />;
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Enhanced Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Raporty finansowe
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Polskie spółki giełdowe
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {filteredReports.length}
          </Badge>
        </div>

        {/* Enhanced Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              className="pl-10 pr-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Szukaj po symbolu lub nazwie spółki..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-600"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <Tabs 
            defaultValue="all" 
            value={filterType} 
            onValueChange={setFilterType}
            className="w-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-700">
              <TabsTrigger 
                value="all" 
                className="text-xs sm:text-sm px-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Wszystkie
              </TabsTrigger>
              <TabsTrigger 
                value="quarterly" 
                className="text-xs sm:text-sm px-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Kwartalne
              </TabsTrigger>
              <TabsTrigger 
                value="annual" 
                className="text-xs sm:text-sm px-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Roczne
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            {/* Sort Options */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center border-slate-200 dark:border-slate-600"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Sortuj
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" align="end">
                <div className="p-2">
                  {[
                    { value: 'date', label: 'Data publikacji', icon: Clock },
                    { value: 'company', label: 'Nazwa spółki', icon: Building2 },
                    { value: 'performance', label: 'Wyniki', icon: TrendingUp }
                  ].map((option) => (
                    <div 
                      key={option.value}
                      className={`px-3 py-2 rounded cursor-pointer mb-1 transition-colors flex items-center gap-2 ${
                        sortBy === option.value 
                          ? 'bg-blue-500 text-white' 
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => setSortBy(option.value as any)}
                    >
                      <option.icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearAllFilters}
                className="text-xs border-slate-200 dark:border-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
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
                  className="flex items-center border-slate-200 dark:border-slate-600"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Kategoria
                  {filterCategory !== 'all' && (
                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">1</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700" align="end">
                <div className="p-2 max-h-[300px] overflow-y-auto">
                  <div 
                    className={`px-3 py-2 rounded cursor-pointer mb-1 transition-colors ${
                      filterCategory === 'all' 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
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
                          ? 'bg-blue-500 text-white' 
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
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

        {/* Enhanced Active filters display */}
        {(filterCategory !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
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
              <Badge variant="secondary" className="flex items-center gap-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
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

      {/* Enhanced Results section */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center">
            <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">Brak raportów</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {hasActiveFilters 
                ? "Nie znaleziono raportów spełniających kryteria wyszukiwania."
                : "Brak dostępnych raportów finansowych."
              }
            </p>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                className="mt-4 border-slate-200 dark:border-slate-600"
                onClick={clearAllFilters}
              >
                Wyczyść filtry
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                className={`relative transition-colors duration-150 ${
                  selectedReportId === report.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' 
                    : 'hover:bg-white dark:hover:bg-slate-800 cursor-pointer'
                }`}
              >
                <div className="absolute left-4 top-4 flex items-center gap-2 z-10">
                  <div className="bg-slate-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </div>
                  {getReportIcon(report)}
                </div>
                <div className="pl-16">
                  <CompanyItem 
                    report={report} 
                    isSelected={selectedReportId === report.id}
                    onClick={() => onSelectReport(report)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReportsList;
