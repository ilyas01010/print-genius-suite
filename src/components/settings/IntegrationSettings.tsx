
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IntegrationSettings = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded bg-orange-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                    <path fill="#F06292" d="M29.5,24.3c0-0.2,0.1-0.3,0.1-0.3s0,0,0,0c0-0.4,0-0.6,0-0.8c0-0.8-0.1-1.4-0.3-2c-0.5-1.5-1.5-1.9-1.9-2 c-0.2-0.1-0.4-0.1-0.6-0.1c-0.1,0-0.3,0-0.4,0l0,0c-0.4,0-0.9-0.1-1.7-0.1c-0.3,0-0.5,0-0.8,0c-1.5,0-2.5,0.1-3.3,0.7 c-0.4,0.3-0.8,0.6-1,1.3c0,0.1-0.1,0.1-0.1,0.2c0,0,0,0.1,0,0.1l0,0c0,0,0,0,0,0c-0.2,0.7-0.4,1.8-0.4,3.5c0,1.8,0.2,3.8,0.6,6 c0.1,0.8,0.3,1.5,0.4,2.1c0.1,0.6,0.3,1.2,0.4,1.5c0.5,1.5,1.8,1.5,2.5,1.5c0.3,0,0.6,0,0.9-0.1c0.2-0.1,0.4-0.1,0.6-0.1 c0.2,0,0.4,0,0.6,0.1h0.1c0.3,0.1,0.6,0.4,1,2c0.4,1.6,0.7,3.7,0.7,4.7c0,0.3,0,0.5,0,0.7c0,0.2,0,0.3,0,0.5c0,0.2,0,0.3,0,0.5 c0,0.3-0.1,0.5-0.1,0.7c-0.1,0.7-0.6,2.4-2.2,2.4c-0.1,0-0.3,0-0.4,0c-0.2,0-0.4-0.1-0.6-0.1c-0.4-0.1-0.7-0.2-1.1-0.2 c-0.6,0-1,0.2-1.3,0.8c-0.2,0.4-0.2,0.9,0,1.6c0.1,0.3,0.3,0.7,0.5,1c0.9,1.2,2.4,1.8,4.7,1.8c0.6,0,1.2,0,1.9-0.1l0,0 c0.4,0,0.7-0.1,1.1-0.2c2.3-0.5,3.6-1.8,3.9-4c0.1-0.6,0.2-1.3,0.2-2.3c0-0.8-0.1-1.8-0.2-2.9c-0.1-0.9-0.3-1.9-0.5-3 c-0.1-0.5-0.2-0.9-0.2-1.3c-0.1-0.4-0.2-0.8-0.3-1.2c-0.3-1-0.6-1.6-0.8-2c0.3-0.1,0.5-0.3,0.7-0.4c1.2-0.9,1.9-2.4,1.9-4.1 C31,27.4,30.5,25.6,29.5,24.3L29.5,24.3z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Etsy</p>
                  <p className="text-sm text-muted-foreground">Upload designs directly to Etsy listings</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Integration Coming Soon",
                    description: "Etsy integration will be available soon.",
                  });
                }}
              >
                Connect
              </Button>
            </div>
            
            {/* Shopify Integration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                    <path fill="#7CB342" d="M37.216,16.844c-0.064-0.139-0.254-0.207-0.517-0.207c-0.269,0-0.588,0.081-0.928,0.227 c-0.519-1.528-1.438-2.927-3.055-2.927c-0.145,0-0.298,0.003-0.446,0.02c-0.672-0.882-1.513-1.271-2.238-1.271 c-5.523,0-8.169,6.908-8.986,10.421c-2.153,0.664-3.653,1.125-3.731,1.148c-1.103,0.346-1.139,0.382-1.283,1.428 c-0.109,0.778-2.933,22.725-2.933,22.725L32.797,42L37.216,16.844z M28.935,15.788c-0.271,0.087-0.58,0.179-0.916,0.281v-0.596 c0-1.21-0.807-1.757-1.518-1.757C25.25,13.717,24,14.55,24,16.432c0,1.071,0.573,2.033,1.325,2.502 c-0.614,1.957-1.52,4.748-2.491,7.295c-1.297,3.074-1.945,4.254-2.38,4.058c-0.548-0.248-0.304-2.723,0.227-5.167 c0.469-1.861,1.106-3.547,1.106-3.547s-0.867-0.655-2.419-0.655c-2.03,0-2.136,1.277-2.136,1.587c0,0.697,0.867,3.44-0.199,9.32 C16.58,35.578,15.3,37.37,14.428,37.37c-1.63,0-1.162-7.686-0.076-12.653c0.448-2.044,1.489-5.195,1.488-5.257 c0-0.591-1.194-0.902-1.887-0.902c-1.258,0-1.566,0.589-1.718,0.589c-0.149,0-0.708-0.115-0.708-0.583 c0-0.518,0.93-1.256,2.391-1.256c1.828,0,3.031,0.639,3.864,1.461c1.616-0.981,4.127-1.4,4.194-1.4c0.25,0,0.79,0.019,0.79,0.513 c0,0.906-4.958,1.897-4.958,5.149c0,0.24,0,0.495,0.019,0.756c0.026-0.047,0.053-0.089,0.08-0.134 c1.939-3.764,5.316-6.788,7.222-6.788c0.241,0,0.5,0.045,0.723,0.151c0.437,0.245,0.696,0.708,0.745,1.339 c0.47,0.06,0.908,0.151,1.294,0.262c0.466-0.576,1.328-1.066,2.339-0.877c1.17,0.22,1.776,1.362,1.776,2.723 C31.795,20.735,30.174,18.62,28.935,15.788z M29.044,18.88c0.188-0.386,0.243-0.528,0.307-0.542 c0.263-0.055,0.429,0.405,0.62,1.31c0.121,0.579,0.277,1.245,0.665,2.014c0.046,0.092,0.104,0.203,0.164,0.323 c0.19-1.168,0.395-2.548,0.524-3.956C31.738,17.894,30.306,18.343,29.044,18.88z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Shopify</p>
                  <p className="text-sm text-muted-foreground">Sync product listings with Shopify store</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Integration Coming Soon",
                    description: "Shopify integration will be available soon.",
                  });
                }}
              >
                Connect
              </Button>
            </div>
            
            {/* Printful Integration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                    <path fill="#1E88E5" d="M24,6C14.061,6,6,14.061,6,24s8.061,18,18,18s18-8.061,18-18S33.939,6,24,6z M24,13 c5.514,0,10,4.486,10,10c0,5.514-4.486,10-10,10c-5.514,0-10-4.486-10-10C14,17.486,18.486,13,24,13z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Printful</p>
                  <p className="text-sm text-muted-foreground">Connect with Printful for print-on-demand</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Integration Coming Soon",
                    description: "Printful integration will be available soon.",
                  });
                }}
              >
                Connect
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Your API Key</p>
                  <p className="text-sm text-muted-foreground">Use this key to access Print Genius API</p>
                </div>
              </div>
              <Button 
                variant="secondary"
                onClick={() => {
                  const apiKey = `pg_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
                  navigator.clipboard.writeText(apiKey);
                  toast({
                    title: "API Key Generated",
                    description: "Your new API key has been copied to clipboard.",
                  });
                }}
              >
                Generate Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your social logins and connected accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                  <path fill="#039BE5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/>
                  <path fill="#FFF" d="M26.572,29.036h4.917l0,0C11.263,29.036,13,27.036,13,19.036C12.948,16.432,11.263,14.432,8.526,14.432S4,16.432,4,19.036C4,21.636,5.736,23.636,8.421,23.636z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium">Facebook</p>
                <p className="text-sm text-muted-foreground">Not Connected</p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Integration Coming Soon",
                  description: "Facebook integration will be available soon.",
                });
              }}
            >
              Connect
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                  <path fill="#212121" d="M24.5,2C12.9,2,3.5,11.4,3.5,23c0,9.4,6.2,17.3,14.8,20.1c1.1,0.2,1.5-0.5,1.5-1c0-0.5,0-2.1,0-4c-6,1.3-7.2-2.9-7.2-2.9c-1-2.5-2.4-3.1-2.4-3.1c-2-1.3,0.1-1.3,0.1-1.3c2.2,0.2,3.3,2.2,3.3,2.2c1.9,3.3,5.1,2.4,6.3,1.8c0.2-1.4,0.8-2.4,1.4-2.9c-4.8-0.5-9.8-2.4-9.8-10.7c0-2.4,0.8-4.3,2.2-5.8c-0.2-0.6-1-2.8,0.2-5.8c0,0,1.8-0.6,5.9,2.2c1.7-0.5,3.6-0.7,5.4-0.7c1.8,0,3.7,0.2,5.4,0.7c4.1-2.8,5.8-2.2,5.8-2.2c1.2,3,0.4,5.3,0.2,5.8c1.4,1.5,2.2,3.4,2.2,5.8c0,8.3-5,10.2-9.8,10.7c0.8,0.7,1.5,2,1.5,4.1c0,2.9,0,5.3,0,6c0,0.6,0.4,1.3,1.5,1C41.8,40.3,48,32.4,48,23C48,11.4,38.6,2,27,2z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-muted-foreground">Not Connected</p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Integration Coming Soon",
                  description: "GitHub integration will be available soon.",
                });
              }}
            >
              Connect
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
                  <path fill="#0288D1" d="M8.421,14h0.052l0,0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5S4,6.945,4,9.5C4,12,5.736,14,8.421,14z"/>
                  <polygon fill="#0288D1" points="4,17 13,17 13,39 4,39"/>
                  <path fill="#0288D1" d="M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v22h9V28l0,0c0-2.209,1.791-4,4-4s4,1.791,4,4v11h9C44,39,44,27.955,44,26.5z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium">LinkedIn</p>
                <p className="text-sm text-muted-foreground">Not Connected</p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Integration Coming Soon",
                  description: "LinkedIn integration will be available soon.",
                });
              }}
            >
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
