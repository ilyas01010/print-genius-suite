
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
    "*"
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
    "*"
  );
};

/**
 * Builds the Photopea URL with parameters
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
  
  return `${PHOTOPEA_URL}#${encodeURIComponent(
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
  )}`;
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
    "*"
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
    "*"
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
    "*"
  );
};
