
import React from 'react';
import IndicatorTabContent from './IndicatorTabContent';
import {
  topGainers,
  topLosers,
  rsiAbove70,
  rsiBelow30,
  consecutiveUp,
  consecutiveDown,
  macdBuySignal,
  macdSellSignal,
  goldenCross,
  deathCross,
  volumeIncreaseUp,
  volumeIncreaseDown
} from '@/lib/indicatorsData';

interface IndicatorTabsContentProps {
  formattedDate: string;
}

const IndicatorTabsContent = ({ formattedDate }: IndicatorTabsContentProps) => {
  return (
    <>
      <IndicatorTabContent
        tabValue="tab1"
        title="Top 10 spółek - największe wzrosty dnia"
        description={`Spółki z najwyższym procentowym wzrostem podczas ostatniej sesji (${formattedDate})`}
        stocks={topGainers}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab2"
        title="Top 10 spółek - największe spadki dnia"
        description={`Spółki z najwyższym procentowym spadkiem podczas ostatniej sesji (${formattedDate})`}
        stocks={topLosers}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab3"
        title="Spółki z RSI powyżej 70 - potencjalna wyprzedaż"
        description={`RSI (Relative Strength Index) powyżej 70 może wskazywać, że spółka jest wykupiona i może nastąpić korekta. 
        Dane na dzień {formattedDate}.`}
        stocks={rsiAbove70}
        showIndicator={true}
        indicatorLabel="RSI"
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab4"
        title="Spółki z RSI poniżej 30 - potencjalnie niedowartościowane"
        description={`RSI (Relative Strength Index) poniżej 30 może wskazywać, że spółka jest wyprzedana i może nastąpić odbicie.
        Dane na dzień {formattedDate}.`}
        stocks={rsiBelow30}
        showIndicator={true}
        indicatorLabel="RSI"
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab5"
        title="Spółki z 5 lub więcej sesji wzrostowych z rzędu"
        description={`Spółki, które odnotowały wzrosty cen przez co najmniej 5 kolejnych sesji giełdowych.
        Dane na dzień {formattedDate}.`}
        stocks={consecutiveUp}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab6"
        title="Spółki z 5 lub więcej sesji spadkowych z rzędu"
        description={`Spółki, które odnotowały spadki cen przez co najmniej 5 kolejnych sesji giełdowych.
        Dane na dzień {formattedDate}.`}
        stocks={consecutiveDown}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab7"
        title="MACD - sygnał kupna"
        description={`Spółki, dla których linia MACD przecina linię sygnalną od dołu, generując sygnał kupna.
        Dane na dzień {formattedDate}.`}
        stocks={macdBuySignal}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab8"
        title="MACD - sygnał sprzedaży"
        description={`Spółki, dla których linia MACD przecina linię sygnalną od góry, generując sygnał sprzedaży.
        Dane na dzień {formattedDate}.`}
        stocks={macdSellSignal}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab9"
        title="Złoty krzyż (średnie 50 i 200 sesji)"
        description={`Spółki, dla których średnia 50-sesyjna przecięła średnią 200-sesyjną od dołu, sygnalizując potencjalny trend wzrostowy.
        Dane na dzień {formattedDate}.`}
        stocks={goldenCross}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab10"
        title="Krzyż śmierci (średnie 50 i 200 sesji)"
        description={`Spółki, dla których średnia 50-sesyjna przecięła średnią 200-sesyjną od góry, sygnalizując potencjalny trend spadkowy.
        Dane na dzień {formattedDate}.`}
        stocks={deathCross}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab11"
        title="Zwiększony wolumen na wzroście"
        description={`Spółki, które odnotowały znaczący wzrost ceny przy wolumenie wyższym niż średnia 3-miesięczna.
        Dane na dzień {formattedDate}.`}
        stocks={volumeIncreaseUp}
        formattedDate={formattedDate}
      />
      
      <IndicatorTabContent
        tabValue="tab12"
        title="Zwiększony wolumen na spadku"
        description={`Spółki, które odnotowały znaczący spadek ceny przy wolumenie wyższym niż średnia 3-miesięczna.
        Dane na dzień {formattedDate}.`}
        stocks={volumeIncreaseDown}
        formattedDate={formattedDate}
      />
    </>
  );
};

export default IndicatorTabsContent;
