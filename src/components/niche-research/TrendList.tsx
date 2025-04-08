
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

// Sample trend data
const initialTrends = [
  {
    id: 1,
    keyword: "Cottagecore",
    category: "apparel",
    trend: "up",
    score: 89,
    competition: "medium",
    roi: "high",
  },
  {
    id: 2,
    keyword: "Mushroom Aesthetic",
    category: "wall-art",
    trend: "up",
    score: 92,
    competition: "low",
    roi: "high",
  },
  {
    id: 3,
    keyword: "Plant Dad",
    category: "homegoods",
    trend: "neutral",
    score: 67,
    competition: "high",
    roi: "medium",
  },
  {
    id: 4,
    keyword: "Vintage Cameras",
    category: "accessories",
    trend: "down",
    score: 45,
    competition: "medium",
    roi: "low",
  },
];

interface Trend {
  id: number;
  keyword: string;
  category: string;
  trend: "up" | "down" | "neutral";
  score: number;
  competition: "low" | "medium" | "high";
  roi: "low" | "medium" | "high";
}

const TrendList = () => {
  const [trends, setTrends] = useState<Trend[]>(initialTrends);

  useEffect(() => {
    // Listen for search events from KeywordForm
    const handleSearch = (event: any) => {
      const { keyword, category } = event.detail;
      
      // In a real application, this would fetch from an API
      // For now, we'll just simulate new search results
      if (keyword) {
        // Simulate a new trending niche based on the search
        const newTrend: Trend = {
          id: Math.floor(Math.random() * 1000) + 10,
          keyword: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          category: category || "general",
          trend: Math.random() > 0.3 ? "up" : Math.random() > 0.5 ? "neutral" : "down",
          score: Math.floor(Math.random() * 50) + 50,
          competition: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
          roi: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
        };

        setTrends(prevTrends => [newTrend, ...prevTrends].slice(0, 5));
      }
    };

    window.addEventListener('nicheSearch', handleSearch);
    
    return () => {
      window.removeEventListener('nicheSearch', handleSearch);
    };
  }, []);

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-amber-500" />;
    }
  };

  const getCompetitionBadge = (competition: "low" | "medium" | "high") => {
    switch (competition) {
      case "low":
        return <Badge variant="success" className="text-xs">Low</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case "high":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
    }
  };

  const getRoiBadge = (roi: "low" | "medium" | "high") => {
    switch (roi) {
      case "low":
        return <Badge variant="outline" className="text-xs border-red-200 bg-red-50 text-red-700">Low ROI</Badge>;
      case "medium":
        return <Badge variant="outline" className="text-xs border-amber-200 bg-amber-50 text-amber-700">Medium ROI</Badge>;
      case "high":
        return <Badge variant="outline" className="text-xs border-emerald-200 bg-emerald-50 text-emerald-800">High ROI</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Trending Niches</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {trends.map((trend) => (
            <div key={trend.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{trend.keyword}</div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(trend.trend)}
                  <span className={`text-sm ${
                    trend.trend === "up" ? "text-emerald-600" : 
                    trend.trend === "down" ? "text-red-600" : "text-amber-600"
                  }`}>
                    {trend.score}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge variant="secondary" className="text-xs">{trend.category}</Badge>
                  {getCompetitionBadge(trend.competition)}
                  {getRoiBadge(trend.roi)}
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Add missing Button component
const Button = ({ children, variant, size, className, ...props }: any) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" : ""
      } ${
        size === "icon" ? "h-10 w-10" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TrendList;
