
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl">Settings</h1>
          </div>
          
          <div className="mt-2">
            <SettingsTabs />
          </div>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default Settings;
