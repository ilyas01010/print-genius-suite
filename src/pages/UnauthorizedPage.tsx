
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  React.useEffect(() => {
    // Log the unauthorized access attempt if needed
    if (user?.id) {
      console.log('Unauthorized access attempt', {
        userId: user.id,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
        <Shield className="w-8 h-8 text-destructive" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <div className="flex items-center gap-2 text-muted-foreground mb-6">
        <AlertCircle className="w-4 h-4" />
        <p>You don't have permission to access this page</p>
      </div>
      
      <div className="bg-card border p-4 rounded-lg mb-8 max-w-md">
        <p className="text-sm text-muted-foreground">
          This access attempt has been logged for security purposes. If you believe this is an error, please contact your administrator.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="default" onClick={() => navigate('/')}>
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
