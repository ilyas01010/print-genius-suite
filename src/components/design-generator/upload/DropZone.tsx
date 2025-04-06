import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { compressImage } from "@/lib/image-utils";

interface DropZoneProps {
  onFileSelected: (file: File) => void;
}

const DropZone = ({ onFileSelected }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFile = async (file: File) => {
    const fileType = file.type;
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    
    if (!validTypes.includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, SVG, or WEBP)",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Only compress raster images (not SVGs)
      if (fileType !== 'image/svg+xml' && file.size > 1024 * 1024) {
        toast({
          title: "Processing image",
          description: "Optimizing your image for better performance...",
        });
        
        // Compress the image to improve loading performance
        const compressedBlob = await compressImage(file, 1600, 0.85);
        const optimizedFile = new File([compressedBlob], file.name, {
          type: fileType === 'image/png' ? 'image/png' : 'image/jpeg',
        });
        
        onFileSelected(optimizedFile);
      } else {
        // Pass through SVGs and small files unchanged
        onFileSelected(file);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      // Fall back to the original file if compression fails
      onFileSelected(file);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? "border-pod-blue bg-pod-blue-light" : "border-muted"
      } py-10`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <FileImage className="h-16 w-16 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isProcessing 
              ? "Processing image..." 
              : "Drag and drop your image here or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground">
            Supports JPEG, PNG, SVG, and WEBP files (max 10MB)
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          disabled={isProcessing}
        >
          <Upload className="mr-2 h-4 w-4" />
          Browse Files
        </Button>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg,image/png,image/svg+xml,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};

export default DropZone;
