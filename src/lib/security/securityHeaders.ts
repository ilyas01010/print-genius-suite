
// Security headers to be implemented on the server-side
// This is a reference for what should be configured in the production environment

export const securityHeaders = {
  // Content Security Policy - restricts sources of content
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://*.supabase.co; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://*.supabase.co; " +
    "frame-src 'self' https://www.photopea.com; " +
    "frame-ancestors 'none';",
    
  // Prevents MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Controls how much information is included in referrer header
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Prevents clickjacking by restricting iframe embedding
  'X-Frame-Options': 'SAMEORIGIN',
  
  // Enables browser XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // HTTP Strict Transport Security - forces HTTPS
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  
  // Prevents browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
};

// For actual implementation, these headers need to be set at the server level
// For Nginx, you could add them to nginx.conf
// For Express.js server, you would use helmet middleware
// For deployments on platforms like Vercel, Netlify, etc., consult their documentation
// on how to add custom headers
