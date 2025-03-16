
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Calendar, LineChart, Eye, Download, ExternalLink, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart as RechartLineChart, Line, BarChart, Bar } from 'recharts';

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

  // Example quarterly data for charts
  const quarterlyRevenueData = [
    { quarter: 'Q1 2023', value: 121.5 },
    { quarter: 'Q2 2023', value: 140.2 },
    { quarter: 'Q3 2023', value: 102.8 },
    { quarter: 'Q4 2023', value: 115.3 },
    { quarter: 'Q1 2024', value: 80.2 },
    { quarter: 'Q2 2024', value: 72.5 },
    { quarter: 'Q3 2024', value: 81.1 },
  ];
  
  // Example segmented revenue data
  const segmentRevenueData = [
    { name: 'Fotowoltaika', value: 135.38, change: -44.7 },
    { name: 'Obrót energią', value: 20.03, change: -53.4 },
    { name: 'Pompy ciepła', value: 5.68, change: -72.7 },
    { name: 'Magazyny energii', value: 23.08, change: -44.9 },
    { name: 'Pozostałe', value: 48.45, change: 506.5 },
  ];

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

        <Tabs defaultValue="summary" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="financial">Financial Data</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="future">Future Plans</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="financial" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <h3 className="text-lg font-semibold mb-4">Quarterly Financial Report - Columbus Energy Q3 2024</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Financial information for Columbus Energy Group for 9 months ending September 30, 2024, compared to the same period of the previous year.
              </p>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Revenue</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Net revenue (9M 2024)</span>
                    <span className="font-medium">233.857 million PLN</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Compared to 9M 2023 (364.536 million PLN)</span>
                    <span className="font-medium text-red-500">-35.85%</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Revenue Sources</h4>
                <div className="h-72 w-full">
                  <ChartContainer 
                    config={{ 
                      positive: { color: "#16a34a" },
                      negative: { color: "#dc2626" } 
                    }}
                  >
                    <BarChart data={segmentRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="value" 
                        fill="var(--color-positive)" 
                        name="Revenue (mln PLN)" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
                <ul className="space-y-2 text-sm mt-4">
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Photovoltaic installations</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">135.383 mln PLN</span>
                      <span className="text-red-500">-44.7%</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Electricity trading</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">20.027 mln PLN</span>
                      <span className="text-red-500">-53.4%</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Heat pumps</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">5.679 mln PLN</span>
                      <span className="text-red-500">-72.7%</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Energy storage</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">23.081 mln PLN</span>
                      <span className="text-red-500">-44.9%</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Other sales</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">48.451 mln PLN</span>
                      <span className="text-green-500">+506.5%</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Operating Costs</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Total operating costs (9M 2024)</span>
                    <span className="font-medium">223.475 million PLN</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Compared to 9M 2023 (334.438 million PLN)</span>
                    <span className="font-medium text-green-500">-33.18%</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Profitability</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Operating profit (9M 2024)</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">10.382 mln PLN</span>
                      <span className="text-green-500">(vs -30.098 mln PLN in 9M 2023)</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Net loss (9M 2024)</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">-21.957 mln PLN</span>
                      <span className="text-green-500">(vs -59.939 mln PLN in 9M 2023)</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>EBITDA (9M 2024)</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">20.878 mln PLN</span>
                      <span className="text-green-500">(vs -19.668 mln PLN in 9M 2023)</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Operating margin</span>
                    <span className="font-medium">4.44% (vs -8.26% in 9M 2023)</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>EBITDA margin</span>
                    <span className="font-medium">8.93% (vs -5.39% in 9M 2023)</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-border/30 pb-2">
                    <span>Net margin</span>
                    <span className="font-medium">-9.39% (vs -16.44% in 9M 2023)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <h4 className="font-medium mb-4">Revenue Trend (Quarterly)</h4>
              <div className="h-72 w-full">
                <ChartContainer 
                  config={{ 
                    revenue: { color: "#3b82f6" },
                  }}
                >
                  <RechartLineChart data={quarterlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="var(--color-revenue)" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      name="Revenue (mln PLN)"
                    />
                  </RechartLineChart>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-semibold">Business Segments Trends</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Revenue Changes by Segment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  All main business segments (photovoltaic installations, energy trading, heat pumps, energy storage) 
                  recorded a decrease in revenue compared to the previous year. Only "Other sales revenue" increased.
                </p>
                <div className="space-y-3">
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Key factors affecting these changes:</h5>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Focus on the implementation of the "Clean Air" program</li>
                      <li>Consolidation of the renewable energy market through Columbus ONE</li>
                      <li>The increase in "Other sales revenue" in 2024 is largely related to revenues of 39.080 thousand PLN 
                      from the provision of services related to building the value of commercialized assets (energy storage project sold to DTEK)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Market Changes</h4>
                <div className="space-y-3">
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Key market trends:</h5>
                    <p className="text-sm">
                      The report mentions the need for consolidation and professionalization of the energy transformation 
                      and thermomodernization market in Poland, which is reflected in the establishment of Columbus ONE.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h5 className="font-medium mb-2">Significant regulations and consumer behavior changes:</h5>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Significant changes in the "Clean Air" subsidy program, including the suspension of new applications 
                      by the National Fund for Environmental Protection and Water Management, which forced the company to react 
                      by establishing Columbus ONE</li>
                      <li>The report also mentions the implementation of the ESRS standard in the ESG area</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="future" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <div className="flex items-center mb-3">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-semibold">Short-term Plans (next 12 months)</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Expansion, cost optimization, new products:</h4>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Consolidation of the renewable energy market through Columbus ONE, integration of companies and sales teams</li>
                  <li>Development of the basic offer (photovoltaics, energy storage, heat pumps)</li>
                  <li>Implementation of the innovative Columbus Intelligence service for synchronization of energy devices</li>
                  <li>Continuation of activities in the field of large-scale investments (construction and sale of photovoltaic farms and energy storage)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Planned investments:</h4>
                <p className="text-sm text-muted-foreground">
                  The report does not specify specific investments, but it can be concluded that investments will focus on the development of Columbus ONE 
                  and Columbus Intelligence, as well as large-scale projects.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <div className="flex items-center mb-3">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-semibold">Long-term Plans (2-3 years)</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Market expansion strategy:</h4>
                <p className="text-sm">
                  Continuation of growth strategy in Poland and abroad. Development of activities in the Czech Republic, Slovakia and Ukraine.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Planned changes in product/service portfolio:</h4>
                <p className="text-sm">
                  Expansion of the Columbus ecosystem, based on three pillars: energy transformation of homes and businesses, 
                  implementation of large-scale investments and implementation of technological innovations. 
                  Development of Columbus Intelligence as a new service.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Digitization, automation, new technologies:</h4>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Development of Columbus Intelligence as an IT solution in energy, using algorithms and AI models for energy management</li>
                  <li>Development of perovskite technologies through shares in Saule Technologies</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risks" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                <h3 className="text-lg font-semibold">Macroeconomic Risks</h3>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Inflation, exchange rates, regulatory changes, industry condition:</h4>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Risk related to inflation, changes in exchange rates (especially EUR)</li>
                  <li>Changes in legal regulations (e.g., "Clean Air" program)</li>
                  <li>General condition of the renewable energy industry in Poland and Europe</li>
                  <li>Suspension of the "Clean Air" program poses a significant short-term risk</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                <h3 className="text-lg font-semibold">Operational Risks</h3>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Infrastructure investments, project delay risks:</h4>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Risk related to the implementation of large-scale projects of photovoltaic farms and energy storage, including project delays</li>
                  <li>Problems with obtaining connection conditions</li>
                  <li>Operational risk related to the construction and maintenance of farms</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-500" />
                <h3 className="text-lg font-semibold">Financial Risks</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Possibility of having to raise additional financing:</h4>
                <p className="text-sm">
                  Financial liquidity risk and the need to obtain external financing, especially in the context of debt to DC24 ASI sp. z o.o. 
                  and the need for refinancing.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Impact of rising costs on profitability:</h4>
                <p className="text-sm">
                  Risk of increases in financing costs, operating costs (materials, services, wages) and their impact on the Group's profitability.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 mr-2 text-purple-500" />
                <h3 className="text-lg font-semibold">Competitive Risks</h3>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Increasing competition, technological changes, emergence of new players:</h4>
                <p className="text-sm">
                  Risk related to growing competition in the renewable energy market, technological changes (e.g., development of perovskite technologies) 
                  and the emergence of new players in the market.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6" />
        
        <div className="text-sm text-muted-foreground mb-8">
          <p>This summary is generated for informational purposes only and should not be considered as investment advice.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
