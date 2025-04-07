
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Simple pass-through component without authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
