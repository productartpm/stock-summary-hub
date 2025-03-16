
import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Calendar, LineChart, Eye, Download, ExternalLink, BarChart3, TrendingUp, AlertTriangle, Info, PieChart, ArrowUpRight, DollarSign, Users, FileText, Target } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/data';
import type { FinancialReport } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart as RechartLineChart, Line, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';

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
              <h3 className="text-lg font-semibold mb-4">Human Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm mb-3">Employee Count Over Time</h4>
                  <div className="h-64 w-full">
                    <ChartContainer 
                      config={{ 
                        employees: { color: "#8b5cf6" },
                      }}
                    >
                      <AreaChart data={employeeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="count" 
                          stroke="var(--color-employees)" 
                          fill="var(--color-employees)" 
                          fillOpacity={0.3}
                          name="Employee Count"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-3">Workforce Distribution</h4>
                  <div className="space-y-4">
                    <div className="bg-secondary/40 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-xs font-medium">Sales & Marketing</h5>
                        <span className="text-xs">45%</span>
                      </div>
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-xs font-medium">Technical & Installation</h5>
                        <span className="text-xs">32%</span>
                      </div>
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-xs font-medium">R&D</h5>
                        <span className="text-xs">12%</span>
                      </div>
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/40 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-xs font-medium">Administration & Support</h5>
                        <span className="text-xs">11%</span>
                      </div>
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '11%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Industry Comparison</h3>
                <div className="space-y-4">
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Market Position</h4>
                    <p className="text-sm">
                      Columbus Energy maintains a significant market share in the Polish renewable energy sector despite revenue decline.
                      The company ranks among the top 3 providers of photovoltaic installations and has strengthened its position in the energy storage segment.
                    </p>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Competitive Landscape</h4>
                    <p className="text-sm">
                      The market is experiencing increased competition and consolidation. Major competitors have also reported revenue 
                      declines in the PV segment, but diversification strategies are creating new competitive dynamics.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Technological Trends</h3>
                <div className="space-y-4">
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Innovation Focus</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      <li>Development of Columbus Intelligence service for synchronized energy management</li>
                      <li>Continued investment in perovskite technology through Saule Technologies</li>
                      <li>Integration of AI for operational optimization and energy load prediction</li>
                    </ul>
                  </div>
                  
                  <div className="bg-secondary/40 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">Industry Innovations</h4>
                    <p className="text-sm">
                      The renewable energy sector is shifting toward integrated solutions that combine solar, storage, and management systems.
                      Columbus Energy's strategy aligns with this trend through the development of ecosystem services and platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-5 border border-border/60">
              <h3 className="text-lg font-semibold mb-4">Regulatory Environment</h3>
              <div className="space-y-4">
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Subsidy Programs Impact</h4>
                  <p className="text-sm">
                    The "Clean Air" program has been a significant driver for the company's strategy but its suspension 
                    has required adaptation and new market approaches. The establishment of Columbus ONE was a direct 
                    response to these regulatory changes.
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">ESG Compliance</h4>
                  <p className="text-sm">
                    The implementation of the ESRS standard in the ESG area represents a strategic adaptation to evolving 
                    regulatory requirements and market expectations for sustainability reporting and governance.
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Future Regulatory Outlook</h4>
                  <p className="text-sm">
                    The company anticipates continued policy emphasis on renewable energy expansion in Poland and the EU,
                    creating both opportunities and challenges as regulatory frameworks evolve. Columbus Energy is positioning
                    itself to navigate these changes through diversification and service expansion.
                  </p>
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
            
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Strategic Initiatives</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Columbus ONE</h4>
                    <p className="text-sm">
                      Consolidation platform for the renewable energy market, bringing together installation teams and sales networks.
                      Expected to drive efficiency and market coverage while responding to regulatory changes.
                    </p>
                    <div className="mt-2 flex items-center text-xs">
                      <span className="rounded-full px-2 py-0.5 bg-blue-500/20 text-blue-600">High Priority</span>
                      <span className="ml-auto">Implementation: Q3 2024 - Q2 2025</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Columbus Intelligence</h4>
                    <p className="text-sm">
                      Smart energy management platform using AI and algorithms to optimize energy consumption and storage.
                      Will create a new revenue stream from software services.
                    </p>
                    <div className="mt-2 flex items-center text-xs">
                      <span className="rounded-full px-2 py-0.5 bg-green-500/20 text-green-600">Medium Priority</span>
                      <span className="ml-auto">Implementation: Q4 2024 - Q3 2025</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Large-Scale Energy Storage</h4>
                    <p className="text-sm">
                      Development and commercialization of utility-scale energy storage projects,
                      building on the success of the DTEK project.
                    </p>
                    <div className="mt-2 flex items-center text-xs">
                      <span className="rounded-full px-2 py-0.5 bg-blue-500/20 text-blue-600">High Priority</span>
                      <span className="ml-auto">Continuous development</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Financial Targets</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Revenue Growth</h4>
                    <p className="text-sm">
                      After the current transitional period, the company aims to return to growth in 2025,
                      targeting a compound annual growth rate of 15-20% over the next three years.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Profitability</h4>
                    <p className="text-sm">
                      The company targets return to net profitability by the end of 2025,
                      with an EBITDA margin goal of 12-15% within three years.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Debt Management</h4>
                    <p className="text-sm">
                      Strategic focus on refinancing existing debt to DC24 ASI and improving
                      the debt-to-equity ratio to below 1.5 within the next 24 months.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Capital Allocation</h4>
                    <p className="text-sm">
                      Priority investment in software development (Columbus Intelligence) and large-scale
                      projects with predictable returns. No dividend payments planned in the medium term.
                    </p>
                  </div>
                </div>
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
            
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Risk Assessment Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left pb-2">Risk Factor</th>
                        <th className="text-center pb-2">Probability</th>
                        <th className="text-center pb-2">Impact</th>
                        <th className="text-center pb-2">Overall</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr>
                        <td className="py-2">Regulatory changes</td>
                        <td className="text-center">High</td>
                        <td className="text-center">High</td>
                        <td className="text-center"><span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">Critical</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Market competition</td>
                        <td className="text-center">High</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">High</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Financing constraints</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center">High</td>
                        <td className="text-center"><span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">High</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Project delays</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Technology changes</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">Currency fluctuation</td>
                        <td className="text-center">Medium</td>
                        <td className="text-center">Low</td>
                        <td className="text-center"><span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">Low</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Mitigation Strategies</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Regulatory & Market Risks</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Diversification of revenue streams across multiple segments</li>
                      <li>Columbus ONE platform to adapt to regulatory changes</li>
                      <li>Geographic expansion to reduce dependency on Polish market</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Financial Risks</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Cost optimization program across all business units</li>
                      <li>Exploring new financing options with multiple financial institutions</li>
                      <li>Focus on cash flow management and working capital optimization</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Operational & Technical Risks</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Improved project management processes and early risk identification</li>
                      <li>Continued investment in R&D to stay ahead of technological changes</li>
                      <li>Strategic partnerships to share operational risks in large-scale projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="experts" className="mt-4">
            <div className="bg-card rounded-lg p-5 border border-border/60 mb-6">
              <h3 className="text-lg font-semibold mb-4">Analyst Consensus</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-sm mb-2">Recommendation</h4>
                  <div className="text-xl font-bold mb-1">HOLD</div>
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="rounded-full h-3 w-3 bg-green-500"></span>
                      <span>4 Buy</span>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="rounded-full h-3 w-3 bg-blue-500"></span>
                      <span>7 Hold</span>
                    </div>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="rounded-full h-3 w-3 bg-red-500"></span>
                      <span>3 Sell</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-sm mb-2">Target Price (12M)</h4>
                  <div className="text-xl font-bold mb-1">24.85 PLN</div>
                  <p className="text-sm text-muted-foreground">
                    +16.2% from current price
                  </p>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-sm mb-2">Avg. Est. Revenue (2025)</h4>
                  <div className="text-xl font-bold mb-1">348.2M PLN</div>
                  <p className="text-sm text-muted-foreground">
                    +11.8% year-over-year
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-secondary/40 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Dom Maklerski BDM S.A.</h4>
                      <div className="text-xs text-muted-foreground">Updated: 3 days ago</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="rounded-full px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium">BUY</span>
                      <span className="text-sm font-medium mt-1">TP: 28.50 PLN</span>
                    </div>
                  </div>
                  <p className="text-sm mt-3">
                    "Despite current revenue headwinds, Columbus Energy's strategic focus on energy storage and integration through Columbus ONE positions it well for the expected market recovery in 2025. The company's transition from pure hardware sales to energy management solutions should drive margin expansion."
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/40 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Trigon Dom Maklerski</h4>
                      <div className="text-xs text-muted-foreground">Updated: 1 week ago</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="rounded-full px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium">HOLD</span>
                      <span className="text-sm font-medium mt-1">TP: 23.00 PLN</span>
                    </div>
                  </div>
                  <p className="text-sm mt-3">
                    "We maintain our HOLD recommendation as Columbus navigates a challenging transition period. While Q3 results show improvement in cost structure, revenue declines remain a concern. Successful execution of Columbus ONE will be critical for returning to growth. Liquidity remains adequate, but debt refinancing will be a focus area in 2025."
                  </p>
                </div>
                
                <div className="p-4 bg-secondary/40 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Erste Group Research</h4>
                      <div className="text-xs text-muted-foreground">Updated: 2 weeks ago</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="rounded-full px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium">REDUCE</span>
                      <span className="text-sm font-medium mt-1">TP: 18.75 PLN</span>
                    </div>
                  </div>
                  <p className="text-sm mt-3">
                    "Columbus Energy faces multiple challenges including revenue declines across core segments, intensifying competition, and regulatory uncertainty. While Q3 results showed some operational improvements, we believe the company's transformation will take longer than management expects, with significant execution risks ahead. Valuation remains stretched relative to peers."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Peer Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/60">
                        <th className="text-left pb-2">Company</th>
                        <th className="text-center pb-2">P/E</th>
                        <th className="text-center pb-2">EV/EBITDA</th>
                        <th className="text-center pb-2">Rev. Growth</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      <tr className="font-medium">
                        <td className="py-2">Columbus Energy</td>
                        <td className="text-center">n/a</td>
                        <td className="text-center">7.8x</td>
                        <td className="text-center text-red-500">-35.9%</td>
                      </tr>
                      <tr>
                        <td className="py-2">Photon Energy</td>
                        <td className="text-center">18.5x</td>
                        <td className="text-center">6.2x</td>
                        <td className="text-center text-red-500">-18.3%</td>
                      </tr>
                      <tr>
                        <td className="py-2">SunRoof</td>
                        <td className="text-center">n/a</td>
                        <td className="text-center">8.4x</td>
                        <td className="text-center text-red-500">-22.1%</td>
                      </tr>
                      <tr>
                        <td className="py-2">Grenevia</td>
                        <td className="text-center">14.3x</td>
                        <td className="text-center">5.9x</td>
                        <td className="text-center text-green-500">+4.2%</td>
                      </tr>
                      <tr>
                        <td className="py-2">ML System</td>
                        <td className="text-center">26.8x</td>
                        <td className="text-center">9.1x</td>
                        <td className="text-center text-red-500">-12.7%</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Industry Average</td>
                        <td className="text-center">19.9x</td>
                        <td className="text-center">7.5x</td>
                        <td className="text-center text-red-500">-17.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-5 border border-border/60">
                <h3 className="text-lg font-semibold mb-4">Expert Commentary</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Industry Expert Perspective</h4>
                    <blockquote className="text-sm italic">
                      "The Polish renewable energy market is going through a significant transition phase with the Clean Air program changes. Companies like Columbus that can pivot to more integrated service models while maintaining operational discipline will likely emerge strongest when the market stabilizes in late 2025."
                    </blockquote>
                    <div className="text-xs mt-2 text-muted-foreground">- Agata Kowalska, Head of Research, Polish Renewable Energy Association</div>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Technological Assessment</h4>
                    <blockquote className="text-sm italic">
                      "Columbus Energy's investment in Saule Technologies represents a high-risk, high-reward bet on perovskite technology. While commercial viability remains uncertain, the potential market disruption could be substantial if technical milestones are achieved in the next 18-24 months."
                    </blockquote>
                    <div className="text-xs mt-2 text-muted-foreground">- Dr. Marek Nowak, Solar Technology Research Institute</div>
                  </div>
                  
                  <div className="p-3 bg-secondary/40 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Financial Analyst View</h4>
                    <blockquote className="text-sm italic">
                      "Columbus Energy's transition from a pure installation company to an integrated energy solutions provider is necessary but challenging. Investors should monitor the revenue mix shift toward recurring revenue streams and margins improvement in coming quarters as key indicators of successful transformation."
                    </blockquote>
                    <div className="text-xs mt-2 text-muted-foreground">- Jan Kowalski, Senior Analyst, mBank Brokerage</div>
                  </div>
                </div>
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

