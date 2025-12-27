import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import { syncDatabase } from './src/models/index.js';

import authRoutes from './src/routes/auth.js';
import testRoutes from './src/routes/test.js';
import adminRoutes from './src/routes/admin.js';
import studentRoutes from './src/routes/student.js';
import coursesRoutes from './src/routes/courses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    database: process.env.DATABASE_URL ? 'configured' : 'not configured'
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

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }
  });
});

const startServer = async () => {
  try {
    const skipDb = process.env.SKIP_DB === 'true' || !process.env.DATABASE_URL;
    
    if (!skipDb) {
      const dbConnected = await connectDB();
      if (dbConnected) {
        await syncDatabase(false);
        console.log('Database synchronized.');
      } else {
        console.warn('Running without database connection. API endpoints requiring DB will not work.');
      }
    } else {
      console.log('Skipping database connection (SKIP_DB=true or no DATABASE_URL configured).');
    }

    app.listen(config.server.port, '0.0.0.0', () => {
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
