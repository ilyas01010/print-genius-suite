
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add performance metrics monitoring in development
if (import.meta.env.DEV) {
  const reportWebVitals = async () => {
    const { onCLS, onFID, onLCP, onTTFB, onINP } = await import('web-vitals');
    
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
    onTTFB(console.log);
    onINP(console.log);
  };
  
  reportWebVitals();
}

// Mount the app after ensuring all animations are properly setup 
requestAnimationFrame(() => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    // Remove initial loader if it exists
    const loader = rootElement.querySelector('.loader');
    if (loader) {
      loader.remove();
    }
    
    createRoot(rootElement).render(<App />);
  }
});
