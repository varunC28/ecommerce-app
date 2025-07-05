# 🚀 Render Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** with your code pushed
2. **Render Account**: https://render.com
3. **MongoDB Atlas Account**: https://www.mongodb.com/atlas

## 🗄️ Step 1: MongoDB Atlas Setup

Follow the `MONGODB_ATLAS_SETUP.md` guide to:
1. Create MongoDB Atlas account
2. Set up database cluster
3. Configure network access
4. Get connection string

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Connect GitHub Repository
1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Select the repository** containing your backend code

### 2.2 Configure Backend Service
- **Name**: `ecommerce-backend`
- **Environment**: `Java`
- **Build Command**: `mvn clean install`
- **Start Command**: `mvn spring-boot:run`
- **Plan**: `Free`

### 2.3 Set Environment Variables
Add these environment variables in Render dashboard:

```
MONGODB_DATABASE_URL=mongodb+srv://ecommerce-user:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JAVA_VERSION=20
```

### 2.4 Deploy Backend
1. **Click "Create Web Service"**
2. **Wait for deployment** (5-10 minutes)
3. **Copy the URL** (e.g., `https://ecommerce-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Create Static Site
1. **Go to Render Dashboard**
2. **Click "New +"** → **"Static Site"**
3. **Connect your GitHub repository**
4. **Select the same repository**

### 3.2 Configure Frontend Service
- **Name**: `ecommerce-frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Plan**: `Free`

### 3.3 Set Environment Variables
Add these environment variables:

```
REACT_APP_API_BASE_URL=https://ecommerce-backend.onrender.com/api
REACT_APP_BACKEND_URL=https://ecommerce-backend.onrender.com
```

### 3.4 Deploy Frontend
1. **Click "Create Static Site"**
2. **Wait for deployment** (3-5 minutes)
3. **Copy the URL** (e.g., `https://ecommerce-frontend.onrender.com`)

## 🔗 Step 4: Update Frontend Configuration

After getting your backend URL, update the frontend environment variables in Render dashboard.

## ✅ Step 5: Test Your Deployment

### Test Backend API:
```bash
# Test signup
curl -X POST https://your-backend-url.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","firstName":"Test","lastName":"User","contactNumber":"1234567890","role":["USER"]}'

# Test signin
curl -X POST https://your-backend-url.onrender.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"test@test.com","password":"password123"}'
```

### Test Frontend:
1. **Visit your frontend URL**
2. **Test signup/signin**
3. **Test all features**

## 📝 Step 6: Resume Links

### For Your Resume:

**Frontend Application:**
```
https://ecommerce-frontend.onrender.com
```

**Backend API:**
```
https://ecommerce-backend.onrender.com
```

**GitHub Repository:**
```
https://github.com/yourusername/your-repo-name
```

**API Documentation:**
```
https://ecommerce-backend.onrender.com/swagger-ui.html
```

## 🔧 Troubleshooting

### Common Issues:

1. **Backend Deployment Fails:**
   - Check environment variables
   - Verify MongoDB connection string
   - Check build logs

2. **Frontend Can't Connect to Backend:**
   - Verify backend URL in environment variables
   - Check CORS settings
   - Test backend API directly

3. **Database Connection Issues:**
   - Verify MongoDB Atlas network access
   - Check connection string format
   - Ensure database user has correct permissions

## 📊 Monitoring

- **Backend Logs**: Available in Render dashboard
- **Frontend Build Logs**: Available in Render dashboard
- **Database**: Monitor in MongoDB Atlas dashboard

## 🚀 Next Steps

1. **Test all features** thoroughly
2. **Add custom domain** (optional)
3. **Set up monitoring** and alerts
4. **Optimize performance** if needed 