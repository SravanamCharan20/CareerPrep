import React from 'react';
import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-green-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Gateway to</span>
            <span className="block text-blue-600">Career Success!</span>
          </h1>
          
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover opportunities, practice skills, and launch your career with our comprehensive platform.
          </p>

          <div className="mt-8 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for jobs, hackathons, or resources..."
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Explore Opportunities
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-blue-600">
              Start Practicing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}