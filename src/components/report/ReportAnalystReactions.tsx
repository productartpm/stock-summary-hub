
import type { FinancialReport } from "@/lib/data";

interface ReportAnalystReactionsProps {
  report: FinancialReport;
}

export const ReportAnalystReactions = ({ report }: ReportAnalystReactionsProps) => {
  if (!report.analystReactions) {
    return <p className="text-muted-foreground">No analyst reactions available.</p>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Analyst Reactions</h2>
      <div className="space-y-2">
        {report.analystReactions.map((reaction, index) => (
          <p key={index}>{reaction}</p>
        ))}
      </div>
    </div>
  );
};
