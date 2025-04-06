
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import DesignUploader from "@/components/design-generator/DesignUploader";
import DesignGallery from "@/components/design-generator/DesignGallery";
import { useUser } from "@/context/UserContext";
import DesignTemplates from "@/components/design-generator/templates/DesignTemplates";
import CollaborationPanel from "@/components/design-generator/collaboration/CollaborationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DesignGenerator = () => {
  const { isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState<"create" | "collaborate">("create");
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Design Generator</h1>
          <p className="text-muted-foreground">
            Create and edit Print-on-Demand ready designs
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={(tab) => setActiveTab(tab as "create" | "collaborate")}
          className="w-full"
        >
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="create">Create & Edit</TabsTrigger>
              <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="create" className="mt-4">
            <div className="grid gap-6">
              <DesignUploader />
              
              {isAuthenticated && <DesignGallery />}
              
              <DesignTemplates />
            </div>
          </TabsContent>
          
          <TabsContent value="collaborate" className="mt-4">
            <div className="grid gap-6">
              <CollaborationPanel />
              
              {isAuthenticated && (
                <div className="grid md:grid-cols-2 gap-6">
                  <DesignGallery />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DesignGenerator;
