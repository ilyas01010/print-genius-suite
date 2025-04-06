
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const CustomerService = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Customer Service</h1>
          <p className="text-muted-foreground">
            Manage customer inquiries and support across all your POD platforms
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Support Dashboard</CardTitle>
            <CardDescription>
              Centralize customer communications in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                The Customer Service module is under development. It will allow you to:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Manage customer inquiries from multiple platforms in one place</li>
                  <li>Set up automated responses for common questions</li>
                  <li>Track support tickets and resolution times</li>
                  <li>Access customer order history for context-aware support</li>
                  <li>Generate custom email templates for different scenarios</li>
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

export default CustomerService;
