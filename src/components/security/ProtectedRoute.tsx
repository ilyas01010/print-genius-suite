
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useSecurityContext } from '@/context/SecurityContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading: authLoading } = useUser();
  const { checkPermission, loading: securityLoading } = useSecurityContext();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifyPermission = async () => {
      if (!isAuthenticated) {
        setHasPermission(false);
        return;
      }
      
      if (!requiredRole) {
        setHasPermission(true);
        return;
      }
      
      const result = await checkPermission(requiredRole);
      setHasPermission(result);
    };

    if (!authLoading && !securityLoading) {
      verifyPermission();
    }
  }, [isAuthenticated, requiredRole, authLoading, securityLoading, checkPermission]);

  // Still loading
  if (authLoading || securityLoading || hasPermission === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Authenticated but doesn't have permission
  if (requiredRole && !hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
