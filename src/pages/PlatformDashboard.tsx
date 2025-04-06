
import React, { useState } from "react";
import { format } from "date-fns";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
      createdAt: "2023-01-15T10:30:00Z"
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
      createdAt: "2023-02-01T10:30:00Z" 
    },
    { 
      id: "p2", 
      name: "Coffee Mug", 
      price: 14.99, 
      platformId: "etsy",
      createdAt: "2023-02-15T14:45:00Z" 
    },
    { 
      id: "p3", 
      name: "Phone Case", 
      price: 19.99, 
      platformId: "etsy",
      createdAt: "2023-03-05T09:15:00Z" 
    },
    { 
      id: "p4", 
      name: "Art Print", 
      price: 29.99, 
      platformId: "etsy",
      createdAt: "2023-03-20T16:30:00Z" 
    },
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
  const [showTutorial, setShowTutorial] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

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
      platformId: selectedPlatform.id,
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);

    setPlatforms(platforms.map(p => 
      p.id === selectedPlatform.id 
        ? { 
            ...p, 
            products: p.products + 1,
            productsCount: (p.productsCount || 0) + 1,
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
            productsCount: (p.productsCount || p.products) - 1,
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

  const handleSubmitFeedback = () => {
    if (feedbackText.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      });
      setFeedbackText('');
      setShowFeedbackDialog(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter some feedback before submitting.",
        variant: "destructive"
      });
    }
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
            
            <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Platform Dashboard Tutorial</DialogTitle>
                  <DialogDescription>
                    Learn how to navigate and use the platform dashboard effectively.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Overview Tab</h3>
                      <p className="text-sm text-muted-foreground">See performance metrics, revenue statistics, and product distribution across all platforms.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Platforms Tab</h3>
                      <p className="text-sm text-muted-foreground">Connect, manage, and view details of all your POD platforms in one place.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Products Tab</h3>
                      <p className="text-sm text-muted-foreground">Manage all your product listings across platforms, add new products, and track performance.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Analytics Tab</h3>
                      <p className="text-sm text-muted-foreground">View detailed analytics, charts, and trends for your POD business.</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowTutorial(false)}>Close</Button>
                  <Button onClick={() => {
                    setShowTutorial(false);
                    toast({
                      title: "Tutorial Complete",
                      description: "You can open this tutorial anytime from the help icon.",
                    });
                  }}>Got it!</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hidden sm:flex">
                  <MessageSquare className="mr-2 h-4 w-4" /> Feedback
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Feedback</DialogTitle>
                  <DialogDescription>
                    Share your thoughts, report issues, or suggest improvements for the Platform Dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="feedback" className="text-sm font-medium">Your feedback</label>
                    <textarea 
                      id="feedback" 
                      className="w-full min-h-[100px] border rounded-md p-2"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Please share your experience, suggestions, or report any issues you've encountered..."
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
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
            <PopoverContent className="w-auto p-0" align="start">
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
          
          <Dialog open={showAddPlatformDialog} onOpenChange={setShowAddPlatformDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-3.5 w-3.5" /> Add Platform
              </Button>
            </DialogTrigger>
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
