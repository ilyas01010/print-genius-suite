import React, { useState, useEffect } from "react";
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
  Minimize2,
  Settings,
  FileImage,
  PanelTop,
  Layers,
  Type
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { compressImage } from "@/lib/image-utils";

const PHOTOPEA_URL = "https://www.photopea.com";

// Templates for common print on demand products
const TEMPLATES = [
  { name: "T-Shirt Design", width: 4500, height: 5400, dpi: 300 },
  { name: "Mug Design", width: 3600, height: 1800, dpi: 300 },
  { name: "Poster (11x17)", width: 3300, height: 5100, dpi: 300 },
  { name: "Phone Case", width: 1800, height: 3600, dpi: 300 },
  { name: "Canvas Print", width: 4800, height: 3600, dpi: 300 }
];

const PhotopeaEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign } = useDesigns();
  const [editorReady, setEditorReady] = useState(false);
  
  // Function to create a new document with specific dimensions
  const createNewDocument = (width: number, height: number, dpi: number) => {
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe || !iframe.contentWindow) return;
    
    iframe.contentWindow.postMessage(
      JSON.stringify({
        method: "runScript",
        script: `app.documents.add(${width}, ${height}, ${dpi}, "Untitled", "RGB");`
      }), 
      "*"
    );
    
    toast({
      title: "New document created",
      description: `Created a ${width}x${height}px canvas at ${dpi} DPI`
    });
  };

  // Function to handle message events from Photopea
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.photopea.com") return;
      
      if (typeof event.data === "string" && event.data.includes("ready")) {
        setEditorReady(true);
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
            
            // Get document name for better file naming
            iframe.contentWindow.postMessage(
              JSON.stringify({
                method: "runScript",
                script: "app.activeDocument.name",
                callback: "getDocName"
              }), 
              "*"
            );
            
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
                  
                  // Compress and upload the design
                  const compressedFile = await compressImage(file, 1200, 0.85);
                  
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
    
    // Use Photopea API to export as PNG and download
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

  // Function to open an image from URL
  const openImageFromURL = () => {
    // Display a prompt to get the image URL
    const imageUrl = prompt("Enter the URL of the image:");
    
    if (!imageUrl) return;
    
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement | null;
    if (!iframe || !iframe.contentWindow) return;
    
    iframe.contentWindow.postMessage(
      JSON.stringify({
        method: "runScript",
        script: `app.open("${imageUrl}");`
      }), 
      "*"
    );
  };

  // Build Photopea URL with parameters
  // See full API parameters: https://www.photopea.com/api/
  const photopeaUrlWithParams = `${PHOTOPEA_URL}#${encodeURIComponent(
    JSON.stringify({
      environment: {
        localsave: true,
        customIO: true,
        theme: "dark", // Use dark theme for better integration with our UI
        showtools: true,
        showhome: false, // Hide the home button
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
            <TooltipProvider>
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Help
                      </Button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Learn how to use the editor</p>
                  </TooltipContent>
                </Tooltip>

                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Using Photopea Editor</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <div className="space-y-4 py-2">
                      <p>Photopea is a free online design tool with similar functionality to Photoshop. Here are some tips:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <PanelTop className="h-4 w-4 mr-2" />
                            Basic Operations
                          </h3>
                          <ul className="list-disc pl-5 space-y-1.5">
                            <li>Create new designs with File → New</li>
                            <li>Open your local files with File → Open</li>
                            <li>Save your work with File → Save or Export as</li>
                            <li>Undo/Redo with Ctrl+Z / Ctrl+Y</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <Type className="h-4 w-4 mr-2" />
                            Working with Text & Shapes
                          </h3>
                          <ul className="list-disc pl-5 space-y-1.5">
                            <li>Add text with the Text tool (T) in the toolbar</li>
                            <li>Choose fonts from the top panel when text is selected</li>
                            <li>Add shapes with the Rectangle, Ellipse tools</li>
                            <li>Adjust colors using the color picker</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <Layers className="h-4 w-4 mr-2" />
                            Working with Layers
                          </h3>
                          <ul className="list-disc pl-5 space-y-1.5">
                            <li>Use the layers panel on the right to organize your design</li>
                            <li>Adjust visibility with the eye icon</li>
                            <li>Lock layers with the lock icon</li>
                            <li>Add layer effects with right-click → Layer Style</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center">
                            <FileImage className="h-4 w-4 mr-2" />
                            Working with Images
                          </h3>
                          <ul className="list-disc pl-5 space-y-1.5">
                            <li>Import images with File → Open or drag and drop</li>
                            <li>Resize images with Ctrl+T (Free Transform)</li>
                            <li>Use filters from the top menu: Filter → ...</li>
                            <li>Adjust brightness/contrast: Image → Adjustments</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                        <h3 className="font-semibold mb-2">Print on Demand Tips</h3>
                        <ul className="list-disc pl-5 space-y-1.5">
                          <li>Always work in high resolution (300 DPI) for print designs</li>
                          <li>Use CMYK color mode for more accurate print colors</li>
                          <li>Keep text at least 1/2 inch from edges for t-shirts and apparel</li>
                          <li>Consider the printable area for each product type</li>
                        </ul>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Templates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Print on Demand Templates</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Choose a template to start with common print-on-demand product dimensions.
                  All templates are set to 300 DPI for professional print quality.
                </DialogDescription>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {TEMPLATES.map((template, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      onClick={() => {
                        createNewDocument(template.width, template.height, template.dpi);
                      }}
                      className="flex flex-col items-start h-auto py-3 px-4"
                    >
                      <span className="font-medium">{template.name}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {template.width} x {template.height}px ({template.dpi} DPI)
                      </span>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={openImageFromURL}
            >
              <FileImage className="h-4 w-4 mr-1" />
              Open Image URL
            </Button>
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
