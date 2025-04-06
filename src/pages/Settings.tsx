import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import AccountSettings from "@/components/settings/AccountSettings";
import PreferenceSettings from "@/components/settings/PreferenceSettings";
import ReferralSettings from "@/components/settings/ReferralSettings";
import IntegrationSettings from "@/components/settings/IntegrationSettings";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setDisplayBio] = useState("");
  const [publicProfile, setPublicProfile] = useState(false);
  const [timezone, setTimezone] = useState("utc");

  useEffect(() => {
    const loadSettings = () => {
      const storedSettings = localStorage.getItem('userSettings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setDarkMode(settings.darkMode || false);
        setEmailNotifications(settings.emailNotifications || true);
        setPushNotifications(settings.pushNotifications || true);
        setTimezone(settings.timezone || "utc");
        setPublicProfile(settings.publicProfile || false);
      }

      if (user) {
        setDisplayName(user.user_metadata?.display_name || "");
        setDisplayBio(user.user_metadata?.bio || "");
        
        const storedReferralCode = localStorage.getItem('referralCode');
        if (storedReferralCode) {
          setReferralCode(storedReferralCode);
        } else {
          const newReferralCode = generateReferralCode();
          setReferralCode(newReferralCode);
          localStorage.setItem('referralCode', newReferralCode);
        }
      }
    };

    loadSettings();
  }, [user]);

  useEffect(() => {
    if (referralCode) {
      setAffiliateLink(`https://printgenius.com/ref/${referralCode}`);
    }
  }, [referralCode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    updateLocalStorage();
  }, [darkMode]);

  const generateReferralCode = () => {
    const prefix = "PRINT";
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}${randomPart}`;
  };

  const handleRegenerateReferralCode = () => {
    const newReferralCode = generateReferralCode();
    setReferralCode(newReferralCode);
    localStorage.setItem('referralCode', newReferralCode);
    
    toast({
      title: t('common.referral'),
      description: "Your referral code has been regenerated successfully.",
    });
  };

  const updateLocalStorage = () => {
    const settings = {
      darkMode,
      emailNotifications,
      pushNotifications,
      language,
      timezone,
      publicProfile
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  const handleSaveSettings = () => {
    updateLocalStorage();
    
    document.documentElement.setAttribute('lang', language);
    
    if (Notification && Notification.permission !== "denied") {
      if (pushNotifications) {
        Notification.requestPermission();
      }
    }
    
    toast({
      title: t('common.settings'),
      description: "Your preferences have been updated successfully.",
    });
    setSavedSettings(true);
    
    setTimeout(() => {
      setSavedSettings(false);
    }, 3000);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied to Clipboard",
      description: "Referral code copied successfully!",
    });
  };

  const handleCopyAffiliate = () => {
    navigator.clipboard.writeText(affiliateLink);
    toast({
      title: "Copied to Clipboard",
      description: "Affiliate link copied successfully!",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{t('common.settings')}</h1>
          <p className="text-muted-foreground">
            Configure your account and application preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="account">{t('common.account')}</TabsTrigger>
            <TabsTrigger value="preferences">{t('common.preferences')}</TabsTrigger>
            <TabsTrigger value="integrations">{t('common.integrations')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6 space-y-4">
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
          
          <TabsContent value="preferences" className="mt-6 space-y-4">
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
          
          <TabsContent value="integrations" className="mt-6 space-y-4">
            <IntegrationSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
