
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface AccountSettingsProps {
  user: any;
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setDisplayBio: (bio: string) => void;
  publicProfile: boolean;
  setPublicProfile: (value: boolean) => void;
  language: string;
  handleLanguageChange: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  savedSettings: boolean;
  handleSaveSettings: () => void;
  languages: Record<string, string>;
}

const AccountSettings = ({
  user,
  displayName,
  setDisplayName,
  bio,
  setDisplayBio,
  publicProfile,
  setPublicProfile,
  language,
  handleLanguageChange,
  timezone,
  setTimezone,
  savedSettings,
  handleSaveSettings,
  languages
}: AccountSettingsProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('common.profile')}</CardTitle>
          <CardDescription>
            Update your personal information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input 
                id="email" 
                placeholder="Email address" 
                type="email" 
                value={user?.email || ""}
                readOnly
              />
              <p className="text-sm text-muted-foreground">Your account email address</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName">{t('common.name')}</Label>
              <Input 
                id="displayName" 
                placeholder="Your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">The name displayed to others</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">{t('common.bio')}</Label>
            <Input 
              id="bio" 
              placeholder="A short bio about yourself"
              value={bio}
              onChange={(e) => setDisplayBio(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">A brief description visible on your profile</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="account-status" 
              checked={publicProfile}
              onCheckedChange={setPublicProfile}
            />
            <Label htmlFor="account-status">Make my profile public</Label>
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
          <CardTitle>Language & Region</CardTitle>
          <CardDescription>
            Customize your language and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t('common.language')}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([code, name]) => (
                    <SelectItem key={code} value={code}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                  <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                  <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                  <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                  <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export default AccountSettings;
