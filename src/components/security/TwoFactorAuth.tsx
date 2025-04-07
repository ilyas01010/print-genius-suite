
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TwoFactorAuthProps {
  onVerify: (code: string) => Promise<boolean>;
  onCancel: () => void;
  onResend: () => Promise<void>;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onVerify, onCancel, onResend }) => {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onVerify(code);
      
      if (!result) {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      console.error('Error during 2FA verification:', err);
      setError('An error occurred during verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResend = async () => {
    setIsResending(true);
    
    try {
      await onResend();
      toast({
        title: 'Code resent',
        description: 'A new verification code has been sent.',
      });
    } catch (err) {
      console.error('Error resending code:', err);
      toast({
        title: 'Error',
        description: 'Failed to resend verification code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Enter the 6-digit code sent to your device to continue.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          {error && (
            <div className="flex items-center text-destructive gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex justify-between w-full gap-3">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onCancel} 
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isSubmitting || code.length !== 6}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </div>
          
          <Button
            variant="ghost"
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-sm"
          >
            {isResending ? "Sending..." : "Didn't receive a code? Resend"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TwoFactorAuth;
