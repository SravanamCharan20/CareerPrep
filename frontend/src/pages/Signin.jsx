import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err.message));
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
          <h1 className="text-4xl font-semibold mb-3">Sign in to CareerPrep</h1>
          <p className="text-gray-400">Use your CareerPrep Account</p>
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
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
                required
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
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#1d1d1f] rounded-lg border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
                required
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

          {error && (
            <div className="text-red-500 text-sm text-center mt-2">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#2997ff] text-white rounded-lg font-medium hover:bg-[#2997ff]/90 transition-colors"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue"}
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

          <p className="text-center text-gray-400 mt-8">
            New to CareerPrep?{" "}
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