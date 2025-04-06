
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useDesigns } from "@/hooks/use-designs";
import DropZone from "./DropZone";
import ImagePreview from "./ImagePreview";
import SaveDesignDialog from "./SaveDesignDialog";

const DesignUploadTab = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [designName, setDesignName] = useState("");
  const [designCategory, setDesignCategory] = useState<string>("");
  const [designDescription, setDesignDescription] = useState("");
  
  const { toast } = useToast();
  const { isAuthenticated } = useUser();
  const { uploadDesign, isLoading } = useDesigns();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setDesignName(selectedFile.name.split('.')[0] || ""); // Set default name from filename
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
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
      {preview ? (
        <ImagePreview 
          preview={preview}
          resetForm={resetForm}
          handleSaveDesign={handleSaveDesign}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />
      ) : (
        <DropZone onFileSelected={handleFileSelected} />
      )}

      <SaveDesignDialog
        isOpen={isSaveDialogOpen}
        setIsOpen={setSaveDialogOpen}
        designName={designName}
        setDesignName={setDesignName}
        designCategory={designCategory}
        setDesignCategory={setDesignCategory}
        designDescription={designDescription}
        setDesignDescription={setDesignDescription}
        handleSaveDesign={handleSaveDesign}
        isLoading={isLoading}
      />
    </>
  );
};

export default DesignUploadTab;
