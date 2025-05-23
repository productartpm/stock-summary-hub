
import type { FinancialReport } from "@/lib/data";
import { formatNumber, formatPercentage } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, TrendingDown, Lightbulb, BadgePlus } from "lucide-react";

interface ReportHighlightsProps {
  report: FinancialReport;
}

export const ReportHighlights = ({ report }: ReportHighlightsProps) => {
  // Safely check if properties exist before accessing them
  const revenueChange = report.summaryData.revenue?.change ?? 0;
  const netIncomeChange = report.summaryData.netIncome?.change ?? 0;
  const operatingProfitChange = report.summaryData.operatingProfit?.change ?? 0;
  
  const positiveOutlook = (revenueChange > 0 || netIncomeChange > 0 || operatingProfitChange > 0);
  const sentiment = report.reportSummary?.sentiment || 'neutral';

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Kluczowe Informacje</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Najważniejsze punkty raportu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {report.keyHighlights?.map((highlight, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-amber-500 flex-shrink-0 mt-1">
                  <BadgePlus className="h-4 w-4" />
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className={`mb-4 ${sentiment === 'positive' ? 'border-l-green-500' : sentiment === 'negative' ? 'border-l-red-500' : 'border-l-amber-500'} border-l-4`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            {sentiment === 'positive' ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : sentiment === 'negative' ? (
              <TrendingDown className="h-5 w-5 text-red-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            Podsumowanie raportu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{report.reportSummary?.text || 'Brak podsumowania.'}</p>
          
          {report.analystReactions && report.analystReactions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-2">Reakcje analityków:</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {report.analystReactions.map((reaction, index) => (
                  <li key={index}>{reaction}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
