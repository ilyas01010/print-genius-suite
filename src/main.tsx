
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react';
import App from './App.tsx'
import './index.css'

// Initialize Sentry for error monitoring in production
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://public@sentry.example.com/1", // Replace with actual Sentry DSN in production
    integrations: [
      Sentry.browserTracingIntegration(), 
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance monitoring (reduced in production to minimize overhead)
    tracesSampleRate: 0.05, // Capture 5% of transactions
    // Session replay settings
    replaysSessionSampleRate: 0.05, // Sample 5% of sessions
    replaysOnErrorSampleRate: 1.0,  // Record 100% of sessions with errors
    // Environment setting
    environment: 'production',
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
