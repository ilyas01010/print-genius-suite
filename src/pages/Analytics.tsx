
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";

const Analytics = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6">
          <h1 className="font-bold text-3xl">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your product performance and customer insights
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Coming Soon</h2>
              <p>The analytics dashboard is currently in development.</p>
            </div>
          </div>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Analytics;
