/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, User, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { BookmarksDropdown } from './BookmarksDropdown';
import { ProfileDropdown } from './ProfileDropdown';

// ArrowRight Icon Component

// NavItem Component
// eslint-disable-next-line react/prop-types
const NavItem = ({ href, children }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <motion.li 
      className="relative" 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to={href} 
        className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 px-4 py-2 rounded-full
          ${isActive 
            ? 'text-white bg-white/10' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
      >
        {children}
        {/* Glow effect for active item */}
        {isActive && (
          <motion.div
            layoutId="navbar-glow"
            className="absolute inset-0 rounded-full bg-white/5 blur-sm -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    </motion.li>
  );
};

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
            onClick={onClose}
          />

          {/* Enhanced Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 inset-x-4 md:top-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-[#1c1c1e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 z-50 w-full max-w-3xl shadow-2xl"
          >
            {/* Search Form with Gradient Border */}
            <div className="relative group">
              {/* Animated gradient background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
              
              <form onSubmit={handleSearch} className="relative bg-black/50 rounded-xl">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, roadmaps, certifications..."
                  className="w-full bg-transparent text-white placeholder-gray-400 px-12 py-4 rounded-xl focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {searchQuery && (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </form>
            </div>

            {/* Enhanced Quick Links */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Links</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <QuickLink href="/projects" label="Projects" />
                <QuickLink href="/roadmaps" label="Roadmaps" />
                <QuickLink href="/certifications" label="Certifications" />
                <QuickLink href="/hackathons" label="Hackathons" />
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/5 rounded-lg">⌘</kbd>
                  <kbd className="px-2 py-1 bg-white/5 rounded-lg">K</kbd>
                  <span>to search</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/5 rounded-lg">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const QuickLink = ({ href, label }) => (
  <Link
    to={href}
    className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/20 via-[#30d158]/20 to-[#ff375f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative flex items-center justify-between p-3">
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-200" />
    </div>
  </Link>
);

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/');
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-xl font-bold text-white flex items-center gap-2"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 bg-gradient-to-r from-[#2997ff] to-[#30d158] rounded-lg flex items-center justify-center"
              >
                <span className="text-white">C</span>
              </motion.div>
              <span>CareerPrep</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2">
              <NavItem href="/projects">Projects</NavItem>
              <NavItem href="/hackathons">Hackathons</NavItem>
              <NavItem href="/careerpaths">CareerPaths</NavItem>
              <NavItem href="/roadmaps">Roadmaps</NavItem>
              <NavItem href="/certifications">Certifications</NavItem>
            </ul>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Enhanced Search Button */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/20 via-[#30d158]/20 to-[#ff375f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Search button with glass effect */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10"
                >
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm text-gray-400 group-hover:text-white">
                    Search
                  </span>
                  <div className="flex items-center gap-1 pl-2 border-l border-white/10">
                    <kbd className="text-xs px-1.5 py-0.5 bg-white/5 text-gray-400 rounded">⌘</kbd>
                    <kbd className="text-xs px-1.5 py-0.5 bg-white/5 text-gray-400 rounded">K</kbd>
                  </div>
                </button>
              </motion.div>

              {currentUser && <BookmarksDropdown />}
              
              {currentUser ? (
                <ProfileDropdown 
                  currentUser={currentUser}
                  onSignOut={handleSignOut}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/signin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 text-gray-300 hover:text-white text-sm font-medium"
                    >
                      Sign in
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 bg-[#2997ff] hover:bg-[#2997ff]/90 text-white rounded-full text-sm font-medium transition-colors"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-gray-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                {[
                  { path: "/projects", label: "Projects" },
                  { path: "/hackathons", label: "Hackathons" },
                  { path: "/careerpaths", label: "Careerpaths" },
                  { path: "/roadmaps", label: "Roadmaps" },
                  { path: "/certifications", label: "Certifications" }
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="block text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-800">
                  {currentUser ? (
                    <>
                      <div className="flex items-center gap-3 py-2 px-4">
                        <div className="w-8 h-8 rounded-full bg-[#2997ff] flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-300">{currentUser.username}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="mt-2 w-full px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-sm font-medium transition-colors"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link 
                        to="/signin"
                        className="block w-full px-4 py-2 text-center text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                      <Link 
                        to="/signup"
                        className="block w-full px-4 py-2 bg-[#2997ff] hover:bg-[#2997ff]/90 text-white rounded-full text-sm font-medium text-center transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Add Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;