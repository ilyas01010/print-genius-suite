
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { checkUserRole, ROLES } from '@/lib/security/auth';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type SecurityContextType = {
  isAdmin: boolean;
  isCreator: boolean;
  isCustomer: boolean;
  checkPermission: (requiredPermission: string) => Promise<boolean>;
  loading: boolean;
};

const SecurityContext = createContext<SecurityContextType>({
  isAdmin: false,
  isCreator: false,
  isCustomer: false, 
  checkPermission: async () => false,
  loading: true
});

export const useSecurityContext = () => useContext(SecurityContext);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user?.id) {
        setIsAdmin(false);
        setIsCreator(false);
        setIsCustomer(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const adminCheck = await checkUserRole(user.id, ROLES.ADMIN);
        const creatorCheck = await checkUserRole(user.id, ROLES.CREATOR);
        const customerCheck = await checkUserRole(user.id, ROLES.CUSTOMER);
        
        setIsAdmin(adminCheck);
        setIsCreator(creatorCheck);
        setIsCustomer(customerCheck);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [user?.id, isAuthenticated]);

  const checkPermission = async (requiredPermission: string): Promise<boolean> => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please login to access this feature.",
        variant: "destructive",
      });
      navigate('/auth');
      return false;
    }

    let hasPermission = false;
    
    switch (requiredPermission) {
      case ROLES.ADMIN:
        hasPermission = isAdmin;
        break;
      case ROLES.CREATOR:
        hasPermission = isCreator || isAdmin; // Admins inherit creator permissions
        break;
      case ROLES.CUSTOMER:
        hasPermission = isCustomer || isCreator || isAdmin; // Higher roles inherit lower permissions
        break;
      default:
        hasPermission = false;
    }

    if (!hasPermission) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this feature.",
        variant: "destructive",
      });
    }

    return hasPermission;
  };

  const value = {
    isAdmin,
    isCreator,
    isCustomer,
    checkPermission,
    loading
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityProvider;
