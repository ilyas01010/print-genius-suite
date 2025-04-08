
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AccountLockout from "@/components/admin/auth/AccountLockout";
import PasswordForm from "@/components/admin/auth/PasswordForm";
import MfaForm from "@/components/admin/auth/MfaForm";

interface AdminAuthProps {
  onVerified: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onVerified }) => {
  const {
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
  } = useAdminAuth(onVerified);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Admin Authentication</CardTitle>
        </div>
        <CardDescription>
          {step === "password"
            ? "Please enter your admin password to continue."
            : "Enter the verification code sent to your device."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLocked ? (
          <AccountLockout 
            formatLockoutTime={formatLockoutTime}
            lockoutRemaining={lockoutRemaining}
          />
        ) : step === "password" ? (
          <PasswordForm 
            password={password}
            setPassword={setPassword}
            isSubmitting={isSubmitting}
            onSubmit={handlePasswordSubmit}
          />
        ) : (
          <MfaForm 
            mfaCode={mfaCode}
            setMfaCode={setMfaCode}
            isSubmitting={isSubmitting}
            onSubmit={handleMfaSubmit}
          />
        )}
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <div className="text-sm text-muted-foreground">
          <p className="text-center">
            For security purposes, all access attempts are logged.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminAuth;
