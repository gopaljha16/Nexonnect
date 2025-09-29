import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, CheckCircle, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slice/authSlice";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Logged in successfully! Welcome back!");
        navigate("/"); // Redirect to homepage
      } else {
        toast.error(resultAction.payload?.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex p-5 rounded-md">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-800">Nexonnect</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Hello,<br />Welcome Back
            </h1>
            <p className="text-gray-600">
              Hey, welcome back to your special place
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="stanley@gmail.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error.msg || error.message || "Login failed. Please try again."}
              </div>
            )}

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 relative overflow-hidden">
        {/* Background Clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-24 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute top-32 right-20 w-32 h-20 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-40 left-16 w-28 h-18 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-36 h-24 bg-white/15 rounded-full"></div>
        </div>

        {/* Main Illustration */}
        <div className="flex items-center justify-center h-full relative z-10">
          <div className="text-center">
            {/* Phone Mockup */}
            <div className="relative mx-auto mb-8">
              <div className="w-64 h-96 bg-gradient-to-b from-pink-400 to-purple-500 rounded-3xl shadow-2xl transform rotate-12 relative">
                {/* Phone Screen */}
                <div className="absolute inset-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-center h-full">
                    <Shield className="w-16 h-16 text-white/80" />
                  </div>
                </div>
                
                {/* Fingerprint Icon */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 border-2 border-purple-500 rounded-full relative">
                    <div className="absolute inset-1 border border-purple-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Character */}
              <div className="absolute -bottom-8 -left-8">
                <div className="w-20 h-20 bg-yellow-400 rounded-full relative">
                  {/* Simple character representation */}
                  <div className="absolute top-2 left-2 w-16 h-16 bg-yellow-500 rounded-full"></div>
                </div>
              </div>

              {/* Success Check */}
              <div className="absolute -top-4 -left-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>

              {/* Lock Icon */}
              <div className="absolute top-1/2 -right-12 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
