
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Store, Trash2 } from "lucide-react";
import { Platform, Product } from "./types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ProductsListProps {
  platforms: Platform[];
  products: Product[];
  connectedPlatforms: number;
  totalProducts: number;
  selectedPlatform: Platform | null;
  setSelectedPlatform: (platform: Platform | null) => void;
  showAddProductDialog: boolean;
  setShowAddProductDialog: (show: boolean) => void;
  newProductName: string;
  setNewProductName: (name: string) => void;
  newProductPrice: string;
  setNewProductPrice: (price: string) => void;
  productToDelete: Product | null;
  setProductToDelete: (product: Product | null) => void;
  onAddProduct: () => void;
  onDeleteProduct: (product: Product) => void;
  setSelectedTab: (tab: string) => void;
}

const ProductsList = ({
  platforms,
  products,
  connectedPlatforms,
  totalProducts,
  selectedPlatform,
  setSelectedPlatform,
  showAddProductDialog,
  setShowAddProductDialog,
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  productToDelete,
  setProductToDelete,
  onAddProduct,
  onDeleteProduct,
  setSelectedTab
}: ProductsListProps) => {
  const getProductsByPlatform = (platformId: string) => {
    return products.filter(product => product.platformId === platformId);
  };

  return (
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
                <Button onClick={onAddProduct}>Add Product</Button>
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
                                onClick={() => onDeleteProduct(product)}
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
  );
};

export default ProductsList;
