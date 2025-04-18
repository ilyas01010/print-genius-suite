
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AccountCard from "./account/AccountCard";
import ProfileForm from "./account/ProfileForm";
import RegionSettings from "./account/RegionSettings";
import DeleteAccountButton from "./account/DeleteAccountButton";

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
      <AccountCard 
        title={t('common.profile')}
        description="Update your personal information and account settings"
        savedSettings={savedSettings}
        handleSaveSettings={handleSaveSettings}
      >
        <ProfileForm 
          user={user}
          displayName={displayName}
          setDisplayName={setDisplayName}
          bio={bio}
          setDisplayBio={setDisplayBio}
          publicProfile={publicProfile}
          setPublicProfile={setPublicProfile}
        />
      </AccountCard>
      
      <AccountCard 
        title="Language & Region"
        description="Customize your language and regional settings"
        savedSettings={savedSettings}
        handleSaveSettings={handleSaveSettings}
      >
        <RegionSettings 
          language={language}
          handleLanguageChange={handleLanguageChange}
          timezone={timezone}
          setTimezone={setTimezone}
          languages={languages}
        />
      </AccountCard>
      
      <AccountCard
        title="Danger Zone"
        description="Permanent account actions"
        variant="destructive"
        showSaveButton={false}
      >
        <div className="px-6 py-4">
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Delete account</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data
            </p>
            <DeleteAccountButton />
          </div>
        </div>
      </AccountCard>
    </div>
  );
};

export default AccountSettings;
