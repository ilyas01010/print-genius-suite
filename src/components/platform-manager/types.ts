
import { ConnectionStatus } from "@/components/settings/integration/IntegrationItem";

export type PlatformStatus = ConnectionStatus;

export interface Product {
  id: string;
  name: string;
  price: number;
  platformId: string;
}

export type Platform = {
  id: string;
  name: string;
  logo: string;
  status: PlatformStatus;
  products: number;
  revenue: number;
};

export type NewPlatform = {
  id: string;
  name: string;
  logo: string;
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
