
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp, TrendingDown, LineChart } from "lucide-react";

interface ReportAnalystReactionsProps {
  report: FinancialReport;
}

export const ReportAnalystReactions = ({ report }: ReportAnalystReactionsProps) => {
  if (!report.analystReactions || report.analystReactions.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Expert Analysis</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No analyst reactions available for this report.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Generate sentiment based on reactions
  const sentimentKeywords = {
    positive: ['growth', 'increase', 'improve', 'exceed', 'strong', 'positive', 'upgrade', 'outperform', 'buy', 'opportunity'],
    negative: ['decline', 'decrease', 'challenging', 'below', 'weak', 'negative', 'downgrade', 'underperform', 'sell', 'concern', 'risk'],
    neutral: ['maintain', 'stable', 'steady', 'in-line', 'expected', 'hold', 'neutral', 'market perform']
  };
  
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  
  report.analystReactions.forEach(reaction => {
    const lowerReaction = reaction.toLowerCase();
    
    let posMatches = 0;
    let negMatches = 0;
    let neuMatches = 0;
    
    sentimentKeywords.positive.forEach(word => {
      if (lowerReaction.includes(word)) posMatches++;
    });
    
    sentimentKeywords.negative.forEach(word => {
      if (lowerReaction.includes(word)) negMatches++;
    });
    
    sentimentKeywords.neutral.forEach(word => {
      if (lowerReaction.includes(word)) neuMatches++;
    });
    
    if (posMatches > negMatches && posMatches > neuMatches) {
      positiveCount++;
    } else if (negMatches > posMatches && negMatches > neuMatches) {
      negativeCount++;
    } else {
      neutralCount++;
    }
  });
  
  const totalReactions = report.analystReactions.length;
  const positivePct = Math.round((positiveCount / totalReactions) * 100);
  const negativePct = Math.round((negativeCount / totalReactions) * 100);
  const neutralPct = Math.round((neutralCount / totalReactions) * 100);
  
  const overallSentiment = positivePct > negativePct && positivePct > neutralPct ? 'Positive' :
                          negativePct > positivePct && negativePct > neutralPct ? 'Negative' : 'Neutral';
  
  const sentimentColor = overallSentiment === 'Positive' ? 'text-green-500' :
                        overallSentiment === 'Negative' ? 'text-red-500' : 'text-blue-500';
  
  const sentimentIcon = overallSentiment === 'Positive' ? <TrendingUp className="h-5 w-5 mr-2" /> :
                       overallSentiment === 'Negative' ? <TrendingDown className="h-5 w-5 mr-2" /> :
                       <LineChart className="h-5 w-5 mr-2" />;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Expert Analysis</h2>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Analyst Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <span className={`text-lg font-semibold flex items-center ${sentimentColor}`}>
              {sentimentIcon}
              {overallSentiment} ({positivePct}% positive, {neutralPct}% neutral, {negativePct}% negative)
            </span>
          </div>
          
          <div className="w-full bg-muted h-2 rounded-full mb-4">
            <div className="flex h-full rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: `${positivePct}%` }}></div>
              <div className="bg-blue-500 h-full" style={{ width: `${neutralPct}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${negativePct}%` }}></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mb-6">
            <span className="text-green-500">Positive</span>
            <span className="text-blue-500">Neutral</span>
            <span className="text-red-500">Negative</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {report.analystReactions.map((reaction, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="text-sm">"{reaction}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
