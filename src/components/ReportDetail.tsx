
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Calendar, LineChart, Eye, Download, ExternalLink } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ReportDetailProps {
  report: FinancialReport | null;
}

const ReportDetail = ({ report }: ReportDetailProps) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(false);
    if (report) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [report]);

  if (!report) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <LineChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" strokeWidth={1} />
          <h3 className="text-lg font-medium mb-2">No Report Selected</h3>
          <p className="text-muted-foreground text-sm">
            Select a company from the list to view their financial report summary.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full overflow-y-auto p-6 transition-opacity duration-300",
      loaded ? "opacity-100" : "opacity-0"
    )}>
      <div className="animate-slide-in-right">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 mr-3">
              <img 
                src={report.logoUrl} 
                alt={`${report.companyName} logo`} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{report.companyName}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-mono">{report.ticker}</span>
                <span className="mx-2">•</span>
                <span>{report.reportType} {report.quarterOrYear}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Download className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6 bg-secondary/40 rounded-lg p-4 flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Published on {new Date(report.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(report.summaryData).map(([key, data]) => {
            const isPositive = data.change >= 0;
            let label = key;
            
            if (key === 'eps') label = 'EPS';
            else if (key === 'ebitda') label = 'EBITDA';
            else label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            
            return (
              <div key={key} className="bg-card rounded-lg p-5 border border-border/60">
                <div className="text-muted-foreground text-sm mb-1">{label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-semibold">
                    {formatNumber(data.value, data.unit)}
                  </div>
                  <div className={cn(
                    "flex items-center text-sm",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}>
                    {isPositive ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                    {formatPercentage(data.change)}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Year-over-year change</div>
              </div>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Key Highlights</h3>
          <ul className="space-y-2">
            {report.keyHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {report.outlook && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Future Outlook</h3>
            <div className="bg-secondary/40 rounded-lg p-4">
              <p className="text-sm mb-4">{report.outlook.statement}</p>
              
              {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {report.outlook.guidanceRevenue && (
                    <div className="bg-card rounded-lg p-3 border border-border/60">
                      <div className="text-muted-foreground text-xs">Revenue Guidance</div>
                      <div className="flex items-end justify-between mt-1">
                        <div className="text-base font-medium">
                          {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {report.outlook.guidanceEps && (
                    <div className="bg-card rounded-lg p-3 border border-border/60">
                      <div className="text-muted-foreground text-xs">EPS Guidance</div>
                      <div className="flex items-end justify-between mt-1">
                        <div className="text-base font-medium">
                          {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {report.analystReactions && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Analyst Reactions</h3>
            <div className="space-y-3">
              {report.analystReactions.map((reaction, index) => (
                <div key={index} className="bg-card rounded-lg p-4 border border-border/60">
                  <p className="text-sm">{reaction}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-6" />
        
        <div className="text-sm text-muted-foreground mb-8">
          <p>This summary is generated for informational purposes only and should not be considered as investment advice.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
