
// Resource types for the design generator
export type ResourceType = 
  | 'design' 
  | 'graphic' 
  | 'template' 
  | 'mockup' 
  | 'font' 
  | 'asset';

export type ResourceSource = 
  | 'Placeit' 
  | 'Printful' 
  | 'Freepik' 
  | 'Adobe Express' 
  | 'Unsplash'
  | 'Other';

export interface DesignResource {
  id: number;
  name: string;
  type: ResourceType;
  source: ResourceSource;
  imageUrl: string;
  downloadUrl: string;
  category: string;
  popular: boolean;
  tags: string[];
  description?: string;
}

// Categories for different design resources
export const RESOURCE_CATEGORIES = [
  'All',
  'T-Shirts',
  'Hoodies',
  'Mugs',
  'Phone Cases',
  'Wall Art',
  'Stickers',
  'Accessories',
  'Seasonal',
  'Niche'
];

// Resource types with their display names and descriptions
export const RESOURCE_TYPES: Record<ResourceType, { label: string; description: string }> = {
  design: { 
    label: 'Designs', 
    description: 'Ready-to-use print designs that can be applied to various products' 
  },
  graphic: { 
    label: 'Graphics', 
    description: 'Illustrations, icons, and graphical elements to enhance your designs' 
  },
  template: { 
    label: 'Templates', 
    description: 'Pre-made layouts and design templates for different products' 
  },
  mockup: { 
    label: 'Mockups', 
    description: 'Product mockups to visualize your designs on physical products' 
  },
  font: { 
    label: 'Fonts', 
    description: 'Typography resources for adding text to your designs' 
  },
  asset: { 
    label: 'Assets', 
    description: 'Miscellaneous design assets like patterns, textures, and effects' 
  }
};
