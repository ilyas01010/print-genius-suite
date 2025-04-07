
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

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <UserProvider>
          <SecurityProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* Root route with layout */}
              <Route path="/" element={
                <Layout>
                  <Index />
                </Layout>
              } />
              
              {/* Protected routes with layout */}
              <Route path="/design" element={
                <ProtectedRoute>
                  <Layout>
                    <DesignGenerator />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/platform" element={
                <ProtectedRoute>
                  <Layout>
                    <PlatformDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/niche-research" element={
                <ProtectedRoute>
                  <Layout>
                    <NicheResearch />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/copyright" element={
                <ProtectedRoute>
                  <Layout>
                    <CopyrightChecker />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/marketing" element={
                <ProtectedRoute>
                  <Layout>
                    <MarketingPlanner />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/learning" element={
                <ProtectedRoute>
                  <Layout>
                    <LearningHub />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/support" element={
                <ProtectedRoute>
                  <Layout>
                    <Support />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/customer-service" element={
                <ProtectedRoute>
                  <Layout>
                    <CustomerService />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole={ROLES.ADMIN}>
                  <Layout>
                    <AdminPanel />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Catch all */}
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
