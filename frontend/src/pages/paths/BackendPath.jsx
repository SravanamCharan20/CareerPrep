import { motion } from "framer-motion";
import { Server, ArrowLeft, BookOpen, Users, Award, Database, Shield, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const BackendPath = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#30d158]/20 rounded-full blur-[120px] opacity-30" />
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
            <div className="w-16 h-16 rounded-2xl bg-[#30d158]/10 flex items-center justify-center">
              <Server className="w-8 h-8 text-[#30d158]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">Backend Development</h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Build scalable server-side applications, APIs, and robust database systems. Master the art of backend architecture.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6">
              <BookOpen className="w-6 h-6 text-[#30d158] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Learning Duration</h3>
              <p className="text-gray-400">5-7 months</p>
            </div>
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6">
              <Users className="w-6 h-6 text-[#30d158] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-400">Very High Demand</p>
            </div>
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6">
              <Award className="w-6 h-6 text-[#30d158] mb-4" />
              <h3 className="text-lg font-semibold mb-2">Certification</h3>
              <p className="text-gray-400">Industry Recognized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Curriculum</h2>
          <div className="space-y-6">
            {[
              {
                title: "Core Backend Concepts",
                modules: [
                  "Server Architecture",
                  "RESTful API Design",
                  "Database Management",
                  "Authentication & Authorization"
                ]
              },
              {
                title: "Node.js & Express",
                modules: [
                  "Node.js Fundamentals",
                  "Express Framework",
                  "Middleware Development",
                  "API Security"
                ]
              },
              {
                title: "Database Systems",
                modules: [
                  "MongoDB & Mongoose",
                  "SQL Databases",
                  "Data Modeling",
                  "Query Optimization"
                ]
              },
              {
                title: "Advanced Topics",
                modules: [
                  "Microservices Architecture",
                  "Docker & Containerization",
                  "CI/CD Pipelines",
                  "Cloud Deployment"
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
                      <div className="w-2 h-2 rounded-full bg-[#30d158]" />
                      {module}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Key Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Server,
                title: "Server-side",
                items: ["Node.js", "Express", "NestJS", "Python/Django"]
              },
              {
                icon: Database,
                title: "Databases",
                items: ["MongoDB", "PostgreSQL", "Redis", "MySQL"]
              },
              {
                icon: Shield,
                title: "Security",
                items: ["JWT", "OAuth", "HTTPS", "Security Headers"]
              },
              {
                icon: Cloud,
                title: "DevOps",
                items: ["Docker", "AWS", "CI/CD", "Kubernetes"]
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <tech.icon className="w-6 h-6 text-[#30d158] mb-4" />
                <h3 className="text-lg font-semibold mb-4">{tech.title}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, idx) => (
                    <li key={idx} className="text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                      {item}
                    </li>
                  ))}
                </ul>
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
                  <div className="w-2 h-2 rounded-full bg-[#30d158]" />
                  Backend Developer
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#30d158]" />
                  API Developer
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#30d158]" />
                  Database Administrator
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-[#30d158]" />
                  DevOps Engineer
                </li>
              </ul>
            </div>
            <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-6">Salary Range</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-2">Entry Level</p>
                  <p className="text-2xl font-semibold text-green-500">$70,000 - $90,000</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Senior Level</p>
                  <p className="text-2xl font-semibold text-green-500">$120,000 - $180,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackendPath; 