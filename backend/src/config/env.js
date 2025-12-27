import dotenv from 'dotenv';
dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    expiresIn: '7d'
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',')
  }
};
