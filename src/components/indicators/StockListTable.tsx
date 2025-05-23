
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface StockWithIndicator {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  volume: number;
  indicator?: number;
}

interface StockListTableProps {
  stocks: StockWithIndicator[];
  showIndicator?: boolean;
  indicatorLabel?: string;
}

// Lista polskich spółek - tylko te pozostaną
const polishCompanies = [
  'PKO BP', 'Bank Pekao', 'KGHM', 'JSW', 'Orlen', 'PZU', 'Cyfrowy Polsat', 
  'Santander Bank Polska', 'Orange Polska', 'PGE', 'Alior Bank', 'Dino', 
  'LPP', 'Allegro', 'CD Projekt', 'mBank', 'PGNiG', 'Tauron', 'Lotos'
];

const StockListTable = ({ stocks, showIndicator = false, indicatorLabel = 'Indicator' }: StockListTableProps) => {
  // Filtrujemy i zostawiamy tylko polskie spółki
  const polishStocks = stocks.filter(stock => 
    polishCompanies.some(company => stock.name.includes(company))
  );

  // Sort stocks by change percentage (descending for gains, ascending for losses)
  const sortedStocks = [...polishStocks].sort((a, b) => {
    if (indicatorLabel.includes('wzrost') || indicatorLabel.includes('kupno') || indicatorLabel.includes('krzyż')) {
      return b.change - a.change; // Highest gains first
    } else if (indicatorLabel.includes('spadk') || indicatorLabel.includes('sprzedaż') || indicatorLabel.includes('śmierci')) {
      return a.change - b.change; // Highest losses first
    }
    return b.change - a.change; // Default to gains first
  });

  const getChangeColor = (change: number) => {
    if (change >= 0) return 'text-green-600 dark:text-green-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getVolumeDisplay = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)}k`;
    }
    return volume.toString();
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      {sortedStocks.length > 0 && (
        <div className="px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Polskie spółki
              </span>
            </div>
            <Badge variant="secondary">
              {sortedStocks.length} {sortedStocks.length === 1 ? 'spółka' : 'spółek'}
            </Badge>
          </div>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="font-semibold">Spółka</TableHead>
            <TableHead className="font-semibold">Ticker</TableHead>
            <TableHead className="text-right font-semibold">Cena</TableHead>
            <TableHead className="text-right font-semibold">Zmiana</TableHead>
            {showIndicator && (
              <TableHead className="text-right font-semibold">{indicatorLabel}</TableHead>
            )}
            <TableHead className="text-right font-semibold">Wolumen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStocks.length > 0 ? (
            sortedStocks.map((stock, index) => (
              <TableRow 
                key={stock.id} 
                className="hover:bg-muted/50 transition-colors duration-150"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono w-6">
                      #{index + 1}
                    </span>
                    <span className="text-foreground">{stock.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {stock.ticker}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  <span className="text-foreground font-medium">
                    {stock.price.toFixed(2)} PLN
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className={`flex items-center justify-end gap-1 ${getChangeColor(stock.change)}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span className="font-mono font-medium">
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </span>
                  </div>
                </TableCell>
                {showIndicator && (
                  <TableCell className="text-right">
                    <span className="font-mono text-sm text-foreground">
                      {stock.indicator?.toFixed(2)}
                    </span>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  <span className="font-mono text-sm text-muted-foreground">
                    {getVolumeDisplay(stock.volume)}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell 
                colSpan={showIndicator ? 6 : 5} 
                className="text-center py-8"
              >
                <div className="flex flex-col items-center gap-2">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Brak danych dla polskich spółek w tej kategorii
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockListTable;
