import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Brain, Target, Search, SlidersHorizontal, Terminal, Blocks, Cpu, Globe, Server, Smartphone } from "lucide-react";
import { useSelector } from 'react-redux';
import { useUserProgress } from '../hooks/useUserProgress';

const FeatureCard = ({ icon: Icon, title, description, color, gradient }) => (
  <div className="relative group aspect-[4/3]">
    <div className="absolute inset-0 rounded-3xl bg-[#1d1d1f] overflow-hidden">
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
    </div>
    <div className="relative h-full p-8 flex flex-col">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon 
          className="w-7 h-7"
          style={{ color }}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-[#2997ff] transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-base">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const CodeBlock = () => (
  <div className="relative bg-[#1d1d1f] rounded-3xl p-8 overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex items-center text-[#2997ff]">
        <Terminal className="w-5 h-5 mr-2" />
        <span className="text-gray-400">const</span>
        <span className="text-[#2997ff] mx-2">career</span>
        <span className="text-gray-400">=</span>
        <span className="text-[#ff375f] mx-2">async</span>
        <span className="text-gray-400">()</span>
        <span className="text-[#2997ff] mx-2">=></span>
        <span className="text-gray-400">{'{'}</span>
      </div>
      <div className="pl-6">
        <span className="text-gray-400">await</span>
        <span className="text-[#2997ff] mx-2">learn</span>
        <span className="text-gray-400">(</span>
        <span className="text-[#ff375f]">'new skills'</span>
        <span className="text-gray-400">);</span>
      </div>
      <div className="pl-6">
        <span className="text-gray-400">await</span>
        <span className="text-[#2997ff] mx-2">build</span>
        <span className="text-gray-400">(</span>
        <span className="text-[#ff375f]">'projects'</span>
        <span className="text-gray-400">);</span>
      </div>
      <div className="pl-6">
        <span className="text-[#2997ff]">return</span>
        <span className="text-[#ff375f] mx-2">'success'</span>
        <span className="text-gray-400">;</span>
      </div>
      <div className="text-gray-400">{'}'}</div>
    </div>
    <div className="absolute bottom-4 right-4 opacity-10">
      <Cpu className="w-24 h-24" />
    </div>
  </div>
);

const TechStack = () => {
  const techStacks = [
    { 
      name: 'React', 
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z"/>
      </svg>,
      color: '#61DAFB'
    },
    { 
      name: 'Node.js',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.7.47 1.38 0 2.17-.84 2.17-2.3V7.73c0-.12-.1-.22-.22-.22h-.93c-.12 0-.22.1-.22.22v9.2c0 .66-.68 1.31-1.77.76L3.27 16.5c-.08-.04-.13-.12-.13-.22V7.72c0-.1.05-.18.13-.22l7.44-4.3c.08-.04.17-.04.25 0l7.44 4.3c.08.04.13.12.13.22v8.56c0 .1-.05.18-.13.22l-7.44 4.3c-.08.04-.17.04-.25 0l-1.87-1.12c-.08-.04-.18-.05-.27 0-.75.42-.89.47-1.6.72-.17.06-.43.16 0 .47l2.44 1.45c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.3c.48-.28.78-.8.78-1.36V7.72c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.14-.5-.21-.78-.21zm2 6.31c-2.08 0-3.32.87-3.32 2.31 0 1.56 1.2 1.98 3.16 2.17 2.34.23 2.52.58 2.52 1.05 0 .81-.65 1.15-2.18 1.15-1.92 0-2.34-.48-2.48-1.43-.02-.11-.11-.2-.23-.2h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.87 2.74 2.32 0 3.65-.92 3.65-2.52 0-1.59-1.07-2.01-3.33-2.31-2.28-.3-2.35-.44-2.35-.97 0-.43.19-.99 1.87-.99 1.5 0 2.06.32 2.29 1.34.02.1.11.17.21.17h.96c.06 0 .12-.02.16-.07.04-.04.07-.1.06-.16-.15-1.77-1.32-2.6-3.69-2.6z"/>
      </svg>,
      color: '#339933'
    },
    {
      name: 'MongoDB',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.25c-.41 0-.75-.34-.75-.75v-7c0-.41.34-.75.75-.75s.75.34.75.75v7c0 .41-.34.75-.75.75zm0-10c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/>
      </svg>,
      color: '#47A248'
    },
    {
      name: 'Python',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"/>
      </svg>,
      color: '#3776AB'
    },
    {
      name: 'TypeScript',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M3 3h18v18H3V3zm14.5 12.5v-2h-7v2h2v5h2v-5h3zm-11-3v2H8v5h2v-5h1.5v-2h-5z"/>
      </svg>,
      color: '#3178C6'
    },
    {
      name: 'Docker',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M13 3v2h-2V3h2zm-4 0v2H7V3h2zm-4 0v2H3V3h2zm8 0v2h-2V3h2zm4 0v2h-2V3h2zm-4 4v2h-2V7h2zm-4 0v2H7V7h2zm-4 0v2H3V7h2zm8 0v2h-2V7h2zm4 0v2h-2V7h2zm-4 4v2h-2v-2h2zm-4 0v2H7v-2h2zm-4 0v2H3v-2h2zm8 0v2h-2v-2h2zm4 0v2h-2v-2h2z"/>
      </svg>,
      color: '#2496ED'
    },
    {
      name: 'AWS',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M18.75 11.35a4.32 4.32 0 0 0-.24-1.31c-.16-.42-.4-.79-.72-1.09-.32-.31-.72-.54-1.17-.71-.45-.16-.98-.24-1.57-.24-.71 0-1.34.12-1.91.37-.56.25-1.05.58-1.44 1.01-.4.43-.72.93-.96 1.5-.23.57-.35 1.17-.35 1.8 0 .62.12 1.21.35 1.78.23.57.55 1.07.96 1.5.4.43.89.77 1.44 1.01.56.25 1.19.37 1.91.37.59 0 1.12-.08 1.57-.24.45-.16.85-.4 1.17-.71.32-.31.56-.67.72-1.09.16-.42.24-.85.24-1.31h-2.32c0 .28-.11.52-.32.71-.21.2-.51.29-.89.29-.59 0-1.02-.2-1.28-.6-.27-.4-.4-.93-.4-1.6 0-.67.13-1.2.4-1.6.27-.4.69-.6 1.28-.6.38 0 .68.1.89.29.21.2.32.43.32.71h2.32z"/>
      </svg>,
      color: '#FF9900'
    },
    {
      name: 'Git',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.18 0-.35 0-.5.07L13.93 7.5C14.23 6.97 14.23 6.27 13.93 5.74L15.61 4.06L21.4 9.85C21.78 10.23 22 10.74 22 11.25V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V11.25C2 10.74 2.22 10.23 2.6 10.59ZM19 20V11.25L12 4.25L5 11.25V20H19Z"/>
      </svg>,
      color: '#F05032'
    },
    {
      name: 'TailwindCSS',
      icon: <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="currentColor" d="M12 6C9.33 6 7.5 7.33 6.5 10C7.5 8.67 8.67 8 10 8C10.83 8 11.42 8.42 12 9C12.83 9.83 13.67 10.67 15.5 10.67C18.17 10.67 20 9.33 21 6.67C20 8 18.83 8.67 17.5 8.67C16.67 8.67 16.08 8.25 15.5 7.67C14.67 6.83 13.83 6 12 6M6.5 13.33C3.83 13.33 2 14.67 1 17.33C2 16 3.17 15.33 4.5 15.33C5.33 15.33 5.92 15.75 6.5 16.33C7.33 17.17 8.17 18 10 18C12.67 18 14.5 16.67 15.5 14C14.5 15.33 13.33 16 12 16C11.17 16 10.58 15.58 10 15C9.17 14.17 8.33 13.33 6.5 13.33Z"/>
      </svg>,
      color: '#06B6D4'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {techStacks.map((tech) => (
        <div 
          key={tech.name}
          className="aspect-square rounded-2xl bg-[#1d1d1f] flex flex-col items-center justify-center group hover:bg-[#2997ff]/10 transition-colors p-4"
        >
          <div className="text-gray-400 group-hover:text-[#2997ff] transition-colors">
            {tech.icon}
          </div>
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors mt-2">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const LearningTrack = ({ title, description, modules, color, path }) => (
  <Link to={path}>
    <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="space-y-2">
        {modules.map((module, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {module}
          </div>
        ))}
      </div>
    </div>
  </Link>
);

const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  const { lastVisited, completedCourses } = useUserProgress();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Text */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <h1 className="text-[40vw] font-bold whitespace-nowrap transform -rotate-12">
          CAREERPREP
        </h1>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#2997ff] rounded-full blur-[100px] opacity-20" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#ff375f] rounded-full blur-[100px] opacity-20" />
                <h1 className="text-6xl font-bold mb-6 relative">
                  Build Your Future in
                  <span className="block text-[#2997ff]">Technology</span>
                </h1>
              </motion.div>
              <p className="text-xl text-gray-400 mb-8">
                Master in-demand skills, build real projects, and accelerate your tech career with structured learning paths and expert guidance.
              </p>
              <div className="flex gap-4">
                <Link to="/signup">
                  <button className="px-8 py-3 bg-[#2997ff] rounded-xl font-medium hover:bg-[#2997ff]/90 transition-colors flex items-center gap-2 group">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/projects">
                  <button className="px-8 py-3 bg-white/5 rounded-xl font-medium hover:bg-white/10 transition-colors">
                    Browse Projects
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <CodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Why Choose CareerPrep?</h2>
              <p className="text-gray-400">Everything you need to succeed in tech</p>
            </div>
            <div className="flex gap-4">
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Code}
              title="Project-Based Learning"
              description="Build real-world projects that showcase your skills to employers"
              color="#2997ff"
              gradient="from-[#2997ff]/20 to-transparent"
            />
            <FeatureCard
              icon={Brain}
              title="Structured Roadmaps"
              description="Follow clear learning paths designed by industry experts"
              color="#30d158"
              gradient="from-[#30d158]/20 to-transparent"
            />
            <FeatureCard
              icon={Target}
              title="Career Guidance"
              description="Get personalized mentorship and career development support"
              color="#ff375f"
              gradient="from-[#ff375f]/20 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Master Modern Tech Stack</h2>
              <p className="text-gray-400 mb-6">
                Learn the most in-demand technologies and frameworks used by top companies worldwide. Our curriculum is constantly updated to match industry needs.
              </p>
              <TechStack />
            </div>
            <div className="flex-1">
              <div className="bg-[#1d1d1f] rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">Learning Tracks</h3>
                <div className="space-y-4">
                  <LearningTrack
                    title="Frontend Development"
                    description="Master modern web development with the latest frameworks and tools"
                    modules={[
                      'HTML5, CSS3 & JavaScript',
                      'React & Redux',
                      'Responsive Design',
                      'Performance Optimization'
                    ]}
                    color="#2997ff"
                    path="/roadmaps/frontend"
                  />
                  <LearningTrack
                    title="Backend Development"
                    description="Build scalable server-side applications and APIs"
                    modules={[
                      'Node.js & Express',
                      'Database Design',
                      'API Development',
                      'Server Security'
                    ]}
                    color="#30d158"
                    path="/roadmaps/backend"
                  />
                  <LearningTrack
                    title="Mobile Development"
                    description="Create cross-platform mobile applications"
                    modules={[
                      'React Native',
                      'Mobile UI/UX',
                      'Native Features',
                      'App Deployment'
                    ]}
                    color="#ff375f"
                    path="/roadmaps/mobile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Back Section */}
      {currentUser && lastVisited && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1d1d1f] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2997ff] rounded-full blur-[100px] opacity-10" />
              <h2 className="text-2xl font-bold mb-6 relative">
                Welcome back, {currentUser.username}!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div>
                  <p className="text-gray-400 mb-4">Continue your journey:</p>
                  <Link 
                    to={lastVisited.path}
                    className="inline-flex items-center gap-2 text-[#2997ff] hover:text-[#2997ff]/80 transition-colors group"
                  >
                    Resume Learning
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Progress Overview:</p>
                  <p className="text-2xl font-semibold">
                    {completedCourses.length} courses completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '1000+', label: 'Active Projects', color: '#2997ff' },
              { number: '500+', label: 'Expert Mentors', color: '#30d158' },
              { number: '10K+', label: 'Active Learners', color: '#ff375f' }
            ].map((stat, index) => (
              <div key={index} className="bg-[#1d1d1f] rounded-3xl p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1f] to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-5xl font-bold mb-2 relative" style={{ color: stat.color }}>
                  {stat.number}
                </h3>
                <p className="text-gray-400 relative">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;