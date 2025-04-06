
import React from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { SettingsProvider } from "@/context/SettingsContext";
import { useSettingsInit } from "@/hooks/use-settings-init";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

const SettingsContent = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  useSettingsInit();
  
  return (
    <div className="space-y-6 animate-fade">
      <Card className="p-4 md:p-6 bg-card/50 backdrop-blur border border-border/50">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{t('common.settings')}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Configure your account and application preferences
          </p>
        </div>
      </Card>

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
