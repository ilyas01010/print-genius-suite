
import React from "react";
import DesignTemplateCard, { DesignTemplate } from "./DesignTemplateCard";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";
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

  const handleDownload = (template: DesignTemplate, format: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling up to parent elements
    e.preventDefault(); // Ensure the default action is prevented
    
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

  const handleShareTemplate = (template: DesignTemplate, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling up to parent elements
    e.preventDefault(); // Ensure the default action is prevented
    
    // Copy share URL to clipboard
    navigator.clipboard.writeText(`https://printgenius.app/shared-template/${template.id}`);
    
    toast({
      title: "Share link copied",
      description: "Template link has been copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
      {filteredTemplates.length > 0 ? (
        filteredTemplates.map((template) => (
          <div key={template.id} className="group relative">
            <DesignTemplateCard
              template={template}
              onSelect={onSelect}
              categoryIcons={categoryIcons}
            />
            
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={(e) => e.stopPropagation()} // Prevent card click
                  >
                    <Download className="h-3 w-3" />
                    <span className="sr-only">Download options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem onClick={(e) => handleDownload(template, "PNG", e)}>
                    PNG Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleDownload(template, "JPG", e)}>
                    JPG Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleDownload(template, "SVG", e)}>
                    SVG Vector
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareTemplate(template, e);
                }}
              >
                <Share className="h-3 w-3" />
                <span className="sr-only">Share template</span>
              </Button>
            </div>
            
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground rounded-full px-1.5 py-0.5 text-xs flex items-center gap-1">
                <span className="inline-flex items-center">
                  <svg className="h-2.5 w-2.5 mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M3 21C3 17.134 7.13401 14 12 14C16.866 14 21 17.134 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  {Math.floor(Math.random() * 5) + 1}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-muted/30 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">No templates found in this category.</p>
          <p className="text-xs text-muted-foreground">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;
