// src/App.js
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Star, Code, ArrowRight, Search, ChevronLeft, ChevronRight, TrendingUp, ArrowLeftCircle, Bookmark } from 'lucide-react';
import { useUserInteractions } from '../hooks/useUserInteractions';

function MernProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all'); // 'all', 'trending'
  const projectsPerPage = 9;
  const { handleBookmark, handleRemoveBookmark, isBookmarked } = useUserInteractions();

  useEffect(() => {
    // Fetch the project data from the backend
    fetch(`${import.meta.env.VITE_API_URL}/projects/mernprojects`, {
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include'
    })
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


  return (
    <div className="min-h-screen bg-black text-white pb-20">
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
            MERN Stack Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-400 mb-12"
          >
            Explore and contribute to innovative MERN stack projects
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
                  <motion.div
                    key={project.repo_link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1c1c1e] rounded-xl overflow-hidden group relative"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => isBookmarked(project.repo_link) 
                          ? handleRemoveBookmark(project.repo_link)
                          : handleBookmark({
                              id: project.repo_link,
                              title: project.repo_name,
                              path: project.repo_link,
                              category: 'MERN Projects',
                              description: project.description,
                              stars: project.stars
                            })
                      }
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Bookmark 
                        className={`w-5 h-5 ${
                          isBookmarked(project.repo_link) 
                            ? 'text-[#30d158] fill-[#30d158]' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-[#2997ff]" />
                          <span className="text-sm font-medium text-gray-400">MERN Stack</span>
                        </div>
                        <div className="flex items-center mr-10 gap-1 text-yellow-500">
                          <Star className="w-4 m h-4 fill-current" />
                          <span className="text-sm font-medium">
                            {typeof project.stars === 'number' ? project.stars.toLocaleString() : '0'}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors line-clamp-1">
                        {project.repo_name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-[#424245]">
                        {project.repo_link !== '#' ? (
                          <a
                            href={project.repo_link}
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
                        
                        {project.repo_link !== '#' && (
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="text-[#2997ff] cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
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

export default MernProjects;