
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

  return {
    simulateApiCall
  };
};
