
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
}

const ModuleCard = ({ title, description, icon, path, className }: ModuleCardProps) => {
  return (
    <Card className={cn("pod-card overflow-hidden", className)}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-pod-blue-light text-pod-blue">
            {icon}
          </div>
          <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2 sm:p-3">
        <Button asChild variant="ghost" size="sm" className="ml-auto">
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
