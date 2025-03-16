
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Facebook, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { FinancialReport } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

interface ShareReportProps {
  isOpen: boolean;
  onClose: () => void;
  report: FinancialReport;
}

export function ShareReport({ isOpen, onClose, report }: ShareReportProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // In a real app, this would be a dynamic URL
  const shareUrl = `https://stocksummaryhub.com/reports/${report.id}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "The share link has been copied to your clipboard.",
      duration: 3000,
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareViaService = (service: string) => {
    let shareLink = "";
    const text = `Check out this financial report summary for ${report.companyName}`;
    
    switch (service) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, "_blank");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Report</DialogTitle>
          <DialogDescription>
            Share this financial report summary with others
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              readOnly
              value={shareUrl}
              className="font-mono text-sm"
            />
          </div>
          <Button type="submit" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        
        <div className="flex justify-center space-x-4 mt-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={() => shareViaService("twitter")}
          >
            <Twitter className="h-5 w-5 text-blue-400" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={() => shareViaService("facebook")}
          >
            <Facebook className="h-5 w-5 text-blue-600" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={() => shareViaService("linkedin")}
          >
            <Linkedin className="h-5 w-5 text-blue-800" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
