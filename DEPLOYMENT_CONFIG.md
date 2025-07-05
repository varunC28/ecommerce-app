# 🚀 Deployment Configuration

## 📋 Environment Variables for Render

### Backend Environment Variables
```
MONGODB_DATABASE_URL=mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JAVA_VERSION=20
PORT=8080
```

### Frontend Environment Variables
```
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

## 🔧 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit: E-commerce application ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/ecommerce-app.git
git push -u origin main
```

### 2. Deploy Backend to Render
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ecommerce-backend`
   - **Environment**: `Java`
   - **Build Command**: `mvn clean install`
   - **Start Command**: `mvn spring-boot:run`
   - **Plan**: `Free`

5. Add Environment Variables:
   - `MONGODB_DATABASE_URL`: `mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp`
   - `JWT_SECRET`: `your-super-secret-jwt-key-here-make-it-long-and-random`
   - `JAVA_VERSION`: `20`

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy the backend URL (e.g., `https://ecommerce-backend.onrender.com`)

### 3. Deploy Frontend to Render
1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect same GitHub repository
4. Configure:
   - **Name**: `ecommerce-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: `Free`

5. Add Environment Variables:
   - `REACT_APP_API_BASE_URL`: `https://your-backend-url.onrender.com/api`
   - `REACT_APP_BACKEND_URL`: `https://your-backend-url.onrender.com`

6. Click "Create Static Site"
7. Wait for deployment (3-5 minutes)

## ✅ Expected URLs

After deployment, you should have:

- **Backend API**: `https://ecommerce-backend.onrender.com`
- **Frontend App**: `https://ecommerce-frontend.onrender.com`
- **API Documentation**: `https://ecommerce-backend.onrender.com/swagger-ui.html`

## 🔍 Testing Deployment

### Test Backend API:
```bash
# Test signup
curl -X POST https://ecommerce-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","firstName":"Test","lastName":"User","contactNumber":"1234567890","role":["USER"]}'

# Test signin
curl -X POST https://ecommerce-backend.onrender.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"test@test.com","password":"password123"}'
```

### Test Frontend:
1. Visit your frontend URL
2. Test signup/signin functionality
3. Test all features

## 📝 Resume Links

After successful deployment, you'll have these professional links:

- **Live Application**: `https://ecommerce-frontend.onrender.com`
- **Backend API**: `https://ecommerce-backend.onrender.com`
- **API Documentation**: `https://ecommerce-backend.onrender.com/swagger-ui.html`
- **GitHub Repository**: `https://github.com/yourusername/ecommerce-app` 