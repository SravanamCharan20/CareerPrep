import React from 'react';
import { BookOpen } from 'lucide-react';
import { PracticeCategory } from '../../types/practice';

interface PracticeCardProps {
  category: PracticeCategory;
}

export function PracticeCard({ category }: PracticeCardProps) {
  const Icon = category.icon;

  return (
    <div className="bg-white dark:bg-primary-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        <h3 className="ml-3 text-xl font-semibold text-primary-900 dark:text-white">
          {category.title}
        </h3>
      </div>

      <p className="text-primary-600 dark:text-primary-400 mb-4">
        {category.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-primary-900 dark:text-white mb-2">
          Topics covered:
        </h4>
        <div className="flex flex-wrap gap-2">
          {category.topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-700 dark:text-primary-200"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-primary-500 dark:text-primary-400">
          {category.totalProblems} problems
        </span>
        <span className="text-sm text-primary-500 dark:text-primary-400">
          <BookOpen className="h-4 w-4 inline mr-1" />
          Start Learning
        </span>
      </div>

      <button className="w-full px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-300 dark:hover:text-primary-900 transition-colors">
        View Practice Sheets
      </button>
    </div>
  );
}