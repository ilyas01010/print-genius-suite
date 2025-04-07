
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "@/lib/image-utils";
import { 
  exportDocumentAsPNG,
  getDocumentName
} from "../photopea/photopea-utils";

interface UsePhotopeaSaveProps {
  isAuthenticated: boolean;
  setIsLoading: (isLoading: boolean) => void;
  uploadDesign: (file: File, name: string, category?: string, description?: string) => Promise<any>;
  toast: ReturnType<typeof useToast>["toast"];
}

export const usePhotopeaSave = ({ 
  isAuthenticated, 
  setIsLoading, 
  uploadDesign, 
  toast 
}: UsePhotopeaSaveProps) => {
  
  // Handle saving the design
  const handleSaveDesign = useCallback(async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save designs",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Get iframe reference
      const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
      if (!iframe || !iframe.contentWindow) {
        throw new Error('Cannot access Photopea editor');
      }
      
      // Use Photopea API to export current design
      exportDocumentAsPNG(iframe, "imageExported");
      
      // Listen for the response from Photopea
      window.addEventListener("message", async function onMessage(e) {
        if (typeof e.data !== "string") return;
        
        try {
          const data = JSON.parse(e.data);
          
          if (data.name === "imageExported" && data.body) {
            // Convert base64 to blob
            const base64Data = data.body;
            const byteString = atob(base64Data);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            
            const blob = new Blob([ab], { type: 'image/png' });
            
            // Get document name for better file naming
            getDocumentName(iframe, "getDocName");
            
            // Get document name and finish saving
            window.addEventListener("message", async function onNameMessage(nameEvent) {
              if (typeof nameEvent.data !== "string") return;
              
              try {
                const nameData = JSON.parse(nameEvent.data);
                
                if (nameData.name === "getDocName") {
                  const docName = nameData.body || `Design-${Date.now()}`;
                  const fileName = `${docName.replace(/\.[^/.]+$/, "")}.png`;
                  
                  // Convert Blob to File object before passing to uploadDesign
                  const file = new File([blob], fileName, { 
                    type: 'image/png', 
                    lastModified: Date.now() 
                  });
                  
                  // Compress the file and upload it
                  const compressedBlob = await compressImage(file, 1200, 0.85);
                  
                  // Convert compressed blob back to a File for upload
                  const compressedFile = new File([compressedBlob], fileName, {
                    type: 'image/png',
                    lastModified: Date.now()
                  });
                  
                  await uploadDesign(
                    compressedFile,
                    docName,
                    "photopea",
                    "Created with Photopea editor"
                  );
                  
                  toast({
                    title: "Design saved",
                    description: "Your design has been saved to your account"
                  });
                  
                  window.removeEventListener("message", onNameMessage);
                  setIsLoading(false);
                }
              } catch (err) {
                console.error("Error processing name from Photopea:", err);
                setIsLoading(false);
              }
            });
            
            // Remove the export message listener
            window.removeEventListener("message", onMessage);
          }
        } catch (error) {
          console.error("Error processing message from Photopea:", error);
          setIsLoading(false);
        }
      });
      
    } catch (error: any) {
      console.error("Error saving design:", error);
      toast({
        title: "Save failed",
        description: error.message || "Could not save the design. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [isAuthenticated, toast, uploadDesign, setIsLoading]);

  return { handleSaveDesign };
};
