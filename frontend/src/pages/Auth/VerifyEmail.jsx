import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(true);
  
  const { user } = useAuth();
  const location = useLocation();
  const email = location.state?.email || user?.email || '';

  useEffect(() => {
    // Allow resend after 60 seconds
    const timer = setTimeout(() => {
      setCanResend(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, [resendCount]);

  const handleResendEmail = async () => {
    if (!canResend) return;

    setIsResending(true);
    setCanResend(false);
    setResendCount(prev => prev + 1);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Verification email sent successfully!');
    } catch (error) {
      toast.error('Failed to send verification email. Please try again.');
      setCanResend(true);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Verify Your Email
          </h2>
          
          <p className="text-gray-600 mb-8">
            We've sent a verification link to{' '}
            <span className="font-semibold text-gray-900">{email}</span>.
            Please check your email and click the link to verify your account.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What to do next:</p>
                <ul className="space-y-1 text-left">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the verification link in the email</li>
                  <li>• Return here to sign in to your account</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={!canResend || isResending}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </button>

            {resendCount > 0 && (
              <p className="text-sm text-gray-500">
                Verification email sent {resendCount} time{resendCount > 1 ? 's' : ''}
              </p>
            )}

            <Link
              to="/login"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Back to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResendEmail}
                disabled={!canResend}
                className="text-green-600 hover:text-green-500 font-medium disabled:opacity-50"
              >
                try again
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;