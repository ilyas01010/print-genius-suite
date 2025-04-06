
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const ModuleCard = ({ 
  title, 
  description, 
  icon, 
  path, 
  className,
  isNew, 
  isPopular 
}: ModuleCardProps) => {
  const { toast } = useToast();
  
  const handleCardClick = () => {
    // This function can be used for analytics tracking
    if (isNew) {
      toast({
        title: "New Feature",
        description: `You're accessing the new ${title} module.`,
        duration: 3000,
      });
    }
  };

  return (
    <Card 
      className={cn("pod-card overflow-hidden", className)}
      onClick={handleCardClick}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-pod-blue-light text-pod-blue">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-semibold flex items-center">
              {title}
              {isNew && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  New
                </span>
              )}
              {isPopular && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
                  Popular
                </span>
              )}
            </h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2 sm:p-3">
        <Button 
          asChild 
          variant="ghost" 
          size="sm" 
          className="ml-auto hover:bg-pod-blue-light hover:text-pod-blue transition-colors duration-200"
        >
          <Link to={path} className="flex items-center gap-1">
            Go to {title}
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
