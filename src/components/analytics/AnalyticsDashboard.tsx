
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import { AreaChart, BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePlatformData } from "@/hooks/usePlatformData";
import { DateRange } from "react-day-picker";
import { CalendarIcon, TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChartContainer } from "@/components/ui/chart";

const AnalyticsDashboard = () => {
  const { platforms, products, calculateMetrics, filterData } = usePlatformData();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const { filteredPlatforms, filteredProducts } = filterData({
    startDate: dateRange?.from || null,
    endDate: dateRange?.to || null
  });
  
  const { totalProducts, totalRevenue, connectedPlatforms } = calculateMetrics(filteredPlatforms);

  // Generate revenue data by day for the past 30 days
  const revenueData = React.useMemo(() => {
    const days = [];
    const end = dateRange?.to || new Date();
    const start = dateRange?.from || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    const daysCount = Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    
    for (let i = 0; i <= daysCount; i++) {
      const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      days.push({
        date: format(date, 'MMM dd'),
        revenue: Math.floor(Math.random() * 500) + 100, // Simulated data
        orders: Math.floor(Math.random() * 15) + 1,     // Simulated data
      });
    }
    return days;
  }, [dateRange]);

  // Top products by revenue
  const topProducts = React.useMemo(() => {
    return products
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>
                {dateRange?.from ? format(dateRange.from, "LLL dd, y") : "Start date"}
                {" - "}
                {dateRange?.to ? format(dateRange.to, "LLL dd, y") : "End date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`}
          change={{ value: 8.2, trend: "up" }}
          icon={<DollarSign className="h-5 w-5" />} 
        />
        <StatCard 
          title="Active Products" 
          value={`${totalProducts}`}
          change={{ value: 10.4, trend: "up" }}
          icon={<ShoppingCart className="h-5 w-5" />} 
        />
        <StatCard 
          title="Connected Platforms" 
          value={`${connectedPlatforms}`}
          change={{ value: 0, trend: "neutral" }}
          icon={<TrendingUp className="h-5 w-5" />} 
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.6%"
          change={{ value: 1.2, trend: "up" }}
          icon={<Users className="h-5 w-5" />} 
        />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Daily revenue for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "#0ea5e9",
                },
                orders: {
                  label: "Orders",
                  color: "#f43f5e",
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue ($)"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.2}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    name="Orders"
                    stroke="#f43f5e"
                    fill="#f43f5e"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Revenue by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#8b5cf6",
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredPlatforms.filter(p => p.status === "connected")}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']} 
                    />
                    <Bar dataKey="revenue" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best-selling products by price</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  price: {
                    label: "Price",
                    color: "#10b981",
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={topProducts}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 50,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Price']}
                    />
                    <Bar dataKey="price" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
