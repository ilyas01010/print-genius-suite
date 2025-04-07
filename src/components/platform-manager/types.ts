
import { ConnectionStatus } from "@/components/settings/integration/IntegrationItem";

// Update PlatformStatus to include 'error' status
export type PlatformStatus = ConnectionStatus | "error";

export interface Product {
  id: string;
  name: string;
  price: number;
  platformId: string;
  createdAt?: string;
  status?: 'active' | 'inactive';
  image?: string;
  description?: string;
}

export type Platform = {
  id: string;
  name: string;
  logo: string;
  icon?: string;
  url?: string;
  description?: string;
  status: PlatformStatus;
  products: number;
  productsCount?: number;
  activeProductsCount?: number;
  sales30d?: number;
  revenue: number;
  revenue30d?: number;
  createdAt?: string;
  lastSync?: string;
};

export type NewPlatform = {
  id: string;
  name: string;
  logo: string;
  description?: string;
};

export interface IntegrationConfig {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  isPopular?: boolean;
  status: ConnectionStatus;
}

export interface PlatformMetric {
  name: string;
  value: number | string;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
}

export interface PlatformSummary {
  totalRevenue: number;
  totalProducts: number;
  connectedCount: number;
  topPlatform?: Platform;
}

// Interface for date filters
export interface DateRangeFilter {
  startDate: Date | null;
  endDate: Date | null;
}

// Interface for feedback data
export interface FeedbackData {
  id: string;
  text: string;
  createdAt: string;
  resolved: boolean;
}
