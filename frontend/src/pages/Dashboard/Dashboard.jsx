import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  Send, 
  Download, 
  CreditCard, 
  Smartphone,
  BarChart3,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Play,
  Star,
  Crown,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [showBalance, setShowBalance] = React.useState(true);
  const { user, isDemoUser, DEMO_CREDENTIALS } = useAuth();
  
  const quickActions = [
    {
      icon: <Send className="w-6 h-6" />,
      title: "Send Money",
      description: "Transfer to friends & family",
      color: "bg-green-500",
      link: "/send-money"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Request Money",
      description: "Request payment from others",
      color: "bg-blue-500",
      link: "/request-money"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Pay Bills",
      description: "Utilities, internet & more",
      color: "bg-purple-500",
      link: "/pay-bills"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Buy Airtime",
      description: "Top up your phone",
      color: "bg-orange-500",
      link: "/buy-airtime"
    }
  ];

  const recentTransactions = isDemoUser ? [
    {
      id: 1,
      type: "received",
      amount: 500,
      description: "Payment from Kwame Asante",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "sent",
      amount: 200,
      description: "Transfer to Ama Serwaa",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "bill",
      amount: 150,
      description: "ECG Electricity Bill",
      time: "2 days ago",
      status: "completed"
    },
    {
      id: 4,
      type: "airtime",
      amount: 50,
      description: "MTN Airtime Purchase",
      time: "3 days ago",
      status: "completed"
    },
    {
      id: 5,
      type: "investment",
      amount: 1000,
      description: "Government Bond Investment",
      time: "1 week ago",
      status: "completed"
    }
  ] : [
    {
      id: 1,
      type: "received",
      amount: 500,
      description: "Payment from Kwame Asante",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "sent",
      amount: 200,
      description: "Transfer to Ama Serwaa",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "bill",
      amount: 150,
      description: "ECG Electricity Bill",
      time: "2 days ago",
      status: "completed"
    },
    {
      id: 4,
      type: "airtime",
      amount: 50,
      description: "MTN Airtime Purchase",
      time: "3 days ago",
      status: "completed"
    }
  ];

  const investments = isDemoUser ? [
    {
      name: "Government Bonds",
      amount: 5000,
      return: 12.5,
      status: "active"
    },
    {
      name: "Fixed Deposit",
      amount: 3000,
      return: 8.0,
      status: "active"
    },
    {
      name: "Stock Portfolio",
      amount: 2500,
      return: 15.2,
      status: "active"
    },
    {
      name: "Crypto Investment",
      amount: 1000,
      return: 22.8,
      status: "active"
    }
  ] : [
    {
      name: "Government Bonds",
      amount: 5000,
      return: 12.5,
      status: "active"
    },
    {
      name: "Fixed Deposit",
      amount: 3000,
      return: 8.0,
      status: "active"
    }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case "received":
        return <ArrowDownRight className="w-5 h-5 text-green-500" />;
      case "sent":
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      case "bill":
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      case "airtime":
        return <Smartphone className="w-5 h-5 text-purple-500" />;
      case "investment":
        return <TrendingUp className="w-5 h-5 text-indigo-500" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      {isDemoUser && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">Demo Mode</span>
                </div>
                <div className="hidden sm:block text-purple-100">
                  You're exploring with sample data. All features are fully functional!
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
                <span className="text-sm font-medium">Premium Features Unlocked</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {isDemoUser ? DEMO_CREDENTIALS.name : user?.user_metadata?.full_name || 'User'}!
                {isDemoUser && (
                  <span className="ml-2 inline-flex items-center gap-1 text-purple-600 font-medium">
                    <Crown className="w-4 h-4" />
                    Demo Account
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8" />
                  <div>
                    <h2 className="text-lg font-semibold">Main Wallet</h2>
                    <p className="text-green-100">Available Balance</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-green-600 rounded-full transition-colors"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  {showBalance ? (isDemoUser ? "₵15,750.00" : "₵2,450.00") : "••••••"}
                </div>
                <div className="flex items-center gap-4 text-green-100">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {isDemoUser ? "+₵2,500 this month" : "+₵150 this month"}
                  </span>
                  <span>•</span>
                  <span>Last updated: Now</span>
                </div>
                {isDemoUser && (
                  <div className="mt-2 flex items-center gap-2 text-purple-100">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Demo account with enhanced features</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Link
                  to="/send-money"
                  className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Money
                </Link>
                <Link
                  to="/wallet"
                  className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Money
                </Link>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="group p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
                <Link
                  to="/transactions"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'received' ? '+' : '-'}₵{transaction.amount}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Investments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Investments</h3>
                <Link
                  to="/investments"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {investments.map((investment, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{investment.name}</h4>
                      <span className="text-sm text-green-600 font-semibold">
                        +{investment.return}%
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">₵{investment.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 capitalize">{investment.status}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">This Month</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Income</p>
                      <p className="text-sm text-gray-500">From all sources</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{isDemoUser ? "+₵8,500" : "+₵1,250"}</p>
                    <p className="text-sm text-gray-500">{isDemoUser ? "+25%" : "+15%"}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Expenses</p>
                      <p className="text-sm text-gray-500">All transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{isDemoUser ? "-₵3,200" : "-₵850"}</p>
                    <p className="text-sm text-gray-500">{isDemoUser ? "-12%" : "-8%"}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Savings Rate</p>
                      <p className="text-sm text-gray-500">Monthly target</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{isDemoUser ? "45%" : "32%"}</p>
                    <p className="text-sm text-gray-500">{isDemoUser ? "₵2,400 saved" : "₵400 saved"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
