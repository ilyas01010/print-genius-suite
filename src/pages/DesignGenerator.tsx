
import React from "react";
import Layout from "@/components/layout/Layout";
import DesignUploader from "@/components/design-generator/DesignUploader";
import DesignGallery from "@/components/design-generator/DesignGallery";
import { useUser } from "@/context/UserContext";
import DesignTemplates from "@/components/design-generator/templates/DesignTemplates";
import { useLanguage } from "@/context/LanguageContext";

const DesignGenerator = () => {
  const { isAuthenticated } = useUser();
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">{t("design.title")}</h1>
          <p className="text-muted-foreground">
            Create professional designs for print on demand products using our powerful design tools
          </p>
        </div>

        <div className="grid gap-6">
          <DesignUploader />
          
          {isAuthenticated && <DesignGallery />}
          
          <DesignTemplates />
        </div>
      </div>
    </Layout>
  );
};

export default DesignGenerator;
