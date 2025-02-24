import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    User, 
    LogOut, 
    ChevronRight, 
    Moon, 
    Sun,
    Activity,
    Bookmark,
    Search,
    X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const ProfileOverlay = ({ isOpen, onClose, currentUser, onSignOut }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { userInteractions } = useSelector(state => state.user);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const inputRef = useRef(null);

    // Add ESC key handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Add focus effect
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

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed inset-x-4 top-10 md:top-24 md:left-1/2 md:-translate-x-1/2  bg-[#1c1c1e]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 z-50 w-full max-w-4xl shadow-2xl mx-auto"
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-4 p-4 mb-6 bg-white/5 rounded-xl">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] flex items-center justify-center">
                                <span className="text-2xl font-medium text-white">
                                    {currentUser?.username?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white">{currentUser?.username || 'User'}</h3>
                                <p className="text-sm text-gray-400">{currentUser?.email || 'No email provided'}</p>
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
                                                    onClick={onClose}
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
                                                        if (item.label === 'Sign Out') onClose();
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
    );
};

ProfileOverlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
    }),
    onSignOut: PropTypes.func.isRequired
};

// Add default props
ProfileOverlay.defaultProps = {
    currentUser: {
        username: 'User',
        email: 'No email provided'
    }
}; 