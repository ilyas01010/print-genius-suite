
import React, { useEffect } from "react";
import { buildPhotopeaUrl } from "./photopea-utils";

interface PhotopeaFrameProps {
  isFullscreen: boolean;
  onEditorReady: () => void;
}

const PhotopeaFrame: React.FC<PhotopeaFrameProps> = ({
  isFullscreen,
  onEditorReady,
}) => {
  // Build the URL with parameters
  const photopeaUrl = buildPhotopeaUrl();
  
  // Set up event listener for messages from Photopea
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.photopea.com") return;
      
      if (typeof event.data === "string" && event.data.includes("ready")) {
        onEditorReady();
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onEditorReady]);

  return (
    <>
      <div className={`border rounded-md bg-muted/20 ${isFullscreen ? 'flex-grow' : 'h-[600px]'}`}>
        <iframe
          id="photopea-iframe"
          src={photopeaUrl}
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
    </>
  );
};

export default PhotopeaFrame;
