# E-Shop Application Deployment Guide

## 🚀 Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on localhost:8080

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080 (required)

## 🌐 Netlify Deployment

### Prerequisites
- Netlify account
- Backend deployed and accessible via HTTPS

### Deployment Steps

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`

3. **Environment Variables**
   Set these in Netlify dashboard:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.com/api
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

4. **Backend Configuration**
   - Deploy your backend to a service (Heroku, AWS, etc.)
   - Update CORS settings to allow your Netlify domain
   - Ensure all API endpoints are accessible via HTTPS

### Important Notes

- The application uses client-side routing (React Router)
- Netlify configuration handles SPA routing with redirects
- Backend must support CORS for cross-origin requests
- Authentication tokens are stored in localStorage

## 🔧 Troubleshooting

### Common Issues

1. **API Calls Failing**
   - Check backend URL configuration
   - Verify CORS settings on backend
   - Ensure HTTPS for production

2. **Routing Issues**
   - Netlify redirects should handle client-side routing
   - Check `netlify.toml` configuration

3. **Authentication Problems**
   - Verify token storage in localStorage
   - Check backend authentication endpoints

## 📁 File Structure

```
upgrad-eshop/
├── src/
│   ├── components/          # React components
│   ├── contexts/           # React Context providers
│   ├── config.js          # Environment configuration
│   └── setupProxy.js      # Development proxy
├── public/                # Static assets
├── netlify.toml          # Netlify configuration
└── package.json          # Dependencies and scripts
``` 