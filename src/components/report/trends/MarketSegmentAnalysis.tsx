
import type { FinancialReport } from "@/lib/types";

interface MarketSegmentAnalysisProps {
  report: FinancialReport;
}

export const MarketSegmentAnalysis = ({ report }: MarketSegmentAnalysisProps) => {
  const categories = report.reportCategory || [];
  
  const translateCategory = (category: string) => {
    const translations: Record<string, string> = {
      "Technology": "Technologia",
      "Finance": "Finanse", 
      "Financial Services": "Usługi Finansowe",
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
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-4">Analiza Segmentów Biznesowych</h2>
      
      <div className="space-y-4">
        <p className="text-gray-700">
          Spółka {report.companyName} funkcjonuje w sektorze {translateCategory(categories[0] || 'ogólnym')}, 
          gdzie odnotowuje się {report.summaryData.revenue.change >= 5 ? 'dynamiczny wzrost' : 
                               report.summaryData.revenue.change >= 0 ? 'stabilny rozwój' : 'spowolnienie'} 
          aktivności biznesowej. Główne segmenty działalności spółki obejmują:
        </p>
        
        <div className="space-y-3 pl-4">
          <p className="text-gray-700">
            <strong>Segment podstawowy (około 70-80% przychodów):</strong> Stanowi trzon działalności operacyjnej 
            i wykazuje {report.summaryData.revenue.change >= 0 ? 'tendencję wzrostową' : 'objawy spowolnienia'}. 
            {report.summaryData.revenue.change >= 5 ? 
              'Silny wzrost w tym segmencie wynika z ekspansji na nowe rynki oraz zwiększenia udziałów w segmentach premium.' :
              report.summaryData.revenue.change >= 0 ?
              'Umiarkowany wzrost odzwierciedla stabilność rynku przy jednoczesnym wzroście konkurencji.' :
              'Spadek wyników w głównym segmencie sygnalizuje strukturalne wyzwania rynkowe wymagające strategicznej reorientacji.'
            }
          </p>
          
          <p className="text-gray-700">
            <strong>Segment usług dodatkowych (około 15-20% przychodów):</strong> Wykazuje 
            {report.summaryData.revenue.change >= 0 ? 'potencjał wzrostu' : 'presję na marże'} 
            i stanowi kluczowy element strategii dywersyfikacji. Rozwój tego segmentu jest ściśle powiązany 
            z trendami digitalizacji i automatyzacji procesów biznesowych.
          </p>
          
          <p className="text-gray-700">
            <strong>Pozostałe działalności (około 5-10% przychodów):</strong> Obejmują działalności 
            komplementarne i eksperymentalne projekty. {report.summaryData.revenue.change >= 0 ?
              'Segment ten może stać się nowym motorem wzrostu w perspektywie średnioterminowej.' :
              'W obliczu wyzwań w podstawowej działalności, segment ten wymaga przeglądu strategicznego.'
            }
          </p>
        </div>
        
        <div className="pl-4 border-l-2 border-blue-300 bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            <strong>Czynniki wpływające na wyniki segmentowe:</strong> {report.summaryData.revenue.change >= 5 ?
              'Silny wzrost wyników jest efektem skutecznej realizacji strategii ekspansji, wprowadzenia innowacyjnych produktów oraz optymalizacji procesów operacyjnych. Spółka skutecznie wykorzystuje pozytywne trendy rynkowe i umacnia swoją pozycję konkurencyjną.' :
              report.summaryData.revenue.change >= 0 ?
              'Stabilne wyniki odzwierciedlają dojrzałość rynku i rosnącą konkurencję. Spółka utrzymuje pozycję poprzez ciągłe doskonalenie oferty i optymalizację kosztów.' :
              'Spadek wyników jest konsekwencją niekorzystnych czynników zewnętrznych, w tym spowolnienia gospodarczego, zmian preferencji konsumentów oraz wzrostu konkurencji cenowej.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};
