
import { PremiumContent } from '@/components/PremiumContent';
import { formatPercentage, formatNumber, formatDate, type FinancialReport } from '@/lib/data';
import { Share, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

interface ReportDetailProps {
  report: FinancialReport | null;
  onShare: () => void;
  user: User | null;
}

const ReportDetail = ({ report, onShare, user }: ReportDetailProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('highlights');

  if (!report) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-muted-foreground">
        <h3 className="text-xl font-medium mb-2">Select a report</h3>
        <p>Choose a financial report from the list to view detailed information.</p>
      </div>
    );
  }

  // Show login prompt for premium reports when user is not logged in
  if (report.premium && !user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Premium Report</CardTitle>
            <CardDescription>
              <span className="block">'{report.companyName} ({report.ticker})'</span>
              <span className="block mt-1">This financial report requires a login to view</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-muted-foreground">
              Sign in to your account to access premium financial reports, including detailed analysis and forecasts.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/login" className="w-full">
                <Button className="w-full" size="lg">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary underline underline-offset-4">
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderMobileTabs = () => {
    return (
      <Tabs defaultValue="highlights" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="outlook">Outlook</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="highlights" className="space-y-4">
          <h2 className="text-xl font-semibold mb-3">Key Highlights</h2>
          <ul className="space-y-2 list-disc pl-5">
            {report.keyHighlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="outlook" className="space-y-4">
          {report.outlook ? (
            <>
              <h2 className="text-xl font-semibold mb-3">Future Outlook</h2>
              <p className="mb-4">{report.outlook.statement}</p>
              
              {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
                <div className="grid grid-cols-1 gap-4">
                  {report.outlook.guidanceRevenue && (
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <div className="text-sm font-medium mb-1">Revenue Guidance</div>
                      <div className="text-xl font-bold">
                        {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
                      </div>
                    </div>
                  )}
                  
                  {report.outlook.guidanceEps && (
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <div className="text-sm font-medium mb-1">EPS Guidance</div>
                      <div className="text-xl font-bold">
                        {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">No outlook information available.</p>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {report.analystReactions ? (
            <>
              <h2 className="text-xl font-semibold mb-3">Analyst Reactions</h2>
              <div className="space-y-2">
                {report.analystReactions.map((reaction, index) => (
                  <p key={index}>{reaction}</p>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No analyst reactions available.</p>
          )}
        </TabsContent>
      </Tabs>
    );
  };

  const renderDesktopContent = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Key Highlights</h2>
          <ul className="space-y-2 list-disc pl-5">
            {report.keyHighlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        {report.outlook && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Future Outlook</h2>
            <p className="mb-4">{report.outlook.statement}</p>
            
            {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {report.outlook.guidanceRevenue && (
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-sm font-medium mb-1">Revenue Guidance</div>
                    <div className="text-xl font-bold">
                      {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
                    </div>
                  </div>
                )}
                
                {report.outlook.guidanceEps && (
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="text-sm font-medium mb-1">EPS Guidance</div>
                    <div className="text-xl font-bold">
                      {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {report.analystReactions && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Analyst Reactions</h2>
            <div className="space-y-2">
              {report.analystReactions.map((reaction, index) => (
                <p key={index}>{reaction}</p>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold">{report.companyName} ({report.ticker})</h1>
          <p className="text-muted-foreground">{report.title}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Published: {formatDate(report.publicationDate)}</span>
            <span className="mx-2">•</span>
            <span>{report.reportType} Report</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(report.summaryData).map(([key, data]) => (
            <div key={key} className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-2xl font-bold">
                {typeof data.value === 'number' 
                  ? formatNumber(data.value, data.unit) 
                  : data.value}
              </div>
              <div className={`text-sm ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercentage(data.change)}
              </div>
            </div>
          ))}
        </div>

        {isMobile ? renderMobileTabs() : renderDesktopContent()}
      </>
    );
  };

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>

        {report.premium ? (
          <PremiumContent 
            content={{
              title: "Premium Financial Insights",
              description: "This premium report includes detailed financial analysis, expert insights, and future outlook projections.",
              unlockPrice: "$9.99"
            }}
            requireAuth={true}
          >
            {renderContent()}
          </PremiumContent>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
