
import { useState } from "react";
import { Platform, Product, NewPlatform, DateRangeFilter } from "@/components/platform-manager/types";
import { useToast } from "@/hooks/use-toast";

export const usePlatformData = () => {
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

  const [products, setProducts] = useState<Product[]>([
    { 
      id: "p1", 
      name: "Graphic Tee", 
      price: 24.99, 
      platformId: "etsy",
      status: "active",
      createdAt: "2023-02-01T10:30:00Z" 
    },
    { 
      id: "p2", 
      name: "Coffee Mug", 
      price: 14.99, 
      platformId: "etsy",
      status: "active",
      createdAt: "2023-02-15T14:45:00Z" 
    },
    { 
      id: "p3", 
      name: "Phone Case", 
      price: 19.99, 
      platformId: "etsy",
      status: "active",
      createdAt: "2023-03-05T09:15:00Z" 
    },
    { 
      id: "p4", 
      name: "Art Print", 
      price: 29.99, 
      platformId: "etsy",
      status: "active",
      createdAt: "2023-03-20T16:30:00Z" 
    },
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

      setProducts(products.filter(product => product.platformId !== platformId));

      toast({
        title: "Disconnection Successful",
        description: `Successfully disconnected from ${platforms.find(p => p.id === platformId)?.name}.`,
      });
    }, 1500);
  };

  // Product operations
  const handleAddProduct = (productName: string, productPrice: number, platformId: string) => {
    const selectedPlatform = platforms.find(p => p.id === platformId);
    
    if (!selectedPlatform) {
      toast({
        title: "Error",
        description: "No platform selected to add product to.",
        variant: "destructive"
      });
      return;
    }

    const price = parseFloat(productPrice.toString());
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price.",
        variant: "destructive"
      });
      return;
    }

    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: productName,
      price: price,
      platformId: selectedPlatform.id,
      status: "active",
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);

    setPlatforms(platforms.map(p => 
      p.id === selectedPlatform.id 
        ? { 
            ...p, 
            products: p.products + 1,
            productsCount: (p.productsCount || 0) + 1,
            activeProductsCount: (p.activeProductsCount || 0) + 1,
            revenue: p.revenue + price,
            revenue30d: (p.revenue30d || 0) + price,
            sales30d: (p.sales30d || 0) + 1
          } 
        : p
    ));

    toast({
      title: "Product Added",
      description: `${productName} has been added to ${selectedPlatform.name}.`,
    });
  };

  const handleDeleteProduct = (product: Product) => {
    const platform = platforms.find(p => p.id === product.platformId);
    if (!platform) return;

    setProducts(products.filter(p => p.id !== product.id));

    setPlatforms(platforms.map(p => 
      p.id === product.platformId 
        ? { 
            ...p, 
            products: p.products - 1,
            productsCount: (p.productsCount || p.products) - 1,
            activeProductsCount: (p.activeProductsCount || 0) - 1,
            revenue: p.revenue - product.price
          } 
        : p
    ));

    toast({
      title: "Product Deleted",
      description: `${product.name} has been removed from ${platform.name}.`,
    });
  };

  // Filter data based on date range
  const filterData = (dateRange: DateRangeFilter) => {
    const filteredPlatforms = dateRange.startDate && dateRange.endDate 
      ? platforms.filter(p => {
          if (!p.createdAt) return true;
          const date = new Date(p.createdAt);
          return date >= dateRange.startDate! && date <= dateRange.endDate!;
        })
      : platforms;

    const filteredProducts = dateRange.startDate && dateRange.endDate 
      ? products.filter(p => {
          if (!p.createdAt) return true;
          const date = new Date(p.createdAt);
          return date >= dateRange.startDate! && date <= dateRange.endDate!;
        })
      : products;

    return { filteredPlatforms, filteredProducts };
  };

  // Calculate metrics
  const calculateMetrics = (filteredPlatforms: Platform[]) => {
    const totalProducts = filteredPlatforms.reduce((sum, platform) => sum + platform.products, 0);
    const totalRevenue = filteredPlatforms.reduce((sum, platform) => sum + platform.revenue, 0);
    const connectedPlatforms = filteredPlatforms.filter(p => p.status === "connected").length;

    return { totalProducts, totalRevenue, connectedPlatforms };
  };

  return {
    platforms,
    products,
    handleAddNewPlatform,
    handleConnectPlatform,
    handleDisconnectPlatform,
    handleAddProduct,
    handleDeleteProduct,
    filterData,
    calculateMetrics
  };
};
