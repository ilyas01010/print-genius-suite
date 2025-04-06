
import { useState } from "react";
import { ConnectionStatus } from "@/components/settings/integration/IntegrationItem";

interface IntegrationStatus {
  id: string;
  status: ConnectionStatus;
}

export function useIntegrations() {
  const [integrationStatuses, setIntegrationStatuses] = useState<IntegrationStatus[]>([]);

  const updateIntegrationStatus = (id: string, status: ConnectionStatus) => {
    setIntegrationStatuses(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, status } : item);
      } else {
        return [...prev, { id, status }];
      }
    });
  };

  const getIntegrationStatus = (id: string): ConnectionStatus => {
    return integrationStatuses.find(item => item.id === id)?.status || "disconnected";
  };

  return {
    integrationStatuses,
    updateIntegrationStatus,
    getIntegrationStatus
  };
}
