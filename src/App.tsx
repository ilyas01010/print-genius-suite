
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import DesignGenerator from "@/pages/DesignGenerator";
import NicheResearch from "@/pages/NicheResearch";
import Analytics from "@/pages/Analytics";
import CopyrightChecker from "@/pages/CopyrightChecker";
import AuthPage from "@/pages/AuthPage";
import PlatformManager from "@/pages/PlatformManager";
import CustomerService from "@/pages/CustomerService";
import MarketingPlanner from "@/pages/MarketingPlanner";
import Settings from "@/pages/Settings";
import LearningHub from "@/pages/LearningHub";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  // Check for dark mode preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const storedSettings = localStorage.getItem("userSettings");
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      return settings.darkMode || false;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class based on localStorage setting
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <LanguageProvider>
          <UserProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/design-generator" element={<DesignGenerator />} />
                <Route path="/niche-research" element={<NicheResearch />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route
                  path="/copyright-checker"
                  element={<CopyrightChecker />}
                />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/platform" element={<PlatformManager />} />
                <Route path="/customer" element={<CustomerService />} />
                <Route path="/marketing" element={<MarketingPlanner />} />
                <Route path="/learning" element={<LearningHub />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
