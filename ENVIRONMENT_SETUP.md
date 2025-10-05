# Environment Variables Setup Guide

## Overview
This guide explains how to set up all necessary environment variables for the Ghana Financial Ecosystem application.

## Environment Variables Required

### Frontend Variables (Vite)
All frontend environment variables must start with `VITE_` to be accessible in the browser.

```env
# API Configuration
VITE_API_URL=https://your-backend-url.vercel.app/api

# Supabase Configuration (Optional - for real authentication)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# App Configuration
VITE_APP_NAME=Ghana Financial
VITE_APP_VERSION=1.0.0

# Demo Configuration
VITE_DEMO_MODE=true
VITE_DEMO_EMAIL=demo@ghanafinancial.com
```

### Backend Variables
```env
# Server Configuration
NODE_ENV=production
PORT=3001

# CORS Configuration
FRONTEND_URL=https://your-frontend-url.vercel.app

# Database Configuration (if using real database)
DATABASE_URL=your-database-connection-string

# Security
JWT_SECRET=your-jwt-secret-key
ENCRYPTION_KEY=your-encryption-key
```

## Vercel Deployment Setup

### Option 1: Frontend-Only Deployment (Recommended for Demo)

1. **Deploy Frontend:**
   - Root Directory: `frontend`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Set Environment Variables in Vercel Dashboard:**
   ```
   VITE_API_URL=https://ghana-financial-demo-api.vercel.app/api
   VITE_SUPABASE_URL=https://demo.supabase.co
   VITE_SUPABASE_ANON_KEY=demo-key
   VITE_APP_NAME=Ghana Financial
   VITE_APP_VERSION=1.0.0
   VITE_DEMO_MODE=true
   ```

### Option 2: Full Stack Deployment

1. **Deploy Full Stack:**
   - Root Directory: `.` (root)
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`

2. **Set Environment Variables:**
   ```
   VITE_API_URL=https://your-domain.vercel.app/api
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_APP_NAME=Ghana Financial
   VITE_APP_VERSION=1.0.0
   FRONTEND_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

## Demo Mode Configuration

The application includes a built-in demo mode that works without any external services:

### Demo Features:
- **Demo Login:** `demo@ghanafinancial.com` / `demo123456`
- **Sample Data:** Pre-loaded transactions, investments, analytics
- **Mock API:** Built-in demo API endpoints
- **No External Dependencies:** Works without Supabase or real database

### To Enable Demo Mode:
```env
VITE_DEMO_MODE=true
VITE_API_URL=https://your-domain.vercel.app/api
```

## Supabase Setup (Optional)

If you want to add real authentication and database functionality:

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key

### 2. Set Up Database Tables
Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallets table
CREATE TABLE wallets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(15,2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'GHS',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id VARCHAR(50) UNIQUE NOT NULL,
  sender_user_id UUID REFERENCES users(id),
  recipient_user_id UUID REFERENCES users(id),
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  type VARCHAR(50) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add more tables as needed...
```

### 3. Update Environment Variables
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Local Development Setup

### 1. Create .env.local file in frontend directory:
```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_APP_NAME=Ghana Financial
VITE_APP_VERSION=1.0.0
VITE_DEMO_MODE=true
```

### 2. Create .env file in root directory:
```env
# Backend Environment Variables
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. Install and run:
```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

## Production Environment Variables

### For Production Deployment:

1. **Remove or comment out demo mode:**
   ```env
   # VITE_DEMO_MODE=true  # Comment out for production
   ```

2. **Use real API URLs:**
   ```env
   VITE_API_URL=https://your-production-api.vercel.app/api
   ```

3. **Set up real Supabase:**
   ```env
   VITE_SUPABASE_URL=https://your-production-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-production-anon-key
   ```

## Security Considerations

### 1. Never commit .env files to version control
- Add `.env*` to `.gitignore`
- Use `.env.example` files for reference

### 2. Use Vercel Secrets for sensitive data
- Go to Vercel Dashboard > Project > Settings > Environment Variables
- Add sensitive variables as "Secret" type
- Reference them in vercel.json as `@secret-name`

### 3. Environment-specific configurations
- Use different values for development, staging, and production
- Test all environments before deploying

## Troubleshooting

### Common Issues:

1. **Environment variables not loading:**
   - Ensure variables start with `VITE_` for frontend
   - Check if variables are set in Vercel dashboard
   - Restart development server after adding variables

2. **API calls failing:**
   - Verify `VITE_API_URL` is correct
   - Check if backend is deployed and accessible
   - Test API endpoints directly

3. **Supabase connection issues:**
   - Verify Supabase URL and key are correct
   - Check if Supabase project is active
   - Ensure RLS policies are configured

4. **Demo mode not working:**
   - Check if `VITE_DEMO_MODE=true` is set
   - Verify demo credentials are correct
   - Check browser console for errors

## Quick Start (Demo Mode)

For a quick demo deployment without external services:

1. **Deploy to Vercel with these minimal variables:**
   ```
   VITE_API_URL=https://your-domain.vercel.app/api
   VITE_DEMO_MODE=true
   VITE_APP_NAME=Ghana Financial
   ```

2. **Test demo login:**
   - Email: `demo@ghanafinancial.com`
   - Password: `demo123456`

3. **Explore features:**
   - Dashboard with sample data
   - Payment modal (demo restrictions)
   - All financial features unlocked

This setup will give you a fully functional demo without requiring any external services!