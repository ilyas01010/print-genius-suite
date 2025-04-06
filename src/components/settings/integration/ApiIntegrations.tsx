
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import IntegrationItem, { ConnectionStatus } from "./IntegrationItem";
import ApiKeySection from "./ApiKeySection";

// Define interfaces for props
interface ApiIntegrationsProps {
  integrationStatuses?: Array<{ id: string; status: ConnectionStatus }>;
  onStatusChange?: (id: string, status: ConnectionStatus) => void;
}

const ApiIntegrations = ({ integrationStatuses = [], onStatusChange }: ApiIntegrationsProps) => {
  // Helper function to get status of a specific integration
  const getIntegrationStatus = (id: string): ConnectionStatus => {
    const integration = integrationStatuses.find(item => item.id === id);
    return integration?.status || "disconnected";
  };

  // Handler for status changes
  const handleStatusChange = (id: string) => (status: ConnectionStatus) => {
    if (onStatusChange) {
      onStatusChange(id, status);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integrations</CardTitle>
        <CardDescription>
          Connect external services and APIs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {/* Etsy Integration */}
          <IntegrationItem
            name="Etsy"
            description="Upload designs directly to Etsy listings"
            bgColor="bg-orange-100"
            initialStatus={getIntegrationStatus("etsy")}
            onStatusChange={handleStatusChange("etsy")}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                <path fill="#F06292" d="M29.5,24.3c0-0.2,0.1-0.3,0.1-0.3s0,0,0,0c0-0.4,0-0.6,0-0.8c0-0.8-0.1-1.4-0.3-2c-0.5-1.5-1.5-1.9-1.9-2 c-0.2-0.1-0.4-0.1-0.6-0.1c-0.1,0-0.3,0-0.4,0l0,0c-0.4,0-0.9-0.1-1.7-0.1c-0.3,0-0.5,0-0.8,0c-1.5,0-2.5,0.1-3.3,0.7 c-0.4,0.3-0.8,0.6-1,1.3c0,0.1-0.1,0.1-0.1,0.2c0,0,0,0.1,0,0.1l0,0c0,0,0,0,0,0c-0.2,0.7-0.4,1.8-0.4,3.5c0,1.8,0.2,3.8,0.6,6 c0.1,0.8,0.3,1.5,0.4,2.1c0.1,0.6,0.3,1.2,0.4,1.5c0.5,1.5,1.8,1.5,2.5,1.5c0.3,0,0.6,0,0.9-0.1c0.2-0.1,0.4-0.1,0.6-0.1 c0.2,0,0.4,0,0.6,0.1h0.1c0.3,0.1,0.6,0.4,1,2c0.4,1.6,0.7,3.7,0.7,4.7c0,0.3,0,0.5,0,0.7c0,0.2,0,0.3,0,0.5c0,0.2,0,0.3,0,0.5 c0,0.3-0.1,0.5-0.1,0.7c-0.1,0.7-0.6,2.4-2.2,2.4c-0.1,0-0.3,0-0.4,0c-0.2,0-0.4-0.1-0.6-0.1c-0.4-0.1-0.7-0.2-1.1-0.2 c-0.6,0-1,0.2-1.3,0.8c-0.2,0.4-0.2,0.9,0,1.6c0.1,0.3,0.3,0.7,0.5,1c0.9,1.2,2.4,1.8,4.7,1.8c0.6,0,1.2,0,1.9-0.1l0,0 c0.4,0,0.7-0.1,1.1-0.2c2.3-0.5,3.6-1.8,3.9-4c0.1-0.6,0.2-1.3,0.2-2.3c0-0.8-0.1-1.8-0.2-2.9c-0.1-0.9-0.3-1.9-0.5-3 c-0.1-0.5-0.2-0.9-0.2-1.3c-0.1-0.4-0.2-0.8-0.3-1.2c-0.3-1-0.6-1.6-0.8-2c0.3-0.1,0.5-0.3,0.7-0.4c1.2-0.9,1.9-2.4,1.9-4.1 C31,27.4,30.5,25.6,29.5,24.3L29.5,24.3z"/>
              </svg>
            }
          />
          
          {/* Shopify Integration */}
          <IntegrationItem
            name="Shopify"
            description="Sync product listings with Shopify store"
            bgColor="bg-green-100"
            initialStatus={getIntegrationStatus("shopify")}
            onStatusChange={handleStatusChange("shopify")}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                <path fill="#7CB342" d="M37.216,16.844c-0.064-0.139-0.254-0.207-0.517-0.207c-0.269,0-0.588,0.081-0.928,0.227 c-0.519-1.528-1.438-2.927-3.055-2.927c-0.145,0-0.298,0.003-0.446,0.02c-0.672-0.882-1.513-1.271-2.238-1.271 c-5.523,0-8.169,6.908-8.986,10.421c-2.153,0.664-3.653,1.125-3.731,1.148c-1.103,0.346-1.139,0.382-1.283,1.428 c-0.109,0.778-2.933,22.725-2.933,22.725L32.797,42L37.216,16.844z M28.935,15.788c-0.271,0.087-0.58,0.179-0.916,0.281v-0.596 c0-1.21-0.807-1.757-1.518-1.757C25.25,13.717,24,14.55,24,16.432c0,1.071,0.573,2.033,1.325,2.502 c-0.614,1.957-1.52,4.748-2.491,7.295c-1.297,3.074-1.945,4.254-2.38,4.058c-0.548-0.248-0.304-2.723,0.227-5.167 c0.469-1.861,1.106-3.547,1.106-3.547s-0.867-0.655-2.419-0.655c-2.03,0-2.136,1.277-2.136,1.587c0,0.697,0.867,3.44-0.199,9.32 C16.58,35.578,15.3,37.37,14.428,37.37c-1.63,0-1.162-7.686-0.076-12.653c0.448-2.044,1.489-5.195,1.488-5.257 c0-0.591-1.194-0.902-1.887-0.902c-1.258,0-1.566,0.589-1.718,0.589c-0.149,0-0.708-0.115-0.708-0.583 c0-0.518,0.93-1.256,2.391-1.256c1.828,0,3.031,0.639,3.864,1.461c1.616-0.981,4.127-1.4,4.194-1.4c0.25,0,0.79,0.019,0.79,0.513 c0,0.906-4.958,1.897-4.958,5.149c0,0.24,0,0.495,0.019,0.756c0.026-0.047,0.053-0.089,0.08-0.134 c1.939-3.764,5.316-6.788,7.222-6.788c0.241,0,0.5,0.045,0.723,0.151c0.437,0.245,0.696,0.708,0.745,1.339 c0.47,0.06,0.908,0.151,1.294,0.262c0.466-0.576,1.328-1.066,2.339-0.877c1.17,0.22,1.776,1.362,1.776,2.723 C31.795,20.735,30.174,18.62,28.935,15.788z M29.044,18.88c0.188-0.386,0.243-0.528,0.307-0.542 c0.263-0.055,0.429,0.405,0.62,1.31c0.121,0.579,0.277,1.245,0.665,2.014c0.046,0.092,0.104,0.203,0.164,0.323 c0.19-1.168,0.395-2.548,0.524-3.956C31.738,17.894,30.306,18.343,29.044,18.88z"/>
              </svg>
            }
          />
          
          {/* Printful Integration */}
          <IntegrationItem
            name="Printful"
            description="Connect with Printful for print-on-demand"
            bgColor="bg-blue-100"
            initialStatus={getIntegrationStatus("printful")}
            onStatusChange={handleStatusChange("printful")}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                <path fill="#1E88E5" d="M24,6C14.061,6,6,14.061,6,24s8.061,18,18,18s18-8.061,18-18S33.939,6,24,6z M24,13 c5.514,0,10,4.486,10,10c0,5.514-4.486,10-10,10c-5.514,0-10-4.486-10-10C14,17.486,18.486,13,24,13z"/>
              </svg>
            }
          />
          
          <Separator className="my-4" />
          
          <ApiKeySection />
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiIntegrations;
