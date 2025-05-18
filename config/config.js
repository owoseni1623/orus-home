const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Determine environment
const NODE_ENV = process.env.NODE_ENV || 'development';

// Base configuration
const config = {
  development: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET || 'privateKey',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    productionUrl: 'https://orus-gamma.vercel.app',
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      adminEmail: process.env.ADMIN_EMAIL
    },
    uploadDir: path.join(__dirname, '..', 'uploads')
  },
  production: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET || 'privateKey',
    clientUrl: 'https://orus-gamma.vercel.app',
    productionUrl: 'https://orus-gamma.vercel.app',
    email: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      adminEmail: process.env.ADMIN_EMAIL
    },
    uploadDir: path.join(__dirname, '..', 'uploads')
  }
};

// Export configuration based on environment
module.exports = config[NODE_ENV];