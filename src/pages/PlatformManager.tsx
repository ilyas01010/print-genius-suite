
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Store, Plus, ExternalLink, Settings, BarChart3, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample platform data
const platformsData = [
  { 
    id: 1, 
    name: "Etsy", 
    status: "Connected", 
    listings: 32, 
    views: 1243, 
    sales: 18,
    revenue: "$432.65" 
  },
  { 
    id: 2, 
    name: "Printify", 
    status: "Connected", 
    listings: 28, 
    views: 876, 
    sales: 12,
    revenue: "$318.20" 
  },
  { 
    id: 3, 
    name: "Shopify", 
    status: "Not Connected", 
    listings: 0, 
    views: 0, 
    sales: 0,
    revenue: "$0.00" 
  },
  { 
    id: 4, 
    name: "Amazon Merch", 
    status: "Not Connected", 
    listings: 0, 
    views: 0, 
    sales: 0,
    revenue: "$0.00" 
  },
  { 
    id: 5, 
    name: "Redbubble", 
    status: "Not Connected", 
    listings: 0, 
    views: 0, 
    sales: 0,
    revenue: "$0.00" 
  }
];

// Sample recent activity data
const recentActivities = [
  { id: 1, platform: "Etsy", action: "New order received", time: "2 hours ago", status: "success" },
  { id: 2, platform: "Printify", action: "Product published", time: "5 hours ago", status: "success" },
  { id: 3, platform: "Etsy", action: "Listing updated", time: "Yesterday", status: "success" },
  { id: 4, platform: "Printify", action: "Production delayed", time: "2 days ago", status: "warning" }
];

const PlatformManager = () => {
  const { toast } = useToast();
  const [platformUrl, setPlatformUrl] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [platforms, setPlatforms] = useState(platformsData);
  const [activities, setActivities] = useState(recentActivities);
  
  const handleConnect = () => {
    if (!platformUrl) {
      toast({
        title: "Error",
        description: "Please enter a platform URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      toast({
        title: "Connection Initiated",
        description: "Please complete the authentication in the popup window"
      });
      
      setTimeout(() => {
        setIsConnecting(false);
        toast({
          title: "Connection Successful",
          description: "Platform has been connected to your account"
        });
      }, 2000);
    }, 1500);
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Syncing latest data from connected platforms"
    });
    
    // Simulate refresh
    setTimeout(() => {
      toast({
        title: "Data Synced",
        description: "Platform data has been updated successfully"
      });
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Platform Manager</h1>
          <p className="text-muted-foreground">
            Manage your product listings across multiple print-on-demand platforms
          </p>
        </div>

        <Tabs defaultValue="platforms">
          <TabsList>
            <TabsTrigger value="platforms">Connected Platforms</TabsTrigger>
            <TabsTrigger value="listings">Product Listings</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platforms" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Connect New Platform</CardTitle>
                <CardDescription>Add a POD platform to manage from this dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter platform URL or API key" 
                    value={platformUrl} 
                    onChange={(e) => setPlatformUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleConnect} disabled={isConnecting}>
                    {isConnecting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Connecting
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Platforms</h2>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Sync Data
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map(platform => (
                <Card key={platform.id} className={platform.status === "Not Connected" ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <Badge variant={platform.status === "Connected" ? "default" : "outline"}>
                        {platform.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {platform.status === "Connected" ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Listings</p>
                            <p className="font-medium">{platform.listings}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Views</p>
                            <p className="font-medium">{platform.views}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sales</p>
                            <p className="font-medium">{platform.sales}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-medium">{platform.revenue}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Connect this platform to manage your listings</p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 border-t">
                    <Button variant="ghost" size="sm" disabled={platform.status !== "Connected"}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="listings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Listings</CardTitle>
                <CardDescription>Manage your products across all connected platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="flex items-center justify-center p-8 text-center">
                      <div className="space-y-3">
                        <Store className="mx-auto h-12 w-12 text-muted-foreground/60" />
                        <h3 className="text-lg font-medium">Bulk Management Coming Soon</h3>
                        <p className="text-sm text-muted-foreground">
                          The ability to manage all your listings in one place is coming soon. 
                          For now, you can view your connected platforms and their statistics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your connected platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline">{activity.platform}</Badge>
                        <div>
                          <p>{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant={activity.status === "success" ? "default" : "secondary"}>
                        {activity.status === "success" ? "Success" : "Warning"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline">View All Activity</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlatformManager;
