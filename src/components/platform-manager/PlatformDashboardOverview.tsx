
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ChevronRight, LayoutDashboard, CircleDollarSign, Database, TrendingUp, TrendingDown } from "lucide-react";
import { Platform, PlatformSummary } from "./types";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/platform-manager/StatCard";

interface PlatformDashboardOverviewProps {
  platforms: Platform[];
  onViewAllPlatforms: () => void;
  onViewAllProducts: () => void;
}

const PlatformDashboardOverview: React.FC<PlatformDashboardOverviewProps> = ({ 
  platforms,
  onViewAllPlatforms,
  onViewAllProducts
}) => {
  // Calculate summary metrics
  const connectedPlatforms = platforms.filter(p => p.status === "connected");
  const summary: PlatformSummary = {
    totalRevenue: connectedPlatforms.reduce((sum, p) => sum + p.revenue, 0),
    totalProducts: connectedPlatforms.reduce((sum, p) => sum + p.products, 0),
    connectedCount: connectedPlatforms.length,
    topPlatform: connectedPlatforms.sort((a, b) => b.revenue - a.revenue)[0]
  };

  // Prepare chart data
  const revenueData = connectedPlatforms.map(p => ({
    name: p.name,
    revenue: p.revenue,
    products: p.products,
    fill: '#1E88E5'
  }));

  // Prepare pie chart data
  const pieData = connectedPlatforms.map(p => ({
    name: p.name,
    value: p.revenue
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB', '#FF6384'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Platform Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your platform performance and metrics
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onViewAllPlatforms} className="hidden sm:inline-flex">
            View All Platforms
          </Button>
          <Button onClick={onViewAllProducts}>
            View All Products
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Connected Platforms"
          value={summary.connectedCount}
          description={
            summary.connectedCount === 0 ? "No platforms connected" :
            summary.connectedCount === 1 ? "1 platform connected" :
            `${summary.connectedCount} platforms connected`
          }
          trend={summary.connectedCount > 0 ? { value: 100, direction: "up" } : undefined}
        />
        <StatCard
          title="Total Products"
          value={summary.totalProducts}
          description="Across all platforms"
          trend={summary.totalProducts > 0 ? { value: 12, direction: "up" } : undefined}
        />
        <StatCard
          title="Total Revenue"
          value={summary.totalRevenue.toFixed(2)}
          prefix="$"
          description="Last 30 days"
          trend={summary.totalRevenue > 0 ? { value: 8.5, direction: "up" } : undefined}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          description="from last month"
          trend={{ value: 0.5, direction: "up" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Revenue by Platform</CardTitle>
            <CardDescription>Distribution of revenue across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            {connectedPlatforms.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                    labelFormatter={(label) => `Platform: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-muted/30">
                <TrendingDown className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No revenue data available</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={onViewAllPlatforms}
                >
                  Connect Platforms
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Product Distribution</CardTitle>
            <CardDescription>Products across platforms</CardDescription>
          </CardHeader>
          <CardContent>
            {connectedPlatforms.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h4 className="font-medium mb-2">Platform Breakdown</h4>
                  <div className="space-y-2">
                    {connectedPlatforms.map((platform, index) => (
                      <div key={platform.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" 
                               style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="text-sm">{platform.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {platform.products} products
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-muted/30">
                <Database className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No product data available</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={onViewAllPlatforms}
                >
                  Connect Platforms
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Platform Card */}
      {summary.topPlatform && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top Performing Platform</CardTitle>
            <CardDescription>Your most profitable platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 overflow-hidden mr-3">
                  <img 
                    src={summary.topPlatform.logo} 
                    alt={`${summary.topPlatform.name} logo`} 
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{summary.topPlatform.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{summary.topPlatform.products} Products</Badge>
                    <Badge variant="secondary">${summary.topPlatform.revenue.toFixed(2)} Revenue</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="flex items-center">
                View Details <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Performance Summary</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Revenue Share</span>
                    <span className="font-medium">
                      {summary.totalRevenue > 0 
                        ? `${((summary.topPlatform.revenue / summary.totalRevenue) * 100).toFixed(1)}%` 
                        : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-muted h-2 mt-1 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: summary.totalRevenue > 0 
                          ? `${(summary.topPlatform.revenue / summary.totalRevenue) * 100}%`
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Product Share</span>
                    <span className="font-medium">
                      {summary.totalProducts > 0 
                        ? `${((summary.topPlatform.products / summary.totalProducts) * 100).toFixed(1)}%`
                        : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-muted h-2 mt-1 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: summary.totalProducts > 0 
                          ? `${(summary.topPlatform.products / summary.totalProducts) * 100}%`
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlatformDashboardOverview;
