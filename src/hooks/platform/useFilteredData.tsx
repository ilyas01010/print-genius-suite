
import { useState } from "react";
import { Platform, Product, DateRangeFilter } from "@/components/platform-manager/types";

export const useFilteredData = () => {
  const filterData = (platforms: Platform[], products: Product[], dateRange: DateRangeFilter) => {
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

  const calculateMetrics = (filteredPlatforms: Platform[]) => {
    const totalProducts = filteredPlatforms.reduce((sum, platform) => sum + platform.products, 0);
    const totalRevenue = filteredPlatforms.reduce((sum, platform) => sum + platform.revenue, 0);
    const connectedPlatforms = filteredPlatforms.filter(p => p.status === "connected").length;

    return { totalProducts, totalRevenue, connectedPlatforms };
  };

  return {
    filterData,
    calculateMetrics
  };
};
