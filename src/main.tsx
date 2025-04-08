
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import App from './App';
import './index.css';
import './App.css';
import { UserProvider } from './context/UserContext';
import { initializeSupabase } from './lib/supabase-client';
import * as Sentry from "@sentry/react";

// Initialize Supabase storage
initializeSupabase().catch(console.error);

// Initialize React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Initialize Sentry for error tracking in production only
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://example@sentry.io/example",
    integrations: [
      new Sentry.BrowserTracing(),
    ],
    tracesSampleRate: 0.5,
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
          <Toaster />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
