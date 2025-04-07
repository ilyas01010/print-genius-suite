
import React from "react";
import Layout from "@/components/layout/Layout";
import DesignUploader from "@/components/design-generator/DesignUploader";
import DesignGallery from "@/components/design-generator/DesignGallery";
import { useUser } from "@/context/UserContext";
import DesignTemplates from "@/components/design-generator/templates/DesignTemplates";

const DesignGenerator = () => {
  const { isAuthenticated } = useUser();
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Design Generator</h1>
          <p className="text-muted-foreground">
            Access free, copyright-free designs and resources for your print on demand products
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
