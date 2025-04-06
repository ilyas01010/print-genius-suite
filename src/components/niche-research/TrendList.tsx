
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface NicheTrend {
  id: string;
  keyword: string;
  volume: number;
  growth: number;
  competition: number;
}

const TrendList = () => {
  // Mock data for trending niches
  const trendingNiches: NicheTrend[] = [
    {
      id: "1",
      keyword: "Cottagecore Aesthetic",
      volume: 24500,
      growth: 78,
      competition: 0.4,
    },
    {
      id: "2",
      keyword: "National Parks Art",
      volume: 18200,
      growth: 65,
      competition: 0.5,
    },
    {
      id: "3",
      keyword: "Minimalist Line Art",
      volume: 32000,
      growth: 55,
      competition: 0.7,
    },
    {
      id: "4",
      keyword: "Pet Portraits",
      volume: 28700,
      growth: 42,
      competition: 0.8,
    },
    {
      id: "5",
      keyword: "Retro Gaming",
      volume: 35400,
      growth: 38,
      competition: 0.6,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Trending Niches</CardTitle>
        <TrendingUp className="h-4 w-4 text-pod-blue" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
            <div>Niche</div>
            <div className="text-right">Search Vol.</div>
            <div className="text-right">Growth</div>
            <div className="text-right">Competition</div>
          </div>
          <div className="space-y-2">
            {trendingNiches.map((niche) => (
              <div key={niche.id} className="grid grid-cols-4 items-center gap-2 rounded-md py-2 hover:bg-muted/50">
                <div className="font-medium">{niche.keyword}</div>
                <div className="text-right">{niche.volume.toLocaleString()}</div>
                <div className="text-right text-green-600">+{niche.growth}%</div>
                <div className="text-right">
                  <div className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                    {niche.competition < 0.5 ? "Low" : niche.competition < 0.7 ? "Medium" : "High"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendList;
