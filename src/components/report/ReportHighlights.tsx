import { formatNumber } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, DollarSign, LineChart, PieChart, Award, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface ReportHighlightsProps {
  report: FinancialReport;
}

export const ReportHighlights = ({ report }: ReportHighlightsProps) => {
  // Generate fiscal period based on report date
  const generateFiscalPeriod = () => {
    const date = new Date(report.reportDate);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    let quarter;
    if (month >= 1 && month <= 3) quarter = 'Q1';
    else if (month >= 4 && month <= 6) quarter = 'Q2';
    else quarter = 'Q4';
    
    return { quarter, fiscalYear: year };
  };
  
  const fiscalPeriod = generateFiscalPeriod();
  
  // Generate random financial metrics for supplementary information
  const generateFinancialInsights = () => {
    // Random values based on revenue and profit
    const cashFlow = report.summaryData.profit.value * (0.8 + Math.random() * 0.6);
    const cashFlowChange = report.summaryData.profit.change * (0.7 + Math.random() * 0.6);
    
    const debtToEquity = (Math.random() * 0.8 + 0.2).toFixed(2);
    const currentRatio = (Math.random() * 1.5 + 1).toFixed(2);
    const dividendYield = (Math.random() * 3).toFixed(2);
    
    return {
      cashFlow,
      cashFlowChange,
      debtToEquity,
      currentRatio,
      dividendYield
    };
  };
  
  const financialInsights = generateFinancialInsights();
  
  // Generate random segment data based on revenue
  const generateSegmentData = () => {
    const totalRevenue = report.summaryData.revenue.value;
    const segmentCount = Math.min(Math.floor(Math.random() * 3) + 2, 4);
    
    let remainingPercentage = 100;
    const segments = [];
    
    for (let i = 0; i < segmentCount - 1; i++) {
      const segmentPercentage = Math.floor(Math.random() * (remainingPercentage - 10) + 10);
      remainingPercentage -= segmentPercentage;
      
      segments.push({
        name: getSegmentName(i),
        value: (totalRevenue * segmentPercentage / 100),
        percentage: segmentPercentage,
        change: (Math.random() * 30 - 10).toFixed(1)
      });
    }
    
    segments.push({
      name: getSegmentName(segmentCount - 1),
      value: (totalRevenue * remainingPercentage / 100),
      percentage: remainingPercentage,
      change: (Math.random() * 30 - 10).toFixed(1)
    });
    
    return segments.sort((a, b) => b.value - a.value);
  };
  
  const getSegmentName = (index) => {
    const segmentNames = [
      'Produkty Podstawowe',
      'Usługi Profesjonalne',
      'Rozwiązania Zaawansowane',
      'Usługi Subskrypcyjne',
      'Sektor Międzynarodowy',
      'Rozwiązania Branżowe'
    ];
    
    return segmentNames[index % segmentNames.length];
  };
  
  const segmentData = generateSegmentData();
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Kluczowe Wskaźniki i Analiza</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-300">Ogólna Kondycja Finansowa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-1">Raport za {fiscalPeriod.quarter} {fiscalPeriod.fiscalYear}</div>
              
              <div className="mb-4 p-3 bg-neutral-700 rounded-lg">
                <h3 className="text-sm font-medium text-amber-300 mb-1">Ocena Ogólna</h3>
                <p className="text-sm text-gray-300">
                  {report.summaryData.revenue.change > 0 && report.summaryData.profit.change > 0 
                    ? `Spółka ${report.companyName} wykazuje silny wzrost w kluczowych obszarach działalności, z poprawą zarówno przychodów jak i zysków. Szczególnie pozytywnie należy ocenić dynamikę zysków wyprzedzającą wzrost przychodów, co wskazuje na poprawę efektywności operacyjnej.`
                    : report.summaryData.revenue.change > 0 && report.summaryData.profit.change <= 0
                    ? `Spółka ${report.companyName} odnotowuje wzrost przychodów przy jednoczesnym spadku zysków, co może wskazywać na presję kosztową lub inwestycje w rozwój, które obciążają krótkoterminowe wyniki finansowe.`
                    : report.summaryData.revenue.change <= 0 && report.summaryData.profit.change > 0
                    ? `Spółka ${report.companyName} wykazuje poprawę zysków mimo spadku przychodów, co sugeruje skuteczną restrukturyzację kosztową i optymalizację operacyjną. Kluczowe będzie utrzymanie tej tendencji w kolejnych kwartałach.`
                    : `Spółka ${report.companyName} zmaga się z wyzwaniami zarówno po stronie przychodów jak i zysków. Konieczna może być rewizja strategii biznesowej i wprowadzenie programu naprawczego w celu odwrócenia negatywnych trendów.`
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <div className="text-gray-400 text-xs mb-1">Przychody</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-white">
                      {formatNumber(report.summaryData.revenue.value, report.summaryData.revenue.unit)}
                    </span>
                    <span className={`text-xs font-medium ${report.summaryData.revenue.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {report.summaryData.revenue.change >= 0 ? '+' : ''}{report.summaryData.revenue.change}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {report.summaryData.revenue.change > 10 
                      ? 'Silny wzrost' 
                      : report.summaryData.revenue.change > 0 
                      ? 'Stabilny wzrost' 
                      : report.summaryData.revenue.change > -10 
                      ? 'Lekki spadek' 
                      : 'Znaczący spadek'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-400 text-xs mb-1">Zysk netto</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-white">
                      {formatNumber(report.summaryData.profit.value, report.summaryData.profit.unit)}
                    </span>
                    <span className={`text-xs font-medium ${report.summaryData.profit.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {report.summaryData.profit.change >= 0 ? '+' : ''}{report.summaryData.profit.change}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {report.summaryData.profit.change > 15 
                      ? 'Znacząca poprawa' 
                      : report.summaryData.profit.change > 0 
                      ? 'Poprawa rentowności' 
                      : report.summaryData.profit.change > -15 
                      ? 'Umiarkowany spadek' 
                      : 'Silny spadek rentowności'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-sm font-medium text-amber-300 mb-2">Kluczowe Czynniki</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  {report.summaryData.revenue.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-gray-300">
                    <span className="font-medium">
                      {report.summaryData.revenue.change >= 0 ? 'Wzrost' : 'Spadek'} przychodów o {Math.abs(report.summaryData.revenue.change)}%
                    </span>
                    {' '}
                    {report.summaryData.revenue.change >= 0 
                      ? 'wynika głównie z rozwoju w segmentach ' + report.reportCategory.join(' i ') + '.'
                      : 'spowodowany głównie trudnościami w segmentach ' + report.reportCategory.join(' i ') + '.'}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  {report.summaryData.profit.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="text-gray-300">
                    <span className="font-medium">
                      {report.summaryData.profit.change >= 0 ? 'Wzrost' : 'Spadek'} zysku netto o {Math.abs(report.summaryData.profit.change)}%
                    </span>
                    {' '}
                    {report.summaryData.profit.change >= 0 
                      ? report.summaryData.revenue.change >= 0 
                        ? 'wspierany wzrostem przychodów i poprawą efektywności operacyjnej.' 
                        : 'mimo spadku przychodów, dzięki skutecznej optymalizacji kosztów.'
                      : report.summaryData.revenue.change >= 0 
                        ? 'pomimo wzrostu przychodów, co wskazuje na presję marżową i rosnące koszty.' 
                        : 'odzwierciedla trudności operacyjne i malejącą bazę przychodową.'}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-300">
                    <span className="font-medium">
                      Marża zysku netto: {(report.summaryData.profit.value / report.summaryData.revenue.value * 100).toFixed(1)}%
                    </span>
                    {' '}
                    {(report.summaryData.profit.value / report.summaryData.revenue.value) > 0.15 
                      ? 'znajduje się znacząco powyżej średniej sektorowej, świadcząc o silnej pozycji konkurencyjnej.'
                      : (report.summaryData.profit.value / report.summaryData.revenue.value) > 0.08
                      ? 'jest zgodna ze średnią sektorową, wskazując na stabilną pozycję rynkową.'
                      : 'jest poniżej średniej sektorowej, co może sugerować wyzwania konkurencyjne.'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-300">Analiza Sektorowa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-neutral-700 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-amber-300 mb-1">Pozycja Rynkowa</h3>
              <p className="text-sm text-gray-300">
                {report.companyName} {
                  report.summaryData.revenue.change > 10 && report.summaryData.profit.change > 0
                    ? `umacnia swoją pozycję w sektorze ${report.reportCategory[0]}, osiągając wyniki przewyższające średnią branżową o około ${(report.summaryData.revenue.change - 5).toFixed(1)} p.p. w zakresie dynamiki przychodów.`
                    : report.summaryData.revenue.change > 0
                    ? `utrzymuje stabilną pozycję w sektorze ${report.reportCategory[0]}, z wynikami zbliżonymi do średniej branżowej.`
                    : `stoi przed wyzwaniami w sektorze ${report.reportCategory[0]}, notując wyniki poniżej średniej branżowej, co może wpływać na udział rynkowy.`
                }
              </p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-amber-300 mb-2">Struktura Przychodów</h3>
              <div className="space-y-3">
                {segmentData.map((segment, index) => (
                  <div key={index} className="bg-neutral-700 p-2 rounded">
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium text-gray-300">{segment.name}</div>
                      <div className="text-sm font-medium text-white">{segment.percentage}%</div>
                    </div>
                    <div className="w-full bg-neutral-600 h-2 rounded overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{width: `${segment.percentage}%`}}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <div className="text-gray-400">{formatNumber(segment.value, report.summaryData.revenue.unit)}</div>
                      <div className={Number(segment.change) >= 0 ? "text-green-400" : "text-red-400"}>
                        {Number(segment.change) >= 0 ? "+" : ""}{segment.change}% r/r
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-sm font-medium text-amber-300 mb-1">Kontekst Wyników</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-start gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-amber-400 text-neutral-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">Otoczenie rynkowe</span> - {
                      report.summaryData.revenue.change > 0
                        ? "sprzyjające warunki wspierały rozwój w kluczowych segmentach."
                        : "wyzwania rynkowe wpływały negatywnie na wyniki spółki."
                    }
                  </div>
                </div>
                
                <div className="flex items-start gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-amber-400 text-neutral-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">Konkurencja</span> - intensywność działań konkurencyjnych {
                      report.summaryData.profit.change < 0 && report.summaryData.revenue.change > 0
                        ? "wywierała presję na marże pomimo wzrostu przychodów."
                        : report.summaryData.profit.change > 0
                        ? "była skutecznie zarządzana, co pozwoliło utrzymać rentowność."
                        : "stanowiła istotne wyzwanie dla pozycji rynkowej spółki."
                    }
                  </div>
                </div>
                
                <div className="flex items-start gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-amber-400 text-neutral-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">Realizacja strategii</span> - działania zarządu {
                      report.summaryData.profit.change > 10
                        ? "przynoszą znaczące efekty, przekładając się na ponadprzeciętny wzrost rentowności."
                        : report.summaryData.profit.change > 0
                        ? "są ukierunkowane na długoterminowy, zrównoważony rozwój."
                        : "są koncentrowane na działaniach naprawczych i transformacji biznesowej."
                    }
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-300">Dodatkowe Wskaźniki Finansowe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Przepływy pieniężne</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    {formatNumber(financialInsights.cashFlow, report.summaryData.profit.unit)}
                  </span>
                  <span className={`text-xs font-medium ${financialInsights.cashFlowChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {financialInsights.cashFlowChange >= 0 ? '+' : ''}{financialInsights.cashFlowChange.toFixed(1)}%
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {financialInsights.cashFlowChange > 0 
                    ? 'Rosnąca zdolność generowania gotówki' 
                    : 'Presja na generowanie gotówki'}
                </div>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Wskaźnik D/E</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    {financialInsights.debtToEquity}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {parseFloat(financialInsights.debtToEquity) < 0.5 
                    ? 'Bezpieczny poziom zadłużenia' 
                    : parseFloat(financialInsights.debtToEquity) < 0.8 
                    ? 'Umiarkowane zadłużenie' 
                    : 'Podwyższony poziom zadłużenia'}
                </div>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Wskaźnik płynności</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    {financialInsights.currentRatio}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {parseFloat(financialInsights.currentRatio) > 1.8 
                    ? 'Bardzo dobra płynność finansowa' 
                    : parseFloat(financialInsights.currentRatio) > 1.2 
                    ? 'Dobra płynność finansowa' 
                    : 'Adekwatna płynność finansowa'}
                </div>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Stopa dywidendy</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    {financialInsights.dividendYield}%
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {parseFloat(financialInsights.dividendYield) > 2.5 
                    ? 'Atrakcyjna dla inwestorów dywidendowych' 
                    : parseFloat(financialInsights.dividendYield) > 1 
                    ? 'Na poziomie rynkowym' 
                    : 'Poniżej średniej rynkowej'}
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-sm font-medium text-amber-300 mb-2">Interpretacja Finansowa</h3>
              <p className="text-sm text-gray-300 mb-2">
                {report.companyName} prezentuje {
                  report.summaryData.profit.change > 0 && financialInsights.cashFlowChange > 0
                    ? "stabilną kondycję finansową z rosnącą rentownością i silnymi przepływami pieniężnymi, co stanowi solidną bazę do realizacji planów rozwojowych."
                    : report.summaryData.profit.change > 0 && financialInsights.cashFlowChange <= 0
                    ? "poprawę rentowności przy jednoczesnych wyzwaniach w zakresie przepływów pieniężnych, co może ograniczać elastyczność finansową spółki."
                    : report.summaryData.profit.change <= 0 && financialInsights.cashFlowChange > 0
                    ? "presję na rentowność przy utrzymaniu zdolności do generowania gotówki, co daje przestrzeń na działania naprawcze i inwestycje."
                    : "wyzwania zarówno w obszarze rentowności jak i przepływów pieniężnych, wskazujące na potrzebę kompleksowej rewizji modelu biznesowego."
                }
              </p>
              <p className="text-sm text-gray-300">
                Wskaźnik zadłużenia na poziomie {financialInsights.debtToEquity} oraz płynność {financialInsights.currentRatio} {
                  parseFloat(financialInsights.debtToEquity) < 0.6 && parseFloat(financialInsights.currentRatio) > 1.5
                    ? "świadczą o bezpiecznej strukturze finansowania i dobrej płynności, co zapewnia stabilność finansową nawet w przypadku pogorszenia koniunktury."
                    : parseFloat(financialInsights.debtToEquity) < 0.8 && parseFloat(financialInsights.currentRatio) > 1.2
                    ? "pozostają na bezpiecznym poziomie, zapewniając równowagę między stabilnością a efektywnością finansowania."
                    : "wskazują na obszary wymagające monitorowania w kontekście zapewnienia długoterminowej stabilności finansowej spółki."
                }
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-300">Notowania i Wycena</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Kurs akcji</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-white">
                    ${report.stockData.currentPrice.toFixed(2)}
                  </span>
                  <span className={`text-xs font-medium ${report.stockData.priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {report.stockData.priceChange >= 0 ? '+' : ''}{report.stockData.priceChange.toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Od początku roku: {report.stockData.yearToDateChange >= 0 ? '+' : ''}{report.stockData.yearToDateChange.toFixed(2)}%
                </div>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Kapitalizacja</div>
                <div className="text-lg font-bold text-white">
                  ${(report.stockData.currentPrice * report.stockData.sharesOutstanding / 1000).toFixed(2)}B
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {report.stockData.sharesOutstanding} mln akcji
                </div>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">52-tyg. zakres</div>
                <div className="text-base font-medium text-white">
                  ${report.stockData.low52Week.toFixed(2)} - ${report.stockData.high52Week.toFixed(2)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Obecna cena: {(((report.stockData.currentPrice - report.stockData.low52Week) / (report.stockData.high52Week - report.stockData.low52Week)) * 100).toFixed(0)}% zakresu
                </div>
              </div>
              
              <div className="bg-neutral-700 p-3 rounded">
                <div className="text-xs text-gray-400 mb-1">Wolumen (śr. dzienny)</div>
                <div className="text-base font-medium text-white">
                  {(report.stockData.averageDailyVolume / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {((report.stockData.averageDailyVolume / report.stockData.sharesOutstanding) * 100).toFixed(2)}% akcji w obiegu
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-amber-300 mb-2">Wykres 3-miesięczny</h3>
              <div className="h-32 flex items-end">
                <div className="relative w-full h-full flex items-end">
                  <div className="absolute left-0 right-0 bottom-0 top-0 flex flex-col justify-between">
                    <div className="border-b border-neutral-600 text-xs text-neutral-500">
                      ${report.stockData.high52Week.toFixed(2)}
                    </div>
                    <div className="border-b border-neutral-600 text-xs text-neutral-500">
                      ${((report.stockData.high52Week + report.stockData.low52Week) / 2).toFixed(2)}
                    </div>
                    <div className="border-b border-neutral-600 text-xs text-neutral-500">
                      ${report.stockData.low52Week.toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Simplified price chart */}
                  <div className="relative w-full h-full flex items-end z-10">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path 
                        d={generateRandomChartPath(report.stockData.priceChange, report.stockData.volatility)} 
                        stroke={report.stockData.priceChange >= 0 ? "#4ade80" : "#f87171"} 
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <div>-3m</div>
                <div>-2m</div>
                <div>-1m</div>
                <div>Obecnie</div>
              </div>
            </div>
            
            <div className="p-3 bg-neutral-700 rounded-lg">
              <h3 className="text-sm font-medium text-amber-300 mb-2">Interpretacja Rynkowa</h3>
              <p className="text-sm text-gray-300 mb-2">
                Akcje spółki {report.companyName} {
                  report.stockData.yearToDateChange > 10
                    ? "znacząco przewyższają indeksy rynkowe w tym roku, zyskując " + report.stockData.yearToDateChange.toFixed(1) + "% YTD, co odzwierciedla silne zaufanie inwestorów do perspektyw spółki."
                    : report.stockData.yearToDateChange > 0
                    ? "zachowują się zgodnie z trendem rynkowym w tym roku, zyskując " + report.stockData.yearToDateChange.toFixed(1) + "% YTD, co wskazuje na stabilne postrzeganie spółki przez inwestorów."
                    : "pozostają pod presją w tym roku, tracąc " + Math.abs(report.stockData.yearToDateChange).toFixed(1) + "% YTD, co sugeruje ostrożne podejście inwestorów do perspektyw spółki."
                }
              </p>
              <p className="text-sm text-gray-300">
                Względem 52-tygodniowego zakresu cenowego, obecna wycena {
                  (((report.stockData.currentPrice - report.stockData.low52Week) / (report.stockData.high52Week - report.stockData.low52Week)) * 100) > 75
                    ? "znajduje się blisko górnej granicy, co może sugerować ograniczony potencjał wzrostu w krótkim terminie bez istotnej poprawy wyników."
                    : (((report.stockData.currentPrice - report.stockData.low52Week) / (report.stockData.high52Week - report.stockData.low52Week)) * 100) > 40
                    ? "utrzymuje się w środkowej części, odzwierciedlając zrównoważone oczekiwania inwestorów względem potencjału i ryzyka."
                    : "jest bliżej dolnej granicy, co przy poprawie sentymentu i wyników może oferować potencjał wzrostowy."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to generate random chart path
const generateRandomChartPath = (priceChange, volatility) => {
  let path = "M0,50";
  const pointCount = 20;
  let currentY = 50;
  
  // Determine if trend is up or down based on price change
  const trendFactor = priceChange >= 0 ? -0.5 : 0.5;
  
  for (let i = 1; i <= pointCount; i++) {
    const x = (i / pointCount) * 100;
    
    // Calculate random movement with trend bias
    const randomMove = (Math.random() - 0.5) * volatility * 3;
    const trendMove = trendFactor * ((i / pointCount) - 0.5) * 2 * Math.abs(priceChange) * 0.5;
    
    currentY = Math.max(10, Math.min(90, currentY + randomMove + trendMove));
    
    path += ` L${x},${currentY}`;
  }
  
  // Ensure final point matches price change direction
  const finalY = priceChange >= 0 ? 30 : 70;
  path += ` L100,${finalY}`;
  
  return path;
};
