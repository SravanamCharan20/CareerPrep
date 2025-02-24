/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Brain, Code,  Trophy, X, Search,  Briefcase, Map, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserInteractions } from '../hooks/useUserInteractions';

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

export default function Bookmarks() {
    const { bookmarks, handleRemoveBookmark } = useUserInteractions();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [itemToDelete, setItemToDelete] = useState(null);

    // Group bookmarks by category
    const groupedBookmarks = bookmarks.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    // Filter bookmarks based on search and category
    const filteredBookmarks = Object.entries(groupedBookmarks).reduce((acc, [category, items]) => {
        if (selectedCategory !== 'all' && category !== selectedCategory) {
            return acc;
        }

        const filteredItems = items.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredItems.length > 0) {
            acc[category] = filteredItems;
        }

        return acc;
    }, {});

    // Add confirmation modal component
    const ConfirmationModal = ({ item, onConfirm, onCancel }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#1c1c1e] rounded-xl p-6 max-w-md w-full border border-white/10"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Remove Bookmark</h3>
                        <p className="text-gray-400 text-sm">This action cannot be undone</p>
                    </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-[#2997ff] mb-1">{item.title}</h4>
                    {item.description && (
                        <p className="text-sm text-gray-400">{item.description}</p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-500"
                    >
                        Remove
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );

    // Update the bookmark removal handler
    const handleRemove = (item) => {
        setItemToDelete(item);
    };

    const confirmRemove = () => {
        if (itemToDelete) {
            handleRemoveBookmark(itemToDelete.id);
            setItemToDelete(null);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 " />
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-8"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] p-[2px] mx-auto mb-6">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <Bookmark className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-7xl font-bold mb-6"
                    >
                        Your Bookmarks
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
                    >
                        Access all your saved items in one place
                    </motion.p>

                    {/* Enhanced Search and Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto backdrop-blur-lg bg-white/5 p-4 rounded-2xl border border-white/10"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search bookmarks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#2997ff] text-white placeholder-gray-500"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#2997ff] text-white min-w-[150px]"
                        >
                            <option value="all">All Categories</option>
                            {Object.keys(groupedBookmarks).map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </motion.div>
                </div>
            </section>

            {/* Bookmarks Grid with enhanced styling */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                {Object.entries(filteredBookmarks).length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2997ff] to-[#30d158] p-[2px] mx-auto mb-6">
                            <div className="w-full h-full rounded-full bg-[#1c1c1e] flex items-center justify-center">
                                <Bookmark className="w-12 h-12 text-gray-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">No bookmarks found</h2>
                        <p className="text-gray-400">
                            {searchQuery || selectedCategory !== 'all' 
                                ? 'Try adjusting your search or filters'
                                : 'Start bookmarking items you want to save for later'}
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-16">
                        {Object.entries(filteredBookmarks).map(([category, items]) => {
                            const CategoryIcon = getCategoryIcon(category);
                            return (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-[#2997ff]/10 flex items-center justify-center">
                                            <CategoryIcon className="w-6 h-6 text-[#2997ff]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{category}</h2>
                                            <p className="text-gray-400">{items.length} items</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="group relative"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                                <div className="relative bg-[#1c1c1e] rounded-xl p-6 border border-white/10 group-hover:border-[#2997ff]/50 transition-colors">
                                                    <Link to={item.path} className="block">
                                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2997ff] transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        {item.description && (
                                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </Link>
                                                    <button
                                                        onClick={() => handleRemove(item)}
                                                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X className="w-5 h-5 text-gray-400" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Add the confirmation modal */}
            <AnimatePresence>
                {itemToDelete && (
                    <ConfirmationModal
                        item={itemToDelete}
                        onConfirm={confirmRemove}
                        onCancel={() => setItemToDelete(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
} 