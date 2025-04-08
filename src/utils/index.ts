
interface AuthResult {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  } | null;
}

export const checkAuthentication = async (): Promise<AuthResult> => {
  // In a real app, this would check a token in localStorage or make an API call
  // For now, we'll simulate authentication
  
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      return {
        isAuthenticated: true,
        user: userData
      };
    } catch (e) {
      console.error("Error parsing stored user data", e);
    }
  }
  
  return {
    isAuthenticated: false,
    user: null
  };
};
