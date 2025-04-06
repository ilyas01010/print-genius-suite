
import React from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { SettingsProvider } from "@/context/SettingsContext";
import { useSettingsInit } from "@/hooks/use-settings-init";

const SettingsContent = () => {
  const { t } = useLanguage();
  useSettingsInit();
  
  return (
    <div className="space-y-6 animate-fade">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">{t('common.settings')}</h1>
        <p className="text-muted-foreground">
          Configure your account and application preferences
        </p>
      </div>

      <SettingsTabs />
    </div>
  );
};

const Settings = () => {
  return (
    <Layout>
      <SettingsProvider>
        <SettingsContent />
      </SettingsProvider>
    </Layout>
  );
};

export default Settings;
