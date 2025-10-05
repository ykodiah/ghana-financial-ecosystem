# Quick Deployment Instructions

## 🚀 Fast Track Deployment (Recommended)

### Step 1: Deploy Frontend Only (Easiest)

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)

3. **Set Environment Variables:**
   In Vercel Dashboard > Settings > Environment Variables, add:
   ```
   VITE_API_URL = https://your-project-name.vercel.app/api
   VITE_DEMO_MODE = true
   VITE_APP_NAME = Ghana Financial
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete

### Step 2: Test Demo Features

1. **Visit your deployed URL**
2. **Click "Launch Demo" on the login page**
3. **Use demo credentials:**
   - Email: `demo@ghanafinancial.com`
   - Password: `demo123456`

## 🔧 Alternative: Full Stack Deployment

### Option A: Single Project (Root Directory)

1. **Configure Project:**
   - **Root Directory:** `.` (root)
   - **Framework Preset:** `Other`
   - **Build Command:** `npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm run install:all`

2. **Set Environment Variables:**
   ```
   VITE_API_URL = https://your-project-name.vercel.app/api
   VITE_DEMO_MODE = true
   VITE_APP_NAME = Ghana Financial
   NODE_ENV = production
   ```

### Option B: Two Separate Projects

1. **Deploy Frontend:**
   - Root Directory: `frontend`
   - Use `frontend/vercel-simple.json`

2. **Deploy Backend:**
   - Root Directory: `api/backend`
   - Use backend package.json

## 🛠️ Environment Variables Reference

### Required for Demo Mode:
```env
VITE_API_URL=https://your-domain.vercel.app/api
VITE_DEMO_MODE=true
VITE_APP_NAME=Ghana Financial
```

### Optional (for real authentication):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Backend Variables:
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 🎯 Demo Features Available

- ✅ **Professional Landing Pages** with 3-tier billing
- ✅ **Demo Login System** (no registration required)
- ✅ **Interactive Dashboard** with sample data
- ✅ **Payment Modal** with demo restrictions
- ✅ **Mobile-Responsive Design**
- ✅ **All Premium Features Unlocked**

## 🔍 Testing Checklist

After deployment, verify:

- [ ] Landing page loads correctly
- [ ] Demo login works (`demo@ghanafinancial.com` / `demo123456`)
- [ ] Dashboard shows sample data
- [ ] Payment modal opens (shows demo restrictions)
- [ ] All navigation works
- [ ] Mobile responsive design

## 🚨 Troubleshooting

### Build Fails:
- Check if all dependencies are installed
- Verify Node.js version (>=18.0.0)
- Check build logs in Vercel dashboard

### Environment Variables Not Working:
- Ensure variables start with `VITE_` for frontend
- Check if variables are set in Vercel dashboard
- Redeploy after adding variables

### Demo Login Not Working:
- Verify `VITE_DEMO_MODE=true` is set
- Check browser console for errors
- Ensure API endpoints are accessible

### API Not Working:
- Check if backend is deployed
- Verify API URL is correct
- Test API endpoints directly

## 📱 Demo Credentials

- **Email:** `demo@ghanafinancial.com`
- **Password:** `demo123456`
- **Features:** All premium features unlocked
- **Data:** Pre-loaded sample transactions and investments

## 🎉 Success!

Once deployed, you'll have:
- A professional financial platform landing page
- Working demo login system
- Interactive dashboard with sample data
- Payment integration (demo mode)
- Mobile-responsive design
- All features fully functional

The application is ready for demonstration and can be easily extended with real authentication and payment processing!