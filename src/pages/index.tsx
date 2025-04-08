
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";

const Index = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Print Genius Suite</h1>
          <p className="text-muted-foreground">
            Welcome to your comprehensive Print on Demand business management platform.
          </p>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Index;
