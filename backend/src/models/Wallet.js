import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  // User reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Wallet Information
  walletId: {
    type: String,
    unique: true,
    required: true
  },
  walletType: {
    type: String,
    enum: ['personal', 'business', 'savings', 'investment'],
    default: 'personal'
  },
  
  // Balance Information
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    enum: ['GHS', 'USD', 'EUR', 'GBP'],
    default: 'GHS'
  },
  
  // Transaction Limits
  dailyLimit: {
    type: Number,
    default: 10000 // GHS 10,000
  },
  monthlyLimit: {
    type: Number,
    default: 100000 // GHS 100,000
  },
  singleTransactionLimit: {
    type: Number,
    default: 5000 // GHS 5,000
  },
  
  // Security
  pin: {
    type: String,
    required: true,
    select: false
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lockReason: String,
  lockExpires: Date,
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Statistics
  totalTransactions: {
    type: Number,
    default: 0
  },
  totalVolume: {
    type: Number,
    default: 0
  },
  lastTransactionDate: Date,
  
  // Linked Accounts
  linkedAccounts: [{
    accountType: {
      type: String,
      enum: ['bank', 'mobile_money', 'card']
    },
    accountNumber: String,
    bankName: String,
    isActive: {
      type: Boolean,
      default: true
    },
    linkedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // QR Code for payments
  qrCode: String,
  
  // Timestamps
  lastActivity: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
walletSchema.index({ user: 1 });
walletSchema.index({ walletId: 1 });
walletSchema.index({ isActive: 1 });
walletSchema.index({ createdAt: -1 });

// Virtual for formatted balance
walletSchema.virtual('formattedBalance').get(function() {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: this.currency
  }).format(this.balance);
});

// Pre-save middleware
walletSchema.pre('save', function(next) {
  // Generate wallet ID if not exists
  if (!this.walletId) {
    this.walletId = `GFE${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }
  
  // Generate QR code if not exists
  if (!this.qrCode) {
    this.qrCode = `QR_${this.walletId}`;
  }
  
  next();
});

// Instance methods
walletSchema.methods.canWithdraw = function(amount) {
  if (this.isLocked) {
    return { canWithdraw: false, reason: 'Wallet is locked' };
  }
  
  if (!this.isActive) {
    return { canWithdraw: false, reason: 'Wallet is inactive' };
  }
  
  if (amount > this.balance) {
    return { canWithdraw: false, reason: 'Insufficient balance' };
  }
  
  if (amount > this.singleTransactionLimit) {
    return { canWithdraw: false, reason: 'Amount exceeds single transaction limit' };
  }
  
  return { canWithdraw: true };
};

walletSchema.methods.withdraw = function(amount, description = 'Withdrawal') {
  const canWithdraw = this.canWithdraw(amount);
  if (!canWithdraw.canWithdraw) {
    throw new Error(canWithdraw.reason);
  }
  
  this.balance -= amount;
  this.totalTransactions += 1;
  this.totalVolume += amount;
  this.lastTransactionDate = new Date();
  this.lastActivity = new Date();
  
  return this.save();
};

walletSchema.methods.deposit = function(amount, description = 'Deposit') {
  if (this.isLocked) {
    throw new Error('Wallet is locked');
  }
  
  if (!this.isActive) {
    throw new Error('Wallet is inactive');
  }
  
  this.balance += amount;
  this.totalTransactions += 1;
  this.totalVolume += amount;
  this.lastTransactionDate = new Date();
  this.lastActivity = new Date();
  
  return this.save();
};

walletSchema.methods.transfer = function(amount, toWallet, description = 'Transfer') {
  const canWithdraw = this.canWithdraw(amount);
  if (!canWithdraw.canWithdraw) {
    throw new Error(canWithdraw.reason);
  }
  
  this.balance -= amount;
  this.totalTransactions += 1;
  this.totalVolume += amount;
  this.lastTransactionDate = new Date();
  this.lastActivity = new Date();
  
  return this.save();
};

walletSchema.methods.lock = function(reason = 'Security lock') {
  this.isLocked = true;
  this.lockReason = reason;
  this.lockExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  return this.save();
};

walletSchema.methods.unlock = function() {
  this.isLocked = false;
  this.lockReason = undefined;
  this.lockExpires = undefined;
  return this.save();
};

walletSchema.methods.verifyPin = function(pin) {
  return this.pin === pin;
};

walletSchema.methods.updatePin = function(newPin) {
  this.pin = newPin;
  return this.save();
};

// Static methods
walletSchema.statics.findByWalletId = function(walletId) {
  return this.findOne({ walletId, isActive: true });
};

walletSchema.statics.findByUser = function(userId) {
  return this.findOne({ user: userId, isActive: true });
};

walletSchema.statics.getTotalBalance = function() {
  return this.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, totalBalance: { $sum: '$balance' } } }
  ]);
};

export default mongoose.model('Wallet', walletSchema);
