import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, ArrowUp, ArrowDown, Calendar, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';

interface StockWithIndicator {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  volume: number;
  indicator?: number;
}

const currentDate = new Date();
const formattedDate = format(currentDate, 'd MMMM yyyy', { locale: pl });

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
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 }
];

const IndicatorsPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { user } = useAuth();
  const { toast } = useToast();
  
  const premiumTabs = ['tab7', 'tab8', 'tab9', 'tab10', 'tab11', 'tab12'];
  
  const handlePremiumTabClick = (tabValue: string) => {
    if (!user && premiumTabs.includes(tabValue)) {
      toast({
        title: "Funkcja wymaga logowania",
        description: "Zaloguj się, aby zobaczyć zaawansowane wskaźniki.",
        duration: 3000,
      });
    } else {
      setActiveTab(tabValue);
    }
  };
  
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
      <Header activeTab="indicators" />
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Wskaźniki techniczne i trendy rynkowe</h1>
          <p className="text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Dane na dzień: {formattedDate}
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={tabValue => handlePremiumTabClick(tabValue)} 
          className="space-y-4"
        >
          <div className="overflow-auto">
            <TabsList className="w-full h-auto flex flex-wrap gap-2 p-2 justify-start">
              <TabsTrigger value="tab1" className="px-4 py-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">1</span>
                <TrendingUp className="h-4 w-4 mr-1" /> Top 10 wzrosty
              </TabsTrigger>
              <TabsTrigger value="tab2" className="px-4 py-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">2</span>
                <TrendingDown className="h-4 w-4 mr-1" /> Top 10 spadki
              </TabsTrigger>
              <TabsTrigger value="tab3" className="px-4 py-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">3</span>
                RSI &gt; 70
              </TabsTrigger>
              <TabsTrigger value="tab4" className="px-4 py-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">4</span>
                RSI &lt; 30
              </TabsTrigger>
              <TabsTrigger value="tab5" className="px-4 py-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">5</span>
                5 sesji wzrostowych
              </TabsTrigger>
              <TabsTrigger value="tab6" className="px-4 py-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">6</span>
                5 sesji spadkowych
              </TabsTrigger>
              
              <TabsTrigger 
                value="tab7" 
                className="px-4 py-2"
                disabled={!user}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">7</span>
                {!user && (
                  <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    <Lock className="h-3 w-3 text-black" />
                  </span>
                )}
                MACD - kupno
              </TabsTrigger>
              <TabsTrigger 
                value="tab8" 
                className="px-4 py-2"
                disabled={!user}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">8</span>
                {!user && (
                  <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    <Lock className="h-3 w-3 text-black" />
                  </span>
                )}
                MACD - sprzedaż
              </TabsTrigger>
              <TabsTrigger 
                value="tab9" 
                className="px-4 py-2"
                disabled={!user}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">9</span>
                {!user && (
                  <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    <Lock className="h-3 w-3 text-black" />
                  </span>
                )}
                Złoty krzyż
              </TabsTrigger>
              <TabsTrigger 
                value="tab10" 
                className="px-4 py-2"
                disabled={!user}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">10</span>
                {!user && (
                  <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    <Lock className="h-3 w-3 text-black" />
                  </span>
                )}
                Krzyż śmierci
              </TabsTrigger>
              <TabsTrigger 
                value="tab11" 
                className="px-4 py-2"
                disabled={!user}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">11</span>
                {!user && (
                  <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    <Lock className="h-3 w-3 text-black" />
                  </span>
                )}
                Wolumen na wzroście
              </TabsTrigger>
              <TabsTrigger 
                value="tab12" 
                className="px-4 py-2"
                disabled={!user}
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">12</span>
                {!user && (
                  <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
                    <Lock className="h-3 w-3 text-black" />
                  </span>
                )}
                Wolumen na spadku
              </TabsTrigger>
            </TabsList>
          </div>
          
          <Card>
            <TabsContent value="tab1" className="space-y-4">
              <CardHeader>
                <CardTitle>Top 10 spółek - największe wzrosty dnia</CardTitle>
                <CardDescription>
                  Spółki z najwyższym procentowym wzrostem podczas ostatniej sesji ({formattedDate})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(topGainers)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab2" className="space-y-4">
              <CardHeader>
                <CardTitle>Top 10 spółek - największe spadki dnia</CardTitle>
                <CardDescription>
                  Spółki z najwyższym procentowym spadkiem podczas ostatniej sesji ({formattedDate})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(topLosers)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab3" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z RSI powyżej 70 - potencjalna wyprzedaż</CardTitle>
                <CardDescription>
                  RSI (Relative Strength Index) powyżej 70 może wskazywać, że spółka jest wykupiona i może nastąpić korekta. 
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(rsiAbove70, true, 'RSI')}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab4" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z RSI poniżej 30 - potencjalnie niedowartościowane</CardTitle>
                <CardDescription>
                  RSI (Relative Strength Index) poniżej 30 może wskazywać, że spółka jest wyprzedana i może nastąpić odbicie.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(rsiBelow30, true, 'RSI')}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab5" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z 5 lub więcej sesji wzrostowych z rzędu</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały wzrosty cen przez co najmniej 5 kolejnych sesji giełdowych.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(consecutiveUp)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab6" className="space-y-4">
              <CardHeader>
                <CardTitle>Spółki z 5 lub więcej sesji spadkowych z rzędu</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały spadki cen przez co najmniej 5 kolejnych sesji giełdowych.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(consecutiveDown)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab7" className="space-y-4">
              <CardHeader>
                <CardTitle>MACD - sygnał kupna</CardTitle>
                <CardDescription>
                  Spółki, dla których linia MACD przecina linię sygnalną od dołu, generując sygnał kupna.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(macdBuySignal)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab8" className="space-y-4">
              <CardHeader>
                <CardTitle>MACD - sygnał sprzedaży</CardTitle>
                <CardDescription>
                  Spółki, dla których linia MACD przecina linię sygnalną od góry, generując sygnał sprzedaży.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(macdSellSignal)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab9" className="space-y-4">
              <CardHeader>
                <CardTitle>Złoty krzyż (średnie 50 i 200 sesji)</CardTitle>
                <CardDescription>
                  Spółki, dla których średnia 50-sesyjna przecięła średnią 200-sesyjną od dołu, sygnalizując potencjalny trend wzrostowy.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(goldenCross)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab10" className="space-y-4">
              <CardHeader>
                <CardTitle>Krzyż śmierci (średnie 50 i 200 sesji)</CardTitle>
                <CardDescription>
                  Spółki, dla których średnia 50-sesyjna przecięła średnią 200-sesyjną od góry, sygnalizując potencjalny trend spadkowy.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(deathCross)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab11" className="space-y-4">
              <CardHeader>
                <CardTitle>Zwiększony wolumen na wzroście</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały znaczący wzrost ceny przy wolumenie wyższym niż średnia 3-miesięczna.
                  Dane na dzień {formattedDate}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStockList(volumeIncreaseUp)}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="tab12" className="space-y-4">
              <CardHeader>
                <CardTitle>Zwiększony wolumen na spadku</CardTitle>
                <CardDescription>
                  Spółki, które odnotowały znaczący spadek ceny przy wolumenie wyższym niż średnia 3-miesięczna.
                  Dane na dzień {formattedDate}.
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
