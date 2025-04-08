
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Settings</h1>
      </div>
      
      <div className="mt-2">
        <SettingsTabs />
      </div>
    </div>
  );
};

export default Settings;
