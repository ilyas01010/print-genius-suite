
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useSettings } from "@/context/SettingsContext";
import AccountSettings from "@/components/settings/AccountSettings";
import PreferenceSettings from "@/components/settings/PreferenceSettings";
import ReferralSettings from "@/components/settings/ReferralSettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

const SettingsTabs = () => {
  const { user } = useUser();
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const {
    displayName,
    setDisplayName,
    bio,
    setDisplayBio,
    publicProfile,
    setPublicProfile,
    darkMode,
    setDarkMode,
    emailNotifications,
    setEmailNotifications,
    pushNotifications,
    setPushNotifications,
    savedSettings,
    handleSaveSettings,
    timezone,
    setTimezone,
    referralCode,
    affiliateLink,
    handleCopyReferral,
    handleCopyAffiliate,
    handleRegenerateReferralCode
  } = useSettings();

  const isMobile = useIsMobile();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <Card className="p-1 md:p-2 mb-6 border-border/50 bg-card/50 backdrop-blur rounded-lg flex justify-center">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="account" className="text-xs md:text-sm">{t('common.account')}</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs md:text-sm">{t('common.preferences')}</TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs md:text-sm">{t('common.integrations')}</TabsTrigger>
        </TabsList>
      </Card>
      
      <TabsContent value="account" className="space-y-6">
        <AccountSettings 
          user={user}
          displayName={displayName}
          setDisplayName={setDisplayName}
          bio={bio}
          setDisplayBio={setDisplayBio}
          publicProfile={publicProfile}
          setPublicProfile={setPublicProfile}
          language={language}
          handleLanguageChange={handleLanguageChange}
          timezone={timezone}
          setTimezone={setTimezone}
          savedSettings={savedSettings}
          handleSaveSettings={handleSaveSettings}
          languages={availableLanguages}
        />
        
        <ReferralSettings 
          referralCode={referralCode}
          affiliateLink={affiliateLink}
          handleCopyReferral={handleCopyReferral}
          handleCopyAffiliate={handleCopyAffiliate}
          handleRegenerateReferralCode={handleRegenerateReferralCode}
        />
      </TabsContent>
      
      <TabsContent value="preferences" className="space-y-6">
        <PreferenceSettings 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          pushNotifications={pushNotifications}
          setPushNotifications={setPushNotifications}
          emailNotifications={emailNotifications}
          setEmailNotifications={setEmailNotifications}
          savedSettings={savedSettings}
          handleSaveSettings={handleSaveSettings}
        />
      </TabsContent>
      
      <TabsContent value="integrations" className="space-y-6">
        <IntegrationSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
