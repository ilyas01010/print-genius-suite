
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/panels/UserManagement";
import ContentModeration from "@/components/admin/panels/ContentModeration";
import PlatformIntegrations from "@/components/admin/panels/PlatformIntegrations";
import AdminAnalytics from "@/components/admin/panels/AdminAnalytics";
import SystemSettings from "@/components/admin/panels/SystemSettings";
import ActivityLogs from "@/components/admin/panels/ActivityLogs";
import SecuritySettings from "@/components/admin/panels/SecuritySettings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Log admin activity
  const logAdminActivity = (action: string) => {
    console.log(`Admin activity: ${action} at ${new Date().toISOString()}`);
    // In a real implementation, this would be sent to your backend
  };

  // Track tab changes for activity logs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    logAdminActivity(`Viewed ${value} panel`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          System Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl font-bold">142</p>
          <p className="text-sm text-muted-foreground">+12% from last month</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="text-lg font-medium">Content Items</h3>
          <p className="text-3xl font-bold">532</p>
          <p className="text-sm text-muted-foreground">+9% from last month</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="text-lg font-medium">Active Integrations</h3>
          <p className="text-3xl font-bold">6</p>
          <p className="text-sm text-muted-foreground">All systems operational</p>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold">Welcome to the Admin Control Panel</h3>
            <p className="mt-2 text-muted-foreground">
              This secure dashboard gives you complete control over your application. 
              From here, you can manage users, content, integrations, and system settings.
            </p>
            
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-medium">Security Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium">IP Whitelisting</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium">Multi-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Enabled</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium">Encryption</p>
                  <p className="text-sm text-muted-foreground">AES-256</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium">Last Security Audit</p>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentModeration />
        </TabsContent>
        
        <TabsContent value="integrations">
          <PlatformIntegrations />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>
        
        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>
        
        <TabsContent value="logs">
          <ActivityLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
