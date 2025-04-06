
import React from "react";
import DesignTemplateCard, { DesignTemplate } from "./DesignTemplateCard";
import { Button } from "@/components/ui/button";
import { Download, Share, Link, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface TemplateGridProps {
  templates: DesignTemplate[];
  onSelect: (templateId: number) => void;
  categoryIcons: Record<string, JSX.Element>;
  selectedCategory?: string;
}

const TemplateGrid = ({ 
  templates, 
  onSelect, 
  categoryIcons, 
  selectedCategory 
}: TemplateGridProps) => {
  const { toast } = useToast();
  
  // Filter templates by category if a category is selected
  const filteredTemplates = selectedCategory && selectedCategory !== "all"
    ? templates.filter(template => template.category === selectedCategory)
    : templates;

  const handleDownload = (template: DesignTemplate, format: string) => {
    // In a real implementation, this would generate the appropriate file format
    toast({
      title: `Downloading template as ${format}`,
      description: `${template.name} is being prepared for download`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download ready",
        description: "Your design template has been downloaded",
      });
    }, 1000);
  };

  const handleShareTemplate = (template: DesignTemplate) => {
    // Copy share URL to clipboard
    navigator.clipboard.writeText(`https://printgenius.app/shared-template/${template.id}`);
    
    toast({
      title: "Share link copied",
      description: "Template link has been copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredTemplates.length > 0 ? (
        filteredTemplates.map((template) => (
          <div key={template.id} className="group relative">
            <DesignTemplateCard
              template={template}
              onSelect={onSelect}
              categoryIcons={categoryIcons}
            />
            
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDownload(template, "PNG")}>
                    <span>PNG Image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(template, "JPG")}>
                    <span>JPG Image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(template, "SVG")}>
                    <span>SVG Vector</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleShareTemplate(template)}
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground rounded-full px-2 py-1 text-xs flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{Math.floor(Math.random() * 5) + 1} editing</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/30 rounded-lg border border-dashed">
          <p className="text-muted-foreground">No templates found in this category.</p>
          <p className="text-sm text-muted-foreground">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;
