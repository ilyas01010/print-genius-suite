
import React from "react";
import { Button } from "@/components/ui/button";
import { Palette, Text, ImageIcon, Shapes } from "lucide-react";

export interface DesignTemplate {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  popular: boolean;
}

interface DesignTemplateCardProps {
  template: DesignTemplate;
  onSelect: (templateId: number) => void;
  categoryIcons: Record<string, JSX.Element>;
}

const DesignTemplateCard = ({ 
  template, 
  onSelect,
  categoryIcons 
}: DesignTemplateCardProps) => {
  // Use separate handlers to fix event propagation issues
  const handleCardClick = () => {
    onSelect(template.id);
  };
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling to parent
    onSelect(template.id);
  };
  
  return (
    <div 
      key={template.id}
      className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img 
          src={template.imageUrl} 
          alt={template.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {template.popular && (
          <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs font-medium">
            Popular
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-xs sm:text-sm">{template.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {categoryIcons[template.category]}
            <span className="hidden sm:inline">{template.category}</span>
          </div>
        </div>
        <div className="mt-1.5">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs h-7"
            onClick={handleButtonClick}
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignTemplateCard;
