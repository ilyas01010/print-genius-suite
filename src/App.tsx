
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserProvider } from "@/context/UserContext";
import { initializeSupabase } from "@/lib/supabase-client";

import Index from "./pages/Index";
import NicheResearch from "./pages/NicheResearch";
import DesignGenerator from "./pages/DesignGenerator";
import CopyrightChecker from "./pages/CopyrightChecker";
import PlatformManager from "./pages/PlatformManager";
import MarketingPlanner from "./pages/MarketingPlanner";
import Analytics from "./pages/Analytics";
import CustomerService from "./pages/CustomerService";
import LearningHub from "./pages/LearningHub";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      // Initialize Supabase
      await initializeSupabase();
      
      // Simulate app initialization
      setTimeout(() => {
        setAppReady(true);
        console.log("Print Genius Suite initialized");
      }, 500);
    };

    initApp();
  }, []);

  if (!appReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium text-muted-foreground">Loading Print Genius Suite...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <UserProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/niche-research" element={<NicheResearch />} />
              <Route path="/design-generator" element={<DesignGenerator />} />
              <Route path="/copyright-checker" element={<CopyrightChecker />} />
              <Route path="/platform-manager" element={<PlatformManager />} />
              <Route path="/marketing-planner" element={<MarketingPlanner />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/customer-service" element={<CustomerService />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
