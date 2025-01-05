import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Job } from '../../types/job';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-sm p-6">
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-primary-900 dark:text-white">
                {job.position}
              </h3>
              <p className="text-primary-600 dark:text-primary-400">{job.company}</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-700 dark:text-primary-200">
              {job.type}
            </span>
          </div>

          <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
            {job.description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm text-primary-500 dark:text-primary-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {job.salary}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {job.posted}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <button className="px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
              Apply Now
            </button>
            <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
              Save Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}