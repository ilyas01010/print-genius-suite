
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Index";
import AdminPanel from "@/pages/AdminPanel";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

// Import other pages
import DesignGenerator from "@/pages/DesignGenerator";
import Settings from "@/pages/Settings";
import PlatformDashboard from "@/pages/PlatformDashboard";
import NicheResearch from "@/pages/NicheResearch";
import CopyrightChecker from "@/pages/CopyrightChecker";
import MarketingPlanner from "@/pages/MarketingPlanner";
import LearningHub from "@/pages/LearningHub";
import Analytics from "@/pages/Analytics";
import Support from "@/pages/Support";
import CustomerService from "@/pages/CustomerService";
import ProtectedRoute from "@/components/security/ProtectedRoute";

import "./App.css";

// Create a client for react-query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              {/* Authentication route - no layout */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* All routes with Layout */}
              <Route element={<Layout />}>
                {/* Root route */}
                <Route path="/" element={<Dashboard />} />
                
                {/* Regular routes */}
                <Route path="/design" element={<DesignGenerator />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/platform" element={<PlatformDashboard />} />
                <Route path="/niche-research" element={<NicheResearch />} />
                <Route path="/copyright" element={<CopyrightChecker />} />
                <Route path="/marketing" element={<MarketingPlanner />} />
                <Route path="/learning" element={<LearningHub />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/support" element={<Support />} />
                <Route path="/customer-service" element={<CustomerService />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Admin route with protection */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
