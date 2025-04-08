
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Search, TrendingUp, BarChart3 } from "lucide-react";

const KeywordForm = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("general");
  const [competitionLevel, setCompetitionLevel] = useState([50]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      toast({
        title: "Please enter a keyword",
        description: "You need to enter a keyword to search for trends.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Search complete",
        description: `Found trend data for "${keyword}"`,
      });
      
      // This would trigger a state update in a parent component or context
      // to display actual results
      
      // For demonstration purposes, we could emit an event or call a callback
      window.dispatchEvent(new CustomEvent('nicheSearch', { 
        detail: { 
          keyword, 
          category, 
          competitionLevel: competitionLevel[0] 
        } 
      }));
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Niche & Keyword Research
        </CardTitle>
        <CardDescription>
          Discover trending niches and analyze keyword potential for your POD products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="keyword" className="text-sm font-medium">Keyword or Phrase</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="keyword"
                  placeholder="Enter keyword or phrase"
                  className="pl-8"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Product Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="homegoods">Home Goods</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="wall-art">Wall Art</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="competition" className="text-sm font-medium">Competition Level</label>
              <span className="text-xs text-muted-foreground">{competitionLevel[0]}%</span>
            </div>
            <Slider
              id="competition"
              min={0}
              max={100}
              step={1}
              value={competitionLevel}
              onValueChange={setCompetitionLevel}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Competition</span>
              <span>High Competition</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isSearching} className="flex-1">
              {isSearching ? "Searching..." : "Search Trends"}
            </Button>
            <Button type="button" variant="outline" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Advanced Analysis
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <div>Last updated: April 8, 2025</div>
        <div>Data sources: Etsy, Amazon, Google Trends</div>
      </CardFooter>
    </Card>
  );
};

export default KeywordForm;
