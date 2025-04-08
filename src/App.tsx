
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useUser } from "./context/UserContext";
import { checkAuthentication } from "./utils";

// Layout components
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import LearningHub from "./pages/LearningHub";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Business management pages
import MultiPlatformManager from "./pages/MultiPlatformManager";
import DesignGenerator from "./pages/DesignGenerator";
import NicheResearch from "./pages/NicheResearch";
import CopyrightChecker from "./pages/CopyrightChecker";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import CustomerService from "./pages/CustomerService";
import MarketingPlanner from "./pages/MarketingPlanner";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authResult = await checkAuthentication();
      setIsAuthenticated(authResult.isAuthenticated);
      setUser(authResult.user);
      setLoading(false);

      if (window.location.pathname === '/auth' && authResult.isAuthenticated) {
        navigate('/profile');
      }
    };

    checkAuth();
  }, [setIsAuthenticated, setUser, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Application routes with consistent layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learning" element={<LearningHub />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<AdminPanel />} />
        
        {/* Business management routes */}
        <Route path="/platforms" element={<MultiPlatformManager />} />
        <Route path="/design" element={<DesignGenerator />} />
        <Route path="/niche-research" element={<NicheResearch />} />
        <Route path="/copyright-checker" element={<CopyrightChecker />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/marketing" element={<MarketingPlanner />} />
        <Route path="/support" element={<Support />} />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
