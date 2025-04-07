
import React from "react";
import DesignUploader from "@/components/design-generator/DesignUploader";
import DesignGallery from "@/components/design-generator/DesignGallery";
import { useUser } from "@/context/UserContext";
import DesignTemplates from "@/components/design-generator/templates/DesignTemplates";

const DesignGenerator = () => {
  const { isAuthenticated } = useUser();
  
  return (
    <div className="space-y-6 animate-fade">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">Design Generator</h1>
        <p className="text-muted-foreground">
          Create professional designs for print on demand products using our powerful Photopea integration
        </p>
      </div>

      <div className="grid gap-6">
        <DesignUploader />
        
        {isAuthenticated && <DesignGallery />}
        
        <DesignTemplates />
      </div>
    </div>
  );
};

export default DesignGenerator;
