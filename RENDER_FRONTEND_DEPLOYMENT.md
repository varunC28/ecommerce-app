# Frontend Deployment to Render (Static Site)

## Issue Resolution

The deployment was failing because Render was trying to run `node server.js` which doesn't exist. This is a React application that should be deployed as a static site.

## Correct Deployment Steps

### 1. Create a New Static Site on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository: `https://github.com/varunC28/ecommerce-app`
4. Configure the deployment:

### 2. Deployment Configuration

**Name:** `ecommerce-frontend`
**Build Command:** `npm install && npm run build`
**Publish Directory:** `build`

### 3. Environment Variables

Add these environment variables in Render dashboard:

```
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with your actual backend URL from Render.

### 4. Alternative: Use render.yaml (Updated)

The `render.yaml` file has been updated with the correct configuration:

```yaml
services:
  - type: web
    name: ecommerce-frontend
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: REACT_APP_API_BASE_URL
        sync: false
      - key: REACT_APP_BACKEND_URL
        sync: false
```

### 5. Manual Deployment Steps

1. **Delete the current failed deployment** from Render dashboard
2. **Create a new Static Site** (not Web Service)
3. **Use the updated render.yaml** or configure manually
4. **Set environment variables** with your backend URL
5. **Deploy**

### 6. Verify Deployment

After deployment, your frontend should be accessible at:
`https://your-frontend-name.onrender.com`

## Troubleshooting

### If deployment still fails:

1. **Check Build Logs:** Ensure `npm run build` completes successfully
2. **Environment Variables:** Make sure backend URL is correct
3. **Static Site vs Web Service:** Ensure you're creating a Static Site, not a Web Service

### Common Issues:

- **Port conflicts:** Static sites don't need port configuration
- **Missing build folder:** Ensure `npm run build` creates the `build` directory
- **API URL issues:** Verify backend is deployed and accessible

## Alternative Deployment Options

### Vercel (Recommended for React apps)

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect React and configure correctly
4. Add environment variables in Vercel dashboard

### Netlify

1. Go to [Netlify](https://netlify.com)
2. Import your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `build`

## Environment Variables Reference

```bash
# For Render deployment
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com

# For local development
REACT_APP_API_BASE_URL=/api
REACT_APP_BACKEND_URL=http://localhost:8080
```

## Next Steps

1. Deploy backend first to get the URL
2. Update frontend environment variables with backend URL
3. Deploy frontend
4. Test the complete application 