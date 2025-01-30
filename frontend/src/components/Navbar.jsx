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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 bg-[#1c1c1e] border-b border-white/10 p-4 z-50"
          >
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, roadmaps, certifications..."
                  className="w-full bg-black/50 text-white placeholder-gray-400 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#2997ff]"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2997ff] hover:text-[#2997ff]/80 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </form>
              
              {/* Quick Links */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <QuickLink href="/projects" label="Projects" />
                  <QuickLink href="/roadmaps" label="Roadmaps" />
                  <QuickLink href="/certifications" label="Certifications" />
                  <QuickLink href="/hackathons" label="Hackathons" />
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
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
  >
    <span>{label}</span>
    <ArrowRight className="w-4 h-4" />
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
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5 text-gray-400" />
              </motion.button>
              
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