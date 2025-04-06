
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  suffix?: string;
  prefix?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

const StatCard = ({ title, value, description, suffix, prefix, trend }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">
          {prefix}{typeof value === 'number' ? value.toString() : value}{suffix}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend ? (
              <>
                <span className={trend.direction === "up" ? "text-emerald-500" : "text-red-500"}>
                  {trend.direction === "up" ? "↑" : "↓"} {trend.value}
                </span>{" "}
                {description}
              </>
            ) : (
              description
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
