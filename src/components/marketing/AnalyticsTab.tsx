
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, ListChecks, ArrowRight } from "lucide-react";

const AnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Analytics Overview
        </CardTitle>
        <CardDescription>
          Track your marketing campaign performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Campaign Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Campaigns</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Campaigns</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed Campaigns</span>
                  <span className="font-medium">7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Engagement Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Likes</span>
                  <span className="font-medium">4,589</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Comments</span>
                  <span className="font-medium">1,245</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Shares</span>
                  <span className="font-medium">678</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" className="mt-4 w-full justify-start gap-2">
          <ListChecks className="h-4 w-4" />
          View Detailed Analytics
          <ArrowRight className="ml-auto h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
