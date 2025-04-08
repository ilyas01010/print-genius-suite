
import { LoginAttempt } from "./types";
import { logSecurityEvent } from "@/lib/security/auth";
import { ADMIN_EMAIL } from "./constants";

// Format time for lockout display
export const formatLockoutTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Record login attempts with security logging
export const recordAttempt = (
  success: boolean, 
  loginAttempts: LoginAttempt[],
  userId?: string, 
  userEmail?: string
): LoginAttempt[] => {
  const attempt: LoginAttempt = {
    timestamp: Date.now(),
    success,
  };
  
  const newAttempts = [...loginAttempts, attempt];
  
  if (userId) {
    logSecurityEvent(
      success ? "admin_login_success" : "admin_login_failure", 
      userId,
      {
        email: userEmail || ADMIN_EMAIL,
        timestamp: new Date().toISOString(),
      }
    );
  }
  
  return newAttempts;
};

// Check for suspicious activity
export const checkSuspiciousActivity = (
  success: boolean,
  loginAttempts: LoginAttempt[]
): boolean => {
  // Check for suspicious activity
  const recentAttempts = loginAttempts.filter(
    a => (Date.now() - a.timestamp) < 60000 * 5 // Last 5 minutes
  );
  
  return !success && recentAttempts.length >= 3;
};
