// Configuration for different environments
const config = {
  development: {
    apiBaseUrl: '/api',
    backendUrl: 'http://localhost:8080'
  },
  production: {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '/api',
    backendUrl: process.env.REACT_APP_BACKEND_URL || 'https://your-backend-url.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const apiConfig = config[environment];

export default config[environment]; 