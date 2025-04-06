
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react';
import App from './App.tsx'
import './index.css'

// Initialize Sentry for error monitoring in production
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://public@sentry.example.com/1", // Replace with actual Sentry DSN in production
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
    // Performance monitoring
    tracesSampleRate: 0.1, // Capture 10% of transactions
    // Session replay for errors
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

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
    
    createRoot(rootElement).render(
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <App />
      </Sentry.ErrorBoundary>
    );
  }
});
