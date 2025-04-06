
import React from "react";
import ApiIntegrations from "./integration/ApiIntegrations";
import SocialConnections from "./integration/SocialConnections";

const IntegrationSettings = () => {
  return (
    <div className="space-y-4">
      <ApiIntegrations />
      <SocialConnections />
    </div>
  );
};

export default IntegrationSettings;
