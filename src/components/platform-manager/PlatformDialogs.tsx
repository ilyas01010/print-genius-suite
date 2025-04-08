
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Platform, Product, NewPlatform } from "@/components/platform-manager/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TutorialDialog from "@/components/platform-manager/TutorialDialog";
import FeedbackDialog from "@/components/platform-manager/FeedbackDialog";

interface PlatformDialogsProps {
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
  showFeedbackDialog: boolean;
  setShowFeedbackDialog: (show: boolean) => void;
  showAddPlatformDialog: boolean;
  setShowAddPlatformDialog: (show: boolean) => void;
  showAddProductDialog: boolean;
  setShowAddProductDialog: (show: boolean) => void;
  availablePlatforms: NewPlatform[];
  onAddPlatform: (platform: NewPlatform) => void;
  newProductName: string;
  setNewProductName: (name: string) => void;
  newProductPrice: string;
  setNewProductPrice: (price: string) => void;
  selectedPlatform: Platform | null;
  onAddProduct: () => void;
  productToDelete: Product | null;
  setProductToDelete: (product: Product | null) => void;
  onDeleteProduct: (product: Product) => void;
}

const PlatformDialogs: React.FC<PlatformDialogsProps> = ({
  showTutorial,
  setShowTutorial,
  showFeedbackDialog,
  setShowFeedbackDialog,
  showAddPlatformDialog,
  setShowAddPlatformDialog,
  showAddProductDialog,
  setShowAddProductDialog,
  availablePlatforms,
  onAddPlatform,
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  selectedPlatform,
  onAddProduct,
  productToDelete,
  setProductToDelete,
  onDeleteProduct
}) => {
  return (
    <>
      {/* Add Platform Dialog */}
      <Dialog open={showAddPlatformDialog} onOpenChange={setShowAddPlatformDialog}>
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
                onClick={() => onAddPlatform(platform)}
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

      {/* Add Product Dialog */}
      <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              {selectedPlatform
                ? `Add a new product to ${selectedPlatform.name}`
                : "Add a new product to your platform"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
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
              <Label htmlFor="product-price">Product Price ($)</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Enter price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddProductDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={onAddProduct}>Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <Dialog 
        open={!!productToDelete} 
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {productToDelete && (
              <div className="flex flex-col space-y-1">
                <span className="font-medium">{productToDelete.name}</span>
                <span className="text-sm text-muted-foreground">
                  ${productToDelete.price}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setProductToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (productToDelete) {
                  onDeleteProduct(productToDelete);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tutorial Dialog */}
      <TutorialDialog 
        open={showTutorial} 
        onOpenChange={setShowTutorial} 
      />
      
      {/* Feedback Dialog */}
      <FeedbackDialog 
        open={showFeedbackDialog}
        onOpenChange={setShowFeedbackDialog}
      />
    </>
  );
};

export default PlatformDialogs;
