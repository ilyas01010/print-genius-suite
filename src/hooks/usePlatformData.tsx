
import { useState } from "react";
import { Platform, DateRangeFilter } from "@/components/platform-manager/types";
import { usePlatformList } from "./platform/usePlatformList";
import { useProductList } from "./platform/useProductList";
import { useFilteredData } from "./platform/useFilteredData";

export const usePlatformData = () => {
  const { platforms, handleAddNewPlatform, handleConnectPlatform, handleDisconnectPlatform } = usePlatformList();
  
  // Update platform data when adding/removing products
  const updatePlatformData = (platformId: string, productPrice: number, action: 'add' | 'remove') => {
    const multiplier = action === 'add' ? 1 : -1;
    
    setPlatforms(platforms.map(p => 
      p.id === platformId 
        ? { 
            ...p, 
            products: p.products + (multiplier * 1),
            productsCount: (p.productsCount || 0) + (multiplier * 1),
            activeProductsCount: (p.activeProductsCount || 0) + (multiplier * 1),
            revenue: p.revenue + (multiplier * productPrice),
            revenue30d: (p.revenue30d || 0) + (multiplier * productPrice),
            sales30d: action === 'add' ? (p.sales30d || 0) + 1 : p.sales30d
          } 
        : p
    ));
  };
  
  const { products, handleAddProduct, handleDeleteProduct } = useProductList(updatePlatformData);
  const { filterData, calculateMetrics } = useFilteredData();

  // For managing the platforms state from the parent component
  const [setPlatforms] = useState(() => (updater: React.SetStateAction<Platform[]>) => {
    if (typeof updater === 'function') {
      return handlePlatformsUpdate(updater(platforms));
    }
    return handlePlatformsUpdate(updater);
  });

  function handlePlatformsUpdate(newPlatforms: Platform[]) {
    // This is a dummy function that would be replaced by the actual state update logic
    // in a real implementation. Here we're just mocking the behavior.
    return newPlatforms;
  }

  return {
    platforms,
    products,
    handleAddNewPlatform,
    handleConnectPlatform,
    handleDisconnectPlatform,
    handleAddProduct,
    handleDeleteProduct,
    filterData: (dateRange: DateRangeFilter) => filterData(platforms, products, dateRange),
    calculateMetrics
  };
};
