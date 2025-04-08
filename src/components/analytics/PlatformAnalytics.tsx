
import React from "react";
import { usePlatformData } from "@/hooks/usePlatformData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PlatformAnalytics = () => {
  const { platforms } = usePlatformData();
  const connectedPlatforms = platforms.filter(p => p.status === "connected");
  
  // Platform data for pie chart
  const platformData = React.useMemo(() => 
    connectedPlatforms.map(p => ({
      name: p.name,
      value: p.revenue
    })),
    [connectedPlatforms]
  );

  // Calculate total revenue
  const totalRevenue = connectedPlatforms.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Platforms Performance</CardTitle>
            <CardDescription>Revenue distribution across connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#0088FE",
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {platformData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{entry.name}: ${entry.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
            <CardDescription>Percentage of total revenue by platform</CardDescription>
          </CardHeader>
          <CardContent>
            {connectedPlatforms.map(platform => {
              const percentage = totalRevenue ? (platform.revenue / totalRevenue) * 100 : 0;
              
              return (
                <div key={platform.id} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {platform.logo && (
                        <div className="h-5 w-5 mr-2 overflow-hidden">
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`} 
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <span className="font-medium text-sm">{platform.name}</span>
                    </div>
                    <span className="text-sm">{percentage.toFixed(1)}%</span>
                  </div>
                  
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Products Distribution</CardTitle>
            <CardDescription>Products count by platform</CardDescription>
          </CardHeader>
          <CardContent>
            {connectedPlatforms.map(platform => {
              const totalProducts = connectedPlatforms.reduce((sum, p) => sum + p.products, 0);
              const percentage = totalProducts ? (platform.products / totalProducts) * 100 : 0;
              
              return (
                <div key={platform.id} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      {platform.logo && (
                        <div className="h-5 w-5 mr-2 overflow-hidden">
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`} 
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <span className="font-medium text-sm">{platform.name}</span>
                    </div>
                    <span className="text-sm">{platform.products} ({percentage.toFixed(1)}%)</span>
                  </div>
                  
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Platforms Details</CardTitle>
          <CardDescription>Detailed view of all your platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="hidden sm:table-cell">Last Synced</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map(platform => (
                <TableRow key={platform.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {platform.logo && (
                        <div className="h-6 w-6 overflow-hidden">
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`} 
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      {platform.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        platform.status === "connected" ? "success" : 
                        platform.status === "error" ? "destructive" : 
                        "secondary"
                      }
                      className="text-xs"
                    >
                      {platform.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{platform.products}</TableCell>
                  <TableCell className="text-right">${platform.revenue.toFixed(2)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {platform.lastSync ? new Date(platform.lastSync).toLocaleDateString() : "Never"}
                  </TableCell>
                </TableRow>
              ))}
              {platforms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No platforms found. Add a platform to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformAnalytics;
