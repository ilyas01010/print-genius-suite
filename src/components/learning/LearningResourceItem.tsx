
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Check } from "lucide-react";
import { LearningResource } from "./types";

interface LearningResourceItemProps {
  resource: LearningResource;
  onComplete: (id: string) => void;
  onView: (resource: LearningResource) => void;
}

const LearningResourceItem: React.FC<LearningResourceItemProps> = ({ 
  resource, 
  onComplete, 
  onView 
}) => {
  return (
    <div className="border rounded-md p-2 sm:p-3 bg-background">
      <div className="flex justify-between">
        <div className="flex items-start gap-2">
          <div className={`rounded-full p-1 ${
            resource.type === "video" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
            resource.type === "guide" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
          }`}>
            {resource.type === "video" ? <Video size={14} /> :
              resource.type === "guide" ? <BookOpen size={14} /> :
              <FileText size={14} />
            }
          </div>
          <div>
            <h3 className="text-sm font-medium">{resource.title}</h3>
            <p className="text-xs text-muted-foreground">{resource.description}</p>
            <div className="text-xs mt-1 flex items-center gap-2">
              <span>
                {resource.duration} | {resource.completed ? 
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Completed
                  </span> : 
                  "Not completed"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-2">
        <Button 
          size="sm" 
          variant="outline"
          className="text-xs py-0.5 px-2 h-auto"
          onClick={() => onView(resource)}
        >
          {resource.type === "video" ? "Watch" : "Read"}
        </Button>
        
        <Button 
          size="sm"
          variant="subtle" 
          className="text-xs py-0.5 px-2 h-auto"
          onClick={() => onComplete(resource.id)}
        >
          {resource.completed ? "Mark Incomplete" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
};

export default LearningResourceItem;
