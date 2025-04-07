
import React from "react";
import PhotopeaFrame from "./photopea/PhotopeaFrame";
import PhotopeaGallery from "./photopea/PhotopeaGallery";

interface PhotopeaEditorContentProps {
  isFullscreen: boolean;
  isAuthenticated: boolean;
  onEditorReady: () => void;
  imageToEdit?: string;
}

const PhotopeaEditorContent: React.FC<PhotopeaEditorContentProps> = ({
  isFullscreen,
  isAuthenticated,
  onEditorReady,
  imageToEdit
}) => {
  return (
    <>
      {/* Photopea Editor Frame */}
      <PhotopeaFrame 
        isFullscreen={isFullscreen}
        onEditorReady={onEditorReady}
        imageToEdit={imageToEdit}
      />
      
      {/* Recent Designs Gallery - only show when authenticated and not in fullscreen */}
      {isAuthenticated && !isFullscreen && (
        <PhotopeaGallery />
      )}
    </>
  );
};

export default PhotopeaEditorContent;
