
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useSettings } from "@/context/SettingsContext";
import { useLanguage } from "@/context/LanguageContext";

export const useSettingsInit = () => {
  const { user } = useUser();
  const { 
    setDarkMode, 
    setEmailNotifications, 
    setPushNotifications, 
    setTimezone,
    setPublicProfile,
    setDisplayName,
    setDisplayBio,
    setReferralCode,
    generateReferralCode
  } = useSettings();
  const { language } = useLanguage();

  // Initialize user settings
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;
    
    const loadSettings = () => {
      try {
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
      } catch (error) {
        console.warn('Error loading settings:', error);
      }
    };

    loadSettings();
  }, [user, setDarkMode, setEmailNotifications, setPushNotifications, setTimezone, 
      setPublicProfile, setDisplayName, setDisplayBio, setReferralCode, generateReferralCode]);

  // Apply language change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  return null;
};
