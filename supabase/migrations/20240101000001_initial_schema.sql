-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator', 'support');
CREATE TYPE transaction_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled', 'reversed');
CREATE TYPE transaction_type AS ENUM ('transfer', 'deposit', 'withdrawal', 'payment', 'refund', 'airtime', 'data', 'bill_payment', 'loan_disbursement', 'loan_repayment', 'investment', 'dividend', 'fee', 'commission', 'bonus', 'referral', 'cashback');
CREATE TYPE wallet_type AS ENUM ('personal', 'business', 'savings', 'investment');
CREATE TYPE kyc_status AS ENUM ('not_started', 'pending', 'verified', 'rejected');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    profile_picture TEXT,
    role user_role DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    is_blocked BOOLEAN DEFAULT false,
    blocked_reason TEXT,
    kyc_status kyc_status DEFAULT 'not_started',
    national_id_number VARCHAR(20) UNIQUE,
    referral_code VARCHAR(10) UNIQUE,
    referred_by UUID REFERENCES users(id),
    credit_score INTEGER DEFAULT 0 CHECK (credit_score >= 0 AND credit_score <= 850),
    risk_level VARCHAR(10) DEFAULT 'medium' CHECK (risk_level IN ('low', 'medium', 'high')),
    total_transactions INTEGER DEFAULT 0,
    total_volume DECIMAL(15,2) DEFAULT 0,
    last_login TIMESTAMP WITH TIME ZONE,
    last_login_ip INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User addresses
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    street VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(50) DEFAULT 'Ghana',
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- KYC documents
CREATE TABLE kyc_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    document_url TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id)
);

-- Wallets table
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wallet_id VARCHAR(20) UNIQUE NOT NULL,
    wallet_type wallet_type DEFAULT 'personal',
    balance DECIMAL(15,2) DEFAULT 0 CHECK (balance >= 0),
    currency VARCHAR(3) DEFAULT 'GHS' CHECK (currency IN ('GHS', 'USD', 'EUR', 'GBP')),
    daily_limit DECIMAL(15,2) DEFAULT 10000,
    monthly_limit DECIMAL(15,2) DEFAULT 100000,
    single_transaction_limit DECIMAL(15,2) DEFAULT 5000,
    is_locked BOOLEAN DEFAULT false,
    lock_reason TEXT,
    lock_expires TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    total_transactions INTEGER DEFAULT 0,
    total_volume DECIMAL(15,2) DEFAULT 0,
    last_transaction_date TIMESTAMP WITH TIME ZONE,
    qr_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id VARCHAR(20) UNIQUE NOT NULL,
    reference VARCHAR(20) UNIQUE NOT NULL,
    sender_user_id UUID REFERENCES users(id),
    sender_wallet_id UUID REFERENCES wallets(id),
    recipient_user_id UUID REFERENCES users(id),
    recipient_wallet_id UUID REFERENCES wallets(id),
    type transaction_type NOT NULL,
    status transaction_status DEFAULT 'pending',
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) DEFAULT 'GHS',
    exchange_rate DECIMAL(10,6) DEFAULT 1,
    platform_fee DECIMAL(15,2) DEFAULT 0,
    processing_fee DECIMAL(15,2) DEFAULT 0,
    network_fee DECIMAL(15,2) DEFAULT 0,
    total_fees DECIMAL(15,2) DEFAULT 0,
    description TEXT NOT NULL,
    notes TEXT,
    external_reference VARCHAR(100),
    provider_transaction_id VARCHAR(100),
    risk_score INTEGER DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    compliance_flags TEXT[],
    kyc_required BOOLEAN DEFAULT false,
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE,
    reversed_at TIMESTAMP WITH TIME ZONE,
    error_code VARCHAR(50),
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    channel VARCHAR(20) DEFAULT 'mobile_app',
    device_info JSONB,
    location_info JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loans table
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    borrower_id UUID NOT NULL REFERENCES users(id),
    lender_id UUID REFERENCES users(id),
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    interest_rate DECIMAL(5,2) NOT NULL CHECK (interest_rate >= 0),
    term_months INTEGER NOT NULL CHECK (term_months > 0),
    monthly_payment DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'completed', 'defaulted', 'cancelled')),
    purpose TEXT,
    collateral_description TEXT,
    approved_at TIMESTAMP WITH TIME ZONE,
    disbursed_at TIMESTAMP WITH TIME ZONE,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Loan payments
CREATE TABLE loan_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loan_id UUID NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    payment_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    transaction_id UUID REFERENCES transactions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Investments table
CREATE TABLE investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    investment_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    expected_return DECIMAL(5,2),
    maturity_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'matured', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_created_at ON users(created_at);

CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_wallet_id ON wallets(wallet_id);
CREATE INDEX idx_wallets_is_active ON wallets(is_active);

CREATE INDEX idx_transactions_sender_user_id ON transactions(sender_user_id);
CREATE INDEX idx_transactions_recipient_user_id ON transactions(recipient_user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_transaction_id ON transactions(transaction_id);

CREATE INDEX idx_loans_borrower_id ON loans(borrower_id);
CREATE INDEX idx_loans_lender_id ON loans(lender_id);
CREATE INDEX idx_loans_status ON loans(status);

CREATE INDEX idx_investments_user_id ON investments(user_id);
CREATE INDEX idx_investments_status ON investments(status);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_sent_at ON notifications(sent_at);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loans_updated_at BEFORE UPDATE ON loans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate wallet ID
CREATE OR REPLACE FUNCTION generate_wallet_id()
RETURNS TEXT AS $$
BEGIN
    RETURN 'GFE' || EXTRACT(EPOCH FROM NOW())::BIGINT || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create function to generate transaction ID
CREATE OR REPLACE FUNCTION generate_transaction_id()
RETURNS TEXT AS $$
BEGIN
    RETURN 'TXN' || EXTRACT(EPOCH FROM NOW())::BIGINT || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create function to generate reference
CREATE OR REPLACE FUNCTION generate_reference()
RETURNS TEXT AS $$
BEGIN
    RETURN 'REF' || EXTRACT(EPOCH FROM NOW())::BIGINT || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
BEGIN
    RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
END;
$$ LANGUAGE plpgsql;

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Wallets policies
CREATE POLICY "Users can view own wallets" ON wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallets" ON wallets FOR UPDATE USING (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = sender_user_id OR auth.uid() = recipient_user_id);

-- Loans policies
CREATE POLICY "Users can view own loans" ON loans FOR SELECT USING (auth.uid() = borrower_id OR auth.uid() = lender_id);

-- Investments policies
CREATE POLICY "Users can view own investments" ON investments FOR SELECT USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create views for analytics
CREATE VIEW user_analytics AS
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.created_at,
    COUNT(t.id) as total_transactions,
    COALESCE(SUM(t.amount), 0) as total_volume,
    COALESCE(AVG(t.amount), 0) as avg_transaction_amount,
    w.balance as current_balance
FROM users u
LEFT JOIN transactions t ON (u.id = t.sender_user_id OR u.id = t.recipient_user_id) AND t.status = 'completed'
LEFT JOIN wallets w ON u.id = w.user_id AND w.is_active = true
GROUP BY u.id, u.email, u.first_name, u.last_name, u.created_at, w.balance;

-- Create function for transaction analytics
CREATE OR REPLACE FUNCTION get_transaction_analytics(
    user_uuid UUID,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() - INTERVAL '30 days',
    end_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS TABLE (
    total_transactions BIGINT,
    total_volume DECIMAL,
    avg_transaction_amount DECIMAL,
    transaction_types JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_transactions,
        COALESCE(SUM(amount), 0) as total_volume,
        COALESCE(AVG(amount), 0) as avg_transaction_amount,
        jsonb_object_agg(
            type, 
            jsonb_build_object(
                'count', count(*),
                'total_amount', sum(amount)
            )
        ) as transaction_types
    FROM transactions t
    WHERE (t.sender_user_id = user_uuid OR t.recipient_user_id = user_uuid)
    AND t.created_at BETWEEN start_date AND end_date
    AND t.status = 'completed';
END;
$$ LANGUAGE plpgsql;
