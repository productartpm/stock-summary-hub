
export const formatNumber = (value: number, unit?: string): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B${unit ? ' ' + unit : ''}`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M${unit ? ' ' + unit : ''}`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K${unit ? ' ' + unit : ''}`;
  } else {
    return `${value.toFixed(2)}${unit ? ' ' + unit : ''}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
