
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Text, ImageIcon, Shapes } from "lucide-react";
import TemplateGrid from "./TemplateGrid";
import { DesignTemplate } from "./DesignTemplateCard";

const DesignTemplates = () => {
  // Mock design templates data
  const templates: DesignTemplate[] = [
    { 
      id: 1, 
      name: "Minimalist Typography", 
      category: "Text",
      imageUrl: "https://via.placeholder.com/300x300?text=Typography", 
      popular: true
    },
    { 
      id: 2, 
      name: "Retro Graphic", 
      category: "Illustration",
      imageUrl: "https://via.placeholder.com/300x300?text=Retro", 
      popular: true
    },
    { 
      id: 3, 
      name: "Nature Photography", 
      category: "Photo",
      imageUrl: "https://via.placeholder.com/300x300?text=Nature", 
      popular: false
    },
    { 
      id: 4, 
      name: "Bold Statement", 
      category: "Text",
      imageUrl: "https://via.placeholder.com/300x300?text=Statement", 
      popular: false 
    },
    { 
      id: 5, 
      name: "Line Art Animal", 
      category: "Illustration",
      imageUrl: "https://via.placeholder.com/300x300?text=Line+Art", 
      popular: true
    },
    { 
      id: 6, 
      name: "Abstract Pattern", 
      category: "Pattern",
      imageUrl: "https://via.placeholder.com/300x300?text=Abstract", 
      popular: false
    },
    { 
      id: 7, 
      name: "Watercolor Floral", 
      category: "Illustration",
      imageUrl: "https://via.placeholder.com/300x300?text=Watercolor", 
      popular: true
    },
    { 
      id: 8, 
      name: "Geometric Shapes", 
      category: "Pattern",
      imageUrl: "https://via.placeholder.com/300x300?text=Geometric", 
      popular: false
    },
    { 
      id: 9, 
      name: "Vintage Badge", 
      category: "Logo",
      imageUrl: "https://via.placeholder.com/300x300?text=Vintage", 
      popular: true
    }
  ];

  const categoryIcons = {
    "Text": <Text className="h-4 w-4" />,
    "Illustration": <Palette className="h-4 w-4" />,
    "Photo": <ImageIcon className="h-4 w-4" />,
    "Pattern": <Shapes className="h-4 w-4" />,
    "Logo": <Shapes className="h-4 w-4" />
  };

  // Filter templates by category
  const getTemplatesByCategory = (category: string) => {
    if (category === "all") return templates;
    if (category === "popular") return templates.filter(t => t.popular);
    return templates.filter(t => t.category.toLowerCase() === category.toLowerCase());
  };

  const handleSelectTemplate = (templateId: number) => {
    console.log(`Selected template: ${templateId}`);
    // In a real app, this would open the template in the design editor
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Design Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="illustration">Illustration</TabsTrigger>
            <TabsTrigger value="pattern">Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <TemplateGrid 
              templates={getTemplatesByCategory("all")}
              onSelect={handleSelectTemplate}
              categoryIcons={categoryIcons}
            />
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            <TemplateGrid 
              templates={getTemplatesByCategory("popular")}
              onSelect={handleSelectTemplate}
              categoryIcons={categoryIcons}
            />
          </TabsContent>
          
          <TabsContent value="text" className="mt-0">
            <TemplateGrid 
              templates={getTemplatesByCategory("text")}
              onSelect={handleSelectTemplate}
              categoryIcons={categoryIcons}
            />
          </TabsContent>
          
          <TabsContent value="illustration" className="mt-0">
            <TemplateGrid 
              templates={getTemplatesByCategory("illustration")}
              onSelect={handleSelectTemplate}
              categoryIcons={categoryIcons}
            />
          </TabsContent>
          
          <TabsContent value="pattern" className="mt-0">
            <TemplateGrid 
              templates={getTemplatesByCategory("pattern")}
              onSelect={handleSelectTemplate}
              categoryIcons={categoryIcons}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DesignTemplates;
