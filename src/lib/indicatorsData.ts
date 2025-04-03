
export interface StockWithIndicator {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  volume: number;
  indicator?: number;
}

export const topGainers: StockWithIndicator[] = [
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

export const topLosers: StockWithIndicator[] = [
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

export const rsiAbove70: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 8.2, volume: 1250000, indicator: 78.4 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 7.1, volume: 980000, indicator: 82.1 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 6.5, volume: 750000, indicator: 75.8 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 5.8, volume: 620000, indicator: 79.3 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 5.3, volume: 890000, indicator: 72.7 },
  { id: '6', name: 'Medical Research', ticker: 'MEDR', price: 78.90, change: 4.9, volume: 540000, indicator: 76.2 },
  { id: '7', name: 'Digital Networks', ticker: 'DNET', price: 165.30, change: 4.5, volume: 670000, indicator: 71.9 }
];

export const rsiBelow30: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -7.8, volume: 890000, indicator: 22.3 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -6.9, volume: 760000, indicator: 24.8 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -6.2, volume: 930000, indicator: 19.6 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -5.7, volume: 540000, indicator: 26.1 },
  { id: '5', name: 'Telecom Provider', ticker: 'TLPR', price: 172.30, change: -5.1, volume: 680000, indicator: 27.5 },
  { id: '6', name: 'Aerospace Defense', ticker: 'ASDF', price: 312.60, change: -4.8, volume: 420000, indicator: 28.9 }
];

export const consecutiveUp: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 3.3, volume: 890000 }
];

export const consecutiveDown: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 }
];

export const macdBuySignal: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 3.3, volume: 890000 },
  { id: '6', name: 'Medical Research', ticker: 'MEDR', price: 78.90, change: 1.9, volume: 540000 }
];

export const macdSellSignal: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 },
  { id: '5', name: 'Telecom Provider', ticker: 'TLPR', price: 172.30, change: -0.6, volume: 680000 }
];

export const goldenCross: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 }
];

export const deathCross: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 }
];

export const volumeIncreaseUp: StockWithIndicator[] = [
  { id: '1', name: 'Acme Corp', ticker: 'ACM', price: 342.50, change: 2.2, volume: 1250000 },
  { id: '2', name: 'Tech Innovations', ticker: 'TECH', price: 892.30, change: 1.1, volume: 980000 },
  { id: '3', name: 'Global Solutions', ticker: 'GSOL', price: 127.80, change: 0.8, volume: 750000 },
  { id: '4', name: 'Future Energy', ticker: 'FEGY', price: 214.60, change: 1.8, volume: 620000 },
  { id: '5', name: 'Quantum Systems', ticker: 'QSYS', price: 456.70, change: 3.3, volume: 890000 }
];

export const volumeIncreaseDown: StockWithIndicator[] = [
  { id: '1', name: 'Retail Group', ticker: 'RTGP', price: 86.40, change: -1.8, volume: 890000 },
  { id: '2', name: 'Industrial Manufacturing', ticker: 'INDM', price: 124.70, change: -2.9, volume: 760000 },
  { id: '3', name: 'Financial Services', ticker: 'FNSV', price: 234.50, change: -0.7, volume: 930000 },
  { id: '4', name: 'Consumer Goods', ticker: 'CNGD', price: 67.80, change: -1.2, volume: 540000 }
];
