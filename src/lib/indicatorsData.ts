
import { StockWithIndicator } from "@/components/indicators/StockListTable";

// Data for Polish companies to use in indicators
export const topGainers: StockWithIndicator[] = [
  { id: '1', name: 'PKO BP', ticker: 'PKO', price: 52.50, change: 3.2, volume: 1250000 },
  { id: '2', name: 'Bank Pekao', ticker: 'PEO', price: 172.30, change: 2.8, volume: 980000 },
  { id: '3', name: 'KGHM', ticker: 'KGH', price: 127.80, change: 2.5, volume: 750000 },
  { id: '4', name: 'Orlen', ticker: 'PKN', price: 64.60, change: 2.1, volume: 1620000 },
  { id: '5', name: 'PZU', ticker: 'PZU', price: 44.70, change: 1.9, volume: 890000 },
  { id: '6', name: 'Cyfrowy Polsat', ticker: 'CPS', price: 21.90, change: 1.7, volume: 540000 },
  { id: '7', name: 'Dino', ticker: 'DNP', price: 354.30, change: 1.5, volume: 320000 },
  { id: '8', name: 'CD Projekt', ticker: 'CDR', price: 132.40, change: 1.2, volume: 480000 },
  { id: '9', name: 'Allegro', ticker: 'ALE', price: 33.60, change: 0.9, volume: 790000 },
  { id: '10', name: 'LPP', ticker: 'LPP', price: 19430.20, change: 0.6, volume: 105000 }
];

export const topLosers: StockWithIndicator[] = [
  { id: '1', name: 'JSW', ticker: 'JSW', price: 36.40, change: -3.8, volume: 590000 },
  { id: '2', name: 'mBank', ticker: 'MBK', price: 674.70, change: -2.9, volume: 160000 },
  { id: '3', name: 'Orange Polska', ticker: 'OPL', price: 8.50, change: -2.2, volume: 430000 },
  { id: '4', name: 'Santander Bank Polska', ticker: 'SPL', price: 467.80, change: -1.7, volume: 140000 },
  { id: '5', name: 'PGE', ticker: 'PGE', price: 12.30, change: -1.5, volume: 680000 },
  { id: '6', name: 'Alior Bank', ticker: 'ALR', price: 72.60, change: -1.4, volume: 220000 },
  { id: '7', name: 'PGNiG', ticker: 'PGN', price: 7.30, change: -1.2, volume: 570000 },
  { id: '8', name: 'Tauron', ticker: 'TPE', price: 3.56, change: -1.1, volume: 890000 },
  { id: '9', name: 'Lotos', ticker: 'LTS', price: 71.90, change: -0.8, volume: 320000 },
  { id: '10', name: 'Asseco Poland', ticker: 'ACP', price: 86.20, change: -0.5, volume: 180000 }
];

export const rsiAbove70: StockWithIndicator[] = [
  { id: '1', name: 'PKO BP', ticker: 'PKO', price: 52.50, change: 1.2, volume: 950000, indicator: 78.4 },
  { id: '2', name: 'Dino', ticker: 'DNP', price: 354.30, change: 2.1, volume: 280000, indicator: 82.1 },
  { id: '3', name: 'CD Projekt', ticker: 'CDR', price: 132.40, change: 0.8, volume: 350000, indicator: 75.8 },
  { id: '4', name: 'Allegro', ticker: 'ALE', price: 33.60, change: 1.8, volume: 620000, indicator: 79.3 },
  { id: '5', name: 'LPP', ticker: 'LPP', price: 19430.20, change: 0.3, volume: 90000, indicator: 72.7 },
  { id: '6', name: 'PZU', ticker: 'PZU', price: 44.70, change: 0.9, volume: 540000, indicator: 76.2 },
  { id: '7', name: 'Orlen', ticker: 'PKN', price: 64.60, change: 0.5, volume: 670000, indicator: 71.9 }
];

export const rsiBelow30: StockWithIndicator[] = [
  { id: '1', name: 'JSW', ticker: 'JSW', price: 36.40, change: -2.8, volume: 490000, indicator: 22.3 },
  { id: '2', name: 'mBank', ticker: 'MBK', price: 674.70, change: -1.9, volume: 160000, indicator: 24.8 },
  { id: '3', name: 'PGNiG', ticker: 'PGN', price: 7.30, change: -1.2, volume: 730000, indicator: 19.6 },
  { id: '4', name: 'Tauron', ticker: 'TPE', price: 3.56, change: -0.7, volume: 840000, indicator: 26.1 },
  { id: '5', name: 'Lotos', ticker: 'LTS', price: 71.90, change: -1.1, volume: 380000, indicator: 27.5 },
  { id: '6', name: 'PGE', ticker: 'PGE', price: 12.30, change: -0.8, volume: 420000, indicator: 28.9 }
];

export const consecutiveUp: StockWithIndicator[] = [
  { id: '1', name: 'PKO BP', ticker: 'PKO', price: 52.50, change: 0.8, volume: 850000 },
  { id: '2', name: 'Bank Pekao', ticker: 'PEO', price: 172.30, change: 0.5, volume: 380000 },
  { id: '3', name: 'CD Projekt', ticker: 'CDR', price: 132.40, change: 0.7, volume: 450000 },
  { id: '4', name: 'Allegro', ticker: 'ALE', price: 33.60, change: 1.2, volume: 620000 },
  { id: '5', name: 'PZU', ticker: 'PZU', price: 44.70, change: 0.6, volume: 490000 }
];

export const consecutiveDown: StockWithIndicator[] = [
  { id: '1', name: 'JSW', ticker: 'JSW', price: 36.40, change: -1.5, volume: 390000 },
  { id: '2', name: 'Tauron', ticker: 'TPE', price: 3.56, change: -0.9, volume: 760000 },
  { id: '3', name: 'PGE', ticker: 'PGE', price: 12.30, change: -0.7, volume: 530000 },
  { id: '4', name: 'Lotos', ticker: 'LTS', price: 71.90, change: -0.4, volume: 240000 }
];

export const macdBuySignal: StockWithIndicator[] = [
  { id: '1', name: 'PKO BP', ticker: 'PKO', price: 52.50, change: 0.9, volume: 750000 },
  { id: '2', name: 'Dino', ticker: 'DNP', price: 354.30, change: 1.3, volume: 280000 },
  { id: '3', name: 'CD Projekt', ticker: 'CDR', price: 132.40, change: 0.8, volume: 450000 },
  { id: '4', name: 'Allegro', ticker: 'ALE', price: 33.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'LPP', ticker: 'LPP', price: 19430.20, change: 0.3, volume: 90000 },
  { id: '6', name: 'PZU', ticker: 'PZU', price: 44.70, change: 0.7, volume: 540000 }
];

export const macdSellSignal: StockWithIndicator[] = [
  { id: '1', name: 'JSW', ticker: 'JSW', price: 36.40, change: -1.8, volume: 390000 },
  { id: '2', name: 'mBank', ticker: 'MBK', price: 674.70, change: -1.4, volume: 160000 },
  { id: '3', name: 'PGNiG', ticker: 'PGN', price: 7.30, change: -0.7, volume: 530000 },
  { id: '4', name: 'Tauron', ticker: 'TPE', price: 3.56, change: -1.0, volume: 640000 },
  { id: '5', name: 'Lotos', ticker: 'LTS', price: 71.90, change: -0.6, volume: 280000 }
];

export const goldenCross: StockWithIndicator[] = [
  { id: '1', name: 'PKO BP', ticker: 'PKO', price: 52.50, change: 0.6, volume: 650000 },
  { id: '2', name: 'Dino', ticker: 'DNP', price: 354.30, change: 1.1, volume: 280000 },
  { id: '3', name: 'Allegro', ticker: 'ALE', price: 33.60, change: 0.8, volume: 550000 }
];

export const deathCross: StockWithIndicator[] = [
  { id: '1', name: 'JSW', ticker: 'JSW', price: 36.40, change: -1.2, volume: 390000 },
  { id: '2', name: 'mBank', ticker: 'MBK', price: 674.70, change: -0.9, volume: 160000 },
  { id: '3', name: 'PGNiG', ticker: 'PGN', price: 7.30, change: -0.5, volume: 430000 },
  { id: '4', name: 'Tauron', ticker: 'TPE', price: 3.56, change: -0.7, volume: 540000 }
];

export const volumeIncreaseUp: StockWithIndicator[] = [
  { id: '1', name: 'PKO BP', ticker: 'PKO', price: 52.50, change: 0.7, volume: 1250000 },
  { id: '2', name: 'Orlen', ticker: 'PKN', price: 64.60, change: 1.3, volume: 1620000 },
  { id: '3', name: 'CD Projekt', ticker: 'CDR', price: 132.40, change: 0.8, volume: 750000 },
  { id: '4', name: 'Allegro', ticker: 'ALE', price: 33.60, change: 1.1, volume: 920000 },
  { id: '5', name: 'PZU', ticker: 'PZU', price: 44.70, change: 0.5, volume: 890000 }
];

export const volumeIncreaseDown: StockWithIndicator[] = [
  { id: '1', name: 'JSW', ticker: 'JSW', price: 36.40, change: -1.2, volume: 890000 },
  { id: '2', name: 'PGE', ticker: 'PGE', price: 12.30, change: -0.9, volume: 760000 },
  { id: '3', name: 'Tauron', ticker: 'TPE', price: 3.56, change: -0.7, volume: 930000 },
  { id: '4', name: 'Lotos', ticker: 'LTS', price: 71.90, change: -0.5, volume: 640000 }
];

