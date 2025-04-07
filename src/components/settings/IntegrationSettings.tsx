
import React, { useState, useCallback, useEffect } from "react";
import ApiIntegrations from "./integration/ApiIntegrations";
import SocialConnections from "./integration/SocialConnections";
import IntegrationGuide from "./integration/IntegrationGuide";
import IntegrationStatusPanel from "./integration/IntegrationStatusPanel";
import { useIntegrations } from "@/hooks/use-integrations";
import { ConnectionStatus } from "./integration/IntegrationItem";

const IntegrationSettings = () => {
  const { integrationStatuses, updateIntegrationStatus } = useIntegrations();
  const [isGuideVisible, setIsGuideVisible] = useState(true);
  const [formattedStatuses, setFormattedStatuses] = useState<Array<{
    id: string;
    name: string;
    status: ConnectionStatus;
    lastConnected?: string;
  }>>([]);

  // Format integration statuses with additional information
  useEffect(() => {
    const platformNames: Record<string, string> = {
      etsy: "Etsy",
      shopify: "Shopify",
      printful: "Printful",
      twitter: "Twitter",
      facebook: "Facebook",
      instagram: "Instagram"
    };
    
    const formatted = integrationStatuses.map(item => {
      const lastConnected = item.status === "connected" ? new Date().toLocaleDateString() : undefined;
      return {
        id: item.id,
        name: platformNames[item.id] || item.id,
        status: item.status,
        lastConnected
      };
    });
    
    setFormattedStatuses(formatted);
  }, [integrationStatuses]);

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
        {formattedStatuses.length > 0 && (
          <IntegrationStatusPanel integrations={formattedStatuses} />
        )}
        
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
