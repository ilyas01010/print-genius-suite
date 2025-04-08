import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Star, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Learning resource types
interface LearningResource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "video" | "tutorial";
  duration: string;
  completed: boolean;
}

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
        <div className="space-y-4 sm:space-y-5 animate-fade">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1 className="font-bold text-2xl sm:text-3xl">Learning Hub</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Tutorials, guides, and resources to help you succeed with Print Genius
            </p>
          </div>

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
          
          <div className="rounded-lg border bg-card p-3 sm:p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base sm:text-lg font-semibold">Recommended Learning Path</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Learning Path",
                    description: "Your personalized learning path has been updated.",
                  });
                }}
              >
                Customize Path
              </Button>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {resources.map(resource => (
                <div key={resource.id} className="border rounded-md p-2 sm:p-3 bg-background">
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
                      onClick={() => handleViewResource(resource)}
                    >
                      {resource.type === "video" ? "Watch" : "Read"}
                    </Button>
                    
                    <Button 
                      size="sm"
                      variant="subtle" 
                      className="text-xs py-0.5 px-2 h-auto"
                      onClick={() => handleCompleteResource(resource.id)}
                    >
                      {resource.completed ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default LearningHub;
