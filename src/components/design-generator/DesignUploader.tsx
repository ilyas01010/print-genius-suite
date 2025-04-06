
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

const DesignUploader = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const { isAuthenticated } = useUser();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Generator</CardTitle>
        <CardDescription>
          Upload an image or create a design from text prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="generate">Text to Image</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <DesignUploadTab />
          </TabsContent>
          
          <TabsContent value="generate" className="mt-0">
            <TextToImage />
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
