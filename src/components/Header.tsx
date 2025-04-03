
import { Link } from "react-router-dom";
import { AuthButtons } from "@/components/AuthButtons";
import { Lock } from "lucide-react";

interface HeaderProps {
  activeTab?: "home" | "calendar" | "indicators";
}

export function Header({ activeTab }: HeaderProps) {
  return (
    <header className="border-b border-border/60 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded h-8 w-8 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-semibold">stocksping.com</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-4 text-sm mr-4">
            <Link to="/" className={activeTab === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}>
              ESPI
            </Link>
            <Link to="/calendar" className={activeTab === "calendar" ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}>
              Kalendarium raportów
            </Link>
            <Link to="/indicators" className={activeTab === "indicators" ? "text-primary" : "text-muted-foreground hover:text-foreground transition-colors"}>
              Wskaźniki
            </Link>
          </nav>
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
