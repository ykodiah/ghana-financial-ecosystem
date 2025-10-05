import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Globe,
  CreditCard,
  BarChart3,
  Lock,
  Smartphone as Mobile,
  Wifi,
  Clock,
  DollarSign,
  Target,
  Brain,
  Sparkles,
  Eye,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Play,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const coreFeatures = [
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Mobile Money",
      description: "Send and receive money instantly with your phone number. No bank account required.",
      benefits: [
        "Instant transfers",
        "24/7 availability",
        "No bank account needed",
        "Secure PIN protection"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Bank-Level Security",
      description: "Your money is protected with military-grade encryption and fraud detection.",
      benefits: [
        "256-bit encryption",
        "Biometric authentication",
        "Real-time fraud monitoring",
        "Insured deposits"
      ]
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Transactions are processed in seconds, not minutes or hours.",
      benefits: [
        "Instant processing",
        "Real-time notifications",
        "No waiting periods",
        "24/7 availability"
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "P2P Lending",
      description: "Borrow and lend money directly with other users at competitive rates.",
      benefits: [
        "Lower interest rates",
        "Flexible terms",
        "Quick approval",
        "Community-based"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-600" />,
      title: "Smart Investments",
      description: "Grow your money with AI-powered investment recommendations.",
      benefits: [
        "AI recommendations",
        "Diversified portfolios",
        "Low minimums",
        "Professional management"
      ]
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "Global Remittances",
      description: "Send money internationally at the lowest rates in Ghana.",
      benefits: [
        "Lowest fees",
        "Fast delivery",
        "Multiple currencies",
        "Real-time tracking"
      ]
    }
  ];

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "AI Credit Scoring",
      description: "Advanced machine learning analyzes your financial behavior to provide instant credit decisions with 95% accuracy.",
      details: [
        "Analyzes 100+ data points",
        "Real-time risk assessment",
        "Instant approval decisions",
        "Continuous learning"
      ]
    },
    {
      icon: <Target className="w-6 h-6 text-green-600" />,
      title: "Smart Investment AI",
      description: "AI analyzes market trends, your risk profile, and financial goals to suggest optimal investment opportunities.",
      details: [
        "Market trend analysis",
        "Risk-return optimization",
        "Portfolio rebalancing",
        "Performance prediction"
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Fraud Detection AI",
      description: "Real-time AI monitoring detects and prevents fraudulent transactions before they happen.",
      details: [
        "Pattern recognition",
        "Anomaly detection",
        "Real-time alerts",
        "Automatic blocking"
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
      title: "Personal Financial Assistant",
      description: "AI chatbot provides 24/7 financial advice, budgeting tips, and personalized spending insights.",
      details: [
        "Natural language processing",
        "Personalized advice",
        "Budget optimization",
        "Spending analysis"
      ]
    }
  ];

  const businessFeatures = [
    {
      title: "Multi-User Accounts",
      description: "Manage multiple users with different permission levels for your business.",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: "API Integration",
      description: "Integrate our services into your existing business systems with our robust API.",
      icon: <Wifi className="w-6 h-6 text-green-600" />
    },
    {
      title: "Bulk Payments",
      description: "Process hundreds of payments at once with our bulk payment system.",
      icon: <CreditCard className="w-6 h-6 text-purple-600" />
    },
    {
      title: "Advanced Analytics",
      description: "Get detailed insights into your financial performance with our analytics dashboard.",
      icon: <BarChart3 className="w-6 h-6 text-red-600" />
    },
    {
      title: "White-Label Solutions",
      description: "Customize our platform with your branding for a seamless customer experience.",
      icon: <Target className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Dedicated Support",
      description: "Get priority support with dedicated account managers for your business.",
      icon: <Clock className="w-6 h-6 text-indigo-600" />
    }
  ];

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6 text-green-600" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted using AES-256 encryption, the same standard used by banks."
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Multi-Factor Authentication",
      description: "Protect your account with SMS, email, and biometric authentication."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
      title: "Real-Time Monitoring",
      description: "Our AI continuously monitors for suspicious activity and blocks threats instantly."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "Regulatory Compliance",
      description: "We're fully licensed and regulated by the Bank of Ghana for your protection."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="block text-yellow-300">Modern Finance</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Everything you need to manage, grow, and protect your money. 
              Built with cutting-edge AI technology for the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Financial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial tools designed for the modern Ghanaian lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powered by Artificial Intelligence
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Our AI technology revolutionizes how you manage money, making financial decisions 
              smarter, faster, and more profitable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-white"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-purple-100 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features designed for businesses, enterprises, and financial institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bank-Level Security
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your money and data are protected with the highest security standards in the industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience the Future of Finance
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join over 500,000 Ghanaians who trust us with their financial future. 
              Start your journey today with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download App
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;
