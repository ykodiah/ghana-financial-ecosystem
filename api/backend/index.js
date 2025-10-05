const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Demo endpoints for the financial platform
app.get('/api/demo/user', (req, res) => {
  res.json({
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@ghanafinancial.com',
    phone: '+233 24 123 4567',
    balance: 15750.00,
    currency: 'GHS',
    isDemo: true,
    plan: 'Premium',
    features: {
      mobileMoney: true,
      investments: true,
      p2pLending: true,
      billPayments: true,
      airtimePurchase: true,
      analytics: true,
      prioritySupport: true
    }
  });
});

app.get('/api/demo/transactions', (req, res) => {
  res.json([
    {
      id: 1,
      type: "received",
      amount: 500,
      description: "Payment from Kwame Asante",
      time: "2 hours ago",
      status: "completed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      type: "sent",
      amount: 200,
      description: "Transfer to Ama Serwaa",
      time: "1 day ago",
      status: "completed",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      type: "bill",
      amount: 150,
      description: "ECG Electricity Bill",
      time: "2 days ago",
      status: "completed",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      type: "airtime",
      amount: 50,
      description: "MTN Airtime Purchase",
      time: "3 days ago",
      status: "completed",
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      type: "investment",
      amount: 1000,
      description: "Government Bond Investment",
      time: "1 week ago",
      status: "completed",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);
});

app.get('/api/demo/investments', (req, res) => {
  res.json([
    {
      name: "Government Bonds",
      amount: 5000,
      return: 12.5,
      status: "active",
      type: "fixed-income"
    },
    {
      name: "Fixed Deposit",
      amount: 3000,
      return: 8.0,
      status: "active",
      type: "savings"
    },
    {
      name: "Stock Portfolio",
      amount: 2500,
      return: 15.2,
      status: "active",
      type: "equity"
    },
    {
      name: "Crypto Investment",
      amount: 1000,
      return: 22.8,
      status: "active",
      type: "cryptocurrency"
    }
  ]);
});

app.get('/api/demo/analytics', (req, res) => {
  res.json({
    monthlyIncome: 8500,
    monthlyExpenses: 3200,
    savingsRate: 45,
    totalInvestments: 11500,
    averageTransactionValue: 380,
    transactionCount: 23,
    topCategories: [
      { name: "Food & Dining", amount: 1200, percentage: 37.5 },
      { name: "Transportation", amount: 800, percentage: 25 },
      { name: "Utilities", amount: 600, percentage: 18.75 },
      { name: "Entertainment", amount: 400, percentage: 12.5 },
      { name: "Others", amount: 200, percentage: 6.25 }
    ]
  });
});

// Payment simulation endpoint
app.post('/api/demo/payment', (req, res) => {
  const { plan, paymentMethod, amount } = req.body;
  
  // Simulate payment processing
  setTimeout(() => {
    res.json({
      success: true,
      transactionId: `txn_${Date.now()}`,
      message: 'Payment processed successfully',
      plan: plan,
      amount: amount,
      paymentMethod: paymentMethod,
      timestamp: new Date().toISOString()
    });
  }, 2000);
});

// Catch-all handler for API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;