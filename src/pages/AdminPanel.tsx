
import React from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminPanel = () => {
  return (
    <div className="space-y-6 animate-fade">
      <h1 className="font-bold text-3xl">Admin Control Panel</h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminPanel;
