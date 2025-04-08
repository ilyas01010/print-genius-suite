
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./AccountSettings";
import PreferenceSettings from "./PreferenceSettings";
import IntegrationSettings from "./IntegrationSettings";
import ReferralSettings from "./ReferralSettings";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/context/SettingsContext";

const SettingsTabs = () => {
  // Account settings state
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [showPassword, setShowPassword] = useState(false);
  
  // Preference settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);
  
  // Referral settings state
  const [referralCode, setReferralCode] = useState("PRINTGENIUS25");
  const [referralUrl, setReferralUrl] = useState("https://printgenius.ai/ref/PRINTGENIUS25");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  
  const { toast } = useToast();

  // Create a mock user object for AccountSettings
  const user = {
    email: email,
    displayName: `${firstName} ${lastName}`
  };

  const languages = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "ja": "Japanese"
  };
  
  const handleSaveSettings = () => {
    // Simulate saving settings
    setSavedSettings(true);
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
    
    // Reset the saved state after 3 seconds
    setTimeout(() => {
      setSavedSettings(false);
    }, 3000);
  };
  
  const handleCopy = (text: string, type: "code" | "url") => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (type === "code") {
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000);
        } else {
          setCopiedUrl(true);
          setTimeout(() => setCopiedUrl(false), 2000);
        }
        
        toast({
          title: "Copied to clipboard",
          description: `The referral ${type} has been copied to your clipboard.`,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually.",
          variant: "destructive",
        });
      });
  };
  
  // Create consistent props for AccountSettings based on its expected interface
  const [displayName, setDisplayName] = useState(`${firstName} ${lastName}`);
  const [bio, setDisplayBio] = useState("Print on demand enthusiast");
  const [publicProfile, setPublicProfile] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
        <TabsTrigger value="referrals">Referrals</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
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
          languages={languages}
        />
      </TabsContent>
      <TabsContent value="preferences">
        <PreferenceSettings
          pushNotifications={pushNotifications}
          setPushNotifications={setPushNotifications}
          emailNotifications={emailNotifications}
          setEmailNotifications={setEmailNotifications}
          savedSettings={savedSettings}
          handleSaveSettings={handleSaveSettings}
        />
      </TabsContent>
      <TabsContent value="integrations">
        <IntegrationSettings />
      </TabsContent>
      <TabsContent value="referrals">
        <ReferralSettings
          referralCode={referralCode}
          affiliateLink={referralUrl}
          handleCopyReferral={() => handleCopy(referralCode, "code")}
          handleCopyAffiliate={() => handleCopy(referralUrl, "url")}
          handleRegenerateReferralCode={() => {
            const newCode = `PRINT${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
            setReferralCode(newCode);
            setReferralUrl(`https://printgenius.ai/ref/${newCode}`);
            toast({
              title: "New Referral Code",
              description: "Your referral code has been regenerated.",
            });
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
