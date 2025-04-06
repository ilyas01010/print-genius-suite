
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2 } from "lucide-react";

// Updated type definition to include all possible states
export type ConnectionStatus = "connected" | "disconnected" | "connecting";

interface IntegrationItemProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  isPopular?: boolean;
  initialStatus?: ConnectionStatus;
  onStatusChange?: (status: ConnectionStatus) => void;
}

const IntegrationItem = ({ 
  name, 
  description, 
  icon, 
  bgColor, 
  isPopular,
  initialStatus = "disconnected",
  onStatusChange 
}: IntegrationItemProps) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(initialStatus === "connected");

  const handleConnect = async () => {
    if (connected) {
      // Handle disconnect
      setConnecting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setConnected(false);
      setConnecting(false);
      
      toast({
        title: "Disconnected",
        description: `${name} has been disconnected.`,
      });
      
      if (onStatusChange) {
        onStatusChange("disconnected");
      }
      return;
    }
    
    // Handle connect
    setConnecting(true);
    
    if (onStatusChange) {
      onStatusChange("connecting");
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setConnected(true);
    setConnecting(false);
    
    toast({
      title: "Connected",
      description: `${name} has been successfully connected.`,
    });
    
    if (onStatusChange) {
      onStatusChange("connected");
    }
  };

  // Get status from state
  const status: ConnectionStatus = connecting 
    ? "connecting" 
    : connected ? "connected" : "disconnected";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <div className="flex items-center">
            <p className="font-medium text-sm sm:text-base">{name}</p>
            {isPopular && (
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button 
        variant={status === "connected" ? "subtle" : "outline"} 
        size="sm"
        onClick={handleConnect}
        disabled={status === "connecting"}
      >
        {status === "connecting" ? (
          <>
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            {connected ? "Disconnecting..." : "Connecting..."}
          </>
        ) : status === "connected" ? (
          <>
            <Check className="h-3 w-3 mr-1" />
            Connected
          </>
        ) : (
          "Connect"
        )}
      </Button>
    </div>
  );
};

export default IntegrationItem;
