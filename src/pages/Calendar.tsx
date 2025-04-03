
import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronRight, Calendar as CalendarDaysIcon } from "lucide-react";
import { format, isThisMonth, isToday, isFuture, addMonths } from "date-fns";
import { pl } from "date-fns/locale";
import { financialReports } from "@/lib/data";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeView, setActiveView] = useState<string>("calendar");
  
  // Create a map of dates with events
  const eventDates = useMemo(() => {
    return financialReports.reduce<Record<string, number>>((acc, report) => {
      const reportDate = new Date(report.publicationDate);
      const dateStr = format(reportDate, 'yyyy-MM-dd');
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});
  }, []);

  // Get reports for the selected date
  const getReportsForDate = (date?: Date) => {
    if (!date) return [];
    
    const dateStr = format(date, 'yyyy-MM-dd');
    
    return financialReports.filter(report => {
      const reportDate = new Date(report.publicationDate);
      const reportDateStr = format(reportDate, 'yyyy-MM-dd');
      return reportDateStr === dateStr;
    });
  };

  // Group reports by company
  const reportsByCompany = useMemo(() => {
    return financialReports.reduce<Record<string, typeof financialReports>>((acc, report) => {
      if (!acc[report.companyName]) {
        acc[report.companyName] = [];
      }
      acc[report.companyName].push(report);
      return acc;
    }, {});
  }, []);

  // Get upcoming reports (next 3 months)
  const upcomingReports = useMemo(() => {
    const today = new Date();
    const threeMonthsLater = addMonths(today, 3);
    
    return financialReports
      .filter(report => {
        const reportDate = new Date(report.publicationDate);
        return isFuture(reportDate) && reportDate <= threeMonthsLater;
      })
      .sort((a, b) => {
        return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
      });
  }, []);

  // Group upcoming reports by day
  const reportsByDay = useMemo(() => {
    return upcomingReports.reduce<Record<string, typeof financialReports>>((acc, report) => {
      const dateStr = format(new Date(report.publicationDate), 'yyyy-MM-dd');
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(report);
      return acc;
    }, {});
  }, []);

  const selectedDateReports = date ? getReportsForDate(date) : [];
  const formattedDate = date ? format(date, 'd MMMM yyyy', { locale: pl }) : '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab="calendar" />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Kalendarium Raportów</h1>
        
        <Tabs defaultValue="calendar" value={activeView} onValueChange={setActiveView} className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Widok kalendarza
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center">
              <Badge variant="outline" className="mr-2">{Object.keys(reportsByCompany).length}</Badge>
              Spółki
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center">
              <Badge variant="outline" className="mr-2">{upcomingReports.length}</Badge>
              Nadchodzące raporty
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Wybierz datę</CardTitle>
                <CardDescription>Wybierz datę aby zobaczyć raporty opublikowane tego dnia</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={pl}
                  modifiers={{
                    hasEvent: (date) => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      return !!eventDates[dateStr];
                    }
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-primary/20 font-bold relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
                  }}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Raporty z dnia: {formattedDate}
                </CardTitle>
                <CardDescription>
                  {selectedDateReports.length === 0 
                    ? "Brak raportów w wybranym dniu" 
                    : `Znaleziono ${selectedDateReports.length} raportów`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateReports.length > 0 ? (
                  <ul className="space-y-4">
                    {selectedDateReports.map((report) => (
                      <li key={report.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{report.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                              <span>{report.companyName}</span>
                              <span className="inline-block bg-muted w-1 h-1 rounded-full"></span>
                              <span>{report.ticker}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline">{report.reportType}</Badge>
                              {report.category && <Badge variant="secondary">{report.category}</Badge>}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <p>Wybierz datę z zaznaczonymi wydarzeniami, aby zobaczyć raporty</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(reportsByCompany).map(([company, reports]) => (
              <Card key={company}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{company}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mr-2">{reports.length}</Badge>
                    raporty
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {reports.slice(0, 5).map((report) => (
                      <li key={report.id} className="text-sm flex justify-between items-center py-1 border-b last:border-b-0">
                        <div>
                          <div className="font-medium">{report.reportType}</div>
                          <div className="text-muted-foreground">
                            {format(new Date(report.publicationDate), 'dd MMM yyyy', { locale: pl })}
                          </div>
                        </div>
                        <Badge variant={
                          isToday(new Date(report.publicationDate)) ? "default" :
                          isFuture(new Date(report.publicationDate)) ? "secondary" : "outline"
                        }>
                          {isToday(new Date(report.publicationDate)) ? "Dziś" :
                           isFuture(new Date(report.publicationDate)) ? "Nadchodzące" : "Zakończone"}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  {reports.length > 5 && (
                    <div className="mt-3 text-sm text-muted-foreground text-center">
                      + {reports.length - 5} więcej raportów
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          {Object.entries(reportsByDay).map(([day, reports]) => {
            const reportDate = new Date(day);
            const isToday = format(new Date(), 'yyyy-MM-dd') === day;
            const isThisMonthDate = isThisMonth(reportDate);
            
            return (
              <Card key={day} className={isToday ? "border-primary" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-xl">
                    <CalendarDaysIcon className="mr-2 h-5 w-5" />
                    {format(reportDate, 'd MMMM yyyy', { locale: pl })}
                    {isToday && <Badge className="ml-2">Dziś</Badge>}
                  </CardTitle>
                  <CardDescription>
                    {reports.length} {reports.length === 1 ? 'raport' : 'raporty'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {reports.map((report) => (
                      <li key={report.id} className="py-3 flex justify-between items-start">
                        <div>
                          <div className="font-medium">{report.companyName} ({report.ticker})</div>
                          <div className="text-sm text-muted-foreground">{report.title}</div>
                          <div className="mt-1">
                            <Badge variant="outline">{report.reportType}</Badge>
                            {report.category && (
                              <Badge variant="secondary" className="ml-2">{report.category}</Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground mt-1" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
          
          {Object.keys(reportsByDay).length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <CalendarDaysIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Brak nadchodzących raportów</h3>
              <p>Nie znaleziono żadnych raportów zaplanowanych na najbliższe 3 miesiące.</p>
            </div>
          )}
        </TabsContent>
      </main>
    </div>
  );
};

export default CalendarPage;
