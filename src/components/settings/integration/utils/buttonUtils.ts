
import { ConnectionStatus } from "../IntegrationItem";

// Get button variant based on status
export const getButtonVariant = (status: ConnectionStatus) => {
  switch (status) {
    case "connected":
      return "subtle";
    case "error":
      return "destructive";
    default:
      return "outline";
  }
};
