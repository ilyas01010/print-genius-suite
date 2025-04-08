
import React from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BadgeCheck, RefreshCw, AlertTriangle, ChevronRight, Key, Eye, EyeOff } from "lucide-react";

interface IntegrationCardProps {
  integration: {
    id: string;
    name: string;
    description: string;
    status: string;
    lastSync: string | null;
    apiKey: string;
    error?: string;
  };
  showApiKey: boolean;
  onToggle: (id: string) => void;
  onSync: (id: string) => void;
  onViewDetails: (id: string) => void;
  onEditApiKey: (integration: any) => void;
  onToggleApiKeyVisibility: (id: string) => void;
  formatDate: (date: string | null) => string;
}

const IntegrationCard = ({
  integration,
  showApiKey,
  onToggle,
  onSync,
  onViewDetails,
  onEditApiKey,
  onToggleApiKeyVisibility,
  formatDate
}: IntegrationCardProps) => {
  return (
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
            onCheckedChange={() => onToggle(integration.id)}
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
                  {showApiKey ? integration.apiKey : integration.apiKey.replace(/[^.]/g, '*')}
                </span>
              ) : (
                <span className="text-xs italic">Not set</span>
              )}
              {integration.apiKey && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onToggleApiKeyVisibility(integration.id)}
                  className="h-6 px-2"
                >
                  {showApiKey ? (
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
              onClick={() => onEditApiKey(integration)}
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
              onClick={() => onSync(integration.id)}
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
        <Button variant="ghost" size="sm" className="gap-1" onClick={() => onViewDetails(integration.id)}>
          View Details <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationCard;
