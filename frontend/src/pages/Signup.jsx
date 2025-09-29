import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, User, Check, X, Shield, UserPlus, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signupUser } from "../slice/authSlice";


// Zod validation schema
const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const watchedPassword = watch("password", "");

  // Password validation criteria
  const passwordCriteria = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "One lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "One uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "One number", test: (pwd) => /\d/.test(pwd) },
    { label: "One special character", test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  // Calculate password strength
  useEffect(() => {
    const strength = passwordCriteria.reduce((acc, criteria) => {
      return acc + (criteria.test(watchedPassword) ? 1 : 0);
    }, 0);
    setPasswordStrength(strength);
  }, [watchedPassword]);

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(signupUser({
        firstName: data.firstName,
        email: data.email,
        password: data.password,
      }));

      if (signupUser.fulfilled.match(resultAction)) {
        toast.success("Account created successfully! Welcome!");
        navigate("/"); // Redirect to homepage
      } else {
        toast.error(resultAction.payload?.msg || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Unable to signup. Please try again.");
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
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join us and start your journey today
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* First Name Field */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
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
                  placeholder="Password"
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

              {/* Password Validation Container - Dynamic Height */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${watchedPassword ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                }`}>
                {/* Password Strength Indicator */}
                <div className="transform transition-all duration-200 ease-in-out">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className={`text-xs font-medium transition-colors duration-200 ${passwordStrength <= 2 ? 'text-red-500' :
                      passwordStrength <= 3 ? 'text-yellow-500' :
                        passwordStrength <= 4 ? 'text-blue-500' : 'text-green-500'
                      }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Password Criteria */}
                <div className="space-y-1">
                  {passwordCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className={`flex items-center text-xs transition-all duration-200 ease-in-out ${criteria.test(watchedPassword) ? 'transform scale-100' : 'transform scale-95'
                        }`}
                      style={{ transitionDelay: `${index * 30}ms` }}
                    >
                      <div className="w-3 h-3 mr-2 flex items-center justify-center">
                        {criteria.test(watchedPassword) ? (
                          <Check className="w-3 h-3 text-green-500 transition-all duration-200 ease-in-out transform scale-110" />
                        ) : (
                          <X className="w-3 h-3 text-red-500 transition-all duration-200 ease-in-out" />
                        )}
                      </div>
                      <span className={`transition-colors duration-200 ${criteria.test(watchedPassword) ? 'text-green-600 font-medium' : 'text-red-600'
                        }`}>
                        {criteria.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-600 transition-all duration-200">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </>
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>


    </div>
  );
};

export default Signup;
