import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  // Transaction Information
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  reference: {
    type: String,
    unique: true,
    required: true
  },
  
  // Parties involved
  sender: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true
    },
    walletId: String,
    phone: String,
    name: String
  },
  recipient: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet'
    },
    walletId: String,
    phone: String,
    name: String,
    accountNumber: String,
    bankName: String
  },
  
  // Transaction Details
  type: {
    type: String,
    enum: [
      'transfer', 'deposit', 'withdrawal', 'payment', 'refund',
      'airtime', 'data', 'bill_payment', 'loan_disbursement',
      'loan_repayment', 'investment', 'dividend', 'fee',
      'commission', 'bonus', 'referral', 'cashback'
    ],
    required: true
  },
  category: {
    type: String,
    enum: [
      'personal', 'business', 'investment', 'loan', 'utility',
      'entertainment', 'shopping', 'transport', 'food', 'health',
      'education', 'other'
    ],
    default: 'personal'
  },
  
  // Amount Information
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    enum: ['GHS', 'USD', 'EUR', 'GBP'],
    default: 'GHS'
  },
  exchangeRate: {
    type: Number,
    default: 1
  },
  
  // Fees and Charges
  fees: {
    platformFee: {
      type: Number,
      default: 0
    },
    processingFee: {
      type: Number,
      default: 0
    },
    networkFee: {
      type: Number,
      default: 0
    },
    totalFees: {
      type: Number,
      default: 0
    }
  },
  
  // Status and Processing
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'reversed'],
    default: 'pending'
  },
  processingStatus: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed'],
    default: 'queued'
  },
  
  // Transaction Flow
  steps: [{
    step: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed']
    },
    timestamp: Date,
    message: String
  }],
  
  // Description and Metadata
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  notes: String,
  tags: [String],
  
  // External References
  externalReference: String,
  providerTransactionId: String,
  providerResponse: mongoose.Schema.Types.Mixed,
  
  // Bill Payment Specific
  billPayment: {
    provider: String,
    accountNumber: String,
    customerName: String,
    billType: String,
    dueDate: Date,
    billAmount: Number
  },
  
  // Airtime/Data Specific
  airtimeData: {
    provider: String,
    phoneNumber: String,
    package: String,
    validity: String
  },
  
  // Loan Specific
  loan: {
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan'
    },
    loanType: String,
    installmentNumber: Number,
    totalInstallments: Number
  },
  
  // Investment Specific
  investment: {
    investmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Investment'
    },
    investmentType: String,
    maturityDate: Date
  },
  
  // Security and Compliance
  riskScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  complianceFlags: [String],
  kycRequired: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  initiatedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: Date,
  completedAt: Date,
  failedAt: Date,
  reversedAt: Date,
  
  // Error Information
  errorCode: String,
  errorMessage: String,
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  },
  
  // Notifications
  notificationsSent: {
    sms: {
      type: Boolean,
      default: false
    },
    email: {
      type: Boolean,
      default: false
    },
    push: {
      type: Boolean,
      default: false
    }
  },
  
  // Analytics
  channel: {
    type: String,
    enum: ['mobile_app', 'web', 'api', 'ussd', 'atm', 'agent'],
    default: 'mobile_app'
  },
  deviceInfo: {
    deviceId: String,
    deviceType: String,
    appVersion: String,
    osVersion: String
  },
  location: {
    ip: String,
    country: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ reference: 1 });
transactionSchema.index({ 'sender.user': 1 });
transactionSchema.index({ 'recipient.user': 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ amount: 1 });
transactionSchema.index({ currency: 1 });

// Compound indexes
transactionSchema.index({ 'sender.user': 1, createdAt: -1 });
transactionSchema.index({ 'recipient.user': 1, createdAt: -1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ createdAt: -1, status: 1 });

// Virtual for net amount (amount - fees)
transactionSchema.virtual('netAmount').get(function() {
  return this.amount - this.fees.totalFees;
});

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: this.currency
  }).format(this.amount);
});

// Virtual for duration
transactionSchema.virtual('duration').get(function() {
  if (!this.completedAt) return null;
  return this.completedAt - this.initiatedAt;
});

// Pre-save middleware
transactionSchema.pre('save', function(next) {
  // Generate transaction ID if not exists
  if (!this.transactionId) {
    this.transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
  
  // Generate reference if not exists
  if (!this.reference) {
    this.reference = `REF${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
  
  // Calculate total fees
  this.fees.totalFees = this.fees.platformFee + this.fees.processingFee + this.fees.networkFee;
  
  // Set timestamps based on status
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  if (this.status === 'failed' && !this.failedAt) {
    this.failedAt = new Date();
  }
  
  if (this.status === 'reversed' && !this.reversedAt) {
    this.reversedAt = new Date();
  }
  
  next();
});

// Instance methods
transactionSchema.methods.canBeReversed = function() {
  return this.status === 'completed' && 
         this.completedAt && 
         (Date.now() - this.completedAt) < (24 * 60 * 60 * 1000); // 24 hours
};

transactionSchema.methods.reverse = function(reason = 'Transaction reversal') {
  if (!this.canBeReversed()) {
    throw new Error('Transaction cannot be reversed');
  }
  
  this.status = 'reversed';
  this.reversedAt = new Date();
  this.notes = this.notes ? `${this.notes}\nReversed: ${reason}` : `Reversed: ${reason}`;
  
  return this.save();
};

transactionSchema.methods.retry = function() {
  if (this.retryCount >= this.maxRetries) {
    throw new Error('Maximum retry attempts exceeded');
  }
  
  this.retryCount += 1;
  this.status = 'pending';
  this.processingStatus = 'queued';
  this.errorCode = undefined;
  this.errorMessage = undefined;
  
  return this.save();
};

transactionSchema.methods.addStep = function(step, status, message = '') {
  this.steps.push({
    step,
    status,
    timestamp: new Date(),
    message
  });
  
  return this.save();
};

transactionSchema.methods.updateStatus = function(status, message = '') {
  this.status = status;
  
  if (status === 'processing') {
    this.processingStatus = 'processing';
  } else if (status === 'completed') {
    this.processingStatus = 'completed';
    this.completedAt = new Date();
  } else if (status === 'failed') {
    this.processingStatus = 'failed';
    this.failedAt = new Date();
  }
  
  if (message) {
    this.addStep('status_update', status, message);
  }
  
  return this.save();
};

// Static methods
transactionSchema.statics.findByTransactionId = function(transactionId) {
  return this.findOne({ transactionId });
};

transactionSchema.statics.findByReference = function(reference) {
  return this.findOne({ reference });
};

transactionSchema.statics.findByUser = function(userId, limit = 50, skip = 0) {
  return this.find({
    $or: [
      { 'sender.user': userId },
      { 'recipient.user': userId }
    ]
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .skip(skip)
  .populate('sender.user', 'firstName lastName email phone')
  .populate('recipient.user', 'firstName lastName email phone');
};

transactionSchema.statics.getUserTransactionStats = function(userId) {
  return this.aggregate([
    {
      $match: {
        $or: [
          { 'sender.user': mongoose.Types.ObjectId(userId) },
          { 'recipient.user': mongoose.Types.ObjectId(userId) }
        ],
        status: 'completed'
      }
    },
    {
      $group: {
        _id: null,
        totalTransactions: { $sum: 1 },
        totalVolume: { $sum: '$amount' },
        totalFees: { $sum: '$fees.totalFees' },
        averageAmount: { $avg: '$amount' },
        lastTransaction: { $max: '$createdAt' }
      }
    }
  ]);
};

transactionSchema.statics.getDailyStats = function(date = new Date()) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay, $lte: endOfDay },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: null,
        totalTransactions: { $sum: 1 },
        totalVolume: { $sum: '$amount' },
        totalFees: { $sum: '$fees.totalFees' },
        averageAmount: { $avg: '$amount' }
      }
    }
  ]);
};

export default mongoose.model('Transaction', transactionSchema);
