import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    match: [/^(\+233|0)[0-9]{9}$/, 'Please enter a valid Ghana phone number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  
  // Profile Information
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  profilePicture: {
    type: String,
    default: null
  },
  
  // Address Information
  address: {
    street: String,
    city: {
      type: String,
      required: [true, 'City is required']
    },
    region: {
      type: String,
      required: [true, 'Region is required'],
      enum: [
        'Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central',
        'Volta', 'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo',
        'Western North', 'Ahafo', 'Bono', 'Bono East', 'Oti', 'Savannah', 'North East'
      ]
    },
    postalCode: String,
    country: {
      type: String,
      default: 'Ghana'
    }
  },
  
  // KYC Information
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'not_started'],
    default: 'not_started'
  },
  kycDocuments: {
    nationalId: {
      type: String,
      default: null
    },
    passport: {
      type: String,
      default: null
    },
    utilityBill: {
      type: String,
      default: null
    },
    bankStatement: {
      type: String,
      default: null
    }
  },
  nationalIdNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockedReason: String,
  
  // Security
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: String,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  
  // Preferences
  language: {
    type: String,
    enum: ['en', 'tw', 'ga', 'ha'],
    default: 'en'
  },
  currency: {
    type: String,
    enum: ['GHS', 'USD', 'EUR', 'GBP'],
    default: 'GHS'
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    marketing: {
      type: Boolean,
      default: false
    }
  },
  
  // Financial Information
  creditScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 850
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  totalTransactions: {
    type: Number,
    default: 0
  },
  totalVolume: {
    type: Number,
    default: 0
  },
  
  // Referral System
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referralCount: {
    type: Number,
    default: 0
  },
  referralEarnings: {
    type: Number,
    default: 0
  },
  
  // Device Information
  devices: [{
    deviceId: String,
    deviceType: String,
    lastLogin: Date,
    isActive: Boolean
  }],
  lastLogin: Date,
  lastLoginIP: String,
  
  // Timestamps
  lastActive: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ nationalIdNumber: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ isActive: 1, isVerified: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();
  
  // Hash password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('save', function(next) {
  // Set password changed timestamp
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
  next();
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      phone: this.phone
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
};

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

userSchema.methods.generateEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return verificationToken;
};

userSchema.methods.generateReferralCode = function() {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  this.referralCode = code;
  return code;
};

userSchema.methods.isAccountLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

userSchema.methods.incrementLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isAccountLocked()) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Static methods
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  
  if (!user.isActive) {
    throw new Error('Account is deactivated');
  }
  
  if (user.isBlocked) {
    throw new Error('Account is blocked');
  }
  
  if (user.isAccountLocked()) {
    throw new Error('Account is temporarily locked');
  }
  
  return user;
};

userSchema.statics.findByPhone = async function(phone) {
  return await this.findOne({ phone, isActive: true });
};

userSchema.statics.findByReferralCode = async function(code) {
  return await this.findOne({ referralCode: code, isActive: true });
};

export default mongoose.model('User', userSchema);
