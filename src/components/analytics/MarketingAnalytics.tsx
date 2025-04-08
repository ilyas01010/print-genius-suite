
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Marketing analytics data (simulated)
const marketingData = [
  { month: 'Jan', visitors: 1200, conversions: 85, ctr: 2.1 },
  { month: 'Feb', visitors: 1400, conversions: 102, ctr: 2.3 },
  { month: 'Mar', visitors: 1800, conversions: 128, ctr: 2.5 },
  { month: 'Apr', visitors: 1600, conversions: 115, ctr: 2.4 },
  { month: 'May', visitors: 2100, conversions: 156, ctr: 2.9 },
  { month: 'Jun', visitors: 2400, conversions: 184, ctr: 3.2 },
  { month: 'Jul', visitors: 2200, conversions: 175, ctr: 3.1 },
];

const channelData = [
  { name: 'Organic Search', value: 42 },
  { name: 'Direct', value: 28 },
  { name: 'Social Media', value: 18 },
  { name: 'Email', value: 8 },
  { name: 'Referral', value: 4 },
];

const campaignData = [
  { name: 'Summer Sale', conversions: 248, roi: 4.5 },
  { name: 'Back to School', conversions: 187, roi: 3.8 },
  { name: 'Holiday Special', conversions: 352, roi: 5.2 },
  { name: 'Product Launch', conversions: 296, roi: 4.9 },
  { name: 'Flash Sale', conversions: 165, roi: 3.2 },
];

const MarketingAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Traffic Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Website visitors and conversions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                visitors: {
                  label: "Visitors",
                  color: "#3b82f6",
                },
                conversions: {
                  label: "Conversions",
                  color: "#10b981",
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={marketingData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversions"
                    name="Conversions"
                    stroke="#10b981"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two-column charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                    color: "#8b5cf6",
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelData}
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
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>ROI and conversions by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  conversions: {
                    label: "Conversions",
                    color: "#f43f5e",
                  },
                  roi: {
                    label: "ROI (x)",
                    color: "#eab308",
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="conversions" fill="#f43f5e" name="Conversions" />
                    <Bar yAxisId="right" dataKey="roi" fill="#eab308" name="ROI (x)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTR Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Click-Through Rate Trend</CardTitle>
          <CardDescription>CTR percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ChartContainer
              config={{
                ctr: {
                  label: "CTR",
                  color: "#0d9488",
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={marketingData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'CTR']} />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    name="CTR %"
                    stroke="#0d9488"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingAnalytics;
