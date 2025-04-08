
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, Bell, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useSettings } from "@/context/SettingsContext";

interface PreferenceSettingsProps {
  pushNotifications: boolean;
  setPushNotifications: (value: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  savedSettings: boolean;
  handleSaveSettings: () => void;
}

const PreferenceSettings = ({
  pushNotifications,
  setPushNotifications,
  emailNotifications,
  setEmailNotifications,
  savedSettings,
  handleSaveSettings
}: PreferenceSettingsProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Application Preferences</CardTitle>
          <CardDescription>
            Customize your Print Genius experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive browser notifications</p>
              </div>
            </div>
            <Switch 
              checked={pushNotifications} 
              onCheckedChange={(checked) => {
                setPushNotifications(checked);
                if (checked && typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
                  toast({
                    title: "Permission Required",
                    description: "Please allow notifications in your browser settings.",
                  });
                }
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={savedSettings}>
            {savedSettings ? (
              <>
                <Check className="mr-2 h-4 w-4" /> {t('common.save')}
              </>
            ) : t('common.save')}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Design Preferences</CardTitle>
          <CardDescription>
            Configure design generator settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-resolution">Default Resolution</Label>
            <Select defaultValue="1080">
              <SelectTrigger id="default-resolution" className="w-full">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="720">720p</SelectItem>
                <SelectItem value="1080">1080p</SelectItem>
                <SelectItem value="2k">2K</SelectItem>
                <SelectItem value="4k">4K</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="default-format">Default Format</Label>
            <Select defaultValue="png">
              <SelectTrigger id="default-format" className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-save designs</p>
              <p className="text-sm text-muted-foreground">Automatically save design progress</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={savedSettings}>
            {savedSettings ? (
              <>
                <Check className="mr-2 h-4 w-4" /> {t('common.save')}
              </>
            ) : t('common.save')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PreferenceSettings;
