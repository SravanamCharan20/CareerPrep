import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    Settings, 
    LogOut, 
    ChevronRight, 
    Moon, 
    Sun,
    Activity,
    Bookmark,
    Shield,
    HelpCircle,
    Search,
    X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ProfileDropdown = ({ currentUser, onSignOut }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { userInteractions } = useSelector(state => state.user);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const menuItems = [
        {
            type: 'link',
            icon: User,
            label: 'Profile',
            path: '/profile',
            info: 'View and edit your profile'
        },
        {
            type: 'link',
            icon: Activity,
            label: 'Activity',
            path: '/activity',
            info: `${userInteractions?.activities?.length || 0} recent activities`
        },
        {
            type: 'link',
            icon: Bookmark,
            label: 'Bookmarks',
            path: '/bookmarks',
            info: `${userInteractions?.bookmarks?.length || 0} items saved`
        },
        {
            type: 'divider'
        },
        {
            type: 'link',
            icon: Settings,
            label: 'Settings',
            path: '/settings',
            info: 'Preferences & account settings'
        },
        {
            type: 'button',
            icon: isDarkMode ? Sun : Moon,
            label: `${isDarkMode ? 'Light' : 'Dark'} Mode`,
            onClick: () => setIsDarkMode(!isDarkMode),
            info: `Switch to ${isDarkMode ? 'light' : 'dark'} mode`
        },
        {
            type: 'divider'
        },
        {
            type: 'link',
            icon: Shield,
            label: 'Privacy',
            path: '/privacy',
            info: 'Privacy settings & data'
        },
        {
            type: 'link',
            icon: HelpCircle,
            label: 'Help & Support',
            path: '/support',
            info: 'Get help and documentation'
        },
        {
            type: 'button',
            icon: LogOut,
            label: 'Sign Out',
            onClick: onSignOut,
            info: 'Sign out of your account',
            danger: true
        }
    ];

    const filteredItems = menuItems.filter(item => {
        if (item.type === 'divider') return true;
        return item.label.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Add backdrop click handler

    return (
        <div className="relative">
            {/* Profile Button with glass effect */}
            <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/20 via-[#30d158]/20 to-[#ff375f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Button with glass effect */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                            {currentUser.username.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-white">
                        {currentUser.username}
                    </span>
                </button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Enhanced Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Enhanced Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-4 inset-x-4 md:top-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 z-50 w-full max-w-2xl shadow-2xl"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-4 p-4 mb-6 bg-white/5 rounded-xl">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] flex items-center justify-center">
                                    <span className="text-2xl font-medium text-white">
                                        {currentUser.username.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">{currentUser.username}</h3>
                                    <p className="text-sm text-gray-400">{currentUser.email}</p>
                                </div>
                            </div>

                            {/* Search Form with Gradient Border */}
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                                
                                <div className="relative bg-black/50 rounded-xl">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search menu..."
                                        className="w-full bg-transparent text-white placeholder-gray-400 px-12 py-4 rounded-xl focus:outline-none"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="mt-6 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-2">
                                    {filteredItems.map((item, index) => (
                                        item.type === 'divider' ? (
                                            <div key={index} className="my-4 border-t border-white/10" />
                                        ) : (
                                            <motion.div
                                                key={item.label}
                                                whileHover={{ x: 4 }}
                                                className="relative group"
                                            >
                                                {item.type === 'link' ? (
                                                    <Link
                                                        to={item.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors ${
                                                            item.danger ? 'text-[#ff375f] hover:text-[#ff375f]' : 'text-gray-300 hover:text-white'
                                                        }`}
                                                    >
                                                        <item.icon className="w-5 h-5" />
                                                        <span className="flex-1">{item.label}</span>
                                                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            item.onClick();
                                                            if (item.label === 'Sign Out') setIsOpen(false);
                                                        }}
                                                        className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors ${
                                                            item.danger ? 'text-[#ff375f] hover:text-[#ff375f]' : 'text-gray-300 hover:text-white'
                                                        }`}
                                                    >
                                                        <item.icon className="w-5 h-5" />
                                                        <span className="flex-1">{item.label}</span>
                                                    </button>
                                                )}
                                            </motion.div>
                                        )
                                    ))}
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
        </div>
    );
};

ProfileDropdown.propTypes = {
    currentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onSignOut: PropTypes.func.isRequired
}; 