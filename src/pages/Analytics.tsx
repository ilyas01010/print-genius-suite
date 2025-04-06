
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Download, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Sample sales data for charts
const monthlySalesData = [
  { name: 'Jan', sales: 1200 },
  { name: 'Feb', sales: 1900 },
  { name: 'Mar', sales: 1500 },
  { name: 'Apr', sales: 2400 },
  { name: 'May', sales: 2100 },
  { name: 'Jun', sales: 3200 },
  { name: 'Jul', sales: 2800 },
  { name: 'Aug', sales: 3600 },
  { name: 'Sep', sales: 3100 },
  { name: 'Oct', sales: 4100 },
  { name: 'Nov', sales: 3800 },
  { name: 'Dec', sales: 5200 },
];

const dailyVisitorsData = [
  { name: '11/01', visitors: 240 },
  { name: '11/02', visitors: 320 },
  { name: '11/03', visitors: 280 },
  { name: '11/04', visitors: 390 },
  { name: '11/05', visitors: 430 },
  { name: '11/06', visitors: 380 },
  { name: '11/07', visitors: 460 },
  { name: '11/08', visitors: 520 },
  { name: '11/09', visitors: 490 },
  { name: '11/10', visitors: 570 },
  { name: '11/11', visitors: 610 },
  { name: '11/12', visitors: 580 },
  { name: '11/13', visitors: 650 },
  { name: '11/14', visitors: 700 },
];

const platformData = [
  { name: 'Etsy', value: 42 },
  { name: 'Shopify', value: 28 },
  { name: 'Printify', value: 18 },
  { name: 'Amazon', value: 12 },
];

const productCategoryData = [
  { name: 'T-shirts', value: 35 },
  { name: 'Mugs', value: 25 },
  { name: 'Posters', value: 20 },
  { name: 'Hoodies', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Top products data
const topProducts = [
  {
    id: 1,
    name: "Vintage Camping T-Shirt",
    sales: 142,
    revenue: "$2,840.00",
    trend: "up",
    percent: 12
  },
  {
    id: 2,
    name: "Coffee Lover Mug",
    sales: 98,
    revenue: "$1,176.00",
    trend: "up",
    percent: 8
  },
  {
    id: 3,
    name: "Mountain Adventure Hoodie",
    sales: 76,
    revenue: "$2,280.00",
    trend: "down",
    percent: 3
  },
  {
    id: 4,
    name: "Minimalist Art Poster",
    sales: 68,
    revenue: "$816.00",
    trend: "up",
    percent: 5
  }
];

const Analytics = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState("30d");
  
  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your analytics report is being prepared for download"
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your report has been downloaded successfully"
      });
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance metrics and sales across all your POD platforms
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Tabs defaultValue="30d" onValueChange={setDateRange} value={dateRange}>
            <TabsList>
              <TabsTrigger value="7d">7 days</TabsTrigger>
              <TabsTrigger value="30d">30 days</TabsTrigger>
              <TabsTrigger value="90d">90 days</TabsTrigger>
              <TabsTrigger value="1y">1 year</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,458</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" /> 
                <span>+12% from last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">834</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" /> 
                <span>+8% from last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="flex items-center text-sm text-green-500 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" /> 
                <span>+0.5% from last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28.50</div>
              <div className="flex items-center text-sm text-red-500 mt-1">
                <TrendingDown className="h-4 w-4 mr-1" /> 
                <span>-2% from last {dateRange}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Sales</CardTitle>
                <Badge variant="outline">2025</Badge>
              </div>
              <CardDescription>Monthly revenue in USD</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Daily Visitors</CardTitle>
              <CardDescription>Last 14 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyVisitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Platform</CardTitle>
              <CardDescription>Distribution of sales across platforms</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Sales breakdown by product type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Products with highest sales and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 pr-4 font-medium">Product Name</th>
                    <th className="pb-3 px-4 font-medium">Total Sales</th>
                    <th className="pb-3 px-4 font-medium">Revenue</th>
                    <th className="pb-3 pl-4 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(product => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 pr-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4">{product.sales}</td>
                      <td className="py-3 px-4">{product.revenue}</td>
                      <td className="py-3 pl-4">
                        <div className="flex items-center">
                          {product.trend === "up" ? (
                            <div className="flex items-center text-green-500">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span>+{product.percent}%</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <TrendingDown className="h-4 w-4 mr-1" />
                              <span>-{product.percent}%</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
