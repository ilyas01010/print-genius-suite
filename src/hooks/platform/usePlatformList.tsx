
import { useState } from "react";
import { Platform, NewPlatform } from "@/components/platform-manager/types";
import { useToast } from "@/hooks/use-toast";

export const usePlatformList = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "etsy",
      name: "Etsy",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Etsy_logo.svg",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Etsy_logo.svg",
      url: "https://etsy.com",
      description: "Sell handmade and vintage items on Etsy's marketplace",
      status: "connected",
      products: 24,
      productsCount: 24,
      activeProductsCount: 18,
      sales30d: 42,
      revenue: 1250.75,
      revenue30d: 1250.75,
      createdAt: "2023-01-15T10:30:00Z",
      lastSync: "2023-04-01T14:30:00Z"
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      url: "https://amazon.com",
      description: "The world's largest online marketplace",
      status: "disconnected",
      products: 0,
      productsCount: 0,
      activeProductsCount: 0,
      sales30d: 0,
      revenue: 0,
      revenue30d: 0,
      createdAt: "2023-02-20T14:45:00Z"
    },
    {
      id: "shopify",
      name: "Shopify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      url: "https://shopify.com",
      description: "Your own customizable online store platform",
      status: "disconnected",
      products: 0,
      productsCount: 0,
      activeProductsCount: 0,
      sales30d: 0,
      revenue: 0,
      revenue30d: 0,
      createdAt: "2023-03-10T09:15:00Z"
    }
  ]);

  // Platform operations
  const handleAddNewPlatform = (platform: NewPlatform) => {
    if (platforms.some(p => p.id === platform.id)) {
      toast({
        title: "Platform already exists",
        description: `${platform.name} is already in your platform list.`,
        variant: "destructive"
      });
      return;
    }

    setPlatforms([
      ...platforms,
      {
        ...platform,
        status: "disconnected",
        products: 0,
        revenue: 0,
        productsCount: 0,
        activeProductsCount: 0,
        sales30d: 0,
        revenue30d: 0,
        createdAt: new Date().toISOString()
      }
    ]);

    toast({
      title: "Platform Added",
      description: `${platform.name} has been added to your platforms.`,
    });
  };

  const handleConnectPlatform = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId 
        ? { ...p, status: "connecting" } 
        : p
    ));

    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { ...p, status: "connected", lastSync: new Date().toISOString() } 
          : p
      ));

      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${platforms.find(p => p.id === platformId)?.name}.`,
      });
    }, 2000);
  };

  const handleDisconnectPlatform = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId 
        ? { ...p, status: "connecting" } 
        : p
    ));

    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { 
              ...p, 
              status: "disconnected", 
              products: 0, 
              revenue: 0,
              productsCount: 0,
              activeProductsCount: 0,
              sales30d: 0,
              revenue30d: 0
            } 
          : p
      ));

      toast({
        title: "Disconnection Successful",
        description: `Successfully disconnected from ${platforms.find(p => p.id === platformId)?.name}.`,
      });
    }, 1500);
  };

  return {
    platforms,
    handleAddNewPlatform,
    handleConnectPlatform,
    handleDisconnectPlatform
  };
};
