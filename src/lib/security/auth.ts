
import { supabase } from "../supabase-client";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";

// Secure password requirements
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_REQUIREMENTS = {
  minLength: PASSWORD_MIN_LENGTH,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

// Role definitions
export const ROLES = {
  ADMIN: 'admin',
  CREATOR: 'creator',
  CUSTOMER: 'customer',
};

// Secret constants
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Validate password strength
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
  }
  
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  
  if (PASSWORD_REQUIREMENTS.requireNumbers && !/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  
  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

// Check if user has specific role
export const checkUserRole = async (userId: string, role: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', role)
      .single();
      
    if (error) {
      console.error('Error checking role:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in role check:', error);
    return false;
  }
};

// React hook for checking roles
export const useHasRole = (role: string) => {
  const { user } = useUser();
  
  const checkRole = async (): Promise<boolean> => {
    if (!user?.id) return false;
    return await checkUserRole(user.id, role);
  };
  
  return { checkRole };
};

// Secure authentication functions
export const secureSignUp = async (email: string, password: string, metadata?: any) => {
  // First validate password strength
  const validation = validatePassword(password);
  
  if (!validation.valid) {
    toast({
      title: "Password does not meet security requirements",
      description: validation.errors.join(' '),
      variant: "destructive",
    });
    return { error: new Error(validation.errors.join(' ')), data: null };
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      }
    });
    
    if (error) throw error;
    return { data, error: null };
    
  } catch (error: any) {
    console.error('Error during signup:', error);
    toast({
      title: "Error signing up",
      description: error.message,
      variant: "destructive",
    });
    return { data: null, error };
  }
};

// Detect suspicious login attempts
export const detectSuspiciousLogin = (attempts: number, timeWindow: number): boolean => {
  // Consider an attempt suspicious if it exceeds the threshold
  return attempts > MAX_LOGIN_ATTEMPTS;
};

// Log security events
export const logSecurityEvent = async (event: string, userId: string, details: any) => {
  try {
    // Insert security log into database
    const { error } = await supabase
      .from('security_logs')
      .insert({
        event,
        user_id: userId,
        details,
        ip_address: 'client-side', // In a real app, get this from server
        timestamp: new Date()
      });
      
    if (error) throw error;
  } catch (error) {
    console.error('Error logging security event:', error);
  }
};

// Secure token refresh
export const secureRefreshSession = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Error refreshing session:', error);
      return false;
    }
    return !!data.session;
  } catch (error) {
    console.error('Error in session refresh:', error);
    return false;
  }
};

// Secure logout function
export const secureLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error during logout:', error);
    return { error };
  }
};
