import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings, 
  HelpCircle,
  LogIn,
  UserPlus,
  Smartphone,
  Shield,
  Zap,
  Globe,
  BookOpen,
  Phone,
  ChevronDown
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/features', icon: Zap },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Phone }
  ];

  const features = [
    {
      title: 'Mobile Money',
      description: 'Send and receive money instantly',
      icon: Smartphone,
      href: '/features#mobile-money'
    },
    {
      title: 'AI Credit Scoring',
      description: 'Get instant credit decisions',
      icon: Shield,
      href: '/features#ai-credit'
    },
    {
      title: 'Smart Investments',
      description: 'AI-powered investment advice',
      icon: TrendingUp,
      href: '/features#investments'
    },
    {
      title: 'Global Remittances',
      description: 'Send money internationally',
      icon: Globe,
      href: '/features#remittances'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Ghana Financial</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium bg-green-600 text-white hover:bg-green-700 transition-colors mt-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Get Started</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
