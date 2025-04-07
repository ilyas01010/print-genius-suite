
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";

interface AdminAuthProps {
  onVerified: () => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onVerified }) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"password" | "mfa">("password");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  // This is a simplified implementation - in a real application, this would make a secure call
  // to your backend to validate the admin credentials
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would verify this against a secure backend endpoint
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
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect admin password. Access attempt logged.",
          variant: "destructive",
        });
        
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
    } finally {
      setIsSubmitting(false);
    }
  };

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
        onVerified();
      } else {
        toast({
          title: "Verification failed",
          description: "Incorrect MFA code. Access attempt logged.",
          variant: "destructive",
        });
        
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Admin Authentication</CardTitle>
        <CardDescription>
          {step === "password"
            ? "Please enter your admin password to continue."
            : "Enter the verification code sent to your device."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "password" ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Continue"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleMfaSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mfa-code">Verification Code</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={mfaCode}
                  onChange={(value) => setMfaCode(value)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
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
