# 🚀 Complete Application Setup Guide

## 📋 Prerequisites

### Required Software:
- **Java 11** (for backend)
- **Node.js 16+** (for frontend)
- **MongoDB** (for database)
- **Maven** (usually comes with Java)

### Check Installations:
```bash
java -version
node --version
npm --version
mvn --version
```

## 🗄️ Database Setup

### Option 1: Local MongoDB
**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Or download from:** https://www.mongodb.com/try/download/community

### Option 2: MongoDB Atlas (Recommended for Production)
- Create account at https://www.mongodb.com/atlas
- Create a cluster
- Get connection string
- Use the connection string in environment variables

### 2. Verify MongoDB is Running
```bash
mongosh
# or
mongo
```

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Set Environment Variables
Create a `.env` file in the backend directory:
```bash
MONGODB_DATABASE_URL=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
MONGODB_DATABASE_URL=mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp
```

### 4. Run Backend Application
```bash
mvn spring-boot:run
```

**Backend will start on:** http://localhost:8080

### 5. Verify Backend is Running
```bash
curl http://localhost:8080/api/health
# Should return health status
```

## 🎨 Frontend Setup

### 1. Navigate to Project Root
```bash
cd ..  # Go back to project root
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm start
```

**Frontend will start on:** http://localhost:3000

## 🌐 Access Your Application

### URLs:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Swagger Documentation**: http://localhost:8080/swagger-ui.html

### Production URLs:
- **Frontend**: https://ecommerce-app-frontend-lhcu.onrender.com
- **Backend API**: https://ecommerce-app-c5dr.onrender.com
- **API Documentation**: https://ecommerce-app-c5dr.onrender.com/swagger-ui.html

### Default Admin User:
The application will create default roles (ADMIN, USER) on first startup.

## 🔍 API Testing

### Test Authentication:
```bash
# Sign up
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123",
    "firstName": "Admin",
    "lastName": "User",
    "contactNumber": "1234567890",
    "role": ["ADMIN"]
  }'

# Sign in
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@test.com",
    "password": "password123"
  }'
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Port 8080 Already in Use:**
   ```bash
   lsof -ti:8080 | xargs kill -9
   ```

2. **MongoDB Connection Issues:**
   ```bash
   brew services restart mongodb/brew/mongodb-community
   ```

3. **Maven Build Issues:**
   ```bash
   mvn clean
   mvn install
   ```

4. **Frontend Proxy Issues:**
   - Check that backend is running on port 8080
   - Verify proxy configuration in `src/setupProxy.js`

### Logs:
- **Backend logs**: Check terminal where you ran `mvn spring-boot:run`
- **Frontend logs**: Check terminal where you ran `npm start`

## 📱 Application Features

### User Roles:
- **ADMIN**: Can create, modify, delete products
- **USER**: Can browse, search, place orders

### Key Features:
- ✅ User authentication (login/signup)
- ✅ Product management (CRUD operations)
- ✅ Category filtering
- ✅ Search functionality
- ✅ Address management
- ✅ Order placement
- ✅ JWT-based security

## 🚀 Production Deployment

### Current Deployment:
- **Backend**: Render (Docker/Java)
- **Frontend**: Render (Static Site)
- **Database**: MongoDB Atlas

### Environment Variables for Production:
```
MONGODB_DATABASE_URL=mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp
REACT_APP_API_BASE_URL=https://ecommerce-app-c5dr.onrender.com/api
REACT_APP_BACKEND_URL=https://ecommerce-app-c5dr.onrender.com
```

### Alternative Deployment Options:
1. **Heroku**: Easy deployment with MongoDB Atlas
2. **AWS**: EC2 with MongoDB
3. **Google Cloud**: App Engine with Cloud Firestore

## 📞 Support

If you encounter any issues:
1. Check the logs in both terminal windows
2. Verify MongoDB is running
3. Ensure both services are on correct ports
4. Check network connectivity between frontend and backend
5. Visit the live application: https://ecommerce-app-frontend-lhcu.onrender.com 