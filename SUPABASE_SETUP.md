# 🚀 Supabase Setup Guide for Ghana Financial Ecosystem

## 📋 **QUICK START**

### **Step 1: Create Supabase Project**

1. **Go to [Supabase](https://supabase.com)**
2. **Sign up/Login** with your GitHub account
3. **Create New Project**:
   - Project Name: `ghana-financial-ecosystem`
   - Organization: Your organization
   - Database Password: Generate a strong password
   - Region: Choose closest to Ghana (Europe or US East)

### **Step 2: Get Project Credentials**

After creating the project, get these credentials:

```bash
# From Supabase Dashboard → Settings → API
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PROJECT_REF=your-project-ref
```

### **Step 3: Install Supabase CLI**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize Supabase in your project
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref
```

### **Step 4: Set Up Local Development**

```bash
# Start local Supabase (includes PostgreSQL, Auth, Storage, etc.)
supabase start

# This will give you local URLs:
# API URL: http://localhost:54321
# DB URL: postgresql://postgres:postgres@localhost:54322/postgres
# Studio URL: http://localhost:54323
```

---

## 🗄️ **DATABASE SETUP**

### **Step 1: Run Migrations**

```bash
# Apply the initial schema
supabase db push

# Or run migrations locally first
supabase db reset
```

### **Step 2: Verify Database Schema**

```bash
# Check database status
supabase status

# View tables
supabase db diff
```

### **Step 3: Set Up Row Level Security (RLS)**

The migrations already include RLS policies, but you can verify them:

```sql
-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- View policies
SELECT * FROM pg_policies;
```

---

## 🔐 **AUTHENTICATION SETUP**

### **Step 1: Configure Auth Providers**

1. **Go to Supabase Dashboard → Authentication → Providers**

2. **Enable Email Auth**:
   - Enable email confirmations: `false` (for development)
   - Enable email change confirmations: `true`

3. **Enable Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

4. **Enable GitHub OAuth**:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

### **Step 2: Configure Auth Settings**

```sql
-- Update auth settings
UPDATE auth.users SET 
  email_confirmed_at = NOW(),
  phone_confirmed_at = NOW()
WHERE email = 'your-email@example.com';
```

### **Step 3: Set Up Auth Hooks**

Create auth hooks for user profile creation:

```sql
-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    first_name,
    last_name,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 📊 **REAL-TIME SETUP**

### **Step 1: Enable Realtime**

```sql
-- Enable realtime for tables
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE wallets;
```

### **Step 2: Configure Realtime Policies**

```sql
-- Allow users to subscribe to their own transactions
CREATE POLICY "Users can subscribe to own transactions" ON transactions
  FOR SELECT USING (auth.uid() = sender_user_id OR auth.uid() = recipient_user_id);

-- Allow users to subscribe to their own notifications
CREATE POLICY "Users can subscribe to own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);
```

---

## 🗃️ **STORAGE SETUP**

### **Step 1: Create Storage Buckets**

```sql
-- Create buckets for file storage
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('avatars', 'avatars', true),
  ('documents', 'documents', false),
  ('receipts', 'receipts', false);
```

### **Step 2: Set Up Storage Policies**

```sql
-- Allow users to upload their own avatars
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to view their own documents
CREATE POLICY "Users can view own documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 🔧 **ENVIRONMENT VARIABLES**

### **Frontend (.env.local)**

```env
REACT_APP_SUPABASE_URL=https://your-project-ref.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_API_URL=http://localhost:5000
```

### **Backend (.env)**

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
```

### **GitHub Secrets**

Add these to your GitHub repository secrets:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PROJECT_REF=your-project-ref
SUPABASE_ACCESS_TOKEN=your-access-token
```

---

## 🚀 **DEPLOYMENT**

### **Step 1: Deploy Database Changes**

```bash
# Push schema changes to production
supabase db push --project-ref your-project-ref

# Generate TypeScript types
supabase gen types typescript --project-id your-project-ref > frontend/src/types/supabase.ts
```

### **Step 2: Set Up Production Environment**

1. **Update Production URLs** in your environment variables
2. **Configure Production Auth** providers with production URLs
3. **Set up Production Storage** buckets
4. **Enable Production Realtime** features

### **Step 3: Monitor Production**

```bash
# Check production status
supabase status --project-ref your-project-ref

# View production logs
supabase logs --project-ref your-project-ref
```

---

## 🧪 **TESTING**

### **Step 1: Set Up Test Database**

```bash
# Create test database
supabase db reset --local

# Run tests
npm test
```

### **Step 2: Test Auth Flow**

```javascript
// Test user signup
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123'
});

// Test user signin
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password123'
});
```

### **Step 3: Test Real-time**

```javascript
// Test real-time subscriptions
const subscription = supabase
  .channel('test-channel')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'transactions'
  }, (payload) => {
    console.log('New transaction:', payload);
  })
  .subscribe();
```

---

## 📈 **MONITORING & ANALYTICS**

### **Step 1: Set Up Monitoring**

1. **Go to Supabase Dashboard → Logs**
2. **Monitor API usage** and performance
3. **Set up alerts** for errors and high usage

### **Step 2: Database Monitoring**

```sql
-- Monitor database performance
SELECT 
  schemaname,
  tablename,
  n_tup_ins as inserts,
  n_tup_upd as updates,
  n_tup_del as deletes
FROM pg_stat_user_tables
ORDER BY n_tup_ins DESC;
```

### **Step 3: Auth Monitoring**

```sql
-- Monitor user signups
SELECT 
  DATE(created_at) as date,
  COUNT(*) as signups
FROM auth.users
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🔒 **SECURITY CHECKLIST**

- [ ] RLS policies enabled on all tables
- [ ] Auth providers configured securely
- [ ] Storage policies restrict access appropriately
- [ ] API keys stored securely
- [ ] Database backups enabled
- [ ] SSL/TLS configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled

---

## 🆘 **TROUBLESHOOTING**

### **Common Issues**

1. **Database Connection Issues**
   ```bash
   # Check database status
   supabase status
   
   # Restart database
   supabase stop
   supabase start
   ```

2. **Auth Issues**
   ```bash
   # Check auth configuration
   supabase status
   
   # Reset auth
   supabase db reset
   ```

3. **Real-time Issues**
   ```bash
   # Check realtime status
   supabase status
   
   # Restart realtime
   supabase stop
   supabase start
   ```

### **Performance Issues**

1. **Slow Queries**
   ```sql
   -- Check slow queries
   SELECT query, mean_time, calls
   FROM pg_stat_statements
   ORDER BY mean_time DESC
   LIMIT 10;
   ```

2. **High Memory Usage**
   ```bash
   # Check memory usage
   supabase status
   
   # Restart services
   supabase stop
   supabase start
   ```

---

## 📚 **RESOURCES**

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/guides/cli)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Guide](https://supabase.com/docs/guides/realtime)
- [Storage Guide](https://supabase.com/docs/guides/storage)

---

**🎉 Your Supabase setup is now complete! You can start building your Ghana Financial Ecosystem with a powerful backend infrastructure.**
