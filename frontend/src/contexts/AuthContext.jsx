import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import config from '../config/env';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  // Demo user credentials
  const DEMO_CREDENTIALS = {
    email: config.demo.email,
    password: config.demo.password,
    name: 'Demo User',
    phone: '+233 24 123 4567'
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setIsDemoUser(session.user.email === DEMO_CREDENTIALS.email);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsDemoUser(session.user.email === DEMO_CREDENTIALS.email);
        } else {
          setUser(null);
          setIsDemoUser(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.name,
            phone: userData.phone,
            ...userData
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Please check your email to confirm your account');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Check if this is a demo user
      if (email === DEMO_CREDENTIALS.email) {
        setIsDemoUser(true);
        toast.success('Welcome to the demo! Explore all features with sample data.');
      } else {
        setIsDemoUser(false);
        toast.success('Welcome back!');
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithDemo = async () => {
    return await signIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setIsDemoUser(false);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      toast.success('Password reset email sent!');
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset email');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      toast.error(error.message || 'Failed to update password');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) throw error;

      toast.success('Profile updated successfully');
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Failed to update profile');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isDemoUser,
    DEMO_CREDENTIALS,
    signUp,
    signIn,
    signInWithDemo,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};