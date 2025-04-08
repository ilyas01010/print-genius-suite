
export interface LoginAttempt {
  timestamp: number;
  success: boolean;
  ip?: string;
}

export type AuthStep = "password" | "mfa";

export interface AdminAuthState {
  step: AuthStep;
  password: string;
  mfaCode: string;
  isSubmitting: boolean;
  loginAttempts: LoginAttempt[];
  isLocked: boolean;
  lockoutEndTime: number | null;
  lockoutRemaining: number;
}
