
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AccountCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  savedSettings?: boolean;
  handleSaveSettings?: () => void;
  variant?: "default" | "destructive";
  showSaveButton?: boolean;
}

const AccountCard = ({
  title,
  description,
  children,
  savedSettings = false,
  handleSaveSettings,
  variant = "default",
  showSaveButton = true
}: AccountCardProps) => {
  return (
    <Card className={cn(
      "animate-in fade-in-50 shadow-sm", 
      variant === "destructive" && "border-destructive/50"
    )}>
      <CardHeader className="px-4 py-3 sm:px-5 sm:py-4">
        <CardTitle className={cn(
          "text-lg",
          variant === "destructive" && "text-destructive"
        )}>{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      
      {children}
      
      {showSaveButton && handleSaveSettings && (
        <CardFooter className="flex justify-end border-t px-4 py-3 sm:px-5 sm:py-3">
          <Button 
            onClick={handleSaveSettings} 
            disabled={savedSettings}
            variant="default"
            size="sm"
          >
            {savedSettings ? "Saved" : "Save Changes"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountCard;
