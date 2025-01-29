import { motion } from 'framer-motion';
import { Bookmark, Code, Trophy, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUserInteractions } from '../hooks/useUserInteractions';

export default function SavedItems() {
    const { userInteractions } = useSelector(state => state.user);
    const { handleUnsaveProject, handleUnsaveHackathon, handleRemoveBookmark } = useUserInteractions();

    const sections = [
        {
            title: 'Saved Projects',
            items: userInteractions.savedProjects,
            icon: Code,
            color: '#2997ff',
            handleRemove: handleUnsaveProject,
            emptyMessage: 'No saved projects yet'
        },
        {
            title: 'Saved Hackathons',
            items: userInteractions.savedHackathons,
            icon: Trophy,
            color: '#30d158',
            handleRemove: handleUnsaveHackathon,
            emptyMessage: 'No saved hackathons yet'
        },
        {
            title: 'Bookmarked Content',
            items: userInteractions.bookmarks,
            icon: Bookmark,
            color: '#ff375f',
            handleRemove: handleRemoveBookmark,
            emptyMessage: 'No bookmarks yet'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Saved Items</h1>
                    <p className="text-gray-400">Access your saved content</p>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${section.color}15` }}
                                >
                                    <section.icon 
                                        className="w-5 h-5"
                                        style={{ color: section.color }}
                                    />
                                </div>
                                <h2 className="text-xl font-semibold">{section.title}</h2>
                            </div>

                            {/* Items Grid */}
                            {section.items.length === 0 ? (
                                <div className="bg-[#1c1c1e] rounded-xl p-6 text-center text-gray-400">
                                    {section.emptyMessage}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {section.items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: (sectionIndex * 0.1) + (index * 0.05) }}
                                            className="bg-[#1c1c1e] rounded-xl p-6 group"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="font-medium">{item.title}</h3>
                                                <button
                                                    onClick={() => section.handleRemove(item.id)}
                                                    className="p-2 hover:bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Bookmark className="w-5 h-5 text-[#2997ff] fill-[#2997ff]" />
                                                </button>
                                            </div>
                                            
                                            {item.description && (
                                                <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                                            )}

                                            <Link 
                                                to={item.path}
                                                className="inline-flex items-center gap-2 text-[#2997ff] text-sm hover:underline mt-2"
                                            >
                                                View Details
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 