
/**
 * Utility functions for image optimization
 */

/**
 * Compresses an image file to a specified quality
 * @param file The image file to compress
 * @param maxWidth Maximum width of the output image 
 * @param quality JPEG quality from 0 to 1
 * @returns A promise resolving to the compressed image as a Blob
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Skip SVG files as they're already optimized
    if (file.type === 'image/svg+xml') {
      resolve(file);
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to BLOB with specified quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          // Use WebP if supported, otherwise revert to JPEG/PNG
          'image/webp',
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
  });
};

/**
 * Creates an optimized thumbnail from an image file
 * @param file The image file
 * @param size The thumbnail size (width)
 * @returns A promise that resolves to the thumbnail blob
 */
export const createThumbnail = async (file: File, size: number = 200): Promise<Blob> => {
  return compressImage(file, size, 0.7);
};

/**
 * Adds blur hash or placeholder to an image element while it loads
 * @param imgElement The image element
 * @param placeholderUrl Optional placeholder URL
 */
export const addImagePlaceholder = (
  imgElement: HTMLImageElement,
  placeholderUrl: string = '/placeholder.svg'
): void => {
  // Store the original source
  const originalSrc = imgElement.src;
  
  // Add placeholder and blur-up effect
  imgElement.style.filter = 'blur(10px)';
  imgElement.style.transition = 'filter 0.3s ease-out';
  imgElement.src = placeholderUrl;
  
  const img = new Image();
  img.src = originalSrc;
  
  img.onload = () => {
    imgElement.src = originalSrc;
    imgElement.style.filter = 'blur(0)';
  };
  
  img.onerror = () => {
    imgElement.src = placeholderUrl;
    imgElement.style.filter = 'blur(0)';
  };
};

/**
 * Check if WebP format is supported in current browser
 * @returns Promise that resolves to true if WebP is supported
 */
export const isWebPSupported = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = () => resolve(webP.height === 2);
    webP.onerror = () => resolve(false);
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Preload images for faster rendering
 * @param urls Array of image URLs to preload
 */
export const preloadImages = (urls: string[]): void => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};
