import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Calendar, LineChart, Eye, Download, ExternalLink, BarChart3, TrendingUp, AlertTriangle, Info, PieChart, ArrowUpRight, DollarSign, Users, FileText, Target, Share2 } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart as RechartLineChart, Line, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PremiumContent } from '@/components/PremiumContent';

interface ReportDetailProps {
  report: FinancialReport | null;
  onShare?: () => void;
}

const ReportDetail = ({ report, onShare }: ReportDetailProps) => {
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

  // Example pie chart data for revenue distribution
  const revenueDistributionData = segmentRevenueData.map(item => ({
    name: item.name,
    value: item.value
  }));

  // Example data for quarterly comparison
  const quarterlyComparisonData = [
    { quarter: 'Q1 2023', revenue: 121.5, profit: 8.2, expenses: 113.3 },
    { quarter: 'Q2 2023', revenue: 140.2, profit: 12.4, expenses: 127.8 },
    { quarter: 'Q3 2023', revenue: 102.8, profit: -15.1, expenses: 117.9 },
    { quarter: 'Q4 2023', revenue: 115.3, profit: -23.4, expenses: 138.7 },
    { quarter: 'Q1 2024', revenue: 80.2, profit: -9.8, expenses: 90.0 },
    { quarter: 'Q2 2024', revenue: 72.5, profit: -6.5, expenses: 79.0 },
    { quarter: 'Q3 2024', revenue: 81.1, profit: -5.6, expenses: 86.7 },
  ];

  // Example employee data
  const employeeData = [
    { year: '2020', count: 248 },
    { year: '2021', count: 325 },
    { year: '2022', count: 412 },
    { year: '2023', count: 393 },
    { year: '2024 Q3', count: 379 },
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Premium content configuration
  const premiumContent = {
    experts: {
      title: "Expert Analysis",
      description: "Access detailed analyst insights, peer comparisons, and expert commentary on Columbus Energy's performance and outlook.",
      unlockPrice: "$7.99",
    },
    trends: {
      title: "Market Trends & Industry Insights",
      description: "Gain access to in-depth market analysis, industry comparisons, and technological trends affecting Columbus Energy.",
      unlockPrice: "$5.99",
    },
    future: {
      title: "Future Plans & Outlook",
      description: "Unlock Columbus Energy's strategic roadmap, including financial targets, expansion plans, and product development.",
      unlockPrice: "$5.99",
    }
  };

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
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </button>
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
          <Separator orientation="vertical" className="h-4" />
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{report.title}</span>
        </div>

        <Tabs defaultValue="summary" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="financial">Financial Data</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="future">Future Plans</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="experts">Expert Analysis</TabsTrigger>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  Key Highlights
                </h3>
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

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Report Focus Areas
                </h3>
                <div className="bg-secondary/40 rounded-lg p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {report.reportCategory.map((category, index) => (
                      <Badge key={index} variant="outline" className="bg-background/80">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This report primarily focuses on the company's {report.reportCategory.slice(0, 3).join(", ")} 
                    {report.reportCategory.length > 3 ? ` and ${report.reportCategory.length - 3} more areas` : ''}.
                  </p>
                </div>
              </div>
            </div>

            {report.outlook && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <ArrowUpRight className="h-5 w-5 mr-2 text-primary" />
                  Future Outlook
                </h3>
                <div className="bg-secondary/40 rounded-lg p-4">
                  <p className="text-sm mb-4">{report.outlook.statement}</p>
                  
                  {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Analyst Reactions
                </h3>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h4 className="font-medium mb-4">Quarterly Comparison</h4>
                <div className="h-72 w-full">
                  <ChartContainer 
                    config={{ 
                      revenue: { color: "#3b82f6" },
                      profit: { color: "#16a34a" },
                      expenses: { color: "#dc2626" }
                    }}
                  >
                    <BarChart data={quarterlyComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend content={<ChartLegendContent />} />
                      <Bar dataKey="revenue" name="Revenue" fill="var(--color-revenue)" />
                      <Bar dataKey="profit" name="Profit" fill="var(--color-profit)" />
                      <Bar dataKey="expenses" name="Expenses" fill="var(--color-expenses)" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <h4 className="font-medium mb-4">Key Financial Indicators - Year-over-Year Comparison</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h5 className="text-sm font-medium mb-2">Liquidity</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center">
                      <span>Current Ratio</span>
                      <span className="font-medium">1.42</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Quick Ratio</span>
                      <span className="font-medium">1.21</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Cash Ratio</span>
                      <span className="font-medium">0.18</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h5 className="text-sm font-medium mb-2">Debt</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center">
                      <span>Debt-to-Equity</span>
                      <span className="font-medium">1.85</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Interest Coverage</span>
                      <span className="font-medium">0.72</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Debt-to-Assets</span>
                      <span className="font-medium">0.64</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h5 className="text-sm font-medium mb-2">Efficiency</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center">
                      <span>Asset Turnover</span>
                      <span className="font-medium">0.38</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Inventory Turnover</span>
                      <span className="font-medium">6.2</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Receivables Turnover</span>
                      <span className="font-medium">4.7</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="segments" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Revenue by Segment</h3>
                <div className="h-72 w-full">
                  <ChartContainer>
                    <RechartPieChart>
                      <Pie
                        data={revenueDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {revenueDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPieChart>
                  </ChartContainer>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Segment Contribution</h4>
                  <ul className="space-y-2 text-xs">
                    {revenueDistributionData.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        <span className="flex-1">{item.name}</span>
                        <span className="font-medium">{(item.value / revenueDistributionData.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(1)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Segment Performance</h3>
                <div className="space-y-4">
                  {segmentRevenueData.map((segment, index) => (
                    <div key={index} className="bg-secondary/40 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="font-medium text-sm">{segment.name}</h5>
                        <span className={cn(
                          "text-xs font-medium",
                          segment.change >= 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {segment.change >= 0 ? "+" : ""}{segment.change}%
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold">{segment.value.toFixed(2)} mln PLN</span>
                        <div className="ml-auto flex items-center text-xs text-muted-foreground">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span>{(segment.value / segmentRevenueData.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(1)}% of total</span>
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            segment.change >= 0 ? "bg-green-500" : "bg-red-500"
                          )}
                          style={{ width: `${Math.abs(segment.change) / 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-sm mb-3">Key Observations</h4>
                  <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                    <li>Photovoltaic installations remain the largest revenue segment despite a significant decline.</li>
                    <li>Other sales showed exceptional growth of 506.5%, driven primarily by services related to energy storage project sold to DTEK.</li>
                    <li>Heat pumps segment experienced the most severe decline at -72.7%, reflecting market challenges.</li>
                    <li>Energy storage segment showed resilience relative to other core segments.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Poland</h4>
                  <div className="text-2xl font-semibold mb-1">89.7%</div>
                  <p className="text-xs text-muted-foreground">Primary market with established presence across all segments</p>
                </div>
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Czech Republic & Slovakia</h4>
                  <div className="text-2xl font-semibold mb-1">6.8%</div>
                  <p className="text-xs text-muted-foreground">Growing markets with focus on photovoltaic installations</p>
                </div>
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Ukraine & Other</h4>
                  <div className="text-2xl font-semibold mb-1">3.5%</div>
                  <p className="text-xs text-muted-foreground">Emerging opportunities with strategic investment focus</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <h3
