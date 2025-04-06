
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export const languages = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  zh: "中文",
  ja: "日本語"
};

// Define all translations
interface Translations {
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
    signIn: string;
    signOut: string;
    dashboard: string;
    search: string;
    loading: string;
    error: string;
    success: string;
    welcome: string;
    noData: string;
    yes: string;
    no: string;
    confirm: string;
    back: string;
    next: string;
    submit: string;
    delete: string;
  };
  nav: {
    dashboard: string;
    designGenerator: string;
    nicheResearch: string;
    analytics: string;
    copyrightChecker: string;
    auth: string;
    platform: string;
    customer: string;
    marketing: string;
    learning: string;
    settings: string;
  };
  auth: {
    login: string;
    register: string;
    forgotPassword: string;
    resetPassword: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    loginSuccess: string;
    loginError: string;
    logoutSuccess: string;
    invalidCredentials: string;
  };
  design: {
    title: string;
    subtitle: string;
    upload: string;
    generate: string;
    templates: string;
    collaborate: string;
    save: string;
    download: string;
    createNew: string;
    resolution: string;
    format: string;
    dimensions: string;
  };
  settings: {
    applicationPreferences: string;
    designPreferences: string;
    appearance: string;
    pushNotifications: string;
    emailNotifications: string;
    timezone: string;
    defaultResolution: string;
    defaultFormat: string;
    autoSave: string;
    profileInfo: string;
    accountSettings: string;
    languageRegion: string;
    referralAffiliate: string;
    accountStatus: string;
    publicProfile: string;
    referralCode: string;
    affiliateLink: string;
    generateNewCode: string;
    referralStats: string;
    referredUsers: string;
    totalEarnings: string;
    viewDetails: string;
    apiIntegrations: string;
    connectedAccounts: string;
    apiKey: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    invalidPassword: string;
    passwordMismatch: string;
    serverError: string;
    networkError: string;
    uploadFailed: string;
    permissionDenied: string;
    notFound: string;
    alreadyExists: string;
  };
  notifications: {
    noNotifications: string;
    markAllRead: string;
    newMessage: string;
    newComment: string;
    designSaved: string;
    designPublished: string;
    designDownloaded: string;
    newFollower: string;
    newSale: string;
  };
}

// English translations (default)
const en: Translations = {
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
    account: "Account",
    signIn: "Sign In",
    signOut: "Sign Out",
    dashboard: "Dashboard",
    search: "Search",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    welcome: "Welcome",
    noData: "No data available",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    submit: "Submit",
    delete: "Delete"
  },
  nav: {
    dashboard: "Dashboard",
    designGenerator: "Design Generator",
    nicheResearch: "Niche Research",
    analytics: "Analytics",
    copyrightChecker: "Copyright Checker",
    auth: "Authentication",
    platform: "Platform Manager",
    customer: "Customer Service",
    marketing: "Marketing Planner",
    learning: "Learning Hub",
    settings: "Settings"
  },
  auth: {
    login: "Login",
    register: "Register",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    confirmPassword: "Confirm password",
    loginSuccess: "Logged in successfully",
    loginError: "Login failed",
    logoutSuccess: "Logged out successfully",
    invalidCredentials: "Invalid email or password"
  },
  design: {
    title: "Design Generator",
    subtitle: "Create and edit Print-on-Demand ready designs",
    upload: "Upload Design",
    generate: "Generate Design",
    templates: "Templates",
    collaborate: "Collaborate",
    save: "Save Design",
    download: "Download",
    createNew: "Create New",
    resolution: "Resolution",
    format: "Format",
    dimensions: "Dimensions"
  },
  settings: {
    applicationPreferences: "Application Preferences",
    designPreferences: "Design Preferences",
    appearance: "Appearance",
    pushNotifications: "Push Notifications",
    emailNotifications: "Email Notifications",
    timezone: "Time Zone",
    defaultResolution: "Default Resolution",
    defaultFormat: "Default Format",
    autoSave: "Auto-save designs",
    profileInfo: "Update your personal information and account settings",
    accountSettings: "Account Settings",
    languageRegion: "Language & Region",
    referralAffiliate: "Referrals & Affiliates",
    accountStatus: "Account Status",
    publicProfile: "Make my profile public",
    referralCode: "Your Referral Code",
    affiliateLink: "Affiliate Link",
    generateNewCode: "Generate New Code",
    referralStats: "Referral Stats",
    referredUsers: "Referred Users",
    totalEarnings: "Total Earnings",
    viewDetails: "View Details",
    apiIntegrations: "API Integrations",
    connectedAccounts: "Connected Accounts",
    apiKey: "Your API Key"
  },
  errors: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidPassword: "Password must be at least 8 characters",
    passwordMismatch: "Passwords do not match",
    serverError: "Server error occurred",
    networkError: "Network error occurred",
    uploadFailed: "Upload failed",
    permissionDenied: "Permission denied",
    notFound: "Not found",
    alreadyExists: "Already exists"
  },
  notifications: {
    noNotifications: "No notifications at the moment",
    markAllRead: "Mark all as read",
    newMessage: "You have a new message",
    newComment: "New comment on your design",
    designSaved: "Design saved successfully",
    designPublished: "Design published successfully",
    designDownloaded: "Design downloaded",
    newFollower: "New follower",
    newSale: "New sale completed"
  }
};

// French translations
const fr: Translations = {
  common: {
    settings: "Paramètres",
    profile: "Profil",
    save: "Enregistrer les modifications",
    cancel: "Annuler",
    notifications: "Notifications",
    darkMode: "Mode Sombre",
    language: "Langue",
    email: "E-mail",
    name: "Nom",
    bio: "Biographie",
    referral: "Parrainage",
    affiliate: "Affiliation",
    integrations: "Intégrations",
    preferences: "Préférences",
    account: "Compte",
    signIn: "Connexion",
    signOut: "Déconnexion",
    dashboard: "Tableau de bord",
    search: "Rechercher",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    welcome: "Bienvenue",
    noData: "Aucune donnée disponible",
    yes: "Oui",
    no: "Non",
    confirm: "Confirmer",
    back: "Retour",
    next: "Suivant",
    submit: "Envoyer",
    delete: "Supprimer"
  },
  nav: {
    dashboard: "Tableau de bord",
    designGenerator: "Générateur de design",
    nicheResearch: "Recherche de niche",
    analytics: "Analyses",
    copyrightChecker: "Vérificateur de droits d'auteur",
    auth: "Authentification",
    platform: "Gestionnaire de plateforme",
    customer: "Service client",
    marketing: "Planificateur marketing",
    learning: "Centre d'apprentissage",
    settings: "Paramètres"
  },
  auth: {
    login: "Connexion",
    register: "S'inscrire",
    forgotPassword: "Mot de passe oublié",
    resetPassword: "Réinitialiser le mot de passe",
    emailPlaceholder: "Entrez votre email",
    passwordPlaceholder: "Entrez votre mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    loginSuccess: "Connexion réussie",
    loginError: "Échec de la connexion",
    logoutSuccess: "Déconnexion réussie",
    invalidCredentials: "Email ou mot de passe invalide"
  },
  design: {
    title: "Générateur de Design",
    subtitle: "Créer et éditer des designs prêts pour l'impression à la demande",
    upload: "Télécharger Design",
    generate: "Générer Design",
    templates: "Modèles",
    collaborate: "Collaborer",
    save: "Enregistrer Design",
    download: "Télécharger",
    createNew: "Créer Nouveau",
    resolution: "Résolution",
    format: "Format",
    dimensions: "Dimensions"
  },
  settings: {
    applicationPreferences: "Préférences de l'application",
    designPreferences: "Préférences de design",
    appearance: "Apparence",
    pushNotifications: "Notifications push",
    emailNotifications: "Notifications par e-mail",
    timezone: "Fuseau horaire",
    defaultResolution: "Résolution par défaut",
    defaultFormat: "Format par défaut",
    autoSave: "Sauvegarde automatique des designs",
    profileInfo: "Mettez à jour vos informations personnelles et les paramètres du compte",
    accountSettings: "Paramètres du compte",
    languageRegion: "Langue et région",
    referralAffiliate: "Parrainages et affiliations",
    accountStatus: "Statut du compte",
    publicProfile: "Rendre mon profil public",
    referralCode: "Votre code de parrainage",
    affiliateLink: "Lien d'affiliation",
    generateNewCode: "Générer un nouveau code",
    referralStats: "Statistiques de parrainage",
    referredUsers: "Utilisateurs parrainés",
    totalEarnings: "Gains totaux",
    viewDetails: "Voir les détails",
    apiIntegrations: "Intégrations API",
    connectedAccounts: "Comptes connectés",
    apiKey: "Votre clé API"
  },
  errors: {
    required: "Ce champ est requis",
    invalidEmail: "Veuillez entrer un email valide",
    invalidPassword: "Le mot de passe doit contenir au moins 8 caractères",
    passwordMismatch: "Les mots de passe ne correspondent pas",
    serverError: "Une erreur serveur s'est produite",
    networkError: "Une erreur réseau s'est produite",
    uploadFailed: "Échec du téléchargement",
    permissionDenied: "Permission refusée",
    notFound: "Non trouvé",
    alreadyExists: "Existe déjà"
  },
  notifications: {
    noNotifications: "Aucune notification pour le moment",
    markAllRead: "Marquer tout comme lu",
    newMessage: "Vous avez un nouveau message",
    newComment: "Nouveau commentaire sur votre design",
    designSaved: "Design enregistré avec succès",
    designPublished: "Design publié avec succès",
    designDownloaded: "Design téléchargé",
    newFollower: "Nouvel abonné",
    newSale: "Nouvelle vente effectuée"
  }
};

// Spanish translations
const es: Translations = {
  common: {
    settings: "Configuración",
    profile: "Perfil",
    save: "Guardar Cambios",
    cancel: "Cancelar",
    notifications: "Notificaciones",
    darkMode: "Modo Oscuro",
    language: "Idioma",
    email: "Correo electrónico",
    name: "Nombre",
    bio: "Biografía",
    referral: "Referencia",
    affiliate: "Afiliado",
    integrations: "Integraciones",
    preferences: "Preferencias",
    account: "Cuenta",
    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    dashboard: "Panel de Control",
    search: "Buscar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    welcome: "Bienvenido",
    noData: "No hay datos disponibles",
    yes: "Sí",
    no: "No",
    confirm: "Confirmar",
    back: "Atrás",
    next: "Siguiente",
    submit: "Enviar",
    delete: "Eliminar"
  },
  nav: {
    dashboard: "Panel de Control",
    designGenerator: "Generador de Diseños",
    nicheResearch: "Investigación de Nicho",
    analytics: "Análisis",
    copyrightChecker: "Verificador de Derechos de Autor",
    auth: "Autenticación",
    platform: "Gestor de Plataforma",
    customer: "Servicio al Cliente",
    marketing: "Planificador de Marketing",
    learning: "Centro de Aprendizaje",
    settings: "Configuración"
  },
  auth: {
    login: "Iniciar Sesión",
    register: "Registrarse",
    forgotPassword: "Olvidé mi Contraseña",
    resetPassword: "Restablecer Contraseña",
    emailPlaceholder: "Ingrese su correo electrónico",
    passwordPlaceholder: "Ingrese su contraseña",
    confirmPassword: "Confirmar contraseña",
    loginSuccess: "Inicio de sesión exitoso",
    loginError: "Error al iniciar sesión",
    logoutSuccess: "Cierre de sesión exitoso",
    invalidCredentials: "Correo o contraseña inválidos"
  },
  design: {
    title: "Generador de Diseños",
    subtitle: "Crea y edita diseños listos para impresión bajo demanda",
    upload: "Subir Diseño",
    generate: "Generar Diseño",
    templates: "Plantillas",
    collaborate: "Colaborar",
    save: "Guardar Diseño",
    download: "Descargar",
    createNew: "Crear Nuevo",
    resolution: "Resolución",
    format: "Formato",
    dimensions: "Dimensiones"
  },
  settings: {
    applicationPreferences: "Preferencias de Aplicación",
    designPreferences: "Preferencias de Diseño",
    appearance: "Apariencia",
    pushNotifications: "Notificaciones Push",
    emailNotifications: "Notificaciones por Correo",
    timezone: "Zona Horaria",
    defaultResolution: "Resolución Predeterminada",
    defaultFormat: "Formato Predeterminado",
    autoSave: "Autoguardar diseños",
    profileInfo: "Actualiza tu información personal y configuración de cuenta",
    accountSettings: "Configuración de Cuenta",
    languageRegion: "Idioma y Región",
    referralAffiliate: "Referencias y Afiliados",
    accountStatus: "Estado de la Cuenta",
    publicProfile: "Hacer mi perfil público",
    referralCode: "Tu Código de Referencia",
    affiliateLink: "Enlace de Afiliado",
    generateNewCode: "Generar Nuevo Código",
    referralStats: "Estadísticas de Referidos",
    referredUsers: "Usuarios Referidos",
    totalEarnings: "Ganancias Totales",
    viewDetails: "Ver Detalles",
    apiIntegrations: "Integraciones API",
    connectedAccounts: "Cuentas Conectadas",
    apiKey: "Tu Clave API"
  },
  errors: {
    required: "Este campo es obligatorio",
    invalidEmail: "Por favor ingrese un correo válido",
    invalidPassword: "La contraseña debe tener al menos 8 caracteres",
    passwordMismatch: "Las contraseñas no coinciden",
    serverError: "Ocurrió un error en el servidor",
    networkError: "Ocurrió un error de red",
    uploadFailed: "Error al subir",
    permissionDenied: "Permiso denegado",
    notFound: "No encontrado",
    alreadyExists: "Ya existe"
  },
  notifications: {
    noNotifications: "No hay notificaciones por el momento",
    markAllRead: "Marcar todo como leído",
    newMessage: "Tienes un nuevo mensaje",
    newComment: "Nuevo comentario en tu diseño",
    designSaved: "Diseño guardado con éxito",
    designPublished: "Diseño publicado con éxito",
    designDownloaded: "Diseño descargado",
    newFollower: "Nuevo seguidor",
    newSale: "Nueva venta completada"
  }
};

// Create a lookup object for all translations
const translations: Record<string, Translations> = {
  en,
  fr,
  es,
  // Add other translations here with the same structure
  // For now, other languages will fallback to English
  de: en,
  it: en,
  pt: en,
  zh: en,
  ja: en
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (path: string) => string;
  translations: Record<string, Translations>;
  availableLanguages: Record<string, string>;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  translations,
  availableLanguages: languages
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
    try {
      const keys = path.split('.');
      if (keys.length < 2) {
        console.warn(`Invalid translation path: ${path}. Should be in format "category.key"`);
        return path;
      }
      
      const categoryKey = keys[0];
      const translationKey = keys[1];
      
      // Get the current language translations
      const currentTranslation = translations[language] || translations.en;
      
      // Check if category exists
      if (!currentTranslation[categoryKey as keyof Translations]) {
        console.warn(`Translation category not found: ${categoryKey}`);
        return path;
      }
      
      // Get the specific translation
      const translationCategory = currentTranslation[categoryKey as keyof Translations];
      const translationValue = translationCategory[translationKey as keyof typeof translationCategory];
      
      if (translationValue === undefined) {
        console.warn(`Translation key not found: ${translationKey} in category ${categoryKey}`);
        
        // Fallback to English if translation not found in current language
        const fallbackTranslation = translations.en;
        const fallbackCategory = fallbackTranslation[categoryKey as keyof Translations];
        const fallbackValue = fallbackCategory[translationKey as keyof typeof fallbackCategory];
        
        return fallbackValue !== undefined ? String(fallbackValue) : path;
      }
      
      return String(translationValue);
    } catch (error) {
      console.error(`Translation error for path ${path}:`, error);
      return path;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      translations,
      availableLanguages: languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
