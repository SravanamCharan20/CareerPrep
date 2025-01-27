import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Signin = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-[380px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-semibold mb-3">Sign in to CareerPrep</h1>
          <p className="text-gray-400">
            Use your CareerPrep Account
          </p>
        </motion.div>

        <motion.form 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
              />
            </div>
          </div>

          <div className="text-right">
            <Link 
              to="/forgot-password"
              className="text-[#2997ff] hover:text-[#2997ff]/80 text-sm transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#2997ff] text-white rounded-lg font-medium hover:bg-[#2997ff]/90 transition-colors"
          >
            Continue
          </motion.button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#424245]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-500">Or</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 border border-[#424245] rounded-lg text-white hover:border-[#2997ff] transition-colors flex items-center justify-center space-x-2"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </motion.button>

          <p className="text-center text-gray-400 mt-8">
            New to CareerPrep?{' '}
            <Link 
              to="/signup" 
              className="text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signin;