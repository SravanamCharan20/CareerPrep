import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] shadow-md">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-full">
            <div className="w-8 h-8 bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] rounded-full" />
          </div>
          <Link
            to="/"
            className="text-2xl font-extrabold text-white tracking-tight"
          >
            Career<span className="text-slate-900">Prep</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/resume"
            className="text-sm text-white font-medium hover:text-gray-200 transition"
          >
            Resume
          </Link>
          <Link
            to="/hackathons"
            className="text-sm text-white font-medium hover:text-gray-200 transition"
          >
            Hackathons
          </Link>
          <Link
            to="/career-paths"
            className="text-sm text-white font-medium hover:text-gray-200 transition"
          >
            Career Paths
          </Link>
          <Link
            to="/projects"
            className="text-sm text-white font-medium hover:text-gray-200 transition"
          >
            Projects
          </Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/signin"
            className="text-sm text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#7F56D9] transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-white text-[#7F56D9] px-4 py-2 rounded-full hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button -> 238772770924-2iq3n59466p0gkktjc09msh87r09onot.apps.googleusercontent.com */ }
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#7F56D9] to-[#2c0e88] shadow-lg">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link
              to="/resume"
              className="text-sm text-white font-medium hover:text-gray-200 transition"
            >
              Resume
            </Link>
            <Link
              to="/hackathons"
              className="text-sm text-white font-medium hover:text-gray-200 transition"
            >
              Hackathons
            </Link>
            <Link
              to="/career-paths"
              className="text-sm text-white font-medium hover:text-gray-200 transition"
            >
              Career Paths
            </Link>
            <Link
              to="/projects"
              className="text-sm text-white font-medium hover:text-gray-200 transition"
            >
              Projects
            </Link>
            <Link
              to="/signin"
              className="text-sm text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-[#7F56D9] transition text-center"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-white text-[#7F56D9] px-4 py-2 rounded-full hover:opacity-90 transition text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}