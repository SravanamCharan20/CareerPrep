import { motion } from "framer-motion";
import { 
  Layers, 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Award, 
  Code, 
  Server, 
  Database,
  Globe,
  Cpu
} from "lucide-react";
import { Link } from "react-router-dom";

const FullStackPath = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff375f]/20 rounded-full blur-[120px] opacity-30" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <Link 
            to="/careerpaths"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Career Paths
          </Link>

          <div className="flex items-start gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-[#ff375f]/10 flex items-center justify-center">
              <Layers className="w-8 h-8 text-[#ff375f]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">Full Stack Development</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Master both frontend and backend development. Build complete web applications from start to finish.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6">
              <BookOpen className="w-6 h-6 text-[#ff375f] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Learning Duration</h3>
              <p className="text-gray-400">8-12 months</p>
            </div>
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6">
              <Users className="w-6 h-6 text-[#ff375f] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-400">Extremely High Demand</p>
            </div>
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6">
              <Award className="w-6 h-6 text-[#ff375f] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Certification</h3>
              <p className="text-gray-400">Industry Recognized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Overview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">The Full Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <Globe className="w-8 h-8 text-[#2997ff] mb-6" />
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                  React & Redux
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                  Modern JavaScript
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                  Responsive Design
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <Server className="w-8 h-8 text-[#30d158] mb-6" />
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                  Node.js & Express
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                  API Development
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                  Authentication
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <Database className="w-8 h-8 text-[#ff375f] mb-6" />
              <h3 className="text-xl font-semibold mb-4">Database</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff375f]" />
                  MongoDB
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff375f]" />
                  Database Design
                </li>
                <li className="text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff375f]" />
                  Data Modeling
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 px-6 bg-[#1d1d1f]/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Comprehensive Curriculum</h2>
          <div className="space-y-6">
            {[
              {
                title: "Frontend Development",
                modules: [
                  "React & Component Architecture",
                  "State Management with Redux",
                  "Modern CSS & Tailwind",
                  "Performance Optimization"
                ]
              },
              {
                title: "Backend Development",
                modules: [
                  "Node.js & Express",
                  "RESTful API Design",
                  "Authentication & Security",
                  "Database Integration"
                ]
              },
              {
                title: "Database & DevOps",
                modules: [
                  "MongoDB & Mongoose",
                  "Database Design Patterns",
                  "Docker Basics",
                  "Deployment Strategies"
                ]
              },
              {
                title: "Advanced Concepts",
                modules: [
                  "Testing & Quality Assurance",
                  "CI/CD Implementation",
                  "Scalability & Performance",
                  "Security Best Practices"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-6">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.modules.map((module, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#ff375f]" />
                      {module}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Real-World Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "Build a full-featured online store with shopping cart, payment integration, and admin dashboard.",
                features: ["User Authentication", "Product Management", "Payment Processing", "Order Tracking"]
              },
              {
                title: "Social Media App",
                description: "Create a social networking platform with real-time features and media sharing capabilities.",
                features: ["Real-time Chat", "Post Creation", "User Profiles", "Media Upload"]
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff375f]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-24 px-6 bg-[#1d1d1f]/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Career Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">Job Roles</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#ff375f]" />
                  Full Stack Developer
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#ff375f]" />
                  Software Engineer
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#ff375f]" />
                  Technical Lead
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#ff375f]" />
                  Solution Architect
                </li>
              </ul>
            </div>
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">Salary Range</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-2">Entry Level</p>
                  <p className="text-2xl font-semibold text-green-500">$80,000 - $100,000</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Senior Level</p>
                  <p className="text-2xl font-semibold text-green-500">$130,000 - $200,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullStackPath; 