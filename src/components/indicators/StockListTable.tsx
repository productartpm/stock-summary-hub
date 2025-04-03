
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown } from 'lucide-react';

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

const StockListTable = ({ stocks, showIndicator = false, indicatorLabel = 'Indicator' }: StockListTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Spółka</TableHead>
          <TableHead>Ticker</TableHead>
          <TableHead className="text-right">Cena</TableHead>
          <TableHead className="text-right">Zmiana</TableHead>
          {showIndicator && <TableHead className="text-right">{indicatorLabel}</TableHead>}
          <TableHead className="text-right">Wolumen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell className="font-medium">{stock.name}</TableCell>
            <TableCell>{stock.ticker}</TableCell>
            <TableCell className="text-right">{stock.price.toFixed(2)} PLN</TableCell>
            <TableCell className="text-right">
              <span className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 
                  ? <ArrowUp className="mr-1 h-4 w-4" /> 
                  : <ArrowDown className="mr-1 h-4 w-4" />}
                {Math.abs(stock.change).toFixed(2)}%
              </span>
            </TableCell>
            {showIndicator && 
              <TableCell className="text-right">{stock.indicator?.toFixed(2)}</TableCell>
            }
            <TableCell className="text-right">{(stock.volume / 1000).toFixed(0)}k</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockListTable;
