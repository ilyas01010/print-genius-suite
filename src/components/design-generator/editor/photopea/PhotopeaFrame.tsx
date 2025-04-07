
import React, { useEffect, useState } from "react";
import { buildPhotopeaUrl, openImageFromURL } from "./photopea-utils";

interface PhotopeaFrameProps {
  isFullscreen: boolean;
  onEditorReady: () => void;
  imageToEdit?: string;
}

const PhotopeaFrame: React.FC<PhotopeaFrameProps> = ({
  isFullscreen,
  onEditorReady,
  imageToEdit
}) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  
  // Build the URL with parameters
  const photopeaUrl = buildPhotopeaUrl();
  
  // Set up event listener for messages from Photopea
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from Photopea domain
      if (event.origin !== "https://www.photopea.com") return;
      
      if (typeof event.data === "string" && event.data.includes("ready")) {
        console.log("Photopea editor is ready");
        setIsEditorReady(true);
        onEditorReady();
        
        // If we have an image to edit, open it in Photopea
        if (imageToEdit) {
          const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement;
          if (iframe) {
            setTimeout(() => {
              openImageFromURL(iframe, imageToEdit);
            }, 500); // Give the editor a moment to fully initialize
          }
        }
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onEditorReady, imageToEdit]);

  // Effect to handle image changes
  useEffect(() => {
    if (!imageToEdit || !isEditorReady) return;
    
    const iframe = document.getElementById('photopea-iframe') as HTMLIFrameElement;
    if (iframe) {
      openImageFromURL(iframe, imageToEdit);
    }
  }, [imageToEdit, isEditorReady]);

  return (
    <>
      <div className={`border rounded-md bg-muted/20 ${isFullscreen ? 'flex-grow' : 'h-[600px]'}`}>
        <iframe
          id="photopea-iframe"
          src={photopeaUrl}
          className="w-full h-full border-none"
          title="Photopea Editor"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-downloads"
        ></iframe>
      </div>

      {!isFullscreen && (
        <div className="text-sm text-muted-foreground mt-2">
          <p>Powered by Photopea - Free Professional Photo Editor. For best experience, use in fullscreen mode.</p>
        </div>
      )}
    </>
  );
};

export default PhotopeaFrame;
