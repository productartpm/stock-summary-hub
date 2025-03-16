
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Calendar, LineChart, Eye, Download, ExternalLink, BarChart3, TrendingUp, AlertTriangle, Info, PieChart, ArrowUpRight, DollarSign, Users, FileText, Target, Share2 } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart as RechartLineChart, Line, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PremiumContent } from '@/components/PremiumContent';
import { ShareOptions } from '@/lib/types';

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
  
  // Chart configurations
  const chartConfig: ChartConfig = {
    positive: { color: "#16a34a" },
    negative: { color: "#dc2626" },
    revenue: { color: "#3b82f6" },
    profit: { color: "#16a34a" },
    expenses: { color: "#dc2626" },
    employees: { color: "#8884d8" }
  };
  
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

  // Share options
  const shareOptions: ShareOptions = {
    url: window.location.href,
    title: `${report.companyName} ${report.reportType} Report ${report.quarterOrYear}`,
    description: `Check out the latest financial report for ${report.companyName}. Key highlights: ${report.keyHighlights[0]}`
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
                    config={chartConfig}
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
                    config={chartConfig}
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
                    config={chartConfig}
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
                  <ChartContainer 
                    config={chartConfig}
                  >
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
              <h3 className="text-lg font-semibold mb-4">Workforce Analytics</h3>
              <div className="h-72 w-full mb-6">
                <ChartContainer 
                  config={chartConfig}
                >
                  <BarChart data={employeeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Employees" fill="var(--color-employees)" />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Key Workforce Metrics</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center">
                      <span>Total Employees (Q3 2024)</span>
                      <span className="font-medium">379</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Change YoY</span>
                      <span className="font-medium text-red-500">-3.6%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Revenue per Employee</span>
                      <span className="font-medium">616,500 PLN</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Workforce Distribution</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center">
                      <span>Sales & Installation</span>
                      <span className="font-medium">58%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>R&D and Technical</span>
                      <span className="font-medium">22%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Administrative & Management</span>
                      <span className="font-medium">20%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-4">
            {report.premium ? (
              <PremiumContent {...premiumContent.trends} />
            ) : (
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Market Trends Overview</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-medium">Renewable Energy Market Trends</h4>
                      </div>
                      <p className="text-sm">
                        The Polish renewable energy market has experienced a significant slowdown in 2024, with installations of new photovoltaic capacity decreasing by approximately 30% compared to the record-breaking 2023. This trend is primarily attributed to regulatory changes, including modifications to the "Mój Prąd" and "Czyste Powietrze" programs, as well as market saturation in some segments.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <BarChart3 className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-medium">Heat Pump Market Dynamics</h4>
                      </div>
                      <p className="text-sm">
                        The heat pump market in Poland has contracted by over 60% in 2024 compared to 2023, which is reflected in Columbus Energy's significantly reduced revenues in this segment (-72.7%). This decline is largely due to the temporary suspension of the "Czyste Powietrze" program, which previously provided substantial subsidies for heat pump installations.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <PieChart className="h-5 w-5 text-primary mr-2" />
                        <h4 className="font-medium">Energy Storage Growth</h4>
                      </div>
                      <p className="text-sm">
                        Despite the overall market challenges, the energy storage sector continues to show resilience and growth potential. Columbus Energy's energy storage segment revenue has declined less than other segments, and the company has successfully executed a significant energy storage project sale to DTEK, contributing to the exceptional growth in "Other sales" revenue.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Industry Benchmarking</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Market Share</h4>
                      <div className="text-2xl font-semibold mb-1">18.3%</div>
                      <p className="text-xs text-muted-foreground">Estimated market share in Polish renewable energy market</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Industry Ranking</h4>
                      <div className="text-2xl font-semibold mb-1">#2</div>
                      <p className="text-xs text-muted-foreground">Position among renewable energy providers in Poland</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Peer Comparison</h4>
                      <div className="text-2xl font-semibold mb-1">+4.2%</div>
                      <p className="text-xs text-muted-foreground">EBITDA margin relative to industry average</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Competition Overview</h4>
                      <p className="text-sm">
                        Columbus Energy faces intensifying competition in the Polish renewable energy market, with both local and international players expanding their presence. Key competitors include Polenergia, Tauron, and several smaller specialized providers. The company's strategic response includes the consolidation of the market through Columbus ONE, which aims to integrate smaller installation companies under a unified brand.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Technological Edge</h4>
                      <p className="text-sm">
                        Columbus Energy maintains a technological advantage through its investment in Saule Technologies (perovskite solar cells) and the development of Columbus Intelligence, an AI-driven energy management platform. These innovations position the company well for future growth as the market evolves beyond basic installation services toward integrated energy solutions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Regulatory Environment</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">"Czyste Powietrze" Program Changes</h4>
                      <p className="text-sm">
                        The temporary suspension of the "Czyste Powietrze" program by Poland's National Fund for Environmental Protection and Water Management (NFOŚiGW) has significantly impacted the market for heat pumps and other renewable energy solutions. Columbus Energy has responded by establishing Columbus ONE to navigate these regulatory challenges and maintain market presence during this transitional period.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">EU Green Deal Impact</h4>
                      <p className="text-sm">
                        The European Union's Green Deal and Fit for 55 package continue to provide a supportive long-term regulatory framework for renewable energy companies like Columbus Energy. These initiatives include ambitious targets for reducing greenhouse gas emissions and increasing renewable energy capacity, which should drive demand for the company's products and services in the medium to long term.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">ESG Reporting Requirements</h4>
                      <p className="text-sm">
                        Columbus Energy is preparing for the implementation of the European Sustainability Reporting Standards (ESRS), which will require more comprehensive environmental, social, and governance (ESG) disclosures. The company views this not only as a compliance requirement but also as an opportunity to highlight its positive environmental impact and strengthen its market position.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="future" className="mt-4">
            {report.premium ? (
              <PremiumContent {...premiumContent.future} />
            ) : (
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Strategic Initiatives</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Columbus ONE Market Consolidation</h4>
                          <p className="text-sm text-muted-foreground">
                            The company is actively pursuing market consolidation through Columbus ONE, which aims to integrate smaller installation companies under a unified brand. This initiative is designed to improve operational efficiency, expand market reach, and strengthen Columbus Energy's position as a market leader in renewable energy solutions.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Columbus Intelligence Platform</h4>
                          <p className="text-sm text-muted-foreground">
                            Development and commercialization of Columbus Intelligence, an AI-driven energy management platform that synchronizes all energy devices in a household or business. This innovative solution aims to optimize energy usage, reduce costs, and provide a seamless user experience. The platform is expected to create a new revenue stream with higher margins than traditional installation services.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Large-Scale Project Development</h4>
                          <p className="text-sm text-muted-foreground">
                            Continued focus on developing and selling large-scale projects, including photovoltaic farms and energy storage systems. The successful sale of an energy storage project to DTEK has demonstrated the company's capabilities in this area and contributed significantly to revenue in the "Other sales" category.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Geographic Expansion</h4>
                          <p className="text-sm text-muted-foreground">
                            Continued expansion in Central and Eastern European markets, with a particular focus on the Czech Republic, Slovakia, and Ukraine. These markets offer growth opportunities due to increasing demand for renewable energy solutions and supportive regulatory frameworks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Financial Targets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Revenue Growth Target</h4>
                      <div className="text-2xl font-semibold mb-1">+15-20%</div>
                      <p className="text-xs text-muted-foreground">Annual revenue growth target for 2025-2027</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">EBITDA Margin Target</h4>
                      <div className="text-2xl font-semibold mb-1">10-12%</div>
                      <p className="text-xs text-muted-foreground">Target EBITDA margin by end of 2025</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Debt Reduction</h4>
                      <div className="text-2xl font-semibold mb-1">-30%</div>
                      <p className="text-xs text-muted-foreground">Planned reduction in debt-to-equity ratio by 2026</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">International Revenue</h4>
                      <div className="text-2xl font-semibold mb-1">25%</div>
                      <p className="text-xs text-muted-foreground">Target percentage of revenue from international markets by 2027</p>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/40 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Cost Optimization Initiatives</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                      <li>Streamlining operational processes through the Columbus ONE integration</li>
                      <li>Implementing digital tools to improve installation efficiency and reduce costs</li>
                      <li>Optimizing supply chain management to secure better pricing and reduce inventory costs</li>
                      <li>Restructuring administrative functions to reduce overhead expenses</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Product Roadmap</h3>
                  <div className="relative">
                    <div className="absolute left-4 h-full w-0.5 bg-border"></div>
                    <div className="space-y-6 relative pl-12">
                      <div>
                        <div className="absolute left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                        <h4 className="font-medium mb-2">H1 2025</h4>
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                            <li>Full commercial launch of Columbus Intelligence platform</li>
                            <li>Expanded heat pump portfolio optimized for the updated "Czyste Powietrze" program</li>
                            <li>Introduction of integrated PV and energy storage packages for businesses</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="absolute left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                        <h4 className="font-medium mb-2">H2 2025 - H1 2026</h4>
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                            <li>Integration of Saule Technologies' perovskite cells into commercial product offerings</li>
                            <li>Launch of Columbus Energy virtual power plant services</li>
                            <li>Advanced energy management solutions for industrial clients</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="absolute left-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                        <h4 className="font-medium mb-2">H2 2026 - 2027</h4>
                        <div className="bg-secondary/40 p-4 rounded-lg">
                          <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                            <li>Expanded service offering in international markets</li>
                            <li>Next-generation Columbus Intelligence with enhanced AI capabilities</li>
                            <li>Development of comprehensive energy-as-a-service business models</li>
                            <li>Exploration of green hydrogen integration with existing renewable solutions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="risks" className="mt-4">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Risk Assessment Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-left text-sm font-medium">Risk Category</th>
                        <th className="py-3 px-4 text-left text-sm font-medium">Description</th>
                        <th className="py-3 px-4 text-left text-sm font-medium">Impact</th>
                        <th className="py-3 px-4 text-left text-sm font-medium">Probability</th>
                        <th className="py-3 px-4 text-left text-sm font-medium">Mitigation Strategy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-3 px-4 text-sm">Regulatory</td>
                        <td className="py-3 px-4 text-sm">Changes to or termination of government subsidy programs</td>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">High</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">High</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">Diversification of revenue streams; Columbus ONE to adapt to changing regulations</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Financial</td>
                        <td className="py-3 px-4 text-sm">Refinancing risk for existing debt obligations</td>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">High</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">Active negotiations with creditors; large-scale project sales to improve cash position</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Market</td>
                        <td className="py-3 px-4 text-sm">Continued decline in demand for PV installations and heat pumps</td>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">High</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">Expansion into new markets; development of Columbus Intelligence platform</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Competitive</td>
                        <td className="py-3 px-4 text-sm">Increased competition from established energy companies</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="destructive">High</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">Technological differentiation; focus on high-value integrated solutions</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Operational</td>
                        <td className="py-3 px-4 text-sm">Supply chain disruptions and component shortages</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">Diversified supplier base; improved inventory management</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Technological</td>
                        <td className="py-3 px-4 text-sm">Delays in Columbus Intelligence platform development</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">Phased development approach; continuous testing with early adopters</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                    <h3 className="text-lg font-semibold">Key Risk Factors</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Regulatory Uncertainty</h4>
                      <p className="text-sm text-muted-foreground">
                        The company's business model is heavily dependent on government subsidy programs like "Czyste Powietrze" and "Mój Prąd." The temporary suspension of the "Czyste Powietrze" program has already significantly impacted revenues in the heat pump segment. Further regulatory changes could continue to affect demand for the company's products and services.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Financial Stability</h4>
                      <p className="text-sm text-muted-foreground">
                        Columbus Energy faces significant debt obligations, particularly to DC24 ASI sp. z o.o., which will require refinancing. The company's ability to generate sufficient cash flow to service its debt and fund its strategic initiatives depends on the successful sale of large-scale projects and the recovery of its core business segments.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Market Saturation</h4>
                      <p className="text-sm text-muted-foreground">
                        The Polish market for residential photovoltaic installations has shown signs of saturation, with many early adopters having already invested in these systems. Future growth may increasingly depend on replacement sales, upgrades, and the company's ability to expand its product portfolio and geographical reach.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <div className="flex items-center mb-4">
                    <Info className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">Risk Mitigation Strategies</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Business Model Diversification</h4>
                      <p className="text-sm text-muted-foreground">
                        Columbus Energy is actively diversifying its business model beyond installation services to include recurring revenue streams through the Columbus Intelligence platform and large-scale project development. This diversification aims to reduce dependence on government subsidy programs and create more stable, predictable revenue sources.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Market Consolidation</h4>
                      <p className="text-sm text-muted-foreground">
                        The creation of Columbus ONE represents a strategic response to market challenges by consolidating smaller installation companies under a unified brand. This initiative aims to improve operational efficiency, expand market reach, and strengthen the company's position as market conditions evolve.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">International Expansion</h4>
                      <p className="text-sm text-muted-foreground">
                        Continued expansion in the Czech Republic, Slovakia, and Ukraine helps mitigate risks associated with the Polish market. These countries offer different regulatory environments and growth opportunities, reducing the company's dependence on a single market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Macroeconomic Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/40 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Interest Rate Environment</h4>
                    <p className="text-sm text-muted-foreground">
                      The high interest rate environment in Poland (reference rate at 5.75%) increases financing costs for both the company and its customers. While rates are expected to decrease gradually in 2025, the current environment puts pressure on margins and affects consumer purchasing power for larger investments like PV systems and heat pumps.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/40 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Inflation Trends</h4>
                    <p className="text-sm text-muted-foreground">
                      Inflation in Poland has moderated to 4.9% as of September 2024, down from higher levels in previous years. However, continued inflation puts pressure on component costs, salaries, and operational expenses. The company must balance price increases with maintaining competitive market positioning.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/40 p-4 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Exchange Rate Volatility</h4>
                    <p className="text-sm text-muted-foreground">
                      As many renewable energy components are imported and priced in euros, fluctuations in the PLN/EUR exchange rate impact input costs. The company's growing international operations also create both opportunities and challenges related to currency movements, particularly in markets like Ukraine with less stable currencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="experts" className="mt-4">
            {report.premium ? (
              <PremiumContent {...premiumContent.experts} />
            ) : (
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Analyst Consensus</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Average Target Price</h4>
                      <div className="text-2xl font-semibold mb-1">12.80 PLN</div>
                      <p className="text-xs text-muted-foreground">Based on 5 analyst estimates</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Recommendations</h4>
                      <div className="text-sm mt-2 space-y-1">
                        <div className="flex justify-between">
                          <span>Buy</span>
                          <span className="font-medium">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hold</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sell</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Revenue Forecast (2025)</h4>
                      <div className="text-2xl font-semibold mb-1">328.5M PLN</div>
                      <p className="text-xs text-green-500">+18.7% vs 2024E</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">EBITDA Forecast (2025)</h4>
                      <div className="text-2xl font-semibold mb-1">34.2M PLN</div>
                      <p className="text-xs text-green-500">+29.3% vs 2024E</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Analyst Commentary Highlights</h4>
                    <div className="space-y-3">
                      <div className="bg-secondary/40 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">DM BOŚ</span>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Buy</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "Columbus Energy's strategic pivot to Columbus ONE and focus on higher-margin services should drive profitability improvement in 2025. The company is well-positioned to benefit from the expected revival of the 'Czyste Powietrze' program, while its international expansion provides additional growth avenues."
                        </p>
                      </div>
                      
                      <div className="bg-secondary/40 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">Ipopema Securities</span>
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Hold</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "While Q3 results show improvement in operating margins, we remain cautious about the company's ability to meet its debt obligations in the current interest rate environment. The success of Columbus Intelligence and large-scale project sales will be critical for the company's financial stability in 2025."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Peer Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-4 text-left text-sm font-medium">Company</th>
                          <th className="py-3 px-4 text-center text-sm font-medium">Market Cap (M PLN)</th>
                          <th className="py-3 px-4 text-center text-sm font-medium">Revenue Growth (YoY)</th>
                          <th className="py-3 px-4 text-center text-sm font-medium">EBITDA Margin</th>
                          <th className="py-3 px-4 text-center text-sm font-medium">P/E Ratio</th>
                          <th className="py-3 px-4 text-center text-sm font-medium">EV/EBITDA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 px-4 text-sm font-medium">Columbus Energy</td>
                          <td className="py-3 px-4 text-sm text-center">542.4</td>
                          <td className="py-3 px-4 text-sm text-center text-red-500">-35.9%</td>
                          <td className="py-3 px-4 text-sm text-center">8.9%</td>
                          <td className="py-3 px-4 text-sm text-center">Neg.</td>
                          <td className="py-3 px-4 text-sm text-center">18.2x</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm font-medium">Polenergia</td>
                          <td className="py-3 px-4 text-sm text-center">2,340.8</td>
                          <td className="py-3 px-4 text-sm text-center text-red-500">-18.2%</td>
                          <td className="py-3 px-4 text-sm text-center">12.3%</td>
                          <td className="py-3 px-4 text-sm text-center">14.5x</td>
                          <td className="py-3 px-4 text-sm text-center">8.7x</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm font-medium">ML System</td>
                          <td className="py-3 px-4 text-sm text-center">327.6</td>
                          <td className="py-3 px-4 text-sm text-center text-red-500">-22.7%</td>
                          <td className="py-3 px-4 text-sm text-center">7.8%</td>
                          <td className="py-3 px-4 text-sm text-center">Neg.</td>
                          <td className="py-3 px-4 text-sm text-center">12.9x</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm font-medium">Photon Energy</td>
                          <td className="py-3 px-4 text-sm text-center">625.2</td>
                          <td className="py-3 px-4 text-sm text-center text-green-500">+7.4%</td>
                          <td className="py-3 px-4 text-sm text-center">15.2%</td>
                          <td className="py-3 px-4 text-sm text-center">21.3x</td>
                          <td className="py-3 px-4 text-sm text-center">10.2x</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm font-medium">Sector Average</td>
                          <td className="py-3 px-4 text-sm text-center">-</td>
                          <td className="py-3 px-4 text-sm text-center text-red-500">-17.4%</td>
                          <td className="py-3 px-4 text-sm text-center">11.1%</td>
                          <td className="py-3 px-4 text-sm text-center">17.9x</td>
                          <td className="py-3 px-4 text-sm text-center">12.5x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2 text-sm">Comparative Analysis</h4>
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Columbus Energy's revenue decline exceeds the sector average, reflecting its greater exposure to the residential PV and heat pump segments most affected by regulatory changes. However, its improving EBITDA margin (8.9%) is approaching the sector average (11.1%), indicating successful cost optimization efforts. The company's valuation metrics (EV/EBITDA of 18.2x) remain above the sector average, suggesting investor expectations for future growth despite current challenges.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-5 border border-border/60">
                  <h3 className="text-lg font-semibold mb-4">Expert Insights</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Industry Expert View</h4>
                          <p className="text-sm text-muted-foreground">
                            "The renewable energy market in Poland is undergoing a significant transition as it moves beyond the initial adoption phase driven by subsidies. Companies like Columbus Energy need to evolve from pure installation businesses to comprehensive energy service providers. The Columbus Intelligence platform represents a promising step in this direction, but execution will be key. The company's ability to successfully integrate smaller businesses under Columbus ONE will also be critical for maintaining scale and efficiency."
                          </p>
                          <p className="text-sm mt-2 font-medium">- Dr. Anna Kowalska, Energy Transition Analyst, Polish Institute for Renewable Energy</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Financial Expert Perspective</h4>
                          <p className="text-sm text-muted-foreground">
                            "Columbus Energy's financial performance for 9M 2024 shows signs of stabilization after a challenging period. The transition from operating losses to profits is encouraging, though the continued net loss underscores ongoing financial challenges. The key financial priorities should include improving cash flow generation, reducing debt levels, and increasing the share of recurring revenue. The company's success in selling large-scale projects demonstrates a viable path to addressing these priorities, but consistency will be essential."
                          </p>
                          <p className="text-sm mt-2 font-medium">- Jan Nowak, Senior Financial Analyst, Warsaw Investment Group</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportDetail;
