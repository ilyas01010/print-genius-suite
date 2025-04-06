
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance metrics and sales across all your POD platforms
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Monitor your POD business performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                The Analytics Dashboard is under development. It will allow you to:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>View consolidated sales data across all platforms</li>
                  <li>Track revenue, profit margins, and trends over time</li>
                  <li>Analyze product performance and identify best sellers</li>
                  <li>Monitor customer demographics and purchasing patterns</li>
                  <li>Generate detailed reports for business planning</li>
                </ul>
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" disabled>Join Waiting List</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;
