
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
                  <h4 className="font-medium text-sm mb-2">Other Markets</h4>
                  <div className="text-2xl font-semibold mb-1">3.5%</div>
                  <p className="text-xs text-muted-foreground">Exploratory markets including Germany and Ukraine</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-4">
            <div className="mb-8 bg-card rounded-lg p-5 border border-border/60">
              <h3 className="text-lg font-semibold mb-4">Market Trends</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Analysis of key market and industry trends affecting Columbus Energy's business and future prospects.
              </p>
              
              <div className="space-y-6">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    Renewable Energy Market Dynamics
                  </h4>
                  <p className="text-sm">
                    The Polish renewable energy market faced significant challenges in 2023-2024, 
                    with regulatory uncertainty and reduced incentives impacting consumer demand. 
                    The suspension of the "My Electricity" program and delays in implementing the 
                    "My Heat" program contributed to a market slowdown.
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                    Competitive Landscape
                  </h4>
                  <p className="text-sm">
                    The market has seen increased competition and price pressure, particularly 
                    in the photovoltaic segment. Many smaller competitors have exited the market 
                    due to financial constraints, potentially creating opportunities for well-capitalized 
                    firms like Columbus Energy to gain market share as the sector consolidates.
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                    Regulatory Environment
                  </h4>
                  <p className="text-sm">
                    Changes in the net-metering system to net-billing have significantly altered 
                    the economic proposition for residential solar installations. The European 
                    Union's REPowerEU plan aims to accelerate renewable energy adoption, potentially 
                    benefiting companies with established capabilities in these markets.
                  </p>
                </div>
              </div>
              
              <PremiumContent
                content={premiumContent.trends}
              >
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Unlock detailed market analysis, including industry comparisons and future outlook.
                  </p>
                </div>
              </PremiumContent>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Employee Trends</h3>
                <div className="h-72 w-full">
                  <ChartContainer 
                    config={chartConfig}
                  >
                    <BarChart data={employeeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="count" 
                        fill="var(--color-employees)" 
                        name="Employee Count" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Workforce Changes</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span>Peak workforce (2022)</span>
                      <span className="font-medium">412 employees</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span>Current workforce (Q3 2024)</span>
                      <span className="font-medium">379 employees</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span>Change from peak</span>
                      <span className="font-medium text-red-500">-8.0%</span>
                    </li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4">
                    The company has optimized its workforce through strategic reorganization 
                    while maintaining core capabilities across all business segments.
                  </p>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Technology & Innovation</h3>
                <div className="space-y-4">
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Energy Storage Systems</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Columbus Energy has increased its focus on energy storage solutions, 
                      developing new product offerings and partnerships to capitalize on 
                      growing market demand.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm font-medium">Market potential</div>
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Virtual Power Plants</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      The company is developing capabilities to aggregate distributed energy 
                      resources into virtual power plants, creating new revenue streams from 
                      grid services and energy trading.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm font-medium">Implementation stage</div>
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Energy Management Software</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Columbus Energy is enhancing its proprietary software platform to 
                      provide advanced energy management capabilities for customers with 
                      solar installations and storage systems.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm font-medium">Development progress</div>
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="future" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <h3 className="text-lg font-semibold mb-4">Strategic Initiatives & Future Plans</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Overview of Columbus Energy's strategic direction and key initiatives for 2024-2025.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Business Model Evolution</h4>
                  <p className="text-sm">
                    Columbus Energy is transitioning from a pure installation company to an 
                    integrated energy solutions provider, with increased focus on recurring 
                    revenue streams from services, maintenance, and energy trading.
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Geographic Expansion</h4>
                  <p className="text-sm">
                    While maintaining its core presence in Poland, the company plans to 
                    accelerate growth in the Czech Republic and Slovakia markets, 
                    leveraging existing capabilities and brand recognition.
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Product Portfolio Diversification</h4>
                  <p className="text-sm">
                    The company intends to expand its energy storage offerings and develop 
                    new solutions for commercial and industrial clients, reducing dependence 
                    on the residential photovoltaic market.
                  </p>
                </div>
              </div>
              
              <PremiumContent
                content={premiumContent.future}
              >
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Unlock detailed future plans including financial targets and expansion roadmap.
                  </p>
                </div>
              </PremiumContent>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Short-Term Priorities (Next 12 Months)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Operational Efficiency</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Continue cost optimization efforts to maintain positive EBITDA trend, 
                        focusing on streamlining operations and reducing overhead expenses.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Diversify Revenue Sources</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Accelerate growth in energy storage and service segments to mitigate 
                        impact of fluctuations in the photovoltaic installation market.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Debt Restructuring</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Finalize the restructuring of the company's debt profile to improve 
                        financial flexibility and reduce interest expenses.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Commercial Segment Expansion</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Increase focus on commercial and small business clients to capitalize 
                        on more stable demand and higher-value projects.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Financial Targets</h3>
                <div className="space-y-4">
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Revenue Growth</div>
                    <div className="text-lg font-medium mb-1">10-15%</div>
                    <p className="text-xs text-muted-foreground">Projected year-over-year growth for FY 2025</p>
                    <div className="mt-2 h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-green-500" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">EBITDA Margin Target</div>
                    <div className="text-lg font-medium mb-1">12-15%</div>
                    <p className="text-xs text-muted-foreground">Medium-term target (2025-2026)</p>
                    <div className="mt-2 h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-green-500" style={{ width: "13.5%" }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">Net Profitability</div>
                    <div className="text-lg font-medium mb-1">Positive</div>
                    <p className="text-xs text-muted-foreground">Expected to achieve positive net profit in FY 2025</p>
                    <div className="mt-2 flex items-center text-xs">
                      <span className="text-green-500 font-medium">Current: -9.39%</span>
                      <ArrowUpRight className="h-3 w-3 mx-1 text-green-500" />
                      <span className="text-green-500 font-medium">Target: &gt;0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risks" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <h3 className="text-lg font-semibold mb-4">Key Risk Factors</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Major risks and challenges that could impact Columbus Energy's business performance and outlook.
              </p>
              
              <div className="space-y-4">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Regulatory Risk</h4>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">High</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Continued changes in renewable energy regulations, incentive programs, 
                    and net-billing systems could significantly impact consumer demand and 
                    the economic attractiveness of photovoltaic installations.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Mitigation: Active engagement with regulatory bodies, diversification of 
                    product offerings, and expansion into multiple markets with different 
                    regulatory frameworks.
                  </div>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Market Competition</h4>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Increased competition in the renewable energy market, particularly from 
                    larger utility companies and international players entering the Polish market, 
                    could pressure margins and market share.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Mitigation: Focus on service quality, brand strengthening, and expansion 
                    of value-added services that differentiate Columbus Energy from competitors.
                  </div>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Financial Risk</h4>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    The company's debt structure and ongoing negative net income could limit 
                    financial flexibility and ability to invest in growth opportunities or 
                    withstand prolonged market downturns.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Mitigation: Continued focus on achieving positive EBITDA, debt restructuring 
                    initiatives, and careful cash flow management to ensure operational stability.
                  </div>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Supply Chain Disruptions</h4>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Low</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    While global supply chain issues have stabilized, potential disruptions 
                    in component availability or pricing could impact the company's ability 
                    to fulfill orders or maintain margins.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Mitigation: Diversified supplier relationships, strategic inventory management, 
                    and long-term partnership agreements with key component manufacturers.
                  </div>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Economic Conditions</h4>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium</Badge>
                  </div>
                  <p className="text-sm mb-3">
                    Broader economic factors including inflation, interest rates, and consumer 
                    confidence affect willingness to invest in renewable energy systems, particularly 
                    in the residential segment.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Mitigation: Development of flexible financing options, focus on value proposition 
                    and long-term energy savings, and increased emphasis on the commercial segment.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <h3 className="text-lg font-semibold mb-4">Risk Trend Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm mb-3">Improving Risk Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center p-2 bg-green-500/5 rounded-lg">
                      <ChevronDown className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Supply chain constraints</span>
                    </li>
                    <li className="flex items-center p-2 bg-green-500/5 rounded-lg">
                      <ChevronDown className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Interest rate environment</span>
                    </li>
                    <li className="flex items-center p-2 bg-green-500/5 rounded-lg">
                      <ChevronDown className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Operating cost pressure</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3">Worsening Risk Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center p-2 bg-red-500/5 rounded-lg">
                      <ChevronUp className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Regulatory uncertainty</span>
                    </li>
                    <li className="flex items-center p-2 bg-red-500/5 rounded-lg">
                      <ChevronUp className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Market competition</span>
                    </li>
                    <li className="flex items-center p-2 bg-red-500/5 rounded-lg">
                      <ChevronUp className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Consumer demand volatility</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-sm mb-3">Risk Management Focus Areas</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  The company has identified the following key areas for enhanced risk management:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  <li>Regulatory compliance and advocacy</li>
                  <li>Financial stability and debt management</li>
                  <li>Product and service diversification</li>
                  <li>Geographic market expansion</li>
                  <li>Operational efficiency improvements</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="experts" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <h3 className="text-lg font-semibold mb-4">Analyst Perspectives</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Expert opinions and analysis on Columbus Energy's performance and outlook.
              </p>
              
              <PremiumContent
                content={premiumContent.experts}
              >
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                  <h4 className="text-lg font-medium mb-2">Expert Analysis Available</h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Unlock access to detailed expert analysis, including analyst ratings, 
                    peer comparisons, and professional insights on Columbus Energy's 
                    performance and future prospects.
                  </p>
                </div>
              </PremiumContent>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Consensus Ratings</h3>
                <div className="bg-secondary/40 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Average Target Price</h4>
                    <span className="font-medium">PLN 13.70</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Current Price</h4>
                    <span className="font-medium">PLN 11.26</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">Upside Potential</h4>
                    <span className="font-medium text-green-500">+21.7%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="bg-green-500/10 rounded-lg p-2">
                    <div className="text-lg font-medium text-green-500">3</div>
                    <div className="text-xs text-muted-foreground">Buy</div>
                  </div>
                  <div className="bg-secondary/60 rounded-lg p-2">
                    <div className="text-lg font-medium">2</div>
                    <div className="text-xs text-muted-foreground">Hold</div>
                  </div>
                  <div className="bg-red-500/10 rounded-lg p-2">
                    <div className="text-lg font-medium text-red-500">1</div>
                    <div className="text-xs text-muted-foreground">Sell</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Analyst consensus data is based on the opinions of 6 research analysts covering Columbus Energy as of October 15, 2024.
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Key Investment Considerations</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <ChevronUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Market Position Strength</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Despite market challenges, Columbus Energy maintains a strong brand position and market share in the Polish renewable energy sector.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <ChevronUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Financial Turnaround Progress</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Positive EBITDA trend and reduced net loss indicate improving financial health and successful cost optimization efforts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Debt Structure Concerns</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Current debt levels may limit growth potential and increase vulnerability to market downturns.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <ChevronUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Product Diversification</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Strategic shift toward energy storage and services offers growth potential and reduced dependence on installation revenues.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Regulatory Uncertainty</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Changing renewable energy policies and incentives create significant near-term revenue visibility challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportDetail;
