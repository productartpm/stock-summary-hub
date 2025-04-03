import { Header } from "@/components/Header";

const Calendar = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab="calendar" />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Kalendarium Raportów</h1>
        <div className="bg-card border rounded-lg p-6">
          <p className="text-lg text-muted-foreground">
            Kalendarz raportów okresowych i wydarzeń giełdowych.
          </p>
          {/* Calendar content would go here */}
        </div>
      </main>
    </div>
  );
};

export default Calendar;
