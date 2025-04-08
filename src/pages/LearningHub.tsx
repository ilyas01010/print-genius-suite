
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import LearningCards from "@/components/learning/LearningCards";
import RecommendedLearningPath from "@/components/learning/RecommendedLearningPath";
import { LearningResource } from "@/components/learning/types";

const LearningHub = () => {
  const { toast } = useToast();
  
  // Learning resources state
  const [resources, setResources] = useState<LearningResource[]>([
    {
      id: "guide-1",
      title: "Getting Started with Print Genius",
      description: "Learn the basics and set up your first project.",
      type: "guide",
      duration: "10 min",
      completed: false
    },
    {
      id: "video-1",
      title: "Design Tips for Print Products",
      description: "Professional tips to make your designs stand out.",
      type: "video",
      duration: "15 min",
      completed: false
    },
    {
      id: "tutorial-1",
      title: "Advanced Features Tutorial",
      description: "Learn how to use all Print Genius features.",
      type: "tutorial",
      duration: "20 min",
      completed: false
    },
  ]);
  
  const [activeCategory, setActiveCategory] = useState("basics");
  
  // Complete resource handler
  const handleCompleteResource = (id: string) => {
    setResources(current =>
      current.map(resource => 
        resource.id === id 
          ? { ...resource, completed: !resource.completed }
          : resource
      )
    );
    
    const resource = resources.find(r => r.id === id);
    if (resource) {
      toast({
        title: resource.completed ? "Marked as incomplete" : "Marked as completed",
        description: `"${resource.title}" has been ${resource.completed ? "removed from" : "added to"} your completed resources.`,
      });
    }
  };
  
  // View resource handler
  const handleViewResource = (resource: LearningResource) => {
    toast({
      title: `Opening ${resource.type === "video" ? "Video" : resource.type === "guide" ? "Guide" : "Tutorial"}`,
      description: `Loading "${resource.title}" - this feature is coming soon!`,
    });
  };
  
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-4 sm:space-y-5 animate-fade-in">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1 className="font-bold text-2xl sm:text-3xl">Learning Hub</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Tutorials, guides, and resources to help you succeed with Print Genius
            </p>
          </div>

          <LearningCards toast={toast} />
          
          <RecommendedLearningPath 
            resources={resources}
            onComplete={handleCompleteResource}
            onView={handleViewResource}
          />
        </div>
      </PageLayout>
    </Layout>
  );
};

export default LearningHub;
