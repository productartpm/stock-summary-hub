
export interface StockWithIndicator {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  volume: number;
  indicator?: number;
}

// Top 10 spółek - największe wzrosty dnia
export const topGainers: StockWithIndicator[] = [
  { id: 'dino', name: 'Dino Polska', ticker: 'DNP', price: 421.50, change: 8.2, volume: 125000 },
  { id: 'lpp', name: 'LPP', ticker: 'LPP', price: 14250.00, change: 6.7, volume: 8500 },
  { id: 'allegro', name: 'Allegro.eu', ticker: 'ALE', price: 28.45, change: 5.9, volume: 2850000 },
  { id: 'cdprojekt', name: 'CD Projekt', ticker: 'CDR', price: 125.80, change: 5.4, volume: 890000 },
  { id: 'santander', name: 'Santander Bank Polska', ticker: 'SPL', price: 445.20, change: 4.8, volume: 156000 },
  { id: 'orange', name: 'Orange Polska', ticker: 'OPL', price: 6.78, change: 4.2, volume: 1250000 },
  { id: 'cyfrowy', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 11.85, change: 3.9, volume: 980000 },
  { id: 'pzu', name: 'PZU', ticker: 'PZU', price: 23.40, change: 3.6, volume: 750000 },
  { id: 'pge', name: 'PGE', ticker: 'PGE', price: 12.15, change: 3.2, volume: 1850000 },
  { id: 'alior', name: 'Alior Bank', ticker: 'ALR', price: 82.50, change: 2.8, volume: 320000 }
];

// Top 10 spółek - największe spadki dnia
export const topLosers: StockWithIndicator[] = [
  { id: 'jsw', name: 'JSW', ticker: 'JSW', price: 15.20, change: -7.8, volume: 2100000 },
  { id: 'kghm', name: 'KGHM', ticker: 'KGH', price: 98.75, change: -6.4, volume: 1450000 },
  { id: 'orlen', name: 'Orlen', ticker: 'PKN', price: 52.30, change: -5.9, volume: 1890000 },
  { id: 'tauron', name: 'Tauron', ticker: 'TPE', price: 1.89, change: -5.2, volume: 3200000 },
  { id: 'lotos', name: 'Lotos', ticker: 'LTS', price: 78.40, change: -4.8, volume: 680000 },
  { id: 'pgnig', name: 'PGNiG', ticker: 'PGN', price: 5.85, change: -4.3, volume: 2850000 },
  { id: 'mbank', name: 'mBank', ticker: 'MBK', price: 598.00, change: -3.9, volume: 95000 },
  { id: 'pko', name: 'PKO BP', ticker: 'PKO', price: 14.85, change: -3.5, volume: 3500000 },
  { id: 'pekao', name: 'Bank Pekao', ticker: 'PEO', price: 165.80, change: -3.2, volume: 420000 },
  { id: 'pge-down', name: 'PGE Energia', ticker: 'PGE', price: 11.95, change: -2.8, volume: 1950000 }
];

// Spółki z RSI powyżej 70 - potencjalna wyprzedaż
export const rsiAbove70: StockWithIndicator[] = [
  { id: 'dino-rsi', name: 'Dino Polska', ticker: 'DNP', price: 421.50, change: 2.1, volume: 125000, indicator: 84.2 },
  { id: 'lpp-rsi', name: 'LPP', ticker: 'LPP', price: 14250.00, change: 1.8, volume: 8500, indicator: 82.7 },
  { id: 'allegro-rsi', name: 'Allegro.eu', ticker: 'ALE', price: 28.45, change: 1.4, volume: 2850000, indicator: 78.9 },
  { id: 'cdprojekt-rsi', name: 'CD Projekt', ticker: 'CDR', price: 125.80, change: 0.9, volume: 890000, indicator: 76.3 },
  { id: 'cyfrowy-rsi', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 11.85, change: 0.7, volume: 980000, indicator: 74.8 },
  { id: 'pzu-rsi', name: 'PZU', ticker: 'PZU', price: 23.40, change: 0.5, volume: 750000, indicator: 73.1 },
  { id: 'santander-rsi', name: 'Santander Bank Polska', ticker: 'SPL', price: 445.20, change: 0.3, volume: 156000, indicator: 72.4 },
  { id: 'orange-rsi', name: 'Orange Polska', ticker: 'OPL', price: 6.78, change: 0.1, volume: 1250000, indicator: 71.6 },
  { id: 'alior-rsi', name: 'Alior Bank', ticker: 'ALR', price: 82.50, change: -0.2, volume: 320000, indicator: 70.8 }
];

// Spółki z RSI poniżej 30 - potencjalnie niedowartościowane
export const rsiBelow30: StockWithIndicator[] = [
  { id: 'jsw-rsi', name: 'JSW', ticker: 'JSW', price: 15.20, change: -4.2, volume: 2100000, indicator: 18.5 },
  { id: 'kghm-rsi', name: 'KGHM', ticker: 'KGH', price: 98.75, change: -3.8, volume: 1450000, indicator: 21.3 },
  { id: 'tauron-rsi', name: 'Tauron', ticker: 'TPE', price: 1.89, change: -3.5, volume: 3200000, indicator: 23.7 },
  { id: 'orlen-rsi', name: 'Orlen', ticker: 'PKN', price: 52.30, change: -2.9, volume: 1890000, indicator: 25.1 },
  { id: 'lotos-rsi', name: 'Lotos', ticker: 'LTS', price: 78.40, change: -2.6, volume: 680000, indicator: 26.8 },
  { id: 'pgnig-rsi', name: 'PGNiG', ticker: 'PGN', price: 5.85, change: -2.3, volume: 2850000, indicator: 27.9 },
  { id: 'mbank-rsi', name: 'mBank', ticker: 'MBK', price: 598.00, change: -1.9, volume: 95000, indicator: 28.4 },
  { id: 'pko-rsi', name: 'PKO BP', ticker: 'PKO', price: 14.85, change: -1.6, volume: 3500000, indicator: 29.2 }
];

// Spółki z 5 lub więcej sesji wzrostowych z rzędu
export const consecutiveUp: StockWithIndicator[] = [
  { id: 'dino-up', name: 'Dino Polska', ticker: 'DNP', price: 421.50, change: 3.2, volume: 125000 },
  { id: 'lpp-up', name: 'LPP', ticker: 'LPP', price: 14250.00, change: 2.8, volume: 8500 },
  { id: 'allegro-up', name: 'Allegro.eu', ticker: 'ALE', price: 28.45, change: 2.5, volume: 2850000 },
  { id: 'santander-up', name: 'Santander Bank Polska', ticker: 'SPL', price: 445.20, change: 2.1, volume: 156000 },
  { id: 'pzu-up', name: 'PZU', ticker: 'PZU', price: 23.40, change: 1.9, volume: 750000 },
  { id: 'cyfrowy-up', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 11.85, change: 1.7, volume: 980000 },
  { id: 'orange-up', name: 'Orange Polska', ticker: 'OPL', price: 6.78, change: 1.4, volume: 1250000 },
  { id: 'alior-up', name: 'Alior Bank', ticker: 'ALR', price: 82.50, change: 1.2, volume: 320000 }
];

// Spółki z 5 lub więcej sesji spadkowych z rzędu
export const consecutiveDown: StockWithIndicator[] = [
  { id: 'jsw-down', name: 'JSW', ticker: 'JSW', price: 15.20, change: -2.8, volume: 2100000 },
  { id: 'kghm-down', name: 'KGHM', ticker: 'KGH', price: 98.75, change: -2.5, volume: 1450000 },
  { id: 'orlen-down', name: 'Orlen', ticker: 'PKN', price: 52.30, change: -2.2, volume: 1890000 },
  { id: 'tauron-down', name: 'Tauron', ticker: 'TPE', price: 1.89, change: -2.0, volume: 3200000 },
  { id: 'lotos-down', name: 'Lotos', ticker: 'LTS', price: 78.40, change: -1.8, volume: 680000 },
  { id: 'pgnig-down', name: 'PGNiG', ticker: 'PGN', price: 5.85, change: -1.6, volume: 2850000 },
  { id: 'mbank-down', name: 'mBank', ticker: 'MBK', price: 598.00, change: -1.4, volume: 95000 },
  { id: 'pko-down', name: 'PKO BP', ticker: 'PKO', price: 14.85, change: -1.2, volume: 3500000 }
];

// MACD - sygnał kupna
export const macdBuySignal: StockWithIndicator[] = [
  { id: 'cdprojekt-macd-buy', name: 'CD Projekt', ticker: 'CDR', price: 125.80, change: 3.8, volume: 890000 },
  { id: 'allegro-macd-buy', name: 'Allegro.eu', ticker: 'ALE', price: 28.45, change: 3.2, volume: 2850000 },
  { id: 'dino-macd-buy', name: 'Dino Polska', ticker: 'DNP', price: 421.50, change: 2.9, volume: 125000 },
  { id: 'santander-macd-buy', name: 'Santander Bank Polska', ticker: 'SPL', price: 445.20, change: 2.6, volume: 156000 },
  { id: 'pzu-macd-buy', name: 'PZU', ticker: 'PZU', price: 23.40, change: 2.3, volume: 750000 },
  { id: 'cyfrowy-macd-buy', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 11.85, change: 2.1, volume: 980000 },
  { id: 'pge-macd-buy', name: 'PGE', ticker: 'PGE', price: 12.15, change: 1.8, volume: 1850000 },
  { id: 'orange-macd-buy', name: 'Orange Polska', ticker: 'OPL', price: 6.78, change: 1.5, volume: 1250000 }
];

// MACD - sygnał sprzedaży
export const macdSellSignal: StockWithIndicator[] = [
  { id: 'jsw-macd-sell', name: 'JSW', ticker: 'JSW', price: 15.20, change: -3.5, volume: 2100000 },
  { id: 'kghm-macd-sell', name: 'KGHM', ticker: 'KGH', price: 98.75, change: -3.1, volume: 1450000 },
  { id: 'orlen-macd-sell', name: 'Orlen', ticker: 'PKN', price: 52.30, change: -2.8, volume: 1890000 },
  { id: 'tauron-macd-sell', name: 'Tauron', ticker: 'TPE', price: 1.89, change: -2.5, volume: 3200000 },
  { id: 'lotos-macd-sell', name: 'Lotos', ticker: 'LTS', price: 78.40, change: -2.2, volume: 680000 },
  { id: 'pgnig-macd-sell', name: 'PGNiG', ticker: 'PGN', price: 5.85, change: -1.9, volume: 2850000 },
  { id: 'mbank-macd-sell', name: 'mBank', ticker: 'MBK', price: 598.00, change: -1.6, volume: 95000 },
  { id: 'pekao-macd-sell', name: 'Bank Pekao', ticker: 'PEO', price: 165.80, change: -1.3, volume: 420000 }
];

// Złoty krzyż (średnie 50 i 200 sesji)
export const goldenCross: StockWithIndicator[] = [
  { id: 'lpp-golden', name: 'LPP', ticker: 'LPP', price: 14250.00, change: 4.5, volume: 8500 },
  { id: 'dino-golden', name: 'Dino Polska', ticker: 'DNP', price: 421.50, change: 4.1, volume: 125000 },
  { id: 'allegro-golden', name: 'Allegro.eu', ticker: 'ALE', price: 28.45, change: 3.8, volume: 2850000 },
  { id: 'cdprojekt-golden', name: 'CD Projekt', ticker: 'CDR', price: 125.80, change: 3.5, volume: 890000 },
  { id: 'santander-golden', name: 'Santander Bank Polska', ticker: 'SPL', price: 445.20, change: 3.2, volume: 156000 },
  { id: 'pzu-golden', name: 'PZU', ticker: 'PZU', price: 23.40, change: 2.9, volume: 750000 },
  { id: 'cyfrowy-golden', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 11.85, change: 2.6, volume: 980000 }
];

// Krzyż śmierci (średnie 50 i 200 sesji)
export const deathCross: StockWithIndicator[] = [
  { id: 'jsw-death', name: 'JSW', ticker: 'JSW', price: 15.20, change: -4.8, volume: 2100000 },
  { id: 'kghm-death', name: 'KGHM', ticker: 'KGH', price: 98.75, change: -4.2, volume: 1450000 },
  { id: 'orlen-death', name: 'Orlen', ticker: 'PKN', price: 52.30, change: -3.9, volume: 1890000 },
  { id: 'tauron-death', name: 'Tauron', ticker: 'TPE', price: 1.89, change: -3.6, volume: 3200000 },
  { id: 'lotos-death', name: 'Lotos', ticker: 'LTS', price: 78.40, change: -3.3, volume: 680000 },
  { id: 'pgnig-death', name: 'PGNiG', ticker: 'PGN', price: 5.85, change: -3.0, volume: 2850000 }
];

// Zwiększony wolumen na wzroście
export const volumeIncreaseUp: StockWithIndicator[] = [
  { id: 'allegro-vol-up', name: 'Allegro.eu', ticker: 'ALE', price: 28.45, change: 5.2, volume: 4200000 },
  { id: 'pko-vol-up', name: 'PKO BP', ticker: 'PKO', price: 14.85, change: 4.8, volume: 5100000 },
  { id: 'pge-vol-up', name: 'PGE', ticker: 'PGE', price: 12.15, change: 4.5, volume: 2800000 },
  { id: 'orange-vol-up', name: 'Orange Polska', ticker: 'OPL', price: 6.78, change: 4.2, volume: 2100000 },
  { id: 'jsw-vol-up', name: 'JSW', ticker: 'JSW', price: 15.20, change: 3.9, volume: 3200000 },
  { id: 'cyfrowy-vol-up', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 11.85, change: 3.6, volume: 1800000 },
  { id: 'kghm-vol-up', name: 'KGHM', ticker: 'KGH', price: 98.75, change: 3.3, volume: 2300000 },
  { id: 'cdprojekt-vol-up', name: 'CD Projekt', ticker: 'CDR', price: 125.80, change: 3.0, volume: 1500000 }
];

// Zwiększony wolumen na spadku
export const volumeIncreaseDown: StockWithIndicator[] = [
  { id: 'orlen-vol-down', name: 'Orlen', ticker: 'PKN', price: 52.30, change: -5.8, volume: 3500000 },
  { id: 'tauron-vol-down', name: 'Tauron', ticker: 'TPE', price: 1.89, change: -5.4, volume: 4800000 },
  { id: 'pgnig-vol-down', name: 'PGNiG', ticker: 'PGN', price: 5.85, change: -5.1, volume: 4200000 },
  { id: 'jsw-vol-down', name: 'JSW', ticker: 'JSW', price: 15.20, change: -4.8, volume: 3800000 },
  { id: 'lotos-vol-down', name: 'Lotos', ticker: 'LTS', price: 78.40, change: -4.5, volume: 1200000 },
  { id: 'kghm-vol-down', name: 'KGHM', ticker: 'KGH', price: 98.75, change: -4.2, volume: 2100000 },
  { id: 'mbank-vol-down', name: 'mBank', ticker: 'MBK', price: 598.00, change: -3.9, volume: 180000 },
  { id: 'pekao-vol-down', name: 'Bank Pekao', ticker: 'PEO', price: 165.80, change: -3.6, volume: 650000 }
];
