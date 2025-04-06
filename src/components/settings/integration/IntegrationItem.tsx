
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface IntegrationItemProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

const IntegrationItem = ({ name, description, icon, bgColor }: IntegrationItemProps) => {
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Integration Coming Soon",
      description: `${name} integration will be available soon.`,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="font-medium text-sm sm:text-base">{name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleConnect}
      >
        Connect
      </Button>
    </div>
  );
};

export default IntegrationItem;
