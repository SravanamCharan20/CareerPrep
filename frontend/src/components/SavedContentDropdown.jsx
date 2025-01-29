import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked, Code, Trophy, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export const SavedContentDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { userInteractions } = useSelector(state => state.user);

    const savedItems = [
        {
            title: 'Projects',
            items: userInteractions?.savedProjects || [],
            icon: Code,
            color: '#2997ff',
            path: '/saved?tab=projects'
        },
        {
            title: 'Hackathons',
            items: userInteractions?.savedHackathons || [],
            icon: Trophy,
            color: '#30d158',
            path: '/saved?tab=hackathons'
        }
    ];

    const totalSaved = savedItems.reduce((acc, curr) => acc + curr.items.length, 0);

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
            >
                <BookMarked className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 text-sm">Saved</span>
                {totalSaved > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2997ff] rounded-full text-[10px] flex items-center justify-center font-medium">
                        {totalSaved}
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 bg-[#1c1c1e] rounded-xl border border-white/10 shadow-xl z-50 overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold">Saved Items</h3>
                                    <span className="text-xs text-gray-400">{totalSaved} items</span>
                                </div>
                                <p className="text-sm text-gray-400">Quick access to your saved content</p>
                            </div>

                            <div className="p-2">
                                {savedItems.map((section) => (
                                    <div key={section.title} className="mb-2">
                                        <div className="px-2 py-1.5 flex items-center justify-between">
                                            <p className="text-xs font-medium text-gray-400">{section.title}</p>
                                            <span className="text-xs text-gray-500">{section.items.length} saved</span>
                                        </div>
                                        {section.items.length === 0 ? (
                                            <div className="px-2 py-3 text-center bg-white/5 rounded-lg mx-2">
                                                <p className="text-sm text-gray-500">No saved {section.title.toLowerCase()}</p>
                                            </div>
                                        ) : (
                                            section.items.slice(0, 3).map((item) => (
                                                <Link
                                                    key={item.id}
                                                    to={item.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-3 mx-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                                >
                                                    <div 
                                                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                                                        style={{ backgroundColor: `${section.color}15` }}
                                                    >
                                                        <section.icon 
                                                            className="w-5 h-5"
                                                            style={{ color: section.color }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {item.description || 'No description'}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                ))}
                            </div>

                            <Link
                                to="/saved"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 border-t border-white/10 hover:bg-white/5 transition-colors group"
                            >
                                <span className="text-sm font-medium text-[#2997ff] group-hover:text-white transition-colors">
                                    View all saved items
                                </span>
                                <ArrowRight className="w-4 h-4 text-[#2997ff] group-hover:text-white transition-colors" />
                            </Link>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}; 