
# Print Genius Suite - Deployment Instructions

## Prerequisites

- Node.js (v16 or higher)
- NPM (v7 or higher) or Yarn
- Supabase account (already configured)
- (Optional) Sentry account for error monitoring

## Build Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn
```

### 2. Configure Environment Variables

Create a `.env.production` file in the root directory with the following variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=https://kdpsyldycxyxmmxkjnai.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcHN5bGR5Y3h5eG1teGtqbmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDE0NzMsImV4cCI6MjA1OTQ3NzQ3M30._PFaKbXh3tIpD2ot7owbElGmi1xj1XOYM6oYvOZsbdw

# Sentry Configuration (Optional)
VITE_SENTRY_DSN=https://public@sentry.example.com/1

# Application Configuration
VITE_APP_VERSION=1.0.0
VITE_PUBLIC_URL=https://print-genius-suite.com
```

### 3. Build for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory containing the optimized production build.

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

1. **Netlify**:
   - Connect your GitHub repository
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`

2. **Vercel**:
   - Connect your GitHub repository
   - Vercel will automatically detect the Vite configuration
   - No additional settings needed

3. **AWS S3 + CloudFront**:
   - Upload the `dist` directory to an S3 bucket
   - Configure CloudFront for CDN delivery
   - Setup SSL and custom domain

### Option 2: Docker Deployment

A Dockerfile is included for containerized deployment:

```bash
# Build the Docker image
docker build -t print-genius-suite:latest .

# Run the container
docker run -p 8080:80 print-genius-suite:latest
```

## Supabase Production Configuration

The application is already configured to use the production Supabase project. Ensure the following are properly set up:

1. **Authentication**: Verify email confirmations are properly configured
2. **Storage Buckets**: Ensure the `designs` bucket exists with proper permissions
3. **Edge Functions**: Verify all edge functions are deployed and working
4. **Database**: Check that all tables exist with proper RLS policies

## Post-Deployment Verification

After deploying, verify the following:

1. User authentication works correctly
2. Design uploads and retrievals function properly
3. AI image generation is operational
4. All pages load correctly on both desktop and mobile
5. Dark/light mode switching works

## Monitoring

- Monitor application errors through the Sentry dashboard
- Check Supabase logs for backend issues
- Set up uptime monitoring through a service like UptimeRobot or Pingdom

## Support

If you encounter any deployment issues, please contact support at support@print-genius-suite.com.

