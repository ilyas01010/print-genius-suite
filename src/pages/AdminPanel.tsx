
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Layout from "@/components/layout/Layout";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { supabase } from "@/lib/supabase-client";

// Admin email - this should be your email address
const ADMIN_EMAIL = "Digifyer@gmail.com"; // Replace with your actual email

const AdminPanel = () => {
  const { user, isLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [ipAuthorized, setIpAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if current user is the admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoading && user) {
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
          
          // Check if IP is whitelisted
          try {
            const { data, error } = await supabase
              .from('admin_ip_whitelist')
              .select('*')
              .eq('is_active', true)
              .single();
              
            if (error) {
              console.error("Error checking IP whitelist:", error);
              setIpAuthorized(false);
            } else {
              // In a real implementation, you would compare the current IP
              // with the whitelisted IPs in the database
              setIpAuthorized(true);
            }
          } catch (err) {
            console.error("IP check error:", err);
            setIpAuthorized(false);
          }
        }
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user, isLoading]);

  // Handle MFA verification completion
  const handleVerified = () => {
    setIsVerified(true);
  };

  // Show loading state
  if (isLoading || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  // Redirect non-admin users
  if (!isAdmin && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <h1 className="font-bold text-3xl">Admin Control Panel</h1>
        {isAdmin ? (
          <>
            {!ipAuthorized ? (
              <div className="bg-destructive/10 p-6 rounded-lg border border-destructive">
                <h2 className="text-xl font-semibold text-destructive">Unauthorized IP Address</h2>
                <p className="mt-2">Your current IP address is not authorized to access the admin panel.</p>
                <p className="mt-2">Please contact the system administrator if you believe this is an error.</p>
              </div>
            ) : !isVerified ? (
              <AdminAuth onVerified={handleVerified} />
            ) : (
              <AdminDashboard />
            )}
          </>
        ) : (
          <div className="bg-destructive/10 p-6 rounded-lg border border-destructive">
            <h2 className="text-xl font-semibold text-destructive">Access Denied</h2>
            <p className="mt-2">You do not have permission to access this page.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPanel;
