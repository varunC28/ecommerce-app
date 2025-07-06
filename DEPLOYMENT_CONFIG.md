# 🚀 Deployment Configuration

## 📋 Environment Variables for Render

### Backend Environment Variables
```
MONGODB_DATABASE_URL=mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp
JWT_SECRET=y1/LaEwNkdwt64X7X+4iKiYG/06NaGHF+7K80P6Ukm4=
JAVA_VERSION=11
PORT=8080
```

### Frontend Environment Variables
```
REACT_APP_API_BASE_URL=https://ecommerce-app-c5dr.onrender.com/api
REACT_APP_BACKEND_URL=https://ecommerce-app-c5dr.onrender.com
```

## 🔧 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit: E-commerce application ready for deployment"
git branch -M main
git remote add origin https://github.com/varunC28/ecommerce-app.git
git push -u origin main
```

### 2. Deploy Backend to Render
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: https://github.com/varunC28/ecommerce-app
4. Set Root Directory: `backend`
5. Configure:
   - **Name**: `ecommerce-backend`
   - **Environment**: `Docker` (recommended) or `Java`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `mvn spring-boot:run`
   - **Plan**: `Free`

6. Add Environment Variables:
   - `MONGODB_DATABASE_URL`: `mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp`
   - `JWT_SECRET`: `y1/LaEwNkdwt64X7X+4iKiYG/06NaGHF+7K80P6Ukm4=`
   - `JAVA_VERSION`: `11`
   - `PORT`: `8080`

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy the backend URL (e.g., `https://ecommerce-app-c5dr.onrender.com`)

### 3. Deploy Frontend to Render
1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect same GitHub repository: https://github.com/varunC28/ecommerce-app
4. Configure:
   - **Name**: `ecommerce-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: `Free`

5. Add Environment Variables:
   - `REACT_APP_API_BASE_URL`: `https://ecommerce-app-c5dr.onrender.com/api`
   - `REACT_APP_BACKEND_URL`: `https://ecommerce-app-c5dr.onrender.com`

6. Click "Create Static Site"
7. Wait for deployment (3-5 minutes)

## ✅ Expected URLs

After deployment, you should have:

- **Backend API**: `https://ecommerce-app-c5dr.onrender.com`
- **Frontend App**: `https://ecommerce-app-frontend-lhcu.onrender.com`
- **API Documentation**: `https://ecommerce-app-c5dr.onrender.com/swagger-ui.html`

## 🔍 Testing Deployment

### Test Backend API:
```bash
# Test signup
curl -X POST https://ecommerce-app-c5dr.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","firstName":"Test","lastName":"User","contactNumber":"1234567890","role":["USER"]}'

# Test signin
curl -X POST https://ecommerce-app-c5dr.onrender.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"test@test.com","password":"password123"}'
```

### Test Frontend:
1. Visit your frontend URL: https://ecommerce-app-frontend-lhcu.onrender.com
2. Test signup/signin functionality
3. Test all features

## 📝 Resume Links

After successful deployment, you'll have these professional links:

- **Live Application**: `https://ecommerce-app-frontend-lhcu.onrender.com`
- **Backend API**: `https://ecommerce-app-c5dr.onrender.com`
- **API Documentation**: `https://ecommerce-app-c5dr.onrender.com/swagger-ui.html`
- **GitHub Repository**: `https://github.com/varunC28/ecommerce-app` 