
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import DesignTemplates from "@/components/design-generator/templates/DesignTemplates";
import DesignUploader from "@/components/design-generator/DesignUploader";
import DesignGallery from "@/components/design-generator/DesignGallery";
import FabricEditor from "@/components/design-generator/editor/FabricEditor";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";

const DesignGenerator = () => {
  const { isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState("editor");
  
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Design Generator</h1>
            <p className="text-muted-foreground">
              Create professional designs for print on demand products
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="photopea">Photopea Integration</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="gallery">My Designs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-4">
              <FabricEditor />
            </TabsContent>
            
            <TabsContent value="photopea" className="space-y-4">
              <DesignUploader />
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-4">
              <DesignTemplates />
            </TabsContent>
            
            <TabsContent value="gallery" className="space-y-4">
              {isAuthenticated ? (
                <DesignGallery />
              ) : (
                <div className="flex flex-col items-center justify-center p-10 border rounded-lg border-dashed">
                  <p className="text-center text-muted-foreground">
                    Please sign in to view and manage your designs
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default DesignGenerator;
