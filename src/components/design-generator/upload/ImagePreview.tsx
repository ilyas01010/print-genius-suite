
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ImagePreviewProps {
  preview: string;
  resetForm: () => void;
  handleSaveDesign: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const ImagePreview = ({
  preview,
  resetForm,
  handleSaveDesign,
  isLoading,
  isAuthenticated
}: ImagePreviewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-4">
      <div className="mx-auto max-h-64 overflow-hidden rounded-md">
        {!imageLoaded && !imageError && (
          <div className="w-full h-32 bg-muted/30 animate-pulse"></div>
        )}
        <img
          src={preview}
          alt="Preview"
          className={`mx-auto h-auto max-w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true);
            setImageLoaded(true);
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          onClick={resetForm}
          disabled={isLoading}
        >
          Remove
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleSaveDesign}
          disabled={isLoading || !isAuthenticated}
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Design
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
