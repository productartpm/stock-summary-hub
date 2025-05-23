
import type { FinancialReport } from "@/lib/types";

interface FinancialIntroductionProps {
  report: FinancialReport;
}

export const FinancialIntroduction = ({ report }: FinancialIntroductionProps) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
      <p className="text-sm text-neutral-700 leading-relaxed">
        Niniejszy raport finansowy prezentuje szczegółową analizę wyników finansowych {report.companyName} za {report.reportType === 'Quarterly' ? 'trzeci kwartał' : 'rok'} {report.quarterOrYear}. 
        Analizujemy strukturę przychodów, koszty operacyjne oraz wskaźniki rentowności, aby dostarczyć kompleksowy obraz sytuacji finansowej spółki.
      </p>
    </div>
  );
};
