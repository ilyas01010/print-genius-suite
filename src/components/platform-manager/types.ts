
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
