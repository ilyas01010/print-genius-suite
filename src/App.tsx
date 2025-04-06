
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserProvider } from "@/context/UserContext";
import { initializeSupabase, getSupabaseReadyStatus } from "@/lib/supabase-client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Database, Puzzle } from "lucide-react";

import Index from "./pages/Index";
import NicheResearch from "./pages/NicheResearch";
import DesignGenerator from "./pages/DesignGenerator";
import CopyrightChecker from "./pages/CopyrightChecker";
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
  const [supabaseReady, setSupabaseReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      // Initialize Supabase
      await initializeSupabase();
      const isSupabaseReady = getSupabaseReadyStatus();
      setSupabaseReady(isSupabaseReady);
      
      if (!isSupabaseReady) {
        toast({
          title: "Supabase Connection Required",
          description: "Please connect Supabase using the green button in the top right of the Lovable interface.",
        });
      }
      
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

  if (appReady && !supabaseReady) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-lg">
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-4 rounded-full bg-amber-100 p-3 text-amber-600">
                  <Database className="h-8 w-8" />
                </div>
                <h1 className="mb-2 text-center text-2xl font-bold">Supabase Connection Required</h1>
                <p className="text-center text-muted-foreground">
                  To use the Print Genius Suite, you need to connect to Supabase for authentication and data storage.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-md bg-amber-50 p-4 text-sm text-amber-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Puzzle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Connection Instructions</h3>
                      <div className="mt-2">
                        <p>Click the green Supabase button in the top right corner of the Lovable interface to connect your Supabase project.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => window.location.reload()}>
                  Refresh After Connecting
                </Button>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/niche-research" element={<NicheResearch />} />
              <Route path="/design-generator" element={<DesignGenerator />} />
              <Route path="/copyright-checker" element={<CopyrightChecker />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
