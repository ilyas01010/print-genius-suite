
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export const languages = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  zh: "中文",
  ja: "日本語"
};

// Define translation types
export type TranslationKeys = {
  common: {
    settings: string;
    profile: string;
    save: string;
    cancel: string;
    notifications: string;
    darkMode: string;
    language: string;
    email: string;
    name: string;
    bio: string;
    referral: string;
    affiliate: string;
    integrations: string;
    preferences: string;
    account: string;
  };
  // Add more translation categories as needed
};

// Default translations (English)
const defaultTranslations: TranslationKeys = {
  common: {
    settings: "Settings",
    profile: "Profile",
    save: "Save Changes",
    cancel: "Cancel",
    notifications: "Notifications",
    darkMode: "Dark Mode",
    language: "Language",
    email: "Email",
    name: "Name",
    bio: "Bio",
    referral: "Referral",
    affiliate: "Affiliate",
    integrations: "Integrations",
    preferences: "Preferences",
    account: "Account"
  }
};

// French translations
const frTranslations: TranslationKeys = {
  common: {
    settings: "Paramètres",
    profile: "Profil",
    save: "Enregistrer",
    cancel: "Annuler",
    notifications: "Notifications",
    darkMode: "Mode Sombre",
    language: "Langue",
    email: "E-mail",
    name: "Nom",
    bio: "Bio",
    referral: "Parrainage",
    affiliate: "Affiliation",
    integrations: "Intégrations",
    preferences: "Préférences",
    account: "Compte"
  }
};

// Spanish translations
const esTranslations: TranslationKeys = {
  common: {
    settings: "Configuración",
    profile: "Perfil",
    save: "Guardar Cambios",
    cancel: "Cancelar",
    notifications: "Notificaciones",
    darkMode: "Modo Oscuro",
    language: "Idioma",
    email: "Correo",
    name: "Nombre",
    bio: "Biografía",
    referral: "Referencia",
    affiliate: "Afiliado",
    integrations: "Integraciones",
    preferences: "Preferencias",
    account: "Cuenta"
  }
};

const translations: Record<string, TranslationKeys> = {
  en: defaultTranslations,
  fr: frTranslations,
  es: esTranslations,
  // Add more language translations as needed
  // For now, other languages will fallback to English
  de: defaultTranslations,
  it: defaultTranslations,
  pt: defaultTranslations,
  zh: defaultTranslations,
  ja: defaultTranslations
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => ""
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get stored language from localStorage or default to 'en'
  const [language, setLanguageState] = useState(() => {
    const storedSettings = localStorage.getItem('userSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      return settings.language || "en";
    }
    return "en";
  });

  // Update language and save to localStorage
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    
    // Update in localStorage
    const storedSettings = localStorage.getItem('userSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      settings.language = lang;
      localStorage.setItem('userSettings', JSON.stringify(settings));
    } else {
      localStorage.setItem('userSettings', JSON.stringify({ language: lang }));
    }
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
  };

  // Initialize HTML lang attribute
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, []);

  // Translation function
  const t = (path: string): string => {
    const keys = path.split('.');
    const currentTranslation = translations[language] || defaultTranslations;
    
    let result: any = currentTranslation;
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        // Fallback to English if translation not found
        let fallback = defaultTranslations;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path; // Return the key path if no translation found
          }
        }
        return typeof fallback === 'string' ? fallback : path;
      }
    }
    
    return typeof result === 'string' ? result : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
