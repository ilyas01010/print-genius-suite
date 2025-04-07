
import { toast } from "sonner";

// Define the keyboard shortcut actions
export type ShortcutAction = 
  | "save" 
  | "download" 
  | "fullscreen" 
  | "newDocument" 
  | "openImage" 
  | "showHelp"
  | "showTemplates";

// Define the keyboard shortcut handler function type
export type ShortcutHandler = (action: ShortcutAction) => void;

// Key combinations for shortcuts
export const SHORTCUTS = {
  save: { key: "s", ctrlKey: true, description: "Save design" },
  download: { key: "d", ctrlKey: true, description: "Download design" },
  fullscreen: { key: "f", ctrlKey: true, description: "Toggle fullscreen" },
  newDocument: { key: "n", ctrlKey: true, description: "New document" },
  openImage: { key: "o", ctrlKey: true, description: "Open image URL" },
  showHelp: { key: "/", ctrlKey: false, description: "Show help" },
  showTemplates: { key: "t", ctrlKey: true, description: "Show templates" },
};

// Helper function to check if a keyboard event matches a shortcut
export const matchesShortcut = (
  event: KeyboardEvent,
  shortcut: { key: string; ctrlKey: boolean }
): boolean => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modifierKey = isMac ? event.metaKey : event.ctrlKey;
  
  return (
    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    modifierKey === shortcut.ctrlKey &&
    !event.altKey &&
    !event.shiftKey
  );
};

// Setup keyboard event listeners
export const setupKeyboardShortcuts = (handler: ShortcutHandler): () => void => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Ignore keyboard events when focus is in input elements
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    // Check each shortcut
    for (const [action, shortcut] of Object.entries(SHORTCUTS)) {
      if (matchesShortcut(event, shortcut)) {
        event.preventDefault();
        handler(action as ShortcutAction);
        
        // Show toast notification for the triggered shortcut
        toast.success(`${shortcut.description}`, {
          description: "Shortcut triggered",
          duration: 1500,
        });
        
        return;
      }
    }
  };

  // Add the event listener
  window.addEventListener("keydown", handleKeyDown);

  // Return a cleanup function
  return () => window.removeEventListener("keydown", handleKeyDown);
};

// Generate a shortcut key display text
export const getShortcutDisplayText = (shortcut: { key: string; ctrlKey: boolean }): string => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modifierKey = isMac ? "⌘" : "Ctrl";
  
  return shortcut.ctrlKey 
    ? `${modifierKey}+${shortcut.key.toUpperCase()}`
    : shortcut.key;
};
