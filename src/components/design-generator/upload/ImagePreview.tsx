
import React from "react";
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
  return (
    <div className="space-y-4">
      <div className="mx-auto max-h-64 overflow-hidden rounded-md">
        <img
          src={preview}
          alt="Preview"
          className="mx-auto h-auto max-w-full object-contain"
          loading="lazy"
          decoding="async"
          onError={(e) => {
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
          loading={isLoading}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
