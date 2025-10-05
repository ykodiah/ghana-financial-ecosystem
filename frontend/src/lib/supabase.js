import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { data, error };
  },

  async signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  },

  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { data, error };
  }
};

// Database helpers
export const db = {
  // User operations
  async getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return { data, error };
  },

  async updateUserProfile(updates) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    return { data, error };
  },

  // Wallet operations
  async getUserWallet() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    return { data, error };
  },

  async updateWalletBalance(walletId, newBalance) {
    const { data, error } = await supabase
      .from('wallets')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('id', walletId)
      .select()
      .single();

    return { data, error };
  },

  // Transaction operations
  async getUserTransactions(limit = 50, offset = 0) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        sender_user:users!sender_user_id(first_name, last_name, email, phone),
        recipient_user:users!recipient_user_id(first_name, last_name, email, phone)
      `)
      .or(`sender_user_id.eq.${user.id},recipient_user_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error };
  },

  async getTransactionById(transactionId) {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        sender_user:users!sender_user_id(first_name, last_name, email, phone),
        recipient_user:users!recipient_user_id(first_name, last_name, email, phone)
      `)
      .eq('transaction_id', transactionId)
      .single();

    return { data, error };
  },

  async createTransaction(transactionData) {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select()
      .single();

    return { data, error };
  },

  // Loan operations
  async getUserLoans() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('loans')
      .select(`
        *,
        borrower:users!borrower_id(first_name, last_name, email),
        lender:users!lender_id(first_name, last_name, email)
      `)
      .or(`borrower_id.eq.${user.id},lender_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async createLoan(loanData) {
    const { data, error } = await supabase
      .from('loans')
      .insert(loanData)
      .select()
      .single();

    return { data, error };
  },

  // Investment operations
  async getUserInvestments() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async createInvestment(investmentData) {
    const { data, error } = await supabase
      .from('investments')
      .insert(investmentData)
      .select()
      .single();

    return { data, error };
  },

  // Notification operations
  async getUserNotifications(limit = 20, offset = 0) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('sent_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error };
  },

  async markNotificationAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ 
        is_read: true,
        read_at: new Date().toISOString()
      })
      .eq('id', notificationId)
      .select()
      .single();

    return { data, error };
  },

  async markAllNotificationsAsRead() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('notifications')
      .update({ 
        is_read: true,
        read_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('is_read', false);

    return { data, error };
  },

  // Analytics operations
  async getUserAnalytics() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: new Error('No user found') };

    const { data, error } = await supabase
      .from('user_analytics')
      .select('*')
      .eq('id', user.id)
      .single();

    return { data, error };
  }
};

// Real-time subscriptions
export const subscribeToUserTransactions = (callback) => {
  const { data: { user } } = supabase.auth.getUser();
  if (!user) return null;

  return supabase
    .channel('user-transactions')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'transactions',
      filter: `or(sender_user_id.eq.${user.id},recipient_user_id.eq.${user.id})`
    }, callback)
    .subscribe();
};

export const subscribeToUserNotifications = (callback) => {
  const { data: { user } } = supabase.auth.getUser();
  if (!user) return null;

  return supabase
    .channel('user-notifications')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id.eq.${user.id}`
    }, callback)
    .subscribe();
};

export const subscribeToWalletUpdates = (callback) => {
  const { data: { user } } = supabase.auth.getUser();
  if (!user) return null;

  return supabase
    .channel('wallet-updates')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'wallets',
      filter: `user_id.eq.${user.id}`
    }, callback)
    .subscribe();
};

export default { supabase, auth, db };
