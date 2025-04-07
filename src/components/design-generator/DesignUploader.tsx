
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
import TextToImage from "./TextToImage";
import DesignUploadTab from "./upload/DesignUploadTab";
import { Wand2, Upload } from "lucide-react";

const DesignUploader = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const { isAuthenticated } = useUser();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Creator</CardTitle>
        <CardDescription>
          Generate AI designs from text prompts or upload your own images
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="generate" className="flex items-center gap-1.5">
              <Wand2 className="h-3.5 w-3.5" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              Upload Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="mt-0">
            <TextToImage />
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
