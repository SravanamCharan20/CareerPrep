import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Server, Smartphone, Brain, ArrowRight, Search, SlidersHorizontal, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useUserInteractions } from '../hooks/useUserInteractions';
import { useSelector } from 'react-redux';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import {  
  Code
} from 'lucide-react';

const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master modern frontend development from basics to advanced concepts',
    icon: Globe,
    path: '/roadmaps/frontend',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX'],
    level: 'Beginner to Advanced',
    color: '#2997ff',
    gradient: 'from-[#2997ff]/20 to-transparent'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Learn server-side programming and API development',
    icon: Server,
    path: '/roadmaps/backend',
    skills: ['Node.js', 'Databases', 'APIs', 'Security'],
    level: 'Intermediate',
    color: '#30d158',
    gradient: 'from-[#30d158]/20 to-transparent'
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Build native and cross-platform mobile applications',
    icon: Smartphone,
    path: '/roadmaps/mobile',
    skills: ['React Native', 'Mobile UI', 'App Store', 'Native Features'],
    level: 'Intermediate to Advanced',
    color: '#ff375f',
    gradient: 'from-[#ff375f]/20 to-transparent'
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    description: 'Explore artificial intelligence and machine learning concepts',
    icon: Brain,
    path: '/roadmaps/ai',
    skills: ['Python', 'Math', 'Neural Networks', 'Deep Learning'],
    level: 'Advanced',
    color: '#bf5af2',
    gradient: 'from-[#bf5af2]/20 to-transparent'
  }
];

export default function Roadmaps() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { handleBookmark, handleRemoveBookmark, isBookmarked } = useUserInteractions();
  const { roadmapProgress } = useRoadmapProgress();
  const { userInteractions } = useSelector(state => state.user);

  // Add loading state
  if (!userInteractions) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-[#1c1c1e] rounded-xl p-8 text-center">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-400">Loading roadmaps...</p>
          </div>
        </div>
      </div>
    );
  }

  const filters = {
    all: {
      label: 'All Roadmaps',
      icon: Globe,
      color: '#2997ff'
    },
    frontend: {
      label: 'Frontend',
      icon: Globe,
      color: '#30d158'
    },
    backend: {
      label: 'Backend',
      icon: Server,
      color: '#ff375f'
    },
    mobile: {
      label: 'Mobile',
      icon: Smartphone,
      color: '#bf5af2'
    },
    ai: {
      label: 'AI/ML',
      icon: Brain,
      color: '#ff9f0a'
    }
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    if (searchQuery) {
      return (
        roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedFilter === 'all') return true;
    return roadmap.id === selectedFilter;
  })
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 " />
          <div className="absolute inset-0">
            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Glowing Orbs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#2997ff]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#30d158]/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            <div className="absolute top-40 right-40 w-64 h-64 bg-[#ff375f]/20 rounded-full blur-[120px] animate-pulse delay-700" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            {/* Floating Icons */}
            <div className="relative mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-16 left-1/2 -translate-x-32 w-16 h-16 bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] p-4"
              >
                <Code className="w-full h-full text-[#2997ff]" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-20 left-1/2 translate-x-16 w-14 h-14 bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] p-3"
              >
                <Brain className="w-full h-full text-[#30d158]" />
              </motion.div>
            </div>

            {/* Title with Gradient Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-7xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f] animate-gradient-x">
                Explore Roadmaps
              </h1>
            </motion.div>

            {/* Description with Typing Effect */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Explore cutting-edge technologies and chart your path in the tech industry.
            </motion.p>

            {/* Search and Filter Section with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto backdrop-blur-lg bg-white/5 p-4 rounded-2xl border border-white/10"
            >
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search careers, skills, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#2997ff] text-white placeholder-gray-500 transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-[#2997ff] hover:bg-[#2997ff]/90 rounded-xl transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </motion.div>

            {/* Filter Tags with Animation */}
            <AnimatePresence>
              {showFilters && filters && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-wrap justify-center gap-3 mt-6"
                >
                  {Object.entries(filters).map(([key, filter]) => (
                    <motion.button
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => setSelectedFilter(key)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedFilter === key
                          ? 'bg-[#2997ff] text-white scale-105'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:scale-105'
                      }`}
                    >
                      {filter.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Roadmaps Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoadmaps.map((roadmap, index) => (
              <div key={roadmap.id} className="relative group">
                {/* Bookmark Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      isBookmarked(roadmap.id)
                        ? handleRemoveBookmark(roadmap.id)
                        : handleBookmark({
                            id: roadmap.id,
                            title: roadmap.title,
                            path: roadmap.path,
                            category: 'Learning Roadmaps',
                            description: roadmap.description,
                            difficulty: roadmap.level
                          });
                    }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Bookmark 
                      className={`w-5 h-5 ${
                        isBookmarked(roadmap.id) 
                          ? 'text-[#2997ff] fill-[#2997ff]' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                <Link to={roadmap.path} className="block">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden"
                  >
                    {/* Background with gradient */}
                    <div className="absolute inset-0 bg-[#1d1d1f]">
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${roadmap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col">
                      {/* Icon */}
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${roadmap.color}15` }}
                      >
                        <roadmap.icon 
                          size={28}
                          className={`text-[${roadmap.color}]`}
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors">
                          {roadmap.title}
                        </h3>
                        <p className="text-gray-400 text-base line-clamp-2">
                          {roadmap.description}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {roadmap.skills.slice(0, 3).map((skill) => (
                          <span 
                            key={skill}
                            className="px-2 py-1 rounded-full bg-[#2997ff]/10 text-[#2997ff] text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Level */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{roadmap.level}</span>
                        <ArrowRight className="w-5 h-5 text-[#2997ff] transform group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Progress Section */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-[#2997ff]">
                            {Math.round(roadmapProgress[roadmap.id]?.progress || 0)}%
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2">
                          <div 
                            className="bg-[#2997ff] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${roadmapProgress[roadmap.id]?.progress || 0}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          {roadmapProgress[roadmap.id]?.completedNodes?.length || 0} of {roadmap.totalNodes} topics completed
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-5 right-20">
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            (roadmapProgress[roadmap.id]?.progress || 0) === 100
                              ? 'bg-green-500/10 text-green-500'
                              : (roadmapProgress[roadmap.id]?.progress || 0) > 0
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-gray-500/10 text-gray-400'
                          }`}
                        >
                          {(roadmapProgress[roadmap.id]?.progress || 0) === 100 
                            ? 'Completed'
                            : (roadmapProgress[roadmap.id]?.progress || 0) > 0
                            ? 'In Progress'
                            : 'Not Started'
                          }
                        </span>
                      </div>

                      {/* Border */}
                      <div className="absolute inset-0 rounded-3xl border border-[#333333] group-hover:border-[#444444] transition-colors" />
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
