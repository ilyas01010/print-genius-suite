
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  HelpCircle, 
  Settings2, 
  Info, 
  Store, 
  ShoppingCart, 
  BarChart3, 
  MessageSquare, 
  Plus 
} from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformDashboardOverview from "@/components/platform-manager/PlatformDashboardOverview";
import PlatformsList from "@/components/platform-manager/PlatformsList";
import ProductsList from "@/components/platform-manager/ProductsList";
import AnalyticsSection from "@/components/platform-manager/AnalyticsSection";
import { useToast } from "@/hooks/use-toast";
import { Platform, Product, NewPlatform, DateRangeFilter } from "@/components/platform-manager/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TutorialDialog from "@/components/platform-manager/TutorialDialog";
import FeedbackDialog from "@/components/platform-manager/FeedbackDialog";
import DateRangePicker from "@/components/platform-manager/DateRangePicker";

const PlatformDashboard = () => {
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

  const [availablePlatforms] = useState<NewPlatform[]>([
    {
      id: "printful",
      name: "Printful",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Printful_logo.svg",
      description: "Print-on-demand service with direct integration to online stores"
    },
    {
      id: "redbubble",
      name: "Redbubble",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Redbubble_logo.svg",
      description: "Global marketplace for independent artists and designers"
    },
    {
      id: "teespring",
      name: "Teespring",
      logo: "https://seeklogo.com/images/T/teespring-logo-598486FE27-seeklogo.com.png",
      description: "E-commerce platform for creating and selling custom products"
    },
    {
      id: "printify",
      name: "Printify",
      logo: "https://cdn.printify.com/storage/web/main/printify-logo.svg",
      description: "Print-on-demand network with 90+ print providers"
    },
    {
      id: "society6",
      name: "Society6",
      logo: "https://www.society6.com/images/s6-site/s6-mark.svg",
      description: "Marketplace focused on art prints and home decor"
    },
    {
      id: "teepublic",
      name: "TeePublic",
      logo: "https://www.teepublic.com/assets/logo-b894d670c5668c1a5389837310f2adbcf032b286eb897956cf0222033fc81f20.svg",
      description: "Marketplace for independent creators to sell their designs"
    },
    {
      id: "zazzle",
      name: "Zazzle",
      logo: "https://asset.zcache.com/assets/graphics/z4/uniquePages/zazzleLogoR.png",
      description: "Custom products marketplace with extensive customization options"
    },
    {
      id: "spreadshirt",
      name: "Spreadshirt",
      logo: "https://image.spreadshirtmedia.com/content/f_auto,q_auto/v1/Logos/spreadshirt_logo",
      description: "Custom apparel and accessories platform"
    },
    {
      id: "wordpress",
      name: "WordPress",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/WordPress_logo.svg",
      description: "Connect your WordPress site with WooCommerce integration"
    },
    {
      id: "gelato",
      name: "Gelato",
      logo: "https://global-uploads.webflow.com/6006f6bf85f3670a4d5228af/60083f0b21001f711dc59888_gelato-logo-black.svg",
      description: "Global production network for print-on-demand products"
    }
  ]);

  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    startDate: null,
    endDate: null,
  });

  const [showAddPlatformDialog, setShowAddPlatformDialog] = useState(false);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

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

  const totalProducts = filteredPlatforms.reduce((sum, platform) => sum + platform.products, 0);
  const totalRevenue = filteredPlatforms.reduce((sum, platform) => sum + platform.revenue, 0);
  const connectedPlatforms = filteredPlatforms.filter(p => p.status === "connected").length;

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

    setShowAddPlatformDialog(false);
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

  const handleAddProduct = () => {
    if (!selectedPlatform) {
      toast({
        title: "Error",
        description: "No platform selected to add product to.",
        variant: "destructive"
      });
      return;
    }

    if (!newProductName.trim()) {
      toast({
        title: "Error",
        description: "Product name is required.",
        variant: "destructive"
      });
      return;
    }

    const price = parseFloat(newProductPrice);
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
      name: newProductName,
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
      description: `${newProductName} has been added to ${selectedPlatform.name}.`,
    });

    setNewProductName('');
    setNewProductPrice('');
    setShowAddProductDialog(false);
    setSelectedPlatform(null);
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

    setProductToDelete(null);
  };

  const handleViewAnalytics = () => {
    setIsAnalyticsLoading(true);
    setSelectedTab("analytics");

    setTimeout(() => {
      setIsAnalyticsLoading(false);
      toast({
        title: "Analytics Loaded",
        description: "Platform analytics data has been loaded successfully.",
      });
    }, 1500);
  };

  return (
    <Layout>
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 animate-fade">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-2xl sm:text-3xl">Platform Dashboard</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setShowTutorial(true)}>
                      <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View dashboard tutorial</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground">
              Manage your POD platforms and track performance in one place
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TutorialDialog 
              open={showTutorial} 
              onOpenChange={setShowTutorial} 
            />
            
            <FeedbackDialog 
              open={showFeedbackDialog}
              onOpenChange={setShowFeedbackDialog}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          
          <Dialog open={showAddPlatformDialog} onOpenChange={setShowAddPlatformDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-3.5 w-3.5" /> Add Platform
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Platform</DialogTitle>
                <DialogDescription>Select a platform to add to your dashboard.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
                {availablePlatforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center p-3 hover:bg-muted"
                    onClick={() => handleAddNewPlatform(platform)}
                  >
                    <div className="h-8 w-8 overflow-hidden mb-2">
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`} 
                        className="h-full w-full object-contain" 
                      />
                    </div>
                    <span className="text-xs text-center">{platform.name}</span>
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <PlatformDashboardOverview 
            platforms={filteredPlatforms}
            onViewAllPlatforms={() => setSelectedTab("platforms")}
            onViewAllProducts={() => setSelectedTab("products")}
          />
        </TabsContent>
        
        <TabsContent value="platforms" className="space-y-4">
          <div className="space-y-4">
            <PlatformsList 
              platforms={filteredPlatforms}
              availablePlatforms={availablePlatforms}
              onAddPlatform={handleAddNewPlatform}
              onConnectPlatform={handleConnectPlatform}
              onDisconnectPlatform={handleDisconnectPlatform}
              onViewAnalytics={handleViewAnalytics}
              showAddPlatformDialog={showAddPlatformDialog}
              setShowAddPlatformDialog={setShowAddPlatformDialog}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <ProductsList 
            platforms={filteredPlatforms}
            products={filteredProducts}
            connectedPlatforms={connectedPlatforms}
            totalProducts={totalProducts}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            showAddProductDialog={showAddProductDialog}
            setShowAddProductDialog={setShowAddProductDialog}
            newProductName={newProductName}
            setNewProductName={setNewProductName}
            newProductPrice={newProductPrice}
            setNewProductPrice={setNewProductPrice}
            productToDelete={productToDelete}
            setProductToDelete={setProductToDelete}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            setSelectedTab={setSelectedTab}
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsSection 
            platforms={filteredPlatforms}
            connectedPlatforms={connectedPlatforms}
            isAnalyticsLoading={isAnalyticsLoading}
            setSelectedTab={setSelectedTab}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default PlatformDashboard;
