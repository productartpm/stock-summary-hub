
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, TrendingUp, TrendingDown, LineChart, Users, BarChart, PieChart, AlertCircle } from "lucide-react";

interface ReportAnalystReactionsProps {
  report: FinancialReport;
}

export const ReportAnalystReactions = ({ report }: ReportAnalystReactionsProps) => {
  if (!report.analystReactions || report.analystReactions.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-neutral-800">Analiza Ekspercka</h2>
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardContent className="p-6">
            <div className="text-center text-gray-300">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Brak dostępnych komentarzy analityków dla tego raportu.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Generuj sentyment na podstawie reakcji
  const sentimentKeywords = {
    positive: ['growth', 'increase', 'improve', 'exceed', 'strong', 'positive', 'upgrade', 'outperform', 'buy', 'opportunity', 
               'wzrost', 'zwiększenie', 'poprawa', 'przekroczenie', 'silny', 'pozytywny', 'podwyższenie', 'przewyższać', 'kupuj', 'okazja'],
    negative: ['decline', 'decrease', 'challenging', 'below', 'weak', 'negative', 'downgrade', 'underperform', 'sell', 'concern', 'risk',
               'spadek', 'zmniejszenie', 'trudne', 'poniżej', 'słaby', 'negatywny', 'obniżenie', 'niedostateczny', 'sprzedaj', 'obawa', 'ryzyko'],
    neutral: ['maintain', 'stable', 'steady', 'in-line', 'expected', 'hold', 'neutral', 'market perform',
              'utrzymać', 'stabilny', 'stały', 'zgodny', 'oczekiwany', 'trzymaj', 'neutralny', 'zgodny z rynkiem']
  };
  
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  
  report.analystReactions.forEach(reaction => {
    const lowerReaction = reaction.toLowerCase();
    
    let posMatches = 0;
    let negMatches = 0;
    let neuMatches = 0;
    
    sentimentKeywords.positive.forEach(word => {
      if (lowerReaction.includes(word)) posMatches++;
    });
    
    sentimentKeywords.negative.forEach(word => {
      if (lowerReaction.includes(word)) negMatches++;
    });
    
    sentimentKeywords.neutral.forEach(word => {
      if (lowerReaction.includes(word)) neuMatches++;
    });
    
    if (posMatches > negMatches && posMatches > neuMatches) {
      positiveCount++;
    } else if (negMatches > posMatches && negMatches > neuMatches) {
      negativeCount++;
    } else {
      neutralCount++;
    }
  });
  
  const totalReactions = report.analystReactions.length;
  const positivePct = Math.round((positiveCount / totalReactions) * 100);
  const negativePct = Math.round((negativeCount / totalReactions) * 100);
  const neutralPct = Math.round((neutralCount / totalReactions) * 100);
  
  const overallSentiment = positivePct > negativePct && positivePct > neutralPct ? 'Pozytywny' :
                          negativePct > positivePct && negativePct > neutralPct ? 'Negatywny' : 'Neutralny';
  
  const sentimentColor = overallSentiment === 'Pozytywny' ? 'text-green-500' :
                        overallSentiment === 'Negatywny' ? 'text-red-500' : 'text-blue-500';
  
  const sentimentIcon = overallSentiment === 'Pozytywny' ? <TrendingUp className="h-5 w-5 mr-2" /> :
                       overallSentiment === 'Negatywny' ? <TrendingDown className="h-5 w-5 mr-2" /> :
                       <LineChart className="h-5 w-5 mr-2" />;

  // Generuj podsumowanie komentarzy analityków                     
  const generateAnalystSummary = () => {
    let summary = "";
    
    if (overallSentiment === 'Pozytywny') {
      summary = `Większość analityków (${positivePct}%) wyraża pozytywne opinie na temat wyników ${report.companyName}. `;
      if (report.summaryData.revenue.change > 0) {
        summary += `Szczególnie doceniany jest wzrost przychodów o ${report.summaryData.revenue.change.toFixed(1)}%, który przekroczył oczekiwania rynkowe. `;
      }
      if (report.summaryData.operatingProfit.change > 0) {
        summary += `Analitycy zwracają uwagę na poprawę efektywności operacyjnej, która przełożyła się na wzrost zysku operacyjnego o ${report.summaryData.operatingProfit.change.toFixed(1)}%. `;
      }
      summary += `Konsensus rynkowy sugeruje potencjał do dalszego wzrostu wartości spółki w nadchodzących kwartałach.`;
    } else if (overallSentiment === 'Negatywny') {
      summary = `Większość analityków (${negativePct}%) wyraża obawy dotyczące wyników ${report.companyName}. `;
      if (report.summaryData.revenue.change < 0) {
        summary += `Krytyce podlega spadek przychodów o ${Math.abs(report.summaryData.revenue.change).toFixed(1)}%, który wskazuje na problemy sprzedażowe. `;
      } else {
        summary += `Mimo ${report.summaryData.revenue.change > 0 ? 'wzrostu' : 'stabilnych'} przychodów, analitycy dostrzegają problemy strukturalne w modelu biznesowym. `;
      }
      if (report.summaryData.operatingProfit.change < 0) {
        summary += `Szczególny niepokój budzi spadek zysku operacyjnego o ${Math.abs(report.summaryData.operatingProfit.change).toFixed(1)}%, sugerujący problemy z kontrolą kosztów. `;
      }
      summary += `Konsensus rynkowy wskazuje na konieczność istotnych zmian w strategii spółki.`;
    } else {
      summary = `Opinie analityków na temat wyników ${report.companyName} są podzielone, z przewagą neutralnych ocen (${neutralPct}%). `;
      if (report.summaryData.revenue.change > 0 && report.summaryData.operatingProfit.change < 0) {
        summary += `Wzrost przychodów o ${report.summaryData.revenue.change.toFixed(1)}% jest oceniany pozytywnie, jednak spadek zysku operacyjnego o ${Math.abs(report.summaryData.operatingProfit.change).toFixed(1)}% budzi obawy o efektywność kosztową. `;
      } else if (report.summaryData.revenue.change < 0 && report.summaryData.operatingProfit.change > 0) {
        summary += `Spadek przychodów o ${Math.abs(report.summaryData.revenue.change).toFixed(1)}% jest przedmiotem krytyki, jednak doceniana jest poprawa efektywności operacyjnej. `;
      } else {
        summary += `Wyniki są generalnie zgodne z oczekiwaniami rynkowymi, nie wywołując silnych reakcji. `;
      }
      summary += `Konsensus rynkowy sugeruje wyczekiwanie na kolejne kwartały, które powinny wyraźniej określić kierunek rozwoju spółki.`;
    }
    
    return summary;
  };
  
  // Generuj rekomendacje inwestycyjne
  const generateInvestmentRecommendations = () => {
    const revenueStrong = report.summaryData.revenue.change > 8;
    const revenueMedium = report.summaryData.revenue.change > 0;
    const profitStrong = report.summaryData.operatingProfit.change > 8;
    const profitMedium = report.summaryData.operatingProfit.change > 0;
    
    if (revenueStrong && profitStrong) {
      return {
        recommendation: "Kupuj",
        color: "text-green-500",
        rationale: "Silny wzrost zarówno przychodów jak i zysków wskazuje na mocne fundamenty i potencjał wzrostowy spółki."
      };
    } else if ((revenueStrong && profitMedium) || (revenueMedium && profitStrong)) {
      return {
        recommendation: "Akumuluj",
        color: "text-emerald-400",
        rationale: "Dobre wyniki operacyjne z potencjałem do dalszej poprawy uzasadniają stopniowe zwiększanie pozycji w akcjach spółki."
      };
    } else if (revenueMedium && profitMedium) {
      return {
        recommendation: "Trzymaj",
        color: "text-amber-400",
        rationale: "Stabilne wyniki bez wyraźnych sygnałów wzrostowych lub spadkowych sugerują utrzymanie obecnych pozycji."
      };
    } else if (!revenueMedium && !profitMedium) {
      return {
        recommendation: "Redukuj",
        color: "text-red-400",
        rationale: "Spadki zarówno przychodów jak i zysków wskazują na istotne problemy biznesowe, uzasadniające ograniczenie ekspozycji."
      };
    } else {
      return {
        recommendation: "Neutralnie",
        color: "text-blue-400",
        rationale: "Mieszane wyniki finansowe sugerują ostrożne podejście i monitorowanie spółki w oczekiwaniu na wyraźniejsze sygnały."
      };
    }
  };
  
  const investmentRecommendation = generateInvestmentRecommendations();
  const analystSummary = generateAnalystSummary();

  // Kategoryzuj komentarze analityków
  const categorizeAnalystComments = () => {
    const positiveComments = [];
    const negativeComments = [];
    const neutralComments = [];
    
    report.analystReactions.forEach(reaction => {
      const lowerReaction = reaction.toLowerCase();
      
      let posMatches = 0;
      let negMatches = 0;
      let neuMatches = 0;
      
      sentimentKeywords.positive.forEach(word => {
        if (lowerReaction.includes(word)) posMatches++;
      });
      
      sentimentKeywords.negative.forEach(word => {
        if (lowerReaction.includes(word)) negMatches++;
      });
      
      sentimentKeywords.neutral.forEach(word => {
        if (lowerReaction.includes(word)) neuMatches++;
      });
      
      if (posMatches > negMatches && posMatches > neuMatches) {
        positiveComments.push(reaction);
      } else if (negMatches > posMatches && negMatches > neuMatches) {
        negativeComments.push(reaction);
      } else {
        neutralComments.push(reaction);
      }
    });
    
    return {
      positive: positiveComments,
      negative: negativeComments,
      neutral: neutralComments
    };
  };
  
  const categorizedComments = categorizeAnalystComments();

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Analiza Ekspercka</h2>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-amber-300">
            <MessageSquare className="h-5 w-5 mr-2" />
            Sentyment Analityków
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <span className={`text-lg font-semibold flex items-center ${sentimentColor}`}>
              {sentimentIcon}
              {overallSentiment} ({positivePct}% pozytywnych, {neutralPct}% neutralnych, {negativePct}% negatywnych)
            </span>
          </div>
          
          <div className="w-full bg-neutral-700 h-2 rounded-full mb-4">
            <div className="flex h-full rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: `${positivePct}%` }}></div>
              <div className="bg-blue-500 h-full" style={{ width: `${neutralPct}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${negativePct}%` }}></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-300 mb-4">
            <span className="text-green-500">Pozytywny</span>
            <span className="text-blue-500">Neutralny</span>
            <span className="text-red-500">Negatywny</span>
          </div>
          
          <div className="text-sm text-gray-300">
            <p className="mb-3">{analystSummary}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-amber-300">
              <BarChart className="h-5 w-5 mr-2" />
              Konsensus Rynkowy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Rekomendacja:</span>
                <span className={`font-semibold ${investmentRecommendation.color}`}>{investmentRecommendation.recommendation}</span>
              </div>
              <p className="text-sm text-gray-300">{investmentRecommendation.rationale}</p>
            </div>
            
            <div className="pt-3 border-t border-neutral-700">
              <h4 className="text-sm font-medium mb-2 text-amber-300">Kluczowe czynniki wpływające na ocenę:</h4>
              <ul className="text-sm space-y-1.5 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Dynamika przychodów: {report.summaryData.revenue.change >= 0 ? 'pozytywna' : 'negatywna'} ({report.summaryData.revenue.change.toFixed(1)}%)
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Efektywność operacyjna: {report.summaryData.operatingProfit.change >= 0 ? 'rosnąca' : 'malejąca'}
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Perspektywy sektorowe: {report.reportCategory.includes('Technology') || report.reportCategory.includes('Healthcare') ? 'korzystne' : 'mieszane'}
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Sentyment rynkowy: {overallSentiment.toLowerCase()}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center text-amber-300">
              <PieChart className="h-5 w-5 mr-2" />
              Kluczowe Wskaźniki Wyceny
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {report.pe && (
                <div>
                  <div className="text-gray-300">Wskaźnik P/E:</div>
                  <div className="font-medium text-white flex items-center">
                    {report.pe.toFixed(2)}
                    <span className={`ml-2 text-xs ${report.pe < 15 ? 'text-green-400' : report.pe > 25 ? 'text-red-400' : 'text-amber-400'}`}>
                      {report.pe < 15 ? 'Niedowartościowana' : report.pe > 25 ? 'Przewartościowana' : 'Neutralna'}
                    </span>
                  </div>
                </div>
              )}
              
              {report.pbv && (
                <div>
                  <div className="text-gray-300">Wskaźnik P/BV:</div>
                  <div className="font-medium text-white">
                    {report.pbv.toFixed(2)}
                  </div>
                </div>
              )}
              
              {report.dividendYield && (
                <div>
                  <div className="text-gray-300">Stopa dywidendy:</div>
                  <div className="font-medium text-white">
                    {report.dividendYield.toFixed(2)}%
                  </div>
                </div>
              )}
              
              {report.roe && (
                <div>
                  <div className="text-gray-300">ROE:</div>
                  <div className="font-medium text-white">
                    {report.roe.toFixed(2)}%
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-gray-300">Marża operacyjna:</div>
                <div className="font-medium text-white">
                  {(report.summaryData.operatingProfit.value / report.summaryData.revenue.value * 100).toFixed(2)}%
                </div>
              </div>
              
              <div>
                <div className="text-gray-300">Zmiana r/r:</div>
                <div className={`font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {report.summaryData.revenue.change >= 0 ? '+' : ''}{report.summaryData.revenue.change.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center text-amber-300">
            <Users className="h-5 w-5 mr-2" />
            Opinie Analityków
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categorizedComments.positive.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 text-green-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Pozytywne Komentarze
              </h4>
              <div className="space-y-2">
                {categorizedComments.positive.slice(0, 2).map((comment, index) => (
                  <div key={`pos-${index}`} className="bg-neutral-700 p-2 rounded-md text-sm">
                    <p className="text-gray-300">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {categorizedComments.negative.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 text-red-400 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                Negatywne Komentarze
              </h4>
              <div className="space-y-2">
                {categorizedComments.negative.slice(0, 2).map((comment, index) => (
                  <div key={`neg-${index}`} className="bg-neutral-700 p-2 rounded-md text-sm">
                    <p className="text-gray-300">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {categorizedComments.neutral.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-blue-400 flex items-center">
                <LineChart className="h-4 w-4 mr-1" />
                Neutralne Komentarze
              </h4>
              <div className="space-y-2">
                {categorizedComments.neutral.slice(0, 2).map((comment, index) => (
                  <div key={`neu-${index}`} className="bg-neutral-700 p-2 rounded-md text-sm">
                    <p className="text-gray-300">"{comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center text-amber-300">
            <AlertCircle className="h-5 w-5 mr-2" />
            Czynniki Ryzyka Wskazywane Przez Analityków
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="text-amber-300 mr-2 mt-0.5">•</span>
              <span>
                {report.summaryData.revenue.change < 0 
                  ? `Spadający trend przychodów (${report.summaryData.revenue.change.toFixed(1)}%) może wskazywać na strukturalne problemy z ofertą produktową lub utratę udziału w rynku.`
                  : `Presja konkurencyjna w sektorze ${report.reportCategory[0]} może zagrozić przyszłym wynikom sprzedażowym pomimo obecnego wzrostu.`}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-300 mr-2 mt-0.5">•</span>
              <span>
                {report.summaryData.operatingProfit.change < report.summaryData.revenue.change
                  ? `Spadająca efektywność operacyjna sygnalizuje problemy z kontrolą kosztów, co może negatywnie wpłynąć na przyszłe wyniki.`
                  : `Potencjalne zmiany regulacyjne w sektorze mogą wpłynąć na strukturę kosztów i model biznesowy spółki.`}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-300 mr-2 mt-0.5">•</span>
              <span>
                {report.reportCategory.includes('Technology')
                  ? `Szybko zmieniający się krajobraz technologiczny wymaga ciągłych inwestycji w R&D, co może obciążać marże w krótkim terminie.`
                  : report.reportCategory.includes('Finance')
                    ? `Zmieniające się stopy procentowe i regulacje sektora finansowego stanowią istotne czynniki niepewności.`
                    : `Ogólna sytuacja makroekonomiczna, w tym potencjalne spowolnienie gospodarcze, może negatywnie wpłynąć na wyniki spółki.`}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-300 mr-2 mt-0.5">•</span>
              <span>
                Wycena spółki na poziomie {report.pe ? `P/E ${report.pe.toFixed(1)}` : "obecnym"} może nie w pełni odzwierciedlać ryzyka związane z realizacją długoterminowej strategii.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
