
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import UserProvider from "@/context/UserContext";
import { SecurityProvider } from "@/context/SecurityContext";
import Layout from "@/components/layout/Layout";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import AdminPanel from "@/pages/AdminPanel";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { ROLES } from "@/lib/security/auth";

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

// Import css files
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <UserProvider>
          <SecurityProvider>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                
                {/* Protected routes requiring authentication */}
                <Route path="/design" element={
                  <ProtectedRoute>
                    <DesignGenerator />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                <Route path="/platform" element={
                  <ProtectedRoute>
                    <PlatformDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/niche-research" element={
                  <ProtectedRoute>
                    <NicheResearch />
                  </ProtectedRoute>
                } />
                
                <Route path="/copyright" element={
                  <ProtectedRoute>
                    <CopyrightChecker />
                  </ProtectedRoute>
                } />
                
                <Route path="/marketing" element={
                  <ProtectedRoute>
                    <MarketingPlanner />
                  </ProtectedRoute>
                } />
                
                <Route path="/learning" element={
                  <ProtectedRoute>
                    <LearningHub />
                  </ProtectedRoute>
                } />
                
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } />
                
                <Route path="/support" element={
                  <ProtectedRoute>
                    <Support />
                  </ProtectedRoute>
                } />
                
                <Route path="/customer-service" element={
                  <ProtectedRoute>
                    <CustomerService />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes requiring admin role */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole={ROLES.ADMIN}>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </SecurityProvider>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
