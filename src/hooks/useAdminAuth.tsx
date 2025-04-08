
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { logSecurityEvent, detectSuspiciousLogin } from "@/lib/security/auth";

// You should set this in an environment variable or secure storage in a real app
// This is just for demonstration
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export interface LoginAttempt {
  timestamp: number;
  success: boolean;
  ip?: string;
}

export const useAdminAuth = (onVerified: () => void) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"password" | "mfa">("password");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);
  const { user } = useUser();

  // Check if account is locked
  useEffect(() => {
    const checkLockStatus = () => {
      // Get attempts in the last 15 minutes
      const recentAttempts = loginAttempts.filter(
        attempt => (Date.now() - attempt.timestamp) < LOCKOUT_DURATION_MS
      );
      
      // Count failed attempts
      const failedAttempts = recentAttempts.filter(attempt => !attempt.success).length;
      
      if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
        // Calculate when the lockout ends
        const latestAttempt = Math.max(...recentAttempts.map(a => a.timestamp));
        const lockoutEnd = latestAttempt + LOCKOUT_DURATION_MS;
        
        setIsLocked(lockoutEnd > Date.now());
        setLockoutEndTime(lockoutEnd);
      } else {
        setIsLocked(false);
        setLockoutEndTime(null);
      }
    };
    
    checkLockStatus();
    
    // Update lockout remaining time
    const interval = setInterval(() => {
      if (lockoutEndTime) {
        const remaining = lockoutEndTime - Date.now();
        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutEndTime(null);
          setLockoutRemaining(0);
        } else {
          setLockoutRemaining(remaining);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [loginAttempts, lockoutEndTime]);

  // Format remaining lockout time
  const formatLockoutTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Record login attempt
  const recordAttempt = (success: boolean) => {
    const attempt: LoginAttempt = {
      timestamp: Date.now(),
      success,
    };
    
    setLoginAttempts(prev => [...prev, attempt]);
    
    // Log security event
    if (user?.id) {
      logSecurityEvent(
        success ? "admin_login_success" : "admin_login_failure", 
        user.id,
        {
          email: user.email,
          timestamp: new Date().toISOString(),
        }
      );
    }
    
    // Check if the login attempts are suspicious
    const recentAttempts = [...loginAttempts, attempt].filter(
      a => (Date.now() - a.timestamp) < 60000 * 5 // Last 5 minutes
    );
    
    if (!success && detectSuspiciousLogin(recentAttempts.length, 5)) {
      toast({
        title: "Security Alert",
        description: "Suspicious login attempts detected. Please contact support if this wasn't you.",
        variant: "destructive",
      });
    }
  };

  // Handle password submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (isLocked) {
      toast({
        title: "Account Temporarily Locked",
        description: `Too many failed attempts. Please try again later.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // In a real implementation, you would verify this against a secure backend endpoint with proper hashing
      // NEVER hardcode passwords in production code
      if (password === "admin123") { // This is just for demo - use a secure password in production
        toast({
          title: "Password verified",
          description: "Please enter the MFA code sent to your device",
        });
        setStep("mfa");
        
        // Simulate sending MFA code
        // In a real app, you'd call your backend to trigger an MFA code delivery
        console.log("Sending MFA code to admin...");
        
        toast({
          title: "MFA Code Sent",
          description: `A verification code has been sent to your device.`,
        });
        
        // Record successful password attempt
        recordAttempt(true);
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect admin password. Access attempt logged.",
          variant: "destructive",
        });
        
        // Record failed attempt
        recordAttempt(false);
        
        // In a real app, you would log this failed attempt
        console.log(`Failed admin login attempt for user: ${user?.email}`);
      }
    } catch (error) {
      console.error("Admin auth error:", error);
      toast({
        title: "Authentication error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive",
      });
      
      // Record failed attempt
      recordAttempt(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle MFA submission
  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would verify this against a secure backend endpoint
      // For this demo, we'll accept any 6-digit code
      if (mfaCode.length === 6) {
        toast({
          title: "Access granted",
          description: "Welcome to the Admin Control Panel",
        });
        
        // Record successful MFA attempt
        recordAttempt(true);
        onVerified();
      } else {
        toast({
          title: "Verification failed",
          description: "Incorrect MFA code. Access attempt logged.",
          variant: "destructive",
        });
        
        // Record failed attempt
        recordAttempt(false);
        
        // In a real app, you would log this failed attempt
        console.log(`Failed MFA attempt for user: ${user?.email}`);
      }
    } catch (error) {
      console.error("MFA verification error:", error);
      toast({
        title: "Verification error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
      
      // Record failed attempt
      recordAttempt(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    password,
    setPassword,
    mfaCode,
    setMfaCode,
    isSubmitting,
    isLocked,
    lockoutRemaining,
    formatLockoutTime,
    handlePasswordSubmit,
    handleMfaSubmit
  };
};
