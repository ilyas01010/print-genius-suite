
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
import SecureFileUpload from "@/components/security/SecureFileUpload";
import { useDesigns } from "@/hooks/use-designs";
import { useToast } from "@/hooks/use-toast";
import { useStorageInit } from "@/hooks/use-storage-init";

const DesignUploader = () => {
  const { isAuthenticated, user } = useUser();
  const { uploadDesign } = useDesigns();
  const { toast } = useToast();
  const { isInitialized, isLoading: isStorageLoading, error: storageError } = useStorageInit();

  // Create an async function to handle file selection that returns a Promise
  const handleFileSelected = async (file: File, secureFileName: string): Promise<void> => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload designs",
        variant: "destructive",
      });
      return Promise.resolve();
    }
    
    if (!isInitialized) {
      toast({
        title: "Storage not ready",
        description: "Please wait while we initialize the storage",
        variant: "destructive",
      });
      return Promise.resolve();
    }
    
    try {
      // Upload the file to Supabase through our hooks
      const result = await uploadDesign(file, secureFileName);
      
      if (result) {
        toast({
          title: "Design uploaded",
          description: "Your design has been successfully uploaded and saved",
        });
      }
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Error uploading design:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload the design",
        variant: "destructive",
      });
      return Promise.resolve();
    }
  };

  if (storageError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Storage Error</CardTitle>
          <CardDescription>
            There was a problem initializing storage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{storageError.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (isStorageLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Initializing Storage</CardTitle>
          <CardDescription>
            Setting up design storage...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            allowedFileTypes={[".png", ".jpg", ".jpeg", ".svg"]}
            maxSizeMB={5}
            onFileSelected={handleFileSelected}
            label="Upload Design"
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
