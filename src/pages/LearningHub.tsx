
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const LearningHub = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Learning Hub</h1>
          <p className="text-muted-foreground">
            Resources and tutorials to help you grow your POD business
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>POD Business Academy</CardTitle>
            <CardDescription>
              Learn strategies and tips for print-on-demand success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                The Learning Hub is under development. It will include:
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Step-by-step tutorials for POD beginners</li>
                  <li>Advanced strategies for scaling your business</li>
                  <li>Design tips and trends for higher conversions</li>
                  <li>Marketing masterclasses for POD products</li>
                  <li>Expert interviews and case studies</li>
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

export default LearningHub;
