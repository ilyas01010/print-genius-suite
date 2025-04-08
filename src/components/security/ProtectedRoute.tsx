
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Simple pass-through component without any authentication checks
  return <>{children}</>;
};

export default ProtectedRoute;
