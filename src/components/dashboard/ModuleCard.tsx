
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
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pod-blue-light text-pod-blue">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button asChild variant="ghost" className="ml-auto">
          <Link to={path} className="flex items-center gap-2">
            Go to {title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
