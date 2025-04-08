
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import PlatformManager from "@/components/platform-manager/PlatformManager";

const MultiPlatformManager = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Multi-Platform Manager</h1>
            <p className="text-muted-foreground">
              Manage all your POD platforms, products, and listings in one place
            </p>
          </div>
          
          <PlatformManager />
        </div>
      </PageLayout>
    </Layout>
  );
};

export default MultiPlatformManager;
