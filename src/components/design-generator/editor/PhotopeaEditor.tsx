
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import { compressImage } from "@/lib/image-utils";
import PhotopeaToolbar from "./photopea/PhotopeaToolbar";
import PhotopeaFrame from "./photopea/PhotopeaFrame";
import PhotopeaHelp from "./photopea/PhotopeaHelp";
import PhotopeaTemplates from "./photopea/PhotopeaTemplates";
import { 
  createNewDocument,
  downloadCurrentDocument, 
  exportDocumentAsPNG, 
  getDocumentName, 
  openImageFromURL 
} from "./photopea/photopea-utils";

const PhotopeaEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();
  
  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle editor ready state
  const handleEditorReady = () => {
    setEditorReady(true);
  };
  
  // Create new document with specific dimensions
  const handleCreateDocument = (width: number, height: number, dpi: number) => {
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) return;
    
    createNewDocument(iframe, width, height, dpi);
    
    toast({
      title: "New document created",
      description: `Created a ${width}x${height}px canvas at ${dpi} DPI`
    });
  };

  // Handle opening image from URL
  const handleOpenImageFromURL = () => {
    const imageUrl = prompt("Enter the URL of the image:");
    if (!imageUrl) return;
    
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) return;
    
    openImageFromURL(iframe, imageUrl);
  };

  // Handle downloading the design
  const handleDownload = () => {
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe) {
      toast({
        title: "Editor Error",
        description: "Cannot access the design editor",
        variant: "destructive",
      });
      return;
    }
    
    downloadCurrentDocument(iframe);
    
    toast({
      title: "Download started",
      description: "Your design is being downloaded",
    });
  };

  // Handle saving the design
  const handleSaveDesign = async () => {
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
                  
                  // Compress the file and upload it - using File object for both
                  const compressedBlob = await compressImage(file, 1200, 0.85);
                  
                  // Convert compressed blob back to a File for upload
                  const compressedFile = new File([compressedBlob], fileName, {
                    type: 'image/png',
                    lastModified: Date.now()
                  });
                  
                  await uploadDesign(
                    compressedFile,
                    docName,
                    "custom",
                    "Created with Photopea editor"
                  );
                  
                  toast({
                    title: "Design saved",
                    description: "Your design has been saved to your account"
                  });
                  
                  window.removeEventListener("message", onNameMessage);
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
  };

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <CardContent className={`p-4 space-y-4 ${isFullscreen ? 'h-screen flex flex-col' : ''}`}>
        {/* Editor Toolbar */}
        <PhotopeaToolbar
          isFullscreen={isFullscreen}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
          onToggleFullscreen={toggleFullscreen}
          onDownload={handleDownload}
          onSave={handleSaveDesign}
          onOpenHelp={() => setShowHelp(true)}
          onOpenTemplates={() => setShowTemplates(true)}
          onOpenImageFromURL={handleOpenImageFromURL}
        />

        {/* Photopea Editor Frame */}
        <PhotopeaFrame 
          isFullscreen={isFullscreen}
          onEditorReady={handleEditorReady}
        />
        
        {/* Help Dialog */}
        <PhotopeaHelp
          open={showHelp}
          onOpenChange={setShowHelp}
        />
        
        {/* Templates Dialog */}
        <PhotopeaTemplates
          open={showTemplates}
          onOpenChange={setShowTemplates}
          onSelectTemplate={handleCreateDocument}
        />
      </CardContent>
    </Card>
  );
};

export default PhotopeaEditor;
