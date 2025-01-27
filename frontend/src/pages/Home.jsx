import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight , ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="flex flex-col items-center"
    >
      <ChevronDown className="w-6 h-6 text-gray-400" />
      <p className="text-sm text-gray-400">Scroll to explore</p>
    </motion.div>
  </motion.div>
);

// eslint-disable-next-line react/prop-types
const ParallaxSection = ({ children, offset = 50 }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Limit the parallax effect to a reasonable range
      const maxScroll = 300;
      const currentScroll = Math.min(window.scrollY, maxScroll);
      setScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      style={{ y: scrollY / offset }}
      className="relative z-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
};

// eslint-disable-next-line react/prop-types
const FadeInSection = ({ children, delay = 0, direction = null }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// eslint-disable-next-line react/prop-types
const ProjectShowcase = ({ title, description, image, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="relative group"
  >
    <div className="overflow-hidden rounded-2xl">
      <motion.img
        src={`/images/${image}`}
        alt={title}
        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <motion.button
          whileHover={{ x: 5 }}
          className="text-[#2997ff] hover:text-white flex items-center gap-2 transition-colors"
        >
          Learn more <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <ParallaxSection offset={4}>
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-7xl sm:text-8xl font-semibold mb-8"
            >
              Build your future
              <br />
              <span className="bg-gradient-to-r from-[#2997ff] to-[#4eb5ff] bg-clip-text text-transparent">
                in tech.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Create your portfolio, practice with real projects, and connect with mentors.
              All in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-4 bg-[#2997ff] text-white rounded-full text-lg font-medium hover:bg-[#2997ff]/90 transition-colors flex items-center"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              <Link to="/learn-more">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-4 text-[#2997ff] rounded-full text-lg font-medium hover:text-[#2997ff]/90 transition-colors"
                >
                  Learn more
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </ParallaxSection>
        <ScrollIndicator />
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection direction="up">
            <h2 className="text-4xl font-semibold text-center mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-center mb-16 text-xl">
              Discover what others are building
            </p>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInSection direction="left" delay={0.2}>
              <ProjectShowcase
                title="AI Chat Application"
                description="A real-time chat application powered by artificial intelligence"
                image="project-1.jpg"
                index={0}
              />
            </FadeInSection>
            <FadeInSection direction="right" delay={0.4}>
              <ProjectShowcase
                title="E-commerce Platform"
                description="A modern e-commerce platform with advanced features"
                image="project-2.jpg"
                index={1}
              />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#1d1d1f] transform -skew-y-3 origin-top-left" />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FadeInSection delay={0.2}>
              <div className="text-center">
                <h3 className="text-6xl font-semibold text-[#2997ff] mb-4">1000+</h3>
                <p className="text-xl text-gray-400">Active Projects</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.4}>
              <div className="text-center">
                <h3 className="text-6xl font-semibold text-[#2997ff] mb-4">500+</h3>
                <p className="text-xl text-gray-400">Mentors</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.6}>
              <div className="text-center">
                <h3 className="text-6xl font-semibold text-[#2997ff] mb-4">10K+</h3>
                <p className="text-xl text-gray-400">Developers</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeInSection direction="up">
            <h2 className="text-4xl font-semibold text-center mb-24">
              How It Works
            </h2>
          </FadeInSection>
          
          <div className="space-y-32">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <FadeInSection direction="left">
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-4">Choose Your Path</h3>
                  <p className="text-gray-400 text-xl leading-relaxed">
                    Select from a variety of project categories and difficulty levels
                    that match your interests and expertise.
                  </p>
                </div>
              </FadeInSection>
              <FadeInSection direction="right" delay={0.2}>
                <div className="flex-1">
                  <img
                    src="/images/step-1.jpg"
                    alt="Choose Your Path"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#1d1d1f] to-black">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeInSection direction="up">
            <h2 className="text-5xl font-semibold mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who have already taken the first step
              towards their dream career.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-[#2997ff] text-white rounded-full text-lg font-medium hover:bg-[#2997ff]/90 transition-colors"
              >
                Get Started Now
              </motion.button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#424245]">
        <div className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CareerPrep</h3>
              <p className="text-gray-400 text-sm">
                Empowering developers to build their future in tech.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/projects" className="text-gray-400 hover:text-white text-sm">Projects</Link></li>
                <li><Link to="/hackathons" className="text-gray-400 hover:text-white text-sm">Hackathons</Link></li>
                <li><Link to="/mentors" className="text-gray-400 hover:text-white text-sm">Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#424245] text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} CareerPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;