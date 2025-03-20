
import { formatNumber } from "@/lib/data";
import type { FinancialReport } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Target, Zap, ArrowRight, Clock, CheckCircle, Award } from "lucide-react";

interface ReportOutlookProps {
  report: FinancialReport;
}

export const ReportOutlook = ({ report }: ReportOutlookProps) => {
  if (!report.outlook) {
    return <p className="text-neutral-600">Brak dostępnych informacji o perspektywach.</p>;
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-neutral-800">Plany na Przyszłość</h2>
      
      <Card className="mb-4 bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-amber-300">Oświadczenie Zarządu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-300">{report.outlook.statement}</p>
          
          {(report.outlook.guidanceRevenue || report.outlook.guidanceEps) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.outlook.guidanceRevenue && (
                <div className="bg-neutral-700 rounded-lg p-4 border border-amber-400/30">
                  <div className="text-sm font-medium mb-1 text-amber-300">Prognoza Przychodów</div>
                  <div className="text-xl font-bold text-white">
                    {formatNumber(report.outlook.guidanceRevenue.min, report.outlook.guidanceRevenue.unit)} - {formatNumber(report.outlook.guidanceRevenue.max, report.outlook.guidanceRevenue.unit)}
                  </div>
                </div>
              )}
              
              {report.outlook.guidanceEps && (
                <div className="bg-neutral-700 rounded-lg p-4 border border-amber-400/30">
                  <div className="text-sm font-medium mb-1 text-amber-300">Prognoza Zysku na Akcję</div>
                  <div className="text-xl font-bold text-white">
                    {formatNumber(report.outlook.guidanceEps.min, report.outlook.guidanceEps.unit)} - {formatNumber(report.outlook.guidanceEps.max, report.outlook.guidanceEps.unit)}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Timeline-style representation of plans */}
      <div className="mb-6">
        <Card className="bg-neutral-800 text-white border-amber-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-300 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Oś Czasu Strategiczna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-8 space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-amber-400/30">
              {/* Short term plans */}
              <div className="relative">
                <div className="absolute left-[-27px] top-0 h-6 w-6 rounded-full bg-amber-400 text-black flex items-center justify-center">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div className="mb-1 flex items-center">
                  <h3 className="text-base font-semibold text-amber-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-amber-300" />
                    Plany Krótkoterminowe (6-12 miesięcy)
                  </h3>
                </div>
                <div className="bg-neutral-700 rounded-md p-3 text-sm text-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Koncentracja na segmencie {report.reportCategory[0]} z budżetem {formatNumber(report.summaryData.revenue.value * 0.15, report.summaryData.revenue.unit)}</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{report.summaryData.revenue.change >= 0 ? 'Rozwój kluczowych' : 'Stabilizacja'} operacji biznesowych poprzez reorganizację struktury zarządzania</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Wdrożenie nowych systemów zarządzania jakością ISO 9001:2015</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Optymalizacja kosztów operacyjnych - redukcja o 8-12%</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Rozwój platformy sprzedażowej online z integracją AI</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Cel przychodowy: {formatNumber(report.summaryData.revenue.value * 4 * 1.05, report.summaryData.revenue.unit)} (roczny)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medium term plans */}
              <div className="relative">
                <div className="absolute left-[-27px] top-0 h-6 w-6 rounded-full bg-amber-400 text-black flex items-center justify-center">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div className="mb-1 flex items-center">
                  <h3 className="text-base font-semibold text-amber-300 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-amber-300" />
                    Strategia Średnioterminowa (1-3 lata)
                  </h3>
                </div>
                <div className="bg-neutral-700 rounded-md p-3 text-sm text-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <ArrowRight className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>Ekspansja rynkowa w sąsiednich segmentach z budżetem {formatNumber(report.summaryData.revenue.value * 0.4, report.summaryData.revenue.unit)}</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <ArrowRight className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>Zwiększenie portfolio produktowego o 30% i wprowadzenie 5 nowych innowacyjnych rozwiązań</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <ArrowRight className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>Nawiązanie strategicznych partnerstw z 3-5 liderami branży i analiza potencjalnych przejęć</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <ArrowRight className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>Rozwój technologiczny i digitalizacja 70% kluczowych procesów biznesowych</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <ArrowRight className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>Inwestycja {formatNumber(report.summaryData.revenue.value * 0.2, report.summaryData.revenue.unit)} w badania i rozwój nowych produktów</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <ArrowRight className="h-4 w-4 text-amber-300 mt-0.5 flex-shrink-0" />
                        <span>Optymalizacja łańcucha dostaw i logistyki - wdrożenie systemu ERP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Long term plans */}
              <div className="relative">
                <div className="absolute left-[-27px] top-0 h-6 w-6 rounded-full bg-amber-400 text-black flex items-center justify-center">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div className="mb-1 flex items-center">
                  <h3 className="text-base font-semibold text-amber-300 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-amber-300" />
                    Wizja Długoterminowa (3-5 lat)
                  </h3>
                </div>
                <div className="bg-neutral-700 rounded-md p-3 text-sm text-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Osiągnięcie pozycji TOP 3 liderów w segmencie {report.reportCategory[0]} z udziałem rynkowym powyżej 15%</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Dywersyfikacja przychodów - nowe obszary biznesowe stanowiące 30% portfela</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Wzrost przychodów do poziomu {formatNumber(report.summaryData.revenue.value * 4 * 2.5, report.summaryData.revenue.unit)} rocznie</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{report.reportCategory.includes('ESG') ? 'Wdrożenie kompleksowej strategii ESG' : 'Transformacja branży poprzez innowacyjne rozwiązania'}</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Globalna ekspansja - obecność na minimum 10 kluczowych rynkach międzynarodowych</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Award className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>Budowa kultury organizacyjnej opartej na innowacji i zrównoważonym rozwoju</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-neutral-800 text-white border-amber-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-amber-300">Cele Strategiczne 2025-2028</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-neutral-700 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2 text-amber-300 flex items-center">
                <ArrowRight className="h-4 w-4 mr-1" /> Cele Finansowe
              </h4>
              <ul className="text-xs space-y-1.5 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Roczny wzrost przychodów: 12-15%
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Marża EBITDA: powyżej 20%
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Zwrot z kapitału (ROE): >15%
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Wskaźnik zadłużenia: <0,3
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-700 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2 text-amber-300 flex items-center">
                <ArrowRight className="h-4 w-4 mr-1" /> Cele Rynkowe
              </h4>
              <ul className="text-xs space-y-1.5 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Udział w rynku: wzrost do 20%
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Ekspansja na 5 nowych rynków
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Wprowadzenie 10+ nowych produktów
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Pozyskanie 1000+ nowych klientów
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-700 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2 text-amber-300 flex items-center">
                <ArrowRight className="h-4 w-4 mr-1" /> Cele Organizacyjne
              </h4>
              <ul className="text-xs space-y-1.5 text-gray-300">
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Cyfryzacja 90% procesów biznesowych
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Zmniejszenie śladu węglowego o 30%
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Wdrożenie systemu zarządzania innowacjami
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 bg-amber-400 rounded-full mr-1.5"></span>
                  Rozwój talentów i zwiększenie retencji
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
