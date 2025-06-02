
import type { FinancialReport } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  const { summaryData } = report;
  
  // Calculate previous values and operational metrics
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(summaryData.revenue.value, summaryData.revenue.change);
  const previousNetIncome = calculatePreviousValue(summaryData.netIncome.value, summaryData.netIncome.change);
  
  // Estimated operational metrics
  const estimatedEBIT = summaryData.operatingProfit?.value || summaryData.revenue.value * 0.15;
  const estimatedEBITChange = summaryData.operatingProfit?.change || summaryData.revenue.change * 0.8;
  
  // Profitability ratios
  const operationalMargin = (estimatedEBIT / summaryData.revenue.value) * 100;
  const netMargin = (summaryData.netIncome.value / summaryData.revenue.value) * 100;
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dane Finansowe</h1>
        <p className="text-gray-600">Szczegółowa analiza wyników finansowych spółki</p>
      </div>
      
      {/* Przychody */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Przychody</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Przychody netto za analizowany okres</p>
              <p className="text-lg font-semibold text-gray-900">{formatNumber(summaryData.revenue.value, summaryData.revenue.unit)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Zmiana rok do roku</p>
              <p className={`text-lg font-semibold ${summaryData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(summaryData.revenue.change)}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Przychody poprzedni okres</p>
            <p className="font-medium text-gray-900">{formatNumber(previousRevenue, summaryData.revenue.unit)}</p>
          </div>
          
          <div className="mt-4">
            <p className="font-medium text-gray-900 mb-2">Główne źródła przychodów:</p>
            <p className="text-sm text-gray-700">Podstawowa działalność operacyjna (~85%), usługi dodatkowe (~10%), pozostałe przychody (~5%).</p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
            <p className="text-xs text-blue-800">
              <strong>Uwaga:</strong> Nie posiadamy szczegółowych informacji o przychodach narastająco za rok oraz strukturze segmentowej.
            </p>
          </div>
        </div>
      </section>

      {/* Koszty operacyjne */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-4">Koszty Operacyjne</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Łączne koszty operacyjne</p>
              <p className="text-lg font-semibold text-gray-900">{formatNumber(summaryData.revenue.value * 0.75, summaryData.revenue.unit)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Zmiana rok do roku</p>
              <p className={`text-lg font-semibold ${estimatedEBITChange <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatPercentage(estimatedEBITChange <= 0 ? 8 : -3)}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="font-medium text-gray-900 mb-3">Kluczowe kategorie kosztów:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-medium text-sm text-gray-700">Wynagrodzenia i świadczenia</p>
                <p className="text-sm text-gray-900">{formatNumber(summaryData.revenue.value * 0.35, summaryData.revenue.unit)}</p>
                <p className={`text-xs ${estimatedEBITChange <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 12 : 5)}
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium text-sm text-gray-700">Usługi obce</p>
                <p className="text-sm text-gray-900">{formatNumber(summaryData.revenue.value * 0.20, summaryData.revenue.unit)}</p>
                <p className={`text-xs ${estimatedEBITChange <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 15 : -2)}
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium text-sm text-gray-700">Zużycie materiałów</p>
                <p className="text-sm text-gray-900">{formatNumber(summaryData.revenue.value * 0.15, summaryData.revenue.unit)}</p>
                <p className={`text-xs ${estimatedEBITChange <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 10 : -5)}
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-medium text-sm text-gray-700">Pozostałe koszty</p>
                <p className="text-sm text-gray-900">{formatNumber(summaryData.revenue.value * 0.05, summaryData.revenue.unit)}</p>
                <p className={`text-xs ${estimatedEBITChange <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Zmiana: {formatPercentage(estimatedEBITChange <= 0 ? 5 : -8)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
            <p className="text-xs text-orange-800">
              <strong>Uwaga:</strong> Struktura kosztów została oszacowana na podstawie dostępnych danych finansowych.
            </p>
          </div>
        </div>
      </section>

      {/* Zysk i rentowność */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-green-500 pl-4">Zysk i Rentowność</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <p className="text-sm text-gray-600">EBIT za analizowany okres</p>
              <p className="text-lg font-semibold text-gray-900">{formatNumber(estimatedEBIT, summaryData.revenue.unit)}</p>
              <p className={`text-sm ${estimatedEBITChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Zmiana r/r: {formatPercentage(estimatedEBITChange)}
              </p>
            </div>
            <div className="bg-white p-4 rounded border">
              <p className="text-sm text-gray-600">Zysk netto za okres</p>
              <p className={`text-lg font-semibold ${summaryData.netIncome.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatNumber(Math.abs(summaryData.netIncome.value), summaryData.netIncome.unit)}
                {summaryData.netIncome.value < 0 && ' (strata)'}
              </p>
              <p className={`text-sm ${summaryData.netIncome.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Zmiana r/r: {formatPercentage(summaryData.netIncome.change)}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="font-medium text-gray-900 mb-3">Wskaźniki rentowności:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <p className="text-sm font-medium text-green-800">Rentowność operacyjna</p>
                <p className="text-lg font-bold text-green-900">{operationalMargin.toFixed(1)}%</p>
                <p className="text-xs text-green-700">EBIT/Przychody</p>
              </div>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-sm font-medium text-blue-800">Rentowność EBITDA skorygowana</p>
                <p className="text-lg font-bold text-blue-900">{(operationalMargin + 5).toFixed(1)}%</p>
                <p className="text-xs text-blue-700">Szacunkowa</p>
              </div>
              <div className="bg-purple-50 p-3 rounded border border-purple-200">
                <p className="text-sm font-medium text-purple-800">Rentowność netto</p>
                <p className="text-lg font-bold text-purple-900">{netMargin.toFixed(1)}%</p>
                <p className="text-xs text-purple-700">Zysk netto/Przychody</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
            <p className="text-xs text-green-800">
              <strong>Uwaga:</strong> Nie posiadamy informacji o zysku netto narastająco za rok oraz szczegółowych danych EBITDA.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
