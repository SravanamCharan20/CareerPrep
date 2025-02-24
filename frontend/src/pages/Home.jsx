/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Brain, 
  Terminal, 
  Clock,
  Rocket as RocketIcon,
  Users as UsersIcon,
  BookOpen as BookIcon,
  Award as AwardIcon,
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { useUserProgress } from '../hooks/useUserProgress';
import { setLastVisited } from '../redux/userSlice';
import { useEffect } from 'react';

const StatCard = ({ number, label, icon: Icon }) => (
  <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-3xl p-8 hover:bg-[#1d1d1f]/70 transition-all group">
    <Icon className="w-8 h-8 text-[#2997ff] mb-4" />
    <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#2997ff] bg-clip-text text-transparent">
      {number}
    </h3>
    <p className="text-gray-400">{label}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#1d1d1f] to-black rounded-3xl transform group-hover:scale-[1.02] transition-transform" />
    <div className="relative p-8 rounded-3xl border border-white/10">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-[#2997ff] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const LearningPathCard = ({ title, description, skills, duration, level, color }) => (
  <div className="bg-[#1d1d1f]/50 backdrop-blur-xl rounded-3xl p-8 hover:bg-[#1d1d1f]/70 transition-all border border-white/10 group">
    <div className="flex justify-between items-start mb-6">
      <h4 className="text-xl font-semibold group-hover:text-[#2997ff] transition-colors">{title}</h4>
      <span 
        className="px-3 py-1 rounded-full text-sm"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {level}
      </span>
    </div>
    <p className="text-gray-400 mb-6">{description}</p>
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-2 text-gray-400">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
    <Link to={`/careerpaths/${title.toLowerCase().replace(/\s+/g, '')}`}>
      <button className="w-full py-3 rounded-xl border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff] hover:text-black transition-all flex items-center justify-center gap-2">
        Explore Path
        <ArrowRight className="w-4 h-4" />
      </button>
    </Link>
  </div>
);

const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  const { lastVisited} = useUserProgress();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && (!lastVisited || !lastVisited.path)) {
      dispatch(setLastVisited({
        path: window.location.pathname,
        timestamp: new Date().toISOString()
      }));
    }
  }, [dispatch, currentUser, lastVisited]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2997ff]/20 rounded-full blur-[120px] opacity-30" />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#ff375f]/20 rounded-full blur-[120px] opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-7xl font-bold mb-8">
              Build Your Future in
              <span className="block text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2997ff] via-[#30d158] to-[#ff375f] animate-gradient-x">Technology</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Master in-demand skills, build real projects, and accelerate your tech career with structured learning paths and expert guidance.
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/signup">
                <button className="px-8 py-4 bg-[#2997ff] cursor-pointer rounded-2xl font-medium hover:bg-[#2997ff]/90 transition-colors flex items-center gap-2 group">
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/projects">
                <button className="px-8 py-4 bg-white/5 rounded-2xl font-medium hover:bg-white/10 transition-colors">
                  Explore Projects
                </button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-32">
            <StatCard number="100+" label="Active Projects" icon={RocketIcon} />
            <StatCard number="50+" label="Expert Mentors" icon={UsersIcon} />
            <StatCard number="10K+" label="Active Learners" icon={BookIcon} />
            <StatCard number="90%" label="Success Rate" icon={AwardIcon} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-6"
            >
              Why Choose CareerPrep?
            </motion.h2>
            <p className="text-xl text-gray-400">
              Everything you need to succeed in tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Terminal}
              title="Project-Based Learning"
              description="Build real-world projects that showcase your skills to employers. Get hands-on experience with modern technologies."
              color="#2997ff"
            />
            <FeatureCard
              icon={Brain}
              title="AI-Powered Learning"
              description="Personalized learning paths adapted to your goals and skill level using advanced AI algorithms."
              color="#30d158"
            />
            <FeatureCard
              icon={UsersIcon}
              title="Community Support"
              description="Connect with peers, mentors, and industry experts. Get help when you need it and build your network."
              color="#ff375f"
            />
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Learning Paths</h2>
            <p className="text-xl text-gray-400">
              Structured paths to help you achieve your goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LearningPathCard
              title="Frontend Developer"
              description="Master modern web development with React, TypeScript, and more."
              skills={["React", "TypeScript", "CSS", "Web APIs"]}
              duration="4 months"
              level="Beginner"
              color="#2997ff"
              
            />
            <LearningPathCard
              title="Backend Developer"
              description="Build scalable server applications and RESTful APIs."
              skills={["Node.js", "Express", "MongoDB", "APIs"]}
              duration="5 months"
              level="Intermediate"
              color="#30d158"
            />
            <LearningPathCard
              title="Full Stack Developer"
              description="Become a complete developer with both frontend and backend skills."
              skills={["MERN Stack", "DevOps", "Testing", "Security"]}
              duration="8 months"
              level="Advanced"
              color="#ff375f"
            />
          </div>
        </div>
      </section>    
    </div>
  );
};

export default Home;