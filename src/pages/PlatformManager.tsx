
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const PlatformManager = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Platform Manager</h1>
          <p className="text-muted-foreground">
            Manage your product listings across multiple print-on-demand platforms
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Platform Integration</CardTitle>
            <CardDescription>
              Connect and manage your POD platforms in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                The Platform Manager module is under development. It will allow you to:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Connect to multiple POD platforms (Etsy, Printify, Printful, etc.)</li>
                  <li>Manage your listings from a single dashboard</li>
                  <li>Synchronize inventory across platforms</li>
                  <li>Bulk update pricing and descriptions</li>
                  <li>Track product performance</li>
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

export default PlatformManager;
