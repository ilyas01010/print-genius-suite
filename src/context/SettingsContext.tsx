
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type SettingsContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
  pushNotifications: boolean;
  setPushNotifications: (value: boolean) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  publicProfile: boolean;
  setPublicProfile: (value: boolean) => void;
  referralCode: string;
  setReferralCode: (value: string) => void;
  affiliateLink: string;
  setAffiliateLink: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
  bio: string;
  setDisplayBio: (value: string) => void;
  savedSettings: boolean;
  setSavedSettings: (value: boolean) => void;
  handleSaveSettings: () => void;
  handleRegenerateReferralCode: () => void;
  handleCopyReferral: () => void;
  handleCopyAffiliate: () => void;
  generateReferralCode: () => string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Update affiliate link when referral code changes
  useEffect(() => {
    if (referralCode) {
      setAffiliateLink(`https://printgenius.com/ref/${referralCode}`);
    }
  }, [referralCode]);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedSettings = localStorage.getItem('userSettings');
          if (storedSettings) {
            const settings = JSON.parse(storedSettings);
            // Only update if the values exist in storage
            if (typeof settings.darkMode === 'boolean') {
              setDarkMode(settings.darkMode);
            }
            if (typeof settings.emailNotifications === 'boolean') {
              setEmailNotifications(settings.emailNotifications);
            }
            if (typeof settings.pushNotifications === 'boolean') {
              setPushNotifications(settings.pushNotifications);
            }
            if (settings.timezone) {
              setTimezone(settings.timezone);
            }
            if (typeof settings.publicProfile === 'boolean') {
              setPublicProfile(settings.publicProfile);
            }
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading settings:", error);
        setIsInitialized(true);
      }
    };

    loadSettings();
  }, []);

  // Apply dark mode when it changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const applyDarkMode = () => {
      try {
        if (typeof document !== 'undefined') {
          if (darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          updateLocalStorage();
        }
      } catch (error) {
        console.error("Error applying dark mode:", error);
      }
    };
    
    // Use requestAnimationFrame for smoother transitions
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(applyDarkMode);
    } else {
      applyDarkMode();
    }
  }, [darkMode, isInitialized]);

  const generateReferralCode = () => {
    const prefix = "PRINT";
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}${randomPart}`;
  };

  const handleRegenerateReferralCode = () => {
    const newReferralCode = generateReferralCode();
    setReferralCode(newReferralCode);
    
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('referralCode', newReferralCode);
      }
    } catch (error) {
      console.error("Error saving referral code:", error);
    }
    
    toast({
      title: "Referral",
      description: "Your referral code has been regenerated successfully.",
    });
  };

  const updateLocalStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        const settings = {
          darkMode,
          emailNotifications,
          pushNotifications,
          timezone,
          publicProfile
        };
        localStorage.setItem('userSettings', JSON.stringify(settings));
      }
    } catch (error) {
      console.error("Error updating local storage:", error);
    }
  };

  const handleSaveSettings = () => {
    updateLocalStorage();
    
    if (typeof window !== 'undefined' && Notification && Notification.permission !== "denied") {
      if (pushNotifications) {
        Notification.requestPermission();
      }
    }
    
    toast({
      title: "Settings",
      description: "Your preferences have been updated successfully.",
    });
    setSavedSettings(true);
    
    setTimeout(() => {
      setSavedSettings(false);
    }, 3000);
  };

  const handleCopyReferral = () => {
    try {
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(referralCode);
        toast({
          title: "Copied to Clipboard",
          description: "Referral code copied successfully!",
        });
      }
    } catch (error) {
      console.error("Error copying referral code:", error);
      toast({
        title: "Copy Failed",
        description: "Could not copy referral code.",
        variant: "destructive"
      });
    }
  };

  const handleCopyAffiliate = () => {
    try {
      if (typeof navigator !== 'undefined') {
        navigator.clipboard.writeText(affiliateLink);
        toast({
          title: "Copied to Clipboard",
          description: "Affiliate link copied successfully!",
        });
      }
    } catch (error) {
      console.error("Error copying affiliate link:", error);
      toast({
        title: "Copy Failed",
        description: "Could not copy affiliate link.",
        variant: "destructive"
      });
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        emailNotifications,
        setEmailNotifications,
        pushNotifications,
        setPushNotifications,
        timezone,
        setTimezone,
        publicProfile,
        setPublicProfile,
        referralCode,
        setReferralCode,
        affiliateLink,
        setAffiliateLink,
        displayName,
        setDisplayName,
        bio,
        setDisplayBio,
        savedSettings,
        setSavedSettings,
        handleSaveSettings,
        handleRegenerateReferralCode,
        handleCopyReferral,
        handleCopyAffiliate,
        generateReferralCode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
