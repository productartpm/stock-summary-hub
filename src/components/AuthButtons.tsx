
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AuthButtons() {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground">
          <Button variant="ghost" size="sm" className="gap-1">
            <User size={16} />
            {user.email}
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="outline" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Register
        </Button>
      </Link>
    </div>
  );
}
