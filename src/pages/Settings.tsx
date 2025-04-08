
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6">
          <div>
            <h1 className="font-bold text-3xl">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <SettingsTabs />
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Settings;
