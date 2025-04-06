
import React from "react";
import Layout from "@/components/layout/Layout";
import DesignUploader from "@/components/design-generator/DesignUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DesignGenerator = () => {
  // Mock design templates data
  const templates = [
    { id: 1, name: "Minimalist Typography", category: "Text" },
    { id: 2, name: "Retro Graphic", category: "Illustration" },
    { id: 3, name: "Nature Photography", category: "Photo" },
    { id: 4, name: "Bold Statement", category: "Text" },
    { id: 5, name: "Line Art Animal", category: "Illustration" },
    { id: 6, name: "Abstract Pattern", category: "Pattern" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Design Generator</h1>
          <p className="text-muted-foreground">
            Create and edit Print-on-Demand ready designs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DesignUploader />
          
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className="rounded-md border bg-card/50 p-3 hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="h-24 rounded bg-muted flex items-center justify-center mb-2">
                      {template.id}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        Use
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DesignGenerator;
