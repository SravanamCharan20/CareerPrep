import React, { useState } from 'react';
import { Search, Briefcase, MapPin } from 'lucide-react';
import { JobFilters } from './JobFilters';
import { JobCard } from './JobCard';
import { Job } from '../../types/job';

const JOBS_DATA: Job[] = [
  {
    id: 1,
    company: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&h=50&q=80',
    position: 'Senior Software Engineer',
    location: 'Remote',
    type: 'Full-Time',
    description: 'Looking for an experienced software engineer to join our team.',
    salary: '$120k - $150k',
    posted: '2d ago'
  },
  // Add more job listings...
];

export function JobsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    location: [],
    role: []
  });

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white">
            Jobs & Internships
          </h1>
          <button className="px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
            Post a Job
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <JobFilters
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
          
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-800 text-primary-900 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {JOBS_DATA.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}