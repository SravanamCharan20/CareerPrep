import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex-1 flex items-center justify-center bg-gradient-to-br from-[#f5f5f5] via-[#fafafa] to-[#e5e5e5]">
        <div className="max-w-6xl text-center p-6">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to CareerPrep
          </motion.h1>
          <p className="text-gray-600 mt-4 text-lg sm:text-xl">
            Your one-stop solution for career growth, hackathons, and resume-building.
          </p>
          <div className="mt-8">
            <a
              href="/signin"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition-all duration-300"
            >
              Get Started <ArrowRightCircle className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] bg-clip-text text-transparent mb-8">
            Why Choose CareerPrep?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-100 rounded-xl shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">Hackathons</h3>
              <p className="text-gray-600 mt-2">
                Discover and participate in top hackathons to showcase your skills.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-100 rounded-xl shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">Resume Builder</h3>
              <p className="text-gray-600 mt-2">
                Create professional resumes with ease using our smart tools.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-100 rounded-xl shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">Career Guidance</h3>
              <p className="text-gray-600 mt-2">
                Get expert advice and resources to excel in your chosen path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="w-full py-12 bg-gradient-to-r from-[#7F56D9] to-[#2c0e88]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Transform Your Career?
          </h2>
          <p className="text-gray-200 mt-4">
            Join CareerPrep today and take the next big step in your professional journey.
          </p>
          <div className="mt-6">
            <a
              href="/signup"
              className="px-6 py-3 bg-white text-[#2c0e88] font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;