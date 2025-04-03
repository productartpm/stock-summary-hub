
import React from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import StockListTable, { StockWithIndicator } from './StockListTable';

interface IndicatorTabContentProps {
  tabValue: string;
  title: string;
  description: string;
  stocks: StockWithIndicator[];
  showIndicator?: boolean;
  indicatorLabel?: string;
  formattedDate: string;
}

const IndicatorTabContent = ({ 
  tabValue, 
  title, 
  description, 
  stocks,
  showIndicator = false,
  indicatorLabel = 'Indicator',
  formattedDate
}: IndicatorTabContentProps) => {
  return (
    <TabsContent value={tabValue} className="space-y-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description.includes('{formattedDate}') 
            ? description.replace('{formattedDate}', formattedDate)
            : description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StockListTable 
          stocks={stocks} 
          showIndicator={showIndicator} 
          indicatorLabel={indicatorLabel} 
        />
      </CardContent>
    </TabsContent>
  );
};

export default IndicatorTabContent;
