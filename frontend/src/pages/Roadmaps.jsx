import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Server, Smartphone, Brain, ArrowRight } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f]"
          >
            Learning Roadmaps
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Choose your path and start your journey in software development
          </motion.p>
        </motion.div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmaps.map((roadmap, index) => (
            <Link 
              key={roadmap.id}
              to={roadmap.path}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="relative aspect-[4/3]"
              >
                {/* Background with gradient */}
                <div className="absolute inset-0 rounded-3xl bg-[#1d1d1f] overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${roadmap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
                    style={{ backgroundColor: `${roadmap.color}15` }}
                  >
                    <roadmap.icon 
                      className="w-7 h-7"
                      style={{ color: roadmap.color }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors">
                      {roadmap.title}
                    </h3>
                    <p className="text-gray-400 text-base mb-4">
                      {roadmap.description}
                    </p>
                    <div className="text-sm font-medium" style={{ color: roadmap.color }}>
                      {roadmap.level}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {roadmap.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-300 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div 
                    className="flex items-center gap-2 text-sm font-medium mt-6"
                    style={{ color: roadmap.color }}
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 rounded-3xl border border-[#333333] group-hover:border-[#444444] transition-colors" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
