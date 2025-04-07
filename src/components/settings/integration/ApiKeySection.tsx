
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, RefreshCw, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIntegrationApi } from "@/hooks/use-integration-api";

const ApiKeySection = () => {
  const { toast } = useToast();
  const { generateApiKey, validateApiKey } = useIntegrationApi();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  // Load API key from localStorage on component mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("printGenius_api_key");
      if (storedKey) {
        setApiKey(storedKey);
        // Store last generated date if it exists
        const lastGenDate = localStorage.getItem("printGenius_api_key_generated");
        if (lastGenDate) {
          setLastGenerated(lastGenDate);
        }
      }
    } catch (error) {
      console.error("Error loading API key:", error);
    }
  }, []);

  const generateNewApiKey = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newApiKey = generateApiKey();
      const currentDate = new Date().toISOString();
      
      // Store in localStorage for persistence
      try {
        localStorage.setItem("printGenius_api_key", newApiKey);
        localStorage.setItem("printGenius_api_key_generated", currentDate);
        setApiKey(newApiKey);
        setLastGenerated(currentDate);
      } catch (error) {
        console.error("Error storing API key:", error);
      }
      
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
      generateNewApiKey();
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

  // Format date for display
  const formatDate = (isoDate: string) => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      return "Unknown";
    }
  };

  // Mask API key for display
  const getMaskedKey = () => {
    if (!apiKey) return "";
    if (showKey) return apiKey;
    
    const prefix = apiKey.substring(0, 8);
    const suffix = apiKey.substring(apiKey.length - 4);
    return `${prefix}${"•".repeat(apiKey.length - 12)}${suffix}`;
  };

  // Validate the current API key
  const isValidKey = apiKey ? validateApiKey(apiKey) : false;

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
          
          {lastGenerated && (
            <div className="flex items-center text-xs text-muted-foreground">
              {isValidKey ? (
                <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-500" />
              )}
              Generated on {formatDate(lastGenerated)}
            </div>
          )}
          
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
          onClick={generateNewApiKey}
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
