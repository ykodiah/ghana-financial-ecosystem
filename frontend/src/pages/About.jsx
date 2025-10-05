import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Heart, 
  Globe, 
  Award, 
  TrendingUp,
  Shield,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Customer First",
      description: "Every decision we make is guided by what's best for our customers and their financial well-being."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Trust & Security",
      description: "We maintain the highest standards of security and transparency in all our operations."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description: "We continuously innovate to bring cutting-edge financial solutions to Ghana."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "Financial Inclusion",
      description: "We believe everyone deserves access to quality financial services, regardless of their background."
    }
  ];

  const team = [
    {
      name: "Kwame Asante",
      role: "CEO & Founder",
      image: "/api/placeholder/300/300",
      bio: "Former Goldman Sachs executive with 15+ years in fintech. Passionate about financial inclusion in Africa.",
      linkedin: "https://linkedin.com/in/kwame-asante"
    },
    {
      name: "Ama Serwaa",
      role: "CTO",
      image: "/api/placeholder/300/300",
      bio: "AI/ML expert from MIT. Led AI initiatives at Google and Microsoft before joining our mission.",
      linkedin: "https://linkedin.com/in/ama-serwaa"
    },
    {
      name: "Kofi Mensah",
      role: "Head of Product",
      image: "/api/placeholder/300/300",
      bio: "Product strategist with experience at PayPal and Stripe. Focused on user experience and innovation.",
      linkedin: "https://linkedin.com/in/kofi-mensah"
    },
    {
      name: "Akosua Boateng",
      role: "Head of Security",
      image: "/api/placeholder/300/300",
      bio: "Cybersecurity expert with certifications in CISSP and CISM. Former security consultant at IBM.",
      linkedin: "https://linkedin.com/in/akosua-boateng"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to democratize financial services in Ghana"
    },
    {
      year: "2021",
      title: "First 10,000 Users",
      description: "Reached our first major milestone with 10,000 active users"
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Launched our AI-powered features for credit scoring and fraud detection"
    },
    {
      year: "2023",
      title: "₵1B Transactions",
      description: "Processed over ₵1 billion in transactions across our platform"
    },
    {
      year: "2024",
      title: "500,000+ Users",
      description: "Grew to over 500,000 active users across Ghana"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Users" },
    { number: "₵2.5B+", label: "Transactions Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8/5", label: "User Rating" }
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
              Building Ghana's Financial Future
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              We're on a mission to democratize financial services in Ghana, 
              making banking, investing, and money management accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ghana Financial Ecosystem was born from a simple observation: millions of Ghanaians 
                were excluded from traditional banking services, yet they had smartphones and needed 
                financial solutions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020 by a team of fintech veterans and AI experts, we set out to create 
                a platform that would democratize financial services using cutting-edge technology 
                and artificial intelligence.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve over 500,000 Ghanaians with innovative financial solutions 
                that are secure, fast, and accessible to everyone.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg mb-6">
                To democratize financial services in Ghana by providing accessible, 
                secure, and innovative solutions powered by artificial intelligence.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg">
                To become Africa's leading financial technology platform, 
                empowering millions to achieve financial freedom and prosperity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals building Ghana's financial future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <a
                  href={member.linkedin}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mx-auto" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform Ghana's financial landscape
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Have questions about our services or want to partner with us? 
              We'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Office</h3>
                <p className="text-blue-100">
                  123 Independence Avenue<br />
                  Accra, Ghana
                </p>
              </div>
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-blue-100">+233 30 123 4567</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-blue-100">hello@ghanafinancial.com</p>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
