import express from 'express';
import cors from 'cors';
import { config } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { syncDatabase } from './src/models/index.js';

import authRoutes from './src/routes/auth.js';
import testRoutes from './src/routes/test.js';
import adminRoutes from './src/routes/admin.js';
import studentRoutes from './src/routes/student.js';
import coursesRoutes from './src/routes/courses.js';

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || config.cors.origins.includes(origin) || config.server.nodeEnv === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/courses', coursesRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const startServer = async () => {
  try {
    const dbConnected = await connectDB();
    
    if (dbConnected) {
      await syncDatabase(false);
      console.log('Database synchronized.');
    } else {
      console.warn('Running without database connection. Some features may not work.');
    }

    app.listen(config.server.port, 'localhost', () => {
      console.log(`Server running on http://localhost:${config.server.port}`);
      console.log(`Environment: ${config.server.nodeEnv}`);
      console.log('READY FOR DEPLOYMENT');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
