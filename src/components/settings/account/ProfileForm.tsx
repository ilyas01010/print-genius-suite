
import React from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";

interface ProfileFormProps {
  user: any;
  displayName: string;
  setDisplayName: (name: string) => void;
  bio: string;
  setDisplayBio: (bio: string) => void;
  publicProfile: boolean;
  setPublicProfile: (value: boolean) => void;
}

const ProfileForm = ({
  user,
  displayName,
  setDisplayName,
  bio,
  setDisplayBio,
  publicProfile,
  setPublicProfile,
}: ProfileFormProps) => {
  const { t } = useLanguage();

  return (
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
  );
};

export default ProfileForm;
