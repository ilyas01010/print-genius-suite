
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronRight, ExternalLink, Plus, Store } from "lucide-react";

// Platform integration types
type Platform = {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "disconnected";
  products: number;
  revenue: number;
};

const PlatformManager = () => {
  const [platforms] = useState<Platform[]>([
    {
      id: "etsy",
      name: "Etsy",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Etsy_logo.svg",
      status: "connected",
      products: 24,
      revenue: 1250.75
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      status: "disconnected",
      products: 0,
      revenue: 0
    },
    {
      id: "shopify",
      name: "Shopify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      status: "disconnected",
      products: 0,
      revenue: 0
    }
  ]);

  // Calculate totals
  const totalProducts = platforms.reduce((sum, platform) => sum + platform.products, 0);
  const totalRevenue = platforms.reduce((sum, platform) => sum + platform.revenue, 0);
  const connectedPlatforms = platforms.filter(p => p.status === "connected").length;

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-bold text-3xl">Platform Manager</h1>
            <p className="text-muted-foreground">
              Connect and manage your POD platforms in one place
            </p>
          </div>
          <Button className="hidden sm:flex">
            <Plus className="mr-2 h-4 w-4" /> Add Platform
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connectedPlatforms}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {connectedPlatforms === 0 ? "No platforms connected" : 
                 connectedPlatforms === 1 ? "1 platform connected" : 
                 `${connectedPlatforms} platforms connected`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all platforms
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500">↑ 0.5%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="platforms" className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platforms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <Card key={platform.id} className={platform.status === "connected" ? "border-primary/20" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 overflow-hidden">
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`} 
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <CardTitle>{platform.name}</CardTitle>
                      </div>
                      <Badge variant={platform.status === "connected" ? "default" : "outline"}>
                        {platform.status === "connected" ? (
                          <span className="flex items-center">
                            <Check className="mr-1 h-3 w-3" /> Connected
                          </span>
                        ) : "Not Connected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {platform.status === "connected" ? (
                    <>
                      <CardContent className="pb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Products:</span>
                          <span className="font-medium">{platform.products}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">${platform.revenue.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" className="w-full flex justify-between">
                          View Details <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardFooter className="pt-0">
                      <Button className="w-full">Connect</Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
              
              {/* Add Platform Card */}
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-[180px]">
                  <Button variant="outline" size="lg" className="h-12 w-12 rounded-full mb-2">
                    <Plus className="h-6 w-6" />
                  </Button>
                  <p className="font-medium">Connect New Platform</p>
                  <p className="text-sm text-muted-foreground">Integrate with more POD services</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your product listings across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
                  <div className="flex flex-col items-center text-center p-4">
                    <Store className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-semibold">No Products Yet</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mt-1">
                      Connect a platform to start managing your products or add new products manually
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Track performance across all connected platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
                  <div className="flex flex-col items-center text-center p-4">
                    <ExternalLink className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="font-semibold">Analytics Coming Soon</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mt-1">
                      Advanced analytics will be available in the next update
                    </p>
                    <Button variant="outline" className="mt-4">
                      Check Analytics Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlatformManager;
