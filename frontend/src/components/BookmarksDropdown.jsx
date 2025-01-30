import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X, Brain, Code, Trophy, Briefcase, Map, Search } from 'lucide-react';
import { useUserInteractions } from '../hooks/useUserInteractions';
import { useActivityTracking } from '../hooks/useActivityTracking';

const getCategoryIcon = (category) => {
    switch (category) {
        case 'ML Projects':
            return Brain;
        case 'MERN Projects':
            return Code;
        case 'Hackathons':
            return Trophy;
        case 'Career Paths':
            return Briefcase;
        case 'Learning Roadmaps':
            return Map;
        default:
            return Bookmark;
    }
};

export const BookmarksDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { bookmarks, handleRemoveBookmark } = useUserInteractions();
    const { trackBookmark } = useActivityTracking();
    const inputRef = useRef(null);

    // Handle body scroll
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

    // Handle keyboard shortcuts
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

    // Add focus effect
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Group and filter bookmarks
    const filteredAndGroupedBookmarks = bookmarks.reduce((acc, item) => {
        if (searchQuery) {
            const matchesSearch = 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return acc;
        }

        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    const handleBookmarkClick = (bookmark) => {
        trackBookmark(bookmark);
    };

    return (
        <>
            {/* Bookmarks Button */}
            <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2997ff]/20 via-[#30d158]/20 to-[#ff375f]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10"
                >
                    <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-white">
                        Bookmarks
                    </span>
                    {bookmarks.length > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 bg-[#2997ff] text-white text-xs rounded-full">
                            {bookmarks.length}
                        </span>
                    )}
                </button>
            </motion.div>

            {/* Full Page Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed inset-x-4 top-20 md:top-24 md:left-1/2 md:-translate-x-1/2 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 z-50 w-full max-w-4xl shadow-2xl mx-auto"
                        >
                            {/* Search Form with Gradient Border */}
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                                
                                <div className="relative bg-black/50 rounded-xl">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search your bookmarks..."
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

                            {/* Bookmarks List */}
                            <div className="mt-6 max-h-[60vh] overflow-y-auto">
                                {Object.keys(filteredAndGroupedBookmarks).length === 0 ? (
                                    <div className="text-center py-8">
                                        <Bookmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-400">
                                            {searchQuery ? 'No bookmarks found' : 'No bookmarks yet'}
                                        </p>
                                    </div>
                                ) : (
                                    Object.entries(filteredAndGroupedBookmarks).map(([category, items]) => {
                                        const CategoryIcon = getCategoryIcon(category);
                                        return (
                                            <div key={category} className="mb-6">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <CategoryIcon className="w-5 h-5 text-gray-400" />
                                                    <h3 className="text-sm font-medium text-gray-400">
                                                        {category}
                                                    </h3>
                                                    <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-gray-500">
                                                        {items.length}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="group relative bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                                                        >
                                                            <Link
                                                                to={item.path}
                                                                onClick={() => {
                                                                    setIsOpen(false);
                                                                    handleBookmarkClick(item);
                                                                }}
                                                                className="block"
                                                            >
                                                                <h4 className="font-medium text-gray-200 mb-1">
                                                                    {item.title}
                                                                </h4>
                                                                {item.description && (
                                                                    <p className="text-sm text-gray-400 line-clamp-2">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </Link>
                                                            <button
                                                                onClick={() => handleRemoveBookmark(item.id)}
                                                                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                                                            >
                                                                <X className="w-4 h-4 text-gray-400" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Keyboard Shortcuts */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <kbd className="px-2 py-1 bg-white/5 rounded-lg">⌘</kbd>
                                        <kbd className="px-2 py-1 bg-white/5 rounded-lg">B</kbd>
                                        <span>to open bookmarks</span>
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
        </>
    );
}; 