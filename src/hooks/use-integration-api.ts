
import { useCallback } from "react";

export const useIntegrationApi = () => {
  // Simulate API call for testing
  const simulateApiCall = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 90% success rate for testing
        resolve(Math.random() > 0.1);
      }, 1500);
    });
  }, []);

  // Generate a more realistic API key
  const generateApiKey = useCallback((): string => {
    const keyPrefix = "pg_live_";
    const keyBody = Array(24)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    
    return `${keyPrefix}${keyBody}`;
  }, []);
  
  // Validate API key format
  const validateApiKey = useCallback((key: string): boolean => {
    const regex = /^pg_live_[0-9a-f]{24}$/;
    return regex.test(key);
  }, []);

  return {
    simulateApiCall,
    generateApiKey,
    validateApiKey
  };
};
