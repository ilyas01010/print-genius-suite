
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define trending niches with mock data
const trendingNiches = [
  {
    id: 1,
    name: "Mushroom Art",
    category: "Nature",
    growth: 126,
    platforms: ["Etsy", "Amazon", "Redbubble"]
  },
  {
    id: 2,
    name: "Plant Mom",
    category: "Lifestyle",
    growth: 89,
    platforms: ["Etsy", "Printify", "Teespring"]
  },
  {
    id: 3,
    name: "Retro Gaming",
    category: "Gaming",
    growth: 75,
    platforms: ["Amazon", "Redbubble", "Merch by Amazon"]
  },
  {
    id: 4,
    name: "Cottagecore",
    category: "Lifestyle",
    growth: 68,
    platforms: ["Etsy", "Society6", "Printful"]
  },
  {
    id: 5,
    name: "Digital Nomad",
    category: "Work",
    growth: 52,
    platforms: ["Amazon", "Etsy", "Printify"]
  }
];

const TrendList = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-pod-blue" />
          Trending Niches
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          <span className="text-xs">View all</span>
          <ArrowRight className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingNiches.map((niche) => (
            <div key={niche.id} className="flex items-start justify-between border-b pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{niche.name}</h3>
                  <div className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-800">
                    +{niche.growth}%
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{niche.category}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {niche.platforms.map((platform) => (
                    <span 
                      key={platform} 
                      className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">View details</span>
              </Button>
            </div>
          ))}
          
          <div className="mt-4 rounded-md bg-muted p-3">
            <h4 className="font-medium">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              Combine trending niches with your unique keyword research to find untapped market opportunities.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendList;
