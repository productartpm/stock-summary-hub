
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, ArrowUp, ArrowDown } from 'lucide-react';

// Types for indicators
interface StockWithIndicator {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  volume: number;
  indicator?: number;
}

// Sample data for indicators page
const topGainers: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 8.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 7.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 6.5, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 5.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 5.3, volume: 890000 },
  { id: '6', name: 'Medical Research', ticker: 'MEDR', price: 78.90, change: 4.9, volume: 540000 },
  { id: '7', name: 'Digital Networks', ticker: 'DNET', price: 165.30, change: 4.5, volume: 670000 },
  { id: '8', name: 'Smart Materials', ticker: 'SMAT', price: 92.40, change: 4.2, volume: 480000 },
  { id: '9', name: 'Urban Development', ticker: 'UDEV', price: 118.60, change: 3.8, volume: 390000 },
  { id: '10', name: 'Green Transportation', ticker: 'GTRN', price: 243.20, change: 3.6, volume: 430000 }
];

const topLosers: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -7.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -6.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -6.2, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -5.7, volume: 540000 },
  { id: '5', name: 'Telecom Provider', ticker: 'TLPR', price: 172.30, change: -5.1, volume: 680000 },
  { id: '6', name: 'Aerospace Defense', ticker: 'ASDF', price: 312.60, change: -4.8, volume: 420000 },
  { id: '7', name: 'Pharmaceutical Corp', ticker: 'PHCO', price: 92.30, change: -4.5, volume: 570000 },
  { id: '8', name: 'Food Processing', ticker: 'FDPR', price: 45.60, change: -4.1, volume: 390000 },
  { id: '9', name: 'Mining Resources', ticker: 'MNRS', price: 128.90, change: -3.8, volume: 620000 },
  { id: '10', name: 'Entertainment Media', ticker: 'ENTM', price: 76.20, change: -3.5, volume: 480000 }
];

const rsiAbove70: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 8.2, volume: 1250000, indicator: 78.4 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 7.1, volume: 980000, indicator: 82.1 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 6.5, volume: 750000, indicator: 75.8 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 5.8, volume: 620000, indicator: 79.3 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 5.3, volume: 890000, indicator: 72.7 },
  { id: '6', name: 'Medical Research', ticker: 'MEDR', price: 78.90, change: 4.9, volume: 540000, indicator: 76.2 },
  { id: '7', name: 'Digital Networks', ticker: 'DNET', price: 165.30, change: 4.5, volume: 670000, indicator: 71.9 }
];

const rsiBelow30: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -7.8, volume: 890000, indicator: 22.3 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -6.9, volume: 760000, indicator: 24.8 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -6.2, volume: 930000, indicator: 19.6 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -5.7, volume: 540000, indicator: 26.1 },
  { id: '5', name: 'Telecom Provider', ticker: 'TLPR', price: 172.30, change: -5.1, volume: 680000, indicator: 27.5 },
  { id: '6', name: 'Aerospace Defense', ticker: 'ASDF', price: 312.60, change: -4.8, volume: 420000, indicator: 28.9 }
];

const consecutiveUp: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 3.3, volume: 890000 }
];

const consecutiveDown: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 }
];

const macdBuySignal: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 3.3, volume: 890000 },
  { id: '6', name: 'Medical Research', ticker: 'MEDR', price: 78.90, change: 1.9, volume: 540000 }
];

const macdSellSignal: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 },
  { id: '5', name: 'Telecom Provider', ticker: 'TLPR', price: 172.30, change: -0.6, volume: 680000 }
];

const goldenCross: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 }
];

const deathCross: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 }
];

const volumeIncreaseUp: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 3.3, volume: 890000 }
];

const volumeIncreaseDown: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 }
];

const IndicatorsPage = () => {
  const [activeTab, setActiveTab] = useState('top-gainers');
  
  const renderStockList = (stocks: StockWithIndicator[], showIndicator = false, indicatorLabel = 'Indicator') => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Spółka</TableHead>
            <TableHead>Ticker</TableHead>
            <TableHead className="text-right">Cena</TableHead>
            <TableHead className="text-right">Zmiana</TableHead>
            {showIndicator && <TableHead className="text-right">{indicatorLabel}</TableHead>}
            <TableHead className="text-right">Wolumen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">{stock.name}</TableCell>
              <TableCell>{stock.ticker}</TableCell>
              <TableCell className="text-right">{stock.price.toFixed(2)} PLN</TableCell>
              <TableCell className="text-right">
                <span className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 
                    ? <ArrowUp className="mr-1 h-4 w-4" /> 
                    : <ArrowDown className="mr-1 h-4 w-4" />}
                  {Math.abs(stock.change).toFixed(2)}%
                </span>
              </TableCell>
              {showIndicator && 
                <TableCell className="text-right">{stock.indicator?.toFixed(2)}</TableCell>
              }
              <TableCell className="text-right">{(stock.volume / 1000).toFixed(0)}k</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Centrum Raportów Giełdowych</h1>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-4 text-sm">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">ESPI</a>
              <a href="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">Kalendarium raportów</a>
              <a href="/indicators" className="text-primary">Wskaźniki</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Wskaźniki techniczne i trendy rynkowe</h1>
          <p className="text-muted-foreground">
            Analizuj akcje na podstawie kluczowych wskaźników technicznych i trendów cenowych.
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 w-fit">
              <TabsTrigger value="top-gainers" className="flex gap-1 items-center whitespace-nowrap">
                <TrendingUp className="h-4 w-4" /> Top 10 wzrosty
              </TabsTrigger>
              <TabsTrigger value="top-losers" className="flex gap-1 items-center whitespace-nowrap">
                <TrendingDown className="h-4 w-4" /> Top 10 spadki
              </TabsTrigger>
              <TabsTrigger value="rsi-above-70" className="whitespace-nowrap">RSI &gt; 70</TabsTrigger>
              <TabsTrigger value="rsi-below-30" className="whitespace-nowrap">RSI &lt; 30</TabsTrigger>
              <TabsTrigger value="consecutive-up" className="whitespace-nowrap">5 sesji wzrostowych</TabsTrigger>
              <TabsTrigger value="consecutive-down" className="whitespace-nowrap">5 sesji spadkowych</TabsTrigger>
              <TabsTrigger value="macd-buy" className="whitespace-nowrap">MACD - kupno</TabsTrigger>
              <TabsTrigger value="macd-sell" className="whitespace-nowrap">MACD - sprzedaż</TabsTrigger>
              <TabsTrigger value="golden-cross" className="whitespace-nowrap">Złoty krzyż</TabsTrigger>
              <TabsTrigger value="death-cross" className="whitespace-nowrap">Krzyż śmierci</TabsTrigger>
              <TabsTrigger value="volume-up" className="whitespace-nowrap">Wolumen na wzroście</TabsTrigger>
              <TabsTrigger value="volume-down" className="whitespace-nowrap">Wolumen na spadku</TabsTrigger>
            </TabsList>
          </div>
          
          <Card>
            <TabsContent value="top-gainers" className="space-y-4">
              <CardHeader>
                <CardTitle>Top 10 spółek - największe wzrosty dnia</CardTitle>
                <CardDescription>
                  Spółki z najwyższym procentowym wzrostem podczas ostatniej sesji
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(topGainers)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="top-losers" className="space-y-4">
              <CardHeader>
                <CardTitle>Top 10 spółek - największe spadki dnia</CardTitle>
                <CardDescription>
                  Spółki z najwyższym procentowym spadkiem podczas ostatniej sesji
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(topLosers)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="rsi-above-70" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z RSI powyżej 70 - potencjalna wyprzedaż</CardTitle>
                <CardDescription>
                  RSI (Relative Strength Index) powyżej 70 może wskazywać, że spółka jest wykupiona i może nastąpić korekta
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(rsiAbove70, true, 'RSI')}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="rsi-below-30" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z RSI poniżej 30 - potencjalny niedowartościowane</CardTitle>
                <CardDescription>
                  RSI (Relative Strength Index) poniżej 30 może wskazywać, że spółka jest wyprzedana i może nastąpić odbicie
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(rsiBelow30, true, 'RSI')}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="consecutive-up" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z 5 lub więcej sesji wzrostowych z rzędu</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały wzrosty cen przez co najmniej 5 kolejnych sesji giełdowych
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(consecutiveUp)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="consecutive-down" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z 5 lub więcej sesji spadkowych z rzędu</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały spadki cen przez co najmniej 5 kolejnych sesji giełdowych
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(consecutiveDown)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="macd-buy" className="space-y-4">
              <CardHeader>
                <CardTitle>MACD - sygnał kupna</CardTitle>
                <CardDescription>
                  Spółki, dla których linia MACD przecina linię sygnalną od dołu, generując sygnał kupna
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(macdBuySignal)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="macd-sell" className="space-y-4">
              <CardHeader>
                <CardTitle>MACD - sygnał sprzedaży</CardTitle>
                <CardDescription>
                  Spółki, dla których linia MACD przecina linię sygnalną od góry, generując sygnał sprzedaży
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(macdSellSignal)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="golden-cross" className="space-y-4">
              <CardHeader>
                <CardTitle>Złoty krzyż (średnie 50 i 200 sesji)</CardTitle>
                <CardDescription>
                  Spółki, dla których średnia 50-sesyjna przecięła średnią 200-sesyjną od dołu, sygnalizując potencjalny trend wzrostowy
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(goldenCross)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="death-cross" className="space-y-4">
              <CardHeader>
                <CardTitle>Krzyż śmierci (średnie 50 i 200 sesji)</CardTitle>
                <CardDescription>
                  Spółki, dla których średnia 50-sesyjna przecięła średnią 200-sesyjną od góry, sygnalizując potencjalny trend spadkowy
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(deathCross)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="volume-up" className="space-y-4">
              <CardHeader>
                <CardTitle>Zwiększony wolumen na wzroście</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały znaczący wzrost ceny przy wolumenie wyższym niż średnia 3-miesięczna
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(volumeIncreaseUp)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="volume-down" className="space-y-4">
              <CardHeader>
                <CardTitle>Zwiększony wolumen na spadku</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały znaczący spadek ceny przy wolumenie wyższym niż średnia 3-miesięczna
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(volumeIncreaseDown)}
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
};

export default IndicatorsPage;
