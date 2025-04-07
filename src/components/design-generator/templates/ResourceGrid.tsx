
import React from "react";
import ResourceCard from "./ResourceCard";
import { DesignResource } from "./ResourceTypes";

interface ResourceGridProps {
  resources: DesignResource[];
  onSelect: (resourceId: number) => void;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;
