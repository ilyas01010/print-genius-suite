
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Campaign data
const campaignData = [
  { name: 'Summer Sale', conversions: 248, roi: 4.5 },
  { name: 'Back to School', conversions: 187, roi: 3.8 },
  { name: 'Holiday Special', conversions: 352, roi: 5.2 },
  { name: 'Product Launch', conversions: 296, roi: 4.9 },
  { name: 'Flash Sale', conversions: 165, roi: 3.2 },
];

const CampaignPerformance = () => {
  return (
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
  );
};

export default CampaignPerformance;
