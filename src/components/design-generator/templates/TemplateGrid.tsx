
import React from "react";
import DesignTemplateCard, { DesignTemplate } from "./DesignTemplateCard";

interface TemplateGridProps {
  templates: DesignTemplate[];
  onSelect: (templateId: number) => void;
  categoryIcons: Record<string, JSX.Element>;
}

const TemplateGrid = ({ templates, onSelect, categoryIcons }: TemplateGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <DesignTemplateCard
          key={template.id}
          template={template}
          onSelect={onSelect}
          categoryIcons={categoryIcons}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
