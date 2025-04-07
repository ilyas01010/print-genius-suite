
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ApiKeySection = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const [isGenerating, setIsGenerating] = useState(false);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem("printGenius_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const generateApiKey = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a more realistic API key format
      const keyPrefix = "pg_live_";
      const keyBody = Array(24)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      
      const newApiKey = `${keyPrefix}${keyBody}`;
      
      // Store in localStorage for persistence
      localStorage.setItem("printGenius_api_key", newApiKey);
      setApiKey(newApiKey);
      setShowKey(true);
      setIsGenerating(false);
      
      toast({
        title: "API Key Generated",
        description: "Your new API key has been created successfully.",
      });
    }, 1000);
  };

  const regenerateApiKey = () => {
    // Ask for confirmation before regenerating
    if (window.confirm("Regenerating will invalidate your current API key. Any integrations using this key will stop working. Are you sure you want to continue?")) {
      generateApiKey();
    }
  };

  const handleCopyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopyText("Copied!");
      
      toast({
        title: "Copied to Clipboard",
        description: "Your API key has been copied to clipboard.",
      });
      
      setTimeout(() => setCopyText("Copy"), 2000);
    }
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  // Mask API key for display
  const getMaskedKey = () => {
    if (!apiKey) return "";
    if (showKey) return apiKey;
    
    const prefix = apiKey.substring(0, 8);
    const suffix = apiKey.substring(apiKey.length - 4);
    return `${prefix}${"•".repeat(apiKey.length - 12)}${suffix}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center h-9 w-9 rounded bg-blue-100 dark:bg-blue-900">
          <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-medium">API Key</p>
          <p className="text-sm text-muted-foreground">Use this key to access Print Genius API</p>
        </div>
      </div>

      {apiKey ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Input 
                value={getMaskedKey()}
                readOnly
                className="pr-10 font-mono text-sm"
              />
              <button
                onClick={toggleShowKey}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                type="button"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button 
              variant="outline" 
              size="icon-sm" 
              onClick={handleCopyKey}
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Alert className="py-2 px-3 text-sm">
              <AlertDescription>
                Keep this key secure! Anyone with this key can access your Print Genius account.
              </AlertDescription>
            </Alert>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={regenerateApiKey}
              disabled={isGenerating}
              className="whitespace-nowrap ml-4"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Regenerate Key
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="default"
          onClick={generateApiKey}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate API Key"
          )}
        </Button>
      )}
    </div>
  );
};

export default ApiKeySection;
