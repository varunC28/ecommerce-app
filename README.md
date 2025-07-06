# 🛒 E-commerce Application

A full-stack e-commerce application built with React frontend and Spring Boot backend.

## 🚀 Live Application

- **Frontend**: [https://ecommerce-app-frontend-lhcu.onrender.com](https://ecommerce-app-frontend-lhcu.onrender.com)
- **Backend API**: [https://ecommerce-app-c5dr.onrender.com](https://ecommerce-app-c5dr.onrender.com)
- **API Documentation**: [https://ecommerce-app-c5dr.onrender.com/swagger-ui.html](https://ecommerce-app-c5dr.onrender.com/swagger-ui.html)

## 🛠️ Technology Stack

### Frontend
- **React 18** with Hooks
- **Material-UI** for UI components
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Spring Boot 2.7.7**
- **Spring Security** with JWT
- **Spring Data MongoDB**
- **MongoDB Atlas** for database
- **Maven** for build management

### Infrastructure
- **Render** for hosting
- **MongoDB Atlas** for database
- **GitHub** for version control

## 🎯 Features

### User Features
- ✅ User authentication (signup/signin)
- ✅ Product browsing and search
- ✅ Category filtering
- ✅ Product details and ordering
- ✅ Address management
- ✅ Order placement and tracking

### Admin Features
- ✅ Product management (CRUD operations)
- ✅ User management
- ✅ Order management
- ✅ Category management

## 🚀 Quick Start

### Prerequisites
- Java 11+
- Node.js 16+
- MongoDB (local or Atlas)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/varunC28/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Start Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Start Frontend**
   ```bash
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - API Docs: http://localhost:8080/swagger-ui.html

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Place new order

### Addresses
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Add new address

## 🔧 Environment Variables

### Backend
```
MONGODB_DATABASE_URL=mongodb+srv://ecommerce-user:hevhor-6pizbo-boqjaD@ecommerceapp.nyp4w7x.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=EcommerceApp
JWT_SECRET=y1/LaEwNkdwt64X7X+4iKiYG/06NaGHF+7K80P6Ukm4=
PORT=8080
```

### Frontend
```
REACT_APP_API_BASE_URL=https://ecommerce-app-c5dr.onrender.com/api
REACT_APP_BACKEND_URL=https://ecommerce-app-c5dr.onrender.com
```

## 📁 Project Structure

```
ecommerce-app/
├── src/                     # React application
│   ├── components/          # React components
│   ├── contexts/           # React contexts
│   └── config.js           # Environment configuration
├── public/                 # Static files
├── backend/                # Spring Boot application
│   ├── src/main/java/
│   │   └── com/upgrad/ecommerce/
│   │       ├── controllers/ # REST controllers
│   │       ├── models/      # Data models
│   │       ├── services/    # Business logic
│   │       └── security/    # Security configuration
│   └── src/main/resources/
└── docs/                   # Documentation
```

## 🚀 Deployment

### Render Deployment
- **Backend**: Web Service (Java/Docker)
- **Frontend**: Static Site
- **Database**: MongoDB Atlas

See `RENDER_DEPLOYMENT.md` for detailed deployment instructions.

## 📝 Resume Links

### For Your Resume:

**Live Application:**
- Frontend: https://ecommerce-app-frontend-lhcu.onrender.com
- Backend API: https://ecommerce-app-c5dr.onrender.com

**GitHub Repository:**
- https://github.com/varunC28/ecommerce-app

**API Documentation:**
- https://ecommerce-app-c5dr.onrender.com/swagger-ui.html

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Varun Chaturvedi
- GitHub: [@varunC28](https://github.com/varunC28)
