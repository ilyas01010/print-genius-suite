
import React from "react";
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

const DesignUploader = () => {
  const { isAuthenticated } = useUser();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Creator</CardTitle>
        <CardDescription>
          Use our professional design editor to create, customize, and upload designs
        </CardDescription>
      </CardHeader>
      <CardContent>
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
