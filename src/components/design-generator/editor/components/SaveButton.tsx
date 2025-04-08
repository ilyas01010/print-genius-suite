
import React from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveDesignAsImage } from "../utils/canvasUtils";
import { fabric } from "fabric";

interface SaveButtonProps {
  canvas: fabric.Canvas | null;
}

const SaveButton: React.FC<SaveButtonProps> = ({ canvas }) => {
  const { toast } = useToast();

  const saveDesign = () => {
    if (!canvas) return;
    
    try {
      const dataURL = saveDesignAsImage(canvas);
      
      if (!dataURL) {
        throw new Error("Failed to generate image from canvas");
      }
      
      const link = document.createElement('a');
      link.download = 'pod-design.png';
      link.href = dataURL;
      link.click();
      
      toast({
        title: "Design Saved",
        description: "Your design has been downloaded as PNG.",
      });
    } catch (error) {
      console.error("Error saving design:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your design.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={saveDesign} 
      className="flex items-center gap-2"
    >
      <SaveIcon className="h-4 w-4" />
      Save Design
    </Button>
  );
};

export default SaveButton;
