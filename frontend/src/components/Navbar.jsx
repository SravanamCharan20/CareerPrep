import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

// ArrowRight Icon Component

// NavItem Component
// eslint-disable-next-line react/prop-types
const NavItem = ({ href, children }) => (
  <motion.li 
    className="relative" 
    whileHover={{ opacity: 0.65 }}
    transition={{ duration: 0.2 }}
  >
    <Link 
      to={href} 
      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  </motion.li>
);

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/80"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold text-white">
            CareerPrep
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            <NavItem href="/projects">Projects</NavItem>
            <NavItem href="/hackathons">Hackathons</NavItem>
            <NavItem href="/mentors">CareerPaths</NavItem>
            <NavItem href="/resources">Resources</NavItem>
          </ul>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/signin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-gray-300 hover:text-white text-sm font-medium"
              >
                Sign in
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-1.5 bg-[#2997ff] text-white rounded-full text-sm font-medium hover:bg-[#2997ff]/90 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="px-4 py-6 space-y-4">
            <Link to="/projects" className="block text-gray-300 hover:text-white py-2">
              Projects
            </Link>
            <Link to="/hackathons" className="block text-gray-300 hover:text-white py-2">
              Hackathons
            </Link>
            <Link to="/mentors" className="block text-gray-300 hover:text-white py-2">
              Mentors
            </Link>
            <Link to="/resources" className="block text-gray-300 hover:text-white py-2">
              Resources
            </Link>
            <div className="pt-4 border-t border-gray-800">
              <Link to="/signin" className="block text-gray-300 hover:text-white py-2">
                Sign in
              </Link>
              <Link to="/signup">
                <button className="mt-2 w-full px-4 py-2 bg-[#2997ff] text-white rounded-full text-sm font-medium hover:bg-[#2997ff]/90 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;