
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddPlatformCardProps {
  onClick: () => void;
}

const AddPlatformCard = ({ onClick }: AddPlatformCardProps) => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center h-[165px]">
        <Button 
          variant="outline" 
          size="lg" 
          className="h-10 w-10 rounded-full mb-2" 
          onClick={onClick}
        >
          <Plus className="h-5 w-5" />
        </Button>
        <p className="text-sm font-medium">Connect New Platform</p>
        <p className="text-xs text-muted-foreground">Integrate with more POD services</p>
      </CardContent>
    </Card>
  );
};

export default AddPlatformCard;
