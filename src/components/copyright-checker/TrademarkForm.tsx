
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface CheckResult {
  phrase: string;
  status: "safe" | "risky" | "violation";
  explanation: string;
  alternative?: string;
}

const TrademarkForm = () => {
  const [phrase, setPhrase] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phrase.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text to check for trademark issues.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasChecked(true);
    
    // Simulate API request - in a real app, this would call an actual API
    setTimeout(() => {
      const mockResults = generateMockResults(phrase, description);
      setResults(mockResults);
      setIsLoading(false);
      
      const violations = mockResults.filter(r => r.status === "violation").length;
      const risks = mockResults.filter(r => r.status === "risky").length;
      
      let toastVariant: "default" | "destructive" = "default";
      let toastTitle = "Check Complete";
      let toastDescription = "No trademark issues found.";
      
      if (violations > 0) {
        toastVariant = "destructive";
        toastTitle = "Trademark Issues Found";
        toastDescription = `${violations} potential violations detected. Please review.`;
      } else if (risks > 0) {
        toastTitle = "Potential Risks Found";
        toastDescription = `${risks} potential risks identified. Review recommended.`;
      }
      
      toast({
        title: toastTitle,
        description: toastDescription,
        variant: toastVariant,
      });
    }, 1500);
  };

  const generateMockResults = (phrase: string, description: string): CheckResult[] => {
    const results: CheckResult[] = [];
    const words = phrase.toLowerCase().split(/\s+/);
    
    // Check for common trademarked terms
    const trademarkTerms = [
      "nike", "adidas", "puma", "disney", "marvel", "batman", "superman", 
      "harry potter", "star wars", "nfl", "nba", "mlb", "coca-cola", "pepsi",
      "starbucks", "mcdonald's", "nike just do it", "i'm lovin it", "think different"
    ];
    
    const riskTerms = [
      "super", "hero", "magic", "wizard", "wars", "force", "pro", "max", "ultra", "plus"
    ];
    
    // Check for exact trademark matches
    words.forEach(word => {
      const matchedTerm = trademarkTerms.find(term => 
        term === word || phrase.toLowerCase().includes(term)
      );
      
      if (matchedTerm) {
        results.push({
          phrase: matchedTerm,
          status: "violation",
          explanation: `"${matchedTerm}" is a protected trademark and cannot be used without permission.`,
          alternative: generateAlternative(matchedTerm)
        });
      }
    });
    
    // Check for risky terms
    if (results.length === 0) {
      riskTerms.forEach(term => {
        if (words.includes(term) || phrase.toLowerCase().includes(term)) {
          results.push({
            phrase: term,
            status: "risky",
            explanation: `"${term}" could be risky if used in specific contexts or industries.`,
            alternative: generateAlternative(term)
          });
        }
      });
    }
    
    // If no issues found, return safe result
    if (results.length === 0) {
      results.push({
        phrase: phrase,
        status: "safe",
        explanation: "No trademark issues detected with this text.",
      });
    }
    
    return results;
  };
  
  const generateAlternative = (term: string): string => {
    const alternatives: Record<string, string[]> = {
      "nike": ["sportswear", "athletic gear"],
      "adidas": ["sports brand", "athletic apparel"],
      "disney": ["magical kingdom", "fantasy world"],
      "marvel": ["superheroes", "comic heroes"],
      "harry potter": ["wizard school", "magic academy"],
      "star wars": ["space saga", "galactic adventure"],
      "super": ["amazing", "fantastic", "incredible"],
      "hero": ["champion", "defender", "protector"],
      "magic": ["enchanted", "mystical", "spellbinding"],
      "wizard": ["sorcerer", "mage", "enchanter"],
      "wars": ["battles", "conflicts", "clashes"],
      "force": ["power", "energy", "strength"],
      "pro": ["expert", "master", "elite"],
      "max": ["ultimate", "extreme", "premium"],
      "ultra": ["superior", "supreme", "advanced"],
      "plus": ["extra", "enhanced", "additional"]
    };
    
    if (term in alternatives) {
      const options = alternatives[term];
      return options[Math.floor(Math.random() * options.length)];
    }
    
    return "Use a different term";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <Check className="h-5 w-5 text-green-500" />;
      case "risky":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "violation":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "bg-green-50 text-green-700 border-green-200";
      case "risky": return "bg-amber-50 text-amber-700 border-amber-200";
      case "violation": return "bg-red-50 text-red-700 border-red-200";
      default: return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-pod-blue" />
          Trademark Checker
        </CardTitle>
        <CardDescription>
          Check your text for potential trademark and copyright issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phrase" className="text-sm font-medium">
              Text to Check
            </label>
            <Input
              id="phrase"
              placeholder="Enter text, slogan, or phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description or Context (Optional)
            </label>
            <Textarea
              id="description"
              placeholder="Provide additional context about your design"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Checking...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Check for Issues
              </div>
            )}
          </Button>
        </form>
        
        {hasChecked && !isLoading && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Results</h3>
            
            <div className="space-y-3">
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className={`rounded-md border p-3 ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getStatusIcon(result.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {result.status === "safe" ? "Safe to Use" : 
                         result.status === "risky" ? "Potential Risk" : 
                         "Potential Violation"}
                      </div>
                      <p className="text-sm">{result.explanation}</p>
                      
                      {result.alternative && (
                        <div className="mt-2 text-sm">
                          <strong>Suggested alternative:</strong> {result.alternative}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrademarkForm;
