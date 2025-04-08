
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import IntegrationCard from "./platform-integrations/IntegrationCard";
import ApiKeyDialog from "./platform-integrations/ApiKeyDialog";

// Mock integrations data
const mockIntegrations = [
  {
    id: "printful",
    name: "Printful",
    description: "Print on demand production and fulfillment",
    status: "connected",
    lastSync: "2023-04-05T14:22:34Z",
    apiKey: "pf_************XXXX",
  },
  {
    id: "etsy",
    name: "Etsy",
    description: "Marketplace for handmade and vintage items",
    status: "connected",
    lastSync: "2023-04-04T10:45:12Z",
    apiKey: "etsy_************XXXX",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce platform for online stores",
    status: "disconnected",
    lastSync: null,
    apiKey: "",
  },
  {
    id: "freepik",
    name: "Freepik",
    description: "Graphic design resources and templates",
    status: "connected",
    lastSync: "2023-04-02T09:33:04Z",
    apiKey: "fpik_************XXXX",
  },
  {
    id: "placeit",
    name: "Placeit",
    description: "Design templates and mockups",
    status: "error",
    lastSync: "2023-04-01T16:15:22Z",
    error: "API key expired",
    apiKey: "plc_************XXXX",
  },
];

const PlatformIntegrations = () => {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [newApiKey, setNewApiKey] = useState("");
  const [editApiKeyOpen, setEditApiKeyOpen] = useState(false);
  const { toast } = useToast();

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Toggle integration status
  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { 
            ...integration, 
            status: integration.status === "connected" ? "disconnected" : "connected" 
          } 
        : integration
    ));

    const integration = integrations.find(i => i.id === id);
    if (!integration) return;

    const newStatus = integration.status === "connected" ? "disconnected" : "connected";
    
    toast({
      title: `${integration.name} ${newStatus === "connected" ? "enabled" : "disabled"}`,
      description: `The ${integration.name} integration has been ${newStatus === "connected" ? "enabled" : "disabled"}.`,
    });

    // Log admin action
    console.log(`Admin action: ${newStatus === "connected" ? "Enabled" : "Disabled"} ${integration.name} integration at ${new Date().toISOString()}`);
  };

  // Toggle API key visibility
  const toggleApiKeyVisibility = (id: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle edit API key
  const handleEditApiKey = (integration: any) => {
    setSelectedIntegration(integration);
    setNewApiKey("");
    setEditApiKeyOpen(true);
  };

  // Save new API key
  const saveApiKey = () => {
    if (!selectedIntegration || !newApiKey.trim()) return;

    setIntegrations(integrations.map(integration => 
      integration.id === selectedIntegration.id 
        ? { 
            ...integration, 
            apiKey: newApiKey,
            status: "connected",
            error: undefined
          } 
        : integration
    ));

    toast({
      title: "API Key updated",
      description: `The API key for ${selectedIntegration.name} has been updated.`,
    });

    // Log admin action
    console.log(`Admin action: Updated API key for ${selectedIntegration.name} at ${new Date().toISOString()}`);
    
    setEditApiKeyOpen(false);
  };

  // Sync integration
  const syncIntegration = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;

    toast({
      title: "Synchronizing",
      description: `Syncing data with ${integration.name}...`,
    });

    // In a real app, this would trigger an actual sync with the platform
    setTimeout(() => {
      setIntegrations(integrations.map(i => 
        i.id === id 
          ? { 
              ...i, 
              lastSync: new Date().toISOString()
            } 
          : i
      ));

      toast({
        title: "Sync complete",
        description: `Successfully synchronized data with ${integration.name}.`,
      });
    }, 2000);

    // Log admin action
    console.log(`Admin action: Synchronized ${integration.name} integration at ${new Date().toISOString()}`);
  };

  // View details (placeholder for now)
  const viewIntegrationDetails = (id: string) => {
    console.log(`View details for integration: ${id}`);
    // In a real app, this could navigate to a detailed view or open a modal
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Platform Integrations</h2>
      <p className="text-muted-foreground">
        Manage your connected POD platforms and design resource providers.
      </p>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            showApiKey={!!showApiKey[integration.id]}
            onToggle={toggleIntegration}
            onSync={syncIntegration}
            onViewDetails={viewIntegrationDetails}
            onEditApiKey={handleEditApiKey}
            onToggleApiKeyVisibility={toggleApiKeyVisibility}
            formatDate={formatDate}
          />
        ))}
      </div>

      <ApiKeyDialog
        open={editApiKeyOpen}
        onOpenChange={setEditApiKeyOpen}
        selectedIntegration={selectedIntegration}
        newApiKey={newApiKey}
        setNewApiKey={setNewApiKey}
        onSave={saveApiKey}
      />
    </div>
  );
};

export default PlatformIntegrations;
