
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMarketingPlanner } from "@/hooks/use-marketing-planner";
import CalendarTab from "@/components/marketing/CalendarTab";
import TemplatesTab from "@/components/marketing/TemplatesTab";
import AnalyticsTab from "@/components/marketing/AnalyticsTab";

const MarketingPlanner = () => {
  const { activeTab, setActiveTab } = useMarketingPlanner();

  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Marketing Planner</h1>
            <p className="text-muted-foreground">
              Plan and schedule your social media campaigns across multiple platforms
            </p>
          </div>

          <Tabs defaultValue="calendar" className="space-y-4">
            <TabsList>
              <TabsTrigger value="calendar" onClick={() => setActiveTab("calendar")}>Calendar</TabsTrigger>
              <TabsTrigger value="templates" onClick={() => setActiveTab("templates")}>Templates</TabsTrigger>
              <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4">
              <CalendarTab />
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <TemplatesTab />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default MarketingPlanner;
