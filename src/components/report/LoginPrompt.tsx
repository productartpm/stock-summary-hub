
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { FinancialReport } from "@/lib/data";

interface LoginPromptProps {
  report: FinancialReport;
}

export const LoginPrompt = ({ report }: LoginPromptProps) => {
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
};
