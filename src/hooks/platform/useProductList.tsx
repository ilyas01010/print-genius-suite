
import { useState } from "react";
import { Product } from "@/components/platform-manager/types";
import { useToast } from "@/hooks/use-toast";

export const useProductList = (updatePlatformData: (platformId: string, productPrice: number, action: 'add' | 'remove') => void) => {
  const { toast } = useToast();
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

  const handleAddProduct = (productName: string, productPrice: number, platformId: string) => {
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
      platformId: platformId,
      status: "active",
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);
    updatePlatformData(platformId, price, 'add');

    toast({
      title: "Product Added",
      description: `${productName} has been added successfully.`,
    });
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts(products.filter(p => p.id !== product.id));
    updatePlatformData(product.platformId, product.price, 'remove');

    toast({
      title: "Product Deleted",
      description: `${product.name} has been removed.`,
    });
  };

  return {
    products,
    handleAddProduct,
    handleDeleteProduct
  };
};
