import React from 'react';
import { Briefcase, Trophy, BookOpen } from 'lucide-react';

const jobs = [
  {
    company: 'TechCorp',
    role: 'Software Engineer Intern',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
  },
  {
    company: 'DataViz',
    role: 'Data Scientist',
    logo: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
  },
  {
    company: 'AILabs',
    role: 'ML Engineer',
    logo: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
  },
];

const hackathons = [
  {
    name: 'Global Tech Hackathon',
    date: 'March 15-17, 2024',
    organizer: 'TechCommunity',
  },
  {
    name: 'AI Innovation Challenge',
    date: 'April 1-3, 2024',
    organizer: 'AILabs',
  },
];

export function KeyHighlights() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Jobs Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
                Latest Opportunities
              </h2>
              <a href="/jobs" className="text-blue-600 hover:text-blue-700">
                View all
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.company} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-full" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{job.role}</h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Hackathons Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-blue-600" />
                Upcoming Hackathons
              </h2>
              <a href="/hackathons" className="text-blue-600 hover:text-blue-700">
                View all
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hackathons.map((hackathon) => (
                <div key={hackathon.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900">{hackathon.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">{hackathon.organizer}</p>
                  <p className="text-sm text-gray-500 mt-1">{hackathon.date}</p>
                  <button className="w-full mt-4 bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition-colors">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Practice Sheets Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                Practice Sheets
              </h2>
              <a href="/practice" className="text-blue-600 hover:text-blue-700">
                View all
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['SDE', 'AI/ML', 'Data Science'].map((role) => (
                <div key={role} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900">{role}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Practice questions tailored for {role} roles
                  </p>
                  <button className="w-full mt-4 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors">
                    Start Practice
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}