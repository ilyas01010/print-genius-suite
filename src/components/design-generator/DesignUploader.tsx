import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus, FileImage, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextToImage from "./TextToImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DesignUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [designCategory, setDesignCategory] = useState<string>("");
  const [designDescription, setDesignDescription] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign, isLoading } = useDesigns();

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
    
    setFile(file);
    setDesignName(file.name.split('.')[0] || ""); // Set default name from filename
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDesign = async () => {
    if (!file) return;

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save designs",
        variant: "destructive",
      });
      return;
    }
    
    // If user hasn't opened the save dialog yet, show it
    if (!isSaveDialogOpen) {
      setSaveDialogOpen(true);
      return;
    }

    const name = designName.trim() || file.name;
    const result = await uploadDesign(
      file, 
      name, 
      designCategory || undefined, 
      designDescription || undefined
    );
    
    if (result) {
      setSaveDialogOpen(false);
      // Reset form after successful upload
      resetForm();
      toast({
        title: "Design saved",
        description: "Your design has been uploaded successfully"
      });
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setDesignName("");
    setDesignCategory("");
    setDesignDescription("");
    setSaveDialogOpen(false);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Design Generator</CardTitle>
          <CardDescription>
            Upload an image or create a design from text prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="generate">Text to Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-0">
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
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <FileImage className="h-16 w-16 text-muted-foreground" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Drag and drop your image here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports JPEG, PNG, SVG, and WEBP files (max 10MB)
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
                      accept="image/jpeg,image/png,image/svg+xml,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="generate" className="mt-0">
              <TextToImage />
            </TabsContent>
          </Tabs>
        </CardContent>
        {!isAuthenticated && (
          <CardFooter className="bg-muted/50 px-6 py-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <span>Sign in to save and manage your designs</span>
            </div>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isSaveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Design</DialogTitle>
            <DialogDescription>
              Enter details about your design to save it to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="My awesome design"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={designCategory} onValueChange={setDesignCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t-shirt">T-Shirt Design</SelectItem>
                  <SelectItem value="poster">Poster</SelectItem>
                  <SelectItem value="logo">Logo</SelectItem>
                  <SelectItem value="illustration">Illustration</SelectItem>
                  <SelectItem value="ai-generated">AI Generated</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
                placeholder="A brief description of your design"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDesign} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Design"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesignUploader;
