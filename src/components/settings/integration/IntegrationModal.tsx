
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export type IntegrationStep = 'credentials' | 'authorize' | 'success' | 'error';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    name: string;
    icon: React.ReactNode;
  };
  onConnect: (credentials: { apiKey?: string; username?: string; password?: string; }) => Promise<boolean>;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({
  isOpen,
  onClose,
  platform,
  onConnect
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState<IntegrationStep>('credentials');
  const [isProcessing, setIsProcessing] = useState(false);
  const [credentials, setCredentials] = useState({
    apiKey: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError(null);
  };

  const handleNext = async () => {
    // Basic validation
    if ((!credentials.apiKey && (!credentials.username || !credentials.password))) {
      setError('Please provide either an API key or both username and password');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Authorize with the platform
      setStep('authorize');
      
      // Simulate authorization delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Try to connect using the provided credentials
      const success = await onConnect(credentials);
      
      if (success) {
        setStep('success');
        toast({
          title: "Integration Successful",
          description: `${platform.name} has been successfully connected to your account.`,
        });
        
        // Close the modal after success
        setTimeout(() => {
          onClose();
          // Reset the form for next time
          setStep('credentials');
          setCredentials({ apiKey: '', username: '', password: '' });
        }, 2000);
      } else {
        setStep('error');
        setError('Failed to connect. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Integration error:', err);
      setStep('error');
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setStep('credentials');
    setError(null);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'credentials':
        return (
          <>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key (Recommended)</Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  placeholder="Enter your API key"
                  value={credentials.apiKey}
                  onChange={handleChange}
                />
              </div>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 flex-shrink text-xs text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              
              {error && (
                <div className="text-sm text-red-500 flex items-center gap-1 pt-1">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={handleNext}>
                Connect
              </Button>
            </DialogFooter>
          </>
        );
        
      case 'authorize':
        return (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <p className="text-center">
              Connecting to {platform.name}...<br />
              <span className="text-sm text-muted-foreground">Please wait while we verify your credentials</span>
            </p>
          </div>
        );
        
      case 'success':
        return (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <div className="text-center">
              <p className="font-medium">Connection Successful!</p>
              <p className="text-sm text-muted-foreground">Your {platform.name} account has been connected.</p>
            </div>
          </div>
        );
        
      case 'error':
        return (
          <>
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
              <div className="text-center">
                <p className="font-medium">Connection Failed</p>
                <p className="text-sm text-red-500">{error || 'An unknown error occurred'}</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={handleRetry}>
                Try Again
              </Button>
            </DialogFooter>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {platform.icon}
            </div>
            <div>
              <DialogTitle>Connect to {platform.name}</DialogTitle>
              <DialogDescription>
                Link your {platform.name} account to enable automatic syncing
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationModal;
