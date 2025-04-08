
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { FileQuestion, MessageCircle, HelpCircle } from "lucide-react";
import FaqTab from "@/components/support/FaqTab";
import ContactTab from "@/components/support/ContactTab";
import ResourcesTab from "@/components/support/ResourcesTab";

const Support = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade-in">
          <Card className="p-4 md:p-6 bg-card/50 backdrop-blur border border-border/50">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl md:text-3xl">Support Center</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Get help and support for your Print Genius account
              </p>
            </div>
          </Card>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4" /> FAQs
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> Contact
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-4">
              <FaqTab />
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <ContactTab />
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4">
              <ResourcesTab />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Support;
