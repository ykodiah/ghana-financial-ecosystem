// Environment configuration with fallbacks
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  
  // Supabase Configuration (optional)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key'
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Ghana Financial',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0'
  },
  
  // Demo Mode
  demo: {
    enabled: import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_SUPABASE_URL,
    email: import.meta.env.VITE_DEMO_EMAIL || 'demo@ghanafinancial.com',
    password: import.meta.env.VITE_DEMO_PASSWORD || 'demo123456'
  },
  
  // Feature Flags
  features: {
    authentication: !!import.meta.env.VITE_SUPABASE_URL,
    payments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
    analytics: true,
    notifications: true
  }
};

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('Environment Configuration:', config);
}

export default config;