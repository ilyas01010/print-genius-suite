
import React from "react";
import PhotopeaFrame from "./photopea/PhotopeaFrame";
import PhotopeaGallery from "./photopea/PhotopeaGallery";

interface PhotopeaEditorContentProps {
  isFullscreen: boolean;
  isAuthenticated: boolean;
  onEditorReady: () => void;
}

const PhotopeaEditorContent: React.FC<PhotopeaEditorContentProps> = ({
  isFullscreen,
  isAuthenticated,
  onEditorReady
}) => {
  return (
    <>
      {/* Photopea Editor Frame */}
      <PhotopeaFrame 
        isFullscreen={isFullscreen}
        onEditorReady={onEditorReady}
      />
      
      {/* Recent Designs Gallery - only show when authenticated and not in fullscreen */}
      {isAuthenticated && !isFullscreen && (
        <PhotopeaGallery />
      )}
    </>
  );
};

export default PhotopeaEditorContent;
