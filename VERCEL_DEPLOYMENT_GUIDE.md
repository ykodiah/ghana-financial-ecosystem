# Vercel Deployment Guide for Ghana Financial Ecosystem

## Overview
This guide will help you deploy the Ghana Financial Ecosystem application to Vercel with proper configuration to avoid the `routes` conflict error.

## Problem Fixed
The original error `If 'rewrites', 'redirects', 'headers', 'cleanUrls' or 'trailingSlash' are used, then 'routes' cannot be present` was caused by having both `routes` and other routing configurations in the same vercel.json file.

## Solution
We've separated the configurations and updated them to use the modern Vercel configuration format.

## Deployment Steps

### 1. Frontend Deployment (Recommended Approach)

#### Option A: Deploy Frontend Only
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set the **Root Directory** to `frontend`

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   Add these in Vercel dashboard under Settings > Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

#### Option B: Deploy Full Stack (Frontend + Backend)
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Keep **Root Directory** as `.` (root)

2. **Configure Build Settings:**
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm run install:all`

3. **Environment Variables:**
   Add these in Vercel dashboard:
   ```
   VITE_API_URL=https://your-domain.vercel.app/api
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=production
   ```

### 2. Backend API Deployment (Separate Project)

If you want to deploy the backend separately:

1. **Create New Vercel Project:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `api/backend`

2. **Configure Build Settings:**
   - Framework Preset: `Other`
   - Build Command: `npm install`
   - Output Directory: `.`
   - Install Command: `npm install`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

## Configuration Files Explained

### Root vercel.json
```json
{
  "version": 2,
  "name": "ghana-financial-ecosystem",
  "buildCommand": "npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm run install:all",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/backend"
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

### Frontend vercel.json
```json
{
  "version": 2,
  "name": "ghana-financial-frontend",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

## Key Changes Made

1. **Removed `routes` configuration** - This was causing the conflict
2. **Used `rewrites` instead** - Modern Vercel approach
3. **Separated frontend and backend configs** - Cleaner separation
4. **Updated environment variables** - Using Vite format (`VITE_*`)
5. **Added proper API structure** - Created `/api/backend` endpoint

## Testing the Deployment

### 1. Test Frontend
- Visit your deployed URL
- Check if the landing page loads
- Test the demo login functionality
- Verify all pages are accessible

### 2. Test Backend API
- Visit `https://your-domain.vercel.app/api/health`
- Should return: `{"status":"OK","timestamp":"...","uptime":...}`

### 3. Test Demo Features
- Use demo credentials: `demo@ghanafinancial.com` / `demo123456`
- Verify demo dashboard loads with sample data
- Test payment modal (should show demo restrictions)

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check if all dependencies are installed
   - Verify Node.js version (>=18.0.0)
   - Check for TypeScript errors

2. **Environment Variables Not Working:**
   - Ensure variables start with `VITE_` for frontend
   - Check if variables are set in Vercel dashboard
   - Redeploy after adding new variables

3. **API Routes Not Working:**
   - Verify the API structure in `/api/backend`
   - Check if the backend is deployed correctly
   - Test API endpoints directly

4. **Demo Login Not Working:**
   - Check if Supabase is configured
   - Verify environment variables
   - Check browser console for errors

## Environment Variables Reference

### Frontend (.env.local)
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=Ghana Financial
VITE_APP_VERSION=1.0.0
```

### Backend
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=3001
```

## Demo Features

The application includes a fully functional demo mode:

- **Demo Login:** `demo@ghanafinancial.com` / `demo123456`
- **Sample Data:** Pre-loaded transactions, investments, and analytics
- **Payment Simulation:** Mock payment processing
- **Premium Features:** All features unlocked for demo users

## Next Steps

1. **Set up Supabase:**
   - Create a Supabase project
   - Set up authentication
   - Configure database tables
   - Update environment variables

2. **Configure Payment Processing:**
   - Integrate with payment providers (Stripe, PayPal, etc.)
   - Update payment modal with real payment logic

3. **Add Real Data:**
   - Connect to real financial APIs
   - Implement actual transaction processing
   - Set up real-time notifications

4. **Security:**
   - Add proper authentication
   - Implement rate limiting
   - Add input validation
   - Set up monitoring

## Support

If you encounter any issues during deployment:

1. Check the Vercel deployment logs
2. Verify all configuration files are correct
3. Ensure all environment variables are set
4. Test locally first with `npm run dev`

The application is now ready for deployment with proper Vercel configuration!