
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
      "animate-in fade-in-50 shadow-md", 
      variant === "destructive" && "border-destructive/50"
    )}>
      <CardHeader>
        <CardTitle className={cn(
          variant === "destructive" && "text-destructive"
        )}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {children}
      
      {showSaveButton && handleSaveSettings && (
        <CardFooter className="flex justify-end border-t p-6 pt-4">
          <Button 
            onClick={handleSaveSettings} 
            disabled={savedSettings}
            variant="default"
          >
            {savedSettings ? "Saved" : "Save Changes"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountCard;
