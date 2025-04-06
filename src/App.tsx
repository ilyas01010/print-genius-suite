
import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Loader2 } from "lucide-react";

// Eagerly loaded components
import Index from "@/pages/Index";
import DesignGenerator from "@/pages/DesignGenerator";

// Lazy loaded pages with improved loading boundary
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <p className="mt-4 text-muted-foreground">Loading...</p>
  </div>
);

// Lazy loaded routes with aggressive prefetching
const NotFound = lazy(() => import("@/pages/NotFound"));
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
      // Only access localStorage in browser environment
      if (typeof window !== 'undefined') {
        const storedSettings = localStorage.getItem("userSettings");
        if (storedSettings) {
          return JSON.parse(storedSettings);
        }
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
  
  // Initialize Supabase storage on app mount only in browser environment
  useEffect(() => {
    // Skip initialization if not in browser environment or supabase is not initialized
    if (typeof window === 'undefined' || !supabase) {
      return;
    }
    
    const initStorage = async () => {
      try {
        // Don't try to call edge functions during build time
        if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
          // Safely handle edge function errors
          try {
            const { error } = await supabase.functions.invoke('initialize-storage');
            if (error) {
              console.warn("Edge function error, falling back to client initialization:", error);
            }
          } catch (err) {
            console.warn("Could not invoke edge function, continuing with client-side fallback");
          }
        }
      } catch (error) {
        console.warn("Error during initialization, continuing with application:", error);
      }
    };
    
    initStorage();
  }, []);

  // Update settings in localStorage when they change - only in browser environment
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem("userSettings", JSON.stringify(userSettings));
    } catch (error) {
      console.error("Error saving settings to localStorage:", error);
    }
  }, [userSettings]);

  // Apply dark mode class based on setting - only in browser environment
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Use requestAnimationFrame for smoother transitions when changing class
    const applyDarkMode = () => {
      if (userSettings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    
    window.requestAnimationFrame(applyDarkMode);
  }, [userSettings.darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme={userSettings.darkMode ? "dark" : "light"}>
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
