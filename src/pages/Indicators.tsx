
import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import IndicatorTabs from '@/components/indicators/IndicatorTabs';
import IndicatorTabsContent from '@/components/indicators/IndicatorTabsContent';

const IndicatorsPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { user } = useAuth();
  const { toast } = useToast();
  
  const premiumTabs = ['tab7', 'tab8', 'tab9', 'tab10', 'tab11', 'tab12'];
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'd MMMM yyyy', { locale: pl });
  
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
          <IndicatorTabs 
            activeTab={activeTab} 
            handlePremiumTabClick={handlePremiumTabClick} 
            isLoggedIn={!!user}
          />
          
          <Card>
            <IndicatorTabsContent formattedDate={formattedDate} />
          </Card>
        </Tabs>
      </main>
    </div>
  );
};

export default IndicatorsPage;
