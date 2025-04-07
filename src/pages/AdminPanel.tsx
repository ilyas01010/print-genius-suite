
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminPanel = () => {
  // Simple admin panel without auth checks
  return (
    <div className="space-y-6 animate-fade">
      <h1 className="font-bold text-3xl">Admin Control Panel</h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminPanel;
