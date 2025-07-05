#!/bin/bash

# Frontend Deployment Script for Render

echo "🚀 Starting Frontend Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Error: Build failed. Check the build logs above."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Render Dashboard: https://dashboard.render.com/"
echo "2. Create a new Static Site"
echo "3. Connect your GitHub repository: https://github.com/varunC28/ecommerce-app"
echo "4. Set Build Command: npm install && npm run build"
echo "5. Set Publish Directory: build"
echo "6. Add environment variables:"
echo "   - REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api"
echo "   - REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com"
echo ""
echo "🔗 Or use the updated render.yaml file for automatic deployment" 