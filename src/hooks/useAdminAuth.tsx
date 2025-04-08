
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { logSecurityEvent } from "@/lib/security/auth";

export interface LoginAttempt {
  timestamp: number;
  success: boolean;
  ip?: string;
}

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

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

  // Check lockout status
  useEffect(() => {
    const checkLockStatus = () => {
      // Get attempts in the last 15 minutes
      const recentAttempts = loginAttempts.filter(
        attempt => (Date.now() - attempt.timestamp) < LOCKOUT_DURATION_MS
      );
      
      // Count failed attempts
      const failedAttempts = recentAttempts.filter(attempt => !attempt.success).length;
      
      if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
        // Calculate lockout end time
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

  // Format time
  const formatLockoutTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Record login attempts with security logging
  const recordAttempt = (success: boolean) => {
    const attempt: LoginAttempt = {
      timestamp: Date.now(),
      success,
    };
    
    setLoginAttempts(prev => [...prev, attempt]);
    
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
    
    // Check for suspicious activity
    const recentAttempts = [...loginAttempts, attempt].filter(
      a => (Date.now() - a.timestamp) < 60000 * 5 // Last 5 minutes
    );
    
    if (!success && recentAttempts.length >= 3) {
      toast({
        title: "Security Alert",
        description: "Suspicious login attempts detected. Please contact support if this wasn't you.",
        variant: "destructive",
      });
    }
  };

  // Password verification
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
      // For demo purposes - in production this would be a secure API call
      if (password === "admin123") {
        toast({
          title: "Password verified",
          description: "Please enter the MFA code sent to your device",
        });
        setStep("mfa");
        
        // Simulate sending MFA code
        console.log("Sending MFA code to admin...");
        
        toast({
          title: "MFA Code Sent",
          description: `A verification code has been sent to your device.`,
        });
        
        recordAttempt(true);
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect admin password. Access attempt logged.",
          variant: "destructive",
        });
        
        recordAttempt(false);
        console.log(`Failed admin login attempt for user: ${user?.email}`);
      }
    } catch (error) {
      console.error("Admin auth error:", error);
      toast({
        title: "Authentication error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive",
      });
      
      recordAttempt(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // MFA verification
  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simple validation - in production, this would verify against a backend
      if (mfaCode.length === 6) {
        toast({
          title: "Access granted",
          description: "Welcome to the Admin Control Panel",
        });
        
        recordAttempt(true);
        onVerified();
      } else {
        toast({
          title: "Verification failed",
          description: "Incorrect MFA code. Access attempt logged.",
          variant: "destructive",
        });
        
        recordAttempt(false);
        console.log(`Failed MFA attempt for user: ${user?.email}`);
      }
    } catch (error) {
      console.error("MFA verification error:", error);
      toast({
        title: "Verification error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
      
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
