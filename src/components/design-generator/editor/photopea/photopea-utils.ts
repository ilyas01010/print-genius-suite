
/**
 * Utility functions for interacting with the Photopea editor API
 * Based on the Photopea API documentation: https://www.photopea.com/api/
 */

/**
 * Creates a new document in Photopea with specified dimensions
 * @param iframe Reference to the Photopea iframe
 * @param width Width of the document in pixels
 * @param height Height of the document in pixels
 * @param dpi DPI of the document
 * @returns Promise that resolves when the command is sent
 */
export const createNewDocument = (
  iframe: HTMLIFrameElement,
  width: number, 
  height: number, 
  dpi: number
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: `app.documents.add(${width}, ${height}, ${dpi}, "Untitled", "RGB");`
    }), 
    "https://www.photopea.com"
  );
};

/**
 * Opens an image from a URL in Photopea
 * @param iframe Reference to the Photopea iframe
 * @param imageUrl URL of the image to open
 */
export const openImageFromURL = (
  iframe: HTMLIFrameElement,
  imageUrl: string
): void => {
  if (!iframe || !iframe.contentWindow || !imageUrl) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: `app.open("${imageUrl}");`
    }), 
    "https://www.photopea.com"
  );
};

/**
 * Builds the Photopea URL with parameters according to their API documentation
 * @param params Optional parameters to customize the Photopea instance
 * @returns URL string with encoded parameters
 */
export const buildPhotopeaUrl = (params: {
  theme?: 'dark' | 'light';
  showTools?: boolean;
  showHome?: boolean;
  files?: string[];
} = {}): string => {
  const PHOTOPEA_URL = "https://www.photopea.com";
  
  const defaultParams = {
    theme: 'dark',
    showTools: true,
    showHome: false,
    files: []
  };
  
  const mergedParams = { ...defaultParams, ...params };
  
  const encodedParams = encodeURIComponent(
    JSON.stringify({
      environment: {
        localsave: true,
        customIO: true,
        theme: mergedParams.theme,
        showtools: mergedParams.showTools,
        showhome: mergedParams.showHome,
      },
      files: mergedParams.files
    })
  );
  
  return `${PHOTOPEA_URL}#${encodedParams}`;
};

/**
 * Exports the current document as a PNG via the Photopea API
 * @param iframe Reference to the Photopea iframe
 * @param callback Name of the callback to receive the data
 */
export const exportDocumentAsPNG = (
  iframe: HTMLIFrameElement,
  callback: string
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: "app.activeDocument.saveToOE('png').then(data => { return app.echoToHost(data); })",
      callback
    }), 
    "https://www.photopea.com"
  );
};

/**
 * Gets the name of the current document
 * @param iframe Reference to the Photopea iframe
 * @param callback Name of the callback to receive the data
 */
export const getDocumentName = (
  iframe: HTMLIFrameElement,
  callback: string
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: "app.activeDocument.name",
      callback
    }), 
    "https://www.photopea.com"
  );
};

/**
 * Triggers a direct download of the current document as PNG
 * @param iframe Reference to the Photopea iframe
 */
export const downloadCurrentDocument = (
  iframe: HTMLIFrameElement
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: "app.activeDocument.saveToOE('png').then(data => { var a = document.createElement('a'); a.href = 'data:image/png;base64,' + data; a.download = 'design-" + Date.now() + ".png'; document.body.appendChild(a); a.click(); document.body.removeChild(a); });"
    }), 
    "https://www.photopea.com"
  );
};

/**
 * Uploads an image file to Photopea
 * @param iframe Reference to the Photopea iframe
 * @param file The file object to upload
 */
export const uploadImageToPhotopea = (
  iframe: HTMLIFrameElement,
  file: File
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  const reader = new FileReader();
  reader.onload = function() {
    const arrayBuffer = reader.result as ArrayBuffer;
    const bytes = new Uint8Array(arrayBuffer);
    
    // Send the file bytes to Photopea
    iframe.contentWindow.postMessage(
      JSON.stringify({
        method: "open",
        name: file.name,
        data: Array.from(bytes) // Convert to regular array for JSON
      }),
      "https://www.photopea.com"
    );
  };
  reader.readAsArrayBuffer(file);
};

/**
 * Add text layer to the current document
 * @param iframe Reference to the Photopea iframe
 * @param text The text content
 */
export const addTextLayer = (
  iframe: HTMLIFrameElement,
  text: string
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: `
        var textLayer = app.activeDocument.artLayers.add();
        textLayer.kind = LayerKind.TEXT;
        textLayer.textItem.contents = "${text}";
      `
    }),
    "https://www.photopea.com"
  );
};

/**
 * Get file info from the current document
 * @param iframe Reference to the Photopea iframe
 * @param callback Name of the callback to receive the data
 */
export const getFileInfo = (
  iframe: HTMLIFrameElement,
  callback: string
): void => {
  if (!iframe || !iframe.contentWindow) return;
  
  iframe.contentWindow.postMessage(
    JSON.stringify({
      method: "runScript",
      script: `
        var info = {
          name: app.activeDocument.name,
          width: app.activeDocument.width,
          height: app.activeDocument.height,
          resolution: app.activeDocument.resolution
        };
        return info;
      `,
      callback
    }),
    "https://www.photopea.com"
  );
};
