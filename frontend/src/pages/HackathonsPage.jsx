/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, ArrowRight, ExternalLink, Code, Trophy, Bookmark } from "lucide-react";
import { useUserInteractions } from '../hooks/useUserInteractions';

 
const HackathonCard = ({ hackathon }) => {
  // Add prop types validation at the top
   
  const { images, status, participants, title, start_date, location, links, details } = hackathon;

  // Extract Devfolio link if it exists
  const getDevfolioLink = (links) => {
     
    return links?.find(link => 
      link.toLowerCase().includes('devfolio.co') || 
      link.toLowerCase().includes('hack.') ||
      link.toLowerCase().includes('hackathon.')
    );
  };

  const devfolioLink = getDevfolioLink(links || []);

  const { handleBookmark, handleRemoveBookmark, isBookmarked } = useUserInteractions();

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
        {images?.[0] && (
          <div className="h-48 overflow-hidden">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "Upcoming" 
                ? "bg-green-500/10 text-green-500"
                : "bg-gray-500/10 text-gray-400"
            }`}>
              {status || 'Unknown'}
            </span>
            {participants && (
              <span className="flex items-center text-gray-400 text-sm">
                <Users className="w-4 h-4 mr-1" />
                {participants}
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[#2997ff] transition-colors duration-300">
            {title}
          </h3>
          <div className="space-y-2 mb-4">
            {start_date && (
              <p className="flex items-center text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {start_date}
              </p>
            )}
            {location && (
              <p className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {location}
              </p>
            )}
          </div>

          {/* Devfolio Link */}
          {devfolioLink && (
            <div className="mb-4 pt-4 border-t border-[#424245]">
              <a
                href={devfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#2997ff]/10 text-[#2997ff] hover:bg-[#2997ff]/20 rounded-lg text-sm transition-colors group-hover:bg-[#2997ff]/15"
              >
                <ExternalLink className="w-4 h-4" />
                Apply on Devfolio
              </a>
            </div>
          )}

          {/* Learn More button only if details exist */}
          {details && (
            <motion.button
              whileHover={{ x: 5 }}
              className="text-[#2997ff] hover:text-white flex items-center gap-2 transition-colors text-sm"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}

          <div className="absolute top-4 right-4">
            <button
              onClick={() => isBookmarked(hackathon._id) 
                ? handleRemoveBookmark(hackathon._id)
                : handleBookmark({
                    id: hackathon._id,
                    title: hackathon.title,
                    path: `/hackathons/${hackathon._id}`,
                    category: 'Hackathons',
                    description: hackathon.details,
                    date: hackathon.start_date
                  })
              }
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 ${
                  isBookmarked(hackathon._id) 
                    ? 'text-[#ff375f] fill-[#ff375f]' 
                    : 'text-gray-400'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HackathonsPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, upcoming, past


  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch("/api/hackathons/fetch-hackathons");
        const data = await response.json();
        setHackathons(data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  const filteredHackathons = hackathons
    .filter(hackathon => 
      hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(hackathon => {
      if (filter === "upcoming") return hackathon.status === "Upcoming";
      if (filter === "past") return hackathon.status === "Past";
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
                <Trophy className="w-full h-full text-[#30d158]" />
              </motion.div>
            </div>

            {/* Title with Gradient Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-7xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f] animate-gradient-x">
                Hackathons
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Join exciting hackathons and build amazing projects
            </motion.p>

            {/* Search and Filter Section with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto backdrop-blur-lg bg-white/5 p-4 rounded-2xl border border-white/10"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#2997ff] text-white placeholder-gray-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-4 mt-6"
            >
              {["all", "upcoming", "past"].map((filterType, index) => (
                <motion.button
                  key={filterType}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filter === filterType
                      ? 'bg-[#2997ff] text-white scale-105'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hackathons Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2997ff] mx-auto"></div>
            </div>
          ) : filteredHackathons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No hackathons found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HackathonsPage;
