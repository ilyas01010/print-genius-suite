
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Check } from "lucide-react";
import { LearningResource } from "./types";
import LearningResourceItem from "./LearningResourceItem";

interface RecommendedLearningPathProps {
  resources: LearningResource[];
  onComplete: (id: string) => void;
  onView: (resource: LearningResource) => void;
}

const RecommendedLearningPath: React.FC<RecommendedLearningPathProps> = ({ 
  resources, 
  onComplete, 
  onView 
}) => {
  return (
    <div className="rounded-lg border bg-card p-3 sm:p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base sm:text-lg font-semibold">Recommended Learning Path</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // We're reusing the toast from parent, so we need to handle this in the parent
            // and pass the function as a prop if needed
          }}
        >
          Customize Path
        </Button>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {resources.map(resource => (
          <LearningResourceItem 
            key={resource.id}
            resource={resource}
            onComplete={onComplete}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedLearningPath;
