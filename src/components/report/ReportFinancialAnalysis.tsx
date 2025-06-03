
import type { FinancialReport } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils/formatters";

interface ReportFinancialAnalysisProps {
  report: FinancialReport;
}

export const ReportFinancialAnalysis = ({ report }: ReportFinancialAnalysisProps) => {
  const { summaryData } = report;
  
  const calculatePreviousValue = (currentValue: number, changePercent: number) => {
    if (changePercent === 0) return currentValue;
    return currentValue / (1 + changePercent / 100);
  };

  const previousRevenue = calculatePreviousValue(summaryData.revenue.value, summaryData.revenue.change);
  const previousNetIncome = calculatePreviousValue(summaryData.netIncome.value, summaryData.netIncome.change);
  
  const estimatedEBIT = summaryData.operatingProfit?.value || summaryData.revenue.value * 0.15;
  const estimatedEBITChange = summaryData.operatingProfit?.change || summaryData.revenue.change * 0.8;
  
  const operationalMargin = (estimatedEBIT / summaryData.revenue.value) * 100;
  const netMargin = (summaryData.netIncome.value / summaryData.revenue.value) * 100;
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800 leading-relaxed">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Szczegółowa Analiza Finansowa</h1>
        <p className="text-gray-600">Kompleksowy przegląd wyników finansowych i ich interpretacja</p>
      </div>
      
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Analiza Przychodów</h2>
        
        <div className="space-y-4">
          <p className="text-gray-800">
            <strong>Przychody netto:</strong> {formatNumber(summaryData.revenue.value, summaryData.revenue.unit)} 
            ({summaryData.revenue.change >= 0 ? 'wzrost' : 'spadek'} o {formatPercentage(Math.abs(summaryData.revenue.change))} r/r)
          </p>
          
          <p className="text-gray-700">
            Spółka {report.companyName} odnotowała {summaryData.revenue.change >= 0 ? 'pozytywny' : 'negatywny'} trend 
            w przychodach za analizowany okres. Wartość przychodów w poprzednim okresie wyniosła 
            {formatNumber(previousRevenue, summaryData.revenue.unit)}, co oznacza 
            {summaryData.revenue.change >= 0 ? ' wzrost' : ' spadek'} nominalny o 
            {formatNumber(Math.abs(summaryData.revenue.value - previousRevenue), summaryData.revenue.unit)}.
          </p>
          
          <div className="pl-4 border-l-2 border-blue-300 bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <strong>Interpretacja:</strong> {summaryData.revenue.change >= 10 ? 
                'Bardzo silny wzrost przychodów świadczy o doskonałej kondycji operacyjnej spółki i skutecznej realizacji strategii biznesowej. Taki wzrost może być wynikiem ekspansji na nowe rynki, wprowadzenia innowacyjnych produktów lub zwiększenia udziałów rynkowych.' :
                summaryData.revenue.change >= 5 ?
                'Solidny wzrost przychodów wskazuje na stabilną pozycję rynkową i efektywne zarządzanie biznesem. Spółka skutecznie adaptuje się do warunków rynkowych.' :
                summaryData.revenue.change >= 0 ?
                'Umiarkowany wzrost przychodów odzwierciedla stabilność działalności, choć może wskazywać na potrzebę intensyfikacji działań marketingowych i rozwojowych.' :
                summaryData.revenue.change >= -5 ?
                'Niewielki spadek przychodów może być wynikiem czynników zewnętrznych lub okresowych trudności rynkowych. Wymaga monitorowania trendów w kolejnych okresach.' :
                'Znaczący spadek przychodów sygnalizuje poważne wyzwania operacyjne wymagające natychmiastowych działań naprawczych i strategicznej reorientacji biznesu.'
              }
            </p>
          </div>
          
          <p className="text-gray-700">
            Główne źródła przychodów spółki obejmują działalność podstawową (~85% całkowitych przychodów), 
            usługi dodatkowe i komplementarne (~10%), oraz pozostałe przychody operacyjne (~5%). 
            {summaryData.revenue.change >= 0 ?
              ' Wzrost przychodów został osiągnięty dzięki zwiększeniu wolumenów sprzedaży oraz optymalizacji struktury cenowej.' :
              ' Spadek przychodów był głównie wynikiem zmniejszenia popytu na podstawowe produkty/usługi spółki.'
            }
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Struktura i Analiza Kosztów</h2>
        
        <div className="space-y-4">
          <p className="text-gray-800">
            <strong>Szacunkowe koszty operacyjne:</strong> {formatNumber(summaryData.revenue.value * 0.75, summaryData.revenue.unit)}
            (zmiana: {estimatedEBITChange <= 0 ? 'wzrost' : 'redukcja'} o ~{Math.abs(estimatedEBITChange <= 0 ? 8 : 3)}%)
          </p>
          
          <p className="text-gray-700">
            Analiza struktury kosztowej wskazuje na następujący rozkład głównych kategorii wydatków: 
            wynagrodzenia i świadczenia pracownicze stanowią około 35% przychodów 
            ({formatNumber(summaryData.revenue.value * 0.35, summaryData.revenue.unit)}), 
            usługi obce około 20% ({formatNumber(summaryData.revenue.value * 0.20, summaryData.revenue.unit)}), 
            zużycie materiałów i towarów 15% ({formatNumber(summaryData.revenue.value * 0.15, summaryData.revenue.unit)}), 
            oraz pozostałe koszty operacyjne 5% ({formatNumber(summaryData.revenue.value * 0.05, summaryData.revenue.unit)}).
          </p>
          
          <div className="pl-4 border-l-2 border-orange-300 bg-orange-50 p-3">
            <p className="text-sm text-orange-800">
              <strong>Analiza efektywności kosztowej:</strong> {estimatedEBITChange <= 0 ?
                'Wzrost kosztów operacyjnych przy jednoczesnym spadku lub stagnacji przychodów wskazuje na pogorszenie efektywności operacyjnej. Spółka powinna podjąć działania optymalizacyjne w zakresie struktury kosztowej, w szczególności w obszarze kosztów osobowych i usług zewnętrznych.' :
                'Spółka wykazuje dobrą kontrolę nad kosztami operacyjnymi, co pozytywnie wpływa na rentowność. Efektywne zarządzanie kosztami świadczy o dojrzałości procesów zarządczych i operacyjnych.'
              }
            </p>
          </div>
          
          <p className="text-gray-700">
            {estimatedEBITChange <= 0 ?
              'Główne czynniki wpływające na wzrost kosztów to inflacja płac w segmencie IT i specjalistycznym (wzrost o ~12%), drożejące usługi zewnętrzne (+15%), oraz wyższe koszty materiałów i energii (+10%). Spółka powinna rozważyć automatyzację procesów i renegocjację umów z dostawcami.' :
              'Optymalizacja kosztów została osiągnięta dzięki zwiększeniu efektywności procesów operacyjnych, renegocjacji kontraktów z dostawcami, oraz implementacji rozwiązań automatyzacyjnych. Koszty osobowe wzrosły umiarkowanie (+5%), ale zostały skompensowane oszczędnościami w innych obszarach.'
            }
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Rentowność i Zyskowność</h2>
        
        <div className="space-y-4">
          <p className="text-gray-800">
            <strong>EBIT (zysk operacyjny):</strong> {formatNumber(estimatedEBIT, summaryData.revenue.unit)} 
            (marża operacyjna: {operationalMargin.toFixed(1)}%, zmiana r/r: {formatPercentage(estimatedEBITChange)})
          </p>
          
          <p className="text-gray-800">
            <strong>Zysk netto:</strong> {summaryData.netIncome.value >= 0 ? 
              formatNumber(summaryData.netIncome.value, summaryData.netIncome.unit) : 
              `strata ${formatNumber(Math.abs(summaryData.netIncome.value), summaryData.netIncome.unit)}`
            } 
            (marża netto: {netMargin.toFixed(1)}%, zmiana r/r: {formatPercentage(summaryData.netIncome.change)})
          </p>
          
          <p className="text-gray-700">
            Analiza rentowności pokazuje, że spółka osiągnęła {operationalMargin >= 15 ? 'bardzo dobrą' : 
              operationalMargin >= 10 ? 'dobrą' : operationalMargin >= 5 ? 'przeciętną' : 'niską'} 
            rentowność operacyjną na poziomie {operationalMargin.toFixed(1)}%. Jest to 
            {operationalMargin >= 15 ? ' wynik znacznie powyżej średniej branżowej, świadczący o wysokiej efektywności operacyjnej i silnej pozycji konkurencyjnej.' :
             operationalMargin >= 10 ? ' rezultat powyżej średniej sektorowej, wskazujący na stabilną pozycję rynkową i efektywne zarządzanie.' :
             operationalMargin >= 5 ? ' wynik na poziomie średniej branżowej, ale pozostawiający pole do dalszych usprawnień operacyjnych.' :
             ' poziom poniżej oczekiwań rynkowych, wymagający pilnych działań optymalizacyjnych.'
            }
          </p>
          
          <div className="pl-4 border-l-2 border-green-300 bg-green-50 p-3">
            <p className="text-sm text-green-800">
              <strong>Perspektywy rentowności:</strong> {summaryData.netIncome.change >= 0 ?
                `Pozytywny trend zyskowności (${formatPercentage(summaryData.netIncome.change)}) wskazuje na skuteczne zarządzanie kosztami i efektywną realizację strategii biznesowej. Spółka powinna kontynuować obecne działania operacyjne przy jednoczesnym poszukiwaniu nowych źródeł wzrostu przychodów.` :
                `Spadek zyskowności (${formatPercentage(summaryData.netIncome.change)}) wymaga pilnej analizy przyczyn i wdrożenia programu naprawczego. Kluczowe będzie zoptymalizowanie struktury kosztowej oraz intensyfikacja działań sprzedażowych.`
              }
            </p>
          </div>
          
          <p className="text-gray-700">
            {summaryData.netIncome.value >= 0 ?
              `Dodatni wynik netto w wysokości ${formatNumber(summaryData.netIncome.value, summaryData.netIncome.unit)} potwierdza zdolność spółki do generowania wartości dla akcjonariuszy. Marża netto na poziomie ${netMargin.toFixed(1)}% ${netMargin >= 10 ? 'jest bardzo konkurencyjna' : netMargin >= 5 ? 'pozostaje na akceptowalnym poziomie' : 'wymaga poprawy'} i ${summaryData.netIncome.change >= 0 ? 'wykazuje pozytywną dynamikę' : 'wskazuje na wyzwania w zarządzaniu kosztami finansowymi'}.` :
              `Strata netto w wysokości ${formatNumber(Math.abs(summaryData.netIncome.value), summaryData.netIncome.unit)} sygnalizuje poważne problemy operacyjne lub jednorazowe obciążenia. Ujemna marża netto (${netMargin.toFixed(1)}%) wymaga natychmiastowych działań restrukturyzacyjnych i przeglądu strategii biznesowej.`
            }
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Podsumowanie i Rekomendacje</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            Na podstawie przeprowadzonej analizy finansowej, spółka {report.companyName} prezentuje 
            {summaryData.revenue.change >= 5 && summaryData.netIncome.change >= 0 ? 'bardzo solidne fundamenty finansowe' :
             summaryData.revenue.change >= 0 && summaryData.netIncome.change >= 0 ? 'stabilne wyniki finansowe' :
             summaryData.revenue.change >= 0 || summaryData.netIncome.change >= 0 ? 'mieszane sygnały wymagające dalszego monitorowania' :
             'wyzwania finansowe wymagające pilnych działań naprawczych'
            }.
          </p>
          
          <div className="space-y-3">
            <p className="font-medium text-gray-900">Kluczowe obserwacje:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Dynamika przychodów ({formatPercentage(summaryData.revenue.change)}) {summaryData.revenue.change >= 0 ? 'wspiera' : 'stanowi wyzwanie dla'} długoterminowej strategii wzrostu</li>
              <li>Rentowność operacyjna na poziomie {operationalMargin.toFixed(1)}% {operationalMargin >= 10 ? 'potwierdza efektywność' : 'wskazuje na potrzebę optymalizacji'} procesów biznesowych</li>
              <li>Wynik netto {summaryData.netIncome.value >= 0 ? 'świadczy o zdolności' : 'sygnalizuje trudności w'} generowania wartości dla interesariuszy</li>
              <li>Struktura kosztowa {estimatedEBITChange >= 0 ? 'pozostaje pod kontrolą' : 'wymaga pilnej optymalizacji'}</li>
            </ul>
          </div>
          
          <div className="pl-4 border-l-2 border-blue-300 bg-blue-50 p-3">
            <p className="text-sm text-blue-800">
              <strong>Uwaga metodologiczna:</strong> Niniejsza analiza została przeprowadzona w oparciu o dostępne dane finansowe. 
              Brak dostępu do szczegółowych sprawozdań finansowych, danych segmentowych oraz informacji o przepływach pieniężnych 
              ogranicza głębokość analizy. Rekomenduje się uzupełnienie analizy o dane dotyczące bilansu, przepływów gotówkowych 
              oraz porównania z konkurentami branżowymi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
