// src/App.js
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Star, Code, ArrowRight, Search, ChevronLeft, ChevronRight, TrendingUp, ArrowLeftCircle } from 'lucide-react';

function MLProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all'); // 'all', 'trending'
  const projectsPerPage = 9;

  useEffect(() => {
    // Fetch the project data from the backend
    fetch('/api/projects/mlprojects')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  // Reset page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  // Filter projects based on search and trending
  const filteredProjects = projects
    .filter(project => 
      project.repo_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(project => {
      if (filter === 'trending') return project.stars >= 1000; // Consider projects with 1000+ stars as trending
      return true;
    })
    .sort((a, b) => filter === 'trending' ? b.stars - a.stars : 0); // Sort by stars if trending

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  // eslint-disable-next-line react/prop-types
  const ProjectCard = ({ project }) => {
    // Destructure with default values
    const {
      repo_name = 'Untitled Project',
      description = 'No description provided.',
      repo_link = '#',
      stars = 0
    } = project || {};

    // Validate repo_link
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    const validRepoLink = isValidUrl(repo_link) ? repo_link : '#';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative"
      >
        {/* Blue Glow Effect */}
        <div className="absolute -inset-0.5 bg-[#2997ff] rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500" />
        
        <div className="relative bg-[#1d1d1f] rounded-2xl overflow-hidden group-hover:bg-[#2d2d2f] transition-colors duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#2997ff]" />
                <span className="text-sm font-medium text-gray-400">Machine Learning</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">
                  {typeof stars === 'number' ? stars.toLocaleString() : '0'}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors line-clamp-1">
              {repo_name}
            </h3>
            
            <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
              {description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#424245]">
              {validRepoLink !== '#' ? (
                <a
                  href={validRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#2997ff] hover:text-white transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  View Repository
                </a>
              ) : (
                <span className="text-gray-500 text-sm flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  No Repository Link
                </span>
              )}
              
              {validRepoLink !== '#' && (
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-[#2997ff] cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      {/* Back Navigation - Updated Styling */}
      <div className="max-w-[1200px] mx-auto px-6 mb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/projects')}
          className="group flex items-center gap-3 py-2 text-gray-400 hover:text-[#2997ff] transition-colors"
        >
          <ArrowLeftCircle className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to Project Categories</span>
        </motion.button>
      </div>

      {/* Hero Section - Adjusted spacing */}
      <section className="px-6 mb-16">
        <div className="max-w-[980px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-semibold mb-6"
          >
            Machine Learning Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-400 mb-12"
          >
            Explore and contribute to cutting-edge ML projects
          </motion.p>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1d1d1f] rounded-full border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setFilter(filter === 'all' ? 'trending' : 'all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                filter === 'trending'
                  ? 'bg-[#2997ff] text-white'
                  : 'text-[#2997ff] border border-[#2997ff]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Trending
            </button>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6">
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2997ff]"></div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.repo_link} project={project} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 mt-12">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-full transition-colors ${
                        currentPage === 1
                          ? 'text-gray-600 cursor-not-allowed'
                          : 'text-[#2997ff] hover:bg-[#2997ff]/10'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {getPageNumbers().map((number, index) => (
                        number === '...' ? (
                          <span key={`ellipsis-${index}`} className="text-gray-400">...</span>
                        ) : (
                          <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            className={`w-8 h-8 rounded-full transition-colors ${
                              currentPage === number
                                ? 'bg-[#2997ff] text-white'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {number}
                          </button>
                        )
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-full transition-colors ${
                        currentPage === totalPages
                          ? 'text-gray-600 cursor-not-allowed'
                          : 'text-[#2997ff] hover:bg-[#2997ff]/10'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-gray-400 text-sm">
                    Showing {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No projects found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MLProjects;