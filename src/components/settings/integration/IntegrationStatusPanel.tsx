
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConnectionStatus } from "./IntegrationItem";
import { CheckCircle, AlertTriangle, XCircle, CircleSlash } from "lucide-react";

interface IntegrationStatusPanelProps {
  integrations: Array<{
    id: string;
    name: string;
    status: ConnectionStatus;
    lastConnected?: string;
  }>;
}

const IntegrationStatusPanel = ({ integrations }: IntegrationStatusPanelProps) => {
  const getStatusIcon = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "connecting":
        return <CircleSlash className="h-4 w-4 text-amber-500 animate-pulse" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "connecting":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "error":
        return "Error";
      case "connecting":
        return "Connecting";
      default:
        return "Disconnected";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Integration Status</CardTitle>
      </CardHeader>
      <CardContent>
        {integrations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No integrations configured yet.</p>
        ) : (
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(integration.status)}
                  <span className="font-medium">{integration.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {integration.lastConnected && integration.status === "connected" && (
                    <span className="text-xs text-muted-foreground">
                      Connected {integration.lastConnected}
                    </span>
                  )}
                  <Badge variant="outline" className={getStatusColor(integration.status)}>
                    {getStatusText(integration.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationStatusPanel;
