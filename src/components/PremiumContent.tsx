
import { LockKeyhole, Unlock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumContent as PremiumContentType } from "@/lib/types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface PremiumContentProps {
  content: PremiumContentType;
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function PremiumContent({ content, children, requireAuth = false }: PremiumContentProps) {
  const [unlocked, setUnlocked] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // If authentication is required and user is not logged in
  const authRequired = requireAuth && !user;
  
  const handleUnlock = () => {
    // In a real application, this would trigger a payment flow
    toast({
      title: "Premium Content Unlocked!",
      description: "You now have access to premium content.",
      duration: 3000,
    });
    setUnlocked(true);
  };
  
  if (unlocked) {
    return <>{children}</>;
  }
  
  return (
    <div className="border border-border rounded-lg p-6 bg-secondary/10">
      <div className="flex items-center justify-center flex-col text-center max-w-md mx-auto">
        <div className="bg-primary/10 p-3 rounded-full mb-4">
          <LockKeyhole className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">{content.title}</h3>
        <p className="text-muted-foreground mb-6">{content.description}</p>
        
        {authRequired ? (
          <div className="space-y-3 w-full">
            <Link to="/login" className="w-full">
              <Button className="w-full mb-2">
                <LogIn className="h-4 w-4 mr-2" />
                Login to View Content
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              You need to be logged in to access this premium content.
            </p>
          </div>
        ) : (
          <>
            <Button onClick={handleUnlock} className="mb-2">
              <Unlock className="h-4 w-4 mr-2" />
              Unlock for {content.unlockPrice || "$4.99"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Unlock this premium content to access detailed analysis and insights.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
