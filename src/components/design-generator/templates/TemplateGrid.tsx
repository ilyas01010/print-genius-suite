
import React from "react";
import DesignTemplateCard, { DesignTemplate } from "./DesignTemplateCard";

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
  // Filter templates by category if a category is selected
  const filteredTemplates = selectedCategory && selectedCategory !== "all"
    ? templates.filter(template => template.category === selectedCategory)
    : templates;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredTemplates.length > 0 ? (
        filteredTemplates.map((template) => (
          <DesignTemplateCard
            key={template.id}
            template={template}
            onSelect={onSelect}
            categoryIcons={categoryIcons}
          />
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
