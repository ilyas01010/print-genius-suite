
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export interface PreferenceSettingsProps {
  pushNotifications: boolean;
  setPushNotifications: (value: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  savedSettings: boolean;
  handleSaveSettings: () => void;
}

const PreferenceSettings: React.FC<PreferenceSettingsProps> = ({
  pushNotifications,
  setPushNotifications,
  emailNotifications,
  setEmailNotifications,
  savedSettings,
  handleSaveSettings
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for important updates
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails for sales and important alerts
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <Button 
              onClick={handleSaveSettings}
              className="mt-4 w-full"
              disabled={savedSettings}
            >
              {savedSettings ? "Settings Saved" : "Save Preferences"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferenceSettings;
