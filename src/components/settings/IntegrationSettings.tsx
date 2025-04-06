
import React from "react";
import ApiIntegrations from "./integration/ApiIntegrations";
import SocialConnections from "./integration/SocialConnections";

const IntegrationSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Integration Settings</h2>
      <p className="text-muted-foreground">
        Manage your connected services and API integrations
      </p>
      <div className="space-y-4">
        <ApiIntegrations />
        <SocialConnections />
      </div>
    </div>
  );
};

export default IntegrationSettings;
