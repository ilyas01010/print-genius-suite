
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Link2, Plus, RefreshCw, ExternalLink, Clipboard, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Platform {
  id: string;
  name: string;
  status: "connected" | "disconnected" | "pending";
  products: number;
  revenue: number;
  lastSync?: string;
  apiKey?: string;
}

interface Product {
  id: string;
  name: string;
  platformIds: string[];
  price: number;
  status: "active" | "draft" | "processing";
  createdAt: string;
  salesCount: number;
  revenue: number;
}

const initialPlatforms: Platform[] = [
  { id: "etsy", name: "Etsy", status: "connected", products: 26, revenue: 1245.99, lastSync: "2025-04-08T10:32:15Z" },
  { id: "redbubble", name: "Redbubble", status: "connected", products: 15, revenue: 523.50, lastSync: "2025-04-07T14:21:33Z" },
  { id: "teepublic", name: "TeePublic", status: "disconnected", products: 0, revenue: 0 },
  { id: "amazon", name: "Amazon Merch", status: "pending", products: 8, revenue: 342.75 }
];

const initialProducts: Product[] = [
  { 
    id: "prod1", 
    name: "Vintage Camera T-Shirt", 
    platformIds: ["etsy", "redbubble"], 
    price: 24.99, 
    status: "active", 
    createdAt: "2025-03-15T09:12:00Z",
    salesCount: 12,
    revenue: 299.88
  },
  { 
    id: "prod2", 
    name: "Plant Dad Mug", 
    platformIds: ["etsy"], 
    price: 17.50, 
    status: "active", 
    createdAt: "2025-03-20T11:45:00Z",
    salesCount: 8,
    revenue: 140.00
  },
  { 
    id: "prod3", 
    name: "Mushroom Forest Wall Art", 
    platformIds: ["etsy", "redbubble"], 
    price: 35.00, 
    status: "active", 
    createdAt: "2025-03-22T15:30:00Z",
    salesCount: 7,
    revenue: 245.00
  },
  { 
    id: "prod4", 
    name: "Cottagecore Sticker Pack", 
    platformIds: ["redbubble"], 
    price: 12.99, 
    status: "draft", 
    createdAt: "2025-04-05T14:20:00Z",
    salesCount: 0,
    revenue: 0
  }
];

const PlatformManager = () => {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeTab, setActiveTab] = useState("platforms");
  const [apiKeyInputs, setApiKeyInputs] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleConnectPlatform = (platformId: string) => {
    if (!apiKeyInputs[platformId]?.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key to connect this platform.",
        variant: "destructive"
      });
      return;
    }
    
    setPlatforms(platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, status: "connected", lastSync: new Date().toISOString(), apiKey: apiKeyInputs[platformId] } 
        : platform
    ));
    
    toast({
      title: "Platform Connected",
      description: `Successfully connected to ${platforms.find(p => p.id === platformId)?.name}.`,
    });
  };

  const handleDisconnectPlatform = (platformId: string) => {
    setPlatforms(platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, status: "disconnected", products: 0, revenue: 0, lastSync: undefined } 
        : platform
    ));
    
    setProducts(products.map(product => ({
      ...product,
      platformIds: product.platformIds.filter(id => id !== platformId)
    })));
    
    toast({
      title: "Platform Disconnected",
      description: `Successfully disconnected from ${platforms.find(p => p.id === platformId)?.name}.`,
    });
  };

  const handleSyncPlatform = (platformId: string) => {
    toast({
      title: "Syncing Platform",
      description: "Starting synchronization process...",
    });
    
    // Simulate a sync process
    setTimeout(() => {
      setPlatforms(platforms.map(platform => 
        platform.id === platformId 
          ? { ...platform, lastSync: new Date().toISOString() } 
          : platform
      ));
      
      toast({
        title: "Sync Complete",
        description: `Successfully synchronized data with ${platforms.find(p => p.id === platformId)?.name}.`,
      });
    }, 2000);
  };

  const handleAddProduct = () => {
    if (!newProductName.trim()) {
      toast({
        title: "Product Name Required",
        description: "Please enter a name for your product.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newProductPrice || isNaN(parseFloat(newProductPrice)) || parseFloat(newProductPrice) <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price for your product.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform to add this product to.",
        variant: "destructive"
      });
      return;
    }
    
    const newProduct: Product = {
      id: `prod${Date.now()}`,
      name: newProductName,
      platformIds: [...selectedPlatforms],
      price: parseFloat(newProductPrice),
      status: "draft",
      createdAt: new Date().toISOString(),
      salesCount: 0,
      revenue: 0
    };
    
    setProducts([...products, newProduct]);
    
    // Update platform product counts
    setPlatforms(platforms.map(platform => 
      selectedPlatforms.includes(platform.id)
        ? { ...platform, products: platform.products + 1 }
        : platform
    ));
    
    setNewProductName("");
    setNewProductPrice("");
    setSelectedPlatforms([]);
    setShowAddProduct(false);
    
    toast({
      title: "Product Added",
      description: "Your product has been added successfully.",
    });
  };

  const handlePublishToMultiplePlatforms = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId
        ? { ...product, status: "processing" }
        : product
    ));
    
    toast({
      title: "Publishing Product",
      description: "Your product is being published to selected platforms...",
    });
    
    // Simulate publishing process
    setTimeout(() => {
      setProducts(products.map(product => 
        product.id === productId
          ? { ...product, status: "active" }
          : product
      ));
      
      toast({
        title: "Product Published",
        description: "Your product has been successfully published to all selected platforms.",
      });
    }, 3000);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString();
  };

  const connectedPlatformsCount = platforms.filter(p => p.status === "connected").length;
  const totalProducts = products.length;
  const totalRevenue = platforms.reduce((sum, platform) => sum + platform.revenue, 0);
  const activePlatforms = platforms.filter(p => p.status === "connected");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{connectedPlatformsCount}</CardTitle>
            <CardDescription>Connected Platforms</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">{totalProducts}</CardTitle>
            <CardDescription>Total Products</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">${totalRevenue.toFixed(2)}</CardTitle>
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="sync">Bulk Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="platforms" className="space-y-4 pt-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Connected Platforms</h3>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Platform
            </Button>
          </div>
          
          <div className="grid gap-4">
            {platforms.map((platform) => (
              <Card key={platform.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{platform.name}</CardTitle>
                      <CardDescription>
                        {platform.status === "connected" ? (
                          <span>
                            {platform.products} products | ${platform.revenue.toFixed(2)} revenue
                          </span>
                        ) : (
                          "Not connected"
                        )}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        platform.status === "connected" ? "success" : 
                        platform.status === "pending" ? "secondary" : "outline"
                      }
                    >
                      {platform.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platform.status !== "connected" ? (
                      <div className="space-y-2">
                        <Label htmlFor={`apiKey-${platform.id}`}>API Key</Label>
                        <div className="flex gap-2">
                          <Input 
                            id={`apiKey-${platform.id}`} 
                            placeholder="Enter API Key" 
                            value={apiKeyInputs[platform.id] || ""}
                            onChange={(e) => setApiKeyInputs({...apiKeyInputs, [platform.id]: e.target.value})}
                          />
                          <Button onClick={() => handleConnectPlatform(platform.id)}>Connect</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" /> Last synced: {formatDate(platform.lastSync)}
                          </span>
                          <Button variant="outline" size="sm" onClick={() => handleSyncPlatform(platform.id)}>
                            <RefreshCw className="mr-1 h-3 w-3" /> Sync Now
                          </Button>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-1 h-3 w-3" /> Visit Dashboard
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDisconnectPlatform(platform.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4 pt-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Products</h3>
            <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new product and publish it to multiple platforms at once.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
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
                      type="number" 
                      min="0.01" 
                      step="0.01"
                      placeholder="0.00" 
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Platforms</Label>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {activePlatforms.map(platform => (
                        <div key={platform.id} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id={`platform-${platform.id}`} 
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                            checked={selectedPlatforms.includes(platform.id)}
                            onChange={() => {
                              if (selectedPlatforms.includes(platform.id)) {
                                setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id));
                              } else {
                                setSelectedPlatforms([...selectedPlatforms, platform.id]);
                              }
                            }}
                          />
                          <Label htmlFor={`platform-${platform.id}`} className="text-sm font-normal">
                            {platform.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProduct}>
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.platformIds.map(platformId => {
                          const platform = platforms.find(p => p.id === platformId);
                          return platform ? (
                            <Badge key={platformId} variant="outline" className="text-xs">
                              {platform.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          product.status === "active" ? "success" : 
                          product.status === "processing" ? "secondary" : 
                          "outline"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.salesCount}</TableCell>
                    <TableCell>${product.revenue.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Link2 className="h-3 w-3" />
                        </Button>
                        {product.status === "draft" && (
                          <Button size="icon" className="h-8 w-8" onClick={() => handlePublishToMultiplePlatforms(product.id)}>
                            <Upload className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="sync" className="space-y-4 pt-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Upload</CardTitle>
                <CardDescription>
                  Upload products to multiple platforms at once
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button className="flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Upload CSV
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
                <CardDescription>
                  Perform actions on multiple products at once
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Sync All Platforms</Button>
                  <Button variant="outline">Update All Listings</Button>
                  <Button variant="outline">Export Product Data</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Access the Platform Manager API for automation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Input value="https://api.printgenius.com/v1/platforms" readOnly />
                  <Button variant="outline" className="shrink-0">
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" className="w-full">Generate New API Key</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformManager;
