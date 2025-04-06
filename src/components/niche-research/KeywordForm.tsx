
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
import { Search, TrendingUp, PieChart, BarChart4 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the keyword result types
interface KeywordResult {
  id: number;
  term: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  platforms: {
    amazon: number;
    etsy: number;
    teespring: number;
  }
}

const KeywordForm = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      toast({
        title: "Keyword Required",
        description: "Please enter a keyword to search for niches.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API request - in a real app, this would call an actual API
    setTimeout(() => {
      const mockResults = generateMockResults(keyword);
      setResults(mockResults);
      setIsLoading(false);
      toast({
        title: "Search Complete",
        description: `${mockResults.length} niche opportunities found for "${keyword}"`,
      });
      
      // Here you would typically update some state or trigger a data fetch
      console.log(`Searching for: ${keyword}`);
    }, 1500);
  };

  // Generate mock results based on the keyword
  const generateMockResults = (keyword: string): KeywordResult[] => {
    const baseTerms = [
      keyword,
      `funny ${keyword}`,
      `${keyword} lover`,
      `${keyword} gift`,
      `vintage ${keyword}`,
      `${keyword} design`,
      `${keyword} enthusiast`
    ];
    
    return baseTerms.map((term, index) => ({
      id: index + 1,
      term,
      searchVolume: Math.floor(Math.random() * 10000) + 500,
      competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      platforms: {
        amazon: Math.floor(Math.random() * 5000) + 100,
        etsy: Math.floor(Math.random() * 3000) + 50,
        teespring: Math.floor(Math.random() * 2000) + 20
      }
    }));
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-red-600';
      default: return '';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case 'stable': return <div className="h-4 w-4 border-t-2 border-gray-400"></div>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Niche Research</CardTitle>
          <CardDescription>
            Enter a keyword to discover trending niches and analyze competition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <Input
              placeholder="Enter keyword (e.g., fishing, cats, hiking)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-pod-blue" />
              Niche Opportunities
            </CardTitle>
            <CardDescription>
              Results for "{keyword}" sorted by potential
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 pr-4 font-medium">Keyword</th>
                      <th className="pb-2 px-4 font-medium">Search Volume</th>
                      <th className="pb-2 px-4 font-medium">Competition</th>
                      <th className="pb-2 px-4 font-medium">Trend</th>
                      <th className="pb-2 px-4 font-medium">
                        <div className="flex items-center gap-1">
                          <BarChart4 className="h-4 w-4" />
                          <span>Platform Listings</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 pr-4 font-medium">{result.term}</td>
                        <td className="py-3 px-4">{result.searchVolume.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={getCompetitionColor(result.competition)}>
                            {result.competition.charAt(0).toUpperCase() + result.competition.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {getTrendIcon(result.trend)}
                            <span>
                              {result.trend.charAt(0).toUpperCase() + result.trend.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 text-xs">
                            <div className="rounded bg-red-100 px-2 py-1 text-red-800">
                              Amazon: {result.platforms.amazon.toLocaleString()}
                            </div>
                            <div className="rounded bg-orange-100 px-2 py-1 text-orange-800">
                              Etsy: {result.platforms.etsy.toLocaleString()}
                            </div>
                            <div className="rounded bg-blue-100 px-2 py-1 text-blue-800">
                              Teespring: {result.platforms.teespring.toLocaleString()}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No results found for "{keyword}"</p>
                <p className="text-sm text-muted-foreground">Try a different keyword</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KeywordForm;
