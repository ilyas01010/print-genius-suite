
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Traffic source data
const channelData = [
  { name: 'Organic Search', value: 42 },
  { name: 'Direct', value: 28 },
  { name: 'Social Media', value: 18 },
  { name: 'Email', value: 8 },
  { name: 'Referral', value: 4 },
];

const TrafficSources = () => {
  return (
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
  );
};

export default TrafficSources;
