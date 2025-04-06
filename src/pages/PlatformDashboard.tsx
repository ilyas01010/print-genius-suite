import React, { useState } from "react";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformDashboardOverview from "@/components/platform-manager/PlatformDashboardOverview";
import PlatformsList from "@/components/platform-manager/PlatformsList";
import ProductsList from "@/components/platform-manager/ProductsList";
import AnalyticsSection from "@/components/platform-manager/AnalyticsSection";
import { useToast } from "@/hooks/use-toast";
import { Platform, Product, NewPlatform, DateRangeFilter } from "@/components/platform-manager/types";

const PlatformDashboard = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "etsy",
      name: "Etsy",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Etsy_logo.svg",
      status: "connected",
      products: 24,
      revenue: 1250.75
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      status: "disconnected",
      products: 0,
      revenue: 0
    },
    {
      id: "shopify",
      name: "Shopify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
      status: "disconnected",
      products: 0,
      revenue: 0
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: "p1", name: "Graphic Tee", price: 24.99, platformId: "etsy" },
    { id: "p2", name: "Coffee Mug", price: 14.99, platformId: "etsy" },
    { id: "p3", name: "Phone Case", price: 19.99, platformId: "etsy" },
    { id: "p4", name: "Art Print", price: 29.99, platformId: "etsy" },
  ]);

  const [availablePlatforms] = useState<NewPlatform[]>([
    {
      id: "printful",
      name: "Printful",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Printful_logo.svg"
    },
    {
      id: "redbubble",
      name: "Redbubble",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Redbubble_logo.svg"
    },
    {
      id: "teespring",
      name: "Teespring",
      logo: "https://seeklogo.com/images/T/teespring-logo-598486FE27-seeklogo.com.png"
    },
    {
      id: "printify",
      name: "Printify",
      logo: "https://cdn.printify.com/storage/web/main/printify-logo.svg"
    },
    {
      id: "society6",
      name: "Society6",
      logo: "https://www.society6.com/images/s6-site/s6-mark.svg"
    },
    {
      id: "teepublic",
      name: "TeePublic",
      logo: "https://www.teepublic.com/assets/logo-b894d670c5668c1a5389837310f2adbcf032b286eb897956cf0222033fc81f20.svg"
    },
    {
      id: "zazzle",
      name: "Zazzle",
      logo: "https://asset.zcache.com/assets/graphics/z4/uniquePages/zazzleLogoR.png"
    },
    {
      id: "spreadshirt",
      name: "Spreadshirt",
      logo: "https://image.spreadshirtmedia.com/content/f_auto,q_auto/v1/Logos/spreadshirt_logo"
    },
    {
      id: "wordpress",
      name: "WordPress",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/WordPress_logo.svg"
    },
    {
      id: "gelato",
      name: "Gelato",
      logo: "https://global-uploads.webflow.com/6006f6bf85f3670a4d5228af/60083f0b21001f711dc59888_gelato-logo-black.svg"
    },
    {
      id: "printy6",
      name: "Printy6",
      logo: "https://printy6.com/wp-content/uploads/2023/06/logo-box.png"
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

  const resetDateFilters = () => {
    setDateRange({ startDate: null, endDate: null });
    toast({
      title: "Filters Reset",
      description: "Date range filters have been cleared.",
    });
  };

  const handleDateRangeSelect = (date: Date | null) => {
    if (!date) return;
    
    setDateRange(prev => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        return { startDate: date, endDate: null };
      }
      
      if (date < prev.startDate) {
        return { startDate: date, endDate: prev.startDate };
      }
      
      return { startDate: prev.startDate, endDate: date };
    });
    
    if (dateRange.startDate && !dateRange.endDate) {
      toast({
        title: "Date Range Applied",
        description: `Filtering data between ${format(dateRange.startDate, 'PP')} and ${format(date, 'PP')}.`,
      });
    }
  };

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
        revenue: 0
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
          ? { ...p, status: "connected" } 
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
          ? { ...p, status: "disconnected", products: 0, revenue: 0 } 
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
      platformId: selectedPlatform.id
    };

    setProducts([...products, newProduct]);

    setPlatforms(platforms.map(p => 
      p.id === selectedPlatform.id 
        ? { 
            ...p, 
            products: p.products + 1,
            revenue: p.revenue + price
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
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateRange.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.startDate ? (
                    dateRange.endDate ? (
                      <>
                        {format(dateRange.startDate, "MMM d")} - {format(dateRange.endDate, "MMM d")}
                      </>
                    ) : (
                      format(dateRange.startDate, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Filter by date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.startDate || undefined,
                    to: dateRange.endDate || undefined,
                  }}
                  onSelect={(range) => {
                    setDateRange({
                      startDate: range?.from || null,
                      endDate: range?.to || null,
                    });
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
                <div className="flex items-center justify-between p-3 border-t">
                  <span className="text-sm text-muted-foreground">
                    {dateRange.startDate && dateRange.endDate 
                      ? `${format(dateRange.startDate, "PP")} - ${format(dateRange.endDate, "PP")}`
                      : "Select a date range"}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetDateFilters}
                    disabled={!dateRange.startDate && !dateRange.endDate}
                  >
                    Reset
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
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
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h1 className="font-bold text-2xl sm:text-3xl">Platform Manager</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Connect and manage your POD platforms in one place
                </p>
              </div>
            </div>
            
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
