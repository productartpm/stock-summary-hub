
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportTrendsProps {
  report: FinancialReport;
}

export const ReportTrends = ({ report }: ReportTrendsProps) => {
  // Extract categories for the report to show industry trends
  const categories = report.reportCategory || [];
  
  // Translate categories to Polish (mock translation)
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      "Technology": "Technologia",
      "Finance": "Finanse",
      "Healthcare": "Ochrona Zdrowia",
      "Regulatory": "Regulacje",
      "ESG": "ESG",
      "Manufacturing": "Produkcja",
      "Energy": "Energetyka",
      "Retail": "Handel Detaliczny",
      "E-commerce": "E-commerce",
      "Consumer Goods": "Dobra Konsumpcyjne"
    };
    
    return translations[category] || category;
  };
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Trendy Rynkowe</h2>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-300">Segmenty Branżowe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span key={index} className="bg-neutral-700 text-amber-300 px-2 py-1 rounded-md text-sm">
                {translateCategory(category)}
              </span>
            ))}
          </div>
          
          <h3 className="font-medium text-base mb-2 text-amber-300">Trendy Przychodów według Segmentów</h3>
          <div className="space-y-2">
            {Object.entries(report.summaryData)
              .filter(([key]) => key !== 'revenue' && key !== 'netIncome' && key !== 'operatingProfit' && key !== 'eps')
              .map(([key, data]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className={`${data.change >= 0 ? 'text-green-400' : 'text-red-400'} font-medium`}>
                    {data.change >= 0 ? '↑' : '↓'} {Math.abs(data.change).toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-300">Środowisko Rynkowe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-base mb-2 text-amber-300">Zachowania Konsumentów</h3>
              <p className="text-sm text-gray-300">
                {report.companyName} {report.summaryData.revenue.change >= 0 ? 'obserwuje wzrost' : 'spotyka się z wyzwaniami'} 
                w sektorze {translateCategory(report.reportCategory[0]?.toLowerCase() || '')}, z 
                {' '}{report.summaryData.revenue.change >= 5 ? 'silnym' : report.summaryData.revenue.change >= 0 ? 'stabilnym' : 'malejącym'} 
                {' '}popytem na swoje produkty i usługi.
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Analizy rynkowe wskazują na {report.summaryData.revenue.change >= 0 ? 'pozytywny' : 'negatywny'} trend w najbliższych kwartałach,
                co może wpłynąć na strategię cenową i marketingową firmy.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-base mb-2 text-amber-300">Otoczenie Regulacyjne</h3>
              <p className="text-sm text-gray-300">
                Firma działa w {report.reportCategory.includes('Regulatory') ? 'silnie regulowanym' : 'konkurencyjnym'} 
                środowisku z {report.reportType === 'Quarterly' ? 'kwartalnymi' : 'rocznymi'} wymogami sprawozdawczymi
                wpływającymi na operacje biznesowe i praktyki ujawniania informacji.
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Nowe przepisy dotyczące {report.reportCategory.includes('ESG') ? 'zrównoważonego rozwoju' : 'prywatności danych'} 
                mogą wymagać dostosowania procesów wewnętrznych i strategii biznesowej w nadchodzącym roku.
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-neutral-700">
            <h3 className="font-medium text-base mb-2 text-amber-300">Analiza Konkurencji</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-neutral-700 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1 text-amber-300">Mocne Strony</h4>
                <ul className="text-xs space-y-1 text-gray-300">
                  <li>• Silna pozycja w segmencie {translateCategory(report.reportCategory[0] || '')}</li>
                  <li>• {report.summaryData.revenue.change >= 5 ? 'Dynamiczny wzrost przychodów' : 'Stabilna baza klientów'}</li>
                  <li>• Innowacyjne podejście do rozwoju produktów</li>
                </ul>
              </div>
              <div className="bg-neutral-700 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1 text-amber-300">Wyzwania</h4>
                <ul className="text-xs space-y-1 text-gray-300">
                  <li>• Rosnąca konkurencja w głównych segmentach</li>
                  <li>• {report.summaryData.operatingProfit.change < 0 ? 'Presja na marże operacyjne' : 'Potrzeba ciągłych inwestycji'}</li>
                  <li>• Dynamicznie zmieniające się preferencje klientów</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
