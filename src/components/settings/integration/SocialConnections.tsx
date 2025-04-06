
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import IntegrationItem from "./IntegrationItem";

const SocialConnections = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Manage your social logins and connected accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <IntegrationItem
          name="Facebook"
          description="Not Connected"
          bgColor="bg-blue-100"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
              <path fill="#039BE5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/>
              <path fill="#FFF" d="M26.572,29.036h4.917l0,0C11.263,29.036,13,27.036,13,19.036C12.948,16.432,11.263,14.432,8.526,14.432S4,16.432,4,19.036C4,21.636,5.736,23.636,8.421,23.636z"/>
            </svg>
          }
        />
        
        <IntegrationItem
          name="GitHub"
          description="Not Connected"
          bgColor="bg-gray-100"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
              <path fill="#212121" d="M24.5,2C12.9,2,3.5,11.4,3.5,23c0,9.4,6.2,17.3,14.8,20.1c1.1,0.2,1.5-0.5,1.5-1c0-0.5,0-2.1,0-4c-6,1.3-7.2-2.9-7.2-2.9c-1-2.5-2.4-3.1-2.4-3.1c-2-1.3,0.1-1.3,0.1-1.3c2.2,0.2,3.3,2.2,3.3,2.2c1.9,3.3,5.1,2.4,6.3,1.8c0.2-1.4,0.8-2.4,1.4-2.9c-4.8-0.5-9.8-2.4-9.8-10.7c0-2.4,0.8-4.3,2.2-5.8c-0.2-0.6-1-2.8,0.2-5.8c0,0,1.8-0.6,5.9,2.2c1.7-0.5,3.6-0.7,5.4-0.7c1.8,0,3.7,0.2,5.4,0.7c4.1-2.8,5.8-2.2,5.8-2.2c1.2,3,0.4,5.3,0.2,5.8c1.4,1.5,2.2,3.4,2.2,5.8c0,8.3-5,10.2-9.8,10.7c0.8,0.7,1.5,2,1.5,4.1c0,2.9,0,5.3,0,6c0,0.6,0.4,1.3,1.5,1C41.8,40.3,48,32.4,48,23C48,11.4,38.6,2,27,2z"/>
            </svg>
          }
        />
        
        <IntegrationItem
          name="LinkedIn"
          description="Not Connected"
          bgColor="bg-blue-100"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="24" width="24">
              <path fill="#0288D1" d="M8.421,14h0.052l0,0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5S4,6.945,4,9.5C4,12,5.736,14,8.421,14z"/>
              <polygon fill="#0288D1" points="4,17 13,17 13,39 4,39"/>
              <path fill="#0288D1" d="M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v22h9V28l0,0c0-2.209,1.791-4,4-4s4,1.791,4,4v11h9C44,39,44,27.955,44,26.5z"/>
            </svg>
          }
        />
      </CardContent>
    </Card>
  );
};

export default SocialConnections;
