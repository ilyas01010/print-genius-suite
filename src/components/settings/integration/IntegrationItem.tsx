
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
      <div className="flex items-center space-x-4">
        <div className={`h-10 w-10 rounded ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={handleConnect}
      >
        Connect
      </Button>
    </div>
  );
};

export default IntegrationItem;
