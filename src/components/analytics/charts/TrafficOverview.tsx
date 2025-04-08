
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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

const TrafficOverview = () => {
  return (
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
  );
};

export default TrafficOverview;
