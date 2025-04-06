import React, { createContext, useState, useContext, useCallback } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: Record<string, string>) => string;
  availableLanguages: Record<string, string>;
}

interface TranslationDictionaries {
  en: Record<string, Record<string, string>>;
  fr: Record<string, Record<string, string>>;
  es: Record<string, Record<string, string>>;
}

// Extend or update the translations object to include missing keys
const translations: TranslationDictionaries = {
  en: {
    common: {
      loading: "Loading...",
      success: "Success!",
      error: "Error",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      submit: "Submit",
      language: "Language",
      settings: "Settings",
      profile: "Profile",
      account: "Account",
      signIn: "Sign In",
      signOut: "Sign Out",
      notifications: "Notifications",
      support: "Support",
      back: "Back",
      next: "Next",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      welcome: "Welcome Back",
      createAccount: "Create Account",
      enterCredentials: "Enter your credentials to continue",
      enterDetails: "Enter your details to create a new account",
      email: "Email",
      password: "Password",
      forgot: "Forgot Password?",
      signingIn: "Signing In...",
      creating: "Creating Account...",
      create: "Create Account",
      error: "Authentication Error",
      fillAllFields: "Please fill all fields",
      signInFailed: "Sign In Failed",
      checkCredentials: "Please check your credentials and try again",
      passwordTooShort: "Password is too short",
      passwordRequirement: "Password must be at least 6 characters",
      success: "Success",
      registrationSuccess: "Your account was registered successfully. You can now sign in.",
      registrationFailed: "Registration Failed",
      errorOccurred: "An error occurred during registration",
      logoutSuccess: "Successfully signed out",
      subtitle: "Your Complete POD Design Solution",
    },
    notifications: {
      noNotifications: "You have no notifications",
      markAllRead: "Mark all as read",
    },
    settings: {
      general: "General",
      account: "Account Settings",
      preferences: "Preferences",
      integrations: "Integrations",
      referrals: "Referrals & Earnings",
      personalInfo: "Personal Information",
      changePassword: "Change Password",
      deleteAccount: "Delete Account",
      emailNotifications: "Email Notifications",
      darkMode: "Dark Mode",
      language: "Language",
      timezone: "Timezone",
      publicProfile: "Public Profile",
      reconnect: "Reconnect",
      inviteFriend: "Invite a Friend",
      emailPlaceholder: "Enter friend's email",
      send: "Send Invitation",
      referralLink: "Referral Link",
      copy: "Copy",
      copied: "Copied!",
      earnings: "Your Earnings",
      payouts: "Payout History",
      savedChanges: "Changes saved successfully",
      deleteConfirm: "Are you sure you want to delete your account? This action cannot be undone.",
      yes: "Yes, Delete",
      passwordUpdated: "Password updated successfully",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      passwordsDontMatch: "New passwords don't match",
      firstName: "First Name",
      lastName: "Last Name",
      displayName: "Display Name",
      bio: "Bio",
    }
  },
  fr: {
    common: {
      loading: "Chargement...",
      success: "Succès !",
      error: "Erreur",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      create: "Créer",
      submit: "Soumettre",
      language: "Langue",
      settings: "Paramètres",
      profile: "Profil",
      account: "Compte",
      signIn: "Se connecter",
      signOut: "Se déconnecter",
      notifications: "Notifications",
      support: "Support",
      back: "Retour",
      next: "Suivant",
    },
    auth: {
      signIn: "Se connecter",
      signUp: "S'inscrire",
      welcome: "Bienvenue",
      createAccount: "Créer un compte",
      enterCredentials: "Entrez vos identifiants pour continuer",
      enterDetails: "Entrez vos informations pour créer un nouveau compte",
      email: "Email",
      password: "Mot de passe",
      forgot: "Mot de passe oublié ?",
      signingIn: "Connexion en cours...",
      creating: "Création du compte...",
      create: "Créer un compte",
      error: "Erreur d'authentification",
      fillAllFields: "Veuillez remplir tous les champs",
      signInFailed: "Échec de connexion",
      checkCredentials: "Veuillez vérifier vos identifiants et réessayer",
      passwordTooShort: "Le mot de passe est trop court",
      passwordRequirement: "Le mot de passe doit contenir au moins 6 caractères",
      success: "Succès",
      registrationSuccess: "Votre compte a été enregistré avec succès. Vous pouvez maintenant vous connecter.",
      registrationFailed: "Échec d'inscription",
      errorOccurred: "Une erreur s'est produite lors de l'inscription",
      logoutSuccess: "Déconnexion réussie",
      subtitle: "Votre solution complète de design POD",
    },
    notifications: {
      noNotifications: "Vous n'avez pas de notifications",
      markAllRead: "Marquer tout comme lu",
    },
    settings: {
      general: "Général",
      account: "Paramètres du compte",
      preferences: "Préférences",
      integrations: "Intégrations",
      referrals: "Parrainages et gains",
      personalInfo: "Informations personnelles",
      changePassword: "Changer le mot de passe",
      deleteAccount: "Supprimer le compte",
      emailNotifications: "Notifications par email",
      darkMode: "Mode sombre",
      language: "Langue",
      timezone: "Fuseau horaire",
      publicProfile: "Profil public",
      reconnect: "Reconnecter",
      inviteFriend: "Inviter un ami",
      emailPlaceholder: "Saisir l'email de l'ami",
      send: "Envoyer l'invitation",
      referralLink: "Lien de parrainage",
      copy: "Copier",
      copied: "Copié !",
      earnings: "Vos gains",
      payouts: "Historique des paiements",
      savedChanges: "Modifications enregistrées avec succès",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      yes: "Oui, supprimer",
      passwordUpdated: "Mot de passe mis à jour avec succès",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le nouveau mot de passe",
      passwordsDontMatch: "Les nouveaux mots de passe ne correspondent pas",
      firstName: "Prénom",
      lastName: "Nom",
      displayName: "Nom d'affichage",
      bio: "Bio",
    }
  },
  es: {
    common: {
      loading: "Cargando...",
      success: "¡Éxito!",
      error: "Error",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      create: "Crear",
      submit: "Enviar",
      language: "Idioma",
      settings: "Configuración",
      profile: "Perfil",
      account: "Cuenta",
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión",
      notifications: "Notificaciones",
      support: "Soporte",
      back: "Atrás",
      next: "Siguiente",
    },
    auth: {
      signIn: "Iniciar sesión",
      signUp: "Registrarse",
      welcome: "Bienvenido de nuevo",
      createAccount: "Crear cuenta",
      enterCredentials: "Ingresa tus credenciales para continuar",
      enterDetails: "Ingresa tus datos para crear una nueva cuenta",
      email: "Correo electrónico",
      password: "Contraseña",
      forgot: "¿Olvidaste tu contraseña?",
      signingIn: "Iniciando sesión...",
      creating: "Creando cuenta...",
      create: "Crear cuenta",
      error: "Error de autenticación",
      fillAllFields: "Por favor completa todos los campos",
      signInFailed: "Error de inicio de sesión",
      checkCredentials: "Por favor verifica tus credenciales e intenta de nuevo",
      passwordTooShort: "La contraseña es demasiado corta",
      passwordRequirement: "La contraseña debe tener al menos 6 caracteres",
      success: "Éxito",
      registrationSuccess: "Tu cuenta fue registrada exitosamente. Ahora puedes iniciar sesión.",
      registrationFailed: "Error de registro",
      errorOccurred: "Ocurrió un error durante el registro",
      logoutSuccess: "Sesión cerrada exitosamente",
      subtitle: "Tu solución completa de diseño POD",
    },
    notifications: {
      noNotifications: "No tienes notificaciones",
      markAllRead: "Marcar todo como leído",
    },
    settings: {
      general: "General",
      account: "Configuración de cuenta",
      preferences: "Preferencias",
      integrations: "Integraciones",
      referrals: "Referencias y ganancias",
      personalInfo: "Información personal",
      changePassword: "Cambiar contraseña",
      deleteAccount: "Eliminar cuenta",
      emailNotifications: "Notificaciones por correo",
      darkMode: "Modo oscuro",
      language: "Idioma",
      timezone: "Zona horaria",
      publicProfile: "Perfil público",
      reconnect: "Reconectar",
      inviteFriend: "Invitar a un amigo",
      emailPlaceholder: "Ingresar correo del amigo",
      send: "Enviar invitación",
      referralLink: "Enlace de referencia",
      copy: "Copiar",
      copied: "¡Copiado!",
      earnings: "Tus ganancias",
      payouts: "Historial de pagos",
      savedChanges: "Cambios guardados exitosamente",
      deleteConfirm: "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
      yes: "Sí, eliminar",
      passwordUpdated: "Contraseña actualizada exitosamente",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      confirmPassword: "Confirmar nueva contraseña",
      passwordsDontMatch: "Las nuevas contraseñas no coinciden",
      firstName: "Nombre",
      lastName: "Apellido",
      displayName: "Nombre para mostrar",
      bio: "Bio",
    }
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  availableLanguages: {
    en: 'English',
    fr: 'Français',
    es: 'Español',
  },
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');

  const t = useCallback(
    (key: string, options: Record<string, string> = {}) => {
      const [section, term] = key.split('.');
      let translated = translations[language as keyof TranslationDictionaries]?.[section]?.[term] || key;

      // Replace placeholders in the translated string
      Object.entries(options).forEach(([placeholder, value]) => {
        translated = translated.replace(`{{${placeholder}}}`, value);
      });

      return translated;
    },
    [language]
  );

  const availableLanguages = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
