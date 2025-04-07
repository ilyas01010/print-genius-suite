
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle } from "lucide-react";

const SystemSettings = () => {
  const { toast } = useToast();
  
  // General Settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [signupsEnabled, setSignupsEnabled] = useState(true);
  const [appName, setAppName] = useState("Print Genius Suite");
  const [supportEmail, setSupportEmail] = useState("support@printgenius.com");
  
  // Security Settings
  const [mfaRequired, setMfaRequired] = useState(false);
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(true);
  const [rateLimitAttempts, setRateLimitAttempts] = useState("5");
  const [rateLimitPeriod, setRateLimitPeriod] = useState("15");
  
  // Notification Settings
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [slackIntegrationEnabled, setSlackIntegrationEnabled] = useState(false);
  const [slackWebhookUrl, setSlackWebhookUrl] = useState("");
  
  // Platform Settings
  const [platformFeePercentage, setPlatformFeePercentage] = useState("5");
  const [minWithdrawalAmount, setMinWithdrawalAmount] = useState("25");
  const [autoApproveContent, setAutoApproveContent] = useState(false);
  
  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated successfully.`,
    });

    // Log admin action
    console.log(`Admin action: Updated ${section.toLowerCase()} settings at ${new Date().toISOString()}`);
  };
  
  const handleEnableMaintenanceMode = () => {
    const newValue = !maintenanceMode;
    setMaintenanceMode(newValue);
    
    toast({
      title: newValue ? "Maintenance mode enabled" : "Maintenance mode disabled",
      description: newValue 
        ? "The site is now in maintenance mode. Only admins can access it." 
        : "Maintenance mode has been disabled. The site is now accessible to all users.",
      variant: newValue ? "destructive" : "default",
    });

    // Log admin action
    console.log(`Admin action: ${newValue ? 'Enabled' : 'Disabled'} maintenance mode at ${new Date().toISOString()}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Settings</h2>
      <p className="text-muted-foreground">
        Manage system-wide settings for your application.
      </p>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic configuration for your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input
                  id="app-name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="signups-enabled"
                  checked={signupsEnabled}
                  onCheckedChange={setSignupsEnabled}
                />
                <Label htmlFor="signups-enabled">Allow new user signups</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("General")}>Save Settings</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Maintenance Mode
              </CardTitle>
              <CardDescription>
                Enable maintenance mode to temporarily take the site offline for upgrades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={handleEnableMaintenanceMode}
                />
                <Label htmlFor="maintenance-mode">
                  {maintenanceMode ? "Maintenance mode is active" : "Site is currently online"}
                </Label>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                When enabled, only administrators will be able to access the site. All other users will see a maintenance page.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security features and access controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="mfa-required"
                  checked={mfaRequired}
                  onCheckedChange={setMfaRequired}
                />
                <Label htmlFor="mfa-required">Require multi-factor authentication for all users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="ip-whitelist"
                  checked={ipWhitelistEnabled}
                  onCheckedChange={setIpWhitelistEnabled}
                />
                <Label htmlFor="ip-whitelist">Enable IP whitelisting for admin access</Label>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="rate-limiting">
                  <AccordionTrigger>Rate Limiting Settings</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rate-limit-attempts">Login Attempts Before Lockout</Label>
                        <Input
                          id="rate-limit-attempts"
                          type="number"
                          min="1"
                          max="10"
                          value={rateLimitAttempts}
                          onChange={(e) => setRateLimitAttempts(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rate-limit-period">Lockout Period (minutes)</Label>
                        <Input
                          id="rate-limit-period"
                          type="number"
                          min="5"
                          max="60"
                          value={rateLimitPeriod}
                          onChange={(e) => setRateLimitPeriod(e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      After {rateLimitAttempts} failed login attempts, users will be locked out for {rateLimitPeriod} minutes.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("Security")}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-notifications"
                  checked={emailNotificationsEnabled}
                  onCheckedChange={setEmailNotificationsEnabled}
                />
                <Label htmlFor="email-notifications">Send email notifications</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="slack-integration"
                  checked={slackIntegrationEnabled}
                  onCheckedChange={setSlackIntegrationEnabled}
                />
                <Label htmlFor="slack-integration">Enable Slack integration</Label>
              </div>
              
              {slackIntegrationEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    value={slackWebhookUrl}
                    onChange={(e) => setSlackWebhookUrl(e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a webhook URL in your Slack workspace settings.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("Notification")}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Platform Settings */}
        <TabsContent value="platform" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure platform-specific settings and business rules.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-fee">Platform Fee Percentage (%)</Label>
                <Input
                  id="platform-fee"
                  type="number"
                  min="0"
                  max="100"
                  value={platformFeePercentage}
                  onChange={(e) => setPlatformFeePercentage(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-withdrawal">Minimum Withdrawal Amount ($)</Label>
                <Input
                  id="min-withdrawal"
                  type="number"
                  min="0"
                  value={minWithdrawalAmount}
                  onChange={(e) => setMinWithdrawalAmount(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-approve"
                  checked={autoApproveContent}
                  onCheckedChange={setAutoApproveContent}
                />
                <Label htmlFor="auto-approve">Automatically approve new content</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                When disabled, new content will require admin approval before becoming visible.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("Platform")}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
