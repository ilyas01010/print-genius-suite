import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase, initializeSupabase } from "@/lib/supabase-client";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Loader2 } from "lucide-react";

// Eagerly loaded components
import Index from "@/pages/Index";

// Lazy loaded pages with improved loading boundary
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <p className="mt-4 text-muted-foreground">Loading...</p>
  </div>
);

// Lazy loaded routes with aggressive prefetching
const NotFound = lazy(() => import("@/pages/NotFound"));
const DesignGenerator = lazy(() => {
  const promise = import("@/pages/DesignGenerator");
  // Prefetch related components
  import("@/components/design-generator/DesignUploader");
  return promise;
});
const NicheResearch = lazy(() => import("@/pages/NicheResearch"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const CopyrightChecker = lazy(() => import("@/pages/CopyrightChecker"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const PlatformManager = lazy(() => import("@/pages/PlatformManager"));
const CustomerService = lazy(() => import("@/pages/CustomerService"));
const MarketingPlanner = lazy(() => import("@/pages/MarketingPlanner"));
const Settings = lazy(() => import("@/pages/Settings"));
const LearningHub = lazy(() => import("@/pages/LearningHub"));

// ScrollToTop component to handle scroll restoration on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Configure React Query with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  // Load settings from localStorage with memoization
  const [userSettings, setUserSettings] = useState(() => {
    try {
      const storedSettings = localStorage.getItem("userSettings");
      if (storedSettings) {
        return JSON.parse(storedSettings);
      }
    } catch (error) {
      console.error("Error parsing settings from localStorage:", error);
    }
    
    return {
      darkMode: false,
      language: "en",
      emailNotifications: true,
      pushNotifications: true,
      timezone: "utc",
      publicProfile: false
    };
  });
  
  // Initialize Supabase storage on app mount
  useEffect(() => {
    const initStorage = async () => {
      try {
        // Initialize Supabase and required storage buckets
        await initializeSupabase();
        
        // Also call the edge function to create buckets if needed
        if (supabase) {
          const { error } = await supabase.functions.invoke('initialize-storage');
          if (error) {
            console.error("Error initializing storage via edge function:", error);
          }
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };
    
    initStorage();
  }, []);

  // Update settings in localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("userSettings", JSON.stringify(userSettings));
    } catch (error) {
      console.error("Error saving settings to localStorage:", error);
    }
  }, [userSettings]);

  // Apply dark mode class based on setting
  useEffect(() => {
    if (userSettings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [userSettings.darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <LanguageProvider>
          <UserProvider>
            <Router>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Index />} />
                  <Route path="/design-generator" element={<DesignGenerator />} />
                  <Route path="/niche-research" element={<NicheResearch />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/copyright-checker" element={<CopyrightChecker />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/platform" element={<PlatformManager />} />
                  <Route path="/customer" element={<CustomerService />} />
                  <Route path="/marketing" element={<MarketingPlanner />} />
                  <Route path="/learning" element={<LearningHub />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </Router>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
