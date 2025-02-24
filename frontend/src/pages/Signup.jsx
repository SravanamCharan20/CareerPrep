import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice';
import OAuth from "../components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      dispatch(signUpSuccess(data));
      navigate("/signin");
    } catch (err) {
      dispatch(signUpFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-12 px-6">
      <div className="max-w-[380px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-semibold mb-3">Create Account</h1>
          <p className="text-gray-400">Join CareerPrep to start your journey</p>
        </motion.div>

        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                id="username"
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#2997ff] text-white rounded-lg font-medium hover:bg-[#2997ff]/90 transition-colors"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#424245]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-500">Or</span>
            </div>
          </div>
     
          <OAuth />

          <div className="text-sm text-gray-400 text-center mt-6">
            By creating an account, you agree to our{" "}
            <Link
              to="/terms"
              className="text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-center text-gray-400 mt-8">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;