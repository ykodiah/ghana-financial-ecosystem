import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Components
import Layout from './components/Layout/Layout';
import ErrorFallback from './components/Error/ErrorFallback';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Dashboard from './pages/Dashboard/Dashboard';
import Wallet from './pages/Wallet/Wallet';
import SendMoney from './pages/Transactions/SendMoney';
import RequestMoney from './pages/Transactions/RequestMoney';
import TransactionHistory from './pages/Transactions/TransactionHistory';
import TransactionDetails from './pages/Transactions/TransactionDetails';
import PayBills from './pages/Bills/PayBills';
import BuyAirtime from './pages/Services/BuyAirtime';
import BuyData from './pages/Services/BuyData';
import Investments from './pages/Investments/Investments';
import Loans from './pages/Loans/Loans';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help';
import About from './pages/About/About';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

// Protected Route Component
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <NotificationProvider>
                  <Router>
                    <div className="App">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/help" element={<Help />} />
                        
                        {/* Protected Routes */}
                        <Route path="/dashboard" element={
                          <ProtectedRoute>
                            <Layout>
                              <Dashboard />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/wallet" element={
                          <ProtectedRoute>
                            <Layout>
                              <Wallet />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/send-money" element={
                          <ProtectedRoute>
                            <Layout>
                              <SendMoney />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/request-money" element={
                          <ProtectedRoute>
                            <Layout>
                              <RequestMoney />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/transactions" element={
                          <ProtectedRoute>
                            <Layout>
                              <TransactionHistory />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/transactions/:id" element={
                          <ProtectedRoute>
                            <Layout>
                              <TransactionDetails />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/pay-bills" element={
                          <ProtectedRoute>
                            <Layout>
                              <PayBills />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/buy-airtime" element={
                          <ProtectedRoute>
                            <Layout>
                              <BuyAirtime />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/buy-data" element={
                          <ProtectedRoute>
                            <Layout>
                              <BuyData />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/investments" element={
                          <ProtectedRoute>
                            <Layout>
                              <Investments />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/loans" element={
                          <ProtectedRoute>
                            <Layout>
                              <Loans />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Layout>
                              <Profile />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/settings" element={
                          <ProtectedRoute>
                            <Layout>
                              <Settings />
                            </Layout>
                          </ProtectedRoute>
                        } />
                        
                        {/* Catch all route */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      
                      {/* Global Components */}
                      <Toaster
                        position="top-right"
                        toastOptions={{
                          duration: 4000,
                          style: {
                            background: '#363636',
                            color: '#fff',
                          },
                          success: {
                            duration: 3000,
                            iconTheme: {
                              primary: '#4ade80',
                              secondary: '#fff',
                            },
                          },
                          error: {
                            duration: 5000,
                            iconTheme: {
                              primary: '#ef4444',
                              secondary: '#fff',
                            },
                          },
                        }}
                      />
                    </div>
                  </Router>
                </NotificationProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
