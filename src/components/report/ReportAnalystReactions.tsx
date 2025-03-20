
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/data";
import { TrendingUp, TrendingDown, Sparkles, AlertCircle, Award, BarChart4, DollarSign, LineChart, Clock } from "lucide-react";

interface ReportAnalystReactionsProps {
  report: FinancialReport;
}

export const ReportAnalystReactions = ({ report }: ReportAnalystReactionsProps) => {
  // Helper function to generate random percentage between min and max
  const randomPercentage = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(1);
  };

  // Generate random analyst ratings based on financial data
  const generateAnalystSentiment = () => {
    // Base sentiment on profitability trend
    const isProfitable = report.summaryData.profit.value > 0;
    const isGrowingProfit = report.summaryData.profit.change > 0;
    
    let buyPercentage = 30; // Base value
    let holdPercentage = 40;
    let sellPercentage = 30;
    
    // Adjust based on profit and revenue trends
    if (isProfitable && isGrowingProfit) {
      buyPercentage += 25;
      holdPercentage -= 5;
      sellPercentage -= 20;
    } else if (isProfitable && !isGrowingProfit) {
      buyPercentage -= 5;
      holdPercentage += 15;
      sellPercentage -= 10;
    } else if (!isProfitable && isGrowingProfit) {
      buyPercentage += 10;
      holdPercentage += 5;
      sellPercentage -= 15;
    } else {
      buyPercentage -= 20;
      holdPercentage -= 5;
      sellPercentage += 25;
    }
    
    // Adjust further based on revenue growth
    if (report.summaryData.revenue.change > 10) {
      buyPercentage += 10;
      sellPercentage -= 10;
    } else if (report.summaryData.revenue.change < -5) {
      buyPercentage -= 15;
      sellPercentage += 15;
    }
    
    // Ensure values are within bounds
    buyPercentage = Math.max(0, Math.min(100, buyPercentage));
    sellPercentage = Math.max(0, Math.min(100, sellPercentage));
    holdPercentage = 100 - buyPercentage - sellPercentage;
    
    return {
      buy: buyPercentage.toFixed(0),
      hold: holdPercentage.toFixed(0),
      sell: sellPercentage.toFixed(0)
    };
  };
  
  const analystSentiment = generateAnalystSentiment();
  
  // Generate a price target range based on current market price
  const generatePriceTarget = () => {
    const basePrice = report.stockData.currentPrice;
    const volatilityFactor = Math.abs(report.summaryData.profit.change) / 100 + 0.1;
    
    // Calculate low and high targets
    const lowTarget = basePrice * (1 - volatilityFactor * 0.5);
    const highTarget = basePrice * (1 + volatilityFactor * 2);
    
    // Calculate consensus target based on analyst sentiment
    const buyWeight = parseInt(analystSentiment.buy) / 100;
    const sellWeight = parseInt(analystSentiment.sell) / 100;
    
    const consensusTarget = basePrice * (1 + (buyWeight * 0.25) - (sellWeight * 0.15));
    
    return {
      low: lowTarget.toFixed(2),
      high: highTarget.toFixed(2),
      consensus: consensusTarget.toFixed(2)
    };
  };
  
  const priceTargets = generatePriceTarget();
  
  // Generate a list of key risks from analyst perspectives
  const generateAnalystRisks = () => {
    const commonRisks = [
      "Konkurencja rynkowa",
      "Zmiany regulacyjne",
      "Ryzyko walutowe",
      "Problemy łańcucha dostaw",
      "Zmiany preferencji konsumentów",
      "Ryzyko stopy procentowej",
      "Presja cenowa",
      "Innowacje technologiczne"
    ];
    
    const specificRisks = [
      report.summaryData.profit.change < 0 ? "Malejąca rentowność" : null,
      report.summaryData.revenue.change < 0 ? "Spadek przychodów" : null,
      report.stockData.yearToDateChange < 0 ? "Słabe wyniki akcji YTD" : null
    ].filter(Boolean);
    
    // Combine and select 4-5 risks
    const allRisks = [...specificRisks, ...commonRisks];
    const shuffled = [...allRisks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };
  
  const analystRisks = generateAnalystRisks();
  
  // Generate analyst recommendations
  const generateRecommendations = () => {
    const strongBuy = parseInt(analystSentiment.buy) > 60;
    const strongSell = parseInt(analystSentiment.sell) > 60;
    
    let recommendation = "Neutralne";
    let color = "text-amber-400";
    
    if (strongBuy) {
      recommendation = "Kupuj";
      color = "text-green-500";
    } else if (parseInt(analystSentiment.buy) > 45) {
      recommendation = "Akumuluj";
      color = "text-green-400";
    } else if (strongSell) {
      recommendation = "Sprzedaj";
      color = "text-red-500";
    } else if (parseInt(analystSentiment.sell) > 45) {
      recommendation = "Redukuj";
      color = "text-red-400";
    }
    
    return { recommendation, color };
  };
  
  const recommendation = generateRecommendations();
  
  // Generate random financial metrics
  const generateRandomMetrics = () => {
    // Calculate P/E ratio
    const peRatio = report.summaryData.profit.value > 0 
      ? (report.stockData.currentPrice * report.stockData.sharesOutstanding / (report.summaryData.profit.value * 1000000)).toFixed(1)
      : "N/A";
    
    // Calculate EV/EBITDA
    const evToEbitda = (Math.random() * 15 + 4).toFixed(1);
    
    // Calculate Price to Book Value
    const pbvRatio = (Math.random() * 3 + 0.8).toFixed(2);
    
    // Calculate Dividend Yield
    const dividendYield = (Math.random() * 5).toFixed(2);
    
    // Calculate Return on Equity
    const roe = (Math.random() * 25 + 5).toFixed(1);
    
    return {
      peRatio,
      evToEbitda,
      pbvRatio,
      dividendYield,
      roe
    };
  };
  
  const financialMetrics = generateRandomMetrics();
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-neutral-800">Reakcje Analityków</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-neutral-800 text-white border-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-300">Konsensus Analityków Rynkowych</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center mb-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${recommendation.color} mb-1`}>
                    {recommendation.recommendation}
                  </div>
                  <div className="text-sm text-gray-300">
                    Konsensus z danych {Number(analystSentiment.buy) + Number(analystSentiment.hold) + Number(analystSentiment.sell)} analityków
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div>
                  <div className="text-green-400 text-xl font-bold">{analystSentiment.buy}%</div>
                  <div className="text-xs text-gray-300">Kupuj</div>
                </div>
                <div>
                  <div className="text-amber-400 text-xl font-bold">{analystSentiment.hold}%</div>
                  <div className="text-xs text-gray-300">Trzymaj</div>
                </div>
                <div>
                  <div className="text-red-400 text-xl font-bold">{analystSentiment.sell}%</div>
                  <div className="text-xs text-gray-300">Sprzedaj</div>
                </div>
              </div>
              
              <div className="w-full bg-neutral-700 h-4 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-green-500 h-full" style={{width: `${analystSentiment.buy}%`}}></div>
                  <div className="bg-amber-400 h-full" style={{width: `${analystSentiment.hold}%`}}></div>
                  <div className="bg-red-500 h-full" style={{width: `${analystSentiment.sell}%`}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 text-white border-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-300">Cel Cenowy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-amber-300 mb-1">
                  ${priceTargets.consensus}
                </div>
                <div className="text-sm text-gray-300">
                  Konsensus cenowy (12-miesięczny)
                </div>
              </div>
              
              <div className="relative pt-5 pb-2">
                <div className="absolute left-0 right-0 h-0.5 bg-neutral-700"></div>
                <div className="absolute left-0 top-0 flex flex-col items-center" style={{left: '0%'}}>
                  <div className="w-2 h-2 rounded-full bg-red-400 mb-1"></div>
                  <div className="text-xs text-gray-300">${priceTargets.low}</div>
                </div>
                <div className="absolute top-0 flex flex-col items-center" style={{left: '50%', transform: 'translateX(-50%)'}}>
                  <div className="w-3 h-3 rounded-full bg-amber-400 mb-1"></div>
                  <div className="text-xs font-medium text-amber-300">${priceTargets.consensus}</div>
                </div>
                <div className="absolute right-0 top-0 flex flex-col items-center" style={{right: '0%'}}>
                  <div className="w-2 h-2 rounded-full bg-green-400 mb-1"></div>
                  <div className="text-xs text-gray-300">${priceTargets.high}</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div className="bg-neutral-700 rounded p-2 text-center">
                  <div className="text-xs text-gray-300 mb-1">Potencjał Wzrostu</div>
                  <div className="text-sm font-medium text-amber-300">
                    {((parseFloat(priceTargets.consensus) / report.stockData.currentPrice - 1) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-neutral-700 rounded p-2 text-center">
                  <div className="text-xs text-gray-300 mb-1">Zakres Zmienności</div>
                  <div className="text-sm font-medium text-amber-300">
                    {((parseFloat(priceTargets.high) / parseFloat(priceTargets.low) - 1) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-neutral-800 text-white border-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-300">Kluczowe Współczynniki Finansowe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-700 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-300">C/Z (P/E)</div>
                    <div className="text-base font-semibold text-amber-300">{financialMetrics.peRatio}</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {financialMetrics.peRatio !== "N/A" && parseFloat(financialMetrics.peRatio) < 15
                      ? "Poniżej średniej sektorowej 15.5x"
                      : financialMetrics.peRatio !== "N/A" && parseFloat(financialMetrics.peRatio) > 25
                      ? "Powyżej średniej sektorowej 15.5x"
                      : "Zbliżony do średniej sektorowej 15.5x"}
                  </div>
                </div>
                
                <div className="bg-neutral-700 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-300">C/WK (P/BV)</div>
                    <div className="text-base font-semibold text-amber-300">{financialMetrics.pbvRatio}x</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {parseFloat(financialMetrics.pbvRatio) < 1.5
                      ? "Poniżej średniej sektorowej 1.8x"
                      : parseFloat(financialMetrics.pbvRatio) > 2.1
                      ? "Powyżej średniej sektorowej 1.8x" 
                      : "Zbliżony do średniej sektorowej 1.8x"}
                  </div>
                </div>
                
                <div className="bg-neutral-700 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-300">Stopa dywidendy</div>
                    <div className="text-base font-semibold text-amber-300">{financialMetrics.dividendYield}%</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {parseFloat(financialMetrics.dividendYield) < 2
                      ? "Poniżej średniej rynkowej 2.5%"
                      : parseFloat(financialMetrics.dividendYield) > 3
                      ? "Powyżej średniej rynkowej 2.5%" 
                      : "Zbliżona do średniej rynkowej 2.5%"}
                  </div>
                </div>
                
                <div className="bg-neutral-700 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-300">ROE</div>
                    <div className="text-base font-semibold text-amber-300">{financialMetrics.roe}%</div>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {parseFloat(financialMetrics.roe) < 10
                      ? "Poniżej oczekiwań rynkowych"
                      : parseFloat(financialMetrics.roe) > 18
                      ? "Powyżej oczekiwań rynkowych" 
                      : "Zgodny z oczekiwaniami rynkowymi"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 text-white border-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-300">Kluczowe Czynniki Ryzyka</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analystRisks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-200">{risk}</div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {index === 0 
                          ? "Analitycy zwracają uwagę na potencjalny wpływ na przychody w kolejnych kwartałach." 
                          : index === 1 
                          ? "Może znacząco wpłynąć na marżę operacyjną i rentowność."
                          : index === 2
                          ? "Inwestorzy powinni monitorować rozwój sytuacji w tym obszarze."
                          : "Uwzględnione w modelach wyceny większości analityków."}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-300">Szczegółowa Interpretacja Analityczna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-base font-medium mb-2 text-amber-300 flex items-center">
                <BarChart4 className="h-4 w-4 mr-2" />
                Interpretacja Wskaźników Finansowych
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                Spółka {report.companyName} ({report.ticker}) prezentuje {
                  financialMetrics.peRatio !== "N/A" && parseFloat(financialMetrics.peRatio) < 15 
                    ? "atrakcyjną wycenę na tle sektora, z C/Z na poziomie " + financialMetrics.peRatio + "x wobec średniej sektorowej 15.5x." 
                    : financialMetrics.peRatio !== "N/A" && parseFloat(financialMetrics.peRatio) > 25 
                    ? "wycenę powyżej średniej sektorowej, z C/Z na poziomie " + financialMetrics.peRatio + "x wobec średniej 15.5x, co może wskazywać na wysokie oczekiwania inwestorów." 
                    : "wycenę zbliżoną do średniej sektorowej, z C/Z na poziomie " + financialMetrics.peRatio + "x przy średniej 15.5x."
                }
              </p>
              <p className="text-sm text-gray-300 mb-2">
                Wskaźnik zwrotu z kapitału własnego (ROE) na poziomie {financialMetrics.roe}% {
                  parseFloat(financialMetrics.roe) > 18 
                    ? "znacząco przekracza średnią sektorową, co świadczy o wysokiej efektywności zarządzania kapitałem." 
                    : parseFloat(financialMetrics.roe) < 10 
                    ? "plasuje się poniżej średniej rynkowej, co może wskazywać na wyzwania w efektywnym wykorzystaniu kapitału." 
                    : "jest zgodny ze średnią rynkową, co wskazuje na stabilną efektywność zarządzania kapitałem."
                }
              </p>
              <p className="text-sm text-gray-300">
                {report.summaryData.profit.change > 0 
                  ? "Rosnąca dynamika zysku netto o " + report.summaryData.profit.change + "% r/r pozytywnie wpływa na ocenę perspektyw spółki przez analityków." 
                  : "Spadek zysku netto o " + Math.abs(report.summaryData.profit.change) + "% r/r budzi ostrożność analityków względem perspektyw krótkoterminowych."}
              </p>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-base font-medium mb-2 text-amber-300 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Kluczowe Czynniki Decyzyjne
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1 flex items-center">
                    <TrendingUp className="h-3.5 w-3.5 mr-1 text-green-400" />
                    Argumenty za wzrostem
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-400 font-bold text-xs mt-0.5">+</span>
                      <span className="text-gray-300">
                        {report.summaryData.revenue.change > 0 
                          ? "Wzrost przychodów o " + report.summaryData.revenue.change + "% r/r potwierdza skuteczność strategii komercyjnej" 
                          : "Plan restrukturyzacji może przynieść poprawę rentowności w kolejnych kwartałach"}
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-400 font-bold text-xs mt-0.5">+</span>
                      <span className="text-gray-300">
                        {report.summaryData.profit.change > 0 
                          ? "Poprawa marży zysku netto świadczy o skutecznej kontroli kosztów"
                          : "Wycena poniżej średniej sektorowej oferuje potencjał wzrostu w średnim terminie"}
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-400 font-bold text-xs mt-0.5">+</span>
                      <span className="text-gray-300">
                        Rozwój w segmencie {report.reportCategory[0]} może być istotnym motorem wzrostu w kolejnych latach
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1 flex items-center">
                    <TrendingDown className="h-3.5 w-3.5 mr-1 text-red-400" />
                    Czynniki ryzyka
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold text-xs mt-0.5">−</span>
                      <span className="text-gray-300">
                        {report.summaryData.profit.change < 0 
                          ? "Spadek zysku netto o " + Math.abs(report.summaryData.profit.change) + "% r/r budzi obawy o perspektywy krótkoterminowe" 
                          : "Rosnąca presja kosztowa może negatywnie wpłynąć na marże w kolejnych kwartałach"}
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold text-xs mt-0.5">−</span>
                      <span className="text-gray-300">
                        Nasilająca się konkurencja w kluczowych segmentach działalności
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold text-xs mt-0.5">−</span>
                      <span className="text-gray-300">
                        {report.stockData.yearToDateChange < 0 
                          ? "Słaba relatywna siła cenowa akcji na tle rynku i sektora" 
                          : "Ewentualne spowolnienie gospodarcze może ograniczyć dynamikę wzrostu"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-base font-medium mb-2 text-amber-300 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Perspektywy Średnioterminowe
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                W perspektywie średnioterminowej (12-18 miesięcy) analitycy przewidują {
                  parseInt(analystSentiment.buy) > 50 
                    ? "poprawę wyników finansowych spółki, napędzaną przez " + (report.reportCategory[0] || "kluczowe segmenty działalności") + " oraz inicjatywy optymalizacji kosztowej." 
                    : parseInt(analystSentiment.sell) > 50 
                    ? "dalsze wyzwania związane z presją kosztową i intensywną konkurencją w sektorze, co może negatywnie wpływać na dynamikę zysków." 
                    : "stabilizację wyników przy umiarkowanym potencjale wzrostu, uzależnionym od realizacji strategicznych inicjatyw oraz ogólnej koniunktury rynkowej."
                }
              </p>
              <p className="text-sm text-gray-300">
                Konsensus analityków zakłada, że {report.companyName} osiągnie w najbliższych 4 kwartałach przychody na poziomie ok. {formatNumber(report.summaryData.revenue.value * 4 * (1 + report.summaryData.revenue.change/100), report.summaryData.revenue.unit)}, co stanowiłoby {
                  report.summaryData.revenue.change > 0 
                    ? "wzrost o ok. " + (report.summaryData.revenue.change * 0.8).toFixed(1) + "% r/r." 
                    : "spadek o ok. " + (Math.abs(report.summaryData.revenue.change) * 0.5).toFixed(1) + "% r/r."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
