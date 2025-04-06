
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DesignUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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

  const handleFile = (file: File) => {
    const fileType = file.type;
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    
    if (!validTypes.includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, or SVG)",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleProcessImage = () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload an image to process.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Processing image",
      description: "Your design is being processed. This may take a moment.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Design Generator</CardTitle>
        <CardDescription>
          Upload an image or create a design from text prompts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? "border-pod-blue bg-pod-blue-light" : "border-muted"
          } ${preview ? "pt-2" : "py-10"}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <div className="mx-auto max-h-64 overflow-hidden rounded-md">
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto h-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => {setFile(null); setPreview(null);}}>
                  Remove
                </Button>
                <Button variant="default" onClick={handleProcessImage}>
                  Process Design
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <FileImage className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Drag and drop your image here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPEG, PNG, and SVG files
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/jpeg,image/png,image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        <Button variant="outline" className="w-full">
          <ImagePlus className="mr-2 h-4 w-4" />
          Create with Text Prompt
        </Button>
      </CardContent>
    </Card>
  );
};

export default DesignUploader;
