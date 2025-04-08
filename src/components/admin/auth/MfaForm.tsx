
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface MfaFormProps {
  mfaCode: string;
  setMfaCode: (code: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const MfaForm: React.FC<MfaFormProps> = ({
  mfaCode,
  setMfaCode,
  isSubmitting,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mfa-code">Verification Code</Label>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={mfaCode}
            onChange={(value) => setMfaCode(value)}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, i) => (
                  <InputOTPSlot key={i} {...slot} index={i} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Verify Code"}
      </Button>
    </form>
  );
};

export default MfaForm;
