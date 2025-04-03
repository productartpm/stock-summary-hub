
import { useState } from "react";
import { Header } from "@/components/Header";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { financialReports } from "@/lib/data";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Create a map of dates with events
  const eventDates = financialReports.reduce<Record<string, number>>((acc, report) => {
    const dateStr = format(new Date(report.publicationDate), 'yyyy-MM-dd');
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  // Get reports for the selected date
  const getReportsForDate = (date?: Date) => {
    if (!date) return [];
    const dateStr = format(date, 'yyyy-MM-dd');
    return financialReports.filter(report => {
      const reportDateStr = format(new Date(report.publicationDate), 'yyyy-MM-dd');
      return reportDateStr === dateStr;
    });
  };

  const selectedDateReports = getReportsForDate(date);
  const formattedDate = date ? format(date, 'd MMMM yyyy', { locale: pl }) : '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab="calendar" />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Kalendarium Raportów</h1>
        
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
      </main>
    </div>
  );
};

export default CalendarPage;
