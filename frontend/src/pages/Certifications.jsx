/* eslint-disable react/prop-types */
import { useState } from 'react';
import { certificationsData } from '../data/certifications';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  DollarSign, 
  Award, 
  ChevronRight, 
  Search, 
  SlidersHorizontal, 
  Globe, 
  Server, 
  Smartphone, 
  Brain, 
  X,
  Code,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { useUserInteractions } from '../hooks/useUserInteractions';
import { useActivityTracking } from '../hooks/useActivityTracking';

const roleIcons = {
  "Frontend Developer": Globe,
  "Backend Developer": Server,
  "Mobile Developer": Smartphone,
  "AI/ML Engineer": Brain
};


// Add role descriptions and stats
const roleDetails = {
  "Frontend Developer": {
    description: "Get certified in frontend technologies and frameworks",
    totalCerts: "12+ Certifications",
    topProviders: ["Meta", "freeCodeCamp", "Google"],
    skills: ["React", "JavaScript", "UI/UX", "HTML/CSS"],
    avgCost: "$0-$200",
    color: "#2997ff"
  },
  "Backend Developer": {
    description: "Master server-side development certifications",
    totalCerts: "15+ Certifications",
    topProviders: ["AWS", "MongoDB", "Node.js"],
    skills: ["Node.js", "Python", "Databases", "APIs"],
    avgCost: "$150-$300",
    color: "#30d158"
  },
  "Mobile Developer": {
    description: "Earn mobile development certifications",
    totalCerts: "10+ Certifications",
    topProviders: ["Google", "Apple", "Meta"],
    skills: ["React Native", "iOS", "Android", "Flutter"],
    avgCost: "$0-$400",
    color: "#ff375f"
  },
  "AI/ML Engineer": {
    description: "Get certified in AI and machine learning",
    totalCerts: "8+ Certifications",
    topProviders: ["Google Cloud", "IBM", "deeplearning.ai"],
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
    avgCost: "$50-$300",
    color: "#bf5af2"
  }
};

 
const CertificationCard = ({ cert }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { handleBookmark, handleRemoveBookmark, isBookmarked } = useUserInteractions();

  if (!cert) return null;

  return (
    <motion.div
      layout
      className="bg-[#1c1c1e] p-6 rounded-2xl border border-gray-700 relative group"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-medium text-[#2997ff] mb-2">{cert.name}</h3>
        <p className="text-gray-400 mb-4">{cert.provider}</p>
        
        {/* Key Information */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {cert.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2997ff]" />
              <span className="text-sm text-gray-300">{cert.duration}</span>
            </div>
          )}
          {cert.cost && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-300">{cert.cost}</span>
            </div>
          )}
          {cert.difficulty && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-300">{cert.difficulty}</span>
            </div>
          )}
        </div>

        {cert.description && (
          <p className="text-gray-400 mb-4">{cert.description}</p>
        )}

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {cert.skills?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Skills You&apos;ll Learn</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-[#2997ff]/10 text-[#2997ff] rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cert.prerequisites?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Prerequisites</h4>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {cert.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {cert.careerBenefits?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Career Benefits</h4>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {cert.careerBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-[#2997ff] hover:underline focus:outline-none"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-[#30d158] hover:underline"
            >
              Learn More
              <ChevronRight className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Add Bookmark Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening the modal
            }}
          >
            <button
              onClick={() => {
                if (isBookmarked(cert.id)) {
                  handleRemoveBookmark(cert.id);
                } else {
                  handleBookmark({
                    id: cert.id,
                    title: cert.title,
                    path: cert.link,
                    category: 'Certifications',
                    description: cert.description,
                    provider: cert.provider,
                    duration: cert.duration,
                    price: cert.price
                  });
                }
              }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 ${
                  isBookmarked(cert.id) 
                    ? 'text-[#2997ff] fill-[#2997ff]' 
                    : 'text-gray-400'
                }`} 
              />
            </button>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { handleBookmark, handleRemoveBookmark, isBookmarked } = useUserInteractions();
  const { trackCertificationComplete } = useActivityTracking();
  
  const roles = Object.keys(roleDetails);

  const filters = {
    all: {
      label: 'All Paths',
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

  const getFilteredRoles = () => {
    try {
      return roles.filter(role => {
        const details = roleDetails[role];
        if (!details) return false;
        
        if (searchQuery) {
          const searchTerms = searchQuery.toLowerCase();
          return (
            role.toLowerCase().includes(searchTerms) ||
            details.description?.toLowerCase().includes(searchTerms) ||
            details.skills?.some(skill => skill.toLowerCase().includes(searchTerms)) ||
            details.topProviders?.some(provider => provider.toLowerCase().includes(searchTerms))
          );
        }

        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'frontend') return role.includes('Frontend');
        if (selectedFilter === 'backend') return role.includes('Backend');
        if (selectedFilter === 'mobile') return role.includes('Mobile');
        if (selectedFilter === 'ai') return role.includes('AI');
        
        return true;
      });
    } catch (error) {
      console.error('Error filtering roles:', error);
      return [];
    }
  };

  const handleCertificationComplete = (cert) => {
    trackCertificationComplete(cert);
  };

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
                Professional Certifications
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Explore industry-recognized certifications to advance your tech career
            </motion.p>

            {/* Search and Filter */}
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
                  placeholder="Search certifications..."
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

      {/* Role Cards Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {getFilteredRoles().map((role, index) => {
            const Icon = roleIcons[role] || Globe;
            const details = roleDetails[role];
            
            if (!details) return null;

            return (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                onClick={() => setSelectedRole(role)}
                className="group relative aspect-[4/3] cursor-pointer"
              >
                {/* Add Bookmark Button */}
                <div 
                  className="absolute top-4 right-4 z-10"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the modal
                  }}
                >
                  <button
                    onClick={() => {
                      if (isBookmarked(role)) {
                        handleRemoveBookmark(role);
                      } else {
                        handleBookmark({
                          id: role,
                          title: role,
                          path: `/certifications?role=${role}`,
                          category: 'Certifications',
                          description: details.description,
                          totalCerts: details.totalCerts,
                          avgCost: details.avgCost
                        });
                      }
                    }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Bookmark 
                      className={`w-5 h-5 ${
                        isBookmarked(role) 
                          ? 'text-[#2997ff] fill-[#2997ff]' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Background with gradient */}
                <div className="absolute inset-0 rounded-3xl bg-[#1d1d1f] overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-[${details.color}]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundColor: `${details.color}15` }}
                  >
                    <Icon 
                      className="w-7 h-7"
                      style={{ color: details.color }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors">
                      {role}
                    </h3>
                    <p className="text-gray-400 text-base mb-4">
                      {details.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Available</p>
                        <p className="text-base text-gray-300">{details.totalCerts}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cost Range</p>
                        <p className="text-base text-gray-300">{details.avgCost}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {details.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-300 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div 
                    className="flex items-center gap-2 text-sm font-medium mt-6"
                    style={{ color: details.color }}
                  >
                    <span>View Certifications</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 rounded-3xl border border-[#333333] group-hover:border-[#444444] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No results message */}
        {getFilteredRoles().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl font-bold text-gray-400">No paths found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {selectedRole && roleDetails[selectedRole] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-6 py-20">
              <div className="max-w-7xl mx-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedRole} Certifications</h2>
                    <p className="text-gray-400">
                      {roleDetails[selectedRole].description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || selectedFilter !== 'all') && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {searchQuery && (
                      <span className="px-3 py-1 text-sm bg-[#2997ff]/20 text-[#2997ff] rounded-full">
                        Search: {searchQuery}
                      </span>
                    )}
                    {selectedFilter !== 'all' && (
                      <span className="px-3 py-1 text-sm bg-[#30d158]/20 text-[#30d158] rounded-full">
                        Path: {selectedFilter}
                      </span>
                    )}
                  </div>
                )}

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificationsData[selectedRole]?.map((cert, index) => (
                    <CertificationCard key={index} cert={cert} />
                  )) || (
                    <div className="col-span-3 text-center py-20">
                      <h3 className="text-2xl font-bold text-gray-400">No certifications available</h3>
                      <p className="text-gray-500 mt-2">Please check back later for updates.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications; 