
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useUser } from "./context/UserContext";
import IndexPage from "./pages/index"; // Updated import name
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import LearningHub from "./pages/LearningHub";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { checkAuthentication } from "./utils";

// Import your new pages
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
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/learning" element={<LearningHub />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Add new POD business management routes */}
      <Route path="/platforms" element={<MultiPlatformManager />} />
      <Route path="/design" element={<DesignGenerator />} />
      <Route path="/niche-research" element={<NicheResearch />} />
      <Route path="/copyright-checker" element={<CopyrightChecker />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/marketing" element={<MarketingPlanner />} />
      <Route path="/support" element={<Support />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
