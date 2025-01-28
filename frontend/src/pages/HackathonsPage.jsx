import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Users, ArrowRight, ExternalLink } from "lucide-react";

// eslint-disable-next-line react/prop-types
const HackathonCard = ({ hackathon }) => {
  // Add prop types validation at the top
  // eslint-disable-next-line react/prop-types
  const { images, status, participants, title, start_date, location, links, details } = hackathon;

  // Extract Devfolio link if it exists
  const getDevfolioLink = (links) => {
    // eslint-disable-next-line react/prop-types
    return links?.find(link => 
      link.toLowerCase().includes('devfolio.co') || 
      link.toLowerCase().includes('hack.') ||
      link.toLowerCase().includes('hackathon.')
    );
  };

  const devfolioLink = getDevfolioLink(links || []);

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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[980px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-semibold mb-6"
          >
            Hackathons
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-400 mb-12"
          >
            Join exciting hackathons and build amazing projects
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1d1d1f] rounded-full border border-[#424245] text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-colors"
            />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-4 mt-8"
          >
            {["all", "upcoming", "past"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterType
                    ? "bg-[#2997ff] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </motion.div>
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
