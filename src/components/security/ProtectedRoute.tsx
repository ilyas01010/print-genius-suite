
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useSecurityContext } from '@/context/SecurityContext';
import { Loader2 } from 'lucide-react';
import { logSecurityEvent } from '@/lib/security/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading: authLoading, user } = useUser();
  const { checkPermission, loading: securityLoading } = useSecurityContext();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      // Skip permission check if user is not authenticated
      if (!isAuthenticated) {
        setHasPermission(false);
        return;
      }
      
      // If no specific role required, just being authenticated is enough
      if (!requiredRole) {
        setHasPermission(true);
        return;
      }
      
      // Check specific permissions
      try {
        const result = await checkPermission(requiredRole);
        setHasPermission(result);
        
        // Log access attempt
        if (user?.id) {
          logSecurityEvent(
            result ? 'authorized_access' : 'permission_denied', 
            user.id, 
            {
              requiredRole,
              path: location.pathname,
              timestamp: new Date().toISOString(),
            }
          );
        }
      } catch (error) {
        console.error('Permission verification error:', error);
        setHasPermission(false);
      }
    };

    if (!authLoading && !securityLoading) {
      verifyAuth();
    }
  }, [isAuthenticated, requiredRole, authLoading, securityLoading, checkPermission, user, location.pathname]);

  // Still loading authentication or security info
  if (authLoading || securityLoading || hasPermission === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-sm">Verifying access...</p>
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

  // Authorized - render the children (ensuring it's a single React element for any components expecting that)
  return <>{children}</>;
}

export default ProtectedRoute;
