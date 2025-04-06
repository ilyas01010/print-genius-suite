
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TrademarkForm = () => {
  const [designText, setDesignText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designText.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter the text content of your design.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Check Complete",
        description: "Your design has been checked for potential trademark issues.",
      });
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Copyright & Trademark Checker</CardTitle>
        <CardDescription>
          Check your design text for potential trademark conflicts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="design-text" className="text-sm font-medium">
              Design Text Content
            </label>
            <Textarea
              id="design-text"
              placeholder="Enter the text from your design (e.g., slogans, phrases, unique terms)"
              value={designText}
              onChange={(e) => setDesignText(e.target.value)}
              className="min-h-32"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Checking...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Check for Trademark Issues
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrademarkForm;
