import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Crown,
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals getting started",
      price: { monthly: 0, annual: 0 },
      features: [
        "Send & receive money",
        "Basic wallet features",
        "Mobile app access",
        "Email support",
        "Up to ₵1,000 daily limit",
        "Standard transaction fees"
      ],
      limitations: [
        "No investment features",
        "No priority support",
        "No advanced analytics"
      ],
      popular: false,
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700"
    },
    {
      name: "Premium",
      description: "Best for active users and small businesses",
      price: { monthly: 9.99, annual: 99.99 },
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "Priority support",
        "Up to ₵10,000 daily limit",
        "Reduced transaction fees (1.5%)",
        "Investment features",
        "P2P lending access",
        "QR code payments",
        "Scheduled payments",
        "Export transactions"
      ],
      limitations: [
        "No white-label options",
        "Limited API access"
      ],
      popular: true,
      color: "border-green-500",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      name: "Business",
      description: "For growing businesses and enterprises",
      price: { monthly: 29.99, annual: 299.99 },
      features: [
        "Everything in Premium",
        "Up to ₵50,000 daily limit",
        "Lowest transaction fees (1%)",
        "Advanced security features",
        "Multi-user accounts",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Priority processing",
        "Advanced reporting",
        "White-label options",
        "Bulk payment processing"
      ],
      limitations: [],
      popular: false,
      color: "border-blue-500",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  const aiFeatures = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered Credit Scoring",
      description: "Advanced machine learning algorithms analyze your financial behavior to provide instant credit decisions",
      available: "Premium+"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Smart Investment Recommendations",
      description: "AI analyzes market trends and your risk profile to suggest optimal investment opportunities",
      available: "Premium+"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Fraud Detection & Prevention",
      description: "Real-time AI monitoring detects and prevents fraudulent transactions before they happen",
      available: "All Plans"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Personalized Financial Assistant",
      description: "AI chatbot provides 24/7 financial advice, budgeting tips, and spending insights",
      available: "Premium+"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Smart Bill Optimization",
      description: "AI automatically finds the best deals and optimizes your bill payments to save money",
      available: "Business"
    },
    {
      icon: <Crown className="w-6 h-6 text-red-600" />,
      title: "Predictive Analytics",
      description: "AI predicts cash flow, identifies spending patterns, and forecasts financial health",
      available: "Business"
    }
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including mobile money (MTN, Vodafone, AirtelTigo), bank transfers, and international cards."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No hidden fees! All our pricing is transparent. Transaction fees are clearly displayed before you confirm any payment."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
    },
    {
      question: "Is my money safe?",
      answer: "Absolutely! We use bank-level security with 256-bit encryption, and all funds are insured up to ₵100,000 per account."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment."
    },
    {
      question: "What AI features are included?",
      answer: "Our AI features include fraud detection, credit scoring, investment recommendations, and personalized financial insights. Availability depends on your plan."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Choose the perfect plan for your financial needs. All plans include our 
                AI-powered features to help you make smarter financial decisions.
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <span className={`text-lg font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Save 17%
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.color} ${
                plan.popular ? 'ring-2 ring-green-500 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₵{isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  {plan.price.monthly > 0 && (
                    <p className="text-sm text-gray-500">
                      {isAnnual ? 'Billed annually' : 'Billed monthly'}
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.price.monthly === 0 ? '/register' : '/register'}
                  className={`w-full ${plan.buttonColor} text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
                >
                  {plan.price.monthly === 0 ? 'Get Started Free' : 'Choose Plan'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Features Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
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
              Our AI technology helps you make smarter financial decisions, 
              detect fraud, and optimize your money management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-purple-100 mb-4">{feature.description}</p>
                <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {feature.available}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and features
            </p>
          </motion.div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of Ghanaians who trust us with their money. 
              Start your journey to financial freedom today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
