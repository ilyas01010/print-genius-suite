
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactTab from "@/components/support/ContactTab";
import FaqTab from "@/components/support/FaqTab";
import ResourcesTab from "@/components/support/ResourcesTab";

const Support = () => {
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Support Center</h1>
            <p className="text-muted-foreground">
              Get help with Print Genius Suite and find answers to your questions
            </p>
          </div>
          
          <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-4">
              <FaqTab />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <ResourcesTab />
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <ContactTab />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Support;
