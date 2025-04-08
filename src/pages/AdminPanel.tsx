
import React, { useState } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminAuth from "@/components/admin/AdminAuth";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="space-y-6 animate-fade">
      <h1 className="font-bold text-3xl">Admin Control Panel</h1>
      {!isAuthenticated ? (
        <AdminAuth onVerified={() => setIsAuthenticated(true)} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminPanel;
