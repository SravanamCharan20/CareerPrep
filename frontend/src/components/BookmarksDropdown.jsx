import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, X, Brain, Code, Award, Trophy, Briefcase, Map, ArrowRight } from 'lucide-react';
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
    const { bookmarks, handleRemoveBookmark } = useUserInteractions();
    const { trackBookmark } = useActivityTracking();

    // Group bookmarks by category
    const groupedBookmarks = bookmarks.reduce((acc, item) => {
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
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-white/5 rounded-full transition-colors relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bookmark className="w-5 h-5 text-gray-400" />
                {bookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2997ff] rounded-full text-xs flex items-center justify-center">
                        {bookmarks.length}
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-96 bg-[#1c1c1e] rounded-xl border border-white/10 shadow-xl z-50 max-h-[85vh] flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">Bookmarks</h3>
                                        <p className="text-sm text-gray-400 mt-1">Quick access to saved items</p>
                                    </div>
                                    <Link 
                                        to="/bookmarks"
                                        className="px-4 py-2 bg-[#2997ff]/10 text-[#2997ff] rounded-lg hover:bg-[#2997ff]/20 transition-colors flex items-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        View All
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Bookmarks List */}
                            <div className="flex-1 overflow-y-auto">
                                {bookmarks.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <div className="w-16 h-16 rounded-full bg-[#1c1c1e] border border-white/10 flex items-center justify-center mx-auto mb-4">
                                            <Bookmark className="w-8 h-8 text-gray-400 opacity-50" />
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-300 mb-2">No bookmarks yet</h4>
                                        <p className="text-sm text-gray-400">Start saving items you want to access later</p>
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        {Object.entries(groupedBookmarks).map(([category, items]) => {
                                            const CategoryIcon = getCategoryIcon(category);
                                            return (
                                                <div key={category} className="mb-4">
                                                    <div className="px-3 py-2 sticky top-0 bg-[#1c1c1e] z-10">
                                                        <h4 className="text-sm font-medium text-gray-400 capitalize flex items-center gap-2">
                                                            <CategoryIcon className="text-gray-400" size={16} />
                                                            {category}
                                                            <span className="text-xs bg-white/5 px-2 py-0.5 rounded-full">
                                                                {items.length}
                                                            </span>
                                                        </h4>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {items.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="group flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg mx-1"
                                                            >
                                                                <CategoryIcon className="w-4 h-4 text-gray-500" />
                                                                <Link
                                                                    to={item.path}
                                                                    className="flex-1 min-w-0"
                                                                    onClick={() => {
                                                                        setIsOpen(false);
                                                                        handleBookmarkClick(item);
                                                                    }}
                                                                >
                                                                    <p className="text-sm text-gray-300 hover:text-white truncate">
                                                                        {item.title}
                                                                    </p>
                                                                    {item.description && (
                                                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                                                            {item.description}
                                                                        </p>
                                                                    )}
                                                                </Link>
                                                                <button
                                                                    onClick={() => {
                                                                        handleRemoveBookmark(item.id);
                                                                        handleBookmarkClick(item);
                                                                    }}
                                                                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-full transition-all"
                                                                >
                                                                    <X className="w-4 h-4 text-gray-400" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}; 