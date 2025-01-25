import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ArrowRight Icon Component
const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// NavItem Component
// eslint-disable-next-line react/prop-types
const NavItem = ({ href, children }) => (
  <motion.li className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to={href} className="text-gray-700 hover:text-black transition-colors duration-300">
      {children}
    </Link>
    <motion.div
      className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
  </motion.li>
);

// Button Component
// eslint-disable-next-line react/prop-types
const Button = ({ children, primary = false, icon = null }) => (
  <motion.button
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center ${
      primary ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
    {icon && (
      <motion.span
        className="ml-2"
        initial={{ x: 0 }}
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
      >
        {typeof icon === "function" ? icon() : icon}
      </motion.span>
    )}
  </motion.button>
);

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-black">
              Career<Link to="/" className="bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] bg-clip-text text-transparent">Prep</Link>
            </Link>
            <ul className="ml-32 flex items-center space-x-8">
              <NavItem href="/resumes">Resumes</NavItem>
              <NavItem href="/hackathons">Hackathons</NavItem>
              <NavItem href="/career-paths">Career Paths</NavItem>
              <NavItem href="/projects">Projects</NavItem>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <Link to='/signin'><Button>Log In</Button></Link>
            <Link to='/signup'>
            <Button primary icon={ArrowRight}>
              Sign Up
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;