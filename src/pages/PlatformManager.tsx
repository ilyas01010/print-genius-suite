
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronRight, ExternalLink, Plus, Store, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ConnectionStatus } from "@/components/settings/integration/IntegrationItem";

// Define platform status type
type PlatformStatus = ConnectionStatus;

interface Product {
  id: string;
  name: string;
  price: number;
  platformId: string;
}

type Platform = {
  id: string;
  name: string;
  logo: string;
  status: PlatformStatus;
  products: number;
  revenue: number;
};

type NewPlatform = {
  id: string;
  name: string;
  logo: string;
};

const PlatformManager = () => {
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

  // Additional POD platforms
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

  const [showAddPlatformDialog, setShowAddPlatformDialog] = useState(false);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("platforms");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Calculate totals
  const totalProducts = platforms.reduce((sum, platform) => sum + platform.products, 0);
  const totalRevenue = platforms.reduce((sum, platform) => sum + platform.revenue, 0);
  const connectedPlatforms = platforms.filter(p => p.status === "connected").length;

  const handleAddNewPlatform = (platform: NewPlatform) => {
    // Check if platform already exists
    if (platforms.some(p => p.id === platform.id)) {
      toast({
        title: "Platform already exists",
        description: `${platform.name} is already in your platform list.`,
        variant: "destructive"
      });
      return;
    }

    // Add new platform
    setPlatforms([
      ...platforms,
      {
        ...platform,
        status: "disconnected" as PlatformStatus,
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
        ? { ...p, status: "connecting" as PlatformStatus } 
        : p
    ));

    // Simulate API call delay
    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { ...p, status: "connected" as PlatformStatus } 
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
        ? { ...p, status: "connecting" as PlatformStatus } 
        : p
    ));

    // Simulate API call delay
    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { ...p, status: "disconnected" as PlatformStatus, products: 0, revenue: 0 } 
          : p
      ));

      // Also remove all products for this platform
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

    // Create new product
    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: newProductName,
      price: price,
      platformId: selectedPlatform.id
    };

    // Add product to state
    setProducts([...products, newProduct]);

    // Update platform stats
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

    // Reset form
    setNewProductName('');
    setNewProductPrice('');
    setShowAddProductDialog(false);
    setSelectedPlatform(null);
  };

  const handleDeleteProduct = (product: Product) => {
    // Find the platform this product belongs to
    const platform = platforms.find(p => p.id === product.platformId);
    if (!platform) return;

    // Remove product
    setProducts(products.filter(p => p.id !== product.id));

    // Update platform stats
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

    // Simulate loading analytics data
    setTimeout(() => {
      setIsAnalyticsLoading(false);
      toast({
        title: "Analytics Loaded",
        description: "Platform analytics data has been loaded successfully.",
      });
    }, 1500);
  };

  const getProductsByPlatform = (platformId: string) => {
    return products.filter(product => product.platformId === platformId);
  };

  return (
    <Layout>
      <div className="space-y-4 animate-fade">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h1 className="font-bold text-2xl sm:text-3xl">Platform Manager</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Connect and manage your POD platforms in one place
            </p>
          </div>
          <Dialog open={showAddPlatformDialog} onOpenChange={setShowAddPlatformDialog}>
            <DialogTrigger asChild>
              <Button className="hidden sm:flex">
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{connectedPlatforms}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {connectedPlatforms === 0 ? "No platforms connected" : 
                 connectedPlatforms === 1 ? "1 platform connected" : 
                 `${connectedPlatforms} platforms connected`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all platforms
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500">↑ 0.5%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="platforms" value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platforms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <Card key={platform.id} className={platform.status === "connected" ? "border-primary/20" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 overflow-hidden">
                          <img 
                            src={platform.logo} 
                            alt={`${platform.name} logo`} 
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <CardTitle className="text-base sm:text-lg">{platform.name}</CardTitle>
                      </div>
                      <Badge variant={platform.status === "connected" ? "default" : "outline"}>
                        {platform.status === "connected" ? (
                          <span className="flex items-center">
                            <Check className="mr-1 h-3 w-3" /> Connected
                          </span>
                        ) : platform.status === "connecting" ? (
                          "Connecting..."
                        ) : "Not Connected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {platform.status === "connected" ? (
                    <>
                      <CardContent className="pb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Products:</span>
                          <span className="font-medium">{platform.products}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">${platform.revenue.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="text-xs" 
                          onClick={() => handleDisconnectPlatform(platform.id)} 
                          disabled={platform.status === "connecting"}
                        >
                          Disconnect
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center" 
                          onClick={handleViewAnalytics}
                        >
                          View Details <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full"
                        onClick={() => handleConnectPlatform(platform.id)}
                        disabled={platform.status === "connecting"}
                      >
                        {platform.status === "connecting" ? "Connecting..." : "Connect"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-[165px]">
                  <Dialog open={showAddPlatformDialog} onOpenChange={setShowAddPlatformDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="h-10 w-10 rounded-full mb-2">
                        <Plus className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <p className="text-sm font-medium">Connect New Platform</p>
                  <p className="text-xs text-muted-foreground">Integrate with more POD services</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your product listings across all platforms</CardDescription>
                </div>
                {connectedPlatforms > 0 && (
                  <Dialog open={showAddProductDialog} onOpenChange={(open) => {
                    setShowAddProductDialog(open);
                    if (open && !selectedPlatform) {
                      // Default to first connected platform
                      setSelectedPlatform(platforms.find(p => p.status === "connected") || null);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-1 h-3.5 w-3.5" /> Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Enter the details of the new product.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="platform-select">Select Platform</Label>
                          <select 
                            id="platform-select"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedPlatform?.id || ""}
                            onChange={(e) => {
                              const platform = platforms.find(p => p.id === e.target.value);
                              setSelectedPlatform(platform || null);
                            }}
                          >
                            <option value="" disabled>Select a platform</option>
                            {platforms
                              .filter(p => p.status === "connected")
                              .map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-name">Product Name</Label>
                          <Input 
                            id="product-name"
                            placeholder="Enter product name"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product-price">Price ($)</Label>
                          <Input 
                            id="product-price"
                            placeholder="Enter price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddProductDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddProduct}>Add Product</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardHeader>
              <CardContent>
                {totalProducts > 0 ? (
                  <div className="space-y-4">
                    {platforms
                      .filter(p => p.status === "connected" && p.products > 0)
                      .map((platform) => (
                        <div key={platform.id} className="border rounded-md p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 overflow-hidden">
                                <img 
                                  src={platform.logo} 
                                  alt={`${platform.name} logo`} 
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <h3 className="font-medium text-sm">{platform.name}</h3>
                            </div>
                            <Badge variant="outline" className="text-xs">{platform.products} products</Badge>
                          </div>
                          <Separator className="my-2" />
                          
                          {/* Products list */}
                          <div className="space-y-2 mt-2">
                            {getProductsByPlatform(platform.id).map(product => (
                              <div key={product.id} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                                <div>
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                                </div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => setProductToDelete(product)}
                                    >
                                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction 
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={() => handleDeleteProduct(product)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between mt-3">
                            <p className="text-sm text-muted-foreground">Total Revenue</p>
                            <p className="font-medium text-sm">${platform.revenue.toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
                    <div className="flex flex-col items-center text-center p-4">
                      <Store className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-semibold">No Products Yet</h3>
                      <p className="text-muted-foreground text-xs max-w-xs mt-1">
                        Connect a platform to start managing your products or add new products manually
                      </p>
                      {connectedPlatforms > 0 ? (
                        <Dialog open={showAddProductDialog} onOpenChange={(open) => {
                          setShowAddProductDialog(open);
                          if (open) setSelectedPlatform(platforms.find(p => p.status === "connected") || null);
                        }}>
                          <DialogTrigger asChild>
                            <Button className="mt-3 text-xs">
                              <Plus className="mr-1 h-3 w-3" /> Add Product
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      ) : (
                        <Button className="mt-3 text-xs" onClick={() => setSelectedTab("platforms")}>
                          Connect Platform First
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Track performance across all connected platforms</CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyticsLoading ? (
                  <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-2"></div>
                      <h3 className="font-semibold">Loading Analytics</h3>
                      <p className="text-muted-foreground text-xs max-w-xs mt-1">
                        Please wait while we fetch your platform analytics data
                      </p>
                    </div>
                  </div>
                ) : connectedPlatforms > 0 ? (
                  <div className="space-y-6">
                    <div className="h-64 border rounded-md bg-muted/20 p-4">
                      <h3 className="font-medium mb-2">Revenue by Platform</h3>
                      <div className="flex items-end h-48 gap-4">
                        {platforms.filter(p => p.status === "connected").map((platform) => (
                          <div key={platform.id} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-primary/80 rounded-t" 
                              style={{ 
                                height: `${Math.max(5, (platform.revenue / (Math.max(...platforms.map(p => p.revenue)) || 1)) * 100)}%` 
                              }}
                            ></div>
                            <div className="mt-2 flex flex-col items-center">
                              <div className="h-4 w-4 overflow-hidden">
                                <img 
                                  src={platform.logo} 
                                  alt={`${platform.name}`} 
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <p className="text-xs mt-1">${platform.revenue.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-3">Top Platforms</h3>
                        <ol className="space-y-2">
                          {platforms.filter(p => p.status === "connected")
                            .sort((a, b) => b.revenue - a.revenue)
                            .map((platform, index) => (
                              <li key={platform.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="text-xs font-medium w-5">{index + 1}.</span>
                                  <div className="h-4 w-4 mr-2 overflow-hidden">
                                    <img 
                                      src={platform.logo} 
                                      alt={platform.name}
                                      className="h-full w-full object-contain" 
                                    />
                                  </div>
                                  <span className="text-sm">{platform.name}</span>
                                </div>
                                <span className="font-medium text-sm">${platform.revenue.toFixed(2)}</span>
                              </li>
                            ))
                          }
                        </ol>
                      </div>
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-3">Performance Summary</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Total Revenue</span>
                              <span className="font-medium">${totalRevenue.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-muted h-2 mt-1 rounded-full">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Total Products</span>
                              <span className="font-medium">{totalProducts}</span>
                            </div>
                            <div className="w-full bg-muted h-2 mt-1 rounded-full">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Conversion Rate</span>
                              <span className="font-medium">3.2%</span>
                            </div>
                            <div className="w-full bg-muted h-2 mt-1 rounded-full">
                              <div className="bg-primary h-2 rounded-full" style={{ width: "32%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-md bg-muted/30">
                    <div className="flex flex-col items-center text-center p-4">
                      <ExternalLink className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="font-semibold">No Analytics Available</h3>
                      <p className="text-muted-foreground text-xs max-w-xs mt-1">
                        Connect at least one platform to view analytics data
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-3 text-xs"
                        onClick={() => setSelectedTab("platforms")}
                      >
                        Go to Platforms
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlatformManager;
