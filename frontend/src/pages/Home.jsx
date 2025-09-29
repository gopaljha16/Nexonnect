import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logutUser } from "../slice/authSlice";
import {
  MessageCircle,
  Users,
  Zap,
  Shield,
  Star,
  Play,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logutUser());
    setIsUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                Nexonnect
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                About
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {user?.firstName || "User"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <a
                        href="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </a>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="/login"
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Get Started
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-purple-600"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  About
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connect & Chat
                  <span className="block text-purple-600">The Smart Way</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience seamless communication with our next-generation
                  chat platform. Connect with friends, teams, and communities
                  like never before.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Chatting Free
                </button>
                <button className="flex items-center justify-center space-x-2 border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all font-semibold text-lg">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span>10k+ Active Users</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Chat Interface Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Team Chat</h3>
                      <p className="text-sm text-green-500">● 12 online</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm text-gray-800">
                        Hey team! Ready for the launch? 🚀
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-purple-600 text-white rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm">
                        Absolutely! Everything looks perfect ✨
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex-shrink-0"></div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm text-gray-800">Let's do this! 💪</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none text-sm"
                    readOnly
                  />
                  <button className="bg-purple-600 text-white p-2 rounded-lg">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">
                    Live Chat
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white rounded-lg shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-medium">1.2k+ Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Nexonnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to make your communication seamless,
              secure, and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Experience instant messaging with our optimized real-time
                communication system.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                End-to-end encryption ensures your conversations remain private
                and secure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Create groups, share files, and collaborate seamlessly with your
                team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who have already made the switch to better
            chatting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all font-semibold text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-lg font-bold">Nexonnect</span>
              </div>
              <p className="text-gray-400">
                The future of communication is here. Connect, chat, and
                collaborate like never before.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Security
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Community
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nexonnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
