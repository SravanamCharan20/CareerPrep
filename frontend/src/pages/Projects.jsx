import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Plus, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const projectCategories = [
    {
      title: 'Machine Learning',
      description: 'Explore cutting-edge ML and AI projects',
      icon: Brain,
      path: '/mlprojects',
      color: '#2997ff',
      gradient: 'from-[#2997ff]/20 to-transparent'
    },
    {
      title: 'MERN Stack',
      description: 'Full-stack web applications built with MERN',
      icon: Code,
      path: '/mernprojects',
      color: '#30d158',
      gradient: 'from-[#30d158]/20 to-transparent'
    },
    {
      title: 'Coming Soon',
      description: 'More project categories on the way',
      icon: Plus,
      path: '#',
      color: '#ff375f',
      gradient: 'from-[#ff375f]/20 to-transparent',
      disabled: true
    }
  ];

  const filters = {
    all: {
      label: 'All Projects',
      icon: Code,
      color: '#2997ff'
    },
    ml: {
      label: 'Machine Learning',
      icon: Brain,
      color: '#30d158'
    },
    mern: {
      label: 'MERN Stack',
      icon: Code,
      color: '#ff375f'
    },
    upcoming: {
      label: 'Coming Soon',
      icon: Plus,
      color: '#bf5af2'
    }
  };

  const filteredCategories = projectCategories.filter(category => {
    if (searchQuery) {
      return (
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ml') return category.title.includes('Machine Learning');
    if (selectedFilter === 'mern') return category.title.includes('MERN');
    if (selectedFilter === 'upcoming') return category.title.includes('Coming Soon');
    return true;
  });


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-black to-black" />
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
                Explore Projects
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Discover and contribute to innovative projects across different technologies
            </motion.p>
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
            placeholder="Search projects..."
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

      {/* Filter Tags */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {Object.entries(filters).map(([key, filter], index) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
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

      {/* Search and Filter Section */}
      

      <div className="max-w-7xl mx-auto px-6">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              onClick={() => !category.disabled && navigate(category.path)}
              className={`group relative aspect-[4/3] ${!category.disabled && 'cursor-pointer'}`}
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 rounded-3xl bg-[#1d1d1f] overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </div>
              {/* Content */}
              <div className="relative h-full p-8 flex flex-col">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon 
                    className="w-7 h-7"
                    style={{ color: category.color }}
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 text-base">
                    {category.description}
                  </p>
                </div>

                {/* Action Button */}
                {!category.disabled && (
                  <div 
                    className="flex items-center gap-2 text-sm font-medium mt-6"
                    style={{ color: category.color }}
                  >
                    <span>Browse Projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Categories Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            More project categories coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
}