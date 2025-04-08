
import React from "react";
import { AlertTriangle } from "lucide-react";

interface AccountLockoutProps {
  formatLockoutTime: (ms: number) => string;
  lockoutRemaining: number;
}

const AccountLockout: React.FC<AccountLockoutProps> = ({ 
  formatLockoutTime, 
  lockoutRemaining 
}) => {
  return (
    <div className="space-y-4 text-center">
      <div className="p-3 bg-destructive/10 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="font-semibold">Account Temporarily Locked</h3>
      <p className="text-sm text-muted-foreground">
        Too many failed login attempts. Please try again in {formatLockoutTime(lockoutRemaining)}.
      </p>
    </div>
  );
};

export default AccountLockout;
