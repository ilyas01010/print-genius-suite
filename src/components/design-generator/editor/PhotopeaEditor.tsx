
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import { 
  Save,
  Download,
  HelpCircle,
  Maximize2,
  Minimize2 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PHOTOPEA_URL = "https://www.photopea.com";

const PhotopeaEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();
  
  // Function to handle saving the design
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
      // Source: https://www.photopea.com/api/
      iframe.contentWindow.postMessage(
        JSON.stringify({
          method: "runScript",
          script: "app.activeDocument.saveToOE('png').then(data => { return app.echoToHost(data); })",
          callback: "imageExported"
        }), 
        "*"
      );
      
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
            const file = new File([blob], `design-${Date.now()}.png`, { type: 'image/png' });
            
            // Upload the design
            await uploadDesign(
              file,
              "Photopea Design",
              "custom",
              "Created with Photopea editor"
            );
            
            toast({
              title: "Design saved",
              description: "Your design has been saved to your account"
            });
            
            // Remove this event listener
            window.removeEventListener("message", onMessage);
          }
        } catch (error) {
          console.error("Error processing message from Photopea:", error);
        } finally {
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

  // Function to download the design
  const handleDownload = () => {
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe || !iframe.contentWindow) {
      toast({
        title: "Editor Error",
        description: "Cannot access the design editor",
        variant: "destructive",
      });
      return;
    }
    
    // Use Photopea API to trigger the Export dialog
    iframe.contentWindow.postMessage(
      JSON.stringify({
        method: "runScript",
        script: "app.activeDocument.saveToOE('png').then(data => { var a = document.createElement('a'); a.href = 'data:image/png;base64,' + data; a.download = 'design-" + Date.now() + ".png'; document.body.appendChild(a); a.click(); document.body.removeChild(a); });"
      }), 
      "*"
    );
    
    toast({
      title: "Download started",
      description: "Your design is being downloaded",
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Build Photopea URL with parameters
  // See full API parameters: https://www.photopea.com/api/
  const photopeaUrlWithParams = `${PHOTOPEA_URL}#${encodeURIComponent(
    JSON.stringify({
      environment: {
        localsave: true,
        customIO: true,
      },
      files: []
    })
  )}`;

  return (
    <Card className={`${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <CardContent className={`p-4 space-y-4 ${isFullscreen ? 'h-screen flex flex-col' : ''}`}>
        {/* Editor Toolbar */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Using Photopea Editor</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <div className="space-y-4 py-2">
                    <p>Photopea is a free online design tool with similar functionality to Photoshop. Here are some tips:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Create new designs with File → New</li>
                      <li>Add text with the Text tool (T) in the toolbar</li>
                      <li>Add shapes with the Rectangle, Ellipse, or other shape tools</li>
                      <li>Use layers panel on the right to organize your design</li>
                      <li>Import images with File → Open or drag and drop</li>
                      <li>Use filters and adjustments from the top menu</li>
                    </ul>
                    <p>Click "Save Design" button to save your work to your account, or "Download" to save to your device.</p>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <><Minimize2 className="h-4 w-4 mr-1" /> Exit Fullscreen</>
              ) : (
                <><Maximize2 className="h-4 w-4 mr-1" /> Fullscreen</>
              )}
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button 
              onClick={handleSaveDesign}
              disabled={isLoading || !isAuthenticated}
              size="sm"
            >
              {isLoading ? (
                <span className="animate-pulse">Saving...</span>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save Design
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Photopea iframe */}
        <div className={`border rounded-md bg-muted/20 ${isFullscreen ? 'flex-grow' : 'h-[600px]'}`}>
          <iframe
            id="photopea-iframe"
            src={photopeaUrlWithParams}
            className="w-full h-full border-none"
            title="Photopea Editor"
            allow="fullscreen"
          ></iframe>
        </div>

        {!isFullscreen && (
          <div className="text-sm text-muted-foreground mt-2">
            <p>Powered by Photopea - Free Professional Photo Editor. For best experience, use in fullscreen mode.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotopeaEditor;
