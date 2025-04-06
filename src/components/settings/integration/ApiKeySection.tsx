
import React from "react";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApiKeySection = () => {
  const { toast } = useToast();

  const handleGenerateKey = () => {
    const apiKey = `pg_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Generated",
      description: "Your new API key has been copied to clipboard.",
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <LinkIcon className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">Your API Key</p>
          <p className="text-sm text-muted-foreground">Use this key to access Print Genius API</p>
        </div>
      </div>
      <Button 
        variant="secondary"
        onClick={handleGenerateKey}
      >
        Generate Key
      </Button>
    </div>
  );
};

export default ApiKeySection;
