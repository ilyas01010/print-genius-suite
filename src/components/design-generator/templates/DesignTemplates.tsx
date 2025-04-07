
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Palette, 
  Image as ImageIcon, 
  Shapes, 
  Type, 
  FileImage, 
  Package, 
  Search, 
  Filter, 
  SlidersHorizontal 
} from "lucide-react";
import ResourceGrid from "./ResourceGrid";
import { DesignResource, ResourceType, RESOURCE_TYPES } from "./ResourceTypes";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DesignTemplates = () => {
  // Mock free POD design resources
  const resources: DesignResource[] = [
    {
      id: 1,
      name: "Minimalist Mountain T-Shirt Design",
      type: "design",
      source: "Freepik",
      imageUrl: "https://via.placeholder.com/300x300?text=Mountain+Design",
      downloadUrl: "https://via.placeholder.com/300x300?text=Mountain+Design",
      category: "T-Shirts",
      popular: true,
      tags: ["Minimalist", "Nature", "T-Shirt"]
    },
    {
      id: 2,
      name: "Vintage Badge Collection",
      type: "graphic",
      source: "Adobe Express",
      imageUrl: "https://via.placeholder.com/300x300?text=Vintage+Badges",
      downloadUrl: "https://via.placeholder.com/300x300?text=Vintage+Badges",
      category: "Stickers",
      popular: true,
      tags: ["Vintage", "Badges", "Retro"]
    },
    {
      id: 3,
      name: "Coffee Mug Mockup Bundle",
      type: "mockup",
      source: "Placeit",
      imageUrl: "https://via.placeholder.com/300x300?text=Mug+Mockups",
      downloadUrl: "https://via.placeholder.com/300x300?text=Mug+Mockups",
      category: "Mugs",
      popular: true,
      tags: ["Mockup", "Coffee", "Drinkware"]
    },
    {
      id: 4,
      name: "Bold Statement Typography Pack",
      type: "font",
      source: "Adobe Express",
      imageUrl: "https://via.placeholder.com/300x300?text=Typography+Pack",
      downloadUrl: "https://via.placeholder.com/300x300?text=Typography+Pack",
      category: "All",
      popular: false,
      tags: ["Typography", "Bold", "Statement"]
    },
    {
      id: 5,
      name: "Watercolor Animal Collection",
      type: "graphic",
      source: "Freepik",
      imageUrl: "https://via.placeholder.com/300x300?text=Watercolor+Animals",
      downloadUrl: "https://via.placeholder.com/300x300?text=Watercolor+Animals",
      category: "Wall Art",
      popular: true,
      tags: ["Watercolor", "Animals", "Artistic"]
    },
    {
      id: 6,
      name: "Abstract Pattern Set",
      type: "asset",
      source: "Freepik",
      imageUrl: "https://via.placeholder.com/300x300?text=Abstract+Patterns",
      downloadUrl: "https://via.placeholder.com/300x300?text=Abstract+Patterns",
      category: "All",
      popular: false,
      tags: ["Abstract", "Pattern", "Background"]
    },
    {
      id: 7,
      name: "Holiday Hoodie Template",
      type: "template",
      source: "Printful",
      imageUrl: "https://via.placeholder.com/300x300?text=Hoodie+Template",
      downloadUrl: "https://via.placeholder.com/300x300?text=Hoodie+Template",
      category: "Hoodies",
      popular: true,
      tags: ["Holiday", "Hoodie", "Seasonal"]
    },
    {
      id: 8,
      name: "Geometric Shape Collection",
      type: "graphic",
      source: "Adobe Express",
      imageUrl: "https://via.placeholder.com/300x300?text=Geometric+Shapes",
      downloadUrl: "https://via.placeholder.com/300x300?text=Geometric+Shapes",
      category: "All",
      popular: false,
      tags: ["Geometric", "Shapes", "Modern"]
    },
    {
      id: 9,
      name: "Phone Case Display Kit",
      type: "mockup",
      source: "Placeit",
      imageUrl: "https://via.placeholder.com/300x300?text=Phone+Case+Mockups",
      downloadUrl: "https://via.placeholder.com/300x300?text=Phone+Case+Mockups",
      category: "Phone Cases",
      popular: true,
      tags: ["Phone Case", "Mockup", "Tech"]
    },
    {
      id: 10,
      name: "Handcrafted Script Font",
      type: "font",
      source: "Adobe Express",
      imageUrl: "https://via.placeholder.com/300x300?text=Script+Font",
      downloadUrl: "https://via.placeholder.com/300x300?text=Script+Font",
      category: "All",
      popular: false,
      tags: ["Script", "Font", "Handcrafted"]
    },
    {
      id: 11,
      name: "Summer Themed Sticker Pack",
      type: "design",
      source: "Freepik",
      imageUrl: "https://via.placeholder.com/300x300?text=Summer+Stickers",
      downloadUrl: "https://via.placeholder.com/300x300?text=Summer+Stickers",
      category: "Stickers",
      popular: true,
      tags: ["Summer", "Stickers", "Seasonal"]
    },
    {
      id: 12,
      name: "Texture Background Kit",
      type: "asset",
      source: "Unsplash",
      imageUrl: "https://via.placeholder.com/300x300?text=Texture+Kit",
      downloadUrl: "https://via.placeholder.com/300x300?text=Texture+Kit",
      category: "All",
      popular: false,
      tags: ["Texture", "Background", "Design"]
    }
  ];

  const [activeTab, setActiveTab] = useState<ResourceType>("design");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  
  const resourceTypeIcons: Record<ResourceType, React.ReactNode> = {
    "design": <Palette className="h-3.5 w-3.5" />,
    "graphic": <ImageIcon className="h-3.5 w-3.5" />,
    "template": <FileImage className="h-3.5 w-3.5" />,
    "mockup": <Package className="h-3.5 w-3.5" />,
    "font": <Type className="h-3.5 w-3.5" />,
    "asset": <Shapes className="h-3.5 w-3.5" />
  };

  // Filter resources by type, search term, and source
  const getFilteredResources = () => {
    return resources.filter(resource => {
      // Filter by active tab (resource type)
      const typeMatch = resource.type === activeTab;
      
      // Filter by search term
      const searchMatch = searchTerm === "" || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by selected sources
      const sourceMatch = selectedSources.size === 0 || selectedSources.has(resource.source);
      
      return typeMatch && searchMatch && sourceMatch;
    });
  };

  const handleSelectResource = (resourceId: number) => {
    const resource = resources.find(r => r.id === resourceId);
    toast({
      title: `Selected: ${resource?.name}`,
      description: "This resource will be added to your design editor.",
    });
  };

  const toggleSource = (source: string) => {
    const newSources = new Set(selectedSources);
    if (newSources.has(source)) {
      newSources.delete(source);
    } else {
      newSources.add(source);
    }
    setSelectedSources(newSources);
  };

  const allSources = Array.from(new Set(resources.map(r => r.source)));
  const filteredResources = getFilteredResources();

  return (
    <Card className="shadow-sm">
      <CardHeader className="px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <CardTitle className="text-lg">Free POD Resources</CardTitle>
            <CardDescription>Copyright-free designs and assets for your print on demand products</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-8 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="px-2">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-2">
                  <p className="font-medium text-sm mb-2">Filter by source</p>
                  {allSources.map((source) => (
                    <DropdownMenuCheckboxItem
                      key={source}
                      checked={selectedSources.has(source)}
                      onCheckedChange={() => toggleSource(source)}
                    >
                      {source}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-3 pt-0 pb-4 sm:px-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ResourceType)} className="w-full">
          <TabsList className="mb-4 h-9 w-full overflow-x-auto p-1 no-scrollbar">
            {Object.entries(RESOURCE_TYPES).map(([type, { label }]) => (
              <TabsTrigger 
                key={type} 
                value={type} 
                className="text-xs whitespace-nowrap flex items-center gap-1.5"
              >
                {resourceTypeIcons[type as ResourceType]}
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(RESOURCE_TYPES).map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  {RESOURCE_TYPES[type as ResourceType].description}
                </p>
              </div>
              <ResourceGrid 
                resources={filteredResources}
                onSelect={handleSelectResource}
              />
              {filteredResources.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No {RESOURCE_TYPES[activeTab].label.toLowerCase()} found matching your criteria</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSources(new Set());
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DesignTemplates;
