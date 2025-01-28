import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Brain, Plus, ArrowRight } from 'lucide-react';

export default function Projects() {
  const navigate = useNavigate();

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
            Explore Projects
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Discover and contribute to innovative projects across different technologies
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectCategories.map((category, index) => (
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

                {/* Border */}
                <div className="absolute inset-0 rounded-3xl border border-[#333333] group-hover:border-[#444444] transition-colors" />
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