
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
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={resetForm}>
          Remove
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleSaveDesign}
          disabled={isLoading || !isAuthenticated}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Design
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
