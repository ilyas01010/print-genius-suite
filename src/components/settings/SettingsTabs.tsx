
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./AccountSettings";
import PreferenceSettings from "./PreferenceSettings";
import IntegrationSettings from "./IntegrationSettings";
import ReferralSettings from "./ReferralSettings";
import { useToast } from "@/hooks/use-toast";

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
          firstName={firstName}
          lastName={lastName}
          email={email}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
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
          referralUrl={referralUrl}
          copiedCode={copiedCode}
          copiedUrl={copiedUrl}
          handleCopyCode={() => handleCopy(referralCode, "code")}
          handleCopyUrl={() => handleCopy(referralUrl, "url")}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
