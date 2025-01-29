import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  
  Search, 
  SlidersHorizontal,
  ArrowRight,
  Code,
  Brain
} from 'lucide-react';
import React from 'react';
import * as careerPaths from '../data/careerpaths';

const CareerPaths = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredPaths, setFilteredPaths] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Memoize allPaths to prevent unnecessary recalculations
  const allPaths = useMemo(() => Object.values(careerPaths), []);

  // Define filters object
  const filters = {
    all: {
      label: 'All Paths',
      icon: Code,
      color: '#2997ff'
    },
    development: {
      label: 'Development',
      icon: Code,
      color: '#30d158'
    },
    data: {
      label: 'Data & AI',
      icon: Brain,
      color: '#ff375f'
    },
    devops: {
      label: 'DevOps & Cloud',
      icon: Code,
      color: '#bf5af2'
    },
    mobile: {
      label: 'Mobile & Gaming',
      icon: Code,
      color: '#ff9f0a'
    }
  };

  // Memoize filter function
  const filterPaths = useMemo(() => {
    return (paths, query, filter) => {
      let result = paths;

      // Apply search
      if (query) {
        result = result.filter(path => 
          path.title.toLowerCase().includes(query.toLowerCase()) ||
          path.description.toLowerCase().includes(query.toLowerCase()) ||
          path.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
        );
      }

      // Apply category filter
      if (filter !== 'all') {
        result = result.filter(path => {
          switch (filter) {
            case 'development':
              return ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'].includes(path.title);
            case 'data':
              return ['AI/ML Engineer', 'Data Scientist'].includes(path.title);
            case 'devops':
              return ['DevOps Engineer', 'Cloud Architect'].includes(path.title);
            case 'mobile':
              return ['Mobile App Developer', 'Game Developer'].includes(path.title);
            default:
              return true;
          }
        });
      }

      return result;
    };
  }, []);

  // Update filtered paths when search or filter changes
  useEffect(() => {
    const newFilteredPaths = filterPaths(allPaths, searchQuery, selectedFilter);
    setFilteredPaths(newFilteredPaths);
  }, [searchQuery, selectedFilter, allPaths, filterPaths]);

  // Initialize filtered paths
  useEffect(() => {
    setFilteredPaths(allPaths);
  }, [allPaths]);

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
                Explore Tech Careers
              </h1>
            </motion.div>

            {/* Description with Typing Effect */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Discover your ideal path in technology. Explore various roles,
              required skills, and growth opportunities in the tech industry.
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
      {/* Career Paths Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          {filteredPaths.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-400">No career paths found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((path, index) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  onClick={() => setSelectedPath(path)}
                  className="group relative aspect-[4/3] cursor-pointer"
                >
                  {/* Background with gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-[#1d1d1f] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col">
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
                      style={{ backgroundColor: '#2997ff15' }}
                    >
                      {React.createElement(path.icon, { 
                        size: 28,
                        className: "text-[#2997ff]"
                      })}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-gray-400 text-base line-clamp-2">
                        {path.description}
                      </p>
                    </div>

                    {/* Skills Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {path.skills.slice(0, 2).map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-1 rounded-full bg-[#2997ff]/10 text-[#2997ff] text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {path.skills.length > 2 && (
                        <span className="px-2 py-1 text-gray-400 text-xs">
                          +{path.skills.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-500">{path.salary.entry}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm text-gray-400">{path.demand}</span>
                      </div>
                      <div 
                        className="flex items-center gap-2 text-sm font-medium text-[#2997ff]"
                      >
                        <span>View Path</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Border */}
                    <div className="absolute inset-0 rounded-3xl border border-[#333333] group-hover:border-[#444444] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Selected Path Modal */}
      <AnimatePresence>
        {selectedPath && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setSelectedPath(null)}
                  className="mb-8 text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to paths
                </button>

                <div className="space-y-12">
                  {/* Header */}
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#2997ff]/10 flex items-center justify-center">
                      {React.createElement(selectedPath.icon, { 
                        size: 32,
                        className: "text-[#2997ff]"
                      })}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedPath.title}</h2>
                      <p className="text-xl text-gray-400">{selectedPath.description}</p>
                    </div>
                  </div>

                  {/* Job Roles */}
                  <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                    <h3 className="text-lg font-semibold mb-4">Job Roles You Can Expect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(selectedPath.jobRoles || []).map((role) => (
                        <div 
                          key={role}
                          className="p-3 rounded-xl bg-[#2c2c2e] text-gray-300"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                      <h3 className="text-lg font-semibold mb-2">Time to Learn</h3>
                      <p className="text-2xl text-[#2997ff]">{selectedPath.timeTaken}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                      <h3 className="text-lg font-semibold mb-2">Starting Salary</h3>
                      <p className="text-2xl text-green-500">{selectedPath.salary?.entry || 'N/A'}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                      <h3 className="text-lg font-semibold mb-2">Competition</h3>
                      <p className="text-2xl text-orange-500">{selectedPath.competition}</p>
                    </div>
                  </div>

                  {/* Add a new section for detailed salary information */}
                  <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                    <h3 className="text-lg font-semibold mb-6">Salary Progression</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 rounded-xl bg-[#2c2c2e]">
                        <div className="text-sm text-gray-400 mb-1">Entry Level</div>
                        <div className="text-xl text-green-500">{selectedPath.salary?.entry || 'N/A'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#2c2c2e]">
                        <div className="text-sm text-gray-400 mb-1">Mid Level</div>
                        <div className="text-xl text-green-500">{selectedPath.salary?.mid || 'N/A'}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#2c2c2e]">
                        <div className="text-sm text-gray-400 mb-1">Senior Level</div>
                        <div className="text-xl text-green-500">{selectedPath.salary?.senior || 'N/A'}</div>
                      </div>
                    </div>

                    {/* Only render regional variations if they exist */}
                    {selectedPath.salary?.regions && Object.keys(selectedPath.salary.regions).length > 0 && (
                      <>
                        <h4 className="text-sm font-medium text-gray-400 mb-4">Regional Variations</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Object.entries(selectedPath.salary.regions).map(([region, level]) => (
                            <div key={region} className="p-3 rounded-xl bg-[#2c2c2e]">
                              <div className="text-sm text-gray-400">{region}</div>
                              <div className="text-sm text-[#2997ff]">{level}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Skills & Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                      <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedPath.skills || []).map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 rounded-full bg-[#2997ff]/10 text-[#2997ff] text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                      <h3 className="text-lg font-semibold mb-4">Tools Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {(selectedPath.tools || []).map((tool) => (
                          <span 
                            key={tool}
                            className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Learning Roadmap */}
                  <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                    <h3 className="text-lg font-semibold mb-6">Learning Roadmap</h3>
                    <div className="space-y-6">
                      {(selectedPath.roadmap || []).map((stage, index) => (
                        <div key={stage.title} className="relative pl-8">
                          <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#2997ff]/20 border-2 border-[#2997ff]" />
                          {index !== (selectedPath.roadmap || []).length - 1 && (
                            <div className="absolute left-2 top-4 w-0.5 h-full bg-[#2997ff]/20" />
                          )}
                          <h4 className="text-lg font-medium mb-2">{stage.title}</h4>
                          <ul className="space-y-2">
                            {(stage.items || []).map((item) => (
                              <li key={item} className="text-gray-400">• {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communities */}
                  <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-[#2c2c2e]">
                    <h3 className="text-lg font-semibold mb-4">Communities to Learn From</h3>
                    <div className="flex flex-wrap gap-2">
                      {(selectedPath.communities || []).map((community) => (
                        <span 
                          key={community}
                          className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm"
                        >
                          {community}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerPaths; 