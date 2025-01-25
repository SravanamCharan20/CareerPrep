import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        className="relative w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Subtle Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 opacity-20 rounded-2xl pointer-events-none"></div>

        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] bg-clip-text text-transparent">
          Create an Account
        </h2>
        <form className="space-y-4">
          {/* Full Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign Up Button */}
        <div className="text-center mt-4">
          <button className="w-full p-2 border border-gray-300 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.1 0 5.4 1.3 6.7 2.4l5-4.8C32.5 4.3 28.8 3 24 3 14.7 3 7.1 8.6 4.1 16.5l6.9 5.4C12.6 15.1 17.8 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24.5c0-1.6-.1-2.9-.4-4.3H24v8.2h12.7c-.5 3.3-2.3 6.1-5 8.1l7.8 6C43.5 38 46.5 31.8 46.5 24.5z"
              />
              <path
                fill="#4CAF50"
                d="M11 27.9c-.6-1.5-1-3.1-1-4.9s.4-3.4 1-4.9L3.1 13.3C1.2 16.9 0 20.9 0 25s1.2 8.1 3.1 11.7l7.9-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M24 46c6.5 0 12-2.1 16-5.7l-7.8-6c-2.2 1.5-5 2.3-8.2 2.3-6.2 0-11.4-4.1-13.3-9.7l-7.9 6.8C7 41.4 14.9 46 24 46z"
              />
            </svg>
            Sign In with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;