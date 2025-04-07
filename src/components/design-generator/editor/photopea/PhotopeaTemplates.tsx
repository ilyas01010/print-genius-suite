
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

// Templates for common print on demand products
export const TEMPLATES = [
  { name: "T-Shirt Design", width: 4500, height: 5400, dpi: 300 },
  { name: "Mug Design", width: 3600, height: 1800, dpi: 300 },
  { name: "Poster (11x17)", width: 3300, height: 5100, dpi: 300 },
  { name: "Phone Case", width: 1800, height: 3600, dpi: 300 },
  { name: "Canvas Print", width: 4800, height: 3600, dpi: 300 }
];

interface PhotopeaTemplatesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (width: number, height: number, dpi: number) => void;
}

const PhotopeaTemplates: React.FC<PhotopeaTemplatesProps> = ({
  open,
  onOpenChange,
  onSelectTemplate
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print on Demand Templates</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Choose a template to start with common print-on-demand product dimensions.
          All templates are set to 300 DPI for professional print quality.
        </DialogDescription>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {TEMPLATES.map((template, index) => (
            <Button 
              key={index} 
              variant="outline" 
              onClick={() => {
                onSelectTemplate(template.width, template.height, template.dpi);
                onOpenChange(false);
              }}
              className="flex flex-col items-start h-auto py-3 px-4"
            >
              <span className="font-medium">{template.name}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {template.width} x {template.height}px ({template.dpi} DPI)
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotopeaTemplates;
