
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: mode === 'development' ? undefined : undefined,
      // Enable Fast Refresh only in development
      devTarget: 'browserslist',
      // Optimized production build
      plugins: mode === 'production' ? [] : undefined,
    }),
    mode === 'development' && componentTagger(),
    // Add bundle analyzer in build mode when analyzing
    mode === 'analyze' && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    // Better code splitting
    splitVendorChunkPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate source maps in dev modes only
    sourcemap: mode !== 'production',
    minify: 'terser',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable terser options for better minification
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    // Optimize chunk strategy
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for major libraries
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react') && !id.includes('react-dom')) {
              return 'vendor-react-core';
            }
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('lucide')) {
              return 'vendor-icons';
            }
            return 'vendor'; // all other node_modules
          }
          // Group UI components
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
        }
      }
    },
    // Target modern browsers for smaller bundles
    target: 'es2018',
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@radix-ui/react-slot',
      'lucide-react'
    ],
    exclude: ['lovable-tagger'],
  }
}));
