
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { AuthStep, LoginAttempt } from "./admin-auth/types";
import { ADMIN_PASSWORD } from "./admin-auth/constants";
import { formatLockoutTime, recordAttempt, checkSuspiciousActivity } from "./admin-auth/utils";
import { useLockoutState } from "./admin-auth/useLockoutState";

export { formatLockoutTime } from "./admin-auth/utils";
export type { LoginAttempt } from "./admin-auth/types";

export const useAdminAuth = (onVerified: () => void) => {
  const { toast } = useToast();
  const [step, setStep] = useState<AuthStep>("password");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const { user } = useUser();
  
  // Use our lockout hook
  const { isLocked, lockoutRemaining } = useLockoutState(loginAttempts);

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
      // Check admin credentials
      if (password === ADMIN_PASSWORD) {
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
        
        const newAttempts = recordAttempt(true, loginAttempts, user?.id, user?.email);
        setLoginAttempts(newAttempts);
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect admin password. Access attempt logged.",
          variant: "destructive",
        });
        
        const newAttempts = recordAttempt(false, loginAttempts, user?.id, user?.email);
        setLoginAttempts(newAttempts);
        console.log(`Failed admin login attempt for user: ${user?.email || 'unknown'}`);
        
        // Check for suspicious activity
        if (checkSuspiciousActivity(false, newAttempts)) {
          toast({
            title: "Security Alert",
            description: "Suspicious login attempts detected. Please contact support if this wasn't you.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Admin auth error:", error);
      toast({
        title: "Authentication error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive",
      });
      
      const newAttempts = recordAttempt(false, loginAttempts, user?.id, user?.email);
      setLoginAttempts(newAttempts);
    } finally {
      setIsSubmitting(false);
    }
  };

  // MFA verification - for demo purposes, any 6-digit code will work
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
        
        const newAttempts = recordAttempt(true, loginAttempts, user?.id, user?.email);
        setLoginAttempts(newAttempts);
        onVerified();
      } else {
        toast({
          title: "Verification failed",
          description: "Incorrect MFA code. Access attempt logged.",
          variant: "destructive",
        });
        
        const newAttempts = recordAttempt(false, loginAttempts, user?.id, user?.email);
        setLoginAttempts(newAttempts);
        console.log(`Failed MFA attempt for user: ${user?.email || 'unknown'}`);
      }
    } catch (error) {
      console.error("MFA verification error:", error);
      toast({
        title: "Verification error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
      
      const newAttempts = recordAttempt(false, loginAttempts, user?.id, user?.email);
      setLoginAttempts(newAttempts);
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
