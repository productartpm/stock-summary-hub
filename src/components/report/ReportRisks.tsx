
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, DollarSign, Users } from "lucide-react";

interface ReportRisksProps {
  report: FinancialReport;
}

export const ReportRisks = ({ report }: ReportRisksProps) => {
  // Determine risk levels based on financial data
  const financialRisk = report.summaryData.netIncome.change < 0 ? 'high' : 
                      report.summaryData.netIncome.change < 5 ? 'medium' : 'low';
  
  const operationalRisk = report.summaryData.operatingProfit.change < 0 ? 'high' : 
                        report.summaryData.operatingProfit.change < 5 ? 'medium' : 'low';
  
  const marketRisk = report.reportCategory.includes('ESG') || 
                   report.reportCategory.includes('Regulatory') ? 'high' : 'medium';

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Risk Assessment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Macroeconomic Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {report.companyName} faces {marketRisk === 'high' ? 'significant' : 'moderate'} exposure to market volatility, 
              regulatory changes, and economic conditions affecting the {report.reportCategory[0]?.toLowerCase() || ''} industry.
            </p>
            <div className="mt-2 text-sm font-medium">Risk level: <span className={`${marketRisk === 'high' ? 'text-red-500' : marketRisk === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
              {marketRisk.charAt(0).toUpperCase() + marketRisk.slice(1)}
            </span></div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-blue-500" />
              Operational Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              The company's operational performance shows {operationalRisk === 'high' ? 'concerning' : operationalRisk === 'medium' ? 'moderate' : 'minimal'} risk 
              factors related to execution, supply chain, and business continuity.
            </p>
            <div className="mt-2 text-sm font-medium">Risk level: <span className={`${operationalRisk === 'high' ? 'text-red-500' : operationalRisk === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
              {operationalRisk.charAt(0).toUpperCase() + operationalRisk.slice(1)}
            </span></div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              Financial Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Financial indicators suggest {financialRisk === 'high' ? 'significant' : financialRisk === 'medium' ? 'moderate' : 'well-managed'} exposure 
              to liquidity, debt, and profitability challenges.
            </p>
            <div className="mt-2 text-sm font-medium">Risk level: <span className={`${financialRisk === 'high' ? 'text-red-500' : financialRisk === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
              {financialRisk.charAt(0).toUpperCase() + financialRisk.slice(1)}
            </span></div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-500" />
              Competitive Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {report.companyName} operates in a {report.reportCategory.includes('Technology') ? 'rapidly evolving' : 'mature'} market with 
              {report.summaryData.revenue.change >= 10 ? ' strong competitive positioning' : report.summaryData.revenue.change >= 0 ? ' stable market position' : ' challenging competitive landscape'}.
            </p>
            <div className="mt-2 text-sm font-medium">Risk level: <span className={`${report.summaryData.revenue.change < 0 ? 'text-amber-500' : 'text-green-500'}`}>
              {report.summaryData.revenue.change < 0 ? 'Medium' : 'Low'}
            </span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
