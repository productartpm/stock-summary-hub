
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ReportHighlights } from './ReportHighlights';
import { ReportOutlook } from './ReportOutlook';
import { ReportAnalystReactions } from './ReportAnalystReactions';
import type { FinancialReport } from "@/lib/data";
import { useState } from 'react';

interface ReportMobileTabsProps {
  report: FinancialReport;
}

export const ReportMobileTabs = ({ report }: ReportMobileTabsProps) => {
  const [activeTab, setActiveTab] = useState('highlights');

  return (
    <Tabs defaultValue="highlights" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="highlights">Highlights</TabsTrigger>
        <TabsTrigger value="outlook">Outlook</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="highlights" className="space-y-4">
        <ReportHighlights report={report} />
      </TabsContent>

      <TabsContent value="outlook" className="space-y-4">
        <ReportOutlook report={report} />
      </TabsContent>

      <TabsContent value="analysis" className="space-y-4">
        <ReportAnalystReactions report={report} />
      </TabsContent>
    </Tabs>
  );
};
