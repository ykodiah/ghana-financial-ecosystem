import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Search, 
  Filter,
  TrendingUp,
  DollarSign,
  Shield,
  Smartphone,
  TrendingDown,
  BookOpen,
  Clock,
  Eye,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'fintech', name: 'Fintech', count: 8 },
    { id: 'investing', name: 'Investing', count: 6 },
    { id: 'security', name: 'Security', count: 4 },
    { id: 'tips', name: 'Tips & Tricks', count: 6 }
  ];

  const featuredPost = {
    id: 1,
    title: "The Future of Digital Banking in Ghana: How AI is Revolutionizing Financial Services",
    excerpt: "Discover how artificial intelligence is transforming the banking landscape in Ghana, making financial services more accessible, secure, and efficient for millions of Ghanaians.",
    content: "Ghana's financial sector is undergoing a digital transformation unlike anything we've seen before. With the integration of artificial intelligence, mobile banking, and blockchain technology, we're witnessing the birth of a new era in financial services...",
    author: "Kwame Asante",
    authorImage: "/api/placeholder/40/40",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "fintech",
    tags: ["AI", "Banking", "Ghana", "Fintech"],
    image: "/api/placeholder/800/400",
    views: 1250,
    likes: 89,
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "5 Smart Investment Strategies for Young Ghanaians",
      excerpt: "Learn how to start building wealth early with these proven investment strategies tailored for the Ghanaian market.",
      author: "Ama Serwaa",
      authorImage: "/api/placeholder/40/40",
      publishDate: "2024-01-12",
      readTime: "6 min read",
      category: "investing",
      tags: ["Investment", "Wealth Building", "Youth"],
      image: "/api/placeholder/400/250",
      views: 890,
      likes: 67
    },
    {
      id: 3,
      title: "How to Protect Your Mobile Money from Fraud",
      excerpt: "Essential security tips to keep your mobile money transactions safe and secure in today's digital world.",
      author: "Kofi Mensah",
      authorImage: "/api/placeholder/40/40",
      publishDate: "2024-01-10",
      readTime: "5 min read",
      category: "security",
      tags: ["Security", "Mobile Money", "Fraud Prevention"],
      image: "/api/placeholder/400/250",
      views: 1200,
      likes: 95
    },
    {
      id: 4,
      title: "Understanding Cryptocurrency in Ghana: A Beginner's Guide",
      excerpt: "Everything you need to know about cryptocurrency, blockchain, and digital assets in the Ghanaian context.",
      author: "Akosua Boateng",
      authorImage: "/api/placeholder/40/40",
      publishDate: "2024-01-08",
      readTime: "10 min read",
      category: "fintech",
      tags: ["Cryptocurrency", "Blockchain", "Digital Assets"],
      image: "/api/placeholder/400/250",
      views: 2100,
      likes: 156
    },
    {
      id: 5,
      title: "Budgeting 101: How to Manage Your Money Like a Pro",
      excerpt: "Master the art of budgeting with these practical tips and tools to take control of your finances.",
      author: "Nana Yaa",
      authorImage: "/api/placeholder/40/40",
      publishDate: "2024-01-05",
      readTime: "7 min read",
      category: "tips",
      tags: ["Budgeting", "Money Management", "Personal Finance"],
      image: "/api/placeholder/400/250",
      views: 1500,
      likes: 112
    },
    {
      id: 6,
      title: "The Rise of P2P Lending in Ghana: What You Need to Know",
      excerpt: "Explore the growing peer-to-peer lending market in Ghana and how it's changing the way people borrow and lend money.",
      author: "Kwaku Osei",
      authorImage: "/api/placeholder/40/40",
      publishDate: "2024-01-03",
      readTime: "9 min read",
      category: "fintech",
      tags: ["P2P Lending", "Alternative Finance", "Ghana"],
      image: "/api/placeholder/400/250",
      views: 980,
      likes: 73
    },
    {
      id: 7,
      title: "10 Money-Saving Tips for Ghanaian Families",
      excerpt: "Practical advice to help Ghanaian families save money and build financial security for the future.",
      author: "Mariama Ibrahim",
      authorImage: "/api/placeholder/40/40",
      publishDate: "2024-01-01",
      readTime: "6 min read",
      category: "tips",
      tags: ["Family Finance", "Saving", "Ghana"],
      image: "/api/placeholder/400/250",
      views: 1800,
      likes: 134
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fintech':
        return <Smartphone className="w-4 h-4" />;
      case 'investing':
        return <TrendingUp className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'tips':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

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
              Financial Insights & Tips
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Stay informed with the latest financial news, tips, and insights 
              to help you make smarter money decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    {getCategoryIcon(featuredPost.category)}
                    {featuredPost.category}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {featuredPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{featuredPost.publishDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredPost.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {featuredPost.likes}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">Featured Article</p>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} articles found
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white opacity-80" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.publishDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mt-4"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest financial insights and tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
