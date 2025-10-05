#!/bin/bash

# Ghana Financial Ecosystem - Deployment Script
echo "🚀 Deploying Ghana Financial Ecosystem..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Import your GitHub repository"
    echo "3. Set Root Directory to 'frontend'"
    echo "4. Add environment variables:"
    echo "   - VITE_API_URL = https://your-project.vercel.app/api"
    echo "   - VITE_DEMO_MODE = true"
    echo "   - VITE_APP_NAME = Ghana Financial"
    echo "5. Deploy!"
    echo ""
    echo "🎉 Demo credentials:"
    echo "   Email: demo@ghanafinancial.com"
    echo "   Password: demo123456"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi