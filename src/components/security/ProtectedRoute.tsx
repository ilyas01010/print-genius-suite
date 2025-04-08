import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated, isLoading } = useUser();
  const location = useLocation();
  
  const hasRequiredRole = !requiredRole || (user?.user_metadata?.role === requiredRole);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated && user?.id !== 'demo-user') {
      console.log('Unauthorized access attempt:', {
        path: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
    }
  }, [isLoading, isAuthenticated, location.pathname, user]);

  if (!isLoading && user?.id === 'demo-user') {
    return <>{children}</>;
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
