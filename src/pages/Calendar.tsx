
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CalendarEvent {
  id: string;
  company: string;
  ticker: string;
  date: Date;
  type: 'quarterly' | 'annual';
  description: string;
}

// Sample calendar data - this would typically come from an API
const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    company: 'PKN Orlen',
    ticker: 'PKN',
    date: new Date(2025, 3, 5), // April 5, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '2',
    company: 'KGHM',
    ticker: 'KGH',
    date: new Date(2025, 3, 8), // April 8, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '3',
    company: 'CD Projekt',
    ticker: 'CDR',
    date: new Date(2025, 3, 12), // April 12, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '4',
    company: 'PZU',
    ticker: 'PZU',
    date: new Date(2025, 3, 15), // April 15, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '5',
    company: 'PKO BP',
    ticker: 'PKO',
    date: new Date(2025, 3, 18), // April 18, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '6',
    company: 'Allegro',
    ticker: 'ALE',
    date: new Date(2025, 3, 22), // April 22, 2025
    type: 'annual',
    description: 'Raport roczny 2024'
  },
  {
    id: '7',
    company: 'LPP',
    ticker: 'LPP',
    date: new Date(2025, 3, 25), // April 25, 2025
    type: 'annual',
    description: 'Raport roczny 2024'
  },
  {
    id: '8',
    company: 'Dino Polska',
    ticker: 'DNP',
    date: new Date(2025, 3, 28), // April 28, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '9',
    company: 'JSW',
    ticker: 'JSW',
    date: new Date(2025, 4, 5), // May 5, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  },
  {
    id: '10',
    company: 'Cyfrowy Polsat',
    ticker: 'CPS',
    date: new Date(2025, 4, 10), // May 10, 2025
    type: 'quarterly',
    description: 'Raport kwartalny Q1 2025'
  }
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('list'); // Changed default to 'list'
  
  // Filter events for the selected day
  const selectedDateEvents = date 
    ? calendarEvents.filter(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      )
    : [];
    
  // Function to get all dates with events
  const getDaysWithEvents = () => {
    return calendarEvents.map(event => 
      new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate())
    );
  };
  
  // Get all upcoming events sorted by date
  const upcomingEvents = [...calendarEvents].sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter(event => event.date >= new Date(new Date().setHours(0, 0, 0, 0)));
    
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Centrum Raportów Giełdowych</h1>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-4 text-sm">
              <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">ESPI</a>
              <a href="/calendar" className="text-primary">Kalendarium raportów</a>
              <a href="/indicators" className="text-muted-foreground hover:text-foreground transition-colors">Wskaźniki</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Kalendarium publikacji raportów</h1>
          <p className="text-muted-foreground">
            Sprawdź daty publikacji nadchodzących raportów finansowych spółek giełdowych.
          </p>
        </div>
        
        <Tabs defaultValue="list" onValueChange={(v) => setView(v as 'calendar' | 'list')}>
          <TabsList className="mb-6">
            <TabsTrigger value="list">Lista chronologiczna</TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Kalendarz
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Nadchodzące publikacje raportów</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <ul className="divide-y">
                    {upcomingEvents.map((event) => (
                      <li key={event.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-baseline">
                              <span className="font-semibold">{event.company}</span>
                              <span className="text-sm ml-2 text-muted-foreground">({event.ticker})</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{format(event.date, 'd MMMM yyyy', { locale: pl })}</div>
                            <Badge variant={event.type === 'quarterly' ? 'secondary' : 'default'} className="mt-1">
                              {event.type === 'quarterly' ? 'Kwartalny' : 'Roczny'}
                            </Badge>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-muted-foreground py-6">
                    Brak zaplanowanych nadchodzących raportów
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Kalendarz raportów</span>
                    <div className="text-sm font-normal flex items-center">
                      <Button variant="outline" size="sm" className="h-8 mr-2" onClick={() => setDate(new Date())}>
                        Dzisiaj
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mx-auto"
                    locale={pl}
                    modifiers={{
                      hasEvent: getDaysWithEvents(),
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-primary/20 text-primary-foreground font-bold",
                    }}
                    components={{
                      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                      IconRight: () => <ChevronRight className="h-4 w-4" />,
                    }}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date ? format(date, 'd MMMM yyyy', { locale: pl }) : 'Wybierz datę'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <ul className="space-y-3">
                      {selectedDateEvents.map((event) => (
                        <li key={event.id} className="p-3 rounded-md border">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold">{event.company}</span>
                              <span className="text-sm ml-2 text-muted-foreground">({event.ticker})</span>
                            </div>
                            <Badge variant={event.type === 'quarterly' ? 'secondary' : 'default'}>
                              {event.type === 'quarterly' ? 'Kwartalny' : 'Roczny'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-muted-foreground py-6">
                      {date ? 'Brak zaplanowanych raportów na ten dzień' : 'Wybierz datę, aby zobaczyć raporty'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CalendarPage;
