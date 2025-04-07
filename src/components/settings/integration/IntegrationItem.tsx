import React from "react";
import { Button } from "@/components/ui/button";
import { useIntegrationConnection } from "@/hooks/use-integration-connection";
import IntegrationButtonContent from "./IntegrationButtonContent";
import { getButtonVariant } from "./utils/buttonUtils";

export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "error";

interface IntegrationItemProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  isPopular?: boolean;
  initialStatus?: ConnectionStatus;
  onStatusChange?: (status: ConnectionStatus) => void;
  onConnect?: () => Promise<boolean>;
  onDisconnect?: () => Promise<boolean>;
}

const IntegrationItem = ({ 
  name, 
  description, 
  icon, 
  bgColor, 
  isPopular,
  initialStatus = "disconnected",
  onStatusChange,
  onConnect,
  onDisconnect
}: IntegrationItemProps) => {
  const { status, handleConnect } = useIntegrationConnection({
    name,
    initialStatus,
    onStatusChange,
    onConnect,
    onDisconnect
  });

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
        variant={getButtonVariant(status)} 
        size="sm"
        onClick={handleConnect}
        disabled={status === "connecting"}
      >
        <IntegrationButtonContent status={status} />
      </Button>
    </div>
  );
};

export default IntegrationItem;
