import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useUserInteractions } from '../hooks/useUserInteractions';

// eslint-disable-next-line react/prop-types
export const RoadmapCard = ({ roadmap }) => {
    const { handleBookmark, isBookmarked } = useUserInteractions();

    return (
        <motion.div 
            className="relative bg-[#1c1c1e] rounded-xl p-6 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Bookmark Button */}
            <button
                onClick={() => handleBookmark({
                    id: roadmap.id,
                    title: roadmap.title,
                    path: `/roadmaps/${roadmap.id}`,
                    type: 'roadmap'
                })}
                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors"
            >
                <Bookmark 
                    className={`w-5 h-5 ${
                        isBookmarked(roadmap.id) ? 'fill-[#2997ff] text-[#2997ff]' : 'text-gray-400'
                    }`}
                />
            </button>

            {/* Roadmap Content */}
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{roadmap.title}</h3>
                <p className="text-gray-400">{roadmap.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-500">Estimated Time</p>
                    <p className="text-base text-gray-300">{roadmap.duration}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <p className="text-base text-gray-300">{roadmap.difficulty}</p>
                </div>
            </div>

            {/* View Roadmap Link */}
            <Link 
                to={`/roadmaps/${roadmap.id}`}
                className="inline-flex items-center gap-2 text-[#2997ff] hover:underline mt-4"
            >
                View Roadmap
                <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
};