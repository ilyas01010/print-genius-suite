
import { useState, useEffect } from "react";
import { LoginAttempt } from "./types";
import { MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION_MS } from "./constants";

export const useLockoutState = (loginAttempts: LoginAttempt[]) => {
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState<number | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Check lockout status
  useEffect(() => {
    const checkLockStatus = () => {
      // Get attempts in the last lockout duration
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

  return { isLocked, lockoutEndTime, lockoutRemaining };
};
