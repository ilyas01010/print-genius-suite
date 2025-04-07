
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, Bar, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock data for charts
const mockUserData = [
  { name: "Jan", users: 120, active: 90 },
  { name: "Feb", users: 145, active: 105 },
  { name: "Mar", users: 175, active: 130 },
  { name: "Apr", users: 210, active: 155 },
  { name: "May", users: 250, active: 190 },
  { name: "Jun", users: 290, active: 210 },
  { name: "Jul", users: 340, active: 240 },
];

const mockContentData = [
  { name: "Jan", designs: 80, templates: 40, mockups: 30 },
  { name: "Feb", designs: 100, templates: 60, mockups: 45 },
  { name: "Mar", designs: 120, templates: 75, mockups: 55 },
  { name: "Apr", designs: 150, templates: 90, mockups: 65 },
  { name: "May", designs: 190, templates: 110, mockups: 80 },
  { name: "Jun", designs: 230, templates: 140, mockups: 100 },
  { name: "Jul", designs: 280, templates: 175, mockups: 125 },
];

const mockPerformanceData = [
  { name: "Mon", responseTime: 120, errorRate: 1.2 },
  { name: "Tue", responseTime: 115, errorRate: 1.0 },
  { name: "Wed", responseTime: 130, errorRate: 1.5 },
  { name: "Thu", responseTime: 110, errorRate: 0.9 },
  { name: "Fri", responseTime: 125, errorRate: 1.1 },
  { name: "Sat", responseTime: 90, errorRate: 0.7 },
  { name: "Sun", responseTime: 85, errorRate: 0.5 },
];

const mockPlatformData = [
  { name: "Printful", value: 40 },
  { name: "Etsy", value: 30 },
  { name: "Shopify", value: 20 },
  { name: "Other", value: 10 },
];

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="30d" className="w-[200px]">
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>
                  {dateRange.from ? format(dateRange.from, "LLL dd, y") : "Date from"}
                </span>
                <span className="mx-2">-</span>
                <span>
                  {dateRange.to ? format(dateRange.to, "LLL dd, y") : "Date to"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(value) => setDateRange(value || { from: new Date(), to: undefined })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl">1,248</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-green-600">↑ 12%</span>
              <span>vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Designs</CardDescription>
            <CardTitle className="text-2xl">5,347</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-green-600">↑ 8%</span>
              <span>vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Platform Revenue</CardDescription>
            <CardTitle className="text-2xl">$12,450</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-green-600">↑ 16%</span>
              <span>vs. previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>System Health</CardDescription>
            <CardTitle className="text-2xl">99.98%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-green-600">↑ 0.1%</span>
              <span>vs. previous period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly new and active users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockUserData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Total Users"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorActive)"
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Creation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Content Creation</CardTitle>
          <CardDescription>Monthly content creation by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockContentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="designs" fill="#8884d8" name="Designs" />
                <Bar dataKey="templates" fill="#82ca9d" name="Templates" />
                <Bar dataKey="mockups" fill="#ffc658" name="Mockups" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Response time and error rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockPerformanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#ffc658"
                    fillOpacity={1}
                    fill="url(#colorResponse)"
                    name="Response Time (ms)"
                  />
                  <Area
                    type="monotone"
                    dataKey="errorRate"
                    stroke="#ff5252"
                    fill="#ff5252"
                    name="Error Rate (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>User distribution across connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockPlatformData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="User Percentage (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
