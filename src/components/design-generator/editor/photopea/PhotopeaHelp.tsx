
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileImage, Layers, PanelTop, Type } from "lucide-react";

interface PhotopeaHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PhotopeaHelp: React.FC<PhotopeaHelpProps> = ({
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Using Photopea Editor</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="space-y-4 py-2">
            <p>Photopea is a free online design tool with similar functionality to Photoshop. Here are some tips:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <PanelTop className="h-4 w-4 mr-2" />
                  Basic Operations
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Create new designs with File → New</li>
                  <li>Open your local files with File → Open</li>
                  <li>Save your work with File → Save or Export as</li>
                  <li>Undo/Redo with Ctrl+Z / Ctrl+Y</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Working with Text & Shapes
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Add text with the Text tool (T) in the toolbar</li>
                  <li>Choose fonts from the top panel when text is selected</li>
                  <li>Add shapes with the Rectangle, Ellipse tools</li>
                  <li>Adjust colors using the color picker</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Layers className="h-4 w-4 mr-2" />
                  Working with Layers
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Use the layers panel on the right to organize your design</li>
                  <li>Adjust visibility with the eye icon</li>
                  <li>Lock layers with the lock icon</li>
                  <li>Add layer effects with right-click → Layer Style</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <FileImage className="h-4 w-4 mr-2" />
                  Working with Images
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Import images with File → Open or drag and drop</li>
                  <li>Resize images with Ctrl+T (Free Transform)</li>
                  <li>Use filters from the top menu: Filter → ...</li>
                  <li>Adjust brightness/contrast: Image → Adjustments</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-muted-foreground/20">
              <h3 className="font-semibold mb-2">Print on Demand Tips</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Always work in high resolution (300 DPI) for print designs</li>
                <li>Use CMYK color mode for more accurate print colors</li>
                <li>Keep text at least 1/2 inch from edges for t-shirts and apparel</li>
                <li>Consider the printable area for each product type</li>
              </ul>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PhotopeaHelp;
