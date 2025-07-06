// Configuration for different environments
const config = {
  development: {
    apiBaseUrl: '/api',
    backendUrl: 'http://localhost:8080'
  },
  production: {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://ecommerce-app-c5dr.onrender.com/api',
    backendUrl: process.env.REACT_APP_BACKEND_URL || 'https://ecommerce-app-c5dr.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const apiConfig = config[environment];

export default config[environment]; 