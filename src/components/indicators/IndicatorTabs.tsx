
import React from 'react';
import { TabsList } from '@/components/ui/tabs';
import IndicatorTabTrigger from './IndicatorTabTrigger';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface IndicatorTabsProps {
  activeTab: string;
  handlePremiumTabClick: (tabValue: string) => void;
  isLoggedIn: boolean;
}

const IndicatorTabs = ({ activeTab, handlePremiumTabClick, isLoggedIn }: IndicatorTabsProps) => {
  const premiumTabs = ['tab7', 'tab8', 'tab9', 'tab10', 'tab11', 'tab12'];
  
  return (
    <div className="overflow-auto">
      <TabsList className="w-full h-auto flex flex-wrap gap-2 p-2 justify-start">
        <IndicatorTabTrigger
          value="tab1"
          number={1}
          label="Top 10 wzrosty"
          icon={<TrendingUp className="h-4 w-4 mr-1" />}
        />
        <IndicatorTabTrigger
          value="tab2"
          number={2}
          label="Top 10 spadki"
          icon={<TrendingDown className="h-4 w-4 mr-1" />}
        />
        <IndicatorTabTrigger
          value="tab3"
          number={3}
          label="RSI > 70"
          icon={<Activity className="h-4 w-4 mr-1" />}
        />
        <IndicatorTabTrigger
          value="tab4"
          number={4}
          label="RSI < 30"
          icon={<Activity className="h-4 w-4 mr-1" />}
        />
        <IndicatorTabTrigger
          value="tab5"
          number={5}
          label="5 sesji wzrostowych"
          icon={<TrendingUp className="h-4 w-4 mr-1" />}
        />
        <IndicatorTabTrigger
          value="tab6"
          number={6}
          label="5 sesji spadkowych"
          icon={<TrendingDown className="h-4 w-4 mr-1" />}
        />
        
        <IndicatorTabTrigger
          value="tab7"
          number={7}
          label="MACD - kupno"
          isPremium={true}
          isLoggedIn={isLoggedIn}
        />
        <IndicatorTabTrigger
          value="tab8"
          number={8}
          label="MACD - sprzedaż"
          isPremium={true}
          isLoggedIn={isLoggedIn}
        />
        <IndicatorTabTrigger
          value="tab9"
          number={9}
          label="Złoty krzyż"
          isPremium={true}
          isLoggedIn={isLoggedIn}
        />
        <IndicatorTabTrigger
          value="tab10"
          number={10}
          label="Krzyż śmierci"
          isPremium={true}
          isLoggedIn={isLoggedIn}
        />
        <IndicatorTabTrigger
          value="tab11"
          number={11}
          label="Wolumen na wzroście"
          isPremium={true}
          isLoggedIn={isLoggedIn}
        />
        <IndicatorTabTrigger
          value="tab12"
          number={12}
          label="Wolumen na spadku"
          isPremium={true}
          isLoggedIn={isLoggedIn}
        />
      </TabsList>
    </div>
  );
};

export default IndicatorTabs;
