
import React, { useEffect, useState } from "react";
import { buildPhotopeaUrl } from "./photopea-utils";
import { Loader2 } from "lucide-react";

interface PhotopeaFrameProps {
  isFullscreen: boolean;
  onEditorReady: () => void;
}

const PhotopeaFrame: React.FC<PhotopeaFrameProps> = ({
  isFullscreen,
  onEditorReady
}) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Build the URL with parameters according to Photopea's API documentation
  const photopeaUrl = buildPhotopeaUrl({
    theme: 'dark',
    showTools: true,
    showHome: false
  });
  
  // Set up event listener for messages from Photopea
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from Photopea domain
      if (event.origin !== "https://www.photopea.com") return;
      
      if (typeof event.data === "string" && event.data.includes("ready")) {
        console.log("Photopea editor is ready");
        setIsEditorReady(true);
        setIsLoading(false);
        onEditorReady();
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onEditorReady]);

  return (
    <div className="relative">
      <div className={`border rounded-md bg-muted/20 ${isFullscreen ? 'flex-grow' : 'h-[650px]'}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading Photopea Editor...</p>
            </div>
          </div>
        )}
        <iframe
          id="photopea-iframe"
          src={photopeaUrl}
          className="w-full h-full border-none"
          title="Photopea Editor"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-downloads"
          onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
        ></iframe>
      </div>

      {!isFullscreen && (
        <div className="text-sm text-muted-foreground mt-2 flex items-center justify-between">
          <p>Powered by <a href="https://www.photopea.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Photopea</a> - Free Professional Photo Editor</p>
          <p>For best experience, use in fullscreen mode.</p>
        </div>
      )}
    </div>
  );
};

export default PhotopeaFrame;
