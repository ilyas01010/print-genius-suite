
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import PlatformAnalytics from "@/components/analytics/PlatformAnalytics";
import MarketingAnalytics from "@/components/analytics/MarketingAnalytics";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="platforms">Platform Analytics</TabsTrigger>
              <TabsTrigger value="marketing">Marketing Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <AnalyticsDashboard />
            </TabsContent>
            
            <TabsContent value="platforms" className="mt-0">
              <PlatformAnalytics />
            </TabsContent>
            
            <TabsContent value="marketing" className="mt-0">
              <MarketingAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Analytics;
