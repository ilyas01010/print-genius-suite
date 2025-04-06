
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import DesignUploader from "@/components/design-generator/DesignUploader";
import DesignGallery from "@/components/design-generator/DesignGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Text, ImageIcon, Shapes } from "lucide-react";
import { Button } from "@/components/ui/button";

const DesignGenerator = () => {
  const { isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState("templates");
  
  // Mock design templates data
  const templates = [
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
    <Layout>
      <div className="space-y-6 animate-fade">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Design Generator</h1>
          <p className="text-muted-foreground">
            Create and edit Print-on-Demand ready designs
          </p>
        </div>

        <div className="grid gap-6">
          <DesignUploader />
          
          {isAuthenticated && <DesignGallery />}
          
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {getTemplatesByCategory("all").map((template) => (
                      <div 
                        key={template.id}
                        className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                          {template.popular && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {categoryIcons[template.category as keyof typeof categoryIcons]}
                              <span>{template.category}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {getTemplatesByCategory("popular").map((template) => (
                      <div 
                        key={template.id}
                        className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                            Popular
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {categoryIcons[template.category as keyof typeof categoryIcons]}
                              <span>{template.category}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="text" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {getTemplatesByCategory("text").map((template) => (
                      <div 
                        key={template.id}
                        className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                          {template.popular && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Text className="h-4 w-4" />
                              <span>Text</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="illustration" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {getTemplatesByCategory("illustration").map((template) => (
                      <div 
                        key={template.id}
                        className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                          {template.popular && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Palette className="h-4 w-4" />
                              <span>Illustration</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="pattern" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {getTemplatesByCategory("pattern").map((template) => (
                      <div 
                        key={template.id}
                        className="group overflow-hidden rounded-md border hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="aspect-square bg-muted relative overflow-hidden">
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          />
                          {template.popular && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">{template.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Shapes className="h-4 w-4" />
                              <span>Pattern</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-xs"
                            >
                              Use Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DesignGenerator;
