
import { useState } from "react";
import { NewPlatform } from "@/components/platform-manager/types";

export const useAvailablePlatformsData = () => {
  const [availablePlatforms] = useState<NewPlatform[]>([
    {
      id: "printful",
      name: "Printful",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Printful_logo.svg",
      description: "Print-on-demand service with direct integration to online stores"
    },
    {
      id: "redbubble",
      name: "Redbubble",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Redbubble_logo.svg",
      description: "Global marketplace for independent artists and designers"
    },
    {
      id: "teespring",
      name: "Teespring",
      logo: "https://seeklogo.com/images/T/teespring-logo-598486FE27-seeklogo.com.png",
      description: "E-commerce platform for creating and selling custom products"
    },
    {
      id: "printify",
      name: "Printify",
      logo: "https://cdn.printify.com/storage/web/main/printify-logo.svg",
      description: "Print-on-demand network with 90+ print providers"
    },
    {
      id: "society6",
      name: "Society6",
      logo: "https://www.society6.com/images/s6-site/s6-mark.svg",
      description: "Marketplace focused on art prints and home decor"
    },
    {
      id: "teepublic",
      name: "TeePublic",
      logo: "https://www.teepublic.com/assets/logo-b894d670c5668c1a5389837310f2adbcf032b286eb897956cf0222033fc81f20.svg",
      description: "Marketplace for independent creators to sell their designs"
    },
    {
      id: "zazzle",
      name: "Zazzle",
      logo: "https://asset.zcache.com/assets/graphics/z4/uniquePages/zazzleLogoR.png",
      description: "Custom products marketplace with extensive customization options"
    },
    {
      id: "spreadshirt",
      name: "Spreadshirt",
      logo: "https://image.spreadshirtmedia.com/content/f_auto,q_auto/v1/Logos/spreadshirt_logo",
      description: "Custom apparel and accessories platform"
    },
    {
      id: "wordpress",
      name: "WordPress",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/WordPress_logo.svg",
      description: "Connect your WordPress site with WooCommerce integration"
    },
    {
      id: "gelato",
      name: "Gelato",
      logo: "https://global-uploads.webflow.com/6006f6bf85f3670a4d5228af/60083f0b21001f711dc59888_gelato-logo-black.svg",
      description: "Global production network for print-on-demand products"
    }
  ]);

  return { availablePlatforms };
};
