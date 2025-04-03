import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab="home" />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Main page content */}
      </main>
    </div>
  );
};

export default Index;
