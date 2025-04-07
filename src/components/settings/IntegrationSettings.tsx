
import React, { useState, useCallback } from "react";
import ApiIntegrations from "./integration/ApiIntegrations";
import SocialConnections from "./integration/SocialConnections";
import IntegrationGuide from "./integration/IntegrationGuide";
import { useIntegrations } from "@/hooks/use-integrations";
import { ConnectionStatus } from "./integration/IntegrationItem";

const IntegrationSettings = () => {
  const { integrationStatuses, updateIntegrationStatus } = useIntegrations();
  const [isGuideVisible, setIsGuideVisible] = useState(true);

  // Handler for integration status changes
  const handleStatusChange = useCallback((id: string, status: ConnectionStatus) => {
    updateIntegrationStatus(id, status);
  }, [updateIntegrationStatus]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Integration Settings</h2>
      <p className="text-muted-foreground">
        Manage your connected services and API integrations
      </p>
      <div className="space-y-6">
        <ApiIntegrations 
          integrationStatuses={integrationStatuses}
          onStatusChange={handleStatusChange}
        />
        
        {isGuideVisible && (
          <IntegrationGuide />
        )}
        
        <SocialConnections 
          integrationStatuses={integrationStatuses}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default IntegrationSettings;
