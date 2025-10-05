import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for general use (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database helper functions
export const db = {
  // User operations
  async createUser(userData) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserById(id) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByEmail(email) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByPhone(phone) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateUser(id, updates) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Wallet operations
  async createWallet(walletData) {
    const { data, error } = await supabaseAdmin
      .from('wallets')
      .insert(walletData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getWalletByUserId(userId) {
    const { data, error } = await supabaseAdmin
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getWalletById(walletId) {
    const { data, error } = await supabaseAdmin
      .from('wallets')
      .select('*')
      .eq('id', walletId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateWalletBalance(walletId, newBalance) {
    const { data, error } = await supabaseAdmin
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', walletId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Transaction operations
  async createTransaction(transactionData) {
    const { data, error } = await supabaseAdmin
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTransactionById(id) {
    const { data, error } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTransactionByTransactionId(transactionId) {
    const { data, error } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('transaction_id', transactionId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserTransactions(userId, limit = 50, offset = 0) {
    const { data, error } = await supabaseAdmin
      .from('transactions')
      .select(`
        *,
        sender_user:users!sender_user_id(first_name, last_name, email, phone),
        recipient_user:users!recipient_user_id(first_name, last_name, email, phone)
      `)
      .or(`sender_user_id.eq.${userId},recipient_user_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  async updateTransactionStatus(id, status, additionalData = {}) {
    const updateData = {
      status,
      updated_at: new Date().toISOString(),
      ...additionalData
    };

    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    } else if (status === 'failed') {
      updateData.failed_at = new Date().toISOString();
    } else if (status === 'reversed') {
      updateData.reversed_at = new Date().toISOString();
    }

    const { data, error } = await supabaseAdmin
      .from('transactions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Loan operations
  async createLoan(loanData) {
    const { data, error } = await supabaseAdmin
      .from('loans')
      .insert(loanData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserLoans(userId) {
    const { data, error } = await supabaseAdmin
      .from('loans')
      .select(`
        *,
        borrower:users!borrower_id(first_name, last_name, email),
        lender:users!lender_id(first_name, last_name, email)
      `)
      .or(`borrower_id.eq.${userId},lender_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Investment operations
  async createInvestment(investmentData) {
    const { data, error } = await supabaseAdmin
      .from('investments')
      .insert(investmentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserInvestments(userId) {
    const { data, error } = await supabaseAdmin
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Notification operations
  async createNotification(notificationData) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserNotifications(userId, limit = 20, offset = 0) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('sent_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  async markNotificationAsRead(notificationId) {
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .update({ 
        is_read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', notificationId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Analytics operations
  async getUserAnalytics(userId) {
    const { data, error } = await supabaseAdmin
      .from('user_analytics')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTransactionAnalytics(userId, startDate, endDate) {
    const { data, error } = await supabaseAdmin
      .rpc('get_transaction_analytics', {
        user_uuid: userId,
        start_date: startDate,
        end_date: endDate
      });
    
    if (error) throw error;
    return data;
  },

  // Audit log operations
  async createAuditLog(auditData) {
    const { data, error } = await supabaseAdmin
      .from('audit_logs')
      .insert(auditData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Real-time subscriptions
export const subscribeToUserTransactions = (userId, callback) => {
  return supabase
    .channel('user-transactions')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'transactions',
      filter: `or(sender_user_id.eq.${userId},recipient_user_id.eq.${userId})`
    }, callback)
    .subscribe();
};

export const subscribeToUserNotifications = (userId, callback) => {
  return supabase
    .channel('user-notifications')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id.eq.${userId}`
    }, callback)
    .subscribe();
};

export const subscribeToWalletUpdates = (userId, callback) => {
  return supabase
    .channel('wallet-updates')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'wallets',
      filter: `user_id.eq.${userId}`
    }, callback)
    .subscribe();
};

export default { supabase, supabaseAdmin, db };
