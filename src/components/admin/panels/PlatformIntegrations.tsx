
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, RefreshCw, AlertTriangle, ChevronRight, Key, Eye, EyeOff } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Platform Integrations</h2>
      <p className="text-muted-foreground">
        Manage your connected POD platforms and design resource providers.
      </p>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className={integration.status === "error" ? "border-destructive" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {integration.name}
                    {integration.status === "connected" && <BadgeCheck className="h-5 w-5 text-green-600" />}
                  </CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </div>
                <Switch
                  id={`${integration.id}-toggle`}
                  checked={integration.status === "connected"}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                  disabled={integration.status === "error"}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">API Key:</span>
                    {integration.apiKey ? (
                      <span className="font-mono text-xs">
                        {showApiKey[integration.id] ? integration.apiKey : integration.apiKey.replace(/[^.]/g, '*')}
                      </span>
                    ) : (
                      <span className="text-xs italic">Not set</span>
                    )}
                    {integration.apiKey && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleApiKeyVisibility(integration.id)}
                        className="h-6 px-2"
                      >
                        {showApiKey[integration.id] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditApiKey(integration)}
                  >
                    {integration.apiKey ? "Change" : "Add"} API Key
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last sync:</span>
                    <span className="text-xs">{formatDate(integration.lastSync)}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => syncIntegration(integration.id)}
                    disabled={integration.status !== "connected"}
                  >
                    Sync Now
                  </Button>
                </div>
                {integration.error && (
                  <div className="flex items-start gap-2 bg-destructive/10 p-2 rounded">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Error</p>
                      <p className="text-xs">{integration.error}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t pt-4">
              <Button variant="ghost" size="sm" className="gap-1">
                View Details <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit API Key Dialog */}
      <Dialog open={editApiKeyOpen} onOpenChange={setEditApiKeyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedIntegration?.apiKey ? "Update" : "Add"} API Key
            </DialogTitle>
            <DialogDescription>
              {selectedIntegration?.apiKey
                ? `Change the API key for ${selectedIntegration?.name}.`
                : `Add an API key to connect to ${selectedIntegration?.name}.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter API key"
                className="font-mono"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              API keys are encrypted and stored securely. Never share your API keys.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditApiKeyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveApiKey} disabled={!newApiKey.trim()}>
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlatformIntegrations;
