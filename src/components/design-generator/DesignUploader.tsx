
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
import PhotopeaEditor from "./editor/PhotopeaEditor";
import { PanelTop } from "lucide-react";

const DesignUploader = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const { isAuthenticated } = useUser();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Creator</CardTitle>
        <CardDescription>
          Use our professional design editor to create and customize designs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-1.5 mb-4">
          <PanelTop className="h-3.5 w-3.5" />
          <span className="font-medium">Design Editor</span>
        </div>
        
        <PhotopeaEditor />
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
