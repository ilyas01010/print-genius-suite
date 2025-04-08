
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

// Initialize Sentry for error monitoring in production
if (import.meta.env.PROD && typeof window !== 'undefined' && import.meta.env.VITE_SENTRY_DSN) {
  try {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
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
    console.log('Sentry initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize Sentry, continuing without error tracking', error);
  }
}

// Add performance metrics monitoring in development
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const reportWebVitals = async () => {
    try {
      const { onCLS, onFID, onLCP, onTTFB, onINP } = await import('web-vitals');
      
      onCLS(console.log);
      onFID(console.log);
      onLCP(console.log);
      onTTFB(console.log);
      onINP(console.log);
    } catch (error) {
      console.warn('Failed to load web-vitals', error);
    }
  };
  
  reportWebVitals().catch(console.error);
}

// Mount the app after ensuring all animations are properly setup
// Check if we're in a browser environment
if (typeof document !== 'undefined') {
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
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Sentry.ErrorBoundary>
      );
    }
  });
}
