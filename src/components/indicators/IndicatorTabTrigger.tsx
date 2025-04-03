
import React from 'react';
import { TabsTrigger } from '@/components/ui/tabs';
import { Lock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IndicatorTabTriggerProps {
  value: string;
  number: number;
  label: string;
  icon?: React.ReactNode;
  isPremium?: boolean;
  isLoggedIn?: boolean;
  disabled?: boolean;
}

const IndicatorTabTrigger = ({
  value,
  number,
  label,
  icon,
  isPremium = false,
  isLoggedIn = false,
  disabled = false
}: IndicatorTabTriggerProps) => {
  return (
    <TabsTrigger 
      value={value} 
      className="px-4 py-2"
      disabled={disabled || (isPremium && !isLoggedIn)}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">
        {number}
      </span>
      {isPremium && !isLoggedIn && (
        <span className="bg-amber-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
          <Lock className="h-3 w-3 text-black" />
        </span>
      )}
      <span className="flex items-center">
        {icon} {icon && <span className="ml-1">{label}</span>}
        {!icon && label}
      </span>
    </TabsTrigger>
  );
};

export default IndicatorTabTrigger;
