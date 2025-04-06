
# Print Genius Suite - Production Deployment Instructions

## Prerequisites

- Node.js (v16 or higher)
- NPM (v7 or higher) or Yarn
- Supabase account (already configured)
- Sentry account for error monitoring (optional but recommended)

## Pre-Deployment Checklist

- [x] Verify that all environment variables are properly set
- [x] Ensure all API integrations are configured for production
- [x] Confirm that Supabase storage buckets are properly set up
- [x] Verify that authentication flows work correctly
- [x] Check that all edge functions are deployed

## Build Instructions

### 1. Install Dependencies

```bash
npm ci
# or
yarn install --frozen-lockfile
```

Using `npm ci` or `yarn install --frozen-lockfile` ensures exact dependency versions from lockfiles.

### 2. Configure Environment Variables

Create a `.env.production` file in the root directory with the following variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=https://kdpsyldycxyxmmxkjnai.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHN5bGR5Y3h5eG1teGtqbmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDE0NzMsImV4cCI6MjA1OTQ3NzQ3M30._PFaKbXh3tIpD2ot7owbElGmi1xj1XOYM6oYvOZsbdw

# Sentry Configuration (Required for error monitoring)
VITE_SENTRY_DSN=https://public@sentry.example.com/1

# Application Configuration
VITE_APP_VERSION=1.0.0
VITE_PUBLIC_URL=https://print-genius-suite.com
```

Replace the Sentry DSN with your actual Sentry project DSN.

### 3. Build for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory containing the optimized production build. The build process:
- Minifies JavaScript and CSS
- Optimizes and compresses images
- Generates hashed filenames for cache busting
- Splits code into chunks for better loading performance
- Removes development-only code

### 4. Test the Production Build Locally

```bash
npm run preview
# or
yarn preview
```

Visit `http://localhost:4173` to verify the production build works correctly.

## Deployment Options

### Option 1: Static Hosting (Recommended)

The built application is a static site and can be deployed to any static hosting service:

#### 1. Netlify

- Connect your GitHub repository
- Set the build command to `npm run build`
- Set the publish directory to `dist`
- Configure environment variables in the Netlify dashboard
- Set up redirects for SPA routing by creating a `_redirects` file in `public/` with:
  ```
  /* /index.html 200
  ```

#### 2. Vercel

- Connect your GitHub repository
- Vercel will automatically detect the Vite configuration
- Configure environment variables in the Vercel dashboard
- No additional settings needed for SPA routing

#### 3. AWS S3 + CloudFront

- Upload the `dist` directory to an S3 bucket
- Configure CloudFront for CDN delivery with proper cache settings:
  - Set default TTL to 86400 (1 day)
  - Configure cache behaviors for different file types
  - Set up proper invalidation patterns
- Setup SSL and custom domain
- Configure error pages for SPA routing

### Option 2: Docker Deployment

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t print-genius-suite:latest .

# Run the container
docker run -p 8080:80 print-genius-suite:latest
```

For production, consider using Docker Compose for better service management:

```yaml
version: '3'
services:
  app:
    build: .
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certs:/etc/nginx/certs
```

## Supabase Production Configuration

The application is already configured to use the production Supabase project. Ensure the following are properly set up:

1. **Authentication**: 
   - Verify email confirmations are properly configured
   - Set up required OAuth providers
   - Configure password policies

2. **Storage Buckets**: 
   - Ensure the `designs` bucket exists with proper permissions
   - Set up appropriate CORS policies
   - Configure storage quotas if needed

3. **Edge Functions**: 
   - Verify all edge functions are deployed and working
   - Check that they have the proper environment variables
   - Set up monitoring for edge function usage

4. **Database**: 
   - Check that all tables exist with proper RLS policies
   - Set up database backups
   - Consider setting up read replicas for high-traffic scenarios

## Security Considerations

- All API keys and secrets are stored securely in Supabase and not in the frontend code
- CORS is properly configured to prevent unauthorized access
- Content Security Policy is implemented to mitigate XSS attacks
- Authentication tokens are stored securely and have appropriate expiration times
- Row Level Security (RLS) is enabled on all Supabase tables

## Post-Deployment Verification

After deploying, verify the following:

1. User authentication works correctly (signup, login, password reset)
2. Design uploads and retrievals function properly
3. AI image generation is operational
4. All pages load correctly on both desktop and mobile
5. Dark/light mode switching works
6. Error monitoring is capturing events correctly
7. Analytics are being properly tracked
8. Run Lighthouse audits to ensure good performance, accessibility, and SEO

## Monitoring and Maintenance

- **Error Tracking**: Monitor application errors through the Sentry dashboard
- **Performance Monitoring**: Check Sentry performance metrics regularly
- **Backend Issues**: Review Supabase logs for backend errors
- **Uptime Monitoring**: Set up uptime checks through UptimeRobot or Pingdom
- **Regular Updates**: Schedule regular dependency updates and security patches

## Rollback Procedure

If issues are detected in production:

1. Identify the cause of the issue through error logs
2. If a deployment issue, roll back to the previous version:
   - For static hosting, redeploy the previous build
   - For Docker, use `docker run` with the previous image tag
3. If a data issue, restore from the most recent backup
4. Communicate with users if there was significant downtime

## Support

If you encounter any deployment issues, please contact support at support@print-genius-suite.com.

