
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
          'image/jpeg',
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
