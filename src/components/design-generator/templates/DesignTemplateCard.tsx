
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
  return (
    <div 
      key={template.id}
      className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
      onClick={() => onSelect(template.id)}
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img 
          src={template.imageUrl} 
          alt={template.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {template.popular && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            Popular
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{template.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {categoryIcons[template.category]}
            <span>{template.category}</span>
          </div>
        </div>
        <div className="mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignTemplateCard;
