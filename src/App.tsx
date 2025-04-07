
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Index";
import AdminPanel from "@/pages/AdminPanel";
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

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Auth pages */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Root route */}
          <Route 
            path="/" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          
          {/* Public routes */}
          <Route 
            path="/design" 
            element={
              <Layout>
                <DesignGenerator />
              </Layout>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <Layout>
                <Settings />
              </Layout>
            } 
          />
          
          <Route 
            path="/platform" 
            element={
              <Layout>
                <PlatformDashboard />
              </Layout>
            } 
          />
          
          <Route 
            path="/niche-research" 
            element={
              <Layout>
                <NicheResearch />
              </Layout>
            } 
          />
          
          <Route 
            path="/copyright" 
            element={
              <Layout>
                <CopyrightChecker />
              </Layout>
            } 
          />
          
          <Route 
            path="/marketing" 
            element={
              <Layout>
                <MarketingPlanner />
              </Layout>
            } 
          />
          
          <Route 
            path="/learning" 
            element={
              <Layout>
                <LearningHub />
              </Layout>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <Layout>
                <Analytics />
              </Layout>
            } 
          />
          
          <Route 
            path="/support" 
            element={
              <Layout>
                <Support />
              </Layout>
            } 
          />
          
          <Route 
            path="/customer-service" 
            element={
              <Layout>
                <CustomerService />
              </Layout>
            } 
          />
          
          {/* Admin route without protection */}
          <Route 
            path="/admin" 
            element={
              <Layout>
                <AdminPanel />
              </Layout>
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
