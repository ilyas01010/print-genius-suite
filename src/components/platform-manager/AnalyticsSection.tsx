
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Platform } from "./types";

interface AnalyticsSectionProps {
  platforms: Platform[];
  connectedPlatforms: number;
  isAnalyticsLoading: boolean;
  setSelectedTab: (tab: string) => void;
}

const AnalyticsSection = ({
  platforms,
  connectedPlatforms,
  isAnalyticsLoading,
  setSelectedTab
}: AnalyticsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Track performance across all connected platforms</CardDescription>
      </CardHeader>
      <CardContent>
        {isAnalyticsLoading ? (
          <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-2"></div>
              <h3 className="font-semibold">Loading Analytics</h3>
              <p className="text-muted-foreground text-xs max-w-xs mt-1">
                Please wait while we fetch your platform analytics data
              </p>
            </div>
          </div>
        ) : connectedPlatforms > 0 ? (
          <div className="space-y-6">
            <div className="h-64 border rounded-md bg-muted/20 p-4">
              <h3 className="font-medium mb-2">Revenue by Platform</h3>
              <div className="flex items-end h-48 gap-4">
                {platforms.filter(p => p.status === "connected").map((platform) => (
                  <div key={platform.id} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-primary/80 rounded-t" 
                      style={{ 
                        height: `${Math.max(5, (platform.revenue / (Math.max(...platforms.map(p => p.revenue)) || 1)) * 100)}%` 
                      }}
                    ></div>
                    <div className="mt-2 flex flex-col items-center">
                      <div className="h-4 w-4 overflow-hidden">
                        <img 
                          src={platform.logo} 
                          alt={`${platform.name}`} 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="text-xs mt-1">${platform.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Top Platforms</h3>
                <ol className="space-y-2">
                  {platforms.filter(p => p.status === "connected")
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((platform, index) => (
                      <li key={platform.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs font-medium w-5">{index + 1}.</span>
                          <div className="h-4 w-4 mr-2 overflow-hidden">
                            <img 
                              src={platform.logo} 
                              alt={platform.name}
                              className="h-full w-full object-contain" 
                            />
                          </div>
                          <span className="text-sm">{platform.name}</span>
                        </div>
                        <span className="font-medium text-sm">${platform.revenue.toFixed(2)}</span>
                      </li>
                    ))
                  }
                </ol>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Performance Summary</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Revenue</span>
                      <span className="font-medium">${platforms.reduce((sum, p) => sum + p.revenue, 0).toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-muted h-2 mt-1 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Products</span>
                      <span className="font-medium">{platforms.reduce((sum, p) => sum + p.products, 0)}</span>
                    </div>
                    <div className="w-full bg-muted h-2 mt-1 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conversion Rate</span>
                      <span className="font-medium">3.2%</span>
                    </div>
                    <div className="w-full bg-muted h-2 mt-1 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
            <div className="flex flex-col items-center text-center p-4">
              <ExternalLink className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-semibold">No Analytics Available</h3>
              <p className="text-muted-foreground text-xs max-w-xs mt-1">
                Connect at least one platform to view analytics data
              </p>
              <Button 
                variant="outline" 
                className="mt-3 text-xs"
                onClick={() => setSelectedTab("platforms")}
              >
                Go to Platforms
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsSection;
