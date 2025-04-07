
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ConnectionStatus } from "@/components/settings/integration/IntegrationItem";
import { useIntegrationApi } from "./use-integration-api";

interface UseIntegrationConnectionProps {
  name: string;
  initialStatus?: ConnectionStatus;
  onStatusChange?: (status: ConnectionStatus) => void;
  onConnect?: () => Promise<boolean>;
  onDisconnect?: () => Promise<boolean>;
}

export const useIntegrationConnection = ({
  name,
  initialStatus = "disconnected",
  onStatusChange,
  onConnect,
  onDisconnect
}: UseIntegrationConnectionProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<ConnectionStatus>(initialStatus);
  const { simulateApiCall } = useIntegrationApi();
  
  const handleConnect = async () => {
    try {
      if (status === "connected") {
        // Handle disconnect
        setStatus("connecting");
        
        if (onStatusChange) {
          onStatusChange("connecting");
        }
        
        // Use custom disconnect handler if provided, otherwise simulate
        const success = onDisconnect ? await onDisconnect() : await simulateApiCall();
        
        if (success) {
          setStatus("disconnected");
          
          toast({
            title: "Disconnected",
            description: `${name} has been disconnected successfully.`,
          });
          
          if (onStatusChange) {
            onStatusChange("disconnected");
          }
        } else {
          setStatus("error");
          
          toast({
            title: "Error",
            description: `Failed to disconnect from ${name}. Please try again.`,
            variant: "destructive"
          });
          
          if (onStatusChange) {
            onStatusChange("error");
          }
          
          // Reset to connected after error
          setTimeout(() => {
            setStatus("connected");
            if (onStatusChange) onStatusChange("connected");
          }, 3000);
        }
        return;
      }
      
      // Handle connect
      setStatus("connecting");
      
      if (onStatusChange) {
        onStatusChange("connecting");
      }
      
      // Use custom connect handler if provided, otherwise simulate
      const success = onConnect ? await onConnect() : await simulateApiCall();
      
      if (success) {
        setStatus("connected");
        
        toast({
          title: "Connected",
          description: `${name} has been successfully connected.`,
        });
        
        if (onStatusChange) {
          onStatusChange("connected");
        }
      } else {
        setStatus("error");
        
        toast({
          title: "Connection Failed",
          description: `Failed to connect to ${name}. Please check your credentials and try again.`,
          variant: "destructive"
        });
        
        if (onStatusChange) {
          onStatusChange("error");
        }
        
        // Reset to disconnected after error
        setTimeout(() => {
          setStatus("disconnected");
          if (onStatusChange) onStatusChange("disconnected");
        }, 3000);
      }
    } catch (error) {
      console.error(`Error during ${name} connection:`, error);
      setStatus("error");
      
      toast({
        title: "Connection Error",
        description: `An unexpected error occurred. Please try again later.`,
        variant: "destructive"
      });
      
      if (onStatusChange) {
        onStatusChange("error");
      }
      
      // Reset to previous state after error
      setTimeout(() => {
        setStatus(status === "connected" ? "connected" : "disconnected");
        if (onStatusChange) onStatusChange(status === "connected" ? "connected" : "disconnected");
      }, 3000);
    }
  };

  return {
    status,
    handleConnect
  };
};
