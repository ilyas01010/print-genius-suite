
import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
}

const StatCard = ({ title, value, change, icon, className }: StatCardProps) => {
  return (
    <Card className={cn("pod-stat-card", className)}>
      <CardContent className="p-4 flex justify-between items-start">
        <div className="space-y-1">
          <p className="pod-stat-label">{title}</p>
          <p className="pod-stat-value">{value}</p>
          
          {change && (
            <div className="flex items-center text-sm">
              {change.trend === "up" ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-600">{change.value}%</span>
                </>
              ) : change.trend === "down" ? (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-600">{change.value}%</span>
                </>
              ) : (
                <span className="text-gray-600">No change</span>
              )}
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && <div className="text-pod-blue">{icon}</div>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
