import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import walletRoutes from './routes/wallets.js';
import transactionRoutes from './routes/transactions.js';
import lendingRoutes from './routes/lending.js';
import investmentRoutes from './routes/investments.js';
import remittanceRoutes from './routes/remittances.js';
import merchantRoutes from './routes/merchants.js';
import adminRoutes from './routes/admin.js';
import analyticsRoutes from './routes/analytics.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { logger } from './utils/logger.js';

// Import services
import { initializeServices } from './services/index.js';
import { initializeSchedulers } from './schedulers/index.js';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Data sanitization
app.use(mongoSanitize());
app.use(hpp());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Ghana Financial Ecosystem API is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Documentation
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'Ghana Financial Ecosystem API',
    version: '1.0.0',
    description: 'Comprehensive financial services platform for Ghana',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      wallets: '/api/wallets',
      transactions: '/api/transactions',
      lending: '/api/lending',
      investments: '/api/investments',
      remittances: '/api/remittances',
      merchants: '/api/merchants',
      admin: '/api/admin',
      analytics: '/api/analytics'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/lending', lendingRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/remittances', remittanceRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);
  
  socket.on('join_user_room', (userId) => {
    socket.join(`user_${userId}`);
    logger.info(`User ${userId} joined their room`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghana-financial', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Initialize services and schedulers
const initializeApp = async () => {
  try {
    await connectDB();
    await initializeServices();
    await initializeSchedulers();
    logger.info('All services initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await initializeApp();
  
  server.listen(PORT, () => {
    logger.info(`🚀 Ghana Financial Ecosystem Server running on port ${PORT}`);
    logger.info(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`🌍 API Documentation: http://localhost:${PORT}/api/docs`);
    logger.info(`💚 Health Check: http://localhost:${PORT}/health`);
  });
};

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

startServer();

export default app;
