
import React from "react";
import ApiIntegrations from "./integration/ApiIntegrations";
import SocialConnections from "./integration/SocialConnections";
import { useIntegrations } from "@/hooks/use-integrations";

const IntegrationSettings = () => {
  const { integrationStatuses, updateIntegrationStatus } = useIntegrations();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Integration Settings</h2>
      <p className="text-muted-foreground">
        Manage your connected services and API integrations
      </p>
      <div className="space-y-4">
        <ApiIntegrations 
          integrationStatuses={integrationStatuses}
          onStatusChange={updateIntegrationStatus}
        />
        <SocialConnections 
          integrationStatuses={integrationStatuses}
          onStatusChange={updateIntegrationStatus}
        />
      </div>
    </div>
  );
};

export default IntegrationSettings;
