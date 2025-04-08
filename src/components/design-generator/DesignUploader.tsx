
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
import { SecureFileUpload } from "@/components/security/SecureFileUpload";

const DesignUploader = () => {
  const { isAuthenticated } = useUser();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design File Uploader</CardTitle>
        <CardDescription>
          Upload your design files to customize and manage them
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center">
          <p className="text-center text-muted-foreground mb-4">
            Drag and drop your design files here or click to browse
          </p>
          <SecureFileUpload 
            accept=".png,.jpg,.jpeg,.svg"
            maxFileSize={5}
            onFileSelected={(file) => console.log("File selected:", file)}
            buttonText="Upload Design"
          />
        </div>
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
