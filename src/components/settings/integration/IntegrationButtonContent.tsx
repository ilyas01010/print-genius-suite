
import React from "react";
import { Check, Loader2, AlertTriangle } from "lucide-react";
import { ConnectionStatus } from "./IntegrationItem";

interface IntegrationButtonContentProps {
  status: ConnectionStatus;
}

const IntegrationButtonContent = ({ status }: IntegrationButtonContentProps) => {
  // Handle the display of connecting status with proper text
  const getConnectingText = () => {
    // Since we can't compare "connecting" with "connected" directly (they're different string literals),
    // we need to determine the proper text based solely on the status
    if (status === "connecting") {
      return "Connecting...";
    } else {
      return "Disconnecting...";
    }
  };

  switch (status) {
    case "connecting":
      return (
        <>
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          {getConnectingText()}
        </>
      );
    case "connected":
      return (
        <>
          <Check className="h-3 w-3 mr-1" />
          Connected
        </>
      );
    case "error":
      return (
        <>
          <AlertTriangle className="h-3 w-3 mr-1" />
          Retry
        </>
      );
    default:
      return <>Connect</>;
  }
};

export default IntegrationButtonContent;
