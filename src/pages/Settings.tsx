
import React from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { SettingsProvider } from "@/context/SettingsContext";
import { useSettingsInit } from "@/hooks/use-settings-init";
import { useIsMobile } from "@/hooks/use-mobile";

const SettingsContent = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  useSettingsInit();
  
  return (
    <div className="space-y-6 animate-fade">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl md:text-3xl">{t('common.settings')}</h1>
        <p className="text-sm md:text-base text-muted-foreground">
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
