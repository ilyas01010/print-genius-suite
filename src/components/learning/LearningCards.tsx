
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText } from "lucide-react";

interface LearningCardsProps {
  toast: any;
}

const LearningCards: React.FC<LearningCardsProps> = ({ toast }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">Getting Started</h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3">
          Learn the basics of Print Genius and how to set up your first project.
        </p>
        <Button 
          size="sm" 
          onClick={() => {
            toast({
              title: "Guide Opened",
              description: "Loading Getting Started guide - this feature is coming soon!",
            });
          }}
        >
          View Guide
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <FileText className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">Design Tips</h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3">
          Professional design tips to make your products stand out.
        </p>
        <Button 
          size="sm"
          onClick={() => {
            toast({
              title: "Design Tips",
              description: "Loading design tips and best practices - this feature is coming soon!",
            });
          }}
        >
          View Tips
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Video className="h-4 w-4 text-primary" />
          <h2 className="text-base sm:text-lg font-semibold">Video Tutorials</h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3">
          Step-by-step video guides for using all Print Genius features.
        </p>
        <Button 
          size="sm"
          onClick={() => {
            toast({
              title: "Video Tutorials",
              description: "Loading video library - this feature is coming soon!",
            });
          }}
        >
          Watch Videos
        </Button>
      </div>
    </div>
  );
};

export default LearningCards;
