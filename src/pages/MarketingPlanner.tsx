
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const MarketingPlanner = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Marketing Planner</h1>
          <p className="text-muted-foreground">
            Create marketing campaigns and social media content for your POD products
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Marketing Campaigns</CardTitle>
            <CardDescription>
              Plan and schedule your marketing activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                The Marketing Planner module is under development. It will allow you to:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Create marketing campaigns for your POD products</li>
                  <li>Generate social media content ideas</li>
                  <li>Schedule posts across multiple platforms</li>
                  <li>Create product mockups for marketing materials</li>
                  <li>Track campaign performance and engagement</li>
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

export default MarketingPlanner;
