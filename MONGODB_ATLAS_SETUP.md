# MongoDB Atlas Setup Guide

## 🗄️ Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**: https://www.mongodb.com/atlas
2. **Sign up** for a free account
3. **Create a new project** (e.g., "E-commerce App")

## 🌐 Step 2: Create Database Cluster

1. **Click "Build a Database"**
2. **Choose "FREE" tier** (M0)
3. **Select Cloud Provider**: AWS, Google Cloud, or Azure
4. **Choose Region**: Select closest to your users
5. **Click "Create"**

## 🔐 Step 3: Configure Database Access

1. **Go to "Database Access"** in the left sidebar
2. **Click "Add New Database User"**
3. **Username**: `ecommerce-user`
4. **Password**: Generate a strong password
5. **Database User Privileges**: "Read and write to any database"
6. **Click "Add User"**

## 🌍 Step 4: Configure Network Access

1. **Go to "Network Access"** in the left sidebar
2. **Click "Add IP Address"**
3. **Choose "Allow Access from Anywhere"** (0.0.0.0/0)
4. **Click "Confirm"**

## 🔗 Step 5: Get Connection String

1. **Go to "Database"** in the left sidebar
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Copy the connection string**

### Connection String Format:
```
mongodb+srv://ecommerce-user:<password>@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## 📝 Step 6: Environment Variables

You'll need these for Render deployment:
- `MONGODB_DATABASE_URL`: Your Atlas connection string
- `JWT_SECRET`: A secure random string for JWT tokens

## ✅ Next Steps

After setting up MongoDB Atlas, proceed to:
1. Backend deployment on Render
2. Frontend deployment on Render
3. Update environment variables 