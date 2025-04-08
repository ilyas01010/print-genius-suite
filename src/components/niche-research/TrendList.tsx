
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Trend, TrendDirection } from "./types";

// Sample data
const initialTrends: Trend[] = [
  { id: 1, keyword: "cat t-shirt", category: "Pets", trend: "up", score: 85, competition: "Medium", roi: "High" },
  { id: 2, keyword: "funny coffee mugs", category: "Drinkware", trend: "up", score: 92, competition: "High", roi: "Medium" },
  { id: 3, keyword: "dog dad", category: "Pets", trend: "neutral", score: 78, competition: "Medium", roi: "Medium" },
  { id: 4, keyword: "plant lover", category: "Hobbies", trend: "down", score: 65, competition: "Low", roi: "Medium" },
  { id: 5, keyword: "hiking adventure", category: "Outdoors", trend: "up", score: 88, competition: "Medium", roi: "High" },
  { id: 6, keyword: "teacher quotes", category: "Profession", trend: "neutral", score: 75, competition: "High", roi: "Low" },
  { id: 7, keyword: "mountain biking", category: "Sports", trend: "up", score: 89, competition: "Medium", roi: "High" },
  { id: 8, keyword: "guitar player", category: "Music", trend: "down", score: 63, competition: "Medium", roi: "Low" },
  { id: 9, keyword: "yoga poses", category: "Fitness", trend: "up", score: 87, competition: "High", roi: "Medium" },
  { id: 10, keyword: "beach sunset", category: "Travel", trend: "neutral", score: 74, competition: "Medium", roi: "Medium" }
];

const TrendList = () => {
  const [trends, setTrends] = useState<Trend[]>(initialTrends);
  const [searchTerm, setSearchTerm] = useState("");

  const getTrendIcon = (trend: TrendDirection) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      case "neutral":
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getBadgeVariant = (value: string) => {
    switch (value.toLowerCase()) {
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  const filteredTrends = trends.filter(
    trend =>
      trend.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trend.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Keywords</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search keywords or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Competition</TableHead>
                <TableHead>ROI Potential</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrends.map((trend) => (
                <TableRow key={trend.id}>
                  <TableCell className="font-medium">{trend.keyword}</TableCell>
                  <TableCell>{trend.category}</TableCell>
                  <TableCell>{getTrendIcon(trend.trend)}</TableCell>
                  <TableCell>
                    <Badge variant={trend.score >= 80 ? "success" : trend.score >= 70 ? "secondary" : "outline"}>
                      {trend.score}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(trend.competition)}>
                      {trend.competition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(trend.roi)}>
                      {trend.roi}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTrends.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendList;
