
import React from "react";
import { Loader2, ImageIcon, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GeneratedImagePreviewProps {
  generatedImage: string | null;
  loadingImage: boolean;
  handleDownload: () => void;
  handleSaveDesign: () => void;
  isAuthenticated: boolean;
}

const GeneratedImagePreview = ({
  generatedImage,
  loadingImage,
  handleDownload,
  handleSaveDesign,
  isAuthenticated,
}: GeneratedImagePreviewProps) => {
  if (!loadingImage && !generatedImage) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className="border rounded-md overflow-hidden bg-muted/30 relative">
        {loadingImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading your design...</p>
            </div>
          </div>
        )}
        
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Generated design"
            className="w-full h-auto object-contain"
          />
        ) : (
          <div className="aspect-square flex items-center justify-center text-muted-foreground">
            <ImageIcon className="h-16 w-16 opacity-20" />
          </div>
        )}
      </div>
      
      {generatedImage && (
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          {isAuthenticated && (
            <Button onClick={handleSaveDesign}>
              <Save className="mr-2 h-4 w-4" />
              Save to My Designs
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneratedImagePreview;
