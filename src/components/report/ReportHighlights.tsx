
import type { FinancialReport } from "@/lib/data";

interface ReportHighlightsProps {
  report: FinancialReport;
}

export const ReportHighlights = ({ report }: ReportHighlightsProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Key Highlights</h2>
      <ul className="space-y-2 list-disc pl-5">
        {report.keyHighlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
};
