
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesignUploadTab from "./upload/DesignUploadTab";
import PhotopeaEditor from "./editor/PhotopeaEditor";
import { Upload, PanelTop } from "lucide-react";

const DesignUploader = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const { isAuthenticated } = useUser();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Creator</CardTitle>
        <CardDescription>
          Use our professional design editor or upload your own images
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="editor" className="flex items-center gap-1.5">
              <PanelTop className="h-3.5 w-3.5" />
              Design Editor
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              Upload Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-0">
            <PhotopeaEditor />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <DesignUploadTab />
          </TabsContent>
        </Tabs>
      </CardContent>
      {!isAuthenticated && (
        <CardFooter className="bg-muted/50 px-6 py-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <span>Sign in to save and manage your designs</span>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default DesignUploader;
